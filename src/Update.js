let upgradeEffects = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
function updateHTML(){
    for (let i=0;i<upgradeEffects.length;i++){
        upgradeEffects[i] = new Decimal(data.upgrades[i].amt.plus(1)).times(data.upgrades[4].amt.plus(1))
    }
    //derivs
    document.getElementById("oddityDisplay").innerHTML = `There are ${format(data.oddities)} Oddities [${format(data.oddityGain)}/s]`
    let derivNames = ['I','II','III','IV']
    document.getElementById("derivI").innerHTML = `Cost: ${format(data.derivs[0].c)} Oddities<br>[${format(data.derivs[0].b)}] ${format(data.derivs[0].amt)}<br>Produces ${format(upgradeEffects[0].times(exponentMultiplier))} Oddities [${format(data.oddityGain)}/s]`
    for (let i=1; i<data.derivs.length; i++){
         document.getElementById(`deriv${derivNames[i]}`).innerHTML = data.derivs[i].u ?
            `Cost: ${format(data.derivs[i].c)} Purchased D.${derivNames[i-1]}<br>[${format(data.derivs[i].b)}] ${format(data.derivs[i].amt)}<br>Produces ${formatWhole(new Decimal(100).times(upgradeEffects[i]))} D.${derivNames[i-1]} [${format(data.derivs[i].amt.times(100).times(upgradeEffects[i]))}/s]`
            : `Unlock for ${format(derivUnlockCost[i-1])} Oddities`
    }
    //upgrades
    document.getElementById("upgrade5").innerHTML = `Upgrade ⬥<br>Requires: ${format(data.upgrades[4].c)} Total Upgrade levels (you have ${formatWhole(data.upgrades[0].amt.plus(data.upgrades[1].amt).plus(data.upgrades[2].amt).plus(data.upgrades[3].amt))})<br>Multiplies all upgrade effects by ${formatWhole(data.upgrades[4].amt.plus(1))}x`
    let upgradeNames = ["1", "2", "3", "4"]
    for (let i=0;i<4;i++){
        document.getElementById(`upgrade${upgradeNames[i]}`).innerHTML =
            `Upgrade ${upgradeNames[i]}<br>Cost: ${format(data.upgrades[i].c)} Oddities<br>Current effect: ${formatWhole(upgradeEffects[i])}x (You have ${formatWhole(data.upgrades[i].amt)})`
    }
    //exponents
    document.getElementById("exponentsDisplay").innerHTML = `You have created ${format(data.exponents)} Exponents and ${format(data.highExponents)} High Exponents [+${format(data.exponentsDeriv[0].amt.div(10))} Exponents/s]`
    document.getElementById("exponentEffectDisplay").innerHTML = `Your Exponents and High Exponents multiply the production of your D.Is by ${format(exponentMultiplier)}x`
    document.getElementById("exponentReset").innerHTML =
        `Reset your Derivatives.<br>You'll gain ${format(highExponentGain)} Exponents and ${format(highExponentGain)} High Exponents<br>Requires at least one D.IV`
    let actualEDerivNames = ['I','II','III']
    let eDerivNames = ['X','XI','XII']
    document.getElementById("ederivI").innerHTML = `Cost: ${format(data.exponentsDeriv[0].c)} D.IV<br>[${format(data.exponentsDeriv[0].b)}] ${format(data.exponentsDeriv[0].amt)}<br>Produces 0.1 Exponents [${format(data.exponentsDeriv[0].amt.div(10))}/s]`
    /*
    for (let i=1; i<data.exponentsDeriv.length; i++){
        document.getElementById(`ederiv${actualEDerivNames[i]}`).innerHTML = data.exponentsDeriv[i].u ?
            `Cost: ${format(data.exponentsDeriv[i].c)} Purchased E.D.${eDerivNames[i-1]}<br>[${format(data.exponentsDeriv[i].b)}] ${format(data.exponentsDeriv[i].amt)}<br>Creates 0.1 E.D.${eDerivNames[i-1]}/s [${format(data.exponentsDeriv[i].amt.div(10))}/s]`
            : `Unlock for ${format(eDerivUnlockCost[i-1])} D.IV`
    }
     */
    showAndHideStuff()
}
function showAndHideStuff(){
    //derivs
    let derivStuff = document.getElementById("bigDerivativeContainer")
    let buyMax = document.getElementById("buymaxContainer")
    derivStuff.style.display = data.currentTab===1 ? 'flex' : 'none'
    buyMax.style.display = data.currentTab===1 ? 'flex' : 'none'
    //upgrades
    let upgrades = [document.getElementById("upgrade1"),document.getElementById("upgrade2"),document.getElementById("upgrade3"),document.getElementById("upgrade4"),document.getElementById("upgrade5")]
    upgrades[4].style.display = data.upgrades[3].amt.gte(1) ? 'flex' : 'none'
    //exponents
    let exponentStuff = document.getElementById("exponentDerivContainer")
    exponentStuff.style.display = data.currentTab===2 ? 'flex':'none'
    //settings
    let settingsStuff = document.getElementById("settingsContainer")
    settingsStuff.style.display = data.currentTab===0 ? 'flex':'none'
}