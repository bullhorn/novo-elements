/** 
 * Copyright © 2022 Sasha Koss
 * https://www.npmjs.com/package/@date-fns/upgrade
 **/

type TokensMap = {
  [v1token: string]: string
}

const tokensMap: TokensMap = {
  // 'D MMMM': '',
  // 'Do MMMM': '',
  // 'DD MMMM': '',
  M: 'L',
  Mo: 'Mo',
  MM: 'LL',
  MMM: 'LLL',
  MMMM: 'LLLL',
  Q: 'q',
  Qo: 'qo',
  D: 'd',
  Do: 'do',
  DD: 'dd',
  DDD: 'D',
  DDDo: 'Do',
  DDDD: 'DDD',
  d: 'i',
  do: 'io',
  dd: 'iiiiii',
  ddd: 'iii',
  dddd: 'iiii',
  A: 'a',
  a: 'a',
  aa: 'aaaa',
  E: 'i',
  W: 'I',
  Wo: 'Io',
  WW: 'II',
  YY: 'yy',
  YYYY: 'yyyy',
  GG: 'RR',
  GGGG: 'RRRR',
  H: 'H',
  HH: 'HH',
  h: 'h',
  hh: 'hh',
  m: 'm',
  mm: 'mm',
  s: 's',
  ss: 'ss',
  S: 'S',
  SS: 'SS',
  SSS: 'SSS',
  Z: 'xxx',
  ZZ: 'xx',
  X: 't',
  x: 'T'
}

const v1tokens = Object.keys(tokensMap)
  .sort()
  .reverse()

const tokensRegExp = new RegExp(
  '(\\[[^\\[]*\\])|(\\\\)?' + '(' + v1tokens.join('|') + '|.)',
  'g'
)

type TokensBuffer = {
  formatBuffer: string[]
  textBuffer: string[]
}

export function convertTokens(format: string): string {
  const tokensCaptures = format.match(tokensRegExp)
  if (tokensCaptures) {
    return tokensCaptures
      .reduce(
        (acc, tokenString, index) => {
          const v2token = tokensMap[tokenString]

          if (!v2token) {
            const escapedCaptures = tokenString.match(/^\[(.+)\]$/)
            if (escapedCaptures) {
              acc.textBuffer.push(escapedCaptures[1])
            } else {
              acc.textBuffer.push(tokenString)
            }
          }

          const endOfString = index === tokensCaptures.length - 1
          if (acc.textBuffer.length && (v2token || endOfString)) {
            acc.formatBuffer.push(`'${acc.textBuffer.join('')}'`)
            acc.textBuffer = []
          }

          if (v2token) acc.formatBuffer.push(v2token)

          return acc
        },
        { formatBuffer: [], textBuffer: [] } as TokensBuffer
      )
      .formatBuffer.join('')
  } else {
    return format
  }
}