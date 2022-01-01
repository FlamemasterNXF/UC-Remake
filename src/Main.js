function increaseOddities(i){
    data.oddities = data.oddities.plus(i)
}
function calculateOddityGain(){
    data.oddityGain =
        data.derivs[0].amt.times(theoryEffects[0]).times(upgradeEffects[0]).times(theoryEffects[2]).times(theoryEffects[7]).times(theoryEffects[9])
            .times(dreamParticleEffects[0]).times(theoryEffects[10]).times(dreamParticleEffects[2]).times(theoryEffects[15]).times(secretEffects[0])
            .pow(stairDebuffs[0]).times(stairEffect)
}
let diff
function mainLoop(){
    diff = data.settingsToggles[3]?(Date.now()-data.time)/1000:getRandom(0.048, 0.053)
    data.time = Date.now()
    calculationsLoop()
    gainParticles(diff)
    produceDerivs(diff)
    increaseOddities(data.oddityGain.times(diff))
    automate()
    completeStairCheck()
    increaseSecretEnergy(diff)
    gainMatter(diff)
    updateHTML()
}
function calculationsLoop(){
    calculateTheoryEffects()
    calculateOddityGain()
    calculateDerivCosts()
    calculateDerivProductions()
    calculateUpgradeCosts()
    calculateUpgradeEffects()
    calculateLostStuff()
    calculateStairStuff()
    calculateSingStuff()
}
function switchTab(i){
    data.currentTab = i
    let x=i-2
    if (x >= 0) data.hasTab[x] ? data.currentTab=i : data.currentTab=1
    i < 4 || !data.settingsToggles[1] ? animationCavnas.style.display = 'none' : animationCavnas.style.display = 'flex'
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