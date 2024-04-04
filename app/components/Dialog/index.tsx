import { backendAxiosPost } from "@/api/helper";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogTrigger,
  Dialog as ShadcnDialog,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { AuthContext } from "@/context";
import { PostSchema } from "@/model/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import z from "zod";
import Input from "../Input";
import { toast } from "sonner";

interface DialogProps {
  concertId: string;
  disabled: boolean;
}

export function Dialog({ concertId, disabled }: DialogProps) {
  const user = useContext(AuthContext);
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PostSchema>) => {
    const postId = uuidv4();
    const apiURL = `${process.env.NEXT_PUBLIC_CREATE_POST}/${postId}`;
    const data = {
      post_id: postId,
      concert_id: concertId,
      user_id: user.userId,
      title: "Lorem Ipsum",
      content: values.content,
    };
    const response = await backendAxiosPost(apiURL, data);
    if (response.code === 201) {
      toast.success("Added a new post!");
      setOpen(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <ShadcnDialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" disabled={disabled}>
            Add Post
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4">
              <Input
                control={form.control}
                type="string"
                nameField="content"
                title="Add a Post"
                placeholder="e.g What are you guys wearing later?"
              />
            </div>
            <DialogFooter>
              <Button type="submit" variant="dark">
                Add Post
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </ShadcnDialog>
    </Form>
  );
}
