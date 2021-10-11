let highExponentGain = new Decimal(0)
function exponentReset(){
    if (data.derivs[3].amt.gte(1))
    data.oddities = new Decimal(2)
    for (let i=0; i<data.derivs.length; i++){
        data.derivs[i].b = new Decimal(0)
        data.derivs[i].amt = new Decimal(0)
        i!==0 ? data.derivs[i].u = false : data.derivs[i].u = true
    }
    data.highExponents = data.highExponents.plus(highExponentGain)
    data.exponents = data.exponents.plus(highExponentGain)
}
function calculateResetGain(){
    data.oddities.sqrt().sqrt().gte(1) ? highExponentGain = data.oddities.sqrt().sqrt() : highExponentGain = new Decimal(0)
}
