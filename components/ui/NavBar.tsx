import React from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

export const NavBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <NextLink href={"/"} passHref legacyBehavior>
          <Link display={"flex"} alignItems={"center"}>
            <Typography variant="h6">PAD |</Typography>
            <Typography sx={{ ml: 0.5 }}>Crypto</Typography>
          </Link>
        </NextLink>

        <Box flex={1}></Box>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NextLink href={"/cryptocurrencies/myCryptos"} passHref legacyBehavior>
            <Link>
              <Button>Cryptocurrencies</Button>
            </Link>
          </NextLink>
          <NextLink href={"/favorites"} passHref legacyBehavior>
            <Link>
              <Button>Favorites</Button>
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
