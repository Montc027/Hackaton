import express from 'express';
import cors from 'cors';
import puntosDeInteres from './puntosDeInteres.js';
import fetchData from './puntosDeInteres.js';
import { fetchPisosTuristicos } from './pisos.js';

const app = express();
const PORT = 3000;

app.use(cors());
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

