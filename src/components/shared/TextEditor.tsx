'use client'
import { useEffect, useState } from 'react';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import dynamic from 'next/dynamic';
import { TEditorProps } from './type';

const FroalaEditorComponent = dynamic(
   () => import('react-froala-wysiwyg'),
   { ssr: false }
);

const TextEditor = ({ formField, height = 200 }: TEditorProps) => {

   const [model, setModel] = useState(formField.value || '');

   useEffect(() => {
      setModel(formField.value || '');
   }, [formField.value]);

   const handleChange = (value: string) => {
      setModel(value)
      formField.onChange(value)
   }

   return (
      <FroalaEditorComponent
         tag='textarea'
         config={{
            PlaceholderText: "Escreva algo",
            heightMin: height,
            events: {
               // contentChanged: function () {
               //    const text = this.html.get()
               //    console.log(text);

               // }
            }
         }}
         model={model}
         onModelChange={handleChange} />
   )
}

export default TextEditor;