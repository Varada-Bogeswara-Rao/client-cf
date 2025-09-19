import { createThirdwebClient } from "thirdweb";
import { upload } from "thirdweb/storage";
import { toast } from "sonner";
const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export async function uploadCampaignMetadata(data: any) {
    try {
        const uris = await upload({
            client,
            files: [data],
        });

        toast.success("Metadata uploaded to IPFS!", {
            description: uris[0], // show the IPFS URI in the toast
        });
        return uris[0];
    } catch (error: any) {
        toast.error("Failed to upload metadata", {
            description: error.message ?? "Unknown error",
        });
        throw error;
    }
}