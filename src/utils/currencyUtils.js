function formatCurrency(amount, currency) {
  return new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export default formatCurrency;
