// MOVED FOR BUILD ISSUES WITH ESM
///////////////////////////////////////////////////////////////////////////////
/** @preserve
/////    CoLoR PaRsLeY  🎨 🌿  a simple set of color parsing thingies!
/////           Beta 0.1.5   Revision date: April 25, 2022
/////
/////    Functions to parse color values and return array
/////    Copyright © 2019-2022 by Andrew Somers. All Rights Reserved.
/////    LICENSE: AGPL 3
/////    CONTACT: Please use the ISSUES or DISCUSSIONS tab at:
/////    https://github.com/Myndex/colorparsley/
/////
///////////////////////////////////////////////////////////////////////////////
/////
/////    IMPORT:
/////    import { colorParsley } from 'colorparsley';
/////
/////    let rgbaArray = colorParsley('#abcdef');
/////
/////    Output as array:  [r,g,b,a,isValid,colorspace]
/////    Example: [123,123,123,1.0,true,'sRGB']
// */
///////////////////////////////////////////////////////////////////////////////

// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name colorparsley.min.js
// @code_url https://raw.githubusercontent.com/Myndex/colorparsley/master/src/colorparsley.js
// ==/ClosureCompiler==

//
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
/////  BEGIN COLOR PARSLEY 0.1.5  BLOCK  \/////////////////////////////////////
////                                      \///////////////////////////////////
///                                        \/////////////////////////////////

/////  ƒ  colorParsley()  ///////////////////////////////////////////////////

//export
function colorParsley(colorIn) {
  if (typeof colorIn === "string") {
    return parseString(colorIn);
  } else if (typeof colorIn === "number") {
    return [
      (colorIn & 0xff0000) >> 16,
      (colorIn & 0x00ff00) >> 8,
      colorIn & 0x0000ff,
      "",
      true,
      "unknown",
    ];
  } else if (typeof colorIn === "object") {
    if (Array.isArray(colorIn)) {
      return colorIn;
    } else if (!isNaN(colorIn.r) || !isNaN(colorIn.red)) {
      // validate object & return array
      let objArray = [0, 0, 0, "", false, "unknown"];
      // takes object with r g b or red green blue etc...
      objArray[0] = colorIn.r ? colorIn.r : colorIn.red ? colorIn.red : false;
      objArray[1] = colorIn.g
        ? colorIn.g
        : colorIn.green
        ? colorIn.green
        : false;
      objArray[2] = colorIn.b ? colorIn.b : colorIn.blue ? colorIn.blue : false;
      objArray[3] = colorIn.a ? colorIn.a : colorIn.alpha ? colorIn.alpha : "";
      objArray[4] = objArray[0] && objArray[1] && objArray[2] ? true : false;
      objArray[5] = colorIn.space
        ? colorIn.space
        : colorIn.colorSpace
        ? colorIn.colorSpace
        : colorIn.colorspace
        ? colorIn.colorspace
        : "unknown";

      return objArray;
    }
  } // End if statement
  console.log("colorParsley error: invalid input");
  return [0, 0, 0, 0, false, "inputError"]; // throw 'InvalidInput' // return error
}

/////  ƒ  parseString()  ///////////////////////////////////////////////////

function parseString(colorString = "#abcdef") {
  // strip junk and make a clean string (replace unmatched)
  // This retains all alphanumeric and , . # % ( ) /
  colorString = colorString.replace(/[^\w,.#%()\/ -]/g, "");
  colorString = colorString.toLowerCase(); // set lowercase

  this.isValid = false; // validation flag, in array element [4]
  this.type = "sRGB"; // Default colorspace flag in element [5]

  // test for named color before iterating array (is optimization needed?)
  if (colorString.match(/^(?:(?!rgb|l.h|hs|col|\d|#).{0,4})(?=[g-z])/)) {
    ///// CSS4 NAMED COLORS plus a bonus set of GREYS and GRAYS /////////////

    // See if name is matched and overwrite the input
    let namedColors = {
      gray0: "000000",
      gray1: "111111",
      gray2: "222222",
      gray3: "333333",
      gray4: "444444",
      gray5: "555555",
      gray6: "666666",
      gray7: "777777",
      gray8: "888888",
      gray9: "999999",
      graya: "aaaaaa",
      grayb: "bbbbbb",
      grayc: "cccccc",
      grayd: "dddddd",
      graye: "eeeeee",
      grayf: "ffffff",
      midgray: "a0a0a0",
      grey0: "000000",
      grey1: "111111",
      grey2: "222222",
      grey3: "333333",
      grey4: "444444",
      grey5: "555555",
      grey6: "666666",
      grey7: "777777",
      grey8: "888888",
      grey9: "999999",
      greya: "aaaaaa",
      greyb: "bbbbbb",
      greyc: "cccccc",
      greyd: "dddddd",
      greye: "eeeeee",
      greyf: "ffffff",
      midgrey: "a0a0a0",
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "00ffff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000000",
      blanchedalmond: "ffebcd",
      blue: "0000ff",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "00ffff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "ff00ff",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "778899",
      lightslategrey: "778899",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "00ff00",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "ff00ff",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "663399",
      red: "ff0000",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "ffffff",
      whitesmoke: "f5f5f5",
      yellow: "ffff00",
      yellowgreen: "9acd32",
    };

    for (let key in namedColors) {
      if (colorString == key) {
        colorString = namedColors[key];
        break;
      }
    }
  } // end of named colors section

  let retArray = [0, 0, 0, "", this.isValid, this.type];

  // NEW regex parse  0.1.4
  // See docs for breakdown of regex pattern
  let colorRex = {
    rex: /(?:^(?:#|0x|)(?:(?:([\da-f])([\da-f])([\da-f])([\da-f])?)(?!\S)|(?:([\da-f]{2})(?:([\da-f]{2})([\da-f]{2})([\da-f]{2})?)?))|(?:^(?:(?:rgba?|)\(? ?(?:(?:(?:(255|(?:25[0-4]|2[0-4]\d|1?\d{1,2})(?:\.\d{1,24})?)))(?:, ?| )(?:(?:(255|(?:25[0-4]|2[0-4]\d|1?\d{1,2})(?:\.\d{1,24})?)(?:, ?| )(255|(?:25[0-4]|2[0-4]\d|1?\d{1,2})(?:\.\d{1,24})?))?)|(100%|\d{1,2}(?:\.\d{1,24})?%)(?:, ?| )(?:(100%|\d{1,2}(?:\.\d{1,24})?%)(?:, ?| )(100%|\d{1,2}(?:\.\d{1,24})?%))))|^(?:color\((srgb|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020|xyz|xyz-d50|xyz-d65) (?:(100%|\d{1,2}(?:\.\d{1,24})?%|[0 ]\.\d{1,24}|[01])) (?:(100%|\d{1,2}(?:\.\d{1,24})?%|[0 ]\.\d{1,24}|[01])) (?:(100%|\d{1,2}(?:\.\d{1,24})?%|[0 ]\.\d{1,24}|[01])))|^(?:((?:r(?!gb)|c(?!olor)|[abd-qs-z]|[^\d\W])[a-z]{2,5})\( ?((?:\d{0,3}\.|)\d{1,24}%?)(?:, ?| )((?:\d{0,3}\.|)\d{1,24}%?)(?:, ?| )((?:\d{0,3}\.|)\d{1,24}%?)))(?:(?:,| \/) ?(?:(100%|\d{1,2}(?:\.\d{1,24})?%|[0 ]\.\d{1,24}|[01])))?(?:\)| |))(?!\S) ?$/,

    parsley: function (slices) {
      let slicePos = 0;
      let sliceLast = 0;
      let base = 10;
      let divisor = 100.0;
      let alpha = "1";

      if (slices[23]) {
        alpha = slices[23];
        delete slices[23];
      }

      retArray[3] = alpha.match(/%/g)
        ? parseFloat(alpha) / divisor
        : parseFloat(alpha);

      for (k = 1; k < slices.length; k++) {
        //  determine first and last element
        if (slices[k]) {
          slicePos = slicePos ? slicePos : k;
          sliceLast = k;
          // console.log(slicePos + ' pos ' + sliceLast);
        }
      }

      // console.log(slices);

      switch (sliceLast) {
        case 4: // This is the 3-4 digit hex parsing
          base = 16;
          divisor = 15.0;
          retArray[3] = parseInt(slices[sliceLast], base) / divisor;
        case 3:
          base = 16;
          for (i = 0; i < 3; i++) {
            retArray[i] = parseInt(
              slices[slicePos + i] + slices[slicePos + i],
              base
            );
          }
          break;

        case 5: // allows two digit hex to become grey
          base = 16;
        case 9: // allows 1-3 digit INT with comma to become grey
          retArray[0] =
            retArray[1] =
            retArray[2] =
              base == 10
                ? parseFloat(slices[sliceLast])
                : parseInt(slices[sliceLast], base);
          break;

        case 8: // These are the main parsings for hex and rgb()
          base = 16;
          divisor = 255.0;
          retArray[3] = parseInt(slices[8], base) / divisor;
        case 7:
          base = 16;
        case 11:
          for (i = 0; i < 3; i++) {
            retArray[i] =
              base == 10
                ? parseFloat(slices[slicePos + i])
                : parseInt(slices[slicePos + i], base);
          }
          break;

        case 18: // This is for color() CSS 4
          retArray[5] = slices[15];

          for (i = 0; i < 3; i++) {
            slicePos++;
            retArray[i] = slices[slicePos].match(/%/g)
              ? parseFloat(slices[slicePos]) / 100.0
              : parseFloat(slices[slicePos]);
          }
          break;

        case 22: //  This is for the "wild west" section
          retArray[5] = slices[slicePos];

          for (i = 0; i < 3; i++) {
            slicePos++;
            retArray[i] = slices[slicePos]
              ? slices[slicePos].match(/%/g)
                ? parseFloat(slices[slicePos]) / 100.0
                : parseFloat(slices[slicePos])
              : 0.0;
          }

          // Process for HSL and HWB
          if (retArray[5].match(/^(?:hsla?|hwba?)/i)) {
            let sat, light, white, black, hwbFact;

            let hue = retArray[0] % 360.0;
            if (hue < 0) {
              hue += 360.0;
            }

            if (retArray[5].match(/^hsla?/i)) {
              sat = retArray[1];
              light = retArray[2];
              white = 0;
              hwbFact = 1;
            } else if (retArray[5].match(/^hwba?/i)) {
              white = retArray[1];
              black = retArray[2];

              if (white + black >= 1) {
                retArray[0] =
                  retArray[1] =
                  retArray[2] =
                    white / (white + black);
                retArray[5] = "sRGB";
                break;
              }

              sat = 1.0;
              light = 0.5;
              hwbFact = 1.0 - white - black;
            }

            function f(n) {
              // from CSS reference implementation
              let k = (n + hue / 30) % 12;
              let a = sat * Math.min(light, 1 - light);
              return light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
            }

            retArray[0] = Math.round(255 * (f(0) * hwbFact + white));
            retArray[1] = Math.round(255 * (f(8) * hwbFact + white));
            retArray[2] = Math.round(255 * (f(4) * hwbFact + white));
            retArray[5] = "sRGB";
          }
          break;
      }
    }, // close parsley subfunction
  }; // close colorRex obj

  //  The main call
  let slicesProc = colorRex.rex.exec(colorString);

  if (slicesProc) {
    // Error catch
    this.isValid = true;
    colorRex.parsley(slicesProc);
    retArray[4] = true; // set the isValid flag

    return retArray;
  } else {
    this.isValid = false;
    console.log("colorParsley error: unable to parse string");
    return [0, 0, 0, 0, this.isValid, "parsleyError"]; // throw 'InvalidString'
  }
}

////////////////////////////////////////////////////////////////////////////////
/////  BONUS STRING FORMATTING UTILITIES  \////////////////////////////////////

/////  ƒ  colorToHex()  ///////////////////////////////////////////////////

// returns hex string, 3,4,6, or 8 chars if that was entered, no #
// If alpha is 1 or empty, no alpha is returned i.e. abcf returns abc

//export
function colorToHex(rgba = [0, 0, 0, ""], allow3 = true) {
  let R = rgba[0].toString(16).padStart(2, "0");
  let G = rgba[1].toString(16).padStart(2, "0");
  let B = rgba[2].toString(16).padStart(2, "0");
  let A =
    rgba[3] == "" || rgba[3] == 1
      ? ""
      : Math.round(rgba[3] * 255)
          .toString(16)
          .padStart(2, "0");

  // this if returns a 3 character hex if possible - aabbcc becomes abc
  if (
    allow3 &&
    rgba[0] % 17 == 0 &&
    rgba[1] % 17 == 0 &&
    rgba[2] % 17 == 0 &&
    A == ""
  ) {
    return R.charAt(0) + G.charAt(0) + B.charAt(0);
  } else {
    return R + G + B + A;
  }
}

/////  ƒ  colorToRGB()  ///////////////////////////////////////////////////

// RGBAstr — returns rgb() or rgba() INT value string (0-255) no spaces
// If alpha is 1 or empty, no alpha is returned

//export
function colorToRGB(rgba = [0, 0, 0, ""]) {
  return rgba[3] == "" || rgba[3] == 1
    ? "rgb(" + rgba[0] + "," + rgba[1] + "," + rgba[2] + ")"
    : "rgba(" + rgba[0] + "," + rgba[1] + "," + rgba[2] + "," + rgba[3] + ")";
}

/////  ƒ  hslToRgb()  ///////////////////////////////////////////////////

//// Unused, built into the string parser, here for reference
function hslToRgb(hue, sat, light) {
  // CSS4 reference implementation
  hue = hue % 360;
  if (hue < 0) {
    hue += 360;
  }
  sat /= 100.0;
  light /= 100.0;
  function f(n) {
    let k = (n + hue / 30) % 12;
    let a = sat * Math.min(light, 1 - light);
    return light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  }
  return [f(0), f(8), f(4)]; // returns  0.0 - 1.0
}

/////  ƒ  hwbToRgb()  ///////////////////////////////////////////////////

//// Unused, built into the string parser, here for reference
function hwbToRgb(hue, white, black) {
  // CSS4 reference implementation
  white /= 100.0;
  black /= 100.0;
  if (white + black >= 1) {
    let gray = white / (white + black);
    return [gray, gray, gray];
  }
  let rgb = hslToRgb(hue, 100.0, 50.0);
  for (let i = 0; i < 3; i++) {
    rgb[i] *= 1 - white - black;
    rgb[i] += white;
  }
  return rgb; // returns  0.0 - 1.0
}

/////\  END UTILITIES  ///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

//* // MOD.EXP COMMENT SWITCH FOR LOCAL TESTING /////

module.exports = { colorParsley, colorToHex, colorToRGB };

// */  ///// END COMMENT SWITCH /////

///\                                      //////////////////////////////////////
////\                                    //////////////////////////////////////
/////\  END COLOR PARSLEY 0.1.5  BLOCK  //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
