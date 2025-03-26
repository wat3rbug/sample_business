$(document).ready(function() {

    $.ajax({
        url: "repos/getAllEquity.php",
        dataType: "json",
        success: function(results){
            $('.equity tbody').empty();
            if (results == null || results.length == 0) {
                $('.equity').find('tbody tr').remove();
                var line = '<tr><td colspan="3" class="text-center">';
                line += 'No Data</td></tr>';
                $('.equity tbody').append(line);
            } else {

            }
        }
    })
});