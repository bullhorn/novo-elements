/** 
 * Copyright © 2022 Sasha Koss
 * https://www.npmjs.com/package/@date-fns/upgrade
 **/

import { isDate } from 'date-fns'

const MILLISECONDS_IN_HOUR = 3600000
const MILLISECONDS_IN_MINUTE = 60000
const DEFAULT_ADDITIONAL_DIGITS = 2

const parseTokenDateTimeDelimeter = /[T ]/
const parseTokenPlainTime = /:/

// year tokens
const parseTokenYY = /^(\d{2})$/
const parseTokensYYY = [
  /^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
]

const parseTokenYYYY = /^(\d{4})/
const parseTokensYYYYY = [
  /^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
]

// date tokens
const parseTokenMM = /^-(\d{2})$/
const parseTokenDDD = /^-?(\d{3})$/
const parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/
const parseTokenWww = /^-?W(\d{2})$/
const parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/

// time tokens
const parseTokenHH = /^(\d{2}([.,]\d*)?)$/
const parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/
const parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/

// timezone tokens
const parseTokenTimezone = /([Z+-].*)$/
const parseTokenTimezoneZ = /^(Z)$/
const parseTokenTimezoneHH = /^([+-])(\d{2})$/
const parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/

export type LegacyParseOptions = {
  additionalDigits?: 0 | 1 | 2
}

export function legacyParse(
  argument: any,
  options: LegacyParseOptions = {}
): Date {
  if (isDate(argument)) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime())
  } else if (typeof argument !== 'string') {
    return new Date(argument)
  }

  const additionalDigits =
    options.additionalDigits == null
      ? DEFAULT_ADDITIONAL_DIGITS
      : Number(options.additionalDigits)

  const dateStrings = splitDateString(argument)

  const parseYearResult = parseYear(dateStrings.date || '', additionalDigits)
  const year = parseYearResult.year
  const restDateString = parseYearResult.restDateString

  const date = parseDate(restDateString || '', year)

  if (date) {
    const timestamp = date.getTime()
    let time = 0
    let offset

    if (dateStrings.time) {
      time = parseTime(dateStrings.time) || 0
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone) * MILLISECONDS_IN_MINUTE
    } else {
      const fullTime = timestamp + time
      const fullTimeDate = new Date(fullTime)

      offset = getTimezoneOffsetInMilliseconds(fullTimeDate)

      // Adjust time when it's coming from DST
      const fullTimeDateNextDay = new Date(fullTime)
      fullTimeDateNextDay.setDate(fullTimeDate.getDate() + 1)
      const offsetDiff =
        getTimezoneOffsetInMilliseconds(fullTimeDateNextDay) -
        getTimezoneOffsetInMilliseconds(fullTimeDate)
      if (offsetDiff > 0) {
        offset += offsetDiff
      }
    }

    return new Date(timestamp + time + offset)
  } else {
    return new Date(argument)
  }
}

type DateStrings = {
  date: string | undefined
  time: string | undefined
  timezone: string | undefined
}

export function splitDateString(dateString: string): DateStrings {
  const array = dateString.split(parseTokenDateTimeDelimeter)
  let timeString;
  let date;
  let time;
  let timezone;

  if (parseTokenPlainTime.test(array[0])) {
    date = undefined
    timeString = array[0]
  } else {
    date = array[0]
    timeString = array[1]
  }

  if (timeString) {
    const token = parseTokenTimezone.exec(timeString)
    if (token) {
      time = timeString.replace(token[1], '')
      timezone = token[1]
    } else {
      time = timeString
    }
  }

  return {
    date,
    time,
    timezone
  }
}

function parseYear(dateString: string, additionalDigits: number) {
  const parseTokenYYY = parseTokensYYY[additionalDigits]
  const parseTokenYYYYY = parseTokensYYYYY[additionalDigits]

  let token

  // YYYY or ±YYYYY
  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString)
  if (token) {
    const yearString = token[1]
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    }
  }

  // YY or ±YYY
  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString)
  if (token) {
    const centuryString = token[1]
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    }
  }

  // Invalid ISO-formatted year
  return {
    year: null
  }
}

function parseDate(dateString: string, year: number | null) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null
  }

  let token
  let date
  let month
  let week

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0)
    date.setUTCFullYear(year)
    return date
  }

  // YYYY-MM
  token = parseTokenMM.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    date.setUTCFullYear(year, month)
    return date
  }

  // YYYY-DDD or YYYYDDD
  token = parseTokenDDD.exec(dateString)
  if (token) {
    date = new Date(0)
    const dayOfYear = parseInt(token[1], 10)
    date.setUTCFullYear(year, 0, dayOfYear)
    return date
  }

  // YYYY-MM-DD or YYYYMMDD
  token = parseTokenMMDD.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    const day = parseInt(token[2], 10)
    date.setUTCFullYear(year, month, day)
    return date
  }

  // YYYY-Www or YYYYWww
  token = parseTokenWww.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    return dayOfISOYear(year, week)
  }

  // YYYY-Www-D or YYYYWwwD
  token = parseTokenWwwD.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    const dayOfWeek = parseInt(token[2], 10) - 1
    return dayOfISOYear(year, week, dayOfWeek)
  }

  // Invalid ISO-formatted date
  return null
}

function parseTime(timeString: string) {
  let token
  let hours
  let minutes

  // hh
  token = parseTokenHH.exec(timeString)
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR
  }

  // hh:mm or hhmm
  token = parseTokenHHMM.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseFloat(token[2].replace(',', '.'))
    return (
      (hours % 24) * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE
    )
  }

  // hh:mm:ss or hhmmss
  token = parseTokenHHMMSS.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseInt(token[2], 10)
    const seconds = parseFloat(token[3].replace(',', '.'))
    return (
      (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE +
      seconds * 1000
    )
  }

  // Invalid ISO-formatted time
  return null
}

function parseTimezone(timezoneString: string) {
  let token
  let absoluteOffset

  // Z
  token = parseTokenTimezoneZ.exec(timezoneString)
  if (token) {
    return 0
  }

  // ±hh
  token = parseTokenTimezoneHH.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60
    return token[1] === '+' ? -absoluteOffset : absoluteOffset
  }

  // ±hh:mm or ±hhmm
  token = parseTokenTimezoneHHMM.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10)
    return token[1] === '+' ? -absoluteOffset : absoluteOffset
  }

  return 0
}

function dayOfISOYear(isoYear: number, week = 0, day = 0) {
  const date = new Date(0)
  date.setUTCFullYear(isoYear, 0, 4)
  const fourthOfJanuaryDay = date.getUTCDay() || 7
  const diff = week * 7 + day + 1 - fourthOfJanuaryDay
  date.setUTCDate(date.getUTCDate() + diff)
  return date
}

function getTimezoneOffsetInMilliseconds(dirtyDate: Date) {
  const date = new Date(dirtyDate.getTime())
  const baseTimezoneOffset = date.getTimezoneOffset()
  date.setSeconds(0, 0)
  const millisecondsPartOfTimezoneOffset =
    date.getTime() % MILLISECONDS_IN_MINUTE

  return (
    baseTimezoneOffset * MILLISECONDS_IN_MINUTE +
    millisecondsPartOfTimezoneOffset
  )
}