import { ProblemItem, TopicItem, TOPICS } from '../dsa-data';
import { db, UserProgressRecord } from '../db';

export interface RecommendationCard {
  id: string;
  type: 'PREREQUISITE_SATISFIED' | 'WEAK_TOPIC' | 'REVISION_DUE' | 'COMPANY_TARGET';
  title: string;
  message: string;
  actionUrl: string;
  badge: string;
  priority: number; // 1 = highest
}

export interface MasteryScoreReport {
  overallMastery: number; // 0 - 100
  accuracyRate: number; // %
  independentSolvingRate: number; // %
  streakConsistency: number; // %
  topicMasteryMap: Record<string, number>;
  weakTopics: { slug: string; name: string; score: number; reason: string }[];
  recommendations: RecommendationCard[];
}

export function computeStudentMastery(): MasteryScoreReport {
  const allProblems = db.getProblems();
  const progressMap = db.getUserProgress();
  const userStats = db.getUserStats();
  const revisionQueue = db.getRevisionQueue();

  const progressValues = Object.values(progressMap);
  const totalAttempted = progressValues.length;
  const totalSolved = progressValues.filter((p) => p.status === 'SOLVED').length;

  // 1. Accuracy
  const accuracyRate = totalAttempted > 0 ? Math.round((totalSolved / totalAttempted) * 100) : 0;

  // 2. Independence score (average best independence of attempted problems)
  const totalIndependence = progressValues.reduce((acc, p) => acc + (p.bestIndependence || 0), 0);
  const independentSolvingRate = totalAttempted > 0 ? Math.round(totalIndependence / totalAttempted) : 100;

  // 3. Consistency (streak normalized up to 14 days)
  const streakConsistency = Math.min(Math.round((userStats.streak / 14) * 100), 100);

  // 4. Topic-wise mastery map
  const topicMasteryMap: Record<string, number> = {};
  const topicProblemCounts: Record<string, { total: number; solved: number; independenceSum: number }> = {};

  for (const t of TOPICS) {
    topicProblemCounts[t.slug] = { total: 0, solved: 0, independenceSum: 0 };
  }

  for (const p of allProblems) {
    if (!topicProblemCounts[p.topicSlug]) {
      topicProblemCounts[p.topicSlug] = { total: 0, solved: 0, independenceSum: 0 };
    }
    topicProblemCounts[p.topicSlug].total += 1;
    const prog = progressMap[p.slug];
    if (prog && prog.status === 'SOLVED') {
      topicProblemCounts[p.topicSlug].solved += 1;
      topicProblemCounts[p.topicSlug].independenceSum += prog.bestIndependence;
    }
  }

  const weakTopics: { slug: string; name: string; score: number; reason: string }[] = [];

  for (const t of TOPICS) {
    const stats = topicProblemCounts[t.slug];
    let score = 0;
    if (stats.total > 0) {
      const completionRatio = stats.solved / stats.total;
      const avgInd = stats.solved > 0 ? stats.independenceSum / stats.solved : 0;
      score = Math.round(completionRatio * 50 + (avgInd / 100) * 50);
    } else {
      score = t.level === 0 ? 95 : 10;
    }
    topicMasteryMap[t.slug] = score;

    if (stats.total > 0 && stats.solved > 0 && score < 70) {
      weakTopics.push({
        slug: t.slug,
        name: t.name,
        score,
        reason: stats.solved < stats.total ? 'Incomplete coverage of core patterns' : 'Frequently required progressive hints'
      });
    }
  }

  // 5. Transparent Weighted Overall Mastery Score
  // Mastery = (accuracy * 0.35) + (independence * 0.35) + (streak * 0.15) + (coverage * 0.15)
  const solvedRatio = allProblems.length > 0 ? totalSolved / allProblems.length : 0;
  const overallMastery = Math.min(
    100,
    Math.round(
      accuracyRate * 0.35 +
        independentSolvingRate * 0.35 +
        streakConsistency * 0.15 +
        solvedRatio * 100 * 0.15
    )
  );

  // 6. Generate Actionable Recommendation Cards
  const recommendations: RecommendationCard[] = [];

  // A. Check if revision items are due
  const dueRevisions = revisionQueue.filter(
    (r) => new Date(r.nextReviewDate).getTime() <= Date.now() + 24 * 3600000
  );
  if (dueRevisions.length > 0) {
    const targetRev = dueRevisions[0];
    recommendations.push({
      id: 'rec-rev-due',
      type: 'REVISION_DUE',
      title: `Spaced Revision Due: ${targetRev.problemTitle}`,
      message: `You previously required assistance or failed attempts on ${targetRev.problemTitle}. Re-solve it today to cement the pattern in memory.`,
      actionUrl: `/problems/${targetRev.problemSlug}`,
      badge: 'Spaced Repetition',
      priority: 1
    });
  }

  // B. Prerequisite check & next topic unlock
  const arraysMastery = topicMasteryMap['arrays'] || 0;
  if (arraysMastery >= 60 && (topicMasteryMap['two-pointers'] || 0) < 50) {
    recommendations.push({
      id: 'rec-prereq-ready',
      type: 'PREREQUISITE_SATISFIED',
      title: 'Ready for Two Pointers & Sliding Window',
      message: `You have demonstrated strong proficiency in Array fundamentals (${arraysMastery}% mastery). Advance to Two Pointers to solve search optimization problems.`,
      actionUrl: '/topics/two-pointers',
      badge: 'Progression Ready',
      priority: 2
    });
  }

  // C. Company Target prep recommendation
  const targetCompany = userStats.targetCompany || 'Amazon';
  const companyProblems = allProblems.filter((p) =>
    p.companies.some((c) => c.companyName.toLowerCase() === targetCompany.toLowerCase())
  );
  const unSolvedCompanyProblem = companyProblems.find((p) => progressMap[p.slug]?.status !== 'SOLVED');

  if (unSolvedCompanyProblem) {
    recommendations.push({
      id: 'rec-company-prep',
      type: 'COMPANY_TARGET',
      title: `Target MNC: ${targetCompany} High-Yield Problem`,
      message: `${targetCompany} interview evaluations frequently assess '${unSolvedCompanyProblem.title}' (${unSolvedCompanyProblem.subtopic}). Practice this pattern now.`,
      actionUrl: `/problems/${unSolvedCompanyProblem.slug}`,
      badge: `${targetCompany} Curated`,
      priority: 3
    });
  }

  return {
    overallMastery,
    accuracyRate,
    independentSolvingRate,
    streakConsistency,
    topicMasteryMap,
    weakTopics,
    recommendations
  };
}

