$(document).ready(function() {

    buildAcctDropDowns();
});

function buildAcctDropDowns() {
    $.ajax({
        url: "/repos/getAccountDropDowns.php",
        dataType: "json",
        success: function(results) {
            $('#addPOAcct').empty();
            $('#editPOAcct').empty();
            if (results != null && results.length > 0) {
                for (i = 0; i < results.length; i++) {
                    var acct = results[i];
                    var option = '<option value="' + acct.id;
                    option += '">' + acct.name + '</option>';
                    $('#addPOAcct').append(option);
                    $('#editPOAcct').append(option);
                }
            } else {
                var option = '<option value="0"> -- None -- </option>';
                $('#addPOAcct').append(option);
                $('#editPOAcct').append(option);
            }
        }
    });
}
