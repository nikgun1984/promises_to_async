const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

// PART 1

const numPokemons = 899;
const pokemons = [];

async function getPokemonData() {
    for (let i = 1; i < numPokemons; i++) {
        pokemons.push(axios.get(`${BASE_URL}/${i}/`));
    }
    let pokemonData;
    try {
        pokemonData = await Promise.all(pokemons);
        for(let pokemon of pokemonData) {
            console.log(pokemon.data.species.name);
            console.log(pokemon.data.species.url)
            console.log(pokemon.data.sprites.front_default)
        }
    } catch (err) {
        console.log(err)
    }
}

getPokemonData();