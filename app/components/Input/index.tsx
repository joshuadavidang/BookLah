import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input as ShadcnInput } from "@/components/ui/input";

interface InputProps {
  control: any;
  nameField: string;
  title: string;
  placeholder: string;
  type: string;
  handleChange?: any;
}

export default function Input({
  control,
  nameField,
  title,
  type,
  placeholder,
  handleChange,
}: InputProps) {
  return (
    <FormField
      control={control}
      name={nameField}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <h1 className="text-xl pb-3">{title}</h1>
          </FormLabel>
          <FormControl>
            <ShadcnInput
              type={type}
              placeholder={placeholder}
              onChangeCapture={handleChange}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
