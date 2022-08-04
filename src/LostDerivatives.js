let derivativeParticleEffect = D(1)
let derivativeParticleEffect2 = D(1)
let dreamParticleEffects = Array(3).fill(D(1))
let particleGains = [D(0), D(0)]
let ancientParticleGain = D(0)
let lostTheoryCosts = [D(1e3), D(3e4), D(3e5)]
let lostTheory3Effect = D(1)
let lostCycleCosts = Array(4).fill(D(1))
let lostCycleCostBase = [D(1e4), D(100), D(1e5), D(1e5)]
let lostCycleEffects = Array(4).fill(D(1))
let lostCycleNumbers = [...Array(5).keys()].slice(1)
let lostCycleEffectTexts = [
    `Ancient Particles multiply D1 production`,
    `Ancient Particles multiply Derivative Particle gain`,
    `Ancient Particles multiply Circle Progress speed`,
    `Ancient Particles multiply Upgrade 1 effect`,
]
function calculateLostStuff(){
    data.inLost?
        ancientParticleGain = (data.oddities.sqrt().div(2).div(data.particles[0].plus(1).log10()).plus(1)).sub(data.particles[3]):D(0)
    let dpGain =  data.particles[0].gte(1)?(data.particles[0].sqrt().sqrt().times(lostCycleEffects[1])).div(BREAKPOINTS[4].nerf()):D(0)
    if(dpGain.gt(1e15))dpGain=dpGain.pow(1/3).mul(1e10)
    particleGains[0] = dpGain
    particleGains[1] = data.particles[0].gte(1)?((data.particles[0].sqrt().times(derivativeParticleEffect).times(CYCLES[8].effect())).div(BREAKPOINTS[1].nerf())).div(BREAKPOINTS[4].nerf()):D(0)
      
    derivativeParticleEffect = data.particles[1].gte(1)?(data.particles[1].sqrt().plus(1)).times(CYCLES[9].effect()):D(1)
    derivativeParticleEffect2 = theoryEffects[19]?data.particles[1].gte(1)?data.particles[1].log2().sqrt().plus(1):D(1):D(1)
    dreamParticleEffects[0] = data.particles[2].gte(1)?(data.particles[2].sqrt().plus(1)).times(CYCLES[5].effect()):D(1)
    dreamParticleEffects[1] = data.hasLostTheory[0]?data.particles[2].gte(1)?(data.particles[2].log10()).times(CYCLES[2].effect()):D(1):D(1)
    dreamParticleEffects[2] = data.hasLostTheory[1]?data.particles[2].gte(1)?(data.particles[2].log2()).times(CYCLES[6].effect()):D(1):D(1)
    lostCycleEffects[0] = data.lostCycleLevels[0].gte(1)?(data.particles[0].log2().times(data.lostCycleLevels[0])).times(CYCLES[7].effect()):D(1)
    lostCycleEffects[1] = data.lostCycleLevels[1].gte(1)?data.particles[0].log2().sqrt().sqrt().times(data.lostCycleLevels[1].times(data.particles[0].ln().sqrt())):D(1)
    lostCycleEffects[2] = data.lostCycleLevels[2].gte(1)?data.particles[0].log2().log10().sqrt().div(3).times(data.lostCycleLevels[2]).clampMin(1):D(1)
    lostCycleEffects[3] = data.lostCycleLevels[3].gte(1)?data.particles[0].log2().log2().sqrt().times(data.lostCycleLevels[3]).clampMin(1):D(1)
    lostTheory3Effect = data.hasLostTheory[2]?data.lostCycleLevels[1].plus(data.lostCycleLevels[0]).div(2):D(1)
    if(ancientParticleGain.lt(0)) ancientParticleGain = D(0)
    calculateLostCycleCosts()
}
function calculateLostCycleCosts(){
    for (let i=0;i<data.lostCycleLevels.length;i++){
        lostCycleCosts[i] = lostCycleCostBase[i].times(data.lostCycleLevels[i].plus(1)).times(data.lostCycleLevels[i].div(10).plus(1))
    }
}
function gainParticles(diff){
    data.particles[1] = data.particles[1].plus(particleGains[0].times(diff))
    data.particles[2] = data.particles[2].plus(particleGains[1].times(diff))
}
function buyLostTheory(x){
    let i=x-1
    if (x>3 && data.particles[0].gte(lostTheoryCosts[i])){
        data.particles[0] = data.particles[0].sub(lostTheoryCosts[i])
        data.hasLostTheory[i] = true
        if(i===3){ setupBars(data.circleProg.length-1) }
        if(i===4){ data.derivs[4].u = true }
    }
    else if (data.particles[1].gte(lostTheoryCosts[i])&&!data.hasLostTheory[i]){
        data.particles[1] = data.particles[1].sub(lostTheoryCosts[i])
        data.hasLostTheory[i] = true
    }
}
function buyLostCycle(x){
    let i=x-1
    if (data.particles[1].gte(lostCycleCosts[i])){
        data.particles[1] = data.particles[1].sub(lostCycleCosts[i])
        data.lostCycleLevels[i] = data.lostCycleLevels[i].plus(1)
    }
}
function lostControl(){
    if (!data.particles[0].gte(1)) data.particles[0] = D(1)
    if (data.inLost) {
        data.highestOdditiesInLost = data.oddities
        data.particles[0] = data.particles[0].plus(ancientParticleGain)
    }
    lostReset()
    if(data.particles[0].gte(data.particles[3])) data.particles[3] = data.particles[0]
    data.inLost = !data.inLost
}
function lostReset(){
    data.autoToggled[0] = false
    data.oddities=D(2)
    for (let i=0;i<data.derivs.length;i++){
        data.derivs[i].b = D(0)
        data.derivs[i].amt = D(0)
    }
    for (let i=0;i<data.upgrades.length;i++){
        data.upgrades[i].amt = D(0)
    }
}
function sumLostCycleCosts(start, end,i){
  return end.mul(end.pow(2).add(end.mul(18)).add(47)).div(30).mul(lostCycleCostBase[i]).sub(start.mul(start.pow(2).add(start.mul(18)).add(47)).div(30).mul(lostCycleCostBase[i]))
}
function buyMaxLostCycles(){
  for(let i=0;i<=3;i++){
    let dp = data.particles[1]
    if(data.autoToggled[2])dp=dp.div(2)//splitting DP between cycles and lost cycles
    if(dp.lte(0))break
    let startLevel = data.lostCycleLevels[i]
dp=dp.div(4-i)// the .div(4-i) is to split DP evenly between the 4 lost cycles
    let b = 0
    let buy=new Decimal(0)
    let decrease = false
    while(b>=0){
      if(sumLostCycleCosts(startLevel,startLevel.add(buy).add(Decimal.pow(2,b)),i).lte(dp)){
        if(decrease){buy=buy.add(Decimal.pow(2,b)) }
        else {buy=Decimal.pow(2,b)}
        if(decrease){b--}
        else{b++}
      }else{
          if(!decrease){              
              buy=Decimal.pow(2,b)
          b--
          }
        decrease=true
        b--
          
      }
    }
    if(!sumLostCycleCosts(startLevel,startLevel.add(buy).add(Decimal.pow(2,b)),i).lte(dp)){buy=buy.sub(1)}
    data.lostCycleLevels[i]=data.lostCycleLevels[i].add(buy.clampMin(0).floor())
    data.particles[1]=data.particles[1].sub(sumLostCycleCosts(startLevel, startLevel.add(buy),i))
  }
}
