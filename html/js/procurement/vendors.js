$(document).ready(function() {

    fillAllStateDropDowns();
    buildVendorTable();

    $('#addVendor').on('click', function() {
        $('#addVendModal').modal('toggle');
    });

    $('#cancelAddTagBtn').on('click', function() {
        clearTagModal();
    });
});

function buildVendorTable() {
    $.ajax({
        url: "/repos/getVendors.php",
        dataType: "json",
        success: function(results) {
            $("#vendors tbody").empty();
            if (results == null || results.length == 0) {
                var empty = '<tr><td colspan="3" class="text-center">';
                empty += 'No Vendors' + '</td></tr>';
                $('#vendors tbody').append(empty);
            } else {
                for (i = 0; i < results.length; i++) {
                    var vendor = results[i];
                    var line = '<tr><td style="width: 85px border:none; padding: 2px">';
                    line += getActionBtns(vendor) + '</td>';
                    line += '<td>' + vendor.name + '</td>';
                    line += '<td id="tag_' + vendor.id + '" >' +  getTagsByVendor(vendor.id) + '</td></tr>';
                    $('#vendors tbody').append(line);
                }
            }
        }
    });
}

function fillAllStateDropDowns() {
    $.ajax({
        url: "/repos/getAllStates.php",
        dataType: "json",
        success: function(results) {
            if (results != null && results.length > 0) {
                $('#editVendState').append(option); 
                $('#addVendState').append(option);          
                for (i = 0; i < results.length; i++) {
                    var state = results[i];
                    var option = '<option value="' + state.postal_code + '">';
                    option += state.state + '</option>';
                    $('#editVendState').append(option);
                    $('#addVendState').append(option);  
                }
                $('#addVendState').val('TX');  
                $('#editVendState').val('TX');
            }
        }
    });
}

function getActionBtns(vendor, tags) {
    var btns = getAddTagBtn(vendor, tags);
    btns += getEditVendorBtn(vendor);
    btns += getDeleteVendorBtn(vendor);
    return btns;
}

function getEditVendorBtn(vendor) {
    var btn = '<button class="btn btn-link" onclick="editVendor(';
    btn += vendor.id + ')" title="Edit Vendor" style="border:none; padding: 4px">';
    btn += '<span class="glyphicon glyphicon-pencil"></span>';
    btn += '</button>';
    return btn;
}

function getDeleteVendorBtn(vendor) {
    var btn = '<button class="btn btn-link" onclick="deleteVendor(';
    btn += vendor.id + ')" title="Delete Vendor" style="border:none; padding: 4px">';
    btn += '<span class="glyphicon glyphicon-remove"></span>';
    btn += '</button>';
    return btn;
}

function addVendor() {
    var name = $('#addVendName').val();
    var url = $('#addVendUrl').val();
    var address1 = $('#addVendAddress1').val();
    var address2 = $('#addVendAddress2').val();
    var city = $('#addVendCity').val();
    var state = $('#addVendState').val();
    var zipcode = $('#addVendZip').val();

    clearVendModals();

    $.ajax({
        url: "/repos/addVendor.php",
        type: "post",
        data: {
            "name": name,
            "url": url,
            "address1": address1,
            "address2": address2,
            "city": city,
            "state": state,
            "zipcode": zipcode
        },
        success: function(results) {
            $('#addVendModal').modal('toggle');
            buildVendorTable();
        }
    });
}

function editVendor(id) {
    $.ajax({
        url: "/repos/getVendorById.php",
        type: "post",
        data: {
            "vendor": id
        },
        success: function(results) {
            if (results != null && results.length > 0) {
                var vendor = results[0];
                $('#editVendModal').modal('toggle');
                $('#editVendId').val(vendor.id)
                $('#editVendName').val(vendor.name);
                $('#editVendUrl').val(vendor.url);
                $('#editVendAddress1').val(vendor.address1);
                $('#editVendAddress2').val(vendor.address2);
                $('#editVendCity').val(vendor.city);
                $('#editVendState').val(vendor.state);
                $('#editVendZip').val(vendor.zipcode);
            }
        }
    })
}

function updateVendor() {
    var id = $('#editVendId').val();
    var name = $('#editVendName').val();
    var url = $('#editVendUrl').val();
    var address1 = $('#editVendAddress1').val();
    var address2 = $('#editVendAddress2').val();
    var city = $('#editVendCity').val();
    var state = $('#editVendState').val();
    var zipcode = $('#editVendZip').val();

    clearVendModals();

    $.ajax({
        url: "/repos/updateVendor.php",
        type: "post",
        data: {
            "id": id,
            "name": name,
            "url": url,
            "address1": address1,
            "address2": address2,
            "city": city,
            "state": state,
            "zipcode": zipcode
        },
        success: function(results) {
            $('#editVendModal').modal('toggle');
            buildVendorTable();
        }
    });
}

function deleteVendor(id) {
    $.ajax({
        url: "/repos/deleteVendor.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            buildVendorTable();
        }
    });
}

function clearVendModals() {
    $('#addVendName').val('');
    $('#addVendUrl').val('');
    $('#addVendAddress1').val('');
    $('#addVendAddress2').val('');
    $('#addVendCity').val('');
    $('#addVendState').val('');
    $('#addVendZip').val('');

    $('#editVendName').val('');
    $('#editVendUrl').val('');
    $('#editVendAddress1').val('');
    $('#editVendAddress2').val('');
    $('#editVendCity').val('');
    $('#editVendState').val('');
    $('#editVendZip').val('');
}

function loadDeliveryStats() {
    $.ajax({
        url: "repos/getPODeliveryStats.php",
        dataType: "json",
        success: function(results) {
            $('.vendordelivery').empty();
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
                $('.vendordelivery').append(row);
            }); 
        }
    });
}
