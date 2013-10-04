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
        $isRepeatCheck,
        $registerBtn,
        $deleteBtn,
        $shareBtn;
        $registerBtn = $('<input type="submit" value="register">');
        $imageSetForm = $('<form>').on('submit', function() {
            var data = {
                path   : $imagePathInput.prop('value'),
                title  : $imageTitleInput.prop('value'),
                repeat : $isRepeatCheck.prop('checked'),
                pos    : $imagePositionSelect.prop('value')
            };
            imageData[index] = data;
            $imagePreview.prop('src',data.path);
            updateLS();
            if($imagePathInput.is('.empty')){
                $imagePathInput.removeClass('empty');
                $imageSetForm.append($deleteBtn).append($shareBtn);
                makeImageRow((index+1),{})
            }
            return false;
        }); 
        $imagePathInput = $('<input type="text" class="pathInput" required>').prop(
            'value',
            data.path || ''
        );
        $deleteBtn = $('<input type="button" value="delete">')
        .on('click', function() {
            if(confirm('Will you delete it?')){
                imageData.splice(index, 1);
                updateLS();
                $tableRow.remove();
            }
        });
        $shareBtn = $('<input type="button" value="share">')
        .on('click', function() {
            var url = ('https://twitter.com/intent/tweet?hashtags=kulasis_happy_background&text='+encodeURIComponent('この画像をKULASISの背景に設定しました！！！ '+encodeURIComponent($imagePathInput.prop('value')))+'&url='+encodeURIComponent('http://pastak.hatenablog.com/entry/2013/09/29/171215'));
            window.open(url);
        });
        $imagePreview = $('<img class="preview">').prop(
            'src',
            data.path || './dummy.png'
        );
        $imageTitleInput = $('<input type="text" class="imageTitle" />').prop('value',(data.title || ('Untitled-'+index)));
        $imagePositionSelect = $('<select><option value="1">左上</option><option value="2">右上</option><option value="3">左下</option><option value="4">右下</option></select>');
        $imagePositionSelect.children(('option:nth-child('+(data.pos || 1)+')')).attr('selected',true);
        $isRepeatCheck = $('<input type="checkbox"/>').prop('checked',(data.repeat || false));
        $imageSetForm.append(
            $('<label><span>Title </span></label>').append($imageTitleInput)
        )
        .append('<br />')
        .append(
            $('<label><span>Image URL</span></label>').append($imagePathInput)
        )
        .append('<br />')
        .append($('<label><span>Position</span></label>').append($imagePositionSelect))
        .append($('<label></label>').append($isRepeatCheck).append('repeat'))
        .append('<br />')
        .append($registerBtn)
        $imageSet = $('<td>').append($imageSetForm);
        if(data.path){
            $imageSetForm.append($deleteBtn).append($shareBtn);
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
