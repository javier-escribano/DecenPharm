// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract MedToken is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenId;

  constructor() ERC721('MedToken', 'MTK') {}

  function CreateCollectible(address manufacturer, string memory tokenURI)
    public
    returns (uint256)
  {
    _tokenId.increment();
    uint256 newItemID = _tokenId.current();
    _safeMint(manufacturer, newItemID);
    _setTokenURI(newItemID, tokenURI);

    return newItemID;
  }
}
