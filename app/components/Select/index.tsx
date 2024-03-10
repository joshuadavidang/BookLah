import { FormItem, FormLabel } from "@/components/ui/form";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as ShadcnSelect,
} from "@/components/ui/select";

interface SelectProps {
  formLabel: string;
}

export default function Select({ formLabel }: SelectProps) {
  return (
    <FormItem>
      <FormLabel>
        <h1 className="text-xl pb-3">{formLabel}</h1>
      </FormLabel>
      <ShadcnSelect>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Category 1" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Category 1</SelectItem>
          <SelectItem value="dark">Category 2</SelectItem>
          <SelectItem value="system">Category 3</SelectItem>
        </SelectContent>
      </ShadcnSelect>
    </FormItem>
  );
}
