// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract MiniGame {
    
    User[] public userArr;
    struct User {
        string _id;
        address _wallet;
    }
    event SM_send_data(address _wallet, string _id);
    
    function register(string memory _id) public {
        User memory newUser = User(_id, msg.sender);
        userArr.push(newUser);
        emit SM_send_data(msg.sender, _id);
    }
}