"use client"
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from './ui/button'
import { toast } from 'sonner';
import { pinata } from '@/lib/pinata';
import Image from 'next/image';
import { Loader2, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';


export function MyDropzone() {
    const [files, setFiles]=useState<Array<{file:File; uploading:boolean}>>([]);
    console.log(files)

    const uploadFile=async(file:File)=>{
        try {
            setFiles((prevFiles)=>
                prevFiles.map((f)=>(f.file===file?{...f,uploading:true}:f))
            );
            const keyRequest=await fetch("/api/key");
            const keyData= await keyRequest.json();
            const upload=await pinata.upload.file(file).key(keyData.JWT);
            setFiles((prevFiles)=>
                prevFiles.map((f)=>(f.file===file?{...f,uploading:false}:f))
            );
            toast.success(`File ${file.name} uploaded successfully`);
        } catch (error) {
            console.log(error)
            setFiles((prevFiles)=>
                prevFiles.map((f)=>(f.file===file?{...f,uploading:false}:f))
            );
            toast.error("Error uploading file")
        }
    }
    const onDrop = useCallback(async(acceptedFiles:File[]) => {
        // Do something with the files
        if(acceptedFiles.length) {
            setFiles((prevFiles)=>[
                ...prevFiles,
                ...acceptedFiles.map((file)=>({file,uploading:false}))
            ])

            acceptedFiles.forEach(uploadFile);
        }

        console.log(acceptedFiles)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <>
            <div {...getRootProps({
                className:'w-full p-16 mt-10 border-2 border-dashed rounded-lg   border-gray-300 rounded-md',
                })}>
                <input {...getInputProps()} />
                {
                    isDragActive ?(
                        <p className='text-center'>Drop the files here ...</p>
                    )
                    :
                    (
                        <div className='flex flex-col items-center justify-center gap-y-3'>
                            <p>Drag 'n' drop some files here, or click to select files</p>
                            <Button>Select File</Button>
                        </div>
                    )
                }
                </div>
                <div className='mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                    {files.map(({file, uploading}) => (
                        <div key={file.name} className='relative w-full group'>
                            <div className="relative">
                                <Image 
                                    src={URL.createObjectURL(file)} 
                                    alt={file.name} 
                                    width={200} 
                                    height={200} 
                                    className={cn(
                                        uploading ? "opacity-50" : "", "rounded-lg size-32 object-cover"
                                    )}
                                />
                                {uploading && (
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <Loader2 className='size-8 animate-spin text-primary' />
                                    </div>
                                )}
                            </div>
                            <div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                                <Button size={"icon"} variant={"destructive"}>
                                    <XIcon/>
                                </Button>
                            </div>
                            <p className='mt-2 text-sm text-gray-500 truncate'>{file.name}</p>
                        </div>
                    ))}
                </div>
        </>
    )
}