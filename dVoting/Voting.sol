pragma solidity ^0.6.4;
// We have to specify what version of compiler this code will compile with

contract Voting {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count. Similarly we have as key the address
  of the voter and we store a boolean that indicates if he haw already voted
  */
  
  mapping (bytes32 => uint256) public votesReceived;
  mapping (address => bool) private votesCast;
  
  /* 
  We will use an array of bytes32 to store the list of candidates
  and an array of addresses to store the voters
  */
  
  bytes32[] public candidateList;
  address[] private voterList;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  as well as an array of the eligible voters' addresses
  */
  constructor(bytes32[] memory candidateNames, address[] memory votersNames) public {
    candidateList = candidateNames;
    voterList = votersNames;
  }

  // This function returns the total votes a candidate has received so far
  function totalVotesFor(bytes32 candidate) view public returns (uint256) {
    require(validCandidate(candidate), "Not a valid candidate");
    return votesReceived[candidate];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForCandidate(bytes32 candidate) public {
    require(validCandidate(candidate), "Not a valid candidate");
    require(validVoter(msg.sender), "You are not an eligible voter");
    votesReceived[candidate] += 1;
    votesCast[msg.sender] = true;
  }

  // check if someone is a candidate indeed
  function validCandidate(bytes32 candidate) view public returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }
  
  // check if an address is an eligible voter that has not voted yet
  function validVoter(address voter) view public returns (bool) {
    for(uint i = 0; i < voterList.length; i++) {
      if (voterList[i] == voter) {
        if (votesCast[voter] == false)   {
            return true;
        }
      }
    }
    return false;
  }
}
