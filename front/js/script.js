// liste des produits
let dataProducts

/**
 * Récupérer la liste des produits de l'API
 * @return { function }
*/
async function getProducts() {
    // appeler API
    respond = await fetch("http://localhost:3000/api/products/");

    // convertir la liste des produits au format JSON
    dataProducts = await respond.json();

    return insertProduct();
}

/**
 * Création de la liste des produits
 */
function insertProduct() {
    // récupération de l'élément du DOM
    const listProducts = document.getElementById("items");

    // boucle for sur chaque porduit
    for (let i = 0; i < dataProducts.length; i++) {
        listProducts.appendChild(createProduct(i));
    }
}

/**
 * Création du produit
 * @param { Number } i 
 * @return { HTMLElement }
 */
function createProduct(i) {
    // création de la balise du produit
    const product = document.createElement("a")

    // ajout de l'url de la page produit
    product.href = `./product.html?id=${dataProducts[i]._id}`;

    // ajout du contenu du produit
    product.innerHTML = `
            <article>
            <img src=${dataProducts[i].imageUrl} alt=${dataProducts[i].altTxt}>
            <h3 class="productName">${dataProducts[i].name}</h3>
            <p class="productDescription">${dataProducts[i].description}</p>
            </article>
    `;
    return product
}

getProducts();
