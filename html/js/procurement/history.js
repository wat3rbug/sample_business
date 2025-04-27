const DEBIT = 1;
const CREDIT = 0;

$(document).ready(function() {

    $('#editEntryDate').datepicker({
        format: 'd-M-yyyy',
        autoclose: true,
        orientation: "top auto",
        todayHighlight: true
    });

    $('.periodCal').datepicker({
        format: 'd-M-yyyy',
        autoclose: true,
        orientation: "top auto",
        todayHighlight: true
    });

    buildDefaultHistoryTable();

    $('#cancelEditEntryBtn').on('click', function() {
        $('editEntryModal').modal('toggle');
    });

    $('#periodBtn').on('click', function() {
        var raw = $('.periodCal').datepicker('getDate');
        var current = JSToDB(raw);
        buildHistoryTable(current);
    })

    $('#periodCalBtn').on('click', function() {
        var current = $('.periodCal').datepicker('getDate');
        buildHistoryTable(current);
    });

});

function buildHistoryTable(current) {
    $.ajax({
        url: "/repos/getPurchaseHistoryByMonth.php",
        type: "post",
        data: {
            "current": current,
        },
        success: function(results) {
            $('.history tbody').empty();
            if (results == null || results.length == 0) {
                var empty = '<tr><td colspan="7" class="text-center">';
                empty += 'No Data</td></tr>';
                $('.history tbody').append(empty);
            } else {
                let formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2, 
                    trailingZeroDisplay: 'auto'  
                });
                for (i = 0; i < results.length; i++) {
                    var entry = results[i];
                    var row = buildTableRow(entry, formatter);
                    $('.history tbody').append(row);
                }
            }
        }
    });
}

function buildDefaultHistoryTable() {
    var current = new Date();
    var datepickerDate = JSToDatepicker(current);
    $('.periodCal').datepicker('setDate',datepickerDate);
    var currentToDB = JSToDB(current);
    buildHistoryTable(currentToDB);

}

function buildTableRow(entry, formatter) {
    var line = '<tr><td style="width: 65px">' + getActionBtns(entry.id);
    line += '</td><td>' + DBToString(entry.transdate) + '</td>';
    line += '<td>' + entry.name + '</td>';
    line += '<td>' + getDebit(entry, formatter) + '</td>';
    line += '<td>' + getCredit(entry, formatter) + '</td>';
    line += '<td>' + entry.accountname + '</td>';
    line += '<td>' + entry.accounttype + '</td></tr>';
    return line;
}

function getActionBtns(id) {
    var cell = getEditBtn(id) + getDeleteBtn(id);
    return cell;
}

function getEditBtn(id) {getTransDate
    var btn = '<button class="btn btn-link" onclick="editEntry(' + id;
    btn += ')" title="edit Ledger Entry" style="border: none; padding:2px">';
    btn += '<span class="glyphicon glyphicon-pencil">';
    btn += '</span></button>';
    return btn;
}

function getDeleteBtn(id) {
    var btn = '<button class="btn btn-link" onclick="deleteEntry(' + id;
    btn += ')" title="delete Ledger Entry" style="border: none; padding:2px">';
    btn += '<span class="glyphicon glyphicon-remove">';
    btn += '</span></button>';
    return btn;
}

function getDebit(expense, formatter) {
    if (expense.entrytype == DEBIT) {
        return formatter.format(expense.amount);
    } else return ' --';
}

function getCredit(expense, formatter) {
    if (expense.entrytype == CREDIT) {
        return formatter.format(expense.amount);
    } else return ' --';
}

function editEntry(id) {
    $.ajax({
        url: "/repos/getLedgerEntryById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            $('#editEntryModal').modal('toggle');
            var entry = results[0];
            $('#editEntryId').val(entry.id);
            $('#editEntryName').val(entry.name);
            $('#editEntryType').val(entry.entrytype);
            $('#editEntryAmount').val(entry.amount);
            $('#editEntryAccount').text(entry.accountname);
            $('#editEntryDate').datepicker('setDate', new Date(entry.transdate));
            $('#editEntryAcctType').text(entry.accounttype);
        }
    });
}

function updateEntry() {
    $('#editEntryModal').modal('toggle');
    var id = $('#editEntryId').val();
    var name = $('#editEntryName').val();
    var amount = $('#editEntryAmount').val();
    var transdate = getDBDateFromJSDate($('#editEntryDate').datepicker('getDate'));
    var entrytype = $('#editEntryType').val();
    $.ajax({
        url: "/repos/updateLedgerEntry.php",
        type: "post",
        data: {
            "id": id,
            "name": name,
            "amount": amount,
            "transdate" : transdate,
            "entrytype": entrytype
        }, success: function(results) {
            clearEntryModals();
            var current = getDBDateFromJSDate($('#editEntryDate').datepicker('getDate'));
            buildHistoryTable(current);
        }
    });
}

function clearEntryModals() {
    $('#editEntryId').val('');
    $('#editEntryName').val('');
    $('#editEntryAmount').val('');
    $('#editEntryDate').val('');
}

function deleteEntry(id) { 
    $.ajax({
        url: "/repos/deleteLedgerEntry.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            var current = getDBDateFromJSDate($('.periodCal').datepicker('getDate'));
            buildHistoryTable(current);
        }
    })
}

function getTransDate(expense) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var trans = new Date(expense.transdate);
    var year = trans.getUTCFullYear();
    var month = trans.getUTCMonth();
    var day = trans.getUTCDay();
    return day + ' ' + months[month] + ' ' + year;
}