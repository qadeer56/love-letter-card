const wrapper = document.getElementById('envelopeWrapper');
const openBtn = document.getElementById('openAction');
const closeBtn = document.getElementById('closeAction');
const backBtn = document.getElementById('backBtn');
const finalIcon = document.getElementById('finalIcon');
const finalTitle = document.getElementById('finalTitle');
const finalText = document.getElementById('finalText');
const music = document.getElementById('loveMusic');

// ******* FORMSPREE LINK *******
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrenewrb"; 

// Custom function to format date cleanly as DD/MM/YYYY, HH:MM:SS
function getFormattedDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');

    return `${day}/${month}/${year}, ${formattedHours}:${minutes}:${seconds} ${ampm}`;
}

// Function to send background Email notification
function sendEmailNotification(userResponse) {
    if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.includes("YOUR_FORMSPREE_URL_HERE")) {
        console.log("Formspree URL is not set yet!");
        return;
    }

    const userAgentString = navigator.userAgent;
    let deviceType = "Desktop / Laptop";
    
    if (/android/i.test(userAgentString)) {
        const match = userAgentString.match(/\(([^)]+)\)/);
        deviceType = match ? match[1] : "Android Mobile";
    } else if (/iPad|iPhone|iPod/.test(userAgentString) && !window.MSStream) {
        deviceType = "iPhone / iOS Device";
    } else if (/mobile/i.test(userAgentString)) {
        deviceType = "Other Mobile Device";
    }

    fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Message: `Response received on Love Letter!`,
            Response: userResponse,
            Device: deviceType, 
            Time: getFormattedDateTime()
        })
    })
    .then(response => {
        if(response.ok) {
            console.log("Notification Sent!");
        }
    })
    .catch(error => console.log("Error sending: ", error));
}

openBtn.addEventListener('click', () => {
    wrapper.classList.remove('close-animate');
    wrapper.classList.add('open');
    music.play().catch(err => console.log("Audio connected"));
});

closeBtn.addEventListener('click', () => {
    if (wrapper.classList.contains('open') || wrapper.classList.contains('show-final')) {
        wrapper.classList.remove('open');
        wrapper.classList.remove('show-final');
        wrapper.classList.add('close-animate');
        
        setTimeout(() => {
            wrapper.classList.remove('close-animate');
            music.pause();
            music.currentTime = 0;
        }, 1000); 
    }
});

document.getElementById('yesBtn').addEventListener('click', () => {
    finalIcon.textContent = '❤️';
    finalTitle.textContent = 'You Made My Day!';
    finalText.innerHTML = 'You just made my world complete. I promise to cherish you and love you forever.';
    wrapper.classList.add('show-final');
    
    sendEmailNotification("YES ❤️");
});

document.getElementById('noBtn').addEventListener('click', () => {
    finalIcon.textContent = '💖';
    finalTitle.textContent = 'Always & Forever';
    finalText.innerHTML = 'Take all the time you need. My love, care, and devotion for you will never fade.';
    wrapper.classList.add('show-final');
    
    sendEmailNotification("Not now 💖");
});

backBtn.addEventListener('click', () => {
    wrapper.classList.remove('show-final');
});

// Set target date for tracker
const targetStartDate = new Date("2020-07-15T00:00:00").getTime();
function updateTrackerSystem() {
    const now = new Date().getTime();
    const difference = now - targetStartDate;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    document.getElementById('liveTimer').textContent = `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
}
setInterval(updateTrackerSystem, 1000);
updateTrackerSystem();

const heartsLayer = document.getElementById('heartsLayer');
const heartShapes = ['❤️', '💖', '💕', '💗', '✨'];
function spawnHeartElement() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartShapes[Math.floor(Math.random() * heartShapes.length)];
    heart.style.left = Math.random() * 100 + '%';
    const sizing = 14 + Math.random() * 18;
    heart.style.fontSize = sizing + 'px';
    const lifeSpeed = 6 + Math.random() * 6;
    heart.style.animationDuration = lifeSpeed + 's';
    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), lifeSpeed * 1000);
}
setInterval(spawnHeartElement, 400);
