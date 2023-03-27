export const isDateGreaterThanNow = (dateString:string) => {
  const inputDate = new Date(dateString);
  const now = new Date();
  return inputDate > now;
}