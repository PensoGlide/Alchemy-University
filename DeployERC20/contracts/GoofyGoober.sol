//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GoofyGoober is ERC20 {
    uint constant _initial_supply = 69 * 420 * (10**18);
    uint constant _airdrop_supply = 69 * _initial_supply / 100;    
    uint amountClaimed = 0;

    mapping(address => bool) hasClaimed;

    constructor() ERC20("Madlad", "MLG") {
        _mint(msg.sender, _initial_supply - _airdrop_supply);
    }

    function airdrop() public {
	    require(!hasClaimed[msg.sender], "Not eligible");
    	require(amountClaimed < _airdrop_supply, "All airdrop tokens have been claimed");
        
        uint8 decimal = decimals();
        hasClaimed[msg.sender] = true;
	    _mint(msg.sender, 1 * (10**decimal));
    }
}
