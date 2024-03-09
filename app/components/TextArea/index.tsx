import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea as ShadcnTextArea } from "@/components/ui/textarea";

interface TextAreaProps {
  control: any;
  nameField: string;
  title: string;
  placeholder: string;
}

export default function TextArea({
  control,
  nameField,
  title,
  placeholder,
}: TextAreaProps) {
  return (
    <FormField
      control={control}
      name={nameField}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <h1 className="text-2l pb-3">{title}</h1>
          </FormLabel>
          <FormControl>
            <ShadcnTextArea placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
