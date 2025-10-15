import fs from 'fs';
export default function checkSuscripciones(){
    if (!fs.existsSync('datos/suscripciones.json')){
        fs.writeFileSync('datos/suscripciones.json','[]');
    }
    const jsonUsers=fs.readFileSync('datos/suscripciones.json','utf-8');
    const users=JSON.parse(jsonUsers);
    return users;
}