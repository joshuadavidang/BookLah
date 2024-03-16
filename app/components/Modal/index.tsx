import { InputFile } from "@/components/ImageUpload/index";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import Image from "next/image";
import { useState } from "react";
import { supabase } from "../../../supabase";

export function Modal() {
  const [file, setFile] = useState();
  const [previewFile, setPreviewFile] = useState<any>();

  const onFileChange = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
    setPreviewFile(URL.createObjectURL(file));
  };

  const uploadFile = async (e: any) => {
    e.preventDefault();
    const BUCKET = "concert";

    if (file) {
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload((file as File).name, file);

      if (error) {
        return;
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="lg" className="min-w-[250px]">
          Add Photo
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[600px] overflow-auto">
        <AlertDialogHeader className="mx-auto">
          <AlertDialogTitle>Upload Photo</AlertDialogTitle>
          <AlertDialogDescription>
            Click upload when you're done.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputFile onChange={onFileChange} />
        {previewFile && (
          <Image src={previewFile} alt="concert" width={500} height={500} />
        )}
        <AlertDialogFooter className="mt-12 flex gap-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={uploadFile}>Upload</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
