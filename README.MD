# Decentralized Pharmaceuticals
Pharmaceutical supply chains require a large number of actions and resources to track the roducts circulating there. However, the appearance of Blockchain implies a substantial advance in identifying products since it adapts perfectly to the conditions imposed by the sector. Therefore, this Bachelor’s thesis will investigate technologies such as Blockchain to reinforce the mechanisms and guarantee security in the traffic of products throughout the pharmaceutical supply chain. A system will be developed in which users can interact with, facilitating a graphical interface with all the functionalities offered to add, update and view information on both medicines and workers. Moreover, a NFT-based system will store and gather all data from drugs in order to provide integrity and security to the system, assigning an unique identifier to each medicine.

## Goals
- **Grant medicine reliability:** in order to assure the reliability of each drug, there will be an NFT-based verification system that will offer the identifying service. Each medicine will be associated with an unique identifier that can be checked against the Blockchain to grant its authenticity. Additionally, those tokens are not interchangeable, so each identifier will be owned by only one medicine and can never be part of another drug.
- **Path validation:** each medicine will have in its information the followed path in the different processes of the supply chain. Moreover, that information will be recorded in the Smart Contracts hosted in the Blockchain each time a transaction is executed. Therefore the path of each medicine will be recorded in each node of the Blockchain, offering security and non-repudio.
- **Differentiated actions:** each member of the supply chain will have different actions that will act directly on the information of drugs. For instance, distributors will only be able to visualize data about each medicine and add new states of each medicine’s path. Still, they are not allowed to add new drugs to the blockchain, which will be only available to manufacturers.
- **Storage transparency:** data related to drugs and processes around them will always be visible to anyone who wants to interact with the application. Anyone can look at all the transactions executed in the Blockchain and see if the information shown is correct. The application will have methods to make more straightforward these checking actions.
- **Members isolation:** users will not be able to interact with other users directly, as the process is wallet-based, each member will have an unique address that will be part of every transaction executed from that user. If there is the necessity to check any information of an user, the address will be enough to satisfy that purpose.
- **Certify medicine authenticity:** in order to prevent fraud in the chain, each medicine will have the information of the manufacturer that added that drug to the Blockchain. With this action gathered with member isolation, it will be easy to certify the authenticity of the medicine, only checking the address associated with the product.

## Tech
- [React JS] - Front End.
- [Solidity] - Smart Contracts Development.
- [Truffle] - Framework to compile, test and develop Smart Contracts.
- [Ganache] - System to provide with Blockchain Ethereum Testnets.
- [Metamask] - Web wallet used to interact with the Blockchain.

## Usage
All this steps will be done in a Linux system.

First step is to install all the requirements the applications needs.
```sh
cd front
npm i
```

In order to deploy the system, it is needed to have a Ethereum Blockchain (or anyone compatible with EVM) running in the backgorund. So, first Ganache AppImage needs to be executed.
```sh
./ganache.AppImage
```

It is crucial to indicate in front/truffle.config.js and in front/src/Components/useConfiguration.js the address and port used by Gananche. Once that action is done, Smart Contracts have to be compiled and deployed to the network.
```sh
cd front
truffle migrate --reset
```
Lastly, the web page has to be intialized, we will use npm.
```sh
cd front
npm run start
```

This way all the environment will be up and running. However, in order to successfully run the operations is mandatory to add the Google Maps API in front/src/Components/Map/Map.jsx and the Pinata key in /front/src/Hooks/useConfiguration.js



