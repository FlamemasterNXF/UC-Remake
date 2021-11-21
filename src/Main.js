function increaseOddities(i){
    data.oddities = data.oddities.plus(i)
}
function calculateOddityGain(){
    data.oddityGain = data.inLost[1]?
        data.derivs[0].amt.times(theoryEffects[0]).times(upgradeEffects[0]).times(theoryEffects[2]).times(theoryEffects[7]).times(theoryEffects[9]).times(legendEffects[0]).div(lostEffects[1]):
        data.derivs[0].amt.times(theoryEffects[0]).times(upgradeEffects[0]).times(theoryEffects[2]).times(theoryEffects[7]).times(theoryEffects[9]).times(legendEffects[0])
}
function mainLoop(){
    let diff = (Date.now()-data.time)/1000
    data.time = Date.now()
    calculationsLoop()
    produceDerivs(diff)
    increaseOddities(data.oddityGain.times(diff))
    automate()
    completeLost()
    updateHTML()
}
function calculationsLoop(){
    calculateTheoryEffects()
    calculateOddityGain()
    calculateDerivCosts()
    calculateDerivProductions()
    calculateUpgradeCosts()
    calculateUpgradeEffects()
    calculateLostStuf()
    calculateLegendEffects()
}
function switchTab(i){
    data.currentTab = i
    let x=i-2
    if (x >= 0) data.hasTab[x] ? data.currentTab=i:data.currentTab=1
    tabChangeHTML()
}
document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key === "m") buyMaxDeriv()
}, false);
window.setInterval( () => mainLoop())
