let legendsNumbers = [...Array(data.hasLegend.length+1).keys()].slice(1)
function unlockLegends(){
    if (data.upgrades[3].amt.gte(1)) data.hasLegend[0] = true
    if (data.upgrades[4].amt.gte(1)) data.hasLegend[1] = true
    if (data.particles[0].gte(1)) data.hasLegend[2] = true
    if (data.breakpointsUnlocked[0]) data.hasLegend[3] = true
    if (data.hasTheory[19]) data.hasLegend[4] = true
    if (data.particles[0].gte(1e5)) data.hasLegend[5] = true
    if (data.particles[0].gte(1e7)) data.hasLegend[6] = true
    if (data.oddities.gte(1e150)) data.hasLegend[7] = true
}
function changeLegendsTab(i){
    DOM(`${i}Container`).style.display = 'flex'
    if(i!=='legacies') DOM('legaciesContainer').style.display = 'none'
    if(i!=='treasures') DOM('treasuresContainer').style.display = 'none'
}