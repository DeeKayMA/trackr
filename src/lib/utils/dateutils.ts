export function convertToUTC(date?: Date | null): string | null {
  if (date instanceof Date && !isNaN(date.getTime())) {
    const fixedDate = new Date(date);
    fixedDate.setHours(12, 0, 0, 0); // Noon to avoid timezone rollover
    return new Date(fixedDate.getTime() - fixedDate.getTimezoneOffset() * 60000).toISOString();
  }

  return null;
}
export function convertFromUTC(utcString: string): Date {
  const d = new Date(utcString);
  return new Date(d.getTime() + d.getTimezoneOffset() * 60000);
}



