import fs from 'fs';
export default function suscribirse(email) {
    if (!fs.existsSync('suscripciones.json')){
        fs.writeFileSync('suscripciones.json','[]');
    }
    const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexMail.test(email)) {
        console.log('Invalid email format');
        return;
    }
    
    const jsonUsers=fs.readFileSync('suscripciones.json','utf-8');
    const users=JSON.parse(jsonUsers);
    if (!users.includes(email)){
        users.push(email);
        fs.writeFileSync('suscripciones.json',JSON.stringify(users));
    }
}