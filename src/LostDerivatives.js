let derivativeParticleEffect = D(1)
let dreamParticleEffects = [D(1),D(1),D(1)]
let particleGains = [D(0), D(0)]
let ancientParticleGain = D(0)
function calculateLostStuf(){

}
function lostControl(){
    if (data.inLost) data.highestOdditiesInLost = data.oddities
    lostReset()
    data.inLost = !data.inLost
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