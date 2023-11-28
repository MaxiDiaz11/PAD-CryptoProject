import { TablePaginationActionsProps } from "@/interfaces";

export const useTable = (props: TablePaginationActionsProps) => {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return {
    count,
    page,
    rowsPerPage,
    onPageChange,
    handleFirstPageButtonClick,
    handleBackButtonClick,
    handleNextButtonClick,
    handleLastPageButtonClick,
  };
};
