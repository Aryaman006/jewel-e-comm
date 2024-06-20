import React, { useEffect, useRef, useState } from 'react';
import './ring-animation.css'; // Import CSS file for styling

const RingAnimation = () => {
    const [isVisible, setIsVisible] = useState(false);
    const playRef = useRef(null);

    useEffect(() => {
        // Simulate a user interaction by clicking the button programmatically
        playRef.current.click();
    }, []);

    const playRingSound = () => {
        setIsVisible(true);

        // Create a new Audio object with the correct path
        const ringSound = new Audio('/ring-drop.mp3');
        
        // Play the sound
        ringSound.play().catch(error => console.error('Error playing sound:', error));

        // Set a timeout to hide the ring after 2 seconds (matching the animation duration)
        setTimeout(() => {
            setIsVisible(false);
        }, 2000);
    };

    return (
        <div >
            <button ref={playRef} onClick={playRingSound}>btn</button>

            <div className={`ring-container ${isVisible ? 'visible' : ''}`}>
                <img src="/ring.jpg" alt="Ring" className="ring" />
            </div>
        </div>
    );
};

export default RingAnimation;
