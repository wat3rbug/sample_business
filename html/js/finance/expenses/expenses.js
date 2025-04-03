$(document).ready(function() {

    $.ajax({
        url: "/repos/getAllExpenses.php",
        dataType: "json",
        success: function(results){
            $('.expenses tbody').empty();
            if (results == null || results.length == 0) {
                $('.expenses').find('tbody tr').remove();
                var line = '<tr><td colspan="3" class="text-center">';
                line += 'No Data</td></tr>';
                $('.expenses tbody').append(line);
            } else {
                for (i = 0; i < results.length; i ++) {
                    var expense = results[i];
                    var line = '<tr><td>' + getTransDate(expense) + '</td>';
                    line += '<td>' + expense.name + '</td>';
                    line += '<td>' + getAmount(expense) + '</td>';
                    line += '</tr>';
                    $('.expenses tbody').append(line);
                }
            }
        }
    });
});

function getTransDate(expense) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var trans = new Date(expense.transdate);
    var year = trans.getUTCFullYear();
    var month = trans.getUTCMonth();
    var day = trans.getUTCDay();
    return day + ' ' + months[month] + ' ' + year;
}

function getAmount(expense) {
    const formatter = new Intl.NumberFormat('en-us', {
        style: "currency",
        currency: "USD",
        trailingZeroDisplay: 'stripIfInteger' 
    });
    return formatter.format(expense.amount);
}