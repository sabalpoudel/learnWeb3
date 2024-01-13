// SPDX-License-Identefier : MIT
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

contract WhiteLsit {
    uint8 public maxWLAddresses;

    mapping(address => bool) public wLAddresses;

    uint8 public numAddressesWL;

    constructor(uint8 _maxWLAddresses) {
        maxWLAddresses = _maxWLAddresses;
    }

    function addAddressesToWL() public {
        require(
            !wLAddresses[msg.sender],
            "Sender has already been whiteListed"
        );
        require(
            numAddressesWL < maxWLAddresses,
            "Limit reached, Adress cannot be added"
        );
        wLAddresses[msg.sender] = true;
        numAddressesWL += 1;
    }
}
