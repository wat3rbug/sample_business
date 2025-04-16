$(document).ready(function() {

    $('#startOrder').on('click', function() {
        $('#addPOVendModal').modal('toggle');
        startOrder();
    });

    $('#cancelPOBtn').on('click', function() {
        cancelPO();
    });
});

function addPurchaseOrder() {
    clearPOModals();
    $.ajax({
        url: "/repos/getVendorDropDown.php",
        dataType: "json",
        success: function(results) {
            $('#addPOVendor').empty();
            if (results != null && results.length > 0) {
                for (i = 0; i < results.length; i++) {
                    var vendor = results[i];
                    var option = '<option value="' + vendor.id;
                    option += '">' + vendor.name + '</option>';
                    $('#addPOVendor').append(option);
                }
            }
        }
    });
    $('#addPOVendModal').modal('toggle');
}

function clearPOModals() {
    $('#addPOVendor').val('');
    $('#addPOId').val('');
    $('#addPOCompleteId').val('');
    $('#polineitems tbody').empty();
    var empty = '<td><td colspan="5" class="text-center">No items</td></tr>';
    $('#polineitems tbody').append(empty);
}

function startOrder() {
    var vendor = $('#addPOVendor').val();
    $.ajax({
        url: "/repos/addPartOrder.php",
        type: "post",
        data: {
            "vendor": vendor
        },
        success: function(results) {
            if (results != null && results.length > 0) {
                $('#addPOModal').modal('toggle');
                $('#addPOId').val(results[0].id);
                $('#addPOCompleteId').val(results[0].id);
                $('#addPOCompleteModal').modal('toggle');
            }
        }
    });
}

function cancelPO() {
    $('#addPOCompleteModal').modal('toggle');
    var po = $('#addPOCompleteId').val();
    clearPOModals();
    $.ajax({
        url: "/repos/deletePurchaseOrder.php",
        type: "post",
        data: {
            "id": po
        }
    });
}