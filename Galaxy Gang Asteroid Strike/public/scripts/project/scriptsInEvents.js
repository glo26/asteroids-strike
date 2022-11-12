


const scriptsInEvents = {

	async E_start_Event2_Act2(runtime, localVars)
	{
		await globalThis.startMoralis();
		
	},

	async E_start_Event4_Act1(runtime, localVars)
	{
		runtime.globalVars["walletAddress"] = await globalThis.login();
	},

	async E_start_Event10_Act2(runtime, localVars)
	{
		runtime.globalVars["paymentTicketStatus"] = await globalThis.payUSDT(0.001);
	},

	async E_shop_Event8_Act3(runtime, localVars)
	{
		runtime.globalVars["paymentPerkStatus"] = await globalThis.payUSDT(0.002);
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

