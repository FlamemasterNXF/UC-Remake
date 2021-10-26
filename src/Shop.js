let shopUpgradeCosts = [new Decimal(1), new Decimal(8), new Decimal(6e20), new Decimal(1e22)]
function buyShopUpgrade(x){
    let i = x-1
    if (x===1){
        if (data.exponentsDeriv[0].b.gte(shopUpgradeCosts[0]) && !data.hasShopUpgrade[0]){
            data.exponentsDeriv[0].b = data.exponentsDeriv[0].b.sub(1)
            data.exponentsDeriv[0].amt = data.exponentsDeriv[0].amt.sub(1)
            data.hasShopUpgrade[0] = true
        }
    }
    if (x===2){
        if (data.upgrades[0].amt.gte(shopUpgradeCosts[1]) && !data.hasShopUpgrade[1]){
            data.hasShopUpgrade[1] = true
        }
    }
    if (x===3){
        if (data.oddities.gte(shopUpgradeCosts[2]) && !data.hasShopUpgrade[2]){
            data.oddities = data.oddities.sub(shopUpgradeCosts[i])
            data.hasShopUpgrade[2] = true
        }
    }
    if (x===4){
        if (data.oddities.gte(shopUpgradeCosts[3]) && !data.hasShopUpgrade[3]){
            data.oddities = data.oddities.sub(shopUpgradeCosts[i])
            data.hasShopUpgrade[3] = true
        }
    }
}