$(document).ready(function() {

    buildLiabilityTable();
    
    $('#editLiaDate').datepicker({
        format: 'd-M-yyyy',
        autoclose: true,
        orientation: "top auto",
        todayHighlight: true
    });
});

function buildLiabilityTable() {
    $.ajax({
        url: "/repos/getAllLiabilities.php",
        dataType: "json",
        success: function(results){
            $('.liabilities tbody').empty();
            if (results == null || results.length == 0) {
                $('.liabilities').find('tbody tr').remove();
                var line = '<tr><td colspan="4" class="text-center">';
                line += 'No Data</td></tr>';
                $('.liabilities tbody').append(line);
            } else {
                for (i = 0; i < results.length; i ++) {
                    var liability = results[i];
                    var line = '<tr><td style="width:65px">';
                    line += getActionBtns(liability) + '</td>';
                    line += '<td>' + getWebDateFromDBString(liability.transdate) + '</td>';
                    line += '<td>' + liability.name + '</td>';
                    line += '<td>' + getAmount(liability) + '</td>';
                    line += '</tr>';
                    $('.liabilities tbody').append(line);
                }
            }
        }
    });
}

function getActionBtns(liability) {
    var btns = getEditBtn(liability);
    btns += getDeleteBtn(liability);
    return btns;
}

function getDeleteBtn(liability) {
    var btn = '<button type="button" class="btn btn-link" style="border:none; padding:2px"';
    btn += ' onclick="deleteLiability(' + liability.id + ')"><span class="glyphicon glyphicon-remove">';
    btn += '</span></button>';
    return btn;
}

function deleteLiability(id) {
    $.ajax({
        url: "/repos/deleteLiability.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            buildLiabilityTable();
        }
    });
}

function getEditBtn(liability) {
    var btn = '<button type="button" class="btn btn-link" style="border:none; padding:2px"';
    btn += ' onclick="editLiability(' + liability.id + ')"><span class="glyphicon glyphicon-pencil">';
    btn += '</span></button>';
    return btn;
}

function editLiability(id) {
    $.ajax({
        url: "/repos/getLiabilityById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            $('#editLiabilityModal').modal('toggle');
            var liability = results[0];
            $('#editLiaId').val(liability.id);
            $('#editLiaDate').val(getDateFromDBString(liability.transdate));
            $('#editLiaName').val(liability.name);
            $('#editLiaAmount').val(liability.amount);
        }
    });
}

function updateLiability() {
    $('#editLiabilityModal').modal('toggle');
    var id = $('#editLiaId').val();
    var amount = $('#editLiaAmount').val();
    var name = $('#editLiaName').val();
    var transdate = getTransDate($('#editLiaDate').datepicker('getDate'));;
    $.ajax({
        url: "/repos/updateLiability.php",
        type: "post",
        data: {
            "id": id,
            "amount": amount,
            "transdate" : transdate,
            "name": name
        }, success: function(results) {
            clearLiabilityModals();
            buildLiabilityTable();
        }
    });
}

function clearLiabilityModals() {
    var id = $('#editLiaId').val('');
    var id = $('#editLiaName').val('');
    var id = $('#editLiaAmount').val('');
    var id = $('#editLiaDate').val('');
}