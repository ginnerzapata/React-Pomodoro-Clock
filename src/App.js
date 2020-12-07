import React, {useState, useRef} from 'react';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0')
}

let intervalRef =null

export default function App() {

  const [title, setTitle] = useState('Let the countdown begin!!!')
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const minutes = padTime(Math.floor(timeLeft / 60))
  const seconds = padTime((timeLeft - minutes * 60))

  function startTimer() {
    if(intervalRef !== null) return;
    setIsRunning(true)
    setTitle("You're doing Great!")
    intervalRef = setInterval(() => {
      setTimeLeft(timeLeft => {
        if(timeLeft === 0) resetTimer()
        return timeLeft >= 1 ? timeLeft -1 : 0
      })
    }, 1000)
  }

  function stopTimer() {
    if(intervalRef === null)  return
    clearInterval(intervalRef)
    intervalRef = null
    setIsRunning(false)
    setTitle('Keep it up!')
  }
  
  function resetTimer() {
    clearInterval(intervalRef)
    intervalRef = null
    setIsRunning(false)
    setTitle('Ready to go another round?')
    setTimeLeft(25 * 60)
  }

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick ={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
