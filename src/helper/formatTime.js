export const formatTime = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const isPM = hours >= 12;
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = String(minutes).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes} ${isPM ? "PM" : "AM"}`;
};
// Adds hours to a time, returns "HH:MM:SS".
export const calculateNewTime = (time, hoursToAdd) => {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  date.setHours(date.getHours() + hoursToAdd);
  return date.toTimeString().split(" ")[0];
};
// Compare flight time with current time
export const checkDate = (flight) => {
  const scheduleDate = new Date(flight.scheduleDateTime);
  const comparisonDate = new Date(); //today date

  const isSameDateOrBefore = scheduleDate <= comparisonDate;
  return isSameDateOrBefore;
};
