"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import MultipleSelector from "@/components/ui/multi-select";

interface MultiSelectProps {
  control: any;
  nameField: string;
  options: any;
  placeholder: string;
  formLabel: string;
}

const MultiSelect = ({
  control,
  nameField,
  formLabel,
  options,
  placeholder,
}: MultiSelectProps) => {
  return (
    <FormField
      control={control}
      name={nameField}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <h1 className="text-xl pb-3">{formLabel}</h1>
          </FormLabel>
          <FormControl>
            <MultipleSelector
              value={field.value}
              onChange={field.onChange}
              defaultOptions={options}
              placeholder={placeholder}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
              hidePlaceholderWhenSelected
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
export default MultiSelect;
