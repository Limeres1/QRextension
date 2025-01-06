const button = document.getElementById("qrCodeButton");
const image = document.getElementById("qrCode");
let currentUrl = ""; // Se define afuera para uso global.

// Obtener la URL de la pestaña actual
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    currentUrl = tabs[0].url; // Asignar la URL a la variable global
    console.log("URL actual:", currentUrl);
    document.getElementById("currentUrl").textContent = currentUrl;
});

// Generar el código QR cuando se hace clic en el botón
button.addEventListener("click", () => {
    if (currentUrl) {
        QRCode.toDataURL(currentUrl).then((dataUrl) => {
            image.src = dataUrl; // Usar "src" correctamente
        }).catch((error) => {
            console.error("Error generando el QR Code:", error);
        });
    } else {
        console.error("URL no disponible para generar el QR Code.");
    }
});