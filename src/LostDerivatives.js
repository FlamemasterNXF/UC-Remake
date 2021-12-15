let derivativeParticleEffect = D(1)
let dreamParticleEffects = [D(1),D(1),D(1)]
let particleGains = [D(0), D(0)]
let ancientParticleGain = D(0)
let lostTheoryCosts = [D(1e3), D(3e4), D(3e5), D(1e6)]
let lostTheory3Effect = D(1)
let lostTheoryNumbers = ['1','2','3','4']
let lostCycleCosts = [D(1e6), D(100)]
let lostCycleCostBase = [D(1e4), D(100)]
let lostCycleEffects = [D(1), D(1)]
let lostCycleNumbers = ['1', '2']
let lostCycleEffectTexts = [`Ancient Particles multiply D1 production`, `Ancient Particles multiply Derivative Particle gain`]
function calculateLostStuff(){
    data.inLost?data.oddities.gt(data.highestOdditiesInLost)?
        ancientParticleGain = data.oddities.sqrt().div(2).div(data.particles[0].plus(1).log10()).plus(1):D(0):D(0)
    particleGains[0] = data.particles[0].gte(1)?data.particles[0].sqrt().sqrt().times(lostCycleEffects[1]):D(0)
    particleGains[1] = data.particles[0].gte(1)?data.particles[0].sqrt().times(derivativeParticleEffect):D(0)
    derivativeParticleEffect = data.particles[1].gte(1)?data.particles[1].sqrt().plus(1):D(1)
    dreamParticleEffects[0] = data.particles[2].gte(1)?data.particles[2].sqrt().plus(1):D(1)
    dreamParticleEffects[1] = data.hasLostTheory[0]?data.particles[2].gte(1)?data.particles[2].log10():D(1):D(1)
    dreamParticleEffects[2] = data.hasLostTheory[1]?data.particles[2].gte(1)?data.particles[2].log2():D(1):D(1)
    for (let i=0;i<data.lostCycleLevels.length;i++){
        lostCycleCosts[i] = lostCycleCostBase[i].times(data.lostCycleLevels[i].plus(1)).times(data.lostCycleLevels[i].div(10).plus(1))
    }
    lostCycleEffects[0] = data.lostCycleLevels[0].gte(1)?data.particles[0].log2().times(data.lostCycleLevels[0]):D(1)
    lostCycleEffects[1] = data.lostCycleLevels[1].gte(1)?data.particles[0].log2().sqrt().sqrt().times(data.lostCycleLevels[1].times(data.particles[0].ln().sqrt())):D(1)
    lostTheory3Effect = data.hasLostTheory[2]?data.lostCycleLevels[1].plus(data.lostCycleLevels[0]).div(2):D(1)
}
function gainParticles(diff){
    data.particles[1] = data.particles[1].plus(particleGains[0].times(diff))
    data.particles[2] = data.particles[2].plus(particleGains[1].times(diff))
}
function buyLostTheory(x){
    let i=x-1
    if (x===4 && data.particles[0].gte(lostTheoryCosts[3])){
        data.particles[0] = data.particles[0].sub(lostTheoryCosts[3])
        data.hasLostTheory[3] = true
        data.derivs[4].u = true
    }
    if (x!==4&&data.particles[1].gte(lostTheoryCosts[i])&&!data.hasLostTheory[i]){
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
    data.inLost = !data.inLost
}
function lostReset(){
    data.autoToggled = false
    data.oddities=D(2)
    for (let i=0;i<data.derivs.length;i++){
        data.derivs[i].b = D(0)
        data.derivs[i].amt = D(0)
    }
    for (let i=0;i<data.upgrades.length;i++){
        data.upgrades[i].amt = D(0)
    }
}
