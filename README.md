# EthDB Project

This README will guide you through the steps to create, compile, and deploy a smart contract using Hardhat, and then create a front-end using React and ethers.js.

## Prerequisites

- Node.js and npm installed
- Hardhat installed globally (`npm install -g hardhat`)
- React installed (`npx create-react-app`)

## Steps

### 1. Create the Smart Contract

Create a new file named `EthDB.sol` in your `contracts` directory with the following content:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EthDB {
    // Your smart contract code here
}
```

### 2. Compile the Smart Contract

Navigate to your project directory and run:

```bash
npx hardhat compile
```

### 3. Create and Deploy the Node

Create a Hardhat script to deploy the contract. Create a new file named `deploy.js` in the `scripts` directory with the following content:

```javascript
async function main() {
    const EthDB = await ethers.getContractFactory("EthDB");
    const ethDB = await EthDB.deploy();
    await ethDB.deployed();
    console.log("EthDB deployed to:", ethDB.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
```

Run the deployment script:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 4. Create the Front-End

Navigate to your project directory and create a new React app:

```bash
npx create-react-app front
cd front
npm install ethers
```

### 5. Connect to the Smart Contract

In your React app, create a new file named `EthDB.js` in the `src` directory with the following content:

```javascript
import { ethers } from "ethers";
import EthDB from "./artifacts/contracts/EthDB.sol/EthDB.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contract = new ethers.Contract(contractAddress, EthDB.abi, signer);

export default contract;
```

### 6. Run the Front-End

Start your React app:

```bash
yarn dev
```

You should now have a basic setup for your EthDB project with a smart contract and a front-end.
