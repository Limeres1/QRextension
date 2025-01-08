const button = document.getElementById("qrCodeButton");
const image = document.getElementById("qrCode");
let currentUrl = ""; // Variable global para almacenar la URL

//URL de la pestaña actual
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
        currentUrl = tabs[0].url; // Asignar la URL a la variable global
        console.log("URL actual:", currentUrl);
        document.getElementById("currentUrl").textContent = currentUrl;
    } else {
        console.error("No se pudo obtener la URL de la pestaña activa.");
    }
});


/*
button.addEventListener("click", () => {
    if (currentUrl) {
        QRCode.toDataURL(currentUrl)
            .then((dataUrl) => {
                image.src = dataUrl; // Asignar la URL de la imagen al atributo src
                console.log("QR Code generado exitosamente.");
            })
            .catch((error) => {
                console.error("Error generando el QR Code:", error);
            });
    } else {
        console.error("No hay URL disponible para generar el QR Code.");
    }
});
*/

new QRCode(document.getElementById("qrcode"), currentUrl);