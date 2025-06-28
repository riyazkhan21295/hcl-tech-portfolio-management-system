export function formatDateToDMY(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = String(date.getUTCFullYear()).slice(-2); // Get last 2 digits

  return `${day}/${month}/${year}`;
}
