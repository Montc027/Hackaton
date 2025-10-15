import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import puntosDeInteres from './puntosDeInteres.js';
import { fetchPisosTuristicos } from './pisos.js';
import { fetchPisosTuristicosFull } from './pisosFull.js';
import suscribirse from './suscripciones.js';
import checkSuscripciones from './checkSuscripciones.js';
import pisosDiez from './datos/pisosDiez.json' with { type: 'json' };

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('OK');
});

app.get('/api/puntosDeInteres', async (req, res) => {
    res.send(await puntosDeInteres());
});

app.get('/api/pisos',async(req, res) => {
    fetchPisosTuristicos().then(data => res.send(data));
})
app.get('/api/pisosFull',async(req, res) => {
    fetchPisosTuristicosFull().then(data => res.send(data));
})
app.get('/api/pisosDiez',async(req, res) => {
    res.send(pisosDiez);
})
app.post('/api/suscribirse', (req, res) => {
    const email = req.body;
    console.log(`New subscription from: ${email}`);
    suscribirse(email);
    res.sendStatus(200);
});
app.get('/api/suscribirse', (req, res) => {
    res.send(checkSuscripciones());
});