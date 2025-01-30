const button = document.getElementById("qrCodeButton");
const copyButton = document.getElementById("copyButton")
const qrImage = document.getElementById("qrImage");
const qrBox = document.getElementById("qrBox");
let currentUrl = ""; // Variable global para almacenar la URL
const currentUrlElement = document.getElementById("currentUrl");
const downloadButton = document.getElementById("download-button");
let flag = false;


//URL de la pestaña actual
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
        currentUrl = tabs[0].url; // Asignar la URL a la variable global
        console.log("URL actual:", currentUrl);

        // Truncar la URL si es demasiado larga
        const truncatedUrl = truncateUrl(currentUrl, 50); // Cambia 50 por el número de caracteres máximo
        document.getElementById("currentUrl").textContent = truncatedUrl; // Mostrar URL truncada
        document.getElementById("currentUrl").title = currentUrl; // Muestra la URL completa al pasar el mouse
    } else {
        console.error("No se pudo obtener la URL de la pestaña activa.");
    }
});

//BOTON PARA COPIAR TEXTO.
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
        console.error("No es posible descargar el código QR.");
        alert("Genera el código QR antes de su descarga.")
    }
});

function downloadOption() {
    const enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = qrImage.src;
    enlaceDescarga.download = "QrCode.png";

    enlaceDescarga.click();
    console.log("Código QR descargado.")
}

function truncateUrl(url, maxLength) {
    if (url.length > maxLength) {
        return url.substring(0, maxLength) + "...";
    }
    return url;
}

document.getElementById('qrCodeButton').addEventListener('click', function () {
    const qrBox = document.getElementById('qrBox');
    qrBox.classList.add('show');
});