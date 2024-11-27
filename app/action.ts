//reference : https://www.youtube.com/watch?v=We2Rqt3ERr4&t=3658s
"use server";

import { pinata } from "@/lib/pinata";

export async function deleteImage(fileId:string) {
    try {
        await pinata.files.delete([fileId]);
        return{
            success:true,
        }
    } catch (error) {
        console.log(error)
        return{
            success:false,
            message:"Error deleting image",
        }
    }
}