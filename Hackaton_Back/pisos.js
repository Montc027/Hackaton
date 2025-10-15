
export const fetchPisosTuristicos = async() => {
    const limit = 11000;
    const pisosRaw = await fetch(`https://opendata-ajuntament.barcelona.cat/data/api/action/datastore_search?resource_id=b32fa7f6-d464-403b-8a02-0292a64883bf&limit=${limit}`);
    const pisos = await pisosRaw.json();
    return  pisos.result.records;
}