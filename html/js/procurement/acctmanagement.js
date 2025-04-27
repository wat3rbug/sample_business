$(document).ready(function() {

    $('#cancelEditAccountBtn').on('click', function() {
        $('#editAccountModal').modal('toggle');
    });

    $('#cancelAddAccountBtn').on('click', function() {
        $('#addAccountModal').modal('toggle');
    });

    $('.addAccount').on('click', function() {
        $('#addAccountModal').modal('show');
    });

    buildAccountTables();
    buildAccountTypeDropDowns();
});

function buildAccountTables() {
    $.ajax({
        url: "/repos/getAllAccounts.php",
        dataType: "json",
        success: function(results) {
            if (results != null && results.length > 0) {
                var expenses = results.filter(x => x.accounttype == 'Expenses');
                var revenue = results.filter(x => x.accounttype == 'Revenue');
                var equity = results.filter(x => x.accounttype == 'Owners Equity');
                var assets = results.filter(x => x.accounttype == 'Assets');
                var liabilities = results.filter(x => x.accounttype == 'Liabilities');
                buildExpenseTable(expenses);
                buildRevenueTable(revenue);
                buildEquityTable(equity);
                buildAssetTable(assets);
                buildLiabilityTable(liabilities);
            }
        }
    });
}

function buildAccountTypeDropDowns() {
    $.ajax({ 
        url: "/repos/getAllAccountTypes.php",
        dataType: "json",
        success: function(results) {
            if (results != null && results.length > 0) {
                $('#editAcctType').empty();
                $('#addAcctType').empty();
                for (i = 0; i < results.length; i++) {
                    var acct = results[i];
                    var option = '<option value="' + acct.id + '">' + acct.name;
                    option += '</option>';
                    $('#editAcctType').append(option);
                    $('#addAcctType').append(option);
                }
            }
        }
    });
}

function buildExpenseTable(expenses) {
    $('.expense tbody').empty();
    if (expenses == null || expenses.length == 0) {
        var empty = '<tr><td colspan="2" class="text-center">No Data</td></tr>';
        $('.expense tbody').append(empty);
    }
    for (i = 0; i < expenses.length; i++) {
        var row = buildTableRow(expenses[i]);
        $('.expense tbody').append(row);
    }
}

function buildRevenueTable(revenue) {
    $('.revenue tbody').empty();
    if (revenue == null || revenue.length == 0) {
        var empty = '<tr><td colspan="2" class="text-center">No Data</td></tr>';
        $('.revenue tbody').append(empty);
    }
    for (i = 0; i < revenue.length; i++) {
        var row = buildTableRow(revenue[i]);
        $('.revenue tbody').append(row);
    }
}

function buildEquityTable(equity) {
    $('.equity tbody').empty();
    if (equity == null || equity.length == 0) {
        var empty = '<tr><td colspan="2" class="text-center">No Data</td></tr>';
        $('.equity tbody').append(empty);
    }
    for (i = 0; i < equity.length; i++) {
        var row = buildTableRow(equity[i]);
        $('.equity tbody').append(row);
    }
}

function buildAssetTable(assets) {
    $('.assets tbody').empty();
    if (assets == null || assets.length == 0) {
        var empty = '<tr><td colspan="2" class="text-center">No Data</td></tr>';
        $('.assets tbody').append(empty);
    }
    for (i = 0; i < assets.length; i++) {
        var row = buildTableRow(assets[i]);
        $('.assets tbody').append(row);
    }
}

function buildLiabilityTable(liabilities) {
    $('.liabilities tbody').empty();
    if (liabilities == null || liabilities.length == 0) {
        var empty = '<tr><td colspan="2" class="text-center">No Data</td></tr>';
        $('.liabilities tbody').append(empty);
    }
    for (i = 0; i < liabilities.length; i++) {
        var row = buildTableRow(liabilities[i]);
        $('.liabilities tbody').append(row);
    }
}

function buildTableRow(account) {
    var row = '<tr><td style="width: 65px">' + getActionBtns(account.id) + '</td>';
    row += '<td>' + account.name + '</td></tr>';
    return row;
 }

function getActionBtns(id) {
    return getEditBtn(id) + getDeleteBtn(id);
}

function getEditBtn(id) {
    var btn = '<button class="btn btn-link" onclick="editAccount(' + id;
    btn += ')" title="edit Account" style="border: none; padding:2px">';
    btn += '<span class="glyphicon glyphicon-pencil">';
    btn += '</span></button>';
    return btn;
}

function getDeleteBtn(id) {
    var btn = '<button class="btn btn-link" onclick="deleteAccount(' + id;
    btn += ')" title="delete Account" style="border: none; padding:2px">';
    btn += '<span class="glyphicon glyphicon-remove">';
    btn += '</span></button>';
    return btn;
}

function deleteAccount(id) {
    $.ajax({
        url: "/repos/deleteAccount.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            buildAccountTables();
        }
    })
}

function editAccount(id) {
    $.ajax({
        url: "/repos/getAccountById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            if (results != null && results.length > 0) {
                $('#editAccountModal').modal('toggle');
                var account = results[0];
                $('#editAcctId').val(account.id);
                $('#editAcctName').val(account.name);
                $('#editAcctType').val(account.accttype);
            }
        }
    });
}
function updateAccount() {
    var id = $('#editAcctId').val();
    var name = $('#editAcctName').val();
    var accttype = $('#editAcctType').val();
    $.ajax({
        url: "/repos/updateAccount.php",
        type: "post",
        data: {
            "id": id,
            "name": name,
            "accttype": accttype
        },
        success: function(results) {
            $('#editAccountModal').modal('toggle');
            buildAccountTables();
            clearAcctModals();
        }
    })
}

function clearAcctModals() {
    $('#editAcctName').val('');
    $('#addAcctName').val('');
}

function addAccount() {
    var name = $('#addAcctName').val();
    var accttype = $('#addAcctType').val();
    $.ajax({
        url: "/repos/addAccount.php",
        type: "post",
        data: {
            "name": name,
            "accttype": accttype
        },
        success: function(results) {
            $('#addAccountModal').modal('toggle');
            buildAccountTables();
            clearAcctModals();
        }
    });
}

function addNewAccount() {
    $('#addAccountModal').modal('toggle');
}