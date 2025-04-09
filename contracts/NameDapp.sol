
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NameDapp {
    string[] public names;

    function addName(string memory _name) public {
        names.push(_name);
    }

    function getAllNames() public view returns (string[] memory) {
        return names;
    }
}
