import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import ThemeProvider from "@/theme/index";
import { AuthProvider } from "@/context/auth-context";

export const metadata = {
  title: "hiublue",
  description:
    "Hiublue is a platform that offers unlimited SMS and iMessage integration, designed to streamline and enhance your messaging campaigns.",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang='en' suppressHydrationWarning>
        <body>
          <InitColorSchemeScript attribute='class' />
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {props.children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
