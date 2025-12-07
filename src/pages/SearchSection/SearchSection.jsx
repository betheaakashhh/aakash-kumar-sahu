import React, { useState, useEffect, useRef, useCallback } from 'react';
import './searchsection.css'; // We'll create this CSS file

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  const inputRef = useRef(null);

  // Placeholder texts with typewriter effect
  const placeholders = [
  'Ask me anything about web development?',
  'How to integrate MongoDB with Node.js?',
  'What are React Hooks and how to use them?',
  'Explain JavaScript ES6+ features',
  'How to create a Node.js server?',
  'What are TypeScript benefits for developers?',
  'Why should I use Next.js for React apps?',
  'How to Dockerize a web application?',
  'Essential Git commands for daily workflow',
  'How to use Tailwind CSS effectively?',
  'State management with Redux Toolkit',
  'What is GraphQL and when to use it?',
  'Basic AWS services for hosting web apps',
  'Testing React components with Jest',
  'Webpack configuration basics',
  'Creating responsive web designs',
  'REST API design best practices',
  'Web application security essentials',
  'Setting up CI/CD pipeline',
  'How to create a Progressive Web App?',
  'Introduction to Three.js for 3D web',
  'Using Sass for advanced CSS styling',
  'Web accessibility (a11y) best practices',
  'Building apps with Firebase services',
  'Real-time communication with WebSockets',
  'Web performance optimization techniques',
  'Building APIs with Express.js',
  'Python basics for web development',
  'Regular expressions in JavaScript',
  'CSS and JavaScript animations',
  'Using localStorage in web apps',
  'SEO best practices for React apps',
  'Testing strategies for web applications',
  'Deploying web applications to production',
  'User authentication implementation',
  'Microservices architecture basics',
  'User Experience (UX) design principles',
  'Agile development methodology',
  'SQL vs NoSQL databases comparison',
  'Cross-platform mobile development',
  'Cloud computing services overview',
  'Blockchain and Web3 basics',
  'AI integration in web applications',
  'DevOps practices and tools',
  'Software architecture patterns',
  'Code quality and best practices',
  'Technical interview preparation tips',
  'Building an effective developer portfolio',
  'Web development career growth path',
  'Contributing to open source projects',
  'Freelance web development tips'
];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Knowledge base for answers
  const knowledgeBase = {
  'mongodb': {
    question: 'How to integrate MongoDB?',
    answer: 'To integrate MongoDB with your Node.js application:\n\n1. Install MongoDB driver:\n   npm install mongodb\n\n2. Connect to database:\n   const { MongoClient } = require("mongodb");\n   const uri = "your_connection_string";\n   const client = new MongoClient(uri);\n\n3. Use mongoose for easier integration:\n   npm install mongoose\n   mongoose.connect("mongodb://localhost:27017/mydb")\n\n4. Define schemas and models\n5. Perform CRUD operations\n\nMongoDB offers flexibility, scalability, and excellent performance for modern applications.'
  },
  'react': {
    question: 'What is React and its core concepts?',
    answer: 'React is a JavaScript library for building user interfaces:\n\nKey Features:\n• Component-Based Architecture\n• Virtual DOM for performance\n• JSX syntax\n• Unidirectional data flow\n\nCore Concepts:\n- Components (Functional & Class)\n- Props for data passing\n- State management\n- Hooks API\n- Context for global state\n\nReact enables building complex UIs from isolated, reusable components.'
  },
  'javascript': {
    question: 'Explain JavaScript ES6+ features',
    answer: 'Modern JavaScript ES6+ features:\n\n1. let/const (block scope)\n2. Arrow functions: (x) => x * 2\n3. Template literals: `Hello ${name}`\n4. Destructuring: const {prop} = obj\n5. Spread/Rest: ...array\n6. Promises & async/await\n7. Modules: import/export\n8. Classes & inheritance\n9. Optional chaining: obj?.prop\n10. Nullish coalescing: ?? operator\n\nThese features make JavaScript more powerful and readable.'
  },
  'nodejs': {
    question: 'How to create a Node.js server?',
    answer: 'Creating a basic Node.js HTTP server:\n\nconst http = require("http");\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader("Content-Type", "text/plain");\n  res.end("Hello World!");\n});\n\nserver.listen(3000, () => {\n  console.log("Server running on port 3000");\n});\n\nUsing Express.js:\nnpm install express\nconst express = require("express");\nconst app = express();\napp.get("/", (req, res) => res.send("Hello!"));\napp.listen(3000);'
  },
  'typescript': {
    question: 'What are TypeScript benefits?',
    answer: 'TypeScript is JavaScript with static typing:\n\nBenefits:\n1. Type Safety - Catch errors early\n2. Better IDE support with IntelliSense\n3. Enhanced code documentation\n4. Easier refactoring\n5. Modern JS features support\n\nExample:\ninterface User {\n  name: string;\n  age: number;\n}\n\nfunction greet(user: User): string {\n  return `Hello ${user.name}`;\n}\n\nTypeScript compiles to JavaScript and improves development experience.'
  },
  'nextjs': {
    question: 'Why use Next.js for React apps?',
    answer: 'Next.js is a React framework with built-in features:\n\nAdvantages:\n• Server-side Rendering (SSR)\n• Static Site Generation (SSG)\n• API Routes\n• File-based routing\n• Built-in CSS/Sass support\n• Image optimization\n• Fast refresh\n\nGetting started:\nnpx create-next-app@latest\n\nNext.js improves performance, SEO, and developer experience.'
  },
  'docker': {
    question: 'How to Dockerize a web application?',
    answer: 'Dockerizing a Node.js application:\n\n1. Create Dockerfile:\n   FROM node:16-alpine\n   WORKDIR /app\n   COPY package*.json ./\n   RUN npm install\n   COPY . .\n   EXPOSE 3000\n   CMD ["npm", "start"]\n\n2. Build image:\n   docker build -t my-app .\n\n3. Run container:\n   docker run -p 3000:3000 my-app\n\n4. Use docker-compose for multi-service apps.\nDocker ensures consistent environments across development and production.'
  },
  'git': {
    question: 'Essential Git commands for developers',
    answer: 'Common Git workflow commands:\n\nInitialize: git init\nClone: git clone <url>\nAdd files: git add .\nCommit: git commit -m "message"\nStatus: git status\nLog: git log --oneline\nBranch: git branch feature-x\nSwitch: git checkout feature-x\nMerge: git merge feature-x\nPush: git push origin main\nPull: git pull origin main\n\nBest practices: Write descriptive commits, use branches, and review code.'
  },
  'tailwind': {
    question: 'How to use Tailwind CSS effectively?',
    answer: 'Tailwind CSS is a utility-first CSS framework:\n\nSetup:\nnpm install -D tailwindcss\nnpx tailwindcss init\n\nAdd to CSS:\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\nUsage:\n<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg">\n  <h1 class="text-3xl font-bold text-blue-600">Hello</h1>\n</div>\n\nBenefits: Rapid development, consistent design, responsive utilities, and custom configuration.'
  },
  'redux': {
    question: 'State management with Redux',
    answer: 'Redux is a predictable state container:\n\nCore Concepts:\n1. Store - Single source of truth\n2. Actions - Describe what happened\n3. Reducers - Specify state changes\n4. Dispatch - Trigger state updates\n\nExample setup:\nimport { createStore } from "redux";\n\nconst reducer = (state = {}, action) => {\n  switch(action.type) {\n    case "INCREMENT":\n      return { count: state.count + 1 };\n    default:\n      return state;\n  }\n};\n\nconst store = createStore(reducer);\n\nModern alternative: Redux Toolkit simplifies Redux usage.'
  },
  'graphql': {
    question: 'What is GraphQL and how to use it?',
    answer: 'GraphQL is a query language for APIs:\n\nBenefits:\n• Single endpoint for all data\n• Client specifies needed data\n• Strongly typed schema\n• Real-time with subscriptions\n\nServer setup (Apollo):\nnpm install apollo-server graphql\n\nconst { ApolloServer, gql } = require("apollo-server");\n\ntypeDefs = gql`\n  type Query {\n    users: [User]\n  }\n`;\n\nClient query:\nquery {\n  users {\n    id\n    name\n    email\n  }\n}\n\nGraphQL reduces over-fetching and under-fetching of data.'
  },
  'aws': {
    question: 'Basic AWS services for web apps',
    answer: 'Essential AWS services:\n\n1. EC2 - Virtual servers\n2. S3 - File storage\n3. RDS - Managed databases\n4. Lambda - Serverless functions\n5. API Gateway - API management\n6. CloudFront - CDN\n7. Route 53 - DNS service\n8. IAM - Access management\n\nExample deployment:\n• Frontend: S3 + CloudFront\n• Backend: EC2 or Lambda\n• Database: RDS or DynamoDB\n• DNS: Route 53\n\nAWS offers scalable and reliable cloud infrastructure.'
  },
  'jest': {
    question: 'Testing React components with Jest',
    answer: 'Jest testing for React components:\n\nSetup:\nnpm install --save-dev jest @testing-library/react\n\nTest example:\nimport { render, screen } from "@testing-library/react";\nimport Component from "./Component";\n\ntest("renders learn react link", () => {\n  render(<Component />);\n  const linkElement = screen.getByText(/learn react/i);\n  expect(linkElement).toBeInTheDocument();\n});\n\nCommon matchers:\nexpect(value).toBe(expected);\nexpect(array).toContain(item);\nexpect(obj).toEqual(expected);\n\nRun tests: npm test\nJest provides snapshot testing and coverage reports.'
  },
  'webpack': {
    question: 'Webpack configuration basics',
    answer: 'Webpack module bundler setup:\n\nBasic webpack.config.js:\nmodule.exports = {\n  entry: "./src/index.js",\n  output: {\n    filename: "bundle.js",\n    path: path.resolve(__dirname, "dist"),\n  },\n  module: {\n    rules: [\n      {\n        test: /\\.js$/,\n        exclude: /node_modules/,\n        use: "babel-loader",\n      },\n      {\n        test: /\\.css$/,\n        use: ["style-loader", "css-loader"],\n      },\n    ],\n  },\n  plugins: [\n    new HtmlWebpackPlugin({\n      template: "./src/index.html",\n    }),\n  ],\n};\n\nWebpack bundles JavaScript, CSS, images, and other assets.'
  },
  'responsive': {
    question: 'Creating responsive web designs',
    answer: 'Responsive design techniques:\n\n1. Fluid Grids - Use percentages\n2. Flexible Images - max-width: 100%\n3. Media Queries:\n   @media (max-width: 768px) {\n     .container { padding: 10px; }\n   }\n\n4. Mobile-first approach\n5. CSS Flexbox & Grid\n6. Viewport meta tag:\n   <meta name="viewport" content="width=device-width, initial-scale=1">\n\nFramework approach (Bootstrap):\n<div class="container">\n  <div class="row">\n    <div class="col-md-6">Content</div>\n  </div>\n</div>'
  },
  'api': {
    question: 'Best practices for REST API design',
    answer: 'REST API best practices:\n\n1. Use nouns, not verbs: /users not /getUsers\n2. Versioning: /api/v1/users\n3. Filtering: /users?role=admin\n4. Pagination: /users?page=2&limit=10\n5. Sorting: /users?sort=-createdAt\n6. HTTP methods: GET, POST, PUT, DELETE\n7. Status codes: 200, 201, 400, 404, 500\n8. Authentication: JWT tokens\n9. Rate limiting\n10. CORS configuration\n\nExample response:\n{\n  "data": [...],\n  "pagination": {...},\n  "message": "Success"\n}'
  },
  'security': {
    question: 'Web application security essentials',
    answer: 'Essential web security practices:\n\n1. HTTPS everywhere\n2. Input validation & sanitization\n3. SQL injection prevention (use ORM)\n4. XSS protection (escape output)\n5. CSRF tokens\n6. Secure headers (CSP, HSTS)\n7. Authentication: bcrypt for passwords\n8. Authorization checks\n9. Session management\n10. Regular dependency updates\n\nSecurity headers example:\nContent-Security-Policy: default-src \'self\';\nX-Content-Type-Options: nosniff\nX-Frame-Options: DENY\n\nAlways validate and sanitize user inputs.'
  },
  'ci': {
    question: 'Setting up CI/CD pipeline',
    answer: 'CI/CD pipeline with GitHub Actions:\n\nCreate .github/workflows/deploy.yml:\nname: Deploy\non:\n  push:\n    branches: [main]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - uses: actions/setup-node@v2\n      - run: npm ci\n      - run: npm test\n      - run: npm run build\n      - name: Deploy\n        uses: peaceiris/actions-gh-pages@v3\n\nBenefits:\n• Automated testing\n• Consistent deployments\n• Rollback capabilities\n• Multiple environment support\n\nPopular CI/CD tools: Jenkins, GitLab CI, CircleCI, Travis CI.'
  },
  'pwa': {
    question: 'How to create a Progressive Web App?',
    answer: 'PWA essentials:\n\n1. Web App Manifest (manifest.json)\n2. Service Worker for offline support\n3. HTTPS required\n4. Responsive design\n5. App-like interface\n\nService Worker example:\nself.addEventListener("install", (event) => {\n  event.waitUntil(\n    caches.open("v1").then((cache) => {\n      return cache.addAll(["/", "/index.html"]);\n    })\n  );\n});\n\nManifest.json:\n{\n  "name": "My PWA",\n  "short_name": "PWA",\n  "start_url": "/",\n  "display": "standalone"\n}\n\nPWAs work offline and can be installed on devices.'
  },
  'threejs': {
    question: 'Introduction to Three.js for 3D web graphics',
    answer: 'Three.js 3D graphics basics:\n\nSetup:\nnpm install three\n\nBasic scene:\nimport * as THREE from "three";\n\nconst scene = new THREE.Scene();\nconst camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);\nconst renderer = new THREE.WebGLRenderer();\nrenderer.setSize(window.innerWidth, window.innerHeight);\ndocument.body.appendChild(renderer.domElement);\n\nconst geometry = new THREE.BoxGeometry();\nconst material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });\nconst cube = new THREE.Mesh(geometry, material);\nscene.add(cube);\n\ncamera.position.z = 5;\n\nThree.js enables WebGL-based 3D graphics in the browser.'
  },
  'sass': {
    question: 'Using Sass for advanced CSS',
    answer: 'Sass (Syntactically Awesome Style Sheets):\n\nFeatures:\n• Variables: $primary-color: #333;\n• Nesting: .parent { .child { ... } }\n• Mixins:\n  @mixin flex-center {\n    display: flex;\n    justify-content: center;\n  }\n• Functions & operators\n• Imports & partials\n\nSetup:\nnpm install sass\n\nCompile: npx sass input.scss output.css\n\nModern alternative: Use CSS-in-JS libraries like styled-components or CSS modules.'
  },
  'accessibility': {
    question: 'Web accessibility (a11y) best practices',
    answer: 'Web accessibility guidelines:\n\n1. Semantic HTML\n2. ARIA attributes when needed\n3. Keyboard navigation\n4. Color contrast ratio 4.5:1\n5. Alt text for images\n6. Form labels\n7. Focus indicators\n8. Screen reader compatibility\n9. Skip navigation links\n10. Testing with aXe or Lighthouse\n\nExample:\n<button aria-label="Close menu">\n  <span aria-hidden="true">×</span>\n</button>\n\nAlways test with actual assistive technologies.'
  },
  'firebase': {
    question: 'Building apps with Firebase',
    answer: 'Firebase backend services:\n\nCore features:\n• Firestore (NoSQL database)\n• Authentication\n• Cloud Functions\n• Hosting\n• Storage\n\nExample authentication:\nimport { getAuth, signInWithEmailAndPassword } from "firebase/auth";\n\nconst auth = getAuth();\nsignInWithEmailAndPassword(auth, email, password);\n\nFirestore example:\nimport { getFirestore, collection, addDoc } from "firebase/firestore";\n\nconst db = getFirestore();\nawait addDoc(collection(db, "users"), { name: "John" });\n\nFirebase provides serverless backend infrastructure.'
  },
  'websocket': {
    question: 'Real-time communication with WebSockets',
    answer: 'WebSocket implementation:\n\nServer (Node.js with ws):\nconst WebSocket = require("ws");\nconst wss = new WebSocket.Server({ port: 8080 });\n\nwss.on("connection", (ws) => {\n  ws.on("message", (message) => {\n    ws.send(`Echo: ${message}`);\n  });\n});\n\nClient:\nconst socket = new WebSocket("ws://localhost:8080");\n\nsocket.onopen = () => socket.send("Hello");\nsocket.onmessage = (event) => console.log(event.data);\n\nAlternative: Socket.io provides fallbacks and rooms.\n\nUse cases: Chat apps, live updates, real-time games, collaboration tools.'
  },
  'performance': {
    question: 'Web performance optimization techniques',
    answer: 'Performance optimization strategies:\n\n1. Code splitting & lazy loading\n2. Image optimization (WebP format)\n3. Minification & compression\n4. CDN usage\n5. Caching strategies\n6. Critical CSS inlining\n7. Tree shaking\n8. Debouncing & throttling\n9. Web Workers for heavy tasks\n10. Performance monitoring\n\nTools:\n• Lighthouse for auditing\n• WebPageTest for testing\n• Chrome DevTools for analysis\n• Bundle analyzer for size\n\nGoal: Largest Contentful Paint < 2.5s, Time to Interactive < 3.8s'
  },
  'express': {
    question: 'Building APIs with Express.js',
    answer: 'Express.js REST API setup:\n\nconst express = require("express");\nconst app = express();\n\n// Middleware\napp.use(express.json());\napp.use(cors());\n\n// Routes\napp.get("/api/users", (req, res) => {\n  res.json([{ id: 1, name: "John" }]);\n});\n\napp.post("/api/users", (req, res) => {\n  const user = req.body;\n  // Save to database\n  res.status(201).json(user);\n});\n\n// Error handling\napp.use((err, req, res, next) => {\n  res.status(500).json({ error: err.message });\n});\n\napp.listen(3000, () => console.log("Server running"));\n\nAdd middleware for logging, authentication, and validation.'
  },
  'python': {
    question: 'Python basics for web development',
    answer: 'Python web development:\n\nFrameworks:\n• Django (batteries-included)\n• Flask (microframework)\n• FastAPI (modern, async)\n\nFlask example:\nfrom flask import Flask, jsonify\napp = Flask(__name__)\n\n@app.route("/api/hello")\ndef hello():\n    return jsonify({"message": "Hello World"})\n\nif __name__ == "__main__":\n    app.run(debug=True)\n\nVirtual environment:\npython -m venv venv\nsource venv/bin/activate  # Linux/Mac\nvenv\\Scripts\\activate  # Windows\n\npip install flask\n\nPython excels in backend development and data processing.'
  },
  'regex': {
    question: 'Regular expressions in JavaScript',
    answer: 'Regular expressions usage:\n\nBasic patterns:\nconst emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\nconst phoneRegex = /^\\+?[1-9]\\d{1,14}$/;\nconst passwordRegex = /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;\n\nMethods:\nregex.test(string) // true/false\nstring.match(regex) // matches\nstring.replace(regex, replacement)\n\nFlags:\ng - global\ni - case insensitive\nm - multiline\n\nExample:\nconst str = "Hello 123 World";\nconst numbers = str.match(/\\d+/g); // ["123"]\n\nUse regex101.com for testing patterns.'
  },
  'animations': {
    question: 'CSS and JavaScript animations',
    answer: 'Web animation techniques:\n\nCSS animations:\n@keyframes slideIn {\n  from { transform: translateX(-100%); }\n  to { transform: translateX(0); }\n}\n\n.element {\n  animation: slideIn 0.3s ease-out;\n}\n\nJavaScript animations:\n// Using requestAnimationFrame\nfunction animate(timestamp) {\n  // Update positions\n  requestAnimationFrame(animate);\n}\n\nLibraries:\n• GSAP - professional animations\n• Framer Motion - React animations\n• Anime.js - lightweight\n• Three.js - 3D animations\n\nPrinciples: 60fps target, hardware acceleration, reduced motion option.'
  },
  'localstorage': {
    question: 'Using localStorage in web applications',
    answer: 'localStorage for client-side storage:\n\nMethods:\nlocalStorage.setItem("key", "value");\nlocalStorage.getItem("key"); // returns "value"\nlocalStorage.removeItem("key");\nlocalStorage.clear();\n\nImportant:\n• Stores strings only\n• 5-10MB limit per domain\n• Same-origin policy\n• Synchronous API\n\nObject storage:\nconst user = { name: "John", age: 30 };\nlocalStorage.setItem("user", JSON.stringify(user));\nconst storedUser = JSON.parse(localStorage.getItem("user"));\n\nSession storage similar but clears on tab close.'
  },
  'seo': {
    question: 'SEO best practices for React applications',
    answer: 'React SEO optimization:\n\n1. Server-side rendering (Next.js)\n2. Proper meta tags (react-helmet)\n3. Semantic HTML\n4. Lazy loading for images\n5. Sitemap.xml\n6. robots.txt\n7. Structured data (JSON-LD)\n8. Fast loading times\n9. Mobile responsive\n10. Canonical URLs\n\nMeta tags example:\n<Helmet>\n  <title>My Page Title</title>\n  <meta name="description" content="Page description" />\n  <meta property="og:title" content="Open Graph Title" />\n</Helmet>\n\nUse Google Search Console for monitoring.'
  },
  'testing': {
    question: 'Testing strategies for web applications',
    answer: 'Testing pyramid:\n\n1. Unit Tests - Individual functions/components\n2. Integration Tests - Component interactions\n3. E2E Tests - Complete user flows\n\nTools:\n• Jest + React Testing Library (unit/integration)\n• Cypress (E2E)\n• Playwright (E2E)\n• Storybook (component testing)\n\nTest example:\ntest("adds numbers", () => {\n  expect(add(1, 2)).toBe(3);\n});\n\nBest practices:\n• Test behavior, not implementation\n• Mock external dependencies\n• Run tests on CI/CD\n• Aim for 80%+ coverage\n\nTesting ensures reliability and prevents regressions.'
  },
  'deployment': {
    question: 'Deploying web applications to production',
    answer: 'Deployment options:\n\nStatic sites:\n• Vercel: vercel deploy\n• Netlify: netlify deploy\n• GitHub Pages\n• AWS S3 + CloudFront\n\nFull-stack apps:\n• Heroku: git push heroku main\n• AWS Elastic Beanstalk\n• DigitalOcean App Platform\n• Google Cloud Run\n\nDocker deployment:\ndocker build -t app .\ndocker run -p 80:3000 app\n\nEnvironment variables:\n// .env file\nAPI_URL=https://api.example.com\n\nIn code: process.env.API_URL\n\nAlways use production builds and enable HTTPS.'
  },
  'authentication': {
    question: 'User authentication implementation',
    answer: 'Authentication methods:\n\n1. Session-based (cookies)\n2. Token-based (JWT)\n3. OAuth (Google, GitHub, etc.)\n4. Passwordless (magic links)\n\nJWT implementation:\nconst jwt = require("jsonwebtoken");\n\n// Generate token\nconst token = jwt.sign(\n  { userId: user.id },\n  process.env.JWT_SECRET,\n  { expiresIn: "1h" }\n);\n\n// Verify token\nconst decoded = jwt.verify(token, process.env.JWT_SECRET);\n\nOAuth with Passport.js:\npassport.use(new GoogleStrategy({\n  clientID: process.env.GOOGLE_CLIENT_ID,\n  callbackURL: "/auth/google/callback"\n}));\n\nAlways hash passwords with bcrypt.'
  },
  'microservices': {
    question: 'Microservices architecture basics',
    answer: 'Microservices principles:\n\nCharacteristics:\n• Loosely coupled services\n• Independently deployable\n• Organized around business capabilities\n• Decentralized data management\n• API communication\n\nCommunication patterns:\n1. Synchronous: HTTP/REST\n2. Asynchronous: Message queues\n3. Event-driven: Event streaming\n\nTools:\n• Docker for containerization\n• Kubernetes for orchestration\n• API Gateway for routing\n• Service discovery\n\nChallenges:\n• Distributed system complexity\n• Network latency\n• Data consistency\n• Deployment coordination\n\nStart with monolith, extract services as needed.'
  },
  'ux': {
    question: 'User Experience (UX) design principles',
    answer: 'UX design fundamentals:\n\n1. User Research - Understand needs\n2. Information Architecture - Organize content\n3. Interaction Design - Define behaviors\n4. Visual Design - Aesthetics\n5. Usability Testing - Validate with users\n\nPrinciples:\n• Consistency in design patterns\n• Clear navigation\n• Feedback for user actions\n• Error prevention\n• Accessibility for all users\n\nTools:\n• Figma/Sketch for design\n• UserTesting for feedback\n• Hotjar for analytics\n• Google Analytics for behavior\n\nGood UX increases engagement and conversions.'
  },
  'agile': {
    question: 'Agile development methodology',
    answer: 'Agile principles:\n\nManifesto values:\n1. Individuals over processes\n2. Working software over documentation\n3. Customer collaboration over negotiation\n4. Responding to change over following plans\n\nScrum framework:\n• Sprints (2-4 weeks)\n• Daily standups\n• Sprint planning\n• Sprint review\n• Retrospective\n\nArtifacts:\n• Product backlog\n• Sprint backlog\n• Increment\n\nTools:\n• Jira, Trello for tracking\n• Confluence for documentation\n• Slack for communication\n\nAgile enables iterative development and quick adaptation.'
  },
  'database': {
    question: 'SQL vs NoSQL databases',
    answer: 'Database comparison:\n\nSQL (Relational):\n• Structured data with schemas\n• Tables with relationships\n• ACID transactions\n• Examples: PostgreSQL, MySQL\n\nNoSQL (Non-relational):\n• Flexible schemas\n• Document/Key-Value/Graph\n• CAP theorem trade-offs\n• Examples: MongoDB, Redis\n\nWhen to use:\nSQL: Complex queries, transactions, structured data\nNoSQL: Scalability, flexible schema, JSON documents\n\nModern approach: Use both (polyglot persistence)\nSQL for transactions, NoSQL for caching/analytics'
  },
  'mobile': {
    question: 'Cross-platform mobile development',
    answer: 'Mobile development options:\n\n1. React Native (JavaScript)\n   - Write once, deploy to iOS/Android\n   - Native performance\n   - Large ecosystem\n\n2. Flutter (Dart)\n   - Single codebase\n   - Custom rendering engine\n   - Beautiful widgets\n\n3. Native\n   - Swift/Kotlin\n   - Best performance\n   - Platform-specific features\n\nReact Native example:\nnpx react-native init MyApp\n\nComponents similar to React:\nimport { View, Text } from "react-native";\n\n<View>\n  <Text>Hello World</Text>\n</View>\n\nChoose based on team skills and app requirements.'
  },
  'cloud': {
    question: 'Cloud computing services overview',
    answer: 'Major cloud providers:\n\nAWS (Amazon):\n• EC2, S3, Lambda, RDS\n• Extensive services\n• Market leader\n\nGoogle Cloud:\n• Compute Engine, Cloud Functions\n• Strong AI/ML tools\n• Kubernetes expertise\n\nAzure (Microsoft):\n• Virtual Machines, Blob Storage\n• Enterprise integration\n• .NET ecosystem\n\nCommon patterns:\n• Infrastructure as Code (Terraform)\n• Serverless computing\n• Container orchestration\n• Managed databases\n\nStart with free tiers, monitor costs, use multiple availability zones.'
  },
  'blockchain': {
    question: 'Blockchain and Web3 basics',
    answer: 'Blockchain concepts:\n\nKey features:\n• Decentralized\n• Immutable ledger\n• Consensus mechanisms\n• Smart contracts\n\nWeb3 stack:\n1. Ethereum/Solana/Polygon\n2. Smart contracts (Solidity)\n3. Wallets (MetaMask)\n4. dApps (decentralized apps)\n5. IPFS for storage\n\nExample (Ethereum):\ncontract SimpleStorage {\n    uint storedData;\n    function set(uint x) public {\n        storedData = x;\n    }\n}\n\nTools:\n• Hardhat/Foundry for development\n• Ethers.js for interaction\n• OpenZeppelin for security\n\nBlockchain enables trustless applications and digital ownership.'
  },
  'ai': {
    question: 'AI integration in web applications',
    answer: 'AI/ML web integration:\n\nServices:\n• OpenAI API (GPT, DALL-E)\n• Google Cloud AI\n• Azure Cognitive Services\n• AWS SageMaker\n\nChatGPT integration:\nimport OpenAI from "openai";\nconst openai = new OpenAI({ apiKey });\n\nconst response = await openai.chat.completions.create({\n  model: "gpt-3.5-turbo",\n  messages: [{ role: "user", content: "Hello" }]\n});\n\nComputer vision:\n• TensorFlow.js for browser\n• Pre-trained models\n• Custom model training\n\nUse cases: Chatbots, content generation, image recognition, recommendation systems.'
  },
  'devops': {
    question: 'DevOps practices and tools',
    answer: 'DevOps culture and tools:\n\nPractices:\n• Continuous Integration\n• Continuous Deployment\n• Infrastructure as Code\n• Monitoring & Observability\n• Collaboration between teams\n\nToolchain:\n• Version Control: Git\n• CI/CD: Jenkins, GitHub Actions\n• Configuration: Ansible, Chef\n• Containerization: Docker\n• Orchestration: Kubernetes\n• Monitoring: Prometheus, Grafana\n• Logging: ELK Stack\n\nCloud DevOps:\n• AWS: CodePipeline, CloudFormation\n• Google: Cloud Build, Deployment Manager\n• Azure: DevOps, Resource Manager\n\nDevOps enables faster, more reliable software delivery.'
  },
  'architecture': {
    question: 'Software architecture patterns',
    answer: 'Common architecture patterns:\n\n1. Monolithic - Single application\n2. Microservices - Independent services\n3. Serverless - Function as a Service\n4. Event-driven - Message-based\n5. Hexagonal - Ports and adapters\n\nClean Architecture principles:\n• Independent of frameworks\n• Testable\n• Independent of UI\n• Independent of database\n\nLayers:\nEntities → Use Cases → Interface Adapters → Frameworks\n\nDesign patterns:\n• Factory, Singleton, Observer\n• Repository, Strategy, Decorator\n\nChoose based on team size, complexity, and scaling needs.'
  },
  'codequality': {
    question: 'Code quality and best practices',
    answer: 'Code quality standards:\n\n1. Readable code\n2. Consistent formatting\n3. Meaningful names\n4. Small functions/methods\n5. DRY principle\n6. SOLID principles\n7. Comment only why, not what\n\nTools:\n• ESLint/Prettier for JavaScript\n• SonarQube for analysis\n• Husky for pre-commit hooks\n• Code reviews\n\nExample guidelines:\n• Maximum function length: 20 lines\n• Maximum file length: 200 lines\n• Cyclomatic complexity < 10\n• Test coverage > 80%\n\nRegular refactoring, pair programming, and knowledge sharing.'
  },
  'interview': {
    question: 'Technical interview preparation tips',
    answer: 'Interview preparation:\n\n1. Data Structures:\n   • Arrays, Linked Lists\n   • Trees, Graphs\n   • Hash Tables\n   • Stacks, Queues\n\n2. Algorithms:\n   • Sorting & Searching\n   • Dynamic Programming\n   • Recursion\n   • Big O notation\n\n3. System Design:\n   • Scalability patterns\n   • Database design\n   • API design\n   • Caching strategies\n\n4. Language-specific:\n   • JavaScript: closures, promises, event loop\n   • React: lifecycle, hooks, state management\n\nPractice on LeetCode, mock interviews, know your projects well.'
  },
  'portfolio': {
    question: 'Building an effective developer portfolio',
    answer: 'Portfolio best practices:\n\nEssential elements:\n1. About section with skills\n2. Featured projects with:\n   • Live demos\n   • Source code links\n   • Technologies used\n   • Problems solved\n3. Contact information\n4. Resume/CV download\n\nProject ideas:\n• Full-stack web app\n• Open source contributions\n• Technical blog\n• Mobile application\n• API/service\n\nDesign tips:\n• Clean, professional layout\n• Mobile responsive\n• Fast loading\n• Accessible\n• Regular updates\n\nShowcase problem-solving skills, not just technology stack.'
  },
  'career': {
    question: 'Web development career growth',
    answer: 'Career progression:\n\nJunior → Mid → Senior → Lead → Architect\n\nSkills development:\n1. Technical:\n   • Multiple languages/frameworks\n   • System design\n   • Architecture patterns\n   • DevOps\n2. Soft skills:\n   • Communication\n   • Mentoring\n   • Project management\n   • Business understanding\n\nContinuous learning:\n• Follow industry trends\n• Contribute to open source\n• Write/blog about tech\n• Attend conferences\n• Network with peers\n\nSpecializations: Frontend, Backend, Full-stack, DevOps, Mobile, AI/ML'
  },
  'opensource': {
    question: 'Contributing to open source projects',
    answer: 'Open source contribution guide:\n\nGetting started:\n1. Find beginner-friendly projects\n2. Look for "good first issue" labels\n3. Read contribution guidelines\n4. Set up development environment\n5. Start with documentation fixes\n\nPopular platforms:\n• GitHub\n• GitLab\n• Bitbucket\n\nProcess:\n1. Fork the repository\n2. Create feature branch\n3. Make changes\n4. Test thoroughly\n5. Submit pull request\n6. Address review feedback\n\nBenefits:\n• Build portfolio\n• Learn from experts\n• Network with developers\n• Give back to community\n\nStart with projects you use and love.'
  },
  'freelance': {
    question: 'Freelance web development tips',
    answer: 'Freelancing essentials:\n\nGetting started:\n1. Build portfolio with 3-5 projects\n2. Set competitive rates\n3. Create contract templates\n4. Define service offerings\n\nFinding clients:\n• Platforms: Upwork, Fiverr, Toptal\n• Networking events\n• Social media (LinkedIn, Twitter)\n• Referrals from past clients\n\nBusiness aspects:\n• Time tracking\n• Invoicing systems\n• Tax planning\n• Client communication\n• Scope management\n\nBest practices:\n• Clear communication\n• Regular updates\n• Underpromise, overdeliver\n• Continuous learning\n• Work-life balance\n\nFreelancing offers flexibility and diverse experience.'
  }
};

  // Typewriter effect for placeholder
  useEffect(() => {
    const currentPlaceholder = placeholders[placeholderIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentPlaceholder.length) {
          setPlaceholder(currentPlaceholder.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (charIndex > 0) {
          setPlaceholder(currentPlaceholder.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, placeholderIndex]);

  // Click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target) &&
        !searchRef.current.contains(event.target)
      ) {
        setShowResults(false);
        setIsInputFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Find answer based on search query
  const findAnswer = useCallback((query) => {
    const lowerQuery = query.toLowerCase().trim();
    
    if (!lowerQuery) return null;
    
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerQuery.includes(key) || value.question.toLowerCase().includes(lowerQuery)) {
        return value;
      }
    }
    
    return {
      question: 'AI Response',
      answer: `I found your query interesting! "${query}"\n\nI'm continuously learning and expanding my knowledge base. Currently, I can help you with:\n\n• MongoDB integration\n• JavaScript Hooks\n• React concepts\n• CSS styling\n• REST APIs\n• And much more!\n\nTry asking about these topics, or feel free to explore my portfolio to see my work!`
    };
  }, []);

  const [currentAnswer, setCurrentAnswer] = useState('');

  // Typewriter effect for answer
  useEffect(() => {
    if (isTyping && typedAnswer.length < currentAnswer.length) {
      const timer = setTimeout(() => {
        setTypedAnswer(currentAnswer.substring(0, typedAnswer.length + 1));
      }, 20);
      return () => clearTimeout(timer);
    } else if (isTyping) {
      setIsTyping(false);
    }
  }, [typedAnswer, isTyping, currentAnswer]);

  const handleSearch = useCallback(() => {
    const query = searchQuery.trim();
    if (query) {
      const result = findAnswer(query);
      if (result) {
        setCurrentAnswer(result.answer);
        setTypedAnswer('');
        setIsTyping(true);
        setShowResults(true);
      }
    } else {
      setShowResults(false);
    }
  }, [searchQuery, findAnswer]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    if (searchQuery.trim() && !showResults) {
      setShowResults(true);
    }
  };

  const handleSuggestionClick = (question) => {
    setSearchQuery(question);
    const result = findAnswer(question);
    if (result) {
      setCurrentAnswer(result.answer);
      setTypedAnswer('');
      setIsTyping(true);
      setShowResults(true);
    }
    inputRef.current?.focus();
  };

  return (
    <div className="ai-search-container">
      <div className="animated-background">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="search-section">
        <h1 className="search-title">
          <span className="gradient-text">AI Assistant</span> for My Portfolio
        </h1>
        <p className="search-subtitle">Ask me about development, technologies, or anything!</p>

        <div className="search-wrapper" ref={searchRef}>
          <div className={`search-container ${isInputFocused ? 'focused' : ''}`}>
            <div className="search-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="search-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                onFocus={handleInputFocus}
                placeholder={placeholder + '|'}
                className="search-input"
                autoComplete="off"
              />
              <div className="input-underline"></div>
            </div>

            <button 
              onClick={handleSearch} 
              className="search-button"
              aria-label="Search"
            >
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="search-button-text">Search</span>
            </button>
          </div>

          <div className="quick-suggestions">
            <span className="suggestions-label">Try asking:</span>
            <div className="suggestion-chips">
              {Object.values(knowledgeBase).slice(0, 4).map((item, index) => (
                <button
                  key={index}
                  className="suggestion-chip"
                  onClick={() => handleSuggestionClick(item.question)}
                >
                  {item.question}
                </button>
              ))}
            </div>
          </div>
        </div>

        {showResults && (
          <div className="results-dropdown" ref={resultsRef}>
            <div className="results-header">
              <div className="ai-status">
                <span className="ai-pulse"></span>
                <span className="ai-label">AI is generating response...</span>
              </div>
              <button 
                onClick={() => setShowResults(false)} 
                className="close-results"
                aria-label="Close results"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M6 6L18 18" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            
            <div className="results-content">
              <div className="answer-container">
                <pre className="answer-text">
                  {typedAnswer}
                  {isTyping && <span className="typing-cursor">▊</span>}
                </pre>
              </div>
            </div>

            <div className="results-footer">
              <div className="footer-info">
                <span className="ai-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  AI Generated Response
                </span>
                <span className="timestamp">Just now</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSection;