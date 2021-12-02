import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { Colors, ComponentStyleConfig } from "@chakra-ui/theme";
import { Styles } from "@chakra-ui/theme-tools";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { state, ZustandProvider } from "../lib/data/state";

type ColorMode = "light" | "dark";

export default function VrlWebApp({ Component, pageProps }: AppProps): JSX.Element {
  let config: ThemeConfig;
  let mode: ColorMode;

  useEffect(() => {
    mode = window.matchMedia('(prefers-color-schema: dark)').matches ? "dark" : "light";

    config = {
      initialColorMode: mode,
    };
  });

  const colors: Colors = {
    primary: "#28d9f2"
  };

  const components: ComponentStyleConfig = {};

  const styles: Styles = {};

  const theme = extendTheme({ colors, components, config, styles });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          VRL Web
        </title>
      </Head>

      <ChakraProvider theme={theme}>
        <ZustandProvider initialStore={state}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ZustandProvider>
      </ChakraProvider>
    </>
  );
}