'use client'
import React, { useCallback, useState } from 'react'
import { motion } from 'framer-motion';
import { useDropzone, DropzoneRootProps, FileRejection } from 'react-dropzone'
import { TFileUploder } from './types';
import { Hand, Images } from 'lucide-react';
import MultipleImage from './MultipleImages';
import SingleImage from './SigleImage';
import Image from 'next/image';

const UpdateFileUploader = ({ maxFiles = 1, formField }: TFileUploder) => {

   const [files, setFiles] = useState<(File & { preview: string })[]>([]);

   const onDrop = useCallback((acceptedFiles: DropzoneRootProps) => {
      const newFiles = (acceptedFiles.map((file: File) => Object.assign(file, {
         preview: URL.createObjectURL(file),
      })));
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles)
      formField.onChange(updatedFiles)

   }, [formField, files,])


   const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone(
      {
         onDrop, maxFiles: maxFiles, accept: {
            'image/jpeg': [],
            'image/jpg': [],
            'image/png': [],
            'image/webp': [],
         }
      })

   const fileRejectionItems = fileRejections.map(({ file, errors }: FileRejection) => (
      <li key={file.path}>
         {file.path} - {file.size} bytes
         <ul>
            {errors.map(e => (
               <li key={e.code}>{e.message}</li>
            ))}
         </ul>
      </li>
   ));
   return (
      <>
         <div className='cursor-pointer p-4 pace-y-3 relative h-40 w-full group' {...getRootProps()}>
            {formField.value && (
               <Image src={formField.value} className='rounded-lg object-cover' fill sizes='100%' alt='product image' />
            )}
            <div className='absolute inset-0 flex  rounded-lg transition-opacity bg-black/50 text-white opacity-0 group-hover:opacity-100'>
               <input {...getInputProps()} />
               {
                  isDragActive ? (
                     <div className='m-auto grid'>
                        <p>Large os ficheiros aqui ...</p>
                        <Hand width={50} />
                     </div>
                  ) : (
                     <div className='m-auto'>
                        <Images width={50} className='size-16' />
                     </div>
                  )
               }<div className='text-center'>
                  <ul className='text-red-500'>{fileRejectionItems}</ul>
               </div>
            </div>
         </div>
         <aside className={`${maxFiles > 1 ? 'flex justify-center flex-col gap-3' : 'flex items-center flex-wrap'}`}>
            {files.length > 1 && (
               <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
               >
                  <MultipleImage setFiles={setFiles} files={files} />
               </motion.div>
            )}
            {maxFiles === 1 && files.length > 0 && <SingleImage setFiles={setFiles} file={files[0]} />}
         </aside>
      </>
   )
}


export default UpdateFileUploader;