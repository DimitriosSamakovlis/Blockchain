COMMANDS for running on localhost:
    /dapp:$ node_modules/.bin/ganache-cli  - or just start ganache on localhost 8545 with some test accounts that have some ether)

    /dapp:$ truffle migrate --network develop

    /dapp/app/src:$ npm run dev

    -start a private session in your browser and go to localhost:8080 - You can cast your vote
    
    
REQUIREMENTS (Build from scratch): 
              NodeJS
			  Ganache
			  Web3
			  babel-register
			  webpack
			  solc@0.6.4


MANY OF THESE NEED ADMINISTRATIVE PRIVILEGES (sudo npm install...)

-install nodejs on machine(apt, win installer etc)
-install ganache & web3 (npm install ganache-cli web3@1.2.6)
-install solidity compiler version 0.6.4 (npm install solc@0.6.4)
-install truffle (npm install -g truffle@5.1.18)
-install webpack (npm install -g webpack@4.42.0)
-install babel-register (npm install babel-register)
-run: truffle unbox webpack
-copy Voting.sol in contracts subfolder
-replace migrations/2_deploy_contracts.js
-replace truffle_config.js
-replace app/src/index.html & index.js
-run ganache on port 8545 (node_modules/.bin/ganache-cli or executable)
-run: truffle console --network develop
-from app/src: run: npm run dev

use incognito mode in order to not interfere with preexisting wallets(metamask etc)
server is running on localhost:8080
