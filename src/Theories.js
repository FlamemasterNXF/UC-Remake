let theoryCosts =  [D(1.25e14), D(2e15), D(1e17), D(1e21), D(2e23), D(1e27), D(1e29), D(1e30), D(1e32), D(1e36)]
let theoryEffects = [D(1), D(1), D(1), D(1), D(1), D(1), D(1), D(1), D(1), D(1), D(1)]
let theoryNumbers = ['1','2','3','4','5','6','7','8','9','10']
function calculateTheoryEffects(){
    theoryEffects[0] = data.hasTheory[0] ? data.derivs[3].b.gte(1) ? D(data.derivs[3].b.plus(1)) : D(1) : D(1)
    theoryEffects[1] = data.hasTheory[1] ? data.derivs[0].b.gte(1) ? D(data.derivs[0].b.div(2).plus(1)) : D(1) : D(1)
    theoryEffects[2] = data.hasTheory[2] ? data.derivs[0].b.gte(1) ? D(data.derivs[0].b.sqrt().plus(1)) : D(1) : D(1)
    theoryEffects[3] = data.hasTheory[3] ? data.derivs[0].b.gte(1) ? D(data.derivs[0].b.sqrt().sqrt().plus(1)) : D(1) : D(1)
    theoryEffects[4] = data.hasTheory[4] ? data.derivs[3].b.gte(1) ? D(data.derivs[3].b.plus(10)) : D(1) : D(1)
    theoryEffects[5] = data.hasTheory[5] ? data.derivs[3].b.gte(1) ? D(data.upgrades[0].amt.plus(data.upgrades[1].amt).plus(data.upgrades[2].amt).plus(data.upgrades[3].amt)).sqrt() : D(1) : D(1)
    theoryEffects[6] = data.hasTheory[6] ? data.derivs[0].b.gte(1) ? D(data.derivs[0].b.sqrt().plus(1)) : D(1) : D(1)
    theoryEffects[7] = data.hasTheory[7] ? data.derivs[0].b.gte(1) ? D(data.derivs[0].b.sqrt().plus(1)) : D(1) : D(1)
    theoryEffects[8] = data.hasTheory[8] ? data.derivs[3].b.gte(1) && data.upgrades[4].amt.gte(1)
        ? D(data.upgrades[4].amt).plus(data.derivs[3].b) : D(1) : D(1)
    theoryEffects[9] = data.hasTheory[9] ? data.oddities.gte(10) ? D(data.oddities.log2().plus(1)) : D(1) : D(1)
}
function buyTheory(x){
    let i=x-1
    if (data.oddities.gte(theoryCosts[i]) && !data.hasTheory[i]){
        data.hasTheory[i] = true
        data.oddities = data.oddities.sub(theoryCosts[i])
    }
}