import type { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-primary/30 via-cyan-500/10 to-background">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
