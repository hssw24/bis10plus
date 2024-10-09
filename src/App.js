import React, { useState } from "react";
import "./App.css";

function App() {
  // Funktion, um eine neue Aufgabe zu generieren
  const generateNewQuestion = () => {
    const num1 = Math.floor(Math.random() * 11); // Zahl 1 (0-10)
    const num2 = Math.floor(Math.random() * 11); // Zahl 2 (0-10)
    return { num1, num2 };
  };

  // Initialer Zustand: Aufgabe generieren
  const [question, setQuestion] = useState(generateNewQuestion());
  const [correct, setCorrect] = useState(null); // Richtig oder falsch
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
    // Neue Aufgabe nach 1 Sekunde anzeigen
    setTimeout(() => {
      setCorrect(null);
      setQuestion(generateNewQuestion());
    }, 1000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mathe App für Yusra</h1>
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
        {correct === true && <p className="correct">Richtig!</p>}
        {correct === false && <p className="incorrect">Falsch!</p>}

        {/* Punktestand */}
        <p>Punktestand: {score}</p>
      </header>
    </div>
  );
}

export default App;