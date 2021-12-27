const D = x => new Decimal(x)
//create all the variables in a data object for saving
function getDefaultObject() {
    return {
        //oddities
        oddities: D(2),
        oddityGain: D(0),
        //derivatives
        derivs: [{b:D(0),amt:D(0),c:D(2),u:true}, {b:D(0),amt:D(0),c:D(2),u:false}, {b:D(0),amt:D(0),c:D(2),u:false}, {b:D(0),amt:D(0),c:D(2),u:false}, {b:D(0),amt:D(0),c:D(2),u:false}],
        //upgrades
        upgrades: [{amt:D(0),c:D(2e18)},{amt:D(0),c:D(5e19)},{amt:D(0),c:D(5e20)},{amt:D(0),c:D(6e21)},{amt:D(0),c:D(22)}],
        //theories
        hasTheory: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        //lost derivs
        inLost: false,
        particles: [D(0), D(0), D(0)], //Ancient, Derivative, Dream
        highestOdditiesInLost: D(2),
        hasLostTheory: [false,false,false,false],
        lostCycleLevels: [D(0), D(0), D(0)],
        //stairs
        stairsComplete: D(-1),
        currentStair: D(0),
        stairSecretEnergy: [D(1),D(1),D(1),D(1),D(1),D(1),D(1),D(0)],
        //misc
        settingsToggles: [true, true, true], //changelog, animation, stair conf
        autoToggled: [false, false],
        hasLegend: [false, false, false],
        hasTab: [false, false, false, false],
        time: Date.now(),
        currentTab: 1,
        currentUpdate: 'v0.0.15 NEW',
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
    fixOldSaves()
}
//fix saves
function fixSave(main=getDefaultObject(), data) {
    if (typeof data === "object") {
        Object.keys(data).forEach(i => {
            if (main[i] instanceof Decimal) {
                main[i] = D(data[i]!==null?data[i]:main[i])
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
    if (data.currentUpdate==='v0.0.14') data.currentUpdate='v0.0.15'
    if (data.currentUpdate==='v0.0.15'){
        //deleteSave()
    }
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
    if (importedData==="ourgwa") ourgwatrigger()
    data = Object.assign(getDefaultObject(), JSON.parse(atob(importedData)))
    save()
    location.reload()
}
window.setInterval(function(){
    save()
}, 10000);
window.onload = function (){
    load()
}
//full reset
function fullReset(){
    exportSave()
    window.localStorage.removeItem('ucRemakeSave')
    location.reload()
}
function deleteSave(){
    window.localStorage.removeItem('ucRemakeSave')
    location.reload()
}

