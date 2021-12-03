function calculateLostStuf(){

}
function enterLost(){
    lostReset()
    data.inLost = true
    //lostInDisplay.innerHTML = `${lostNames[i]} Derivative Active!`
}
function exitLost(){
    lostReset()
    data.inLost = false
}
function lostReset(){
    data.autoToggled = false
    data.oddities=D(2)
    for (let i=0;i<data.derivs.length;i++){
        data.derivs[i].b = D(0)
        data.derivs[i].amt = D(0)
    }
    for (let i=0;i<data.upgrades.length;i++){
        data.upgrades[i].amt = D(0)
    }
}