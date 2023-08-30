import Head from "next/head";
import { FC, ReactElement } from "react";
import { Navbar } from "../ui";

type Props = {
  children: ReactElement;
  title?: string;
};

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Fernando Barrios" />
        <meta
          name="description"
          content={`Información sobre el pokémon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta
          property="og:description"
          content={`Esta es la página sobre ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.jpeg`} />
      </Head>

      <Navbar />

      <main style={{ padding: "0 20px" }}>{children}</main>
    </>
  );
};
