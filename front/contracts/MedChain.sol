// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./MedToken.sol";

contract MedChain is MedToken{

    event Added(uint indexed index);

    enum State {
        Manufactured,
        DeliveredByManufacturer,
        ReceivedByDistributor,
        DeliveredByDistributor,
        ReceivedByPharmacy,
        Sold
    }

    struct Agent {
        string agent_type;
        address addr;
        string name;
        string last_name;
        string latitude;
        string longitud;
    }

    struct Medicine {
        address manufacturer;
        string name;
        string description;
        uint tokenID;
        uint manufacturing_date;
        string tokenURI;
        uint statesCount;
        uint datesCount;
        uint agentsCount;
        uint coordenatesCount;
        State[] states;
        uint[] dates;
        string[] coordenates;
        Agent[] agents;
    }

    uint public totalMedicines = 0;
    mapping(uint => Medicine) public medicines;
    mapping(address => Agent) public agentsHash;


    function concat(string memory a, string memory b) internal pure returns (string memory) {
        string memory result = string(abi.encodePacked('[',a,',',b,']'));
        return result;
    }

    function AddState(uint _tokenID, State _state) public {
        require(_tokenID > 0, "Token ID must be valid");
        uint count = 0;
        uint countStates = 0;

        for (uint i = 0; i < medicines[_tokenID].agents.length; i++) {
            if (medicines[_tokenID].agents[i].addr == msg.sender)
                count ++;   
        }

        for (uint j = 0; j < medicines[_tokenID].states.length; j++) {
            if (medicines[_tokenID].states[j] == _state) {
                countStates ++;
            }
        }

        if (countStates == 0) {
            medicines[_tokenID].states.push(_state);
            medicines[_tokenID].statesCount ++;
            medicines[_tokenID].dates.push(block.timestamp);
            medicines[_tokenID].datesCount ++;
        }

        if (count == 0) {
            medicines[_tokenID].agents.push(agentsHash[msg.sender]);
            medicines[_tokenID].agentsCount ++;
            medicines[_tokenID].coordenates.push(concat(agentsHash[msg.sender].latitude,agentsHash[msg.sender].longitud));
            medicines[_tokenID].coordenatesCount ++;
        }
    }


    function AddWorker(Agent memory _agent) public {
        agentsHash[_agent.addr] = _agent;
    }

    function AddMedicine(string memory _name, string memory _description, string memory _tokenURI) public {
        uint token = CreateCollectible(msg.sender,_tokenURI);
        Medicine storage newMed = medicines[token];

        newMed.manufacturer = msg.sender;
        newMed.name = _name;
        newMed.description = _description;
        newMed.tokenID = token;
        newMed.manufacturing_date = block.timestamp;
        newMed.tokenURI = _tokenURI;
        newMed.statesCount = 1;
        newMed.states.push(State.Manufactured);
        newMed.datesCount = 1;
        newMed.dates.push(newMed.manufacturing_date);
        newMed.coordenates.push(concat(agentsHash[msg.sender].latitude,agentsHash[msg.sender].longitud));
        newMed.coordenatesCount = 1;
        newMed.agents.push(agentsHash[msg.sender]);
        newMed.agentsCount = 1;

        totalMedicines ++;
        emit Added(token);
    }
    
    function GetRestMedicine(uint _tokenID) public view returns (State[] memory, uint[] memory, string[] memory, Agent[] memory) {
        require(_tokenID > 0, "TokenID must be valid");
        return (medicines[_tokenID].states, medicines[_tokenID].dates, medicines[_tokenID].coordenates, medicines[_tokenID].agents);
    }

}
