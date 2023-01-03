import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState, useEffect, useCallback } from "react";
import { Sidebar } from "../../components";
import { Asset } from "../../types";
import axios from "axios";
import Link from "next/link";
export default function Assets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const { publicKey } = useWallet();

  const fetchAssets = async () => {
    const { data } = await axios.get(
      `/api/get-assets?id=${publicKey?.toBase58()}`
    );
    if (data) {
      setAssets(data);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [publicKey]);
  return (
    <div className="w-screen flex flex-row">
      <Sidebar />
      <div className="mt-20 w-full flex flex-col ml-20">
        <div>
          <h4 className="text-2xl font-medium text-white mb-4 font-poppins">
            Public Assets
          </h4>
        </div>
        <div className="flex flex-row">
          {assets.map((asset) => (
            <Link
              key={asset.playbackId}
              href={`/watch/${asset.playbackId}`}
              className="flex flex-col  mb-6 mr-6"
            >
              <img
                className="w-80 h-48 object-cover rounded-md "
                src={"https://w3s.link/ipfs/" + asset.thumbnail}
              />
              <p className="text-white font-poppins font-medium mt-2">
                {asset.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
