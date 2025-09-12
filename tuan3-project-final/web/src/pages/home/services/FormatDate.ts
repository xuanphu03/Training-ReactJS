export const formatDate = (date: Date) => {
  const dateObj = date as unknown as { seconds: number; nanoseconds: number };
  const dateChange = new Date(
    dateObj.seconds * 1000 + dateObj.nanoseconds / 1e6,
  );
  console.log(dateChange);
  return `${dateChange.getHours()}:${dateChange.getMinutes()}:${dateChange.getSeconds()} ${dateChange.getDate()}/${dateChange.getMonth() + 1}/${dateChange.getFullYear()}`;
};
