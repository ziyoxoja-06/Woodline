const todayDay =new Date().getDate()
const todayMonth = (new Date().getMonth())+1
const thisYear = new Date().getFullYear()
const todayDate= `${thisYear}-${todayMonth}-${todayDay}`
const selects=['srok dostavki','v protsesse','готов к следующему','pozitsiya,']
export {
    selects,
    todayDate
}
