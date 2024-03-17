import { InputFile } from "@/components/ImageUpload/index";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import Image from "next/image";
import { useState } from "react";
import { supabase } from "../../../supabase";

export function Modal() {
  const [file, setFile] = useState();
  const [modal, setModal] = useState<boolean>(false);
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

    setModal(false);
  };

  const openModal = (e: any) => {
    e.preventDefault();
    setModal(!modal);
  };

  const renderPreview = () => {
    return (
      <>
        {previewFile && (
          <Image src={previewFile} alt="concert" width={500} height={500} />
        )}
      </>
    );
  };

  return (
    <>
      {!file ? (
        <Button
          variant="outline"
          size="lg"
          onClick={(e) => openModal(e)}
          className="min-w-[250px]"
        >
          Add Photo
        </Button>
      ) : (
        <div className="flex gap-6 items-center">
          {" "}
          <Button
            variant="outline"
            size="lg"
            className="min-w-[250px]"
            onClick={() => setModal(true)}
          >
            Photo Uploaded!
          </Button>
        </div>
      )}
      <AlertDialog open={modal}>
        <AlertDialogContent className="max-h-[600px] overflow-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Upload Photo</AlertDialogTitle>
            <AlertDialogDescription>
              Click upload when you're done.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <InputFile onChange={onFileChange} />
          {renderPreview()}
          <AlertDialogFooter className="mt-12 flex gap-4">
            <AlertDialogCancel onClick={() => setModal(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={uploadFile}>Upload</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
