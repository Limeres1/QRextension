const button = document.getElementById("qrCodeButton");
const copyButton = document.getElementById("copyButton")
const qrImage = document.getElementById("qrImage");
const qrBox = document.getElementById("qrBox");
let currentUrl = ""; // Variable global para almacenar la URL
const currentUrlElement = document.getElementById("currentUrl");
const downloadButton = document.getElementById("download-button");
const container = document.querySelector('.container');
let flag = false;


//URL de la pestaña actual
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
        currentUrl = tabs[0].url; // Asignar la URL a la variable global
        console.log("URL:", currentUrl);

        // Truncar la URL si es demasiado larga
        const truncatedUrl = truncateUrl(currentUrl, 50); // Cambia 50 por el número de caracteres máximo
        document.getElementById("currentUrl").textContent = truncatedUrl; // Mostrar URL truncada
        document.getElementById("currentUrl").title = currentUrl; // Muestra la URL completa al pasar el mouse
    } else {
        console.error("The URL of the active tab could not be obtained.");
    }
});

//BOTON PARA COPIAR TEXTO.
copyButton.addEventListener("click", () => {
    const textToCopy = currentUrlElement.textContent; //Obtiene el elemento del tag <a>

    // API Clipboard para copiar el texto.

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log("Text copied to clipboard:", textToCopy);
            alert("Text copied to clipboard!");
        })
        .catch((err) => {
            console.error("Error when copying text:", err);
        });
});

//BOTON PARA GENERAR CODIGO QR.
button.addEventListener("click", generateQR);

function generateQR() {
    qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + currentUrl;
    qrBox.classList.add("show-img");
    flag = true;
}

//AL TOCAR QR CODE SE ABRE EN OTRA PESTAÑA.
qrImage.addEventListener("click", openImage);

function openImage() {
    window.open(qrImage.src)
}


downloadButton.addEventListener("click", () => {
    if (qrImage.src && flag) {
        downloadOption();
    }
    else {
        console.error("It is not possible to download the QR code.");
        alert("Generate the QR code before downloading it.")
    }
});

function downloadOption() {
    const enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = qrImage.src;
    enlaceDescarga.download = "QrCode.png";

    enlaceDescarga.click();
    console.log("QR code downloaded.")
}

function truncateUrl(url, maxLength) {
    if (url.length > maxLength) {
        return url.substring(0, maxLength) + "...";
    }
    return url;
}

document.getElementById('qrCodeButton').addEventListener('click', function () {
    const qrBox = document.getElementById('qrBox');
    qrBox.style.display = 'block';
    container.style.height = 'auto';
});