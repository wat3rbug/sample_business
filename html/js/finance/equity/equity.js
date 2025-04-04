$(document).ready(function() {

    $.ajax({
        url: "/repos/getAllEquity.php",
        dataType: "json",
        success: function(results){
            $('.equity tbody').empty();
            if (results == null || results.length == 0) {
                $('.equity').find('tbody tr').remove();
                var line = '<tr><td colspan="3" class="text-center">';
                line += 'No Data</td></tr>';
                $('.equity tbody').append(line);
            } else {
                for (i = 0; i < results.length; i ++) {
                    var expense = results[i];
                    var line = '<tr><td>' + getTransDate(expense) + '</td>';
                    line += '<td>' + expense.name + '</td>';
                    line += '<td>' + getAmount(expense) + '</td>';
                    line += '</tr>';
                    $('.equity tbody').append(line);
                }
            }
        }
    })
});