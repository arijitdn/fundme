export function formatINR(amount: number) {
  if (amount >= 10000000) {
    // 1 Crore and above
    return `₹ ${(amount / 10000000).toFixed(2)}Cr`;
  } else if (amount >= 100000) {
    // 1 Lakh and above
    return `₹ ${(amount / 100000).toFixed(2)}L`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}
