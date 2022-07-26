let legendsNumbers = ['1','2']
function unlockLegends(){
    if (data.upgrades[4].amt.gte(1)) data.hasLegend[0] = true
    if (data.particles[0].gte(1)) data.hasLegend[1] = true
}