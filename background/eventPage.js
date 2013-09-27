chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    console.log(request);
    if (request.data == "getImagePath"){
        sendResponse({
            imagePathes: localStorage.getItem('backgroundImagePathes'||null)
        }
        );
    }
});
