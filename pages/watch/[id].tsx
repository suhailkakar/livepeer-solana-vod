import { Player } from "@livepeer/react";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import checkSubscription from "../../lib/checkSubscription";
import { useRouter } from "next/router";
export default function Movie() {
  const [hasAccess, setHasAccess] = useState(false);
  const [playbackId, setPlaybackId] = useState<string | null>(null);
  const { publicKey } = useWallet();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (publicKey?.toBase58()) {
      checkSubscription({ publicKey: publicKey.toBase58() }).then((res) => {
        setHasAccess(res);
        if (id && typeof id === "string" && id.match(/^[a-z0-9]{16}$/)) {
          setPlaybackId(id);
        }
      });
    }
  }, [publicKey]);

  return (
    <div className="w-screen">
      {hasAccess && (
        <Player
          title="Waterfalls"
          playbackId={playbackId || "698bphqf3tmb3h6e"}
          loop
          autoPlay
          showTitle={false}
          muted
        />
      )}
    </div>
  );
}
