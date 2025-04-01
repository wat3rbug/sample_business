$(document).ready(function() {

    $.ajax({
        url: "/repos/getAllRevenue.php",
        dataType: "json",
        success: function(results){
            $('.revenue tbody').empty();
            if (results == null || results.length == 0) {
                $('.revenue').find('tbody tr').remove();
                var line = '<tr><td colspan="3" class="text-center">';
                line += 'No Data</td></tr>';
                $('.revenue tbody').append(line);
            } else {

            }
        }
    })
});