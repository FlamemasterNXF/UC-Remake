function buyUpgrade(x){
    let i = x-1
    if (data.oddities.gte(data.upgrades[i].c)){
        data.oddities = data.oddities.sub(data.upgrades[i].c)
        data.upgrades[i].c = data.upgrades[i].c.times(2)
        data.upgrades[i].amt = data.upgrades[i].amt.plus(1)
    }
}
function buyUpgrade5(){
    if (data.upgrades[0].amt.plus(data.upgrades[1].amt).plus(data.upgrades[2].amt).plus(data.upgrades[3].amt).gte(data.upgrades[4].c)){
        data.upgrades[4].c = data.upgrades[4].c.times(1.5).floor()
        data.upgrades[4].amt = data.upgrades[4].amt.plus(1)
    }
}