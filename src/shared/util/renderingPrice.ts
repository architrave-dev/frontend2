export const renderingPrice = (price: string): string => {
  if (price === "") return "";
  if (price === "$ ") return "";
  const newPrice = digitGrouping(price);
  if (newPrice.startsWith("$")) return newPrice;

  return "$ " + newPrice;
};

const digitGrouping = (price: string): string => {
  price = price.replaceAll(",", "");
  price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return price;
};

export const cleanUpPrice = (price: string): string => {
  price = price.replace("$ ", "").replaceAll(",", "");
  return price;
};
