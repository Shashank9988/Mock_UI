import express from 'express';
import axios from 'axios';
import cors from 'cors'; // Use import for cors

const app = express();
const port = 3001; // Your proxy server port

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post('/proxy', async (req, res) => {
    try {
        const response = await axios.post('http://gir.redbus.com/openai/chat/completions', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'YOUR_API_KEY_HERE', // Replace with your actual API key
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error forwarding the request:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Proxy server running on port ${port}`);
});
