import { ISizes } from "@/interfaces";
import { Box, Button } from "@mui/material";
import React, { FC } from "react";

interface Props {
  selectedSize?: ISizes;
  sizes: ISizes[];
}

export const ProductSizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button key={size} color={selectedSize === size ? "primary" : "info"}>
          {size}
        </Button>
      ))}
    </Box>
  );
};
