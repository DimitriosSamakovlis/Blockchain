import Web3 from "web3";
import votingArtifact from "../../build/contracts/Voting.json";

let candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}
var number = 0

const App = {
  web3: null,
  account: null,
  voting: null,

  start: async function() {
    const { web3 } = this;

    try {
      /* Get the network we are connected to and then read the build/contracts/Voting.json and instantiate a contract object to use
      */

      // 
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = votingArtifact.networks[networkId];
      this.voting = new web3.eth.Contract(
        votingArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      
      $("#account").html(accounts[number]);
      $("#address").html(this.voting.options.address);

      this.loadCandidatesAndVotes();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  loadCandidatesAndVotes: async function() {
    const { totalVotesFor } = this.voting.methods;
    //const { sendCoin } = this.meta.methods;
    //await sendCoin(receiver, amount).send({ from: this.account });
    let candidateNames = Object.keys(candidates);
    for (var i = 0; i < candidateNames.length; i++) {
      let name = candidateNames[i];
      var count = await totalVotesFor(this.web3.utils.asciiToHex(name)).call();
      $("#" + candidates[name]).html(count);
    }
  },
  
  changeAccount: async function() {
      number = (number + 1) % 10;
      const accounts = await this.web3.eth.getAccounts();
      this.account = accounts[number];
      
      $("#account").html(accounts[number]);
      
  },

  voteForCandidate: async function() {
    let candidateName = $("#candidate").val();
    $("#msg").html("Vote has been submitted. Please wait.")
    $("#candidate").val("");

    const { totalVotesFor, voteForCandidate } = this.voting.methods;
    

    /* Voting.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    await voteForCandidate(this.web3.utils.asciiToHex(candidateName)).send({gas: 140000, from: this.account}).on('transactionHash', function(hash){
        $("#msg").html("The transaction has been sent - wait for approval");
    }).on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        $("#msg").html("ERROR - Transaction not accepted" + "<br>The error is caused either because you are not an eligible voter or you have already voted or you voted a person that does not exist");
    });
    $("#msg").html("Vote accepted by the network");
    let div_id = candidates[candidateName];
    var count = await totalVotesFor(this.web3.utils.asciiToHex(candidateName)).call();
    $("#" + div_id).html(count);
    
  }
  
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});
