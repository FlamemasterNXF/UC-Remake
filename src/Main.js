function increaseOddities(i){
    data.oddities = data.oddities.plus(i)
}
function mainLoop(){
    data.oddityGain = data.derivs[0].amt
    increaseOddities(data.oddityGain.div(100))
    produceDerivs()
    calculateCosts()
    calculateResetGain()
    updateHTML()
}
function switchTab(i){
    data.currentTab = i
    updateHTML()
}
document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key === "m") buyMaxDeriv()
}, false);
window.setInterval(function(){
    mainLoop()
}, 10);