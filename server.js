const express = require('express'), axios = require('axios'), app = express();
app.use(express.json()).use(express.static('public'));
require('dotenv').config(); const API_KEY = process.env.API_KEY, PORT = process.env.PORT || 5000;

app.post('/weather', (req, res) => {
    if (!API_KEY) return res.json({ 'error': 'Server Error' });
    if (!req || !req.body || !req.body.latitude || !req.body.longitude) return res.json({ 'error': 'Latitude and longitude is required.' });
    const url = `https://api.darksky.net/forecast/${API_KEY}/${req.body.latitude},${req.body.longitude}`;
    axios({ url: url, responseType: 'json' }).then(data => {
        if (!data || !data.data || !data.data.currently) return res.json({ 'error': 'Server Error.' });
        return res.json(data.data.currently);
    }).catch(err => { return res.json({ 'error': 'Server Error.' }) });
}).listen(PORT, () => console.log(`Server started at PORT ${PORT}`));