$(document).ready(function() {

    buildEquityTable();

    $('#cancelEditEquityBtn').on('click', function() {
        $('#editEquityModal').modal('toggle');
    }); 
    $('#editEquityDate').datepicker({
        format: 'd-M-yyyy',
        autoclose: true,
        orientation: "top auto",
        todayHighlight: true
    });
});

function buildEquityTable() {
    $.ajax({
        url: "/repos/getAllEquity.php",
        dataType: "json",
        success: function(results){
            $('.equity tbody').empty();
            if (results == null || results.length == 0) {
                $('.equity').find('tbody tr').remove();
                var line = '<tr><td colspan="5" class="text-center">';
                line += 'No Data</td></tr>';
                $('.equity tbody').append(line);
            } else {
                var credit = 0;
                var debit = 0;
                let formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    trailingZeroDisplay: 'stripIfInteger'   
                  });
                for (i = 0; i < results.length; i ++) {
                    var equity = results[i];
                    var line = '<tr><td style="width:65px">';
                    line += getActionBtns(equity) + '</td>';
                    line += '<td>' + getWebDateFromDBString(equity.transdate) + '</td>';
                    line += '<td>' + equity.name + '</td>';
                    line += '<td>' + getCredit(equity, formatter) + '</td>';
                    line += '<td>' + getDebit(equity, formatter) + '</td>';
                    line += '</tr>';
                    $('.equity tbody').append(line);
                    if (equity.entrytype == 1) credit += equity.amount;;
                    if (equity.entrytype == 0) debit += equity.amount;
                }
                $('#creditTotal').text(formatter.format(credit));
                $('#debitTotal').text(formatter.format(debit));
                $('#grandTotal').text(formatter.format((credit - debit)));
            }
        }
    });
}

function getActionBtns(equity) {
    var btns = getEditBtn(equity);
    btns += getDeleteBtn(equity);
    return btns;
}

function getDeleteBtn(equity) {
    var btn = '<button type="button" class="btn btn-link" style="border:none; padding:2px"';
    btn += ' onclick="deleteEquity(' + equity.id + ')"><span class="glyphicon glyphicon-remove">';
    btn += '</span></button>';
    return btn;
}

function deleteEquity(id) {
    $.ajax({
        url: "/repos/deleteLedgerEntry.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            buildEquityTable();
        }
    });
}

function getEditBtn(equity) {
    var btn = '<button type="button" class="btn btn-link" style="border:none; padding:2px"';
    btn += ' onclick="editEquity(' + equity.id + ')"><span class="glyphicon glyphicon-pencil">';
    btn += '</span></button>';
    return btn;
}

function editEquity(id) {
    $.ajax({
        url: "/repos/getLedgerEntryById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            $('#editEquityModal').modal('toggle');
            var equity = results[0];
            $('#editEquityId').val(equity.id);
            $('#editEquityDate').val(getDateFromDBString(equity.transdate));
            $('#editEquityName').val(equity.name);
            $('#editEquityAmount').val(equity.amount);
        }
    });
}

function updateEquity() {
    $('#editEquityModal').modal('toggle');
    var id = $('#editEquityId').val();
    var amount = $('#editEquityAmount').val();
    var name = $('#editEquityName').val();
    var transdate = getTransDate($('#editEquityDate').datepicker('getDate'));;
    $.ajax({
        url: "/repos/updateLedgerEntry.php",
        type: "post",
        data: {
            "id": id,
            "amount": amount,
            "transdate" : transdate,
            "name": name
        }, success: function(results) {
            clearEquityModals();
            buildEquityTable();
        }
    });
}

function clearEquityModals() {
    $('#editEquityId').val('');
    $('#editEquityName').val('');
    $('#editEquityAmount').val('');
    $('#editEquityDate').val('');
}

function getDebit(equity, formatter) {
    if (equity.entrytype == 0) {
        return formatter.format(equity.amount);
    } else return ' --';
}

function getCredit(equity, formatter) {
    if (equity.entrytype == 1) {
        return formatter.format(equity.amount);
    } else return ' --';
}



