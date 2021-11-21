//current effect index: index[0] = Legend 2
let legendEffects = [D(1)]

let legendsNumbers = ['1','2']
function unlockLegends(){
    if (data.upgrades[4].amt.gte(1)) data.hasLegend[0] = true
    if (data.lostCompletions[1].gte(1)) data.hasLegend[1] = true
}
function calculateLegendEffects(){
    legendEffects[0]=data.lostCompletions[1].gte(1)?data.inAnyLost?
        D(1).plus(totalLostCompletions).pow(totalLostCompletions.div(10).plus(1))
        :D(1).plus(totalLostCompletions):D(1)
}