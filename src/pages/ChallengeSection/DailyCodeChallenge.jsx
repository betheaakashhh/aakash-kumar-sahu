import React, { useState, useEffect } from 'react';

const DailyCodeChallenge = () => {
  const [activeTab, setActiveTab] = useState('problem');
  const [code, setCode] = useState('// Write your solution here\nfunction solution() {\n  \n}');
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [theme, setTheme] = useState('dark');

  // Daily challenges - rotate based on day of year
  const challenges = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      examples: [
        { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
        { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
      ],
      constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Only one valid answer exists"],
      starterCode: "function twoSum(nums, target) {\n  // Write your code here\n  \n}",
      testCases: [
        { input: "[2,7,11,15], 9", expected: "[0,1]" },
        { input: "[3,2,4], 6", expected: "[1,2]" }
      ]
    },
    {
      id: 2,
      title: "Reverse String",
      difficulty: "Easy",
      description: "Write a function that reverses a string. The input string is given as an array of characters s.",
      examples: [
        { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
        { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' }
      ],
      constraints: ["1 <= s.length <= 10^5", "s[i] is a printable ascii character"],
      starterCode: "function reverseString(s) {\n  // Write your code here\n  \n}",
      testCases: [
        { input: '["h","e","l","l","o"]', expected: '["o","l","l","e","h"]' }
      ]
    },
    {
      id: 3,
      title: "Valid Parentheses",
      difficulty: "Medium",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets, and open brackets must be closed in the correct order.",
      examples: [
        { input: 's = "()"', output: 'true' },
        { input: 's = "()[]{}"', output: 'true' },
        { input: 's = "(]"', output: 'false' }
      ],
      constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'"],
      starterCode: "function isValid(s) {\n  // Write your code here\n  \n}",
      testCases: [
        { input: '"()"', expected: 'true' },
        { input: '"(]"', expected: 'false' }
      ]
    },
    {
      id: 4,
      title: "Merge Two Sorted Lists",
      difficulty: "Easy",
      description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.",
      examples: [
        { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
        { input: 'list1 = [], list2 = []', output: '[]' }
      ],
      constraints: ["The number of nodes in both lists is in the range [0, 50]", "-100 <= Node.val <= 100"],
      starterCode: "function mergeTwoLists(list1, list2) {\n  // Write your code here\n  \n}",
      testCases: [
        { input: '[1,2,4], [1,3,4]', expected: '[1,1,2,3,4,4]' }
      ]
    },
    {
      id: 5,
      title: "Maximum Subarray",
      difficulty: "Medium",
      description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      examples: [
        { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
        { input: 'nums = [1]', output: '1' }
      ],
      constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
      starterCode: "function maxSubArray(nums) {\n  // Write your code here\n  \n}",
      testCases: [
        { input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6' }
      ]
    }
  ];

  // Get daily challenge based on day of year
  const getDailyChallenge = () => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return challenges[dayOfYear % challenges.length];
  };

  const [currentChallenge, setCurrentChallenge] = useState(getDailyChallenge());

  useEffect(() => {
    setCode(currentChallenge.starterCode);
  }, [currentChallenge]);

  const handleRunCode = () => {
    try {
      setOutput('Running tests...\n');
      // Simulate test execution
      setTimeout(() => {
        const results = currentChallenge.testCases.map((test, idx) => ({
          passed: Math.random() > 0.3, // Simulate pass/fail
          input: test.input,
          expected: test.expected,
          testNum: idx + 1
        }));
        setTestResults(results);
        const passedCount = results.filter(r => r.passed).length;
        setOutput(`Tests completed: ${passedCount}/${results.length} passed\n\n${results.map(r => 
          `Test ${r.testNum}: ${r.passed ? '✅ PASSED' : '❌ FAILED'}\nInput: ${r.input}\nExpected: ${r.expected}`
        ).join('\n\n')}`);
      }, 1000);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const handleSubmit = () => {
    alert('🎉 Solution submitted! In a real implementation, this would validate against all test cases.');
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return '#00b8a3';
      case 'medium': return '#ffa116';
      case 'hard': return '#ef4743';
      default: return '#666';
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
      color: theme === 'dark' ? '#d4d4d4' : '#333',
      fontFamily: "'Consolas', 'Courier New', monospace",
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Top Bar */}
      <div style={{
        height: '35px',
        backgroundColor: theme === 'dark' ? '#323233' : '#f3f3f3',
        borderBottom: `1px solid ${theme === 'dark' ? '#1e1e1e' : '#e0e0e0'}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#ff5f57'
          }}></div>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#ffbd2e'
          }}></div>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#28ca42'
          }}></div>
          <span style={{
            marginLeft: '10px',
            fontSize: '13px',
            fontWeight: '500'
          }}>Daily Code Challenge</span>
        </div>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{
            background: 'none',
            border: 'none',
            color: theme === 'dark' ? '#d4d4d4' : '#333',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '4px 8px'
          }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden'
      }}>
        {/* Left Panel - Problem Description */}
        <div style={{
          width: '45%',
          borderRight: `1px solid ${theme === 'dark' ? '#1e1e1e' : '#e0e0e0'}`,
          overflow: 'auto',
          padding: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '600'
            }}>
              {currentChallenge.title}
            </h2>
            <span style={{
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '600',
              backgroundColor: getDifficultyColor(currentChallenge.difficulty) + '20',
              color: getDifficultyColor(currentChallenge.difficulty)
            }}>
              {currentChallenge.difficulty}
            </span>
          </div>

          <div style={{
            backgroundColor: theme === 'dark' ? '#252526' : '#f5f5f5',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '20px',
            fontSize: '13px',
            color: theme === 'dark' ? '#ffa500' : '#ff8c00'
          }}>
            🗓️ Challenge updates daily at midnight
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: theme === 'dark' ? '#4ec9b0' : '#0066cc'
            }}>Description</h3>
            <p style={{
              lineHeight: '1.6',
              fontSize: '14px'
            }}>
              {currentChallenge.description}
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '12px',
              color: theme === 'dark' ? '#4ec9b0' : '#0066cc'
            }}>Examples</h3>
            {currentChallenge.examples.map((example, idx) => (
              <div key={idx} style={{
                backgroundColor: theme === 'dark' ? '#252526' : '#f5f5f5',
                padding: '12px',
                borderRadius: '6px',
                marginBottom: '12px',
                fontSize: '13px'
              }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Input:</strong> <code style={{
                    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#e0e0e0',
                    padding: '2px 6px',
                    borderRadius: '3px'
                  }}>{example.input}</code>
                </div>
                <div style={{ marginBottom: example.explanation ? '8px' : '0' }}>
                  <strong>Output:</strong> <code style={{
                    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#e0e0e0',
                    padding: '2px 6px',
                    borderRadius: '3px'
                  }}>{example.output}</code>
                </div>
                {example.explanation && (
                  <div style={{ color: theme === 'dark' ? '#9cdcfe' : '#666' }}>
                    <strong>Explanation:</strong> {example.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: theme === 'dark' ? '#4ec9b0' : '#0066cc'
            }}>Constraints</h3>
            <ul style={{
              lineHeight: '1.8',
              fontSize: '13px',
              paddingLeft: '20px'
            }}>
              {currentChallenge.constraints.map((constraint, idx) => (
                <li key={idx}>{constraint}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div style={{
          width: '55%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Tab Bar */}
          <div style={{
            display: 'flex',
            backgroundColor: theme === 'dark' ? '#252526' : '#f3f3f3',
            borderBottom: `1px solid ${theme === 'dark' ? '#1e1e1e' : '#e0e0e0'}`
          }}>
            <button
              onClick={() => setActiveTab('problem')}
              style={{
                padding: '10px 20px',
                backgroundColor: activeTab === 'problem' ? (theme === 'dark' ? '#1e1e1e' : '#ffffff') : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'problem' ? `2px solid #007acc` : 'none',
                color: activeTab === 'problem' ? (theme === 'dark' ? '#ffffff' : '#333') : (theme === 'dark' ? '#969696' : '#666'),
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: 'inherit'
              }}
            >
              📝 Solution.js
            </button>
            <button
              onClick={() => setActiveTab('output')}
              style={{
                padding: '10px 20px',
                backgroundColor: activeTab === 'output' ? (theme === 'dark' ? '#1e1e1e' : '#ffffff') : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'output' ? `2px solid #007acc` : 'none',
                color: activeTab === 'output' ? (theme === 'dark' ? '#ffffff' : '#333') : (theme === 'dark' ? '#969696' : '#666'),
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: 'inherit'
              }}
            >
              🖥️ Output
            </button>
          </div>

          {/* Code Editor / Output Panel */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            {activeTab === 'problem' ? (
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck="false"
                  style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
                    color: theme === 'dark' ? '#d4d4d4' : '#333',
                    border: 'none',
                    padding: '20px',
                    fontSize: '14px',
                    fontFamily: "'Consolas', 'Courier New', monospace",
                    resize: 'none',
                    outline: 'none',
                    lineHeight: '1.6',
                    tabSize: 2
                  }}
                />
                
                {/* Action Buttons */}
                <div style={{
                  padding: '12px 20px',
                  backgroundColor: theme === 'dark' ? '#252526' : '#f3f3f3',
                  borderTop: `1px solid ${theme === 'dark' ? '#1e1e1e' : '#e0e0e0'}`,
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    onClick={handleRunCode}
                    style={{
                      padding: '8px 20px',
                      backgroundColor: theme === 'dark' ? '#0e639c' : '#007acc',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                      fontFamily: 'inherit'
                    }}
                  >
                    ▶️ Run Code
                  </button>
                  <button
                    onClick={handleSubmit}
                    style={{
                      padding: '8px 20px',
                      backgroundColor: theme === 'dark' ? '#165c16' : '#16825d',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                      fontFamily: 'inherit'
                    }}
                  >
                    ✅ Submit
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                height: '100%',
                backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
                padding: '20px',
                overflow: 'auto',
                fontSize: '13px',
                whiteSpace: 'pre-wrap',
                fontFamily: "'Consolas', 'Courier New', monospace"
              }}>
                {output || 'Click "Run Code" to see test results...'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div style={{
        height: '24px',
        backgroundColor: theme === 'dark' ? '#007acc' : '#007acc',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        fontSize: '12px',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <span>📊 JavaScript</span>
          <span>⚡ Ready</span>
        </div>
        <div>
          Challenge #{currentChallenge.id} of {challenges.length}
        </div>
      </div>
    </div>
  );
};

export default DailyCodeChallenge;