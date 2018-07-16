// NG2
import { Injectable, Pipe, PipeTransform } from '@angular/core';

// Rule storage - pluralize and singularize need to be run sequentially,
// while other rules can be optimized using an object for instant lookups.
let pluralRules = [];
let singularRules = [];
let uncountables = {};
let irregularPlurals = {};
let irregularSingles = {};

/**
 * Title case a string.
 * @param str
 */
function toTitleCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}

/**
 * Sanitize a pluralization rule to a usable regular expression.
 */
function sanitizeRule(rule: RegExp | string): RegExp {
  if (typeof rule === 'string') {
    return new RegExp('^' + rule + '$', 'i');
  }
  return rule;
}

/**
 * Pass in a word token to produce a function that can replicate the case on
 * another word.
 */
function restoreCase(word: string, token: string): string {
  // Upper cased words. E.g. "HELLO".
  if (word === word.toUpperCase()) {
    return token.toUpperCase();
  }

  // Title cased words. E.g. "Title".
  if (word[0] === word[0].toUpperCase()) {
    return toTitleCase(token);
  }

  // Lower cased words. E.g. "test".
  return token.toLowerCase();
}

/**
 * Interpolate a regexp string.
 */
function interpolate(str: string, args: any[]): string {
  return str.replace(/\$(\d{1,2})/g, (match, index) => {
    return args[index] || '';
  });
}

/**
 * Sanitize a word by passing in the word and sanitization rules.
 */
function sanitizeWord(token: string, word: string, collection: RegExp[]): string {
  // Empty string or doesn't need fixing.
  if (!token.length || uncountables.hasOwnProperty(token)) {
    return word;
  }

  let len = collection.length;
  // Iterate over the sanitization rules and use the first one to match.
  while (len--) {
    let rule = collection[len];
    // If the rule passes, return the replacement.
    if (rule[0].test(word)) {
      return word.replace(rule[0], (match, index, words) => {
        let result = interpolate(rule[1], [match, index, words]);
        if (match === '') {
          return restoreCase(words[index - 1], result);
        }
        return restoreCase(match, result);
      });
    }
  }
  return word;
}

/**
 * Replace a word with the updated word.
 */
function replaceWord(replaceMap: any, keepMap: any, rules: any[]): Function {
  return (word) => {
    // Get the correct token and case restoration functions.
    let token = word.toLowerCase();

    // Check against the keep object map.
    if (keepMap.hasOwnProperty(token)) {
      return restoreCase(word, token);
    }

    // Check against the replacement map for a direct word replacement.
    if (replaceMap.hasOwnProperty(token)) {
      return restoreCase(word, replaceMap[token]);
    }

    // Run all the rules against the word.
    return sanitizeWord(token, word, rules);
  };
}

class Pluralize {
  static pluralize(word, count = 1, inclusive?) {
    let pluralized = count === 1 ? Pluralize.singular(word) : Pluralize.plural(word);
    return (inclusive ? `${count} ` : '') + pluralized;
  }

  static singular(word) {
    return replaceWord(irregularSingles, irregularPlurals, pluralRules)(word);
  }

  static plural(word) {
    return replaceWord(irregularPlurals, irregularSingles, singularRules)(word);
  }

  static addPluralRule(rule, replacement) {
    pluralRules.push([sanitizeRule(rule), replacement]);
  }

  static addSingularRule(rule, replacement) {
    singularRules.push([sanitizeRule(rule), replacement]);
  }

  static addUncountableRule(word) {
    if (typeof word === 'string') {
      uncountables[word.toLowerCase()] = true;
      return;
    }

    // Set singular and plural references for the word.
    Pluralize.addPluralRule(word, '$0');
    Pluralize.addSingularRule(word, '$0');
  }

  static addIrregularRule(single, plural) {
    let one = plural.toLowerCase();
    let many = single.toLowerCase();

    irregularSingles[one] = many;
    irregularPlurals[many] = one;
  }
}

/**
 * Irregular rules.
 */
[
  // Pronouns.
  ['I', 'we'],
  ['me', 'us'],
  ['he', 'they'],
  ['she', 'they'],
  ['them', 'them'],
  ['myself', 'ourselves'],
  ['yourself', 'yourselves'],
  ['itself', 'themselves'],
  ['herself', 'themselves'],
  ['himself', 'themselves'],
  ['themself', 'themselves'],
  ['is', 'are'],
  ['this', 'these'],
  ['that', 'those'],
  // Words ending in with a consonant and `o`.
  ['echo', 'echoes'],
  ['dingo', 'dingoes'],
  ['volcano', 'volcanoes'],
  ['tornado', 'tornadoes'],
  ['torpedo', 'torpedoes'],
  // Ends with `us`.
  ['genus', 'genera'],
  ['viscus', 'viscera'],
  // Ends with `ma`.
  ['stigma', 'stigmata'],
  ['stoma', 'stomata'],
  ['dogma', 'dogmata'],
  ['lemma', 'lemmata'],
  ['schema', 'schemata'],
  ['anathema', 'anathemata'],
  // Other irregular rules.
  ['ox', 'oxen'],
  ['axe', 'axes'],
  ['die', 'dice'],
  ['yes', 'yeses'],
  ['foot', 'feet'],
  ['eave', 'eaves'],
  ['goose', 'geese'],
  ['tooth', 'teeth'],
  ['quiz', 'quizzes'],
  ['human', 'humans'],
  ['proof', 'proofs'],
  ['carve', 'carves'],
  ['valve', 'valves'],
  ['thief', 'thieves'],
  ['genie', 'genies'],
  ['groove', 'grooves'],
  ['pickaxe', 'pickaxes'],
  ['whiskey', 'whiskies'],
].forEach((rule) => {
  return Pluralize.addIrregularRule(rule[0], rule[1]);
});

/**
 * Pluralization rules.
 */
[
  [/s?$/i, 's'],
  [/([^aeiou]ese)$/i, '$1'],
  [/(ax|test)is$/i, '$1es'],
  [/(alias|[^aou]us|tlas|gas|ris)$/i, '$1es'],
  [/(e[mn]u)s?$/i, '$1s'],
  [/([^l]ias|[aeiou]las|[emjzr]as|[iu]am)$/i, '$1'],
  [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
  [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
  [/(seraph|cherub)(?:im)?$/i, '$1im'],
  [/(her|at|gr)o$/i, '$1oes'],
  [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
  [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
  [/sis$/i, 'ses'],
  [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
  [/([^aeiouy]|qu)y$/i, '$1ies'],
  [/([^ch][ieo][ln])ey$/i, '$1ies'],
  [/(x|ch|ss|sh|zz)$/i, '$1es'],
  [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
  [/(m|l)(?:ice|ouse)$/i, '$1ice'],
  [/(pe)(?:rson|ople)$/i, '$1ople'],
  [/(child)(?:ren)?$/i, '$1ren'],
  [/eaux$/i, '$0'],
  [/m[ae]n$/i, 'men'],
  ['thou', 'you'],
].forEach((rule) => {
  return Pluralize.addPluralRule(rule[0], rule[1]);
});

/**
 * Singularization rules.
 */
[
  [/s$/i, ''],
  [/(ss)$/i, '$1'],
  [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(?:sis|ses)$/i, '$1sis'],
  [/(^analy)(?:sis|ses)$/i, '$1sis'],
  [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
  [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
  [/([^aeiouy]|qu)ies$/i, '$1y'],
  [/(^[pl]|zomb|^(?:neck)?t|[aeo][lt]|cut)ies$/i, '$1ie'],
  [/(\b(?:mon|smil))ies$/i, '$1ey'],
  [/(m|l)ice$/i, '$1ouse'],
  [/(seraph|cherub)im$/i, '$1'],
  [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|tlas|gas|(?:her|at|gr)o|ris)(?:es)?$/i, '$1'],
  [/(e[mn]u)s?$/i, '$1'],
  [/(movie|twelve)s$/i, '$1'],
  [/(cris|test|diagnos)(?:is|es)$/i, '$1is'],
  [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
  [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
  [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
  [/(alumn|alg|vertebr)ae$/i, '$1a'],
  [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
  [/(matr|append)ices$/i, '$1ix'],
  [/(pe)(rson|ople)$/i, '$1rson'],
  [/(child)ren$/i, '$1'],
  [/(eau)x?$/i, '$1'],
  [/men$/i, 'man'],
].forEach((rule) => {
  return Pluralize.addSingularRule(rule[0], rule[1]);
});

/**
 * Uncountable rules.
 */
[
  // Singular words with no plurals.
  'advice',
  'adulthood',
  'agenda',
  'aid',
  'alcohol',
  'ammo',
  'athletics',
  'bison',
  'blood',
  'bream',
  'buffalo',
  'butter',
  'carp',
  'cash',
  'chassis',
  'chess',
  'clothing',
  'commerce',
  'cod',
  'cooperation',
  'corps',
  'digestion',
  'debris',
  'diabetes',
  'energy',
  'equipment',
  'elk',
  'excretion',
  'expertise',
  'flounder',
  'fun',
  'gallows',
  'garbage',
  'graffiti',
  'headquarters',
  'health',
  'herpes',
  'highjinks',
  'homework',
  'housework',
  'information',
  'jeans',
  'justice',
  'kudos',
  'labour',
  'literature',
  'machinery',
  'mackerel',
  'media',
  'mews',
  'moose',
  'music',
  'news',
  'pike',
  'plankton',
  'pliers',
  'pollution',
  'premises',
  'rain',
  'research',
  'rice',
  'salmon',
  'scissors',
  'series',
  'sewage',
  'shambles',
  'shrimp',
  'species',
  'staff',
  'swine',
  'trout',
  'traffic',
  'transporation',
  'tuna',
  'wealth',
  'welfare',
  'whiting',
  'wildebeest',
  'wildlife',
  'you',
  // Regexes.
  /pox$/i, // "chickpox", "smallpox"
  /ois$/i,
  /deer$/i, // "deer", "reindeer"
  /fish$/i, // "fish", "blowfish", "angelfish"
  /sheep$/i,
  /measles$/i,
  /[^aeiou]ese$/i, // "chinese", "japanese"
].forEach(Pluralize.addUncountableRule);

@Pipe({ name: 'plural' })
@Injectable()
export class PluralPipe implements PipeTransform {
  transform(value) {
    return Pluralize.pluralize(value);
  }
}
