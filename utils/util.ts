export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses son 0-indexados en JavaScript
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const validateUserID = () => {
  const userID = sessionStorage.getItem("userID");

  if (userID === "" || userID === null || userID === undefined) {
    window.location.href = "/";
  }
};
