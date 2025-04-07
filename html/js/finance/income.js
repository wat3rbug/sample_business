$(document).ready(function() {

    const DEBIT = 0;
    const CREDIT = 1;

    buildRevenueTable(new Date());
    buildExpenseTable(new Date());
});

function buildRevenueTable(current) {
    $.ajax({
        url: "/repos/getRevenueByMonth.php",
        type: "post",
        data: {
            "current": current
        },
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
                    var line = '<tr>';
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
                var total = parseFloat(debit) - parseFloat(credit);
                $('#grandTotal').text(formatter.format(total));
            }
        }
    });
}

function buildExpenseTable(current) {
    $.ajax({
        url: "/repos/getExpenseByMonth.php",
        dataType: "json",
        type: "post",
        data: {
            "current": current
        },
        success: function(results){
            $('.expenses tbody').empty();
            if (results == null || results.length == 0) {
                $('.expenses').find('tbody tr').remove();
                var line = '<tr><td colspan="4" class="text-center">';
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
                    var line = '<tr>';
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