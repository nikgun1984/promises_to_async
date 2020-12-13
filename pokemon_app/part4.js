const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

/* Call our data and build our cards */
document.querySelector("#form-pokemon").addEventListener('submit', function (evt) {
    evt.preventDefault();
    for (let i = 0; i < 3; i++) {
        getPokemonData();
    }
})

/* Get Pakemon data from API */
async function getPokemonData() {
    const pokemon = Math.floor((Math.random() * 898));
    let name, image, url, description,pokemonData;
    try {
        pokemonData = await axios.get(`${BASE_URL}/${pokemon}`);
        name = pokemonData.data.species.name;
        image = pokemonData.data.sprites.front_default;
        createTags(name,image);
        descriptionData = await axios.get(pokemonData.data.species.url);
        description = getEnDescription(descriptionData.data.flavor_text_entries);
        const descrip = document.createElement("p");
        descrip.textContent = description;
        document.querySelector(`div#${name}`).appendChild(descrip);
    } catch (err) {
        console.log(err);
    }
}

/* Create Card Content */
function createTags(name, image) {
    const div = document.createElement("div"),
        img = document.createElement("img"),
        title = document.createElement("h1");
    // desc = document.createElement("p");
    //append div
    div.classList.add('card');
    div.setAttribute("id", name)
    document.querySelector(".cards").appendChild(div);

    title.textContent = name;
    if (image) {
        img.setAttribute('src', image);
    }
    // desc.textContent = description;
    div.appendChild(title);
    div.appendChild(img);
    // div.appendChild(desc);
}

/* Get Description in English language */
function getEnDescription(entries) {
    for (let text of entries) {
        if (text.language.name == 'en') {
            return text.flavor_text;
        }
    }
    return null;
}