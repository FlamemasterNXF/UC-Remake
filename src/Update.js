function updateHTML(){
    document.getElementById("oddityDisplay").innerHTML = `There are ${format(data.oddities)} Oddities`
    let derivNames = ['I','II','III','IV']
    let derivTitles = ['Increase','Growth','Expansion','Peak']
    document.getElementById("derivI").innerHTML = `Derivative I: [Increase]<br>Cost: ${format(data.derivs[0].c)}<br>Creates 1 Oddity every second.`
    for (let i=1; i<data.derivs.length; i++){
        document.getElementById(`deriv${derivNames[i]}`).innerHTML =
            `Derivative ${derivNames[i]}: [${derivTitles[i]}]<br>Cost: ${format(data.derivs[i].c)}<br>Creates 1 D.${derivNames[i-1]} every second.`
    }
}