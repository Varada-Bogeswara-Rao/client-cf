import { createThirdwebClient, getContract } from "thirdweb";

const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});


//locally deploying using anvil

export const crowdfundContract = getContract({
    client,
    chain: {
        id: 31337,
        rpc: "http://127.0.0.1:8545",
    },
    address: "0x8464135c8F25Da09e49BC8782676a84730C318bC",
});


// need to update later to make it functional to work with other chains