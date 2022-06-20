import React, { useState, useRef } from 'react';
import audio from './audios';
import getDay from './utils/getDay';

const arrayAudios = [audio.sextou, audio.segundou, audio.tercou,
  audio.quartou, audio.quintou, audio.sextou, audio.sextou];

function App() {
  const [timer, setTimer] = useState(6);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const increment = useRef(null);

  React.useEffect(() => {
    if (timer === 0) {
      window.clearInterval(increment.current);
      setIsPaused(false);
      setIsActive(false);
      setTimer(600);
      const music = new Audio(arrayAudios[getDay()]);
      music.play();
    }
  }, [timer]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(increment.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(increment.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(600);
  };

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  const renderButtons = () => {
    if (!isActive && !isPaused) return <button type="button" onClick={handleStart}>Start</button>;
    if (isPaused) return <button type="button" onClick={handlePause}>Pause</button>;
    return <button type="button" onClick={handleResume}>Resume</button>;
  };

  return (
    <div className="app">
      <h3>React Stopwatch</h3>
      <div className="stopwatch-card">
        <p>{formatTime()}</p>
        <div className="buttons">
          {
            renderButtons()
          }
          <button type="button" onClick={handleReset} disabled={!isActive}>Reset</button>
          <button type="button" onClick={() => setTimer(600)}>Teste</button>
        </div>
      </div>
    </div>
  );
}

export default App;
