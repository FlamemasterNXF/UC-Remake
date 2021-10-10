function updateHTML(){
    document.getElementById("oddityDisplay").innerHTML = `There are ${format(data.oddities)} Oddities [${format(data.oddityGain)}/s]`
    let derivNames = ['I','II','III','IV']
    let derivTitles = ['Increase','Growth','Expansion','Peak']
    document.getElementById("derivI").innerHTML = `Derivative I: [Increase]<br>Cost: ${format(data.derivs[0].c)} Oddities<br>Creates 1 Oddity every second.<br>You've purchased ${format(data.derivs[0].b)}<br>You have ${format(data.derivs[0].amt)}`
    for (let i=1; i<data.derivs.length; i++){
         document.getElementById(`deriv${derivNames[i]}`).innerHTML = data.derivs[i].u ?
            `Derivative ${derivNames[i]}: [${derivTitles[i]}]<br>Cost: ${format(data.derivs[i].c)} Purchased D.${derivNames[i-1]}<br>Creates 1 D.${derivNames[i-1]} every second.<br>You've purchased ${format(data.derivs[i].b)}<br>You have ${format(data.derivs[i].amt)}`
            : `Derivative ${derivNames[i]}: [${derivTitles[i]}]<br> Unlock for ${format(derivUnlockCost[i-1])} Oddities`
    }
}