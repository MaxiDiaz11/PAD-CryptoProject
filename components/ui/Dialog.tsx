import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useCryptoService } from "@/services/cryptoService";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setListName("");
    setSuccess(false);
  }, []);

  const { createList } = useCryptoService();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    if (field === "name") {
      setListName(e.target.value);
    }
  };

  const createListCrypto = () => {
    if (listName === "") {
      setError(true);
      return;
    }
    setError(false);

    createList(listName).then((response) => {
      if (response.success) {
        setSuccess(true);
        setListName("");
        setTimeout(() => {
          handleClose();
          setSuccess(false);
        }, 3000);
      }
    });
  };

  return (
    <Fragment>
      <Container sx={{ display: "flex", justifyContent: "right" }}>
        <Button
          color="secondary"
          className="circular-btn"
          size="large"
          onClick={handleClickOpen}
        >
          Crear lista
        </Button>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear lista</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Crea tu lista personalizada de criptomonedas
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre de la lista"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => handleInputChange(e, "name")}
          />

          {error && (
            <Typography variant="body1" color="error" textAlign={"center"}>
              El nombre de la lista no puede estar vacío
            </Typography>
          )}

          {success && (
            <Alert severity="success" sx={{ mt: 4 }}>
              ¡Lista creada con éxito!
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={createListCrypto}>Guardar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
