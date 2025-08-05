// Function to get the current date and time in DD/MM/YYYY HH:MM format
const createdAt = () => {
  const now = new Date(); // Get the current date and time

  // Helper function to pad single-digit numbers with a leading zero
  const pad = (n) => (n < 10 ? '0' + n : n);

  const day = pad(now.getDate());          // Get day and pad if needed
  const month = pad(now.getMonth() + 1);   // Get month (0-based, so add 1) and pad
  const year = now.getFullYear();          // Get full year

  const hours = pad(now.getHours());       // Get hours and pad
  const minutes = pad(now.getMinutes());   // Get minutes and pad

  // Return the formatted date and time
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

module.exports = createdAt;