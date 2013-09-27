(function(document){
chrome.runtime.sendMessage({data : 'getImagePath'},function(response){
    var imagePathes = JSON.parse(response.imagePathes) || [''];
    var r = parseInt(Math.random() * imagePathes.length);
    document.body.style.background = ("url('"+ imagePathes[r] +"') no-repeat fixed");
})
})(document);
