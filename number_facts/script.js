let part1,
    part2,
    count = 0;

document.getElementById("form1").addEventListener("submit", async function (evt) {
    evt.preventDefault();
    const num = document.getElementById("number1").value;
    try {
        const data = await axios.get(`//numbersapi.com/${num}?json`);
        numberFacts(1, data);
    } catch(err){
        console.log(err)
    }
});

document.querySelector("a#p1").addEventListener('click', function (evt) {
    if (!(!!(document.getElementById("number1").value))) {
        setTimeout(function () {
            document.querySelector("p#move-on").remove();
        }, 7000);
        document.querySelector("#part1").innerHTML += `<p id="move-on">You need check Part 1 before moving on</p>`;
    } else {
        evt.preventDefault();
        partTwo();
        document.querySelector(part1).style.display = 'none';
        document.querySelector(part2).style.display = 'block';
    }
});

document.querySelector("a#p2").addEventListener('click', function (evt) {
    evt.preventDefault();
    document.querySelector(part1).style.display = 'none';
    document.querySelector(part2).style.display = 'block';
})

document.querySelector("#form2").addEventListener("submit", function (evt) {
    evt.preventDefault();
    const num = document.getElementById("number2").value;
    partThree(num);
})

async function partTwo() {
    const numberOfnumbers = Math.floor(Math.random() * 20);
    const numberList = [];
    for (let i = 0; i < numberOfnumbers; i++) {
        numberList.push(axios.get(`//numbersapi.com/${Math.floor(Math.random() * 100)}?json`));
    }
    let allNums;
    try {
        allNums = await Promise.all(numberList);
        for(let num of allNums) {
            console.log(num);
            numberFacts(2,num);
        }
    } catch(err){
        console.log(`Not all are returned without problems`,err);
    }
}

async function partThree(num) {
    const numberList = [];
    for (let i = 0; i < 4; i++) {
        numberList.push(axios.get(`//numbersapi.com/${num}?json`));
    }
    document.querySelector("#part3").innerHTML += `<h3>Number ${num} Facts</h3>`
    const ul = document.createElement('ul');
    document.querySelector("#part3").append(ul);
    ul.setAttribute("id", `num${++count}`);
    let el;
    let allnums;
    try {
        allNums = await Promise.all(numberList);
        el = document.querySelector(`#num${count}`);
        for(let num of allNums) {
            el.innerHTML += `<li><strong>Number:</strong> ${num.data.text}</li>`;
        }
        el.innerHTML += "<hr>";
    } catch(err){
        console.log(err);
    }
}

function numberFacts(id_num, num) {
    part1 = `#part${id_num}`;
    part2 = `#part${id_num+1}`;
    const ul = document.createElement('ul');
    ul.setAttribute("id", `num${++count}`);
    document.querySelector(part1).append(ul);
    const el = document.querySelector(`#num${count}`);
    el.innerHTML += `<li><strong>Number:</strong> ${num.data.number}</li>`;
    el.innerHTML += `<li><strong>Description:</strong> ${num.data.text}</li>`;
    el.innerHTML += `<li><strong>Type:</strong> ${num.data.type}</li><hr>`;
}

// function insertAfter(newNode, existingNode) {
//     existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
// }