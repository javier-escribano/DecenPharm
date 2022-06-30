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

    
    mapping(uint => Medicine) public medicines;
    mapping(address => Agent) public agentsHash;


    function concat(string memory _a, string memory _b) public pure returns (string memory) {
        bytes memory bytes_a = bytes(_a);
        bytes memory bytes_b = bytes(_b);
        string memory length_ab = new string(bytes_a.length + bytes_b.length);
        bytes memory bytes_c = bytes(length_ab);
        uint k = 0;
        for (uint i = 0; i < bytes_a.length; i++) bytes_c[k++] = bytes_a[i];
        for (uint i = 0; i < bytes_b.length; i++) bytes_c[k++] = bytes_b[i];
        return string(bytes_c);
    }

    function AddState(uint _tokenID, State _state) public {
        require(_tokenID > 0, "Token ID must be valid");
        medicines[_tokenID].states.push(_state);
        medicines[_tokenID].statesCount ++;
        medicines[_tokenID].dates.push(block.timestamp);
        medicines[_tokenID].datesCount ++;
        medicines[_tokenID].coordenates.push(concat(agentsHash[msg.sender].latitude,agentsHash[msg.sender].longitud));
        medicines[_tokenID].coordenatesCount ++;
    }


    function AddWorker(Agent memory _agent) public {
        agentsHash[_agent.addr] = _agent;
    }

    function AddMedicine(string memory _tokenURI) public {
        uint token = CreateCollectible(msg.sender,_tokenURI);
        Medicine storage newMed = medicines[token];

        newMed.manufacturer = msg.sender;
        newMed.name = "Ibuprofeno";
        newMed.description = "Cosa que cura";
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
        emit Added(token);
    }
    
    function GetRestMedicine(uint _tokenID) public view returns (State[] memory, uint[] memory, string[] memory, Agent[] memory) {
        return (medicines[_tokenID].states, medicines[_tokenID].dates, medicines[_tokenID].coordenates, medicines[_tokenID].agents);
    }

}
