import fs from 'fs';
export const fetchPisosTuristicos = async () => {
    const limit = 5800;
    let pisosRaw;
    try { pisosRaw = await fetch(`https://opendata-ajuntament.barcelona.cat/data/api/action/datastore_search?resource_id=b32fa7f6-d464-403b-8a02-0292a64883bf&limit=${limit}`); }
    catch {
        console.log("Error fetching data from remote url")
    }
    let records;
    if (pisosRaw?.status == 200) {
        const pisos = await pisosRaw.json();
        records = pisos.result.records;
        if (!fs.existsSync('datos'))
            fs.mkdirSync('datos', { recursive: true });
        fs.writeFileSync('datos/pisos.json', JSON.stringify(records));
    } else {
        console.log("Retrieving data from local server...")
        records = JSON.parse(fs.readFileSync('datos/pisos.json'));
    }
    return records;
}