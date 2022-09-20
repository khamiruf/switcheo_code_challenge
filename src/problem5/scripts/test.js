const { ethers } = require("ethers");
const contract = require("../artifacts/contracts/SmartestContract.sol/SmartestContract.json")
const ADDR = "0x47755f773BA6f3Fd5B5a46486C7933BdBE185fb5";   // your contract address
const ABI = contract.abi; // your contract ABI

const ADDRESS = "…"; // some wallet address with token balance
const TOKENS = [    // token contract addresses
	"…",
	"…",
];

// you can use your own RPC provider url (no need to deploy to mainnet)
const provider = ethers.providers.getDefaultProvider();

const test = async () => {
	const contract = new ethers.Contract(ADDR, ABI, provider);

	const balances = await contract.getBalances(ADDRESS, tokens);

	return balances;
};

test().then(console.log);