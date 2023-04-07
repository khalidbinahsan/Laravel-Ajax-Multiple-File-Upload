$('.add-file').on('click', function (){
        //Append Row
        let newTableRow =
            '<tr>'+
                '<td><input class="form-control file-input" type="file"></td>'+
                '<td class="file-size">File Size</td>'+
                '<td><button class="btn btn-primary file-upload">Upload</button></td>'+
                '<td><button class="btn btn-danger btn-cancel">Cancel</button></td>'+
                '<td class="uploaded-file-mb">Uploaded (MB)</td>'+
                '<td class="uploaded-file-percentage">Uploaded (%)</td>'+
                '<td class="status">Status</td>'+
            '</tr>';
        $('.file-list').append(newTableRow);
        //File size
        $('.file-input').on('change', function (){
            let myFile = $(this).prop('files');
            let fileSize =((myFile[0].size)/(1024*1024)).toFixed(2);
            $(this).closest('tr').find('.file-size').html(fileSize + " MB");
        });

        //Row remove
        $('.btn-cancel').each(function (){
            $(this).click(function (){
                $(this).parents('tr').remove();
            });
        });
        // File Upload
        $('.file-upload').on('click', function (event){
            let uploadBtn = $(this);
            let myFile = $(this).closest('tr').find('.file-input').prop('files');
            let uploadedFileMb = $(this).closest('tr').find('.uploaded-file-mb');
            let uploadedFilePercentage = $(this).closest('tr').find('.uploaded-file-percentage');
            let status = $(this).closest('tr').find('.status');
            let formData = new FormData();
            formData.append('FileKey', myFile[0]);
            fileUpload(formData, uploadedFileMb, uploadedFilePercentage, status, uploadBtn);
            event.preventDefault();
            event.stopImmediatePropagation();
        });
});
function fileUpload(formData, uploadedFileMb, uploadedFilePercentage, status, uploadBtn){
    status.html('Uploading...');
    uploadBtn.prop('disabled', true);
    let url = '/file_upload';
    let config = {
        headers: {'content-type': 'multipart/form-data'},
        onUploadProgress: function (progressEvent){
           let upMB = (progressEvent.loaded/(1024*1024)).toFixed(2);
           let upPercent = ((progressEvent.loaded*100)/progressEvent.total).toFixed(2);
           uploadedFileMb.html(upMB + 'MB');
           uploadedFilePercentage.html(upPercent+ '%');
        }
    };
    axios.post(url, formData, config)
        .then(function (response){
            if(response.status==200){
                status.html('Success');
                uploadBtn.prop('disabled', false);
            }
        })
        .catch(function (error){
            status.html('Fail');
        });
}



