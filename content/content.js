(function(document){
chrome.runtime.sendMessage({data : 'getImageData'},function(response){
    var imageData = JSON.parse(response.imageData) || [''];
    var r = parseInt(Math.random() * imageData.length);
    var position = '';
    switch(imageData[r].pos){
        case '1' :
            position = 'left top';
            break;
        case '2' :
            position = 'right top';
            break;
        case '3' :
            position = 'left bottom';
            break;
        case '4' :
            position = 'right bottom';
            break;
    }
    document.body.style.background = ("url('"+ imageData[r].path +"') no-repeat fixed " + position);
})
})(document);
