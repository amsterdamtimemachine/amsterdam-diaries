export default function (date: string) {
  // Check if date is valid or date is a specific year like "1940"
  return !isNaN(Date.parse(date)) && !/^\d{4}$/.test(date);
}
