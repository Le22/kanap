/**
 * Récupération de l'ID de la commande
 * @return { Function }
 */
 function getIdOrder() {
    // récupération des paramètres de recherche de l'url
    const pageURL = document.location.search;
    const searchId = new URLSearchParams(pageURL);

    // récupération de l'id dans l'url
    const productId = searchId.get("id");
    return displayIdOrder(productId)
}

/**
 * Afficher le numéro de la commande
 * @param { String }
 */
function displayIdOrder(id) {
    return document.getElementById('orderId').innerHTML=id;
}

getIdOrder();