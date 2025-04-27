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

    buildPOTable();
    loadDeliveryStats();
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
    var name = $('#addPOCompleteName').val();
    var acct = $('#addPOAcct').val();
    var entrytype = $('#addPOEntryType').val();
    var amount = getTotalForPO();
    var eta = $('#addPOCompleteEta').datepicker().getDate(); // fix this
    $.ajax({
        url: "/repos/completePO.php",
        type: "post",
        data: {
            "id": po,
            "account": acct,
            "amount": amount,
            "name": name,
            "entrytype": entrytype,
            "scheduled": eta
        },
        success: function(results) {
            $('#addPOCompleteModal').modal('toggle');
            buildPOTable();
        }
    })
}

function buildPOTable() {
    $.ajax({
        url: "/repos/getIncompletePOs.php",
        dataType: "json",
        success: function(results) {
            $('#purchaseorders tbody').empty();
            if (results == null || results.length == 0) {
                var empty = '<tr><td colspan="7" class="text-center">No POs</td></tr>';
                $('#purchaseorders tbody').append(empty);   
            } else {
                for (i = 0; i < results.length; i++) {
                    var po = results[i];
                }
                var line = '<tr><td>' + getPOBtns(po) + '</td>';
                line += '<td>' + po.name + '</td>';
                line += '<td>' + po.ordered + '</td>';
                line += '<td>' + getShipStat(po.shipped) + '</td>';
                line += '<td>' + getShipStat(po.received) + '</td>';
                line += '<td>' + getShipStat(po.scheduled) + '</td>';
                line += '<td>' + po.vendor + '</td>';
                line += '</tr>';
                $('#purchaseorders tbody').append(line); 
            }
        }
    });
}

function getPOBtns(po) {
    var btns = getPOInfoBtn(po);
    btns += getDeletePOBtn(po);
    btns += getShippedPOBtn(po);
    btns += getRcvdPOBtn(po);
    return btns;
}

function getRcvdPOBtn(po) {
    if (po.received == null || po.received == "") {
        var btn = '<button class="btn btn-link" title="Item was received"';
        btn += ' style="border:none; padding: 2px" onclick="receivedItem(';
        btn += po.id + ')"><span class="glyphicon glyphicon-home"></span>';
        btn += '</button>';
        return btn;
    } else {
        return "";
    }
}

function receivedItem(id) {
    $.ajax({
        url: "/repos/receivePOById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            buildPOTable();
            loadDeliveryStats();
        }
    });
}

function getShippedPOBtn(po) {
    if (po.shipped == null || po.shipped == "") {
        var btn = '<button class="btn btn-link" title="Item was shipped"';
        btn += ' style="border:none; padding: 2px" onclick="shippedItem(';
        btn += po.id + ')"><span class="glyphicon glyphicon-send"></span>';
        btn += '</button>';
        return btn;
    } else {
        return "";
    }
}

function shippedItem(id) {
    $.ajax({
        url: "/repos/shipPOById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            buildPOTable();
            loadDeliveryStats();
        }
    });
}

function getDeletePOBtn(po) {
    var btn = '<button class="btn btn-link" title"Delete Purchase Order"';
    btn +=' onclick="deletePO(' + po.id + ')" style="border:none; padding: 2px">';
    btn += '<span class="glyphicon glyphicon-remove"></span></button>';
    return btn;
}

function deletePO(id) {
    $.ajax({
        url: "/repos/deletePO.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            buildPOTable();
        }
    })
}

function getPOInfoBtn(po) {
    var btn = '<button class="btn btn-link" title="Purchase Order Details"';
    btn +=' onclick="showDetails(' + po.id + ')" style="border:none; padding: 2px">';
    btn += '<span class="glyphicon glyphicon-info-sign"></span></button>';
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
                var po = results[0];
                $('#showPODetailsModal').modal('toggle');
                $('#showPOVendor').text(po.vendor);
                $('#showPOName').text(po.name);
                $('#showPOAcct').text(po.account);
                $('#showPOEntryType').val(po.entrytype); 
                $('#showPOOrdered').val(po.ordered);   
                $('#showPOShipped').val(po.shipped); 
                $('#showPOReceived').val(po.received);   
                $('#showPOEta').text(getWebDateFromDBString(po.scheduled));           
                $.ajax({
                    url: "/repos/getLineItemsForPO.php",
                    type: "post",
                    data: {
                        "partorder": id
                    },
                    success: function(results) {
                        $('#showpolineitems tbody').empty();
                        if (results != null && results.length > 0) {
                            for (i = 0; i < results.length; i++) {
                                var item = results[i];
                                var line = '<tr><td>' + item.name +'</td>';
                                line += '<td>' +item.quantity + '</td>';
                                line += '<td>' + getCurrency(item.cost_per_unit) + '</td>';
                                line += '<td class="po_showsubtotal">' + getCurrency(item.cost_per_unit * item.quantity) + '</td></tr>';
                                $('#showpolineitems tbody').append(line);
                            }
                            getDetailTotalForPO();
                        } else {
                            var empty = '<tr><td class="text-center" colspan="4">No items</td></tr>';
                            $('#showpolineitems tbody').append(empty);
                        }
                    }
                })
            }
        }
    })
}

function getShipStat(stat) {
    if (stat == null || stat == "") {
        return " --";
    } return getWebDateFromDBString(stat);
}

function getOnTime(received, eta) {
    if ((received == null || received == "") && getDBDateFromJSDate(new Date()) <  eta) {
        return " --";
    }
    if (received  <= eta) {
        return "YES";
    } else { 
        return "NO";
    }
}

function getTotalForPO() {
    var total = 0.0;
    $('.po_subtotal').each(function() {
        total += parseFloat($(this).text().substring(1));
    });
    return total;
}

function getDetailTotalForPO() {
    var total = 0.0;
    $('.po_showsubtotal').each(function() {
        total += parseFloat($(this).text().substring(1));
    });
    $('#showPOTotal').text(getCurrency(total));
}

function loadDeliveryStats() {
    $.ajax({
        url: "/repos/getVendorDeliveryStats.php",
        dataType: "json",
        success: function(results) {
            $('#vendordelivery').empty();
            var vendors = new Set(results.map(stats => stats.vendor));
            var longest = 0;
            results.forEach(function(delivery) {
                if (delivery.day > longest) longest = delivery.day;
            });
            vendors.forEach(function (vendor) {
                var specific = results.filter(stats => stats.vendor == vendor);
                var size = specific.length - 1;
                var mid = Math.floor(specific.length / 2);
                var high = Math.floor(specific.length * .75);
                var low = Math.floor(specific.length * .25);
                var p75 = Math.floor(specific[high].day);
                var p50 = Math.floor(specific[mid].day);
                var p25 = Math.floor(specific[low].day);
                // var last = specific[size].day;
                var row = vendor + '<div class="progress">';
                row += makeProgressSection(p25, longest, "info");
                row += makeProgressSection(p50, longest, "warning");
                row += makeProgressSection(p75, longest, "danger");
                row += '</div>';
                $('#vendordelivery').append(row);
            }); 
        }
    });
}

function makeProgressSection(sect, last, color) {
    var row = '<div class="progress-bar bg-' + color + '" role="progressbar"';
    row += ' aria-valuenow="' + sect + '" aria-valuemin="0" aria-valuemax="' + last + '" style="width:';
    row += sect / last * 100 + '%">' + sect + '</div>';
    return row;
}

