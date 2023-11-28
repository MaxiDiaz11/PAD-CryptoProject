import React from "react";
import { ShopLayout } from "@/components/layouts";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import NextLink from "next/link";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullName", headerName: "Nombre", width: 300 },
  {
    field: "paid",
    headerName: "Pagada",
    description: "Estado de orden",
    width: 200,
    renderCell: (params) =>
      params.value ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      ),
  },
  {
    field: "goToOrder",
    headerName: "Ver orden",
    width: 300,
    renderCell: (params) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
          <Link underline="always">Ver orden</Link>
        </NextLink>
      );
    },
    sortable: false,
  },
];

const rows: GridRowsProp = [
  { id: 1, fullName: "Maxi Diaz", paid: true },
  { id: 2, fullName: "Maxi Diaz", paid: false },
  { id: 3, fullName: "Maxi Diaz", paid: true },
  { id: 4, fullName: "Maxi Diaz", paid: false },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title={"Historial de ordenes"}
      pageDescription={"Historial de ordenes del cliente"}
    >
      <Typography variant="h1" component={"h1"}>
        Historial de ordenes
      </Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, widht: "100%" }}>
          <DataGrid
            columns={columns}
            rows={rows}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
          ></DataGrid>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
