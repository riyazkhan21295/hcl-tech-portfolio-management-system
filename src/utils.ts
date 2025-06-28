export const formatCurrency = (value: number | string) =>
  `$${parseFloat(value as string).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
