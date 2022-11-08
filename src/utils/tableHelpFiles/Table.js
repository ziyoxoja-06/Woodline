const todayDay =new Date().getDate()
const todayMonth = (new Date().getMonth())+1
const thisYear = new Date().getFullYear()
console.log(thisYear)
const selects=['srok dostavki','v protsesse','готов к следующему','pozitsiya,']
export {
    todayDay,
    todayMonth,
    selects,
    thisYear
}
