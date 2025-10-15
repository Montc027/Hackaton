import fs from 'fs';
export default function suscribirse(email) {
    if (!fs.existsSync('datos/suscripciones.json')){
        fs.writeFileSync('datos/suscripciones.json','[]');
    }
    const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexMail.test(email)) {
        console.log('Invalid email format');
        return;
    }
    
    const jsonUsers=fs.readFileSync('datos/suscripciones.json','utf-8');
    const users=JSON.parse(jsonUsers);
    if (!users.includes(email)){
        users.push(email.toString());
        fs.writeFileSync('datos/suscripciones.json',JSON.stringify(users));
    }
}