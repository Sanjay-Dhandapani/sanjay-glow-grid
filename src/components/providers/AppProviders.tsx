import { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";
import { MotionProvider } from "@/providers/MotionProvider";
import { LenisProvider } from "@/hooks/useLenis";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <MotionProvider>
        <LenisProvider>{children}</LenisProvider>
      </MotionProvider>
    </ThemeProvider>
  );
}

export default AppProviders;