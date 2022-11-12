
import * as web3module from "./web3.js";
import * as moralisModule from "./moralis.min.js";

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
	
	runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime)
{
	// Code to run every tick
}

Moralis.onAccountChanged( async (account) => {
	await Moralis.User.logOut();
	location.reload();
});

globalThis.startMoralis = async function (){
	const serverUrl = "https://evb0r6ykan1n.usemoralis.com:2053/server";
	const appId = "MytKHGrZBbUbiNNMHQct6g9vFtRnAvElA6UPZ3w6";
	Moralis.start({ serverUrl, appId });	
}

globalThis.login = async function(){
	await switchNetwork();
	let user = Moralis.User.current();
	console.log("logged in");
	user = await Moralis.authenticate();  
	ethAddress =  user.get("ethAddress");
	console.log("logged in user:", user.id);
	console.log("address user:", ethAddress);    
	
	return ethAddress;
}	

globalThis.ethAddress="";
globalThis.usdtAddress="0xb45d9c6feeaf3cf1d29b0a91d7790abd6fade92a";//Matic di mumbai buat test
globalThis.gmAddress="0xa417ab513F62394e3b680fe46f7361f202307Cb8";
//mumbai
globalThis.switchNetwork = async () => {
  try {
    await web3.currentProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x13881" }],
    });
  } catch (error) {
    if (error.code === 4902) {
      try {
        await web3.currentProvider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x13881",
              chainName: "Mumbai",
              rpcUrls: ["https://rpc-mumbai.matic.today"],
              nativeCurrency: {
                name: "Matic",
                symbol: "Matic",
                decimals: 18,
              },
              blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com"],
            },
          ],
        });
      } catch (error) {
        alert(error.message);
      }
    }
  }
}

globalThis.payUSDT = async function(amount){
	let transaction = await Moralis.transfer({
	type: "native",
  	amount: Moralis.Units.Token(amount.toString(), "18"),  	
  	//contractAddress: usdtAddress,
	receiver: gmAddress,
	});
	
	const result = await transaction.wait();
	
	console.log(result);
	
	if(result != null){
		return 1;
	}else{
		return 0;
	}
}