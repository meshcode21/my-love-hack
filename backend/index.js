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
 * Generates a clickable Google Maps link based on incoming coordinates
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

    // Generate standard Google Maps URL using the official Maps URL scheme
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    // Log the payload and the generated link to the terminal
    console.log(`\n=================== [TELEMETRY RECEIVED] ===================`);
    console.log(`Timestamp   : ${new Date().toISOString()}`);
    console.log(`Latitude    : ${latitude}`);
    console.log(`Longitude   : ${longitude}`);
    console.log(`Accuracy    : ±${accuracy || 0} meters`);
    console.log(`Maps Link   : ${googleMapsUrl}`);
    console.log(`============================================================\n`);

    // Respond with success status and pass the map link back to the frontend
    return res.status(200).json({
        success: true,
        message: "Telemetry processed successfully.",
    });
});

// Health check endpoint
app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "API is working perfectly."
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});