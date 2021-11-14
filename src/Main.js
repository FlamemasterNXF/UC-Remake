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
    updateHTML()
}
function switchTab(i){
    data.currentTab = i
    updateHTML()
}
function test(){
    let use = (data.derivs[3].b.plus(1))
    let max = use.div(5).log(1.1).minus(data.exponentsDeriv[0].b).floor().add(data.derivs[3].b.gte(data.exponentsDeriv[0].c)?1:0).max(0)
    console.log(max.mantissa)
}
document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key === "m") buyMaxDeriv()
}, false);
window.setInterval(function(){
    mainLoop()
}, 10);