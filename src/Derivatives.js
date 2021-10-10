function calculateCosts(){
    for (let i=0; i<4; i++){
        let derivCostBase = [new Decimal(2),new Decimal(20),new Decimal(4),new Decimal(2)]
        data.derivs[i].amt.gte(1) ? data.derivs[i].c = derivCostBase[i].times(new Decimal(1.3).pow(data.derivs[i].b)).floor() : data.derivs[i].c = derivCostBase[i]
    }
}
const derivUnlockCost = [100, 2e6, 1e10]
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
            if (data.derivs[i-1].b.gte(data.derivs[i].c)){
                data.derivs[i-1].amt = data.derivs[i-1].amt.sub(data.derivs[i].c)
                data.derivs[i-1].b = data.derivs[i-1].b.sub(data.derivs[i].c)
                data.derivs[i].b = data.derivs[i].b.plus(1)
                data.derivs[i].amt = data.derivs[i].amt.plus(1)
            }
        }
        else{
            if (data.oddities.gte(data.derivs[i].c)){
                data.oddities = data.oddities.sub(data.derivs[i].c)
                data.derivs[i].b = data.derivs[i].b.plus(1)
                data.derivs[i].amt = data.derivs[i].amt.plus(1)
            }
        }
    }
}
function produceDerivs(){
    for(let i=0; i<data.derivs.length - 1; i++){
        data.derivs[i].amt = data.derivs[i].amt.plus(data.derivs[i+1].amt.div(100))
    }
}
function buyMaxDeriv(){
    //credit to gaps
    let derivCostBase = [new Decimal(2),new Decimal(20),new Decimal(4),new Decimal(2)]
    for(let x=0;x<data.derivs.length;x++){
        let use = (x==0?data.oddities:data.derivs[x-1].b)
        let max = use.div(derivCostBase[x]).log(1.3).minus(data.derivs[x].b).floor().max(0).plus(data.oddities.gte(data.derivs[x].c)?1:0)
        if(isNaN(max)||max.eq(0))continue;
        let safe = max.minus(30).max(0)
        let o = max
        max = new Decimal(0)
        let ocost = new Decimal(1.3).pow(data.derivs[x].b.add(o)).times(derivCostBase[x])
        let cost = new Decimal(0)
        for(let x=30-o.min(30).toNumber();x<30;x++){
            max=max.add(1)
            cost=cost.add(ocost.div(1.3**(30-x)))
            if(cost.gte(use)){
                max=max.minus(1)
                cost=cost.minus(ocost.div(1.3**(30-x)))
                break;
            }
        }
        cost=cost.floor()
        max=max.add(safe)
        if(x==0)data.oddities=data.oddities.minus(cost)
        else{
            data.derivs[x-1].b = data.derivs[x-1].b.minus(cost)
            data.derivs[x-1].amt = data.derivs[x-1].amt.minus(cost)
        }
        data.derivs[x].b = data.derivs[x].b.plus(max)
        data.derivs[x].amt = data.derivs[x].amt.plus(max)
    }
}