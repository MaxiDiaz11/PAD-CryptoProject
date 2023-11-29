import React from "react";
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import NextLink from "next/link";

export const NavBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <NextLink href={"/cryptocurrencies"} passHref legacyBehavior>
          <Link display={"flex"} alignItems={"center"}>
            <Typography variant="h6">PAD |</Typography>
            <Typography sx={{ ml: 0.5 }}>Crypto</Typography>
          </Link>
        </NextLink>

        <Box flex={1}></Box>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NextLink
            href={"/cryptocurrencies/myCryptos"}
            passHref
            legacyBehavior
          >
            <Link>
              <Button>Cryptocurrencies lists</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1}></Box>

        <NextLink href={"/"} passHref legacyBehavior>
          <Link>
            <Button>Cerrar sesión</Button>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
