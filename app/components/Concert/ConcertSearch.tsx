import { Command, CommandInput } from "@/components/ui/command";

interface ConcertSearchProp {
  onChange: (e: any) => void;
}

export default function ConcertSearch({ onChange }: ConcertSearchProp) {
  return (
    <Command>
      <CommandInput
        placeholder="Search for a concert"
        onChangeCapture={onChange}
      />
    </Command>
  );
}
