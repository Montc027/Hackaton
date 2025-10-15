import express from 'express';
import cors from 'cors';
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
    res.send(fetchData());
});

// If you're on Node < 18, install node-fetch:
// npm install node-fetch
// and then: import fetch from 'node-fetch';



    res.send('Hello World!');
});

app.get('/pisos',(req, res) => {
    fetchPisosTuristicos().then(console.log);
})

