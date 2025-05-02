// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import baseQuestions from './questions';
import { getBestMatch } from './archetypes';

export default function App() {
  const [questions, setQuestions] = useState(baseQuestions.slice(0, 5));
  const [currentId, setCurrentId] = useState(baseQuestions[0].id);
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState({ desire: 0, violence: 0 , approach: 0});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (answers.length === 5) {
      setLoading(true);
      fetch('https://hiddenmotives.onrender.com/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, total: 20, axes: ['desire', 'violence', 'approach'] }),
      })
        .then(res => res.text().then(text => ({ ok: res.ok, text })))
        .then(({ ok, text }) => {
          if (!ok) throw new Error(text);
          return JSON.parse(text);
        })
        .then(generated => setQuestions(prev => [...prev, ...generated]))
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [answers]);

  const question = questions.find(q => q.id === currentId);

  function chooseOption(opt) {
    setScores(s => ({
      desire: s.desire + opt.desire,
      violence: s.violence + opt.violence,
      approach: s.approach + opt.approach,
    }));

    setAnswers(a => [
      ...a,
      {
        questionId: currentId,
        text: question.text,
        choice: opt.text,
        desire: opt.desire,
        violence: opt.violence,
        approach: opt.approach,
        nextId: opt.nextId,
      }
    ]);

    const nextCount = answers.length + 1;
    if (nextCount >= 20 || !opt.nextId) {
      setCurrentId(null);
    } else {
      setCurrentId(opt.nextId);
    }
  }

  if (loading) {
    return (
      <div className="app">
        <div className="quiz-box">
          <p className="loading">Loading questions...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="app">
        <div className="quiz-box">
          <p className="error-message">Error: {error}</p>
        </div>
      </div>
    );
  }
  if (currentId === null) {
    const { name, desc } = getBestMatch(scores);
    return (
      <div className="app">
        <div className="result">
          <h1 className="result-title">{name}</h1>
          <p className="result-desc">{desc}</p>
          <p className="result-stats">
            <strong>Desire:</strong> {scores.desire} | <strong>Violence:</strong> {scores.violence} | <strong>Approach:</strong> {scores.approach}
          </p>
        </div>
      </div>
    );
  }
  if (!question) {
    return (
      <div className="app">
        <div className="quiz-box">
          <p className="loading">Preparing next questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="quiz-box">
        <div className="header">
          <h2 className="question-number">Question {answers.length + 1} of 20</h2>
        </div>
        <p className="question">{question.text}</p>
        <div className="options">
          {question.options.map((opt, i) => (
            <button
              key={i}
              className="option-button"
              onClick={() => chooseOption(opt)}
            >
              {opt.text}
            </button>
          ))}
        </div>
        <p className="progress-text">Progress: {answers.length}/20</p>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${(answers.length / 20) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
