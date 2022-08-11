const D = x => new Decimal(x)
const VERSION = '0.0.20'
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
        invertedTheoryLevels: Array(5).fill(D(0)),
        //misc
        settingsToggles: [true, true, true,], //changelog, animation, offline time
        autoToggled: Array(3).fill(false),
        hasLegend: Array(8).fill(false),
        hasTab: Array(8).fill(false),
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
    try{
        window.localStorage.setItem('ucRemakeSave', JSON.stringify(data))
    }
    catch (e) {
        createAlert('Error', `Save failed.\n${e}`, 'Dang.');
        console.error(e);
    }
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
    try {
        save()
        let exportedData = btoa(JSON.stringify(data))
        const exportedDataText = document.createElement("textarea");
        exportedDataText.value = exportedData;
        document.body.appendChild(exportedDataText);
        exportedDataText.select();
        exportedDataText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        document.body.removeChild(exportedDataText);
        createAlert('Export Successful', 'Your Data has been copied to the clipboard!', 'Thanks!')
    }
    catch (e){
        createAlert('Error', `Save export failed.\n${e}`, 'Dang.');
        console.error(e);
    }
}
async function downloadSave() {
    try {
        const file = new Blob([btoa(JSON.stringify(data))], {type: "text/plain"});
        window.URL = window.URL || window.webkitURL;
        const a = document.createElement("a")
        let date = new Date()
        date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
        a.href = window.URL.createObjectURL(file)
        a.download = `UC-Remake-save-${VERSION}-${date}.txt`
        a.click()
        createAlert("Success!", 'Your save has been successfully downloaded!', 'Thanks!');
    } catch (e) {
        createAlert('Error', `Save download failed.\n${e}`, 'Dang.');
        console.error(e);
        closeModal(1)
    }
}
function beginImport(){
    createPrompt('Import Savedata', 0)
}
function importSave() {
    try {
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
    catch (e){
        createAlert('Error', `Save import failed.\n${e}`, 'Dang.');
        console.error(e);
    }
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

