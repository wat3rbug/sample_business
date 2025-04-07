$(document).ready(function() {

    buildRevenueTable();

    $('#cancelEditRevenueBtn').on('click', function() {
        $('#editRevenueModal').modal('toggle');
    }); 
    $('#editRevDate').datepicker({
        format: 'd-M-yyyy',
        autoclose: true,
        orientation: "top auto",
        todayHighlight: true
    });

    const DEBIT = 1;
    const CREDIT = 0;
});

function buildRevenueTable() {
    $.ajax({
        url: "/repos/getAllRevenue.php",
        dataType: "json",
        success: function(results){
            $('.revenue tbody').empty();
            if (results == null || results.length == 0) {
                $('.revenue').find('tbody tr').remove();
                var line = '<tr><td colspan="4" class="text-center">';
                line += 'No Data</td></tr>';
                $('.revenue tbody').append(line);
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
                    var revenue = results[i];
                    var line = '<tr><td style="width:65px">';
                    line += getActionBtns(revenue) + '</td>';
                    line += '<td>' + getWebDateFromDBString(revenue.transdate) + '</td>';
                    line += '<td>' + revenue.name + '</td>';
                    line += '<td>' + getDebit(revenue, formatter) + '</td>';
                    line += '<td>' + getCredit(revenue, formatter) + '</td>';
                    line += '</tr>';
                    $('.revenue tbody').append(line);
                    if (revenue.entrytype == CREDIT) credit += revenue.amount;;
                    if (revenue.entrytype == DEBIT) debit += revenue.amount;
                }
                $('#creditTotal').text(formatter.format(credit));
                $('#debitTotal').text(formatter.format(debit));
                // magic flip portion
                var total = parseFloat(debit) - parseFloat(credit);
                $('#grandTotal').text(formatter.format(total));
            }
        }
    });
}

function getActionBtns(revenue) {
    var btns = getEditBtn(revenue);
    btns += getDeleteBtn(revenue);
    return btns;
}

function getDeleteBtn(revenue) {
    var btn = '<button type="button" class="btn btn-link" style="border:none; padding:2px"';
    btn += ' onclick="deleteRevenue(' + revenue.id + ')"><span class="glyphicon glyphicon-remove">';
    btn += '</span></button>';
    return btn;
}

function deleteRevenue(id) {
    $.ajax({
        url: "/repos/deleteRevenue.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            buildRevenueTable();
        }
    })
}

function getEditBtn(revenue) {
    var btn = '<button type="button" class="btn btn-link" style="border:none; padding:2px"';
    btn += ' onclick="editRevenue(' + revenue.id + ')"><span class="glyphicon glyphicon-pencil">';
    btn += '</span></button>';
    return btn;
}

function editRevenue(id) {
    $.ajax({
        url: "/repos/getLedgerEntryById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            $('#editRevenueModal').modal('toggle');
            var revenue = results[0];
            $('#editRevId').val(revenue.id);
            $('#editRevEntryType').val(revenue.entrytype);
            $('#editRevDate').datepicker('setDate', new Date(revenue.transdate));
            $('#editRevName').val(revenue.name);
            $('#editRevAmount').val(revenue.amount);
        }
    })
}

function updateRevenue() {
    $('#editRevenueModal').modal('toggle');
    var id = $('#editRevId').val();
    var amount = $('#editRevAmount').val();
    var name = $('#editRevName').val();
    var entrytype = $('#editRevEntryType').val();
    var transdate = getDBDateFromJSDate($('#editRevDate').datepicker('getDate'));;
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
            clearRevenueModals();
            buildRevenueTable();
        }
    });
}

function clearRevenueModals() {
    var id = $('#editRevId').val('');
    var id = $('#editRevName').val('');
    var id = $('#editRevAmount').val('');
    var id = $('#editRevDate').val('');
}

