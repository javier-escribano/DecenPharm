const Web3 = require('web3')
const MedChain = artifacts.require('MedChain')
const truffleAssert = require('truffle-assertions')
const web3 = new Web3('http://127.0.0.1:7545')
const chai = require('chai')
const assert = require('assert')

contract('MedChain Tests', function(accounts) {

    it("Should add a worker successfully", async () => {
        const medchain = await MedChain.new()

        await medchain.contract.methods.AddWorker([
        "manufacturer",
        accounts[0],
        "Manuel",
        "González",
        "48.432432",
        "-8.43252",
        ])
        .send({ from: accounts[0], gas: 200000 })

        x = await medchain.contract.methods.agentsHash(accounts[0]).call({ from: accounts[0] })

        agentAddr = x.addr
        assert.equal(agentAddr, accounts[0], "New worker has not been added correctly")
        chai.expect(agentAddr).to.be.not.undefined
        chai.expect(agentAddr).to.be.not.null
        chai.expect(agentAddr).to.be.not.NaN
        chai.expect(agentAddr).to.be.a('string')
        chai.expect(agentAddr).to.have.lengthOf(42)

    })

    it("Should add a medicine successfully", async () => {
        const medchain = await MedChain.new()

        await medchain.contract.methods.AddMedicine("Ibuprofeno", "Medicine based on inflammations", "")
        .send({ from: accounts[0], gas: 800000 })

        x = await medchain.contract.methods.medicines(1).call({ from: accounts[0] })
        y = await medchain.contract.methods.GetRestMedicine(1).call({ from: accounts[0] })
        nameMed = x.name

        assert.equal(nameMed, "Ibuprofeno", "New medicine has not been added correctly")
        assert.equal(x.manufacturer, accounts[0], "Incorrect address")
        assert.equal(x.tokenID, 1, "Incorrect tokenID")
        assert.equal(x.statesCount, 1, "Incorrect number of states")
        assert.equal(x.datesCount, 1, "Incorrect number of dates")
        assert.equal(x.agentsCount, 1, "Incorrect number of agents")
        assert.equal(x.coordenatesCount, 1, "Incorrect number of coordenates")
        chai.expect(nameMed).to.be.not.undefined
        chai.expect(nameMed).to.be.not.null
        chai.expect(nameMed).to.be.not.NaN
        chai.expect(nameMed).to.be.a('string')
        chai.expect(nameMed).to.be.lengthOf(10)
        chai.expect(x.description).to.be.not.undefined
        chai.expect(x.description).to.be.not.null
        chai.expect(x.description).to.be.not.NaN
        chai.expect(x.description).to.be.a('string')
        chai.expect(x.description).to.be.lengthOf(31)
        chai.expect(x.tokenURI).to.be.lengthOf(0)
        chai.expect(x.tokenURI).to.be.not.undefined
        chai.expect(x.tokenURI).to.be.not.null
        chai.expect(x.tokenURI).to.be.not.NaN
        chai.expect(x.tokenURI).to.be.a('string')
        chai.assert.oneOf('0',y[0], "Not found in list")
    })

    it("Should add a new state to a medicine", async () => {
        const medchain = await MedChain.new()

        await medchain.contract.methods.AddMedicine("Ibuprofeno", "Medicine based on inflammations", "")
        .send({ from: accounts[0], gas: 800000 })

        await medchain.contract.methods
        .AddState(1, 1)
        .send({ from: accounts[0], gas: 600000 })

        x = await medchain.contract.methods.medicines(1).call({ from: accounts[0] })
        y = await medchain.contract.methods.GetRestMedicine(1).call({ from: accounts[0] })
        countStates = x.statesCount

        assert.equal(2, countStates, "New state has not been added correctly")
        chai.expect(x.datesCount).to.be.equal('2')
        chai.expect(x.agentsCount).to.be.equal('2')
        chai.expect(x.coordenatesCount).to.be.equal('2')
        chai.expect(x.statesCount).to.be.a('string')
        chai.expect(x.datesCount).to.be.a('string')
        chai.expect(x.coordenatesCount).to.be.a('string')
        chai.expect(x.agentsCount).to.be.a('string')
        chai.assert.oneOf('1',y[0], "Not found in list")
        chai.assert.oneOf('0',y[0], "Not found in list")
    })

    it("Should not add a new state if it is already added", async () => {
        const medchain = await MedChain.new()

        await medchain.contract.methods.AddMedicine("Ibuprofeno", "Medicine based on inflammations", "")
        .send({ from: accounts[0], gas: 800000 })

        await medchain.contract.methods
        .AddState(1, 1)
        .send({ from: accounts[0], gas: 600000 })

        await medchain.contract.methods
        .AddState(1, 1)
        .send({ from: accounts[0], gas: 600000 })

        x = await medchain.contract.methods.medicines(1).call({ from: accounts[0] })
        y = await medchain.contract.methods.GetRestMedicine(1).call({ from: accounts[0] })
        countStates = x.statesCount

        assert.equal(2, countStates, "New state has been added incorrectly")
        chai.expect(x.datesCount).to.be.equal('2')
        chai.expect(x.agentsCount).to.be.equal('3')
        chai.expect(x.coordenatesCount).to.be.equal('3')
        chai.expect(x.statesCount).to.be.a('string')
        chai.expect(x.datesCount).to.be.a('string')
        chai.expect(x.coordenatesCount).to.be.a('string')
        chai.expect(x.agentsCount).to.be.a('string')
        chai.assert.oneOf('1',y[0], "Not found in list")
        chai.assert.oneOf('0',y[0], "Not found in list")
    })

    it("Should not add new coordenates or agent data if information is already added, but add new state", async () => {
        const medchain = await MedChain.new()

        await medchain.contract.methods.AddWorker([
            "manufacturer",
            accounts[0],
            "Manuel",
            "González",
            "48.432432",
            "-8.43252",
            ])
            .send({ from: accounts[0], gas: 200000 })

        await medchain.contract.methods.AddWorker([
            "distributor",
            accounts[1],
            "Jorge",
            "Escribano",
            "48.432432",
            "-8.43252",
            ])
            .send({ from: accounts[0], gas: 200000 })

        await medchain.contract.methods.AddMedicine("Ibuprofeno", "Medicine based on inflammations", "")
        .send({ from: accounts[0], gas: 800000 })

        await medchain.contract.methods
        .AddState(1, 1)
        .send({ from: accounts[0], gas: 600000 })

        await medchain.contract.methods
        .AddState(1, 2)
        .send({ from: accounts[1], gas: 600000 })

        await medchain.contract.methods
        .AddState(1, 3)
        .send({ from: accounts[1], gas: 600000 })

        x = await medchain.contract.methods.medicines(1).call({ from: accounts[0] })
        y = await medchain.contract.methods.GetRestMedicine(1).call({ from: accounts[0] })
        agentsTest = x.agentsCount
        coordTest = x.coordenatesCount

        assert.equal(2, agentsTest, "Same agent has been added incorrectly")
        assert.equal(2,coordTest,"Same coordenates have been added incorreclty")
        chai.expect(x.datesCount).to.be.equal('4')
        chai.expect(x.statesCount).to.be.equal('4')
        chai.assert.oneOf('1',y[0], "Not found in list")
        chai.assert.oneOf('0',y[0], "Not found in list")
        chai.assert.oneOf('2',y[0], "Not found in list")
        chai.assert.oneOf('3',y[0], "Not found in list")
        chai.expect(x.statesCount).to.be.a('string')
        chai.expect(x.datesCount).to.be.a('string')
    })

    it("Should not add new state if tokenID is < 1", async () => {
        const medchain = await MedChain.new()

        await truffleAssert.reverts(medchain.contract.methods
            .AddState(0,1).send({ from: accounts[0], gas: 600000 }), "Token ID must be valid")

    })

    it("Should not get information from a non existing medicine", async () => {
        const medchain = await MedChain.new()

        await truffleAssert.reverts(medchain.contract.methods
            .GetRestMedicine(0).call({ from: accounts[0] }))
    })
})