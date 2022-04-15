import * as ethers from "ethers";

export class WalletDispatcher {
  initialize = async () => {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      const returnVal = await this.provider.send("eth_requestAccounts", []);
      if (returnVal !== []) return true;
      this.signer = this.provider.getSigner();
    } catch (error) {}
  };

  getConnection = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const connectedWallet = await provider.send("eth_requestAccounts", []);
    console.log(connectedWallet);
  };
}
