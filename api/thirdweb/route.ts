// // app/api/thirdweb/route.ts
// import { NextResponse } from "next/server";
// import { createThirdwebClient } from "thirdweb";

// if (!process.env.THIRDWEB_SECRET_KEY) {
//     throw new Error("THIRDWEB_SECRET_KEY is not set in your .env file.");
// }

// const serverClient = createThirdwebClient({
//     secretKey: process.env.THIRDWEB_SECRET_KEY,
// });

// export async function GET() {
//     // Example: return some server-only data
//     const project = await serverClient.getProject();
//     return NextResponse.json(project);
// }
