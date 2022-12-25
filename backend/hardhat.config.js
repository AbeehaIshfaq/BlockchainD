require("@nomicfoundation/hardhat-toolbox");

//require("@nomiclabs/hardhat-ethers")
const dotenv = require("dotenv");
dotenv.config({path:".env"});

 const RINKEBY_RPC_URL = 'https://goerli.infura.io/v3/5313ed07668d403793c5d4a97858c9f0'; 

 const PRIVATE_KEY = '4f7a793f9974e90936c3b7017f20085a3f4fcc785175969dab9c60b9e78f1a2e' 

 module.exports = {
     defaultNetwork: "Goerli",
     networks: {
         hardhat: {
             // // If you want to do some forking, uncomment this
             // forking: {
             // url: MAINNET_RPC_URL
             // }
             allowUnlimitedContractSize: true
         },
         localhost: {
            allowUnlimitedContractSize: true
         },
         Goerli: {
             url: RINKEBY_RPC_URL,
             accounts: [`0x${PRIVATE_KEY}`],
             saveDeployments: true,
         },
     },

  solidity: "0.8.9",
};