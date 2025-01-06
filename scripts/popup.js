const button = document.getElementById("qrCodeButton");
const image = document.getElementById("qrCode");
let currentUrl = ""; // Variable global para almacenar la URL

// Obtener la URL de la pestaña actual
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
        currentUrl = tabs[1].url; // Asignar la URL a la variable global
        console.log("URL actual:", currentUrl);
        document.getElementById("currentUrl").textContent = currentUrl;
    } else {
        console.error("No se pudo obtener la URL de la pestaña activa.");
    }
});

// Generar el código QR al hacer clic en el botón
button.addEventListener("click", () => {
    if (currentUrl) {
        QRCode.toDataURL(currentUrl)
            .then((dataUrl) => {
                image.src = dataUrl; // Mostrar el QR code
            })
            .catch((error) => {
                console.error("Error generando el código QR:", error);
            });
    } else {
        console.error("URL no disponible para generar el código QR.");
    }
});