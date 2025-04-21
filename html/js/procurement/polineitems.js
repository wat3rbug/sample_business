$(document).ready(function() {

    buildAcctDropDowns();

    $('#cancelAddPOLineItem').on('click', function() {
        $('#addPOLineItemModal').modal('toggle');
        $('#addPOCompleteModal').modal('toggle');
    })

    $('#cancelEditPOLineItem').on('click', function() {
        $('#editPOLineItemModal').modal('toggle');
        $('#addPOCompleteModal').modal('toggle');
    })
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

function clearPOLineItemModal() {
    $('#addLineItemName').val('');
    $('#addLineItemQty').val('');
    $('#addLineItemCost').val('');
}

function addPOLineItem() {
    var partorder = $('#addPOCompleteId').val();
    var name = $('#addLineItemName').val();
    var quantity = $('#addLineItemQty').val();
    var cost = $('#addLineItemCost').val();
    $.ajax({
        url: "/repos/addPOLineItem.php",
        type: "post",
        data: {
            "partorder": partorder,
            "name": name,
            "cost": cost,
            "quantity": quantity
        },
        success: function(results) {
            $('#addPOLineItemModal').modal('toggle');
            clearPOLineItemModal();
            $('#addPOCompleteModal').modal('toggle');
            buildLineItemTables(partorder);
        }
    })
}

function buildLineItemTables(partorder) {
    $.ajax({
        url: "/repos/getLineItemsForPO.php",
        type: "post",
        data: {
            "partorder": partorder
        },
        success: function(results) {
            $('#polineitems tbody').empty();
            if (results != null && results.length > 0) {
                for (i = 0; i < results.length; i++) {
                     var lineitem = results[i];
                    var row = '<tr><td style="width: 65px">';
                    row += getPOActionBtns(lineitem) + '</td>';
                    row += '<td>' + lineitem.name + '</td>';
                    row += '<td>' + lineitem.quantity + '</td>';
                    row += '<td>' + getCurrency(lineitem.cost_per_unit) + '</td>';
                    row += '<td class="po_subtotal">' + getCurrency(lineitem.quantity * lineitem.cost_per_unit) + '</td>';
                    row += '</tr>';
                    $('#polineitems tbody').append(row);
                }
            } else {
                var empty = '<tr><td colspan="5" class="text-center">No Items</td></tr>';
                $('#polineitems tbody').append(empty);
            }
        }
    });
}

function clearLineItemModals() {
    $('#addLineItemName').val('');
    $('#addLineItemQty').val('');
    $('#addLineItemCost').val('');
    $('#editLineItemId').val('');
    $('#editLineItemName').val('');
    $('#editLineItemQty').val('');
    $('#addLineItemCost').val('');
}

function addLineItem() {
    clearLineItemModals();
    $('#addPOCompleteModal').modal('toggle');
    $('#addPOLineItemModal').modal('toggle');
}

function getPOActionBtns(lineitem) {
    var btn = getPOEditBtn(lineitem);
    btn += getPODeleteBtn(lineitem);
    return btn;
}

function getPODeleteBtn(lineitem) {
    var btn = '<button class="btn btn-link title="Delete Item" ';
    btn += ' style="border:none; padding: 2px" onclick="deleteItem(';
    btn += lineitem.id + ')"><span class="glyphicon glyphicon-remove"></span>';
    btn += '</button>';
    return btn;
}

function getPOEditBtn(lineitem) {
    var btn = '<button class="btn btn-link title="Edit Item" ';
    btn += ' style="border:none; padding: 2px" onclick="editItem(';
    btn += lineitem.id + ')"><span class="glyphicon glyphicon-pencil"></span>';
    btn += '</button>';
    return btn;
}

function deleteItem(id) {
    $.ajax({
        url: "/repos/deletePOLineItem.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            var partorder = $('#addPOCompleteId').val();
            buildLineItemTables(partorder);
        }
    });
}

function editItem(id) {
    $.ajax({
        url: "/repos/getPOLineItemById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            if (results != null && results.length > 0) {
                clearLineItemModals();
                $('#addPOCompleteModal').modal('toggle');
                var lineitem = results[0];
                $('#editLineItemId').val(lineitem.id);
                $('#editLineItemName').val(lineitem.name);
                $('#editLineItemQty').val(lineitem.quantity);
                $('#editLineItemCost').val(lineitem.cost_per_unit);
                $('#editPOLineItemModal').modal('toggle');
            }
        }
    });
}

function updateItem() {
    var id = $('#editLineItemId').val();
    var name = $('#editLineItemName').val();
    var quantity = $('#editLineItemQty').val();
    var cost = $('#editLineItemCost').val();
    var partorder = $('#addPOCompleteId').val();
    $.ajax({
        url: "/repos/updatePOLineItem.php",
        type: "post",
        data: {
            "partorder": partorder,
            "id": id,
            "name": name,
            "quantity": quantity,
            "cost": cost
        },
        success: function(results) {
            clearLineItemModals();
            $('#editPOLineItemModal').modal('toggle');
            $('#addPOCompleteModal').modal('toggle');
            buildLineItemTables(partorder);
        }
    });
}

