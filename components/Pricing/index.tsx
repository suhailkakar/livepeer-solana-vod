import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import { useProgram, useMintNFT } from "@thirdweb-dev/react/solana";

export default function Pricing() {
  const wallet = useWallet();
  const { program } = useProgram(
    "EbGgobhGG1qAQ8L4oEyYseAwizGKKJ5TGEQr8kawmoY1"
  ) as any;
  const [loading, setLoading] = useState(false);

  const { mutateAsync: mintNFT, isLoading, error } = useMintNFT(program);

  const handleClick = async () => {
    setLoading(true);
    mintNFT?.({
      metadata: {
        name: "Solflix Subscription",
        description: "A 30 day subscription to Solflix",
        image: `https://ipfs.io/ipfs/QmcR3Tich4Jb3jb6CAXZji4cbVFqf7GUknR6NnVY8mqUXS/vejiji3617_a_digital_card_with_the_S_film_logo_on_it_fantasy-th_5e723639-7568-436a-a8e5-34b1eac0073d%20(1).png`,
        expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
      },
      to: wallet.publicKey?.toBase58() as string,
    }).then((e) => {
      console.log(e);
      localStorage.setItem("subscription", "true");
      setLoading(false);
    });
  };

  return (
    <div className="w-screen  h-screen bg-black bg-opacity-50  top-0 left-0 bottom-0 right-0 flex justify-center items-center absolute">
      <div className=" bg-zinc-900 rounded-lg flex flex-row justify-center items-center h-1/2 ">
        <img
          src="https://cdn.discordapp.com/attachments/1059164244681162856/1059478485678162030/vejiji3617_a_digital_card_with_the_S_film_logo_on_it_fantasy-th_5e723639-7568-436a-a8e5-34b1eac0073d.png"
          alt="logo"
          className="w-80 object-cover h-full "
        />
        <div className="ml-8">
          <h1 className="text-2xl font-medium">Subscribe to continue</h1>
          <p className="text-gray-400 w-96 m mt-2">
            Please ensure that you are on the Solana Devnet. Your subscription
            will expire after 30 days.
            <br />
            <br />
            Get testnet SOL from the{" "}
            <span
              onClick={() => {
                window.open("https://solfaucet.com/");
              }}
              className="text-teal-500 cursor-pointer"
            >
              here
            </span>
          </p>

          <button
            onClick={handleClick}
            className="mt-8 bg-teal-500 rounded-lg flex flex-row justify-center items-center h-12 w-80 cursor-pointer hover:bg-purple-500"
          >
            Mint NFT
          </button>
          <div className="mt-8 ">
            Connected as {wallet.publicKey?.toBase58().slice(0, 6)}...
            {wallet.publicKey?.toBase58().slice(-6)}
          </div>
        </div>
      </div>
    </div>
  );
}
