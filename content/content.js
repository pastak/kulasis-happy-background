(function(document){
chrome.runtime.sendMessage({data : 'getImageData'},function(response){
    var imageData = JSON.parse(response.imageData) || [''];
    var r = parseInt(Math.random() * imageData.length);
    function setBGImage(number){
        var position = '';
        switch(imageData[number].pos){
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
        document.body.style.background = ("url('"+ imageData[number].path +"') no-repeat fixed " + position);
    }
    var title,
        optionElm,
        selectElm = document.createElement('select');
    selectElm.style.position = 'fixed';
    selectElm.style.right = '5px';
    selectElm.style.bottom = '10px';
    selectElm.addEventListener('change', function(e){
        setBGImage(selectElm.selectedIndex);
    });
    imageData.forEach(function (elm, index){
        title = elm.title;
        optionElm = document.createElement('option');
        optionElm.textContent = title;
        if(index == r){
            optionElm.selected = true;
        }
        selectElm.appendChild(optionElm);
    });
    document.body.appendChild(selectElm);
    setBGImage(r);
})
})(document);
