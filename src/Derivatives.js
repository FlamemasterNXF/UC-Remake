let derivNames = ['I','II','III','IV','V']
function calculateDerivCosts(){
    for (let i=0; i<data.derivs.length; i++){
        let derivCostBase = [D(2),D(20),D(4),D(2),D(2)]
        if (i===0)data.derivs[i].amt.gte(1) ? data.derivs[i].c = derivCostBase[i].times(D(1.3).pow(data.derivs[i].b)).floor().div(dreamParticleEffects[1]) : data.derivs[i].c = derivCostBase[i]
        if (i>=1)data.derivs[i].amt.gte(1) ? data.derivs[i].c = derivCostBase[i].times(D(1.3).pow(data.derivs[i].b)).floor() : data.derivs[i].c = derivCostBase[i]
    }
}
const derivUnlockCost = [100, 2e6, 3e9]
function buyDeriv(x){
    let i=x-1
       if (!data.derivs[i].u){
        if (data.oddities.gte(derivUnlockCost[i-1])){
            data.oddities = data.oddities.sub(derivUnlockCost[i-1])
            data.derivs[i].u = true
        }
    }
    else{
        if (i>= 1) {
            if (data.derivs[i-1].b.gte(data.derivs[i].c) && !data.inLost){
                data.derivs[i-1].amt = data.derivs[i-1].amt.sub(data.derivs[i].c)
                data.derivs[i-1].b = data.derivs[i-1].b.sub(data.derivs[i].c)
                data.derivs[i].b = data.derivs[i].b.plus(1)
                data.derivs[i].amt = data.derivs[i].amt.plus(1)
            }
        }
        else{
            if (data.oddities.gte(data.derivs[i].c)){
                if (!data.hasLegend[0]) data.oddities = data.oddities.sub(data.derivs[i].c)
                data.derivs[i].b = data.derivs[i].b.plus(1)
                data.derivs[i].amt = data.derivs[i].amt.plus(1)
            }
        }
    }
}
let derivProductions = [D(100),D(100),D(100),D(100)]
function calculateDerivProductions(){
    derivProductions[0] = D(100).times(upgradeEffects[1])
    derivProductions[1] = D(100).times(upgradeEffects[2])
    derivProductions[2] = D(100).times(theoryEffects[1]).times(theoryEffects[8]).times(upgradeEffects[3])
    derivProductions[3] = D(100).times(theoryEffects[13])
}
function produceDerivs(diff){
    /*for(let i=0; i<data.derivs.length-1; i++){
        data.derivs[i].amt = data.derivs[i].amt.plus(data.derivs[i+1].amt.times(diff).times(100).times(upgradeEffects[i+1]))
    }
     */
    data.derivs[0].amt = data.derivs[0].amt.plus(data.derivs[1].amt.times(diff).times(100).times(lostCycleEffects[0]).times(theoryEffects[12]).times(upgradeEffects[1]))
    data.derivs[1].amt = data.derivs[1].amt.plus(data.derivs[2].amt.times(diff).times(100).times(upgradeEffects[2]))
    data.derivs[2].amt = data.hasTheory[1] ?
        data.derivs[2].amt.plus(data.derivs[3].amt.times(diff).times(100).times(theoryEffects[1]).times(upgradeEffects[3]).times(theoryEffects[14])):
        data.derivs[2].amt.plus(data.derivs[3].amt.times(diff).times(100).times(upgradeEffects[3]))
    data.derivs[3].amt = data.derivs[3].amt.plus(data.derivs[4].amt.times(diff).times(100).times(theoryEffects[13]).times(theoryEffects[14]))
}
function buyMaxDeriv(){
    //credit to gaps
    let derivCostBase = [D(2),D(20),D(4),D(2),D(2)]
    for(let x=0;x<data.derivs.length;x++){
        if(!data.derivs[x].u)continue;
        let scaling = D(1.3)
        let use = (x===0?data.oddities:data.derivs[x-1].b)
        let add = data.oddities.gte(data.derivs[x].c)?1:0
        let max = use.div(derivCostBase[x]).log(scaling).minus(data.derivs[x].b).floor().div(dreamParticleEffects[1]).add(add).max(0)
        if(isNaN(max)||max.eq(0))continue;
        let safe = max.minus(30).max(0)
        let o = max
        max = D(0)
        let ocost
        if (x===0) ocost= D(scaling).pow(data.derivs[x].b.add(o).minus(1)).div(dreamParticleEffects[1]).times(derivCostBase[x])
        else ocost= D(scaling).pow(data.derivs[x].b.add(o).minus(1)).times(derivCostBase[x])
        let cost = D(0)
        for(let i=30-o.min(30).toNumber();i<30;i++){
            max=max.add(1)
            cost=cost.add(ocost.div(scaling**(29-i)).floor())
            if(cost.gt(use)){
                max=max.minus(1)
                cost=cost.minus(ocost.div(scaling**(29-i)))
                break;
            }
        }
        cost=cost.floor()
        max=max.add(safe)
        if(max.lte(0))continue;
        if(x===0){if (!data.hasLegend[0]) data.oddities=data.oddities.minus(cost)}
        else{
            if (!data.inLost){
                data.derivs[x-1].b = data.derivs[x-1].b.minus(cost)
                data.derivs[x-1].amt = data.derivs[x-1].amt.minus(cost)
            }
        }
        if (x===0){
            data.derivs[x].b = data.derivs[x].b.plus(max)
            data.derivs[x].amt = data.derivs[x].amt.plus(max)
        }
        if (x>=1 && !data.inLost){
            data.derivs[x].b = data.derivs[x].b.plus(max)
            data.derivs[x].amt = data.derivs[x].amt.plus(max)
        }
    }
}