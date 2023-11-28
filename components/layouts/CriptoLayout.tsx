import React, { FC } from "react";
import Head from "next/head";
import { NavBar } from "../ui";

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const CryptoLayout: FC<Props> = ({
  children,
  pageDescription,
  title,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl}></meta>}
      </Head>
      <nav>
        <NavBar></NavBar>
      </nav>

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        {children}
      </main>

      <footer>{/* TODO: footer */}</footer>
    </>
  );
};
