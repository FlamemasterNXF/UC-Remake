let theoryCosts =  [D(1.25e14), D(2e15), D(1e17), D(1e21), D(2e23), D(4e26), D(1e29), D(1e30), D(5e31),
    D(1e36), D(1e42), D(1e55), D(1e62), D(1e67), D(1e75), D(1e96), D(1e97), D(1e107), D(1.11e111), D(2e114)]
let theoryEffects = Array(20).fill(D(1))
// this line was once a window into hell itself. this comment is here as a monument to all who died fighting the terrible code of this line.
function calculateTheoryEffects(){
    theoryEffects[0] = data.hasTheory[0] ? data.derivs[3].b.gte(1) ? D(data.derivs[3].b.plus(1)) : D(1) : D(1)
    theoryEffects[1] = data.hasTheory[1] ? data.derivs[0].b.gte(1) ? D(data.derivs[0].b.div(2).plus(1)) : D(1) : D(1)
    theoryEffects[2] = data.hasTheory[2] ? data.derivs[0].b.gte(1) ? D(data.derivs[0].b.sqrt().plus(1).plus(CYCLES[3].effect())).div(BREAKPOINTS[3].nerf()): D(1) : D(1)
    theoryEffects[3] = data.hasTheory[3] ? data.derivs[0].b.gte(1) ? D(data.derivs[0].b.sqrt().sqrt().plus(1)) : D(1) : D(1)
    theoryEffects[4] = data.hasTheory[4] ? data.derivs[3].b.gte(1) ? D(data.derivs[3].b.plus(10)) : D(1) : D(1)
    theoryEffects[5] = data.hasTheory[5] ? data.derivs[3].b.gte(1) ? D(data.upgrades[0].amt.plus(data.upgrades[1].amt).plus(data.upgrades[2].amt).plus(data.upgrades[3].amt)).sqrt() : D(1) : D(1)
    theoryEffects[6] = data.hasTheory[6] ? data.derivs[0].b.gte(1) ? D(data.derivs[0].b.sqrt().plus(1)) : D(1) : D(1)
    theoryEffects[7] = theoryEffects[2]
    theoryEffects[8] = data.hasTheory[8] ? data.derivs[3].b.gte(1) && data.upgrades[4].amt.gte(1) ?
        BREAKPOINTS[4].enabled ? D(data.upgrades[4].amt).plus(data.derivs[3].b).plus(data.derivs[2].b) : D(data.upgrades[4].amt).plus(data.derivs[3].b) : D(1) : D(1)
    theoryEffects[9] = data.hasTheory[9] ? data.oddities.gte(10) ? D(data.oddities.log2().plus(1)).times(BREAKPOINTS[3].effect()).clampMin(1) : D(1) : D(1)
    theoryEffects[10] = data.hasTheory[10] ? data.derivs[1].b.gte(1)&&data.derivs[2].b.gte(1) ? D(data.derivs[1].b.plus(data.derivs[2].b)) : D(1) : D(1)
    theoryEffects[11] = data.hasTheory[11] ? data.derivs[4].b.gte(1) ? D(data.derivs[4].b.times(7)) : D(1) : D(1)
    theoryEffects[12] = data.hasTheory[12] ? data.derivs[4].b.gte(1) ? D(data.derivs[4].b.times(20)) : D(1) : D(1)
    theoryEffects[13] = data.hasTheory[13] ? data.derivs[0].b.gte(1) ? D(data.derivs[0].b.pow(data.derivs[4].b.div(2))): D(1) : D(1)
    theoryEffects[14] = data.hasTheory[14] ? data.derivs[4].b.gte(1) ? D(data.derivs[4].b.plus(data.derivs[3].b).plus(data.upgrades[4].amt)): D(1) : D(1)
    theoryEffects[15] = data.hasTheory[15] ? data.derivs[1].b.gte(1) ? (data.derivs[1].b.plus(data.derivs[2].b)).log2(): D(1) : D(1)
    theoryEffects[16] = data.hasTheory[16] ? c().gte(1) ? c().div(5) : D(1) : D(1)
    theoryEffects[17] = data.hasTheory[17] ? l().gte(1) ? c().div(2): D(1) : D(1)
    theoryEffects[18] = data.hasTheory[18] ? l().gte(1) ? (l().sqrt()).clampMin(1): D(1) : D(1)
    theoryEffects[19] = data.hasTheory[19]

    theoryCosts[2] = D(1e17)
    theoryCosts[7] = D(1e30)
}
function buyTheory(i){
    if (data.oddities.gte(theoryCosts[i]) && !data.hasTheory[i]){
        data.hasTheory[i] = true
        data.oddities = data.oddities.sub(theoryCosts[i])
    }
}