import React, { FC, useEffect } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { TablePaginationActions } from ".";
import { CustomDialog } from "../ui/CustomDialog";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Link from "next/link";

interface Props {
  dataTable: any;
  isCustom?: boolean;
}

export const FavoriteTable: FC<Props> = ({ dataTable }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [itemID, setItemID] = React.useState("");

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataTable.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteItemListe = (id: string) => {
    setOpenDialog(true);
    setItemID(id);
  };

  const titleTableCoins = ["Nombre", "Ver más", "Eliminar de mi lista"];

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 5 }}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {titleTableCoins.map((title: string) => {
                if (title === "Ver más") {
                  return (
                    <TableCell key={title} align="center">
                      {title}
                    </TableCell>
                  );
                }
                return <TableCell key={title}>{title}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? dataTable.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : dataTable
            ).map((row: any) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  <Link
                    href={{
                      pathname: `https://coinmarketcap.com/es/currencies/${row.name}/`,
                    }}
                    target="_blank"
                  >
                    <CurrencyExchangeIcon />
                  </Link>
                </TableCell>

                <TableCell style={{ width: 160 }} align="center">
                  <Button onClick={() => deleteItemListe(row.id)}>
                    <RemoveCircleIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={dataTable.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {openDialog && (
        <CustomDialog
          buttonText={"Eliminar de mi lista"}
          content={"¿Estás seguro que deseas eliminar esta moneda de tu lista?"}
          handleClose={() => setOpenDialog(false)}
          isDeletingItem={true}
          itemId={itemID}
          open={true}
          title={"Eliminar de esta lista"}
        ></CustomDialog>
      )}
    </>
  );
};
