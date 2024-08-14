//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract myOwn {

	function lessGo(address target) public {
		(bool succ, ) = target.call(abi.encodeWithSignature("attempt()"));
		require(succ, "The transfer was unsuccessful");
	}

}
