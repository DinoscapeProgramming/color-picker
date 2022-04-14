chrome.storage.sync.get(['contextMenus', 'menuTitle'], function (storage) {
    if (storage.contextMenus !== "disabled") {
        chrome.contextMenus.create({
            id: "open",
            title: storage.menuTitle || "Pick a color",
            contexts: ["all"]
        })
        chrome.storage.sync.set({ "contextMenuExisting": "created" })
    }
})

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "open") {
        chrome.windows.create({
            url: chrome.runtime.getURL('popup.html'),
            focused: true,
            type: 'popup'
        })
    }
})