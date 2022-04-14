document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('download').addEventListener('click', function () {
        var link = document.createElement('a');
        link.href = "color-picker.zip";
        link.target = "_blank";
        link.click()
    }, false)
    document.getElementById('download-zip').addEventListener('click', function () {
        var link = document.createElement('a');
        link.href = "color-picker.zip";
        link.target = "_blank";
        link.click()
    }, false)
}, false)