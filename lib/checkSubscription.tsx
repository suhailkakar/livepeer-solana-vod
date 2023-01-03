import {
  createConnectionConfig,
  getParsedNftAccountsByOwner,
} from "@nfteyez/sol-rayz";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connect = createConnectionConfig(clusterApiUrl("devnet"));

const checkSubscription = async ({ publicKey }: { publicKey: string }) => {
  const nfts = await getParsedNftAccountsByOwner({
    publicAddress: publicKey,
    connection: connect,
  });

  const hasSubscription = nfts.some((nft) => {
    return nft.mint === "EbGgobhGG1qAQ8L4oEyYseAwizGKKJ5TGEQr8kawmoY1";
  });

  return hasSubscription;
};

export default checkSubscription;
