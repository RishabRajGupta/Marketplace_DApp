// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MarketplaceToken {

    // Token information
    string public name = "Marketplace Token";
    string public symbol = "MKT";
    uint8 public decimals = 18;

    // Total token supply
    uint256 public totalSupply = 1000000 * 10**18;

    // Token metadata stored directly
    string public tokenURI = "https://ipfs.io/ipfs/bafkreidx2dimglyft6yatwumfkznt74w7zsaf7dlwdl24ao35t3a5auqk4";

    // Optional: direct image link
    string public imageURI = "https://gateway.pinata.cloud/ipfs/bafkreicjklzpvaid6g6te4tov645phl45z6vxj6cfnoxomujmhm3capuse";

    address public owner;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from,address indexed to,uint256 value);
    event Approval(address indexed owner,address indexed spender,uint256 value);

    constructor() {

        owner = msg.sender;

        // Mint full supply to deployer
        balanceOf[msg.sender] = totalSupply;

        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function transfer(address to,uint256 value) public returns(bool){

        require(balanceOf[msg.sender] >= value,"Insufficient balance");

        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;

        emit Transfer(msg.sender,to,value);

        return true;
    }

    function approve(address spender,uint256 value) public returns(bool){

        allowance[msg.sender][spender] = value;

        emit Approval(msg.sender,spender,value);

        return true;
    }

    function transferFrom(address from,address to,uint256 value) public returns(bool){

        require(balanceOf[from] >= value,"Insufficient balance");
        require(allowance[from][msg.sender] >= value,"Allowance exceeded");

        allowance[from][msg.sender] -= value;

        balanceOf[from] -= value;
        balanceOf[to] += value;

        emit Transfer(from,to,value);

        return true;
    }
}