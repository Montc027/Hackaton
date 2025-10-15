import express from 'express';
import cors from 'cors';
import puntosDeInteres from './puntosDeInteres.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    console.log('Received request for /');
    res.send('OK');
});

app.get('/api/puntosDeInteres', async (req, res) => {
    res.send(await puntosDeInteres());
});



// If you're on Node < 18, install node-fetch:
// npm install node-fetch
// and then: import fetch from 'node-fetch';


