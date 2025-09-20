import { createThirdwebClient , getContract } from "thirdweb";
 
const client=createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});


//locally deploying using anvil

export const crowdfundContract = getContract({
    client,
    chain:{
        id:31337,  
        rpc: "http://127.0.0.1:8545",
    },
    address:"0x5FbDB2315678afecb367f032d93F642f64180aa3",
});


// need to update later to make it functional to work with other chains