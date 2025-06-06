// Converts a local Date object to a UTC ISO string
// export function convertToUTC(date: Date | string): string {
//   const d = new Date(date);
//   return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString();
// }

export function convertToUTC(date: Date): string {
  const fixedDate = new Date(date);
  fixedDate.setHours(12, 0, 0, 0); // Set to noon to avoid timezone issues
  return new Date(fixedDate.getTime() - fixedDate.getTimezoneOffset() * 60000).toISOString();
}
// Converts a UTC date string to a local Date object
export function convertFromUTC(utcString: string): Date {
  const d = new Date(utcString);
  return new Date(d.getTime() + d.getTimezoneOffset() * 60000);
}

