$(document).ready(function() {


});

function calcPrice() {
    const MATERIAL_ADJUSTMENT = 1.1;
    const POWER_ADJUSTMENT = 1.3;
    
    var cost = parseFloat($('#spoolcost').val());
    var used = parseFloat($('#spoolamount').val());
    var spoolamount = parseFloat($('#spoolsize').val());
    var material = (used / parseFloat(spoolamount)) * cost * MATERIAL_ADJUSTMENT;

    var shipping = parseFloat($('#shippingcost').val());

    var laborrate = parseFloat($('#laborrate').val());
    var laboramount = parseFloat($('#laboramount').val());
    var labor = laboramount * laborrate;

    var printtime = parseFloat($('#printtime').val());
    var power = parseFloat($('#power').val()) * POWER_ADJUSTMENT;
    var powercost = power * printtime;

    var display = getCurrency(material + shipping + labor + powercost);

    $('#Total').val(display);
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