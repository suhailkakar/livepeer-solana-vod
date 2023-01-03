import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FiSearch,
  FiHome,
  FiPlayCircle,
  FiTv,
  FiPlus,
  FiUser,
} from "react-icons/fi";
import checkSubscription from "../../lib/checkSubscription";
import Pricing from "../Pricing";

export default function Sidebar() {
  const [hasAccess, setHasAccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { publicKey } = useWallet();

  const handleClick = async (id: string) => {
    console.log(publicKey, hasAccess);
    if (publicKey) {
      if (hasAccess) {
        window.location.href = `http://localhost:3000/${id}`;
      } else {
        toast.error("Please subscribe to continue", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } else {
      toast.error("Please connect your wallet", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    if (publicKey) {
      checkSubscription({ publicKey: publicKey.toBase58() }).then((res) => {
        setHasAccess(res);
      });
    } else {
    }
  }, [publicKey]);

  return (
    <div className="w-[7%] bg-[#000000] flex flex-col h-screen justify-center items-center sticky top-0">
      <FiHome
        onClick={() => handleClick("")}
        size={27}
        className="text-white mt-8 hover:text-primary transition-all duration-300 cursor-pointer"
      />

      <FiTv
        onClick={() => handleClick("/assets")}
        size={27}
        className="text-white mt-8 hover:text-primary transition-all duration-300 cursor-pointer"
      />
      <FiPlus
        onClick={() => handleClick("/upload")}
        size={27}
        className="text-white mt-8 hover:text-primary transition-all duration-300 cursor-pointer"
      />
      <FiUser
        onClick={() => handleClick("/profile")}
        size={27}
        className="text-white mt-8 hover:text-primary transition-all duration-300 cursor-pointer"
      />
    </div>
  );
}
