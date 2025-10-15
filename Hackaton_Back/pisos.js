
export const fetchPisosTuristicos = async() => {
    const pisos = await fetch("https://opendata-ajuntament.barcelona.cat/data/api/action/datastore_search?resource_id=b32fa7f6-d464-403b-8a02-0292a64883bf&limit=5")
    console.log(pisos)
}