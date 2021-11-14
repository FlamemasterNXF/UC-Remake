function increaseOddities(i){
    data.oddities = data.oddities.plus(i)
}
function calculateOddityGain(){
    data.oddityGain =
        data.derivs[0].amt.times(theoryEffects[0]).times(upgradeEffects[0]).times(theoryEffects[2]).times(theoryEffects[7])
}
function mainLoop(){
    let diff = (Date.now()-data.time)/1000
    data.time = Date.now()
    calculateTheoryEffects()
    produceDerivs(diff)
    calculateOddityGain()
    increaseOddities(data.oddityGain.times(diff))
    calculateCosts()
    calculateDerivProductions()
    calculateUpgradeCosts()
    calculateUpgradeEffects()
    automate()
    unlockLegends()
    unlockTab()
    updateHTML()
}
function switchTab(i){
    data.currentTab = i
    let x=i-2
    if (x >= 0) data.hasTab[x] ? data.currentTab=i:data.currentTab=1
    updateHTML()
}
function unlockTab(){
    data.hasTab[0] = data.derivs[3].amt.gte(1)
    data.hasTab[1] = data.upgrades[2].amt.gte(1)
}
document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key === "m") buyMaxDeriv()
}, false);
window.setInterval(function(){
    mainLoop()
}, 10);