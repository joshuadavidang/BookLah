import { Command, CommandInput } from "@/components/ui/command";

interface ConcertSearchProp {
  placeholder: string;
  onChange: (e: any) => void;
}

export default function ConcertSearch({
  placeholder,
  onChange,
}: ConcertSearchProp) {
  return (
    <Command>
      <CommandInput placeholder={placeholder} onChangeCapture={onChange} />
    </Command>
  );
}
