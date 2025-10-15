import fs from 'fs';

export default async function puntosDeInteres() {

    const params = new URLSearchParams({
        resource_id: '31431b23-d5b9-42b8-bcd0-a84da9d8c7fa',
        limit: 1000,
    });

    const url = `https://opendata-ajuntament.barcelona.cat/data/api/action/datastore_search?${params}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {

            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        fs.writeFileSync('datos/puntosDeInteres.json', JSON.stringify(await data.result.records), 'utf-8');
        return data.result.records;

    } catch (err) {
        let data = fs.readFileSync('datos/puntosDeInteres.json', 'utf-8');
        return JSON.parse(data);
    }
}
