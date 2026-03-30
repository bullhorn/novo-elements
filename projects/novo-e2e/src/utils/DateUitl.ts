export const dateRegex: RegExp = /[\n\u202F\u00A0]/g;

export async function handleDatesAndEmptyDates(changeNegativeNumbersArray): Promise<Array<any>> {
  const textIsDate = (strDate) =>
    /[^\d]/g.test(strDate) &&
    (strDate.includes('/') || (/\d/g.test(strDate) && strDate.includes(':'))) &&
    Date.parse(strDate.replace(dateRegex, ' '));
  const convertStrToMilliseconds = (strDate) => Date.parse(strDate.replace(dateRegex, ' '));
  return changeNegativeNumbersArray
    ? changeNegativeNumbersArray.map((item) =>
        item === ''
          ? textIsDate(item)
            ? convertStrToMilliseconds('1/1/1901')
            : item
          : textIsDate(item)
            ? convertStrToMilliseconds(item)
            : item,
      )
    : [];
}
