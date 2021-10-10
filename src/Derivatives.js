function calculateCosts(){
    for (let i=0; i<4; i++){
        let derivCostBase = [new Decimal(2),new Decimal(2),new Decimal(2),new Decimal(2)]
        data.derivs[i].b.gte(1)? data.derivs[i].c = derivCostBase[i].times(1.2).pow(data.derivs[i].b) : data.derivs[i].c = derivCostBase[i]
    }
}
function buyDeriv(x){
    let i=x-1
    if (data.oddities.gte(data.derivs[i].c)){
        data.oddities = data.oddities.sub(data.derivs[i].c)
        data.derivs[i].b = data.derivs[i].b.plus(1)
        data.derivs[i].amt = data.derivs[i].amt.plus(1)
    }
}