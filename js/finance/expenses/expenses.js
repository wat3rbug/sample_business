$(document).ready(function() {

    $.ajax({
        url: "repos/getAllExpenses.php",
        dataType: "json",
        success: function(results){
            $('.expenses tbody').empty();
            if (results == null || results.length == 0) {
                $('.expenses').find('tbody tr').remove();
                var line = '<tr><td colspan="3" class="text-center">';
                line += 'No Data</td></tr>';
                $('.expenses tbody').append(line);
            } else {

            }
        }
    })
});