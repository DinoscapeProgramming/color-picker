document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit').addEventListener('click', function () {
        chrome.notifications.clear('info');
        chrome.notifications.create('info', {
            type:'basic',
            iconUrl:'icons/128x128.png',
            title:'Contact',
            message:'Send feedback to us',
            priority:2
        });
    }, false);
}, false)