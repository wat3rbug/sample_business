$(document).ready(function(){
    $('.addcust').on('click', function() {
        addCustomer();
    });

    $('.customerClear').on('click', function() {
        clearCustomerData();
    });
});

function addCustomer() {
    var fname = $('.fname').val();
    var lname = $('.lname').val();
    var add1 = $('.add1').val();
    var add2 = $('.add2').val();
    var city = $('.city').val();
    var states = $('.states').val();
    var zip = $('.zipcode').val();

    $.ajax({
        url: "/repos/addCustomer.php",
        type: "post",
        data: {
            "fname": fname,
            "lname":lname,
            "address1":add1,
            "address2": add2,
            "city": city,
            "state": states,
            "zipcode": zip
        },
        success: function(results) {
            if (results != null && results.length > 0) {
                var cust = results[0];
                $('#customerId').val(cust.id);
                $('#fnameLbl').text(cust['fname']);
                $('#lnameLbl').text(cust['lname']);
                $('#address1Lbl').text(cust['address1']);
                $('#address2Lbl').text(cust['address2']);
                $('#cityLbl').text(cust['city']);
                $('#stateLbl').text(cust['state']);
                $('#zipcodeLbl').text(cust['zipcode']);
            } else {
                clearCustomerData();
            }
        }
    })
}

function clearCustomerData() {
    $.ajax({
        url: "repos/clearCustomer.php",
        type: "post",
        data: {
            "id": $('#customerId').val()
        }
    });
    $('#customerId').val('');
    $('#fnameLbl').text('');
    $('#lnameLbl').text('');
    $('#address1Lbl').text('');
    $('#address2Lbl').text('');
    $('#cityLbl').text('');
    $('#stateLbl').text('');
    $('#zipcodeLbl').text('');
}