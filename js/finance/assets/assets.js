$(document).ready(function() {

    $.ajax({
        url: "repos/getAllAssets.php",
        dataType: "json",
        success: function(results){
            $('.assets tbody').empty();
            if (results == null || results.length == 0) {
                $('.assets').find('tbody tr').remove();
                var line = '<tr><td colspan="3" class="text-center">';
                line += 'No Data</td></tr>';
                $('.assets tbody').append(line);
            } else {

            }
        }
    })
});