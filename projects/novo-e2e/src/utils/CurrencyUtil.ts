export async function negativeCurrencyToNegativeNumber(filteredArray): Promise<Array<any>> {
  const isNegativeCurrency = (item) => /^[(]+[\d|.|,]*[)]+$/g.test(item);
  const convertNegativeCurrencyToNegativeNumber = (item) => `-${item.replace(/[(),]/g, '')}`;
  return filteredArray
    ? filteredArray.map((item) => (isNegativeCurrency(item) ? convertNegativeCurrencyToNegativeNumber(item) : item))
    : [];
}
