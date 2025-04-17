$(document).ready(function() {

});

function addTag() {
    var vendor = $('#addTagIdHdn').val();
    var desc = $('#addTagDesc').val();
    clearTagModal();
    $.ajax({
        url: "/repos/addTag.php",
        type: "post",
        data: {
            "vendor": vendor,
            "description": desc
        },
        success: function(results) {
            $('#addTagModal').modal('toggle');
            buildVendorTable();
        }
    });
}

function clearTagModal() {
    $('#addTagIdHdn').val('');
    $('#addTagDesc').val('');
    $('#addTagModalTags').empty();
}

function addVendorTag(id) {
    $.ajax({
        url: "/repos/getVendorById.php",
        type: "post",
        data: {
            "vendor": id
        },
        success: function(results) {
            if (results != null && results.length > 0) {
                var vendor = results[0];
                $('#addTagModal').modal('toggle');
                $('#addTagIdHdn').val(vendor.id);
                $('#addTagVendor').text(vendor.name);
                $.ajax({
                    url: "/repos/getTagsByVendor.php",
                    type: "post",
                    data: {
                        "vendor": vendor.id
                    },
                    success: function(results) {
                        if (results != null && results.length > 0) {
                            $('#addTagModalTags').empty();
                            for (i = 0; i < results.length; i++) {
                                var tag = results[i];
                                var button = getTagBtn(tag);
                                $('#addTagModalTags').append(button);
                            }
                        }
                    }
                });
            }
        }
    });
}

function getTagsByVendor(vendor) {
    $.ajax({
        url: "/repos/getTagsByVendor.php",
        type: "post",
        dataType: "json",
        data: {
            "vendor": vendor
        },
        success: function(results) {
            if (results == null|| results.length == 0) {
                $('#tag_' + vendor).empty();
                return "N/A";
            } else {
                $('#tag_' + vendor).empty();
                for(i = 0; i < results.length; i++) {
                    var tag = results[i];
                    var button = getTagBtn(tag);
                    $('#tag_' + vendor).append(button);
                }
            }
        }
    });
}

function getTagBtn(tag) {
    var button = '<button type="button" class="btn btn-outline-primary" ';
    button += ' onclick="deleteTag(' + tag.id + ')">' + tag.description;
    button += '&nbsp;<span class="glyphicon glyphicon-remove"></span></button>&nbsp;';
    return button;
}

function getAddTagBtn(vendor) {
    var btn = '<button class="btn btn-link" onclick="addVendorTag(';
    btn += vendor.id + ')" title="Add Vendor Tag" style="border:none; padding: 4px">';
    btn += '<span class="glyphicon glyphicon-tag"></span>';
    btn += '</button>';
    return btn;
}

function deleteTag(id) {
    $.ajax({
        url: "/repos/deleteTag.php",
        type: "post",
        data: {
            "tag": id
        }, success: function(results) {
            buildVendorTable();
        }
    });
}