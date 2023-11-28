export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

export interface PropsTable {
  titleTableCoins: string[];
  dataTable: any[];
  isFavorite: boolean;
  isCustom: boolean;
}
