import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as ShadcnSelect,
} from "@/components/ui/select";

interface SelectProps {
  selectedValue?: string;
  control: any;
  nameField: string;
  placeholder: string;
  formLabel: string;
  values: string[];
}

export default function Select({
  selectedValue,
  control,
  nameField,
  placeholder,
  formLabel,
  values,
}: SelectProps) {
  return (
    <FormField
      control={control}
      name={nameField}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <h1 className="text-xl pb-3">{formLabel}</h1>
          </FormLabel>
          <ShadcnSelect
            onValueChange={field.onChange}
            defaultValue={selectedValue}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {values.map((value, i) => (
                <SelectItem key={i} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </ShadcnSelect>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
