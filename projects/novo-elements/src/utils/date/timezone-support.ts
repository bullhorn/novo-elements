/** 
 * Copyright © 2018-2022 Ferdinand Prantl
 * https://www.npmjs.com/package/timezone-support
 **/

const formattingToken = /(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?|DD?|d|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g;
const formatTokenFunctions = {}
const formatters = {}

export function formatZonedTime(time, format) {
  let formatter = formatters[format];
  if (!formatter) {
    formatter = formatters[format] = makeFormatter(format);
  }
  return formatter(time);
}

function makeFormatter (format) {
  const array = format.match(formattingToken);
  const { length } = array;
  for (let i = 0; i < length; ++i) {
    const token = array[i];
    const formatter = formatTokenFunctions[token];
    if (formatter) {
      array[i] = formatter;
    } else {
      array[i] = token.replace(/^\[|\]$/g, '');
    }
  }
  return function (time) {
    let output = '';
    for (const token of array) {
      output += typeof token === 'function' ? token.call(time) : token;
    }
    return output;
  }
}

const addFormatToken = function (token, padded, property) {
  const callback = typeof property === 'string' ? function () {
    return this[property];
  } : property;
  if (token) {
    formatTokenFunctions[token] = callback;
  }
  if (padded) {
    formatTokenFunctions[padded[0]] = function () {
      return padWithZeros(callback.call(this), padded[1]);
    }
  }
}

addFormatToken('A', 0, function () { return this.hours < 12 ? 'AM' : 'PM' })
addFormatToken('a', 0, function () { return this.hours < 12 ? 'am' : 'pm' })
addFormatToken('S', 0, function () { return Math.floor(this.milliseconds / 100) })
addFormatToken(0, ['SS', 2], function () { return Math.floor(this.milliseconds / 10) })
addFormatToken(0, ['SSS', 3], 'milliseconds')
addFormatToken('s', ['ss', 2], 'seconds')
addFormatToken('m', ['mm', 2], 'minutes')
addFormatToken('h', ['hh', 2], function () { return (this.hours % 12) || 12 })
addFormatToken('H', ['HH', 2], 'hours')
addFormatToken('d', 0, 'dayOfWeek')
addFormatToken('D', ['DD', 2], 'day')
addFormatToken('M', ['MM', 2], 'month')
addFormatToken(0, ['YY', 2], function () { return this.year % 100 })
addFormatToken('Y', ['YYYY', 4], 'year')
addFormatToken('z', 0, function () { return this.zone.abbreviation })

function addTimeZoneFormatToken (token, separator) {
  addFormatToken(token, 0, function () {
    let offset = -this.zone.offset;
    const sign = offset < 0 ? '-' : '+';
    offset = Math.abs(offset);
    return sign + padWithZeros(Math.floor(offset / 60), 2) + separator + padWithZeros(offset % 60, 2);
  })
}

addTimeZoneFormatToken('Z', ':')
addTimeZoneFormatToken('ZZ', '')

function padWithZeros (number, length) {
  return padToN[length](number);
}

const padToN = [ undefined, undefined, padToTwo, padToThree, padToFour ]

function padToTwo (number) {
  return number > 9 ? number : '0' + number;
}

function padToThree (number) {
  return number > 99 ? number : number > 9 ? '0' + number : '00' + number;
}

function padToFour (number) {
  return number > 999 ? number : number > 99 ? '0' + number : number > 9 ? '00' + number : '000' + number;
}
