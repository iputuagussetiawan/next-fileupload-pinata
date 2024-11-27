"use client";

import { MyDropzone } from "@/components/dropzone";
import { pinata } from "@/lib/pinata";
import { useState } from "react";


export default function Home() {
  return(
    <div className="max-w-xl mx-auto min-h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold"> File <span className="text-primary">Upload</span></h1>
      <MyDropzone/>
    </div>
  )
}
