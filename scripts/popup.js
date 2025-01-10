const button = document.getElementById("qrCodeButton");
const copyButton = document.getElementById("copyButton")
const image = document.getElementById("qrCode");
let currentUrl = ""; // Variable global para almacenar la URL
const currentUrlElement = document.getElementById("currentUrl");

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

const qrcode = new QRCode(document.getElementById('qrcode'), {
    text: 'https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs/qrcode.min.js',
    width: 128,
    height: 128,
    colorDark: '#000',
    colorLight: '#fff',
    correctLevel: QRCode.CorrectLevel.H
});

copyButton.addEventListener("click", () => {
    const textToCopy = currentUrlElement.textContent; //Obtiene el elemento del tag <a>

    // API Clipboard para copiar el texto.

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log("Texto copiado al portapapeles:", textToCopy);
            alert("¡Texto copiado al portapapeles!");
        })
        .catch((err) => {
            console.error("Error al copiar el texto:", err);
        });
});