document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(["notification", "message", "copy", "edgeColor", "edgeColorHover", "textOnClick", "displayedTextOnClick", "colorOfTextOnClick", "contextMenus", "menuTitle"], function (storage) {
        if (storage.notification) {
            document.getElementById('select1').value = storage.notification;
            if (storage.notification === "enabled") {
                if (storage.message) {
                    document.getElementById('input1').value = storage.message;
                }
            } else {
                document.getElementById('input1').style.display = "none";
            }
        }
        if (storage.copy) {
            document.getElementById('select2').value = storage.copy;
        }
        if (storage.edgeColor) {
            document.getElementById('color1').value = storage.edgeColor;
        }
        if (storage.edgeColorHover) {
            document.getElementById('color2').value = storage.edgeColorHover;
        }
        if (storage.colorOfTextOnClick) {
            document.getElementById('color3').value = storage.colorOfTextOnClick;
        }
        if (storage.textOnClick) {
            document.getElementById('select3').value = storage.textOnClick;
            if (storage.textOnClick === "enabled") {
                document.getElementById('input2').removeAttribute('style');
                if (storage.displayedTextOnClick) {
                    document.getElementById('input2').value = storage.displayedTextOnClick;
                }
            } else {
                document.getElementById('input2').style.display = "none";
            }
        } else {
            document.getElementById('select3').value = "disabled";
        }
        if (storage.contextMenus) {
            document.getElementById('select4').value = storage.contextMenus;
            if (storage.contextMenus === "enabled") {
                document.getElementById('input3').removeAttribute('style');
                if (storage.menuTitle) {
                    document.getElementById('input3').value = storage.menuTitle;
                }
            } else {
                document.getElementById('input3').style.display = "none";
            }
        }
    })
    document.getElementById('select1').addEventListener('change', function () {
        if (document.getElementById('select1').value === "enabled") {
            document.getElementById('input1').removeAttribute('style');
        } else {
            document.getElementById('input1').style.display = "none";
        }
    })
    document.getElementById('select3').addEventListener('change', function () {
        if (document.getElementById('select3').value === "enabled") {
            document.getElementById('input2').removeAttribute('style');
        } else {
            document.getElementById('input2').style.display = "none";
        }
    })
    document.getElementById('select4').addEventListener('change', function () {
        if (document.getElementById('select4').value === "enabled") {
            document.getElementById('input3').removeAttribute('style');
        } else {
            document.getElementById('input3').style.display = "none";
        }
    })
    document.getElementById('submit1').addEventListener('click', function () {
        chrome.storage.sync.set({ "notification": document.getElementById('select1').value }, function () {
            if (document.getElementById('select1').value === "enabled") {
                if (document.getElementById('input1').value) {
                    chrome.storage.sync.set({ "message": document.getElementById('input1').value })
                } else {
                    chrome.storage.sync.remove(["message"])
                }
            } else {
                chrome.storage.sync.remove(["message"])
            }
        })
    }, false)
    document.getElementById('submit2').addEventListener('click', function () {
        chrome.storage.sync.set({ "copy": document.getElementById('select2').value })
    }, false)
    document.getElementById('submit3').addEventListener('click', function () {
        chrome.storage.sync.set({ "edgeColor": document.getElementById('color1').value })
    }, false)
    document.getElementById('submit4').addEventListener('click', function () {
        chrome.storage.sync.set({ "edgeColorHover": document.getElementById('color2').value })
    }, false)
    document.getElementById('submit6').addEventListener('click', function () {
        chrome.storage.sync.set({ "colorOfTextOnClick": document.getElementById('color3').value })
    }, false)
    document.getElementById('submit5').addEventListener('click', function () {
        chrome.storage.sync.set({ "textOnClick": document.getElementById('select3').value }, function () {
            if (document.getElementById('select3').value === "enabled") {
                if (document.getElementById('input2').value) {
                    chrome.storage.sync.set({ "displayedTextOnClick": document.getElementById('input2').value })
                } else {
                    chrome.storage.sync.remove(["displayedTextOnClick"])
                }
            } else {
                chrome.storage.sync.remove(["displayedTextOnClick"])
            }
        })
    }, false)
    document.getElementById('submit7').addEventListener('click', function () {
        chrome.storage.sync.get('contextMenuExisting', function (storage) {
            chrome.storage.sync.set({ "contextMenus": document.getElementById('select4').value }, function () {
                if (document.getElementById('select4').value === "enabled") {
                    if (storage.contextMenuExisting === "notCreated") {
                        chrome.contextMenus.create({
                            id: "open",
                            title: document.getElementById('input3').value || "Pick a color",
                            contexts: ["all"]
                        })
                        chrome.storage.sync.set({ "contextMenuExisting": "created" })
                    } else {
                        chrome.contextMenus.update('open', {
                            title: document.getElementById('input3').value || "Pick a color"
                        })
                    }
                    if (document.getElementById('input3').value) {
                        chrome.storage.sync.set({ "menuTitle": document.getElementById('input3').value })
                    } else {
                        chrome.storage.sync.remove(["menuTitle"])
                    }
                } else {
                    if (storage.contextMenuExisting === "created") {
                        chrome.contextMenus.remove('open')
                        chrome.storage.sync.set({ "contextMenuExisting": "notCreated" })
                    }
                    chrome.storage.sync.remove(["menuTitle"])
                }
            })
        })
    }, false)
    document.getElementById('reset1').addEventListener('click', function () {
        chrome.storage.sync.remove(["notification", "message"], function () {
            document.getElementById('select1').value = "enabled";
            document.getElementById('input1').value = "";
            document.getElementById('input1').removeAttribute('style');
        })
    }, false)
    document.getElementById('reset2').addEventListener('click', function () {
        chrome.storage.sync.remove(["copy"], function () {
            document.getElementById('select2').value = "enabled";
        })
    }, false)
    document.getElementById('reset3').addEventListener('click', function () {
        chrome.storage.sync.remove(["edgeColor"], function () {
            document.getElementById('color1').value = "#838383";
        })
    }, false)
    document.getElementById('reset4').addEventListener('click', function () {
        chrome.storage.sync.remove(["edgeColorHover"], function () {
            document.getElementById('color2').value = "#000000";
        })
    }, false)
    document.getElementById('reset6').addEventListener('click', function () {
        chrome.storage.sync.remove(["colorOfTextOnClick"], function () {
            document.getElementById('color3').value = "#008000";
        })
    }, false)
    document.getElementById('reset5').addEventListener('click', function () {
        chrome.storage.sync.remove(["textOnClick", "displayedTextOnClick"], function () {
            document.getElementById('select3').value = "disabled";
            document.getElementById('input2').style.display = "none";
        })
    }, false)
    document.getElementById('reset7').addEventListener('click', function () {
        chrome.storage.sync.get('contextMenuExisting', function (storage) {
            chrome.storage.sync.remove(["contextMenus", "menuTitle"], function () {
                if (storage.contextMenuExisting === "notCreated") {
                    chrome.contextMenus.create({
                        id: "open",
                        title: "Pick a color",
                        contexts: ["all"]
                    })
                    chrome.storage.sync.set({ "contextMenuExisting": "created" })
                } else {
                    chrome.contextMenus.update('open', {
                        title: "Pick a color"
                    })
                }
                document.getElementById('select4').value = "enabled";
                document.getElementById('input3').value = "";
                document.getElementById('input3').removeAttribute('style');
            })
        })
    }, false)
}, false)