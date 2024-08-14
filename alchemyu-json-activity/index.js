const axios = require('axios');

// copy-paste your URL provided in your Alchemy.com dashboard
const ALCHEMY_URL = "https://eth-mainnet.g.alchemy.com/v2/HzW5r8yAqA2EBOJTWfWMwAAJlpXb7wEJ";

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_getBalance",
  params: [
    "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", // block 46147
    "latest"  // retrieve the full transaction object in transactions array
  ]
}).then((response) => {
  console.log(parseInt(response.data.result));
});
