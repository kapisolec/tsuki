import * as ethers from "ethers";

export class WalletDispatcher {
  initialize = async () => {
    try {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      const returnVal = await this.provider.send("eth_requestAccounts", []);
      this.signer = this.provider.getSigner();
      this.rewardsContract = new ethers.Contract(
        "0xA3E14B55Ec2886e41cF1AA50F1e8b95212e43322",
        [
          "function balanceOf(address account) external view returns (uint256)",
          "function transfer(address recipient, uint256 amount) external returns (bool)",
          "function approve(address spender, uint256 amount) external returns (bool)",
          "function decimals() external pure returns (uint8)",
          "function owner() public view returns (address)",
          "function claimRewards() nonpayable external",
          "function setRewards(address[] addresses, uint256[] amounts) external",
          "function totalSupply() external view returns (uint256)",
          "function getOwner() public view returns (address)",
          "function factory() public view returns (address)",
          "event Transfer(address indexed from, address indexed to, uint amount)",
          "event SwapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)",
          "event SwapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)",
          "event SwapExactETHForTokensSupportingFeeOnTransferTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)",
          "event SwapExactTokensForETHSupportingFeeOnTransferTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)",
          "event Mint(address indexed sender, uint amount0, uint amount1)",
          "event Burn(address indexed sender, uint amount0, uint amount1, address indexed to)",
          "event Swap(address indexed sender,uint amount0In,uint amount1In,uint amount0Out,uint amount1Out,address indexed to)",
          "event Sync(uint112 reserve0, uint112 reserve1)",
          "event Approval(address indexed owner, address indexed spender, uint value)",
        ],
        this.signer
      );
      if (returnVal !== []) return returnVal[0];
    } catch (error) {
      console.error(error);
    }
  };

  getConnection = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const connectedWallet = await provider.send("eth_requestAccounts", []);
    console.log(connectedWallet);
  };

  claimRewards = async () => {
    console.log(this);
    // const address = await this.signer.getAddress();
    try {
      // claim rewards
      await this.rewardsContract.claimRewards();
    } catch (error) {}
  };
}
