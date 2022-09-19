const { ethers } = require("hardhat");

async function main() {
    const SmartestContract = await ethers.getContractFactory("SmartestContract");
    const smart_contract = await SmartestContract.deploy();

    console.log("Contract deployed to address: ", smart_contract.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });