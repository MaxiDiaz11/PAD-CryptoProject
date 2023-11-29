import React, { FC } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { PropsTable, TablePaginationActionsProps } from "@/interfaces";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useTable } from "@/hooks/useTable";
import { CustomDialog } from "../ui/CustomDialog";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const theme = useTheme();

  const {
    count,
    handleFirstPageButtonClick,
    handleLastPageButtonClick,
    handleNextButtonClick,
    page,
    rowsPerPage,
    handleBackButtonClick,
  } = useTable(props);

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

const CustomPaginationActionsTable: FC<PropsTable> = ({
  dataTable,
  titleTableCoins,
  isFavorite,
  isCustom,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [listItem, setListItem] = React.useState({
    coinId: "",
    coinName: "",
  });

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

  const addListemToList = (name: string, id: number) => {
    setListItem({
      coinId: id.toString(),
      coinName: name,
    });
    setOpenDialog(true);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 5 }}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {titleTableCoins.map((title: string) => (
                <TableCell key={title} align="center">
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? dataTable.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : dataTable
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row" align="center">
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.symbol}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  $ {row.price}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.percent_change_24h < 0 ? (
                    <Container
                      sx={{
                        display: "flex",
                        textAlign: "center",
                        alignContent: "center",
                      }}
                    >
                      <ArrowDownwardIcon color="error" />
                      <Typography color={"error"} fontWeight="bold">
                        {row.percent_change_24h}
                      </Typography>
                    </Container>
                  ) : (
                    <Container sx={{ display: "flex" }}>
                      <ArrowUpwardIcon color="success" />
                      <Typography color="green" fontWeight="bold">
                        {row.percent_change_24h}
                      </Typography>
                    </Container>
                  )}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.last_updated}
                </TableCell>

                {isCustom && (
                  <TableCell style={{ width: 160 }} align="center">
                    <Button onClick={() => addListemToList(row.name, row.id)}>
                      {isFavorite ? <RemoveCircleIcon /> : <AddCircleIcon />}
                    </Button>
                  </TableCell>
                )}
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
          buttonText={"Agregar a lista"}
          content={"Agrega tu moneda a una de tus listas"}
          handleClose={() => setOpenDialog(false)}
          open={true}
          title={"Agregar a lista"}
          isAdding={true}
          listItem={listItem}
        ></CustomDialog>
      )}
    </>
  );
};

export default CustomPaginationActionsTable;
