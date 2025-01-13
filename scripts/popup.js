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

button.addEventListener("click", () => {
    const textToCopy = currentUrlElement.textContent;
    QrCode.toDataURL(textToCopy)
        .then((dataUrl) => {
            image.src = dataUrl;
        })
        .catch((err) => console.error("Error generando el QR Code:", err));
});