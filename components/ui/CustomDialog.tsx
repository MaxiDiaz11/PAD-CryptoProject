import React, { FC, Fragment, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useCryptoService } from "@/services/cryptoService";
import { CustomList, PropsDialog } from "@/interfaces";

export const CustomDialog: FC<PropsDialog> = ({
  content,
  handleClose,
  isAdding,
  isDeleting,
  isDeletingItem,
  itemId,
  listId,
  listItem,
  open,
  title,
}) => {
  const [success, setSuccess] = useState(false);
  const [listCoins, setListCoins] = useState<CustomList[]>([] as any);
  const selectedIndex = 1;

  const { getLists, createItem, deleteList, deleteItem } = useCryptoService();

  useEffect(() => {
    const UserId = sessionStorage.getItem("userID");

    if (!UserId) return console.log("no hay usuario");

    if (isAdding) {
      getLists(UserId).then((response) => {
        setListCoins(response.customLists);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleListItemClick = (idList: string) => {
    if (listItem) {
      const { coinId, coinName } = listItem;

      createItem(coinId, coinName, idList).then((response) => {
        if (response.success) {
          setSuccess(true);
          setTimeout(() => {
            handleClose();
            setSuccess(false);
          }, 3000);
        }
      });
    }
  };

  const deleteCustomList = (idList: string) => {
    deleteList(idList).then((response) => {
      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          handleClose();
          setSuccess(false);
          window.location.reload();
        }, 3000);
      }
    });
  };

  const deleteItemListe = (itemId: string) => {
    deleteItem(itemId).then((response) => {
      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          handleClose();
          setSuccess(false);
          window.location.reload();
        }, 3000);
      }
    });
  };

  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
          {isAdding && (
            <List>
              {listCoins.map((list) => {
                let contador = 0;
                return (
                  <ListItemButton
                    selected={selectedIndex === contador++}
                    onClick={() => handleListItemClick(list.id)}
                    key={list.id}
                  >
                    <ListItemText primary={list.name.toUpperCase()} />
                  </ListItemButton>
                );
              })}
            </List>
          )}

          {success && isAdding && (
            <Alert severity="success" sx={{ mt: 4 }}>
              ¡Moneda añadida con éxito!
            </Alert>
          )}

          {success && isDeleting && (
            <Alert severity="success" sx={{ mt: 4 }}>
              ¡Lista eliminada con éxito!
            </Alert>
          )}

          {success && isDeletingItem && (
            <Alert severity="success" sx={{ mt: 4 }}>
              Moneda eliminada con éxito!
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          {isDeleting && listId && (
            <Button onClick={() => deleteCustomList(listId)}>Eliminar</Button>
          )}

          {isDeletingItem && (
            <Button onClick={() => deleteItemListe(itemId!)}>Eliminar</Button>
          )}
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
