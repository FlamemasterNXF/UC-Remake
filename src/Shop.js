let shopUpgradeCosts = [new Decimal(1), new Decimal(1e96)]
function buyShopUpgrade(x){
    let i = x-1
    if (x===1){
        if (data.exponentsDeriv[0].b.gte(shopUpgradeCosts[i])){
            data.exponentsDeriv[0].b = data.exponentsDeriv[0].b.sub(1)
            data.exponentsDeriv[0].amt = data.exponentsDeriv[0].amt.sub(1)
            data.hasShopUpgrade = true
        }
    }
}