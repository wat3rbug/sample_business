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
        url: "/repos/getVendorById.php",
        type: "post",
        data:{
            "vendor": vendor
        },
        success: function(results) {
            if (results != null && results.length > 0) {
                var POVendor = results[0].name;
                $('#addPOCompleteVendor').text(POVendor);
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

function completeOrder() {
    var po = $('#addPOCompleteId').val();
    var acct = $('#addPOAcct').val();
    var amount = getTotalForPO();
    $.ajax({
        url: "/repos/completePO.php",
        type: "post",
        data: {
            "id": po,
            "account": acct,
            "amount": amount
        },
        success: function(results) {
            $('#addPOCompleteModal').modal('toggle');
            buildPOTable();
        }
    })
}

function buildPOTable() {
    $.ajax({
        url: "/repos/getPOs.php",
        dataType: "json",
        success: function(results) {
            $('#purchaseorders tbody').empty();
            if (results == null || results.length == 0) {
                var empty = '<tr><td colspan="6" class="text-center">No POs</td></tr>';
                $('#purchaseorders tbody').append(empty);   
            } else {
                for (i = 0; i < results.length; i++) {
                    var po = results[i];
                }
                var line = '<tr><td>' + getPOActionBtns(po) + '</td>';
                line += '<td>' + getShipStat(po.shipped) + '</td>';
                line += '<td>' + getShipStat(po.received) + '</td>';
                line += '<td>' + getShipStat(po.eta) + '</td>';
                line += '<td>' + getOnTime(po.received, po.eta) + '</td>';
                line += '</tr>';
                $('#purchaseorders tbody').append(line); 
            }
        }
    });
}

function getPOActionBtns(po) {
    btn = getPOInfoBtn(p);
    btns += getDeletePOBtn(po);
    btns += getShippedPOBtn(po);
    btns += getRcvdPOBtn(po);
    return btns;
}

function getRcvdPOBtn(po) {
    // do this
    return "";
}

function getShippedPOBtn(po) {
    // do this
    return "";
}

function getDeletePOBtn(po) {
    var btn = '<button class="btn btn-link" title"Delete Purchase Order"';
    btn +=' onclick="deletePO(' + po.id + ')" style="border:none; padding: 2px">';
    btn += '<span class="glyphicon glyphicon-remove"></span></button>';
    return btn;
}

function getPOInfoBtn(po) {
    var btn = '<button class="btn btn-link" title"Purchase Order Details"';
    btn +=' onclick="showDetails(' + po.id + ')" style="border:none; padding: 2px">';
    btn += '<span class="glyphicon glyphicon-question"></span></button>';
    return btn;
}

function showDetails(id) {
    $.ajax({
        url: "/repos/getPurchaseOrderById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            if (results != null && results.length > 0) {
                $('#showPOModal').modal('toggle');
                // do stuff here and build modal
            }
        }
    })
}

function getShipStat(stat) {
    if (stat == null || stat == "") {
        return " --";
    } return getTransDate(stat);
}

function getOnTime(received, eta) {
    if ((received == null || received == "") && getTransDate(new Date()) <  eta) {
        return " --";
    }
    if (received  <= eta) {
        return "YES";
    } else {
        return "NO";
    }
}
