export function numberWithCommas(number) {
  if (number)
    return `Rs. ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ")}`;
}
