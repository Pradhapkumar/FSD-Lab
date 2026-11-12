import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQuestions = useCallback(() => {
    setLoading(true);
    setError("");
    fetch(`${API_BASE}/api/questions`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        setAnswers({});
        setScore(0);
        setSubmitted(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setError("Unable to load questions. Ensure backend & MongoDB are running.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    let total = 0;
    questions.forEach((question) => {
      if (answers[question._id] === question.answer) {
        total++;
      }
    });

    setScore(total);
    setSubmitted(true);

    try {
      await fetch(`${API_BASE}/api/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          score: total,
          total: questions.length
        })
      });
    } catch (err) {
      console.log("Error saving response:", err);
    }
  };

  return (
    <div className="container">
      <h1>Online Survey Application</h1>

      {loading ? (
        <p className="status-text">Loading survey questions...</p>
      ) : error ? (
        <div className="result">
          <p className="error-text">{error}</p>
          <button type="button" onClick={fetchQuestions}>
            Retry
          </button>
        </div>
      ) : !submitted ? (
        <>
          <h2>Answer the following {questions.length} questions</h2>
          {questions.length === 0 ? (
            <p className="status-text">No questions found in database.</p>
          ) : (
            <>
              {questions.map((question, index) => (
                <div className="question" key={question._id}>
                  <h3>
                    {index + 1}. {question.question}
                  </h3>
                  <div className="options">
                    {question.options.map((option) => (
                      <label key={option}>
                        <input
                          type="radio"
                          name={question._id}
                          value={option}
                          checked={answers[question._id] === option}
                          onChange={() => handleAnswer(question._id, option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button type="button" onClick={handleSubmit}>
                Submit Survey
              </button>
            </>
          )}
        </>
      ) : (
        <div className="result">
          <h2>Survey Completed!</h2>
          <h3>
            Your Score: {score} / {questions.length}
          </h3>
          <button type="button" onClick={fetchQuestions}>
            Take Survey Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

