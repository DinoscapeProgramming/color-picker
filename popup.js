document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('link1').href = chrome.runtime.getURL('settings.html');
    document.getElementById('link2').href = chrome.runtime.getURL('contact.html');
    chrome.storage.sync.get(["notification", "message", "copy", "edgeColor", "edgeColorHover", "textOnClick", "displayedTextOnClick", "colorOfTextOnClick", "contextMenus", "menuTitle"], function (storage) {
        if (storage.edgeColor) {
            document.getElementById('style').sheet.cssRules[1].style.border = "2px solid " + storage.edgeColor;
        }
        if (storage.edgeColorHover) {
            document.getElementById('style').sheet.cssRules[2].style.border = "2px solid " + storage.edgeColorHover;
        }
        if (storage.copy === "disabled") {
            document.getElementById('style').sheet.deleteRule(2);
        }
        if (storage.displayedTextOnClick) {
            document.getElementById('copied').innerHTML = storage.displayedTextOnClick;
        }
        if (storage.colorOfTextOnClick) {
            document.getElementById('copied').style.color = storage.colorOfTextOnClick;
        }
        document.getElementById('btn').addEventListener('click', function () {
            if ('EyeDropper' in window) {
                const eyeDropper = new EyeDropper()
                eyeDropper.open().then((result) => {
                    document.getElementById('text').innerHTML = result.sRGBHex;
                    document.getElementById('line').removeAttribute('style');
                    document.getElementById('copy').style.display = "inline-block";
                    document.getElementById('copy').style.backgroundColor = result.sRGBHex;
                });
            }
        }, false)
        document.getElementById('copy').addEventListener('click', function () {
            if (document.getElementById('text').innerHTML.length > 0 && storage.copy !== "disabled") {
                navigator.clipboard.writeText(document.getElementById('text').innerHTML);
                if (storage.notification !== "disabled") {
                    chrome.notifications.clear('info');
                    chrome.notifications.create('info', {
                        type: 'basic',
                        iconUrl: 'icons/128x128.png',
                        title: 'Clipboard',
                        message: storage.message || "Copied a hex code to your clipboard",
                        priority: 2
                    });
                }
                if (storage.textOnClick === "enabled") {
                    document.getElementById('copied').style.display = "";
                    setTimeout(function () {
                        document.getElementById('copied').style.display = "none";
                    }, 1500)
                }
            }
        }, false);
    })
}, false);