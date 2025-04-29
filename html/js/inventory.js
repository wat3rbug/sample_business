$(document).ready(function() {

    buildInventoryTable();
});

function buildInventoryTable() {
    $.ajax({
        url: "/repos/getInventory.php",
        dataType: "json",
        success: function(results) {
            $('.inventory tbody').empty();
            if (results == null || results.length == 0) {
                var row = '<tr><td colspan="4" class="text-center">';
                row += 'No inventory</td></tr>';
                $('.inventory tbody').append(row);
            } else {
                for (i = 0; i < results.length; i++) {
                    var inventory = results[i];
                    var line = '<tr><td style="width: 65px">' + getActionBtns(inventory) + '</td>';
                    line += '<td>' + inventory.name + '</td>';
                    line += '<td>' + getPhoto(inventory) + '</td>';
                    line += '<td>' + inventory.amount + '</td></tr>';
                    $('.inventory tbody').append(line);
                }
            }
        }
    });
}

function getActionBtns(inventory) {
    var btns = getIncreaseBtn(inventory);
    btns += getDecreaseBtn(inventory);
    return btns;
}

function getIncreaseBtn(inventory) {
    var btn = '<button class="btn btn-link" title="Increase Amount" onclick="increaseAmount(';
    btn += inventory.id + ')" style="border:none; padding: 2px">';
    btn+= '<span class="glyphicon glyphicon-arrow-up"></span></button>';
    return btn;
}

function getDecreaseBtn(inventory) {
    var btn = '<button class="btn btn-link" title="Decrease Amount" onclick="decreaseAmount(';
    btn += inventory.id + ')" style="border:none; padding: 2px">';
    btn += '<span class="glyphicon glyphicon-arrow-down"></span></button>';
    return btn;
}

function getPhoto(inventory) {
    if (inventory.photo == null || inventory.photo == "") return "N/A";
    var photo = '<img src="/photos/' + inventory.photo + '"/>';
    return photo;
}

function increaseAmount(id) {
    updateInventory(id, "/repos/increaseInventory.php");
}

function decreaseAmount(id) {
    updateInventory(id, "/repos/decreaseInventory.php");
}

function updateInventory(id, script) {
    $.ajax({
        url: script,
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            buildInventoryTable();
        }
    });
}