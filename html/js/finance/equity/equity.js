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

    const DEBIT = 0;
    const CREDIT = 1;
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
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2, 
                    trailingZeroDisplay: 'auto' 
                  });
                for (i = 0; i < results.length; i ++) {
                    var equity = results[i];
                    var line = buildTableRow(equity, formatter);
                    $('.equity tbody').append(line);
                    if (equity.entrytype == DEBIT) debit += equity.amount;;
                    if (equity.entrytype == CREDIT) credit += equity.amount;
                }
                buildTableTotals(credit, debit, formatter);
            }
        }
    });
}

function buildTableTotals(credit, debit, formatter) {
    $('#creditTotal').text(formatter.format(credit));
    $('#debitTotal').text(formatter.format(debit));
    // magic flip portion
    var total = parseFloat(debit) - parseFloat(credit);
    $('#grandTotal').text(formatter.format(total));
}

function buildTableRow(equity, formatter) {
    var line = '<tr><td style="width:65px">';
    line += getActionBtns(equity) + '</td>';
    line += '<td>' + getWebDateFromDBString(equity.transdate) + '</td>';
    line += '<td>' + equity.name + '</td>';
    line += '<td>' + getDebit(equity, formatter) + '</td>';
    line += '<td>' + getCredit(equity, formatter) + '</td>';
    line += '</tr>';
    return line;
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
            $('#editEquityEntryType').val(equity.entrytype);
            $('#editEquityDate').datepicker('setDate', new Date(equity.transdate));
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
    var entrytype = $('#editEquityEntryType').val();
    var transdate = getDBDateFromJSDate($('#editEquityDate').datepicker('getDate'));
    $.ajax({
        url: "/repos/updateLedgerEntry.php",
        type: "post",
        data: {
            "id": id,
            "amount": amount,
            "transdate" : transdate,
            "name": name,
            "entrytype": entrytype
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

function makeDatepickerFromDB(transdate) {
    var trans = new Date(transdate);
    var year = trans.getUTCFullYear();
    var month = trans.getUTCMonth();
    var day = trans.getUTCDay();
    var result = year + '-' + month + '-' + day;
    return result;
}



