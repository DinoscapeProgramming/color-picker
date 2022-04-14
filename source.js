document.addEventListener('DOMContentLoaded', function () {
    var files = [
        "manifest.json",
        "background.js",
        "popup.html",
        "popup.js",
        "settings.html",
        "settings.js",
        "contact.html",
        "contact.js",
        "storage.html",
        "storage.js",
        "source.html",
        "source.js",
        "welcome.html",
        "welcome.js",
        "LICENSE",
        "icons/16x16.png",
        "icons/48x48.png",
        "icons/128x128.png"
    ]
    files.forEach((file) => {
        var element = document.createElement('option')
        element.value = file
        element.innerHTML = file
        document.getElementById('select').appendChild(element)
    })
    document.getElementById('iframe').src = document.getElementById('select').value
    document.getElementById('select').addEventListener('change', function () {
        document.getElementById('iframe').src = document.getElementById('select').value
    })
    document.getElementById('download').addEventListener('click', function () {
        var link = document.createElement('a');
        link.href = "color-picker.zip";
        link.target = "_blank";
        link.click()
    }, false)
}, false)