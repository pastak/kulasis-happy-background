chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    console.log(request);
    if (request.data == "getImageData"){
        sendResponse({
            imageData: localStorage.getItem('backgroundImageData'||null)
        }
        );
    }
});
