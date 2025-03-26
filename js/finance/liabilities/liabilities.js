$(document).ready(function() {

    $.ajax({
        url: "repos/getAllLiabilities.php",
        dataType: "json",
        success: function(results){
            $('.liabilities tbody').empty();
            if (results == null || results.length == 0) {
                $('.liabilities').find('tbody tr').remove();
                var line = '<tr><td colspan="3" class="text-center">';
                line += 'No Data</td></tr>';
                $('.liabilities tbody').append(line);
            } else {

            }
        }
    })
});