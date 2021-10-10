function increaseOddities(i){
    data.oddities = data.oddities.plus(i)
}
function mainLoop(){
    data.oddityGain = data.derivs[0].amt
    increaseOddities(data.oddityGain.div(100))
    produceDerivs()
    calculateCosts()
    updateHTML()
}
window.setInterval(function(){
    mainLoop()
}, 10);