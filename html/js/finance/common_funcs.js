function getTransDate(expense) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var trans = new Date(expense.transdate);
    var year = trans.getUTCFullYear();
    var month = trans.getUTCMonth();
    var day = trans.getUTCDay();
    return day + ' ' + months[month] + ' ' + year;
}

// will need to drop this after all pages are converted

function getAmount(expense) {
    const formatter = new Intl.NumberFormat('en-us', {
        style: "currency",
        currency: "USD",
        trailingZeroDisplay: 'stripIfInteger' 
    });
    return formatter.format(expense.amount);
}

