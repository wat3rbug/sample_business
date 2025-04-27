$(document).ready(function() {

});

function JSToDatepicker(current) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", 
        "Aug", "Sep", "Oct", "Nov", "Dec"];
    var year = current.getFullYear();
    var month = months[current.getMonth()];
    var day = current.getDate();
    return + day + '-' + month + '-' + year;
}

function JSToDB(current) {
    var year = current.getFullYear();
    var month = current.getMonth() + 1;
    var day = current.getDate();
    return year + '-' + month + '-' + day;
}

function DBToString(current) {
    var selected = new Date(current);
    return JSToDatepicker(selected);
}

