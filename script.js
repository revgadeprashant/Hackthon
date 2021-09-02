//STYLING TO BODY
document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
document.body.style.lineHeight = "1.7em";
var nav = document.createElement('navbar');
nav.innerHTML = "<h1> Welcome To Pokemon API </h1>";
nav.style.padding = "0 10px 0px 10px "
nav.style.textAlign = "center";
document.body.append(nav)
    // creating section
var section = document.createElement('section');
section.setAttribute('id', 'basket');

var deckdiv = document.createElement('div');
deckdiv.setAttribute('id', 'features');
deckdiv.setAttribute('class', 'deck');
deckdiv.style.background = "orangered";
deckdiv.style.border = "1px solid black";
deckdiv.style.borderRadius = "5px";
deckdiv.style.display = "flex";
deckdiv.style.maxWidth = "100%";
deckdiv.style.position = "relative";
deckdiv.style.flexWrap = "wrap";
deckdiv.style.margin = "0.87em 0.5em";

section.append(deckdiv);
document.body.append(section);

var clrdiv = document.createElement('div');
clrdiv.setAttribute('class', 'clr');
clrdiv.style.clear = "both";
document.body.append(clrdiv);

function fetchMonsterData(monster) {
    let url = monster.url;
    fetch(url)
        .then((response) => response.json())
        .then(function(chosen) {
            renderMonster(chosen);
        });
}

function toTitleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
}

function acquireAbilities(chosen) {
    let pokenAbleTd = document.createElement("td");

    let abilityUl = document.createElement("ul");
    pokenAbleTd.innerHTML = "<strong>&nbsp;Abilities</strong>";
    pokenAbleTd.className = "abilityFacts";
    pokenAbleTd.style.flex = "auto";
    pokenAbleTd.style.marginTop = "5px";
    pokenAbleTd.style.textAlign = "start";
    pokenAbleTd.style.lineHeight = "0";

    abilityUl.classList.add("small");
    abilityUl.style.fontSize = "small";
    abilityUl.style.textAlign = "left";
    abilityUl.style.flexBasis = "auto";
    abilityUl.style.marginLeft = "3.5em";
    abilityUl.style.listStyle = "inside none";
    abilityUl.style.lineHeight = "1.2em";
    abilityUl.style.flexWrap = "wrap";
    abilityUl.style.margin = "0.87em 0.5em";

    var abilities = [];
    abilities = chosen.abilities;
    for (let index = 0; index < abilities.length; index++) {
        const element = abilities[index];
        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                const item = element[key];
                if (key == "ability") {
                    let abilityLi = document.createElement("li");
                    abilityLi.innerText = item.name;
                    abilityUl.append(abilityLi);
                }
            }
        }
    }
    pokenAbleTd.append(abilityUl);
    return pokenAbleTd;
}
// To create the card with pokemon image with the name
async function createImage(ID, pokeBallDiv, name) {

    let pokeBall = document.createElement("tr");
    pokeBall.classList.add("image");
    pokeBall.style.width = "240px";
    pokeBall.style.margin = "0.87em 0.5em";
    pokeBall.style.border = "1px solid wheat";
    pokeBall.style.borderRadius = "5px";
    pokeBall.style.backgroundColor = "whitesmoke";
    pokeBall.style.zIndex = "3";

    let pokenPhoto = document.createElement("img");
    pokenPhoto.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png`;
    pokenPhoto.alt = `${name}`;
    pokeBall.append(pokenPhoto);
    let pokemon = document.createElement("h2");
    pokemon.style.paddingBottom = ("20px");
    pokemon.innerText = toTitleCase(name);
    pokeBall.append(pokemon);
    pokeBallDiv.append(pokeBall);
}

//To tag weights
let badgeWeights = function(weights) {
    let weightRow = document.createElement("tr");
    weightRow.innerHTML = "<strong>Weight: </strong>"
    weightRow.classList.add("weights");
    weightRow.style.width = "240px";
    weightRow.style.padding = " 10px 0px 15px 110px";
    weightRow.style.lineHeight = "40px";
    weightRow.style.height = "0.05%";
    weightRow.style.zIndex = "5";

    let weightBadge = document.createElement("span");

    weightBadge.innerHTML = weights;
    weightRow.appendChild(weightBadge);
    return weightRow;
};
async function renderMonster(chosen) {
    let basket = document.getElementById("features");
    basket.style.margin = "auto";
    basket.style.flex = "auto";
    basket.style.maxWidth = "90%";
    basket.style.padding = "10px";
    basket.style.justifyContent = "center";

    let pokeBall = document.createElement("div");
    //create the cards
    pokeBall.classList.add("cards");
    pokeBall.style.border = "1px solid black";
    pokeBall.style.borderRadius = "5px";
    pokeBall.style.backgroundColor = "#f7c08a";
    pokeBall.style.display = "flex";
    pokeBall.style.textAlign = "center";
    pokeBall.style.flexBasis = "auto";
    pokeBall.style.maxWidth = "240px";
    pokeBall.style.minHeight = "300px";
    pokeBall.style.paddingBottom = "10px";
    pokeBall.style.position = "relative";
    pokeBall.style.flexWrap = "wrap";
    pokeBall.style.margin = "0.87em 0.5em";
    pokeBall.style.transition = "all 0.1s";


    //add weights
    let weights = chosen.weight;
    pokeBall.appendChild(badgeWeights(weights));

    let pokenCharsRow = document.createElement("tr");
    pokenCharsRow.classList.add("spreadOut");
    pokenCharsRow.style.display = "flex";
    pokenCharsRow.style.width = "240px";

    //add the abilities & capture the moves as TDs!
    pokenCharsRow.append(acquireAbilities(chosen), captureTop5Moves(chosen));
    //Try Capturing the images for all the 50 pokemon
    try {
        let imagesAcquired = createImage(chosen.id, pokeBall, chosen.name);
        imagesAcquired.then(console.log("cards images acquired"));
    } catch (error) {
        console.log(error);
    }
    pokeBall.append(pokenCharsRow);
    basket.appendChild(pokeBall);
}
//Restrict move capturing to 5 as some have extensive moves learnt
function captureTop5Moves(chosen) {
    let pokenMovesTd = document.createElement("td");
    let movesUl = document.createElement("ul");
    pokenMovesTd.innerHTML = "<strong>Moves&nbsp;</strong>";
    pokenMovesTd.className = "moveFacts";
    pokenMovesTd.style.flex = "auto";
    pokenMovesTd.style.marginTop = "5px";
    pokenMovesTd.style.paddingRight = "10px";
    pokenMovesTd.style.textAlign = "end";
    pokenMovesTd.style.lineHeight = "0";

    movesUl.classList.add("movesLi");
    movesUl.style.fontSize = "small";
    movesUl.style.textAlign = "right";
    movesUl.style.listStyle = "inside none";
    movesUl.style.lineHeight = "1.2em";
    movesUl.style.flexWrap = "wrap";
    movesUl.style.margin = "0.87em 0.5em";

    var moves = [];
    moves = chosen.moves;
    for (let index = 0; index < moves.length; index++) {
        const element = moves[index];
        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                const item = element[key];
                if (key == "move" && index < 5) {
                    // restricting to just 5 first of the list moves
                    let moveLi = document.createElement("li");
                    moveLi.innerText = item.name;
                    movesUl.append(moveLi);
                }
            }
        }
    }
    pokenMovesTd.append(movesUl);
    return pokenMovesTd;
}

(async function() {
    let pokeBalls = document.querySelector("#features");
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
    const pokemons = await res.json();
    pokemons.results.forEach(function(pokemon) {
        fetchMonsterData(pokemon);

    });
})();