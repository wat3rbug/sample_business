$(document).ready(function() {

    buildAssetTable();

    $('#cancelEditAssetBtn').on('click', function() {
        $('#editAssetModal').modal('toggle');
    });

    $('#editAssetDate').datepicker({
        format: 'd-M-yyyy',
        autoclose: true,
        orientation: "top auto",
        todayHighlight: true
    });

   
});

function buildAssetTable() {
    $.ajax({
        url: "/repos/getAllAssets.php",
        dataType: "json",
        success: function(results){
            $('.assets tbody').empty();
            if (results == null || results.length == 0) {
                $('.assets').find('tbody tr').remove();
                var line = '<tr><td colspan="4" class="text-center">';
                line += 'No Data</td></tr>';
                $('.assets tbody').append(line);
            } else {
                for (i = 0; i < results.length; i ++) {
                    var asset = results[i];
                    var line = '<tr><td style="width: 65px">';
                    line += getActionBtns(asset) + '</td>';
                    line += '<td>' + getWebDateFromDBString(asset.transdate) + '</td>';
                    line += '<td>' + asset.name + '</td>';
                    line += '<td>' + getAmount(asset) + '</td>';
                    line += '</tr>';
                    $('.assets tbody').append(line);
                }
            }
        }
    });
}

function getActionBtns(asset) {
    var btns = getEditBtn(asset);
    btns += getDeleteBtn(asset);
    return btns;
}

function getDeleteBtn(asset) {
    var btn = '<button type="button" class="btn btn-link" style="border:none; padding:2px"';
    btn += ' onclick="deleteAsset(' + asset.id + ')"><span class="glyphicon glyphicon-remove">';
    btn += '</span></button>';
    return btn;
}

function deleteAsset(id) {
    $.ajax({
        url: "/repos/deleteAsset.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            buildAssetTable();
        }
    })
}

function getEditBtn(asset) {
    var btn = '<button type="button" class="btn btn-link" style="border:none; padding:2px"';
    btn += ' onclick="editAsset(' + asset.id + ')"><span class="glyphicon glyphicon-pencil">';
    btn += '</span></button>';
    return btn;
}

function editAsset(id) {
    $.ajax({
        url: "/repos/getAssetById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            $('#editAssetModal').modal('toggle');
            var asset = results[0];
            $('#editAssetId').val(asset.id);
            $('#editAssetDate').val(getDateFromDBString(asset.transdate));
            $('#editAssetName').val(asset.name);
            $('#editAssetAmount').val(asset.amount);
        }
    })
}

function updateAsset() {
    $('#editAssetModal').modal('toggle');
    var id = $('#editAssetId').val();
    var amount = $('#editAssetAmount').val();
    var name = $('#editAssetName').val();
    var transdate = getTransDate($('#editAssetDate').datepicker('getDate'));;
    $.ajax({
        url: "/repos/updateAsset.php",
        type: "post",
        data: {
            "id": id,
            "amount": amount,
            "transdate" : transdate,
            "name": name
        }, success: function(results) {
            clearAssetModals();
            buildAssetTable();
        }
    });
}

function clearAssetModals() {
    var id = $('#editAssetId').val('');
    var id = $('#editAssetName').val('');
    var id = $('#editAssetAmount').val('');
    var id = $('#editAssetDate').val('');
}