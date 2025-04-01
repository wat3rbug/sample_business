$(document).ready(function() {

        getStatesDropDown();
});

function getStatesDropDown() {
    $.ajax({
        url: "/repos/getAllStates.php",
        dataType: "json",
        success: function(results) {
            $('.states').empty();
            var empty = '<option value="0"> -- None selected -- </option>';
            $('.states').append(empty);
            if (results != null && results.length > 0) {
                for (i = 0; i < results.length; i++) {
                    var line = '<option value="' + results[i].postal_code;
                    line += '">' + results[i].state + '</option>';
                    $('.states').append(line);
                }

            }
        }
    });
}