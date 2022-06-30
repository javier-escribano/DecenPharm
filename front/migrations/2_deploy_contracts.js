const MedChain = artifacts.require('MedChain')
const MedToken = artifacts.require('MedToken')

module.exports = async function(deployer) {
    
    // Deploy MedChain
    await deployer.deploy(MedChain)
    const medchain = await MedChain.deployed()

    // Deploy MedToken
    await deployer.deploy(MedToken)
    const medtoken = await MedToken.deployed()

}