const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable Cross-Origin Resource Sharing for front-end access
app.use(cors());

// Parse incoming JSON payloads
app.use(express.json());

/**
 * POST /api/location
 * Handles telemetry received from explicit client-side geolocation APIs
 */
app.post('/api/location', (req, res) => {
    const { latitude, longitude, accuracy } = req.body;

    // Validate existence of properties
    if (latitude === undefined || longitude === undefined) {
        return res.status(400).json({
            success: false,
            message: "Missing latitude or longitude coordinates in request body."
        });
    }

    // Log the payload to the console
    console.log(`[TELEMETRY RECEIVED]`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Latitude : ${latitude}`);
    console.log(`Longitude: ${longitude}`);
    console.log(`Accuracy : ±${accuracy || 0} meters`);
    console.log(`-----------------------------------`);

    // Respond with success status to trigger front-end state transition
    return res.status(200).json({
        success: true,
        message: "Telemetry processed successfully."
    });
});

app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Api wirking..."
    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});