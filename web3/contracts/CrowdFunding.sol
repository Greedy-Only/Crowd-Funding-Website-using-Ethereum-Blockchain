// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Request {
        address owner;
        string title;
        string description;
        uint256 target;
        string image;
        uint256 deadline;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Request) public requests;

    uint256 public numberOfRequest = 0;

    function createRequest(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Request storage request = requests[numberOfRequest];

        require(
            request.deadline < block.timestamp,
            "The deadline should be a date in the future."
        );

        request.owner = _owner;
        request.title = _title;
        request.description = _description;
        request.target = _target;
        request.deadline = _deadline;
        request.amountCollected = 0;
        request.image = _image;
        numberOfRequest++;

        return numberOfRequest - 1;
    }

    function donateToRequest(uint256 _id) public payable {
        // sending eth through out this function
        uint256 amount = msg.value;

        Request storage request = requests[_id];

        request.donators.push(msg.sender);
        request.donations.push(amount);

        (bool sent, ) = payable(request.owner).call{value: amount}("");

        if (sent) {
            request.amountCollected = request.amountCollected + amount;
        }
    }

    function getDonators(uint256 _id)
        public
        view
        returns (address[] memory, uint256[] memory)
    {
        return (requests[_id].donators, requests[_id].donations);
    }

    function getRequests() public view returns (Request[] memory) {
        Request[] memory allRequests = new Request[](numberOfRequest);

        for (uint256 i = 0; i < numberOfRequest; i++) {
            Request storage item = requests[i];

            allRequests[i] = item;
        }

        return allRequests;
    }
}
