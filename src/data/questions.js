export const questions = [
  {
    id: 1,
    category: "JavaScript",
    question: "Which keyword is used to declare a block-scoped variable that can be reassigned in modern JavaScript?",
    options: ["define", "let", "varname", "declare"],
    correctAnswer: 1,
    explanation: "The 'let' keyword declares a reassignable, block-scoped local variable introduced in ECMAScript 2015 (ES6)."
  },
  {
    id: 2,
    category: "React",
    question: "Which JavaScript library or concept is primarily used for building component-based interactive user interfaces?",
    options: ["Django", "React", "Express", "Laravel"],
    correctAnswer: 1,
    explanation: "React is a declarative, component-driven JavaScript library maintained by Meta and the open-source community for building modern user interfaces."
  },
  {
    id: 3,
    category: "CSS",
    question: "Which CSS box-sizing property value ensures that padding and borders are included within an element's total width and height?",
    options: ["content-box", "border-box", "inherit", "initial"],
    correctAnswer: 1,
    explanation: "'border-box' tells the browser to account for any border and padding in the values you specify for an element's width and height."
  },
  {
    id: 4,
    category: "JavaScript",
    question: "What is the return value of typeof null in JavaScript?",
    options: ["'null'", "'undefined'", "'object'", "'boolean'"],
    correctAnswer: 2,
    explanation: "Due to a historical bug dating back to the first implementation of JavaScript in 1995, 'typeof null' returns 'object'."
  },
  {
    id: 5,
    category: "HTML",
    question: "Which semantic HTML5 element represents self-contained, independently distributable content such as a blog post or news story?",
    options: ["<section>", "<div>", "<article>", "<aside>"],
    correctAnswer: 2,
    explanation: "The <article> tag specifies independent, self-contained content that can be distributed or reused independently from the rest of the site."
  },
  {
    id: 6,
    category: "React",
    question: "Which React hook is used to perform side effects such as data fetching, subscriptions, or manually manipulating the DOM?",
    options: ["useState", "useEffect", "useMemo", "useReducer"],
    correctAnswer: 1,
    explanation: "useEffect lets you synchronize a component with an external system and perform side effects after rendering."
  },
  {
    id: 7,
    category: "CSS",
    question: "In CSS Flexbox, which property aligns flex items along the main axis?",
    options: ["align-items", "justify-content", "align-content", "flex-direction"],
    correctAnswer: 1,
    explanation: "'justify-content' defines how the browser distributes space between and around flex items along the main axis."
  },
  {
    id: 8,
    category: "Programming Fundamentals",
    question: "What is the average time complexity of looking up a value by key in a standard Hash Map (or JavaScript Object/Map)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 0,
    explanation: "Hash maps provide average O(1) constant time complexity for insertions, deletions, and lookup operations."
  },
  {
    id: 9,
    category: "JavaScript",
    question: "Which method creates a new array populated with the results of calling a provided function on every element in the calling array?",
    options: ["forEach()", "filter()", "map()", "reduce()"],
    correctAnswer: 2,
    explanation: "The map() method creates a brand new array populated with the results of calling a provided function on every item in the original array."
  },
  {
    id: 10,
    category: "Web & DOM",
    question: "What is the process called where an event triggers on a child element and then propagates upward through its parent elements in the DOM tree?",
    options: ["Event Capturing", "Event Delegation", "Event Bubbling", "Event Polling"],
    correctAnswer: 2,
    explanation: "Event Bubbling is the phase where the event starts at the deepest target element and bubbles upward through its ancestors in the DOM tree."
  }
];

