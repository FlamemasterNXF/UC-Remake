function increaseOddities(i){
    data.oddities = data.oddities.plus(i)
}
function calculateOddityGain(){
    data.oddityGain =
        (data.derivs[0].amt.times(CYCLES[1].effect())).times(theoryEffects[0]).times(upgradeEffects[0]).times(theoryEffects[2]).times(theoryEffects[7])
            .times(lostCycleEffects[0]).times(theoryEffects[9]).times(dreamParticleEffects[0]).times(theoryEffects[10]).times(dreamParticleEffects[2])
            .times(theoryEffects[17]).times(data.maxSuperChargeEffect)
    if(data.inLost){ data.oddityGain = data.oddityGain.times(INVERSIONS.iTheoryEffects()[1]) }
    data.oddityGain = data.inversionInversionControl[1]?data.oddityGain.times(INVERSIONS.inversionEffect()):data.oddityGain.div(INVERSIONS.inversionEffect())
    data.oddityGain = data.oddityGain.div(data.entropy).pow(INVERSIONS.deepInversionEffects()[0])
}
let diff
function mainLoop(){
    diff = data.settingsToggles[2]?(Date.now()-data.time)/1000:getRandom(0.048, 0.053)
    data.offline.time = Math.max(data.offline.time-OFFLINE.boost()*diff,0)
    data.time += diff*OFFLINE.boost
    calculationsLoop()
    gainParticles(diff)
    produceDerivs(diff)
    increaseOddities(data.oddityGain.times(diff))
    ENTROPY.gainEntropy(diff)
    INVERSIONS.gain(diff)
    INVERSIONS.gainDeepInversion()
    automate()
    if(data.hasLegend[5]) for(let i=0;i<data.circleProg.length;i++) progress(i, data.circleProg[i])
    updateHTML()
    data.time = Date.now()
}
function calculationsLoop(){
    calculateTheoryEffects()
    calculateOddityGain()
    calculateDerivCosts()
    calculateDerivProductions()
    calculateUpgradeCosts()
    calculateUpgradeEffects()
    calculateLostStuff()
}
function switchTab(i){
    data.currentTab = i
    if (data.hasTab[i]){ data.currentTab=i }
    else { data.currentTab=1; createAlert('Tab Locked','You must progress further to unlock this tab!', 'Aw...')  }
    tabChangeHTML()
}
document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key === "m") buyMaxDeriv()
    if (key === "u") buyMaxUpgrades()
}, false);
window.setInterval(function(){
    mainLoop()
}, 50);
window.setInterval(function(){
    if (data.settingsToggles[1]) animationsLoop()
}, 20);

window.onload = function (){
    load()
    DOM('ticker').style.display = data.ticker?'flex':'none'
    if(data.hasTab[3]) setupBars(data.circleProg.length-1)
    changeCirclesTab('cycles')
    changeLegendsTab('legacies')
    changeInversionsTab('invertedTheories')
    scrollNextMessage()
}