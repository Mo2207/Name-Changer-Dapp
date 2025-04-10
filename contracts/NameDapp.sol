
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


    function removeName(uint _index) public {
        require(_index < names.length, "Index is out of bounds");

        for (uint i = _index; i < names.length -1; i++) {
            names[i] = names[i + 1];
        }
        names.pop();
    }
}
