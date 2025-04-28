$(document).ready(function() {

    buildProductsTable();
    getMaterialsDropDowns();

    $('.addProdBtn').on('click', function(){
        $('#addProdModal').modal('toggle');
    });

    $('.cancelAddProductBtn').on('click', function() {
        $('#addProdModal').modal('toggle');
    });

    $('.cancelEditProductBtn').on('click', function() {
        $('#editProdModal').modal('toggle');
    })
});

function updateProduct() {
    var id = $('#editProdId').val();
    var name = $('#editProdName').val();
    var url = $('#editProdUrl').val();
    var photo = $('#editProdPhoto').val();
    var time = $('#editProdTime').val();
    var mat = $('#editProdMat').val();
    var mattype = $('#editProdMatType').val();
    $.ajax({
        url: "/repos/updateProduct.php",
        type: "post",
        data: {
            "id": id,
            "name": name,
            "photo": photo,
            "url": url,
            "buildtime": time,
            "material": mat,
            "materialtype": mattype
        },
        success: function(results) {
            $('#editProdModal').modal('toggle');
            clearProdModals();
            buildProductsTable();
        }
    });
}

function addProduct() {
    var name = $('#addProdName').val();
    var url = $('#addProdUrl').val();
    photo = $('#addProdPhoto').val();
    var time = $('#addProdTime').val();
    var mat = $('#addProdMat').val();
    var mattype = $('#addProdMatType').val();
    $.ajax({
        url: "/repos/addProduct.php",
        type: "post",
        data: {
            "name": name,
            "photo": photo,
            "url": url,
            "material": mat,
            "materialtype": mattype,
            "buildtime": time
        },
        success: function(results) {
            $('#addProdModal').modal('hide');
            clearProdModals();
            buildProductsTable();
        }
    });
}

function clearProdModals() {
    $('#addProdName').val('');
    $('#addProdUrl').val('');
    $('#addProdPhoto').val('');
    $('#addProdTime').val('');
    $('#addProdMat').val('');
    $('#addProMatType').val('');
    $('#editProdId').val('');
    $('#editProdName').val('');
    $('#editProdUrl').val('');
    $('#editProdPhoto').val('');
    $('#editProdTime').val('');
    $('#editProdMat').val('');
    $('#editProMatType').val('');
}

function buildProductsTable() {
    $.ajax({
        url: "/repos/getAllProducts.php",
        dataType: "json",
        success: function(results) {
            $('.products').find('tbody tr').remove();
            if (results == null || results.length == 0) {
                var empty = '<tr><td colspan="7" class="text-center">No Data</td></tr>';
                $('.products tbody').append(empty);
            } else {
                for (i = 0; i < results.length; i++) {
                    var product = results[i];
                    var line = '<tr><td style="width:65px">' + makeActionBtns(product) + '</td>';
                    line += '<td>' + product.name + '</td>';
                    line += '<td>' + makeUrlSection(product.url) + '</td>';
                    line += '<td>' + product.buildtime + ' mins</td>';
                    line += '<td class="text-center">' + product.material + ' g</td>';
                    line += '<td class="text-center">' + product.materialtype + '</td>';
                    line += '<td>' + makePhotoSection(product.photo) + '</td>';
                    $('.products tbody').append(line);
                }
            }
        }
    });
}

function makeUrlSection(url) {
    if (url == null) {
        return 'N/A';
    } else {
        var line = '<a href="' + url + '" title="' + url;
        line += '">' + url + '</a>';
        return line;
    }
}

function makePhotoSection(photo) {
    if (photo == null) {
        return 'N/A';
    } else {
        var line = '<img width="500" height="600" src="' + photo + '">';
        return line;
    }
}

function makeActionBtns(product) {
    var btns = makeEditBtn(product);
    btns += makeDeleteBtn(product);
    return btns;
}

function makeEditBtn(product) {
    var btn = '<button type="button" class="btn btn-link" title="edit ' + product.name + '"';
    btn +=' onclick="editProduct(' + product.id;
    btn += ')" style="border: none; padding: 2px"><span class="glyphicon glyphicon-pencil"></span></button>';
    return btn;
}

function makeDeleteBtn(product) {
    var btn = '<button type="button" class="btn btn-link" title="delete ' + product.name + '"';
    btn += 'onclick="deleteProduct(' + product.id;
    btn += ')" style="border: none; padding: 2px"><span class="glyphicon glyphicon-remove"></span></button>';
    return btn;
}

function editProduct(id) {
    $.ajax({
        url: "/repos/getProductById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            var product = results[0];
            $('#editProdModal').modal('toggle');
            $('#editProdId').val(product.id);
            $('#editProdName').val(product.name);
            $('#editProdUrl').val(product.url);
            $('#editProdPhoto').val(product.photo);
            $('#editProdTime').val(product.buildtime);
            $('#editProdMat').val(product.material);
            $('#editProdMatType').val(product.materialtype);
        }
    });
}

function deleteProduct(id) {
    $.ajax({
        url: "/repos/deleteProduct.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            buildProductsTable();
        }
    });
}

function getMaterialsDropDowns() {
    $.ajax({
        url: "/repos/getMaterials.php",
        dataType: "json",
        success: function(results) {
            $('#addProdMatType').empty();
            $('#editProdMatType').empty();
            if (results != null && results.length > 0) {
                for (i = 0; i < results.length; i++) {
                    var mat = results[i];
                    var option = '<option value="' + mat.id;
                    option += '">' + mat.name + '</option>';
                    $('#addProdMatType').append(option);
                    $('#editProdMatType').append(option);
                }
            } 
        }
    });
}