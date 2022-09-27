// le panier
let basket = [];

/**
 * Récupérer tout les produits du panier
 */
function getLocalStorage() {
    basket = []
    document.getElementById('cart__items').innerHTML = '';
    // Récupérer tout les localStorage
    for(let i = 0; i < localStorage.length; i++) {
        // Récupération du localStorage d'id i
        data = JSON.parse(localStorage.getItem(localStorage.key(i)))

        // Ajouter produit
        basket.push(data);
    }
    listBasket();
}

/**
 * Afficher la liste des produits
 */
function listBasket() {
    for(let i = 0; i < basket.length; i++) {
        createProduct(i);
    }
}

/**
 * Créer <article> produit
 * @param {Number} i 
 */
function createProduct(i) {
    const product = document.createElement("article");
    product.innerHTML = `
        <article class="cart__item" data-id="${basket[i][0]}" data-color="${basket[i][1]}">
            <div class="cart__item__img">
            <img src=${basket[i][3]} alt=${basket[i][4]}>
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${basket[i][5]}</h2>
                <p>${basket[i][1]}</p>
                <p>${basket[i][6]} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${basket[i][2]}>
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
            </div>
        </article>
    `
    displayProduct(product);
}

/**
 * Afficher le produit
 * @param {HTMLElement} product 
 */
function displayProduct(product) {
    const cart = document.getElementById("cart__items");
    cart.appendChild(product);

    console.log(basket);
    getTotalPrice();
}

/**
 * Afficher le prix total et le nombre d'articles
 */
function getTotalPrice() {
    // Création variable prix totale et quantité totale
    let quantityTotal = 0;
    let priceTotal = 0;

    // Récupérer tout les prix et quantités
    for(let i = 0; i < basket.length; i++) {
        quantityTotal += parseInt(basket[i][2]);
        priceTotal += basket[i][2]*basket[i][6];
    }

    // Affichage de la quantité et du prix
    document.getElementById('totalQuantity').innerHTML = quantityTotal;
    document.getElementById('totalPrice').innerHTML = priceTotal;
}

 /**
  * Changement de la quantité
  */
 function eventModifyBasket() {
    const input = document.querySelectorAll("input.itemQuantity");
    for(i=0; i<input.length; i++) {
        input[i].addEventListener('change', (e) => {
            console.log(e)
            modifyProduct(getIDColorProduct(e))
        });
    }
}

/**
 * Suppession d'un produit
 */
function eventDeleteProduct() {
    const deleteProdut = document.getElementsByClassName("deleteItem");
    for(let i of deleteProdut) {
        console.log(i);
        i.addEventListener('click', (e) => {
            deleteProduct(getIDColorProduct(e))
        });
    }
}

/**
 * Récupérer l'id et la couleur
 * @param {Event} e 
 * @returns {Array}
 */
function getIDColorProduct(e) {
    // Récupération de la quantité
    const quantity = e.target.value;

    // Remonter au produit 
    const product = e.currentTarget.closest('article');

    // Récupérer l'ID du produit
    const id = product.dataset['id'];

    // Récupérer la couleur du produit
    const color = product.dataset['color'];

    const uptdateProduct = [id, color, quantity];
    return uptdateProduct;
}

/**
 * Modifier la quantité dans le localStorage
 * @param {Array} uptdateProduct 
 */
function modifyProduct(uptdateProduct) {
    // Création de l'ID de stockage
    const idStorage = uptdateProduct[0] + uptdateProduct[1];

    data = JSON.parse(localStorage.getItem(idStorage));

    data[2] = uptdateProduct[2];
    // Création de la liste des infos du panier
    data = JSON.stringify(data)
    console.log(data);
    // Création du localStorage
    window.localStorage.setItem(idStorage, data);

    main();
}

/**
 * Supprimer le produit
 * @param {Array} deleteProduct 
 */
function deleteProduct(deleteProduct) {
    // Création de l'ID de stockage
    const idStorage = deleteProduct[0] + deleteProduct[1];
    // Suppression du localStorage
    window.localStorage.removeItem(idStorage);

    main();
}

/**
 * Event sur le formulaire
 * @returns { Function }
 */
function eventFormulaire() {
    button = document.getElementById('order');
    button.addEventListener('click', (e) => {
        e.preventDefault();
        getFormBasket();
    });
}

/**
 * Récupérer les informations du formulaire
 * @returns { Function }
 */
function getFormBasket() {
    // Récupération des informations de commande
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;

    return verifForm(firstName, lastName, address, city, email);
}

/**
 * Vérifier les données du formulaires
 * @param {String} firstName 
 * @param {String} lastName 
 * @param {String} address 
 * @param {String} city 
 * @param {String} email 
 * @returns { Function }
 */
function verifForm(firstName, lastName, address, city, email) {
    // les expressions réguliaires
    verifWord = new RegExp(/^[a-z ,.'-]+$/i);
    verifEmail = new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/);
    
    // SI données présentes
    (!firstName) ? errorMessageForm('firstNameErrorMsg', 'Veuillez indiquer votre prénom') : errorMessageForm('firstNameErrorMsg', ' ');
    (!lastName) ? errorMessageForm('lastNameErrorMsg', 'Veuillez indiquer votre nom') : errorMessageForm('lastNameErrorMsg', ' ');
    (!address) ? errorMessageForm('addressErrorMsg', 'Veuillez indiquer votre addresse') : errorMessageForm('addressErrorMsg', ' ');
    (!city) ? errorMessageForm('cityErrorMsg', 'Veuillez indiquer votre ville') : errorMessageForm('cityErrorMsg', ' ');
    (!email) ? errorMessageForm('emailErrorMsg', 'Veuillez indiquer votre email') : errorMessageForm('emailErrorMsg', ' ');

    // SI format des données valides
    (!verifWord.test(firstName)) ? errorMessageForm('firstNameErrorMsg', 'Votre prénom doit comporter seulement des caractères alphabétiques') : errorMessageForm('firstNameErrorMsg', ' ');
    (!verifWord.test(lastName)) ? errorMessageForm('lastNameErrorMsg', 'Votre nom doit comporter seulement des caractères alphabétiques') : errorMessageForm('lastNameErrorMsg', ' ');
    (!verifWord.test(city)) ? errorMessageForm('cityErrorMsg', 'La ville doit comporter seulement des caractères alphabétiques') : errorMessageForm('cityErrorMsg', ' ');
    (!verifEmail.test(email)) ? errorMessageForm('emailErrorMsg', 'L\'email doit être valide') : errorMessageForm('emailErrorMsg', ' ');

    if (firstName && lastName && address && city && email && verifWord.test(firstName) && verifWord.test(lastName) && verifWord.test(city) && verifEmail.test(email)) {
        return createObject(firstName, lastName, address, city, email);
    } else {
        return console.log("Formulaire incorrect");
    }
}
/**
 * Création de l'objet contact pour l'envoie de la requête
 * @param {String} firstName 
 * @param {String} lastName 
 * @param {String} address 
 * @param {String} city 
 * @param {String} email 
 * @returns { Function }
 */

function createObject(firstName, lastName, address, city, email) {
    const product = []
    for(let i = 0; i < localStorage.length; i++) {
        // Récupération du localStorage d'id i
        data = JSON.parse(localStorage.getItem(localStorage.key(i)))
        // Ajouter produit
        product.push(data[0]);
    }
    const contact = {
        "contact": {
            "firstName" : firstName,
            "lastName": lastName,
            "address": address,
            "city": city,
            "email": email 
        },
        "products": product
    }
    return postForm(contact);
}

/**
 * Envoyer de la commande à l'API et redirection
 * @param {Oject} contact 
 */
async function postForm(contact) {
    // requête POST
    await fetch("http://localhost:3000/api/products/order", {
	    method: "POST",
	    headers: { "Content-Type": "application/json" },
	    body: JSON.stringify(contact)
    })
    .then((res) => {
        return res.json()
    
    // recupération e la réponse du serveur
    }).then((data) => {
        // redirection vers la page de confirmation
        return window.location.assign(`./confirmation.html?id=${data.orderId}`);
    })
    .catch((error) => console.error(error))
}

/**
 * Afficher le message d'erreur
 * @param {String} id 
 * @param {String}} message 
 * @returns 
 */
function errorMessageForm(id, message) {
    const errorMsg = document.getElementById(id).innerHTML = message;
    return errorMsg
}


// Fonction générale
function main() {
    getLocalStorage ();
    eventModifyBasket();
    eventDeleteProduct();
    eventFormulaire();
}

main();