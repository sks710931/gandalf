
# Run the Frontend application

1. Clone this repository in your system
2. make sure you have nodeJs > 12.0 installed in your system, can check by running "node --version" in terminal
3. In terminal open the cloned folder 
4. run the command "npm install"
5. run the command "npm start" this will start the front end application, it uses the test version of the contract deployed at https://goerli.etherscan.io/address/0x25Ffe4FCd767411aa1Acc0ef127d07D8F7D1ff8e
# Deploying the Frontend Application and the contract
1. Copy the contract code from "src/contract/ERVGandalf.sol" file
2. open https://remix.ethereum.org
3. paste the complete contract code in one file and compile the code
4. go to deploy contract menu, in the base uri constructor field provide the
base  uri - https://kishiburno.mypinata.cloud/ipfs/QmV9XcQeUe7ugF8G4vhhpJPVVkW4KFHrrTPhgu1dd6WTFL
contract uri - https://kishiburno.mypinata.cloud/ipfs/QmRhAu78B9RyRUcyN3io6FZKbmNHucLK4dnhqXcvUdeNVn
_ROYALTYFEESINBIPS - 500 and hit deploy button.
5. copy the deployed contract address
6. go to the src/connectors/address.js file and replace the NFTContractAddress value with the address copied.
7. get the ethereum  mainnet rpc url and in src/connectors/address.js update the rpc value with it
8. run npm start and make sure everything is running correctly
9. run command "npm build" to build the project
10. copy the contents of the /build folder and upload it to your web server