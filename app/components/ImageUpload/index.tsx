export function InputFile({ onChange }: any) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 ">
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="cursor-pointer flex h-14 w-full rounded-md border border-input bg-background px-5 py-4 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}
