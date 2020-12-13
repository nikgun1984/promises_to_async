const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

// for (let i = 0; i < 3; i++) {
//     const {
//         name,
//         image,
//         description
//     } = getPokemonData();
//     console.log(name);
//     console.log(image);
//     console.log(description);
//     console.log("----------------------------")
// }

async function getData() {
    const pokemon = Math.floor((Math.random() * 898));
    let name, image, url, description, dataPokemon;
    try {
        dataPokemon = await axios.get(`${BASE_URL}/${pokemon}`);
        description = await axios.get(dataPokemon.data.species.url);
        
        console.log(dataPokemon);
        console.log(description);
    } catch (err) {
        console.log(`Oops, there was a problem :( ${err}`);
    }
}

getData();