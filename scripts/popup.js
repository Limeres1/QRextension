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
        document.getElementById("currentUrl").textContent = currentUrl;
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
        generateQR();
        downloadOption();
        console.error("No es posible descargar el Codigo QR.");
        alert("QRCODE descargado!")
    }
});

function downloadOption() {
    const enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = qrImage.src;
    enlaceDescarga.download = "QrCode.png";

    enlaceDescarga.click();
    console.log("Codigo QR descargado.")
}