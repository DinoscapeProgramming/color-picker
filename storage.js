document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(["notification", "message", "copy", "edgeColor", "edgeColorHover", "textOnClick", "displayedTextOnClick", "colorOfTextOnClick", "contextMenus", "menuTitle", "contextMenuExisting"], function (storage) {
        Object.entries(storage).forEach((item) => {
            var element = document.createElement('tr');
            var firstOption = document.createElement('td');
            firstOption.innerHTML = item[0]
            element.appendChild(firstOption);
            var secondOption = document.createElement('td');
            secondOption.innerHTML = item[1]
            element.appendChild(secondOption);
            document.getElementById('table').appendChild(element);
        })
    })
}, false)