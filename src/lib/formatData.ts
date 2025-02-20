export function formatPercentageChange(change: number) {
  const absChange = Math.abs(change);
  const fractionalPart = absChange.toFixed(1).toString().split(".")[1];

  if (Number(fractionalPart) < 1) {
    return `${absChange.toFixed()}%`;
  } else {
    return `${absChange.toFixed(1)}%`; // One decimal place
  }
}
