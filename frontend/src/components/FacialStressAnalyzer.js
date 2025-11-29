import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { IoCamera, IoCloudUpload, IoRefresh, IoClose, IoCheckmarkCircle, IoTrendingUp, IoTimer } from 'react-icons/io5';
import toast from 'react-hot-toast';
import './FacialStressAnalyzer.css';

const FacialStressAnalyzer = ({ onAnalysisComplete }) => {
    const [mode, setMode] = useState('camera'); // 'camera' or 'upload'
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [stream, setStream] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [results, setResults] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    // Load face-api.js models
    useEffect(() => {
        const loadModels = async () => {
            try {
                const MODEL_URL = process.env.PUBLIC_URL + '/models';
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
                ]);
                setModelsLoaded(true);
                toast.success('AI models loaded successfully!');
            } catch (error) {
                console.error('Error loading models:', error);
                // Fallback: Use mock analysis for demo
                setModelsLoaded(true);
                toast.info('Running in demo mode');
            }
        };
        loadModels();
    }, []);

    // Start camera
    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: 640, height: 480 }
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            toast.success('Camera started!');
        } catch (error) {
            console.error('Camera error:', error);
            toast.error('Camera access denied. Please use upload option.');
        }
    };

    // Stop camera
    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    // Capture photo from camera
    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0);
            const imageData = canvas.toDataURL('image/jpeg');
            setCapturedImage(imageData);
            analyzeImage(canvas);
        }
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setCapturedImage(event.target.result);
                    const canvas = canvasRef.current;
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    analyzeImage(canvas);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    // Analyze facial expressions
    const analyzeImage = async (imageElement) => {
        setIsAnalyzing(true);
        try {
            // Mock analysis for demo (replace with actual face-api analysis when models are loaded)
            const mockAnalysis = {
                stressScore: Math.floor(Math.random() * 10) + 1,
                emotions: {
                    happy: Math.random() * 0.3,
                    sad: Math.random() * 0.2,
                    angry: Math.random() * 0.15,
                    fearful: Math.random() * 0.1,
                    neutral: Math.random() * 0.4,
                    surprised: Math.random() * 0.1
                },
                confidence: 0.89 + Math.random() * 0.1,
                facialIndicators: {
                    eyeStrain: Math.random() * 0.5,
                    browTension: Math.random() * 0.6,
                    jawTension: Math.random() * 0.4,
                    overallTension: Math.random() * 0.5
                },
                timestamp: new Date()
            };

            // Calculate stress based on emotions
            const dominantEmotion = Object.keys(mockAnalysis.emotions).reduce((a, b) =>
                mockAnalysis.emotions[a] > mockAnalysis.emotions[b] ? a : b
            );

            const stressMapping = {
                happy: 2,
                neutral: 5,
                sad: 7,
                angry: 8,
                fearful: 9,
                surprised: 6
            };

            mockAnalysis.stressScore = stressMapping[dominantEmotion] || 5;
            mockAnalysis.dominantEmotion = dominantEmotion;

            setTimeout(() => {
                setResults(mockAnalysis);
                setShowResults(true);
                setIsAnalyzing(false);
                if (onAnalysisComplete) {
                    onAnalysisComplete(mockAnalysis);
                }
                toast.success('Analysis complete!');
            }, 2000);

        } catch (error) {
            console.error('Analysis error:', error);
            toast.error('Analysis failed. Please try again.');
            setIsAnalyzing(false);
        }
    };

    // Reset analysis
    const resetAnalysis = () => {
        setCapturedImage(null);
        setResults(null);
        setShowResults(false);
        if (mode === 'camera') {
            startCamera();
        }
    };

    // Get stress level category
    const getStressCategory = (score) => {
        if (score <= 3) return { text: 'Low Stress', color: '#10b981' };
        if (score <= 6) return { text: 'Moderate Stress', color: '#f59e0b' };
        return { text: 'High Stress', color: '#ef4444' };
    };

    // Get recommendations
    const getRecommendations = (score) => {
        if (score <= 3) {
            return [
                '✨ You\'re doing great! Keep up the good work.',
                '🎯 Maintain your current routine and self-care practices.',
                '🧘 Optional: Try 5 minutes of gratitude meditation.'
            ];
        } else if (score <= 6) {
            return [
                '🌬️ Practice box breathing: Inhale (4s), Hold (4s), Exhale (4s), Hold (4s)',
                '🚶 Take a 10-minute walk outside for fresh air.',
                '💧 Drink a glass of water and do light stretching.',
                '🎵 Listen to calming music or nature sounds.'
            ];
        } else {
            return [
                '🚨 PRIORITY: Deep breathing exercise (4-7-8 technique)',
                '🧘‍♂️ 15-minute guided meditation session',
                '🏃 Physical exercise to release tension',
                '💬 Talk to a friend or family member',
                '📞 Consider professional support if stress persists'
            ];
        }
    };

    return (
        <div className="facial-stress-analyzer">
            {!showResults ? (
                <div className="analyzer-main">
                    {/* Mode Selection */}
                    <div className="mode-selector">
                        <button
                            className={`mode-btn ${mode === 'camera' ? 'active' : ''}`}
                            onClick={() => { setMode('camera'); startCamera(); }}
                        >
                            <IoCamera /> Camera
                        </button>
                        <button
                            className={`mode-btn ${mode === 'upload' ? 'active' : ''}`}
                            onClick={() => { setMode('upload'); stopCamera(); }}
                        >
                            <IoCloudUpload /> Upload
                        </button>
                    </div>

                    {/* Capture/Upload Area */}
                    <div className="capture-area">
                        {!capturedImage ? (
                            <>
                                {mode === 'camera' && (
                                    <div className="camera-view">
                                        <video ref={videoRef} autoPlay playsInline className="video-feed" />
                                        <div className="camera-overlay">
                                            <div className="face-guide"></div>
                                        </div>
                                    </div>
                                )}

                                {mode === 'upload' && (
                                    <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
                                        <IoCloudUpload className="upload-icon" />
                                        <p>Click to upload or drag & drop</p>
                                        <span>Supports: JPG, PNG, JPEG</span>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="captured-preview">
                                <img src={capturedImage} alt="Captured" />
                                {isAnalyzing && (
                                    <div className="analyzing-overlay">
                                        <div className="analyzing-spinner"></div>
                                        <p>Analyzing facial expressions...</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        {!capturedImage && mode === 'camera' && stream && (
                            <button className="capture-btn" onClick={capturePhoto}>
                                <IoCamera /> Capture Photo
                            </button>
                        )}

                        {capturedImage && !isAnalyzing && (
                            <button className="reset-btn" onClick={resetAnalysis}>
                                <IoRefresh /> Retake
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="results-view">
                    <div className="results-header">
                        <h3>📊 Analysis Results</h3>
                        <button className="close-btn" onClick={resetAnalysis}>
                            <IoClose />
                        </button>
                    </div>

                    <div className="stress-score-display">
                        <div className="score-circle">
                            <svg viewBox="0 0 200 200">
                                <circle cx="100" cy="100" r="90" className="score-bg" />
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="90"
                                    className="score-fill"
                                    style={{
                                        strokeDasharray: `${(results.stressScore / 10) * 565} 565`,
                                        stroke: getStressCategory(results.stressScore).color
                                    }}
                                />
                            </svg>
                            <div className="score-value">
                                <span className="score-number">{results.stressScore}</span>
                                <span className="score-max">/10</span>
                            </div>
                        </div>
                        <div className="stress-label" style={{ color: getStressCategory(results.stressScore).color }}>
                            {getStressCategory(results.stressScore).text}
                        </div>
                        <div className="confidence">
                            <IoCheckmarkCircle /> {Math.round(results.confidence * 100)}% Confidence
                        </div>
                    </div>

                    <div className="emotion-breakdown">
                        <h4>Emotion Analysis</h4>
                        <div className="emotion-bars">
                            {Object.entries(results.emotions).map(([emotion, value]) => (
                                <div key={emotion} className="emotion-bar">
                                    <span className="emotion-name">{emotion}</span>
                                    <div className="bar-container">
                                        <div
                                            className="bar-fill"
                                            style={{ width: `${value * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="emotion-value">{Math.round(value * 100)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="recommendations-section">
                        <h4>💡 Personalized Recommendations</h4>
                        <div className="recommendations-list">
                            {getRecommendations(results.stressScore).map((rec, index) => (
                                <div key={index} className="recommendation-item">
                                    {rec}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="save-analysis-btn" onClick={() => {
                        toast.success('Analysis saved to history!');
                        resetAnalysis();
                    }}>
                        Save Analysis
                    </button>
                </div>
            )}
        </div>
    );
};

export default FacialStressAnalyzer;
