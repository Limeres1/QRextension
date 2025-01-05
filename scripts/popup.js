chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = tabs[0].url; // URL de la pestaña actual
    console.log("URL actual:", currentUrl);

    document.getElementById('currentUrl').textContent = currentUrl;
});

const button = document.getElementById("qrCodeButton");
