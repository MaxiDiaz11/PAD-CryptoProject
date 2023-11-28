import React, { useEffect, useState } from "react";
import {
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import { useCryptoService } from "@/services/cryptoService";
import { CustomList } from "@/interfaces";

export const CryptoList = () => {
  const [listCoins, setListCoins] = useState<CustomList[]>([] as any);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    name: string
  ) => {
    setSelectedIndex(index);
    getDataTable(name);
  };

  const { getLists } = useCryptoService();

  useEffect(() => {
    const UserId = sessionStorage.getItem("userID");

    if (!UserId) return console.log("no hay usuario");

    getLists(UserId).then((response) => {
      setListCoins(response.customLists);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const titleTableCoins = [
    "Nombre",
    "Símbolo",
    "Máximo de suministro",
    "Fecha de creación",
    "Agregar a favoritos",
  ];

  const createDateCrypto = (
    name: string,
    symbol: string,
    maxSupply: number,
    dateAdded: string
  ) => {
    return {
      name,
      symbol,
      maxSupply,
      dateAdded,
    };
  };

  const getDataTable = (name: string) => {
    const data = listCoins.find((list) => list.name === name);
    return data?.listItems;
  };

  //   const rowsTable = dataTable.map((crypto) => {
  //     const { name, symbol, maxSupply, dateAdded } = crypto;
  //     return createDateCrypto(
  //       name,
  //       symbol,
  //       maxSupply,
  //       formatDate(new Date(dateAdded))
  //     );
  //   });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Mis listas
        </Typography>
        <Demo sx={{ width: "100%" }}>
          <List>
            {listCoins.map((list) => {
              let contador = 0;
              return (
                <ListItemButton
                  selected={selectedIndex === contador++}
                  onClick={(event) =>
                    handleListItemClick(event, contador, list.name)
                  }
                  key={list.id}
                >
                  <ListItemText primary={list.name.toUpperCase()} />
                </ListItemButton>
              );
            })}
          </List>
        </Demo>

        {/*TODO: SEE dataTable*/}
        {/* <CustomPaginationActionsTable
      titleTableCoins={titleTableCoins}
      dataTable={rowsTable}
      isFavorite={false}
      isCustom={false}
    /> */}
      </Grid>
    </Grid>
  );
};
