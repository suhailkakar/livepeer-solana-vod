import React, { useEffect, useState } from "react";
import { genres } from "../../lib/getGenreFromId";
import Hero from "../Hero";
import Pricing from "../Pricing";
import Movies from "../shared/Movies";
import { useWallet } from "@solana/wallet-adapter-react";
import checkSubscription from "../../lib/checkSubscription";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import toast, { useToaster } from "react-hot-toast";

export default function Home() {
  const [hasAccess, setHasAccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const watchMovie = async (id: number) => {
    console.log(publicKey, hasAccess);
    if (publicKey?.toBase58()) {
      if (hasAccess) {
        window.location.href = `/watch/${id}`;
      } else {
        setIsModalOpen(true);
      }
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    if (publicKey?.toBase58()) {
      checkSubscription({ publicKey: publicKey.toBase58() }).then((res) => {
        setHasAccess(res);
      });
    } else {
      toast.error("Please connect your wallet", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }, [publicKey]);

  return (
    <>
      <div className="w-[93%] flex flex-col">
        <Hero />

        {isModalOpen ? (
          <Pricing />
        ) : (
          <>
            {genres.map((genre) => (
              <Movies
                onClick={(id) => watchMovie(id)}
                key={genre.id}
                genre={genre.id}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
