function convertTimestampToTime(sentTimestamp: string): string {
  const date = new Date(sentTimestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
}
export default convertTimestampToTime;
