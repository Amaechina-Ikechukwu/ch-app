function GetFullDate(sentTimestamp: number): string {
  const date = new Date(sentTimestamp);
  const currentDate = new Date(); // Current date
  const formattedDate = date.toDateString(); // Convert the date to a string format

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedTime = `${hours}:${minutes}`;

  // Check if the message was sent today
  if (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    return `Today at ${formattedTime}`;
  }

  // Check if the message was sent yesterday
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return `Yesterday at ${formattedTime}`;
  }

  // For any other day, return the formatted date along with the time
  return `${formattedDate} at ${formattedTime}`;
}

export default GetFullDate;
