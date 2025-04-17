$(document).ready(function() {

    $('#startOrder').on('click', function() {
        $('#addPOVendModal').modal('toggle');
        startOrder();
    });

    $('#cancelPOBtn').on('click', function() {
        cancelPO();
    });

    $('#addItemToPO').on('click', function() {
        addLineItem();
    });

    $('#cancelPOLineItem').on('click', function() {
        $('#addPOLineItemModal').modal('toggle');
        $('#addPOCompleteModal').modal('toggle');
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

function clearLineItemModal() {
    $('#addLineItemName').val('');
    $('#addLineItemQty').val('');
    $('#addLineItemCost').val('');
}

function addLineItem() {
    clearLineItemModal();
    $('#addPOCompleteModal').modal('toggle');
    $('#addPOLineItemModal').modal('toggle');
}

function addItemToPO() {
    var name = $('#addLineItemName').val();
    var qty = $('#addLineItemQty').val();
    var cost = $('#addLineItemCost').val();
    var partorder = $('#addPOCompleteId').val();
    $.ajax({
        url: "/repos/addPOLineItem.php",
        type: "post",
        data: {
            "name" : name,
            "qty": qty,
            "cost": cost,
            "partorder": partorder
        },
        success: function(results) {
            $('#addPOLineItemModal').modal('toggle');
            clearLineItemModal();
            $('#addPOCompleteModal').modal('toggle');
            buildLineItemTables(partorder);
        }
    });
}

function buildLineItemTables(partorder) {
    $.ajax({
        url: "/repos/getLineItemsForPO.php",
        type: "post",
        data: {
            "partorder": partorder
        },
        success: function(results) {
            if (results != null && results.length > 0) {
                $('#polineitems tbody').empty();
                for (i = 0; i < results.length; i++) {
                     var lineitem = results[i];
                    var row = '<tr><td style="width: 65px">';
                    row += getPOActionBtns(lineitem) + '</td>';
                    row += '<td>' + lineitem.name + '</td>';
                    row += '<td>' + lineitem.quantity + '</td>';
                    row += '<td>' + getCurrency(lineitem.cost_per_unit) + '</td>';
                    row += '<td>' + getCurrency(lineitem.quantity * lineitem.cost_per_unit) + '</td>';
                    row += '</tr>';
                    $('#polineitems tbody').append(row);
                }
            }
        }
    });
}

function getPOActionBtns(lineitem) {
    var btn = getPOEditBtn(lineitem);
    btn += getPODeleteBtn(lineitem);
    return btn;
}

function getPOEditBtn(lineitem) {
    var btn = '<button class="btn btn-link title="Edit Item" ';
    btn += ' style="border:none; padding: 2px" onclick="editItem(';
    btn += lineitem.id + ')"><span class="glyphicon glyphicon-pencil"></span>';
    btn += '</button>';
    return btn;
}

function editItem(id) {
    
    $.ajax({
        url: "/repos/getLineItemById.php",
        type: "post",
        data: {
            "id": id
        }, success: function(results) {
            $('#addPOCompleteModal').modal('toggle');
            $('#editPOLineItem').modal('toggle');
        }
    });
 
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
    })
}

function getPODeleteBtn(lineitem) {
    var btn = '<button class="btn btn-link title="Delete Item" ';
    btn += ' style="border:none; padding: 2px" onclick="deleteItem(';
    btn += lineitem.id + ')"><span class="glyphicon glyphicon-remove"></span>';
    btn += '</button>';
    return btn;
}

function getCurrency(amount) {
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2, 
        trailingZeroDisplay: 'auto' 
      });
      return formatter.format(amount);
}

function addPOLineItem() {
    var name = $('#addLineItemName').val();
    $('#addLineItemName').val('');
    var qty = $('#addLineItemQty').val();
    $('#addLineItemQty').val('');
    var cost = $('#addLineItemCost').val();
    $('#addLineItemCost').val('');
    $('#addPOLineItemModal').modal('toggle');
    $('#addPOCompleteModal').modal('toggle');
    var id = $('#addPOCompleteId').val(); // dont remove, its the PO
    $.ajax({
        url: "/repos/addPOLineItem.php",
        type: "post",
        data: {
            "id": id,
            "name": name,
            "quantity": qty,
            "cost": cost
        },
        success: function(results) {
            buildLineItemTables(id);
        }
    })
}