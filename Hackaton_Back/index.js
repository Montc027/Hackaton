import express from 'express';
import cors from 'cors';
import puntosDeInteres from './puntosDeInteres.js';
import { fetchPisosTuristicos } from './pisos.js';
import suscribirse from './suscripciones.js';
//import ngrok from '@ngrok/ngrok';



const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


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

app.post('/api/suscribirse', (req, res) => {
    const { email } = req.body;
    console.log(`New subscription from: ${email}`);
    suscribirse(email);
    res.sendStatus(200);
});



/*ngrok.listen(app).then(() => {
  console.log("established listener at: " + app.listener.url());
});*/
