//create all the variables in a data object for saving
function getDefaultObject() {
    return {
        //oddities
        oddities: new Decimal(2),
        oddityGain: new Decimal(0),
        //derivatives
        derivs: [{b:new Decimal(0),amt:new Decimal(0),c:new Decimal(2),u:true}, {b:new Decimal(0),amt:new Decimal(0),c:new Decimal(2),u:false}, {b:new Decimal(0),amt:new Decimal(0),c:new Decimal(2),u:false}, {b:new Decimal(0),amt:new Decimal(0),c:new Decimal(2),u:false}],
        exponentsDeriv: [{b:new Decimal(0),amt:new Decimal(0),c:new Decimal(1e4),u:true}, {b:new Decimal(0),amt:new Decimal(0),c:new Decimal(2),u:false}, {b:new Decimal(0),amt:new Decimal(0),c:new Decimal(2),u:false}],
        //exponents
        exponents: new Decimal(0),
        highExponents: new Decimal(0),
        //misc
        time: Date.now(),
        currentTab: 1,
        updateIDs: [0, 0, 0],
    }
}
let data = getDefaultObject()
//saving and loading
function save(){
    window.localStorage.setItem('ucRemakeSave', JSON.stringify(data))
}
function load() {
    let savedata = JSON.parse(window.localStorage.getItem('ucRemakeSave'))
    if (savedata !== undefined) fixSave(data, savedata)
}
//fix saves
function fixSave(main=getDefaultObject(), data) {
    if (typeof data === "object") {
        Object.keys(data).forEach(i => {
            if (main[i] instanceof Decimal) {
                main[i] = new Decimal(data[i]!==null?data[i]:main[i])
            } else if (typeof main[i]  == "object") {
                fixSave(main[i], data[i])
            } else {
                main[i] = data[i]
            }
        })
        return main
    }
    else return getDefaultObject()
}
function fixOldSaves(){
    //fix important things from old versions
}
function exportSave(){
    save()
    let exportedData = btoa(JSON.stringify(data));
    const exportedDataText = document.createElement("textarea");
    exportedDataText.value = exportedData;
    document.body.appendChild(exportedDataText);
    exportedDataText.select();
    exportedDataText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(exportedDataText);
}
function importSave(){
    let importedData = prompt("Paste your save data here!")
    data = Object.assign(getDefaultObject(), JSON.parse(atob(importedData)))
    save()
    location.reload()
}
window.setInterval(function(){
    save()
}, 1000);
window.onload = function (){
    load()
    fixOldSaves()
}
//full reset
function fullReset(){
    exportSave()
    window.localStorage.removeItem('ucRemakeSave')
    location.reload()
}

