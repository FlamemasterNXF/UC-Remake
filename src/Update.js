function updateHTML(){
    //derivs
    document.getElementById("oddityDisplay").innerHTML = `There are ${format(data.oddities)} Oddities [${format(data.oddityGain)}/s]`
    let derivNames = ['I','II','III','IV']
    let derivTitles = ['Increase','Growth','Expansion','Peak']
    document.getElementById("derivI").innerHTML = `Derivative I: [Increase]<br>Cost: ${format(data.derivs[0].c)} Oddities<br>Creates ${format(new Decimal(1).times(exponentMultiplier))} Oddities every second.<br>You've purchased ${format(data.derivs[0].b)}<br>You have ${format(data.derivs[0].amt)}`
    for (let i=1; i<data.derivs.length; i++){
         document.getElementById(`deriv${derivNames[i]}`).innerHTML = data.derivs[i].u ?
            `Derivative ${derivNames[i]}: [${derivTitles[i]}]<br>Cost: ${format(data.derivs[i].c)} Purchased D.${derivNames[i-1]}<br>Creates 100 D.${derivNames[i-1]}s every second.<br>You've purchased ${format(data.derivs[i].b)}<br>You have ${format(data.derivs[i].amt)}`
            : `Derivative ${derivNames[i]}: [${derivTitles[i]}]<br> Unlock for ${format(derivUnlockCost[i-1])} Oddities`
    }
    //exponents
    document.getElementById("exponentsDisplay").innerHTML = `You have created ${format(data.exponents)} Exponents and ${format(data.highExponents)} High Exponents`
    document.getElementById("exponentEffectDisplay").innerHTML = `Your Exponents and High Exponents multiply the production of your D.Is by ${format(exponentMultiplier)}x`
    document.getElementById("exponentReset").innerHTML =
        `Reset your Derivatives.<br>You'll gain ${format(highExponentGain)} Exponents and ${format(highExponentGain)} High Exponents<br>Requires at least one D.IV`
    showAndHideStuff()
}
function showAndHideStuff(){
    //derivs
    let derivStuff = document.getElementById("derivativeContainer")
    derivStuff.style.display = data.currentTab===1 ? 'flex' : 'none'
    //exponents
    let exponentStuff = document.getElementById("exponentDerivContainer")
    exponentStuff.style.display = data.currentTab===2 ? 'flex':'none'
    //settings
    let settingsStuff = document.getElementById("settingsContainer")
    settingsStuff.style.display = data.currentTab===0 ? 'flex':'none'
}