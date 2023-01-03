import { useCreateAsset } from "@livepeer/react";
import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components";
import Input from "../../components/shared/Input";
import { Asset } from "../../types";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
  const [ipfsCDN, setIpfsCDN] = useState<string | undefined>(undefined);
  const { publicKey } = useWallet();
  const {
    mutate: createAsset,
    data: assets,
    progress,
  } = useCreateAsset(
    file
      ? {
          sources: [{ name: title, file: file }] as const,
        }
      : null
  );

  const ref = React.useRef<HTMLInputElement>(null);
  const thumbRef = React.useRef<HTMLInputElement>(null);

  const savetoMongoDB = async () => {
    const body = {
      title,
      description,
      tags,
      playbackId: assets?.[0]?.playbackId,
      userAddress: publicKey?.toBase58(),
      createdAt: new Date(),
      thumbnail: ipfsCDN,
    } as Asset;
    const { data } = await axios.post("/api/upload", body);

    alert("Video uploaded successfully");
  };

  const uploadThumbnail = async () => {
    const formData = new FormData();
    formData.append("file", thumbnail as Blob);

    const { data } = await axios.post(
      "https://api.web3.storage/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEM5ODM5ZDdDRjc0QTYxN0NlMkFmOWY3YmY3YjI5MTBFNEUxNDE4MzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjMxMDA1OTA3MDgsIm5hbWUiOiJvbmJvYXJkIn0.EwioRO1tM25LBJLDPsPgMMTyg_rGdNFa2_rss0Q5OBI`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setIpfsCDN(data.cid);
    const { data: res } = await axios.get(`https://w3s.link/ipfs/${data.cid}`);
  };

  useEffect(() => {
    if (progress?.[0]?.phase === "ready") {
      savetoMongoDB();
    }
  }, [progress]);

  return (
    <div className="w-screen flex flex-row">
      <Sidebar />
      <div className="mt-20  flex flex-col  items-center w-full -ml-20">
        <div>
          <h4 className="text-2xl font-medium text-white mb-4 font-poppins">
            Upload video
          </h4>
          <div className="flex flex-row ">
            <img src="/avatars/1.png" className="rounded-sm h-24 w-24" />
            <div className="flex flex-col ml-4 w-[24em]">
              <Input
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                placeholder="Tags"
                onChange={(e) => setTags(e.target.value)}
              />

              <div className="h-2 w-3/4 mt-4 mb-4 border-t border-zinc-900" />
              <div className="flex flex-row  ">
                <input
                  type="file"
                  ref={ref}
                  accept="video/*"
                  onChange={(e) => setFile(e?.target?.files?.[0])}
                  className="hidden"
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={thumbRef}
                  onChange={(e) => setThumbnail(e?.target?.files?.[0])}
                  className="hidden"
                />
                <button
                  onClick={() => ref.current?.click()}
                  className="border border-zinc-800 py-3 px-3 w-1/2 text-zinc-800"
                >
                  {file
                    ? file.name.length > 10
                      ? file.name.slice(0, 10) + "..."
                      : file.name
                    : "Choose file"}
                </button>
                <button
                  onClick={() => thumbRef.current?.click()}
                  className="border border-zinc-800 py-3 px-3 w-1/2 ml-4 text-zinc-800"
                >
                  {thumbnail
                    ? thumbnail.name.length > 10
                      ? thumbnail.name.slice(0, 10) + "..."
                      : thumbnail.name
                    : "Choose thumbnail"}
                </button>
              </div>
              <button
                disabled={!file || !title || !description || !tags}
                onClick={() => {
                  createAsset?.();
                  uploadThumbnail();
                }}
                className={
                  "border border-primary py-3 px-3 mt-4  bg-primary  " +
                  (!file || !title || !description || !tags
                    ? "opacity-30 cursor-not-allowed"
                    : "")
                }
              >
                {progress
                  ? progress[0].phase !== "ready" &&
                    progress[0].phase +
                      ` ${Number(progress[0].progress.toFixed(2)) * 100}%`
                  : "Upload"}
                {progress?.[0].phase == "ready" && "Upload"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
