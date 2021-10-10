function calculateCosts(){
    for (let i=0; i<4; i++){
        let derivCostBase = [new Decimal(2),new Decimal(20),new Decimal(5),new Decimal(4)]
        data.derivs[i].amt.gte(1) ? data.derivs[i].c = derivCostBase[i].times(new Decimal(1.3).pow(data.derivs[i].b)) : data.derivs[i].c = derivCostBase[i]
    }
}
const derivUnlockCost = [100, 1e96, 1e96]
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
        data.derivs[i].amt = data.derivs[i].amt.plus(data.derivs[i+1].amt)
    }
}