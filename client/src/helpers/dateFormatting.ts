import moment from "moment";

export function formatDateString(dateString: string): string {
  const date: Date = new Date(dateString.replace(" ", "T"));
  return moment(date).format("LLL");
}
