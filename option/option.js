$(function() {
    var imageData = JSON.parse(localStorage.getItem('backgroundImageData')) || [];
    function updateLS(){
        localStorage.setItem(
            'backgroundImageData',
            JSON.stringify(imageData)
        );
    }
    function makeImageRow(index, data){
        var $tableRow,
        $imageView,
        $imagePreview,
        $imageSet,
        $imageSetForm,
        $imagePathInput,
        $imageTitleInput,
        $imagePositionSelect,
        $registerBtn,
        $deleteBtn;
        $registerBtn = $('<input type="submit" value="register">')
        .on('click', function() {
            var data = {
                path  : $imagePathInput.prop('value'),
                title : $imageTitleInput.prop('value'),
                pos   : $imagePositionSelect.prop('value')
            };
            imageData[index] = data;
            $imagePreview.prop('src',data.path);
            updateLS();
            if($imagePathInput.is('.empty')){
                $imagePathInput.removeClass('empty');
                $imageSetForm.append($deleteBtn);
                makeImageRow((index+1),{})
            }
        });
        $imageSetForm = $('<form>').on('submit',function(){
            return false;
        });
        $imagePathInput = $('<input type="text" class="pathInput">').prop(
            'value',
            data.path || ''
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
            data.path || './dummy.png'
        );
        $imageTitleInput = $('<input type="text" class="imageTitle" />').prop('value',data.title);
        $imagePositionSelect = $('<select><option value="1">左上</option><option value="2">右上</option><option value="3">左下</option><option value="4">右下</option></select>');
        $imagePositionSelect.children(('option:nth-child('+(data.pos || 1)+')')).attr('selected',true);
        $imageSetForm.append(
            $('<label><span>Title </span></label>').append($imageTitleInput)
        )
        .append('<br />')
        .append(
            $('<label><span>Image URL</span></label>').append($imagePathInput)
        )
        .append('<br />')
        .append($('<label><span>Position</span></label>').append($imagePositionSelect))
        .append('<br />')
        .append($registerBtn)
        $imageSet = $('<td>').append($imageSetForm);
        if(data.path){
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
    for(var i = 0; i <= imageData.length; i++){
        makeImageRow(i, imageData[i] || {})
    }

})
