$(document).ready(function() {

    buildExpenseTable();

    $('#cancelEditExpenseBtn').on('click', function() {
        $('#editExpenseModal').modal('toggle');
    });

    $('#editExpDate').datepicker({
        format: 'd-M-yyyy',
        autoclose: true,
        orientation: "top auto",
        todayHighlight: true
    });

    const DEBIT = 1;
    const CREDIT = 0;
});

function buildExpenseTable() {
    $.ajax({
        url: "/repos/getAllExpenses.php",
        dataType: "json",
        success: function(results){
            $('.expenses tbody').empty();
            if (results == null || results.length == 0) {
                $('.expenses').find('tbody tr').remove();
                var line = '<tr><td colspan="5" class="text-center">';
                line += 'No Data</td></tr>';
                $('.expenses tbody').append(line);
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
                    var expense = results[i];
                    var line = '<tr><td style="width:65px">';
                    line += getActionBtns(expense) + '</td>';
                    line += '<td>' + getWebDateFromDBString(expense.transdate) + '</td>';
                    line += '<td>' + expense.name + '</td>';
                    // magic flip here too
                    line += '<td>' + getCredit(expense, formatter) + '</td>';
                    line += '<td>' + getDebit(expense, formatter) + '</td>';
                    line += '</tr>';
                    $('.expenses tbody').append(line);
                    if (expense.entrytype == CREDIT) credit += expense.amount;;
                    if (expense.entrytype == DEBIT) debit += expense.amount;
                    // end magic flip
                }
                $('#creditTotal').text(formatter.format(credit));
                $('#debitTotal').text(formatter.format(debit));
                var total = parseFloat(debit) - parseFloat(credit);
                $('#grandTotal').text(formatter.format(total));
            }
        }
    });
}

function getActionBtns(expense) {
    var btns = getEditBtn(expense);
    btns += getDeleteBtn(expense);
    return btns;
}

function getDeleteBtn(expense) {
    var btn = '<button type="button" class="btn btn-link" style="border:none; padding:2px"';
    btn += ' onclick="deleteExpense(' + expense.id + ')"><span class="glyphicon glyphicon-remove">';
    btn += '</span></button>';
    return btn;
}

function deleteExpense(id) {
    $.ajax({
        url: "/repos/deleteExpense.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            buildExpenseTable();
        }
    })
}

function getEditBtn(expense) {
    var btn = '<button type="button" class="btn btn-link" style="border:none; padding:2px"';
    btn += ' onclick="editExpense(' + expense.id + ')"><span class="glyphicon glyphicon-pencil">';
    btn += '</span></button>';
    return btn;
}

function editExpense(id) {
    $.ajax({
        url: "/repos/getLedgerEntryById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            $('#editExpenseModal').modal('toggle');
            var expense = results[0];
            $('#editExpId').val(expense.id);
            $('#editExpEntryType').val(expense.entrytype);
            $('#editExpDate').datepicker('setDate', new Date(expense.transdate));
            $('#editExpName').val(expense.name);
            $('#editExpAmount').val(expense.amount);
        }
    })
}

function updateExpense() {
    $('#editExpenseModal').modal('toggle');
    var id = $('#editExpId').val();
    var amount = $('#editExpAmount').val();
    var name = $('#editExpName').val();
    var entrytype = $('#editExpEntryType').val();
    var transdate = getDBDateFromJSDate($('#editExpDate').datepicker('getDate'));
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
            clearExpenseModals();
            buildExpenseTable();
        }
    });
}

function clearExpenseModals() {
    var id = $('#editExpId').val('');
    var id = $('#editExpName').val('');
    var id = $('#editExpAmount').val('');
    var id = $('#editExpDate').val('');
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