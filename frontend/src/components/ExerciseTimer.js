import React, { useState, useEffect } from 'react';
import { IoPlay, IoPause, IoRefresh, IoTimeOutline } from 'react-icons/io5';
import './ExerciseTimer.css';

const ExerciseTimer = ({ type = 'breathing', duration = 300, onClose }) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState('Inhale'); // Inhale, Hold, Exhale, Hold

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);

                // Breathing logic (4-7-8 technique)
                if (type === 'breathing') {
                    const cycle = 19; // 4+7+8
                    const timeInCycle = timeLeft % cycle;
                    if (timeInCycle > 15) setPhase('Inhale (4s)');
                    else if (timeInCycle > 8) setPhase('Hold (7s)');
                    else setPhase('Exhale (8s)');
                } else {
                    setPhase('Focus');
                }
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            setPhase('Completed!');
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, type]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(duration);
        setPhase('Ready');
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const getProgress = () => {
        return ((duration - timeLeft) / duration) * 100;
    };

    return (
        <div className="exercise-timer-card">
            <div className="timer-header">
                <div className="timer-icon-wrapper">
                    <IoTimeOutline />
                </div>
                <h3>{type === 'breathing' ? 'Deep Breathing' : 'Meditation'}</h3>
                <p>{type === 'breathing' ? '4-7-8 Relaxation Technique' : 'Mindfulness Session'}</p>
            </div>

            <div className="timer-display">
                <div className="circular-progress">
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" className="progress-bg" />
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            className="progress-fill"
                            style={{ strokeDashoffset: 283 - (283 * getProgress()) / 100 }}
                        />
                    </svg>
                    <div className="time-text">
                        <span className="phase-text">{phase}</span>
                        <span className="time-value">{formatTime(timeLeft)}</span>
                    </div>
                </div>
            </div>

            <div className="timer-controls">
                <button className={`control-btn ${isActive ? 'pause' : 'play'}`} onClick={toggleTimer}>
                    {isActive ? <IoPause /> : <IoPlay />}
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button className="control-btn reset" onClick={resetTimer}>
                    <IoRefresh />
                </button>
            </div>
        </div>
    );
};

export default ExerciseTimer;
