import { pinata } from "@/lib/pinata";
import Image from "next/image";

async function getData() {
    //fetch data from db
    const url=await pinata.gateways.createSignedURL({
        cid:'bafkreihwaqcvws64jfkwgn62zuj65ckssnydwi6y7dlfgrpqs65df5ljaa',
        expires:3600,
    }).optimizeImage({
        width:500,
        height:500,
        format:'webp',
        quality:80,
    });
    return url;
}

export default async function HelloRoute() {
    const data=await getData();
    console.log(data)
    return (
        <div>
            <h1>Hello</h1>
            <img src={data} alt="sdf" />
        </div>
    )
}