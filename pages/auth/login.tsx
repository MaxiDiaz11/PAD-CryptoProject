import React, { ChangeEvent, useState, useEffect } from "react";
import { AuthLayout } from "@/components/layouts";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { ILoginUser } from "@/interfaces";
import { useCryptoService } from "@/services/cryptoService";
import { useRouter } from "next/router";
import NextLink from "next/link";

const LoginPage = () => {
  useEffect(() => {
    sessionStorage.removeItem("userID");
    setUser({ email: "", password: "" });
  }, []);

  const router = useRouter();
  const [user, setUser] = useState<ILoginUser>({
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

  const { login } = useCryptoService();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    if (field === "email") {
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

  const loginUser = async () => {
    if (user.email === "" || user.password === "") {
      setError(true);
      return;
    }
    setError(false);

    if (formErrors.name || formErrors.email || formErrors.password) {
      setFormError(true);
      return;
    }

    setFormError(false);

    const response = await login(user);
    const { id, success } = response;

    if (success) {
      setUser({ email: "", password: "" });
      sessionStorage.setItem("userID", id);
      router.push("/cryptocurrencies");
    }
  };

  return (
    <AuthLayout title={"Ingresar"}>
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component={"h1"} textAlign={"center"}>
              Iniciar sesión
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              error={formErrors.email}
              value={user.email}
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
              value={user.password}
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
              onClick={() => loginUser()}
            >
              Ingresar
            </Button>
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent={"center"}>
            <NextLink href={"/auth/register"} legacyBehavior passHref>
              <Link underline="always">¿No tienes cuenta?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
