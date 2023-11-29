import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import { useCryptoService } from "@/services/cryptoService";
import { CustomList } from "@/interfaces";
import { CustomDialog } from "./CustomDialog";
import { FavoriteTable } from "../cryptos";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const CryptoList = () => {
  const [listCoins, setListCoins] = useState<CustomList[]>([] as any);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteListDialog, setDeleteListDialog] = React.useState(false);
  const [listID, setListID] = React.useState("");
  const [dataTable, setDataTable] = useState<any[] | undefined>([]);
  const [isListEmpty, setIsListEmpty] = useState(false);

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

  const createDataCrypto = (name: string, id: string) => {
    return {
      name,
      id,
    };
  };

  const getDataTable = (name: string) => {
    const data = listCoins.find((list) => list.name === name);

    if (!data?.listItems.length) setIsListEmpty(true);

    setDataTable(data?.listItems);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    name: string
  ) => {
    setSelectedIndex(index);
    getDataTable(name);
  };

  const rowsTable = dataTable!.map((crypto) => {
    const { name, id } = crypto;
    return createDataCrypto(name, id);
  });

  const deleteCustomList = (id: string) => {
    setDeleteListDialog(true);
    setOpenDialog(true);
    setListID(id);
  };

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
                <Container
                  sx={{ display: "flex", justifyContent: "space-between" }}
                  key={list.id}
                >
                  <div className="col">
                    <ListItemButton
                      selected={selectedIndex === contador++}
                      onClick={(event) =>
                        handleListItemClick(event, contador, list.name)
                      }
                    >
                      <ListItemText
                        primary={list.name.toUpperCase()}
                        sx={{ textAlign: "center" }}
                      />
                    </ListItemButton>
                  </div>
                  <div className="col">
                    <ListItemButton onClick={() => deleteCustomList(list.id)}>
                      <ListItemText
                        primary={"Eliminar"}
                        sx={{ mr: 1, fontWeight: "bold" }}
                      ></ListItemText>
                      <HighlightOffIcon />
                    </ListItemButton>
                  </div>
                </Container>
              );
            })}
          </List>
        </Demo>

        {rowsTable.length !== 0 && <FavoriteTable dataTable={rowsTable} />}
        {rowsTable.length === 0 && isListEmpty && (
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            No hay monedas para mostrar
          </Typography>
        )}

        {openDialog && deleteListDialog && (
          <CustomDialog
            buttonText={"Eliminar lista"}
            content={"¿Estás seguro que deseas eliminar esta lista?"}
            handleClose={() => setOpenDialog(false)}
            isDeleting={true}
            listId={listID}
            open={true}
            title={"Eliminar lista"}
          ></CustomDialog>
        )}
      </Grid>
    </Grid>
  );
};
