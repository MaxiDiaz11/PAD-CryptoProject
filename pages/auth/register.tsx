import React, { useState, ChangeEvent } from "react";
import { AuthLayout } from "@/components/layouts";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useCryptoService } from "@/services/cryptoService";
import { INewUser } from "@/interfaces";
import NextLink from "next/link";

const RegisterPage = () => {
  const [user, setUser] = useState<INewUser>({
    name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [error, setError] = useState(false);
  const [formError, setFormError] = useState(false);

  const { createUser } = useCryptoService();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    if (field === "name") {
      setUser({ ...user, name: e.target.value });
      setFormErrors({ ...formErrors, name: e.target.value.trim() === "" });
    } else if (field === "email") {
      setUser({ ...user, email: e.target.value });
      setFormErrors({
        ...formErrors,
        email: !/\S+@\S+\.\S+/.test(e.target.value),
      });
    } else if (field === "password") {
      setUser({ ...user, password: e.target.value });
      setFormErrors({ ...formErrors, password: e.target.value.trim() === "" });
    }
  };

  const register = async () => {
    if (user.name === "" || user.email === "" || user.password === "") {
      setError(true);
      return;
    }
    setError(false);

    if (formErrors.name || formErrors.email || formErrors.password) {
      setFormError(true);
      return;
    }

    setFormError(false);

    const response = await createUser(user);

    console.log({ response }); // Continuar con el registro
  };

  return (
    <AuthLayout title={"Registro"}>
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component={"h1"} textAlign={"center"}>
              Crear cuenta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              error={formErrors.name}
              label="Nombre completo"
              variant="filled"
              fullWidth
              onChange={(e) => handleInputChange(e, "name")}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              error={formErrors.email}
              label="Correo"
              type="email"
              variant="filled"
              fullWidth
              onChange={(e) => handleInputChange(e, "email")}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              error={formErrors.password}
              label="Contraseña"
              type="password"
              variant="filled"
              fullWidth
              onChange={(e) => handleInputChange(e, "password")}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            {error && (
              <Typography variant="body1" color="error" textAlign={"center"}>
                Todos los campos son requeridos
              </Typography>
            )}
            {formError && (
              <Typography variant="body1" color="error" textAlign={"center"}>
                Algunos campos tienen errores
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
              onClick={() => register()}
            >
              Crear cuenta
            </Button>
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent={"center"}>
            <NextLink href={"/auth/login"} legacyBehavior passHref>
              <Link underline="always">¿Ya tienes una cuenta?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
