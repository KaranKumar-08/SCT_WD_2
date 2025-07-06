document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#0ff0fc" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { 
                enable: true, 
                distance: 150, 
                color: "#0ff0fc", 
                opacity: 0.2, 
                width: 1 
            },
            move: { 
                enable: true, 
                speed: 2, 
                direction: "none", 
                random: true, 
                straight: false, 
                out_mode: "out" 
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });

    // DOM elements
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const millisecondsElement = document.getElementById('milliseconds');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsList = document.getElementById('lapsList');
    const lapCountElement = document.querySelector('.lap-count');

    // Stopwatch variables
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;
    let interval;
    let isRunning = false;
    let lapCount = 0;

    // Format time values to always have 2 digits
    function formatTime(value) {
        return value < 10 ? `0${value}` : value;
    }

    // Format milliseconds to always have 2 digits
    function formatMilliseconds(value) {
        return value < 10 ? `0${value}` : value;
    }

    // Update the stopwatch display
    function updateDisplay() {
        hoursElement.textContent = formatTime(hours);
        minutesElement.textContent = formatTime(minutes);
        secondsElement.textContent = formatTime(seconds);
        millisecondsElement.textContent = formatMilliseconds(milliseconds);
    }

    // Start the stopwatch
    function startStopwatch() {
        if (!isRunning) {
            isRunning = true;
            interval = setInterval(function() {
                milliseconds += 1;
                
                if (milliseconds === 100) {
                    milliseconds = 0;
                    seconds += 1;
                }
                
                if (seconds === 60) {
                    seconds = 0;
                    minutes += 1;
                }
                
                if (minutes === 60) {
                    minutes = 0;
                    hours += 1;
                }
                
                updateDisplay();
            }, 10);
            
            // Add active state to buttons
            startBtn.classList.add('active');
            pauseBtn.classList.remove('active');
        }
    }

    // Pause the stopwatch
    function pauseStopwatch() {
        if (isRunning) {
            clearInterval(interval);
            isRunning = false;
            
            // Add active state to buttons
            pauseBtn.classList.add('active');
            startBtn.classList.remove('active');
        }
    }

    // Reset the stopwatch
    function resetStopwatch() {
        clearInterval(interval);
        isRunning = false;
        hours = 0;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        lapCount = 0;
        updateDisplay();
        lapsList.innerHTML = '';
        lapCountElement.textContent = lapCount;
        
        // Reset button states
        startBtn.classList.remove('active');
        pauseBtn.classList.remove('active');
    }

    // Record a lap time
    function recordLap() {
        if (isRunning || (!isRunning && (hours > 0 || minutes > 0 || seconds > 0 || milliseconds > 0))) {
            const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatMilliseconds(milliseconds)}`;
            const lapItem = document.createElement('li');
            lapItem.innerHTML = `<span>Lap ${lapCount + 1}</span><span>${lapTime}</span>`;
            
            // Add animation to new lap
            lapItem.style.animation = "fadeIn 0.5s";
            
            if (lapsList.firstChild) {
                lapsList.insertBefore(lapItem, lapsList.firstChild);
            } else {
                lapsList.appendChild(lapItem);
            }
            
            lapCount++;
            lapCountElement.textContent = lapCount;
        }
    }

    // Event listeners
    startBtn.addEventListener('click', startStopwatch);
    pauseBtn.addEventListener('click', pauseStopwatch);
    resetBtn.addEventListener('click', resetStopwatch);
    lapBtn.addEventListener('click', recordLap);

    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        switch(e.code) {
            case 'Space':
                if (isRunning) pauseStopwatch();
                else startStopwatch();
                e.preventDefault();
                break;
            case 'KeyL':
                recordLap();
                break;
            case 'KeyR':
                resetStopwatch();
                break;
        }
    });

    // Initialize display
    updateDisplay();
});