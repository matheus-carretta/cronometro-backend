import React, { useState, useRef } from 'react';
import audio from './audios';
import getDay from './utils/getDay';
import Header from './components/Header';
import Footer from './components/Footer';
import './style.css';

const arrayAudios = [audio.sextou, audio.segundou, audio.tercou,
  audio.quartou, audio.quintou, audio.sextou, audio.sextou];

function App() {
  const [timer, setTimer] = useState(600);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const increment = useRef(null);

  React.useEffect(() => {
    if (timer === 0) {
      window.clearInterval(increment.current);
      setIsPaused(true);
      setIsActive(false);
      setTimer(600);
      const music = new Audio(arrayAudios[getDay()]);
      music.play();
    }
  }, [timer]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    increment.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(increment.current);
    setIsPaused(true);
    setIsActive(false);
  };

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  const renderButtons = () => {
    if (!isActive && isPaused) return <button type="button" className="start" onClick={handleStart}>Start</button>;
    return <button type="button" className="start" onClick={handlePause}>Pause</button>;
  };

  return (
    <main>
      <div className="container">
        <Header />
        <div className="stopwatch-card">
          <p className="timer">{formatTime()}</p>
          <div className="timer-buttons">
            <button type="button" className="btn10" onClick={() => setTimer(600)} disabled={isActive}>10 minutos</button>
            <button type="button" className="btn8" onClick={() => setTimer(480)} disabled={isActive}>8 minutos</button>
            <button type="button" className="btn7" onClick={() => setTimer(420)} disabled={isActive}>7 minutos</button>
            <button type="button" className="btn5" onClick={() => setTimer(300)} disabled={isActive}>5 minutos</button>
            <button type="button" className="btn2" onClick={() => setTimer(2)} disabled={isActive}>2 segundos</button>
          </div>
          <div className="buttons">
            {
            renderButtons()
          }
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}

export default App;
