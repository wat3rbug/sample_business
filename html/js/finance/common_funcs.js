
const CREDIT = 0;
const DEBIT = 1;
function getTransDate(expense) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var trans = new Date(expense.transdate);
    var year = trans.getUTCFullYear();
    var month = trans.getUTCMonth();
    var day = trans.getUTCDay();
    return day + ' ' + months[month] + ' ' + year;
}

function getCredit(equity, formatter) {
    if (equity.entrytype == CREDIT) {
        return formatter.format(equity.amount);
    } else return ' --';
}

function getDebit(equity, formatter) {
    if (equity.entrytype == DEBIT) {
        return formatter.format(equity.amount);
    } else return ' --';
}


