let listContainer = document.querySelector(".listPokemons")
let isClick = true;

//Récupérer id Dresseur dans URL
function getDresseurId() {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    return params.get("id")
}

//Obtenir le dresseur via ID
async function getDresseur(id) {
    let res = await fetch(`http://localhost:3000/dresseurs/${id}`)
    let data = await res.json()
    return data;

}
//afficher les infos du dresseur
async function displayDresseur() {
    let id = getDresseurId();
    let arrDresseur = await getDresseur(id);
    dresseurName.textContent = arrDresseur.name;
    dresseurAge.textContent = arrDresseur.age + ` ans`
}

//afficher le formulaire Add Pokemon au click
function displayAddForm() {
    // afficher le form en cliquant
    let addContainer = document.querySelector('.addPoke')

    let addPara =document.querySelector('.addPara')
    if (isClick) {
        isClick = false;
        addPara.textContent = ""
        addContainer.style.backgroundColor = "rgba(176, 181, 183, 0.684)"
        let containerInput = document.createElement('form')
        containerInput.classList.add('containerInput')
        addContainer.appendChild(containerInput)
        let inputName = document.createElement('input');
        inputName.placeholder = "Entre le Nom du pokemon";
        inputName.id = "nameContainer"
        containerInput.appendChild(inputName);
        let inputType = document.createElement('input');
        inputType.placeholder = "Entre le type du pokemon";
        inputType.id = "typeContainer"
        containerInput.appendChild(inputType);
        let inputLevel = document.createElement('input');
        inputLevel.placeholder = "Entre le level du pokemon";
        inputLevel.id = "levelContainer"
        containerInput.appendChild(inputLevel);
        let inputAttacks = document.createElement('input');
        inputAttacks.placeholder = "Entre les attaques du pokemon séparés par une virgule";
        inputAttacks.id = "attacksContainer"
        containerInput.appendChild(inputAttacks);
        let createButton = document.createElement('button');
        createButton.classList.add('createButton')
        createButton.textContent = "Créer";
        createButton.addEventListener('click', async () => {
            let idDresseur = getDresseurId();
            createPokemon(idDresseur)
            document.querySelector('.listPokemon') = ""
            displayPokemons()
        })
        containerInput.appendChild(createButton);
    }
    // enlever le form si on reclick
    else {
        isClick = true;
        let addPoke = document.querySelector('.addPoke')
        addPoke.textContent = "";
        addPoke.style.backgroundColor = "transparent"
        let buttonPoke = document.createElement('button')
        buttonPoke.classList.add('buttonaddPoke')
        buttonPoke.type = "button"
        buttonPoke.onclick = displayAddForm
        buttonPoke.style.backgroundColor = "transparent"
        buttonPoke.style.border = "none"
        addPoke.appendChild(buttonPoke)
        let imgAddPoke = document.createElement('img')
        imgAddPoke.src = "../assets/images/icons8-pokéball-ouverte-48.png"
        buttonPoke.appendChild(imgAddPoke)
        addPara = document.createElement('p')
        addPara.classList.add('addPara')
        addPara.textContent = "Ajouter un Pokemon";
        addContainer.appendChild(addPara)
    }
}


//afficher la liste des pokemons
async function displayPokemons() {
    let idDresseur = getDresseurId();
    let arrPokemons = await getDresseur(idDresseur);
    arrPokemons.pokemons.forEach((element) => {
        let idPokemon = element._id
        // Container Card Pokemon
        let cardPokemon = document.createElement('div')
        cardPokemon.classList.add('cardPokemon')
        listContainer.appendChild(cardPokemon)
        // Form pokemon
        let formPokemon = document.createElement('form')
        formPokemon.classList.add('formulaireContainer')
        cardPokemon.appendChild(formPokemon)
        // Container input
        let infoContainer = document.createElement('div')
        infoContainer.classList.add('infoContainer')
        cardPokemon.appendChild(infoContainer)
        // Container label + input name
        let inputName = document.createElement('div')
        inputName.classList.add('inputPoke')
        infoContainer.appendChild(inputName)
        let labelName = document.createElement('label')
        labelName.textContent = "Name : "
        inputName.appendChild(labelName)
        let pokemonName = document.createElement('input')
        pokemonName.classList.add('inputName')
        pokemonName.value = element.name
        pokemonName.disabled = "disabled"
        inputName.appendChild(pokemonName)
        //container label + input type
        let inputType = document.createElement('div')
        inputType.classList.add('inputPoke')
        infoContainer.appendChild(inputType)
        let labelType = document.createElement('label')
        labelType.textContent = "Type : "
        inputType.appendChild(labelType)
        let pokemonType = document.createElement('input')
        pokemonType.value = element.type
        pokemonType.classList.add('inputName')
        pokemonType.disabled = "disabled"
        inputType.appendChild(pokemonType)
        //Container label + input Level
        let inputLevel = document.createElement('div')
        inputLevel.classList.add('inputPoke')
        infoContainer.appendChild(inputLevel)
        let labelLevel = document.createElement('label')
        labelLevel.textContent = "Level : "
        inputLevel.appendChild(labelLevel)
        let pokemonLevel = document.createElement('input')
        pokemonLevel.value = element.level
        pokemonLevel.classList.add('inputName')
        pokemonLevel.disabled = "disabled"
        inputLevel.appendChild(pokemonLevel)
        //Container Label + input attacks
        let inputAttacks = document.createElement('div')
        inputAttacks.classList.add('inputPoke')
        infoContainer.appendChild(inputAttacks)
        let labelAttacks = document.createElement('label')
        labelAttacks.textContent = "Attacks : "
        inputAttacks.appendChild(labelAttacks)
        let pokemonAttacks = document.createElement('input')
        pokemonAttacks.value = element.attacks
        pokemonAttacks.classList.add('inputAttacks')
        pokemonAttacks.disabled = "disabled"
        inputAttacks.appendChild(pokemonAttacks)
        //container button
        let buttonContainer = document.createElement('div')
        buttonContainer.classList.add('buttonContainerPokemon')
        cardPokemon.appendChild(buttonContainer)
        let updateButton = document.createElement('button')
        updateButton.classList.add('buttons')
        updateButton.textContent = "Update"
        updateButton.type = "button"
        buttonContainer.appendChild(updateButton)
        updateButton.addEventListener('click', () => {
            if (updateButton.textContent == "Update") {
                updateButton.textContent = "Confirm"
                pokemonName.style.border = "1px solid black"
                pokemonName.disabled = ""
                pokemonType.style.border = "1px solid black"
                pokemonType.disabled = ""
                pokemonLevel.style.border = "1px solid black"
                pokemonLevel.disabled = ""
                pokemonAttacks.style.border = "1px solid black"
                pokemonAttacks.disabled = ""
            }
            else {

                updatePokemon(idDresseur, idPokemon, pokemonName, pokemonType, pokemonLevel, pokemonAttacks)
            }
        }
        )
        let deleteButton = document.createElement('button')
        deleteButton.classList.add('buttons')
        deleteButton.textContent = "Delete"
        buttonContainer.appendChild(deleteButton);
        deleteButton.addEventListener('click', async () => {
            deletePokemon(idPokemon, idDresseur);
        })
    });
}

// fonction pour update un pokemon
async function updatePokemon(idDresseur, idPokemon, pokemonName, pokemonType, pokemonLevel, pokemonAttacks) {
    let res = await fetch(`http://localhost:3000/pokemons/${idPokemon}`, {
        method: "PUT", headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: pokemonName.value,
            type: pokemonType.value,
            level: pokemonLevel.value,
            attacks: pokemonAttacks.value.split(',')
        })
    })
    data = await res.json()
    window.location.href = `detailsDresseur.html?id=` + idDresseur;
    return data
}

//fonction pour supprimer un pokemon
async function deletePokemon(idPokemon, idDresseur) {
    let res = await fetch(`http://localhost:3000/dresseurs/${idDresseur}/pokemons/${idPokemon}`,
        { method: "DELETE" })
    document.querySelector('.listPokemons').textContent = "";
    displayPokemons()
}

//fonction pour créer un pokemon
async function createPokemon(idDresseur) {
    let nameContainer = document.querySelector('#nameContainer')
    let typeContainer = document.querySelector('#typeContainer')
    let levelContainer = document.querySelector('#levelContainer')
    let attacksContainer = document.querySelector('#attacksContainer')
    let res = await fetch(`http://localhost:3000/dresseurs/${idDresseur}/pokemons`,
        {
            method: "POST", headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameContainer.value,
                type: typeContainer.value,
                level: levelContainer.value,
                attacks: attacksContainer.value.split(',')
            })
        })
    let data = await res.json()
    window.location.href = `detailsDresseur.html?id=` + idDresseur;
    return data
}


displayDresseur()
displayPokemons()