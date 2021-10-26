let highExponentGain = new Decimal(0)
let exponentMultiplier = new Decimal(0)
const eDerivUnlockCost = [1e96, 1e96]
function exponentReset(){
    if (data.derivs[3].amt.gte(1)){
        data.oddities = new Decimal(2)
        for (let i=0; i<data.derivs.length; i++){
            data.derivs[i].b = new Decimal(0)
            data.derivs[i].amt = new Decimal(0)
            i!==0 ? data.derivs[i].u = false : data.derivs[i].u = true
        }
        data.highExponents = data.highExponents.plus(highExponentGain)
        data.exponents = data.exponents.plus(highExponentGain)
    }
}
function calculateExponentStuff(){
    //gain
    data.oddities.sqrt().sqrt().gte(1) ? highExponentGain = data.oddities.sqrt().sqrt() : highExponentGain = new Decimal(0)
    //multi
    data.exponents.gte(1) && data.highExponents.gte(1) ?
        exponentMultiplier = data.exponents.sqrt().sqrt().plus(data.highExponents.sqrt()) : exponentMultiplier = new Decimal(1)
    //derivs
    calculateEDerivCosts()
}
function buyExponentDeriv(x){
    let i=x-1
    if (!data.exponentsDeriv[i].u){
        if (data.derivs[3].amt.gte(eDerivUnlockCost[i-1])){
            data.derivs[3].amt = data.derivs[3].amt.sub(eDerivUnlockCost[i-1])
            data.derivs[3].b = data.derivs[3].b.sub(eDerivUnlockCost[i-1])
            data.exponentsDeriv[i].u = true
        }
    }
    else{
        if (i>0) {
            if (data.exponentsDeriv[i-1].b.gte(data.exponentsDeriv[i].c)){
                data.exponentsDeriv[i-1].amt = data.exponentsDeriv[i-1].amt.sub(data.exponentsDeriv[i].c)
                data.exponentsDeriv[i-1].b = data.exponentsDeriv[i-1].b.sub(data.exponentsDeriv[i].c)
                data.exponentsDeriv[i].b = data.exponentsDeriv[i].b.plus(1)
                data.exponentsDeriv[i].amt = data.exponentsDeriv[i].amt.plus(1)
            }
        }
        else{
            if (data.derivs[3].b.gte(data.exponentsDeriv[i].c)){
                data.derivs[3].b = data.derivs[3].b.sub(data.exponentsDeriv[i].c)
                data.derivs[3].amt = data.derivs[3].amt.sub(data.exponentsDeriv[i].c)
                data.exponentsDeriv[i].b = data.exponentsDeriv[i].b.plus(1)
                data.exponentsDeriv[i].amt = data.exponentsDeriv[i].amt.plus(1)
            }
        }
    }
}
function buyMaxEDeriv(){
    //credit to gaps
    let eDerivCostBase = [new Decimal(4),new Decimal(1e96),new Decimal(1e96)]
    for(let x=0;x<data.exponentsDeriv.length;x++){
        if(!data.exponentsDeriv[x].u)continue;
        let use = (x===0?data.derivs[3].b:data.exponentsDeriv[x-1].b)
        let max = use.div(eDerivCostBase[x]).log(1.1).minus(data.exponentsDeriv[x].b).floor().add(data.derivs[3].b.gte(data.exponentsDeriv[x].c.floor())?1:0).max(0)
        if(isNaN(max)||max.eq(0))continue;
        let safe = max.minus(30).max(0)
        let o = max
        max = new Decimal(0)
        let ocost = new Decimal(1.1).pow(data.exponentsDeriv[x].b.add(o).minus(1)).times(eDerivCostBase[x])
        let cost = new Decimal(0)
        for(let x=30-o.min(30).toNumber();x<30;x++){
            max=max.add(1)
            cost=cost.add(ocost.div(1.1**(30-x)))
            if(cost.gte(use)){
                max=max.minus(1)
                cost=cost.minus(ocost.div(1.1**(30-x)))
                break;
            }
        }
        cost=cost.floor()
        max=max.add(safe)
        if(x===0)data.derivs[3].b=data.derivs[3].b.minus(cost)
        if(x===0)data.derivs[3].amt=data.derivs[3].b.minus(cost)
        else{
            data.exponentsDeriv[x-1].b = data.exponentsDeriv[x-1].b.minus(cost)
            data.exponentsDeriv[x-1].amt = data.exponentsDeriv[x-1].amt.minus(cost)
        }
        data.exponentsDeriv[x].b = data.exponentsDeriv[x].b.plus(max)
        data.exponentsDeriv[x].amt = data.exponentsDeriv[x].amt.plus(max)
    }
}
function calculateEDerivCosts(){
    for (let i=0; i<3; i++){
        let eDerivCostBase = [new Decimal(4),new Decimal(1e96),new Decimal(4),new Decimal(1e96)]
        data.exponentsDeriv[i].amt.gte(1) ? data.exponentsDeriv[i].c = eDerivCostBase[i].times(new Decimal(1.1).pow(data.exponentsDeriv[i].b)).floor() : data.exponentsDeriv[i].c = eDerivCostBase[i]
    }
}
function produceEDerivs(diff){
    for(let i=0; i<data.exponentsDeriv.length - 1; i++){
        data.exponentsDeriv[i].amt = data.exponentsDeriv[i].amt.plus(data.exponentsDeriv[i+1].amt.times(diff).div(10))
    }
}
