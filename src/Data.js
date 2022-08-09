const D = x => new Decimal(x)
const VERSION = '0.0.19'
//create all the variables in a data object for saving
function getDefaultObject() {
    return {
        //oddities
        oddities: D(2),
        oddityGain: D(0),
        entropy: D(1),
        //derivatives
        derivs: [{b:D(0),amt:D(0),c:D(2),u:true}, {b:D(0),amt:D(0),c:D(2),u:false}, {b:D(0),amt:D(0),c:D(2),u:false}, {b:D(0),amt:D(0),c:D(2),u:false}, {b:D(0),amt:D(0),c:D(2),u:false}],
        //upgrades
        upgrades: [{amt:D(0),c:D(2e18)},{amt:D(0),c:D(5e19)},{amt:D(0),c:D(5e20)},{amt:D(0),c:D(6e21)},{amt:D(0),c:D(22)}],
        //theories
        hasTheory: Array(15).fill(false),
        //lost derivs
        inLost: false,
        particles: [D(0), D(0), D(0), D(0)], //Ancient, Derivative, Dream, Best Ancient
        highestOdditiesInLost: D(2),
        hasLostTheory: [false,false,false,],
        lostCycleLevels: Array(4).fill(D(0)),
        //circles
        circleProg: [D(1)],
        cycleLevels: Array(9).fill(D(0)),
        breakpointsUnlocked: Array(4).fill(false),
        breakpointsEnabled: Array(4).fill(false),
        hasSecret: Array(3).fill(false),
        //inversions
        inversions: D(1),
        inversionEnabled: false,
        hasInvertedTheory: Array(3).fill(false),
        //misc
        settingsToggles: [true, true, true,], //changelog, animation, offline time
        autoToggled: Array(3).fill(false),
        hasLegend: Array(8).fill(false),
        hasTab: Array(6).fill(false),
        ticker: false,
        time: Date.now(),
        devSpeed: 1,
        currentTab: 1,
        version: VERSION,
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
    createAlert('Welcome Back!', `You've loaded into UC v${VERSION}\nEnjoy!`, 'Thanks!')
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
    if(data.version !== VERSION){
        createAlert('Welcome Back!', `You've loaded into UC v${VERSION}\nNew things have been added since last time you played!\nEnjoy!`, 'Awesome!')
    }
    data.version = VERSION
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
    createAlert('Export Successful', 'Your Data has been copied to the clipboard!', 'Thanks!')
}
function beginImport(){
    createPrompt('Import Savedata', 0)
}
function importSave() {
    let importedData = DOM('promptInput').value
    if(importedData.length <= 0) {
        DOM('promptContainer').style.display = 'none'
        createAlert('Failure', 'No data found.', `Oops.`)
        return
    }
    if (importedData.toLowerCase() === "ourgwa" || importedData.toLowerCase() === "china") {ourgwatrigger(); DOM('promptContainer').style.display = 'none'}
    if (importedData.toLowerCase() === "5 hours") {
        data.ticker = !data.ticker
        DOM('promptContainer').style.display = 'none'
        DOM('ticker').style.display = data.ticker?'flex':'none'
        if(data.ticker) scrollNextMessage()
    }
    data = Object.assign(getDefaultObject(), JSON.parse(atob(importedData)))
    save()
    location.reload()
}
window.setInterval(function(){
    save()
}, 10000);
//full reset
function beginFullReset(){
    createConfirmation(0, 'Are you sure?', 'Are you absolutely sure you want to do this?\nThis will export your save (just in case) but delete your save from LocalStorage.', 'No Way!', 'Yes, I understand the consequences.')
}
function fullReset(){
    exportSave()
    deleteSave()
}
function deleteSave(){
    window.localStorage.removeItem('ucRemakeSave')
    location.reload()
}

