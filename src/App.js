import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const generateNewQuestion = () => {
    const num1 = Math.floor(Math.random() * 11); // Zahl 1 (0-10)
    const num2 = Math.floor(Math.random() * 11); // Zahl 2 (0-10)
    return { num1, num2 };
  };

  // Initialer Zustand
  const [question, setQuestion] = useState(generateNewQuestion());
  const [correct, setCorrect] = useState(null); // Zustand für Richtig/Falsch
  const [score, setScore] = useState(0); // Punktestand

  // Funktion zum Überprüfen der Antwort
  const checkAnswer = (answer) => {
    const { num1, num2 } = question;
    const correctAnswer = num1 + num2;
    if (answer === correctAnswer) {
      setCorrect(true);
      setScore(score + 1);
    } else {
      setCorrect(false);
    }
  };

  // Effekt zum Aktualisieren der Frage nach 1 Sekunde, wenn die Antwort bewertet wurde
  useEffect(() => {
    if (correct !== null) {
      const timer = setTimeout(() => {
        setCorrect(null); // Rücksetzen des Feedbacks
        setQuestion(generateNewQuestion()); // Neue Frage generieren
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [correct]); // Der Effekt wird ausgelöst, wenn sich der Zustand "correct" ändert

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mathe für Yusra</h1>
        <p>
          {question.num1} + {question.num2} = 
        </p>

        {/* Buttons für die Antworten */}
        <div className="button-grid">
          {Array.from({ length: 21 }, (_, i) => (
            <button key={i} onClick={() => checkAnswer(i)} className="answer-button">
              {i}
            </button>
          ))}
        </div>

        {/* Rückmeldung, ob die Antwort korrekt war */}
        <div className="feedback-container">
          {correct === true && <p className="correct">Richtig!</p>}
          {correct === false && <p className="incorrect">Falsch!</p>}
        </div>

        {/* Punktestand */}
        <p>Punktestand: {score}</p>
      </header>
    </div>
  );
}

export default App;