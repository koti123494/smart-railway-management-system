const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting DSA Placement Platform Database Seeding...');

  // 1. Create Demo User
  const demoUser = await prisma.user.upsert({
    where: { email: 'student@placementmaster.dsa' },
    update: {},
    create: {
      email: 'student@placementmaster.dsa',
      name: 'Aditya Sharma',
      role: 'STUDENT',
      xp: 450,
      streak: 5,
      profile: {
        create: {
          college: 'IIT / NIT Technology Institute',
          graduationYear: 2025,
          targetRole: 'SDE-1 / Software Development Engineer',
          targetCompany: 'Google & Amazon',
          preferredLang: 'python',
          bio: 'Final year CS student targeting product-based MNCs.'
        }
      }
    }
  });
  console.log(`✅ Demo User ready: ${demoUser.email} (XP: ${demoUser.xp})`);

  // 2. Seed Topics
  const topicsData = [
    {
      slug: 'programming-fundamentals',
      name: 'Programming Fundamentals',
      level: 0,
      levelName: 'Level 0 — Programming Fundamentals',
      orderIndex: 0,
      description: 'Variables, data types, operators, conditionals, loops, functions, basic recursion, input/output, and algorithmic complexity.',
      difficulty: 'Beginner',
      icon: 'Terminal'
    },
    {
      slug: 'time-space-complexity',
      name: 'Time & Space Complexity',
      level: 1,
      levelName: 'Level 1 — DSA Fundamentals',
      orderIndex: 1,
      description: 'Big-O, Big-Theta, Big-Omega notations, asymptotic analysis, recurrence relations, and space complexity evaluation.',
      difficulty: 'Beginner',
      icon: 'Clock'
    },
    {
      slug: 'arrays',
      name: 'Arrays',
      level: 1,
      levelName: 'Level 1 — DSA Fundamentals',
      orderIndex: 2,
      description: 'Master array traversal, prefix sums, two pointers, sliding windows, sorting-based techniques, and interview patterns.',
      difficulty: 'Easy',
      icon: 'LayoutGrid'
    },
    {
      slug: 'strings',
      name: 'Strings',
      level: 1,
      levelName: 'Level 1 — DSA Fundamentals',
      orderIndex: 3,
      description: 'String manipulation, palindromes, anagram detection, pattern matching, rolling hash, and character frequency arrays.',
      difficulty: 'Easy',
      icon: 'Type'
    },
    {
      slug: 'two-pointers',
      name: 'Two Pointers',
      level: 1,
      levelName: 'Level 1 — DSA Fundamentals',
      orderIndex: 4,
      description: 'Opposite-direction and same-direction pointer techniques to optimize O(N^2) searches into O(N) linear scans.',
      difficulty: 'Easy',
      icon: 'ArrowLeftRight'
    },
    {
      slug: 'sliding-window',
      name: 'Sliding Window',
      level: 1,
      levelName: 'Level 1 — DSA Fundamentals',
      orderIndex: 5,
      description: 'Fixed and dynamic window mechanics for optimal subarray and substring problem solving.',
      difficulty: 'Medium',
      icon: 'Maximize2'
    },
    {
      slug: 'hashing',
      name: 'Hashing & HashMaps',
      level: 1,
      levelName: 'Level 1 — DSA Fundamentals',
      orderIndex: 6,
      description: 'O(1) lookups, hash collision handling, HashSet, HashMap, and frequency mapping in interview questions.',
      difficulty: 'Easy',
      icon: 'Hash'
    },
    {
      slug: 'linked-lists',
      name: 'Linked Lists',
      level: 2,
      levelName: 'Level 2 — Core Data Structures',
      orderIndex: 7,
      description: 'Singly linked lists, doubly linked lists, circular lists, dummy heads, and pointer reconnection mastery.',
      difficulty: 'Medium',
      icon: 'GitCommit'
    },
    {
      slug: 'stacks-queues',
      name: 'Stacks & Queues',
      level: 2,
      levelName: 'Level 2 — Core Data Structures',
      orderIndex: 8,
      description: 'LIFO and FIFO data structures, Monotonic Stack, Circular Queues, Deque, and bracket/histogram problems.',
      difficulty: 'Medium',
      icon: 'Layers'
    },
    {
      slug: 'trees',
      name: 'Trees & Binary Search Trees',
      level: 2,
      levelName: 'Level 2 — Core Data Structures',
      orderIndex: 9,
      description: 'Binary trees, BST properties, DFS traversals (Inorder, Preorder, Postorder), BFS level order, and LCA.',
      difficulty: 'Medium',
      icon: 'GitBranch'
    },
    {
      slug: 'heaps',
      name: 'Heaps & Priority Queues',
      level: 2,
      levelName: 'Level 2 — Core Data Structures',
      orderIndex: 10,
      description: 'Min-heaps, max-heaps, priority queue operations, top-K element patterns, and median streams.',
      difficulty: 'Medium',
      icon: 'Filter'
    },
    {
      slug: 'binary-search',
      name: 'Binary Search',
      level: 3,
      levelName: 'Level 3 — Core Algorithms',
      orderIndex: 11,
      description: 'Standard binary search, search on answers / monotonic predicates, rotated sorted arrays, and matrix search.',
      difficulty: 'Medium',
      icon: 'Search'
    },
    {
      slug: 'recursion-backtracking',
      name: 'Recursion & Backtracking',
      level: 3,
      levelName: 'Level 3 — Core Algorithms',
      orderIndex: 12,
      description: 'State space tree exploration, combinations, permutations, subsets, pruning, and constraint satisfaction.',
      difficulty: 'Medium',
      icon: 'RotateCcw'
    },
    {
      slug: 'dynamic-programming',
      name: 'Dynamic Programming',
      level: 5,
      levelName: 'Level 5 — Advanced Algorithms',
      orderIndex: 13,
      description: 'Optimal substructure, overlapping subproblems, memoization vs tabulation, 1D/2D DP, Knapsack, LCS, and interval DP.',
      difficulty: 'Hard',
      icon: 'Cpu'
    },
    {
      slug: 'graphs',
      name: 'Graphs & Graph Algorithms',
      level: 4,
      levelName: 'Level 4 — Advanced Data Structures & Algorithms',
      orderIndex: 14,
      description: 'Adjacency list/matrix, BFS, DFS, cycle detection, Topological Sort (Kahn), Dijkstra shortest path, Disjoint Set Union.',
      difficulty: 'Hard',
      icon: 'Network'
    }
  ];

  const topicMap = {};
  for (const t of topicsData) {
    const topic = await prisma.topic.upsert({
      where: { slug: t.slug },
      update: t,
      create: t
    });
    topicMap[t.slug] = topic.id;
  }
  console.log(`✅ Seeded ${topicsData.length} Topics.`);

  // 3. Seed Companies
  const companiesData = [
    {
      slug: 'google',
      name: 'Google',
      tier: 'Tier 1 / MAANG',
      description: 'Algorithmic rigor, graph algorithms, and dynamic programming optimization.'
    },
    {
      slug: 'amazon',
      name: 'Amazon',
      tier: 'Tier 1 / MAANG',
      description: 'High emphasis on tree manipulations, sliding window, and two pointer patterns.'
    },
    {
      slug: 'microsoft',
      name: 'Microsoft',
      tier: 'Tier 1 / Big Tech',
      description: 'Strong focus on clean tree traversals, string parsing, and linked lists.'
    },
    {
      slug: 'meta',
      name: 'Meta',
      tier: 'Tier 1 / MAANG',
      description: 'Fast execution of optimal O(N) or O(log N) algorithms and state exploration.'
    },
    {
      slug: 'goldman-sachs',
      name: 'Goldman Sachs',
      tier: 'FinTech / Investment Banking',
      description: 'Mathematical problem solving, prefix sums, and dynamic programming.'
    },
    {
      slug: 'adobe',
      name: 'Adobe',
      tier: 'Product MNC',
      description: 'Array processing, string search algorithms, and geometry/matrix puzzles.'
    },
    {
      slug: 'walmart',
      name: 'Walmart Global Tech',
      tier: 'Retail Tech / Product MNC',
      description: 'Inventory and graph shortest path optimization and knapsack variants.'
    },
    {
      slug: 'apple',
      name: 'Apple',
      tier: 'Tier 1 / MAANG',
      description: 'Low-level performance, memory-constrained traversals, and bit manipulation.'
    }
  ];

  const companyMap = {};
  for (const c of companiesData) {
    const company = await prisma.company.upsert({
      where: { slug: c.slug },
      update: c,
      create: c
    });
    companyMap[c.slug] = company.id;
  }
  console.log(`✅ Seeded ${companiesData.length} Companies.`);

  // 4. Seed Problems
  const problemsData = [
    {
      slug: 'two-sum',
      title: 'Two Sum',
      difficulty: 'Easy',
      adaptiveDifficulty: 1.1,
      topicSlug: 'arrays',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
      constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.',
      examples: JSON.stringify([
        { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] == 9' },
        { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'nums[1] + nums[2] == 6' }
      ]),
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      patterns: 'Hash Map Complement Lookup, Two Pointers',
      visualizerType: 'hash_map',
      acceptanceRate: 88.4,
      totalSubmissions: 34120,
      companies: ['google', 'amazon', 'microsoft', 'apple', 'meta', 'goldman-sachs'],
      testCases: [
        { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]', isSample: true },
        { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1,2]', isSample: true }
      ],
      hints: [
        { orderIndex: 1, title: 'Conceptual Direction', content: 'A brute force approach checks every pair using nested loops (O(N^2)). Can we store elements we have already visited in a fast data structure to find their counterpart in O(1) time?' },
        { orderIndex: 2, title: 'Key Observation', content: 'For every number x at index i, the number we need to find is complement = target - x. If complement has been seen before, we immediately have our pair!' },
        { orderIndex: 3, title: 'Algorithm & Pattern', content: 'Use a Hash Map where key is the number from the array and value is its index. In a single pass, check if target - nums[i] exists in the map.' },
        { orderIndex: 4, title: 'Pseudocode', content: 'seen = {}\nfor i, num in enumerate(nums):\n    diff = target - num\n    if diff in seen: return [seen[diff], i]\n    seen[num] = i' }
      ],
      solution: {
        title: 'One-Pass Hash Map (Optimal)',
        approach: 'One-Pass Hash Map',
        intuition: 'Store previously visited elements and their indices in a hash map for O(1) lookup.',
        algorithm: '1. Initialize hash map seen.\n2. Iterate through nums.\n3. Compute complement = target - num.\n4. If complement in seen, return [seen[complement], i].\n5. Otherwise, record seen[num] = i.',
        pseudocode: 'function twoSum(nums, target):\n    map = new Map()\n    for i in 0..len-1:\n        diff = target - nums[i]\n        if map.has(diff): return [map.get(diff), i]\n        map.set(nums[i], i)\n    return []',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        pythonCode: 'class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            diff = target - num\n            if diff in seen:\n                return [seen[diff], i]\n            seen[num] = i\n        return []',
        javaCode: 'import java.util.HashMap;\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        HashMap<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) return new int[] { map.get(diff), i };\n            map.put(nums[i], i);\n        }\n        return new int[] {};\n    }\n}',
        cppCode: '#include <vector>\n#include <unordered_map>\nclass Solution {\npublic:\n    std::vector<int> twoSum(std::vector<int>& nums, int target) {\n        std::unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); i++) {\n            int diff = target - nums[i];\n            if (seen.find(diff) != seen.end()) return {seen[diff], i};\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};',
        cCode: 'int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    *returnSize = 2;\n    int* res = (int*)malloc(2 * sizeof(int));\n    for (int i = 0; i < numsSize; i++) {\n        for (int j = i + 1; j < numsSize; j++) {\n            if (nums[i] + nums[j] == target) { res[0] = i; res[1] = j; return res; }\n        }\n    }\n    *returnSize = 0;\n    return NULL;\n}',
        jsCode: 'function twoSum(nums, target) {\n    const seen = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (seen.has(diff)) return [seen.get(diff), i];\n        seen.set(nums[i], i);\n    }\n    return [];\n}'
      }
    },
    {
      slug: 'valid-parentheses',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      adaptiveDifficulty: 1.2,
      topicSlug: 'stacks-queues',
      description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
      constraints: '1 <= s.length <= 10^4\ns consists of parentheses only \'()[]{}\'.',
      examples: JSON.stringify([
        { input: 's = "()"', output: 'true' },
        { input: 's = "()[]{}"', output: 'true' },
        { input: 's = "(]"', output: 'false' }
      ]),
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      patterns: 'LIFO Stack Bracket Matching',
      visualizerType: 'stack',
      acceptanceRate: 82.1,
      totalSubmissions: 28940,
      companies: ['amazon', 'microsoft', 'google'],
      testCases: [
        { input: 's = "()"', expectedOutput: 'true', isSample: true },
        { input: 's = "()[]{}"', expectedOutput: 'true', isSample: true },
        { input: 's = "(]"', expectedOutput: 'false', isSample: true }
      ],
      hints: [
        { orderIndex: 1, title: 'Conceptual Direction', content: 'What data structure naturally pairs the most recently opened bracket with the current closing bracket?' },
        { orderIndex: 2, title: 'Key Observation', content: 'Use a Stack. Push opening brackets. When a closing bracket arrives, verify the top of the stack matches.' },
        { orderIndex: 3, title: 'Algorithm & Pattern', content: 'If char is in map of pairs, pop and match. If not, push char. Verify stack is empty at end.' },
        { orderIndex: 4, title: 'Pseudocode', content: 'stack = []\nfor c in s:\n    if c in pairs: ...' }
      ],
      solution: {
        title: 'LIFO Stack with Matching Map',
        approach: 'Stack Matching',
        intuition: 'Innermost nested brackets must be resolved and popped first.',
        algorithm: '1. Initialize stack.\n2. Iterate through s.\n3. Push openers; for closers check and pop.',
        pseudocode: 'function isValid(s): ...',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        pythonCode: 'class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {")": "(", "}": "{", "]": "["}\n        for char in s:\n            if char in mapping:\n                top = stack.pop() if stack else "#"\n                if mapping[char] != top: return False\n            else: stack.append(char)\n        return not stack',
        javaCode: 'import java.util.Stack;\nclass Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == \'(\') stack.push(\')\');\n            else if (c == \'{\') stack.push(\'}\');\n            else if (c == \'[\') stack.push(\']\');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}',
        cppCode: '#include <stack>\n#include <string>\nclass Solution {\npublic:\n    bool isValid(std::string s) {\n        std::stack<char> st;\n        for (char c : s) {\n            if (c == \'(\') st.push(\')\');\n            else if (c == \'{\') st.push(\'}\');\n            else if (c == \'[\') st.push(\']\');\n            else {\n                if (st.empty() || st.top() != c) return false;\n                st.pop();\n            }\n        }\n        return st.empty();\n    }\n};',
        cCode: 'bool isValid(char* s) { ... }',
        jsCode: 'function isValid(s) {\n    const stack = [];\n    const map = { ")": "(", "}": "{", "]": "[" };\n    for (const c of s) {\n        if (map[c]) {\n            if (!stack.length || stack.pop() !== map[c]) return false;\n        } else stack.push(c);\n    }\n    return stack.length === 0;\n}'
      }
    },
    {
      slug: 'coin-change',
      title: 'Coin Change',
      difficulty: 'Medium',
      adaptiveDifficulty: 2.8,
      topicSlug: 'dynamic-programming',
      description: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount.',
      constraints: '1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4',
      examples: JSON.stringify([
        { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
        { input: 'coins = [2], amount = 3', output: '-1' }
      ]),
      timeComplexity: 'O(amount * coins.length)',
      spaceComplexity: 'O(amount)',
      patterns: '1D DP Tabulation, Unbounded Knapsack',
      visualizerType: 'dp_table',
      acceptanceRate: 68.5,
      totalSubmissions: 22100,
      companies: ['amazon', 'goldman-sachs', 'walmart'],
      testCases: [
        { input: 'coins = [1,2,5], amount = 11', expectedOutput: '3', isSample: true },
        { input: 'coins = [2], amount = 3', expectedOutput: '-1', isSample: true }
      ],
      hints: [
        { orderIndex: 1, title: 'Conceptual Direction', content: 'Why does Greedy fail? If coins=[1,3,4] and amount=6, greedy takes 4+1+1 (3 coins) while optimal is 3+3 (2 coins).' },
        { orderIndex: 2, title: 'Key Observation', content: 'Let dp[i] be the fewest coins for amount i. dp[i] = min(dp[i - c] + 1) for all c in coins.' },
        { orderIndex: 3, title: 'Algorithm & Pattern', content: 'Initialize dp array of size amount + 1 with INF. Base case dp[0] = 0.' },
        { orderIndex: 4, title: 'Pseudocode', content: 'dp = [inf]*(amount+1)\ndp[0] = 0\nfor i in 1..amount:\n  for c in coins: ...' }
      ],
      solution: {
        title: 'Bottom-Up 1D Tabulation',
        approach: '1D Dynamic Programming',
        intuition: 'Compute minimal coins for smaller amounts iteratively.',
        algorithm: '1. Create dp array size amount+1.\n2. Fill with amount + 1.\n3. dp[0] = 0.\n4. Iterate amounts and coins.',
        pseudocode: 'function coinChange(coins, amount): ...',
        timeComplexity: 'O(amount * coins.length)',
        spaceComplexity: 'O(amount)',
        pythonCode: 'class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        dp = [float(\"inf\")] * (amount + 1)\n        dp[0] = 0\n        for i in range(1, amount + 1):\n            for coin in coins:\n                if i - coin >= 0:\n                    dp[i] = min(dp[i], dp[i - coin] + 1)\n        return dp[amount] if dp[amount] != float(\"inf\") else -1',
        javaCode: 'class Solution { ... }',
        cppCode: 'class Solution { ... }',
        cCode: 'int coinChange(int* coins, int coinsSize, int amount) { ... }',
        jsCode: 'function coinChange(coins, amount) { ... }'
      }
    }
  ];

  for (const p of problemsData) {
    const topicId = topicMap[p.topicSlug];
    const problem = await prisma.problem.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        difficulty: p.difficulty,
        adaptiveDifficulty: p.adaptiveDifficulty,
        description: p.description,
        constraints: p.constraints,
        examples: p.examples,
        timeComplexity: p.timeComplexity,
        spaceComplexity: p.spaceComplexity,
        patterns: p.patterns,
        visualizerType: p.visualizerType,
        acceptanceRate: p.acceptanceRate,
        totalSubmissions: p.totalSubmissions
      },
      create: {
        slug: p.slug,
        title: p.title,
        difficulty: p.difficulty,
        adaptiveDifficulty: p.adaptiveDifficulty,
        description: p.description,
        constraints: p.constraints,
        examples: p.examples,
        timeComplexity: p.timeComplexity,
        spaceComplexity: p.spaceComplexity,
        patterns: p.patterns,
        visualizerType: p.visualizerType,
        acceptanceRate: p.acceptanceRate,
        totalSubmissions: p.totalSubmissions
      }
    });

    // Link Topic
    if (topicId) {
      await prisma.problemTopic.upsert({
        where: {
          problemId_topicId: {
            problemId: problem.id,
            topicId: topicId
          }
        },
        update: {},
        create: {
          problemId: problem.id,
          topicId: topicId
        }
      });
    }

    // Link Companies
    for (const cSlug of p.companies) {
      const companyId = companyMap[cSlug];
      if (companyId) {
        await prisma.problemCompany.upsert({
          where: {
            problemId_companyId: {
              problemId: problem.id,
              companyId: companyId
            }
          },
          update: {},
          create: {
            problemId: problem.id,
            companyId: companyId,
            interviewPeriod: '2023-2024',
            source: 'Placement Drive Report',
            confidenceLevel: 'HIGH',
            isHistorical: true
          }
        });
      }
    }

    // Add Test Cases
    for (const tc of p.testCases) {
      await prisma.testCase.create({
        data: {
          problemId: problem.id,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          isSample: tc.isSample
        }
      });
    }

    // Add Hints
    for (const h of p.hints) {
      await prisma.hint.create({
        data: {
          problemId: problem.id,
          orderIndex: h.orderIndex,
          title: h.title,
          content: h.content
        }
      });
    }

    // Add Solution
    const sol = await prisma.solution.create({
      data: {
        problemId: problem.id,
        title: p.solution.title,
        approach: p.solution.approach,
        intuition: p.solution.intuition,
        algorithm: p.solution.algorithm,
        pseudocode: p.solution.pseudocode,
        timeComplexity: p.solution.timeComplexity,
        spaceComplexity: p.solution.spaceComplexity
      }
    });

    if (p.solution.pythonCode) {
      await prisma.solutionLanguage.create({
        data: {
          solutionId: sol.id,
          language: 'python',
          code: p.solution.pythonCode
        }
      });
    }
  }
  console.log(`✅ Seeded ${problemsData.length} Problems with hints, solutions, testcases, and company associations.`);

  // 5. Seed Initial User Progress
  for (const t of topicsData) {
    await prisma.userTopicProgress.upsert({
      where: {
        userId_topicId: {
          userId: demoUser.id,
          topicId: topicMap[t.slug]
        }
      },
      update: {},
      create: {
        userId: demoUser.id,
        topicId: topicMap[t.slug],
        masteryScore: t.level === 0 ? 95 : t.level === 1 ? 65 : 20,
        problemsSolved: t.level <= 1 ? 4 : 1,
        totalProblems: 6,
        status: t.level === 0 ? 'MASTERED' : t.level === 1 ? 'IN_PROGRESS' : 'AVAILABLE'
      }
    });
  }

  // 6. Seed Achievements
  const badges = [
    { code: 'ARRAY_BEGINNER', name: 'Array Beginner', description: 'Solved first 5 Array problems with high independence.', badgeIcon: 'Award' },
    { code: 'TREE_EXPLORER', name: 'Tree Explorer', description: 'Completed recursive DFS & BFS tree traversals.', badgeIcon: 'GitBranch' },
    { code: 'DP_PRACTITIONER', name: 'DP Practitioner', description: 'Mastered 1D and 2D tabulation techniques.', badgeIcon: 'Zap' },
    { code: 'INTERVIEW_READY', name: 'Interview Ready', description: 'Completed first 60-minute Mock Interview with >80% accuracy.', badgeIcon: 'Trophy' }
  ];

  for (const b of badges) {
    const ach = await prisma.achievement.upsert({
      where: { code: b.code },
      update: b,
      create: b
    });
    await prisma.userAchievement.upsert({
      where: {
        userId_achievementId: {
          userId: demoUser.id,
          achievementId: ach.id
        }
      },
      update: {},
      create: {
        userId: demoUser.id,
        achievementId: ach.id
      }
    });
  }
  console.log('✅ Seeded Achievements & Gamification Badges.');

  console.log('🚀 Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
