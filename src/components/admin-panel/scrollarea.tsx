export function ScrollArea({ children }: { children: React.ReactNode }) {
  return <div className="border rounded-md relative flex-1 flex flex-col min-h-[400px] max-h-[calc(100vh-280px)]">{children}</div>;
}
