import React from "react";
import "./ImageHeroSection.css";

const ImageHeroSection = () => {
  const codeSnippets = [
    `<!-- HTML: Portfolio Card -->
<div class="profile-card">
  <img src="profile.jpg" alt="Aakash" class="avatar" />
  <h2 class="username">Aakash Kumar</h2>
  <p class="role">Full-Stack Developer</p>

  <div class="social-links">
    <a href="#">GitHub</a>
    <a href="#">LinkedIn</a>
  </div>
</div>`,

    `// JavaScript: Fetch API + Async Logic
async function fetchUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    if (!response.ok) throw new Error("Failed to load data");

    const user = await response.json();
    console.log("User Loaded:", user);

    return user;
  } catch (err) {
    console.error("Error:", err.message);
  }
}

fetchUser(101);`,

    `/* CSS: Glassmorphism Card */
.glass-card {
  padding: 20px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.glass-card:hover {
  transform: translateY(-4px);
  transition: 0.3s ease;
}`,

    `-- SQL: Users Table Query
SELECT id, name, email, created_at
FROM users
WHERE status = 'active'
ORDER BY created_at DESC
LIMIT 10;

INSERT INTO users (name, email, status)
VALUES ('Aakash', 'aakash@example.com', 'active');`,

    `// MongoDB: Aggregation Pipeline
db.orders.aggregate([
  { $match: { status: "delivered" } },
  {
    $group: {
      _id: "$customerId",
      totalSpent: { $sum: "$amount" },
      orders: { $push: "$_id" }
    }
  },
  { $sort: { totalSpent: -1 } },
  { $limit: 5 }
]);`,
  ];

  const [typedCode, setTypedCode] = React.useState("");
  const [snippetIndex, setSnippetIndex] = React.useState(0);
  const [isTyping, setIsTyping] = React.useState(true);

  const currentSnippet = codeSnippets[snippetIndex];

  // Typing effect
  React.useEffect(() => {
    if (!isTyping) return;

    if (typedCode.length < currentSnippet.length) {
      const timer = setTimeout(() => {
        setTypedCode(currentSnippet.substring(0, typedCode.length + 1));
      }, 25);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setIsTyping(false);
      }, 800);
    }
  }, [typedCode, isTyping, currentSnippet]);

  React.useEffect(() => {
    if (isTyping) return;

    if (typedCode.length > 0) {
      const timer = setTimeout(() => {
        setTypedCode(typedCode.substring(0, typedCode.length - 2));
      }, 20);
      return () => clearTimeout(timer);
    } else {
      setSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
      setIsTyping(true);
    }
  }, [isTyping, typedCode]);

  const escapeHTML = (str) =>
    str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const highlightCode = (code) => {
    code = code
      .replace(/(<!--[\s\S]*?-->)/gm, '<span class="code-comment">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/gm, '<span class="code-comment">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>');

    code = code.replace(
      /("[^"]*"|'[^']*')/g,
      '<span class="code-string">$1</span>'
    );

    code = code.replace(
      /(&lt;\/?)([\w-]+)(.*?&gt;)/g,
      '$1<span class="code-tag">$2</span>$3'
    );

    code = code.replace(
      /\b(const|let|var|function|return|async|await|try|catch|if|else|for|while|switch|case|break|default|class|new|throw|extends|import|export)\b/g,
      '<span class="code-keyword">$1</span>'
    );

    code = code.replace(
      /\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|DELETE|ORDER|BY|GROUP|LIMIT|DESC|ASC)\b/gi,
      '<span class="code-sql">$1</span>'
    );

    code = code.replace(/\b([0-9]+)\b/g, '<span class="code-number">$1</span>');

    return code;
  };

  return (
    <div className="modern-dark-section">
      <div className="modern-dark-background">
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
        <div className="floating-orb orb-3" />
      </div>

      <div className="content-container">
      

        <div className="images-container">

          {/* Card 1 */}
          <div className="image-wrapper image-1">
            <div className="glassy-image">
              <div className="image-content">
                <div className="image-overlay" />
                <div className="image-text">
                  <h3>Full-Stack Development</h3>
                  <p>Building robust & modern web solutions</p>
                </div>
              </div>
            </div>
            <div className="floating-dots" />
          </div>

          {/* Card 2 */}
          <div className="image-wrapper image-2">
            <div className="glassy-image">
              <div className="image-content">
                <div className="image-overlay" />

                <div
                  className="typing-code-box"
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(escapeHTML(typedCode)),
                  }}
                />

                <div className="image-text">
                  <h3>Clean Code Advocate</h3>
                  <p>Prioritizing clarity, readability & efficiency</p>
                </div>
              </div>
            </div>
            <div className="floating-dots" />
          </div>

          {/* Card 3 */}
          <div className="image-wrapper image-3">
            <div className="glassy-image">
              <div className="image-content continuous-learner">

                <div className="brainwave-lines"></div>
                <div className="rotating-icon">💡</div>

                <div className="image-overlay"></div>

                <div className="image-text">
                  <h3>Continuous Learner</h3>
                  <p>Growing every day through curiosity & exploration.</p>
                </div>

              </div>
            </div>
            <div className="floating-dots" />
          </div>
        </div>

        <div className="floating-text-elements">
          <div className="floating-text text-1">Innovate</div>
          <div className="floating-text text-2">Engineer</div>
          <div className="floating-text text-3">Build</div>
          <div className="floating-text text-4">Excel</div>
        </div>
      </div>
    </div>
  );
};

export default ImageHeroSection;
