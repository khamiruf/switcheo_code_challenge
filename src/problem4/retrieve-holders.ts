import { ethers } from "ethers";
import SWTH_ABI from "./swth.json";

// retrieve specified holders of $SWTH token: 0xc0ecb8499d8da2771abcbf4091db7f65158f1468
// address to look up:
var walletAddresses = ["0xb5d4f343412dc8efb6ff599d790074d0f1e8d430", "0x0020c5222a24e4a96b720c06b803fb8d34adc0af", "0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392"]

const CONTRACT_ADDRESS = "0xc0ecb8499d8da2771abcbf4091db7f65158f1468";
const provider = new ethers.providers.InfuraProvider();


const test = async (address: string) => {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, SWTH_ABI, provider);
    const signer = new ethers.VoidSigner(address, provider);
    const signerAddress = signer.getAddress();
    const balance = await contract.balanceOf(signerAddress);
    const format = ethers.utils.formatEther(balance);
    console.log(format);
    return balance;
}

walletAddresses.forEach(address => {
    test(address).then(e => {
        console.log(`${address} ${e}`);
    })
})