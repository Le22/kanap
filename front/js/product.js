// info du produit
let dataProduct

/**
 * Récupération de l'ID du produit
 * @return { Function }
 */
function getIdProduct() {
    // récupération des paramètres de recherche de l'url
    const pageURL = document.location.search;
    const searchId = new URLSearchParams(pageURL);

    // récupération de l'id dans l'url
    const productId = searchId.get("id");
    return getProducts(productId)
}

/**
 * Récupérer les infos du produits dans l'API
 * @param { String } productId 
 * @return { Function }
 */
async function getProducts(productId) {
    // appeler l'API
    respond = await fetch(`http://localhost:3000/api/products/${productId}`);

    // convertir la liste des produit au format JSON
    dataProduct = await respond.json();

   return insertProductInfo(dataProduct);
}

/**
 * Insérer les informations du produit dans la page
 */
function insertProductInfo() {
    // image du produit
    const productImg = document.querySelector('.item__img');
    productImg.innerHTML = `<img src=${dataProduct.imageUrl} alt=${dataProduct.altTxt}>`

    // le nom du produit
    const productName = document.getElementById("title");
    productName.innerHTML = dataProduct.name;

    // prix du produit
    const productPrice = document.getElementById("price");
    productPrice.innerHTML = dataProduct.price;

    // description du produit
    const productDescription = document.getElementById("description");
    productDescription.innerHTML = dataProduct.description;

    // couleurs du produit
    for (let i = 0; i < dataProduct.colors.length; i++) {
        const productColor = document.getElementById("colors");
        const defaultValue = document.createElement("option");
        defaultValue.value = dataProduct.colors[i];
        defaultValue.innerHTML = dataProduct.colors[i];
        productColor.appendChild(defaultValue);
    }
}

/**
 * Écouter le click sur le bouton panier
 */
function eventButtonBasket() {
    const buttonBasket = document.getElementById('addToCart');
    buttonBasket.addEventListener('click', () => addBasket());
}

/**
 * Ajouter le produit au panier
 * @returns { Console }
 */
function addBasket() {
    // récupération des infos du produit
    let infoProductBasket = getInfosProduct();

    // SI toutes les informations n'ont pas été selectionnées
    if (!infoProductBasket[0] || infoProductBasket[1] === '' || infoProductBasket[2] === 0) {
        return console.log("Mauvaise saisi de l'utilisateur");
    } else {
        // création de l'ID de stockage
        const idStorage = infoProductBasket[0] + infoProductBasket[1];

        // création de la liste des infos du panier
        infoProductBasket = JSON.stringify(infoProductBasket)

        // création OU modification du localStorage
        window.localStorage.setItem(idStorage, infoProductBasket);
        return console.log("Ajouté au panier");
    }

}

/**
 * Récupération des infos du produit
 * @returns { Array } infoProductBasket
 */
function getInfosProduct() {
    // ID du produit
    const productId = dataProduct._id;

    // prix du produit
    const quantity = document.getElementById('quantity').value;

    // Couleur du produit
    const productColor = document.getElementById('colors').value;

    // Array des infos
    const infoProductBasket = [productId, productColor, quantity, dataProduct.imageUrl, dataProduct.altTxt, dataProduct.name, dataProduct.price];
    return infoProductBasket;

}

getIdProduct();
eventButtonBasket();