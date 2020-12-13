// Part 1

const BASE_URL = 'https://deckofcardsapi.com/api/deck';
let deckID;
let count=0,
    currentRotation=0;

async function getCard() {
    try {
        const deckID = await $.getJSON(`${BASE_URL}/new/shuffle/?deck_count=1`);
        const card = await $.getJSON(`${BASE_URL}/${deckID.deck_id}/draw/?count=1`);
        console.log(`${card.cards[0].value} of ${card.cards[0].suit}`);
    } catch(err) {
        console.log(`Oops, there was a problem :( ${err}`);
    }
}

//getCard();

// Part 2
/*Get 2 Cards and a deck using async and await*/
async function getCoupleCards() {
    const deckID = await $.getJSON(`${BASE_URL}/new/shuffle/?deck_count=1`);
    const promise1 = $.getJSON(`${BASE_URL}/${deckID.deck_id}/draw/?count=1`);
    const promise2 = $.getJSON(`${BASE_URL}/${deckID.deck_id}/draw/?count=1`);

    const card1 = await promise1;
    const card2 = await promise2;
    console.log(`${card1.cards[0].value} of ${card1.cards[0].suit}`);
    console.log(`${card2.cards[0].value} of ${card2.cards[0].suit}`);
}

//getCoupleCards();

// Part 3

/* get deck*/
async function getDeckID() {
    try {
        const deck = await $.getJSON(`${BASE_URL}/new/shuffle/?deck_count=1`);
        deckID = deck.deck_id;
    } catch (err) {
        console.log(`Oops, there was a problem :( ${err}`);
    }
}

/*Place Card on the table will be triggered*/
async function placeCard() {
    let card;
    try {
        card = await $.getJSON(`${BASE_URL}/${deckID}/draw/?count=1`);
        if (card.remaining) {
            const div = document.createElement('div');
            div.setAttribute('class', 'child center');
            ++count;
            console.log(count);
            currentRotation = Math.floor(Math.random() * 360);
            div.setAttribute('id', `card${count}`);
            document.querySelector(".parent").appendChild(div);
            const img = document.createElement('IMG');
            document.querySelector(`#card${count}`).style.transform = 'rotate(' + currentRotation + 'deg)';
            img.setAttribute("src", card.cards[0].image);
            document.querySelector(`#card${count}`).appendChild(img);
        } else {
            document.querySelector("button#button").disabled = true;
            document.querySelector("button#button").textContent = "All cards Used Up!!!"
        }
    } catch (err) {
        console.log(`Oops, there was a problem :( ${err}`);
    }
}

getDeckID();

document.querySelector("#simple-form").addEventListener("submit", function (evt) {
        evt.preventDefault();
        placeCard();
})
