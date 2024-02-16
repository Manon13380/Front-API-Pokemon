let arrDresseurs;
let list = document.querySelector('.listContainer');
let nameContainer;
let ageContainer;
let isClick = true;

// Affichage Formulaire Add 
function displayAddForm() {
    let addContainer = document.querySelector('.addContainer')
    let addPara =document.querySelector('.addPara')
    if (isClick) {
        isClick = false;
        addPara.textContent = "";
        addContainer.style.backgroundColor = "rgba(176, 181, 183, 0.684)"
        let containerInput = document.createElement('form')
        containerInput.classList.add('containerInput')
        addContainer.appendChild(containerInput)
        let inputName = document.createElement('input');
        inputName.placeholder = "Entre le Nom du dresseur";
        inputName.id = "nameContainer"
        containerInput.appendChild(inputName);
        let inputAge = document.createElement('input');
        inputAge.placeholder = "Entre l'âge du dresseur";
        inputAge.id = "ageContainer"
        containerInput.appendChild(inputAge);
        let createButton = document.createElement('button');
        createButton.classList.add('createButton')
        createButton.textContent = "Créer";
        createButton.addEventListener('click', async () => {
            createDresseur()
            document.querySelector('.listContainer') = ""
            displayDresseurs()
        })
        addContainer.appendChild(createButton);
    }
    else {
        isClick = true;
        addContainer.textContent = "";
        addContainer.style.backgroundColor = "transparent"
        let buttonDresseur= document.createElement('button')
        buttonDresseur.classList.add('addButton')
        buttonDresseur.type = "button"
        buttonDresseur.onclick = displayAddForm
        buttonDresseur.style.backgroundColor = "transparent"
        buttonDresseur.style.border = "none"
        addContainer.appendChild(buttonDresseur)
        let imgAddDresseur = document.createElement('img')
        imgAddDresseur.src = "./assets/images/bouton-ajouter.png"
        imgAddDresseur.width ="40"
        buttonDresseur.appendChild(imgAddDresseur)
        addPara = document.createElement('p')
        addPara.classList.add('addPara')
        addPara.textContent = "Ajouter un Dresseur";
        addContainer.appendChild(addPara)

    }
}

//fonction créer un dresseur
async function createDresseur() {
    let nameContainer = document.querySelector('#nameContainer')
    let ageContainer = document.querySelector('#ageContainer')
    let res = await fetch(`http://localhost:3000/dresseur`,
        {
            method: "POST", headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameContainer.value,
                age: ageContainer.value,
                pokemons: []
            })
        })
    let data = await res.json()
    window.location.href = "../index.html"
    return data
}
//fonction obtenir les dresseurs
async function getDresseurs() {
    let response = await fetch('http://localhost:3000/dresseurs');
    let data = await response.json();
    return data;
}

//Afichage liste des dresseurs
async function displayDresseurs() {
    arrDresseurs = await getDresseurs();
    arrDresseurs.forEach((element, index) => {
        let idDresseur = element._id
        // Container Card
        let card = document.createElement('div');
        card.classList.add('card');
        list.appendChild(card);
        //Container title avec img + h2 +img
        let titleContainer = document.createElement('div');
        titleContainer.classList.add('titleContainer');
        card.appendChild(titleContainer);
        let logoOne = document.createElement('img');
        logoOne.classList.add('pokeball');
        logoOne.src = "./assets/images/pokeball.png";
        titleContainer.appendChild(logoOne);
        let title = document.createElement('h2');
        titleContainer.appendChild(title);
        title.textContent = `Dresseur N° ${index + 1}`;
        let logoTwo = document.createElement('img');
        logoTwo.classList.add('pokeball');
        logoTwo.src = "./assets/images/pokeball.png";
        titleContainer.appendChild(logoTwo);
        //Container Form
        let formulaireContainer = document.createElement('form')
        formulaireContainer.classList.add('formulaireContainer')
        card.appendChild(formulaireContainer);
        //Container input
        let inputContainer = document.createElement('div')
        inputContainer.classList.add('inputContainer')
        formulaireContainer.appendChild(inputContainer)
        //container label + input Name
        let inputName = document.createElement('div')
        inputName.classList.add('inputNameUp')
        inputContainer.appendChild(inputName)
        let labelName = document.createElement('label')
        labelName.textContent = "Name : "
        inputName.appendChild(labelName)
        let paraName = document.createElement('input')
        paraName.value = `${element.name}`
        paraName.disabled = "disabled"
        paraName.classList.add('paraName')
        inputName.appendChild(paraName);
        //container label + input Age
        let inputAge = document.createElement('div')
        inputAge.classList.add('inputAgeUp')
        inputContainer.appendChild(inputAge)
        let labelAge = document.createElement('label')
        labelAge.textContent = "Age : "
        inputAge.appendChild(labelAge)
        let paraAge = document.createElement('input')
        paraAge.value = `${element.age}`
        paraAge.disabled = "disabled"
        paraAge.classList.add('paraAge')
        inputAge.appendChild(paraAge);
        //Container  Button
        let buttonContainer = document.createElement('div')
        buttonContainer.classList.add('buttonContainer')
        formulaireContainer.appendChild(buttonContainer);
        //Container button update +delete
        let firstButtons = document.createElement('div');
        firstButtons.classList.add('firstButtons')
        buttonContainer.appendChild(firstButtons);
        let updateButton = document.createElement('button')
        updateButton.textContent = "Update"
        updateButton.type = "button"
        updateButton.classList.add('buttons')
        updateButton.addEventListener('click', () => {
            if (updateButton.textContent == "Update") {
                updateButton.textContent = "Confirm"
                paraName.style.border = "1px solid black"
                paraName.disabled = ""
                paraAge.style.border = "1px solid black"
                paraAge.disabled = ""
            }
            else {
                updateDresseur(idDresseur, paraName, paraAge)
            }
        })
        firstButtons.appendChild(updateButton);
        let deleteButton = document.createElement('button')
        deleteButton.classList.add('buttons')
        deleteButton.textContent = "Delete"
        firstButtons.appendChild(deleteButton);
        deleteButton.addEventListener('click', async () => {
            deleteDresseur(idDresseur);
        })
        // button Détails
        let detailButton = document.createElement('button')
        detailButton.classList.add('buttons')
        buttonContainer.appendChild(detailButton);
        let detailLink = document.createElement('a')
        detailLink.textContent = "Détail"
        detailLink.href = `./pages/detailsDresseur.html?id=` + idDresseur;
        detailButton.appendChild(detailLink);
    });
}
displayDresseurs()

//fonction supprimer un dresseur
async function deleteDresseur(id) {
    let res = await fetch(`http://localhost:3000/dresseurs/${id}`,
        { method: "DELETE" })
    document.querySelector('.listContainer').textContent = "";
    displayDresseurs()
}

//fonction update un dresseur
async function updateDresseur(id, paraName, paraAge) {
    let res = await fetch(`http://localhost:3000/dresseurs/${id}`, {
        method: "PUT", headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: paraName.value,
            age: paraAge.value,
        })
    })
    data = await res.json()
    window.location.href = "../index.html"
    return data
}

