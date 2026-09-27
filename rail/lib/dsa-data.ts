export interface HintItem {
  id: string;
  orderIndex: number;
  title: string;
  content: string;
}

export interface SolutionLanguageItem {
  language: 'python' | 'python3' | 'java' | 'cpp' | 'c' | 'javascript';
  code: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  approach: string;
  intuition: string;
  algorithm: string;
  pseudocode: string;
  timeComplexity: string;
  spaceComplexity: string;
  dryRun?: string;
  commonMistakes?: string;
  alternatives?: string;
  languages: SolutionLanguageItem[];
}

export interface TestCaseItem {
  id: string;
  input: string;
  expectedOutput: string;
  isSample: boolean;
  explanation?: string;
}

export interface VisualizerStep {
  step: number;
  description: string;
  variables: Record<string, any>;
  pointers?: { name: string; index: number; color?: string }[];
  highlightIndices?: number[];
  secondaryHighlight?: number[];
  arrayState?: (number | string)[];
  hashMapState?: Record<string, any>;
  stackState?: (string | number)[];
  dpTableState?: (number | string)[][];
  treeActiveNode?: string | number;
}

export interface ProblemCompanyTag {
  companySlug: string;
  companyName: string;
  interviewPeriod: string;
  source: string;
  confidenceLevel: 'HIGH' | 'MEDIUM' | 'COMMUNITY_REPORTED';
  isHistorical: boolean;
}

export interface ProblemItem {
  id: string;
  slug: string;
  title: string;
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Expert';
  adaptiveDifficulty: number;
  topicSlug: string;
  subtopic: string;
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  timeComplexity: string;
  spaceComplexity: string;
  patterns: string[];
  commonMistakes: string[];
  prerequisites: string[];
  visualizerType?: 'array_two_pointer' | 'hash_map' | 'sliding_window' | 'stack' | 'tree' | 'dp_table';
  visualizerSteps?: VisualizerStep[];
  companies: ProblemCompanyTag[];
  hints: HintItem[];
  solutions: SolutionItem[];
  testCases: TestCaseItem[];
  acceptanceRate: number;
  totalSubmissions: number;
}

export interface TopicItem {
  slug: string;
  name: string;
  level: number;
  levelName: string;
  orderIndex: number;
  description: string;
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Expert';
  icon: string;
  prerequisites: string[];
  leadsTo: string[];
  patterns: string[];
  commonMistakes: string[];
  recommendedSequence: string[];
}

export interface CompanyItem {
  slug: string;
  name: string;
  tier: string;
  description: string;
  verifiedReports: number;
  lastUpdated: string;
  curatedProblemSlugs: string[];
  frequentTopics: string[];
  interviewPatterns: string[];
  historicalDisclaimer: string;
  sources: { name: string; url?: string; count: number }[];
}

// TOPICS DATA
export const TOPICS: TopicItem[] = [
  {
    slug: 'programming-fundamentals',
    name: 'Programming Fundamentals',
    level: 0,
    levelName: 'Level 0 — Programming Fundamentals',
    orderIndex: 0,
    description: 'Variables, data types, operators, conditionals, loops, functions, basic recursion, input/output, and algorithmic complexity.',
    difficulty: 'Beginner',
    icon: 'Terminal',
    prerequisites: [],
    leadsTo: ['time-space-complexity', 'arrays', 'strings'],
    patterns: ['Nested Loops', 'Mathematical Modulation', 'Recursive Base Cases'],
    commonMistakes: ['Off-by-one errors in loops', 'Integer overflow', 'Missing recursive termination condition'],
    recommendedSequence: ['Variables & Types', 'Control Flow', 'Functions', 'Recursion Intro', 'Big-O Basics']
  },
  {
    slug: 'time-space-complexity',
    name: 'Time & Space Complexity',
    level: 1,
    levelName: 'Level 1 — DSA Fundamentals',
    orderIndex: 1,
    description: 'Big-O, Big-Theta, Big-Omega notations, asymptotic analysis, recurrence relations, and space complexity evaluation.',
    difficulty: 'Beginner',
    icon: 'Clock',
    prerequisites: ['programming-fundamentals'],
    leadsTo: ['arrays', 'searching-sorting'],
    patterns: ['Amortized Analysis', 'Master Theorem', 'Logarithmic Growth'],
    commonMistakes: ['Confusing average case with worst case', 'Ignoring auxiliary stack space in recursion'],
    recommendedSequence: ['Big-O Definition', 'Loop Analysis', 'Logarithmic Complexity', 'Recursive Call Stacks']
  },
  {
    slug: 'arrays',
    name: 'Arrays',
    level: 1,
    levelName: 'Level 1 — DSA Fundamentals',
    orderIndex: 2,
    description: 'Master array traversal, prefix sums, two pointers, sliding windows, sorting-based techniques, and interview patterns.',
    difficulty: 'Easy',
    icon: 'LayoutGrid',
    prerequisites: ['programming-fundamentals', 'time-space-complexity'],
    leadsTo: ['two-pointers', 'sliding-window', 'hashing', 'binary-search', 'dynamic-programming'],
    patterns: ['Two Pointers', 'Prefix Sum', 'Sliding Window', 'In-place Rotation', 'Dutch National Flag'],
    commonMistakes: ['Modifying array while iterating without index tracking', 'Out of bounds indexing', 'Excessive copy overhead'],
    recommendedSequence: ['Linear Traversal', 'Prefix Sums', 'Two Pointers', 'Subarrays & Kadane', 'Matrix Operations']
  },
  {
    slug: 'strings',
    name: 'Strings',
    level: 1,
    levelName: 'Level 1 — DSA Fundamentals',
    orderIndex: 3,
    description: 'String manipulation, palindromes, anagram detection, pattern matching, rolling hash, and character frequency arrays.',
    difficulty: 'Easy',
    icon: 'Type',
    prerequisites: ['arrays'],
    leadsTo: ['hashing', 'sliding-window', 'tries', 'string-algorithms'],
    patterns: ['Character Count Hashing', 'Two Pointers from Ends', 'Sliding Window Substring', 'Palindromic Expansion'],
    commonMistakes: ['String immutability performance penalties', 'Case sensitivity pitfalls', 'Unicode character boundaries'],
    recommendedSequence: ['ASCII/Frequency Mapping', 'Reversal & Palindromes', 'Anagrams', 'Substrings']
  },
  {
    slug: 'two-pointers',
    name: 'Two Pointers',
    level: 1,
    levelName: 'Level 1 — DSA Fundamentals',
    orderIndex: 4,
    description: 'Opposite-direction and same-direction pointer techniques to optimize O(N^2) searches into O(N) linear scans.',
    difficulty: 'Easy',
    icon: 'ArrowLeftRight',
    prerequisites: ['arrays', 'searching-sorting'],
    leadsTo: ['sliding-window', 'linked-lists', 'binary-search'],
    patterns: ['Collision Pointers (Left & Right)', 'Fast & Slow Pointers', 'Partitioning (QuickSelect)'],
    commonMistakes: ['Pointer crossover conditions', 'Skipping duplicate values incorrectly', 'Infinite while loops'],
    recommendedSequence: ['Sorted Pair Sum', 'Trapping Rain Water intuition', 'Fast/Slow Cycle Detection']
  },
  {
    slug: 'sliding-window',
    name: 'Sliding Window',
    level: 1,
    levelName: 'Level 1 — DSA Fundamentals',
    orderIndex: 5,
    description: 'Fixed and dynamic window mechanics for optimal subarray and substring problem solving.',
    difficulty: 'Medium',
    icon: 'Maximize2',
    prerequisites: ['arrays', 'strings', 'two-pointers'],
    leadsTo: ['dynamic-programming', 'greedy'],
    patterns: ['Fixed Size Window', 'Dynamic Size Window with Shrink Condition', 'Frequency Map Window Tracking'],
    commonMistakes: ['Not shrinking left boundary when condition fails', 'Incorrect window size calculation (R - L + 1)'],
    recommendedSequence: ['Max Subarray of Size K', 'Longest Substring Without Repeating', 'Minimum Window Substring']
  },
  {
    slug: 'hashing',
    name: 'Hashing & HashMaps',
    level: 1,
    levelName: 'Level 1 — DSA Fundamentals',
    orderIndex: 6,
    description: 'O(1) lookups, hash collision handling, HashSet, HashMap, and frequency mapping in interview questions.',
    difficulty: 'Easy',
    icon: 'Hash',
    prerequisites: ['arrays', 'strings'],
    leadsTo: ['trees', 'graphs', 'lru-cache'],
    patterns: ['Complement Lookup', 'Frequency Bucket Sort', 'Subarray Sum Equals K (Prefix + Map)'],
    commonMistakes: ['Ignoring hash collisions / worst case O(N)', 'Modifying keys while stored in Set/Map'],
    recommendedSequence: ['Direct Access Tables', 'Two Sum Complement', 'Group Anagrams', 'Prefix Sum with HashMap']
  },
  {
    slug: 'linked-lists',
    name: 'Linked Lists',
    level: 2,
    levelName: 'Level 2 — Core Data Structures',
    orderIndex: 7,
    description: 'Singly linked lists, doubly linked lists, circular lists, dummy heads, and pointer reconnection mastery.',
    difficulty: 'Medium',
    icon: 'GitCommit',
    prerequisites: ['programming-fundamentals', 'two-pointers'],
    leadsTo: ['stacks-queues', 'trees', 'lru-cache'],
    patterns: ['Dummy Sentinel Node', 'Tortoise and Hare (Fast/Slow)', 'In-place Pointer Reversal'],
    commonMistakes: ['Losing reference before pointer reassignment', 'Null pointer dereference at tail or head', 'Creating cycles unintentionally'],
    recommendedSequence: ['Traversal & Insertion', 'In-place Reversal', 'Cycle Detection', 'Merge Sorted Lists', 'LRU Cache Integration']
  },
  {
    slug: 'stacks-queues',
    name: 'Stacks & Queues',
    level: 2,
    levelName: 'Level 2 — Core Data Structures',
    orderIndex: 8,
    description: 'LIFO and FIFO data structures, Monotonic Stack, Circular Queues, Deque, and bracket/histogram problems.',
    difficulty: 'Medium',
    icon: 'Layers',
    prerequisites: ['arrays', 'linked-lists'],
    leadsTo: ['trees', 'graphs', 'monotonic-queue'],
    patterns: ['Monotonic Increasing/Decreasing Stack', 'Parenthesis Matching', 'BFS Level-order Queue'],
    commonMistakes: ['Popping from empty stack', 'Not clearing stale elements in monotonic stack', 'Confusing enqueue/dequeue orders'],
    recommendedSequence: ['Valid Parentheses', 'Min Stack', 'Daily Temperatures', 'Largest Rectangle in Histogram']
  },
  {
    slug: 'trees',
    name: 'Trees & Binary Search Trees',
    level: 2,
    levelName: 'Level 2 — Core Data Structures',
    orderIndex: 9,
    description: 'Binary trees, BST properties, DFS traversals (Inorder, Preorder, Postorder), BFS level order, and LCA.',
    difficulty: 'Medium',
    icon: 'GitBranch',
    prerequisites: ['recursion', 'stacks-queues'],
    leadsTo: ['heaps', 'graphs', 'tries', 'segment-trees'],
    patterns: ['Recursive Tree Traversal', 'Bottom-up State Propagation', 'Level Order BFS', 'BST Inorder Sorted Property'],
    commonMistakes: ['Forgetting base case (node === null)', 'Assuming BST property holds globally with just local checks', 'Inefficient deep recursion causing stack overflow'],
    recommendedSequence: ['Inorder/Preorder/Postorder', 'Max Depth & Balance', 'Lowest Common Ancestor', 'BST Validations']
  },
  {
    slug: 'heaps',
    name: 'Heaps & Priority Queues',
    level: 2,
    levelName: 'Level 2 — Core Data Structures',
    orderIndex: 10,
    description: 'Min-heaps, max-heaps, priority queue operations, top-K element patterns, and median streams.',
    difficulty: 'Medium',
    icon: 'Filter',
    prerequisites: ['trees', 'arrays'],
    leadsTo: ['greedy', 'graph-algorithms'],
    patterns: ['Top K Elements (Min-Heap of Size K)', 'Two Heaps for Median Finding', 'Merge K Sorted Lists'],
    commonMistakes: ['Using Max-Heap when Min-Heap is needed for Top-K', 'Re-heapifying unnecessarily inside loops'],
    recommendedSequence: ['Heapify Concept', 'Kth Largest Element', 'Top K Frequent Elements', 'Find Median from Data Stream']
  },
  {
    slug: 'binary-search',
    name: 'Binary Search',
    level: 3,
    levelName: 'Level 3 — Core Algorithms',
    orderIndex: 11,
    description: 'Standard binary search, search on answers / monotonic predicates, rotated sorted arrays, and matrix search.',
    difficulty: 'Medium',
    icon: 'Search',
    prerequisites: ['arrays', 'time-space-complexity'],
    leadsTo: ['advanced-algorithms', 'greedy'],
    patterns: ['Monotonic Predicate Function', 'Search on Answer Space (Min/Max feasibility)', 'Rotated Array Pivot Detection'],
    commonMistakes: ['Integer overflow with (left + right) / 2 instead of left + (right - left) / 2', 'Infinite loop with left <= right boundary conditions', 'Incorrect answer recording'],
    recommendedSequence: ['Standard Binary Search', 'First & Last Position', 'Search in Rotated Array', 'Capacity to Ship Packages']
  },
  {
    slug: 'recursion-backtracking',
    name: 'Recursion & Backtracking',
    level: 3,
    levelName: 'Level 3 — Core Algorithms',
    orderIndex: 12,
    description: 'State space tree exploration, combinations, permutations, subsets, pruning, and constraint satisfaction.',
    difficulty: 'Medium',
    icon: 'RotateCcw',
    prerequisites: ['programming-fundamentals', 'time-space-complexity'],
    leadsTo: ['dynamic-programming', 'graphs'],
    patterns: ['Choose-Explore-Unchoose', 'Subsets with Duplicates Pruning', 'Permutation visited tracking'],
    commonMistakes: ['Forgetting to undo the choice (backtrack)', 'Sharing mutable array references without cloning', 'Incomplete pruning'],
    recommendedSequence: ['Generate Parentheses', 'Subsets & Combinations', 'Permutations', 'N-Queens / Sudoku Solver']
  },
  {
    slug: 'dynamic-programming',
    name: 'Dynamic Programming',
    level: 5,
    levelName: 'Level 5 — Advanced Algorithms',
    orderIndex: 13,
    description: 'Optimal substructure, overlapping subproblems, memoization vs tabulation, 1D/2D DP, Knapsack, LCS, and interval DP.',
    difficulty: 'Hard',
    icon: 'Cpu',
    prerequisites: ['recursion-backtracking', 'arrays'],
    leadsTo: ['advanced-dp', 'interview-prep'],
    patterns: ['1D State Transition', '0/1 and Unbounded Knapsack', 'Longest Common Subsequence Matrix', 'State Machine DP (Stock Buy/Sell)'],
    commonMistakes: ['Incorrect base case initialization in DP table', 'Off-by-one indexing between string/array and 1-indexed DP table', 'Redundant dimension in DP state'],
    recommendedSequence: ['Climbing Stairs & Fibonacci', 'Coin Change (Unbounded Knapsack)', 'Longest Increasing Subsequence', 'Edit Distance']
  },
  {
    slug: 'graphs',
    name: 'Graphs & Graph Algorithms',
    level: 4,
    levelName: 'Level 4 — Advanced Data Structures & Algorithms',
    orderIndex: 14,
    description: 'Adjacency list/matrix, BFS, DFS, cycle detection, Topological Sort (Kahn), Dijkstra shortest path, Disjoint Set Union.',
    difficulty: 'Hard',
    icon: 'Network',
    prerequisites: ['stacks-queues', 'trees', 'recursion-backtracking'],
    leadsTo: ['advanced-graph', 'interview-prep'],
    patterns: ['Grid Traversal (4-directional DFS/BFS)', 'Cycle Detection in Directed Graphs', 'Topological Sort for Dependencies', 'DSU Connected Components'],
    commonMistakes: ['Marking visited after queue pop instead of on queue push (causes duplicate visits)', 'Infinite recursion in cyclic undirected graphs'],
    recommendedSequence: ['Number of Islands', 'Clone Graph', 'Course Schedule (Topological Sort)', 'Network Delay Time (Dijkstra)']
  }
];

export const COMPANIES: CompanyItem[] = [
  {
    slug: 'google',
    name: 'Google',
    tier: 'Tier 1 / MAANG',
    description: 'Engineering excellence with a heavy emphasis on algorithmic complexity, optimal space/time trade-offs, graph traversals, and dynamic programming.',
    verifiedReports: 142,
    lastUpdated: '2024-Q3',
    curatedProblemSlugs: ['two-sum', 'longest-substring-without-repeating-characters', 'number-of-islands', 'trapping-rain-water', 'climbing-stairs'],
    frequentTopics: ['graphs', 'dynamic-programming', 'trees', 'arrays'],
    interviewPatterns: ['DFS/BFS on Graphs & Grids', 'Topological Sorting', 'Binary Search on Feasibility', 'Trie & String Autocomplete'],
    historicalDisclaimer: 'Historical interview observations derived from public placement records and verified candidate reports. Not guaranteed questions for upcoming hiring rounds.',
    sources: [
      { name: 'Placement Drive Candidate Debriefs 2023-2024', count: 85 },
      { name: 'Campus Placement SDE-1 Hiring Reports', count: 57 }
    ]
  },
  {
    slug: 'amazon',
    name: 'Amazon',
    tier: 'Tier 1 / MAANG',
    description: 'Practical data structures, sliding window, tree manipulations, and hash maps aligned with high-scale e-commerce and cloud service challenges.',
    verifiedReports: 218,
    lastUpdated: '2024-Q4',
    curatedProblemSlugs: ['two-sum', 'valid-parentheses', 'longest-substring-without-repeating-characters', 'reverse-linked-list', 'coin-change', 'kth-largest-element-in-an-array'],
    frequentTopics: ['arrays', 'sliding-window', 'trees', 'stacks-queues', 'heaps'],
    interviewPatterns: ['Sliding Window for Log Windows', 'Monotonic Stack for Histogram/Stock Trends', 'Two Pointers', 'Top K Aggregations'],
    historicalDisclaimer: 'Historical interview data provided for educational benchmarking. Amazon interviewers evaluate leadership principles alongside data structure problem solving.',
    sources: [
      { name: 'University Placement Assessment Archives', count: 124 },
      { name: 'Off-Campus SDE-1 Candidate Logs', count: 94 }
    ]
  },
  {
    slug: 'microsoft',
    name: 'Microsoft',
    tier: 'Tier 1 / Big Tech',
    description: 'Strong focus on core clean code, tree traversals, string parsing, linked lists, and balanced recursive vs iterative implementations.',
    verifiedReports: 165,
    lastUpdated: '2024-Q3',
    curatedProblemSlugs: ['two-sum', 'valid-parentheses', 'reverse-linked-list', 'binary-tree-inorder-traversal', 'number-of-islands'],
    frequentTopics: ['trees', 'linked-lists', 'strings', 'recursion-backtracking'],
    interviewPatterns: ['Tree Serialization & LCA', 'Pointer Reversal in Linked Lists', 'Matrix Rotations', 'DFS on Connected Components'],
    historicalDisclaimer: 'Data compiled from historical campus drives and hiring events. Interview patterns are indicative only.',
    sources: [
      { name: 'Campus Placement Reports', count: 98 },
      { name: 'Technical Interview Debrief Archive', count: 67 }
    ]
  },
  {
    slug: 'meta',
    name: 'Meta',
    tier: 'Tier 1 / MAANG',
    description: 'High-speed problem solving requiring bug-free O(N) or O(log N) optimal implementations, deep recursion, tree transformations, and graph search.',
    verifiedReports: 130,
    lastUpdated: '2024-Q3',
    curatedProblemSlugs: ['two-sum', 'valid-parentheses', 'longest-substring-without-repeating-characters', 'kth-largest-element-in-an-array'],
    frequentTopics: ['arrays', 'binary-search', 'trees', 'heaps'],
    interviewPatterns: ['Two Pointers on Subarrays', 'Binary Search on Answers', 'Quickselect / Heaps', 'Graph Connected Components'],
    historicalDisclaimer: 'Historical interview references based on verified candidate submissions.',
    sources: [
      { name: 'SDE Technical Interview Reports', count: 80 },
      { name: 'Graduate Hiring Assessments', count: 50 }
    ]
  },
  {
    slug: 'goldman-sachs',
    name: 'Goldman Sachs',
    tier: 'FinTech / Investment Banking',
    description: 'Heavy algorithmic mathematics, array manipulation, prefix sums, string encoding, dynamic programming, and high-performance data structures.',
    verifiedReports: 112,
    lastUpdated: '2024-Q2',
    curatedProblemSlugs: ['two-sum', 'coin-change', 'trapping-rain-water', 'climbing-stairs'],
    frequentTopics: ['arrays', 'dynamic-programming', 'two-pointers'],
    interviewPatterns: ['Prefix Sum Ranges', 'Knapsack Variations', 'Dynamic Programming for Min/Max Cost', 'String Encoding & Compression'],
    historicalDisclaimer: 'Historical placement drive information. Quantitative aptitude and precision are prioritized.',
    sources: [
      { name: 'Engineering Campus Placement Drive Reports', count: 72 },
      { name: 'Analyst Technical Assessment Submissions', count: 40 }
    ]
  },
  {
    slug: 'adobe',
    name: 'Adobe',
    tier: 'Product MNC',
    description: 'Classic algorithmic puzzles, dynamic programming, geometry/matrix manipulation, and string search algorithms.',
    verifiedReports: 94,
    lastUpdated: '2024-Q3',
    curatedProblemSlugs: ['two-sum', 'valid-parentheses', 'climbing-stairs', 'binary-tree-inorder-traversal'],
    frequentTopics: ['arrays', 'dynamic-programming', 'trees', 'strings'],
    interviewPatterns: ['Dynamic Programming on Grids', 'String Pattern Matching', 'Tree Symmetry & Serialization'],
    historicalDisclaimer: 'Historical candidate assessments compiled for preparation purposes.',
    sources: [
      { name: 'MNC Hiring Archive 2023-2024', count: 94 }
    ]
  },
  {
    slug: 'walmart',
    name: 'Walmart Global Tech',
    tier: 'Retail Tech / Product MNC',
    description: 'Inventory management and logistics optimization problems: Knapsack DP, Graph shortest paths, Heap top-k, and sliding windows.',
    verifiedReports: 88,
    lastUpdated: '2024-Q3',
    curatedProblemSlugs: ['coin-change', 'kth-largest-element-in-an-array', 'longest-substring-without-repeating-characters'],
    frequentTopics: ['dynamic-programming', 'heaps', 'sliding-window'],
    interviewPatterns: ['Coin Change & Knapsack', 'Sliding Window Rate Limiting', 'Top K Sellers'],
    historicalDisclaimer: 'Historical interview survey data.',
    sources: [
      { name: 'Placement Drive Records', count: 88 }
    ]
  },
  {
    slug: 'apple',
    name: 'Apple',
    tier: 'Tier 1 / MAANG',
    description: 'Low-level performance considerations, recursion, clean memory utilization, and pointer manipulation.',
    verifiedReports: 76,
    lastUpdated: '2024-Q2',
    curatedProblemSlugs: ['two-sum', 'reverse-linked-list', 'binary-tree-inorder-traversal'],
    frequentTopics: ['linked-lists', 'trees', 'arrays'],
    interviewPatterns: ['In-place Data Reorganization', 'Bit Manipulation', 'Memory-constrained Traversals'],
    historicalDisclaimer: 'Historical candidate submissions.',
    sources: [
      { name: 'Hardware & Core OS Software SDE Debriefs', count: 76 }
    ]
  }
];

// PROBLEMS DATA
export const PROBLEMS: ProblemItem[] = [
  {
    id: 'prob-two-sum',
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    adaptiveDifficulty: 1.1,
    topicSlug: 'arrays',
    subtopic: 'Hashing & Two Pointers',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.`,
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]'
      }
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    patterns: ['Hash Map Complement Lookup', 'Two Pointers (when sorted)'],
    commonMistakes: [
      'Using an element twice when nums[i] * 2 == target',
      'Using nested loops resulting in O(N^2) Time Limit Exceeded on 10^4 inputs',
      'Returning values instead of 0-based indices'
    ],
    prerequisites: ['arrays', 'hashing'],
    visualizerType: 'hash_map',
    visualizerSteps: [
      {
        step: 1,
        description: 'Initialize empty HashMap to store seen values and their indices. Target = 9.',
        variables: { target: 9, i: 0, currentVal: 2, complement: 7 },
        highlightIndices: [0],
        arrayState: [2, 7, 11, 15],
        hashMapState: {}
      },
      {
        step: 2,
        description: 'Index 0 (val = 2): Complement needed is 9 - 2 = 7. 7 is not in HashMap. Store {2: 0}.',
        variables: { target: 9, i: 0, currentVal: 2, complement: 7, found: false },
        highlightIndices: [0],
        arrayState: [2, 7, 11, 15],
        hashMapState: { '2': 0 }
      },
      {
        step: 3,
        description: 'Index 1 (val = 7): Complement needed is 9 - 7 = 2. 2 is found in HashMap at index 0!',
        variables: { target: 9, i: 1, currentVal: 7, complement: 2, found: true, resultIndices: [0, 1] },
        highlightIndices: [0, 1],
        arrayState: [2, 7, 11, 15],
        hashMapState: { '2': 0 }
      },
      {
        step: 4,
        description: 'Solution found: indices [0, 1]. Total time O(N), space O(N).',
        variables: { result: [0, 1] },
        highlightIndices: [0, 1],
        arrayState: [2, 7, 11, 15],
        hashMapState: { '2': 0, '7': 1 }
      }
    ],
    companies: [
      {
        companySlug: 'google',
        companyName: 'Google',
        interviewPeriod: '2023-2024',
        source: 'Verified Campus Assessment Report',
        confidenceLevel: 'HIGH',
        isHistorical: true
      },
      {
        companySlug: 'amazon',
        companyName: 'Amazon',
        interviewPeriod: '2023-2024',
        source: 'SDE-1 Hiring Portal Assessment',
        confidenceLevel: 'HIGH',
        isHistorical: true
      },
      {
        companySlug: 'microsoft',
        companyName: 'Microsoft',
        interviewPeriod: 'Fall 2023',
        source: 'College Placement Drive',
        confidenceLevel: 'HIGH',
        isHistorical: true
      }
    ],
    hints: [
      {
        id: 'h1',
        orderIndex: 1,
        title: 'Conceptual Direction',
        content: 'A brute force approach checks every pair using nested loops (O(N^2)). Can we store elements we have already visited in a fast data structure to find their counterpart in O(1) time?'
      },
      {
        id: 'h2',
        orderIndex: 2,
        title: 'Key Observation',
        content: 'For every number x at index i, the number we need to find is `complement = target - x`. If `complement` has been seen before, we immediately have our pair!'
      },
      {
        id: 'h3',
        orderIndex: 3,
        title: 'Algorithm & Pattern',
        content: 'Use a Hash Map where the key is the number from the array and the value is its index. In a single pass, check if `target - nums[i]` exists in the map. If it does, return `[map[target - nums[i]], i]`. If not, insert `nums[i]: i`.'
      },
      {
        id: 'h4',
        orderIndex: 4,
        title: 'Pseudocode Walkthrough',
        content: `seen = {}\nfor i, num in enumerate(nums):\n    diff = target - num\n    if diff in seen:\n        return [seen[diff], i]\n    seen[num] = i`
      }
    ],
    solutions: [
      {
        id: 'sol-two-sum-hashmap',
        title: 'One-Pass Hash Map (Optimal)',
        approach: 'One-Pass Hash Map',
        intuition: 'Instead of searching for the complement across the entire array for each element (which causes O(N^2) complexity), maintain a lookup hash table of elements seen so far. Since hash table lookup takes O(1) average time, we can inspect each element exactly once.',
        algorithm: '1. Create an empty hash map `seen`.\n2. Iterate through `nums` with index `i` and element `num`.\n3. Compute `complement = target - num`.\n4. If `complement` exists in `seen`, return `[seen[complement], i]`.\n5. Otherwise, store `seen[num] = i`.\n6. Continue until a pair is found.',
        pseudocode: 'function twoSum(nums, target):\n    map = new Map()\n    for i from 0 to nums.length - 1:\n        diff = target - nums[i]\n        if map.has(diff):\n            return [map.get(diff), i]\n        map.set(nums[i], i)\n    return []',
        timeComplexity: 'O(N) — We traverse the list containing N elements exactly once. Each lookup in the table costs only O(1) time.',
        spaceComplexity: 'O(N) — The extra space required depends on the number of items stored in the hash table, which stores at most N elements.',
        dryRun: 'For nums = [2, 7, 11, 15], target = 9:\n- i=0, num=2, diff=7. Map is empty. Put 2 -> 0.\n- i=1, num=7, diff=2. 2 is in Map at index 0. Return [0, 1].',
        commonMistakes: 'Storing elements before checking can accidentally pair a number with itself if target = 2 * nums[i]. Doing the check before insertion eliminates this bug.',
        alternatives: 'Two Pointers approach: If the array is sorted, we can use two pointers from left and right in O(N) time and O(1) extra space. However, sorting takes O(N log N) time and would scramble the original indices.',
        languages: [
          {
            language: 'python',
            code: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            diff = target - num\n            if diff in seen:\n                return [seen[diff], i]\n            seen[num] = i\n        return []`
          },
          {
            language: 'python3',
            code: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            diff = target - num\n            if diff in seen:\n                return [seen[diff], i]\n            seen[num] = i\n        return []`
          },
          {
            language: 'java',
            code: `import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) {\n                return new int[] { map.get(diff), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[] {};\n    }\n}`
          },
          {
            language: 'cpp',
            code: `#include <vector>\n#include <unordered_map>\n\nclass Solution {\npublic:\n    std::vector<int> twoSum(std::vector<int>& nums, int target) {\n        std::unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); i++) {\n            int diff = target - nums[i];\n            if (seen.find(diff) != seen.end()) {\n                return {seen[diff], i};\n            }\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};`
          },
          {
            language: 'c',
            code: `/**\n * Note: The returned array must be malloced, assume caller calls free().\n */\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    *returnSize = 2;\n    int* result = (int*)malloc(2 * sizeof(int));\n    for (int i = 0; i < numsSize; i++) {\n        for (int j = i + 1; j < numsSize; j++) {\n            if (nums[i] + nums[j] == target) {\n                result[0] = i;\n                result[1] = j;\n                return result;\n            }\n        }\n    }\n    *returnSize = 0;\n    return NULL;\n}`
          },
          {
            language: 'javascript',
            code: `function twoSum(nums, target) {\n    const seen = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (seen.has(diff)) {\n            return [seen.get(diff), i];\n        }\n        seen.set(nums[i], i);\n    }\n    return [];\n}`
          }
        ]
      }
    ],
    testCases: [
      {
        id: 'tc1',
        input: 'nums = [2,7,11,15], target = 9',
        expectedOutput: '[0,1]',
        isSample: true,
        explanation: 'nums[0] + nums[1] = 2 + 7 = 9'
      },
      {
        id: 'tc2',
        input: 'nums = [3,2,4], target = 6',
        expectedOutput: '[1,2]',
        isSample: true,
        explanation: 'nums[1] + nums[2] = 2 + 4 = 6'
      },
      {
        id: 'tc3',
        input: 'nums = [3,3], target = 6',
        expectedOutput: '[0,1]',
        isSample: true,
        explanation: 'nums[0] + nums[1] = 3 + 3 = 6'
      }
    ],
    acceptanceRate: 88.4,
    totalSubmissions: 34120
  },
  {
    id: 'prob-valid-parentheses',
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    adaptiveDifficulty: 1.2,
    topicSlug: 'stacks-queues',
    subtopic: 'Stack LIFO Ordering',
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.`,
    constraints: [
      '1 <= s.length <= 10^4',
      "s consists of parentheses only '()[]{}'."
    ],
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
      { input: 's = "([])"', output: 'true' }
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    patterns: ['Monotonic / Bracket Stack', 'Matching Map Table'],
    commonMistakes: [
      'Popping an empty stack when starting with a closing bracket like ")"',
      'Forgetting to verify the stack is completely empty at the end (e.g. s = "(")',
      'Matching incorrect bracket types'
    ],
    prerequisites: ['stacks-queues', 'strings'],
    visualizerType: 'stack',
    visualizerSteps: [
      {
        step: 1,
        description: 'Initialize empty stack for s = "([{}])".',
        variables: { s: '([{}])', i: 0, char: '(' },
        stackState: []
      },
      {
        step: 2,
        description: 'Encounter "(": Push to stack.',
        variables: { i: 0, char: '(', action: 'PUSH' },
        stackState: ['(']
      },
      {
        step: 3,
        description: 'Encounter "[": Push to stack.',
        variables: { i: 1, char: '[', action: 'PUSH' },
        stackState: ['(', '[']
      },
      {
        step: 4,
        description: 'Encounter "{": Push to stack.',
        variables: { i: 2, char: '{', action: 'PUSH' },
        stackState: ['(', '[', '{']
      },
      {
        step: 5,
        description: 'Encounter "}": Top of stack is "{" which matches! Pop "{" from stack.',
        variables: { i: 3, char: '}', popped: '{', match: true },
        stackState: ['(', '[']
      },
      {
        step: 6,
        description: 'Encounter "]": Top of stack is "[" which matches! Pop "[" from stack.',
        variables: { i: 4, char: ']', popped: '[', match: true },
        stackState: ['(']
      },
      {
        step: 7,
        description: 'Encounter ")": Top of stack is "(" which matches! Pop "(" from stack.',
        variables: { i: 5, char: ')', popped: '(', match: true },
        stackState: []
      },
      {
        step: 8,
        description: 'Reached end of string. Stack is empty -> String is VALID (true).',
        variables: { stackLength: 0, isValid: true },
        stackState: []
      }
    ],
    companies: [
      {
        companySlug: 'amazon',
        companyName: 'Amazon',
        interviewPeriod: '2023-2024',
        source: 'SDE-1 Placement Report',
        confidenceLevel: 'HIGH',
        isHistorical: true
      },
      {
        companySlug: 'microsoft',
        companyName: 'Microsoft',
        interviewPeriod: '2024',
        source: 'Off-campus Technical Interview',
        confidenceLevel: 'HIGH',
        isHistorical: true
      },
      {
        companySlug: 'google',
        companyName: 'Google',
        interviewPeriod: '2023',
        source: 'Internship Screening Assessment',
        confidenceLevel: 'HIGH',
        isHistorical: true
      }
    ],
    hints: [
      {
        id: 'h1',
        orderIndex: 1,
        title: 'Conceptual Direction',
        content: 'When an opening bracket appears, we must wait for its matching closing bracket. The most recent opening bracket must be closed first. What data structure naturally models "Last-In, First-Out"?'
      },
      {
        id: 'h2',
        orderIndex: 2,
        title: 'Key Observation',
        content: 'Use a Stack. Push opening brackets `(`, `[`, `{`. When a closing bracket arrives, verify the top of the stack matches. If the stack is empty or the top does not match, the string is invalid.'
      },
      {
        id: 'h3',
        orderIndex: 3,
        title: 'Algorithm & Pattern',
        content: 'Map each closing bracket to its opening counterpart: `map = {")": "(", "]": "[", "}": "{"}`. Loop through characters. If char is in map, pop from stack and check match. Otherwise, push char. At the end, return `stack.length === 0`.'
      },
      {
        id: 'h4',
        orderIndex: 4,
        title: 'Pseudocode Walkthrough',
        content: `stack = []\nmap = {')': '(', ']': '[', '}': '{'}\nfor char in s:\n    if char in map:\n        top = stack.pop() if stack else '#'\n        if top != map[char]: return False\n    else:\n        stack.append(char)\nreturn len(stack) == 0`
      }
    ],
    solutions: [
      {
        id: 'sol-valid-parentheses',
        title: 'Stack with Hash Map (Optimal)',
        approach: 'LIFO Stack',
        intuition: 'Sub-problems have recursive nesting. In any valid nested structure, the innermost pair must match and cancel out first.',
        algorithm: '1. Iterate through characters of the string.\n2. Push opening brackets to stack.\n3. For closing brackets, check if stack is non-empty and top element matches.\n4. If match, pop top element; if not, return false immediately.\n5. Return true if stack is empty after scanning all characters.',
        pseudocode: 'function isValid(s):\n    stack = []\n    pairs = { ")": "(", "]": "[", "}": "{" }\n    for c in s:\n        if c in pairs:\n            if stack.isEmpty() or stack.pop() != pairs[c]: return false\n        else:\n            stack.push(c)\n    return stack.isEmpty()',
        timeComplexity: 'O(N) — Single linear scan over string of length N.',
        spaceComplexity: 'O(N) — Worst case when all brackets are opening, stack stores N characters.',
        dryRun: 'For s = "()[]{}":\n- \'(\' pushed. \')\' pops \'(\' (match).\n- \'[\' pushed. \']\' pops \'[\' (match).\n- \'{\' pushed. \'}\' pops \'{\' (match).\nStack is empty, returns true.',
        languages: [
          {
            language: 'python',
            code: `class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {")": "(", "}": "{", "]": "["}\n        for char in s:\n            if char in mapping:\n                top = stack.pop() if stack else '#'\n                if mapping[char] != top:\n                    return False\n            else:\n                stack.append(char)\n        return not stack`
          },
          {
            language: 'python3',
            code: `class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {")": "(", "}": "{", "]": "["}\n        for char in s:\n            if char in mapping:\n                top = stack.pop() if stack else '#'\n                if mapping[char] != top:\n                    return False\n            else:\n                stack.append(char)\n        return not stack`
          },
          {
            language: 'java',
            code: `import java.util.Stack;\nimport java.util.Map;\n\nclass Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}`
          },
          {
            language: 'cpp',
            code: `#include <string>\n#include <stack>\n\nclass Solution {\npublic:\n    bool isValid(std::string s) {\n        std::stack<char> st;\n        for (char c : s) {\n            if (c == '(') st.push(')');\n            else if (c == '{') st.push('}');\n            else if (c == '[') st.push(']');\n            else {\n                if (st.empty() || st.top() != c) return false;\n                st.pop();\n            }\n        }\n        return st.empty();\n    }\n};`
          },
          {
            language: 'c',
            code: `#include <stdbool.h>\n#include <string.h>\n#include <stdlib.h>\n\nbool isValid(char* s) {\n    int len = strlen(s);\n    char* stack = (char*)malloc(len);\n    int top = -1;\n    for (int i = 0; i < len; i++) {\n        char c = s[i];\n        if (c == '(' || c == '{' || c == '[') {\n            stack[++top] = c;\n        } else {\n            if (top == -1) { free(stack); return false; }\n            char open = stack[top--];\n            if ((c == ')' && open != '(') ||\n                (c == '}' && open != '{') ||\n                (c == ']' && open != '[')) {\n                free(stack);\n                return false;\n            }\n        }\n    }\n    bool result = (top == -1);\n    free(stack);\n    return result;\n}`
          },
          {
            language: 'javascript',
            code: `function isValid(s) {\n    const stack = [];\n    const map = { ')': '(', '}': '{', ']': '[' };\n    for (let i = 0; i < s.length; i++) {\n        const char = s[i];\n        if (map[char]) {\n            const top = stack.length ? stack.pop() : '#';\n            if (top !== map[char]) return false;\n        } else {\n            stack.push(char);\n        }\n    }\n    return stack.length === 0;\n}`
          }
        ]
      }
    ],
    testCases: [
      { id: 'tc1', input: 's = "()"', expectedOutput: 'true', isSample: true },
      { id: 'tc2', input: 's = "()[]{}"', expectedOutput: 'true', isSample: true },
      { id: 'tc3', input: 's = "(]"', expectedOutput: 'false', isSample: true },
      { id: 'tc4', input: 's = "([)]"', expectedOutput: 'false', isSample: false }
    ],
    acceptanceRate: 82.1,
    totalSubmissions: 28940
  },
  {
    id: 'prob-longest-substring-without-repeating-characters',
    slug: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    adaptiveDifficulty: 2.3,
    topicSlug: 'sliding-window',
    subtopic: 'Dynamic Window Invariant',
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3. Notice that "pwke" is a subsequence and not a substring.'
      }
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(min(N, M))',
    patterns: ['Sliding Window with Hash Map Index Jump', 'Set Window Shrinking'],
    commonMistakes: [
      'Moving left pointer backwards when character was seen before the current left pointer',
      'Confusing substring (contiguous) with subsequence (non-contiguous)',
      'Failing on single character strings like " "'
    ],
    prerequisites: ['sliding-window', 'hashing', 'strings'],
    visualizerType: 'sliding_window',
    visualizerSteps: [
      {
        step: 1,
        description: 'Initialize left = 0, maxLen = 0, charIndexMap = {}. String s = "abcabcbb".',
        variables: { left: 0, right: 0, maxLen: 0, currentWindow: 'a' },
        pointers: [{ name: 'L', index: 0 }, { name: 'R', index: 0 }],
        highlightIndices: [0]
      },
      {
        step: 2,
        description: 'R = 1, char = "b". "b" is unique in window. Window = "ab", maxLen = 2.',
        variables: { left: 0, right: 1, maxLen: 2, currentWindow: 'ab' },
        pointers: [{ name: 'L', index: 0 }, { name: 'R', index: 1 }],
        highlightIndices: [0, 1]
      },
      {
        step: 3,
        description: 'R = 2, char = "c". "c" is unique in window. Window = "abc", maxLen = 3.',
        variables: { left: 0, right: 2, maxLen: 3, currentWindow: 'abc' },
        pointers: [{ name: 'L', index: 0 }, { name: 'R', index: 2 }],
        highlightIndices: [0, 1, 2]
      },
      {
        step: 4,
        description: 'R = 3, char = "a". "a" was already seen at index 0. Advance L to index 1. Window = "bca", maxLen = 3.',
        variables: { left: 1, right: 3, maxLen: 3, currentWindow: 'bca' },
        pointers: [{ name: 'L', index: 1 }, { name: 'R', index: 3 }],
        highlightIndices: [1, 2, 3]
      },
      {
        step: 5,
        description: 'R = 4, char = "b". "b" seen at index 1. Advance L to 2. Window = "cab", maxLen = 3.',
        variables: { left: 2, right: 4, maxLen: 3, currentWindow: 'cab' },
        pointers: [{ name: 'L', index: 2 }, { name: 'R', index: 4 }],
        highlightIndices: [2, 3, 4]
      }
    ],
    companies: [
      {
        companySlug: 'amazon',
        companyName: 'Amazon',
        interviewPeriod: '2023-2024',
        source: 'SDE-1 Assessment Debrief',
        confidenceLevel: 'HIGH',
        isHistorical: true
      },
      {
        companySlug: 'google',
        companyName: 'Google',
        interviewPeriod: '2024',
        source: 'Campus Placement SDE Screening',
        confidenceLevel: 'HIGH',
        isHistorical: true
      }
    ],
    hints: [
      {
        id: 'h1',
        orderIndex: 1,
        title: 'Conceptual Direction',
        content: 'Check if you can slide a window across the string. If every character in the current window is distinct, expand the right pointer. If a duplicate appears, shrink from the left.'
      },
      {
        id: 'h2',
        orderIndex: 2,
        title: 'Key Observation',
        content: 'Instead of moving the left pointer one step at a time, you can store the last observed index of every character in a Map and jump `left = Math.max(left, lastSeen[char] + 1)`.'
      },
      {
        id: 'h3',
        orderIndex: 3,
        title: 'Algorithm & Pattern',
        content: 'Sliding Window + Hash Map: maintain window bounds `[left, right]`. As `right` iterates from 0 to N - 1, if `s[right]` is in map and its index >= `left`, set `left = map[s[right]] + 1`. Record `maxLen = max(maxLen, right - left + 1)`.'
      },
      {
        id: 'h4',
        orderIndex: 4,
        title: 'Pseudocode Walkthrough',
        content: `seen = {}\nleft = max_len = 0\nfor right, c in enumerate(s):\n    if c in seen and seen[c] >= left:\n        left = seen[c] + 1\n    seen[c] = right\n    max_len = max(max_len, right - left + 1)\nreturn max_len`
      }
    ],
    solutions: [
      {
        id: 'sol-longest-substring',
        title: 'Optimized Sliding Window with Index Map',
        approach: 'Sliding Window',
        intuition: 'A sliding window maintains the invariant that all characters inside `[L, R]` are distinct. When a duplicate is hit, skip past the previous duplicate directly.',
        algorithm: '1. Store character last seen indices in hash map.\n2. When s[right] exists in map at index >= left, update left to last_seen + 1.\n3. Update map with current right index.\n4. Update max_length with right - left + 1.',
        pseudocode: 'function lengthOfLongestSubstring(s):\n    map = {}\n    left = 0, maxLen = 0\n    for right from 0 to s.length - 1:\n        if s[right] in map and map[s[right]] >= left:\n            left = map[s[right]] + 1\n        map[s[right]] = right\n        maxLen = max(maxLen, right - left + 1)\n    return maxLen',
        timeComplexity: 'O(N) — right visits each character once, left only moves forward.',
        spaceComplexity: 'O(min(N, M)) — where M is the size of the character charset (e.g. 128 for ASCII).',
        languages: [
          {
            language: 'python',
            code: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        seen = {}\n        left = 0\n        max_len = 0\n        for right, char in enumerate(s):\n            if char in seen and seen[char] >= left:\n                left = seen[char] + 1\n            seen[char] = right\n            max_len = max(max_len, right - left + 1)\n        return max_len`
          },
          {
            language: 'python3',
            code: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        seen = {}\n        left = 0\n        max_len = 0\n        for right, char in enumerate(s):\n            if char in seen and seen[char] >= left:\n                left = seen[char] + 1\n            seen[char] = right\n            max_len = max(max_len, right - left + 1)\n        return max_len`
          },
          {
            language: 'java',
            code: `import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Map<Character, Integer> seen = new HashMap<>();\n        int left = 0, maxLen = 0;\n        for (int right = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n            if (seen.containsKey(c) && seen.get(c) >= left) {\n                left = seen.get(c) + 1;\n            }\n            seen.put(c, right);\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n}`
          },
          {
            language: 'cpp',
            code: `#include <string>\n#include <vector>\n#include <algorithm>\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(std::string s) {\n        std::vector<int> lastIndex(128, -1);\n        int left = 0, maxLen = 0;\n        for (int right = 0; right < s.size(); right++) {\n            if (lastIndex[s[right]] >= left) {\n                left = lastIndex[s[right]] + 1;\n            }\n            lastIndex[s[right]] = right;\n            maxLen = std::max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n};`
          },
          {
            language: 'c',
            code: `#include <string.h>\n\nint lengthOfLongestSubstring(char* s) {\n    int lastIndex[128];\n    for (int i = 0; i < 128; i++) lastIndex[i] = -1;\n    int left = 0, maxLen = 0;\n    int len = strlen(s);\n    for (int right = 0; right < len; right++) {\n        unsigned char c = (unsigned char)s[right];\n        if (lastIndex[c] >= left) {\n            left = lastIndex[c] + 1;\n        }\n        lastIndex[c] = right;\n        int current = right - left + 1;\n        if (current > maxLen) maxLen = current;\n    }\n    return maxLen;\n}`
          },
          {
            language: 'javascript',
            code: `function lengthOfLongestSubstring(s) {\n    const map = new Map();\n    let left = 0;\n    let maxLen = 0;\n    for (let right = 0; right < s.length; right++) {\n        const char = s[right];\n        if (map.has(char) && map.get(char) >= left) {\n            left = map.get(char) + 1;\n        }\n        map.set(char, right);\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`
          }
        ]
      }
    ],
    testCases: [
      { id: 'tc1', input: 's = "abcabcbb"', expectedOutput: '3', isSample: true },
      { id: 'tc2', input: 's = "bbbbb"', expectedOutput: '1', isSample: true },
      { id: 'tc3', input: 's = "pwwkew"', expectedOutput: '3', isSample: true }
    ],
    acceptanceRate: 74.2,
    totalSubmissions: 25400
  },
  {
    id: 'prob-reverse-linked-list',
    slug: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    adaptiveDifficulty: 1.1,
    topicSlug: 'linked-lists',
    subtopic: 'Pointer Inversion',
    description: `Given the \`head\` of a singly linked list, reverse the list, and return *the reversed list*.`,
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
      { input: 'head = []', output: '[]' }
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1) Iterative / O(N) Recursive',
    patterns: ['Three Pointer Iteration (prev, curr, next)', 'Recursive Head Flip'],
    commonMistakes: [
      'Losing the reference to curr.next before reassigning it',
      'Forgetting to return prev as the new head (returning curr which is null)',
      'Failing on empty list head == null'
    ],
    prerequisites: ['linked-lists'],
    companies: [
      {
        companySlug: 'amazon',
        companyName: 'Amazon',
        interviewPeriod: '2024',
        source: 'SDE-1 Technical Round',
        confidenceLevel: 'HIGH',
        isHistorical: true
      },
      {
        companySlug: 'microsoft',
        companyName: 'Microsoft',
        interviewPeriod: '2023-2024',
        source: 'Campus Recruitment Interview',
        confidenceLevel: 'HIGH',
        isHistorical: true
      },
      {
        companySlug: 'apple',
        companyName: 'Apple',
        interviewPeriod: '2023',
        source: 'Candidate Placement Debrief',
        confidenceLevel: 'HIGH',
        isHistorical: true
      }
    ],
    hints: [
      {
        id: 'h1',
        orderIndex: 1,
        title: 'Conceptual Direction',
        content: 'To reverse a singly linked list, every node\'s next pointer must point backwards to its predecessor instead of its successor.'
      },
      {
        id: 'h2',
        orderIndex: 2,
        title: 'Key Observation',
        content: 'If you overwrite `curr.next = prev`, you will lose the link to the rest of the list! Always save `next_node = curr.next` BEFORE redirecting `curr.next`.'
      },
      {
        id: 'h3',
        orderIndex: 3,
        title: 'Algorithm & Pattern',
        content: 'Maintain 3 pointers: `prev = null`, `curr = head`, `next = null`. While `curr` is not null: save `next = curr.next`, set `curr.next = prev`, advance `prev = curr`, advance `curr = next`. At the end, `prev` is the new head.'
      },
      {
        id: 'h4',
        orderIndex: 4,
        title: 'Pseudocode Walkthrough',
        content: `prev = null\ncurr = head\nwhile curr:\n    temp = curr.next\n    curr.next = prev\n    prev = curr\n    curr = temp\nreturn prev`
      }
    ],
    solutions: [
      {
        id: 'sol-reverse-list',
        title: 'Iterative 3-Pointer Reversal (Optimal O(1) Space)',
        approach: 'In-Place Pointer Manipulation',
        intuition: 'Change the direction of links one by one from left to right.',
        algorithm: '1. Initialize prev as null, curr as head.\n2. Loop while curr is not null:\n   a. nextTemp = curr.next\n   b. curr.next = prev\n   c. prev = curr\n   d. curr = nextTemp\n3. Return prev.',
        pseudocode: 'function reverseList(head):\n    prev = null\n    curr = head\n    while curr != null:\n        nextTemp = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nextTemp\n    return prev',
        timeComplexity: 'O(N) — N is the number of nodes in the list.',
        spaceComplexity: 'O(1) — No additional memory used.',
        languages: [
          {
            language: 'python',
            code: `class Solution:\n    def reverseList(self, head):\n        prev = None\n        curr = head\n        while curr:\n            next_temp = curr.next\n            curr.next = prev\n            prev = curr\n            curr = next_temp\n        return prev`
          },
          {
            language: 'python3',
            code: `class Solution:\n    def reverseList(self, head):\n        prev = None\n        curr = head\n        while curr:\n            next_temp = curr.next\n            curr.next = prev\n            prev = curr\n            curr = next_temp\n        return prev`
          },
          {
            language: 'java',
            code: `class Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        ListNode curr = head;\n        while (curr != null) {\n            ListNode nextTemp = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n}`
          },
          {
            language: 'cpp',
            code: `class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* curr = head;\n        while (curr != nullptr) {\n            ListNode* nextTemp = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n};`
          },
          {
            language: 'c',
            code: `struct ListNode* reverseList(struct ListNode* head) {\n    struct ListNode* prev = NULL;\n    struct ListNode* curr = head;\n    while (curr != NULL) {\n        struct ListNode* nextTemp = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nextTemp;\n    }\n    return prev;\n}`
          },
          {
            language: 'javascript',
            code: `function reverseList(head) {\n    let prev = null;\n    let curr = head;\n    while (curr !== null) {\n        const nextTemp = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = nextTemp;\n    }\n    return prev;\n}`
          }
        ]
      }
    ],
    testCases: [
      { id: 'tc1', input: 'head = [1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]', isSample: true },
      { id: 'tc2', input: 'head = [1,2]', expectedOutput: '[2,1]', isSample: true },
      { id: 'tc3', input: 'head = []', expectedOutput: '[]', isSample: true }
    ],
    acceptanceRate: 85.9,
    totalSubmissions: 31200
  },
  {
    id: 'prob-coin-change',
    slug: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    adaptiveDifficulty: 2.8,
    topicSlug: 'dynamic-programming',
    subtopic: 'Unbounded Knapsack & Bottom-up Tabulation',
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.\n\nReturn *the fewest number of coins that you need to make up that amount*. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.\n\nYou may assume that you have an infinite number of each kind of coin.`,
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    examples: [
      {
        input: 'coins = [1,2,5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1 (3 coins total)'
      },
      {
        input: 'coins = [2], amount = 3',
        output: '-1'
      },
      {
        input: 'coins = [1], amount = 0',
        output: '0'
      }
    ],
    timeComplexity: 'O(amount * coins.length)',
    spaceComplexity: 'O(amount)',
    patterns: ['1D DP Tabulation', 'Unbounded Knapsack Min-Cost Transition'],
    commonMistakes: [
      'Attempting a Greedy approach (choosing largest coin first). E.g. coins=[1,3,4], amount=6: Greedy picks 4+1+1 (3 coins) while DP finds 3+3 (2 coins)!',
      'Initializing DP array with 0 instead of infinity (or amount + 1)',
      'Integer overflow when adding 1 to infinity'
    ],
    prerequisites: ['dynamic-programming', 'arrays'],
    visualizerType: 'dp_table',
    visualizerSteps: [
      {
        step: 1,
        description: 'Initialize DP table of size amount + 1 (0 to 11) with INF. dp[0] = 0 (0 coins for amount 0). Coins = [1, 2, 5].',
        variables: { amount: 11, 'dp[0]': 0 },
        dpTableState: [[0, 'INF', 'INF', 'INF', 'INF', 'INF', 'INF', 'INF', 'INF', 'INF', 'INF', 'INF']]
      },
      {
        step: 2,
        description: 'For amount 1: Can take coin 1 -> dp[1] = min(INF, dp[0] + 1) = 1.',
        variables: { currentAmount: 1, coin: 1, 'dp[1]': 1 },
        dpTableState: [[0, 1, 'INF', 'INF', 'INF', 'INF', 'INF', 'INF', 'INF', 'INF', 'INF', 'INF']]
      },
      {
        step: 3,
        description: 'For amount 2: Coin 1 gives dp[1]+1=2. Coin 2 gives dp[0]+1=1. Min is 1.',
        variables: { currentAmount: 2, 'dp[2]': 1 },
        dpTableState: [[0, 1, 1, 'INF', 'INF', 'INF', 'INF', 'INF', 'INF', 'INF', 'INF', 'INF']]
      },
      {
        step: 4,
        description: 'For amount 5: Coin 5 gives dp[0]+1=1. dp[5] becomes 1.',
        variables: { currentAmount: 5, 'dp[5]': 1 },
        dpTableState: [[0, 1, 1, 2, 2, 1, 'INF', 'INF', 'INF', 'INF', 'INF', 'INF']]
      },
      {
        step: 5,
        description: 'Filling up to 11: dp[11] = min(dp[10]+1, dp[9]+1, dp[6]+1) = 1 + dp[6] = 1 + 2 = 3 (5 + 5 + 1). Result: 3.',
        variables: { currentAmount: 11, result: 3 },
        dpTableState: [[0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3]]
      }
    ],
    companies: [
      {
        companySlug: 'amazon',
        companyName: 'Amazon',
        interviewPeriod: '2023-2024',
        source: 'SDE Technical Interview',
        confidenceLevel: 'HIGH',
        isHistorical: true
      },
      {
        companySlug: 'goldman-sachs',
        companyName: 'Goldman Sachs',
        interviewPeriod: '2024',
        source: 'Quant / Systems Engineering Assessment',
        confidenceLevel: 'HIGH',
        isHistorical: true
      },
      {
        companySlug: 'walmart',
        companyName: 'Walmart Global Tech',
        interviewPeriod: 'Fall 2023',
        source: 'University Placement Hiring Round',
        confidenceLevel: 'HIGH',
        isHistorical: true
      }
    ],
    hints: [
      {
        id: 'h1',
        orderIndex: 1,
        title: 'Conceptual Direction',
        content: 'Why does Greedy fail? If coins=[1,3,4] and amount=6, greedy picks 4 then 1 then 1 (3 coins). But 3 + 3 = 6 (2 coins)! Because choices have non-local consequences, optimal substructure applies.'
      },
      {
        id: 'h2',
        orderIndex: 2,
        title: 'Key Observation',
        content: 'Let `dp[i]` be the fewest coins to make amount `i`. To make amount `i`, if you choose coin `c`, you need `1 + dp[i - c]`. Thus `dp[i] = min_{c in coins}(dp[i - c] + 1)`.'
      },
      {
        id: 'h3',
        orderIndex: 3,
        title: 'Algorithm & Pattern',
        content: 'Bottom-up 1D DP: allocate array `dp` of size `amount + 1` filled with `amount + 1` (acting as infinity). Base case: `dp[0] = 0`. Outer loop from `i = 1` to `amount`, inner loop over each `coin in coins`. If `i - coin >= 0`, `dp[i] = min(dp[i], dp[i - coin] + 1)`. At end, return `dp[amount] > amount ? -1 : dp[amount]`.'
      },
      {
        id: 'h4',
        orderIndex: 4,
        title: 'Pseudocode Walkthrough',
        content: `dp = [inf] * (amount + 1)\ndp[0] = 0\nfor i from 1 to amount:\n    for coin in coins:\n        if i - coin >= 0:\n            dp[i] = min(dp[i], dp[i - coin] + 1)\nreturn dp[amount] if dp[amount] != inf else -1`
      }
    ],
    solutions: [
      {
        id: 'sol-coin-change',
        title: 'Bottom-Up Dynamic Programming (Tabulation)',
        approach: '1D Dynamic Programming',
        intuition: 'Subproblems: To find minimum coins for amount A, check every coin C and take 1 + minimum coins for (A - C).',
        algorithm: '1. Create dp array of size amount + 1 initialized to amount + 1.\n2. Set dp[0] = 0.\n3. Loop i from 1 to amount.\n4. For each coin, if i - coin >= 0, update dp[i] = min(dp[i], dp[i - coin] + 1).\n5. Return dp[amount] > amount ? -1 : dp[amount].',
        pseudocode: 'function coinChange(coins, amount):\n    dp = array(amount + 1, amount + 1)\n    dp[0] = 0\n    for i from 1 to amount:\n        for c in coins:\n            if i - c >= 0:\n                dp[i] = min(dp[i], dp[i - c] + 1)\n    return dp[amount] > amount ? -1 : dp[amount]',
        timeComplexity: 'O(S * n) — where S is the amount and n is denomination count.',
        spaceComplexity: 'O(S) — memoization table of size amount + 1.',
        languages: [
          {
            language: 'python',
            code: `class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        dp = [float('inf')] * (amount + 1)\n        dp[0] = 0\n        for i in range(1, amount + 1):\n            for coin in coins:\n                if i - coin >= 0:\n                    dp[i] = min(dp[i], dp[i - coin] + 1)\n        return dp[amount] if dp[amount] != float('inf') else -1`
          },
          {
            language: 'python3',
            code: `class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        dp = [float('inf')] * (amount + 1)\n        dp[0] = 0\n        for i in range(1, amount + 1):\n            for coin in coins:\n                if i - coin >= 0:\n                    dp[i] = min(dp[i], dp[i - coin] + 1)\n        return dp[amount] if dp[amount] != float('inf') else -1`
          },
          {
            language: 'java',
            code: `import java.util.Arrays;\n\nclass Solution {\n    public int coinChange(int[] coins, int amount) {\n        int max = amount + 1;\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, max);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (i - coin >= 0) {\n                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}`
          },
          {
            language: 'cpp',
            code: `#include <vector>\n#include <algorithm>\n\nclass Solution {\npublic:\n    int coinChange(std::vector<int>& coins, int amount) {\n        int maxVal = amount + 1;\n        std::vector<int> dp(amount + 1, maxVal);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (i - coin >= 0) {\n                    dp[i] = std::min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};`
          },
          {
            language: 'c',
            code: `#include <stdlib.h>\n\nint coinChange(int* coins, int coinsSize, int amount) {\n    int maxVal = amount + 1;\n    int* dp = (int*)malloc((amount + 1) * sizeof(int));\n    for (int i = 0; i <= amount; i++) dp[i] = maxVal;\n    dp[0] = 0;\n    for (int i = 1; i <= amount; i++) {\n        for (int j = 0; j < coinsSize; j++) {\n            if (i - coins[j] >= 0) {\n                int candidate = dp[i - coins[j]] + 1;\n                if (candidate < dp[i]) dp[i] = candidate;\n            }\n        }\n    }\n    int ans = dp[amount] > amount ? -1 : dp[amount];\n    free(dp);\n    return ans;\n}`
          },
          {
            language: 'javascript',
            code: `function coinChange(coins, amount) {\n    const max = amount + 1;\n    const dp = new Array(amount + 1).fill(max);\n    dp[0] = 0;\n    for (let i = 1; i <= amount; i++) {\n        for (const coin of coins) {\n            if (i - coin >= 0) {\n                dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n            }\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}`
          }
        ]
      }
    ],
    testCases: [
      { id: 'tc1', input: 'coins = [1,2,5], amount = 11', expectedOutput: '3', isSample: true },
      { id: 'tc2', input: 'coins = [2], amount = 3', expectedOutput: '-1', isSample: true },
      { id: 'tc3', input: 'coins = [1], amount = 0', expectedOutput: '0', isSample: true }
    ],
    acceptanceRate: 68.5,
    totalSubmissions: 22100
  }
];


