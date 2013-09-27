$(function() {
    var imagePathes = JSON.parse(localStorage.getItem('backgroundImagePathes')) || [];
    function updateLS(){
        localStorage.setItem(
            'backgroundImagePathes',
            JSON.stringify(imagePathes)
        );
    }
    function makeImageRow(index, item){
        var $tableRow,
        $imageView,
        $imagePreview,
        $imageSet,
        $imageSetForm,
        $imagePathInput,
        $registerBtn,
        $deleteBtn;
        $registerBtn = $('<input type="submit" value="register">')
        .on('click', function() {
            var path = $imagePathInput.prop('value');
            imagePathes[index] = path;
            $imagePreview.prop('src',path);
            updateLS();
            if($imagePathInput.is('.empty')){
                $imagePathInput.removeClass('empty');
                $imageSetForm.append($deleteBtn);
                makeImageRow((index+1))
            }
        });
        $imageSetForm = $('<form>').on('submit',function(){
            return false;
        });
        $imagePathInput = $('<input type="text" class="pathInput">').prop(
            'value',
            item || ''
        );
        $deleteBtn = $('<input type="button" value="delete">')
        .on('click', function() {
            if(confirm('Will you delete it?')){
                imagePathes.splice(index, 1);
                updateLS();
                $tableRow.remove();
            }
        });
        $imagePreview = $('<img class="preview">').prop(
            'src',
            item || './dummy.png'
        );
        $imageSet = $('<td>').append(
            $imageSetForm.append($imagePathInput)
            .append('<br />')
            .append($registerBtn)
        );
        if(item){
            $imageSetForm.append($deleteBtn);
            $registerBtn.prop('value', 'update');
        }else{
            $imagePathInput.addClass('empty');
        }
        $imageView = $('<td>').append($imagePreview);
        $tableRow = $('<tr>').append($imageView)
        .append($imageSetForm)
        .data('number',index);
        $('tbody').append($tableRow);

    }
    for(var i = 0; i <= imagePathes.length; i++){
        makeImageRow(i, imagePathes[i] || '')
    }

})
