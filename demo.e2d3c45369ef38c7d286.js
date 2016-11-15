webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.main = main;
	
	var _core = __webpack_require__(2);
	
	var _platformBrowserDynamic = __webpack_require__(156);
	
	var _novoElementsDemo = __webpack_require__(360);
	
	// Enable prod mode
	if (true) {
	    (0, _core.enableProdMode)();
	}
	
	/**
	 * Bootstrap via function to ensure DOM is ready
	 */
	
	// APP
	// NG2
	function main() {
	    return (0, _platformBrowserDynamic.platformBrowserDynamic)().bootstrapModule(_novoElementsDemo.NovoElementsDemoModule);
	}
	
	document.addEventListener('DOMContentLoaded', main);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vbWFpbi5icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O1FBY2dCLEksR0FBQSxJOztBQWJoQjs7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksUUFBUSxZQUFaLEVBQTBCO0FBQ3RCO0FBQ0g7O0FBRUQ7Ozs7QUFSQTtBQUhBO0FBY08sU0FBUyxJQUFULEdBQWdCO0FBQ25CLFdBQU8sc0RBQXlCLGVBQXpCLDBDQUFQO0FBQ0g7O0FBRUQsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsSUFBOUMiLCJmaWxlIjoibWFpbi5icm93c2VyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ29kaS9ub3ZvLWRldi9saWJzL25vdm8tZWxlbWVudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IGVuYWJsZVByb2RNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0VsZW1lbnRzRGVtb01vZHVsZSB9IGZyb20gJy4vbm92by1lbGVtZW50cy1kZW1vLm1vZHVsZSc7XG5cbi8vIEVuYWJsZSBwcm9kIG1vZGVcbmlmIChFTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICAgIGVuYWJsZVByb2RNb2RlKCk7XG59XG5cbi8qKlxuICogQm9vdHN0cmFwIHZpYSBmdW5jdGlvbiB0byBlbnN1cmUgRE9NIGlzIHJlYWR5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICAgIHJldHVybiBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljKCkuYm9vdHN0cmFwTW9kdWxlKE5vdm9FbGVtZW50c0RlbW9Nb2R1bGUpO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgbWFpbik7XG4iXX0=

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Color = __webpack_require__(361);
	
	Object.keys(_Color).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Color[key];
	    }
	  });
	});
	
	var _Composition = __webpack_require__(362);
	
	Object.keys(_Composition).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Composition[key];
	    }
	  });
	});
	
	var _Iconography = __webpack_require__(363);
	
	Object.keys(_Iconography).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Iconography[key];
	    }
	  });
	});
	
	var _Typography = __webpack_require__(364);
	
	Object.keys(_Typography).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Typography[key];
	    }
	  });
	});
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZGVzaWduL2FsbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pnb2RpL25vdm8tZGV2L2xpYnMvbm92by1lbGVtZW50cyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gJy4vY29sb3IvQ29sb3InO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb3NpdGlvbi9Db21wb3NpdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL2ljb25vZ3JhcGh5L0ljb25vZ3JhcGh5JztcbmV4cG9ydCAqIGZyb20gJy4vdHlwb2dyYXBoeS9UeXBvZ3JhcGh5JztcbiJdfQ==

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ButtonDemo = __webpack_require__(365);
	
	Object.keys(_ButtonDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _ButtonDemo[key];
	    }
	  });
	});
	
	var _LoadingDemo = __webpack_require__(378);
	
	Object.keys(_LoadingDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _LoadingDemo[key];
	    }
	  });
	});
	
	var _CardDemo = __webpack_require__(367);
	
	Object.keys(_CardDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _CardDemo[key];
	    }
	  });
	});
	
	var _ToastDemo = __webpack_require__(389);
	
	Object.keys(_ToastDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _ToastDemo[key];
	    }
	  });
	});
	
	var _TooltipDemo = __webpack_require__(390);
	
	Object.keys(_TooltipDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _TooltipDemo[key];
	    }
	  });
	});
	
	var _HeaderDemo = __webpack_require__(376);
	
	Object.keys(_HeaderDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _HeaderDemo[key];
	    }
	  });
	});
	
	var _TabsDemo = __webpack_require__(386);
	
	Object.keys(_TabsDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _TabsDemo[key];
	    }
	  });
	});
	
	var _TilesDemo = __webpack_require__(387);
	
	Object.keys(_TilesDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _TilesDemo[key];
	    }
	  });
	});
	
	var _ModalDemo = __webpack_require__(159);
	
	Object.keys(_ModalDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _ModalDemo[key];
	    }
	  });
	});
	
	var _QuickNoteDemo = __webpack_require__(380);
	
	Object.keys(_QuickNoteDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _QuickNoteDemo[key];
	    }
	  });
	});
	
	var _RadioDemo = __webpack_require__(381);
	
	Object.keys(_RadioDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _RadioDemo[key];
	    }
	  });
	});
	
	var _DropdownDemo = __webpack_require__(372);
	
	Object.keys(_DropdownDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _DropdownDemo[key];
	    }
	  });
	});
	
	var _SelectDemo = __webpack_require__(382);
	
	Object.keys(_SelectDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _SelectDemo[key];
	    }
	  });
	});
	
	var _ListDemo = __webpack_require__(377);
	
	Object.keys(_ListDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _ListDemo[key];
	    }
	  });
	});
	
	var _SwitchDemo = __webpack_require__(384);
	
	Object.keys(_SwitchDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _SwitchDemo[key];
	    }
	  });
	});
	
	var _DrawerDemo = __webpack_require__(371);
	
	Object.keys(_DrawerDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _DrawerDemo[key];
	    }
	  });
	});
	
	var _DragulaDemo = __webpack_require__(370);
	
	Object.keys(_DragulaDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _DragulaDemo[key];
	    }
	  });
	});
	
	var _SlidesDemo = __webpack_require__(383);
	
	Object.keys(_SlidesDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _SlidesDemo[key];
	    }
	  });
	});
	
	var _PickerDemo = __webpack_require__(160);
	
	Object.keys(_PickerDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _PickerDemo[key];
	    }
	  });
	});
	
	var _MultiPickerDemo = __webpack_require__(379);
	
	Object.keys(_MultiPickerDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _MultiPickerDemo[key];
	    }
	  });
	});
	
	var _ChipsDemo = __webpack_require__(369);
	
	Object.keys(_ChipsDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _ChipsDemo[key];
	    }
	  });
	});
	
	var _CalendarDemo = __webpack_require__(366);
	
	Object.keys(_CalendarDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _CalendarDemo[key];
	    }
	  });
	});
	
	var _EditorDemo = __webpack_require__(373);
	
	Object.keys(_EditorDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _EditorDemo[key];
	    }
	  });
	});
	
	var _TipWellDemo = __webpack_require__(388);
	
	Object.keys(_TipWellDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _TipWellDemo[key];
	    }
	  });
	});
	
	var _TableDemo = __webpack_require__(161);
	
	Object.keys(_TableDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _TableDemo[key];
	    }
	  });
	});
	
	var _FormDemo = __webpack_require__(374);
	
	Object.keys(_FormDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _FormDemo[key];
	    }
	  });
	});
	
	var _CategoryDropdownDemo = __webpack_require__(368);
	
	Object.keys(_CategoryDropdownDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _CategoryDropdownDemo[key];
	    }
	  });
	});
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvYWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdvZGkvbm92by1kZXYvbGlicy9ub3ZvLWVsZW1lbnRzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSAnLi9idXR0b24vQnV0dG9uRGVtbyc7XG5leHBvcnQgKiBmcm9tICcuL2xvYWRpbmcvTG9hZGluZ0RlbW8nO1xuZXhwb3J0ICogZnJvbSAnLi9jYXJkL0NhcmREZW1vJztcbmV4cG9ydCAqIGZyb20gJy4vdG9hc3QvVG9hc3REZW1vJztcbmV4cG9ydCAqIGZyb20gJy4vdG9vbHRpcC9Ub29sdGlwRGVtbyc7XG5leHBvcnQgKiBmcm9tICcuL2hlYWRlci9IZWFkZXJEZW1vJztcbmV4cG9ydCAqIGZyb20gJy4vdGFicy9UYWJzRGVtbyc7XG5leHBvcnQgKiBmcm9tICcuL3RpbGVzL1RpbGVzRGVtbyc7XG5leHBvcnQgKiBmcm9tICcuL21vZGFsL01vZGFsRGVtbyc7XG5leHBvcnQgKiBmcm9tICcuL3F1aWNrLW5vdGUvUXVpY2tOb3RlRGVtbyc7XG5leHBvcnQgKiBmcm9tICcuL3JhZGlvL1JhZGlvRGVtbyc7XG5leHBvcnQgKiBmcm9tICcuL2Ryb3Bkb3duL0Ryb3Bkb3duRGVtbyc7XG5leHBvcnQgKiBmcm9tICcuL3NlbGVjdC9TZWxlY3REZW1vJztcbmV4cG9ydCAqIGZyb20gJy4vbGlzdC9MaXN0RGVtbyc7XG5leHBvcnQgKiBmcm9tICcuL3N3aXRjaC9Td2l0Y2hEZW1vJztcbmV4cG9ydCAqIGZyb20gJy4vZHJhd2VyL0RyYXdlckRlbW8nO1xuZXhwb3J0ICogZnJvbSAnLi9kcmFndWxhL0RyYWd1bGFEZW1vJztcbmV4cG9ydCAqIGZyb20gJy4vc2xpZGVzL1NsaWRlc0RlbW8nO1xuZXhwb3J0ICogZnJvbSAnLi9waWNrZXIvUGlja2VyRGVtbyc7XG5leHBvcnQgKiBmcm9tICcuL211bHRpLXBpY2tlci9NdWx0aVBpY2tlckRlbW8nO1xuZXhwb3J0ICogZnJvbSAnLi9jaGlwcy9DaGlwc0RlbW8nO1xuZXhwb3J0ICogZnJvbSAnLi9jYWxlbmRhci9DYWxlbmRhckRlbW8nO1xuZXhwb3J0ICogZnJvbSAnLi9lZGl0b3IvRWRpdG9yRGVtbyc7XG5leHBvcnQgKiBmcm9tICcuL3RpcC13ZWxsL1RpcFdlbGxEZW1vJztcbmV4cG9ydCAqIGZyb20gJy4vdGFibGUvVGFibGVEZW1vJztcbmV4cG9ydCAqIGZyb20gJy4vZm9ybS9Gb3JtRGVtbyc7XG5leHBvcnQgKiBmcm9tICcuL2NhdGVnb3J5LWRyb3Bkb3duL0NhdGVnb3J5RHJvcGRvd25EZW1vJztcbiJdfQ==

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ModalDemoComponent = exports.ModalEditDemo = exports.ModalAddDemo = exports.ModalCustomDemo = exports.ModalErrorDemo = exports.ModalWarningDemo = exports.ModalSuccessDemo = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class, _dec2, _class2, _dec3, _class3, _dec4, _class4, _dec5, _class5, _dec6, _class6, _dec7, _class7; // NG2
	
	// APP
	
	// Vendor
	
	
	var _core = __webpack_require__(2);
	
	var _ModalAddDemo = __webpack_require__(500);
	
	var _ModalAddDemo2 = _interopRequireDefault(_ModalAddDemo);
	
	var _ModalEditDemo = __webpack_require__(502);
	
	var _ModalEditDemo2 = _interopRequireDefault(_ModalEditDemo);
	
	var _ModalErrorDemo = __webpack_require__(503);
	
	var _ModalErrorDemo2 = _interopRequireDefault(_ModalErrorDemo);
	
	var _ModalCustomDemo = __webpack_require__(501);
	
	var _ModalCustomDemo2 = _interopRequireDefault(_ModalCustomDemo);
	
	var _ModalSuccessDemo = __webpack_require__(504);
	
	var _ModalSuccessDemo2 = _interopRequireDefault(_ModalSuccessDemo);
	
	var _ModalWarningDemo = __webpack_require__(505);
	
	var _ModalWarningDemo2 = _interopRequireDefault(_ModalWarningDemo);
	
	var _novoElements = __webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Modals <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/modal">(source)</a></small></h1>\n    <p>Modals are pop-up dialogues designed to grab attention and inform the user of something critical, force a decision, or extend a workflow. There are two categories of modals: notification and workflow. Regardless of type, a modal should have a maximum of two main buttons.</p>\n\n    <h2>Notification Modals</h2>\n\n    <h5>Success</h5>\n    <p>This modal uses only a primary action button. It is a confirmation that an action has been completed when the result is not immediately apparent. A workflow modal often transitions into a success modal.</p>\n    <div class="example modal-demo"><button theme="secondary" (click)="showSuccess()">Show Me :)</button></div>\n    <code-snippet [code]="ModalSuccessDemoTpl"></code-snippet>\n\n    <h5>Warning</h5>\n    <p>Warning modals ask for additional confirmation to complete an action because the action is either irreversible or there is an exception. The first line should always clarify the action or eventual result.</p>\n      <div class="example modal-demo"><button theme="secondary" (click)="showWarning()">Show Me :)</button></div>\n    <code-snippet [code]="ModalWarningDemoTpl"></code-snippet>\n\n    <h5>Error</h5>\n    <p>Error modals indicate that an attempted action has failed. The first line should apologize and state the what happened. The second line should quickly attempt to explain to the user why this has happened, and instruct the user on the best course of action.</p>\n    <div class="example modal-demo"><button theme="secondary" (click)="showError()">Show Me :)</button></div>\n    <code-snippet [code]="ModalErrorDemoTpl"></code-snippet>\n\n    <h5>Custom</h5>\n    <p>In the case where "Success", "Warning", and "Error" notfications aren\'t enough, use the custom notification. Custom notifcations allow any of the Bullhorn Icons to be used in the notification.</p>\n    <div class="example modal-demo"><button theme="secondary" (click)="showCustom()">Show Me :)</button></div>\n    <code-snippet [code]="ModalCustomDemoTpl"></code-snippet>\n\n    <h2>Workflow Modals</h2>\n\n    <h5>Add</h5>\n    <p>Add modals have a colored title bar based on the record type being created. Additionally, due to a greater than average amount of content, they have fixed footers.</p>\n    <div class="example modal-demo"><button theme="secondary" (click)="showAdd()">Show Me :)</button></div>\n    <code-snippet [code]="ModalAddDemoTpl"></code-snippet>\n\n    <h5>Edit & Send</h5>\n    <p>Edit, Send, and non-Add workflow modals possess a plain header to remind the user of the action they are taking. They generally have a neutralizing button, and a primary button.</p>\n    <div class="example modal-demo"><button data-automation-id="modal-trigger" theme="secondary" (click)="showEdit()">Show Me :)</button></div>\n    <code-snippet [code]="ModalEditDemoTpl"></code-snippet>\n</div>\n';
	
	var ModalSuccessDemo = exports.ModalSuccessDemo = (_dec = (0, _core.Component)({
	    selector: 'modal-success-demo',
	    template: _ModalSuccessDemo2.default
	}), _dec(_class = function () {
	    function ModalSuccessDemo(modalRef) {
	        _classCallCheck(this, ModalSuccessDemo);
	
	        this.modalRef = modalRef;
	    }
	
	    _createClass(ModalSuccessDemo, [{
	        key: 'close',
	        value: function close() {
	            this.modalRef.close();
	        }
	    }]);
	
	    return ModalSuccessDemo;
	}()) || _class);
	Reflect.defineMetadata('design:paramtypes', [_novoElements.NovoModalRef], ModalSuccessDemo);
	var ModalWarningDemo = exports.ModalWarningDemo = (_dec2 = (0, _core.Component)({
	    selector: 'modal-warning-demo',
	    template: _ModalWarningDemo2.default
	}), _dec2(_class2 = function () {
	    function ModalWarningDemo(modalRef) {
	        _classCallCheck(this, ModalWarningDemo);
	
	        this.modalRef = modalRef;
	    }
	
	    _createClass(ModalWarningDemo, [{
	        key: 'close',
	        value: function close() {
	            this.modalRef.close();
	        }
	    }]);
	
	    return ModalWarningDemo;
	}()) || _class2);
	Reflect.defineMetadata('design:paramtypes', [_novoElements.NovoModalRef], ModalWarningDemo);
	var ModalErrorDemo = exports.ModalErrorDemo = (_dec3 = (0, _core.Component)({
	    selector: 'modal-error-demo',
	    template: _ModalErrorDemo2.default
	}), _dec3(_class3 = function () {
	    function ModalErrorDemo(modalRef) {
	        _classCallCheck(this, ModalErrorDemo);
	
	        this.modalRef = modalRef;
	    }
	
	    _createClass(ModalErrorDemo, [{
	        key: 'close',
	        value: function close() {
	            this.modalRef.close();
	        }
	    }]);
	
	    return ModalErrorDemo;
	}()) || _class3);
	Reflect.defineMetadata('design:paramtypes', [_novoElements.NovoModalRef], ModalErrorDemo);
	var ModalCustomDemo = exports.ModalCustomDemo = (_dec4 = (0, _core.Component)({
	    selector: 'modal-custom-demo',
	    template: _ModalCustomDemo2.default
	}), _dec4(_class4 = function () {
	    function ModalCustomDemo(modalRef) {
	        _classCallCheck(this, ModalCustomDemo);
	
	        this.modalRef = modalRef;
	    }
	
	    _createClass(ModalCustomDemo, [{
	        key: 'close',
	        value: function close() {
	            this.modalRef.close();
	        }
	    }]);
	
	    return ModalCustomDemo;
	}()) || _class4);
	Reflect.defineMetadata('design:paramtypes', [_novoElements.NovoModalRef], ModalCustomDemo);
	var ModalAddDemo = exports.ModalAddDemo = (_dec5 = (0, _core.Component)({
	    selector: 'modal-add-demo',
	    template: _ModalAddDemo2.default
	}), _dec5(_class5 = function () {
	    function ModalAddDemo(modalRef, formUtils) {
	        _classCallCheck(this, ModalAddDemo);
	
	        this.formUtils = formUtils;
	        this.modalRef = modalRef;
	    }
	
	    _createClass(ModalAddDemo, [{
	        key: 'ngOnInit',
	        value: function ngOnInit() {
	            this.textControl = new _novoElements.TextBoxControl({ key: 'text', label: 'Text Box' });
	            this.emailControl = new _novoElements.TextBoxControl({ type: 'email', key: 'email', label: 'Email' });
	            this.numberControl = new _novoElements.TextBoxControl({ type: 'number', key: 'number', label: 'Number' });
	            this.textForm = this.formUtils.toFormGroup([this.textControl, this.emailControl, this.numberControl]);
	        }
	    }, {
	        key: 'close',
	        value: function close() {
	            this.modalRef.close();
	        }
	    }]);
	
	    return ModalAddDemo;
	}()) || _class5);
	Reflect.defineMetadata('design:paramtypes', [_novoElements.NovoModalRef, _novoElements.FormUtils], ModalAddDemo);
	var ModalEditDemo = exports.ModalEditDemo = (_dec6 = (0, _core.Component)({
	    selector: 'modal-edit-demo',
	    template: _ModalEditDemo2.default
	}), _dec6(_class6 = function () {
	    function ModalEditDemo(modalRef, formUtils) {
	        _classCallCheck(this, ModalEditDemo);
	
	        this.formUtils = formUtils;
	        this.modalRef = modalRef;
	    }
	
	    _createClass(ModalEditDemo, [{
	        key: 'ngOnInit',
	        value: function ngOnInit() {
	            this.textControl = new _novoElements.TextBoxControl({ key: 'text', label: 'Text Box' });
	            this.emailControl = new _novoElements.TextBoxControl({ type: 'email', key: 'email', label: 'Email' });
	            this.numberControl = new _novoElements.TextBoxControl({ type: 'number', key: 'number', label: 'Number' });
	            this.textForm = this.formUtils.toFormGroup([this.textControl, this.emailControl, this.numberControl]);
	        }
	    }, {
	        key: 'close',
	        value: function close() {
	            this.modalRef.close();
	        }
	    }]);
	
	    return ModalEditDemo;
	}()) || _class6);
	Reflect.defineMetadata('design:paramtypes', [_novoElements.NovoModalRef, _novoElements.FormUtils], ModalEditDemo);
	var ModalDemoComponent = exports.ModalDemoComponent = (_dec7 = (0, _core.Component)({
	    selector: 'modal-demo',
	    template: template
	}), _dec7(_class7 = function () {
	    function ModalDemoComponent(modalService) {
	        _classCallCheck(this, ModalDemoComponent);
	
	        this.modalService = modalService;
	        this.ModalAddDemoTpl = _ModalAddDemo2.default;
	        this.ModalEditDemoTpl = _ModalEditDemo2.default;
	        this.ModalErrorDemoTpl = _ModalErrorDemo2.default;
	        this.ModalCustomDemoTpl = _ModalCustomDemo2.default;
	        this.ModalSuccessDemoTpl = _ModalSuccessDemo2.default;
	        this.ModalWarningDemoTpl = _ModalWarningDemo2.default;
	    }
	
	    _createClass(ModalDemoComponent, [{
	        key: 'showSuccess',
	        value: function showSuccess() {
	            this.modalService.open(ModalSuccessDemo);
	        }
	    }, {
	        key: 'showWarning',
	        value: function showWarning() {
	            this.modalService.open(ModalWarningDemo);
	        }
	    }, {
	        key: 'showError',
	        value: function showError() {
	            this.modalService.open(ModalErrorDemo);
	        }
	    }, {
	        key: 'showCustom',
	        value: function showCustom() {
	            this.modalService.open(ModalCustomDemo);
	        }
	    }, {
	        key: 'showAdd',
	        value: function showAdd() {
	            this.modalService.open(ModalAddDemo);
	        }
	    }, {
	        key: 'showEdit',
	        value: function showEdit() {
	            this.modalService.open(ModalEditDemo);
	        }
	    }]);
	
	    return ModalDemoComponent;
	}()) || _class7);
	Reflect.defineMetadata('design:paramtypes', [_novoElements.NovoModalService], ModalDemoComponent);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvbW9kYWwvTW9kYWxEZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztrSEFBQTs7QUFFQTs7QUFPQTs7O0FBUkE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQUVBLElBQU0saStGQUFOOztJQTZDYSxnQixXQUFBLGdCLFdBSloscUJBQVU7QUFDUCxjQUFVLG9CQURIO0FBRVA7QUFGTyxDQUFWLEM7QUFLRyw4QkFBWSxRQUFaLEVBQW1DO0FBQUE7O0FBQy9CLGFBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNIOzs7O2dDQUVPO0FBQ0osaUJBQUssUUFBTCxDQUFjLEtBQWQ7QUFDSDs7Ozs7MEVBUFEsZ0I7SUFjQSxnQixXQUFBLGdCLFlBSloscUJBQVU7QUFDUCxjQUFVLG9CQURIO0FBRVA7QUFGTyxDQUFWLEM7QUFLRyw4QkFBWSxRQUFaLEVBQW1DO0FBQUE7O0FBQy9CLGFBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNIOzs7O2dDQUVPO0FBQ0osaUJBQUssUUFBTCxDQUFjLEtBQWQ7QUFDSDs7Ozs7MEVBUFEsZ0I7SUFjQSxjLFdBQUEsYyxZQUpaLHFCQUFVO0FBQ1AsY0FBVSxrQkFESDtBQUVQO0FBRk8sQ0FBVixDO0FBS0csNEJBQVksUUFBWixFQUFtQztBQUFBOztBQUMvQixhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDSDs7OztnQ0FFTztBQUNKLGlCQUFLLFFBQUwsQ0FBYyxLQUFkO0FBQ0g7Ozs7OzBFQVBRLGM7SUFjQSxlLFdBQUEsZSxZQUpaLHFCQUFVO0FBQ1AsY0FBVSxtQkFESDtBQUVQO0FBRk8sQ0FBVixDO0FBS0csNkJBQVksUUFBWixFQUFtQztBQUFBOztBQUMvQixhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDSDs7OztnQ0FFTztBQUNKLGlCQUFLLFFBQUwsQ0FBYyxLQUFkO0FBQ0g7Ozs7OzBFQVBRLGU7SUFjQSxZLFdBQUEsWSxZQUpaLHFCQUFVO0FBQ1AsY0FBVSxnQkFESDtBQUVQO0FBRk8sQ0FBVixDO0FBS0csMEJBQVksUUFBWixFQUFtQyxTQUFuQyxFQUF3RDtBQUFBOztBQUNwRCxhQUFLLFNBQUwsR0FBaUIsU0FBakI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDSDs7OzttQ0FFVTtBQUNQLGlCQUFLLFdBQUwsR0FBbUIsaUNBQW1CLEVBQUUsS0FBSyxNQUFQLEVBQWUsT0FBTyxVQUF0QixFQUFuQixDQUFuQjtBQUNBLGlCQUFLLFlBQUwsR0FBb0IsaUNBQW1CLEVBQUUsTUFBTSxPQUFSLEVBQWlCLEtBQUssT0FBdEIsRUFBK0IsT0FBTyxPQUF0QyxFQUFuQixDQUFwQjtBQUNBLGlCQUFLLGFBQUwsR0FBcUIsaUNBQW1CLEVBQUUsTUFBTSxRQUFSLEVBQWtCLEtBQUssUUFBdkIsRUFBaUMsT0FBTyxRQUF4QyxFQUFuQixDQUFyQjtBQUNBLGlCQUFLLFFBQUwsR0FBZ0IsS0FBSyxTQUFMLENBQWUsV0FBZixDQUEyQixDQUFDLEtBQUssV0FBTixFQUFtQixLQUFLLFlBQXhCLEVBQXNDLEtBQUssYUFBM0MsQ0FBM0IsQ0FBaEI7QUFDSDs7O2dDQUVPO0FBQ0osaUJBQUssUUFBTCxDQUFjLEtBQWQ7QUFDSDs7Ozs7bUdBZlEsWTtJQXNCQSxhLFdBQUEsYSxZQUpaLHFCQUFVO0FBQ1AsY0FBVSxpQkFESDtBQUVQO0FBRk8sQ0FBVixDO0FBS0csMkJBQVksUUFBWixFQUFtQyxTQUFuQyxFQUF3RDtBQUFBOztBQUNwRCxhQUFLLFNBQUwsR0FBaUIsU0FBakI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDSDs7OzttQ0FFVTtBQUNQLGlCQUFLLFdBQUwsR0FBbUIsaUNBQW1CLEVBQUUsS0FBSyxNQUFQLEVBQWUsT0FBTyxVQUF0QixFQUFuQixDQUFuQjtBQUNBLGlCQUFLLFlBQUwsR0FBb0IsaUNBQW1CLEVBQUUsTUFBTSxPQUFSLEVBQWlCLEtBQUssT0FBdEIsRUFBK0IsT0FBTyxPQUF0QyxFQUFuQixDQUFwQjtBQUNBLGlCQUFLLGFBQUwsR0FBcUIsaUNBQW1CLEVBQUUsTUFBTSxRQUFSLEVBQWtCLEtBQUssUUFBdkIsRUFBaUMsT0FBTyxRQUF4QyxFQUFuQixDQUFyQjtBQUNBLGlCQUFLLFFBQUwsR0FBZ0IsS0FBSyxTQUFMLENBQWUsV0FBZixDQUEyQixDQUFDLEtBQUssV0FBTixFQUFtQixLQUFLLFlBQXhCLEVBQXNDLEtBQUssYUFBM0MsQ0FBM0IsQ0FBaEI7QUFDSDs7O2dDQUVPO0FBQ0osaUJBQUssUUFBTCxDQUFjLEtBQWQ7QUFDSDs7Ozs7bUdBZlEsYTtJQXNCQSxrQixXQUFBLGtCLFlBSloscUJBQVU7QUFDUCxjQUFVLFlBREg7QUFFUCxjQUFVO0FBRkgsQ0FBVixDO0FBS0csZ0NBQVksWUFBWixFQUEyQztBQUFBOztBQUN2QyxhQUFLLFlBQUwsR0FBb0IsWUFBcEI7QUFDQSxhQUFLLGVBQUw7QUFDQSxhQUFLLGdCQUFMO0FBQ0EsYUFBSyxpQkFBTDtBQUNBLGFBQUssa0JBQUw7QUFDQSxhQUFLLG1CQUFMO0FBQ0EsYUFBSyxtQkFBTDtBQUNIOzs7O3NDQUVhO0FBQ1YsaUJBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixnQkFBdkI7QUFDSDs7O3NDQUVhO0FBQ1YsaUJBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixnQkFBdkI7QUFDSDs7O29DQUVXO0FBQ1IsaUJBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixjQUF2QjtBQUNIOzs7cUNBRVk7QUFDVCxpQkFBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLGVBQXZCO0FBQ0g7OztrQ0FFUztBQUNOLGlCQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsWUFBdkI7QUFDSDs7O21DQUVVO0FBQ1AsaUJBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixhQUF2QjtBQUNIOzs7Ozs4RUFqQ1Esa0IiLCJmaWxlIjoiTW9kYWxEZW1vLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ29kaS9ub3ZvLWRldi9saWJzL25vdm8tZWxlbWVudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgTW9kYWxBZGREZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL01vZGFsQWRkRGVtby5odG1sJztcbmltcG9ydCBNb2RhbEVkaXREZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL01vZGFsRWRpdERlbW8uaHRtbCc7XG5pbXBvcnQgTW9kYWxFcnJvckRlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvTW9kYWxFcnJvckRlbW8uaHRtbCc7XG5pbXBvcnQgTW9kYWxDdXN0b21EZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL01vZGFsQ3VzdG9tRGVtby5odG1sJztcbmltcG9ydCBNb2RhbFN1Y2Nlc3NEZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL01vZGFsU3VjY2Vzc0RlbW8uaHRtbCc7XG5pbXBvcnQgTW9kYWxXYXJuaW5nRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9Nb2RhbFdhcm5pbmdEZW1vLmh0bWwnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBOb3ZvTW9kYWxSZWYsIE5vdm9Nb2RhbFNlcnZpY2UsIFRleHRCb3hDb250cm9sLCBGb3JtVXRpbHMgfSBmcm9tICcuLy4uLy4uLy4uLy4uL3NyYy9ub3ZvLWVsZW1lbnRzJztcblxuY29uc3QgdGVtcGxhdGUgPSBgXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGgxPk1vZGFscyA8c21hbGw+PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9idWxsaG9ybi9ub3ZvLWVsZW1lbnRzL2Jsb2IvbWFzdGVyL3NyYy9lbGVtZW50cy9tb2RhbFwiPihzb3VyY2UpPC9hPjwvc21hbGw+PC9oMT5cbiAgICA8cD5Nb2RhbHMgYXJlIHBvcC11cCBkaWFsb2d1ZXMgZGVzaWduZWQgdG8gZ3JhYiBhdHRlbnRpb24gYW5kIGluZm9ybSB0aGUgdXNlciBvZiBzb21ldGhpbmcgY3JpdGljYWwsIGZvcmNlIGEgZGVjaXNpb24sIG9yIGV4dGVuZCBhIHdvcmtmbG93LiBUaGVyZSBhcmUgdHdvIGNhdGVnb3JpZXMgb2YgbW9kYWxzOiBub3RpZmljYXRpb24gYW5kIHdvcmtmbG93LiBSZWdhcmRsZXNzIG9mIHR5cGUsIGEgbW9kYWwgc2hvdWxkIGhhdmUgYSBtYXhpbXVtIG9mIHR3byBtYWluIGJ1dHRvbnMuPC9wPlxuXG4gICAgPGgyPk5vdGlmaWNhdGlvbiBNb2RhbHM8L2gyPlxuXG4gICAgPGg1PlN1Y2Nlc3M8L2g1PlxuICAgIDxwPlRoaXMgbW9kYWwgdXNlcyBvbmx5IGEgcHJpbWFyeSBhY3Rpb24gYnV0dG9uLiBJdCBpcyBhIGNvbmZpcm1hdGlvbiB0aGF0IGFuIGFjdGlvbiBoYXMgYmVlbiBjb21wbGV0ZWQgd2hlbiB0aGUgcmVzdWx0IGlzIG5vdCBpbW1lZGlhdGVseSBhcHBhcmVudC4gQSB3b3JrZmxvdyBtb2RhbCBvZnRlbiB0cmFuc2l0aW9ucyBpbnRvIGEgc3VjY2VzcyBtb2RhbC48L3A+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgbW9kYWwtZGVtb1wiPjxidXR0b24gdGhlbWU9XCJzZWNvbmRhcnlcIiAoY2xpY2spPVwic2hvd1N1Y2Nlc3MoKVwiPlNob3cgTWUgOik8L2J1dHRvbj48L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIk1vZGFsU3VjY2Vzc0RlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cblxuICAgIDxoNT5XYXJuaW5nPC9oNT5cbiAgICA8cD5XYXJuaW5nIG1vZGFscyBhc2sgZm9yIGFkZGl0aW9uYWwgY29uZmlybWF0aW9uIHRvIGNvbXBsZXRlIGFuIGFjdGlvbiBiZWNhdXNlIHRoZSBhY3Rpb24gaXMgZWl0aGVyIGlycmV2ZXJzaWJsZSBvciB0aGVyZSBpcyBhbiBleGNlcHRpb24uIFRoZSBmaXJzdCBsaW5lIHNob3VsZCBhbHdheXMgY2xhcmlmeSB0aGUgYWN0aW9uIG9yIGV2ZW50dWFsIHJlc3VsdC48L3A+XG4gICAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBtb2RhbC1kZW1vXCI+PGJ1dHRvbiB0aGVtZT1cInNlY29uZGFyeVwiIChjbGljayk9XCJzaG93V2FybmluZygpXCI+U2hvdyBNZSA6KTwvYnV0dG9uPjwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiTW9kYWxXYXJuaW5nRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuXG4gICAgPGg1PkVycm9yPC9oNT5cbiAgICA8cD5FcnJvciBtb2RhbHMgaW5kaWNhdGUgdGhhdCBhbiBhdHRlbXB0ZWQgYWN0aW9uIGhhcyBmYWlsZWQuIFRoZSBmaXJzdCBsaW5lIHNob3VsZCBhcG9sb2dpemUgYW5kIHN0YXRlIHRoZSB3aGF0IGhhcHBlbmVkLiBUaGUgc2Vjb25kIGxpbmUgc2hvdWxkIHF1aWNrbHkgYXR0ZW1wdCB0byBleHBsYWluIHRvIHRoZSB1c2VyIHdoeSB0aGlzIGhhcyBoYXBwZW5lZCwgYW5kIGluc3RydWN0IHRoZSB1c2VyIG9uIHRoZSBiZXN0IGNvdXJzZSBvZiBhY3Rpb24uPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIG1vZGFsLWRlbW9cIj48YnV0dG9uIHRoZW1lPVwic2Vjb25kYXJ5XCIgKGNsaWNrKT1cInNob3dFcnJvcigpXCI+U2hvdyBNZSA6KTwvYnV0dG9uPjwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiTW9kYWxFcnJvckRlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cblxuICAgIDxoNT5DdXN0b208L2g1PlxuICAgIDxwPkluIHRoZSBjYXNlIHdoZXJlIFwiU3VjY2Vzc1wiLCBcIldhcm5pbmdcIiwgYW5kIFwiRXJyb3JcIiBub3RmaWNhdGlvbnMgYXJlbid0IGVub3VnaCwgdXNlIHRoZSBjdXN0b20gbm90aWZpY2F0aW9uLiBDdXN0b20gbm90aWZjYXRpb25zIGFsbG93IGFueSBvZiB0aGUgQnVsbGhvcm4gSWNvbnMgdG8gYmUgdXNlZCBpbiB0aGUgbm90aWZpY2F0aW9uLjwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBtb2RhbC1kZW1vXCI+PGJ1dHRvbiB0aGVtZT1cInNlY29uZGFyeVwiIChjbGljayk9XCJzaG93Q3VzdG9tKClcIj5TaG93IE1lIDopPC9idXR0b24+PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJNb2RhbEN1c3RvbURlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cblxuICAgIDxoMj5Xb3JrZmxvdyBNb2RhbHM8L2gyPlxuXG4gICAgPGg1PkFkZDwvaDU+XG4gICAgPHA+QWRkIG1vZGFscyBoYXZlIGEgY29sb3JlZCB0aXRsZSBiYXIgYmFzZWQgb24gdGhlIHJlY29yZCB0eXBlIGJlaW5nIGNyZWF0ZWQuIEFkZGl0aW9uYWxseSwgZHVlIHRvIGEgZ3JlYXRlciB0aGFuIGF2ZXJhZ2UgYW1vdW50IG9mIGNvbnRlbnQsIHRoZXkgaGF2ZSBmaXhlZCBmb290ZXJzLjwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBtb2RhbC1kZW1vXCI+PGJ1dHRvbiB0aGVtZT1cInNlY29uZGFyeVwiIChjbGljayk9XCJzaG93QWRkKClcIj5TaG93IE1lIDopPC9idXR0b24+PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJNb2RhbEFkZERlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cblxuICAgIDxoNT5FZGl0ICYgU2VuZDwvaDU+XG4gICAgPHA+RWRpdCwgU2VuZCwgYW5kIG5vbi1BZGQgd29ya2Zsb3cgbW9kYWxzIHBvc3Nlc3MgYSBwbGFpbiBoZWFkZXIgdG8gcmVtaW5kIHRoZSB1c2VyIG9mIHRoZSBhY3Rpb24gdGhleSBhcmUgdGFraW5nLiBUaGV5IGdlbmVyYWxseSBoYXZlIGEgbmV1dHJhbGl6aW5nIGJ1dHRvbiwgYW5kIGEgcHJpbWFyeSBidXR0b24uPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIG1vZGFsLWRlbW9cIj48YnV0dG9uIGRhdGEtYXV0b21hdGlvbi1pZD1cIm1vZGFsLXRyaWdnZXJcIiB0aGVtZT1cInNlY29uZGFyeVwiIChjbGljayk9XCJzaG93RWRpdCgpXCI+U2hvdyBNZSA6KTwvYnV0dG9uPjwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiTW9kYWxFZGl0RGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuPC9kaXY+XG5gO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21vZGFsLXN1Y2Nlc3MtZGVtbycsXG4gICAgdGVtcGxhdGU6IE1vZGFsU3VjY2Vzc0RlbW9UcGxcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxTdWNjZXNzRGVtbyB7XG4gICAgY29uc3RydWN0b3IobW9kYWxSZWY6Tm92b01vZGFsUmVmKSB7XG4gICAgICAgIHRoaXMubW9kYWxSZWYgPSBtb2RhbFJlZjtcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5tb2RhbFJlZi5jbG9zZSgpO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtb2RhbC13YXJuaW5nLWRlbW8nLFxuICAgIHRlbXBsYXRlOiBNb2RhbFdhcm5pbmdEZW1vVHBsXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsV2FybmluZ0RlbW8ge1xuICAgIGNvbnN0cnVjdG9yKG1vZGFsUmVmOk5vdm9Nb2RhbFJlZikge1xuICAgICAgICB0aGlzLm1vZGFsUmVmID0gbW9kYWxSZWY7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMubW9kYWxSZWYuY2xvc2UoKTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbW9kYWwtZXJyb3ItZGVtbycsXG4gICAgdGVtcGxhdGU6IE1vZGFsRXJyb3JEZW1vVHBsXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsRXJyb3JEZW1vIHtcbiAgICBjb25zdHJ1Y3Rvcihtb2RhbFJlZjpOb3ZvTW9kYWxSZWYpIHtcbiAgICAgICAgdGhpcy5tb2RhbFJlZiA9IG1vZGFsUmVmO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLm1vZGFsUmVmLmNsb3NlKCk7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21vZGFsLWN1c3RvbS1kZW1vJyxcbiAgICB0ZW1wbGF0ZTogTW9kYWxDdXN0b21EZW1vVHBsXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsQ3VzdG9tRGVtbyB7XG4gICAgY29uc3RydWN0b3IobW9kYWxSZWY6Tm92b01vZGFsUmVmKSB7XG4gICAgICAgIHRoaXMubW9kYWxSZWYgPSBtb2RhbFJlZjtcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5tb2RhbFJlZi5jbG9zZSgpO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtb2RhbC1hZGQtZGVtbycsXG4gICAgdGVtcGxhdGU6IE1vZGFsQWRkRGVtb1RwbFxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbEFkZERlbW8ge1xuICAgIGNvbnN0cnVjdG9yKG1vZGFsUmVmOk5vdm9Nb2RhbFJlZiwgZm9ybVV0aWxzOkZvcm1VdGlscykge1xuICAgICAgICB0aGlzLmZvcm1VdGlscyA9IGZvcm1VdGlscztcbiAgICAgICAgdGhpcy5tb2RhbFJlZiA9IG1vZGFsUmVmO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnRleHRDb250cm9sID0gbmV3IFRleHRCb3hDb250cm9sKHsga2V5OiAndGV4dCcsIGxhYmVsOiAnVGV4dCBCb3gnIH0pO1xuICAgICAgICB0aGlzLmVtYWlsQ29udHJvbCA9IG5ldyBUZXh0Qm94Q29udHJvbCh7IHR5cGU6ICdlbWFpbCcsIGtleTogJ2VtYWlsJywgbGFiZWw6ICdFbWFpbCcgfSk7XG4gICAgICAgIHRoaXMubnVtYmVyQ29udHJvbCA9IG5ldyBUZXh0Qm94Q29udHJvbCh7IHR5cGU6ICdudW1iZXInLCBrZXk6ICdudW1iZXInLCBsYWJlbDogJ051bWJlcicgfSk7XG4gICAgICAgIHRoaXMudGV4dEZvcm0gPSB0aGlzLmZvcm1VdGlscy50b0Zvcm1Hcm91cChbdGhpcy50ZXh0Q29udHJvbCwgdGhpcy5lbWFpbENvbnRyb2wsIHRoaXMubnVtYmVyQ29udHJvbF0pO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLm1vZGFsUmVmLmNsb3NlKCk7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21vZGFsLWVkaXQtZGVtbycsXG4gICAgdGVtcGxhdGU6IE1vZGFsRWRpdERlbW9UcGxcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxFZGl0RGVtbyB7XG4gICAgY29uc3RydWN0b3IobW9kYWxSZWY6Tm92b01vZGFsUmVmLCBmb3JtVXRpbHM6Rm9ybVV0aWxzKSB7XG4gICAgICAgIHRoaXMuZm9ybVV0aWxzID0gZm9ybVV0aWxzO1xuICAgICAgICB0aGlzLm1vZGFsUmVmID0gbW9kYWxSZWY7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudGV4dENvbnRyb2wgPSBuZXcgVGV4dEJveENvbnRyb2woeyBrZXk6ICd0ZXh0JywgbGFiZWw6ICdUZXh0IEJveCcgfSk7XG4gICAgICAgIHRoaXMuZW1haWxDb250cm9sID0gbmV3IFRleHRCb3hDb250cm9sKHsgdHlwZTogJ2VtYWlsJywga2V5OiAnZW1haWwnLCBsYWJlbDogJ0VtYWlsJyB9KTtcbiAgICAgICAgdGhpcy5udW1iZXJDb250cm9sID0gbmV3IFRleHRCb3hDb250cm9sKHsgdHlwZTogJ251bWJlcicsIGtleTogJ251bWJlcicsIGxhYmVsOiAnTnVtYmVyJyB9KTtcbiAgICAgICAgdGhpcy50ZXh0Rm9ybSA9IHRoaXMuZm9ybVV0aWxzLnRvRm9ybUdyb3VwKFt0aGlzLnRleHRDb250cm9sLCB0aGlzLmVtYWlsQ29udHJvbCwgdGhpcy5udW1iZXJDb250cm9sXSk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMubW9kYWxSZWYuY2xvc2UoKTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbW9kYWwtZGVtbycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsRGVtb0NvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IobW9kYWxTZXJ2aWNlOk5vdm9Nb2RhbFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2UgPSBtb2RhbFNlcnZpY2U7XG4gICAgICAgIHRoaXMuTW9kYWxBZGREZW1vVHBsID0gTW9kYWxBZGREZW1vVHBsO1xuICAgICAgICB0aGlzLk1vZGFsRWRpdERlbW9UcGwgPSBNb2RhbEVkaXREZW1vVHBsO1xuICAgICAgICB0aGlzLk1vZGFsRXJyb3JEZW1vVHBsID0gTW9kYWxFcnJvckRlbW9UcGw7XG4gICAgICAgIHRoaXMuTW9kYWxDdXN0b21EZW1vVHBsID0gTW9kYWxDdXN0b21EZW1vVHBsO1xuICAgICAgICB0aGlzLk1vZGFsU3VjY2Vzc0RlbW9UcGwgPSBNb2RhbFN1Y2Nlc3NEZW1vVHBsO1xuICAgICAgICB0aGlzLk1vZGFsV2FybmluZ0RlbW9UcGwgPSBNb2RhbFdhcm5pbmdEZW1vVHBsO1xuICAgIH1cblxuICAgIHNob3dTdWNjZXNzKCkge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZS5vcGVuKE1vZGFsU3VjY2Vzc0RlbW8pO1xuICAgIH1cblxuICAgIHNob3dXYXJuaW5nKCkge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZS5vcGVuKE1vZGFsV2FybmluZ0RlbW8pO1xuICAgIH1cblxuICAgIHNob3dFcnJvcigpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2Uub3BlbihNb2RhbEVycm9yRGVtbyk7XG4gICAgfVxuXG4gICAgc2hvd0N1c3RvbSgpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2Uub3BlbihNb2RhbEN1c3RvbURlbW8pO1xuICAgIH1cblxuICAgIHNob3dBZGQoKSB7XG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlLm9wZW4oTW9kYWxBZGREZW1vKTtcbiAgICB9XG5cbiAgICBzaG93RWRpdCgpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2Uub3BlbihNb2RhbEVkaXREZW1vKTtcbiAgICB9XG59XG4iXX0=

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PickerDemoComponent = exports.CustomPickerResults = undefined;
	
	var _dec, _class, _dec2, _class2; // NG2
	
	// APP
	
	// Vendor
	
	
	var _core = __webpack_require__(2);
	
	var _BasicPickerDemo = __webpack_require__(508);
	
	var _BasicPickerDemo2 = _interopRequireDefault(_BasicPickerDemo);
	
	var _AsyncPickerDemo = __webpack_require__(507);
	
	var _AsyncPickerDemo2 = _interopRequireDefault(_AsyncPickerDemo);
	
	var _FormattedPickerDemo = __webpack_require__(510);
	
	var _FormattedPickerDemo2 = _interopRequireDefault(_FormattedPickerDemo);
	
	var _CustomPickerResultsDemo = __webpack_require__(509);
	
	var _CustomPickerResultsDemo2 = _interopRequireDefault(_CustomPickerResultsDemo);
	
	var _novoElements = __webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CustomPickerResults = exports.CustomPickerResults = (_dec = (0, _core.Component)({
	    selector: 'custom-picker-results',
	    host: {
	        'class': 'active picker-results'
	    },
	    template: '\n        <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>\n        <ul *ngIf="matches.length > 0">\n            <li\n                *ngFor="let match of matches"\n                (click)="selectMatch($event)"\n                [class.active]="match===activeMatch"\n                (mouseenter)="selectActive(match)">\n                **CUSTOM** <b [innerHtml]="highlight(match.label, term)"></b>\n            </li>\n        </ul>\n        <p class="picker-error" *ngIf="hasError">Oops! An error occured.</p>\n        <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">No results to display...</p>\n    '
	}), _dec(_class = function (_PickerResults) {
	    _inherits(CustomPickerResults, _PickerResults);
	
	    function CustomPickerResults() {
	        _classCallCheck(this, CustomPickerResults);
	
	        return _possibleConstructorReturn(this, (CustomPickerResults.__proto__ || Object.getPrototypeOf(CustomPickerResults)).apply(this, arguments));
	    }
	
	    return CustomPickerResults;
	}(_novoElements.PickerResults)) || _class);
	
	
	var template = '\n<div class="container">\n    <h1>Picker <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/picker">(source)</a></small></h1>\n    <p>The picker element (<code>input[picker]</code>) represents a control that presents a menu of options. The options\n    within are set by the <code>items</code> attribute. Options can be pre-pickered for the user using the <code>value</code>\n    attribute.</p>\n    <br/>\n    <h5>Basic Examples</h5>\n    <p>\n        By clicking on the <code>input</code> element, the options list will be displayed.  picker any of the options\n        by clicking on the item in the list.  The value pickered will be displayed and the options list will be removed.\n    </p>\n    <div class="example picker-demo">' + _BasicPickerDemo2.default + '</div>\n    <code-snippet [code]="BasicPickerDemoTpl"></code-snippet>\n    <h5>Async Examples</h5>\n    <p>\n        By clicking on the <code>input</code> element, the options list will be displayed.  picker any of the options\n        by clicking on the item in the list.  The value pickered will be displayed and the options list will be removed.\n    </p>\n    <div class="example picker-demo">' + _AsyncPickerDemo2.default + '</div>\n    <code-snippet [code]="AsyncPickerDemoTpl"></code-snippet>\n    <h5>Formated Picker Examples</h5>\n    <p>\n        By clicking on the <code>input</code> element, the options list will be displayed.  picker any of the options\n        by clicking on the item in the list.  The value pickered will be displayed and the options list will be removed.\n    </p>\n    <div class="example picker-demo">' + _FormattedPickerDemo2.default + '</div>\n    <code-snippet [code]="FormattedPickerDemoTpl"></code-snippet>\n    <h5>Custom Picker Examples</h5>\n    <p>\n        By clicking on the <code>input</code> element, the options list will be displayed.  picker any of the options\n        by clicking on the item in the list.  The value pickered will be displayed and the options list will be removed.\n    </p>\n    <div class="example picker-demo">' + _CustomPickerResultsDemo2.default + '</div>\n    <code-snippet [code]="CustomPickerResultsDemoTpl"></code-snippet>\n</div>\n';
	
	var PickerDemoComponent = exports.PickerDemoComponent = (_dec2 = (0, _core.Component)({
	    selector: 'picker-demo',
	    template: template
	}), _dec2(_class2 = function PickerDemoComponent() {
	    _classCallCheck(this, PickerDemoComponent);
	
	    this.BasicPickerDemoTpl = _BasicPickerDemo2.default;
	    this.AsyncPickerDemoTpl = _AsyncPickerDemo2.default;
	    this.FormattedPickerDemoTpl = _FormattedPickerDemo2.default;
	    this.CustomPickerResultsDemoTpl = _CustomPickerResultsDemo2.default;
	
	    this.placeholder = 'Select...';
	
	    var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
	
	    var abbrieviated = [{
	        value: 'USA',
	        label: 'United States'
	    }, {
	        value: 'GB',
	        label: 'Great Britain'
	    }, {
	        value: 'CA',
	        label: 'Canada'
	    }, {
	        value: 'AU',
	        label: 'Austrailia'
	    }];
	
	    var collaborators = [{
	        id: 1,
	        firstName: 'Brian',
	        lastName: 'Kimball'
	    }, {
	        id: 2,
	        firstName: 'Josh',
	        lastName: 'Godi'
	    }, {
	        id: 3,
	        firstName: 'Alec',
	        lastName: 'Sibilia'
	    }, {
	        id: 4,
	        firstName: 'Kameron',
	        lastName: 'Sween'
	    }];
	
	    this.static = { options: states };
	
	    this.formatted = {
	        //field: 'id',
	        format: '$firstName $lastName',
	        options: collaborators
	    };
	
	    this.custom = {
	        resultsTemplate: CustomPickerResults,
	        format: '$firstName $lastName',
	        options: collaborators
	    };
	
	    this.value = 'Alabama';
	    this.async = {
	        options: function options() {
	            return new Promise(function (resolve) {
	                setTimeout(function () {
	                    resolve(abbrieviated);
	                }, 300);
	            });
	        }
	    };
	}) || _class2);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvcGlja2VyL1BpY2tlckRlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztrQ0FBQTs7QUFFQTs7QUFLQTs7O0FBTkE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztJQXNCYSxtQixXQUFBLG1CLFdBcEJaLHFCQUFVO0FBQ1AsY0FBVSx1QkFESDtBQUVQLFVBQU07QUFDRixpQkFBUztBQURQLEtBRkM7QUFLUDtBQUxPLENBQVYsQzs7Ozs7Ozs7Ozs7OztBQXVCRCxJQUFNLCtyRUFBTjs7SUEwQ2EsbUIsV0FBQSxtQixZQUpaLHFCQUFVO0FBQ1AsY0FBVSxhQURIO0FBRVAsY0FBVTtBQUZILENBQVYsQyxrQkFLRywrQkFBYztBQUFBOztBQUNWLFNBQUssa0JBQUw7QUFDQSxTQUFLLGtCQUFMO0FBQ0EsU0FBSyxzQkFBTDtBQUNBLFNBQUssMEJBQUw7O0FBRUEsU0FBSyxXQUFMLEdBQW1CLFdBQW5COztBQUVBLFFBQUksU0FBUyxDQUFDLFNBQUQsRUFBWSxRQUFaLEVBQXNCLFNBQXRCLEVBQWlDLFVBQWpDLEVBQTZDLFlBQTdDLEVBQTJELFVBQTNELEVBQXVFLGFBQXZFLEVBQXNGLFVBQXRGLEVBQWtHLFNBQWxHLEVBQTZHLFNBQTdHLEVBQXdILFFBQXhILEVBQWtJLE9BQWxJLEVBQTJJLFVBQTNJLEVBQXVKLFNBQXZKLEVBQWtLLE1BQWxLLEVBQTBLLFFBQTFLLEVBQW9MLFVBQXBMLEVBQWdNLFdBQWhNLEVBQTZNLE9BQTdNLEVBQXNOLFVBQXROLEVBQWtPLGVBQWxPLEVBQW1QLFVBQW5QLEVBQStQLFdBQS9QLEVBQTRRLGFBQTVRLEVBQTJSLFVBQTNSLEVBQXVTLFNBQXZTLEVBQWtULFVBQWxULEVBQThULFFBQTlULEVBQXdVLGVBQXhVLEVBQXlWLFlBQXpWLEVBQXVXLFlBQXZXLEVBQXFYLFVBQXJYLEVBQWlZLGNBQWpZLEVBQWlaLGdCQUFqWixFQUFtYSxNQUFuYSxFQUEyYSxVQUEzYSxFQUF1YixRQUF2YixFQUFpYyxjQUFqYyxFQUFpZCxjQUFqZCxFQUFpZSxnQkFBamUsRUFBbWYsY0FBbmYsRUFBbWdCLFdBQW5nQixFQUFnaEIsT0FBaGhCLEVBQXloQixNQUF6aEIsRUFBaWlCLFNBQWppQixFQUE0aUIsVUFBNWlCLEVBQXdqQixZQUF4akIsRUFBc2tCLGVBQXRrQixFQUF1bEIsV0FBdmxCLEVBQW9tQixTQUFwbUIsQ0FBYjs7QUFFQSxRQUFJLGVBQWUsQ0FBQztBQUNoQixlQUFPLEtBRFM7QUFFaEIsZUFBTztBQUZTLEtBQUQsRUFHaEI7QUFDQyxlQUFPLElBRFI7QUFFQyxlQUFPO0FBRlIsS0FIZ0IsRUFNaEI7QUFDQyxlQUFPLElBRFI7QUFFQyxlQUFPO0FBRlIsS0FOZ0IsRUFTaEI7QUFDQyxlQUFPLElBRFI7QUFFQyxlQUFPO0FBRlIsS0FUZ0IsQ0FBbkI7O0FBY0EsUUFBSSxnQkFBZ0IsQ0FBQztBQUNqQixZQUFJLENBRGE7QUFFakIsbUJBQVcsT0FGTTtBQUdqQixrQkFBVTtBQUhPLEtBQUQsRUFJakI7QUFDQyxZQUFJLENBREw7QUFFQyxtQkFBVyxNQUZaO0FBR0Msa0JBQVU7QUFIWCxLQUppQixFQVFqQjtBQUNDLFlBQUksQ0FETDtBQUVDLG1CQUFXLE1BRlo7QUFHQyxrQkFBVTtBQUhYLEtBUmlCLEVBWWpCO0FBQ0MsWUFBSSxDQURMO0FBRUMsbUJBQVcsU0FGWjtBQUdDLGtCQUFVO0FBSFgsS0FaaUIsQ0FBcEI7O0FBa0JBLFNBQUssTUFBTCxHQUFjLEVBQUUsU0FBUyxNQUFYLEVBQWQ7O0FBRUEsU0FBSyxTQUFMLEdBQWlCO0FBQ2I7QUFDQSxnQkFBUSxzQkFGSztBQUdiLGlCQUFTO0FBSEksS0FBakI7O0FBTUEsU0FBSyxNQUFMLEdBQWM7QUFDVix5QkFBaUIsbUJBRFA7QUFFVixnQkFBUSxzQkFGRTtBQUdWLGlCQUFTO0FBSEMsS0FBZDs7QUFNQSxTQUFLLEtBQUwsR0FBYSxTQUFiO0FBQ0EsU0FBSyxLQUFMLEdBQWE7QUFDVCxpQkFBUyxtQkFBTTtBQUNYLG1CQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFhO0FBQzVCLDJCQUFXLFlBQU07QUFDYiw0QkFBUSxZQUFSO0FBQ0gsaUJBRkQsRUFFRyxHQUZIO0FBR0gsYUFKTSxDQUFQO0FBS0g7QUFQUSxLQUFiO0FBU0gsQyIsImZpbGUiOiJQaWNrZXJEZW1vLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ29kaS9ub3ZvLWRldi9saWJzL25vdm8tZWxlbWVudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgQmFzaWNQaWNrZXJEZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL0Jhc2ljUGlja2VyRGVtby5odG1sJztcbmltcG9ydCBBc3luY1BpY2tlckRlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvQXN5bmNQaWNrZXJEZW1vLmh0bWwnO1xuaW1wb3J0IEZvcm1hdHRlZFBpY2tlckRlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvRm9ybWF0dGVkUGlja2VyRGVtby5odG1sJztcbmltcG9ydCBDdXN0b21QaWNrZXJSZXN1bHRzRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9DdXN0b21QaWNrZXJSZXN1bHRzRGVtby5odG1sJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgUGlja2VyUmVzdWx0cyB9IGZyb20gJy4vLi4vLi4vLi4vLi4vc3JjL25vdm8tZWxlbWVudHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2N1c3RvbS1waWNrZXItcmVzdWx0cycsXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAnYWN0aXZlIHBpY2tlci1yZXN1bHRzJ1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5vdm8tbG9hZGluZyB0aGVtZT1cImxpbmVcIiAqbmdJZj1cImlzTG9hZGluZyAmJiAhbWF0Y2hlcy5sZW5ndGhcIj48L25vdm8tbG9hZGluZz5cbiAgICAgICAgPHVsICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgbWF0Y2ggb2YgbWF0Y2hlc1wiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdE1hdGNoKCRldmVudClcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwibWF0Y2g9PT1hY3RpdmVNYXRjaFwiXG4gICAgICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwic2VsZWN0QWN0aXZlKG1hdGNoKVwiPlxuICAgICAgICAgICAgICAgICoqQ1VTVE9NKiogPGIgW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2gubGFiZWwsIHRlcm0pXCI+PC9iPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgICAgPHAgY2xhc3M9XCJwaWNrZXItZXJyb3JcIiAqbmdJZj1cImhhc0Vycm9yXCI+T29wcyEgQW4gZXJyb3Igb2NjdXJlZC48L3A+XG4gICAgICAgIDxwIGNsYXNzPVwicGlja2VyLW51bGxcIiAqbmdJZj1cIiFpc0xvYWRpbmcgJiYgIW1hdGNoZXMubGVuZ3RoICYmICFoYXNFcnJvclwiPk5vIHJlc3VsdHMgdG8gZGlzcGxheS4uLjwvcD5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbVBpY2tlclJlc3VsdHMgZXh0ZW5kcyBQaWNrZXJSZXN1bHRzIHtcbn1cblxuY29uc3QgdGVtcGxhdGUgPSBgXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGgxPlBpY2tlciA8c21hbGw+PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9idWxsaG9ybi9ub3ZvLWVsZW1lbnRzL2Jsb2IvbWFzdGVyL3NyYy9lbGVtZW50cy9waWNrZXJcIj4oc291cmNlKTwvYT48L3NtYWxsPjwvaDE+XG4gICAgPHA+VGhlIHBpY2tlciBlbGVtZW50ICg8Y29kZT5pbnB1dFtwaWNrZXJdPC9jb2RlPikgcmVwcmVzZW50cyBhIGNvbnRyb2wgdGhhdCBwcmVzZW50cyBhIG1lbnUgb2Ygb3B0aW9ucy4gVGhlIG9wdGlvbnNcbiAgICB3aXRoaW4gYXJlIHNldCBieSB0aGUgPGNvZGU+aXRlbXM8L2NvZGU+IGF0dHJpYnV0ZS4gT3B0aW9ucyBjYW4gYmUgcHJlLXBpY2tlcmVkIGZvciB0aGUgdXNlciB1c2luZyB0aGUgPGNvZGU+dmFsdWU8L2NvZGU+XG4gICAgYXR0cmlidXRlLjwvcD5cbiAgICA8YnIvPlxuICAgIDxoNT5CYXNpYyBFeGFtcGxlczwvaDU+XG4gICAgPHA+XG4gICAgICAgIEJ5IGNsaWNraW5nIG9uIHRoZSA8Y29kZT5pbnB1dDwvY29kZT4gZWxlbWVudCwgdGhlIG9wdGlvbnMgbGlzdCB3aWxsIGJlIGRpc3BsYXllZC4gIHBpY2tlciBhbnkgb2YgdGhlIG9wdGlvbnNcbiAgICAgICAgYnkgY2xpY2tpbmcgb24gdGhlIGl0ZW0gaW4gdGhlIGxpc3QuICBUaGUgdmFsdWUgcGlja2VyZWQgd2lsbCBiZSBkaXNwbGF5ZWQgYW5kIHRoZSBvcHRpb25zIGxpc3Qgd2lsbCBiZSByZW1vdmVkLlxuICAgIDwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBwaWNrZXItZGVtb1wiPiR7QmFzaWNQaWNrZXJEZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiQmFzaWNQaWNrZXJEZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG4gICAgPGg1PkFzeW5jIEV4YW1wbGVzPC9oNT5cbiAgICA8cD5cbiAgICAgICAgQnkgY2xpY2tpbmcgb24gdGhlIDxjb2RlPmlucHV0PC9jb2RlPiBlbGVtZW50LCB0aGUgb3B0aW9ucyBsaXN0IHdpbGwgYmUgZGlzcGxheWVkLiAgcGlja2VyIGFueSBvZiB0aGUgb3B0aW9uc1xuICAgICAgICBieSBjbGlja2luZyBvbiB0aGUgaXRlbSBpbiB0aGUgbGlzdC4gIFRoZSB2YWx1ZSBwaWNrZXJlZCB3aWxsIGJlIGRpc3BsYXllZCBhbmQgdGhlIG9wdGlvbnMgbGlzdCB3aWxsIGJlIHJlbW92ZWQuXG4gICAgPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIHBpY2tlci1kZW1vXCI+JHtBc3luY1BpY2tlckRlbW9UcGx9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJBc3luY1BpY2tlckRlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cbiAgICA8aDU+Rm9ybWF0ZWQgUGlja2VyIEV4YW1wbGVzPC9oNT5cbiAgICA8cD5cbiAgICAgICAgQnkgY2xpY2tpbmcgb24gdGhlIDxjb2RlPmlucHV0PC9jb2RlPiBlbGVtZW50LCB0aGUgb3B0aW9ucyBsaXN0IHdpbGwgYmUgZGlzcGxheWVkLiAgcGlja2VyIGFueSBvZiB0aGUgb3B0aW9uc1xuICAgICAgICBieSBjbGlja2luZyBvbiB0aGUgaXRlbSBpbiB0aGUgbGlzdC4gIFRoZSB2YWx1ZSBwaWNrZXJlZCB3aWxsIGJlIGRpc3BsYXllZCBhbmQgdGhlIG9wdGlvbnMgbGlzdCB3aWxsIGJlIHJlbW92ZWQuXG4gICAgPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIHBpY2tlci1kZW1vXCI+JHtGb3JtYXR0ZWRQaWNrZXJEZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiRm9ybWF0dGVkUGlja2VyRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuICAgIDxoNT5DdXN0b20gUGlja2VyIEV4YW1wbGVzPC9oNT5cbiAgICA8cD5cbiAgICAgICAgQnkgY2xpY2tpbmcgb24gdGhlIDxjb2RlPmlucHV0PC9jb2RlPiBlbGVtZW50LCB0aGUgb3B0aW9ucyBsaXN0IHdpbGwgYmUgZGlzcGxheWVkLiAgcGlja2VyIGFueSBvZiB0aGUgb3B0aW9uc1xuICAgICAgICBieSBjbGlja2luZyBvbiB0aGUgaXRlbSBpbiB0aGUgbGlzdC4gIFRoZSB2YWx1ZSBwaWNrZXJlZCB3aWxsIGJlIGRpc3BsYXllZCBhbmQgdGhlIG9wdGlvbnMgbGlzdCB3aWxsIGJlIHJlbW92ZWQuXG4gICAgPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIHBpY2tlci1kZW1vXCI+JHtDdXN0b21QaWNrZXJSZXN1bHRzRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIkN1c3RvbVBpY2tlclJlc3VsdHNEZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG48L2Rpdj5cbmA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGlja2VyLWRlbW8nLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBQaWNrZXJEZW1vQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5CYXNpY1BpY2tlckRlbW9UcGwgPSBCYXNpY1BpY2tlckRlbW9UcGw7XG4gICAgICAgIHRoaXMuQXN5bmNQaWNrZXJEZW1vVHBsID0gQXN5bmNQaWNrZXJEZW1vVHBsO1xuICAgICAgICB0aGlzLkZvcm1hdHRlZFBpY2tlckRlbW9UcGwgPSBGb3JtYXR0ZWRQaWNrZXJEZW1vVHBsO1xuICAgICAgICB0aGlzLkN1c3RvbVBpY2tlclJlc3VsdHNEZW1vVHBsID0gQ3VzdG9tUGlja2VyUmVzdWx0c0RlbW9UcGw7XG5cbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9ICdTZWxlY3QuLi4nO1xuXG4gICAgICAgIGxldCBzdGF0ZXMgPSBbJ0FsYWJhbWEnLCAnQWxhc2thJywgJ0FyaXpvbmEnLCAnQXJrYW5zYXMnLCAnQ2FsaWZvcm5pYScsICdDb2xvcmFkbycsICdDb25uZWN0aWN1dCcsICdEZWxhd2FyZScsICdGbG9yaWRhJywgJ0dlb3JnaWEnLCAnSGF3YWlpJywgJ0lkYWhvJywgJ0lsbGlub2lzJywgJ0luZGlhbmEnLCAnSW93YScsICdLYW5zYXMnLCAnS2VudHVja3knLCAnTG91aXNpYW5hJywgJ01haW5lJywgJ01hcnlsYW5kJywgJ01hc3NhY2h1c2V0dHMnLCAnTWljaGlnYW4nLCAnTWlubmVzb3RhJywgJ01pc3Npc3NpcHBpJywgJ01pc3NvdXJpJywgJ01vbnRhbmEnLCAnTmVicmFza2EnLCAnTmV2YWRhJywgJ05ldyBIYW1wc2hpcmUnLCAnTmV3IEplcnNleScsICdOZXcgTWV4aWNvJywgJ05ldyBZb3JrJywgJ05vcnRoIERha290YScsICdOb3J0aCBDYXJvbGluYScsICdPaGlvJywgJ09rbGFob21hJywgJ09yZWdvbicsICdQZW5uc3lsdmFuaWEnLCAnUmhvZGUgSXNsYW5kJywgJ1NvdXRoIENhcm9saW5hJywgJ1NvdXRoIERha290YScsICdUZW5uZXNzZWUnLCAnVGV4YXMnLCAnVXRhaCcsICdWZXJtb250JywgJ1ZpcmdpbmlhJywgJ1dhc2hpbmd0b24nLCAnV2VzdCBWaXJnaW5pYScsICdXaXNjb25zaW4nLCAnV3lvbWluZyddO1xuXG4gICAgICAgIGxldCBhYmJyaWV2aWF0ZWQgPSBbe1xuICAgICAgICAgICAgdmFsdWU6ICdVU0EnLFxuICAgICAgICAgICAgbGFiZWw6ICdVbml0ZWQgU3RhdGVzJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB2YWx1ZTogJ0dCJyxcbiAgICAgICAgICAgIGxhYmVsOiAnR3JlYXQgQnJpdGFpbidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdmFsdWU6ICdDQScsXG4gICAgICAgICAgICBsYWJlbDogJ0NhbmFkYSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdmFsdWU6ICdBVScsXG4gICAgICAgICAgICBsYWJlbDogJ0F1c3RyYWlsaWEnXG4gICAgICAgIH1dO1xuXG4gICAgICAgIGxldCBjb2xsYWJvcmF0b3JzID0gW3tcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgZmlyc3ROYW1lOiAnQnJpYW4nLFxuICAgICAgICAgICAgbGFzdE5hbWU6ICdLaW1iYWxsJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgIGZpcnN0TmFtZTogJ0pvc2gnLFxuICAgICAgICAgICAgbGFzdE5hbWU6ICdHb2RpJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogMyxcbiAgICAgICAgICAgIGZpcnN0TmFtZTogJ0FsZWMnLFxuICAgICAgICAgICAgbGFzdE5hbWU6ICdTaWJpbGlhJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogNCxcbiAgICAgICAgICAgIGZpcnN0TmFtZTogJ0thbWVyb24nLFxuICAgICAgICAgICAgbGFzdE5hbWU6ICdTd2VlbidcbiAgICAgICAgfV07XG5cbiAgICAgICAgdGhpcy5zdGF0aWMgPSB7IG9wdGlvbnM6IHN0YXRlcyB9O1xuXG4gICAgICAgIHRoaXMuZm9ybWF0dGVkID0ge1xuICAgICAgICAgICAgLy9maWVsZDogJ2lkJyxcbiAgICAgICAgICAgIGZvcm1hdDogJyRmaXJzdE5hbWUgJGxhc3ROYW1lJyxcbiAgICAgICAgICAgIG9wdGlvbnM6IGNvbGxhYm9yYXRvcnNcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmN1c3RvbSA9IHtcbiAgICAgICAgICAgIHJlc3VsdHNUZW1wbGF0ZTogQ3VzdG9tUGlja2VyUmVzdWx0cyxcbiAgICAgICAgICAgIGZvcm1hdDogJyRmaXJzdE5hbWUgJGxhc3ROYW1lJyxcbiAgICAgICAgICAgIG9wdGlvbnM6IGNvbGxhYm9yYXRvcnNcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnZhbHVlID0gJ0FsYWJhbWEnO1xuICAgICAgICB0aGlzLmFzeW5jID0ge1xuICAgICAgICAgICAgb3B0aW9uczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYWJicmlldmlhdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TableDemoComponent = exports.ExtraDetails = exports.StatusCell = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class, _dec2, _class2, _dec3, _class3; // NG2
	
	// APP
	
	// Vendor
	
	
	var _core = __webpack_require__(2);
	
	var _TableData = __webpack_require__(385);
	
	var _TableDemo = __webpack_require__(522);
	
	var _TableDemo2 = _interopRequireDefault(_TableDemo);
	
	var _DetailsTableDemo = __webpack_require__(520);
	
	var _DetailsTableDemo2 = _interopRequireDefault(_DetailsTableDemo);
	
	var _SelectAllTableDemo = __webpack_require__(521);
	
	var _SelectAllTableDemo2 = _interopRequireDefault(_SelectAllTableDemo);
	
	var _novoElements = __webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var template = '\n<div class="container">\n    <h1>Table <small><a target="_blank" href="https://bullhorn.github.io/novo-elements/blob/master/src/elements/table">(source)</a></small></h1>\n    <p>Tables allow users to view date in a tabular format and perform actions such as Sorting and Filtering. Different configuration are possible for pagination or infinite scroll. Feature to be added include: Custom Item Renderers, etc...</p>\n\n    <h2>Types</h2>\n\n    <h5>Basic Table</h5>\n    <p>This is the most basic table.</p>\n    <div class="example table-demo">' + _TableDemo2.default + '</div>\n    <code-snippet [code]="TableDemoTpl"></code-snippet>\n    <h5>Details Table</h5>\n    <p>This has a row renderer to show a new details row that is expanded when you click on the action column.</p>\n    <div class="example table-demo">' + _DetailsTableDemo2.default + '</div>\n    <code-snippet [code]="DetailsTableDemoTpl"></code-snippet>\n\n    <h5>Select All Table w/ Custom Actions</h5>\n    <p>This has checkboxes for selection with custom actions.</p>\n    <div class="example table-demo">' + _SelectAllTableDemo2.default + '</div>\n    <code-snippet [code]="SelectAllTableDemoTpl"></code-snippet>\n</div>\n';
	
	var HEADER_COLORS = ['aqua', 'ocean', 'mint', 'grass', 'sunflower', 'company', 'lead', 'positive', 'black'];
	
	var StatusCell = exports.StatusCell = (_dec = (0, _core.Component)({
	    selector: 'status-cell',
	    template: '\n        <div class="status-cell">\n            <i class="bhi-info"></i>\n            <label>{{ value }}</label>\n        </div>\n    '
	}), _dec(_class = function (_BaseRenderer) {
	    _inherits(StatusCell, _BaseRenderer);
	
	    function StatusCell() {
	        _classCallCheck(this, StatusCell);
	
	        return _possibleConstructorReturn(this, (StatusCell.__proto__ || Object.getPrototypeOf(StatusCell)).apply(this, arguments));
	    }
	
	    return StatusCell;
	}(_novoElements.BaseRenderer)) || _class);
	var ExtraDetails = exports.ExtraDetails = (_dec2 = (0, _core.Component)({
	    selector: 'extra-details',
	    template: '\n        <div class="extra-data">\n            <label><i class="bhi-info"></i>Description</label>\n            <p>{{ data.description }}</p>\n            <label><i class="bhi-info"></i>Categories</label>\n            <p>{{ data.categories }}</p>\n        </div>\n    '
	}), _dec2(_class2 = function (_BaseRenderer2) {
	    _inherits(ExtraDetails, _BaseRenderer2);
	
	    function ExtraDetails() {
	        _classCallCheck(this, ExtraDetails);
	
	        return _possibleConstructorReturn(this, (ExtraDetails.__proto__ || Object.getPrototypeOf(ExtraDetails)).apply(this, arguments));
	    }
	
	    return ExtraDetails;
	}(_novoElements.BaseRenderer)) || _class2);
	var TableDemoComponent = exports.TableDemoComponent = (_dec3 = (0, _core.Component)({
	    selector: 'table-demo',
	    template: template
	}), _dec3(_class3 = function () {
	    function TableDemoComponent() {
	        var _this3 = this;
	
	        _classCallCheck(this, TableDemoComponent);
	
	        this.TableDemoTpl = _TableDemo2.default;
	        this.DetailsTableDemoTpl = _DetailsTableDemo2.default;
	        this.SelectAllTableDemoTpl = _SelectAllTableDemo2.default;
	
	        this.customRowOptions = [{ label: '10', value: 10 }, { label: '20', value: 20 }, { label: '30', value: 30 }, { label: '40', value: 40 }];
	
	        var columns = [{ title: 'Name', name: 'name', ordering: true, type: 'link', filtering: true }, { title: 'Position', name: 'position', ordering: true, filtering: true }, {
	            title: 'Extn.',
	            name: 'ext',
	            ordering: true,
	            renderer: function renderer(object) {
	                return object.ext.obj;
	            },
	            compare: function compare(sort, previous, current) {
	                var first = previous.obj,
	                    second = current.obj;
	
	                if (first > second) {
	                    return sort === 'desc' ? -1 : 1;
	                }
	                if (first < second) {
	                    return sort === 'asc' ? -1 : 1;
	                }
	                return 0;
	            }
	        }, {
	            title: 'Start date',
	            type: 'date',
	            name: 'startDate',
	            renderer: _novoElements.DateCell,
	            ordering: true,
	            filtering: true,
	            range: true
	        }, {
	            title: 'Salary',
	            name: 'salary',
	            ordering: true,
	            renderer: function renderer(object) {
	                return '$ ' + Number(object.salary).toFixed(2);
	            }
	        }, {
	            title: 'Status',
	            name: 'status',
	            options: ['New Lead', 'Active', 'Archived'],
	            ordering: true,
	            multiple: true,
	            renderer: StatusCell,
	            filtering: true
	        }];
	
	        this.basic = {
	            columns: columns.slice(),
	            rows: _TableData.TableData.slice(),
	            config: {
	                paging: {
	                    current: 1,
	                    itemsPerPage: 10,
	                    onPageChange: function onPageChange(event) {
	                        _this3.basic.config.paging.current = event.page;
	                        _this3.basic.config.paging.itemsPerPage = event.itemsPerPage;
	                    }
	                },
	                filtering: true,
	                sorting: true,
	                ordering: true,
	                resizing: true
	            }
	        };
	
	        this.details = {
	            columns: columns.slice(),
	            rows: _TableData.TableData.slice(),
	            config: {
	                paging: {
	                    current: 1,
	                    itemsPerPage: 10,
	                    onPageChange: function onPageChange(event) {
	                        _this3.details.config.paging.current = event.page;
	                        _this3.details.config.paging.itemsPerPage = event.itemsPerPage;
	                    }
	                },
	                sorting: true,
	                filtering: true,
	                ordering: true,
	                resizing: true,
	                hasDetails: true,
	                detailsRenderer: ExtraDetails
	            }
	        };
	
	        this.selectAll = {
	            columns: columns.slice(),
	            rows: _TableData.TableData.slice(),
	            config: {
	                paging: {
	                    current: 1,
	                    itemsPerPage: 10,
	                    onPageChange: function onPageChange(event) {
	                        _this3.selectAll.config.paging.current = event.page;
	                        _this3.selectAll.config.paging.itemsPerPage = event.itemsPerPage;
	                    }
	                },
	                sorting: true,
	                filtering: true,
	                ordering: true,
	                resizing: true,
	                rowSelectionStyle: 'checkbox'
	            }
	        };
	    }
	
	    _createClass(TableDemoComponent, [{
	        key: 'ngOnInit',
	        value: function ngOnInit() {
	            this.theme = HEADER_COLORS[0];
	        }
	    }, {
	        key: 'changeTheme',
	        value: function changeTheme() {
	            var idx = HEADER_COLORS.indexOf(this.theme);
	            if (idx === HEADER_COLORS.length - 1) {
	                idx = -1;
	            }
	            this.theme = HEADER_COLORS[idx + 1];
	        }
	    }, {
	        key: 'singleAction',
	        value: function singleAction() {
	            window.alert('HI!'); // eslint-disable-line
	        }
	    }, {
	        key: 'selectedAction',
	        value: function selectedAction(action) {
	            window.alert('You clicked ' + action + '!'); // eslint-disable-line
	        }
	    }]);
	
	    return TableDemoComponent;
	}()) || _class3);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvdGFibGUvVGFibGVEZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztrREFBQTs7QUFFQTs7QUFLQTs7O0FBTkE7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNLDByQ0FBTjs7QUF1QkEsSUFBTSxnQkFBZ0IsQ0FBQyxNQUFELEVBQVMsT0FBVCxFQUFrQixNQUFsQixFQUEwQixPQUExQixFQUFtQyxXQUFuQyxFQUFnRCxTQUFoRCxFQUEyRCxNQUEzRCxFQUFtRSxVQUFuRSxFQUErRSxPQUEvRSxDQUF0Qjs7SUFXYSxVLFdBQUEsVSxXQVRaLHFCQUFVO0FBQ1AsY0FBVSxhQURIO0FBRVA7QUFGTyxDQUFWLEM7Ozs7Ozs7Ozs7O0lBdUJZLFksV0FBQSxZLFlBWFoscUJBQVU7QUFDUCxjQUFVLGVBREg7QUFFUDtBQUZPLENBQVYsQzs7Ozs7Ozs7Ozs7SUFrQlksa0IsV0FBQSxrQixZQUpaLHFCQUFVO0FBQ1AsY0FBVSxZQURIO0FBRVAsY0FBVTtBQUZILENBQVYsQztBQUtHLGtDQUFjO0FBQUE7O0FBQUE7O0FBQ1YsYUFBSyxZQUFMO0FBQ0EsYUFBSyxtQkFBTDtBQUNBLGFBQUsscUJBQUw7O0FBRUEsYUFBSyxnQkFBTCxHQUF3QixDQUNwQixFQUFFLE9BQU8sSUFBVCxFQUFlLE9BQU8sRUFBdEIsRUFEb0IsRUFFcEIsRUFBRSxPQUFPLElBQVQsRUFBZSxPQUFPLEVBQXRCLEVBRm9CLEVBR3BCLEVBQUUsT0FBTyxJQUFULEVBQWUsT0FBTyxFQUF0QixFQUhvQixFQUlwQixFQUFFLE9BQU8sSUFBVCxFQUFlLE9BQU8sRUFBdEIsRUFKb0IsQ0FBeEI7O0FBT0EsWUFBSSxVQUFVLENBQ1YsRUFBRSxPQUFPLE1BQVQsRUFBaUIsTUFBTSxNQUF2QixFQUErQixVQUFVLElBQXpDLEVBQStDLE1BQU0sTUFBckQsRUFBNkQsV0FBVyxJQUF4RSxFQURVLEVBRVYsRUFBRSxPQUFPLFVBQVQsRUFBcUIsTUFBTSxVQUEzQixFQUF1QyxVQUFVLElBQWpELEVBQXVELFdBQVcsSUFBbEUsRUFGVSxFQUdWO0FBQ0ksbUJBQU8sT0FEWDtBQUVJLGtCQUFNLEtBRlY7QUFHSSxzQkFBVSxJQUhkO0FBSUksc0JBQVUsMEJBQVU7QUFDaEIsdUJBQU8sT0FBTyxHQUFQLENBQVcsR0FBbEI7QUFDSCxhQU5MO0FBT0kscUJBQVMsaUJBQUMsSUFBRCxFQUFPLFFBQVAsRUFBaUIsT0FBakIsRUFBNkI7QUFDbEMsb0JBQUksUUFBUSxTQUFTLEdBQXJCO0FBQUEsb0JBQ0ksU0FBUyxRQUFRLEdBRHJCOztBQUdBLG9CQUFJLFFBQVEsTUFBWixFQUFvQjtBQUNoQiwyQkFBTyxTQUFTLE1BQVQsR0FBa0IsQ0FBQyxDQUFuQixHQUF1QixDQUE5QjtBQUNIO0FBQ0Qsb0JBQUksUUFBUSxNQUFaLEVBQW9CO0FBQ2hCLDJCQUFPLFNBQVMsS0FBVCxHQUFpQixDQUFDLENBQWxCLEdBQXNCLENBQTdCO0FBQ0g7QUFDRCx1QkFBTyxDQUFQO0FBQ0g7QUFsQkwsU0FIVSxFQXVCVjtBQUNJLG1CQUFPLFlBRFg7QUFFSSxrQkFBTSxNQUZWO0FBR0ksa0JBQU0sV0FIVjtBQUlJLDRDQUpKO0FBS0ksc0JBQVUsSUFMZDtBQU1JLHVCQUFXLElBTmY7QUFPSSxtQkFBTztBQVBYLFNBdkJVLEVBZ0NWO0FBQ0ksbUJBQU8sUUFEWDtBQUVJLGtCQUFNLFFBRlY7QUFHSSxzQkFBVSxJQUhkO0FBSUksc0JBQVUsa0JBQUMsTUFBRCxFQUFZO0FBQ2xCLDhCQUFZLE9BQU8sT0FBTyxNQUFkLEVBQXNCLE9BQXRCLENBQThCLENBQTlCLENBQVo7QUFDSDtBQU5MLFNBaENVLEVBd0NWO0FBQ0ksbUJBQU8sUUFEWDtBQUVJLGtCQUFNLFFBRlY7QUFHSSxxQkFBUyxDQUFDLFVBQUQsRUFBYSxRQUFiLEVBQXVCLFVBQXZCLENBSGI7QUFJSSxzQkFBVSxJQUpkO0FBS0ksc0JBQVUsSUFMZDtBQU1JLHNCQUFVLFVBTmQ7QUFPSSx1QkFBVztBQVBmLFNBeENVLENBQWQ7O0FBbURBLGFBQUssS0FBTCxHQUFhO0FBQ1QscUJBQVMsUUFBUSxLQUFSLEVBREE7QUFFVCxrQkFBTSxxQkFBVSxLQUFWLEVBRkc7QUFHVCxvQkFBUTtBQUNKLHdCQUFRO0FBQ0osNkJBQVMsQ0FETDtBQUVKLGtDQUFjLEVBRlY7QUFHSixrQ0FBYyw2QkFBUztBQUNuQiwrQkFBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixNQUFsQixDQUF5QixPQUF6QixHQUFtQyxNQUFNLElBQXpDO0FBQ0EsK0JBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsTUFBbEIsQ0FBeUIsWUFBekIsR0FBd0MsTUFBTSxZQUE5QztBQUNIO0FBTkcsaUJBREo7QUFTSiwyQkFBVyxJQVRQO0FBVUoseUJBQVMsSUFWTDtBQVdKLDBCQUFVLElBWE47QUFZSiwwQkFBVTtBQVpOO0FBSEMsU0FBYjs7QUFtQkEsYUFBSyxPQUFMLEdBQWU7QUFDWCxxQkFBUyxRQUFRLEtBQVIsRUFERTtBQUVYLGtCQUFNLHFCQUFVLEtBQVYsRUFGSztBQUdYLG9CQUFRO0FBQ0osd0JBQVE7QUFDSiw2QkFBUyxDQURMO0FBRUosa0NBQWMsRUFGVjtBQUdKLGtDQUFjLDZCQUFTO0FBQ25CLCtCQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLE1BQXBCLENBQTJCLE9BQTNCLEdBQXFDLE1BQU0sSUFBM0M7QUFDQSwrQkFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixNQUFwQixDQUEyQixZQUEzQixHQUEwQyxNQUFNLFlBQWhEO0FBQ0g7QUFORyxpQkFESjtBQVNKLHlCQUFTLElBVEw7QUFVSiwyQkFBVyxJQVZQO0FBV0osMEJBQVUsSUFYTjtBQVlKLDBCQUFVLElBWk47QUFhSiw0QkFBWSxJQWJSO0FBY0osaUNBQWlCO0FBZGI7QUFIRyxTQUFmOztBQXFCQSxhQUFLLFNBQUwsR0FBaUI7QUFDYixxQkFBUyxRQUFRLEtBQVIsRUFESTtBQUViLGtCQUFNLHFCQUFVLEtBQVYsRUFGTztBQUdiLG9CQUFRO0FBQ0osd0JBQVE7QUFDSiw2QkFBUyxDQURMO0FBRUosa0NBQWMsRUFGVjtBQUdKLGtDQUFjLDZCQUFTO0FBQ25CLCtCQUFLLFNBQUwsQ0FBZSxNQUFmLENBQXNCLE1BQXRCLENBQTZCLE9BQTdCLEdBQXVDLE1BQU0sSUFBN0M7QUFDQSwrQkFBSyxTQUFMLENBQWUsTUFBZixDQUFzQixNQUF0QixDQUE2QixZQUE3QixHQUE0QyxNQUFNLFlBQWxEO0FBQ0g7QUFORyxpQkFESjtBQVNKLHlCQUFTLElBVEw7QUFVSiwyQkFBVyxJQVZQO0FBV0osMEJBQVUsSUFYTjtBQVlKLDBCQUFVLElBWk47QUFhSixtQ0FBbUI7QUFiZjtBQUhLLFNBQWpCO0FBbUJIOzs7O21DQUVVO0FBQ1AsaUJBQUssS0FBTCxHQUFhLGNBQWMsQ0FBZCxDQUFiO0FBQ0g7OztzQ0FFYTtBQUNWLGdCQUFJLE1BQU0sY0FBYyxPQUFkLENBQXNCLEtBQUssS0FBM0IsQ0FBVjtBQUNBLGdCQUFJLFFBQVEsY0FBYyxNQUFkLEdBQXVCLENBQW5DLEVBQXNDO0FBQ2xDLHNCQUFNLENBQUMsQ0FBUDtBQUNIO0FBQ0QsaUJBQUssS0FBTCxHQUFhLGNBQWMsTUFBTSxDQUFwQixDQUFiO0FBQ0g7Ozt1Q0FFYztBQUNYLG1CQUFPLEtBQVAsQ0FBYSxLQUFiLEVBRFcsQ0FDVTtBQUN4Qjs7O3VDQUVjLE0sRUFBUTtBQUNuQixtQkFBTyxLQUFQLGtCQUE0QixNQUE1QixRQURtQixDQUNxQjtBQUMzQyIsImZpbGUiOiJUYWJsZURlbW8uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pnb2RpL25vdm8tZGV2L2xpYnMvbm92by1lbGVtZW50cyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCB7IFRhYmxlRGF0YSB9IGZyb20gJy4vVGFibGVEYXRhJztcbmltcG9ydCBUYWJsZURlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvVGFibGVEZW1vLmh0bWwnO1xuaW1wb3J0IERldGFpbHNUYWJsZURlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvRGV0YWlsc1RhYmxlRGVtby5odG1sJztcbmltcG9ydCBTZWxlY3RBbGxUYWJsZURlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvU2VsZWN0QWxsVGFibGVEZW1vLmh0bWwnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBEYXRlQ2VsbCwgQmFzZVJlbmRlcmVyIH0gZnJvbSAnLi8uLi8uLi8uLi8uLi9zcmMvbm92by1lbGVtZW50cyc7XG5cbmNvbnN0IHRlbXBsYXRlID0gYFxuPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxoMT5UYWJsZSA8c21hbGw+PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vYnVsbGhvcm4uZ2l0aHViLmlvL25vdm8tZWxlbWVudHMvYmxvYi9tYXN0ZXIvc3JjL2VsZW1lbnRzL3RhYmxlXCI+KHNvdXJjZSk8L2E+PC9zbWFsbD48L2gxPlxuICAgIDxwPlRhYmxlcyBhbGxvdyB1c2VycyB0byB2aWV3IGRhdGUgaW4gYSB0YWJ1bGFyIGZvcm1hdCBhbmQgcGVyZm9ybSBhY3Rpb25zIHN1Y2ggYXMgU29ydGluZyBhbmQgRmlsdGVyaW5nLiBEaWZmZXJlbnQgY29uZmlndXJhdGlvbiBhcmUgcG9zc2libGUgZm9yIHBhZ2luYXRpb24gb3IgaW5maW5pdGUgc2Nyb2xsLiBGZWF0dXJlIHRvIGJlIGFkZGVkIGluY2x1ZGU6IEN1c3RvbSBJdGVtIFJlbmRlcmVycywgZXRjLi4uPC9wPlxuXG4gICAgPGgyPlR5cGVzPC9oMj5cblxuICAgIDxoNT5CYXNpYyBUYWJsZTwvaDU+XG4gICAgPHA+VGhpcyBpcyB0aGUgbW9zdCBiYXNpYyB0YWJsZS48L3A+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgdGFibGUtZGVtb1wiPiR7VGFibGVEZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiVGFibGVEZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG4gICAgPGg1PkRldGFpbHMgVGFibGU8L2g1PlxuICAgIDxwPlRoaXMgaGFzIGEgcm93IHJlbmRlcmVyIHRvIHNob3cgYSBuZXcgZGV0YWlscyByb3cgdGhhdCBpcyBleHBhbmRlZCB3aGVuIHlvdSBjbGljayBvbiB0aGUgYWN0aW9uIGNvbHVtbi48L3A+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgdGFibGUtZGVtb1wiPiR7RGV0YWlsc1RhYmxlRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIkRldGFpbHNUYWJsZURlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cblxuICAgIDxoNT5TZWxlY3QgQWxsIFRhYmxlIHcvIEN1c3RvbSBBY3Rpb25zPC9oNT5cbiAgICA8cD5UaGlzIGhhcyBjaGVja2JveGVzIGZvciBzZWxlY3Rpb24gd2l0aCBjdXN0b20gYWN0aW9ucy48L3A+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgdGFibGUtZGVtb1wiPiR7U2VsZWN0QWxsVGFibGVEZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiU2VsZWN0QWxsVGFibGVEZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG48L2Rpdj5cbmA7XG5cbmNvbnN0IEhFQURFUl9DT0xPUlMgPSBbJ2FxdWEnLCAnb2NlYW4nLCAnbWludCcsICdncmFzcycsICdzdW5mbG93ZXInLCAnY29tcGFueScsICdsZWFkJywgJ3Bvc2l0aXZlJywgJ2JsYWNrJ107XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnc3RhdHVzLWNlbGwnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0dXMtY2VsbFwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktaW5mb1wiPjwvaT5cbiAgICAgICAgICAgIDxsYWJlbD57eyB2YWx1ZSB9fTwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgU3RhdHVzQ2VsbCBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZXh0cmEtZGV0YWlscycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImV4dHJhLWRhdGFcIj5cbiAgICAgICAgICAgIDxsYWJlbD48aSBjbGFzcz1cImJoaS1pbmZvXCI+PC9pPkRlc2NyaXB0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgIDxwPnt7IGRhdGEuZGVzY3JpcHRpb24gfX08L3A+XG4gICAgICAgICAgICA8bGFiZWw+PGkgY2xhc3M9XCJiaGktaW5mb1wiPjwvaT5DYXRlZ29yaWVzPC9sYWJlbD5cbiAgICAgICAgICAgIDxwPnt7IGRhdGEuY2F0ZWdvcmllcyB9fTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBFeHRyYURldGFpbHMgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3RhYmxlLWRlbW8nLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZURlbW9Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLlRhYmxlRGVtb1RwbCA9IFRhYmxlRGVtb1RwbDtcbiAgICAgICAgdGhpcy5EZXRhaWxzVGFibGVEZW1vVHBsID0gRGV0YWlsc1RhYmxlRGVtb1RwbDtcbiAgICAgICAgdGhpcy5TZWxlY3RBbGxUYWJsZURlbW9UcGwgPSBTZWxlY3RBbGxUYWJsZURlbW9UcGw7XG5cbiAgICAgICAgdGhpcy5jdXN0b21Sb3dPcHRpb25zID0gW1xuICAgICAgICAgICAgeyBsYWJlbDogJzEwJywgdmFsdWU6IDEwIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAnMjAnLCB2YWx1ZTogMjAgfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICczMCcsIHZhbHVlOiAzMCB9LFxuICAgICAgICAgICAgeyBsYWJlbDogJzQwJywgdmFsdWU6IDQwIH1cbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgY29sdW1ucyA9IFtcbiAgICAgICAgICAgIHsgdGl0bGU6ICdOYW1lJywgbmFtZTogJ25hbWUnLCBvcmRlcmluZzogdHJ1ZSwgdHlwZTogJ2xpbmsnLCBmaWx0ZXJpbmc6IHRydWUgfSxcbiAgICAgICAgICAgIHsgdGl0bGU6ICdQb3NpdGlvbicsIG5hbWU6ICdwb3NpdGlvbicsIG9yZGVyaW5nOiB0cnVlLCBmaWx0ZXJpbmc6IHRydWUgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0V4dG4uJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnZXh0JyxcbiAgICAgICAgICAgICAgICBvcmRlcmluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICByZW5kZXJlcjogb2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdC5leHQub2JqO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcGFyZTogKHNvcnQsIHByZXZpb3VzLCBjdXJyZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaXJzdCA9IHByZXZpb3VzLm9iaixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZCA9IGN1cnJlbnQub2JqO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdCA+IHNlY29uZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNvcnQgPT09ICdkZXNjJyA/IC0xIDogMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3QgPCBzZWNvbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzb3J0ID09PSAnYXNjJyA/IC0xIDogMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnU3RhcnQgZGF0ZScsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2RhdGUnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdzdGFydERhdGUnLFxuICAgICAgICAgICAgICAgIHJlbmRlcmVyOiBEYXRlQ2VsbCxcbiAgICAgICAgICAgICAgICBvcmRlcmluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdTYWxhcnknLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdzYWxhcnknLFxuICAgICAgICAgICAgICAgIG9yZGVyaW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJlbmRlcmVyOiAob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJCAke051bWJlcihvYmplY3Quc2FsYXJ5KS50b0ZpeGVkKDIpfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1N0YXR1cycsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3N0YXR1cycsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogWydOZXcgTGVhZCcsICdBY3RpdmUnLCAnQXJjaGl2ZWQnXSxcbiAgICAgICAgICAgICAgICBvcmRlcmluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICByZW5kZXJlcjogU3RhdHVzQ2VsbCxcbiAgICAgICAgICAgICAgICBmaWx0ZXJpbmc6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLmJhc2ljID0ge1xuICAgICAgICAgICAgY29sdW1uczogY29sdW1ucy5zbGljZSgpLFxuICAgICAgICAgICAgcm93czogVGFibGVEYXRhLnNsaWNlKCksXG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBwYWdpbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudDogMSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNQZXJQYWdlOiAxMCxcbiAgICAgICAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlOiBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2ljLmNvbmZpZy5wYWdpbmcuY3VycmVudCA9IGV2ZW50LnBhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2ljLmNvbmZpZy5wYWdpbmcuaXRlbXNQZXJQYWdlID0gZXZlbnQuaXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgc29ydGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBvcmRlcmluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICByZXNpemluZzogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZGV0YWlscyA9IHtcbiAgICAgICAgICAgIGNvbHVtbnM6IGNvbHVtbnMuc2xpY2UoKSxcbiAgICAgICAgICAgIHJvd3M6IFRhYmxlRGF0YS5zbGljZSgpLFxuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgcGFnaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQ6IDEsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zUGVyUGFnZTogMTAsXG4gICAgICAgICAgICAgICAgICAgIG9uUGFnZUNoYW5nZTogZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxzLmNvbmZpZy5wYWdpbmcuY3VycmVudCA9IGV2ZW50LnBhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbHMuY29uZmlnLnBhZ2luZy5pdGVtc1BlclBhZ2UgPSBldmVudC5pdGVtc1BlclBhZ2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNvcnRpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgZmlsdGVyaW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgIG9yZGVyaW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJlc2l6aW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhhc0RldGFpbHM6IHRydWUsXG4gICAgICAgICAgICAgICAgZGV0YWlsc1JlbmRlcmVyOiBFeHRyYURldGFpbHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnNlbGVjdEFsbCA9IHtcbiAgICAgICAgICAgIGNvbHVtbnM6IGNvbHVtbnMuc2xpY2UoKSxcbiAgICAgICAgICAgIHJvd3M6IFRhYmxlRGF0YS5zbGljZSgpLFxuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgcGFnaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQ6IDEsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zUGVyUGFnZTogMTAsXG4gICAgICAgICAgICAgICAgICAgIG9uUGFnZUNoYW5nZTogZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RBbGwuY29uZmlnLnBhZ2luZy5jdXJyZW50ID0gZXZlbnQucGFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0QWxsLmNvbmZpZy5wYWdpbmcuaXRlbXNQZXJQYWdlID0gZXZlbnQuaXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzb3J0aW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZpbHRlcmluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBvcmRlcmluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICByZXNpemluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICByb3dTZWxlY3Rpb25TdHlsZTogJ2NoZWNrYm94J1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnRoZW1lID0gSEVBREVSX0NPTE9SU1swXTtcbiAgICB9XG5cbiAgICBjaGFuZ2VUaGVtZSgpIHtcbiAgICAgICAgbGV0IGlkeCA9IEhFQURFUl9DT0xPUlMuaW5kZXhPZih0aGlzLnRoZW1lKTtcbiAgICAgICAgaWYgKGlkeCA9PT0gSEVBREVSX0NPTE9SUy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBpZHggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRoZW1lID0gSEVBREVSX0NPTE9SU1tpZHggKyAxXTtcbiAgICB9XG5cbiAgICBzaW5nbGVBY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5hbGVydCgnSEkhJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9XG5cbiAgICBzZWxlY3RlZEFjdGlvbihhY3Rpb24pIHtcbiAgICAgICAgd2luZG93LmFsZXJ0KGBZb3UgY2xpY2tlZCAke2FjdGlvbn0hYCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9XG59XG4iXX0=

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Home = undefined;
	
	var _dec, _class; // NG2
	
	
	var _core = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Home = exports.Home = (_dec = (0, _core.Component)({
	    selector: 'home',
	    template: __webpack_require__(539)
	}), _dec(_class = function Home() {
	    _classCallCheck(this, Home);
	}) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvaG9tZS9Ib21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7a0JBQUE7OztBQUNBOzs7O0lBTWEsSSxXQUFBLEksV0FKWixxQkFBVTtBQUNQLGNBQVUsTUFESDtBQUVQLGNBQVUsUUFBUSxhQUFSO0FBRkgsQ0FBVixDIiwiZmlsZSI6IkhvbWUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pnb2RpL25vdm8tZGV2L2xpYnMvbm92by1lbGVtZW50cyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnaG9tZScsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vSG9tZS5odG1sJylcbn0pXG5leHBvcnQgY2xhc3MgSG9tZSB7XG59XG4iXX0=

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PipesDemoComponent = undefined;
	
	var _dec, _class; // NG2
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _PluralizeDemo = __webpack_require__(540);
	
	var _PluralizeDemo2 = _interopRequireDefault(_PluralizeDemo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Pipes</h1>\n    <p>Utility and helpful pipes.</p>\n\n    <h5>Pluralize <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/pipes/plural">(source)</a></small></h5>\n    <p>Makes works plural or vice-versa</p>\n    <div class="example pipes-demo">' + _PluralizeDemo2.default + '</div>\n    <code-snippet [code]="PluralizeDemoTpl"></code-snippet>\n</div>\n';
	
	var PipesDemoComponent = exports.PipesDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'pipes-demo',
	    template: template
	}), _dec(_class = function PipesDemoComponent() {
	    _classCallCheck(this, PipesDemoComponent);
	
	    this.PluralizeDemoTpl = _PluralizeDemo2.default;
	}) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvdXRpbHMvcGlwZXMvUGlwZXNEZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7a0JBQUE7O0FBRUE7OztBQURBOztBQUVBOzs7Ozs7OztBQUVBLElBQU0sdWJBQU47O0lBZ0JhLGtCLFdBQUEsa0IsV0FKWixxQkFBVTtBQUNQLGNBQVUsWUFESDtBQUVQLGNBQVU7QUFGSCxDQUFWLEMsZ0JBS0csOEJBQWM7QUFBQTs7QUFDVixTQUFLLGdCQUFMO0FBQ0gsQyIsImZpbGUiOiJQaXBlc0RlbW8uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pnb2RpL25vdm8tZGV2L2xpYnMvbm92by1lbGVtZW50cyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCBQbHVyYWxpemVEZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL1BsdXJhbGl6ZURlbW8uaHRtbCc7XG5cbmNvbnN0IHRlbXBsYXRlID0gYFxuPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxoMT5QaXBlczwvaDE+XG4gICAgPHA+VXRpbGl0eSBhbmQgaGVscGZ1bCBwaXBlcy48L3A+XG5cbiAgICA8aDU+UGx1cmFsaXplIDxzbWFsbD48YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2J1bGxob3JuL25vdm8tZWxlbWVudHMvYmxvYi9tYXN0ZXIvc3JjL3BpcGVzL3BsdXJhbFwiPihzb3VyY2UpPC9hPjwvc21hbGw+PC9oNT5cbiAgICA8cD5NYWtlcyB3b3JrcyBwbHVyYWwgb3IgdmljZS12ZXJzYTwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBwaXBlcy1kZW1vXCI+JHtQbHVyYWxpemVEZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiUGx1cmFsaXplRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuPC9kaXY+XG5gO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BpcGVzLWRlbW8nLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBQaXBlc0RlbW9Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLlBsdXJhbGl6ZURlbW9UcGwgPSBQbHVyYWxpemVEZW1vVHBsO1xuICAgIH1cbn1cbiJdfQ==

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.UtilsDemoComponent = undefined;
	
	var _dec, _class; // NG2
	
	
	var _core = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var UtilsDemoComponent = exports.UtilsDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'utils-demo',
	    template: __webpack_require__(541)
	}), _dec(_class = function UtilsDemoComponent() {
	    _classCallCheck(this, UtilsDemoComponent);
	}) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvdXRpbHMvdXRpbHMvVXRpbHNEZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7a0JBQUE7OztBQUNBOzs7O0lBTWEsa0IsV0FBQSxrQixXQUpaLHFCQUFVO0FBQ1AsY0FBVSxZQURIO0FBRVAsY0FBVSxRQUFRLGtCQUFSO0FBRkgsQ0FBVixDIiwiZmlsZSI6IlV0aWxzRGVtby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdvZGkvbm92by1kZXYvbGlicy9ub3ZvLWVsZW1lbnRzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1dGlscy1kZW1vJyxcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9VdGlsc0RlbW8uaHRtbCcpXG59KVxuZXhwb3J0IGNsYXNzIFV0aWxzRGVtb0NvbXBvbmVudCB7XG59XG4iXX0=

/***/ },
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// Vendor
	
	
	var _core = __webpack_require__(2);
	
	var _router = __webpack_require__(107);
	
	var _novoElements = __webpack_require__(18);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DemoComponent = exports.DemoComponent = (_dec = (0, _core.Component)({
	    selector: 'demo-app',
	    template: __webpack_require__(453)
	}), _dec(_class = function () {
	    function DemoComponent(router, viewContainerRef, toaster, modalService) {
	        var _this = this;
	
	        _classCallCheck(this, DemoComponent);
	
	        this.viewContainerRef = viewContainerRef;
	
	        toaster.parentViewContainer = viewContainerRef;
	        modalService.parentViewContainer = viewContainerRef;
	
	        this.menuOpen = false;
	        this.version = ("1.1.30");
	
	        this.designRoutes = router.config.filter(function (r) {
	            return r.section === 'design';
	        }).sort(this.sortMenu);
	        this.componentRoutes = router.config.filter(function (r) {
	            return r.section === 'components';
	        }).sort(this.sortMenu);
	        this.utilRoutes = router.config.filter(function (r) {
	            return r.section === 'utils';
	        }).sort(this.sortMenu);
	
	        router.routerEvents.subscribe(function () {
	            document.body.scrollTop = 0;
	            _this.menuOpen = false;
	        });
	    }
	
	    _createClass(DemoComponent, [{
	        key: 'sortMenu',
	        value: function sortMenu(a, b) {
	            if (a.title < b.title) return -1;
	            if (a.title > b.title) return 1;
	            return 0;
	        }
	    }, {
	        key: 'toggleMenu',
	        value: function toggleMenu() {
	            this.menuOpen = !this.menuOpen;
	        }
	    }]);
	
	    return DemoComponent;
	}()) || _class);
	Reflect.defineMetadata('design:paramtypes', [_router.Router, _core.ViewContainerRef, _novoElements.NovoToastService, _novoElements.NovoModalService], DemoComponent);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vYXBwL0FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7a0JBQUE7O0FBR0E7OztBQUZBOztBQUNBOztBQUVBOzs7O0lBTWEsYSxXQUFBLGEsV0FKWixxQkFBVTtBQUNQLGNBQVUsVUFESDtBQUVQLGNBQVUsUUFBUSxZQUFSO0FBRkgsQ0FBVixDO0FBS0csMkJBQVksTUFBWixFQUEyQixnQkFBM0IsRUFBOEQsT0FBOUQsRUFBd0YsWUFBeEYsRUFBdUg7QUFBQTs7QUFBQTs7QUFDbkgsYUFBSyxnQkFBTCxHQUF3QixnQkFBeEI7O0FBRUEsZ0JBQVEsbUJBQVIsR0FBOEIsZ0JBQTlCO0FBQ0EscUJBQWEsbUJBQWIsR0FBbUMsZ0JBQW5DOztBQUVBLGFBQUssUUFBTCxHQUFnQixLQUFoQjtBQUNBLGFBQUssT0FBTCxHQUFlLE9BQWY7O0FBRUEsYUFBSyxZQUFMLEdBQW9CLE9BQU8sTUFBUCxDQUFjLE1BQWQsQ0FBcUI7QUFBQSxtQkFBSyxFQUFFLE9BQUYsS0FBYyxRQUFuQjtBQUFBLFNBQXJCLEVBQWtELElBQWxELENBQXVELEtBQUssUUFBNUQsQ0FBcEI7QUFDQSxhQUFLLGVBQUwsR0FBdUIsT0FBTyxNQUFQLENBQWMsTUFBZCxDQUFxQjtBQUFBLG1CQUFLLEVBQUUsT0FBRixLQUFjLFlBQW5CO0FBQUEsU0FBckIsRUFBc0QsSUFBdEQsQ0FBMkQsS0FBSyxRQUFoRSxDQUF2QjtBQUNBLGFBQUssVUFBTCxHQUFrQixPQUFPLE1BQVAsQ0FBYyxNQUFkLENBQXFCO0FBQUEsbUJBQUssRUFBRSxPQUFGLEtBQWMsT0FBbkI7QUFBQSxTQUFyQixFQUFpRCxJQUFqRCxDQUFzRCxLQUFLLFFBQTNELENBQWxCOztBQUVBLGVBQU8sWUFBUCxDQUFvQixTQUFwQixDQUE4QixZQUFNO0FBQ2hDLHFCQUFTLElBQVQsQ0FBYyxTQUFkLEdBQTBCLENBQTFCO0FBQ0Esa0JBQUssUUFBTCxHQUFnQixLQUFoQjtBQUNILFNBSEQ7QUFJSDs7OztpQ0FFUSxDLEVBQUcsQyxFQUFHO0FBQ1gsZ0JBQUksRUFBRSxLQUFGLEdBQVUsRUFBRSxLQUFoQixFQUF1QixPQUFPLENBQUMsQ0FBUjtBQUN2QixnQkFBSSxFQUFFLEtBQUYsR0FBVSxFQUFFLEtBQWhCLEVBQXVCLE9BQU8sQ0FBUDtBQUN2QixtQkFBTyxDQUFQO0FBQ0g7OztxQ0FFWTtBQUNULGlCQUFLLFFBQUwsR0FBZ0IsQ0FBQyxLQUFLLFFBQXRCO0FBQ0g7Ozs7O3NKQTVCUSxhIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdvZGkvbm92by1kZXYvbGlicy9ub3ZvLWVsZW1lbnRzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG4vLyBWZW5kb3JcbmltcG9ydCB7IE5vdm9Ub2FzdFNlcnZpY2UsIE5vdm9Nb2RhbFNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NyYy9ub3ZvLWVsZW1lbnRzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdkZW1vLWFwcCcsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vQXBwLmh0bWwnKVxufSlcbmV4cG9ydCBjbGFzcyBEZW1vQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihyb3V0ZXI6Um91dGVyLCB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHRvYXN0ZXI6Tm92b1RvYXN0U2VydmljZSwgbW9kYWxTZXJ2aWNlOk5vdm9Nb2RhbFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmID0gdmlld0NvbnRhaW5lclJlZjtcblxuICAgICAgICB0b2FzdGVyLnBhcmVudFZpZXdDb250YWluZXIgPSB2aWV3Q29udGFpbmVyUmVmO1xuICAgICAgICBtb2RhbFNlcnZpY2UucGFyZW50Vmlld0NvbnRhaW5lciA9IHZpZXdDb250YWluZXJSZWY7XG5cbiAgICAgICAgdGhpcy5tZW51T3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSBWRVJTSU9OO1xuXG4gICAgICAgIHRoaXMuZGVzaWduUm91dGVzID0gcm91dGVyLmNvbmZpZy5maWx0ZXIociA9PiByLnNlY3Rpb24gPT09ICdkZXNpZ24nKS5zb3J0KHRoaXMuc29ydE1lbnUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJvdXRlcyA9IHJvdXRlci5jb25maWcuZmlsdGVyKHIgPT4gci5zZWN0aW9uID09PSAnY29tcG9uZW50cycpLnNvcnQodGhpcy5zb3J0TWVudSk7XG4gICAgICAgIHRoaXMudXRpbFJvdXRlcyA9IHJvdXRlci5jb25maWcuZmlsdGVyKHIgPT4gci5zZWN0aW9uID09PSAndXRpbHMnKS5zb3J0KHRoaXMuc29ydE1lbnUpO1xuXG4gICAgICAgIHJvdXRlci5yb3V0ZXJFdmVudHMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICAgIHRoaXMubWVudU9wZW4gPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc29ydE1lbnUoYSwgYikge1xuICAgICAgICBpZiAoYS50aXRsZSA8IGIudGl0bGUpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEudGl0bGUgPiBiLnRpdGxlKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgdG9nZ2xlTWVudSgpIHtcbiAgICAgICAgdGhpcy5tZW51T3BlbiA9ICF0aGlzLm1lbnVPcGVuO1xuICAgIH1cbn1cbiJdfQ==

/***/ },
/* 357 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.routing = exports.routes = undefined;
	
	var _router = __webpack_require__(107);
	
	var _Home = __webpack_require__(162);
	
	var _all = __webpack_require__(157);
	
	var _all2 = __webpack_require__(391);
	
	var _all3 = __webpack_require__(158);
	
	// APP
	var routes = exports.routes = [{ path: '', component: _Home.Home }, { path: 'home', component: _Home.Home },
	
	// Base Pages (design system)
	{ path: 'color', component: _all.ColorComponent, title: 'Color', section: 'design' }, { path: 'composition', component: _all.CompositionComponent, title: 'Composition', section: 'design' }, { path: 'typography', component: _all.TypographyComponent, title: 'Typography', section: 'design' }, { path: 'icons', component: _all.IconographyComponent, title: 'Iconography', section: 'design' },
	
	// Element/Component/Service/etc.. Demos
	{ path: 'button', component: _all3.ButtonDemoComponent, title: 'Buttons', section: 'components' }, { path: 'radio', component: _all3.RadioDemoComponent, title: 'Radio', section: 'components' }, { path: 'quick-note', component: _all3.QuickNoteDemoComponent, title: 'Quick Note', section: 'components' }, { path: 'modal', component: _all3.ModalDemoComponent, title: 'Modal', section: 'components' }, { path: 'form', component: _all3.FormDemoComponent, title: 'Form', section: 'components' }, { path: 'toast', component: _all3.ToastDemoComponent, title: 'Toast', section: 'components' }, { path: 'tooltip', component: _all3.TooltipDemoComponent, title: 'Tooltip', section: 'components' }, { path: 'cards', component: _all3.CardDemoComponent, title: 'Cards', section: 'components' }, { path: 'loading', component: _all3.LoadingDemoComponent, title: 'Loading', section: 'components' }, { path: 'dropdown', component: _all3.DropdownDemoComponent, title: 'Dropdown', section: 'components' }, { path: 'picker', component: _all3.PickerDemoComponent, title: 'Picker', section: 'components' }, { path: 'multi-picker', component: _all3.MultiPickerDemoComponent, title: 'MultiPicker', section: 'components' }, { path: 'chips', component: _all3.ChipsDemoComponent, title: 'Chips', section: 'components' }, { path: 'select', component: _all3.SelectDemoComponent, title: 'Select', section: 'components' }, { path: 'tabs', component: _all3.TabsDemoComponent, title: 'Tabs', section: 'components' }, { path: 'table', component: _all3.TableDemoComponent, title: 'Table', section: 'components' }, { path: 'list', component: _all3.ListDemoComponent, title: 'List', section: 'components' }, { path: 'header', component: _all3.HeaderDemoComponent, title: 'Header', section: 'components' }, { path: 'switch', component: _all3.SwitchDemoComponent, title: 'Switch', section: 'components' }, { path: 'drawer', component: _all3.DrawerDemoComponent, title: 'Drawer', section: 'components' }, { path: 'calendar', component: _all3.CalendarDemoComponent, title: 'Calendar', section: 'components' }, { path: 'dragula', component: _all3.DragulaDemoComponent, title: 'Dragula', section: 'components' }, { path: 'tiles', component: _all3.TilesDemoComponent, title: 'Tiles', section: 'components' }, { path: 'slides', component: _all3.SlidesDemoComponent, title: 'Slides', section: 'components' }, { path: 'editor', component: _all3.EditorDemoComponent, title: 'Editor', section: 'components' }, { path: 'tipwell', component: _all3.TipWellDemoComponent, title: 'Tip Well', section: 'components' }, { path: 'category-dropdown', component: _all3.CategoryDropdownDemoComponent, title: 'Category Dropdown', section: 'components' },
	
	// Utils
	{ path: 'utils', component: _all2.UtilsDemoComponent, title: 'Utils', section: 'utils' }, { path: 'pipes', component: _all2.PipesDemoComponent, title: 'Pipes', section: 'utils' },
	
	// Catch All
	{ path: '**', redirectTo: '/' }]; // NG2
	var routing = exports.routing = _router.RouterModule.forRoot(routes, { useHash: true });
	//# sourceMappingURL=data:application/json;base64,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Z0UsU0FBUyxPQUF6RSxFQXpDeUI7O0FBMkN6QjtBQUNBLEVBQUUsTUFBTSxJQUFSLEVBQWMsWUFBWSxHQUExQixFQTVDeUIsQ0FBdEIsQyxDQXBDUDtBQW1GTyxJQUFNLDRCQUFVLHFCQUFhLE9BQWIsQ0FBcUIsTUFBckIsRUFBNkIsRUFBRSxTQUFTLElBQVgsRUFBN0IsQ0FBaEIiLCJmaWxlIjoiQXBwLnJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdvZGkvbm92by1kZXYvbGlicy9ub3ZvLWVsZW1lbnRzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG4vLyBBUFBcbmltcG9ydCB7IEhvbWUgfSBmcm9tICcuLy4uL3BhZ2VzL2hvbWUvSG9tZSc7XG5pbXBvcnQgeyBDb2xvckNvbXBvbmVudCwgVHlwb2dyYXBoeUNvbXBvbmVudCwgQ29tcG9zaXRpb25Db21wb25lbnQsIEljb25vZ3JhcGh5Q29tcG9uZW50IH0gZnJvbSAnLi8uLi9wYWdlcy9kZXNpZ24vYWxsJztcbmltcG9ydCB7IFBpcGVzRGVtb0NvbXBvbmVudCwgVXRpbHNEZW1vQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9wYWdlcy91dGlscy9hbGwnO1xuaW1wb3J0IHtcbiAgICBCdXR0b25EZW1vQ29tcG9uZW50LFxuICAgIExvYWRpbmdEZW1vQ29tcG9uZW50LFxuICAgIENhcmREZW1vQ29tcG9uZW50LFxuICAgIFRvYXN0RGVtb0NvbXBvbmVudCxcbiAgICBUb29sdGlwRGVtb0NvbXBvbmVudCxcbiAgICBIZWFkZXJEZW1vQ29tcG9uZW50LFxuICAgIFRhYnNEZW1vQ29tcG9uZW50LFxuICAgIFRpbGVzRGVtb0NvbXBvbmVudCxcbiAgICBNb2RhbERlbW9Db21wb25lbnQsXG4gICAgUXVpY2tOb3RlRGVtb0NvbXBvbmVudCxcbiAgICBSYWRpb0RlbW9Db21wb25lbnQsXG4gICAgRHJvcGRvd25EZW1vQ29tcG9uZW50LFxuICAgIFNlbGVjdERlbW9Db21wb25lbnQsXG4gICAgTGlzdERlbW9Db21wb25lbnQsXG4gICAgU3dpdGNoRGVtb0NvbXBvbmVudCxcbiAgICBEcmF3ZXJEZW1vQ29tcG9uZW50LFxuICAgIERyYWd1bGFEZW1vQ29tcG9uZW50LFxuICAgIFNsaWRlc0RlbW9Db21wb25lbnQsXG4gICAgUGlja2VyRGVtb0NvbXBvbmVudCxcbiAgICBDaGlwc0RlbW9Db21wb25lbnQsXG4gICAgQ2FsZW5kYXJEZW1vQ29tcG9uZW50LFxuICAgIEVkaXRvckRlbW9Db21wb25lbnQsXG4gICAgVGlwV2VsbERlbW9Db21wb25lbnQsXG4gICAgVGFibGVEZW1vQ29tcG9uZW50LFxuICAgIEZvcm1EZW1vQ29tcG9uZW50LFxuICAgIENhdGVnb3J5RHJvcGRvd25EZW1vQ29tcG9uZW50LFxuICAgIE11bHRpUGlja2VyRGVtb0NvbXBvbmVudFxufSBmcm9tICcuLy4uL3BhZ2VzL2VsZW1lbnRzL2FsbCc7XG5cbmV4cG9ydCBjb25zdCByb3V0ZXM6Um91dGVzID0gW1xuICAgIHsgcGF0aDogJycsIGNvbXBvbmVudDogSG9tZSB9LFxuICAgIHsgcGF0aDogJ2hvbWUnLCBjb21wb25lbnQ6IEhvbWUgfSxcblxuICAgIC8vIEJhc2UgUGFnZXMgKGRlc2lnbiBzeXN0ZW0pXG4gICAgeyBwYXRoOiAnY29sb3InLCBjb21wb25lbnQ6IENvbG9yQ29tcG9uZW50LCB0aXRsZTogJ0NvbG9yJywgc2VjdGlvbjogJ2Rlc2lnbicgfSxcbiAgICB7IHBhdGg6ICdjb21wb3NpdGlvbicsIGNvbXBvbmVudDogQ29tcG9zaXRpb25Db21wb25lbnQsIHRpdGxlOiAnQ29tcG9zaXRpb24nLCBzZWN0aW9uOiAnZGVzaWduJyB9LFxuICAgIHsgcGF0aDogJ3R5cG9ncmFwaHknLCBjb21wb25lbnQ6IFR5cG9ncmFwaHlDb21wb25lbnQsIHRpdGxlOiAnVHlwb2dyYXBoeScsIHNlY3Rpb246ICdkZXNpZ24nIH0sXG4gICAgeyBwYXRoOiAnaWNvbnMnLCBjb21wb25lbnQ6IEljb25vZ3JhcGh5Q29tcG9uZW50LCB0aXRsZTogJ0ljb25vZ3JhcGh5Jywgc2VjdGlvbjogJ2Rlc2lnbicgfSxcblxuICAgIC8vIEVsZW1lbnQvQ29tcG9uZW50L1NlcnZpY2UvZXRjLi4gRGVtb3NcbiAgICB7IHBhdGg6ICdidXR0b24nLCBjb21wb25lbnQ6IEJ1dHRvbkRlbW9Db21wb25lbnQsIHRpdGxlOiAnQnV0dG9ucycsIHNlY3Rpb246ICdjb21wb25lbnRzJyB9LFxuICAgIHsgcGF0aDogJ3JhZGlvJywgY29tcG9uZW50OiBSYWRpb0RlbW9Db21wb25lbnQsIHRpdGxlOiAnUmFkaW8nLCBzZWN0aW9uOiAnY29tcG9uZW50cycgfSxcbiAgICB7IHBhdGg6ICdxdWljay1ub3RlJywgY29tcG9uZW50OiBRdWlja05vdGVEZW1vQ29tcG9uZW50LCB0aXRsZTogJ1F1aWNrIE5vdGUnLCBzZWN0aW9uOiAnY29tcG9uZW50cycgfSxcbiAgICB7IHBhdGg6ICdtb2RhbCcsIGNvbXBvbmVudDogTW9kYWxEZW1vQ29tcG9uZW50LCB0aXRsZTogJ01vZGFsJywgc2VjdGlvbjogJ2NvbXBvbmVudHMnIH0sXG4gICAgeyBwYXRoOiAnZm9ybScsIGNvbXBvbmVudDogRm9ybURlbW9Db21wb25lbnQsIHRpdGxlOiAnRm9ybScsIHNlY3Rpb246ICdjb21wb25lbnRzJyB9LFxuICAgIHsgcGF0aDogJ3RvYXN0JywgY29tcG9uZW50OiBUb2FzdERlbW9Db21wb25lbnQsIHRpdGxlOiAnVG9hc3QnLCBzZWN0aW9uOiAnY29tcG9uZW50cycgfSxcbiAgICB7IHBhdGg6ICd0b29sdGlwJywgY29tcG9uZW50OiBUb29sdGlwRGVtb0NvbXBvbmVudCwgdGl0bGU6ICdUb29sdGlwJywgc2VjdGlvbjogJ2NvbXBvbmVudHMnIH0sXG4gICAgeyBwYXRoOiAnY2FyZHMnLCBjb21wb25lbnQ6IENhcmREZW1vQ29tcG9uZW50LCB0aXRsZTogJ0NhcmRzJywgc2VjdGlvbjogJ2NvbXBvbmVudHMnIH0sXG4gICAgeyBwYXRoOiAnbG9hZGluZycsIGNvbXBvbmVudDogTG9hZGluZ0RlbW9Db21wb25lbnQsIHRpdGxlOiAnTG9hZGluZycsIHNlY3Rpb246ICdjb21wb25lbnRzJyB9LFxuICAgIHsgcGF0aDogJ2Ryb3Bkb3duJywgY29tcG9uZW50OiBEcm9wZG93bkRlbW9Db21wb25lbnQsIHRpdGxlOiAnRHJvcGRvd24nLCBzZWN0aW9uOiAnY29tcG9uZW50cycgfSxcbiAgICB7IHBhdGg6ICdwaWNrZXInLCBjb21wb25lbnQ6IFBpY2tlckRlbW9Db21wb25lbnQsIHRpdGxlOiAnUGlja2VyJywgc2VjdGlvbjogJ2NvbXBvbmVudHMnIH0sXG4gICAgeyBwYXRoOiAnbXVsdGktcGlja2VyJywgY29tcG9uZW50OiBNdWx0aVBpY2tlckRlbW9Db21wb25lbnQsIHRpdGxlOiAnTXVsdGlQaWNrZXInLCBzZWN0aW9uOiAnY29tcG9uZW50cycgfSxcbiAgICB7IHBhdGg6ICdjaGlwcycsIGNvbXBvbmVudDogQ2hpcHNEZW1vQ29tcG9uZW50LCB0aXRsZTogJ0NoaXBzJywgc2VjdGlvbjogJ2NvbXBvbmVudHMnIH0sXG4gICAgeyBwYXRoOiAnc2VsZWN0JywgY29tcG9uZW50OiBTZWxlY3REZW1vQ29tcG9uZW50LCB0aXRsZTogJ1NlbGVjdCcsIHNlY3Rpb246ICdjb21wb25lbnRzJyB9LFxuICAgIHsgcGF0aDogJ3RhYnMnLCBjb21wb25lbnQ6IFRhYnNEZW1vQ29tcG9uZW50LCB0aXRsZTogJ1RhYnMnLCBzZWN0aW9uOiAnY29tcG9uZW50cycgfSxcbiAgICB7IHBhdGg6ICd0YWJsZScsIGNvbXBvbmVudDogVGFibGVEZW1vQ29tcG9uZW50LCB0aXRsZTogJ1RhYmxlJywgc2VjdGlvbjogJ2NvbXBvbmVudHMnIH0sXG4gICAgeyBwYXRoOiAnbGlzdCcsIGNvbXBvbmVudDogTGlzdERlbW9Db21wb25lbnQsIHRpdGxlOiAnTGlzdCcsIHNlY3Rpb246ICdjb21wb25lbnRzJyB9LFxuICAgIHsgcGF0aDogJ2hlYWRlcicsIGNvbXBvbmVudDogSGVhZGVyRGVtb0NvbXBvbmVudCwgdGl0bGU6ICdIZWFkZXInLCBzZWN0aW9uOiAnY29tcG9uZW50cycgfSxcbiAgICB7IHBhdGg6ICdzd2l0Y2gnLCBjb21wb25lbnQ6IFN3aXRjaERlbW9Db21wb25lbnQsIHRpdGxlOiAnU3dpdGNoJywgc2VjdGlvbjogJ2NvbXBvbmVudHMnIH0sXG4gICAgeyBwYXRoOiAnZHJhd2VyJywgY29tcG9uZW50OiBEcmF3ZXJEZW1vQ29tcG9uZW50LCB0aXRsZTogJ0RyYXdlcicsIHNlY3Rpb246ICdjb21wb25lbnRzJyB9LFxuICAgIHsgcGF0aDogJ2NhbGVuZGFyJywgY29tcG9uZW50OiBDYWxlbmRhckRlbW9Db21wb25lbnQsIHRpdGxlOiAnQ2FsZW5kYXInLCBzZWN0aW9uOiAnY29tcG9uZW50cycgfSxcbiAgICB7IHBhdGg6ICdkcmFndWxhJywgY29tcG9uZW50OiBEcmFndWxhRGVtb0NvbXBvbmVudCwgdGl0bGU6ICdEcmFndWxhJywgc2VjdGlvbjogJ2NvbXBvbmVudHMnIH0sXG4gICAgeyBwYXRoOiAndGlsZXMnLCBjb21wb25lbnQ6IFRpbGVzRGVtb0NvbXBvbmVudCwgdGl0bGU6ICdUaWxlcycsIHNlY3Rpb246ICdjb21wb25lbnRzJyB9LFxuICAgIHsgcGF0aDogJ3NsaWRlcycsIGNvbXBvbmVudDogU2xpZGVzRGVtb0NvbXBvbmVudCwgdGl0bGU6ICdTbGlkZXMnLCBzZWN0aW9uOiAnY29tcG9uZW50cycgfSxcbiAgICB7IHBhdGg6ICdlZGl0b3InLCBjb21wb25lbnQ6IEVkaXRvckRlbW9Db21wb25lbnQsIHRpdGxlOiAnRWRpdG9yJywgc2VjdGlvbjogJ2NvbXBvbmVudHMnIH0sXG4gICAgeyBwYXRoOiAndGlwd2VsbCcsIGNvbXBvbmVudDogVGlwV2VsbERlbW9Db21wb25lbnQsIHRpdGxlOiAnVGlwIFdlbGwnLCBzZWN0aW9uOiAnY29tcG9uZW50cycgfSxcbiAgICB7IHBhdGg6ICdjYXRlZ29yeS1kcm9wZG93bicsIGNvbXBvbmVudDogQ2F0ZWdvcnlEcm9wZG93bkRlbW9Db21wb25lbnQsIHRpdGxlOiAnQ2F0ZWdvcnkgRHJvcGRvd24nLCBzZWN0aW9uOiAnY29tcG9uZW50cycgfSxcblxuICAgIC8vIFV0aWxzXG4gICAgeyBwYXRoOiAndXRpbHMnLCBjb21wb25lbnQ6IFV0aWxzRGVtb0NvbXBvbmVudCwgdGl0bGU6ICdVdGlscycsIHNlY3Rpb246ICd1dGlscycgfSxcbiAgICB7IHBhdGg6ICdwaXBlcycsIGNvbXBvbmVudDogUGlwZXNEZW1vQ29tcG9uZW50LCB0aXRsZTogJ1BpcGVzJywgc2VjdGlvbjogJ3V0aWxzJyB9LFxuXG4gICAgLy8gQ2F0Y2ggQWxsXG4gICAgeyBwYXRoOiAnKionLCByZWRpcmVjdFRvOiAnLycgfVxuXTtcblxuZXhwb3J0IGNvbnN0IHJvdXRpbmcgPSBSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMsIHsgdXNlSGFzaDogdHJ1ZSB9KTtcbiJdfQ==

/***/ },
/* 358 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CodeSnippet = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	
	var _core = __webpack_require__(2);
	
	var _platformBrowser = __webpack_require__(62);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CodeSnippet = exports.CodeSnippet = (_dec = (0, _core.Component)({
	    inputs: ['code'],
	    selector: 'code-snippet',
	    template: '<pre><code [innerHtml]="highlight"></code></pre>'
	}), _dec(_class = function () {
	    function CodeSnippet(sanitizer) {
	        _classCallCheck(this, CodeSnippet);
	
	        this.sanitizer = sanitizer;
	    }
	
	    _createClass(CodeSnippet, [{
	        key: 'ngOnInit',
	        value: function ngOnInit() {
	            this.highlight = this.sanitizer.bypassSecurityTrustHtml(hljs.highlightAuto(this.code).value);
	        }
	    }]);
	
	    return CodeSnippet;
	}()) || _class);
	Reflect.defineMetadata('design:paramtypes', [_platformBrowser.DomSanitizer], CodeSnippet);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vZWxlbWVudHMvY29kZXNuaXBwZXQvQ29kZVNuaXBwZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O2tCQUFBOzs7QUFDQTs7QUFDQTs7OztJQU9hLFcsV0FBQSxXLFdBTFoscUJBQVU7QUFDUCxZQUFRLENBQUMsTUFBRCxDQUREO0FBRVAsY0FBVSxjQUZIO0FBR1AsY0FBVTtBQUhILENBQVYsQztBQU1HLHlCQUFZLFNBQVosRUFBb0M7QUFBQTs7QUFDaEMsYUFBSyxTQUFMLEdBQWlCLFNBQWpCO0FBQ0g7Ozs7bUNBRVU7QUFDUCxpQkFBSyxTQUFMLEdBQWlCLEtBQUssU0FBTCxDQUFlLHVCQUFmLENBQXVDLEtBQUssYUFBTCxDQUFtQixLQUFLLElBQXhCLEVBQThCLEtBQXJFLENBQWpCO0FBQ0g7Ozs7OzZFQVBRLFciLCJmaWxlIjoiQ29kZVNuaXBwZXQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pnb2RpL25vdm8tZGV2L2xpYnMvbm92by1lbGVtZW50cyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gICAgaW5wdXRzOiBbJ2NvZGUnXSxcbiAgICBzZWxlY3RvcjogJ2NvZGUtc25pcHBldCcsXG4gICAgdGVtcGxhdGU6ICc8cHJlPjxjb2RlIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0XCI+PC9jb2RlPjwvcHJlPidcbn0pXG5leHBvcnQgY2xhc3MgQ29kZVNuaXBwZXQge1xuICAgIGNvbnN0cnVjdG9yKHNhbml0aXplcjpEb21TYW5pdGl6ZXIpIHtcbiAgICAgICAgdGhpcy5zYW5pdGl6ZXIgPSBzYW5pdGl6ZXI7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoaGxqcy5oaWdobGlnaHRBdXRvKHRoaXMuY29kZSkudmFsdWUpO1xuICAgIH1cbn1cbiJdfQ==

/***/ },
/* 359 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MultiCodeSnippet = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _dec2, _class, _desc, _value, _class2; // NG2
	
	
	var _core = __webpack_require__(2);
	
	var _platformBrowser = __webpack_require__(62);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	    var desc = {};
	    Object['ke' + 'ys'](descriptor).forEach(function (key) {
	        desc[key] = descriptor[key];
	    });
	    desc.enumerable = !!desc.enumerable;
	    desc.configurable = !!desc.configurable;
	
	    if ('value' in desc || desc.initializer) {
	        desc.writable = true;
	    }
	
	    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	        return decorator(target, property, desc) || desc;
	    }, desc);
	
	    if (context && desc.initializer !== void 0) {
	        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	        desc.initializer = undefined;
	    }
	
	    if (desc.initializer === void 0) {
	        Object['define' + 'Property'](target, property, desc);
	        desc = null;
	    }
	
	    return desc;
	}
	
	var MultiCodeSnippet = exports.MultiCodeSnippet = (_dec = (0, _core.Component)({
	    selector: 'multi-code-snippet',
	    template: '\n        <br/>\n        <div *ngFor="let section of _sections">\n            <label>{{ section }}</label>\n            <pre><code [innerHtml]="getHighlight(_map[section])"></code></pre>\n        </div>\n    '
	}), _dec2 = (0, _core.Input)(), _dec(_class = (_class2 = function () {
	    _createClass(MultiCodeSnippet, [{
	        key: 'code',
	        set: function set(code) {
	            this._sections = Object.keys(code);
	            this._map = Object.assign({}, code);
	        }
	    }]);
	
	    function MultiCodeSnippet(sanitizer) {
	        _classCallCheck(this, MultiCodeSnippet);
	
	        this._sections = [];
	        this._map = {};
	
	        this.sanitizer = sanitizer;
	    }
	
	    _createClass(MultiCodeSnippet, [{
	        key: 'getHighlight',
	        value: function getHighlight(code) {
	            return this.sanitizer.bypassSecurityTrustHtml(hljs.highlightAuto(code).value);
	        }
	    }]);
	
	    return MultiCodeSnippet;
	}(), (_applyDecoratedDescriptor(_class2.prototype, 'code', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'code'), _class2.prototype)), _class2)) || _class);
	Reflect.defineMetadata('design:paramtypes', [_platformBrowser.DomSanitizer], MultiCodeSnippet);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vZWxlbWVudHMvY29kZXNuaXBwZXQvTXVsdGlDb2RlU25pcHBldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7aURBQUE7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFZYSxnQixXQUFBLGdCLFdBVloscUJBQVU7QUFDUCxjQUFVLG9CQURIO0FBRVA7QUFGTyxDQUFWLEMsVUFjSSxrQjs7OzBCQUNRLEksRUFBTTtBQUNYLGlCQUFLLFNBQUwsR0FBaUIsT0FBTyxJQUFQLENBQVksSUFBWixDQUFqQjtBQUNBLGlCQUFLLElBQUwsR0FBWSxPQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLElBQWxCLENBQVo7QUFDSDs7O0FBRUQsOEJBQVksU0FBWixFQUFvQztBQUFBOztBQUFBLGFBVHBDLFNBU29DLEdBVGYsRUFTZTtBQUFBLGFBUnBDLElBUW9DLEdBUnpCLEVBUXlCOztBQUNoQyxhQUFLLFNBQUwsR0FBaUIsU0FBakI7QUFDSDs7OztxQ0FFWSxJLEVBQU07QUFDZixtQkFBTyxLQUFLLFNBQUwsQ0FBZSx1QkFBZixDQUF1QyxLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsRUFBeUIsS0FBaEUsQ0FBUDtBQUNIOzs7Ozs2RUFoQlEsZ0IiLCJmaWxlIjoiTXVsdGlDb2RlU25pcHBldC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdvZGkvbm92by1kZXYvbGlicy9ub3ZvLWVsZW1lbnRzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtdWx0aS1jb2RlLXNuaXBwZXQnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxici8+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHNlY3Rpb24gb2YgX3NlY3Rpb25zXCI+XG4gICAgICAgICAgICA8bGFiZWw+e3sgc2VjdGlvbiB9fTwvbGFiZWw+XG4gICAgICAgICAgICA8cHJlPjxjb2RlIFtpbm5lckh0bWxdPVwiZ2V0SGlnaGxpZ2h0KF9tYXBbc2VjdGlvbl0pXCI+PC9jb2RlPjwvcHJlPlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpQ29kZVNuaXBwZXQge1xuICAgIF9zZWN0aW9uczpzdHJpbmdbXSA9IFtdO1xuICAgIF9tYXA6YW55ID0ge307XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBjb2RlKGNvZGUpIHtcbiAgICAgICAgdGhpcy5fc2VjdGlvbnMgPSBPYmplY3Qua2V5cyhjb2RlKTtcbiAgICAgICAgdGhpcy5fbWFwID0gT2JqZWN0LmFzc2lnbih7fSwgY29kZSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3Ioc2FuaXRpemVyOkRvbVNhbml0aXplcikge1xuICAgICAgICB0aGlzLnNhbml0aXplciA9IHNhbml0aXplcjtcbiAgICB9XG5cbiAgICBnZXRIaWdobGlnaHQoY29kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoaGxqcy5oaWdobGlnaHRBdXRvKGNvZGUpLnZhbHVlKTtcbiAgICB9XG59XG4iXX0=

/***/ },
/* 360 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NovoElementsDemoModule = undefined;
	
	var _dec, _class; // NG2
	
	// APP
	
	// Vendor
	
	
	var _core = __webpack_require__(2);
	
	var _http = __webpack_require__(155);
	
	var _platformBrowser = __webpack_require__(62);
	
	var _forms = __webpack_require__(8);
	
	var _App = __webpack_require__(356);
	
	var _App2 = __webpack_require__(357);
	
	var _CodeSnippet = __webpack_require__(358);
	
	var _MultiCodeSnippet = __webpack_require__(359);
	
	var _Home = __webpack_require__(162);
	
	var _all = __webpack_require__(157);
	
	var _all2 = __webpack_require__(158);
	
	var _UtilsDemo = __webpack_require__(164);
	
	var _PipesDemo = __webpack_require__(163);
	
	var _ModalDemo = __webpack_require__(159);
	
	var _TableDemo = __webpack_require__(161);
	
	var _PickerDemo = __webpack_require__(160);
	
	__webpack_require__(451);
	
	var _novoElements = __webpack_require__(18);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NovoElementsDemoModule = exports.NovoElementsDemoModule = (_dec = (0, _core.NgModule)({
	    declarations: [_App.DemoComponent, _CodeSnippet.CodeSnippet, _MultiCodeSnippet.MultiCodeSnippet, _Home.Home, _all.ColorComponent, _all.CompositionComponent, _all.TypographyComponent, _all.IconographyComponent, _all2.ButtonDemoComponent, _all2.RadioDemoComponent, _all2.QuickNoteDemoComponent, _all2.ModalDemoComponent, _all2.FormDemoComponent, _all2.ToastDemoComponent, _all2.TooltipDemoComponent, _all2.CardDemoComponent, _all2.LoadingDemoComponent, _all2.DropdownDemoComponent, _all2.PickerDemoComponent, _all2.ChipsDemoComponent, _all2.SelectDemoComponent, _all2.TabsDemoComponent, _all2.TableDemoComponent, _all2.ListDemoComponent, _all2.HeaderDemoComponent, _all2.SwitchDemoComponent, _all2.DrawerDemoComponent, _all2.CalendarDemoComponent, _all2.DragulaDemoComponent, _all2.TilesDemoComponent, _all2.SlidesDemoComponent, _all2.EditorDemoComponent, _all2.TipWellDemoComponent, _UtilsDemo.UtilsDemoComponent, _PipesDemo.PipesDemoComponent, _ModalDemo.ModalSuccessDemo, _ModalDemo.ModalWarningDemo, _ModalDemo.ModalErrorDemo, _ModalDemo.ModalCustomDemo, _ModalDemo.ModalAddDemo, _ModalDemo.ModalEditDemo, _TableDemo.StatusCell, _TableDemo.ExtraDetails, _PickerDemo.CustomPickerResults, _all2.CategoryDropdownDemoComponent, _all2.MultiPickerDemoComponent],
	    imports: [_platformBrowser.BrowserModule, _forms.FormsModule, _http.HttpModule, _forms.ReactiveFormsModule, _App2.routing, _novoElements.NovoElementsModule],
	    providers: [_novoElements.FormUtils],
	    entryComponents: [_App.DemoComponent, _ModalDemo.ModalSuccessDemo, _ModalDemo.ModalWarningDemo, _ModalDemo.ModalErrorDemo, _ModalDemo.ModalCustomDemo, _ModalDemo.ModalAddDemo, _ModalDemo.ModalEditDemo, _TableDemo.StatusCell, _TableDemo.ExtraDetails, _PickerDemo.CustomPickerResults],
	    bootstrap: [_App.DemoComponent]
	}), _dec(_class = function NovoElementsDemoModule() {
	    _classCallCheck(this, NovoElementsDemoModule);
	}) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vbm92by1lbGVtZW50cy1kZW1vLm1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O2tCQUFBOztBQUtBOztBQTBDQTs7O0FBOUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQTZCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztJQTRFYSxzQixXQUFBLHNCLFdBMUVaLG9CQUFTO0FBQ04sa0JBQWMsMnRDQURSO0FBaUROLGFBQVMsbUpBakRIO0FBeUROLGVBQVcseUJBekRMO0FBNEROLHFCQUFpQix5UUE1RFg7QUF3RU4sZUFBVztBQXhFTCxDQUFULEMiLCJmaWxlIjoibm92by1lbGVtZW50cy1kZW1vLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdvZGkvbm92by1kZXYvbGlicy9ub3ZvLWVsZW1lbnRzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBBUFBcbmltcG9ydCB7IERlbW9Db21wb25lbnQgfSBmcm9tICcuL2FwcC9BcHAnO1xuaW1wb3J0IHsgcm91dGluZyB9IGZyb20gJy4vYXBwL0FwcC5yb3V0ZXMnO1xuaW1wb3J0IHsgQ29kZVNuaXBwZXQgfSBmcm9tICcuL2VsZW1lbnRzL2NvZGVzbmlwcGV0L0NvZGVTbmlwcGV0JztcbmltcG9ydCB7IE11bHRpQ29kZVNuaXBwZXQgfSBmcm9tICcuL2VsZW1lbnRzL2NvZGVzbmlwcGV0L011bHRpQ29kZVNuaXBwZXQnO1xuaW1wb3J0IHsgSG9tZSB9IGZyb20gJy4vcGFnZXMvaG9tZS9Ib21lJztcbmltcG9ydCB7IENvbG9yQ29tcG9uZW50LCBDb21wb3NpdGlvbkNvbXBvbmVudCwgVHlwb2dyYXBoeUNvbXBvbmVudCwgSWNvbm9ncmFwaHlDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2Rlc2lnbi9hbGwnO1xuaW1wb3J0IHtcbiAgICBCdXR0b25EZW1vQ29tcG9uZW50LFxuICAgIFJhZGlvRGVtb0NvbXBvbmVudCxcbiAgICBRdWlja05vdGVEZW1vQ29tcG9uZW50LFxuICAgIE1vZGFsRGVtb0NvbXBvbmVudCxcbiAgICBGb3JtRGVtb0NvbXBvbmVudCxcbiAgICBUb2FzdERlbW9Db21wb25lbnQsXG4gICAgVG9vbHRpcERlbW9Db21wb25lbnQsXG4gICAgQ2FyZERlbW9Db21wb25lbnQsXG4gICAgTG9hZGluZ0RlbW9Db21wb25lbnQsXG4gICAgRHJvcGRvd25EZW1vQ29tcG9uZW50LFxuICAgIFBpY2tlckRlbW9Db21wb25lbnQsXG4gICAgQ2hpcHNEZW1vQ29tcG9uZW50LFxuICAgIFNlbGVjdERlbW9Db21wb25lbnQsXG4gICAgVGFic0RlbW9Db21wb25lbnQsXG4gICAgVGFibGVEZW1vQ29tcG9uZW50LFxuICAgIExpc3REZW1vQ29tcG9uZW50LFxuICAgIEhlYWRlckRlbW9Db21wb25lbnQsXG4gICAgU3dpdGNoRGVtb0NvbXBvbmVudCxcbiAgICBEcmF3ZXJEZW1vQ29tcG9uZW50LFxuICAgIENhbGVuZGFyRGVtb0NvbXBvbmVudCxcbiAgICBEcmFndWxhRGVtb0NvbXBvbmVudCxcbiAgICBUaWxlc0RlbW9Db21wb25lbnQsXG4gICAgU2xpZGVzRGVtb0NvbXBvbmVudCxcbiAgICBFZGl0b3JEZW1vQ29tcG9uZW50LFxuICAgIFRpcFdlbGxEZW1vQ29tcG9uZW50LFxuICAgIENhdGVnb3J5RHJvcGRvd25EZW1vQ29tcG9uZW50LFxuICAgIE11bHRpUGlja2VyRGVtb0NvbXBvbmVudFxufSBmcm9tICcuL3BhZ2VzL2VsZW1lbnRzL2FsbCc7XG5pbXBvcnQgeyBVdGlsc0RlbW9Db21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL3V0aWxzL3V0aWxzL1V0aWxzRGVtbyc7XG5pbXBvcnQgeyBQaXBlc0RlbW9Db21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL3V0aWxzL3BpcGVzL1BpcGVzRGVtbyc7XG5pbXBvcnQgeyBNb2RhbFN1Y2Nlc3NEZW1vLCBNb2RhbFdhcm5pbmdEZW1vLCBNb2RhbEVycm9yRGVtbywgTW9kYWxDdXN0b21EZW1vLCBNb2RhbEFkZERlbW8sIE1vZGFsRWRpdERlbW8gfSBmcm9tICcuL3BhZ2VzL2VsZW1lbnRzL21vZGFsL01vZGFsRGVtbyc7XG5pbXBvcnQgeyBTdGF0dXNDZWxsLCBFeHRyYURldGFpbHMgfSBmcm9tICcuL3BhZ2VzL2VsZW1lbnRzL3RhYmxlL1RhYmxlRGVtbyc7XG5pbXBvcnQgeyBDdXN0b21QaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9wYWdlcy9lbGVtZW50cy9waWNrZXIvUGlja2VyRGVtbyc7XG5pbXBvcnQgJy4vZGVtby5zY3NzJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgTm92b0VsZW1lbnRzTW9kdWxlLCBGb3JtVXRpbHMgfSBmcm9tICcuLy4uL3NyYy9ub3ZvLWVsZW1lbnRzJztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRGVtb0NvbXBvbmVudCxcbiAgICAgICAgQ29kZVNuaXBwZXQsXG4gICAgICAgIE11bHRpQ29kZVNuaXBwZXQsXG4gICAgICAgIEhvbWUsXG4gICAgICAgIENvbG9yQ29tcG9uZW50LFxuICAgICAgICBDb21wb3NpdGlvbkNvbXBvbmVudCxcbiAgICAgICAgVHlwb2dyYXBoeUNvbXBvbmVudCxcbiAgICAgICAgSWNvbm9ncmFwaHlDb21wb25lbnQsXG4gICAgICAgIEJ1dHRvbkRlbW9Db21wb25lbnQsXG4gICAgICAgIFJhZGlvRGVtb0NvbXBvbmVudCxcbiAgICAgICAgUXVpY2tOb3RlRGVtb0NvbXBvbmVudCxcbiAgICAgICAgTW9kYWxEZW1vQ29tcG9uZW50LFxuICAgICAgICBGb3JtRGVtb0NvbXBvbmVudCxcbiAgICAgICAgVG9hc3REZW1vQ29tcG9uZW50LFxuICAgICAgICBUb29sdGlwRGVtb0NvbXBvbmVudCxcbiAgICAgICAgQ2FyZERlbW9Db21wb25lbnQsXG4gICAgICAgIExvYWRpbmdEZW1vQ29tcG9uZW50LFxuICAgICAgICBEcm9wZG93bkRlbW9Db21wb25lbnQsXG4gICAgICAgIFBpY2tlckRlbW9Db21wb25lbnQsXG4gICAgICAgIENoaXBzRGVtb0NvbXBvbmVudCxcbiAgICAgICAgU2VsZWN0RGVtb0NvbXBvbmVudCxcbiAgICAgICAgVGFic0RlbW9Db21wb25lbnQsXG4gICAgICAgIFRhYmxlRGVtb0NvbXBvbmVudCxcbiAgICAgICAgTGlzdERlbW9Db21wb25lbnQsXG4gICAgICAgIEhlYWRlckRlbW9Db21wb25lbnQsXG4gICAgICAgIFN3aXRjaERlbW9Db21wb25lbnQsXG4gICAgICAgIERyYXdlckRlbW9Db21wb25lbnQsXG4gICAgICAgIENhbGVuZGFyRGVtb0NvbXBvbmVudCxcbiAgICAgICAgRHJhZ3VsYURlbW9Db21wb25lbnQsXG4gICAgICAgIFRpbGVzRGVtb0NvbXBvbmVudCxcbiAgICAgICAgU2xpZGVzRGVtb0NvbXBvbmVudCxcbiAgICAgICAgRWRpdG9yRGVtb0NvbXBvbmVudCxcbiAgICAgICAgVGlwV2VsbERlbW9Db21wb25lbnQsXG4gICAgICAgIFV0aWxzRGVtb0NvbXBvbmVudCxcbiAgICAgICAgUGlwZXNEZW1vQ29tcG9uZW50LFxuICAgICAgICBNb2RhbFN1Y2Nlc3NEZW1vLFxuICAgICAgICBNb2RhbFdhcm5pbmdEZW1vLFxuICAgICAgICBNb2RhbEVycm9yRGVtbyxcbiAgICAgICAgTW9kYWxDdXN0b21EZW1vLFxuICAgICAgICBNb2RhbEFkZERlbW8sXG4gICAgICAgIE1vZGFsRWRpdERlbW8sXG4gICAgICAgIFN0YXR1c0NlbGwsXG4gICAgICAgIEV4dHJhRGV0YWlscyxcbiAgICAgICAgQ3VzdG9tUGlja2VyUmVzdWx0cyxcbiAgICAgICAgQ2F0ZWdvcnlEcm9wZG93bkRlbW9Db21wb25lbnQsXG4gICAgICAgIE11bHRpUGlja2VyRGVtb0NvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBCcm93c2VyTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgSHR0cE1vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgcm91dGluZyxcbiAgICAgICAgTm92b0VsZW1lbnRzTW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRm9ybVV0aWxzXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgRGVtb0NvbXBvbmVudCxcbiAgICAgICAgTW9kYWxTdWNjZXNzRGVtbyxcbiAgICAgICAgTW9kYWxXYXJuaW5nRGVtbyxcbiAgICAgICAgTW9kYWxFcnJvckRlbW8sXG4gICAgICAgIE1vZGFsQ3VzdG9tRGVtbyxcbiAgICAgICAgTW9kYWxBZGREZW1vLFxuICAgICAgICBNb2RhbEVkaXREZW1vLFxuICAgICAgICBTdGF0dXNDZWxsLFxuICAgICAgICBFeHRyYURldGFpbHMsXG4gICAgICAgIEN1c3RvbVBpY2tlclJlc3VsdHNcbiAgICBdLFxuICAgIGJvb3RzdHJhcDogW0RlbW9Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9FbGVtZW50c0RlbW9Nb2R1bGUge1xufVxuXG4iXX0=

/***/ },
/* 361 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ColorComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// Vendor
	
	
	var _core = __webpack_require__(2);
	
	var _novoElements = __webpack_require__(18);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ColorComponent = exports.ColorComponent = (_dec = (0, _core.Component)({
	    selector: 'color',
	    template: __webpack_require__(454)
	}), _dec(_class = function () {
	    function ColorComponent(toaster) {
	        _classCallCheck(this, ColorComponent);
	
	        this.color = 'background';
	
	        this.toaster = toaster;
	
	        this.primaryColors = [{
	            name: 'navigation',
	            variables: ['navigation'],
	            hex: '2F383F'
	        }, {
	            name: 'action',
	            variables: ['positive'],
	            hex: '4A89DC'
	        }, {
	            name: 'text',
	            variables: ['dark', 'base-font-color'],
	            hex: '474747'
	        }, {
	            name: 'background',
	            variables: ['off-white', 'background'],
	            hex: 'F4F4F4'
	        }, {
	            name: 'neutral',
	            variables: ['neutral'],
	            hex: '747884'
	        }];
	        this.entityColors = [{
	            name: 'lead',
	            variables: ['lead'],
	            hex: 'AA6699'
	        }, {
	            name: 'contact',
	            variables: ['contact'],
	            hex: 'FFAA44'
	        }, {
	            name: 'company',
	            variables: ['company'],
	            hex: '3399DD'
	        }, {
	            name: 'candidate',
	            variables: ['candidate'],
	            hex: '44BB77'
	        }, {
	            name: 'opportunity',
	            variables: ['opportunity'],
	            hex: '662255'
	        }, {
	            name: 'job',
	            variables: ['job'],
	            hex: 'BB5566'
	        }, {
	            name: 'submission',
	            variables: ['submission'],
	            hex: '778899'
	        }, {
	            name: 'placement',
	            variables: ['placement'],
	            hex: '0B344F'
	        }];
	        this.analyticsColors = [{
	            name: 'grapefruit',
	            variables: ['grapefruit'],
	            hex: 'DA4453'
	        }, {
	            name: 'bittersweet',
	            variables: ['bittersweet'],
	            hex: 'EB6845'
	        }, {
	            name: 'sunflower',
	            variables: ['sunflower'],
	            hex: 'F6B042'
	        }, {
	            name: 'grass',
	            variables: ['grass'],
	            hex: '8CC152'
	        }, {
	            name: 'mint',
	            variables: ['mint'],
	            hex: '37BC9B'
	        }, {
	            name: 'aqua',
	            variables: ['aqua'],
	            hex: '3BAFDA'
	        }, {
	            name: 'ocean',
	            variables: ['ocean'],
	            hex: '4A89DC'
	        }, {
	            name: 'carnation',
	            variables: ['carnation'],
	            hex: 'D770AD'
	        }, {
	            name: 'lavender',
	            variables: ['lavender'],
	            hex: '967ADC'
	        }];
	    }
	
	    _createClass(ColorComponent, [{
	        key: 'changeColor',
	        value: function changeColor(color) {
	            this.color = color;
	        }
	    }, {
	        key: 'copyLink',
	        value: function copyLink(color) {
	            // Create dom element to copy from
	            var copyFrom = document.createElement('textarea');
	            copyFrom.textContent = '#' + color.hex;
	            var body = document.getElementsByTagName('body')[0];
	            body.appendChild(copyFrom);
	            copyFrom.select();
	            // Copy text
	            document.execCommand('copy');
	            // Delete element
	            body.removeChild(copyFrom);
	
	            // Set toast options
	            this.options = {
	                title: '#' + color.hex,
	                message: 'Copied to your clipboard',
	                theme: color.name,
	                icon: 'clipboard',
	                position: 'growlTopRight'
	            };
	
	            if (color.name === 'action') this.options.theme = 'ocean';
	
	            // Fire toast
	            this.toaster.alert(this.options);
	        }
	    }]);
	
	    return ColorComponent;
	}()) || _class);
	Reflect.defineMetadata('design:paramtypes', [_novoElements.NovoToastService], ColorComponent);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZGVzaWduL2NvbG9yL0NvbG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztrQkFBQTs7QUFFQTs7O0FBREE7O0FBRUE7Ozs7SUFNYSxjLFdBQUEsYyxXQUpaLHFCQUFVO0FBQ1AsY0FBVSxPQURIO0FBRVAsY0FBVSxRQUFRLGNBQVI7QUFGSCxDQUFWLEM7QUFPRyw0QkFBWSxPQUFaLEVBQXNDO0FBQUE7O0FBQUEsYUFGdEMsS0FFc0MsR0FGdkIsWUFFdUI7O0FBQ2xDLGFBQUssT0FBTCxHQUFlLE9BQWY7O0FBRUEsYUFBSyxhQUFMLEdBQXFCLENBQ2pCO0FBQ0ksa0JBQU0sWUFEVjtBQUVJLHVCQUFXLENBQUMsWUFBRCxDQUZmO0FBR0ksaUJBQUs7QUFIVCxTQURpQixFQU1qQjtBQUNJLGtCQUFNLFFBRFY7QUFFSSx1QkFBVyxDQUFDLFVBQUQsQ0FGZjtBQUdJLGlCQUFLO0FBSFQsU0FOaUIsRUFXakI7QUFDSSxrQkFBTSxNQURWO0FBRUksdUJBQVcsQ0FBQyxNQUFELEVBQVMsaUJBQVQsQ0FGZjtBQUdJLGlCQUFLO0FBSFQsU0FYaUIsRUFnQmpCO0FBQ0ksa0JBQU0sWUFEVjtBQUVJLHVCQUFXLENBQUMsV0FBRCxFQUFjLFlBQWQsQ0FGZjtBQUdJLGlCQUFLO0FBSFQsU0FoQmlCLEVBcUJqQjtBQUNJLGtCQUFNLFNBRFY7QUFFSSx1QkFBVyxDQUFDLFNBQUQsQ0FGZjtBQUdJLGlCQUFLO0FBSFQsU0FyQmlCLENBQXJCO0FBMkJBLGFBQUssWUFBTCxHQUFvQixDQUNoQjtBQUNJLGtCQUFNLE1BRFY7QUFFSSx1QkFBVyxDQUFDLE1BQUQsQ0FGZjtBQUdJLGlCQUFLO0FBSFQsU0FEZ0IsRUFNaEI7QUFDSSxrQkFBTSxTQURWO0FBRUksdUJBQVcsQ0FBQyxTQUFELENBRmY7QUFHSSxpQkFBSztBQUhULFNBTmdCLEVBV2hCO0FBQ0ksa0JBQU0sU0FEVjtBQUVJLHVCQUFXLENBQUMsU0FBRCxDQUZmO0FBR0ksaUJBQUs7QUFIVCxTQVhnQixFQWdCaEI7QUFDSSxrQkFBTSxXQURWO0FBRUksdUJBQVcsQ0FBQyxXQUFELENBRmY7QUFHSSxpQkFBSztBQUhULFNBaEJnQixFQXFCaEI7QUFDSSxrQkFBTSxhQURWO0FBRUksdUJBQVcsQ0FBQyxhQUFELENBRmY7QUFHSSxpQkFBSztBQUhULFNBckJnQixFQTBCaEI7QUFDSSxrQkFBTSxLQURWO0FBRUksdUJBQVcsQ0FBQyxLQUFELENBRmY7QUFHSSxpQkFBSztBQUhULFNBMUJnQixFQStCaEI7QUFDSSxrQkFBTSxZQURWO0FBRUksdUJBQVcsQ0FBQyxZQUFELENBRmY7QUFHSSxpQkFBSztBQUhULFNBL0JnQixFQW9DaEI7QUFDSSxrQkFBTSxXQURWO0FBRUksdUJBQVcsQ0FBQyxXQUFELENBRmY7QUFHSSxpQkFBSztBQUhULFNBcENnQixDQUFwQjtBQTBDQSxhQUFLLGVBQUwsR0FBdUIsQ0FDbkI7QUFDSSxrQkFBTSxZQURWO0FBRUksdUJBQVcsQ0FBQyxZQUFELENBRmY7QUFHSSxpQkFBSztBQUhULFNBRG1CLEVBTW5CO0FBQ0ksa0JBQU0sYUFEVjtBQUVJLHVCQUFXLENBQUMsYUFBRCxDQUZmO0FBR0ksaUJBQUs7QUFIVCxTQU5tQixFQVduQjtBQUNJLGtCQUFNLFdBRFY7QUFFSSx1QkFBVyxDQUFDLFdBQUQsQ0FGZjtBQUdJLGlCQUFLO0FBSFQsU0FYbUIsRUFnQm5CO0FBQ0ksa0JBQU0sT0FEVjtBQUVJLHVCQUFXLENBQUMsT0FBRCxDQUZmO0FBR0ksaUJBQUs7QUFIVCxTQWhCbUIsRUFxQm5CO0FBQ0ksa0JBQU0sTUFEVjtBQUVJLHVCQUFXLENBQUMsTUFBRCxDQUZmO0FBR0ksaUJBQUs7QUFIVCxTQXJCbUIsRUEwQm5CO0FBQ0ksa0JBQU0sTUFEVjtBQUVJLHVCQUFXLENBQUMsTUFBRCxDQUZmO0FBR0ksaUJBQUs7QUFIVCxTQTFCbUIsRUErQm5CO0FBQ0ksa0JBQU0sT0FEVjtBQUVJLHVCQUFXLENBQUMsT0FBRCxDQUZmO0FBR0ksaUJBQUs7QUFIVCxTQS9CbUIsRUFvQ25CO0FBQ0ksa0JBQU0sV0FEVjtBQUVJLHVCQUFXLENBQUMsV0FBRCxDQUZmO0FBR0ksaUJBQUs7QUFIVCxTQXBDbUIsRUF5Q25CO0FBQ0ksa0JBQU0sVUFEVjtBQUVJLHVCQUFXLENBQUMsVUFBRCxDQUZmO0FBR0ksaUJBQUs7QUFIVCxTQXpDbUIsQ0FBdkI7QUErQ0g7Ozs7b0NBRVcsSyxFQUFPO0FBQ2YsaUJBQUssS0FBTCxHQUFhLEtBQWI7QUFDSDs7O2lDQUVRLEssRUFBTztBQUNaO0FBQ0EsZ0JBQUksV0FBVyxTQUFTLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBZjtBQUNBLHFCQUFTLFdBQVQsU0FBMkIsTUFBTSxHQUFqQztBQUNBLGdCQUFJLE9BQU8sU0FBUyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxDQUFYO0FBQ0EsaUJBQUssV0FBTCxDQUFpQixRQUFqQjtBQUNBLHFCQUFTLE1BQVQ7QUFDQTtBQUNBLHFCQUFTLFdBQVQsQ0FBcUIsTUFBckI7QUFDQTtBQUNBLGlCQUFLLFdBQUwsQ0FBaUIsUUFBakI7O0FBRUE7QUFDQSxpQkFBSyxPQUFMLEdBQWU7QUFDWCw2QkFBVyxNQUFNLEdBRE47QUFFWCx5QkFBUywwQkFGRTtBQUdYLHVCQUFPLE1BQU0sSUFIRjtBQUlYLHNCQUFNLFdBSks7QUFLWCwwQkFBVTtBQUxDLGFBQWY7O0FBUUEsZ0JBQUksTUFBTSxJQUFOLEtBQWUsUUFBbkIsRUFBNkIsS0FBSyxPQUFMLENBQWEsS0FBYixHQUFxQixPQUFyQjs7QUFFN0I7QUFDQSxpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixLQUFLLE9BQXhCO0FBQ0g7Ozs7OzhFQXpKUSxjIiwiZmlsZSI6IkNvbG9yLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ29kaS9ub3ZvLWRldi9saWJzL25vdm8tZWxlbWVudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBOb3ZvVG9hc3RTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi8uLi8uLi9zcmMvbm92by1lbGVtZW50cyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY29sb3InLFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL0NvbG9yLmh0bWwnKVxufSlcbmV4cG9ydCBjbGFzcyBDb2xvckNvbXBvbmVudCB7XG4gICAgY29sb3I6U3RyaW5nID0gJ2JhY2tncm91bmQnO1xuXG4gICAgY29uc3RydWN0b3IodG9hc3RlcjpOb3ZvVG9hc3RTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMudG9hc3RlciA9IHRvYXN0ZXI7XG5cbiAgICAgICAgdGhpcy5wcmltYXJ5Q29sb3JzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICduYXZpZ2F0aW9uJyxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IFsnbmF2aWdhdGlvbiddLFxuICAgICAgICAgICAgICAgIGhleDogJzJGMzgzRidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2FjdGlvbicsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiBbJ3Bvc2l0aXZlJ10sXG4gICAgICAgICAgICAgICAgaGV4OiAnNEE4OURDJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiBbJ2RhcmsnLCAnYmFzZS1mb250LWNvbG9yJ10sXG4gICAgICAgICAgICAgICAgaGV4OiAnNDc0NzQ3J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnYmFja2dyb3VuZCcsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiBbJ29mZi13aGl0ZScsICdiYWNrZ3JvdW5kJ10sXG4gICAgICAgICAgICAgICAgaGV4OiAnRjRGNEY0J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnbmV1dHJhbCcsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiBbJ25ldXRyYWwnXSxcbiAgICAgICAgICAgICAgICBoZXg6ICc3NDc4ODQnXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuZW50aXR5Q29sb3JzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdsZWFkJyxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IFsnbGVhZCddLFxuICAgICAgICAgICAgICAgIGhleDogJ0FBNjY5OSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2NvbnRhY3QnLFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlczogWydjb250YWN0J10sXG4gICAgICAgICAgICAgICAgaGV4OiAnRkZBQTQ0J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnY29tcGFueScsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiBbJ2NvbXBhbnknXSxcbiAgICAgICAgICAgICAgICBoZXg6ICczMzk5REQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdjYW5kaWRhdGUnLFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlczogWydjYW5kaWRhdGUnXSxcbiAgICAgICAgICAgICAgICBoZXg6ICc0NEJCNzcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdvcHBvcnR1bml0eScsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiBbJ29wcG9ydHVuaXR5J10sXG4gICAgICAgICAgICAgICAgaGV4OiAnNjYyMjU1J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnam9iJyxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IFsnam9iJ10sXG4gICAgICAgICAgICAgICAgaGV4OiAnQkI1NTY2J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnc3VibWlzc2lvbicsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiBbJ3N1Ym1pc3Npb24nXSxcbiAgICAgICAgICAgICAgICBoZXg6ICc3Nzg4OTknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdwbGFjZW1lbnQnLFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlczogWydwbGFjZW1lbnQnXSxcbiAgICAgICAgICAgICAgICBoZXg6ICcwQjM0NEYnXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuYW5hbHl0aWNzQ29sb3JzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdncmFwZWZydWl0JyxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IFsnZ3JhcGVmcnVpdCddLFxuICAgICAgICAgICAgICAgIGhleDogJ0RBNDQ1MydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2JpdHRlcnN3ZWV0JyxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IFsnYml0dGVyc3dlZXQnXSxcbiAgICAgICAgICAgICAgICBoZXg6ICdFQjY4NDUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzdW5mbG93ZXInLFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlczogWydzdW5mbG93ZXInXSxcbiAgICAgICAgICAgICAgICBoZXg6ICdGNkIwNDInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdncmFzcycsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiBbJ2dyYXNzJ10sXG4gICAgICAgICAgICAgICAgaGV4OiAnOENDMTUyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnbWludCcsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiBbJ21pbnQnXSxcbiAgICAgICAgICAgICAgICBoZXg6ICczN0JDOUInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdhcXVhJyxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IFsnYXF1YSddLFxuICAgICAgICAgICAgICAgIGhleDogJzNCQUZEQSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ29jZWFuJyxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IFsnb2NlYW4nXSxcbiAgICAgICAgICAgICAgICBoZXg6ICc0QTg5REMnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdjYXJuYXRpb24nLFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlczogWydjYXJuYXRpb24nXSxcbiAgICAgICAgICAgICAgICBoZXg6ICdENzcwQUQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdsYXZlbmRlcicsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiBbJ2xhdmVuZGVyJ10sXG4gICAgICAgICAgICAgICAgaGV4OiAnOTY3QURDJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGNoYW5nZUNvbG9yKGNvbG9yKSB7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICB9XG5cbiAgICBjb3B5TGluayhjb2xvcikge1xuICAgICAgICAvLyBDcmVhdGUgZG9tIGVsZW1lbnQgdG8gY29weSBmcm9tXG4gICAgICAgIGxldCBjb3B5RnJvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgICAgIGNvcHlGcm9tLnRleHRDb250ZW50ID0gYCMke2NvbG9yLmhleH1gO1xuICAgICAgICBsZXQgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoY29weUZyb20pO1xuICAgICAgICBjb3B5RnJvbS5zZWxlY3QoKTtcbiAgICAgICAgLy8gQ29weSB0ZXh0XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgICAgIC8vIERlbGV0ZSBlbGVtZW50XG4gICAgICAgIGJvZHkucmVtb3ZlQ2hpbGQoY29weUZyb20pO1xuXG4gICAgICAgIC8vIFNldCB0b2FzdCBvcHRpb25zXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBgIyR7Y29sb3IuaGV4fWAsXG4gICAgICAgICAgICBtZXNzYWdlOiAnQ29waWVkIHRvIHlvdXIgY2xpcGJvYXJkJyxcbiAgICAgICAgICAgIHRoZW1lOiBjb2xvci5uYW1lLFxuICAgICAgICAgICAgaWNvbjogJ2NsaXBib2FyZCcsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2dyb3dsVG9wUmlnaHQnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGNvbG9yLm5hbWUgPT09ICdhY3Rpb24nKSB0aGlzLm9wdGlvbnMudGhlbWUgPSAnb2NlYW4nO1xuXG4gICAgICAgIC8vIEZpcmUgdG9hc3RcbiAgICAgICAgdGhpcy50b2FzdGVyLmFsZXJ0KHRoaXMub3B0aW9ucyk7XG4gICAgfVxufVxuIl19

/***/ },
/* 362 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CompositionComponent = undefined;
	
	var _dec, _class; // NG2
	
	
	var _core = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CompositionComponent = exports.CompositionComponent = (_dec = (0, _core.Component)({
	    selector: 'layout',
	    template: __webpack_require__(455)
	}), _dec(_class = function CompositionComponent() {
	    _classCallCheck(this, CompositionComponent);
	}) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZGVzaWduL2NvbXBvc2l0aW9uL0NvbXBvc2l0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7a0JBQUE7OztBQUNBOzs7O0lBTWEsb0IsV0FBQSxvQixXQUpaLHFCQUFVO0FBQ1AsY0FBVSxRQURIO0FBRVAsY0FBVSxRQUFRLG9CQUFSO0FBRkgsQ0FBVixDIiwiZmlsZSI6IkNvbXBvc2l0aW9uLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ29kaS9ub3ZvLWRldi9saWJzL25vdm8tZWxlbWVudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2xheW91dCcsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vQ29tcG9zaXRpb24uaHRtbCcpXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvc2l0aW9uQ29tcG9uZW50IHtcbn1cbiJdfQ==

/***/ },
/* 363 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.IconographyComponent = undefined;
	
	var _dec, _class; // NG2
	
	
	var _core = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var IconographyComponent = exports.IconographyComponent = (_dec = (0, _core.Component)({
	    selector: 'iconography',
	    template: __webpack_require__(456)
	}), _dec(_class = function IconographyComponent() {
	    _classCallCheck(this, IconographyComponent);
	}) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZGVzaWduL2ljb25vZ3JhcGh5L0ljb25vZ3JhcGh5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7a0JBQUE7OztBQUNBOzs7O0lBTWEsb0IsV0FBQSxvQixXQUpaLHFCQUFVO0FBQ1AsY0FBVSxhQURIO0FBRVAsY0FBVSxRQUFRLG9CQUFSO0FBRkgsQ0FBVixDIiwiZmlsZSI6Ikljb25vZ3JhcGh5LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ29kaS9ub3ZvLWRldi9saWJzL25vdm8tZWxlbWVudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ljb25vZ3JhcGh5JyxcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9JY29ub2dyYXBoeS5odG1sJylcbn0pXG5leHBvcnQgY2xhc3MgSWNvbm9ncmFwaHlDb21wb25lbnQge1xufVxuIl19

/***/ },
/* 364 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TypographyComponent = undefined;
	
	var _dec, _class; // NG2
	
	
	var _core = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TypographyComponent = exports.TypographyComponent = (_dec = (0, _core.Component)({
	    selector: 'typography',
	    template: __webpack_require__(457)
	}), _dec(_class = function TypographyComponent() {
	    _classCallCheck(this, TypographyComponent);
	}) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZGVzaWduL3R5cG9ncmFwaHkvVHlwb2dyYXBoeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O2tCQUFBOzs7QUFDQTs7OztJQU1hLG1CLFdBQUEsbUIsV0FKWixxQkFBVTtBQUNQLGNBQVUsWUFESDtBQUVQLGNBQVUsUUFBUSxtQkFBUjtBQUZILENBQVYsQyIsImZpbGUiOiJUeXBvZ3JhcGh5LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ29kaS9ub3ZvLWRldi9saWJzL25vdm8tZWxlbWVudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3R5cG9ncmFwaHknLFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL1R5cG9ncmFwaHkuaHRtbCcpXG59KVxuZXhwb3J0IGNsYXNzIFR5cG9ncmFwaHlDb21wb25lbnQge1xufVxuIl19

/***/ },
/* 365 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ButtonDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _PrimaryButtonDemo = __webpack_require__(463);
	
	var _PrimaryButtonDemo2 = _interopRequireDefault(_PrimaryButtonDemo);
	
	var _DialogueButtonDemo = __webpack_require__(458);
	
	var _DialogueButtonDemo2 = _interopRequireDefault(_DialogueButtonDemo);
	
	var _HeaderButtonDemo = __webpack_require__(460);
	
	var _HeaderButtonDemo2 = _interopRequireDefault(_HeaderButtonDemo);
	
	var _IconButtonDemo = __webpack_require__(461);
	
	var _IconButtonDemo2 = _interopRequireDefault(_IconButtonDemo);
	
	var _StandardButtonDemo = __webpack_require__(465);
	
	var _StandardButtonDemo2 = _interopRequireDefault(_StandardButtonDemo);
	
	var _SecondaryButtonDemo = __webpack_require__(464);
	
	var _SecondaryButtonDemo2 = _interopRequireDefault(_SecondaryButtonDemo);
	
	var _DynamicButtonDemo = __webpack_require__(459);
	
	var _DynamicButtonDemo2 = _interopRequireDefault(_DynamicButtonDemo);
	
	var _LoadingButtonDemo = __webpack_require__(462);
	
	var _LoadingButtonDemo2 = _interopRequireDefault(_LoadingButtonDemo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Button <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/button">(source)</a></small></h1>\n    <p>A button clearly indicates a point of action for the user. Bullhorn buttons\n     come in a variety of themes, custom tailored to fit your use-case.</p>\n\n    <h2>Themes</h2>\n    <p>\n        Bullhorn button themes were hand crafted to make your life easier.\n         Most buttons used in the Bullhorn platform should utilize a\n         <code>theme</code> attribute. Theme attributes provide access to every\n         variation of Bullhorn UX approved buttons. Depending on the theme, some\n         buttons may also utilize <code>icon</code>, <code>side</code>, and\n         <code>inverse</code> attributes. Button are divided by function into\n         four main categories: Primary, Secondary, Neutralizing, Subtractive.\n         There are also three other button types that are independent of function:\n         Dialogue, Icon, and Header.\n    </p>\n\n    <h5>Colors</h5>\n    <p>\n        Acceptable colors include <code>Primary</code>, <code>Success</code>, <code>Warning</code>, <code>Negative</code>,\n         and <strong>all analytics colors</strong> which can be found in the color section of the style guide.\n    </p>\n\n    <br/>\n\n    <h5>Primary</h5>\n    <p>\n        Primary buttons are used to as primary calls-to-action. They should <strong>always</strong>\n         get an <code>icon</code> attribute. Primary buttons with a "success" color\n         <code>color="success"</code> are used for saving and will almost always contain a "check" icon.\n         Negative color primary buttons <code>color="negative"</code> are used to delete,\n         clear, or otherwise remove an extant element. Primary buttons should never have a <code>side</code> attribute.\n    </p>\n    <div class="example buttons-demo">' + _PrimaryButtonDemo2.default + '</div>\n    <code-snippet [code]="PrimaryButtonDemoTpl"></code-snippet>\n\n    <h5>Secondary</h5>\n    <p>\n        Secondary buttons are used as an alternative Primary button or when there\n         is a second major action on a page. They usually appears only in Overview\n         and Slideout headers. This theme with an <code>inverse</code> attribute is\n         often used as the action button in dropdown menus.\n    </p>\n    <div class="example buttons-demo">' + _SecondaryButtonDemo2.default + '</div>\n    <code-snippet [code]="SecondaryButtonDemoTpl"></code-snippet>\n    <p>\n        Secondary buttons can also get an <code>inverse</code> attribute for use on a colored background.\n    </p>\n    <div class="example header buttons-demo" [ngClass]="color" (click)="changeColor()" tooltip="Click Me!" tooltipPlacement="top">' + _HeaderButtonDemo2.default + '</div>\n    <code-snippet [code]="HeaderButtonDemoTpl"></code-snippet>\n\n    <h5>Dialogue</h5>\n    <p>\n        Similar to icon buttons, dialogue buttons require less visual dominance but often need additional helper text. Dialogue buttons\n        <em>may</em> contain <strong>any</strong> icon and a\n        <code>side</code> may be specified eg:<code>side="right"</code> to place the icon on the right or left side of the text. Dialogue buttons may also use an\n        <code>inverse</code> attribute to change its text color to white.\n    </p>\n    <div class="example buttons-demo">' + _DialogueButtonDemo2.default + '</div>\n    <code-snippet [code]="DialogueButtonDemoTpl"></code-snippet>\n\n    <h5>Standard</h5>\n    <p>\n        Standard buttons are the most generic button style. Standard buttons by default are\n         styled identically to standard buttons with a <code>color="light"</code>\n         attribute. Typically, a standard button is used to cancel an action,\n         or to cease any additional progress. Although standard buttons <em>can</em>\n         get an <code>icon</code> attribute, they should almost never be used with an icon.\n         If your proposed design calls for a standard button with an icon, consider using\n         a different button theme, like dialogue.\n    </p>\n    <div class="example buttons-demo">' + _StandardButtonDemo2.default + '</div>\n    <code-snippet [code]="NeutralButtonDemoTpl"></code-snippet>\n\n    <h5>Icon</h5>\n    <p>\n        The <code>icon</code> theme is used to create\n        <strong>icon-only</strong> buttons, which contain no text. They can occupy any of the four main functions but require far less visual dominance than normal buttons. Icon buttons\n        <strong>always</strong> have an <code>icon</code> attribute and can use\n        <strong>any</strong> icon. Icon buttons may also use an\n        <code>inverse</code> attribute to change its icon color to white.\n    </p>\n    <div class="example buttons-demo icons" [ngClass]="color" (click)="changeColor()" tooltip="Click Me!" tooltipPlacement="top">' + _IconButtonDemo2.default + '</div>\n    <code-snippet [code]="IconButtonDemoTpl"></code-snippet>\n\n    <h5>Dynamic</h5>\n    <p>\n        Button parameters can be dynamically set and change at runtime.  The styles should\n        change and be applied when the values change.\n    </p>\n    <div class="example buttons-demo">' + _DynamicButtonDemo2.default + '</div>\n    <code-snippet [code]="DynamicButtonDemoTpl"></code-snippet>\n\n    <h5>Loading</h5>\n    <p>\n        Buttons can display a loading state when given the "loading" parameter. When loading is true\n        the button will be disabled and get a loading spinner.\n    </p>\n    <div class="example buttons-demo">' + _LoadingButtonDemo2.default + '</div>\n    <code-snippet [code]="LoadingButtonDemoTpl"></code-snippet>\n</div>\n';
	
	var HEADER_COLORS = ['blue', 'green', 'yellow', 'orange', 'red', 'purple'];
	
	var ButtonDemoComponent = exports.ButtonDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'buttons-demo',
	    template: template
	}), _dec(_class = function () {
	    function ButtonDemoComponent() {
	        _classCallCheck(this, ButtonDemoComponent);
	
	        this.loading = false;
	        this.loadingButtonText = 'Delete';
	
	        this.PrimaryButtonDemoTpl = _PrimaryButtonDemo2.default;
	        this.SecondaryButtonDemoTpl = _SecondaryButtonDemo2.default;
	        this.DialogueButtonDemoTpl = _DialogueButtonDemo2.default;
	        this.NeutralButtonDemoTpl = _StandardButtonDemo2.default;
	        this.HeaderButtonDemoTpl = _HeaderButtonDemo2.default;
	        this.IconButtonDemoTpl = _IconButtonDemo2.default;
	        this.DynamicButtonDemoTpl = _DynamicButtonDemo2.default;
	        this.LoadingButtonDemoTpl = _LoadingButtonDemo2.default;
	
	        this.theme = 'primary';
	        this.isChecked = false;
	    }
	
	    _createClass(ButtonDemoComponent, [{
	        key: 'ngOnInit',
	        value: function ngOnInit() {
	            this.color = 'blue';
	            this.negativeColor = 'negative';
	        }
	    }, {
	        key: 'changeColor',
	        value: function changeColor() {
	            var idx = HEADER_COLORS.indexOf(this.color);
	            this.color = HEADER_COLORS[idx + 1];
	        }
	    }, {
	        key: 'changeTheme',
	        value: function changeTheme() {
	            var i = Math.floor(Math.random() * 4);
	            this.theme = ['primary', 'secondary', 'dialogue', 'standard', 'icon'][i];
	        }
	    }, {
	        key: 'fakeRequest',
	        value: function fakeRequest() {
	            var _this = this;
	
	            this.loading = true;
	            this.loadingButtonText = this.loading ? 'Removing... ' : 'Delete';
	            setTimeout(function () {
	                _this.loading = false;
	                _this.loadingButtonText = _this.loading ? 'Removing... ' : 'Delete';
	            }, 60000);
	        }
	    }]);
	
	    return ButtonDemoComponent;
	}()) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvYnV0dG9uL0J1dHRvbkRlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O2tCQUFBOztBQUVBOzs7QUFEQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU0sNm1MQUFOOztBQXlHQSxJQUFNLGdCQUFnQixDQUFDLE1BQUQsRUFBUyxPQUFULEVBQWtCLFFBQWxCLEVBQTRCLFFBQTVCLEVBQXNDLEtBQXRDLEVBQTZDLFFBQTdDLENBQXRCOztJQU1hLG1CLFdBQUEsbUIsV0FKWixxQkFBVTtBQUNQLGNBQVUsY0FESDtBQUVQLGNBQVU7QUFGSCxDQUFWLEM7QUFRRyxtQ0FBYztBQUFBOztBQUFBLGFBSGQsT0FHYyxHQUhJLEtBR0o7QUFBQSxhQUZkLGlCQUVjLEdBRmEsUUFFYjs7QUFDVixhQUFLLG9CQUFMO0FBQ0EsYUFBSyxzQkFBTDtBQUNBLGFBQUsscUJBQUw7QUFDQSxhQUFLLG9CQUFMO0FBQ0EsYUFBSyxtQkFBTDtBQUNBLGFBQUssaUJBQUw7QUFDQSxhQUFLLG9CQUFMO0FBQ0EsYUFBSyxvQkFBTDs7QUFFQSxhQUFLLEtBQUwsR0FBYSxTQUFiO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0g7Ozs7bUNBRVU7QUFDUCxpQkFBSyxLQUFMLEdBQWEsTUFBYjtBQUNBLGlCQUFLLGFBQUwsR0FBcUIsVUFBckI7QUFDSDs7O3NDQUVhO0FBQ1YsZ0JBQUksTUFBTSxjQUFjLE9BQWQsQ0FBc0IsS0FBSyxLQUEzQixDQUFWO0FBQ0EsaUJBQUssS0FBTCxHQUFhLGNBQWMsTUFBTSxDQUFwQixDQUFiO0FBQ0g7OztzQ0FFYTtBQUNWLGdCQUFJLElBQUksS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLENBQTNCLENBQVI7QUFDQSxpQkFBSyxLQUFMLEdBQWEsQ0FBQyxTQUFELEVBQVksV0FBWixFQUF5QixVQUF6QixFQUFxQyxVQUFyQyxFQUFpRCxNQUFqRCxFQUF5RCxDQUF6RCxDQUFiO0FBQ0g7OztzQ0FFYTtBQUFBOztBQUNWLGlCQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsaUJBQUssaUJBQUwsR0FBMEIsS0FBSyxPQUFOLEdBQWlCLGNBQWpCLEdBQWtDLFFBQTNEO0FBQ0EsdUJBQVcsWUFBTTtBQUNiLHNCQUFLLE9BQUwsR0FBZSxLQUFmO0FBQ0Esc0JBQUssaUJBQUwsR0FBMEIsTUFBSyxPQUFOLEdBQWlCLGNBQWpCLEdBQWtDLFFBQTNEO0FBQ0gsYUFIRCxFQUdHLEtBSEg7QUFJSCIsImZpbGUiOiJCdXR0b25EZW1vLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ29kaS9ub3ZvLWRldi9saWJzL25vdm8tZWxlbWVudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgUHJpbWFyeUJ1dHRvbkRlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvUHJpbWFyeUJ1dHRvbkRlbW8uaHRtbCc7XG5pbXBvcnQgRGlhbG9ndWVCdXR0b25EZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL0RpYWxvZ3VlQnV0dG9uRGVtby5odG1sJztcbmltcG9ydCBIZWFkZXJCdXR0b25EZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL0hlYWRlckJ1dHRvbkRlbW8uaHRtbCc7XG5pbXBvcnQgSWNvbkJ1dHRvbkRlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvSWNvbkJ1dHRvbkRlbW8uaHRtbCc7XG5pbXBvcnQgU3RhbmRhcmRCdXR0b25EZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL1N0YW5kYXJkQnV0dG9uRGVtby5odG1sJztcbmltcG9ydCBTZWNvbmRhcnlCdXR0b25EZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL1NlY29uZGFyeUJ1dHRvbkRlbW8uaHRtbCc7XG5pbXBvcnQgRHluYW1pY0J1dHRvbkRlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvRHluYW1pY0J1dHRvbkRlbW8uaHRtbCc7XG5pbXBvcnQgTG9hZGluZ0J1dHRvbkRlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvTG9hZGluZ0J1dHRvbkRlbW8uaHRtbCc7XG5cbmNvbnN0IHRlbXBsYXRlID0gYFxuPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxoMT5CdXR0b24gPHNtYWxsPjxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYnVsbGhvcm4vbm92by1lbGVtZW50cy9ibG9iL21hc3Rlci9zcmMvZWxlbWVudHMvYnV0dG9uXCI+KHNvdXJjZSk8L2E+PC9zbWFsbD48L2gxPlxuICAgIDxwPkEgYnV0dG9uIGNsZWFybHkgaW5kaWNhdGVzIGEgcG9pbnQgb2YgYWN0aW9uIGZvciB0aGUgdXNlci4gQnVsbGhvcm4gYnV0dG9uc1xuICAgICBjb21lIGluIGEgdmFyaWV0eSBvZiB0aGVtZXMsIGN1c3RvbSB0YWlsb3JlZCB0byBmaXQgeW91ciB1c2UtY2FzZS48L3A+XG5cbiAgICA8aDI+VGhlbWVzPC9oMj5cbiAgICA8cD5cbiAgICAgICAgQnVsbGhvcm4gYnV0dG9uIHRoZW1lcyB3ZXJlIGhhbmQgY3JhZnRlZCB0byBtYWtlIHlvdXIgbGlmZSBlYXNpZXIuXG4gICAgICAgICBNb3N0IGJ1dHRvbnMgdXNlZCBpbiB0aGUgQnVsbGhvcm4gcGxhdGZvcm0gc2hvdWxkIHV0aWxpemUgYVxuICAgICAgICAgPGNvZGU+dGhlbWU8L2NvZGU+IGF0dHJpYnV0ZS4gVGhlbWUgYXR0cmlidXRlcyBwcm92aWRlIGFjY2VzcyB0byBldmVyeVxuICAgICAgICAgdmFyaWF0aW9uIG9mIEJ1bGxob3JuIFVYIGFwcHJvdmVkIGJ1dHRvbnMuIERlcGVuZGluZyBvbiB0aGUgdGhlbWUsIHNvbWVcbiAgICAgICAgIGJ1dHRvbnMgbWF5IGFsc28gdXRpbGl6ZSA8Y29kZT5pY29uPC9jb2RlPiwgPGNvZGU+c2lkZTwvY29kZT4sIGFuZFxuICAgICAgICAgPGNvZGU+aW52ZXJzZTwvY29kZT4gYXR0cmlidXRlcy4gQnV0dG9uIGFyZSBkaXZpZGVkIGJ5IGZ1bmN0aW9uIGludG9cbiAgICAgICAgIGZvdXIgbWFpbiBjYXRlZ29yaWVzOiBQcmltYXJ5LCBTZWNvbmRhcnksIE5ldXRyYWxpemluZywgU3VidHJhY3RpdmUuXG4gICAgICAgICBUaGVyZSBhcmUgYWxzbyB0aHJlZSBvdGhlciBidXR0b24gdHlwZXMgdGhhdCBhcmUgaW5kZXBlbmRlbnQgb2YgZnVuY3Rpb246XG4gICAgICAgICBEaWFsb2d1ZSwgSWNvbiwgYW5kIEhlYWRlci5cbiAgICA8L3A+XG5cbiAgICA8aDU+Q29sb3JzPC9oNT5cbiAgICA8cD5cbiAgICAgICAgQWNjZXB0YWJsZSBjb2xvcnMgaW5jbHVkZSA8Y29kZT5QcmltYXJ5PC9jb2RlPiwgPGNvZGU+U3VjY2VzczwvY29kZT4sIDxjb2RlPldhcm5pbmc8L2NvZGU+LCA8Y29kZT5OZWdhdGl2ZTwvY29kZT4sXG4gICAgICAgICBhbmQgPHN0cm9uZz5hbGwgYW5hbHl0aWNzIGNvbG9yczwvc3Ryb25nPiB3aGljaCBjYW4gYmUgZm91bmQgaW4gdGhlIGNvbG9yIHNlY3Rpb24gb2YgdGhlIHN0eWxlIGd1aWRlLlxuICAgIDwvcD5cblxuICAgIDxici8+XG5cbiAgICA8aDU+UHJpbWFyeTwvaDU+XG4gICAgPHA+XG4gICAgICAgIFByaW1hcnkgYnV0dG9ucyBhcmUgdXNlZCB0byBhcyBwcmltYXJ5IGNhbGxzLXRvLWFjdGlvbi4gVGhleSBzaG91bGQgPHN0cm9uZz5hbHdheXM8L3N0cm9uZz5cbiAgICAgICAgIGdldCBhbiA8Y29kZT5pY29uPC9jb2RlPiBhdHRyaWJ1dGUuIFByaW1hcnkgYnV0dG9ucyB3aXRoIGEgXCJzdWNjZXNzXCIgY29sb3JcbiAgICAgICAgIDxjb2RlPmNvbG9yPVwic3VjY2Vzc1wiPC9jb2RlPiBhcmUgdXNlZCBmb3Igc2F2aW5nIGFuZCB3aWxsIGFsbW9zdCBhbHdheXMgY29udGFpbiBhIFwiY2hlY2tcIiBpY29uLlxuICAgICAgICAgTmVnYXRpdmUgY29sb3IgcHJpbWFyeSBidXR0b25zIDxjb2RlPmNvbG9yPVwibmVnYXRpdmVcIjwvY29kZT4gYXJlIHVzZWQgdG8gZGVsZXRlLFxuICAgICAgICAgY2xlYXIsIG9yIG90aGVyd2lzZSByZW1vdmUgYW4gZXh0YW50IGVsZW1lbnQuIFByaW1hcnkgYnV0dG9ucyBzaG91bGQgbmV2ZXIgaGF2ZSBhIDxjb2RlPnNpZGU8L2NvZGU+IGF0dHJpYnV0ZS5cbiAgICA8L3A+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgYnV0dG9ucy1kZW1vXCI+JHtQcmltYXJ5QnV0dG9uRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIlByaW1hcnlCdXR0b25EZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG5cbiAgICA8aDU+U2Vjb25kYXJ5PC9oNT5cbiAgICA8cD5cbiAgICAgICAgU2Vjb25kYXJ5IGJ1dHRvbnMgYXJlIHVzZWQgYXMgYW4gYWx0ZXJuYXRpdmUgUHJpbWFyeSBidXR0b24gb3Igd2hlbiB0aGVyZVxuICAgICAgICAgaXMgYSBzZWNvbmQgbWFqb3IgYWN0aW9uIG9uIGEgcGFnZS4gVGhleSB1c3VhbGx5IGFwcGVhcnMgb25seSBpbiBPdmVydmlld1xuICAgICAgICAgYW5kIFNsaWRlb3V0IGhlYWRlcnMuIFRoaXMgdGhlbWUgd2l0aCBhbiA8Y29kZT5pbnZlcnNlPC9jb2RlPiBhdHRyaWJ1dGUgaXNcbiAgICAgICAgIG9mdGVuIHVzZWQgYXMgdGhlIGFjdGlvbiBidXR0b24gaW4gZHJvcGRvd24gbWVudXMuXG4gICAgPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIGJ1dHRvbnMtZGVtb1wiPiR7U2Vjb25kYXJ5QnV0dG9uRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIlNlY29uZGFyeUJ1dHRvbkRlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cbiAgICA8cD5cbiAgICAgICAgU2Vjb25kYXJ5IGJ1dHRvbnMgY2FuIGFsc28gZ2V0IGFuIDxjb2RlPmludmVyc2U8L2NvZGU+IGF0dHJpYnV0ZSBmb3IgdXNlIG9uIGEgY29sb3JlZCBiYWNrZ3JvdW5kLlxuICAgIDwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBoZWFkZXIgYnV0dG9ucy1kZW1vXCIgW25nQ2xhc3NdPVwiY29sb3JcIiAoY2xpY2spPVwiY2hhbmdlQ29sb3IoKVwiIHRvb2x0aXA9XCJDbGljayBNZSFcIiB0b29sdGlwUGxhY2VtZW50PVwidG9wXCI+JHtIZWFkZXJCdXR0b25EZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiSGVhZGVyQnV0dG9uRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuXG4gICAgPGg1PkRpYWxvZ3VlPC9oNT5cbiAgICA8cD5cbiAgICAgICAgU2ltaWxhciB0byBpY29uIGJ1dHRvbnMsIGRpYWxvZ3VlIGJ1dHRvbnMgcmVxdWlyZSBsZXNzIHZpc3VhbCBkb21pbmFuY2UgYnV0IG9mdGVuIG5lZWQgYWRkaXRpb25hbCBoZWxwZXIgdGV4dC4gRGlhbG9ndWUgYnV0dG9uc1xuICAgICAgICA8ZW0+bWF5PC9lbT4gY29udGFpbiA8c3Ryb25nPmFueTwvc3Ryb25nPiBpY29uIGFuZCBhXG4gICAgICAgIDxjb2RlPnNpZGU8L2NvZGU+IG1heSBiZSBzcGVjaWZpZWQgZWc6PGNvZGU+c2lkZT1cInJpZ2h0XCI8L2NvZGU+IHRvIHBsYWNlIHRoZSBpY29uIG9uIHRoZSByaWdodCBvciBsZWZ0IHNpZGUgb2YgdGhlIHRleHQuIERpYWxvZ3VlIGJ1dHRvbnMgbWF5IGFsc28gdXNlIGFuXG4gICAgICAgIDxjb2RlPmludmVyc2U8L2NvZGU+IGF0dHJpYnV0ZSB0byBjaGFuZ2UgaXRzIHRleHQgY29sb3IgdG8gd2hpdGUuXG4gICAgPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIGJ1dHRvbnMtZGVtb1wiPiR7RGlhbG9ndWVCdXR0b25EZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiRGlhbG9ndWVCdXR0b25EZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG5cbiAgICA8aDU+U3RhbmRhcmQ8L2g1PlxuICAgIDxwPlxuICAgICAgICBTdGFuZGFyZCBidXR0b25zIGFyZSB0aGUgbW9zdCBnZW5lcmljIGJ1dHRvbiBzdHlsZS4gU3RhbmRhcmQgYnV0dG9ucyBieSBkZWZhdWx0IGFyZVxuICAgICAgICAgc3R5bGVkIGlkZW50aWNhbGx5IHRvIHN0YW5kYXJkIGJ1dHRvbnMgd2l0aCBhIDxjb2RlPmNvbG9yPVwibGlnaHRcIjwvY29kZT5cbiAgICAgICAgIGF0dHJpYnV0ZS4gVHlwaWNhbGx5LCBhIHN0YW5kYXJkIGJ1dHRvbiBpcyB1c2VkIHRvIGNhbmNlbCBhbiBhY3Rpb24sXG4gICAgICAgICBvciB0byBjZWFzZSBhbnkgYWRkaXRpb25hbCBwcm9ncmVzcy4gQWx0aG91Z2ggc3RhbmRhcmQgYnV0dG9ucyA8ZW0+Y2FuPC9lbT5cbiAgICAgICAgIGdldCBhbiA8Y29kZT5pY29uPC9jb2RlPiBhdHRyaWJ1dGUsIHRoZXkgc2hvdWxkIGFsbW9zdCBuZXZlciBiZSB1c2VkIHdpdGggYW4gaWNvbi5cbiAgICAgICAgIElmIHlvdXIgcHJvcG9zZWQgZGVzaWduIGNhbGxzIGZvciBhIHN0YW5kYXJkIGJ1dHRvbiB3aXRoIGFuIGljb24sIGNvbnNpZGVyIHVzaW5nXG4gICAgICAgICBhIGRpZmZlcmVudCBidXR0b24gdGhlbWUsIGxpa2UgZGlhbG9ndWUuXG4gICAgPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIGJ1dHRvbnMtZGVtb1wiPiR7U3RhbmRhcmRCdXR0b25EZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiTmV1dHJhbEJ1dHRvbkRlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cblxuICAgIDxoNT5JY29uPC9oNT5cbiAgICA8cD5cbiAgICAgICAgVGhlIDxjb2RlPmljb248L2NvZGU+IHRoZW1lIGlzIHVzZWQgdG8gY3JlYXRlXG4gICAgICAgIDxzdHJvbmc+aWNvbi1vbmx5PC9zdHJvbmc+IGJ1dHRvbnMsIHdoaWNoIGNvbnRhaW4gbm8gdGV4dC4gVGhleSBjYW4gb2NjdXB5IGFueSBvZiB0aGUgZm91ciBtYWluIGZ1bmN0aW9ucyBidXQgcmVxdWlyZSBmYXIgbGVzcyB2aXN1YWwgZG9taW5hbmNlIHRoYW4gbm9ybWFsIGJ1dHRvbnMuIEljb24gYnV0dG9uc1xuICAgICAgICA8c3Ryb25nPmFsd2F5czwvc3Ryb25nPiBoYXZlIGFuIDxjb2RlPmljb248L2NvZGU+IGF0dHJpYnV0ZSBhbmQgY2FuIHVzZVxuICAgICAgICA8c3Ryb25nPmFueTwvc3Ryb25nPiBpY29uLiBJY29uIGJ1dHRvbnMgbWF5IGFsc28gdXNlIGFuXG4gICAgICAgIDxjb2RlPmludmVyc2U8L2NvZGU+IGF0dHJpYnV0ZSB0byBjaGFuZ2UgaXRzIGljb24gY29sb3IgdG8gd2hpdGUuXG4gICAgPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIGJ1dHRvbnMtZGVtbyBpY29uc1wiIFtuZ0NsYXNzXT1cImNvbG9yXCIgKGNsaWNrKT1cImNoYW5nZUNvbG9yKClcIiB0b29sdGlwPVwiQ2xpY2sgTWUhXCIgdG9vbHRpcFBsYWNlbWVudD1cInRvcFwiPiR7SWNvbkJ1dHRvbkRlbW9UcGx9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJJY29uQnV0dG9uRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuXG4gICAgPGg1PkR5bmFtaWM8L2g1PlxuICAgIDxwPlxuICAgICAgICBCdXR0b24gcGFyYW1ldGVycyBjYW4gYmUgZHluYW1pY2FsbHkgc2V0IGFuZCBjaGFuZ2UgYXQgcnVudGltZS4gIFRoZSBzdHlsZXMgc2hvdWxkXG4gICAgICAgIGNoYW5nZSBhbmQgYmUgYXBwbGllZCB3aGVuIHRoZSB2YWx1ZXMgY2hhbmdlLlxuICAgIDwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBidXR0b25zLWRlbW9cIj4ke0R5bmFtaWNCdXR0b25EZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiRHluYW1pY0J1dHRvbkRlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cblxuICAgIDxoNT5Mb2FkaW5nPC9oNT5cbiAgICA8cD5cbiAgICAgICAgQnV0dG9ucyBjYW4gZGlzcGxheSBhIGxvYWRpbmcgc3RhdGUgd2hlbiBnaXZlbiB0aGUgXCJsb2FkaW5nXCIgcGFyYW1ldGVyLiBXaGVuIGxvYWRpbmcgaXMgdHJ1ZVxuICAgICAgICB0aGUgYnV0dG9uIHdpbGwgYmUgZGlzYWJsZWQgYW5kIGdldCBhIGxvYWRpbmcgc3Bpbm5lci5cbiAgICA8L3A+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgYnV0dG9ucy1kZW1vXCI+JHtMb2FkaW5nQnV0dG9uRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIkxvYWRpbmdCdXR0b25EZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG48L2Rpdj5cbmA7XG5cbmNvbnN0IEhFQURFUl9DT0xPUlMgPSBbJ2JsdWUnLCAnZ3JlZW4nLCAneWVsbG93JywgJ29yYW5nZScsICdyZWQnLCAncHVycGxlJ107XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYnV0dG9ucy1kZW1vJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uRGVtb0NvbXBvbmVudCB7XG4gICAgbG9hZGluZzpCb29sZWFuID0gZmFsc2U7XG4gICAgbG9hZGluZ0J1dHRvblRleHQ6U3RyaW5nID0gJ0RlbGV0ZSc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5QcmltYXJ5QnV0dG9uRGVtb1RwbCA9IFByaW1hcnlCdXR0b25EZW1vVHBsO1xuICAgICAgICB0aGlzLlNlY29uZGFyeUJ1dHRvbkRlbW9UcGwgPSBTZWNvbmRhcnlCdXR0b25EZW1vVHBsO1xuICAgICAgICB0aGlzLkRpYWxvZ3VlQnV0dG9uRGVtb1RwbCA9IERpYWxvZ3VlQnV0dG9uRGVtb1RwbDtcbiAgICAgICAgdGhpcy5OZXV0cmFsQnV0dG9uRGVtb1RwbCA9IFN0YW5kYXJkQnV0dG9uRGVtb1RwbDtcbiAgICAgICAgdGhpcy5IZWFkZXJCdXR0b25EZW1vVHBsID0gSGVhZGVyQnV0dG9uRGVtb1RwbDtcbiAgICAgICAgdGhpcy5JY29uQnV0dG9uRGVtb1RwbCA9IEljb25CdXR0b25EZW1vVHBsO1xuICAgICAgICB0aGlzLkR5bmFtaWNCdXR0b25EZW1vVHBsID0gRHluYW1pY0J1dHRvbkRlbW9UcGw7XG4gICAgICAgIHRoaXMuTG9hZGluZ0J1dHRvbkRlbW9UcGwgPSBMb2FkaW5nQnV0dG9uRGVtb1RwbDtcblxuICAgICAgICB0aGlzLnRoZW1lID0gJ3ByaW1hcnknO1xuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbG9yID0gJ2JsdWUnO1xuICAgICAgICB0aGlzLm5lZ2F0aXZlQ29sb3IgPSAnbmVnYXRpdmUnO1xuICAgIH1cblxuICAgIGNoYW5nZUNvbG9yKCkge1xuICAgICAgICBsZXQgaWR4ID0gSEVBREVSX0NPTE9SUy5pbmRleE9mKHRoaXMuY29sb3IpO1xuICAgICAgICB0aGlzLmNvbG9yID0gSEVBREVSX0NPTE9SU1tpZHggKyAxXTtcbiAgICB9XG5cbiAgICBjaGFuZ2VUaGVtZSgpIHtcbiAgICAgICAgbGV0IGkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KTtcbiAgICAgICAgdGhpcy50aGVtZSA9IFsncHJpbWFyeScsICdzZWNvbmRhcnknLCAnZGlhbG9ndWUnLCAnc3RhbmRhcmQnLCAnaWNvbiddW2ldO1xuICAgIH1cblxuICAgIGZha2VSZXF1ZXN0KCkge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmxvYWRpbmdCdXR0b25UZXh0ID0gKHRoaXMubG9hZGluZykgPyAnUmVtb3ZpbmcuLi4gJyA6ICdEZWxldGUnO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nQnV0dG9uVGV4dCA9ICh0aGlzLmxvYWRpbmcpID8gJ1JlbW92aW5nLi4uICcgOiAnRGVsZXRlJztcbiAgICAgICAgfSwgNjAwMDApO1xuICAgIH1cbn1cbiJdfQ==

/***/ },
/* 366 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CalendarDemoComponent = undefined;
	
	var _dec, _class; // NG2
	
	// APP
	
	// Vendor
	
	
	var _core = __webpack_require__(2);
	
	var _CalendarDemo = __webpack_require__(466);
	
	var _CalendarDemo2 = _interopRequireDefault(_CalendarDemo);
	
	var _TimeDemo = __webpack_require__(468);
	
	var _TimeDemo2 = _interopRequireDefault(_TimeDemo);
	
	var _RangeDemo = __webpack_require__(467);
	
	var _RangeDemo2 = _interopRequireDefault(_RangeDemo);
	
	var _moment = __webpack_require__(3);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Date and Time Pickers</h1>\n    <p>These allow users to easily select a time and date. It comes in a handful of varieties based on the content of the field.</p>\n\n    <h2>Calendar Picker  <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/date-picker">(source)</a></small></h2>\n    <p>The calendar picker is used to select a date. It appears in all date picker fields.</p>\n\n    <h5>Full Calendar Picker</h5>\n    <div class="example demo">' + _CalendarDemo2.default + '</div>\n    <code-snippet [code]="CalendarDemoTpl"></code-snippet>\n\n    <h2>Time Picker  <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/time-picker">(source)</a></small></h2>\n    <p>Time pickers come in 12 hour or 24 hour style.</p>\n\n    <h5>Standalone Time Picker</h5>\n    <div class="example demo">' + _TimeDemo2.default + '</div>\n    <code-snippet [code]="TimeDemoTpl"></code-snippet>\n\n    <h5>Range Picker</h5>\n    <div class="example demo">' + _RangeDemo2.default + '</div>\n    <code-snippet [code]="RangeDemoTpl"></code-snippet>\n</div>\n';
	
	var CalendarDemoComponent = exports.CalendarDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'calendar-demo',
	    template: template
	}), _dec(_class = function CalendarDemoComponent() {
	    _classCallCheck(this, CalendarDemoComponent);
	
	    this.CalendarDemoTpl = _CalendarDemo2.default;
	    this.TimeDemoTpl = _TimeDemo2.default;
	    this.RangeDemoTpl = _RangeDemo2.default;
	
	    this.time = new Date();
	    this.dateOne = new Date();
	    this.dateTwo = new Date();
	    this.start = (0, _moment2.default)().subtract(1, 'months');
	    this.end = (0, _moment2.default)().add(1, 'months');
	    this.value = {
	        startDate: null,
	        endDate: null
	    };
	}) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvY2FsZW5kYXIvQ2FsZW5kYXJEZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7a0JBQUE7O0FBRUE7O0FBSUE7OztBQUxBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7OztBQUVBLElBQU0sd3BDQUFOOztJQTZCYSxxQixXQUFBLHFCLFdBSloscUJBQVU7QUFDUCxjQUFVLGVBREg7QUFFUCxjQUFVO0FBRkgsQ0FBVixDLGdCQUtHLGlDQUFjO0FBQUE7O0FBQ1YsU0FBSyxlQUFMO0FBQ0EsU0FBSyxXQUFMO0FBQ0EsU0FBSyxZQUFMOztBQUVBLFNBQUssSUFBTCxHQUFZLElBQUksSUFBSixFQUFaO0FBQ0EsU0FBSyxPQUFMLEdBQWUsSUFBSSxJQUFKLEVBQWY7QUFDQSxTQUFLLE9BQUwsR0FBZSxJQUFJLElBQUosRUFBZjtBQUNBLFNBQUssS0FBTCxHQUFhLHdCQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBcUIsUUFBckIsQ0FBYjtBQUNBLFNBQUssR0FBTCxHQUFXLHdCQUFTLEdBQVQsQ0FBYSxDQUFiLEVBQWdCLFFBQWhCLENBQVg7QUFDQSxTQUFLLEtBQUwsR0FBYTtBQUNULG1CQUFXLElBREY7QUFFVCxpQkFBUztBQUZBLEtBQWI7QUFJSCxDIiwiZmlsZSI6IkNhbGVuZGFyRGVtby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdvZGkvbm92by1kZXYvbGlicy9ub3ZvLWVsZW1lbnRzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IENhbGVuZGFyRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9DYWxlbmRhckRlbW8uaHRtbCc7XG5pbXBvcnQgVGltZURlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvVGltZURlbW8uaHRtbCc7XG5pbXBvcnQgUmFuZ2VEZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL1JhbmdlRGVtby5odG1sJztcbi8vIFZlbmRvclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQvbW9tZW50JztcblxuY29uc3QgdGVtcGxhdGUgPSBgXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGgxPkRhdGUgYW5kIFRpbWUgUGlja2VyczwvaDE+XG4gICAgPHA+VGhlc2UgYWxsb3cgdXNlcnMgdG8gZWFzaWx5IHNlbGVjdCBhIHRpbWUgYW5kIGRhdGUuIEl0IGNvbWVzIGluIGEgaGFuZGZ1bCBvZiB2YXJpZXRpZXMgYmFzZWQgb24gdGhlIGNvbnRlbnQgb2YgdGhlIGZpZWxkLjwvcD5cblxuICAgIDxoMj5DYWxlbmRhciBQaWNrZXIgIDxzbWFsbD48YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2J1bGxob3JuL25vdm8tZWxlbWVudHMvYmxvYi9tYXN0ZXIvc3JjL2VsZW1lbnRzL2RhdGUtcGlja2VyXCI+KHNvdXJjZSk8L2E+PC9zbWFsbD48L2gyPlxuICAgIDxwPlRoZSBjYWxlbmRhciBwaWNrZXIgaXMgdXNlZCB0byBzZWxlY3QgYSBkYXRlLiBJdCBhcHBlYXJzIGluIGFsbCBkYXRlIHBpY2tlciBmaWVsZHMuPC9wPlxuXG4gICAgPGg1PkZ1bGwgQ2FsZW5kYXIgUGlja2VyPC9oNT5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBkZW1vXCI+JHtDYWxlbmRhckRlbW9UcGx9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJDYWxlbmRhckRlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cblxuICAgIDxoMj5UaW1lIFBpY2tlciAgPHNtYWxsPjxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYnVsbGhvcm4vbm92by1lbGVtZW50cy9ibG9iL21hc3Rlci9zcmMvZWxlbWVudHMvdGltZS1waWNrZXJcIj4oc291cmNlKTwvYT48L3NtYWxsPjwvaDI+XG4gICAgPHA+VGltZSBwaWNrZXJzIGNvbWUgaW4gMTIgaG91ciBvciAyNCBob3VyIHN0eWxlLjwvcD5cblxuICAgIDxoNT5TdGFuZGFsb25lIFRpbWUgUGlja2VyPC9oNT5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBkZW1vXCI+JHtUaW1lRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIlRpbWVEZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG5cbiAgICA8aDU+UmFuZ2UgUGlja2VyPC9oNT5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBkZW1vXCI+JHtSYW5nZURlbW9UcGx9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJSYW5nZURlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cbjwvZGl2PlxuYDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdjYWxlbmRhci1kZW1vJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJEZW1vQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5DYWxlbmRhckRlbW9UcGwgPSBDYWxlbmRhckRlbW9UcGw7XG4gICAgICAgIHRoaXMuVGltZURlbW9UcGwgPSBUaW1lRGVtb1RwbDtcbiAgICAgICAgdGhpcy5SYW5nZURlbW9UcGwgPSBSYW5nZURlbW9UcGw7XG5cbiAgICAgICAgdGhpcy50aW1lID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRlT25lID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRlVHdvID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zdGFydCA9IG1vbWVudCgpLnN1YnRyYWN0KDEsICdtb250aHMnKTtcbiAgICAgICAgdGhpcy5lbmQgPSBtb21lbnQoKS5hZGQoMSwgJ21vbnRocycpO1xuICAgICAgICB0aGlzLnZhbHVlID0ge1xuICAgICAgICAgICAgc3RhcnREYXRlOiBudWxsLFxuICAgICAgICAgICAgZW5kRGF0ZTogbnVsbFxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==

/***/ },
/* 367 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CardDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	// Vendor
	
	
	var _core = __webpack_require__(2);
	
	var _AttributeCardDemo = __webpack_require__(469);
	
	var _AttributeCardDemo2 = _interopRequireDefault(_AttributeCardDemo);
	
	var _FullConfigCardDemo = __webpack_require__(473);
	
	var _FullConfigCardDemo2 = _interopRequireDefault(_FullConfigCardDemo);
	
	var _ExtrasTimelineDemo = __webpack_require__(472);
	
	var _ExtrasTimelineDemo2 = _interopRequireDefault(_ExtrasTimelineDemo);
	
	var _ExtrasBestTimeDemo = __webpack_require__(470);
	
	var _ExtrasBestTimeDemo2 = _interopRequireDefault(_ExtrasBestTimeDemo);
	
	var _ExtrasChartDemoDemo = __webpack_require__(471);
	
	var _ExtrasChartDemoDemo2 = _interopRequireDefault(_ExtrasChartDemoDemo);
	
	var _novoElements = __webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// TODO - actions back in
	var template = '\n<div class="container">\n    <h1>Cards <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/card">(source)</a></small></h1>\n    <p>Components and elements for cards to make sure the loading/empty/layout views are all consistent.</p>\n\n    <h5>Examples</h5>\n    <p>Basic Card (using attributes)</p>\n    <div class="example">\n        ' + _AttributeCardDemo2.default + '\n        <div class="actions">\n            <button theme="secondary" (click)="toggleLoading()">Toggle Loading</button>\n            <button theme="secondary" (click)="toggleMessage()">Toggle Message</button>\n\n        </div>\n    </div>\n    <code-snippet [code]="AttributeCardDemoTpl"></code-snippet>\n\n    <p>Card (using config object and card-actions)</p>\n    <div class="example">\n        ' + _FullConfigCardDemo2.default + '\n        <div class="actions">\n            <button theme="secondary" (click)="toggleLoadingConfig()">Toggle Loading</button>\n            <button theme="secondary" (click)="toggleMessageConfig()">Toggle Message</button>\n\n        </div>\n    </div>\n    <code-snippet [code]="FullConfigCardDemoTpl"></code-snippet>\n\n    <h5>Card Extras - components/elements for cards</h5>\n    <p>Timeline</p>\n    <div class="example">\n        ' + _ExtrasTimelineDemo2.default + '\n        <div class="actions">\n\n        </div>\n    </div>\n    <code-snippet [code]="ExtrasTimelineDemoTpl"></code-snippet>\n\n    <p>Best Time to *INSERT*</p>\n    <div class="example">\n        ' + _ExtrasBestTimeDemo2.default + '\n        <div class="actions">\n\n        </div>\n    </div>\n    <code-snippet [code]="ExtrasBestTimeDemoTpl"></code-snippet>\n\n    <p>Donut Chart</p>\n    <div class="example">\n        ' + _ExtrasChartDemoDemo2.default + '\n        <div class="actions">\n\n        </div>\n    </div>\n    <code-snippet [code]="ExtrasChartDonutDemoTpl"></code-snippet>\n</div>\n';
	
	var CardDemoComponent = exports.CardDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'card-demo',
	    template: template
	}), _dec(_class = function () {
	    function CardDemoComponent(toaster) {
	        _classCallCheck(this, CardDemoComponent);
	
	        this.toaster = toaster;
	
	        // Templates
	        this.AttributeCardDemoTpl = _AttributeCardDemo2.default;
	        this.FullConfigCardDemoTpl = _FullConfigCardDemo2.default;
	        this.ExtrasTimelineDemoTpl = _ExtrasTimelineDemo2.default;
	        this.ExtrasBestTimeDemoTpl = _ExtrasBestTimeDemo2.default;
	        this.ExtrasChartDonutDemoTpl = _ExtrasChartDemoDemo2.default;
	
	        // Config for demos
	        this.refresh = true;
	        this.close = true;
	        this.move = true;
	        this.padding = true;
	
	        this.fullConfig = {
	            refresh: false,
	            icon: 'email',
	            messageIcon: 'email',
	            close: false,
	            move: true,
	            onClose: this.onClose.bind(this),
	            onRefresh: this.onRefresh.bind(this),
	            title: 'Test',
	            loading: false,
	            padding: true
	        };
	
	        this.start = 2000;
	        this.end = 2005;
	        this.created = 1995;
	
	        this.bestLabel = 'BEST TIME TO CONTACT';
	        this.bestTime = '1-PM';
	        this.bestDay = 'Friday';
	
	        this.donutValue = 0.5;
	        this.donutColor = '#662255';
	        this.donutLabel = 'Probability of Win %';
	    }
	
	    _createClass(CardDemoComponent, [{
	        key: 'onClose',
	        value: function onClose() {
	            this.toaster.alert({
	                theme: 'info',
	                title: 'Cards',
	                message: 'Close Clicked!'
	            });
	        }
	    }, {
	        key: 'onRefresh',
	        value: function onRefresh() {
	            this.toaster.alert({
	                theme: 'success',
	                title: 'Cards',
	                message: 'Refresh Clicked!'
	            });
	        }
	    }, {
	        key: 'toggleLoading',
	        value: function toggleLoading() {
	            this.loading = !this.loading;
	        }
	    }, {
	        key: 'toggleMessage',
	        value: function toggleMessage() {
	            if (!this.message) {
	                this.message = 'NO DATA!';
	                this.messageIcon = 'email';
	            } else {
	                this.message = undefined;
	            }
	        }
	    }, {
	        key: 'toggleLoadingConfig',
	        value: function toggleLoadingConfig() {
	            this.fullConfig.loading = !this.fullConfig.loading;
	        }
	    }, {
	        key: 'toggleMessageConfig',
	        value: function toggleMessageConfig() {
	            if (!this.fullConfig.message) {
	                this.fullConfig.message = 'NO DATA!';
	            } else {
	                this.fullConfig.message = undefined;
	            }
	        }
	    }, {
	        key: 'singleAction',
	        value: function singleAction() {
	            window.alert('HELLO!'); //eslint-disable-line
	        }
	    }]);
	
	    return CardDemoComponent;
	}()) || _class);
	Reflect.defineMetadata('design:paramtypes', [_novoElements.NovoToastService], CardDemoComponent);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvY2FyZC9DYXJkRGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7a0JBQUE7O0FBRUE7O0FBTUE7OztBQVBBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBRUE7QUFDQSxJQUFNLHE1REFBTjs7SUE4RGEsaUIsV0FBQSxpQixXQUpaLHFCQUFVO0FBQ1AsY0FBVSxXQURIO0FBRVAsY0FBVTtBQUZILENBQVYsQztBQUtHLCtCQUFZLE9BQVosRUFBc0M7QUFBQTs7QUFDbEMsYUFBSyxPQUFMLEdBQWUsT0FBZjs7QUFFQTtBQUNBLGFBQUssb0JBQUw7QUFDQSxhQUFLLHFCQUFMO0FBQ0EsYUFBSyxxQkFBTDtBQUNBLGFBQUsscUJBQUw7QUFDQSxhQUFLLHVCQUFMOztBQUVBO0FBQ0EsYUFBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLGFBQUssS0FBTCxHQUFhLElBQWI7QUFDQSxhQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsYUFBSyxPQUFMLEdBQWUsSUFBZjs7QUFFQSxhQUFLLFVBQUwsR0FBa0I7QUFDZCxxQkFBUyxLQURLO0FBRWQsa0JBQU0sT0FGUTtBQUdkLHlCQUFhLE9BSEM7QUFJZCxtQkFBTyxLQUpPO0FBS2Qsa0JBQU0sSUFMUTtBQU1kLHFCQUFTLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsSUFBbEIsQ0FOSztBQU9kLHVCQUFXLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsSUFBcEIsQ0FQRztBQVFkLG1CQUFPLE1BUk87QUFTZCxxQkFBUyxLQVRLO0FBVWQscUJBQVM7QUFWSyxTQUFsQjs7QUFhQSxhQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0EsYUFBSyxHQUFMLEdBQVcsSUFBWDtBQUNBLGFBQUssT0FBTCxHQUFlLElBQWY7O0FBRUEsYUFBSyxTQUFMLEdBQWlCLHNCQUFqQjtBQUNBLGFBQUssUUFBTCxHQUFnQixNQUFoQjtBQUNBLGFBQUssT0FBTCxHQUFlLFFBQWY7O0FBRUEsYUFBSyxVQUFMLEdBQWtCLEdBQWxCO0FBQ0EsYUFBSyxVQUFMLEdBQWtCLFNBQWxCO0FBQ0EsYUFBSyxVQUFMLEdBQWtCLHNCQUFsQjtBQUNIOzs7O2tDQUVTO0FBQ04saUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUI7QUFDZix1QkFBTyxNQURRO0FBRWYsdUJBQU8sT0FGUTtBQUdmLHlCQUFTO0FBSE0sYUFBbkI7QUFLSDs7O29DQUVXO0FBQ1IsaUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUI7QUFDZix1QkFBTyxTQURRO0FBRWYsdUJBQU8sT0FGUTtBQUdmLHlCQUFTO0FBSE0sYUFBbkI7QUFLSDs7O3dDQUVlO0FBQ1osaUJBQUssT0FBTCxHQUFlLENBQUMsS0FBSyxPQUFyQjtBQUNIOzs7d0NBRWU7QUFDWixnQkFBSSxDQUFDLEtBQUssT0FBVixFQUFtQjtBQUNmLHFCQUFLLE9BQUwsR0FBZSxVQUFmO0FBQ0EscUJBQUssV0FBTCxHQUFtQixPQUFuQjtBQUNILGFBSEQsTUFHTztBQUNILHFCQUFLLE9BQUwsR0FBZSxTQUFmO0FBQ0g7QUFDSjs7OzhDQUVxQjtBQUNsQixpQkFBSyxVQUFMLENBQWdCLE9BQWhCLEdBQTBCLENBQUMsS0FBSyxVQUFMLENBQWdCLE9BQTNDO0FBQ0g7Ozs4Q0FFcUI7QUFDbEIsZ0JBQUksQ0FBQyxLQUFLLFVBQUwsQ0FBZ0IsT0FBckIsRUFBOEI7QUFDMUIscUJBQUssVUFBTCxDQUFnQixPQUFoQixHQUEwQixVQUExQjtBQUNILGFBRkQsTUFFTztBQUNILHFCQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsR0FBMEIsU0FBMUI7QUFDSDtBQUNKOzs7dUNBRWM7QUFDWCxtQkFBTyxLQUFQLENBQWEsUUFBYixFQURXLENBQ1k7QUFDMUI7Ozs7OzhFQXRGUSxpQiIsImZpbGUiOiJDYXJkRGVtby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdvZGkvbm92by1kZXYvbGlicy9ub3ZvLWVsZW1lbnRzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IEF0dHJpYnV0ZUNhcmREZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL0F0dHJpYnV0ZUNhcmREZW1vLmh0bWwnO1xuaW1wb3J0IEZ1bGxDb25maWdDYXJkRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9GdWxsQ29uZmlnQ2FyZERlbW8uaHRtbCc7XG5pbXBvcnQgRXh0cmFzVGltZWxpbmVEZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL0V4dHJhc1RpbWVsaW5lRGVtby5odG1sJztcbmltcG9ydCBFeHRyYXNCZXN0VGltZURlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvRXh0cmFzQmVzdFRpbWVEZW1vLmh0bWwnO1xuaW1wb3J0IEV4dHJhc0NoYXJ0RG9udXREZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL0V4dHJhc0NoYXJ0RGVtb0RlbW8uaHRtbCc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IE5vdm9Ub2FzdFNlcnZpY2UgfSBmcm9tICcuLy4uLy4uLy4uLy4uL3NyYy9ub3ZvLWVsZW1lbnRzJztcblxuLy8gVE9ETyAtIGFjdGlvbnMgYmFjayBpblxuY29uc3QgdGVtcGxhdGUgPSBgXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGgxPkNhcmRzIDxzbWFsbD48YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2J1bGxob3JuL25vdm8tZWxlbWVudHMvYmxvYi9tYXN0ZXIvc3JjL2VsZW1lbnRzL2NhcmRcIj4oc291cmNlKTwvYT48L3NtYWxsPjwvaDE+XG4gICAgPHA+Q29tcG9uZW50cyBhbmQgZWxlbWVudHMgZm9yIGNhcmRzIHRvIG1ha2Ugc3VyZSB0aGUgbG9hZGluZy9lbXB0eS9sYXlvdXQgdmlld3MgYXJlIGFsbCBjb25zaXN0ZW50LjwvcD5cblxuICAgIDxoNT5FeGFtcGxlczwvaDU+XG4gICAgPHA+QmFzaWMgQ2FyZCAodXNpbmcgYXR0cmlidXRlcyk8L3A+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGVcIj5cbiAgICAgICAgJHtBdHRyaWJ1dGVDYXJkRGVtb1RwbH1cbiAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIj5cbiAgICAgICAgICAgIDxidXR0b24gdGhlbWU9XCJzZWNvbmRhcnlcIiAoY2xpY2spPVwidG9nZ2xlTG9hZGluZygpXCI+VG9nZ2xlIExvYWRpbmc8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdGhlbWU9XCJzZWNvbmRhcnlcIiAoY2xpY2spPVwidG9nZ2xlTWVzc2FnZSgpXCI+VG9nZ2xlIE1lc3NhZ2U8L2J1dHRvbj5cblxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIkF0dHJpYnV0ZUNhcmREZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG5cbiAgICA8cD5DYXJkICh1c2luZyBjb25maWcgb2JqZWN0IGFuZCBjYXJkLWFjdGlvbnMpPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlXCI+XG4gICAgICAgICR7RnVsbENvbmZpZ0NhcmREZW1vVHBsfVxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0aGVtZT1cInNlY29uZGFyeVwiIChjbGljayk9XCJ0b2dnbGVMb2FkaW5nQ29uZmlnKClcIj5Ub2dnbGUgTG9hZGluZzwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0aGVtZT1cInNlY29uZGFyeVwiIChjbGljayk9XCJ0b2dnbGVNZXNzYWdlQ29uZmlnKClcIj5Ub2dnbGUgTWVzc2FnZTwvYnV0dG9uPlxuXG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiRnVsbENvbmZpZ0NhcmREZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG5cbiAgICA8aDU+Q2FyZCBFeHRyYXMgLSBjb21wb25lbnRzL2VsZW1lbnRzIGZvciBjYXJkczwvaDU+XG4gICAgPHA+VGltZWxpbmU8L3A+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGVcIj5cbiAgICAgICAgJHtFeHRyYXNUaW1lbGluZURlbW9UcGx9XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zXCI+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJFeHRyYXNUaW1lbGluZURlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cblxuICAgIDxwPkJlc3QgVGltZSB0byAqSU5TRVJUKjwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZVwiPlxuICAgICAgICAke0V4dHJhc0Jlc3RUaW1lRGVtb1RwbH1cbiAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIj5cblxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIkV4dHJhc0Jlc3RUaW1lRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuXG4gICAgPHA+RG9udXQgQ2hhcnQ8L3A+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGVcIj5cbiAgICAgICAgJHtFeHRyYXNDaGFydERvbnV0RGVtb1RwbH1cbiAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIj5cblxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIkV4dHJhc0NoYXJ0RG9udXREZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG48L2Rpdj5cbmA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2FyZC1kZW1vJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZERlbW9Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHRvYXN0ZXI6Tm92b1RvYXN0U2VydmljZSkge1xuICAgICAgICB0aGlzLnRvYXN0ZXIgPSB0b2FzdGVyO1xuXG4gICAgICAgIC8vIFRlbXBsYXRlc1xuICAgICAgICB0aGlzLkF0dHJpYnV0ZUNhcmREZW1vVHBsID0gQXR0cmlidXRlQ2FyZERlbW9UcGw7XG4gICAgICAgIHRoaXMuRnVsbENvbmZpZ0NhcmREZW1vVHBsID0gRnVsbENvbmZpZ0NhcmREZW1vVHBsO1xuICAgICAgICB0aGlzLkV4dHJhc1RpbWVsaW5lRGVtb1RwbCA9IEV4dHJhc1RpbWVsaW5lRGVtb1RwbDtcbiAgICAgICAgdGhpcy5FeHRyYXNCZXN0VGltZURlbW9UcGwgPSBFeHRyYXNCZXN0VGltZURlbW9UcGw7XG4gICAgICAgIHRoaXMuRXh0cmFzQ2hhcnREb251dERlbW9UcGwgPSBFeHRyYXNDaGFydERvbnV0RGVtb1RwbDtcblxuICAgICAgICAvLyBDb25maWcgZm9yIGRlbW9zXG4gICAgICAgIHRoaXMucmVmcmVzaCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xvc2UgPSB0cnVlO1xuICAgICAgICB0aGlzLm1vdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhZGRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZnVsbENvbmZpZyA9IHtcbiAgICAgICAgICAgIHJlZnJlc2g6IGZhbHNlLFxuICAgICAgICAgICAgaWNvbjogJ2VtYWlsJyxcbiAgICAgICAgICAgIG1lc3NhZ2VJY29uOiAnZW1haWwnLFxuICAgICAgICAgICAgY2xvc2U6IGZhbHNlLFxuICAgICAgICAgICAgbW92ZTogdHJ1ZSxcbiAgICAgICAgICAgIG9uQ2xvc2U6IHRoaXMub25DbG9zZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgb25SZWZyZXNoOiB0aGlzLm9uUmVmcmVzaC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdGl0bGU6ICdUZXN0JyxcbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgcGFkZGluZzogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc3RhcnQgPSAyMDAwO1xuICAgICAgICB0aGlzLmVuZCA9IDIwMDU7XG4gICAgICAgIHRoaXMuY3JlYXRlZCA9IDE5OTU7XG5cbiAgICAgICAgdGhpcy5iZXN0TGFiZWwgPSAnQkVTVCBUSU1FIFRPIENPTlRBQ1QnO1xuICAgICAgICB0aGlzLmJlc3RUaW1lID0gJzEtUE0nO1xuICAgICAgICB0aGlzLmJlc3REYXkgPSAnRnJpZGF5JztcblxuICAgICAgICB0aGlzLmRvbnV0VmFsdWUgPSAwLjU7XG4gICAgICAgIHRoaXMuZG9udXRDb2xvciA9ICcjNjYyMjU1JztcbiAgICAgICAgdGhpcy5kb251dExhYmVsID0gJ1Byb2JhYmlsaXR5IG9mIFdpbiAlJztcbiAgICB9XG5cbiAgICBvbkNsb3NlKCkge1xuICAgICAgICB0aGlzLnRvYXN0ZXIuYWxlcnQoe1xuICAgICAgICAgICAgdGhlbWU6ICdpbmZvJyxcbiAgICAgICAgICAgIHRpdGxlOiAnQ2FyZHMnLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0Nsb3NlIENsaWNrZWQhJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMudG9hc3Rlci5hbGVydCh7XG4gICAgICAgICAgICB0aGVtZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgdGl0bGU6ICdDYXJkcycsXG4gICAgICAgICAgICBtZXNzYWdlOiAnUmVmcmVzaCBDbGlja2VkISdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlTG9hZGluZygpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gIXRoaXMubG9hZGluZztcbiAgICB9XG5cbiAgICB0b2dnbGVNZXNzYWdlKCkge1xuICAgICAgICBpZiAoIXRoaXMubWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gJ05PIERBVEEhJztcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUljb24gPSAnZW1haWwnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlTG9hZGluZ0NvbmZpZygpIHtcbiAgICAgICAgdGhpcy5mdWxsQ29uZmlnLmxvYWRpbmcgPSAhdGhpcy5mdWxsQ29uZmlnLmxvYWRpbmc7XG4gICAgfVxuXG4gICAgdG9nZ2xlTWVzc2FnZUNvbmZpZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmZ1bGxDb25maWcubWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5mdWxsQ29uZmlnLm1lc3NhZ2UgPSAnTk8gREFUQSEnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mdWxsQ29uZmlnLm1lc3NhZ2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaW5nbGVBY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5hbGVydCgnSEVMTE8hJyk7Ly9lc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfVxufVxuIl19

/***/ },
/* 368 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CategoryDropdownDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// Vendor
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _novoElements = __webpack_require__(18);
	
	var _BasicDemo = __webpack_require__(474);
	
	var _BasicDemo2 = _interopRequireDefault(_BasicDemo);
	
	var _PersistSelectionDemo = __webpack_require__(480);
	
	var _PersistSelectionDemo2 = _interopRequireDefault(_PersistSelectionDemo);
	
	var _CloseOnSelectDemo = __webpack_require__(476);
	
	var _CloseOnSelectDemo2 = _interopRequireDefault(_CloseOnSelectDemo);
	
	var _HoverItemLabelsDemo = __webpack_require__(479);
	
	var _HoverItemLabelsDemo2 = _interopRequireDefault(_HoverItemLabelsDemo);
	
	var _BasicSearchDemo = __webpack_require__(475);
	
	var _BasicSearchDemo2 = _interopRequireDefault(_BasicSearchDemo);
	
	var _CustomSearchDemo = __webpack_require__(477);
	
	var _CustomSearchDemo2 = _interopRequireDefault(_CustomSearchDemo);
	
	var _FooterDemo = __webpack_require__(478);
	
	var _FooterDemo2 = _interopRequireDefault(_FooterDemo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Category Dropdown <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/category-dropdown">(source)</a></small></h1>\n    <p>A category dropdown that allows the items to be grouped and searchable.</p>\n\n    <h5>Basic</h5>\n    <p>This is a simple implementation.</p>\n    <div class="example dropdown-demo">' + _BasicDemo2.default + '</div>\n    <multi-code-snippet [code]="basicCodeSnippet"></multi-code-snippet>\n    \n    <br/>\n    <h5>Hover Text/Icons on Items</h5>\n    <p>You can set a hover text or icons for each item to appear as the user hovers over an item.</p>\n    <div class="example dropdown-demo">' + _HoverItemLabelsDemo2.default + '</div>\n    <multi-code-snippet [code]="hoverCodeSnippet"></multi-code-snippet>\n    \n    <br/>\n    <h5>Persisting Selection</h5>\n    <p>If you need to show what item is selected, you can persist the selection via a property.</p>\n    <div class="example dropdown-demo">' + _PersistSelectionDemo2.default + '</div>\n    <multi-code-snippet [code]="persistCodeSnippet"></multi-code-snippet>\n    \n    <br/>\n    <h5>Close on Select</h5>\n    <p>By default, the dropdown will stay open upon selecting an item. You can set a property to force close on selection.</p>\n    <div class="example dropdown-demo">' + _CloseOnSelectDemo2.default + '</div>\n    <multi-code-snippet [code]="closeCodeSnippet"></multi-code-snippet>\n    \n    <br/>\n    <h5>Searchable (basic)</h5>\n    <p>The dropdown can be configured to provide a way to search all the different categories.</p>\n    <div class="example dropdown-demo">' + _BasicSearchDemo2.default + '</div>\n    <multi-code-snippet [code]="basicSearchCodeSnippet"></multi-code-snippet>\n    \n    <br/>\n    <h5>Searchable (custom)</h5>\n    <p>Every aspect of the search can be customized, refer to the README or JS for more information.</p>\n    <div class="example dropdown-demo">' + _CustomSearchDemo2.default + '</div>\n    <multi-code-snippet [code]="customSearchCodeSnippet"></multi-code-snippet>\n    \n    <br/>\n    <h5>Footer</h5>\n    <p>The dropdown has a customizable footer for additional configuration over the categories and items.</p>\n    <div class="example dropdown-demo">' + _FooterDemo2.default + '</div>\n    <multi-code-snippet [code]="footerCodeSnippet"></multi-code-snippet>\n</div>\n';
	
	var CategoryDropdownDemoComponent = exports.CategoryDropdownDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'category-dropdown-demo',
	    template: template
	}), _dec(_class = function () {
	    function CategoryDropdownDemoComponent(toaster) {
	        _classCallCheck(this, CategoryDropdownDemoComponent);
	
	        this.toaster = toaster;
	        this.BasicDemoTpl = _BasicDemo2.default;
	        this.PersistSelectionDemoTpl = _PersistSelectionDemo2.default;
	        this.CloseOnSelectDemoTpl = _CloseOnSelectDemo2.default;
	        this.HoverItemLabelsDemoTpl = _HoverItemLabelsDemo2.default;
	        this.BasicSearchDemoTpl = _BasicSearchDemo2.default;
	        this.CustomSearchDemoTpl = _CustomSearchDemo2.default;
	        this.FooterDemoTpl = _FooterDemo2.default;
	
	        this.basicCategories = {
	            'Category 1': [{ label: 'One', value: 1 }, { label: 'Two', value: 2 }, { label: 'Three', value: 3 }],
	            'Category 2': [{ label: 'Four', value: 4 }, { label: 'Five', value: 5 }, { label: 'Six', value: 6 }],
	            'Category 3': [{ label: 'Seven', value: 7 }, { label: 'Eight', value: 8 }, { label: 'Nine', value: 9 }],
	            'Category 4': [{ label: 'Ten', value: 10 }, { label: 'Eleven', value: 11 }, { label: 'Twelve', value: 12 }, { label: 'Twelve', value: 12 }, { label: 'Twelve', value: 12 }, { label: 'Twelve', value: 12 }, { label: 'Twelve', value: 12 }, { label: 'Twelve', value: 12 }, { label: 'Twelve', value: 12 }, { label: 'Twelve', value: 12 }, { label: 'Twelve', value: 12 }, { label: 'Twelve', value: 12 }, { label: 'Twelve', value: 12 }, { label: 'Twelve', value: 12 }, { label: 'Twelve', value: 12 }]
	        };
	        this.basicCodeSnippet = {
	            'Template': _BasicDemo2.default
	        };
	
	        this.persistCategories = {
	            'One': [{ label: 'Test', value: 1 }, { label: 'Test', value: 1 }, { label: 'Test', value: 1 }, { label: 'Test', value: 1 }],
	            'Two': [{ label: 'Hello', value: 2 }, { label: 'Hello', value: 2 }, { label: 'Hello', value: 2 }, { label: 'Hello', value: 2 }]
	        };
	        this.persistCodeSnippet = {
	            'Template': _PersistSelectionDemo2.default,
	            'Other Inputs': JSON.stringify({ persistSelection: true })
	        };
	
	        this.closeCodeSnippet = {
	            'Template': _CloseOnSelectDemo2.default,
	            'Other Inputs': JSON.stringify({ closeOnSelect: true })
	        };
	
	        this.hoverCategories = {
	            'One': [{ label: 'Test', value: 1, hoverText: 'Hello!' }, { label: 'Test', value: 1, hoverIcon: 'star' }, { label: 'Test', value: 1, hoverIcon: 'check' }, { label: 'Test', value: 1, hoverText: 'BOOM' }],
	            'Two': [{ label: 'Hello', value: 1, hoverText: 'Hello!' }, { label: 'Hello', value: 1, hoverIcon: 'star' }, { label: 'Hello', value: 1, hoverIcon: 'check' }, { label: 'Hello', value: 1, hoverText: 'BOOM' }]
	        };
	        this.hoverCodeSnippet = {
	            'Template': _HoverItemLabelsDemo2.default,
	            'Sample Item': JSON.stringify(this.hoverCategories.One[0])
	        };
	
	        this.searchCategories = {
	            'Greetings': [{ label: 'Hello', value: 1 }, { label: 'Sup?', value: 1 }, { label: 'Hey!', value: 1 }, { label: 'Heeeyo', value: 1 }],
	            'Salutations': [{ label: 'Goodbye', value: 1 }, { label: 'My Good Sir', value: 1 }, { label: 'See Ya Later!', value: 1 }, { label: 'Smell Ya Later!', value: 1 }]
	        };
	        this.searchConfig = {
	            placeholder: 'I wait 1s to search...',
	            debounce: 1000,
	            emptyMessage: 'NO ITEMS IN HERE!',
	            compare: function compare(query, item) {
	                return ~item.label.toLowerCase().indexOf(query.toLowerCase());
	            }
	        };
	        this.basicSearchCodeSnippet = {
	            'Template': _BasicSearchDemo2.default,
	            'Other Inputs': JSON.stringify({ search: true })
	        };
	        this.customSearchCodeSnippet = {
	            'Template': _BasicSearchDemo2.default,
	            'Other Inputs': JSON.stringify({ search: this.searchConfig })
	        };
	
	        this.footerConfig = {
	            align: 'left',
	            links: [{ label: 'Link 1', callback: this.footerClick.bind(this) }, { label: 'Link 2', callback: this.footerClick.bind(this) }]
	        };
	        this.footerCodeSnippet = {
	            'Template': _FooterDemo2.default,
	            'Other Inputs': JSON.stringify(this.footerConfig)
	        };
	    }
	
	    _createClass(CategoryDropdownDemoComponent, [{
	        key: 'footerClick',
	        value: function footerClick() {
	            this.toaster.alert({
	                title: 'Footer link clicked!',
	                icon: 'star',
	                theme: 'ocean',
	                position: 'growlTopRight',
	                hideDelay: 2000
	            });
	        }
	    }, {
	        key: 'onSelect',
	        value: function onSelect(item) {
	            this.toaster.alert({
	                title: 'Selected ' + item.label + '!',
	                icon: 'star',
	                theme: 'ocean',
	                position: 'growlTopRight',
	                hideDelay: 2000
	            });
	        }
	    }]);
	
	    return CategoryDropdownDemoComponent;
	}()) || _class);
	Reflect.defineMetadata('design:paramtypes', [_novoElements.NovoToastService], CategoryDropdownDemoComponent);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvY2F0ZWdvcnktZHJvcGRvd24vQ2F0ZWdvcnlEcm9wZG93bkRlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O2tCQUFBOztBQUVBOztBQUVBOzs7QUFIQTs7QUFFQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNLGsyRUFBTjs7SUFvRGEsNkIsV0FBQSw2QixXQUpaLHFCQUFVO0FBQ1AsY0FBVSx3QkFESDtBQUVQLGNBQVU7QUFGSCxDQUFWLEM7QUFLRywyQ0FBWSxPQUFaLEVBQXNDO0FBQUE7O0FBQ2xDLGFBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxhQUFLLFlBQUw7QUFDQSxhQUFLLHVCQUFMO0FBQ0EsYUFBSyxvQkFBTDtBQUNBLGFBQUssc0JBQUw7QUFDQSxhQUFLLGtCQUFMO0FBQ0EsYUFBSyxtQkFBTDtBQUNBLGFBQUssYUFBTDs7QUFFQSxhQUFLLGVBQUwsR0FBdUI7QUFDbkIsMEJBQWMsQ0FDVixFQUFFLE9BQU8sS0FBVCxFQUFnQixPQUFPLENBQXZCLEVBRFUsRUFFVixFQUFFLE9BQU8sS0FBVCxFQUFnQixPQUFPLENBQXZCLEVBRlUsRUFHVixFQUFFLE9BQU8sT0FBVCxFQUFrQixPQUFPLENBQXpCLEVBSFUsQ0FESztBQU1uQiwwQkFBYyxDQUNWLEVBQUUsT0FBTyxNQUFULEVBQWlCLE9BQU8sQ0FBeEIsRUFEVSxFQUVWLEVBQUUsT0FBTyxNQUFULEVBQWlCLE9BQU8sQ0FBeEIsRUFGVSxFQUdWLEVBQUUsT0FBTyxLQUFULEVBQWdCLE9BQU8sQ0FBdkIsRUFIVSxDQU5LO0FBV25CLDBCQUFjLENBQ1YsRUFBRSxPQUFPLE9BQVQsRUFBa0IsT0FBTyxDQUF6QixFQURVLEVBRVYsRUFBRSxPQUFPLE9BQVQsRUFBa0IsT0FBTyxDQUF6QixFQUZVLEVBR1YsRUFBRSxPQUFPLE1BQVQsRUFBaUIsT0FBTyxDQUF4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QUwsQ0FBZSxFQUFFLFFBQVEsS0FBSyxZQUFmLEVBQWY7QUFGVyxTQUEvQjs7QUFLQSxhQUFLLFlBQUwsR0FBb0I7QUFDaEIsbUJBQU8sTUFEUztBQUVoQixtQkFBTyxDQUNILEVBQUUsT0FBTyxRQUFULEVBQW1CLFVBQVUsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLElBQXRCLENBQTdCLEVBREcsRUFFSCxFQUFFLE9BQU8sUUFBVCxFQUFtQixVQUFVLEtBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixJQUF0QixDQUE3QixFQUZHO0FBRlMsU0FBcEI7QUFPQSxhQUFLLGlCQUFMLEdBQXlCO0FBQ3JCLDRDQURxQjtBQUVyQiw0QkFBZ0IsS0FBSyxTQUFMLENBQWUsS0FBSyxZQUFwQjtBQUZLLFNBQXpCO0FBSUg7Ozs7c0NBRWE7QUFDVixpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQjtBQUNmLHVCQUFPLHNCQURRO0FBRWYsc0JBQU0sTUFGUztBQUdmLHVCQUFPLE9BSFE7QUFJZiwwQkFBVSxlQUpLO0FBS2YsMkJBQVc7QUFMSSxhQUFuQjtBQU9IOzs7aUNBRVEsSSxFQUFNO0FBQ1gsaUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUI7QUFDZixxQ0FBbUIsS0FBSyxLQUF4QixNQURlO0FBRWYsc0JBQU0sTUFGUztBQUdmLHVCQUFPLE9BSFE7QUFJZiwwQkFBVSxlQUpLO0FBS2YsMkJBQVc7QUFMSSxhQUFuQjtBQU9IOzs7Ozs4RUExSlEsNkIiLCJmaWxlIjoiQ2F0ZWdvcnlEcm9wZG93bkRlbW8uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pnb2RpL25vdm8tZGV2L2xpYnMvbm92by1lbGVtZW50cyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IE5vdm9Ub2FzdFNlcnZpY2UgfSBmcm9tICcuLy4uLy4uLy4uLy4uL3NyYy9ub3ZvLWVsZW1lbnRzJztcbi8vIEFQUFxuaW1wb3J0IEJhc2ljRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9CYXNpY0RlbW8uaHRtbCc7XG5pbXBvcnQgUGVyc2lzdFNlbGVjdGlvbkRlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvUGVyc2lzdFNlbGVjdGlvbkRlbW8uaHRtbCc7XG5pbXBvcnQgQ2xvc2VPblNlbGVjdERlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvQ2xvc2VPblNlbGVjdERlbW8uaHRtbCc7XG5pbXBvcnQgSG92ZXJJdGVtTGFiZWxzRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9Ib3Zlckl0ZW1MYWJlbHNEZW1vLmh0bWwnO1xuaW1wb3J0IEJhc2ljU2VhcmNoRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9CYXNpY1NlYXJjaERlbW8uaHRtbCc7XG5pbXBvcnQgQ3VzdG9tU2VhcmNoRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9DdXN0b21TZWFyY2hEZW1vLmh0bWwnO1xuaW1wb3J0IEZvb3RlckRlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvRm9vdGVyRGVtby5odG1sJztcblxuY29uc3QgdGVtcGxhdGUgPSBgXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGgxPkNhdGVnb3J5IERyb3Bkb3duIDxzbWFsbD48YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2J1bGxob3JuL25vdm8tZWxlbWVudHMvYmxvYi9tYXN0ZXIvc3JjL2VsZW1lbnRzL2NhdGVnb3J5LWRyb3Bkb3duXCI+KHNvdXJjZSk8L2E+PC9zbWFsbD48L2gxPlxuICAgIDxwPkEgY2F0ZWdvcnkgZHJvcGRvd24gdGhhdCBhbGxvd3MgdGhlIGl0ZW1zIHRvIGJlIGdyb3VwZWQgYW5kIHNlYXJjaGFibGUuPC9wPlxuXG4gICAgPGg1PkJhc2ljPC9oNT5cbiAgICA8cD5UaGlzIGlzIGEgc2ltcGxlIGltcGxlbWVudGF0aW9uLjwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBkcm9wZG93bi1kZW1vXCI+JHtCYXNpY0RlbW9UcGx9PC9kaXY+XG4gICAgPG11bHRpLWNvZGUtc25pcHBldCBbY29kZV09XCJiYXNpY0NvZGVTbmlwcGV0XCI+PC9tdWx0aS1jb2RlLXNuaXBwZXQ+XG4gICAgXG4gICAgPGJyLz5cbiAgICA8aDU+SG92ZXIgVGV4dC9JY29ucyBvbiBJdGVtczwvaDU+XG4gICAgPHA+WW91IGNhbiBzZXQgYSBob3ZlciB0ZXh0IG9yIGljb25zIGZvciBlYWNoIGl0ZW0gdG8gYXBwZWFyIGFzIHRoZSB1c2VyIGhvdmVycyBvdmVyIGFuIGl0ZW0uPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIGRyb3Bkb3duLWRlbW9cIj4ke0hvdmVySXRlbUxhYmVsc0RlbW9UcGx9PC9kaXY+XG4gICAgPG11bHRpLWNvZGUtc25pcHBldCBbY29kZV09XCJob3ZlckNvZGVTbmlwcGV0XCI+PC9tdWx0aS1jb2RlLXNuaXBwZXQ+XG4gICAgXG4gICAgPGJyLz5cbiAgICA8aDU+UGVyc2lzdGluZyBTZWxlY3Rpb248L2g1PlxuICAgIDxwPklmIHlvdSBuZWVkIHRvIHNob3cgd2hhdCBpdGVtIGlzIHNlbGVjdGVkLCB5b3UgY2FuIHBlcnNpc3QgdGhlIHNlbGVjdGlvbiB2aWEgYSBwcm9wZXJ0eS48L3A+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgZHJvcGRvd24tZGVtb1wiPiR7UGVyc2lzdFNlbGVjdGlvbkRlbW9UcGx9PC9kaXY+XG4gICAgPG11bHRpLWNvZGUtc25pcHBldCBbY29kZV09XCJwZXJzaXN0Q29kZVNuaXBwZXRcIj48L211bHRpLWNvZGUtc25pcHBldD5cbiAgICBcbiAgICA8YnIvPlxuICAgIDxoNT5DbG9zZSBvbiBTZWxlY3Q8L2g1PlxuICAgIDxwPkJ5IGRlZmF1bHQsIHRoZSBkcm9wZG93biB3aWxsIHN0YXkgb3BlbiB1cG9uIHNlbGVjdGluZyBhbiBpdGVtLiBZb3UgY2FuIHNldCBhIHByb3BlcnR5IHRvIGZvcmNlIGNsb3NlIG9uIHNlbGVjdGlvbi48L3A+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgZHJvcGRvd24tZGVtb1wiPiR7Q2xvc2VPblNlbGVjdERlbW9UcGx9PC9kaXY+XG4gICAgPG11bHRpLWNvZGUtc25pcHBldCBbY29kZV09XCJjbG9zZUNvZGVTbmlwcGV0XCI+PC9tdWx0aS1jb2RlLXNuaXBwZXQ+XG4gICAgXG4gICAgPGJyLz5cbiAgICA8aDU+U2VhcmNoYWJsZSAoYmFzaWMpPC9oNT5cbiAgICA8cD5UaGUgZHJvcGRvd24gY2FuIGJlIGNvbmZpZ3VyZWQgdG8gcHJvdmlkZSBhIHdheSB0byBzZWFyY2ggYWxsIHRoZSBkaWZmZXJlbnQgY2F0ZWdvcmllcy48L3A+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgZHJvcGRvd24tZGVtb1wiPiR7QmFzaWNTZWFyY2hEZW1vVHBsfTwvZGl2PlxuICAgIDxtdWx0aS1jb2RlLXNuaXBwZXQgW2NvZGVdPVwiYmFzaWNTZWFyY2hDb2RlU25pcHBldFwiPjwvbXVsdGktY29kZS1zbmlwcGV0PlxuICAgIFxuICAgIDxici8+XG4gICAgPGg1PlNlYXJjaGFibGUgKGN1c3RvbSk8L2g1PlxuICAgIDxwPkV2ZXJ5IGFzcGVjdCBvZiB0aGUgc2VhcmNoIGNhbiBiZSBjdXN0b21pemVkLCByZWZlciB0byB0aGUgUkVBRE1FIG9yIEpTIGZvciBtb3JlIGluZm9ybWF0aW9uLjwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBkcm9wZG93bi1kZW1vXCI+JHtDdXN0b21TZWFyY2hEZW1vVHBsfTwvZGl2PlxuICAgIDxtdWx0aS1jb2RlLXNuaXBwZXQgW2NvZGVdPVwiY3VzdG9tU2VhcmNoQ29kZVNuaXBwZXRcIj48L211bHRpLWNvZGUtc25pcHBldD5cbiAgICBcbiAgICA8YnIvPlxuICAgIDxoNT5Gb290ZXI8L2g1PlxuICAgIDxwPlRoZSBkcm9wZG93biBoYXMgYSBjdXN0b21pemFibGUgZm9vdGVyIGZvciBhZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gb3ZlciB0aGUgY2F0ZWdvcmllcyBhbmQgaXRlbXMuPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIGRyb3Bkb3duLWRlbW9cIj4ke0Zvb3RlckRlbW9UcGx9PC9kaXY+XG4gICAgPG11bHRpLWNvZGUtc25pcHBldCBbY29kZV09XCJmb290ZXJDb2RlU25pcHBldFwiPjwvbXVsdGktY29kZS1zbmlwcGV0PlxuPC9kaXY+XG5gO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NhdGVnb3J5LWRyb3Bkb3duLWRlbW8nLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeURyb3Bkb3duRGVtb0NvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IodG9hc3RlcjpOb3ZvVG9hc3RTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMudG9hc3RlciA9IHRvYXN0ZXI7XG4gICAgICAgIHRoaXMuQmFzaWNEZW1vVHBsID0gQmFzaWNEZW1vVHBsO1xuICAgICAgICB0aGlzLlBlcnNpc3RTZWxlY3Rpb25EZW1vVHBsID0gUGVyc2lzdFNlbGVjdGlvbkRlbW9UcGw7XG4gICAgICAgIHRoaXMuQ2xvc2VPblNlbGVjdERlbW9UcGwgPSBDbG9zZU9uU2VsZWN0RGVtb1RwbDtcbiAgICAgICAgdGhpcy5Ib3Zlckl0ZW1MYWJlbHNEZW1vVHBsID0gSG92ZXJJdGVtTGFiZWxzRGVtb1RwbDtcbiAgICAgICAgdGhpcy5CYXNpY1NlYXJjaERlbW9UcGwgPSBCYXNpY1NlYXJjaERlbW9UcGw7XG4gICAgICAgIHRoaXMuQ3VzdG9tU2VhcmNoRGVtb1RwbCA9IEN1c3RvbVNlYXJjaERlbW9UcGw7XG4gICAgICAgIHRoaXMuRm9vdGVyRGVtb1RwbCA9IEZvb3RlckRlbW9UcGw7XG5cbiAgICAgICAgdGhpcy5iYXNpY0NhdGVnb3JpZXMgPSB7XG4gICAgICAgICAgICAnQ2F0ZWdvcnkgMSc6IFtcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnT25lJywgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnVHdvJywgdmFsdWU6IDIgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnVGhyZWUnLCB2YWx1ZTogMyB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgJ0NhdGVnb3J5IDInOiBbXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ0ZvdXInLCB2YWx1ZTogNCB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdGaXZlJywgdmFsdWU6IDUgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnU2l4JywgdmFsdWU6IDYgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICdDYXRlZ29yeSAzJzogW1xuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdTZXZlbicsIHZhbHVlOiA3IH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ0VpZ2h0JywgdmFsdWU6IDggfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnTmluZScsIHZhbHVlOiA5IH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAnQ2F0ZWdvcnkgNCc6IFtcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnVGVuJywgdmFsdWU6IDEwIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ0VsZXZlbicsIHZhbHVlOiAxMSB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdUd2VsdmUnLCB2YWx1ZTogMTIgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnVHdlbHZlJywgdmFsdWU6IDEyIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ1R3ZWx2ZScsIHZhbHVlOiAxMiB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdUd2VsdmUnLCB2YWx1ZTogMTIgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnVHdlbHZlJywgdmFsdWU6IDEyIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ1R3ZWx2ZScsIHZhbHVlOiAxMiB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdUd2VsdmUnLCB2YWx1ZTogMTIgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnVHdlbHZlJywgdmFsdWU6IDEyIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ1R3ZWx2ZScsIHZhbHVlOiAxMiB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdUd2VsdmUnLCB2YWx1ZTogMTIgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnVHdlbHZlJywgdmFsdWU6IDEyIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ1R3ZWx2ZScsIHZhbHVlOiAxMiB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdUd2VsdmUnLCB2YWx1ZTogMTIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmJhc2ljQ29kZVNuaXBwZXQgPSB7XG4gICAgICAgICAgICAnVGVtcGxhdGUnOiBCYXNpY0RlbW9UcGxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnBlcnNpc3RDYXRlZ29yaWVzID0ge1xuICAgICAgICAgICAgJ09uZSc6IFtcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnVGVzdCcsIHZhbHVlOiAxIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ1Rlc3QnLCB2YWx1ZTogMSB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdUZXN0JywgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnVGVzdCcsIHZhbHVlOiAxIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAnVHdvJzogW1xuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdIZWxsbycsIHZhbHVlOiAyIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ0hlbGxvJywgdmFsdWU6IDIgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnSGVsbG8nLCB2YWx1ZTogMiB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdIZWxsbycsIHZhbHVlOiAyIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wZXJzaXN0Q29kZVNuaXBwZXQgPSB7XG4gICAgICAgICAgICAnVGVtcGxhdGUnOiBQZXJzaXN0U2VsZWN0aW9uRGVtb1RwbCxcbiAgICAgICAgICAgICdPdGhlciBJbnB1dHMnOiBKU09OLnN0cmluZ2lmeSh7IHBlcnNpc3RTZWxlY3Rpb246IHRydWUgfSlcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmNsb3NlQ29kZVNuaXBwZXQgPSB7XG4gICAgICAgICAgICAnVGVtcGxhdGUnOiBDbG9zZU9uU2VsZWN0RGVtb1RwbCxcbiAgICAgICAgICAgICdPdGhlciBJbnB1dHMnOiBKU09OLnN0cmluZ2lmeSh7IGNsb3NlT25TZWxlY3Q6IHRydWUgfSlcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmhvdmVyQ2F0ZWdvcmllcyA9IHtcbiAgICAgICAgICAgICdPbmUnOiBbXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ1Rlc3QnLCB2YWx1ZTogMSwgaG92ZXJUZXh0OiAnSGVsbG8hJyB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdUZXN0JywgdmFsdWU6IDEsIGhvdmVySWNvbjogJ3N0YXInIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ1Rlc3QnLCB2YWx1ZTogMSwgaG92ZXJJY29uOiAnY2hlY2snIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ1Rlc3QnLCB2YWx1ZTogMSwgaG92ZXJUZXh0OiAnQk9PTScgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICdUd28nOiBbXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ0hlbGxvJywgdmFsdWU6IDEsIGhvdmVyVGV4dDogJ0hlbGxvIScgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnSGVsbG8nLCB2YWx1ZTogMSwgaG92ZXJJY29uOiAnc3RhcicgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnSGVsbG8nLCB2YWx1ZTogMSwgaG92ZXJJY29uOiAnY2hlY2snIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ0hlbGxvJywgdmFsdWU6IDEsIGhvdmVyVGV4dDogJ0JPT00nIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ob3ZlckNvZGVTbmlwcGV0ID0ge1xuICAgICAgICAgICAgJ1RlbXBsYXRlJzogSG92ZXJJdGVtTGFiZWxzRGVtb1RwbCxcbiAgICAgICAgICAgICdTYW1wbGUgSXRlbSc6IEpTT04uc3RyaW5naWZ5KHRoaXMuaG92ZXJDYXRlZ29yaWVzLk9uZVswXSlcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnNlYXJjaENhdGVnb3JpZXMgPSB7XG4gICAgICAgICAgICAnR3JlZXRpbmdzJzogW1xuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdIZWxsbycsIHZhbHVlOiAxIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ1N1cD8nLCB2YWx1ZTogMSB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdIZXkhJywgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnSGVlZXlvJywgdmFsdWU6IDEgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICdTYWx1dGF0aW9ucyc6IFtcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnR29vZGJ5ZScsIHZhbHVlOiAxIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ015IEdvb2QgU2lyJywgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnU2VlIFlhIExhdGVyIScsIHZhbHVlOiAxIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ1NtZWxsIFlhIExhdGVyIScsIHZhbHVlOiAxIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZWFyY2hDb25maWcgPSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0kgd2FpdCAxcyB0byBzZWFyY2guLi4nLFxuICAgICAgICAgICAgZGVib3VuY2U6IDEwMDAsXG4gICAgICAgICAgICBlbXB0eU1lc3NhZ2U6ICdOTyBJVEVNUyBJTiBIRVJFIScsXG4gICAgICAgICAgICBjb21wYXJlOiAocXVlcnksIGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gfml0ZW0ubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmJhc2ljU2VhcmNoQ29kZVNuaXBwZXQgPSB7XG4gICAgICAgICAgICAnVGVtcGxhdGUnOiBCYXNpY1NlYXJjaERlbW9UcGwsXG4gICAgICAgICAgICAnT3RoZXIgSW5wdXRzJzogSlNPTi5zdHJpbmdpZnkoeyBzZWFyY2g6IHRydWUgfSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jdXN0b21TZWFyY2hDb2RlU25pcHBldCA9IHtcbiAgICAgICAgICAgICdUZW1wbGF0ZSc6IEJhc2ljU2VhcmNoRGVtb1RwbCxcbiAgICAgICAgICAgICdPdGhlciBJbnB1dHMnOiBKU09OLnN0cmluZ2lmeSh7IHNlYXJjaDogdGhpcy5zZWFyY2hDb25maWcgfSlcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmZvb3RlckNvbmZpZyA9IHtcbiAgICAgICAgICAgIGFsaWduOiAnbGVmdCcsXG4gICAgICAgICAgICBsaW5rczogW1xuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdMaW5rIDEnLCBjYWxsYmFjazogdGhpcy5mb290ZXJDbGljay5iaW5kKHRoaXMpIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ0xpbmsgMicsIGNhbGxiYWNrOiB0aGlzLmZvb3RlckNsaWNrLmJpbmQodGhpcykgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZvb3RlckNvZGVTbmlwcGV0ID0ge1xuICAgICAgICAgICAgJ1RlbXBsYXRlJzogRm9vdGVyRGVtb1RwbCxcbiAgICAgICAgICAgICdPdGhlciBJbnB1dHMnOiBKU09OLnN0cmluZ2lmeSh0aGlzLmZvb3RlckNvbmZpZylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmb290ZXJDbGljaygpIHtcbiAgICAgICAgdGhpcy50b2FzdGVyLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiAnRm9vdGVyIGxpbmsgY2xpY2tlZCEnLFxuICAgICAgICAgICAgaWNvbjogJ3N0YXInLFxuICAgICAgICAgICAgdGhlbWU6ICdvY2VhbicsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2dyb3dsVG9wUmlnaHQnLFxuICAgICAgICAgICAgaGlkZURlbGF5OiAyMDAwXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uU2VsZWN0KGl0ZW0pIHtcbiAgICAgICAgdGhpcy50b2FzdGVyLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBgU2VsZWN0ZWQgJHtpdGVtLmxhYmVsfSFgLFxuICAgICAgICAgICAgaWNvbjogJ3N0YXInLFxuICAgICAgICAgICAgdGhlbWU6ICdvY2VhbicsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2dyb3dsVG9wUmlnaHQnLFxuICAgICAgICAgICAgaGlkZURlbGF5OiAyMDAwXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==

/***/ },
/* 369 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ChipsDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _BasicChipsDemo = __webpack_require__(482);
	
	var _BasicChipsDemo2 = _interopRequireDefault(_BasicChipsDemo);
	
	var _AsyncChipsDemo = __webpack_require__(481);
	
	var _AsyncChipsDemo2 = _interopRequireDefault(_AsyncChipsDemo);
	
	var _FormattedChipsDemo = __webpack_require__(483);
	
	var _FormattedChipsDemo2 = _interopRequireDefault(_FormattedChipsDemo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Chips <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/chips">(source)</a></small></h1>\n    <p>The chips element (<code>chips</code>) represents a control that presents a menu of options. The options\n    within are set by the <code>source</code> attribute. Options can be pre-selected for the user using the <code>ngModel</code>\n    attribute. Chips are the multi-select version of <code>pickers</code></p>\n\n    <br/>\n\n    <h5>Basic Examples</h5>\n    <p>\n        By clicking on the <code>chips</code> element, the options list will be displayed.  Select any of the options\n        by clicking on the item in the list.  The value selected will be added to the list of selected values and the options list will be removed.\n    </p>\n    <div class="example chips-demo">' + _BasicChipsDemo2.default + '</div>\n    <code-snippet [code]="BasicChipsDemoTpl"></code-snippet>\n\n    <h5>Async Examples</h5>\n    <p>\n        By clicking on the <code>chips</code> element, the options list will be displayed.  Select any of the options\n        by clicking on the item in the list.  The value selected will be added to the list of selected values and the options list will be removed.\n    </p>\n    <div class="example chips-demo">' + _AsyncChipsDemo2.default + '</div>\n    <code-snippet [code]="AsyncChipsDemoTpl"></code-snippet>\n\n    <h5>Formatted Examples</h5>\n    <p>\n        By clicking on the <code>chips</code> element, the options list will be displayed.  Select any of the options\n        by clicking on the item in the list.  The value selected will be added to the list of selected values and the options list will be removed.\n    </p>\n    <div class="example chips-demo">' + _FormattedChipsDemo2.default + '</div>\n    <code-snippet [code]="FormattedChipsDemoTpl"></code-snippet>\n\n</div>\n';
	
	var ChipsDemoComponent = exports.ChipsDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'chips-demo',
	    template: template
	}), _dec(_class = function () {
	    function ChipsDemoComponent() {
	        _classCallCheck(this, ChipsDemoComponent);
	
	        this.BasicChipsDemoTpl = _BasicChipsDemo2.default;
	        this.AsyncChipsDemoTpl = _AsyncChipsDemo2.default;
	        this.FormattedChipsDemoTpl = _FormattedChipsDemo2.default;
	
	        this.placeholder = 'Select...';
	        this.value = ['Alabama'];
	
	        var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
	        var abbrieviated = [{
	            value: 'USA',
	            label: 'United States'
	        }, {
	            value: 'GB',
	            label: 'Great Britain'
	        }, {
	            value: 'CA',
	            label: 'Canada'
	        }, {
	            value: 'AU',
	            label: 'Austrailia'
	        }];
	        var collaborators = [{
	            id: 1,
	            firstName: 'Brian',
	            lastName: 'Kimball'
	        }, {
	            id: 2,
	            firstName: 'Josh',
	            lastName: 'Godi'
	        }, {
	            id: 3,
	            firstName: 'Alec',
	            lastName: 'Sibilia'
	        }, {
	            id: 4,
	            firstName: 'Kameron',
	            lastName: 'Sween'
	        }];
	        this.static = { options: states };
	        this.formatted = {
	            format: '$firstName $lastName',
	            options: collaborators
	        };
	        this.async = {
	            options: function options() {
	                return new Promise(function (resolve) {
	                    setTimeout(function () {
	                        resolve(abbrieviated);
	                    }, 300);
	                });
	            },
	            getLabels: function getLabels(data) {
	                return new Promise(function (resolve) {
	                    setTimeout(function () {
	                        var values = data.map(function (item) {
	                            return item.value;
	                        });
	                        var results = abbrieviated.filter(function (item) {
	                            return values.includes(item.value);
	                        });
	                        resolve(results);
	                    }, 300);
	                });
	            }
	        };
	        this.avalue = [{
	            value: 'USA'
	        }, {
	            value: 'GB'
	        }];
	    }
	
	    _createClass(ChipsDemoComponent, [{
	        key: 'onChanged',
	        value: function onChanged() {}
	    }]);
	
	    return ChipsDemoComponent;
	}()) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvY2hpcHMvQ2hpcHNEZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztrQkFBQTs7QUFFQTs7O0FBREE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU0sdzNEQUFOOztJQXdDYSxrQixXQUFBLGtCLFdBSloscUJBQVU7QUFDUCxjQUFVLFlBREg7QUFFUCxjQUFVO0FBRkgsQ0FBVixDO0FBS0csa0NBQWM7QUFBQTs7QUFDVixhQUFLLGlCQUFMO0FBQ0EsYUFBSyxpQkFBTDtBQUNBLGFBQUsscUJBQUw7O0FBRUEsYUFBSyxXQUFMLEdBQW1CLFdBQW5CO0FBQ0EsYUFBSyxLQUFMLEdBQWEsQ0FBQyxTQUFELENBQWI7O0FBRUEsWUFBSSxTQUFTLENBQUMsU0FBRCxFQUFZLFFBQVosRUFBc0IsU0FBdEIsRUFBaUMsVUFBakMsRUFBNkMsWUFBN0MsRUFBMkQsVUFBM0QsRUFBdUUsYUFBdkUsRUFBc0YsVUFBdEYsRUFBa0csU0FBbEcsRUFBNkcsU0FBN0csRUFBd0gsUUFBeEgsRUFBa0ksT0FBbEksRUFBMkksVUFBM0ksRUFBdUosU0FBdkosRUFBa0ssTUFBbEssRUFBMEssUUFBMUssRUFBb0wsVUFBcEwsRUFBZ00sV0FBaE0sRUFBNk0sT0FBN00sRUFBc04sVUFBdE4sRUFBa08sZUFBbE8sRUFBbVAsVUFBblAsRUFBK1AsV0FBL1AsRUFBNFEsYUFBNVEsRUFBMlIsVUFBM1IsRUFBdVMsU0FBdlMsRUFBa1QsVUFBbFQsRUFBOFQsUUFBOVQsRUFBd1UsZUFBeFUsRUFBeVYsWUFBelYsRUFBdVcsWUFBdlcsRUFBcVgsVUFBclgsRUFBaVksY0FBalksRUFBaVosZ0JBQWpaLEVBQW1hLE1BQW5hLEVBQTJhLFVBQTNhLEVBQXViLFFBQXZiLEVBQWljLGNBQWpjLEVBQWlkLGNBQWpkLEVBQWllLGdCQUFqZSxFQUFtZixjQUFuZixFQUFtZ0IsV0FBbmdCLEVBQWdoQixPQUFoaEIsRUFBeWhCLE1BQXpoQixFQUFpaUIsU0FBamlCLEVBQTRpQixVQUE1aUIsRUFBd2pCLFlBQXhqQixFQUFza0IsZUFBdGtCLEVBQXVsQixXQUF2bEIsRUFBb21CLFNBQXBtQixDQUFiO0FBQ0EsWUFBSSxlQUFlLENBQUM7QUFDaEIsbUJBQU8sS0FEUztBQUVoQixtQkFBTztBQUZTLFNBQUQsRUFHaEI7QUFDQyxtQkFBTyxJQURSO0FBRUMsbUJBQU87QUFGUixTQUhnQixFQU1oQjtBQUNDLG1CQUFPLElBRFI7QUFFQyxtQkFBTztBQUZSLFNBTmdCLEVBU2hCO0FBQ0MsbUJBQU8sSUFEUjtBQUVDLG1CQUFPO0FBRlIsU0FUZ0IsQ0FBbkI7QUFhQSxZQUFJLGdCQUFnQixDQUFDO0FBQ2pCLGdCQUFJLENBRGE7QUFFakIsdUJBQVcsT0FGTTtBQUdqQixzQkFBVTtBQUhPLFNBQUQsRUFJakI7QUFDQyxnQkFBSSxDQURMO0FBRUMsdUJBQVcsTUFGWjtBQUdDLHNCQUFVO0FBSFgsU0FKaUIsRUFRakI7QUFDQyxnQkFBSSxDQURMO0FBRUMsdUJBQVcsTUFGWjtBQUdDLHNCQUFVO0FBSFgsU0FSaUIsRUFZakI7QUFDQyxnQkFBSSxDQURMO0FBRUMsdUJBQVcsU0FGWjtBQUdDLHNCQUFVO0FBSFgsU0FaaUIsQ0FBcEI7QUFpQkEsYUFBSyxNQUFMLEdBQWMsRUFBRSxTQUFTLE1BQVgsRUFBZDtBQUNBLGFBQUssU0FBTCxHQUFpQjtBQUNiLG9CQUFRLHNCQURLO0FBRWIscUJBQVM7QUFGSSxTQUFqQjtBQUlBLGFBQUssS0FBTCxHQUFhO0FBQ1QscUJBQVMsbUJBQU07QUFDWCx1QkFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBYTtBQUM1QiwrQkFBVyxZQUFNO0FBQ2IsZ0NBQVEsWUFBUjtBQUNILHFCQUZELEVBRUcsR0FGSDtBQUdILGlCQUpNLENBQVA7QUFLSCxhQVBRO0FBUVQsdUJBQVcsbUJBQUMsSUFBRCxFQUFVO0FBQ2pCLHVCQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFhO0FBQzVCLCtCQUFXLFlBQU07QUFDYiw0QkFBSSxTQUFTLEtBQUssR0FBTCxDQUFTO0FBQUEsbUNBQVEsS0FBSyxLQUFiO0FBQUEseUJBQVQsQ0FBYjtBQUNBLDRCQUFJLFVBQVUsYUFBYSxNQUFiLENBQW9CO0FBQUEsbUNBQVEsT0FBTyxRQUFQLENBQWdCLEtBQUssS0FBckIsQ0FBUjtBQUFBLHlCQUFwQixDQUFkO0FBQ0EsZ0NBQVEsT0FBUjtBQUNILHFCQUpELEVBSUcsR0FKSDtBQUtILGlCQU5NLENBQVA7QUFPSDtBQWhCUSxTQUFiO0FBa0JBLGFBQUssTUFBTCxHQUFjLENBQUM7QUFDWCxtQkFBTztBQURJLFNBQUQsRUFFWDtBQUNDLG1CQUFPO0FBRFIsU0FGVyxDQUFkO0FBS0g7Ozs7b0NBQ1csQ0FDWCIsImZpbGUiOiJDaGlwc0RlbW8uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pnb2RpL25vdm8tZGV2L2xpYnMvbm92by1lbGVtZW50cyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCBCYXNpY0NoaXBzRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9CYXNpY0NoaXBzRGVtby5odG1sJztcbmltcG9ydCBBc3luY0NoaXBzRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9Bc3luY0NoaXBzRGVtby5odG1sJztcbmltcG9ydCBGb3JtYXR0ZWRDaGlwc0RlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvRm9ybWF0dGVkQ2hpcHNEZW1vLmh0bWwnO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGBcbjxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICA8aDE+Q2hpcHMgPHNtYWxsPjxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYnVsbGhvcm4vbm92by1lbGVtZW50cy9ibG9iL21hc3Rlci9zcmMvZWxlbWVudHMvY2hpcHNcIj4oc291cmNlKTwvYT48L3NtYWxsPjwvaDE+XG4gICAgPHA+VGhlIGNoaXBzIGVsZW1lbnQgKDxjb2RlPmNoaXBzPC9jb2RlPikgcmVwcmVzZW50cyBhIGNvbnRyb2wgdGhhdCBwcmVzZW50cyBhIG1lbnUgb2Ygb3B0aW9ucy4gVGhlIG9wdGlvbnNcbiAgICB3aXRoaW4gYXJlIHNldCBieSB0aGUgPGNvZGU+c291cmNlPC9jb2RlPiBhdHRyaWJ1dGUuIE9wdGlvbnMgY2FuIGJlIHByZS1zZWxlY3RlZCBmb3IgdGhlIHVzZXIgdXNpbmcgdGhlIDxjb2RlPm5nTW9kZWw8L2NvZGU+XG4gICAgYXR0cmlidXRlLiBDaGlwcyBhcmUgdGhlIG11bHRpLXNlbGVjdCB2ZXJzaW9uIG9mIDxjb2RlPnBpY2tlcnM8L2NvZGU+PC9wPlxuXG4gICAgPGJyLz5cblxuICAgIDxoNT5CYXNpYyBFeGFtcGxlczwvaDU+XG4gICAgPHA+XG4gICAgICAgIEJ5IGNsaWNraW5nIG9uIHRoZSA8Y29kZT5jaGlwczwvY29kZT4gZWxlbWVudCwgdGhlIG9wdGlvbnMgbGlzdCB3aWxsIGJlIGRpc3BsYXllZC4gIFNlbGVjdCBhbnkgb2YgdGhlIG9wdGlvbnNcbiAgICAgICAgYnkgY2xpY2tpbmcgb24gdGhlIGl0ZW0gaW4gdGhlIGxpc3QuICBUaGUgdmFsdWUgc2VsZWN0ZWQgd2lsbCBiZSBhZGRlZCB0byB0aGUgbGlzdCBvZiBzZWxlY3RlZCB2YWx1ZXMgYW5kIHRoZSBvcHRpb25zIGxpc3Qgd2lsbCBiZSByZW1vdmVkLlxuICAgIDwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBjaGlwcy1kZW1vXCI+JHtCYXNpY0NoaXBzRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIkJhc2ljQ2hpcHNEZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG5cbiAgICA8aDU+QXN5bmMgRXhhbXBsZXM8L2g1PlxuICAgIDxwPlxuICAgICAgICBCeSBjbGlja2luZyBvbiB0aGUgPGNvZGU+Y2hpcHM8L2NvZGU+IGVsZW1lbnQsIHRoZSBvcHRpb25zIGxpc3Qgd2lsbCBiZSBkaXNwbGF5ZWQuICBTZWxlY3QgYW55IG9mIHRoZSBvcHRpb25zXG4gICAgICAgIGJ5IGNsaWNraW5nIG9uIHRoZSBpdGVtIGluIHRoZSBsaXN0LiAgVGhlIHZhbHVlIHNlbGVjdGVkIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGxpc3Qgb2Ygc2VsZWN0ZWQgdmFsdWVzIGFuZCB0aGUgb3B0aW9ucyBsaXN0IHdpbGwgYmUgcmVtb3ZlZC5cbiAgICA8L3A+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgY2hpcHMtZGVtb1wiPiR7QXN5bmNDaGlwc0RlbW9UcGx9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJBc3luY0NoaXBzRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuXG4gICAgPGg1PkZvcm1hdHRlZCBFeGFtcGxlczwvaDU+XG4gICAgPHA+XG4gICAgICAgIEJ5IGNsaWNraW5nIG9uIHRoZSA8Y29kZT5jaGlwczwvY29kZT4gZWxlbWVudCwgdGhlIG9wdGlvbnMgbGlzdCB3aWxsIGJlIGRpc3BsYXllZC4gIFNlbGVjdCBhbnkgb2YgdGhlIG9wdGlvbnNcbiAgICAgICAgYnkgY2xpY2tpbmcgb24gdGhlIGl0ZW0gaW4gdGhlIGxpc3QuICBUaGUgdmFsdWUgc2VsZWN0ZWQgd2lsbCBiZSBhZGRlZCB0byB0aGUgbGlzdCBvZiBzZWxlY3RlZCB2YWx1ZXMgYW5kIHRoZSBvcHRpb25zIGxpc3Qgd2lsbCBiZSByZW1vdmVkLlxuICAgIDwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBjaGlwcy1kZW1vXCI+JHtGb3JtYXR0ZWRDaGlwc0RlbW9UcGx9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJGb3JtYXR0ZWRDaGlwc0RlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cblxuPC9kaXY+XG5gO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NoaXBzLWRlbW8nLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBDaGlwc0RlbW9Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLkJhc2ljQ2hpcHNEZW1vVHBsID0gQmFzaWNDaGlwc0RlbW9UcGw7XG4gICAgICAgIHRoaXMuQXN5bmNDaGlwc0RlbW9UcGwgPSBBc3luY0NoaXBzRGVtb1RwbDtcbiAgICAgICAgdGhpcy5Gb3JtYXR0ZWRDaGlwc0RlbW9UcGwgPSBGb3JtYXR0ZWRDaGlwc0RlbW9UcGw7XG5cbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9ICdTZWxlY3QuLi4nO1xuICAgICAgICB0aGlzLnZhbHVlID0gWydBbGFiYW1hJ107XG5cbiAgICAgICAgbGV0IHN0YXRlcyA9IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdIYXdhaWknLCAnSWRhaG8nLCAnSWxsaW5vaXMnLCAnSW5kaWFuYScsICdJb3dhJywgJ0thbnNhcycsICdLZW50dWNreScsICdMb3Vpc2lhbmEnLCAnTWFpbmUnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggRGFrb3RhJywgJ05vcnRoIENhcm9saW5hJywgJ09oaW8nLCAnT2tsYWhvbWEnLCAnT3JlZ29uJywgJ1Blbm5zeWx2YW5pYScsICdSaG9kZSBJc2xhbmQnLCAnU291dGggQ2Fyb2xpbmEnLCAnU291dGggRGFrb3RhJywgJ1Rlbm5lc3NlZScsICdUZXhhcycsICdVdGFoJywgJ1Zlcm1vbnQnLCAnVmlyZ2luaWEnLCAnV2FzaGluZ3RvbicsICdXZXN0IFZpcmdpbmlhJywgJ1dpc2NvbnNpbicsICdXeW9taW5nJ107XG4gICAgICAgIGxldCBhYmJyaWV2aWF0ZWQgPSBbe1xuICAgICAgICAgICAgdmFsdWU6ICdVU0EnLFxuICAgICAgICAgICAgbGFiZWw6ICdVbml0ZWQgU3RhdGVzJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB2YWx1ZTogJ0dCJyxcbiAgICAgICAgICAgIGxhYmVsOiAnR3JlYXQgQnJpdGFpbidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdmFsdWU6ICdDQScsXG4gICAgICAgICAgICBsYWJlbDogJ0NhbmFkYSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdmFsdWU6ICdBVScsXG4gICAgICAgICAgICBsYWJlbDogJ0F1c3RyYWlsaWEnXG4gICAgICAgIH1dO1xuICAgICAgICBsZXQgY29sbGFib3JhdG9ycyA9IFt7XG4gICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgIGZpcnN0TmFtZTogJ0JyaWFuJyxcbiAgICAgICAgICAgIGxhc3ROYW1lOiAnS2ltYmFsbCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IDIsXG4gICAgICAgICAgICBmaXJzdE5hbWU6ICdKb3NoJyxcbiAgICAgICAgICAgIGxhc3ROYW1lOiAnR29kaSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgICBmaXJzdE5hbWU6ICdBbGVjJyxcbiAgICAgICAgICAgIGxhc3ROYW1lOiAnU2liaWxpYSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IDQsXG4gICAgICAgICAgICBmaXJzdE5hbWU6ICdLYW1lcm9uJyxcbiAgICAgICAgICAgIGxhc3ROYW1lOiAnU3dlZW4nXG4gICAgICAgIH1dO1xuICAgICAgICB0aGlzLnN0YXRpYyA9IHsgb3B0aW9uczogc3RhdGVzIH07XG4gICAgICAgIHRoaXMuZm9ybWF0dGVkID0ge1xuICAgICAgICAgICAgZm9ybWF0OiAnJGZpcnN0TmFtZSAkbGFzdE5hbWUnLFxuICAgICAgICAgICAgb3B0aW9uczogY29sbGFib3JhdG9yc1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFzeW5jID0ge1xuICAgICAgICAgICAgb3B0aW9uczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYWJicmlldmlhdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRMYWJlbHM6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlcyA9IGRhdGEubWFwKGl0ZW0gPT4gaXRlbS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0cyA9IGFiYnJpZXZpYXRlZC5maWx0ZXIoaXRlbSA9PiB2YWx1ZXMuaW5jbHVkZXMoaXRlbS52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hdmFsdWUgPSBbe1xuICAgICAgICAgICAgdmFsdWU6ICdVU0EnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHZhbHVlOiAnR0InXG4gICAgICAgIH1dO1xuICAgIH1cbiAgICBvbkNoYW5nZWQoKSB7XG4gICAgfVxufVxuIl19

/***/ },
/* 370 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DragulaDemoComponent = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	// Vendor
	
	
	var _core = __webpack_require__(2);
	
	var _DragulaDemo = __webpack_require__(484);
	
	var _DragulaDemo2 = _interopRequireDefault(_DragulaDemo);
	
	var _DragulaModelDemo = __webpack_require__(485);
	
	var _DragulaModelDemo2 = _interopRequireDefault(_DragulaModelDemo);
	
	var _novoElements = __webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Dragula <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/dragula">(source)</a></small></h1>\n    <p>Drag and Drop directives supported by dragula</p>\n\n    <h5>Examples</h5>\n    <p>Move stuff between these two containers. Note how the stuff gets inserted near the mouse pointer? Great stuff.</p>\n    <div class="example" style="padding: 20px;">' + _DragulaDemo2.default + '</div>\n    <code-snippet [code]="DragulaDemoTpl"></code-snippet>\n\n    <h5>Examples</h5>\n    <p>Angular-specific example. Fancy some ngFor?</p>\n    <div class="example" style="padding: 20px;">' + _DragulaModelDemo2.default + '</div>\n    <code-snippet [code]="DragulaModelDemoTpl"></code-snippet>\n</div>\n';
	
	var DragulaDemoComponent = exports.DragulaDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'dragula-demo',
	    template: template
	}), _dec(_class = function () {
	    function DragulaDemoComponent(dragulaService) {
	        var _this = this;
	
	        _classCallCheck(this, DragulaDemoComponent);
	
	        this.DragulaDemoTpl = _DragulaDemo2.default;
	        this.DragulaModelDemoTpl = _DragulaModelDemo2.default;
	        this.many = ['The', 'possibilities', 'are', 'endless!'];
	        this.many2 = ['Explore', 'them'];
	
	        dragulaService.dropModel.subscribe(function (value) {
	            _this.onDropModel(value.slice(1));
	        });
	        dragulaService.removeModel.subscribe(function (value) {
	            _this.onRemoveModel(value.slice(1));
	        });
	    }
	
	    _createClass(DragulaDemoComponent, [{
	        key: 'onDropModel',
	        value: function onDropModel(args) {
	            var _args = _slicedToArray(args, 3),
	                el = _args[0],
	                target = _args[1],
	                source = _args[2]; // eslint-disable-line
	            // do something else
	
	        }
	    }, {
	        key: 'onRemoveModel',
	        value: function onRemoveModel(args) {
	            var _args2 = _slicedToArray(args, 2),
	                el = _args2[0],
	                source = _args2[1]; // eslint-disable-line
	            // do something else
	
	        }
	    }]);
	
	    return DragulaDemoComponent;
	}()) || _class);
	Reflect.defineMetadata('design:paramtypes', [_novoElements.NovoDragulaService], DragulaDemoComponent);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvZHJhZ3VsYS9EcmFndWxhRGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQkFBQTs7QUFFQTs7QUFHQTs7O0FBSkE7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFFQSxJQUFNLHV3QkFBTjs7SUFxQmEsb0IsV0FBQSxvQixXQUpaLHFCQUFVO0FBQ1AsY0FBVSxjQURIO0FBRVAsY0FBVTtBQUZILENBQVYsQztBQUtHLGtDQUFZLGNBQVosRUFBK0M7QUFBQTs7QUFBQTs7QUFDM0MsYUFBSyxjQUFMO0FBQ0EsYUFBSyxtQkFBTDtBQUNBLGFBQUssSUFBTCxHQUFZLENBQUMsS0FBRCxFQUFRLGVBQVIsRUFBeUIsS0FBekIsRUFBZ0MsVUFBaEMsQ0FBWjtBQUNBLGFBQUssS0FBTCxHQUFhLENBQUMsU0FBRCxFQUFZLE1BQVosQ0FBYjs7QUFFQSx1QkFBZSxTQUFmLENBQXlCLFNBQXpCLENBQW1DLFVBQUMsS0FBRCxFQUFXO0FBQzFDLGtCQUFLLFdBQUwsQ0FBaUIsTUFBTSxLQUFOLENBQVksQ0FBWixDQUFqQjtBQUNILFNBRkQ7QUFHQSx1QkFBZSxXQUFmLENBQTJCLFNBQTNCLENBQXFDLFVBQUMsS0FBRCxFQUFXO0FBQzVDLGtCQUFLLGFBQUwsQ0FBbUIsTUFBTSxLQUFOLENBQVksQ0FBWixDQUFuQjtBQUNILFNBRkQ7QUFHSDs7OztvQ0FFVyxJLEVBQU07QUFBQSx1Q0FDYSxJQURiO0FBQUEsZ0JBQ1QsRUFEUztBQUFBLGdCQUNMLE1BREs7QUFBQSxnQkFDRyxNQURILGFBQ21CO0FBQ2pDOztBQUNIOzs7c0NBRWEsSSxFQUFNO0FBQUEsd0NBQ0csSUFESDtBQUFBLGdCQUNYLEVBRFc7QUFBQSxnQkFDUCxNQURPLGNBQ1M7QUFDekI7O0FBQ0g7Ozs7O2dGQXZCUSxvQiIsImZpbGUiOiJEcmFndWxhRGVtby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdvZGkvbm92by1kZXYvbGlicy9ub3ZvLWVsZW1lbnRzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IERyYWd1bGFEZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL0RyYWd1bGFEZW1vLmh0bWwnO1xuaW1wb3J0IERyYWd1bGFNb2RlbERlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvRHJhZ3VsYU1vZGVsRGVtby5odG1sJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgTm92b0RyYWd1bGFTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi8uLi8uLi9zcmMvbm92by1lbGVtZW50cyc7XG5cbmNvbnN0IHRlbXBsYXRlID0gYFxuPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxoMT5EcmFndWxhIDxzbWFsbD48YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2J1bGxob3JuL25vdm8tZWxlbWVudHMvYmxvYi9tYXN0ZXIvc3JjL2RyYWd1bGFcIj4oc291cmNlKTwvYT48L3NtYWxsPjwvaDE+XG4gICAgPHA+RHJhZyBhbmQgRHJvcCBkaXJlY3RpdmVzIHN1cHBvcnRlZCBieSBkcmFndWxhPC9wPlxuXG4gICAgPGg1PkV4YW1wbGVzPC9oNT5cbiAgICA8cD5Nb3ZlIHN0dWZmIGJldHdlZW4gdGhlc2UgdHdvIGNvbnRhaW5lcnMuIE5vdGUgaG93IHRoZSBzdHVmZiBnZXRzIGluc2VydGVkIG5lYXIgdGhlIG1vdXNlIHBvaW50ZXI/IEdyZWF0IHN0dWZmLjwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZVwiIHN0eWxlPVwicGFkZGluZzogMjBweDtcIj4ke0RyYWd1bGFEZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiRHJhZ3VsYURlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cblxuICAgIDxoNT5FeGFtcGxlczwvaDU+XG4gICAgPHA+QW5ndWxhci1zcGVjaWZpYyBleGFtcGxlLiBGYW5jeSBzb21lIG5nRm9yPzwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZVwiIHN0eWxlPVwicGFkZGluZzogMjBweDtcIj4ke0RyYWd1bGFNb2RlbERlbW9UcGx9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJEcmFndWxhTW9kZWxEZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG48L2Rpdj5cbmA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZHJhZ3VsYS1kZW1vJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbn0pXG5leHBvcnQgY2xhc3MgRHJhZ3VsYURlbW9Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKGRyYWd1bGFTZXJ2aWNlOk5vdm9EcmFndWxhU2VydmljZSkge1xuICAgICAgICB0aGlzLkRyYWd1bGFEZW1vVHBsID0gRHJhZ3VsYURlbW9UcGw7XG4gICAgICAgIHRoaXMuRHJhZ3VsYU1vZGVsRGVtb1RwbCA9IERyYWd1bGFNb2RlbERlbW9UcGw7XG4gICAgICAgIHRoaXMubWFueSA9IFsnVGhlJywgJ3Bvc3NpYmlsaXRpZXMnLCAnYXJlJywgJ2VuZGxlc3MhJ107XG4gICAgICAgIHRoaXMubWFueTIgPSBbJ0V4cGxvcmUnLCAndGhlbSddO1xuXG4gICAgICAgIGRyYWd1bGFTZXJ2aWNlLmRyb3BNb2RlbC5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRHJvcE1vZGVsKHZhbHVlLnNsaWNlKDEpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRyYWd1bGFTZXJ2aWNlLnJlbW92ZU1vZGVsLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25SZW1vdmVNb2RlbCh2YWx1ZS5zbGljZSgxKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRHJvcE1vZGVsKGFyZ3MpIHtcbiAgICAgICAgbGV0IFtlbCwgdGFyZ2V0LCBzb3VyY2VdID0gYXJnczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAvLyBkbyBzb21ldGhpbmcgZWxzZVxuICAgIH1cblxuICAgIG9uUmVtb3ZlTW9kZWwoYXJncykge1xuICAgICAgICBsZXQgW2VsLCBzb3VyY2VdID0gYXJnczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAvLyBkbyBzb21ldGhpbmcgZWxzZVxuICAgIH1cbn1cbiJdfQ==

/***/ },
/* 371 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DrawerDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _DrawerDemo = __webpack_require__(486);
	
	var _DrawerDemo2 = _interopRequireDefault(_DrawerDemo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Drawer <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/drawer">(source)</a></small></h1>\n    <p>Drawer Blurb</p>\n\n    <h2>Type</h2>\n\n    <h5>Positions</h5>\n    <p>Positions Blurb</p>\n    <div class="example" style="padding: 20px;">' + _DrawerDemo2.default + '</div>\n    <code-snippet [code]="DrawerDemoTpl"></code-snippet>\n</div>\n';
	
	var DrawerDemoComponent = exports.DrawerDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'drawer-demo',
	    template: template
	}), _dec(_class = function () {
	    function DrawerDemoComponent() {
	        _classCallCheck(this, DrawerDemoComponent);
	
	        this.DrawerDemoTpl = _DrawerDemo2.default;
	    }
	
	    _createClass(DrawerDemoComponent, [{
	        key: 'drawerToggled',
	        value: function drawerToggled(event) {
	            console.log('Drawer Toggled', event); // eslint-disable-line
	        }
	    }]);
	
	    return DrawerDemoComponent;
	}()) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvZHJhd2VyL0RyYXdlckRlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O2tCQUFBOztBQUVBOzs7QUFEQTs7QUFFQTs7Ozs7Ozs7QUFFQSxJQUFNLHViQUFOOztJQWtCYSxtQixXQUFBLG1CLFdBSloscUJBQVU7QUFDUCxjQUFVLGFBREg7QUFFUCxjQUFVO0FBRkgsQ0FBVixDO0FBS0csbUNBQWM7QUFBQTs7QUFDVixhQUFLLGFBQUw7QUFDSDs7OztzQ0FFYSxLLEVBQU87QUFDakIsb0JBQVEsR0FBUixDQUFZLGdCQUFaLEVBQThCLEtBQTlCLEVBRGlCLENBQ3FCO0FBQ3pDIiwiZmlsZSI6IkRyYXdlckRlbW8uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pnb2RpL25vdm8tZGV2L2xpYnMvbm92by1lbGVtZW50cyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCBEcmF3ZXJEZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL0RyYXdlckRlbW8uaHRtbCc7XG5cbmNvbnN0IHRlbXBsYXRlID0gYFxuPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxoMT5EcmF3ZXIgPHNtYWxsPjxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYnVsbGhvcm4vbm92by1lbGVtZW50cy9ibG9iL21hc3Rlci9zcmMvZWxlbWVudHMvZHJhd2VyXCI+KHNvdXJjZSk8L2E+PC9zbWFsbD48L2gxPlxuICAgIDxwPkRyYXdlciBCbHVyYjwvcD5cblxuICAgIDxoMj5UeXBlPC9oMj5cblxuICAgIDxoNT5Qb3NpdGlvbnM8L2g1PlxuICAgIDxwPlBvc2l0aW9ucyBCbHVyYjwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZVwiIHN0eWxlPVwicGFkZGluZzogMjBweDtcIj4ke0RyYXdlckRlbW9UcGx9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJEcmF3ZXJEZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG48L2Rpdj5cbmA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZHJhd2VyLWRlbW8nLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBEcmF3ZXJEZW1vQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5EcmF3ZXJEZW1vVHBsID0gRHJhd2VyRGVtb1RwbDtcbiAgICB9XG5cbiAgICBkcmF3ZXJUb2dnbGVkKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEcmF3ZXIgVG9nZ2xlZCcsIGV2ZW50KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH1cbn1cbiJdfQ==

/***/ },
/* 372 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DropdownDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _DropdownDemo = __webpack_require__(487);
	
	var _DropdownDemo2 = _interopRequireDefault(_DropdownDemo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Dropdown <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/dropdown">(source)</a></small></h1>\n    <p>Dropdown allow users to take an action by selecting from a list of choices revealed upon opening a temporary menu.</p>\n\n    <h2>Types</h2>\n\n    <h5>Dropdown Menu</h5>\n    <p>This is a simple dropdown menu.</p>\n    <div class="example dropdown-demo">' + _DropdownDemo2.default + '</div>\n    <code-snippet [code]="DropdownDemoTpl"></code-snippet>\n</div>\n';
	
	var DropdownDemoComponent = exports.DropdownDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'dropdown-demo',
	    template: template
	}), _dec(_class = function () {
	    function DropdownDemoComponent() {
	        _classCallCheck(this, DropdownDemoComponent);
	
	        this.DropdownDemoTpl = _DropdownDemo2.default;
	    }
	
	    _createClass(DropdownDemoComponent, [{
	        key: 'clickMe',
	        value: function clickMe(data) {
	            console.log('CLICKED!', data); // eslint-disable-line
	        }
	    }]);
	
	    return DropdownDemoComponent;
	}()) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvZHJvcGRvd24vRHJvcGRvd25EZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztrQkFBQTs7QUFFQTs7O0FBREE7O0FBRUE7Ozs7Ozs7O0FBRUEsSUFBTSxpakJBQU47O0lBa0JhLHFCLFdBQUEscUIsV0FKWixxQkFBVTtBQUNQLGNBQVUsZUFESDtBQUVQLGNBQVU7QUFGSCxDQUFWLEM7QUFLRyxxQ0FBYztBQUFBOztBQUNWLGFBQUssZUFBTDtBQUNIOzs7O2dDQUVPLEksRUFBTTtBQUNWLG9CQUFRLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLElBQXhCLEVBRFUsQ0FDcUI7QUFDbEMiLCJmaWxlIjoiRHJvcGRvd25EZW1vLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ29kaS9ub3ZvLWRldi9saWJzL25vdm8tZWxlbWVudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgRHJvcGRvd25EZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL0Ryb3Bkb3duRGVtby5odG1sJztcblxuY29uc3QgdGVtcGxhdGUgPSBgXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGgxPkRyb3Bkb3duIDxzbWFsbD48YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2J1bGxob3JuL25vdm8tZWxlbWVudHMvYmxvYi9tYXN0ZXIvc3JjL2VsZW1lbnRzL2Ryb3Bkb3duXCI+KHNvdXJjZSk8L2E+PC9zbWFsbD48L2gxPlxuICAgIDxwPkRyb3Bkb3duIGFsbG93IHVzZXJzIHRvIHRha2UgYW4gYWN0aW9uIGJ5IHNlbGVjdGluZyBmcm9tIGEgbGlzdCBvZiBjaG9pY2VzIHJldmVhbGVkIHVwb24gb3BlbmluZyBhIHRlbXBvcmFyeSBtZW51LjwvcD5cblxuICAgIDxoMj5UeXBlczwvaDI+XG5cbiAgICA8aDU+RHJvcGRvd24gTWVudTwvaDU+XG4gICAgPHA+VGhpcyBpcyBhIHNpbXBsZSBkcm9wZG93biBtZW51LjwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBkcm9wZG93bi1kZW1vXCI+JHtEcm9wZG93bkRlbW9UcGx9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJEcm9wZG93bkRlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cbjwvZGl2PlxuYDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdkcm9wZG93bi1kZW1vJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbn0pXG5leHBvcnQgY2xhc3MgRHJvcGRvd25EZW1vQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5Ecm9wZG93bkRlbW9UcGwgPSBEcm9wZG93bkRlbW9UcGw7XG4gICAgfVxuXG4gICAgY2xpY2tNZShkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDTElDS0VEIScsIGRhdGEpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfVxufVxuIl19

/***/ },
/* 373 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EditorDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _BasicEditorDemo = __webpack_require__(488);
	
	var _BasicEditorDemo2 = _interopRequireDefault(_BasicEditorDemo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>CK Editor <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/editor">(source)</a></small></h1>\n    <p>Basic HTML editor using CK Editor.</p>\n\n    <h5>Basic</h5>\n    <button theme="primary" (click)="insertText(editor)">Insert "Hello World" at Cursor</button>\n    <br />\n    <div class="example editor-demo">' + _BasicEditorDemo2.default + '</div>\n    <code-snippet [code]="BasicDemoTpl"></code-snippet>\n</div>\n';
	
	var EditorDemoComponent = exports.EditorDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'editor-demo',
	    template: template
	}), _dec(_class = function () {
	    function EditorDemoComponent() {
	        _classCallCheck(this, EditorDemoComponent);
	
	        this.BasicDemoTpl = _BasicEditorDemo2.default;
	        this.editorValue = '<p>I AM A PRE-RENDERED VALUE</p><h1>TEST</h1>';
	    }
	
	    _createClass(EditorDemoComponent, [{
	        key: 'insertText',
	        value: function insertText(editor) {
	            editor.insertText('Hello World');
	        }
	    }]);
	
	    return EditorDemoComponent;
	}()) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvZWRpdG9yL0VkaXRvckRlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O2tCQUFBOztBQUVBOzs7QUFEQTs7QUFFQTs7Ozs7Ozs7QUFFQSxJQUFNLGtnQkFBTjs7SUFpQmEsbUIsV0FBQSxtQixXQUpaLHFCQUFVO0FBQ1AsY0FBVSxhQURIO0FBRVAsY0FBVTtBQUZILENBQVYsQztBQUtHLG1DQUFjO0FBQUE7O0FBQ1YsYUFBSyxZQUFMO0FBQ0EsYUFBSyxXQUFMLEdBQW1CLCtDQUFuQjtBQUNIOzs7O21DQUVVLE0sRUFBUTtBQUNmLG1CQUFPLFVBQVAsQ0FBa0IsYUFBbEI7QUFDSCIsImZpbGUiOiJFZGl0b3JEZW1vLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ29kaS9ub3ZvLWRldi9saWJzL25vdm8tZWxlbWVudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgQmFzaWNEZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL0Jhc2ljRWRpdG9yRGVtby5odG1sJztcblxuY29uc3QgdGVtcGxhdGUgPSBgXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGgxPkNLIEVkaXRvciA8c21hbGw+PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9idWxsaG9ybi9ub3ZvLWVsZW1lbnRzL2Jsb2IvbWFzdGVyL3NyYy9lbGVtZW50cy9lZGl0b3JcIj4oc291cmNlKTwvYT48L3NtYWxsPjwvaDE+XG4gICAgPHA+QmFzaWMgSFRNTCBlZGl0b3IgdXNpbmcgQ0sgRWRpdG9yLjwvcD5cblxuICAgIDxoNT5CYXNpYzwvaDU+XG4gICAgPGJ1dHRvbiB0aGVtZT1cInByaW1hcnlcIiAoY2xpY2spPVwiaW5zZXJ0VGV4dChlZGl0b3IpXCI+SW5zZXJ0IFwiSGVsbG8gV29ybGRcIiBhdCBDdXJzb3I8L2J1dHRvbj5cbiAgICA8YnIgLz5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBlZGl0b3ItZGVtb1wiPiR7QmFzaWNEZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiQmFzaWNEZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG48L2Rpdj5cbmA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZWRpdG9yLWRlbW8nLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBFZGl0b3JEZW1vQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5CYXNpY0RlbW9UcGwgPSBCYXNpY0RlbW9UcGw7XG4gICAgICAgIHRoaXMuZWRpdG9yVmFsdWUgPSAnPHA+SSBBTSBBIFBSRS1SRU5ERVJFRCBWQUxVRTwvcD48aDE+VEVTVDwvaDE+JztcbiAgICB9XG5cbiAgICBpbnNlcnRUZXh0KGVkaXRvcikge1xuICAgICAgICBlZGl0b3IuaW5zZXJ0VGV4dCgnSGVsbG8gV29ybGQnKTtcbiAgICB9XG59XG4iXX0=

/***/ },
/* 374 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FormDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	// Vendor
	
	
	var _core = __webpack_require__(2);
	
	var _DynamicForm = __webpack_require__(491);
	
	var _DynamicForm2 = _interopRequireDefault(_DynamicForm);
	
	var _VerticalDynamicForm = __webpack_require__(494);
	
	var _VerticalDynamicForm2 = _interopRequireDefault(_VerticalDynamicForm);
	
	var _TextBasedControls = __webpack_require__(493);
	
	var _TextBasedControls2 = _interopRequireDefault(_TextBasedControls);
	
	var _CheckBoxControls = __webpack_require__(490);
	
	var _CheckBoxControls2 = _interopRequireDefault(_CheckBoxControls);
	
	var _FileInputControls = __webpack_require__(492);
	
	var _FileInputControls2 = _interopRequireDefault(_FileInputControls);
	
	var _CalendarInputControls = __webpack_require__(489);
	
	var _CalendarInputControls2 = _interopRequireDefault(_CalendarInputControls);
	
	var _MockMeta = __webpack_require__(375);
	
	var _MockMeta2 = _interopRequireDefault(_MockMeta);
	
	var _novoElements = __webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Forms <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/form">(source)</a></small></h1>\n    <p>Forms use inputs and labels to submit user content. But you already knew that. What you may not know is that our forms come in two styles \'Static\' and \'Dynamic\'</p>\n    <h2>Static Form</h2>\n    <p>Static forms <code>&lt;novo-form /&gt;</code>.\n\n    <h5>Textbox Based Controls</h5>\n    <div class="example form-demo">' + _TextBasedControls2.default + '</div>\n    <code-snippet [code]="TextBasedControlsDemoTpl"></code-snippet>\n\n    <h5>Checkbox Controls</h5>\n    <div class="example form-demo">' + _CheckBoxControls2.default + '</div>\n    <code-snippet [code]="CheckBoxControlsDemoTpl"></code-snippet>\n\n    <h5>File Input Controls</h5>\n    <div class="example form-demo">' + _FileInputControls2.default + '</div>\n    <code-snippet [code]="FileInputControlsDemoTpl"></code-snippet>\n\n    <h5>Calendar Controls</h5>\n    <div class="example form-demo">' + _CalendarInputControls2.default + '</div>\n    <code-snippet [code]="CalendarControlsDemoTpl"></code-snippet>\n\n    <h2>Dynamic Form</h2>\n    <p>Dynamic forms are composed of one element, <code>&lt;novo-dynamic-form [controls]="controls"/&gt;</code> and allow you to pass in the controls and form and it will create the form for you.</p>\n\n    <h5>Basic</h5>\n    <div class="example form-demo dynamic">' + _DynamicForm2.default + '</div>\n    <code-snippet [code]="DynamicFormDemoTpl"></code-snippet>\n\n    <h5>Vertical</h5>\n    <div class="example form-demo dynamic">' + _VerticalDynamicForm2.default + '</div>\n    <code-snippet [code]="VerticalDynamicFormDemoTpl"></code-snippet>\n</div>\n';
	
	var FormDemoComponent = exports.FormDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'form-demo',
	    template: template
	}), _dec(_class = function () {
	    function FormDemoComponent(formUtils) {
	        _classCallCheck(this, FormDemoComponent);
	
	        this.DynamicFormDemoTpl = _DynamicForm2.default;
	        this.VerticalDynamicFormDemoTpl = _VerticalDynamicForm2.default;
	        this.TextBasedControlsDemoTpl = _TextBasedControls2.default;
	        this.CheckBoxControlsDemoTpl = _CheckBoxControls2.default;
	        this.FileInputControlsDemoTpl = _FileInputControls2.default;
	        this.CalendarControlsDemoTpl = _CalendarInputControls2.default;
	
	        // Quick note config
	        this.quickNoteConfig = {
	            triggers: {
	                tags: '@',
	                references: '#',
	                boos: '^'
	            },
	            options: {
	                tags: ['First', 'Second'],
	                references: ['Third', 'Forth'],
	                boos: ['Test']
	            },
	            renderer: {
	                tags: function tags(symbol, item) {
	                    return '<a class="tag">' + symbol + item.label + '</a>';
	                },
	                references: function references(symbol, item) {
	                    return '<a class="tag">' + symbol + item.label + '</a>';
	                },
	                boos: function boos(symbol, item) {
	                    return '<strong>' + symbol + item.label + '</strong>';
	                }
	            }
	        };
	        // Text-based Controls
	        this.textControl = new _novoElements.TextBoxControl({ key: 'text', label: 'Text Box' });
	        this.emailControl = new _novoElements.TextBoxControl({ type: 'email', key: 'email', label: 'Email' });
	        this.numberControl = new _novoElements.TextBoxControl({ type: 'number', key: 'number', label: 'Number' });
	        this.currencyControl = new _novoElements.TextBoxControl({ type: 'currency', key: 'currency', label: 'Currency', currencyFormat: '$ USD' });
	        this.floatControl = new _novoElements.TextBoxControl({ type: 'float', key: 'float', label: 'Float' });
	        this.percentageControl = new _novoElements.TextBoxControl({ type: 'percentage', key: 'percentage', label: 'Percent' });
	        this.quickNoteControl = new _novoElements.QuickNoteControl({ key: 'note', label: 'Note', config: this.quickNoteConfig });
	        this.textForm = formUtils.toFormGroup([this.textControl, this.emailControl, this.numberControl, this.currencyControl, this.floatControl, this.percentageControl, this.quickNoteControl]);
	
	        // Check box controls
	        this.checkControl = new _novoElements.CheckboxControl({ key: 'check', label: 'Checkbox' });
	        this.checkListControl = new _novoElements.CheckListControl({ key: 'checklist', label: 'Check List', options: ['One', 'Two', 'Three'] });
	        this.tilesControl = new _novoElements.TilesControl({ key: 'tiles', label: 'Tiles', options: [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }] });
	        this.checkForm = formUtils.toFormGroup([this.checkControl, this.checkListControl, this.tilesControl]);
	
	        // File input controls
	        this.fileControl = new _novoElements.FileControl({ key: 'file', name: 'myfile', label: 'File' });
	        this.multiFileControl = new _novoElements.FileControl({ key: 'files', name: 'myfiles', label: 'Multiple Files', multiple: true });
	        this.fileForm = formUtils.toFormGroup([this.fileControl, this.multiFileControl]);
	
	        // Calendar input controls
	        this.dateControl = new _novoElements.DateControl({ key: 'date', label: 'Date' });
	        this.timeControl = new _novoElements.TimeControl({ key: 'time', label: 'Time' });
	        this.dateTimeControl = new _novoElements.DateTimeControl({ key: 'dateTime', label: 'Date Time' });
	        this.calendarForm = formUtils.toFormGroup([this.dateControl, this.timeControl, this.dateTimeControl]);
	
	        // Dynamic
	        this.dynamic = formUtils.toControls(_MockMeta2.default, '$ USD', {}, 'TOKEN');
	        formUtils.setInitialValues(this.dynamic, { firstName: 'Initial F Name', number: 12 });
	        this.dynamicForm = formUtils.toFormGroup(this.dynamic);
	        this.dynamicVertical = formUtils.toControls(_MockMeta2.default, '$ USD', {}, 'TOKEN');
	        this.dynamicVerticalForm = formUtils.toFormGroup(this.dynamicVertical);
	    }
	
	    _createClass(FormDemoComponent, [{
	        key: 'save',
	        value: function save(form) {
	            if (!form.isValid) {
	                form.showOnlyRequired(true);
	            } else {
	                alert('SAVING'); // eslint-disable-line
	            }
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.dynamic.forEach(function (control) {
	                control.forceClear.emit();
	            });
	        }
	    }, {
	        key: 'onChange',
	        value: function onChange(value) {
	            console.log('I changed!', value); // eslint-disable-line
	        }
	    }]);
	
	    return FormDemoComponent;
	}()) || _class);
	Reflect.defineMetadata('design:paramtypes', [_novoElements.FormUtils], FormDemoComponent);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvZm9ybS9Gb3JtRGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7a0JBQUE7O0FBRUE7O0FBUUE7OztBQVRBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQUtBLElBQU0sbXVEQUFOOztJQXdDYSxpQixXQUFBLGlCLFdBSloscUJBQVU7QUFDUCxjQUFVLFdBREg7QUFFUCxjQUFVO0FBRkgsQ0FBVixDO0FBS0csK0JBQVksU0FBWixFQUFpQztBQUFBOztBQUM3QixhQUFLLGtCQUFMO0FBQ0EsYUFBSywwQkFBTDtBQUNBLGFBQUssd0JBQUw7QUFDQSxhQUFLLHVCQUFMO0FBQ0EsYUFBSyx3QkFBTDtBQUNBLGFBQUssdUJBQUw7O0FBRUE7QUFDQSxhQUFLLGVBQUwsR0FBdUI7QUFDbkIsc0JBQVU7QUFDTixzQkFBTSxHQURBO0FBRU4sNEJBQVksR0FGTjtBQUdOLHNCQUFNO0FBSEEsYUFEUztBQU1uQixxQkFBUztBQUNMLHNCQUFNLENBQUMsT0FBRCxFQUFVLFFBQVYsQ0FERDtBQUVMLDRCQUFZLENBQUMsT0FBRCxFQUFVLE9BQVYsQ0FGUDtBQUdMLHNCQUFNLENBQUMsTUFBRDtBQUhELGFBTlU7QUFXbkIsc0JBQVU7QUFDTixzQkFBTSxjQUFDLE1BQUQsRUFBUyxJQUFULEVBQWtCO0FBQ3BCLCtDQUF5QixNQUF6QixHQUFrQyxLQUFLLEtBQXZDO0FBQ0gsaUJBSEs7QUFJTiw0QkFBWSxvQkFBQyxNQUFELEVBQVMsSUFBVCxFQUFrQjtBQUMxQiwrQ0FBeUIsTUFBekIsR0FBa0MsS0FBSyxLQUF2QztBQUNILGlCQU5LO0FBT04sc0JBQU0sY0FBQyxNQUFELEVBQVMsSUFBVCxFQUFrQjtBQUNwQix3Q0FBa0IsTUFBbEIsR0FBMkIsS0FBSyxLQUFoQztBQUNIO0FBVEs7QUFYUyxTQUF2QjtBQXVCQTtBQUNBLGFBQUssV0FBTCxH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S0FBSyxXQUFOLEVBQW1CLEtBQUssV0FBeEIsRUFBcUMsS0FBSyxlQUExQyxDQUF0QixDQUFwQjs7QUFFQTtBQUNBLGFBQUssT0FBTCxHQUFlLFVBQVUsVUFBVixxQkFBK0IsT0FBL0IsRUFBd0MsRUFBeEMsRUFBNEMsT0FBNUMsQ0FBZjtBQUNBLGtCQUFVLGdCQUFWLENBQTJCLEtBQUssT0FBaEMsRUFBeUMsRUFBRSxXQUFXLGdCQUFiLEVBQStCLFFBQVEsRUFBdkMsRUFBekM7QUFDQSxhQUFLLFdBQUwsR0FBbUIsVUFBVSxXQUFWLENBQXNCLEtBQUssT0FBM0IsQ0FBbkI7QUFDQSxhQUFLLGVBQUwsR0FBdUIsVUFBVSxVQUFWLHFCQUErQixPQUEvQixFQUF3QyxFQUF4QyxFQUE0QyxPQUE1QyxDQUF2QjtBQUNBLGFBQUssbUJBQUwsR0FBMkIsVUFBVSxXQUFWLENBQXNCLEtBQUssZUFBM0IsQ0FBM0I7QUFDSDs7Ozs2QkFFSSxJLEVBQU07QUFDUCxnQkFBSSxDQUFDLEtBQUssT0FBVixFQUFtQjtBQUNmLHFCQUFLLGdCQUFMLENBQXNCLElBQXRCO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsc0JBQU0sUUFBTixFQURHLENBQ2M7QUFDcEI7QUFDSjs7O2dDQUVPO0FBQ0osaUJBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsbUJBQVc7QUFDNUIsd0JBQVEsVUFBUixDQUFtQixJQUFuQjtBQUNILGFBRkQ7QUFHSDs7O2lDQUVRLEssRUFBTztBQUNaLG9CQUFRLEdBQVIsQ0FBWSxZQUFaLEVBQTBCLEtBQTFCLEVBRFksQ0FDc0I7QUFDckM7Ozs7O3VFQXBGUSxpQiIsImZpbGUiOiJGb3JtRGVtby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdvZGkvbm92by1kZXYvbGlicy9ub3ZvLWVsZW1lbnRzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IER5bmFtaWNGb3JtRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9EeW5hbWljRm9ybS5odG1sJztcbmltcG9ydCBWZXJ0aWNhbER5bmFtaWNGb3JtRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9WZXJ0aWNhbER5bmFtaWNGb3JtLmh0bWwnO1xuaW1wb3J0IFRleHRCYXNlZENvbnRyb2xzRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9UZXh0QmFzZWRDb250cm9scy5odG1sJztcbmltcG9ydCBDaGVja0JveENvbnRyb2xzRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9DaGVja0JveENvbnRyb2xzLmh0bWwnO1xuaW1wb3J0IEZpbGVJbnB1dENvbnRyb2xzRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9GaWxlSW5wdXRDb250cm9scy5odG1sJztcbmltcG9ydCBDYWxlbmRhckNvbnRyb2xzRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9DYWxlbmRhcklucHV0Q29udHJvbHMuaHRtbCc7XG5pbXBvcnQgTW9ja01ldGEgZnJvbSAnLi9Nb2NrTWV0YSc7XG4vLyBWZW5kb3JcbmltcG9ydCB7XG4gICAgRm9ybVV0aWxzLCBUZXh0Qm94Q29udHJvbCwgQ2hlY2tib3hDb250cm9sLCBDaGVja0xpc3RDb250cm9sLCBGaWxlQ29udHJvbCxcbiAgICBRdWlja05vdGVDb250cm9sLCBUaWxlc0NvbnRyb2wsIERhdGVDb250cm9sLCBUaW1lQ29udHJvbCwgRGF0ZVRpbWVDb250cm9sXG59IGZyb20gJy4vLi4vLi4vLi4vLi4vc3JjL25vdm8tZWxlbWVudHMnO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGBcbjxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICA8aDE+Rm9ybXMgPHNtYWxsPjxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYnVsbGhvcm4vbm92by1lbGVtZW50cy9ibG9iL21hc3Rlci9zcmMvZWxlbWVudHMvZm9ybVwiPihzb3VyY2UpPC9hPjwvc21hbGw+PC9oMT5cbiAgICA8cD5Gb3JtcyB1c2UgaW5wdXRzIGFuZCBsYWJlbHMgdG8gc3VibWl0IHVzZXIgY29udGVudC4gQnV0IHlvdSBhbHJlYWR5IGtuZXcgdGhhdC4gV2hhdCB5b3UgbWF5IG5vdCBrbm93IGlzIHRoYXQgb3VyIGZvcm1zIGNvbWUgaW4gdHdvIHN0eWxlcyAnU3RhdGljJyBhbmQgJ0R5bmFtaWMnPC9wPlxuICAgIDxoMj5TdGF0aWMgRm9ybTwvaDI+XG4gICAgPHA+U3RhdGljIGZvcm1zIDxjb2RlPiZsdDtub3ZvLWZvcm0gLyZndDs8L2NvZGU+LlxuXG4gICAgPGg1PlRleHRib3ggQmFzZWQgQ29udHJvbHM8L2g1PlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIGZvcm0tZGVtb1wiPiR7VGV4dEJhc2VkQ29udHJvbHNEZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiVGV4dEJhc2VkQ29udHJvbHNEZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG5cbiAgICA8aDU+Q2hlY2tib3ggQ29udHJvbHM8L2g1PlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIGZvcm0tZGVtb1wiPiR7Q2hlY2tCb3hDb250cm9sc0RlbW9UcGx9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJDaGVja0JveENvbnRyb2xzRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuXG4gICAgPGg1PkZpbGUgSW5wdXQgQ29udHJvbHM8L2g1PlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIGZvcm0tZGVtb1wiPiR7RmlsZUlucHV0Q29udHJvbHNEZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiRmlsZUlucHV0Q29udHJvbHNEZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG5cbiAgICA8aDU+Q2FsZW5kYXIgQ29udHJvbHM8L2g1PlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIGZvcm0tZGVtb1wiPiR7Q2FsZW5kYXJDb250cm9sc0RlbW9UcGx9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJDYWxlbmRhckNvbnRyb2xzRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuXG4gICAgPGgyPkR5bmFtaWMgRm9ybTwvaDI+XG4gICAgPHA+RHluYW1pYyBmb3JtcyBhcmUgY29tcG9zZWQgb2Ygb25lIGVsZW1lbnQsIDxjb2RlPiZsdDtub3ZvLWR5bmFtaWMtZm9ybSBbY29udHJvbHNdPVwiY29udHJvbHNcIi8mZ3Q7PC9jb2RlPiBhbmQgYWxsb3cgeW91IHRvIHBhc3MgaW4gdGhlIGNvbnRyb2xzIGFuZCBmb3JtIGFuZCBpdCB3aWxsIGNyZWF0ZSB0aGUgZm9ybSBmb3IgeW91LjwvcD5cblxuICAgIDxoNT5CYXNpYzwvaDU+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgZm9ybS1kZW1vIGR5bmFtaWNcIj4ke0R5bmFtaWNGb3JtRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIkR5bmFtaWNGb3JtRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuXG4gICAgPGg1PlZlcnRpY2FsPC9oNT5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBmb3JtLWRlbW8gZHluYW1pY1wiPiR7VmVydGljYWxEeW5hbWljRm9ybURlbW9UcGx9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJWZXJ0aWNhbER5bmFtaWNGb3JtRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuPC9kaXY+XG5gO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Zvcm0tZGVtbycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1EZW1vQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihmb3JtVXRpbHM6Rm9ybVV0aWxzKSB7XG4gICAgICAgIHRoaXMuRHluYW1pY0Zvcm1EZW1vVHBsID0gRHluYW1pY0Zvcm1EZW1vVHBsO1xuICAgICAgICB0aGlzLlZlcnRpY2FsRHluYW1pY0Zvcm1EZW1vVHBsID0gVmVydGljYWxEeW5hbWljRm9ybURlbW9UcGw7XG4gICAgICAgIHRoaXMuVGV4dEJhc2VkQ29udHJvbHNEZW1vVHBsID0gVGV4dEJhc2VkQ29udHJvbHNEZW1vVHBsO1xuICAgICAgICB0aGlzLkNoZWNrQm94Q29udHJvbHNEZW1vVHBsID0gQ2hlY2tCb3hDb250cm9sc0RlbW9UcGw7XG4gICAgICAgIHRoaXMuRmlsZUlucHV0Q29udHJvbHNEZW1vVHBsID0gRmlsZUlucHV0Q29udHJvbHNEZW1vVHBsO1xuICAgICAgICB0aGlzLkNhbGVuZGFyQ29udHJvbHNEZW1vVHBsID0gQ2FsZW5kYXJDb250cm9sc0RlbW9UcGw7XG5cbiAgICAgICAgLy8gUXVpY2sgbm90ZSBjb25maWdcbiAgICAgICAgdGhpcy5xdWlja05vdGVDb25maWcgPSB7XG4gICAgICAgICAgICB0cmlnZ2Vyczoge1xuICAgICAgICAgICAgICAgIHRhZ3M6ICdAJyxcbiAgICAgICAgICAgICAgICByZWZlcmVuY2VzOiAnIycsXG4gICAgICAgICAgICAgICAgYm9vczogJ14nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHRhZ3M6IFsnRmlyc3QnLCAnU2Vjb25kJ10sXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlczogWydUaGlyZCcsICdGb3J0aCddLFxuICAgICAgICAgICAgICAgIGJvb3M6IFsnVGVzdCddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVuZGVyZXI6IHtcbiAgICAgICAgICAgICAgICB0YWdzOiAoc3ltYm9sLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGEgY2xhc3M9XCJ0YWdcIj4ke3N5bWJvbH0ke2l0ZW0ubGFiZWx9PC9hPmA7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZWZlcmVuY2VzOiAoc3ltYm9sLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGEgY2xhc3M9XCJ0YWdcIj4ke3N5bWJvbH0ke2l0ZW0ubGFiZWx9PC9hPmA7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib29zOiAoc3ltYm9sLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgPHN0cm9uZz4ke3N5bWJvbH0ke2l0ZW0ubGFiZWx9PC9zdHJvbmc+YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIFRleHQtYmFzZWQgQ29udHJvbHNcbiAgICAgICAgdGhpcy50ZXh0Q29udHJvbCA9IG5ldyBUZXh0Qm94Q29udHJvbCh7IGtleTogJ3RleHQnLCBsYWJlbDogJ1RleHQgQm94JyB9KTtcbiAgICAgICAgdGhpcy5lbWFpbENvbnRyb2wgPSBuZXcgVGV4dEJveENvbnRyb2woeyB0eXBlOiAnZW1haWwnLCBrZXk6ICdlbWFpbCcsIGxhYmVsOiAnRW1haWwnIH0pO1xuICAgICAgICB0aGlzLm51bWJlckNvbnRyb2wgPSBuZXcgVGV4dEJveENvbnRyb2woeyB0eXBlOiAnbnVtYmVyJywga2V5OiAnbnVtYmVyJywgbGFiZWw6ICdOdW1iZXInIH0pO1xuICAgICAgICB0aGlzLmN1cnJlbmN5Q29udHJvbCA9IG5ldyBUZXh0Qm94Q29udHJvbCh7IHR5cGU6ICdjdXJyZW5jeScsIGtleTogJ2N1cnJlbmN5JywgbGFiZWw6ICdDdXJyZW5jeScsIGN1cnJlbmN5Rm9ybWF0OiAnJCBVU0QnIH0pO1xuICAgICAgICB0aGlzLmZsb2F0Q29udHJvbCA9IG5ldyBUZXh0Qm94Q29udHJvbCh7IHR5cGU6ICdmbG9hdCcsIGtleTogJ2Zsb2F0JywgbGFiZWw6ICdGbG9hdCcgfSk7XG4gICAgICAgIHRoaXMucGVyY2VudGFnZUNvbnRyb2wgPSBuZXcgVGV4dEJveENvbnRyb2woeyB0eXBlOiAncGVyY2VudGFnZScsIGtleTogJ3BlcmNlbnRhZ2UnLCBsYWJlbDogJ1BlcmNlbnQnIH0pO1xuICAgICAgICB0aGlzLnF1aWNrTm90ZUNvbnRyb2wgPSBuZXcgUXVpY2tOb3RlQ29udHJvbCh7IGtleTogJ25vdGUnLCBsYWJlbDogJ05vdGUnLCBjb25maWc6IHRoaXMucXVpY2tOb3RlQ29uZmlnIH0pO1xuICAgICAgICB0aGlzLnRleHRGb3JtID0gZm9ybVV0aWxzLnRvRm9ybUdyb3VwKFt0aGlzLnRleHRDb250cm9sLCB0aGlzLmVtYWlsQ29udHJvbCwgdGhpcy5udW1iZXJDb250cm9sLCB0aGlzLmN1cnJlbmN5Q29udHJvbCwgdGhpcy5mbG9hdENvbnRyb2wsIHRoaXMucGVyY2VudGFnZUNvbnRyb2wsIHRoaXMucXVpY2tOb3RlQ29udHJvbF0pO1xuXG4gICAgICAgIC8vIENoZWNrIGJveCBjb250cm9sc1xuICAgICAgICB0aGlzLmNoZWNrQ29udHJvbCA9IG5ldyBDaGVja2JveENvbnRyb2woeyBrZXk6ICdjaGVjaycsIGxhYmVsOiAnQ2hlY2tib3gnIH0pO1xuICAgICAgICB0aGlzLmNoZWNrTGlzdENvbnRyb2wgPSBuZXcgQ2hlY2tMaXN0Q29udHJvbCh7IGtleTogJ2NoZWNrbGlzdCcsIGxhYmVsOiAnQ2hlY2sgTGlzdCcsIG9wdGlvbnM6IFsnT25lJywgJ1R3bycsICdUaHJlZSddIH0pO1xuICAgICAgICB0aGlzLnRpbGVzQ29udHJvbCA9IG5ldyBUaWxlc0NvbnRyb2woeyBrZXk6ICd0aWxlcycsIGxhYmVsOiAnVGlsZXMnLCBvcHRpb25zOiBbeyB2YWx1ZTogJ29uZScsIGxhYmVsOiAnT25lJyB9LCB7IHZhbHVlOiAndHdvJywgbGFiZWw6ICdUd28nIH1dIH0pO1xuICAgICAgICB0aGlzLmNoZWNrRm9ybSA9IGZvcm1VdGlscy50b0Zvcm1Hcm91cChbdGhpcy5jaGVja0NvbnRyb2wsIHRoaXMuY2hlY2tMaXN0Q29udHJvbCwgdGhpcy50aWxlc0NvbnRyb2xdKTtcblxuICAgICAgICAvLyBGaWxlIGlucHV0IGNvbnRyb2xzXG4gICAgICAgIHRoaXMuZmlsZUNvbnRyb2wgPSBuZXcgRmlsZUNvbnRyb2woeyBrZXk6ICdmaWxlJywgbmFtZTogJ215ZmlsZScsIGxhYmVsOiAnRmlsZScgfSk7XG4gICAgICAgIHRoaXMubXVsdGlGaWxlQ29udHJvbCA9IG5ldyBGaWxlQ29udHJvbCh7IGtleTogJ2ZpbGVzJywgbmFtZTogJ215ZmlsZXMnLCBsYWJlbDogJ011bHRpcGxlIEZpbGVzJywgbXVsdGlwbGU6IHRydWUgfSk7XG4gICAgICAgIHRoaXMuZmlsZUZvcm0gPSBmb3JtVXRpbHMudG9Gb3JtR3JvdXAoW3RoaXMuZmlsZUNvbnRyb2wsIHRoaXMubXVsdGlGaWxlQ29udHJvbF0pO1xuXG4gICAgICAgIC8vIENhbGVuZGFyIGlucHV0IGNvbnRyb2xzXG4gICAgICAgIHRoaXMuZGF0ZUNvbnRyb2wgPSBuZXcgRGF0ZUNvbnRyb2woeyBrZXk6ICdkYXRlJywgbGFiZWw6ICdEYXRlJyB9KTtcbiAgICAgICAgdGhpcy50aW1lQ29udHJvbCA9IG5ldyBUaW1lQ29udHJvbCh7IGtleTogJ3RpbWUnLCBsYWJlbDogJ1RpbWUnIH0pO1xuICAgICAgICB0aGlzLmRhdGVUaW1lQ29udHJvbCA9IG5ldyBEYXRlVGltZUNvbnRyb2woeyBrZXk6ICdkYXRlVGltZScsIGxhYmVsOiAnRGF0ZSBUaW1lJyB9KTtcbiAgICAgICAgdGhpcy5jYWxlbmRhckZvcm0gPSBmb3JtVXRpbHMudG9Gb3JtR3JvdXAoW3RoaXMuZGF0ZUNvbnRyb2wsIHRoaXMudGltZUNvbnRyb2wsIHRoaXMuZGF0ZVRpbWVDb250cm9sXSk7XG5cbiAgICAgICAgLy8gRHluYW1pY1xuICAgICAgICB0aGlzLmR5bmFtaWMgPSBmb3JtVXRpbHMudG9Db250cm9scyhNb2NrTWV0YSwgJyQgVVNEJywge30sICdUT0tFTicpO1xuICAgICAgICBmb3JtVXRpbHMuc2V0SW5pdGlhbFZhbHVlcyh0aGlzLmR5bmFtaWMsIHsgZmlyc3ROYW1lOiAnSW5pdGlhbCBGIE5hbWUnLCBudW1iZXI6IDEyIH0pO1xuICAgICAgICB0aGlzLmR5bmFtaWNGb3JtID0gZm9ybVV0aWxzLnRvRm9ybUdyb3VwKHRoaXMuZHluYW1pYyk7XG4gICAgICAgIHRoaXMuZHluYW1pY1ZlcnRpY2FsID0gZm9ybVV0aWxzLnRvQ29udHJvbHMoTW9ja01ldGEsICckIFVTRCcsIHt9LCAnVE9LRU4nKTtcbiAgICAgICAgdGhpcy5keW5hbWljVmVydGljYWxGb3JtID0gZm9ybVV0aWxzLnRvRm9ybUdyb3VwKHRoaXMuZHluYW1pY1ZlcnRpY2FsKTtcbiAgICB9XG5cbiAgICBzYXZlKGZvcm0pIHtcbiAgICAgICAgaWYgKCFmb3JtLmlzVmFsaWQpIHtcbiAgICAgICAgICAgIGZvcm0uc2hvd09ubHlSZXF1aXJlZCh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KCdTQVZJTkcnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuZHluYW1pYy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xuICAgICAgICAgICAgY29udHJvbC5mb3JjZUNsZWFyLmVtaXQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25DaGFuZ2UodmFsdWUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0kgY2hhbmdlZCEnLCB2YWx1ZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9XG59XG4iXX0=

/***/ },
/* 375 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    entity: 'Opportunity',
	    entityMetaUrl: 'http://develop-backend.bh-bos2.bullhorn.com:8181/rest-services/1yg8p/meta/Opportunity?fields=*',
	    label: 'Opportunity',
	    fields: [{
	        name: 'firstName',
	        type: 'text',
	        label: 'First Name',
	        required: true
	    }, {
	        name: 'lastName',
	        type: 'text',
	        label: 'Last Name'
	    }, {
	        name: 'number',
	        type: 'number',
	        label: 'Number',
	        required: true,
	        disabled: true
	    }, {
	        name: 'float',
	        type: 'float',
	        label: 'Float',
	        required: true
	    }, {
	        name: 'currency',
	        type: 'money',
	        label: 'Cost',
	        currencyFormat: 'USD'
	    }, {
	        name: 'percent',
	        type: 'percentage',
	        label: 'Percentage',
	        required: true
	    }, {
	        name: 'date',
	        type: 'date',
	        label: 'Date',
	        required: true
	    }, {
	        name: 'time',
	        type: 'time',
	        label: 'Time',
	        required: true
	    }, {
	        name: 'datetime',
	        type: 'date-time',
	        label: 'DateTime',
	        dataSpecialization: 'DATETIME',
	        required: true
	    }, {
	        name: 'status',
	        type: 'select',
	        dataType: 'String',
	        maxLength: 200,
	        confidential: false,
	        label: 'Status',
	        options: [{
	            value: 'Open',
	            label: 'Open'
	        }, {
	            value: 'Qualifying',
	            label: 'Qualifying'
	        }, {
	            value: 'Negotiating',
	            label: 'Negotiating'
	        }, {
	            value: 'TRIGGER',
	            label: 'TRIGGER'
	        }]
	    }, {
	        name: 'nextAction',
	        type: 'tiles',
	        dataType: 'String',
	        label: 'Next Action',
	        required: false,
	        options: [{
	            value: 'none',
	            label: 'None'
	        }, {
	            value: 'task',
	            label: 'Task'
	        }, {
	            value: 'appointment',
	            label: 'Appointment'
	        }]
	    }, {
	        name: 'state',
	        type: 'picker',
	        dataType: 'String',
	        maxLength: 200,
	        confidential: false,
	        label: 'State',
	        required: true,
	        // TODO: Align picker with META by passing META obj into picker
	        // options: [ /* flat array of states */ ]
	        options: {
	            options: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
	        }
	    }, {
	        name: 'startDate',
	        type: 'datetime',
	        dataType: 'Timestamp',
	        label: 'Start Date',
	        required: true
	    }, {
	        name: 'quota',
	        type: 'number',
	        dataType: 'Integer',
	        label: 'Quota',
	        required: true
	    }, {
	        name: 'secret',
	        type: 'hidden',
	        dataType: 'String',
	        label: 'Top Secret',
	        required: true,
	        defaultValue: 'The secret code is: 08322'
	    }, {
	        name: 'categories',
	        type: 'picker',
	        confidential: false,
	        optional: false,
	        label: 'Categories',
	        required: true,
	        readOnly: false,
	        multiValue: true,
	        inputType: 'SELECT',
	        options: [{
	            value: 'Open',
	            label: 'Open'
	        }, {
	            value: 'Qualifying',
	            label: 'Qualifying'
	        }, {
	            value: 'Negotiating',
	            label: 'Negotiating'
	        }, {
	            value: 'TRIGGER',
	            label: 'TRIGGER'
	        }]
	    }, {
	        name: 'owner',
	        type: 'entity',
	        confidential: false,
	        optional: false,
	        label: 'Owner',
	        required: false,
	        readOnly: true,
	        multiValue: false,
	        inputType: 'SELECT',
	        optionsType: 'CorporateUser',
	        optionsUrl: '/options/CorporateUser',
	        hideFromSearch: false,
	        associatedEntity: {
	            entity: 'CorporateUser',
	            label: 'Corporate User'
	        }
	    }, {
	        name: 'address',
	        type: 'address',
	        dataType: 'Address',
	        dataSpecialization: 'SYSTEM',
	        confidential: false,
	        optional: true,
	        label: 'Address',
	        required: false,
	        readOnly: false,
	        multiValue: false,
	        hideFromSearch: true,
	        fields: [{
	            name: 'address1',
	            type: 'SCALAR',
	            dataType: 'String',
	            maxLength: 40,
	            confidential: false,
	            optional: true,
	            label: 'Addressxxx',
	            required: false,
	            readOnly: false,
	            multiValue: false,
	            hideFromSearch: false
	        }, {
	            name: 'address2',
	            type: 'SCALAR',
	            dataType: 'String',
	            maxLength: 40,
	            confidential: false,
	            optional: true,
	            label: 'Address 2',
	            required: false,
	            readOnly: false,
	            multiValue: false,
	            hideFromSearch: false
	        }, {
	            name: 'city',
	            type: 'SCALAR',
	            dataType: 'String',
	            maxLength: 40,
	            confidential: false,
	            optional: true,
	            label: 'City',
	            required: false,
	            readOnly: false,
	            multiValue: false,
	            hideFromSearch: false
	        }, {
	            name: 'state',
	            type: 'SCALAR',
	            dataType: 'String',
	            maxLength: 30,
	            confidential: false,
	            optional: true,
	            label: 'State',
	            required: false,
	            readOnly: false,
	            multiValue: false,
	            inputType: 'SELECT',
	            optionsType: 'StateText',
	            optionsUrl: 'http://optimus-backend.bh-bos2.bullhorn.com:8181/rest-services/1hs/options/StateText',
	            hideFromSearch: false
	        }, {
	            name: 'zip',
	            type: 'SCALAR',
	            dataType: 'String',
	            maxLength: 15,
	            confidential: false,
	            optional: true,
	            label: 'Zip',
	            required: false,
	            readOnly: false,
	            multiValue: false,
	            hideFromSearch: false
	        }, {
	            name: 'countryID',
	            type: 'SCALAR',
	            dataType: 'Integer',
	            confidential: false,
	            optional: false,
	            label: 'Country',
	            required: false,
	            readOnly: false,
	            multiValue: false,
	            inputType: 'SELECT',
	            optionsType: 'Country',
	            optionsUrl: 'http://optimus-backend.bh-bos2.bullhorn.com:8181/rest-services/1hs/options/Country',
	            defaultValue: 2260,
	            hideFromSearch: false
	        }, {
	            name: 'countryCode',
	            type: 'SCALAR',
	            dataType: 'String',
	            maxLength: 0,
	            optional: true
	        }, {
	            name: 'countryName',
	            type: 'SCALAR',
	            dataType: 'String',
	            maxLength: 0,
	            optional: true
	        }]
	    }, {
	        name: 'checkbox',
	        type: 'checkbox',
	        label: 'Checkbox'
	    }, {
	        name: 'checklist',
	        type: 'checklist',
	        label: 'CheckList',
	        options: ['Morning', 'Day', 'Night', 'Overnight'],
	        required: true
	    }, {
	        name: 'address',
	        type: 'address',
	        label: 'Address',
	        required: true
	    }, {
	        name: 'attachments',
	        type: 'file',
	        label: 'Attachments',
	        multiValue: true,
	        required: true
	    }]
	};
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvZm9ybS9Nb2NrTWV0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFBZTtBQUNYLFlBQVEsYUFERztBQUVYLG1CQUFlLGdHQUZKO0FBR1gsV0FBTyxhQUhJO0FBSVgsWUFBUSxDQUNKO0FBQ0ksY0FBTSxXQURWO0FBRUksY0FBTSxNQUZWO0FBR0ksZUFBTyxZQUhYO0FBSUksa0JBQVU7QUFKZCxLQURJLEVBT0o7QUFDSSxjQUFNLFVBRFY7QUFFSSxjQUFNLE1BRlY7QUFHSSxlQUFPO0FBSFgsS0FQSSxFQVlKO0FBQ0ksY0FBTSxRQURWO0FBRUksY0FBTSxRQUZWO0FBR0ksZUFBTyxRQUhYO0FBSUksa0JBQVUsSUFKZDtBQUtJLGtCQUFVO0FBTGQsS0FaSSxFQW1CSjtBQUNJLGNBQU0sT0FEVjtBQUVJLGNBQU0sT0FGVjtBQUdJLGVBQU8sT0FIWDtBQUlJLGtCQUFVO0FBSmQsS0FuQkksRUF5Qko7QUFDSSxjQUFNLFVBRFY7QUFFSSxjQUFNLE9BRlY7QUFHSSxlQUFPLE1BSFg7QUFJSSx3QkFBZ0I7QUFKcEIsS0F6QkksRUErQko7QUFDSSxjQUFNLFNBRFY7QUFFSSxjQUFNLFlBRlY7QUFHSSxlQUFPLFlBSFg7QUFJSSxrQkFBVTtBQUpkLEtBL0JJLEVBcUNKO0FBQ0ksY0FBTSxNQURWO0FBRUksY0FBTSxNQUZWO0FBR0ksZUFBTyxNQUhYO0FBSUksa0JBQVU7QUFKZCxLQXJDSSxFQTJDSjtBQUNJLGNBQU0sTUFEVjtBQUVJLGNBQU0sTUFGVjtBQUdJLGVBQU8sTUFIWDtBQUlJLGtCQUFVO0FBSmQsS0EzQ0ksRUFpREo7QUFDSSxjQUFNLFVBRFY7QUFFSSxjQUFNLFdBRlY7QUFHSSxlQUFPLFVBSFg7QUFJSSw0QkFBb0IsVUFKeEI7QUFLSSxrQkFBVTtBQUxkLEtBakRJLEVBd0RKO0FBQ0ksY0FBTSxRQURWO0FBRUksY0FBTSxRQUZWO0FBR0ksa0JBQVUsUUFIZDtBQUlJLG1CQUFXLEdBSmY7QUFLSSxz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SjtBQUNJLGtCQUFNLGFBRFY7QUFFSSxrQkFBTSxRQUZWO0FBR0ksc0JBQVUsUUFIZDtBQUlJLHVCQUFXLENBSmY7QUFLSSxzQkFBVTtBQUxkLFNBNUZJO0FBWlQsS0ExTEMsRUEyU0o7QUFDSSxjQUFNLFVBRFY7QUFFSSxjQUFNLFVBRlY7QUFHSSxlQUFPO0FBSFgsS0EzU0ksRUFnVEo7QUFDSSxjQUFNLFdBRFY7QUFFSSxjQUFNLFdBRlY7QUFHSSxlQUFPLFdBSFg7QUFJSSxpQkFBUyxDQUFDLFNBQUQsRUFBWSxLQUFaLEVBQW1CLE9BQW5CLEVBQTRCLFdBQTVCLENBSmI7QUFLSSxrQkFBVTtBQUxkLEtBaFRJLEVBdVRKO0FBQ0ksY0FBTSxTQURWO0FBRUksY0FBTSxTQUZWO0FBR0ksZUFBTyxTQUhYO0FBSUksa0JBQVU7QUFKZCxLQXZUSSxFQTZUSjtBQUNJLGNBQU0sYUFEVjtBQUVJLGNBQU0sTUFGVjtBQUdJLGVBQU8sYUFIWDtBQUlJLG9CQUFZLElBSmhCO0FBS0ksa0JBQVU7QUFMZCxLQTdUSTtBQUpHLEMiLCJmaWxlIjoiTW9ja01ldGEuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pnb2RpL25vdm8tZGV2L2xpYnMvbm92by1lbGVtZW50cyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgICBlbnRpdHk6ICdPcHBvcnR1bml0eScsXG4gICAgZW50aXR5TWV0YVVybDogJ2h0dHA6Ly9kZXZlbG9wLWJhY2tlbmQuYmgtYm9zMi5idWxsaG9ybi5jb206ODE4MS9yZXN0LXNlcnZpY2VzLzF5ZzhwL21ldGEvT3Bwb3J0dW5pdHk/ZmllbGRzPSonLFxuICAgIGxhYmVsOiAnT3Bwb3J0dW5pdHknLFxuICAgIGZpZWxkczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnZmlyc3ROYW1lJyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIGxhYmVsOiAnRmlyc3QgTmFtZScsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnbGFzdE5hbWUnLFxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgbGFiZWw6ICdMYXN0IE5hbWUnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdudW1iZXInLFxuICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICBsYWJlbDogJ051bWJlcicsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdmbG9hdCcsXG4gICAgICAgICAgICB0eXBlOiAnZmxvYXQnLFxuICAgICAgICAgICAgbGFiZWw6ICdGbG9hdCcsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnY3VycmVuY3knLFxuICAgICAgICAgICAgdHlwZTogJ21vbmV5JyxcbiAgICAgICAgICAgIGxhYmVsOiAnQ29zdCcsXG4gICAgICAgICAgICBjdXJyZW5jeUZvcm1hdDogJ1VTRCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3BlcmNlbnQnLFxuICAgICAgICAgICAgdHlwZTogJ3BlcmNlbnRhZ2UnLFxuICAgICAgICAgICAgbGFiZWw6ICdQZXJjZW50YWdlJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdkYXRlJyxcbiAgICAgICAgICAgIHR5cGU6ICdkYXRlJyxcbiAgICAgICAgICAgIGxhYmVsOiAnRGF0ZScsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAndGltZScsXG4gICAgICAgICAgICB0eXBlOiAndGltZScsXG4gICAgICAgICAgICBsYWJlbDogJ1RpbWUnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2RhdGV0aW1lJyxcbiAgICAgICAgICAgIHR5cGU6ICdkYXRlLXRpbWUnLFxuICAgICAgICAgICAgbGFiZWw6ICdEYXRlVGltZScsXG4gICAgICAgICAgICBkYXRhU3BlY2lhbGl6YXRpb246ICdEQVRFVElNRScsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnc3RhdHVzJyxcbiAgICAgICAgICAgIHR5cGU6ICdzZWxlY3QnLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdTdHJpbmcnLFxuICAgICAgICAgICAgbWF4TGVuZ3RoOiAyMDAsXG4gICAgICAgICAgICBjb25maWRlbnRpYWw6IGZhbHNlLFxuICAgICAgICAgICAgbGFiZWw6ICdTdGF0dXMnLFxuICAgICAgICAgICAgb3B0aW9uczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdPcGVuJyxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdPcGVuJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1F1YWxpZnlpbmcnLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1F1YWxpZnlpbmcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnTmVnb3RpYXRpbmcnLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ05lZ290aWF0aW5nJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1RSSUdHRVInLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1RSSUdHRVInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnbmV4dEFjdGlvbicsXG4gICAgICAgICAgICB0eXBlOiAndGlsZXMnLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdTdHJpbmcnLFxuICAgICAgICAgICAgbGFiZWw6ICdOZXh0IEFjdGlvbicsXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgICBvcHRpb25zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ05vbmUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndGFzaycsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnVGFzaydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdhcHBvaW50bWVudCcsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnQXBwb2ludG1lbnQnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnc3RhdGUnLFxuICAgICAgICAgICAgdHlwZTogJ3BpY2tlcicsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ1N0cmluZycsXG4gICAgICAgICAgICBtYXhMZW5ndGg6IDIwMCxcbiAgICAgICAgICAgIGNvbmZpZGVudGlhbDogZmFsc2UsXG4gICAgICAgICAgICBsYWJlbDogJ1N0YXRlJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgLy8gVE9ETzogQWxpZ24gcGlja2VyIHdpdGggTUVUQSBieSBwYXNzaW5nIE1FVEEgb2JqIGludG8gcGlja2VyXG4gICAgICAgICAgICAvLyBvcHRpb25zOiBbIC8qIGZsYXQgYXJyYXkgb2Ygc3RhdGVzICovIF1cbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbJ0FsYWJhbWEnLCAnQWxhc2thJywgJ0FyaXpvbmEnLCAnQXJrYW5zYXMnLCAnQ2FsaWZvcm5pYScsICdDb2xvcmFkbycsXG4gICAgICAgICAgICAgICAgICAgICdDb25uZWN0aWN1dCcsICdEZWxhd2FyZScsICdGbG9yaWRhJywgJ0dlb3JnaWEnLCAnSGF3YWlpJywgJ0lkYWhvJywgJ0lsbGlub2lzJywgJ0luZGlhbmEnLCAnSW93YScsXG4gICAgICAgICAgICAgICAgICAgICdLYW5zYXMnLCAnS2VudHVja3knLCAnTG91aXNpYW5hJywgJ01haW5lJywgJ01hcnlsYW5kJywgJ01hc3NhY2h1c2V0dHMnLCAnTWljaGlnYW4nLCAnTWlubmVzb3RhJyxcbiAgICAgICAgICAgICAgICAgICAgJ01pc3Npc3NpcHBpJywgJ01pc3NvdXJpJywgJ01vbnRhbmEnLCAnTmVicmFza2EnLCAnTmV2YWRhJywgJ05ldyBIYW1wc2hpcmUnLCAnTmV3IEplcnNleScsICdOZXcgTWV4aWNvJyxcbiAgICAgICAgICAgICAgICAgICAgJ05ldyBZb3JrJywgJ05vcnRoIERha290YScsICdOb3J0aCBDYXJvbGluYScsICdPaGlvJywgJ09rbGFob21hJywgJ09yZWdvbicsICdQZW5uc3lsdmFuaWEnLCAnUmhvZGUgSXNsYW5kJyxcbiAgICAgICAgICAgICAgICAgICAgJ1NvdXRoIENhcm9saW5hJywgJ1NvdXRoIERha290YScsICdUZW5uZXNzZWUnLCAnVGV4YXMnLCAnVXRhaCcsICdWZXJtb250JywgJ1ZpcmdpbmlhJywgJ1dhc2hpbmd0b24nLFxuICAgICAgICAgICAgICAgICAgICAnV2VzdCBWaXJnaW5pYScsICdXaXNjb25zaW4nLCAnV3lvbWluZyddXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdzdGFydERhdGUnLFxuICAgICAgICAgICAgdHlwZTogJ2RhdGV0aW1lJyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnVGltZXN0YW1wJyxcbiAgICAgICAgICAgIGxhYmVsOiAnU3RhcnQgRGF0ZScsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAncXVvdGEnLFxuICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ0ludGVnZXInLFxuICAgICAgICAgICAgbGFiZWw6ICdRdW90YScsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnc2VjcmV0JyxcbiAgICAgICAgICAgIHR5cGU6ICdoaWRkZW4nLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdTdHJpbmcnLFxuICAgICAgICAgICAgbGFiZWw6ICdUb3AgU2VjcmV0JyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiAnVGhlIHNlY3JldCBjb2RlIGlzOiAwODMyMidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2NhdGVnb3JpZXMnLFxuICAgICAgICAgICAgdHlwZTogJ3BpY2tlcicsXG4gICAgICAgICAgICBjb25maWRlbnRpYWw6IGZhbHNlLFxuICAgICAgICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgICAgICAgbGFiZWw6ICdDYXRlZ29yaWVzJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgbXVsdGlWYWx1ZTogdHJ1ZSxcbiAgICAgICAgICAgIGlucHV0VHlwZTogJ1NFTEVDVCcsXG4gICAgICAgICAgICBvcHRpb25zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ09wZW4nLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ09wZW4nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnUXVhbGlmeWluZycsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnUXVhbGlmeWluZydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdOZWdvdGlhdGluZycsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnTmVnb3RpYXRpbmcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnVFJJR0dFUicsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnVFJJR0dFUidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdvd25lcicsXG4gICAgICAgICAgICB0eXBlOiAnZW50aXR5JyxcbiAgICAgICAgICAgIGNvbmZpZGVudGlhbDogZmFsc2UsXG4gICAgICAgICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICAgICAgICBsYWJlbDogJ093bmVyJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlWYWx1ZTogZmFsc2UsXG4gICAgICAgICAgICBpbnB1dFR5cGU6ICdTRUxFQ1QnLFxuICAgICAgICAgICAgb3B0aW9uc1R5cGU6ICdDb3Jwb3JhdGVVc2VyJyxcbiAgICAgICAgICAgIG9wdGlvbnNVcmw6ICcvb3B0aW9ucy9Db3Jwb3JhdGVVc2VyJyxcbiAgICAgICAgICAgIGhpZGVGcm9tU2VhcmNoOiBmYWxzZSxcbiAgICAgICAgICAgIGFzc29jaWF0ZWRFbnRpdHk6IHtcbiAgICAgICAgICAgICAgICBlbnRpdHk6ICdDb3Jwb3JhdGVVc2VyJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NvcnBvcmF0ZSBVc2VyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnYWRkcmVzcycsXG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ0FkZHJlc3MnLFxuICAgICAgICAgICAgZGF0YVNwZWNpYWxpemF0aW9uOiAnU1lTVEVNJyxcbiAgICAgICAgICAgIGNvbmZpZGVudGlhbDogZmFsc2UsXG4gICAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgICAgIGxhYmVsOiAnQWRkcmVzcycsXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICAgICAgICBtdWx0aVZhbHVlOiBmYWxzZSxcbiAgICAgICAgICAgIGhpZGVGcm9tU2VhcmNoOiB0cnVlLFxuICAgICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnYWRkcmVzczEnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnU0NBTEFSJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdTdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg6IDQwLFxuICAgICAgICAgICAgICAgICAgICBjb25maWRlbnRpYWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdBZGRyZXNzeHh4JyxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpVmFsdWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRnJvbVNlYXJjaDogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2FkZHJlc3MyJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1NDQUxBUicsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnU3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoOiA0MCxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlkZW50aWFsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnQWRkcmVzcyAyJyxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpVmFsdWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRnJvbVNlYXJjaDogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2NpdHknLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnU0NBTEFSJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdTdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg6IDQwLFxuICAgICAgICAgICAgICAgICAgICBjb25maWRlbnRpYWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdDaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpVmFsdWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRnJvbVNlYXJjaDogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3N0YXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1NDQUxBUicsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnU3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoOiAzMCxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlkZW50aWFsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnU3RhdGUnLFxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlWYWx1ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0VHlwZTogJ1NFTEVDVCcsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNUeXBlOiAnU3RhdGVUZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1VybDogJ2h0dHA6Ly9vcHRpbXVzLWJhY2tlbmQuYmgtYm9zMi5idWxsaG9ybi5jb206ODE4MS9yZXN0LXNlcnZpY2VzLzFocy9vcHRpb25zL1N0YXRlVGV4dCcsXG4gICAgICAgICAgICAgICAgICAgIGhpZGVGcm9tU2VhcmNoOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnemlwJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1NDQUxBUicsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnU3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoOiAxNSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlkZW50aWFsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnWmlwJyxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpVmFsdWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRnJvbVNlYXJjaDogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2NvdW50cnlJRCcsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdTQ0FMQVInLFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0ludGVnZXInLFxuICAgICAgICAgICAgICAgICAgICBjb25maWRlbnRpYWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnQ291bnRyeScsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aVZhbHVlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRUeXBlOiAnU0VMRUNUJyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1R5cGU6ICdDb3VudHJ5JyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1VybDogJ2h0dHA6Ly9vcHRpbXVzLWJhY2tlbmQuYmgtYm9zMi5idWxsaG9ybi5jb206ODE4MS9yZXN0LXNlcnZpY2VzLzFocy9vcHRpb25zL0NvdW50cnknLFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IDIyNjAsXG4gICAgICAgICAgICAgICAgICAgIGhpZGVGcm9tU2VhcmNoOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnY291bnRyeUNvZGUnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnU0NBTEFSJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdTdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg6IDAsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdjb3VudHJ5TmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdTQ0FMQVInLFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ1N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgIG1heExlbmd0aDogMCxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWw6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdjaGVja2JveCcsXG4gICAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgICAgICAgbGFiZWw6ICdDaGVja2JveCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2NoZWNrbGlzdCcsXG4gICAgICAgICAgICB0eXBlOiAnY2hlY2tsaXN0JyxcbiAgICAgICAgICAgIGxhYmVsOiAnQ2hlY2tMaXN0JyxcbiAgICAgICAgICAgIG9wdGlvbnM6IFsnTW9ybmluZycsICdEYXknLCAnTmlnaHQnLCAnT3Zlcm5pZ2h0J10sXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnYWRkcmVzcycsXG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBsYWJlbDogJ0FkZHJlc3MnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2F0dGFjaG1lbnRzJyxcbiAgICAgICAgICAgIHR5cGU6ICdmaWxlJyxcbiAgICAgICAgICAgIGxhYmVsOiAnQXR0YWNobWVudHMnLFxuICAgICAgICAgICAgbXVsdGlWYWx1ZTogdHJ1ZSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgIH1cbiAgICBdXG59O1xuIl19

/***/ },
/* 376 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.HeaderDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	// Vendor
	
	
	var _core = __webpack_require__(2);
	
	var _HeaderDemo = __webpack_require__(495);
	
	var _HeaderDemo2 = _interopRequireDefault(_HeaderDemo);
	
	var _novoElements = __webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Headers <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/header">(source)</a></small></h1>\n    <p>Headers are used in Mainframe Record pages and some modals. </p>\n\n    <h2>Types</h2>\n\n    <h5>Record Header</h5>\n    <p>Record headers have details about the entity record and tabbed navigation.</p>\n    <div class="example header-demo">' + _HeaderDemo2.default + '</div>\n    <code-snippet [code]="HeaderDemoTpl"></code-snippet>\n</div>\n';
	
	var HeaderDemoComponent = exports.HeaderDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'header-demo',
	    template: template
	}), _dec(_class = function () {
	    function HeaderDemoComponent(toaster) {
	        _classCallCheck(this, HeaderDemoComponent);
	
	        this.toaster = toaster;
	        this.HeaderDemoTpl = _HeaderDemo2.default;
	        this.entity = 'company';
	        this.options = {
	            'title': 'Title',
	            'message': 'Some Message...',
	            'theme': 'ocean',
	            'icon': 'clipboard',
	            'position': 'growlTopRight'
	        };
	    }
	
	    _createClass(HeaderDemoComponent, [{
	        key: 'catchEv',
	        value: function catchEv(type, ev) {
	            // Set toast options
	            this.options = {
	                title: '' + type,
	                message: ev + ' fired...',
	                theme: 'ocean',
	                icon: '' + type,
	                position: 'growlTopRight'
	            };
	
	            // Fire toast
	            this.toaster.alert(this.options);
	        }
	    }]);
	
	    return HeaderDemoComponent;
	}()) || _class);
	Reflect.defineMetadata('design:paramtypes', [_novoElements.NovoToastService], HeaderDemoComponent);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvaGVhZGVyL0hlYWRlckRlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O2tCQUFBOztBQUVBOztBQUVBOzs7QUFIQTs7QUFFQTs7OztBQUVBOzs7Ozs7QUFFQSxJQUFNLDZoQkFBTjs7SUFrQmEsbUIsV0FBQSxtQixXQUpaLHFCQUFVO0FBQ1AsY0FBVSxhQURIO0FBRVAsY0FBVTtBQUZILENBQVYsQztBQUtHLGlDQUFZLE9BQVosRUFBc0M7QUFBQTs7QUFDbEMsYUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGFBQUssYUFBTDtBQUNBLGFBQUssTUFBTCxHQUFjLFNBQWQ7QUFDQSxhQUFLLE9BQUwsR0FBZTtBQUNYLHFCQUFTLE9BREU7QUFFWCx1QkFBVyxpQkFGQTtBQUdYLHFCQUFTLE9BSEU7QUFJWCxvQkFBUSxXQUpHO0FBS1gsd0JBQVk7QUFMRCxTQUFmO0FBT0g7Ozs7Z0NBRU8sSSxFQUFNLEUsRUFBSTtBQUNkO0FBQ0EsaUJBQUssT0FBTCxHQUFlO0FBQ1gsNEJBQVUsSUFEQztBQUVYLHlCQUFZLEVBQVosY0FGVztBQUdYLHVCQUFPLE9BSEk7QUFJWCwyQkFBUyxJQUpFO0FBS1gsMEJBQVU7QUFMQyxhQUFmOztBQVFBO0FBQ0EsaUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsS0FBSyxPQUF4QjtBQUNIOzs7Ozs4RUExQlEsbUIiLCJmaWxlIjoiSGVhZGVyRGVtby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdvZGkvbm92by1kZXYvbGlicy9ub3ZvLWVsZW1lbnRzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IEhlYWRlckRlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvSGVhZGVyRGVtby5odG1sJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgTm92b1RvYXN0U2VydmljZSB9IGZyb20gJy4vLi4vLi4vLi4vLi4vc3JjL25vdm8tZWxlbWVudHMnO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGBcbjxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICA8aDE+SGVhZGVycyA8c21hbGw+PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9idWxsaG9ybi9ub3ZvLWVsZW1lbnRzL2Jsb2IvbWFzdGVyL3NyYy9lbGVtZW50cy9oZWFkZXJcIj4oc291cmNlKTwvYT48L3NtYWxsPjwvaDE+XG4gICAgPHA+SGVhZGVycyBhcmUgdXNlZCBpbiBNYWluZnJhbWUgUmVjb3JkIHBhZ2VzIGFuZCBzb21lIG1vZGFscy4gPC9wPlxuXG4gICAgPGgyPlR5cGVzPC9oMj5cblxuICAgIDxoNT5SZWNvcmQgSGVhZGVyPC9oNT5cbiAgICA8cD5SZWNvcmQgaGVhZGVycyBoYXZlIGRldGFpbHMgYWJvdXQgdGhlIGVudGl0eSByZWNvcmQgYW5kIHRhYmJlZCBuYXZpZ2F0aW9uLjwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBoZWFkZXItZGVtb1wiPiR7SGVhZGVyRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIkhlYWRlckRlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cbjwvZGl2PlxuYDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdoZWFkZXItZGVtbycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlckRlbW9Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHRvYXN0ZXI6Tm92b1RvYXN0U2VydmljZSkge1xuICAgICAgICB0aGlzLnRvYXN0ZXIgPSB0b2FzdGVyO1xuICAgICAgICB0aGlzLkhlYWRlckRlbW9UcGwgPSBIZWFkZXJEZW1vVHBsO1xuICAgICAgICB0aGlzLmVudGl0eSA9ICdjb21wYW55JztcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgICAgJ3RpdGxlJzogJ1RpdGxlJyxcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1NvbWUgTWVzc2FnZS4uLicsXG4gICAgICAgICAgICAndGhlbWUnOiAnb2NlYW4nLFxuICAgICAgICAgICAgJ2ljb24nOiAnY2xpcGJvYXJkJyxcbiAgICAgICAgICAgICdwb3NpdGlvbic6ICdncm93bFRvcFJpZ2h0J1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNhdGNoRXYodHlwZSwgZXYpIHtcbiAgICAgICAgLy8gU2V0IHRvYXN0IG9wdGlvbnNcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgICAgdGl0bGU6IGAke3R5cGV9YCxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGAke2V2fSBmaXJlZC4uLmAsXG4gICAgICAgICAgICB0aGVtZTogJ29jZWFuJyxcbiAgICAgICAgICAgIGljb246IGAke3R5cGV9YCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnZ3Jvd2xUb3BSaWdodCdcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBGaXJlIHRvYXN0XG4gICAgICAgIHRoaXMudG9hc3Rlci5hbGVydCh0aGlzLm9wdGlvbnMpO1xuICAgIH1cbn1cbiJdfQ==

/***/ },
/* 377 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ListDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _ListDemo = __webpack_require__(496);
	
	var _ListDemo2 = _interopRequireDefault(_ListDemo);
	
	var _ThemedListDemo = __webpack_require__(497);
	
	var _ThemedListDemo2 = _interopRequireDefault(_ThemedListDemo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>List / Item <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/list">(source)</a></small></h1>\n    <p>Lists are used to display rows of information like entities or entity data\n    and appear on cards, our mobile app, and several other places across the Bullhorn platform.</p>\n\n    <h2>Basic Usage</h2>\n\n    <h5>Standard List</h5>\n    <p>This is an example of a standard list.</p>\n    <div class="example standard-list-demo">' + _ListDemo2.default + '</div>\n    <code-snippet [code]="ListDemoTpl"></code-snippet>\n\n    <h5>Themed List</h5>\n    <p>This is an example of a themed list.</p>\n    <div class="example themed-list-demo">' + _ThemedListDemo2.default + '</div>\n    <code-snippet [code]="ThemedListDemoTpl"></code-snippet>\n</div>\n';
	
	var ListDemoComponent = exports.ListDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'list-demo',
	    template: template
	}), _dec(_class = function () {
	    function ListDemoComponent() {
	        _classCallCheck(this, ListDemoComponent);
	
	        this.ListDemoTpl = _ListDemo2.default;
	        this.ThemedListDemoTpl = _ThemedListDemo2.default;
	
	        var ONE_HOUR = 60 * 60 * 1000;
	        /* ms */
	        var TWO_HOURS = ONE_HOUR * 2;
	        var THREE_HOURS = ONE_HOUR * 3;
	        var currentDate = new Date();
	
	        var oneHourAgo = currentDate.getTime() - ONE_HOUR;
	        var twoHoursAgo = currentDate.getTime() - TWO_HOURS;
	        var threeHoursAgo = currentDate.getTime() - THREE_HOURS;
	
	        /* "mockResponse[]" should represent a REST response with improperly formatted data.
	         /  The "buildItems()" function is taking this data object and massaging it
	         /  to build the list items appropriately via a new data object "pulseItems[]".
	         /  In page1.html you can see how the new object builds a list of items.
	         /  - @asibilia
	         */
	
	        var mockResponse = [{
	            type: 'opportunity',
	            dateCreated: oneHourAgo,
	            sentiment: {
	                rating: 'negative',
	                type: 'engagement',
	                comment: 'No emails in last 10 days'
	            },
	            user: {
	                firstName: 'Steph',
	                lastName: 'Curry',
	                company: 'Wells Fargo',
	                location: 'Golden State, CA'
	            }
	        }, {
	            type: 'opportunity',
	            dateCreated: twoHoursAgo,
	            sentiment: {
	                rating: 'negative',
	                type: 'probability',
	                comment: 'Now has low probability to close'
	            },
	            user: {
	                firstName: 'Lebron',
	                lastName: 'James',
	                company: 'Amazon',
	                location: 'Cleveland, OH'
	            }
	        }, {
	            type: 'company',
	            dateCreated: threeHoursAgo,
	            sentiment: {
	                rating: 'positive',
	                type: 'connection',
	                comment: 'New connection'
	            },
	            user: {
	                firstName: 'Derrick',
	                lastName: 'Rose',
	                company: 'Walmart',
	                location: 'Chicago, IL'
	            }
	        }];
	
	        this.pulseItems = [];
	
	        this.buildItems(mockResponse);
	    }
	
	    _createClass(ListDemoComponent, [{
	        key: 'buildItems',
	        value: function buildItems(resp) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = resp[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var obj = _step.value;
	
	                    var item = {};
	
	                    /*
	                     ||| This is the item structure to be pushed to pulseItems[] and used
	                     ||| to build the list & items.
	                     |
	                     |   item = {
	                     |       "name": '',
	                     |       "type": '',
	                     |       "icon": {
	                     |           "name": '',
	                     |           "sentiment": ''
	                     |       },
	                     |       "comment": '',
	                     |       "timeAgo": ''
	                     |    }
	                     |
	                     */
	
	                    item.name = obj.user.company;
	                    item.type = obj.type;
	                    item.icon = {};
	
	                    if (obj.sentiment.type === 'connection') {
	                        item.icon.name = 'bhi-add-o';
	                    }
	
	                    if (obj.sentiment.type === 'engagement') {
	                        item.icon.name = obj.sentiment.rating === 'positive' ? 'bhi-trending-up' : 'bhi-trending-down';
	                    }
	
	                    item.icon.sentiment = obj.sentiment.rating;
	                    item.comment = obj.sentiment.comment;
	                    item.timeAgo = obj.dateCreated;
	
	                    this.pulseItems.push(item);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }]);
	
	    return ListDemoComponent;
	}()) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvbGlzdC9MaXN0RGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7a0JBQUE7O0FBRUE7OztBQURBOztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSxnMUJBQU47O0lBd0JhLGlCLFdBQUEsaUIsV0FKWixxQkFBVTtBQUNQLGNBQVUsV0FESDtBQUVQLGNBQVU7QUFGSCxDQUFWLEM7QUFLRyxpQ0FBYztBQUFBOztBQUNWLGFBQUssV0FBTDtBQUNBLGFBQUssaUJBQUw7O0FBRUEsWUFBSSxXQUFXLEtBQUssRUFBTCxHQUFVLElBQXpCO0FBQ0E7QUFDQSxZQUFJLFlBQVksV0FBVyxDQUEzQjtBQUNBLFlBQUksY0FBYyxXQUFXLENBQTdCO0FBQ0EsWUFBSSxjQUFjLElBQUksSUFBSixFQUFsQjs7QUFFQSxZQUFJLGFBQWEsWUFBWSxPQUFaLEtBQXdCLFFBQXpDO0FBQ0EsWUFBSSxjQUFjLFlBQVksT0FBWixLQUF3QixTQUExQztBQUNBLFlBQUksZ0JBQWdCLFlBQVksT0FBWixLQUF3QixXQUE1Qzs7QUFFQTs7Ozs7OztBQU9BLFlBQUksZUFBZSxDQUFDO0FBQ2hCLGtCQUFNLGFBRFU7QUFFaEIseUJBQWEsVUFGRztBQUdoQix1QkFBVztBQUNQLHdCQUFRLFVBREQ7QUFFUCxzQkFBTSxZQUZDO0FBR1AseUJBQVM7QUFIRixhQUhLO0FBUWhCLGtCQUFNO0FBQ0YsMkJBQVcsT0FEVDtBQUVGLDBCQUFVLE9BRlI7QUFHRix5QkFBUyxhQUhQO0FBSUYsMEJBQVU7QUFKUjtBQVJVLFNBQUQsRUFjaEI7QUFDQyxrQkFBTSxhQURQO0FBRUMseUJBQWEsV0FGZDtBQUdDLHVCQUFXO0FBQ1Asd0JBQVEsVUFERDtBQUVQLHNCQUFNLGFBRkM7QUFHUCx5QkFBUztBQUhGLGFBSFo7QUFRQyxrQkFBTTtBQUNGLDJCQUFXLFFBRFQ7QUFFRiwwQkFBVSxPQUZSO0FBR0YseUJBQVMsUUFIUDtBQUlGLDBCQUFVO0FBSlI7QUFSUCxTQWRnQixFQTRCaEI7QUFDQyxrQkFBTSxTQURQO0FBRUMseUJBQWEsYUFGZDtBQUdDLHVCQUFXO0FBQ1Asd0JBQVEsVUFERDtBQUVQLHNCQUFNLFlBRkM7QUFHUCx5QkFBUztBQUhGLGFBSFo7QUFRQyxrQkFBTTtBQUNGLDJCQUFXLFNBRFQ7QUFFRiwwQkFBVSxNQUZSO0FBR0YseUJBQVMsU0FIUDtBQUlGLDBCQUFVO0FBSlI7QUFSUCxTQTVCZ0IsQ0FBbkI7O0FBNENBLGFBQUssVUFBTCxHQUFrQixFQUFsQjs7QUFFQSxhQUFLLFVBQUwsQ0FBZ0IsWUFBaEI7QUFDSDs7OzttQ0FFVSxJLEVBQU07QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDYixxQ0FBZ0IsSUFBaEIsOEhBQXNCO0FBQUEsd0JBQWIsR0FBYTs7QUFDbEIsd0JBQUksT0FBTyxFQUFYOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSx5QkFBSyxJQUFMLEdBQVksSUFBSSxJQUFKLENBQVMsT0FBckI7QUFDQSx5QkFBSyxJQUFMLEdBQVksSUFBSSxJQUFoQjtBQUNBLHlCQUFLLElBQUwsR0FBWSxFQUFaOztBQUVBLHdCQUFJLElBQUksU0FBSixDQUFjLElBQWQsS0FBdUIsWUFBM0IsRUFBeUM7QUFDckMsNkJBQUssSUFBTCxDQUFVLElBQVYsR0FBaUIsV0FBakI7QUFDSDs7QUFFRCx3QkFBSSxJQUFJLFNBQUosQ0FBYyxJQUFkLEtBQXVCLFlBQTNCLEVBQXlDO0FBQ3JDLDZCQUFLLElBQUwsQ0FBVSxJQUFWLEdBQWtCLElBQUksU0FBSixDQUFjLE1BQWQsS0FBeUIsVUFBMUIsR0FBd0MsaUJBQXhDLEdBQTRELG1CQUE3RTtBQUNIOztBQUVELHlCQUFLLElBQUwsQ0FBVSxTQUFWLEdBQXNCLElBQUksU0FBSixDQUFjLE1BQXBDO0FBQ0EseUJBQUssT0FBTCxHQUFlLElBQUksU0FBSixDQUFjLE9BQTdCO0FBQ0EseUJBQUssT0FBTCxHQUFlLElBQUksV0FBbkI7O0FBRUEseUJBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixJQUFyQjtBQUNIO0FBdENZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF1Q2hCIiwiZmlsZSI6Ikxpc3REZW1vLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ29kaS9ub3ZvLWRldi9saWJzL25vdm8tZWxlbWVudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgTGlzdERlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvTGlzdERlbW8uaHRtbCc7XG5pbXBvcnQgVGhlbWVkTGlzdERlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvVGhlbWVkTGlzdERlbW8uaHRtbCc7XG5cbmNvbnN0IHRlbXBsYXRlID0gYFxuPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxoMT5MaXN0IC8gSXRlbSA8c21hbGw+PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9idWxsaG9ybi9ub3ZvLWVsZW1lbnRzL2Jsb2IvbWFzdGVyL3NyYy9lbGVtZW50cy9saXN0XCI+KHNvdXJjZSk8L2E+PC9zbWFsbD48L2gxPlxuICAgIDxwPkxpc3RzIGFyZSB1c2VkIHRvIGRpc3BsYXkgcm93cyBvZiBpbmZvcm1hdGlvbiBsaWtlIGVudGl0aWVzIG9yIGVudGl0eSBkYXRhXG4gICAgYW5kIGFwcGVhciBvbiBjYXJkcywgb3VyIG1vYmlsZSBhcHAsIGFuZCBzZXZlcmFsIG90aGVyIHBsYWNlcyBhY3Jvc3MgdGhlIEJ1bGxob3JuIHBsYXRmb3JtLjwvcD5cblxuICAgIDxoMj5CYXNpYyBVc2FnZTwvaDI+XG5cbiAgICA8aDU+U3RhbmRhcmQgTGlzdDwvaDU+XG4gICAgPHA+VGhpcyBpcyBhbiBleGFtcGxlIG9mIGEgc3RhbmRhcmQgbGlzdC48L3A+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgc3RhbmRhcmQtbGlzdC1kZW1vXCI+JHtMaXN0RGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIkxpc3REZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG5cbiAgICA8aDU+VGhlbWVkIExpc3Q8L2g1PlxuICAgIDxwPlRoaXMgaXMgYW4gZXhhbXBsZSBvZiBhIHRoZW1lZCBsaXN0LjwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSB0aGVtZWQtbGlzdC1kZW1vXCI+JHtUaGVtZWRMaXN0RGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIlRoZW1lZExpc3REZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG48L2Rpdj5cbmA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbGlzdC1kZW1vJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbn0pXG5leHBvcnQgY2xhc3MgTGlzdERlbW9Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLkxpc3REZW1vVHBsID0gTGlzdERlbW9UcGw7XG4gICAgICAgIHRoaXMuVGhlbWVkTGlzdERlbW9UcGwgPSBUaGVtZWRMaXN0RGVtb1RwbDtcblxuICAgICAgICBsZXQgT05FX0hPVVIgPSA2MCAqIDYwICogMTAwMDtcbiAgICAgICAgLyogbXMgKi9cbiAgICAgICAgbGV0IFRXT19IT1VSUyA9IE9ORV9IT1VSICogMjtcbiAgICAgICAgbGV0IFRIUkVFX0hPVVJTID0gT05FX0hPVVIgKiAzO1xuICAgICAgICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIGxldCBvbmVIb3VyQWdvID0gY3VycmVudERhdGUuZ2V0VGltZSgpIC0gT05FX0hPVVI7XG4gICAgICAgIGxldCB0d29Ib3Vyc0FnbyA9IGN1cnJlbnREYXRlLmdldFRpbWUoKSAtIFRXT19IT1VSUztcbiAgICAgICAgbGV0IHRocmVlSG91cnNBZ28gPSBjdXJyZW50RGF0ZS5nZXRUaW1lKCkgLSBUSFJFRV9IT1VSUztcblxuICAgICAgICAvKiBcIm1vY2tSZXNwb25zZVtdXCIgc2hvdWxkIHJlcHJlc2VudCBhIFJFU1QgcmVzcG9uc2Ugd2l0aCBpbXByb3Blcmx5IGZvcm1hdHRlZCBkYXRhLlxuICAgICAgICAgLyAgVGhlIFwiYnVpbGRJdGVtcygpXCIgZnVuY3Rpb24gaXMgdGFraW5nIHRoaXMgZGF0YSBvYmplY3QgYW5kIG1hc3NhZ2luZyBpdFxuICAgICAgICAgLyAgdG8gYnVpbGQgdGhlIGxpc3QgaXRlbXMgYXBwcm9wcmlhdGVseSB2aWEgYSBuZXcgZGF0YSBvYmplY3QgXCJwdWxzZUl0ZW1zW11cIi5cbiAgICAgICAgIC8gIEluIHBhZ2UxLmh0bWwgeW91IGNhbiBzZWUgaG93IHRoZSBuZXcgb2JqZWN0IGJ1aWxkcyBhIGxpc3Qgb2YgaXRlbXMuXG4gICAgICAgICAvICAtIEBhc2liaWxpYVxuICAgICAgICAgKi9cblxuICAgICAgICBsZXQgbW9ja1Jlc3BvbnNlID0gW3tcbiAgICAgICAgICAgIHR5cGU6ICdvcHBvcnR1bml0eScsXG4gICAgICAgICAgICBkYXRlQ3JlYXRlZDogb25lSG91ckFnbyxcbiAgICAgICAgICAgIHNlbnRpbWVudDoge1xuICAgICAgICAgICAgICAgIHJhdGluZzogJ25lZ2F0aXZlJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZW5nYWdlbWVudCcsXG4gICAgICAgICAgICAgICAgY29tbWVudDogJ05vIGVtYWlscyBpbiBsYXN0IDEwIGRheXMnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogJ1N0ZXBoJyxcbiAgICAgICAgICAgICAgICBsYXN0TmFtZTogJ0N1cnJ5JyxcbiAgICAgICAgICAgICAgICBjb21wYW55OiAnV2VsbHMgRmFyZ28nLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnR29sZGVuIFN0YXRlLCBDQSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdHlwZTogJ29wcG9ydHVuaXR5JyxcbiAgICAgICAgICAgIGRhdGVDcmVhdGVkOiB0d29Ib3Vyc0FnbyxcbiAgICAgICAgICAgIHNlbnRpbWVudDoge1xuICAgICAgICAgICAgICAgIHJhdGluZzogJ25lZ2F0aXZlJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAncHJvYmFiaWxpdHknLFxuICAgICAgICAgICAgICAgIGNvbW1lbnQ6ICdOb3cgaGFzIGxvdyBwcm9iYWJpbGl0eSB0byBjbG9zZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgZmlyc3ROYW1lOiAnTGVicm9uJyxcbiAgICAgICAgICAgICAgICBsYXN0TmFtZTogJ0phbWVzJyxcbiAgICAgICAgICAgICAgICBjb21wYW55OiAnQW1hem9uJyxcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0NsZXZlbGFuZCwgT0gnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHR5cGU6ICdjb21wYW55JyxcbiAgICAgICAgICAgIGRhdGVDcmVhdGVkOiB0aHJlZUhvdXJzQWdvLFxuICAgICAgICAgICAgc2VudGltZW50OiB7XG4gICAgICAgICAgICAgICAgcmF0aW5nOiAncG9zaXRpdmUnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdjb25uZWN0aW9uJyxcbiAgICAgICAgICAgICAgICBjb21tZW50OiAnTmV3IGNvbm5lY3Rpb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogJ0RlcnJpY2snLFxuICAgICAgICAgICAgICAgIGxhc3ROYW1lOiAnUm9zZScsXG4gICAgICAgICAgICAgICAgY29tcGFueTogJ1dhbG1hcnQnLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnQ2hpY2FnbywgSUwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1dO1xuXG4gICAgICAgIHRoaXMucHVsc2VJdGVtcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuYnVpbGRJdGVtcyhtb2NrUmVzcG9uc2UpO1xuICAgIH1cblxuICAgIGJ1aWxkSXRlbXMocmVzcCkge1xuICAgICAgICBmb3IgKGxldCBvYmogb2YgcmVzcCkge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB7fTtcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICB8fHwgVGhpcyBpcyB0aGUgaXRlbSBzdHJ1Y3R1cmUgdG8gYmUgcHVzaGVkIHRvIHB1bHNlSXRlbXNbXSBhbmQgdXNlZFxuICAgICAgICAgICAgIHx8fCB0byBidWlsZCB0aGUgbGlzdCAmIGl0ZW1zLlxuICAgICAgICAgICAgIHxcbiAgICAgICAgICAgICB8ICAgaXRlbSA9IHtcbiAgICAgICAgICAgICB8ICAgICAgIFwibmFtZVwiOiAnJyxcbiAgICAgICAgICAgICB8ICAgICAgIFwidHlwZVwiOiAnJyxcbiAgICAgICAgICAgICB8ICAgICAgIFwiaWNvblwiOiB7XG4gICAgICAgICAgICAgfCAgICAgICAgICAgXCJuYW1lXCI6ICcnLFxuICAgICAgICAgICAgIHwgICAgICAgICAgIFwic2VudGltZW50XCI6ICcnXG4gICAgICAgICAgICAgfCAgICAgICB9LFxuICAgICAgICAgICAgIHwgICAgICAgXCJjb21tZW50XCI6ICcnLFxuICAgICAgICAgICAgIHwgICAgICAgXCJ0aW1lQWdvXCI6ICcnXG4gICAgICAgICAgICAgfCAgICB9XG4gICAgICAgICAgICAgfFxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIGl0ZW0ubmFtZSA9IG9iai51c2VyLmNvbXBhbnk7XG4gICAgICAgICAgICBpdGVtLnR5cGUgPSBvYmoudHlwZTtcbiAgICAgICAgICAgIGl0ZW0uaWNvbiA9IHt9O1xuXG4gICAgICAgICAgICBpZiAob2JqLnNlbnRpbWVudC50eXBlID09PSAnY29ubmVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmljb24ubmFtZSA9ICdiaGktYWRkLW8nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob2JqLnNlbnRpbWVudC50eXBlID09PSAnZW5nYWdlbWVudCcpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmljb24ubmFtZSA9IChvYmouc2VudGltZW50LnJhdGluZyA9PT0gJ3Bvc2l0aXZlJykgPyAnYmhpLXRyZW5kaW5nLXVwJyA6ICdiaGktdHJlbmRpbmctZG93bic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0uaWNvbi5zZW50aW1lbnQgPSBvYmouc2VudGltZW50LnJhdGluZztcbiAgICAgICAgICAgIGl0ZW0uY29tbWVudCA9IG9iai5zZW50aW1lbnQuY29tbWVudDtcbiAgICAgICAgICAgIGl0ZW0udGltZUFnbyA9IG9iai5kYXRlQ3JlYXRlZDtcblxuICAgICAgICAgICAgdGhpcy5wdWxzZUl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=

/***/ },
/* 378 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LoadingDemoComponent = undefined;
	
	var _dec, _class; // NG2
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _LoadingCircleDemo = __webpack_require__(498);
	
	var _LoadingCircleDemo2 = _interopRequireDefault(_LoadingCircleDemo);
	
	var _LoadingLineDemo = __webpack_require__(499);
	
	var _LoadingLineDemo2 = _interopRequireDefault(_LoadingLineDemo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Loading Animations <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/loading">(source)</a></small></h1>\n    <p>Loading animations are used to help indicate to the user that some sort of progress is taking place. These are especially helpful for intensive operations that might take extra time.</p>\n\n    <h2>Themes</h2>\n\n    <h5>Line</h5>\n    <p>The Dot Line animation is indeterminate.</p>\n    <div class="example loading-line-demo">' + _LoadingLineDemo2.default + '</div>\n    <code-snippet [code]="LoadingLineDemoTpl"></code-snippet>\n\n    <h5>Spinner</h5>\n    <p>\n        The Dot Spinner animation is used as an alternate to the loading line animation.\n    </p>\n    <div class="example loading-spinner-demo">' + _LoadingCircleDemo2.default + '</div>\n    <code-snippet [code]="LoadingCircleDemoTpl"></code-snippet>\n</div>\n';
	
	var LoadingDemoComponent = exports.LoadingDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'loading-demo',
	    template: template
	}), _dec(_class = function LoadingDemoComponent() {
	    _classCallCheck(this, LoadingDemoComponent);
	
	    this.LoadingCircleDemoTpl = _LoadingCircleDemo2.default;
	    this.LoadingLineDemoTpl = _LoadingLineDemo2.default;
	}) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvbG9hZGluZy9Mb2FkaW5nRGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O2tCQUFBOztBQUVBOzs7QUFEQTs7QUFFQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU0sdzZCQUFOOztJQXlCYSxvQixXQUFBLG9CLFdBSloscUJBQVU7QUFDUCxjQUFVLGNBREg7QUFFUCxjQUFVO0FBRkgsQ0FBVixDLGdCQUtHLGdDQUFjO0FBQUE7O0FBQ1YsU0FBSyxvQkFBTDtBQUNBLFNBQUssa0JBQUw7QUFDSCxDIiwiZmlsZSI6IkxvYWRpbmdEZW1vLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ29kaS9ub3ZvLWRldi9saWJzL25vdm8tZWxlbWVudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgTG9hZGluZ0NpcmNsZURlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvTG9hZGluZ0NpcmNsZURlbW8uaHRtbCc7XG5pbXBvcnQgTG9hZGluZ0xpbmVEZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL0xvYWRpbmdMaW5lRGVtby5odG1sJztcblxuY29uc3QgdGVtcGxhdGUgPSBgXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGgxPkxvYWRpbmcgQW5pbWF0aW9ucyA8c21hbGw+PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9idWxsaG9ybi9ub3ZvLWVsZW1lbnRzL2Jsb2IvbWFzdGVyL3NyYy9lbGVtZW50cy9sb2FkaW5nXCI+KHNvdXJjZSk8L2E+PC9zbWFsbD48L2gxPlxuICAgIDxwPkxvYWRpbmcgYW5pbWF0aW9ucyBhcmUgdXNlZCB0byBoZWxwIGluZGljYXRlIHRvIHRoZSB1c2VyIHRoYXQgc29tZSBzb3J0IG9mIHByb2dyZXNzIGlzIHRha2luZyBwbGFjZS4gVGhlc2UgYXJlIGVzcGVjaWFsbHkgaGVscGZ1bCBmb3IgaW50ZW5zaXZlIG9wZXJhdGlvbnMgdGhhdCBtaWdodCB0YWtlIGV4dHJhIHRpbWUuPC9wPlxuXG4gICAgPGgyPlRoZW1lczwvaDI+XG5cbiAgICA8aDU+TGluZTwvaDU+XG4gICAgPHA+VGhlIERvdCBMaW5lIGFuaW1hdGlvbiBpcyBpbmRldGVybWluYXRlLjwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBsb2FkaW5nLWxpbmUtZGVtb1wiPiR7TG9hZGluZ0xpbmVEZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiTG9hZGluZ0xpbmVEZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG5cbiAgICA8aDU+U3Bpbm5lcjwvaDU+XG4gICAgPHA+XG4gICAgICAgIFRoZSBEb3QgU3Bpbm5lciBhbmltYXRpb24gaXMgdXNlZCBhcyBhbiBhbHRlcm5hdGUgdG8gdGhlIGxvYWRpbmcgbGluZSBhbmltYXRpb24uXG4gICAgPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIGxvYWRpbmctc3Bpbm5lci1kZW1vXCI+JHtMb2FkaW5nQ2lyY2xlRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIkxvYWRpbmdDaXJjbGVEZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG48L2Rpdj5cbmA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbG9hZGluZy1kZW1vJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbn0pXG5leHBvcnQgY2xhc3MgTG9hZGluZ0RlbW9Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLkxvYWRpbmdDaXJjbGVEZW1vVHBsID0gTG9hZGluZ0NpcmNsZURlbW9UcGw7XG4gICAgICAgIHRoaXMuTG9hZGluZ0xpbmVEZW1vVHBsID0gTG9hZGluZ0xpbmVEZW1vVHBsO1xuICAgIH1cbn1cbiJdfQ==

/***/ },
/* 379 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MultiPickerDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _BasicMultiPickerDemo = __webpack_require__(506);
	
	var _BasicMultiPickerDemo2 = _interopRequireDefault(_BasicMultiPickerDemo);
	
	var _novoElements = __webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>MultiPicker <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/multi-picker">(source)</a></small></h1>\n    <p>The multipicker element (<code>multipicker</code>) represents a control that presents a menu of options of multiple types. The options\n    within are set by the <code>source</code> attribute. Options can be pre-selected for the user using the <code>ngModel</code>\n    attribute. Multipicker is the multi-category version of <code>chips</code></p>.\n\n    <br/>\n\n    <h5>Basic Examples</h5>\n    <p>\n        By clicking on the <code>multi-picker</code> element, the options list will be displayed.  Select any of the options\n        by clicking on the item in the list.  The value selected will be added to the list of selected values.\n    </p>\n    <div class="example chips-demo">' + _BasicMultiPickerDemo2.default + '</div>\n    <code-snippet [code]="BasicMultiPicker"></code-snippet>\n</div>\n';
	
	var MultiPickerDemoComponent = exports.MultiPickerDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'chips-demo',
	    template: template
	}), _dec(_class = function () {
	    function MultiPickerDemoComponent() {
	        _classCallCheck(this, MultiPickerDemoComponent);
	
	        this.BasicMultiPicker = _BasicMultiPickerDemo2.default;
	
	        this.placeholder = 'Select...';
	        this.value = { states: ['Alabama'], collaborators: [1, 2, 3, 4] };
	        this.types = ['states', 'collaborators'];
	
	        var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
	        var collaborators = [{
	            id: 1,
	            firstName: 'Brian',
	            lastName: 'Kimball'
	        }, {
	            id: 2,
	            firstName: 'Josh',
	            lastName: 'Godi'
	        }, {
	            id: 3,
	            firstName: 'Alec',
	            lastName: 'Sibilia'
	        }, {
	            id: 4,
	            firstName: 'Kameron',
	            lastName: 'Sween'
	        }];
	        this.static = {
	            options: [{ type: 'collaborators', data: collaborators, format: '$firstName $lastName', field: 'id' }, { type: 'states', data: states }],
	            resultsTemplate: _novoElements.ChecklistPickerResults
	        };
	        this.formatted = {
	            format: '$firstName $lastName',
	            options: collaborators
	        };
	    }
	
	    _createClass(MultiPickerDemoComponent, [{
	        key: 'onChanged',
	        value: function onChanged() {}
	    }]);
	
	    return MultiPickerDemoComponent;
	}()) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvbXVsdGktcGlja2VyL011bHRpUGlja2VyRGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7a0JBQUE7O0FBRUE7OztBQURBOztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0say9CQUFOOztJQXVCYSx3QixXQUFBLHdCLFdBSloscUJBQVU7QUFDUCxjQUFVLFlBREg7QUFFUCxjQUFVO0FBRkgsQ0FBVixDO0FBS0csd0NBQWM7QUFBQTs7QUFDVixhQUFLLGdCQUFMOztBQUVBLGFBQUssV0FBTCxHQUFtQixXQUFuQjtBQUNBLGFBQUssS0FBTCxHQUFhLEVBQUUsUUFBUSxDQUFDLFNBQUQsQ0FBVixFQUF1QixlQUFlLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUF0QyxFQUFiO0FBQ0EsYUFBSyxLQUFMLEdBQWEsQ0FBQyxRQUFELEVBQVcsZUFBWCxDQUFiOztBQUVBLFlBQUksU0FBUyxDQUFDLFNBQUQsRUFBWSxRQUFaLEVBQXNCLFNBQXRCLEVBQWlDLFVBQWpDLEVBQTZDLFlBQTdDLEVBQTJELFVBQTNELEVBQXVFLGFBQXZFLEVBQXNGLFVBQXRGLEVBQWtHLFNBQWxHLEVBQTZHLFNBQTdHLEVBQXdILFFBQXhILEVBQWtJLE9BQWxJLEVBQTJJLFVBQTNJLEVBQXVKLFNBQXZKLEVBQWtLLE1BQWxLLEVBQTBLLFFBQTFLLEVBQW9MLFVBQXBMLEVBQWdNLFdBQWhNLEVBQTZNLE9BQTdNLEVBQXNOLFVBQXROLEVBQWtPLGVBQWxPLEVBQW1QLFVBQW5QLEVBQStQLFdBQS9QLEVBQTRRLGFBQTVRLEVBQTJSLFVBQTNSLEVBQXVTLFNBQXZTLEVBQWtULFVBQWxULEVBQThULFFBQTlULEVBQXdVLGVBQXhVLEVBQXlWLFlBQXpWLEVBQXVXLFlBQXZXLEVBQXFYLFVBQXJYLEVBQWlZLGNBQWpZLEVBQWlaLGdCQUFqWixFQUFtYSxNQUFuYSxFQUEyYSxVQUEzYSxFQUF1YixRQUF2YixFQUFpYyxjQUFqYyxFQUFpZCxjQUFqZCxFQUFpZSxnQkFBamUsRUFBbWYsY0FBbmYsRUFBbWdCLFdBQW5nQixFQUFnaEIsT0FBaGhCLEVBQXloQixNQUF6aEIsRUFBaWlCLFNBQWppQixFQUE0aUIsVUFBNWlCLEVBQXdqQixZQUF4akIsRUFBc2tCLGVBQXRrQixFQUF1bEIsV0FBdmxCLEVBQW9tQixTQUFwbUIsQ0FBYjtBQUNBLFlBQUksZ0JBQWdCLENBQUM7QUFDakIsZ0JBQUksQ0FEYTtBQUVqQix1QkFBVyxPQUZNO0FBR2pCLHNCQUFVO0FBSE8sU0FBRCxFQUlqQjtBQUNDLGdCQUFJLENBREw7QUFFQyx1QkFBVyxNQUZaO0FBR0Msc0JBQVU7QUFIWCxTQUppQixFQVFqQjtBQUNDLGdCQUFJLENBREw7QUFFQyx1QkFBVyxNQUZaO0FBR0Msc0JBQVU7QUFIWCxTQVJpQixFQVlqQjtBQUNDLGdCQUFJLENBREw7QUFFQyx1QkFBVyxTQUZaO0FBR0Msc0JBQVU7QUFIWCxTQVppQixDQUFwQjtBQWlCQSxhQUFLLE1BQUwsR0FBYztBQUNWLHFCQUFTLENBQ0wsRUFBRSxNQUFNLGVBQVIsRUFBeUIsTUFBTSxhQUEvQixFQUE4QyxRQUFRLHNCQUF0RCxFQUE4RSxPQUFPLElBQXJGLEVBREssRUFFTCxFQUFFLE1BQU0sUUFBUixFQUFrQixNQUFNLE1BQXhCLEVBRkssQ0FEQztBQUtWO0FBTFUsU0FBZDtBQU9BLGFBQUssU0FBTCxHQUFpQjtBQUNiLG9CQUFRLHNCQURLO0FBRWIscUJBQVM7QUFGSSxTQUFqQjtBQUlIOzs7O29DQUNXLENBQ1giLCJmaWxlIjoiTXVsdGlQaWNrZXJEZW1vLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ29kaS9ub3ZvLWRldi9saWJzL25vdm8tZWxlbWVudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgQmFzaWNNdWx0aVBpY2tlciBmcm9tICcuL3RlbXBsYXRlcy9CYXNpY011bHRpUGlja2VyRGVtby5odG1sJztcbmltcG9ydCB7IENoZWNrbGlzdFBpY2tlclJlc3VsdHMgfSBmcm9tICcuLy4uLy4uLy4uLy4uL3NyYy9ub3ZvLWVsZW1lbnRzJztcblxuY29uc3QgdGVtcGxhdGUgPSBgXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGgxPk11bHRpUGlja2VyIDxzbWFsbD48YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2J1bGxob3JuL25vdm8tZWxlbWVudHMvYmxvYi9tYXN0ZXIvc3JjL2VsZW1lbnRzL211bHRpLXBpY2tlclwiPihzb3VyY2UpPC9hPjwvc21hbGw+PC9oMT5cbiAgICA8cD5UaGUgbXVsdGlwaWNrZXIgZWxlbWVudCAoPGNvZGU+bXVsdGlwaWNrZXI8L2NvZGU+KSByZXByZXNlbnRzIGEgY29udHJvbCB0aGF0IHByZXNlbnRzIGEgbWVudSBvZiBvcHRpb25zIG9mIG11bHRpcGxlIHR5cGVzLiBUaGUgb3B0aW9uc1xuICAgIHdpdGhpbiBhcmUgc2V0IGJ5IHRoZSA8Y29kZT5zb3VyY2U8L2NvZGU+IGF0dHJpYnV0ZS4gT3B0aW9ucyBjYW4gYmUgcHJlLXNlbGVjdGVkIGZvciB0aGUgdXNlciB1c2luZyB0aGUgPGNvZGU+bmdNb2RlbDwvY29kZT5cbiAgICBhdHRyaWJ1dGUuIE11bHRpcGlja2VyIGlzIHRoZSBtdWx0aS1jYXRlZ29yeSB2ZXJzaW9uIG9mIDxjb2RlPmNoaXBzPC9jb2RlPjwvcD4uXG5cbiAgICA8YnIvPlxuXG4gICAgPGg1PkJhc2ljIEV4YW1wbGVzPC9oNT5cbiAgICA8cD5cbiAgICAgICAgQnkgY2xpY2tpbmcgb24gdGhlIDxjb2RlPm11bHRpLXBpY2tlcjwvY29kZT4gZWxlbWVudCwgdGhlIG9wdGlvbnMgbGlzdCB3aWxsIGJlIGRpc3BsYXllZC4gIFNlbGVjdCBhbnkgb2YgdGhlIG9wdGlvbnNcbiAgICAgICAgYnkgY2xpY2tpbmcgb24gdGhlIGl0ZW0gaW4gdGhlIGxpc3QuICBUaGUgdmFsdWUgc2VsZWN0ZWQgd2lsbCBiZSBhZGRlZCB0byB0aGUgbGlzdCBvZiBzZWxlY3RlZCB2YWx1ZXMuXG4gICAgPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIGNoaXBzLWRlbW9cIj4ke0Jhc2ljTXVsdGlQaWNrZXJ9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJCYXNpY011bHRpUGlja2VyXCI+PC9jb2RlLXNuaXBwZXQ+XG48L2Rpdj5cbmA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2hpcHMtZGVtbycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpUGlja2VyRGVtb0NvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuQmFzaWNNdWx0aVBpY2tlciA9IEJhc2ljTXVsdGlQaWNrZXI7XG5cbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9ICdTZWxlY3QuLi4nO1xuICAgICAgICB0aGlzLnZhbHVlID0geyBzdGF0ZXM6IFsnQWxhYmFtYSddLCBjb2xsYWJvcmF0b3JzOiBbMSwgMiwgMywgNF0gfTtcbiAgICAgICAgdGhpcy50eXBlcyA9IFsnc3RhdGVzJywgJ2NvbGxhYm9yYXRvcnMnXTtcblxuICAgICAgICBsZXQgc3RhdGVzID0gWydBbGFiYW1hJywgJ0FsYXNrYScsICdBcml6b25hJywgJ0Fya2Fuc2FzJywgJ0NhbGlmb3JuaWEnLCAnQ29sb3JhZG8nLCAnQ29ubmVjdGljdXQnLCAnRGVsYXdhcmUnLCAnRmxvcmlkYScsICdHZW9yZ2lhJywgJ0hhd2FpaScsICdJZGFobycsICdJbGxpbm9pcycsICdJbmRpYW5hJywgJ0lvd2EnLCAnS2Fuc2FzJywgJ0tlbnR1Y2t5JywgJ0xvdWlzaWFuYScsICdNYWluZScsICdNYXJ5bGFuZCcsICdNYXNzYWNodXNldHRzJywgJ01pY2hpZ2FuJywgJ01pbm5lc290YScsICdNaXNzaXNzaXBwaScsICdNaXNzb3VyaScsICdNb250YW5hJywgJ05lYnJhc2thJywgJ05ldmFkYScsICdOZXcgSGFtcHNoaXJlJywgJ05ldyBKZXJzZXknLCAnTmV3IE1leGljbycsICdOZXcgWW9yaycsICdOb3J0aCBEYWtvdGEnLCAnTm9ydGggQ2Fyb2xpbmEnLCAnT2hpbycsICdPa2xhaG9tYScsICdPcmVnb24nLCAnUGVubnN5bHZhbmlhJywgJ1Job2RlIElzbGFuZCcsICdTb3V0aCBDYXJvbGluYScsICdTb3V0aCBEYWtvdGEnLCAnVGVubmVzc2VlJywgJ1RleGFzJywgJ1V0YWgnLCAnVmVybW9udCcsICdWaXJnaW5pYScsICdXYXNoaW5ndG9uJywgJ1dlc3QgVmlyZ2luaWEnLCAnV2lzY29uc2luJywgJ1d5b21pbmcnXTtcbiAgICAgICAgbGV0IGNvbGxhYm9yYXRvcnMgPSBbe1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICBmaXJzdE5hbWU6ICdCcmlhbicsXG4gICAgICAgICAgICBsYXN0TmFtZTogJ0tpbWJhbGwnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgZmlyc3ROYW1lOiAnSm9zaCcsXG4gICAgICAgICAgICBsYXN0TmFtZTogJ0dvZGknXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAzLFxuICAgICAgICAgICAgZmlyc3ROYW1lOiAnQWxlYycsXG4gICAgICAgICAgICBsYXN0TmFtZTogJ1NpYmlsaWEnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiA0LFxuICAgICAgICAgICAgZmlyc3ROYW1lOiAnS2FtZXJvbicsXG4gICAgICAgICAgICBsYXN0TmFtZTogJ1N3ZWVuJ1xuICAgICAgICB9XTtcbiAgICAgICAgdGhpcy5zdGF0aWMgPSB7XG4gICAgICAgICAgICBvcHRpb25zOiBbXG4gICAgICAgICAgICAgICAgeyB0eXBlOiAnY29sbGFib3JhdG9ycycsIGRhdGE6IGNvbGxhYm9yYXRvcnMsIGZvcm1hdDogJyRmaXJzdE5hbWUgJGxhc3ROYW1lJywgZmllbGQ6ICdpZCcgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6ICdzdGF0ZXMnLCBkYXRhOiBzdGF0ZXMgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlc3VsdHNUZW1wbGF0ZTogQ2hlY2tsaXN0UGlja2VyUmVzdWx0c1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZvcm1hdHRlZCA9IHtcbiAgICAgICAgICAgIGZvcm1hdDogJyRmaXJzdE5hbWUgJGxhc3ROYW1lJyxcbiAgICAgICAgICAgIG9wdGlvbnM6IGNvbGxhYm9yYXRvcnNcbiAgICAgICAgfTtcbiAgICB9XG4gICAgb25DaGFuZ2VkKCkge1xuICAgIH1cbn1cbiJdfQ==

/***/ },
/* 380 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.QuickNoteDemoComponent = exports.CustomQuickNoteResults = undefined;
	
	var _dec, _class, _dec2, _class2; // NG2
	
	// APP
	
	// Vendor
	
	
	var _core = __webpack_require__(2);
	
	var _BasicQuickNote = __webpack_require__(511);
	
	var _BasicQuickNote2 = _interopRequireDefault(_BasicQuickNote);
	
	var _CustomQuickNote = __webpack_require__(512);
	
	var _CustomQuickNote2 = _interopRequireDefault(_CustomQuickNote);
	
	var _CustomQuickNoteResults = __webpack_require__(513);
	
	var _CustomQuickNoteResults2 = _interopRequireDefault(_CustomQuickNoteResults);
	
	var _novoElements = __webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CustomQuickNoteResults = exports.CustomQuickNoteResults = (_dec = (0, _core.Component)({
	    selector: 'custom-quick-note-results',
	    host: {
	        'class': 'active quick-note-results'
	    },
	    template: '\n        <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>\n        <ul *ngIf="matches.length > 0">\n            <li\n                *ngFor="let match of matches"\n                (click)="selectMatch($event)"\n                [class.active]="match===activeMatch"\n                (mouseenter)="selectActive(match)">\n                **CUSTOM** <b [innerHtml]="highlight(match.label, term)"></b>\n            </li>\n        </ul>\n        <p class="picker-error" *ngIf="hasError">Oops! An error occured.</p>\n        <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">No results to display...</p>\n    '
	}), _dec(_class = function (_QuickNoteResults) {
	    _inherits(CustomQuickNoteResults, _QuickNoteResults);
	
	    function CustomQuickNoteResults() {
	        _classCallCheck(this, CustomQuickNoteResults);
	
	        return _possibleConstructorReturn(this, (CustomQuickNoteResults.__proto__ || Object.getPrototypeOf(CustomQuickNoteResults)).apply(this, arguments));
	    }
	
	    return CustomQuickNoteResults;
	}(_novoElements.QuickNoteResults)) || _class);
	
	
	var template = '\n<div class="container">\n    <h1>Quick Note <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/quick-note">(source)</a></small></h1>\n    <p>Tag Autocomplete</p>\n\n    <br/>\n\n    <h5>Basic Examples</h5>\n    <div class="example quick-note-demo">' + _BasicQuickNote2.default + '</div>\n    <code-snippet [code]="BasicQuickNoteDemoTpl"></code-snippet>\n    \n    <h5>Custom Triggers</h5>\n    <div class="example quick-note-demo">' + _CustomQuickNote2.default + '</div>\n    <code-snippet [code]="CustomQuickNoteDemoTpl"></code-snippet>\n    \n    <h5>Custom Results Template</h5>\n    <div class="example quick-note-demo">' + _CustomQuickNoteResults2.default + '</div>\n    <code-snippet [code]="CustomQuickNoteResultsDemoTpl"></code-snippet>\n</div>\n';
	
	var QuickNoteDemoComponent = exports.QuickNoteDemoComponent = (_dec2 = (0, _core.Component)({
	    selector: 'quick-note-demo',
	    template: template
	}), _dec2(_class2 = function QuickNoteDemoComponent() {
	    _classCallCheck(this, QuickNoteDemoComponent);
	
	    this.BasicQuickNoteDemoTpl = _BasicQuickNote2.default;
	    this.CustomQuickNoteDemoTpl = _CustomQuickNote2.default;
	    this.CustomQuickNoteResultsDemoTpl = _CustomQuickNoteResults2.default;
	
	    this.placeholder = 'Enter your note text here. Reference people and distribution lists using @ (eg. @John Smith). Reference other records using # (e.g. #Project Manager)';
	
	    var customData = {
	        tags: [{ id: 1, name: 'OH YA!', test: 'TWO' }, { id: 2, name: 'TAGGING!', test: 'ONE' }],
	        references: [{ id: 1, title: 'Awesome Reference' }, { id: 2, title: 'Angular2' }]
	    };
	
	    this.config = {
	        triggers: {
	            tags: '@',
	            references: '#',
	            boos: '^'
	        },
	        options: {
	            tags: ['First', 'Second'],
	            references: ['Third', 'Forth'],
	            boos: ['Test']
	        },
	        renderer: {
	            tags: function tags(symbol, item) {
	                return '<a class="tag">' + symbol + item.label + '</a>';
	            },
	            references: function references(symbol, item) {
	                return '<a class="tag">' + symbol + item.label + '</a>';
	            },
	            boos: function boos(symbol, item) {
	                return '<strong>' + symbol + item.label + '</strong>';
	            }
	        }
	    };
	    this.custom = {
	        triggers: {
	            whos: '@',
	            whats: '#'
	        },
	        options: {
	            whos: function whos() {
	                return new Promise(function (resolve) {
	                    setTimeout(function () {
	                        resolve(customData.tags);
	                    }, 300);
	                });
	            },
	            whats: function whats() {
	                return new Promise(function (resolve) {
	                    setTimeout(function () {
	                        resolve(customData.references);
	                    }, 300);
	                });
	            }
	        },
	        format: {
	            whos: '$name $test',
	            whats: '$title'
	        },
	        renderer: {
	            whos: function whos(symbol, item) {
	                return '<a class="WHOS">' + symbol + item.label + '</a>';
	            },
	            whats: function whats(symbol, item) {
	                return '<a class="tag">' + symbol + item.label + '</a>';
	            }
	        }
	    };
	    this.custom2 = {
	        resultsTemplate: CustomQuickNoteResults,
	        triggers: {
	            names: '@',
	            tags: '#'
	        },
	        options: {
	            names: function names() {
	                return new Promise(function (resolve) {
	                    setTimeout(function () {
	                        resolve(customData.tags);
	                    }, 300);
	                });
	            },
	            tags: function tags() {
	                return new Promise(function (resolve) {
	                    setTimeout(function () {
	                        resolve(customData.references);
	                    }, 300);
	                });
	            }
	        },
	        format: {
	            names: '$name',
	            tags: '$title'
	        },
	        renderer: {
	            names: function names(symbol, item) {
	                return '<a class="names">' + symbol + item.label + '</a>';
	            },
	            tags: function tags(symbol, item) {
	                return '<a class="tags">' + symbol + item.label + '</a>';
	            }
	        }
	    };
	}) || _class2);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvcXVpY2stbm90ZS9RdWlja05vdGVEZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7a0NBQUE7O0FBRUE7O0FBSUE7OztBQUxBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0lBc0JhLHNCLFdBQUEsc0IsV0FwQloscUJBQVU7QUFDUCxjQUFVLDJCQURIO0FBRVAsVUFBTTtBQUNGLGlCQUFTO0FBRFAsS0FGQztBQUtQO0FBTE8sQ0FBVixDOzs7Ozs7Ozs7Ozs7O0FBdUJELElBQU0saXpCQUFOOztJQXlCYSxzQixXQUFBLHNCLFlBSloscUJBQVU7QUFDUCxjQUFVLGlCQURIO0FBRVAsY0FBVTtBQUZILENBQVYsQyxrQkFLRyxrQ0FBYztBQUFBOztBQUNWLFNBQUsscUJBQUw7QUFDQSxTQUFLLHNCQUFMO0FBQ0EsU0FBSyw2QkFBTDs7QUFFQSxTQUFLLFdBQUwsR0FBbUIsdUpBQW5COztBQUVBLFFBQUksYUFBYTtBQUNiLGNBQU0sQ0FBQyxFQUFFLElBQUksQ0FBTixFQUFTLE1BQU0sUUFBZixFQUF5QixNQUFNLEtBQS9CLEVBQUQsRUFBeUMsRUFBRSxJQUFJLENBQU4sRUFBUyxNQUFNLFVBQWYsRUFBMkIsTUFBTSxLQUFqQyxFQUF6QyxDQURPO0FBRWIsb0JBQVksQ0FBQyxFQUFFLElBQUksQ0FBTixFQUFTLE9BQU8sbUJBQWhCLEVBQUQsRUFBd0MsRUFBRSxJQUFJLENBQU4sRUFBUyxPQUFPLFVBQWhCLEVBQXhDO0FBRkMsS0FBakI7O0FBS0EsU0FBSyxNQUFMLEdBQWM7QUFDVixrQkFBVTtBQUNOLGtCQUFNLEdBREE7QUFFTix3QkFBWSxHQUZOO0FBR04sa0JBQU07QUFIQSxTQURBO0FBTVYsaUJBQVM7QUFDTCxrQkFBTSxDQUFDLE9BQUQsRUFBVSxRQUFWLENBREQ7QUFFTCx3QkFBWSxDQUFDLE9BQUQsRUFBVSxPQUFWLENBRlA7QUFHTCxrQkFBTSxDQUFDLE1BQUQ7QUFIRCxTQU5DO0FBV1Ysa0JBQVU7QUFDTixrQkFBTSxjQUFDLE1BQUQsRUFBUyxJQUFULEVBQWtCO0FBQ3BCLDJDQUF5QixNQUF6QixHQUFrQyxLQUFLLEtBQXZDO0FBQ0gsYUFISztBQUlOLHdCQUFZLG9CQUFDLE1BQUQsRUFBUyxJQUFULEVBQWtCO0FBQzFCLDJDQUF5QixNQUF6QixHQUFrQyxLQUFLLEtBQXZDO0FBQ0gsYUFOSztBQU9OLGtCQUFNLGNBQUMsTUFBRCxFQUFTLElBQVQsRUFBa0I7QUFDcEIsb0NBQWtCLE1BQWxCLEdBQTJCLEtBQUssS0FBaEM7QUFDSDtBQVRLO0FBWEEsS0FBZDtBQXVCQSxTQUFLLE1BQUwsR0FBYztBQUNWLGtCQUFVO0FBQ04sa0JBQU0sR0FEQTtBQUVOLG1CQUFPO0FBRkQsU0FEQTtBQUtWLGlCQUFTO0FBQ0wsa0JBQU0sZ0JBQU07QUFDUix1QkFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBYTtBQUM1QiwrQkFBVyxZQUFNO0FBQ2IsZ0NBQVEsV0FBVyxJQUFuQjtBQUNILHFCQUZELEVBRUcsR0FGSDtBQUdILGlCQUpNLENBQVA7QUFLSCxhQVBJO0FBUUwsbUJBQU8saUJBQU07QUFDVCx1QkFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBYTtBQUM1QiwrQkFBVyxZQUFNO0FBQ2IsZ0NBQVEsV0FBVyxVQUFuQjtBQUNILHFCQUZELEVBRUcsR0FGSDtBQUdILGlCQUpNLENBQVA7QUFLSDtBQWRJLFNBTEM7QUFxQlYsZ0JBQVE7QUFDSixrQkFBTSxhQURGO0FBRUosbUJBQU87QUFGSCxTQXJCRTtBQXlCVixrQkFBVTtBQUNOLGtCQUFNLGNBQUMsTUFBRCxFQUFTLElBQVQsRUFBa0I7QUFDcEIsNENBQTBCLE1BQTFCLEdBQW1DLEtBQUssS0FBeEM7QUFDSCxhQUhLO0FBSU4sbUJBQU8sZUFBQyxNQUFELEVBQVMsSUFBVCxFQUFrQjtBQUNyQiwyQ0FBeUIsTUFBekIsR0FBa0MsS0FBSyxLQUF2QztBQUNIO0FBTks7QUF6QkEsS0FBZDtBQWtDQSxTQUFLLE9BQUwsR0FBZTtBQUNYLHlCQUFpQixzQkFETjtBQUVYLGtCQUFVO0FBQ04sbUJBQU8sR0FERDtBQUVOLGtCQUFNO0FBRkEsU0FGQztBQU1YLGlCQUFTO0FBQ0wsbUJBQU8saUJBQU07QUFDVCx1QkFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBYTtBQUM1QiwrQkFBVyxZQUFNO0FBQ2IsZ0NBQVEsV0FBVyxJQUFuQjtBQUNILHFCQUZELEVBRUcsR0FGSDtBQUdILGlCQUpNLENBQVA7QUFLSCxhQVBJO0FBUUwsa0JBQU0sZ0JBQU07QUFDUix1QkFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBYTtBQUM1QiwrQkFBVyxZQUFNO0FBQ2IsZ0NBQVEsV0FBVyxVQUFuQjtBQUNILHFCQUZELEVBRUcsR0FGSDtBQUdILGlCQUpNLENBQVA7QUFLSDtBQWRJLFNBTkU7QUFzQlgsZ0JBQVE7QUFDSixtQkFBTyxPQURIO0FBRUosa0JBQU07QUFGRixTQXRCRztBQTBCWCxrQkFBVTtBQUNOLG1CQUFPLGVBQUMsTUFBRCxFQUFTLElBQVQsRUFBa0I7QUFDckIsNkNBQTJCLE1BQTNCLEdBQW9DLEtBQUssS0FBekM7QUFDSCxhQUhLO0FBSU4sa0JBQU0sY0FBQyxNQUFELEVBQVMsSUFBVCxFQUFrQjtBQUNwQiw0Q0FBMEIsTUFBMUIsR0FBbUMsS0FBSyxLQUF4QztBQUNIO0FBTks7QUExQkMsS0FBZjtBQW1DSCxDIiwiZmlsZSI6IlF1aWNrTm90ZURlbW8uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pnb2RpL25vdm8tZGV2L2xpYnMvbm92by1lbGVtZW50cyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCBCYXNpY1F1aWNrTm90ZURlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvQmFzaWNRdWlja05vdGUuaHRtbCc7XG5pbXBvcnQgQ3VzdG9tUXVpY2tOb3RlRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9DdXN0b21RdWlja05vdGUuaHRtbCc7XG5pbXBvcnQgQ3VzdG9tUXVpY2tOb3RlUmVzdWx0c0RlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvQ3VzdG9tUXVpY2tOb3RlUmVzdWx0cy5odG1sJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgUXVpY2tOb3RlUmVzdWx0cyB9IGZyb20gJy4vLi4vLi4vLi4vLi4vc3JjL25vdm8tZWxlbWVudHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2N1c3RvbS1xdWljay1ub3RlLXJlc3VsdHMnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ2FjdGl2ZSBxdWljay1ub3RlLXJlc3VsdHMnXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bm92by1sb2FkaW5nIHRoZW1lPVwibGluZVwiICpuZ0lmPVwiaXNMb2FkaW5nICYmICFtYXRjaGVzLmxlbmd0aFwiPjwvbm92by1sb2FkaW5nPlxuICAgICAgICA8dWwgKm5nSWY9XCJtYXRjaGVzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBtYXRjaCBvZiBtYXRjaGVzXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0TWF0Y2goJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJtYXRjaD09PWFjdGl2ZU1hdGNoXCJcbiAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJzZWxlY3RBY3RpdmUobWF0Y2gpXCI+XG4gICAgICAgICAgICAgICAgKipDVVNUT00qKiA8YiBbaW5uZXJIdG1sXT1cImhpZ2hsaWdodChtYXRjaC5sYWJlbCwgdGVybSlcIj48L2I+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgICA8cCBjbGFzcz1cInBpY2tlci1lcnJvclwiICpuZ0lmPVwiaGFzRXJyb3JcIj5Pb3BzISBBbiBlcnJvciBvY2N1cmVkLjwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJwaWNrZXItbnVsbFwiICpuZ0lmPVwiIWlzTG9hZGluZyAmJiAhbWF0Y2hlcy5sZW5ndGggJiYgIWhhc0Vycm9yXCI+Tm8gcmVzdWx0cyB0byBkaXNwbGF5Li4uPC9wPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tUXVpY2tOb3RlUmVzdWx0cyBleHRlbmRzIFF1aWNrTm90ZVJlc3VsdHMge1xufVxuXG5jb25zdCB0ZW1wbGF0ZSA9IGBcbjxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICA8aDE+UXVpY2sgTm90ZSA8c21hbGw+PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9idWxsaG9ybi9ub3ZvLWVsZW1lbnRzL2Jsb2IvbWFzdGVyL3NyYy9lbGVtZW50cy9xdWljay1ub3RlXCI+KHNvdXJjZSk8L2E+PC9zbWFsbD48L2gxPlxuICAgIDxwPlRhZyBBdXRvY29tcGxldGU8L3A+XG5cbiAgICA8YnIvPlxuXG4gICAgPGg1PkJhc2ljIEV4YW1wbGVzPC9oNT5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBxdWljay1ub3RlLWRlbW9cIj4ke0Jhc2ljUXVpY2tOb3RlRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIkJhc2ljUXVpY2tOb3RlRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuICAgIFxuICAgIDxoNT5DdXN0b20gVHJpZ2dlcnM8L2g1PlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIHF1aWNrLW5vdGUtZGVtb1wiPiR7Q3VzdG9tUXVpY2tOb3RlRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIkN1c3RvbVF1aWNrTm90ZURlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cbiAgICBcbiAgICA8aDU+Q3VzdG9tIFJlc3VsdHMgVGVtcGxhdGU8L2g1PlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIHF1aWNrLW5vdGUtZGVtb1wiPiR7Q3VzdG9tUXVpY2tOb3RlUmVzdWx0c0RlbW9UcGx9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJDdXN0b21RdWlja05vdGVSZXN1bHRzRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuPC9kaXY+XG5gO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3F1aWNrLW5vdGUtZGVtbycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG59KVxuZXhwb3J0IGNsYXNzIFF1aWNrTm90ZURlbW9Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLkJhc2ljUXVpY2tOb3RlRGVtb1RwbCA9IEJhc2ljUXVpY2tOb3RlRGVtb1RwbDtcbiAgICAgICAgdGhpcy5DdXN0b21RdWlja05vdGVEZW1vVHBsID0gQ3VzdG9tUXVpY2tOb3RlRGVtb1RwbDtcbiAgICAgICAgdGhpcy5DdXN0b21RdWlja05vdGVSZXN1bHRzRGVtb1RwbCA9IEN1c3RvbVF1aWNrTm90ZVJlc3VsdHNEZW1vVHBsO1xuXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSAnRW50ZXIgeW91ciBub3RlIHRleHQgaGVyZS4gUmVmZXJlbmNlIHBlb3BsZSBhbmQgZGlzdHJpYnV0aW9uIGxpc3RzIHVzaW5nIEAgKGVnLiBASm9obiBTbWl0aCkuIFJlZmVyZW5jZSBvdGhlciByZWNvcmRzIHVzaW5nICMgKGUuZy4gI1Byb2plY3QgTWFuYWdlciknO1xuXG4gICAgICAgIGxldCBjdXN0b21EYXRhID0ge1xuICAgICAgICAgICAgdGFnczogW3sgaWQ6IDEsIG5hbWU6ICdPSCBZQSEnLCB0ZXN0OiAnVFdPJyB9LCB7IGlkOiAyLCBuYW1lOiAnVEFHR0lORyEnLCB0ZXN0OiAnT05FJyB9XSxcbiAgICAgICAgICAgIHJlZmVyZW5jZXM6IFt7IGlkOiAxLCB0aXRsZTogJ0F3ZXNvbWUgUmVmZXJlbmNlJyB9LCB7IGlkOiAyLCB0aXRsZTogJ0FuZ3VsYXIyJyB9XVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgICAgICAgdHJpZ2dlcnM6IHtcbiAgICAgICAgICAgICAgICB0YWdzOiAnQCcsXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlczogJyMnLFxuICAgICAgICAgICAgICAgIGJvb3M6ICdeJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICB0YWdzOiBbJ0ZpcnN0JywgJ1NlY29uZCddLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jZXM6IFsnVGhpcmQnLCAnRm9ydGgnXSxcbiAgICAgICAgICAgICAgICBib29zOiBbJ1Rlc3QnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbmRlcmVyOiB7XG4gICAgICAgICAgICAgICAgdGFnczogKHN5bWJvbCwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxhIGNsYXNzPVwidGFnXCI+JHtzeW1ib2x9JHtpdGVtLmxhYmVsfTwvYT5gO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlczogKHN5bWJvbCwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxhIGNsYXNzPVwidGFnXCI+JHtzeW1ib2x9JHtpdGVtLmxhYmVsfTwvYT5gO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9vczogKHN5bWJvbCwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxzdHJvbmc+JHtzeW1ib2x9JHtpdGVtLmxhYmVsfTwvc3Ryb25nPmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmN1c3RvbSA9IHtcbiAgICAgICAgICAgIHRyaWdnZXJzOiB7XG4gICAgICAgICAgICAgICAgd2hvczogJ0AnLFxuICAgICAgICAgICAgICAgIHdoYXRzOiAnIydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgd2hvczogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY3VzdG9tRGF0YS50YWdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgd2hhdHM6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGN1c3RvbURhdGEucmVmZXJlbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybWF0OiB7XG4gICAgICAgICAgICAgICAgd2hvczogJyRuYW1lICR0ZXN0JyxcbiAgICAgICAgICAgICAgICB3aGF0czogJyR0aXRsZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW5kZXJlcjoge1xuICAgICAgICAgICAgICAgIHdob3M6IChzeW1ib2wsIGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8YSBjbGFzcz1cIldIT1NcIj4ke3N5bWJvbH0ke2l0ZW0ubGFiZWx9PC9hPmA7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3aGF0czogKHN5bWJvbCwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxhIGNsYXNzPVwidGFnXCI+JHtzeW1ib2x9JHtpdGVtLmxhYmVsfTwvYT5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jdXN0b20yID0ge1xuICAgICAgICAgICAgcmVzdWx0c1RlbXBsYXRlOiBDdXN0b21RdWlja05vdGVSZXN1bHRzLFxuICAgICAgICAgICAgdHJpZ2dlcnM6IHtcbiAgICAgICAgICAgICAgICBuYW1lczogJ0AnLFxuICAgICAgICAgICAgICAgIHRhZ3M6ICcjJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBuYW1lczogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY3VzdG9tRGF0YS50YWdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGFnczogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY3VzdG9tRGF0YS5yZWZlcmVuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtYXQ6IHtcbiAgICAgICAgICAgICAgICBuYW1lczogJyRuYW1lJyxcbiAgICAgICAgICAgICAgICB0YWdzOiAnJHRpdGxlJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbmRlcmVyOiB7XG4gICAgICAgICAgICAgICAgbmFtZXM6IChzeW1ib2wsIGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8YSBjbGFzcz1cIm5hbWVzXCI+JHtzeW1ib2x9JHtpdGVtLmxhYmVsfTwvYT5gO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGFnczogKHN5bWJvbCwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxhIGNsYXNzPVwidGFnc1wiPiR7c3ltYm9sfSR7aXRlbS5sYWJlbH08L2E+YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufVxuIl19

/***/ },
/* 381 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RadioDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _BasicRadio = __webpack_require__(514);
	
	var _BasicRadio2 = _interopRequireDefault(_BasicRadio);
	
	var _VerticalRadio = __webpack_require__(515);
	
	var _VerticalRadio2 = _interopRequireDefault(_VerticalRadio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Radio <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/radio">(source)</a></small></h1>\n    <p>A radio group</p>\n   \n    <h5>Basic</h5>\n    <div class="example radio-demo">' + _BasicRadio2.default + '</div>\n    <code-snippet [code]="BasicRadioTpl"></code-snippet>\n    \n    <h5>Vertical</h5>\n    <div class="example radio-demo">' + _VerticalRadio2.default + '</div>\n    <code-snippet [code]="VerticalRadioTpl"></code-snippet>\n</div>\n';
	
	var RadioDemoComponent = exports.RadioDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'radio-demo',
	    template: template
	}), _dec(_class = function () {
	    function RadioDemoComponent() {
	        _classCallCheck(this, RadioDemoComponent);
	
	        this.BasicRadioTpl = _BasicRadio2.default;
	        this.VerticalRadioTpl = _VerticalRadio2.default;
	    }
	
	    _createClass(RadioDemoComponent, [{
	        key: 'onChangeVertical',
	        value: function onChangeVertical(change) {
	            console.log('Vertical Radio Change:', change); // eslint-disable-line
	        }
	    }, {
	        key: 'onChangeBasic',
	        value: function onChangeBasic(change) {
	            console.log('Basic Radio Change:', change); // eslint-disable-line
	        }
	    }]);
	
	    return RadioDemoComponent;
	}()) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvcmFkaW8vUmFkaW9EZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztrQkFBQTs7QUFFQTs7O0FBREE7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNLDZoQkFBTjs7SUFtQmEsa0IsV0FBQSxrQixXQUpaLHFCQUFVO0FBQ1AsY0FBVSxZQURIO0FBRVAsY0FBVTtBQUZILENBQVYsQztBQUtHLGtDQUFjO0FBQUE7O0FBQ1YsYUFBSyxhQUFMO0FBQ0EsYUFBSyxnQkFBTDtBQUNIOzs7O3lDQUVnQixNLEVBQVE7QUFDckIsb0JBQVEsR0FBUixDQUFZLHdCQUFaLEVBQXNDLE1BQXRDLEVBRHFCLENBQzBCO0FBQ2xEOzs7c0NBRWEsTSxFQUFRO0FBQ2xCLG9CQUFRLEdBQVIsQ0FBWSxxQkFBWixFQUFtQyxNQUFuQyxFQURrQixDQUMwQjtBQUMvQyIsImZpbGUiOiJSYWRpb0RlbW8uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pnb2RpL25vdm8tZGV2L2xpYnMvbm92by1lbGVtZW50cyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCBCYXNpY1JhZGlvVHBsIGZyb20gJy4vdGVtcGxhdGVzL0Jhc2ljUmFkaW8uaHRtbCc7XG5pbXBvcnQgVmVydGljYWxSYWRpb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9WZXJ0aWNhbFJhZGlvLmh0bWwnO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGBcbjxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICA8aDE+UmFkaW8gPHNtYWxsPjxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYnVsbGhvcm4vbm92by1lbGVtZW50cy9ibG9iL21hc3Rlci9zcmMvZWxlbWVudHMvcmFkaW9cIj4oc291cmNlKTwvYT48L3NtYWxsPjwvaDE+XG4gICAgPHA+QSByYWRpbyBncm91cDwvcD5cbiAgIFxuICAgIDxoNT5CYXNpYzwvaDU+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgcmFkaW8tZGVtb1wiPiR7QmFzaWNSYWRpb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIkJhc2ljUmFkaW9UcGxcIj48L2NvZGUtc25pcHBldD5cbiAgICBcbiAgICA8aDU+VmVydGljYWw8L2g1PlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIHJhZGlvLWRlbW9cIj4ke1ZlcnRpY2FsUmFkaW9UcGx9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJWZXJ0aWNhbFJhZGlvVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG48L2Rpdj5cbmA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncmFkaW8tZGVtbycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG59KVxuZXhwb3J0IGNsYXNzIFJhZGlvRGVtb0NvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuQmFzaWNSYWRpb1RwbCA9IEJhc2ljUmFkaW9UcGw7XG4gICAgICAgIHRoaXMuVmVydGljYWxSYWRpb1RwbCA9IFZlcnRpY2FsUmFkaW9UcGw7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VWZXJ0aWNhbChjaGFuZ2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1ZlcnRpY2FsIFJhZGlvIENoYW5nZTonLCBjaGFuZ2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfVxuXG4gICAgb25DaGFuZ2VCYXNpYyhjaGFuZ2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Jhc2ljIFJhZGlvIENoYW5nZTonLCBjaGFuZ2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfVxufVxuIl19

/***/ },
/* 382 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SelectDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _BasicSelectDemo = __webpack_require__(516);
	
	var _BasicSelectDemo2 = _interopRequireDefault(_BasicSelectDemo);
	
	var _LongSelectDemo = __webpack_require__(517);
	
	var _LongSelectDemo2 = _interopRequireDefault(_LongSelectDemo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Select <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/select">(source)</a></small></h1>\n    <p>The select element (<code>novo-select</code>) represents a control that presents a menu of options. The options\n    within are set by the <code>items</code> attribute. Options can be pre-selected for the user using the <code>value</code>\n    attribute.</p>\n    \n    <br/>\n\n    <h5>Basic Examples</h5>\n    <p>\n        By clicking on the <code>novo-select</code> element, the options list will be displayed.  Select any of the options\n        by clicking on the item in the list.  The value selected will be displayed and the options list will be removed.\n    </p>\n    <div class="example select-demo">' + _BasicSelectDemo2.default + '</div>\n    <code-snippet [code]="BasicSelectDemoTpl"></code-snippet>\n\n    <h5>Lots of Options</h5>\n    <p>\n        The most common need for the <code>select</code> component is when there are too many options that would fit on\n        on the screen. The options list will display appropriately and scroll as needed.\n    </p>\n    <div class="example select-demo">' + _LongSelectDemo2.default + '</div>\n    <code-snippet [code]="LongSelectDemoTpl"></code-snippet>\n\n</div>\n';
	
	var SelectDemoComponent = exports.SelectDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'select-demo',
	    template: template
	}), _dec(_class = function () {
	    function SelectDemoComponent() {
	        _classCallCheck(this, SelectDemoComponent);
	
	        this.BasicSelectDemoTpl = _BasicSelectDemo2.default;
	        this.LongSelectDemoTpl = _LongSelectDemo2.default;
	        this.placeholder = 'Select...';
	        this.options = ['Alpha', 'Bravo', 'Charlie'];
	        this.withNumbers = [{ label: 'One', value: 1 }, { label: 'Two', value: 2 }, { label: 'Zero', value: 0 }];
	        this.withNumbersValue = 0;
	        this.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
	        this.value = 'Bravo';
	        this.state = null;
	        this.headerConfig = {
	            label: 'Add New Item',
	            placeholder: 'Enter item here',
	            onSave: this.create.bind(this)
	        };
	    }
	
	    _createClass(SelectDemoComponent, [{
	        key: 'create',
	        value: function create(opt) {
	            this.options = [].concat(_toConsumableArray(this.options), [opt]);
	        }
	    }]);
	
	    return SelectDemoComponent;
	}()) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvc2VsZWN0L1NlbGVjdERlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O2tCQUFBOztBQUVBOzs7QUFEQTs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7O0FBR0EsSUFBTSwweUNBQU47O0lBZ0NhLG1CLFdBQUEsbUIsV0FKWixxQkFBVTtBQUNQLGNBQVUsYUFESDtBQUVQLGNBQVU7QUFGSCxDQUFWLEM7QUFLRyxtQ0FBYztBQUFBOztBQUNWLGFBQUssa0JBQUw7QUFDQSxhQUFLLGlCQUFMO0FBQ0EsYUFBSyxXQUFMLEdBQW1CLFdBQW5CO0FBQ0EsYUFBSyxPQUFMLEdBQWUsQ0FBQyxPQUFELEVBQVUsT0FBVixFQUFtQixTQUFuQixDQUFmO0FBQ0EsYUFBSyxXQUFMLEdBQW1CLENBQ2YsRUFBRSxPQUFPLEtBQVQsRUFBZ0IsT0FBTyxDQUF2QixFQURlLEVBRWYsRUFBRSxPQUFPLEtBQVQsRUFBZ0IsT0FBTyxDQUF2QixFQUZlLEVBR2YsRUFBRSxPQUFPLE1BQVQsRUFBaUIsT0FBTyxDQUF4QixFQUhlLENBQW5CO0FBS0EsYUFBSyxnQkFBTCxHQUF3QixDQUF4QjtBQUNBLGFBQUssTUFBTCxHQUFjLENBQUMsU0FBRCxFQUFZLFFBQVosRUFBc0IsU0FBdEIsRUFBaUMsVUFBakMsRUFBNkMsWUFBN0MsRUFBMkQsVUFBM0QsRUFBdUUsYUFBdkUsRUFBc0YsVUFBdEYsRUFBa0csU0FBbEcsRUFBNkcsU0FBN0csRUFBd0gsUUFBeEgsRUFBa0ksT0FBbEksRUFBMkksVUFBM0ksRUFBdUosU0FBdkosRUFBa0ssTUFBbEssRUFBMEssUUFBMUssRUFBb0wsVUFBcEwsRUFBZ00sV0FBaE0sRUFBNk0sT0FBN00sRUFBc04sVUFBdE4sRUFBa08sZUFBbE8sRUFBbVAsVUFBblAsRUFBK1AsV0FBL1AsRUFBNFEsYUFBNVEsRUFBMlIsVUFBM1IsRUFBdVMsU0FBdlMsRUFBa1QsVUFBbFQsRUFBOFQsUUFBOVQsRUFBd1UsZUFBeFUsRUFBeVYsWUFBelYsRUFBdVcsWUFBdlcsRUFBcVgsVUFBclgsRUFBaVksY0FBalksRUFBaVosZ0JBQWpaLEVBQW1hLE1BQW5hLEVBQTJhLFVBQTNhLEVBQXViLFFBQXZiLEVBQWljLGNBQWpjLEVBQWlkLGNBQWpkLEVBQWllLGdCQUFqZSxFQUFtZixjQUFuZixFQUFtZ0IsV0FBbmdCLEVBQWdoQixPQUFoaEIsRUFBeWhCLE1BQXpoQixFQUFpaUIsU0FBamlCLEVBQTRpQixVQUE1aUIsRUFBd2pCLFlBQXhqQixFQUFza0IsZUFBdGtCLEVBQXVsQixXQUF2bEIsRUFBb21CLFNBQXBtQixDQUFkO0FBQ0EsYUFBSyxLQUFMLEdBQWEsT0FBYjtBQUNBLGFBQUssS0FBTCxHQUFhLElBQWI7QUFDQSxhQUFLLFlBQUwsR0FBb0I7QUFDaEIsbUJBQU8sY0FEUztBQUVoQix5QkFBYSxpQkFGRztBQUdoQixvQkFBUSxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCO0FBSFEsU0FBcEI7QUFLSDs7OzsrQkFFTSxHLEVBQUs7QUFDUixpQkFBSyxPQUFMLGdDQUFtQixLQUFLLE9BQXhCLElBQWlDLEdBQWpDO0FBQ0giLCJmaWxlIjoiU2VsZWN0RGVtby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdvZGkvbm92by1kZXYvbGlicy9ub3ZvLWVsZW1lbnRzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IEJhc2ljU2VsZWN0RGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9CYXNpY1NlbGVjdERlbW8uaHRtbCc7XG5pbXBvcnQgTG9uZ1NlbGVjdERlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvTG9uZ1NlbGVjdERlbW8uaHRtbCc7XG5cblxuY29uc3QgdGVtcGxhdGUgPSBgXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGgxPlNlbGVjdCA8c21hbGw+PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9idWxsaG9ybi9ub3ZvLWVsZW1lbnRzL2Jsb2IvbWFzdGVyL3NyYy9lbGVtZW50cy9zZWxlY3RcIj4oc291cmNlKTwvYT48L3NtYWxsPjwvaDE+XG4gICAgPHA+VGhlIHNlbGVjdCBlbGVtZW50ICg8Y29kZT5ub3ZvLXNlbGVjdDwvY29kZT4pIHJlcHJlc2VudHMgYSBjb250cm9sIHRoYXQgcHJlc2VudHMgYSBtZW51IG9mIG9wdGlvbnMuIFRoZSBvcHRpb25zXG4gICAgd2l0aGluIGFyZSBzZXQgYnkgdGhlIDxjb2RlPml0ZW1zPC9jb2RlPiBhdHRyaWJ1dGUuIE9wdGlvbnMgY2FuIGJlIHByZS1zZWxlY3RlZCBmb3IgdGhlIHVzZXIgdXNpbmcgdGhlIDxjb2RlPnZhbHVlPC9jb2RlPlxuICAgIGF0dHJpYnV0ZS48L3A+XG4gICAgXG4gICAgPGJyLz5cblxuICAgIDxoNT5CYXNpYyBFeGFtcGxlczwvaDU+XG4gICAgPHA+XG4gICAgICAgIEJ5IGNsaWNraW5nIG9uIHRoZSA8Y29kZT5ub3ZvLXNlbGVjdDwvY29kZT4gZWxlbWVudCwgdGhlIG9wdGlvbnMgbGlzdCB3aWxsIGJlIGRpc3BsYXllZC4gIFNlbGVjdCBhbnkgb2YgdGhlIG9wdGlvbnNcbiAgICAgICAgYnkgY2xpY2tpbmcgb24gdGhlIGl0ZW0gaW4gdGhlIGxpc3QuICBUaGUgdmFsdWUgc2VsZWN0ZWQgd2lsbCBiZSBkaXNwbGF5ZWQgYW5kIHRoZSBvcHRpb25zIGxpc3Qgd2lsbCBiZSByZW1vdmVkLlxuICAgIDwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBzZWxlY3QtZGVtb1wiPiR7QmFzaWNTZWxlY3REZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiQmFzaWNTZWxlY3REZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG5cbiAgICA8aDU+TG90cyBvZiBPcHRpb25zPC9oNT5cbiAgICA8cD5cbiAgICAgICAgVGhlIG1vc3QgY29tbW9uIG5lZWQgZm9yIHRoZSA8Y29kZT5zZWxlY3Q8L2NvZGU+IGNvbXBvbmVudCBpcyB3aGVuIHRoZXJlIGFyZSB0b28gbWFueSBvcHRpb25zIHRoYXQgd291bGQgZml0IG9uXG4gICAgICAgIG9uIHRoZSBzY3JlZW4uIFRoZSBvcHRpb25zIGxpc3Qgd2lsbCBkaXNwbGF5IGFwcHJvcHJpYXRlbHkgYW5kIHNjcm9sbCBhcyBuZWVkZWQuXG4gICAgPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIHNlbGVjdC1kZW1vXCI+JHtMb25nU2VsZWN0RGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIkxvbmdTZWxlY3REZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG5cbjwvZGl2PlxuYDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdzZWxlY3QtZGVtbycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdERlbW9Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLkJhc2ljU2VsZWN0RGVtb1RwbCA9IEJhc2ljU2VsZWN0RGVtb1RwbDtcbiAgICAgICAgdGhpcy5Mb25nU2VsZWN0RGVtb1RwbCA9IExvbmdTZWxlY3REZW1vVHBsO1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gJ1NlbGVjdC4uLic7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFsnQWxwaGEnLCAnQnJhdm8nLCAnQ2hhcmxpZSddO1xuICAgICAgICB0aGlzLndpdGhOdW1iZXJzID0gW1xuICAgICAgICAgICAgeyBsYWJlbDogJ09uZScsIHZhbHVlOiAxIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAnVHdvJywgdmFsdWU6IDIgfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICdaZXJvJywgdmFsdWU6IDAgfVxuICAgICAgICBdO1xuICAgICAgICB0aGlzLndpdGhOdW1iZXJzVmFsdWUgPSAwO1xuICAgICAgICB0aGlzLnN0YXRlcyA9IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdIYXdhaWknLCAnSWRhaG8nLCAnSWxsaW5vaXMnLCAnSW5kaWFuYScsICdJb3dhJywgJ0thbnNhcycsICdLZW50dWNreScsICdMb3Vpc2lhbmEnLCAnTWFpbmUnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggRGFrb3RhJywgJ05vcnRoIENhcm9saW5hJywgJ09oaW8nLCAnT2tsYWhvbWEnLCAnT3JlZ29uJywgJ1Blbm5zeWx2YW5pYScsICdSaG9kZSBJc2xhbmQnLCAnU291dGggQ2Fyb2xpbmEnLCAnU291dGggRGFrb3RhJywgJ1Rlbm5lc3NlZScsICdUZXhhcycsICdVdGFoJywgJ1Zlcm1vbnQnLCAnVmlyZ2luaWEnLCAnV2FzaGluZ3RvbicsICdXZXN0IFZpcmdpbmlhJywgJ1dpc2NvbnNpbicsICdXeW9taW5nJ107XG4gICAgICAgIHRoaXMudmFsdWUgPSAnQnJhdm8nO1xuICAgICAgICB0aGlzLnN0YXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5oZWFkZXJDb25maWcgPSB7XG4gICAgICAgICAgICBsYWJlbDogJ0FkZCBOZXcgSXRlbScsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0VudGVyIGl0ZW0gaGVyZScsXG4gICAgICAgICAgICBvblNhdmU6IHRoaXMuY3JlYXRlLmJpbmQodGhpcylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjcmVhdGUob3B0KSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFsuLi50aGlzLm9wdGlvbnMsIG9wdF07XG4gICAgfVxufVxuIl19

/***/ },
/* 383 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SlidesDemoComponent = undefined;
	
	var _dec, _class; // NG2
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _BasicSlide = __webpack_require__(518);
	
	var _BasicSlide2 = _interopRequireDefault(_BasicSlide);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Slides <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/slides">(source)</a></small></h1>\n    <p>Slide element to toggle some information</p>\n    \n    <h5>Basic</h5>\n    <div class="example slides-demo">' + _BasicSlide2.default + '</div>\n    <code-snippet [code]="BasicSlideDemoTpl"></code-snippet>\n</div>\n';
	
	var SlidesDemoComponent = exports.SlidesDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'slides-demo',
	    template: template
	}), _dec(_class = function SlidesDemoComponent() {
	    _classCallCheck(this, SlidesDemoComponent);
	
	    this.BasicSlideDemoTpl = _BasicSlide2.default;
	}) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvc2xpZGVzL1NsaWRlc0RlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztrQkFBQTs7QUFFQTs7O0FBREE7O0FBRUE7Ozs7Ozs7O0FBRUEsSUFBTSwyWkFBTjs7SUFlYSxtQixXQUFBLG1CLFdBSloscUJBQVU7QUFDUCxjQUFVLGFBREg7QUFFUCxjQUFVO0FBRkgsQ0FBVixDLGdCQUtHLCtCQUFjO0FBQUE7O0FBQ1YsU0FBSyxpQkFBTDtBQUNILEMiLCJmaWxlIjoiU2xpZGVzRGVtby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdvZGkvbm92by1kZXYvbGlicy9ub3ZvLWVsZW1lbnRzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IEJhc2ljU2xpZGVEZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL0Jhc2ljU2xpZGUuaHRtbCc7XG5cbmNvbnN0IHRlbXBsYXRlID0gYFxuPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxoMT5TbGlkZXMgPHNtYWxsPjxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYnVsbGhvcm4vbm92by1lbGVtZW50cy9ibG9iL21hc3Rlci9zcmMvZWxlbWVudHMvc2xpZGVzXCI+KHNvdXJjZSk8L2E+PC9zbWFsbD48L2gxPlxuICAgIDxwPlNsaWRlIGVsZW1lbnQgdG8gdG9nZ2xlIHNvbWUgaW5mb3JtYXRpb248L3A+XG4gICAgXG4gICAgPGg1PkJhc2ljPC9oNT5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBzbGlkZXMtZGVtb1wiPiR7QmFzaWNTbGlkZURlbW9UcGx9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJCYXNpY1NsaWRlRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuPC9kaXY+XG5gO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3NsaWRlcy1kZW1vJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVzRGVtb0NvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuQmFzaWNTbGlkZURlbW9UcGwgPSBCYXNpY1NsaWRlRGVtb1RwbDtcbiAgICB9XG59XG4iXX0=

/***/ },
/* 384 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SwitchDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _SwitchDemo = __webpack_require__(519);
	
	var _SwitchDemo2 = _interopRequireDefault(_SwitchDemo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Switches & Toggles <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/switch">(source)</a></small></h1>\n    <p>Loading animations are used to help indicate to the user that some sort of progress is taking place. These are especially helpful for intensive operations that might take extra time.</p>\n\n    <h2>Types</h2>\n\n    <h5>Tiles</h5>\n    <p>Similar to radio buttons, tiles are used to select a single item. Tiles have a higher visibility than radio buttons, and are used more frequently in data visualizations. Tiles stretch horizontally, so the list they pull from must be small.</p>\n\n    <h5>Switches</h5>\n    <p>Switches are a binary toggle that allow the user to select one of two options. They are most frequently used for an on-off model.</p>\n    <div class="example switch-demo">' + _SwitchDemo2.default + '</div>\n    <code-snippet [code]="SwitchDemoTpl"></code-snippet>\n</div>\n';
	
	var SwitchDemoComponent = exports.SwitchDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'switch-demo',
	    template: template
	}), _dec(_class = function () {
	    function SwitchDemoComponent() {
	        _classCallCheck(this, SwitchDemoComponent);
	
	        this.SwitchDemoTpl = _SwitchDemo2.default;
	        this.toggleCount = 0;
	        this.checked = true;
	    }
	
	    _createClass(SwitchDemoComponent, [{
	        key: 'increment',
	        value: function increment() {
	            this.toggleCount++;
	        }
	    }]);
	
	    return SwitchDemoComponent;
	}()) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvc3dpdGNoL1N3aXRjaERlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O2tCQUFBOztBQUVBOzs7QUFEQTs7QUFFQTs7Ozs7Ozs7QUFFQSxJQUFNLHMrQkFBTjs7SUFxQmEsbUIsV0FBQSxtQixXQUpaLHFCQUFVO0FBQ1AsY0FBVSxhQURIO0FBRVAsY0FBVTtBQUZILENBQVYsQztBQUtHLG1DQUFjO0FBQUE7O0FBQ1YsYUFBSyxhQUFMO0FBQ0EsYUFBSyxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsYUFBSyxPQUFMLEdBQWUsSUFBZjtBQUNIOzs7O29DQUVXO0FBQ1IsaUJBQUssV0FBTDtBQUNIIiwiZmlsZSI6IlN3aXRjaERlbW8uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pnb2RpL25vdm8tZGV2L2xpYnMvbm92by1lbGVtZW50cyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCBTd2l0Y2hEZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL1N3aXRjaERlbW8uaHRtbCc7XG5cbmNvbnN0IHRlbXBsYXRlID0gYFxuPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxoMT5Td2l0Y2hlcyAmIFRvZ2dsZXMgPHNtYWxsPjxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYnVsbGhvcm4vbm92by1lbGVtZW50cy9ibG9iL21hc3Rlci9zcmMvZWxlbWVudHMvc3dpdGNoXCI+KHNvdXJjZSk8L2E+PC9zbWFsbD48L2gxPlxuICAgIDxwPkxvYWRpbmcgYW5pbWF0aW9ucyBhcmUgdXNlZCB0byBoZWxwIGluZGljYXRlIHRvIHRoZSB1c2VyIHRoYXQgc29tZSBzb3J0IG9mIHByb2dyZXNzIGlzIHRha2luZyBwbGFjZS4gVGhlc2UgYXJlIGVzcGVjaWFsbHkgaGVscGZ1bCBmb3IgaW50ZW5zaXZlIG9wZXJhdGlvbnMgdGhhdCBtaWdodCB0YWtlIGV4dHJhIHRpbWUuPC9wPlxuXG4gICAgPGgyPlR5cGVzPC9oMj5cblxuICAgIDxoNT5UaWxlczwvaDU+XG4gICAgPHA+U2ltaWxhciB0byByYWRpbyBidXR0b25zLCB0aWxlcyBhcmUgdXNlZCB0byBzZWxlY3QgYSBzaW5nbGUgaXRlbS4gVGlsZXMgaGF2ZSBhIGhpZ2hlciB2aXNpYmlsaXR5IHRoYW4gcmFkaW8gYnV0dG9ucywgYW5kIGFyZSB1c2VkIG1vcmUgZnJlcXVlbnRseSBpbiBkYXRhIHZpc3VhbGl6YXRpb25zLiBUaWxlcyBzdHJldGNoIGhvcml6b250YWxseSwgc28gdGhlIGxpc3QgdGhleSBwdWxsIGZyb20gbXVzdCBiZSBzbWFsbC48L3A+XG5cbiAgICA8aDU+U3dpdGNoZXM8L2g1PlxuICAgIDxwPlN3aXRjaGVzIGFyZSBhIGJpbmFyeSB0b2dnbGUgdGhhdCBhbGxvdyB0aGUgdXNlciB0byBzZWxlY3Qgb25lIG9mIHR3byBvcHRpb25zLiBUaGV5IGFyZSBtb3N0IGZyZXF1ZW50bHkgdXNlZCBmb3IgYW4gb24tb2ZmIG1vZGVsLjwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBzd2l0Y2gtZGVtb1wiPiR7U3dpdGNoRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIlN3aXRjaERlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cbjwvZGl2PlxuYDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdzd2l0Y2gtZGVtbycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG59KVxuZXhwb3J0IGNsYXNzIFN3aXRjaERlbW9Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLlN3aXRjaERlbW9UcGwgPSBTd2l0Y2hEZW1vVHBsO1xuICAgICAgICB0aGlzLnRvZ2dsZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlQ291bnQrKztcbiAgICB9XG59XG4iXX0=

/***/ },
/* 385 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var TableData = exports.TableData = [{
	    'name': 'Victoria Cantrell',
	    'position': 'Integer Corporation',
	    'office': 'Croatia',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/08/19'),
	    'salary': 208178,
	    'status': 'New Lead',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Pearl Crosby',
	    'position': 'In PC',
	    'office': 'Cambodia',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/10/08'),
	    'salary': 114367,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Colette Foley',
	    'position': 'Lorem Inc.',
	    'office': 'Korea, North',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/07/19'),
	    'salary': 721473,
	    'status': 'Archived',
	    'description': 'To my campaign manager David Plouffe, my chief strategist David Axelrod, and the best campaign team ever assembled in the history of politics – you made this happen, and I am forever grateful for what you’ve sacrificed to get it done.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Anastasia Shaffer',
	    'position': 'Dolor Nulla Semper LLC',
	    'office': 'Suriname',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/04/20'),
	    'salary': 264620,
	    'status': 'New Lead',
	    'description': 'And to all those watching tonight from beyond our shores, from parliaments and palaces to those who are huddled around radios in the forgotten corners of our world – our stories are singular, but our destiny is shared, and a new dawn of American leadership is at hand. To those who would tear this world down – we will defeat you. To those who seek peace and security – we support you. And to all those who have wondered if America’s beacon still burns as bright – tonight we proved once more that the true strength of our nation comes not from our the might of our arms or the scale of our wealth, but from the enduring power of our ideals: democracy, liberty, opportunity, and unyielding hope.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Gabriel Castro',
	    'position': 'Sed Limited',
	    'office': 'Bahrain',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/03/04'),
	    'salary': 651350,
	    'status': 'New Lead',
	    'description': 'I want to thank my partner in this journey, a man who campaigned from his heart and spoke for the men and women he grew up with on the streets of Scranton and rode with on that train home to Delaware, the Vice President-elect of the United States, Joe Biden.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Cherokee Ware',
	    'position': 'Tincidunt LLC',
	    'office': 'United Kingdom (Great Britain)',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/06/17'),
	    'salary': 666259,
	    'status': 'New Lead',
	    'description': 'It’s been a long time coming, but tonight, because of what we did on this day, in this election, at this defining moment, change has come to America.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Barry Moss',
	    'position': 'Sociis Industries',
	    'office': 'Western Sahara',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/08/13'),
	    'salary': 541631,
	    'status': 'New Lead',
	    'description': 'To my campaign manager David Plouffe, my chief strategist David Axelrod, and the best campaign team ever assembled in the history of politics – you made this happen, and I am forever grateful for what you’ve sacrificed to get it done.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Maryam Tucker',
	    'position': 'Elit Pede Malesuada Inc.',
	    'office': 'Brazil',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/10/02'),
	    'salary': 182294,
	    'status': 'New Lead',
	    'description': 'To my campaign manager David Plouffe, my chief strategist David Axelrod, and the best campaign team ever assembled in the history of politics – you made this happen, and I am forever grateful for what you’ve sacrificed to get it done.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Constance Clayton',
	    'position': 'Auctor Velit Aliquam LLP',
	    'office': 'United Arab Emirates',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/08/01'),
	    'salary': 218597,
	    'status': 'New Lead',
	    'description': 'To my campaign manager David Plouffe, my chief strategist David Axelrod, and the best campaign team ever assembled in the history of politics – you made this happen, and I am forever grateful for what you’ve sacrificed to get it done.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Rogan Tucker',
	    'position': 'Arcu Vestibulum Ante Associates',
	    'office': 'Jersey',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/01/04'),
	    'salary': 861632,
	    'status': 'New Lead',
	    'description': 'To my campaign manager David Plouffe, my chief strategist David Axelrod, and the best campaign team ever assembled in the history of politics – you made this happen, and I am forever grateful for what you’ve sacrificed to get it done.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Emery Mcdowell',
	    'position': 'Gravida Company',
	    'office': 'New Zealand',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/06/02'),
	    'salary': 413568,
	    'status': 'New Lead',
	    'description': 'To my campaign manager David Plouffe, my chief strategist David Axelrod, and the best campaign team ever assembled in the history of politics – you made this happen, and I am forever grateful for what you’ve sacrificed to get it done.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Yael Greer',
	    'position': 'Orci Limited',
	    'office': 'Madagascar',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/12/04'),
	    'salary': 121831,
	    'status': 'New Lead',
	    'description': 'To my campaign manager David Plouffe, my chief strategist David Axelrod, and the best campaign team ever assembled in the history of politics – you made this happen, and I am forever grateful for what you’ve sacrificed to get it done.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Jared Burgess',
	    'position': 'Auctor Incorporated',
	    'office': 'Burundi',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/01/12'),
	    'salary': 62243,
	    'status': 'Active',
	    'description': 'To my campaign manager David Plouffe, my chief strategist David Axelrod, and the best campaign team ever assembled in the history of politics – you made this happen, and I am forever grateful for what you’ve sacrificed to get it done.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Sharon Campbell',
	    'position': 'Elit Curabitur Sed Consulting',
	    'office': 'Comoros',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/09/14'),
	    'salary': 200854,
	    'status': 'Active',
	    'description': 'To my campaign manager David Plouffe, my chief strategist David Axelrod, and the best campaign team ever assembled in the history of politics – you made this happen, and I am forever grateful for what you’ve sacrificed to get it done.',
	    'categories': ['Temporary', 'Finance']
	}, {
	    'name': 'Yeo Church',
	    'position': 'Donec Vitae Erat PC',
	    'office': 'Saudi Arabia',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/06/07'),
	    'salary': 581193,
	    'status': 'Active',
	    'description': 'To my campaign manager David Plouffe, my chief strategist David Axelrod, and the best campaign team ever assembled in the history of politics – you made this happen, and I am forever grateful for what you’ve sacrificed to get it done.',
	    'categories': ['Temporary', 'Finance']
	}, {
	    'name': 'Kylie Barlow',
	    'position': 'Fermentum Risus Corporation',
	    'office': 'Papua New Guinea',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/12/03'),
	    'salary': 418115,
	    'status': 'Active',
	    'description': 'And to all those watching tonight from beyond our shores, from parliaments and palaces to those who are huddled around radios in the forgotten corners of our world – our stories are singular, but our destiny is shared, and a new dawn of American leadership is at hand. To those who would tear this world down – we will defeat you. To those who seek peace and security – we support you. And to all those who have wondered if America’s beacon still burns as bright – tonight we proved once more that the true strength of our nation comes not from our the might of our arms or the scale of our wealth, but from the enduring power of our ideals: democracy, liberty, opportunity, and unyielding hope.',
	    'categories': ['Temporary', 'Finance']
	}, {
	    'name': 'Nell Leonard',
	    'position': 'Vestibulum Consulting',
	    'office': 'Saudi Arabia',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/05/29'),
	    'salary': 466201,
	    'status': 'Active',
	    'description': 'And to all those watching tonight from beyond our shores, from parliaments and palaces to those who are huddled around radios in the forgotten corners of our world – our stories are singular, but our destiny is shared, and a new dawn of American leadership is at hand. To those who would tear this world down – we will defeat you. To those who seek peace and security – we support you. And to all those who have wondered if America’s beacon still burns as bright – tonight we proved once more that the true strength of our nation comes not from our the might of our arms or the scale of our wealth, but from the enduring power of our ideals: democracy, liberty, opportunity, and unyielding hope.',
	    'categories': ['Temporary', 'Finance']
	}, {
	    'name': 'Brandon Fleming',
	    'position': 'Donec Egestas Associates',
	    'office': 'Poland',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/01/22'),
	    'salary': 800011,
	    'status': 'Active',
	    'description': 'And to all those watching tonight from beyond our shores, from parliaments and palaces to those who are huddled around radios in the forgotten corners of our world – our stories are singular, but our destiny is shared, and a new dawn of American leadership is at hand. To those who would tear this world down – we will defeat you. To those who seek peace and security – we support you. And to all those who have wondered if America’s beacon still burns as bright – tonight we proved once more that the true strength of our nation comes not from our the might of our arms or the scale of our wealth, but from the enduring power of our ideals: democracy, liberty, opportunity, and unyielding hope.',
	    'categories': ['Temporary', 'Finance']
	}, {
	    'name': 'Inga Pena',
	    'position': 'Et Magnis Dis Limited',
	    'office': 'Belgium',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/05/18'),
	    'salary': 564245,
	    'status': 'Active',
	    'description': 'And to all those watching tonight from beyond our shores, from parliaments and palaces to those who are huddled around radios in the forgotten corners of our world – our stories are singular, but our destiny is shared, and a new dawn of American leadership is at hand. To those who would tear this world down – we will defeat you. To those who seek peace and security – we support you. And to all those who have wondered if America’s beacon still burns as bright – tonight we proved once more that the true strength of our nation comes not from our the might of our arms or the scale of our wealth, but from the enduring power of our ideals: democracy, liberty, opportunity, and unyielding hope.',
	    'categories': ['Permenant', 'Finance']
	}, {
	    'name': 'Arden Russo',
	    'position': 'Est Tempor Bibendum Corp.',
	    'office': 'Dominican Republic',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/07/23'),
	    'salary': 357222,
	    'status': 'Active',
	    'description': 'And to all those watching tonight from beyond our shores, from parliaments and palaces to those who are huddled around radios in the forgotten corners of our world – our stories are singular, but our destiny is shared, and a new dawn of American leadership is at hand. To those who would tear this world down – we will defeat you. To those who seek peace and security – we support you. And to all those who have wondered if America’s beacon still burns as bright – tonight we proved once more that the true strength of our nation comes not from our the might of our arms or the scale of our wealth, but from the enduring power of our ideals: democracy, liberty, opportunity, and unyielding hope.',
	    'categories': ['Permenant', 'Finance']
	}, {
	    'name': 'Liberty Gallegos',
	    'position': 'Nec Diam LLC',
	    'office': 'Ghana',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/06/18'),
	    'salary': 554375,
	    'status': 'Active',
	    'description': 'And to all those watching tonight from beyond our shores, from parliaments and palaces to those who are huddled around radios in the forgotten corners of our world – our stories are singular, but our destiny is shared, and a new dawn of American leadership is at hand. To those who would tear this world down – we will defeat you. To those who seek peace and security – we support you. And to all those who have wondered if America’s beacon still burns as bright – tonight we proved once more that the true strength of our nation comes not from our the might of our arms or the scale of our wealth, but from the enduring power of our ideals: democracy, liberty, opportunity, and unyielding hope.',
	    'categories': ['Permenant', 'Developer']
	}, {
	    'name': 'Dennis York',
	    'position': 'Nullam Suscipit Foundation',
	    'office': 'Namibia',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/03/20'),
	    'salary': 90417,
	    'status': 'Active',
	    'description': 'And to all those watching tonight from beyond our shores, from parliaments and palaces to those who are huddled around radios in the forgotten corners of our world – our stories are singular, but our destiny is shared, and a new dawn of American leadership is at hand. To those who would tear this world down – we will defeat you. To those who seek peace and security – we support you. And to all those who have wondered if America’s beacon still burns as bright – tonight we proved once more that the true strength of our nation comes not from our the might of our arms or the scale of our wealth, but from the enduring power of our ideals: democracy, liberty, opportunity, and unyielding hope.',
	    'categories': ['Permenant', 'Developer']
	}, {
	    'name': 'Petra Chandler',
	    'position': 'Pede Nonummy Inc.',
	    'office': 'Namibia',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/03/26'),
	    'salary': 598915,
	    'status': 'Active',
	    'description': 'And to all those watching tonight from beyond our shores, from parliaments and palaces to those who are huddled around radios in the forgotten corners of our world – our stories are singular, but our destiny is shared, and a new dawn of American leadership is at hand. To those who would tear this world down – we will defeat you. To those who seek peace and security – we support you. And to all those who have wondered if America’s beacon still burns as bright – tonight we proved once more that the true strength of our nation comes not from our the might of our arms or the scale of our wealth, but from the enduring power of our ideals: democracy, liberty, opportunity, and unyielding hope.',
	    'categories': ['Permenant', 'Developer']
	}, {
	    'name': 'Aurelia Marshall',
	    'position': 'Donec Consulting',
	    'office': 'Nicaragua',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/08/18'),
	    'salary': 201680,
	    'status': 'Active',
	    'description': 'And to all those watching tonight from beyond our shores, from parliaments and palaces to those who are huddled around radios in the forgotten corners of our world – our stories are singular, but our destiny is shared, and a new dawn of American leadership is at hand. To those who would tear this world down – we will defeat you. To those who seek peace and security – we support you. And to all those who have wondered if America’s beacon still burns as bright – tonight we proved once more that the true strength of our nation comes not from our the might of our arms or the scale of our wealth, but from the enduring power of our ideals: democracy, liberty, opportunity, and unyielding hope.',
	    'categories': ['Permenant', 'Developer']
	}, {
	    'name': 'Rose Carter',
	    'position': 'Enim Consequat Purus Industries',
	    'office': 'Morocco',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/03/06'),
	    'salary': 220187,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Permenant', 'Developer']
	}, {
	    'name': 'Denton Atkins',
	    'position': 'Non Vestibulum PC',
	    'office': 'Mali',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/04/19'),
	    'salary': 324588,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Permenant', 'Developer']
	}, {
	    'name': 'Germaine Osborn',
	    'position': 'Tristique Aliquet PC',
	    'office': 'Lesotho',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/01/19'),
	    'salary': 351108,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Nell Butler',
	    'position': 'Sit Amet Dapibus Industries',
	    'office': 'Cuba',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/01/06'),
	    'salary': 230072,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Marketing']
	}, {
	    'name': 'Brent Stein',
	    'position': 'Eu Augue Porttitor LLP',
	    'office': 'Cyprus',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/11/02'),
	    'salary': 853413,
	    'status': 'New Lead',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Marketing']
	}, {
	    'name': 'Alexandra Shaw',
	    'position': 'Aenean Gravida Limited',
	    'office': 'Uruguay',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/05/16'),
	    'salary': 401970,
	    'status': 'Archived',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Marketing']
	}, {
	    'name': 'Veronica Allison',
	    'position': 'Aliquet Diam Sed Institute',
	    'office': 'Samoa',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/05/17'),
	    'salary': 79193,
	    'status': 'New Lead',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Marketing']
	}, {
	    'name': 'Katelyn Gamble',
	    'position': 'Sed Associates',
	    'office': 'Mauritius',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/03/20'),
	    'salary': 484299,
	    'status': 'New Lead',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Marketing']
	}, {
	    'name': 'James Greer',
	    'position': 'A Dui Incorporated',
	    'office': 'Norway',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/02/21'),
	    'salary': 333518,
	    'status': 'New Lead',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Contractor', 'Marketing']
	}, {
	    'name': 'Cain Vasquez',
	    'position': 'Nulla Facilisis Suspendisse Institute',
	    'office': 'China',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/05/27'),
	    'salary': 651761,
	    'status': 'New Lead',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Contractor', 'Marketing']
	}, {
	    'name': 'Shaeleigh Barr',
	    'position': 'Eleifend Cras Institute',
	    'office': 'Ghana',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/04/01'),
	    'salary': 627095,
	    'status': 'Archived',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Contractor', 'Developer']
	}, {
	    'name': 'Baker Mckay',
	    'position': 'Ut Sagittis Associates',
	    'office': 'Isle of Man',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/01/12'),
	    'salary': 742247,
	    'status': 'New Lead',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Contractor', 'Developer']
	}, {
	    'name': 'Jayme Pace',
	    'position': 'Cras Eu Tellus Associates',
	    'office': 'Bouvet Island',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/08/12'),
	    'salary': 591588,
	    'status': 'New Lead',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Contractor', 'Developer']
	}, {
	    'name': 'Reuben Albert',
	    'position': 'Lobortis Institute',
	    'office': 'Zambia',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/04/04'),
	    'salary': 791408,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Contractor', 'Developer']
	}, {
	    'name': 'Idola Burns',
	    'position': 'Non Industries',
	    'office': 'Myanmar',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/06/24'),
	    'salary': 142906,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Contractor', 'Developer']
	}, {
	    'name': 'Laura Macias',
	    'position': 'Phasellus Inc.',
	    'office': 'Mauritania',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/11/21'),
	    'salary': 226591,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Nichole Salas',
	    'position': 'Duis PC',
	    'office': 'Madagascar',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/01/18'),
	    'salary': 234196,
	    'status': 'Active',
	    'description': 'I want to thank my partner in this journey, a man who campaigned from his heart and spoke for the men and women he grew up with on the streets of Scranton and rode with on that train home to Delaware, the Vice President-elect of the United States, Joe Biden.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Hunter Walter',
	    'position': 'Ullamcorper Duis Cursus Foundation',
	    'office': 'Brazil',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/02/28'),
	    'salary': 655052,
	    'status': 'Active',
	    'description': 'I want to thank my partner in this journey, a man who campaigned from his heart and spoke for the men and women he grew up with on the streets of Scranton and rode with on that train home to Delaware, the Vice President-elect of the United States, Joe Biden.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Asher Rich',
	    'position': 'Mauris Ipsum LLP',
	    'office': 'Paraguay',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/08/08'),
	    'salary': 222946,
	    'status': 'Archived',
	    'description': 'I want to thank my partner in this journey, a man who campaigned from his heart and spoke for the men and women he grew up with on the streets of Scranton and rode with on that train home to Delaware, the Vice President-elect of the United States, Joe Biden.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Angela Carlson',
	    'position': 'Donec Tempor Institute',
	    'office': 'Papua New Guinea',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/02/12'),
	    'salary': 562194,
	    'status': 'Active',
	    'description': 'I want to thank my partner in this journey, a man who campaigned from his heart and spoke for the men and women he grew up with on the streets of Scranton and rode with on that train home to Delaware, the Vice President-elect of the United States, Joe Biden.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'James Dorsey',
	    'position': 'Ipsum Leo Associates',
	    'office': 'Congo (Brazzaville)',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/01/10'),
	    'salary': 629925,
	    'status': 'Active',
	    'description': 'I want to thank my partner in this journey, a man who campaigned from his heart and spoke for the men and women he grew up with on the streets of Scranton and rode with on that train home to Delaware, the Vice President-elect of the United States, Joe Biden.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Wesley Cobb',
	    'position': 'Nunc Est Incorporated',
	    'office': 'Australia',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/01/30'),
	    'salary': 343476,
	    'status': 'Active',
	    'description': 'I want to thank my partner in this journey, a man who campaigned from his heart and spoke for the men and women he grew up with on the streets of Scranton and rode with on that train home to Delaware, the Vice President-elect of the United States, Joe Biden.',
	    'categories': ['Communications', 'Developer']
	}, {
	    'name': 'Meghan Stephens',
	    'position': 'Interdum PC',
	    'office': 'Turkey',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/10/11'),
	    'salary': 469305,
	    'status': 'Active',
	    'description': 'I want to thank my partner in this journey, a man who campaigned from his heart and spoke for the men and women he grew up with on the streets of Scranton and rode with on that train home to Delaware, the Vice President-elect of the United States, Joe Biden.',
	    'categories': ['Communications', 'Developer']
	}, {
	    'name': 'Bertha Herrera',
	    'position': 'Amet Limited',
	    'office': 'Kenya',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/11/22'),
	    'salary': 56606,
	    'status': 'Active',
	    'description': 'I want to thank my partner in this journey, a man who campaigned from his heart and spoke for the men and women he grew up with on the streets of Scranton and rode with on that train home to Delaware, the Vice President-elect of the United States, Joe Biden.',
	    'categories': ['Communications', 'Developer']
	}, {
	    'name': 'Karina Key',
	    'position': 'Quisque Varius Nam Company',
	    'office': 'France',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/03/26'),
	    'salary': 314260,
	    'status': 'Active',
	    'description': 'I want to thank my partner in this journey, a man who campaigned from his heart and spoke for the men and women he grew up with on the streets of Scranton and rode with on that train home to Delaware, the Vice President-elect of the United States, Joe Biden.',
	    'categories': ['Communications', 'Developer']
	}, {
	    'name': 'Uriel Carson',
	    'position': 'Penatibus PC',
	    'office': 'Venezuela',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/01/07'),
	    'salary': 106335,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Communications', 'Developer']
	}, {
	    'name': 'Mira Baird',
	    'position': 'Felis Orci PC',
	    'office': 'Niue',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/08/25'),
	    'salary': 515671,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Communications', 'Developer']
	}, {
	    'name': 'Ursula Parrish',
	    'position': 'Ac Corporation',
	    'office': 'Macao',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/06/30'),
	    'salary': 72295,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Communications', 'Developer']
	}, {
	    'name': 'Josephine Sykes',
	    'position': 'Blandit Congue Limited',
	    'office': 'Holy See (Vatican City State)',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/12/22'),
	    'salary': 694656,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Communications', 'Developer']
	}, {
	    'name': 'Maggie Sims',
	    'position': 'Vulputate Posuere Industries',
	    'office': 'Sudan',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/11/22'),
	    'salary': 363743,
	    'status': 'New Lead',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Communications', 'Developer']
	}, {
	    'name': 'Rogan Fuentes',
	    'position': 'Vestibulum Accumsan Neque Company',
	    'office': 'Jersey',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/07/29'),
	    'salary': 606004,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Communications', 'Developer']
	}, {
	    'name': 'Maya Haney',
	    'position': 'Ac Foundation',
	    'office': 'Falkland Islands',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/09/03'),
	    'salary': 745500,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Communications', 'Developer']
	}, {
	    'name': 'Aquila Battle',
	    'position': 'Sociis Natoque Penatibus Foundation',
	    'office': 'Azerbaijan',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/03/06'),
	    'salary': 582265,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Communications', 'Developer']
	}, {
	    'name': 'Connor Coleman',
	    'position': 'Orci Lacus Vestibulum Foundation',
	    'office': 'Croatia',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/10/21'),
	    'salary': 416958,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Communications', 'Developer']
	}, {
	    'name': 'Charity Thomas',
	    'position': 'Convallis Ligula Donec Inc.',
	    'office': 'Benin',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/07/12'),
	    'salary': 540999,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Communications', 'Developer']
	}, {
	    'name': 'Blythe Powers',
	    'position': 'Amet Orci Limited',
	    'office': 'Falkland Islands',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/01/23'),
	    'salary': 480067,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Communications', 'Human Resources']
	}, {
	    'name': 'Adria Battle',
	    'position': 'Ornare Lectus Incorporated',
	    'office': 'British Indian Ocean Territory',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/05/28'),
	    'salary': 257937,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Communications', 'Human Resources']
	}, {
	    'name': 'Melanie Mcintyre',
	    'position': 'Nunc Corp.',
	    'office': 'Mongolia',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/01/06'),
	    'salary': 359737,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Communications', 'Human Resources']
	}, {
	    'name': 'Keely Bauer',
	    'position': 'Nec Tempus Institute',
	    'office': 'Somalia',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/03/09'),
	    'salary': 99718,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Communications', 'Human Resources']
	}, {
	    'name': 'Noelani Strong',
	    'position': 'Nec LLP',
	    'office': 'Iran',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/08/24'),
	    'salary': 480718,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Communications', 'Human Resources']
	}, {
	    'name': 'Jeanette Henderson',
	    'position': 'Eu Elit Nulla Corporation',
	    'office': 'Italy',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/06/19'),
	    'salary': 253772,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Candace Huber',
	    'position': 'Sed Institute',
	    'office': 'Uganda',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/06/16'),
	    'salary': 388879,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Bethany Potter',
	    'position': 'Vivamus Nibh Dolor Incorporated',
	    'office': 'Puerto Rico',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/11/12'),
	    'salary': 747310,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Whoopi Burks',
	    'position': 'Justo Inc.',
	    'office': 'Fiji',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/09/24'),
	    'salary': 803037,
	    'status': 'Active',
	    'description': 'There was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Sheila Long',
	    'position': 'Diam Associates',
	    'office': 'Sao Tome and Principe',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/12/21'),
	    'salary': 674379,
	    'status': 'Active',
	    'description': 'There was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Sonya Church',
	    'position': 'Laoreet Institute',
	    'office': 'Grenada',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/06/03'),
	    'salary': 625147,
	    'status': 'Active',
	    'description': 'There was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Shaine Forbes',
	    'position': 'Eu Arcu LLP',
	    'office': 'Cyprus',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/01/18'),
	    'salary': 208100,
	    'status': 'Active',
	    'description': 'There was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Alexandra Patrick',
	    'position': 'Ligula Donec Inc.',
	    'office': 'Viet Nam',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/04/09'),
	    'salary': 104063,
	    'status': 'Active',
	    'description': 'There was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Patience Vincent',
	    'position': 'Sem Molestie Associates',
	    'office': 'Philippines',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/07/04'),
	    'salary': 673556,
	    'status': 'Active',
	    'description': 'There was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Evelyn Smith',
	    'position': 'Fusce Industries',
	    'office': 'Togo',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/08/15'),
	    'salary': 737284,
	    'status': 'Active',
	    'description': 'There was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Kieran Gonzalez',
	    'position': 'Non Corp.',
	    'office': 'Equatorial Guinea',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/08/24'),
	    'salary': 90195,
	    'status': 'New Lead',
	    'description': 'There was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Molly Oneil',
	    'position': 'Non Dui Consulting',
	    'office': 'Belize',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/10/28'),
	    'salary': 140767,
	    'status': 'Archived',
	    'description': 'There was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Nigel Davenport',
	    'position': 'Ullamcorper Velit In Industries',
	    'office': 'Vanuatu',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/03/16'),
	    'salary': 70536,
	    'status': 'Active',
	    'description': 'There was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Thor Young',
	    'position': 'Malesuada Consulting',
	    'office': 'French Southern Territories',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/01/28'),
	    'salary': 75501,
	    'status': 'Active',
	    'description': 'There was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Finn Delacruz',
	    'position': 'Lorem Industries',
	    'office': 'Cocos (Keeling) Islands',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/12/11'),
	    'salary': 754967,
	    'status': 'Archived',
	    'description': 'There was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Lane Henderson',
	    'position': 'Pede Foundation',
	    'office': 'Kazakhstan',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/07/02'),
	    'salary': 842050,
	    'status': 'Archived',
	    'description': 'There was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Shea Potter',
	    'position': 'Curabitur Limited',
	    'office': 'Timor-Leste',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/05/07'),
	    'salary': 263629,
	    'status': 'Archived',
	    'description': 'Labore sit nulla amet enim reprehenderit esse laborum Lorem quis in eu.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Brynn Yang',
	    'position': 'Ut Limited',
	    'office': 'Mayotte',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/01/17'),
	    'salary': 74292,
	    'status': 'Archived',
	    'description': 'Labore sit nulla amet enim reprehenderit esse laborum Lorem quis in eu.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Kylan Fuentes',
	    'position': 'Sapien Aenean Associates',
	    'office': 'Brazil',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/12/28'),
	    'salary': 108632,
	    'status': 'Archived',
	    'description': 'Labore sit nulla amet enim reprehenderit esse laborum Lorem quis in eu.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Lionel Mcbride',
	    'position': 'Ipsum PC',
	    'office': 'Portugal',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/07/11'),
	    'salary': 34244,
	    'status': 'Archived',
	    'description': 'Labore sit nulla amet enim reprehenderit esse laborum Lorem quis in eu.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Paul Lucas',
	    'position': 'Eget LLP',
	    'office': 'Nicaragua',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/09/30'),
	    'salary': 690834,
	    'status': 'Archived',
	    'description': 'Labore sit nulla amet enim reprehenderit esse laborum Lorem quis in eu.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Lareina Williamson',
	    'position': 'Imperdiet Ullamcorper Ltd',
	    'office': 'Cocos (Keeling) Islands',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/12/01'),
	    'salary': 603498,
	    'status': 'Archived',
	    'description': 'Labore sit nulla amet enim reprehenderit esse laborum Lorem quis in eu.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Amy Acevedo',
	    'position': 'Id Institute',
	    'office': 'Cook Islands',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/02/04'),
	    'salary': 125165,
	    'status': 'Archived',
	    'description': 'Labore sit nulla amet enim reprehenderit esse laborum Lorem quis in eu.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Nomlanga Silva',
	    'position': 'Eget LLC',
	    'office': 'Belize',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/01/31'),
	    'salary': 268509,
	    'status': 'Archived',
	    'description': 'Labore sit nulla amet enim reprehenderit esse laborum Lorem quis in eu.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Amena Stone',
	    'position': 'Enim Incorporated',
	    'office': 'Guinea',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/09/23'),
	    'salary': 214381,
	    'status': 'Active',
	    'description': 'There was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Danielle Coffey',
	    'position': 'Feugiat Placerat Corp.',
	    'office': 'Sao Tome and Principe',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/06/17'),
	    'salary': 137423,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Temporary', 'Developer']
	}, {
	    'name': 'Buffy Russell',
	    'position': 'Lacus Quisque Ltd',
	    'office': 'Ecuador',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/10/17'),
	    'salary': 612184,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Office Skills']
	}, {
	    'name': 'Kaitlin Lamb',
	    'position': 'Malesuada Fringilla Est Associates',
	    'office': 'Algeria',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/10/18'),
	    'salary': 327367,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Office Skills']
	}, {
	    'name': 'Leilani Yates',
	    'position': 'Mus Proin LLC',
	    'office': 'South Sudan',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/05/27'),
	    'salary': 743493,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Office Skills']
	}, {
	    'name': 'Jemima Moon',
	    'position': 'Phasellus Corp.',
	    'office': 'South Georgia and The South Sandwich Islands',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/05/21'),
	    'salary': 496067,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Office Skills']
	}, {
	    'name': 'Hiroko Schwartz',
	    'position': 'Neque Institute',
	    'office': 'Saint Vincent and The Grenadines',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/03/13'),
	    'salary': 178782,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Office Skills']
	}, {
	    'name': 'Nathaniel Jensen',
	    'position': 'Mi Tempor Limited',
	    'office': 'Dominica',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/12/05'),
	    'salary': 37441,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Office Skills']
	}, {
	    'name': 'Silas Sweeney',
	    'position': 'Ultrices Institute',
	    'office': 'Turkmenistan',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/11/13'),
	    'salary': 152980,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Office Skills']
	}, {
	    'name': 'Jermaine Barry',
	    'position': 'Dapibus Corporation',
	    'office': 'Uzbekistan',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/03/06'),
	    'salary': 409463,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Office Skills']
	}, {
	    'name': 'Tatiana Nichols',
	    'position': 'Nec Diam Industries',
	    'office': 'Cook Islands',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/05/22'),
	    'salary': 51155,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Office Skills']
	}, {
	    'name': 'Rama Waller',
	    'position': 'Sem Pellentesque LLC',
	    'office': 'Andorra',
	    'ext': { 'obj': '8262' },
	    'startDate': new Date('2016/12/01'),
	    'salary': 223227,
	    'status': 'Active',
	    'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
	    'categories': ['Office Skills']
	}];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvdGFibGUvVGFibGVEYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQU8sSUFBTSxnQ0FBWSxDQUNyQjtBQUNJLFlBQVEsbUJBRFo7QUFFSSxnQkFBWSxxQkFGaEI7QUFHSSxjQUFVLFNBSGQ7QUFJSSxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlg7QUFLSSxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGpCO0FBTUksY0FBVSxNQU5kO0FBT0ksY0FBVSxVQVBkO0FBUUksbUJBQWUsdUxBUm5CO0FBU0ksa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRsQixDQURxQixFQVdsQjtBQUNDLFlBQVEsY0FEVDtBQUVDLGdCQUFZLE9BRmI7QUFHQyxjQUFVLFVBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0FYa0IsRUFxQmxCO0FBQ0MsWUFBUSxlQURUO0FBRUMsZ0JBQVksWUFGYjtBQUdDLGNBQVUsY0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsVUFQWDtBQVFDLG1CQUFlLDRPQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFdBQWQ7QUFUZixDQXJCa0IsRUErQmxCO0FBQ0MsWUFBUSxtQkFEVDtBQUVDLGdCQUFZLHdCQUZiO0FBR0MsY0FBVSxVQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxVQVBYO0FBUUMsbUJBQWUseXJCQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFdBQWQ7QUFUZixDQS9Ca0IsRUF5Q2xCO0FBQ0MsWUFBUSxnQkFEVDtBQUVDLGdCQUFZLGFBRmI7QUFHQyxjQUFVLFNBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFVBUFg7QUFRQyxtQkFBZSxvUUFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0F6Q2tCLEVBbURsQjtBQUNDLFlBQVEsZUFEVDtBQUVDLGdCQUFZLGVBRmI7QUFHQyxjQUFVLGdDQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxVQVBYO0FBUUMsbUJBQWUsdUpBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBbkRrQixFQTZEbEI7QUFDQyxZQUFRLFlBRFQ7QUFFQyxnQkFBWSxtQkFGYjtBQUdDLGNBQVUsZ0JBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFVBUFg7QUFRQyxtQkFBZSw0T0FSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0E3RGtCLEVBdUVsQjtBQUNDLFlBQVEsZUFEVDtBQUVDLGdCQUFZLDBCQUZiO0FBR0MsY0FBVSxRQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxVQVBYO0FBUUMsbUJBQWUsNE9BUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBdkVrQixFQWlGbEI7QUFDQyxZQUFRLG1CQURUO0FBRUMsZ0JBQVksMEJBRmI7QUFHQyxjQUFVLHNCQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxVQVBYO0FBUUMsbUJBQWUsNE9BUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBakZrQixFQTJGbEI7QUFDQyxZQUFRLGNBRFQ7QUFFQyxnQkFBWSxpQ0FGYjtBQUdDLGNBQVUsUUFIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsVUFQWDtBQVFDLG1CQUFlLDRPQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFdBQWQ7QUFUZixDQTNGa0IsRUFxR2xCO0FBQ0MsWUFBUSxnQkFEVDtBQUVDLGdCQUFZLGlCQUZiO0FBR0MsY0FBVSxhQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxVQVBYO0FBUUMsbUJBQWUsNE9BUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBckdrQixFQStHbEI7QUFDQyxZQUFRLFlBRFQ7QUFFQyxnQkFBWSxjQUZiO0FBR0MsY0FBVSxZQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxVQVBYO0FBUUMsbUJBQWUsNE9BUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBL0drQixFQXlIbEI7QUFDQyxZQUFRLGVBRFQ7QUFFQyxnQkFBWSxxQkFGYjtBQUdDLGNBQVUsU0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsS0FOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLDRPQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFdBQWQ7QUFUZixDQXpIa0IsRUFtSWxCO0FBQ0MsWUFBUSxpQkFEVDtBQUVDLGdCQUFZLCtCQUZiO0FBR0MsY0FBVSxTQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxRQVBYO0FBUUMsbUJBQWUsNE9BUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsU0FBZDtBQVRmLENBbklrQixFQTZJbEI7QUFDQyxZQUFRLFlBRFQ7QUFFQyxnQkFBWSxxQkFGYjtBQUdDLGNBQVUsY0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLDRPQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFNBQWQ7QUFUZixDQTdJa0IsRUF1SmxCO0FBQ0MsWUFBUSxjQURUO0FBRUMsZ0JBQVksNkJBRmI7QUFHQyxjQUFVLGtCQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxRQVBYO0FBUUMsbUJBQWUseXJCQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFNBQWQ7QUFUZixDQXZKa0IsRUFpS2xCO0FBQ0MsWUFBUSxjQURUO0FBRUMsZ0JBQVksdUJBRmI7QUFHQyxjQUFVLGNBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx5ckJBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsU0FBZDtBQVRmLENBaktrQixFQTJLbEI7QUFDQyxZQUFRLGlCQURUO0FBRUMsZ0JBQVksMEJBRmI7QUFHQyxjQUFVLFFBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx5ckJBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsU0FBZDtBQVRmLENBM0trQixFQXFMbEI7QUFDQyxZQUFRLFdBRFQ7QUFFQyxnQkFBWSx1QkFGYjtBQUdDLGNBQVUsU0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLHlyQkFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxTQUFkO0FBVGYsQ0FyTGtCLEVBK0xsQjtBQUNDLFlBQVEsYUFEVDtBQUVDLGdCQUFZLDJCQUZiO0FBR0MsY0FBVSxvQkFIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLHlyQkFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxTQUFkO0FBVGYsQ0EvTGtCLEVBeU1sQjtBQUNDLFlBQVEsa0JBRFQ7QUFFQyxnQkFBWSxjQUZiO0FBR0MsY0FBVSxPQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxRQVBYO0FBUUMsbUJBQWUseXJCQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFdBQWQ7QUFUZixDQXpNa0IsRUFtTmxCO0FBQ0MsWUFBUSxhQURUO0FBRUMsZ0JBQVksNEJBRmI7QUFHQyxjQUFVLFNBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLEtBTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx5ckJBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBbk5rQixFQTZObEI7QUFDQyxZQUFRLGdCQURUO0FBRUMsZ0JBQVksbUJBRmI7QUFHQyxjQUFVLFNBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx5ckJBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBN05rQixFQXVPbEI7QUFDQyxZQUFRLGtCQURUO0FBRUMsZ0JBQVksa0JBRmI7QUFHQyxjQUFVLFdBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx5ckJBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBdk9rQixFQWlQbEI7QUFDQyxZQUFRLGFBRFQ7QUFFQyxnQkFBWSxpQ0FGYjtBQUdDLGNBQVUsU0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFdBQWQ7QUFUZixDQWpQa0IsRUEyUGxCO0FBQ0MsWUFBUSxlQURUO0FBRUMsZ0JBQVksbUJBRmI7QUFHQyxjQUFVLE1BSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0EzUGtCLEVBcVFsQjtBQUNDLFlBQVEsaUJBRFQ7QUFFQyxnQkFBWSxzQkFGYjtBQUdDLGNBQVUsU0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFdBQWQ7QUFUZixDQXJRa0IsRUErUWxCO0FBQ0MsWUFBUSxhQURUO0FBRUMsZ0JBQVksNkJBRmI7QUFHQyxjQUFVLE1BSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0EvUWtCLEVBeVJsQjtBQUNDLFlBQVEsYUFEVDtBQUVDLGdCQUFZLHdCQUZiO0FBR0MsY0FBVSxRQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxVQVBYO0FBUUMsbUJBQWUsdUxBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBelJrQixFQW1TbEI7QUFDQyxZQUFRLGdCQURUO0FBRUMsZ0JBQVksd0JBRmI7QUFHQyxjQUFVLFNBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFVBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0FuU2tCLEVBNlNsQjtBQUNDLFlBQVEsa0JBRFQ7QUFFQyxnQkFBWSw0QkFGYjtBQUdDLGNBQVUsT0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsS0FOWDtBQU9DLGNBQVUsVUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFdBQWQ7QUFUZixDQTdTa0IsRUF1VGxCO0FBQ0MsWUFBUSxnQkFEVDtBQUVDLGdCQUFZLGdCQUZiO0FBR0MsY0FBVSxXQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxVQVBYO0FBUUMsbUJBQWUsdUxBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBdlRrQixFQWlVbEI7QUFDQyxZQUFRLGFBRFQ7QUFFQyxnQkFBWSxvQkFGYjtBQUdDLGNBQVUsUUFIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsVUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsWUFBRCxFQUFlLFdBQWY7QUFUZixDQWpVa0IsRUEyVWxCO0FBQ0MsWUFBUSxjQURUO0FBRUMsZ0JBQVksdUNBRmI7QUFHQyxjQUFVLE9BSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFVBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLFlBQUQsRUFBZSxXQUFmO0FBVGYsQ0EzVWtCLEVBcVZsQjtBQUNDLFlBQVEsZ0JBRFQ7QUFFQyxnQkFBWSx5QkFGYjtBQUdDLGNBQVUsT0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsVUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsWUFBRCxFQUFlLFdBQWY7QUFUZixDQXJWa0IsRUErVmxCO0FBQ0MsWUFBUSxhQURUO0FBRUMsZ0JBQVksd0JBRmI7QUFHQyxjQUFVLGFBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFVBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLFlBQUQsRUFBZSxXQUFmO0FBVGYsQ0EvVmtCLEVBeVdsQjtBQUNDLFlBQVEsWUFEVDtBQUVDLGdCQUFZLDJCQUZiO0FBR0MsY0FBVSxlQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxVQVBYO0FBUUMsbUJBQWUsdUxBUmhCO0FBU0Msa0JBQWMsQ0FBQyxZQUFELEVBQWUsV0FBZjtBQVRmLENBeldrQixFQW1YbEI7QUFDQyxZQUFRLGVBRFQ7QUFFQyxnQkFBWSxvQkFGYjtBQUdDLGNBQVUsUUFIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsWUFBRCxFQUFlLFdBQWY7QUFUZixDQW5Ya0IsRUE2WGxCO0FBQ0MsWUFBUSxhQURUO0FBRUMsZ0JBQVksZ0JBRmI7QUFHQyxjQUFVLFNBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLFlBQUQsRUFBZSxXQUFmO0FBVGYsQ0E3WGtCLEVBdVlsQjtBQUNDLFlBQVEsY0FEVDtBQUVDLGdCQUFZLGdCQUZiO0FBR0MsY0FBVSxZQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxRQVBYO0FBUUMsbUJBQWUsdUxBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBdllrQixFQWlabEI7QUFDQyxZQUFRLGVBRFQ7QUFFQyxnQkFBWSxTQUZiO0FBR0MsY0FBVSxZQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxRQVBYO0FBUUMsbUJBQWUsb1FBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBalprQixFQTJabEI7QUFDQyxZQUFRLGVBRFQ7QUFFQyxnQkFBWSxvQ0FGYjtBQUdDLGNBQVUsUUFIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLG9RQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFdBQWQ7QUFUZixDQTNaa0IsRUFxYWxCO0FBQ0MsWUFBUSxZQURUO0FBRUMsZ0JBQVksa0JBRmI7QUFHQyxjQUFVLFVBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFVBUFg7QUFRQyxtQkFBZSxvUUFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0FyYWtCLEVBK2FsQjtBQUNDLFlBQVEsZ0JBRFQ7QUFFQyxnQkFBWSx3QkFGYjtBQUdDLGNBQVUsa0JBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSxvUUFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0EvYWtCLEVBeWJsQjtBQUNDLFlBQVEsY0FEVDtBQUVDLGdCQUFZLHNCQUZiO0FBR0MsY0FBVSxxQkFIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLG9RQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFdBQWQ7QUFUZixDQXpia0IsRUFtY2xCO0FBQ0MsWUFBUSxhQURUO0FBRUMsZ0JBQVksdUJBRmI7QUFHQyxjQUFVLFdBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSxvUUFSaEI7QUFTQyxrQkFBYyxDQUFDLGdCQUFELEVBQW1CLFdBQW5CO0FBVGYsQ0FuY2tCLEVBNmNsQjtBQUNDLFlBQVEsaUJBRFQ7QUFFQyxnQkFBWSxhQUZiO0FBR0MsY0FBVSxRQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxRQVBYO0FBUUMsbUJBQWUsb1FBUmhCO0FBU0Msa0JBQWMsQ0FBQyxnQkFBRCxFQUFtQixXQUFuQjtBQVRmLENBN2NrQixFQXVkbEI7QUFDQyxZQUFRLGdCQURUO0FBRUMsZ0JBQVksY0FGYjtBQUdDLGNBQVUsT0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsS0FOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLG9RQVJoQjtBQVNDLGtCQUFjLENBQUMsZ0JBQUQsRUFBbUIsV0FBbkI7QUFUZixDQXZka0IsRUFpZWxCO0FBQ0MsWUFBUSxZQURUO0FBRUMsZ0JBQVksNEJBRmI7QUFHQyxjQUFVLFFBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSxvUUFSaEI7QUFTQyxrQkFBYyxDQUFDLGdCQUFELEVBQW1CLFdBQW5CO0FBVGYsQ0FqZWtCLEVBMmVsQjtBQUNDLFlBQVEsY0FEVDtBQUVDLGdCQUFZLGNBRmI7QUFHQyxjQUFVLFdBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLGdCQUFELEVBQW1CLFdBQW5CO0FBVGYsQ0EzZWtCLEVBcWZsQjtBQUNDLFlBQVEsWUFEVDtBQUVDLGdCQUFZLGVBRmI7QUFHQyxjQUFVLE1BSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLGdCQUFELEVBQW1CLFdBQW5CO0FBVGYsQ0FyZmtCLEVBK2ZsQjtBQUNDLFlBQVEsZ0JBRFQ7QUFFQyxnQkFBWSxnQkFGYjtBQUdDLGNBQVUsT0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsS0FOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsZ0JBQUQsRUFBbUIsV0FBbkI7QUFUZixDQS9ma0IsRUF5Z0JsQjtBQUNDLFlBQVEsaUJBRFQ7QUFFQyxnQkFBWSx3QkFGYjtBQUdDLGNBQVUsK0JBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLGdCQUFELEVBQW1CLFdBQW5CO0FBVGYsQ0F6Z0JrQixFQW1oQmxCO0FBQ0MsWUFBUSxhQURUO0FBRUMsZ0JBQVksOEJBRmI7QUFHQyxjQUFVLE9BSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFVBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLGdCQUFELEVBQW1CLFdBQW5CO0FBVGYsQ0FuaEJrQixFQTZoQmxCO0FBQ0MsWUFBUSxlQURUO0FBRUMsZ0JBQVksbUNBRmI7QUFHQyxjQUFVLFFBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLGdCQUFELEVBQW1CLFdBQW5CO0FBVGYsQ0E3aEJrQixFQXVpQmxCO0FBQ0MsWUFBUSxZQURUO0FBRUMsZ0JBQVksZUFGYjtBQUdDLGNBQVUsa0JBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLGdCQUFELEVBQW1CLFdBQW5CO0FBVGYsQ0F2aUJrQixFQWlqQmxCO0FBQ0MsWUFBUSxlQURUO0FBRUMsZ0JBQVkscUNBRmI7QUFHQyxjQUFVLFlBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLGdCQUFELEVBQW1CLFdBQW5CO0FBVGYsQ0FqakJrQixFQTJqQmxCO0FBQ0MsWUFBUSxnQkFEVDtBQUVDLGdCQUFZLGtDQUZiO0FBR0MsY0FBVSxTQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxRQVBYO0FBUUMsbUJBQWUsdUxBUmhCO0FBU0Msa0JBQWMsQ0FBQyxnQkFBRCxFQUFtQixXQUFuQjtBQVRmLENBM2pCa0IsRUFxa0JsQjtBQUNDLFlBQVEsZ0JBRFQ7QUFFQyxnQkFBWSw2QkFGYjtBQUdDLGNBQVUsT0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsZ0JBQUQsRUFBbUIsV0FBbkI7QUFUZixDQXJrQmtCLEVBK2tCbEI7QUFDQyxZQUFRLGVBRFQ7QUFFQyxnQkFBWSxtQkFGYjtBQUdDLGNBQVUsa0JBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLGdCQUFELEVBQW1CLGlCQUFuQjtBQVRmLENBL2tCa0IsRUF5bEJsQjtBQUNDLFlBQVEsY0FEVDtBQUVDLGdCQUFZLDRCQUZiO0FBR0MsY0FBVSxnQ0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsZ0JBQUQsRUFBbUIsaUJBQW5CO0FBVGYsQ0F6bEJrQixFQW1tQmxCO0FBQ0MsWUFBUSxrQkFEVDtBQUVDLGdCQUFZLFlBRmI7QUFHQyxjQUFVLFVBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLGdCQUFELEVBQW1CLGlCQUFuQjtBQVRmLENBbm1Ca0IsRUE2bUJsQjtBQUNDLFlBQVEsYUFEVDtBQUVDLGdCQUFZLHNCQUZiO0FBR0MsY0FBVSxTQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxLQU5YO0FBT0MsY0FBVSxRQVBYO0FBUUMsbUJBQWUsdUxBUmhCO0FBU0Msa0JBQWMsQ0FBQyxnQkFBRCxFQUFtQixpQkFBbkI7QUFUZixDQTdtQmtCLEVBdW5CbEI7QUFDQyxZQUFRLGdCQURUO0FBRUMsZ0JBQVksU0FGYjtBQUdDLGNBQVUsTUFIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsZ0JBQUQsRUFBbUIsaUJBQW5CO0FBVGYsQ0F2bkJrQixFQWlvQmxCO0FBQ0MsWUFBUSxvQkFEVDtBQUVDLGdCQUFZLDJCQUZiO0FBR0MsY0FBVSxPQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxRQVBYO0FBUUMsbUJBQWUsdUxBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBam9Ca0IsRUEyb0JsQjtBQUNDLFlBQVEsZUFEVDtBQUVDLGdCQUFZLGVBRmI7QUFHQyxjQUFVLFFBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0Ezb0JrQixFQXFwQmxCO0FBQ0MsWUFBUSxnQkFEVDtBQUVDLGdCQUFZLGlDQUZiO0FBR0MsY0FBVSxhQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxRQVBYO0FBUUMsbUJBQWUsdUxBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBcnBCa0IsRUErcEJsQjtBQUNDLFlBQVEsY0FEVDtBQUVDLGdCQUFZLFlBRmI7QUFHQyxjQUFVLE1BSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSxrTEFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0EvcEJrQixFQXlxQmxCO0FBQ0MsWUFBUSxhQURUO0FBRUMsZ0JBQVksaUJBRmI7QUFHQyxjQUFVLHVCQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxRQVBYO0FBUUMsbUJBQWUsa0xBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBenFCa0IsRUFtckJsQjtBQUNDLFlBQVEsY0FEVDtBQUVDLGdCQUFZLG1CQUZiO0FBR0MsY0FBVSxTQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxRQVBYO0FBUUMsbUJBQWUsa0xBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBbnJCa0IsRUE2ckJsQjtBQUNDLFlBQVEsZUFEVDtBQUVDLGdCQUFZLGFBRmI7QUFHQyxjQUFVLFFBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSxrTEFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0E3ckJrQixFQXVzQmxCO0FBQ0MsWUFBUSxtQkFEVDtBQUVDLGdCQUFZLG1CQUZiO0FBR0MsY0FBVSxVQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxRQVBYO0FBUUMsbUJBQWUsa0xBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBdnNCa0IsRUFpdEJsQjtBQUNDLFlBQVEsa0JBRFQ7QUFFQyxnQkFBWSx5QkFGYjtBQUdDLGNBQVUsYUFIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLGtMQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFdBQWQ7QUFUZixDQWp0QmtCLEVBMnRCbEI7QUFDQyxZQUFRLGNBRFQ7QUFFQyxnQkFBWSxrQkFGYjtBQUdDLGNBQVUsTUFIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLGtMQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFdBQWQ7QUFUZixDQTN0QmtCLEVBcXVCbEI7QUFDQyxZQUFRLGlCQURUO0FBRUMsZ0JBQVksV0FGYjtBQUdDLGNBQVUsbUJBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLEtBTlg7QUFPQyxjQUFVLFVBUFg7QUFRQyxtQkFBZSxrTEFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0FydUJrQixFQSt1QmxCO0FBQ0MsWUFBUSxhQURUO0FBRUMsZ0JBQVksb0JBRmI7QUFHQyxjQUFVLFFBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFVBUFg7QUFRQyxtQkFBZSxrTEFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0EvdUJrQixFQXl2QmxCO0FBQ0MsWUFBUSxpQkFEVDtBQUVDLGdCQUFZLGlDQUZiO0FBR0MsY0FBVSxTQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxLQU5YO0FBT0MsY0FBVSxRQVBYO0FBUUMsbUJBQWUsa0xBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBenZCa0IsRUFtd0JsQjtBQUNDLFlBQVEsWUFEVDtBQUVDLGdCQUFZLHNCQUZiO0FBR0MsY0FBVSw2QkFIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsS0FOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLGtMQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFdBQWQ7QUFUZixDQW53QmtCLEVBNndCbEI7QUFDQyxZQUFRLGVBRFQ7QUFFQyxnQkFBWSxrQkFGYjtBQUdDLGNBQVUseUJBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFVBUFg7QUFRQyxtQkFBZSxrTEFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0E3d0JrQixFQXV4QmxCO0FBQ0MsWUFBUSxnQkFEVDtBQUVDLGdCQUFZLGlCQUZiO0FBR0MsY0FBVSxZQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxVQVBYO0FBUUMsbUJBQWUsa0xBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBdnhCa0IsRUFpeUJsQjtBQUNDLFlBQVEsYUFEVDtBQUVDLGdCQUFZLG1CQUZiO0FBR0MsY0FBVSxhQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxVQVBYO0FBUUMsbUJBQWUseUVBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBanlCa0IsRUEyeUJsQjtBQUNDLFlBQVEsWUFEVDtBQUVDLGdCQUFZLFlBRmI7QUFHQyxjQUFVLFNBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLEtBTlg7QUFPQyxjQUFVLFVBUFg7QUFRQyxtQkFBZSx5RUFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0EzeUJrQixFQXF6QmxCO0FBQ0MsWUFBUSxlQURUO0FBRUMsZ0JBQVksMEJBRmI7QUFHQyxjQUFVLFFBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFVBUFg7QUFRQyxtQkFBZSx5RUFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0FyekJrQixFQSt6QmxCO0FBQ0MsWUFBUSxnQkFEVDtBQUVDLGdCQUFZLFVBRmI7QUFHQyxjQUFVLFVBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLEtBTlg7QUFPQyxjQUFVLFVBUFg7QUFRQyxtQkFBZSx5RUFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0EvekJrQixFQXkwQmxCO0FBQ0MsWUFBUSxZQURUO0FBRUMsZ0JBQVksVUFGYjtBQUdDLGNBQVUsV0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsVUFQWDtBQVFDLG1CQUFlLHlFQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFdBQWQ7QUFUZixDQXowQmtCLEVBbTFCbEI7QUFDQyxZQUFRLG9CQURUO0FBRUMsZ0JBQVksMkJBRmI7QUFHQyxjQUFVLHlCQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxVQVBYO0FBUUMsbUJBQWUseUVBUmhCO0FBU0Msa0JBQWMsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQVRmLENBbjFCa0IsRUE2MUJsQjtBQUNDLFlBQVEsYUFEVDtBQUVDLGdCQUFZLGNBRmI7QUFHQyxjQUFVLGNBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFVBUFg7QUFRQyxtQkFBZSx5RUFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0E3MUJrQixFQXUyQmxCO0FBQ0MsWUFBUSxnQkFEVDtBQUVDLGdCQUFZLFVBRmI7QUFHQyxjQUFVLFFBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFVBUFg7QUFRQyxtQkFBZSx5RUFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0F2MkJrQixFQWkzQmxCO0FBQ0MsWUFBUSxhQURUO0FBRUMsZ0JBQVksbUJBRmI7QUFHQyxjQUFVLFFBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSxrTEFSaEI7QUFTQyxrQkFBYyxDQUFDLFdBQUQsRUFBYyxXQUFkO0FBVGYsQ0FqM0JrQixFQTIzQmxCO0FBQ0MsWUFBUSxpQkFEVDtBQUVDLGdCQUFZLHdCQUZiO0FBR0MsY0FBVSx1QkFIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsV0FBRCxFQUFjLFdBQWQ7QUFUZixDQTMzQmtCLEVBcTRCbEI7QUFDQyxZQUFRLGVBRFQ7QUFFQyxnQkFBWSxtQkFGYjtBQUdDLGNBQVUsU0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsZUFBRDtBQVRmLENBcjRCa0IsRUErNEJsQjtBQUNDLFlBQVEsY0FEVDtBQUVDLGdCQUFZLG9DQUZiO0FBR0MsY0FBVSxTQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxRQVBYO0FBUUMsbUJBQWUsdUxBUmhCO0FBU0Msa0JBQWMsQ0FBQyxlQUFEO0FBVGYsQ0EvNEJrQixFQXk1QmxCO0FBQ0MsWUFBUSxlQURUO0FBRUMsZ0JBQVksZUFGYjtBQUdDLGNBQVUsYUFIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsZUFBRDtBQVRmLENBejVCa0IsRUFtNkJsQjtBQUNDLFlBQVEsYUFEVDtBQUVDLGdCQUFZLGlCQUZiO0FBR0MsY0FBVSw4Q0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsZUFBRDtBQVRmLENBbjZCa0IsRUE2NkJsQjtBQUNDLFlBQVEsaUJBRFQ7QUFFQyxnQkFBWSxpQkFGYjtBQUdDLGNBQVUsa0NBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLE1BTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLGVBQUQ7QUFUZixDQTc2QmtCLEVBdTdCbEI7QUFDQyxZQUFRLGtCQURUO0FBRUMsZ0JBQVksbUJBRmI7QUFHQyxjQUFVLFVBSFg7QUFJQyxXQUFPLEVBQUUsT0FBTyxNQUFULEVBSlI7QUFLQyxpQkFBYSxJQUFJLElBQUosQ0FBUyxZQUFULENBTGQ7QUFNQyxjQUFVLEtBTlg7QUFPQyxjQUFVLFFBUFg7QUFRQyxtQkFBZSx1TEFSaEI7QUFTQyxrQkFBYyxDQUFDLGVBQUQ7QUFUZixDQXY3QmtCLEVBaThCbEI7QUFDQyxZQUFRLGVBRFQ7QUFFQyxnQkFBWSxvQkFGYjtBQUdDLGNBQVUsY0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsZUFBRDtBQVRmLENBajhCa0IsRUEyOEJsQjtBQUNDLFlBQVEsZ0JBRFQ7QUFFQyxnQkFBWSxxQkFGYjtBQUdDLGNBQVUsWUFIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsTUFOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsZUFBRDtBQVRmLENBMzhCa0IsRUFxOUJsQjtBQUNDLFlBQVEsaUJBRFQ7QUFFQyxnQkFBWSxxQkFGYjtBQUdDLGNBQVUsY0FIWDtBQUlDLFdBQU8sRUFBRSxPQUFPLE1BQVQsRUFKUjtBQUtDLGlCQUFhLElBQUksSUFBSixDQUFTLFlBQVQsQ0FMZDtBQU1DLGNBQVUsS0FOWDtBQU9DLGNBQVUsUUFQWDtBQVFDLG1CQUFlLHVMQVJoQjtBQVNDLGtCQUFjLENBQUMsZUFBRDtBQVRmLENBcjlCa0IsRUErOUJsQjtBQUNDLFlBQVEsYUFEVDtBQUVDLGdCQUFZLHNCQUZiO0FBR0MsY0FBVSxTQUhYO0FBSUMsV0FBTyxFQUFFLE9BQU8sTUFBVCxFQUpSO0FBS0MsaUJBQWEsSUFBSSxJQUFKLENBQVMsWUFBVCxDQUxkO0FBTUMsY0FBVSxNQU5YO0FBT0MsY0FBVSxRQVBYO0FBUUMsbUJBQWUsdUxBUmhCO0FBU0Msa0JBQWMsQ0FBQyxlQUFEO0FBVGYsQ0EvOUJrQixDQUFsQiIsImZpbGUiOiJUYWJsZURhdGEuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pnb2RpL25vdm8tZGV2L2xpYnMvbm92by1lbGVtZW50cyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBUYWJsZURhdGEgPSBbXG4gICAge1xuICAgICAgICAnbmFtZSc6ICdWaWN0b3JpYSBDYW50cmVsbCcsXG4gICAgICAgICdwb3NpdGlvbic6ICdJbnRlZ2VyIENvcnBvcmF0aW9uJyxcbiAgICAgICAgJ29mZmljZSc6ICdDcm9hdGlhJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDgvMTknKSxcbiAgICAgICAgJ3NhbGFyeSc6IDIwODE3OCxcbiAgICAgICAgJ3N0YXR1cyc6ICdOZXcgTGVhZCcsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnUGVhcmwgQ3Jvc2J5JyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0luIFBDJyxcbiAgICAgICAgJ29mZmljZSc6ICdDYW1ib2RpYScsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzEwLzA4JyksXG4gICAgICAgICdzYWxhcnknOiAxMTQzNjcsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1doZW4gdGhlcmUgd2FzIGRlc3BhaXIgaW4gdGhlIGR1c3QgYm93bCBhbmQgZGVwcmVzc2lvbiBhY3Jvc3MgdGhlIGxhbmQsIHNoZSBzYXcgYSBuYXRpb24gY29ucXVlciBmZWFyIGl0c2VsZiB3aXRoIGEgTmV3IERlYWwsIG5ldyBqb2JzIGFuZCBhIG5ldyBzZW5zZSBvZiBjb21tb24gcHVycG9zZS4gWWVzIHdlIGNhbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdDb2xldHRlIEZvbGV5JyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0xvcmVtIEluYy4nLFxuICAgICAgICAnb2ZmaWNlJzogJ0tvcmVhLCBOb3J0aCcsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzA3LzE5JyksXG4gICAgICAgICdzYWxhcnknOiA3MjE0NzMsXG4gICAgICAgICdzdGF0dXMnOiAnQXJjaGl2ZWQnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVG8gbXkgY2FtcGFpZ24gbWFuYWdlciBEYXZpZCBQbG91ZmZlLCBteSBjaGllZiBzdHJhdGVnaXN0IERhdmlkIEF4ZWxyb2QsIGFuZCB0aGUgYmVzdCBjYW1wYWlnbiB0ZWFtIGV2ZXIgYXNzZW1ibGVkIGluIHRoZSBoaXN0b3J5IG9mIHBvbGl0aWNzIOKAkyB5b3UgbWFkZSB0aGlzIGhhcHBlbiwgYW5kIEkgYW0gZm9yZXZlciBncmF0ZWZ1bCBmb3Igd2hhdCB5b3XigJl2ZSBzYWNyaWZpY2VkIHRvIGdldCBpdCBkb25lLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0FuYXN0YXNpYSBTaGFmZmVyJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0RvbG9yIE51bGxhIFNlbXBlciBMTEMnLFxuICAgICAgICAnb2ZmaWNlJzogJ1N1cmluYW1lJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDQvMjAnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDI2NDYyMCxcbiAgICAgICAgJ3N0YXR1cyc6ICdOZXcgTGVhZCcsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdBbmQgdG8gYWxsIHRob3NlIHdhdGNoaW5nIHRvbmlnaHQgZnJvbSBiZXlvbmQgb3VyIHNob3JlcywgZnJvbSBwYXJsaWFtZW50cyBhbmQgcGFsYWNlcyB0byB0aG9zZSB3aG8gYXJlIGh1ZGRsZWQgYXJvdW5kIHJhZGlvcyBpbiB0aGUgZm9yZ290dGVuIGNvcm5lcnMgb2Ygb3VyIHdvcmxkIOKAkyBvdXIgc3RvcmllcyBhcmUgc2luZ3VsYXIsIGJ1dCBvdXIgZGVzdGlueSBpcyBzaGFyZWQsIGFuZCBhIG5ldyBkYXduIG9mIEFtZXJpY2FuIGxlYWRlcnNoaXAgaXMgYXQgaGFuZC4gVG8gdGhvc2Ugd2hvIHdvdWxkIHRlYXIgdGhpcyB3b3JsZCBkb3duIOKAkyB3ZSB3aWxsIGRlZmVhdCB5b3UuIFRvIHRob3NlIHdobyBzZWVrIHBlYWNlIGFuZCBzZWN1cml0eSDigJMgd2Ugc3VwcG9ydCB5b3UuIEFuZCB0byBhbGwgdGhvc2Ugd2hvIGhhdmUgd29uZGVyZWQgaWYgQW1lcmljYeKAmXMgYmVhY29uIHN0aWxsIGJ1cm5zIGFzIGJyaWdodCDigJMgdG9uaWdodCB3ZSBwcm92ZWQgb25jZSBtb3JlIHRoYXQgdGhlIHRydWUgc3RyZW5ndGggb2Ygb3VyIG5hdGlvbiBjb21lcyBub3QgZnJvbSBvdXIgdGhlIG1pZ2h0IG9mIG91ciBhcm1zIG9yIHRoZSBzY2FsZSBvZiBvdXIgd2VhbHRoLCBidXQgZnJvbSB0aGUgZW5kdXJpbmcgcG93ZXIgb2Ygb3VyIGlkZWFsczogZGVtb2NyYWN5LCBsaWJlcnR5LCBvcHBvcnR1bml0eSwgYW5kIHVueWllbGRpbmcgaG9wZS4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdHYWJyaWVsIENhc3RybycsXG4gICAgICAgICdwb3NpdGlvbic6ICdTZWQgTGltaXRlZCcsXG4gICAgICAgICdvZmZpY2UnOiAnQmFocmFpbicsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzAzLzA0JyksXG4gICAgICAgICdzYWxhcnknOiA2NTEzNTAsXG4gICAgICAgICdzdGF0dXMnOiAnTmV3IExlYWQnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnSSB3YW50IHRvIHRoYW5rIG15IHBhcnRuZXIgaW4gdGhpcyBqb3VybmV5LCBhIG1hbiB3aG8gY2FtcGFpZ25lZCBmcm9tIGhpcyBoZWFydCBhbmQgc3Bva2UgZm9yIHRoZSBtZW4gYW5kIHdvbWVuIGhlIGdyZXcgdXAgd2l0aCBvbiB0aGUgc3RyZWV0cyBvZiBTY3JhbnRvbiBhbmQgcm9kZSB3aXRoIG9uIHRoYXQgdHJhaW4gaG9tZSB0byBEZWxhd2FyZSwgdGhlIFZpY2UgUHJlc2lkZW50LWVsZWN0IG9mIHRoZSBVbml0ZWQgU3RhdGVzLCBKb2UgQmlkZW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnQ2hlcm9rZWUgV2FyZScsXG4gICAgICAgICdwb3NpdGlvbic6ICdUaW5jaWR1bnQgTExDJyxcbiAgICAgICAgJ29mZmljZSc6ICdVbml0ZWQgS2luZ2RvbSAoR3JlYXQgQnJpdGFpbiknLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wNi8xNycpLFxuICAgICAgICAnc2FsYXJ5JzogNjY2MjU5LFxuICAgICAgICAnc3RhdHVzJzogJ05ldyBMZWFkJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0l04oCZcyBiZWVuIGEgbG9uZyB0aW1lIGNvbWluZywgYnV0IHRvbmlnaHQsIGJlY2F1c2Ugb2Ygd2hhdCB3ZSBkaWQgb24gdGhpcyBkYXksIGluIHRoaXMgZWxlY3Rpb24sIGF0IHRoaXMgZGVmaW5pbmcgbW9tZW50LCBjaGFuZ2UgaGFzIGNvbWUgdG8gQW1lcmljYS4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdCYXJyeSBNb3NzJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ1NvY2lpcyBJbmR1c3RyaWVzJyxcbiAgICAgICAgJ29mZmljZSc6ICdXZXN0ZXJuIFNhaGFyYScsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzA4LzEzJyksXG4gICAgICAgICdzYWxhcnknOiA1NDE2MzEsXG4gICAgICAgICdzdGF0dXMnOiAnTmV3IExlYWQnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVG8gbXkgY2FtcGFpZ24gbWFuYWdlciBEYXZpZCBQbG91ZmZlLCBteSBjaGllZiBzdHJhdGVnaXN0IERhdmlkIEF4ZWxyb2QsIGFuZCB0aGUgYmVzdCBjYW1wYWlnbiB0ZWFtIGV2ZXIgYXNzZW1ibGVkIGluIHRoZSBoaXN0b3J5IG9mIHBvbGl0aWNzIOKAkyB5b3UgbWFkZSB0aGlzIGhhcHBlbiwgYW5kIEkgYW0gZm9yZXZlciBncmF0ZWZ1bCBmb3Igd2hhdCB5b3XigJl2ZSBzYWNyaWZpY2VkIHRvIGdldCBpdCBkb25lLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ01hcnlhbSBUdWNrZXInLFxuICAgICAgICAncG9zaXRpb24nOiAnRWxpdCBQZWRlIE1hbGVzdWFkYSBJbmMuJyxcbiAgICAgICAgJ29mZmljZSc6ICdCcmF6aWwnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8xMC8wMicpLFxuICAgICAgICAnc2FsYXJ5JzogMTgyMjk0LFxuICAgICAgICAnc3RhdHVzJzogJ05ldyBMZWFkJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RvIG15IGNhbXBhaWduIG1hbmFnZXIgRGF2aWQgUGxvdWZmZSwgbXkgY2hpZWYgc3RyYXRlZ2lzdCBEYXZpZCBBeGVscm9kLCBhbmQgdGhlIGJlc3QgY2FtcGFpZ24gdGVhbSBldmVyIGFzc2VtYmxlZCBpbiB0aGUgaGlzdG9yeSBvZiBwb2xpdGljcyDigJMgeW91IG1hZGUgdGhpcyBoYXBwZW4sIGFuZCBJIGFtIGZvcmV2ZXIgZ3JhdGVmdWwgZm9yIHdoYXQgeW914oCZdmUgc2FjcmlmaWNlZCB0byBnZXQgaXQgZG9uZS4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdDb25zdGFuY2UgQ2xheXRvbicsXG4gICAgICAgICdwb3NpdGlvbic6ICdBdWN0b3IgVmVsaXQgQWxpcXVhbSBMTFAnLFxuICAgICAgICAnb2ZmaWNlJzogJ1VuaXRlZCBBcmFiIEVtaXJhdGVzJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDgvMDEnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDIxODU5NyxcbiAgICAgICAgJ3N0YXR1cyc6ICdOZXcgTGVhZCcsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUbyBteSBjYW1wYWlnbiBtYW5hZ2VyIERhdmlkIFBsb3VmZmUsIG15IGNoaWVmIHN0cmF0ZWdpc3QgRGF2aWQgQXhlbHJvZCwgYW5kIHRoZSBiZXN0IGNhbXBhaWduIHRlYW0gZXZlciBhc3NlbWJsZWQgaW4gdGhlIGhpc3Rvcnkgb2YgcG9saXRpY3Mg4oCTIHlvdSBtYWRlIHRoaXMgaGFwcGVuLCBhbmQgSSBhbSBmb3JldmVyIGdyYXRlZnVsIGZvciB3aGF0IHlvdeKAmXZlIHNhY3JpZmljZWQgdG8gZ2V0IGl0IGRvbmUuJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnUm9nYW4gVHVja2VyJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0FyY3UgVmVzdGlidWx1bSBBbnRlIEFzc29jaWF0ZXMnLFxuICAgICAgICAnb2ZmaWNlJzogJ0plcnNleScsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzAxLzA0JyksXG4gICAgICAgICdzYWxhcnknOiA4NjE2MzIsXG4gICAgICAgICdzdGF0dXMnOiAnTmV3IExlYWQnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVG8gbXkgY2FtcGFpZ24gbWFuYWdlciBEYXZpZCBQbG91ZmZlLCBteSBjaGllZiBzdHJhdGVnaXN0IERhdmlkIEF4ZWxyb2QsIGFuZCB0aGUgYmVzdCBjYW1wYWlnbiB0ZWFtIGV2ZXIgYXNzZW1ibGVkIGluIHRoZSBoaXN0b3J5IG9mIHBvbGl0aWNzIOKAkyB5b3UgbWFkZSB0aGlzIGhhcHBlbiwgYW5kIEkgYW0gZm9yZXZlciBncmF0ZWZ1bCBmb3Igd2hhdCB5b3XigJl2ZSBzYWNyaWZpY2VkIHRvIGdldCBpdCBkb25lLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0VtZXJ5IE1jZG93ZWxsJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0dyYXZpZGEgQ29tcGFueScsXG4gICAgICAgICdvZmZpY2UnOiAnTmV3IFplYWxhbmQnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wNi8wMicpLFxuICAgICAgICAnc2FsYXJ5JzogNDEzNTY4LFxuICAgICAgICAnc3RhdHVzJzogJ05ldyBMZWFkJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RvIG15IGNhbXBhaWduIG1hbmFnZXIgRGF2aWQgUGxvdWZmZSwgbXkgY2hpZWYgc3RyYXRlZ2lzdCBEYXZpZCBBeGVscm9kLCBhbmQgdGhlIGJlc3QgY2FtcGFpZ24gdGVhbSBldmVyIGFzc2VtYmxlZCBpbiB0aGUgaGlzdG9yeSBvZiBwb2xpdGljcyDigJMgeW91IG1hZGUgdGhpcyBoYXBwZW4sIGFuZCBJIGFtIGZvcmV2ZXIgZ3JhdGVmdWwgZm9yIHdoYXQgeW914oCZdmUgc2FjcmlmaWNlZCB0byBnZXQgaXQgZG9uZS4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdZYWVsIEdyZWVyJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ09yY2kgTGltaXRlZCcsXG4gICAgICAgICdvZmZpY2UnOiAnTWFkYWdhc2NhcicsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzEyLzA0JyksXG4gICAgICAgICdzYWxhcnknOiAxMjE4MzEsXG4gICAgICAgICdzdGF0dXMnOiAnTmV3IExlYWQnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVG8gbXkgY2FtcGFpZ24gbWFuYWdlciBEYXZpZCBQbG91ZmZlLCBteSBjaGllZiBzdHJhdGVnaXN0IERhdmlkIEF4ZWxyb2QsIGFuZCB0aGUgYmVzdCBjYW1wYWlnbiB0ZWFtIGV2ZXIgYXNzZW1ibGVkIGluIHRoZSBoaXN0b3J5IG9mIHBvbGl0aWNzIOKAkyB5b3UgbWFkZSB0aGlzIGhhcHBlbiwgYW5kIEkgYW0gZm9yZXZlciBncmF0ZWZ1bCBmb3Igd2hhdCB5b3XigJl2ZSBzYWNyaWZpY2VkIHRvIGdldCBpdCBkb25lLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0phcmVkIEJ1cmdlc3MnLFxuICAgICAgICAncG9zaXRpb24nOiAnQXVjdG9yIEluY29ycG9yYXRlZCcsXG4gICAgICAgICdvZmZpY2UnOiAnQnVydW5kaScsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzAxLzEyJyksXG4gICAgICAgICdzYWxhcnknOiA2MjI0MyxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVG8gbXkgY2FtcGFpZ24gbWFuYWdlciBEYXZpZCBQbG91ZmZlLCBteSBjaGllZiBzdHJhdGVnaXN0IERhdmlkIEF4ZWxyb2QsIGFuZCB0aGUgYmVzdCBjYW1wYWlnbiB0ZWFtIGV2ZXIgYXNzZW1ibGVkIGluIHRoZSBoaXN0b3J5IG9mIHBvbGl0aWNzIOKAkyB5b3UgbWFkZSB0aGlzIGhhcHBlbiwgYW5kIEkgYW0gZm9yZXZlciBncmF0ZWZ1bCBmb3Igd2hhdCB5b3XigJl2ZSBzYWNyaWZpY2VkIHRvIGdldCBpdCBkb25lLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ1NoYXJvbiBDYW1wYmVsbCcsXG4gICAgICAgICdwb3NpdGlvbic6ICdFbGl0IEN1cmFiaXR1ciBTZWQgQ29uc3VsdGluZycsXG4gICAgICAgICdvZmZpY2UnOiAnQ29tb3JvcycsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzA5LzE0JyksXG4gICAgICAgICdzYWxhcnknOiAyMDA4NTQsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RvIG15IGNhbXBhaWduIG1hbmFnZXIgRGF2aWQgUGxvdWZmZSwgbXkgY2hpZWYgc3RyYXRlZ2lzdCBEYXZpZCBBeGVscm9kLCBhbmQgdGhlIGJlc3QgY2FtcGFpZ24gdGVhbSBldmVyIGFzc2VtYmxlZCBpbiB0aGUgaGlzdG9yeSBvZiBwb2xpdGljcyDigJMgeW91IG1hZGUgdGhpcyBoYXBwZW4sIGFuZCBJIGFtIGZvcmV2ZXIgZ3JhdGVmdWwgZm9yIHdoYXQgeW914oCZdmUgc2FjcmlmaWNlZCB0byBnZXQgaXQgZG9uZS4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ0ZpbmFuY2UnXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnWWVvIENodXJjaCcsXG4gICAgICAgICdwb3NpdGlvbic6ICdEb25lYyBWaXRhZSBFcmF0IFBDJyxcbiAgICAgICAgJ29mZmljZSc6ICdTYXVkaSBBcmFiaWEnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wNi8wNycpLFxuICAgICAgICAnc2FsYXJ5JzogNTgxMTkzLFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUbyBteSBjYW1wYWlnbiBtYW5hZ2VyIERhdmlkIFBsb3VmZmUsIG15IGNoaWVmIHN0cmF0ZWdpc3QgRGF2aWQgQXhlbHJvZCwgYW5kIHRoZSBiZXN0IGNhbXBhaWduIHRlYW0gZXZlciBhc3NlbWJsZWQgaW4gdGhlIGhpc3Rvcnkgb2YgcG9saXRpY3Mg4oCTIHlvdSBtYWRlIHRoaXMgaGFwcGVuLCBhbmQgSSBhbSBmb3JldmVyIGdyYXRlZnVsIGZvciB3aGF0IHlvdeKAmXZlIHNhY3JpZmljZWQgdG8gZ2V0IGl0IGRvbmUuJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdGaW5hbmNlJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0t5bGllIEJhcmxvdycsXG4gICAgICAgICdwb3NpdGlvbic6ICdGZXJtZW50dW0gUmlzdXMgQ29ycG9yYXRpb24nLFxuICAgICAgICAnb2ZmaWNlJzogJ1BhcHVhIE5ldyBHdWluZWEnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8xMi8wMycpLFxuICAgICAgICAnc2FsYXJ5JzogNDE4MTE1LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdBbmQgdG8gYWxsIHRob3NlIHdhdGNoaW5nIHRvbmlnaHQgZnJvbSBiZXlvbmQgb3VyIHNob3JlcywgZnJvbSBwYXJsaWFtZW50cyBhbmQgcGFsYWNlcyB0byB0aG9zZSB3aG8gYXJlIGh1ZGRsZWQgYXJvdW5kIHJhZGlvcyBpbiB0aGUgZm9yZ290dGVuIGNvcm5lcnMgb2Ygb3VyIHdvcmxkIOKAkyBvdXIgc3RvcmllcyBhcmUgc2luZ3VsYXIsIGJ1dCBvdXIgZGVzdGlueSBpcyBzaGFyZWQsIGFuZCBhIG5ldyBkYXduIG9mIEFtZXJpY2FuIGxlYWRlcnNoaXAgaXMgYXQgaGFuZC4gVG8gdGhvc2Ugd2hvIHdvdWxkIHRlYXIgdGhpcyB3b3JsZCBkb3duIOKAkyB3ZSB3aWxsIGRlZmVhdCB5b3UuIFRvIHRob3NlIHdobyBzZWVrIHBlYWNlIGFuZCBzZWN1cml0eSDigJMgd2Ugc3VwcG9ydCB5b3UuIEFuZCB0byBhbGwgdGhvc2Ugd2hvIGhhdmUgd29uZGVyZWQgaWYgQW1lcmljYeKAmXMgYmVhY29uIHN0aWxsIGJ1cm5zIGFzIGJyaWdodCDigJMgdG9uaWdodCB3ZSBwcm92ZWQgb25jZSBtb3JlIHRoYXQgdGhlIHRydWUgc3RyZW5ndGggb2Ygb3VyIG5hdGlvbiBjb21lcyBub3QgZnJvbSBvdXIgdGhlIG1pZ2h0IG9mIG91ciBhcm1zIG9yIHRoZSBzY2FsZSBvZiBvdXIgd2VhbHRoLCBidXQgZnJvbSB0aGUgZW5kdXJpbmcgcG93ZXIgb2Ygb3VyIGlkZWFsczogZGVtb2NyYWN5LCBsaWJlcnR5LCBvcHBvcnR1bml0eSwgYW5kIHVueWllbGRpbmcgaG9wZS4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ0ZpbmFuY2UnXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnTmVsbCBMZW9uYXJkJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ1Zlc3RpYnVsdW0gQ29uc3VsdGluZycsXG4gICAgICAgICdvZmZpY2UnOiAnU2F1ZGkgQXJhYmlhJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDUvMjknKSxcbiAgICAgICAgJ3NhbGFyeSc6IDQ2NjIwMSxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQW5kIHRvIGFsbCB0aG9zZSB3YXRjaGluZyB0b25pZ2h0IGZyb20gYmV5b25kIG91ciBzaG9yZXMsIGZyb20gcGFybGlhbWVudHMgYW5kIHBhbGFjZXMgdG8gdGhvc2Ugd2hvIGFyZSBodWRkbGVkIGFyb3VuZCByYWRpb3MgaW4gdGhlIGZvcmdvdHRlbiBjb3JuZXJzIG9mIG91ciB3b3JsZCDigJMgb3VyIHN0b3JpZXMgYXJlIHNpbmd1bGFyLCBidXQgb3VyIGRlc3RpbnkgaXMgc2hhcmVkLCBhbmQgYSBuZXcgZGF3biBvZiBBbWVyaWNhbiBsZWFkZXJzaGlwIGlzIGF0IGhhbmQuIFRvIHRob3NlIHdobyB3b3VsZCB0ZWFyIHRoaXMgd29ybGQgZG93biDigJMgd2Ugd2lsbCBkZWZlYXQgeW91LiBUbyB0aG9zZSB3aG8gc2VlayBwZWFjZSBhbmQgc2VjdXJpdHkg4oCTIHdlIHN1cHBvcnQgeW91LiBBbmQgdG8gYWxsIHRob3NlIHdobyBoYXZlIHdvbmRlcmVkIGlmIEFtZXJpY2HigJlzIGJlYWNvbiBzdGlsbCBidXJucyBhcyBicmlnaHQg4oCTIHRvbmlnaHQgd2UgcHJvdmVkIG9uY2UgbW9yZSB0aGF0IHRoZSB0cnVlIHN0cmVuZ3RoIG9mIG91ciBuYXRpb24gY29tZXMgbm90IGZyb20gb3VyIHRoZSBtaWdodCBvZiBvdXIgYXJtcyBvciB0aGUgc2NhbGUgb2Ygb3VyIHdlYWx0aCwgYnV0IGZyb20gdGhlIGVuZHVyaW5nIHBvd2VyIG9mIG91ciBpZGVhbHM6IGRlbW9jcmFjeSwgbGliZXJ0eSwgb3Bwb3J0dW5pdHksIGFuZCB1bnlpZWxkaW5nIGhvcGUuJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdGaW5hbmNlJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0JyYW5kb24gRmxlbWluZycsXG4gICAgICAgICdwb3NpdGlvbic6ICdEb25lYyBFZ2VzdGFzIEFzc29jaWF0ZXMnLFxuICAgICAgICAnb2ZmaWNlJzogJ1BvbGFuZCcsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzAxLzIyJyksXG4gICAgICAgICdzYWxhcnknOiA4MDAwMTEsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0FuZCB0byBhbGwgdGhvc2Ugd2F0Y2hpbmcgdG9uaWdodCBmcm9tIGJleW9uZCBvdXIgc2hvcmVzLCBmcm9tIHBhcmxpYW1lbnRzIGFuZCBwYWxhY2VzIHRvIHRob3NlIHdobyBhcmUgaHVkZGxlZCBhcm91bmQgcmFkaW9zIGluIHRoZSBmb3Jnb3R0ZW4gY29ybmVycyBvZiBvdXIgd29ybGQg4oCTIG91ciBzdG9yaWVzIGFyZSBzaW5ndWxhciwgYnV0IG91ciBkZXN0aW55IGlzIHNoYXJlZCwgYW5kIGEgbmV3IGRhd24gb2YgQW1lcmljYW4gbGVhZGVyc2hpcCBpcyBhdCBoYW5kLiBUbyB0aG9zZSB3aG8gd291bGQgdGVhciB0aGlzIHdvcmxkIGRvd24g4oCTIHdlIHdpbGwgZGVmZWF0IHlvdS4gVG8gdGhvc2Ugd2hvIHNlZWsgcGVhY2UgYW5kIHNlY3VyaXR5IOKAkyB3ZSBzdXBwb3J0IHlvdS4gQW5kIHRvIGFsbCB0aG9zZSB3aG8gaGF2ZSB3b25kZXJlZCBpZiBBbWVyaWNh4oCZcyBiZWFjb24gc3RpbGwgYnVybnMgYXMgYnJpZ2h0IOKAkyB0b25pZ2h0IHdlIHByb3ZlZCBvbmNlIG1vcmUgdGhhdCB0aGUgdHJ1ZSBzdHJlbmd0aCBvZiBvdXIgbmF0aW9uIGNvbWVzIG5vdCBmcm9tIG91ciB0aGUgbWlnaHQgb2Ygb3VyIGFybXMgb3IgdGhlIHNjYWxlIG9mIG91ciB3ZWFsdGgsIGJ1dCBmcm9tIHRoZSBlbmR1cmluZyBwb3dlciBvZiBvdXIgaWRlYWxzOiBkZW1vY3JhY3ksIGxpYmVydHksIG9wcG9ydHVuaXR5LCBhbmQgdW55aWVsZGluZyBob3BlLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnRmluYW5jZSddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdJbmdhIFBlbmEnLFxuICAgICAgICAncG9zaXRpb24nOiAnRXQgTWFnbmlzIERpcyBMaW1pdGVkJyxcbiAgICAgICAgJ29mZmljZSc6ICdCZWxnaXVtJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDUvMTgnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDU2NDI0NSxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQW5kIHRvIGFsbCB0aG9zZSB3YXRjaGluZyB0b25pZ2h0IGZyb20gYmV5b25kIG91ciBzaG9yZXMsIGZyb20gcGFybGlhbWVudHMgYW5kIHBhbGFjZXMgdG8gdGhvc2Ugd2hvIGFyZSBodWRkbGVkIGFyb3VuZCByYWRpb3MgaW4gdGhlIGZvcmdvdHRlbiBjb3JuZXJzIG9mIG91ciB3b3JsZCDigJMgb3VyIHN0b3JpZXMgYXJlIHNpbmd1bGFyLCBidXQgb3VyIGRlc3RpbnkgaXMgc2hhcmVkLCBhbmQgYSBuZXcgZGF3biBvZiBBbWVyaWNhbiBsZWFkZXJzaGlwIGlzIGF0IGhhbmQuIFRvIHRob3NlIHdobyB3b3VsZCB0ZWFyIHRoaXMgd29ybGQgZG93biDigJMgd2Ugd2lsbCBkZWZlYXQgeW91LiBUbyB0aG9zZSB3aG8gc2VlayBwZWFjZSBhbmQgc2VjdXJpdHkg4oCTIHdlIHN1cHBvcnQgeW91LiBBbmQgdG8gYWxsIHRob3NlIHdobyBoYXZlIHdvbmRlcmVkIGlmIEFtZXJpY2HigJlzIGJlYWNvbiBzdGlsbCBidXJucyBhcyBicmlnaHQg4oCTIHRvbmlnaHQgd2UgcHJvdmVkIG9uY2UgbW9yZSB0aGF0IHRoZSB0cnVlIHN0cmVuZ3RoIG9mIG91ciBuYXRpb24gY29tZXMgbm90IGZyb20gb3VyIHRoZSBtaWdodCBvZiBvdXIgYXJtcyBvciB0aGUgc2NhbGUgb2Ygb3VyIHdlYWx0aCwgYnV0IGZyb20gdGhlIGVuZHVyaW5nIHBvd2VyIG9mIG91ciBpZGVhbHM6IGRlbW9jcmFjeSwgbGliZXJ0eSwgb3Bwb3J0dW5pdHksIGFuZCB1bnlpZWxkaW5nIGhvcGUuJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1Blcm1lbmFudCcsICdGaW5hbmNlJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0FyZGVuIFJ1c3NvJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0VzdCBUZW1wb3IgQmliZW5kdW0gQ29ycC4nLFxuICAgICAgICAnb2ZmaWNlJzogJ0RvbWluaWNhbiBSZXB1YmxpYycsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzA3LzIzJyksXG4gICAgICAgICdzYWxhcnknOiAzNTcyMjIsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0FuZCB0byBhbGwgdGhvc2Ugd2F0Y2hpbmcgdG9uaWdodCBmcm9tIGJleW9uZCBvdXIgc2hvcmVzLCBmcm9tIHBhcmxpYW1lbnRzIGFuZCBwYWxhY2VzIHRvIHRob3NlIHdobyBhcmUgaHVkZGxlZCBhcm91bmQgcmFkaW9zIGluIHRoZSBmb3Jnb3R0ZW4gY29ybmVycyBvZiBvdXIgd29ybGQg4oCTIG91ciBzdG9yaWVzIGFyZSBzaW5ndWxhciwgYnV0IG91ciBkZXN0aW55IGlzIHNoYXJlZCwgYW5kIGEgbmV3IGRhd24gb2YgQW1lcmljYW4gbGVhZGVyc2hpcCBpcyBhdCBoYW5kLiBUbyB0aG9zZSB3aG8gd291bGQgdGVhciB0aGlzIHdvcmxkIGRvd24g4oCTIHdlIHdpbGwgZGVmZWF0IHlvdS4gVG8gdGhvc2Ugd2hvIHNlZWsgcGVhY2UgYW5kIHNlY3VyaXR5IOKAkyB3ZSBzdXBwb3J0IHlvdS4gQW5kIHRvIGFsbCB0aG9zZSB3aG8gaGF2ZSB3b25kZXJlZCBpZiBBbWVyaWNh4oCZcyBiZWFjb24gc3RpbGwgYnVybnMgYXMgYnJpZ2h0IOKAkyB0b25pZ2h0IHdlIHByb3ZlZCBvbmNlIG1vcmUgdGhhdCB0aGUgdHJ1ZSBzdHJlbmd0aCBvZiBvdXIgbmF0aW9uIGNvbWVzIG5vdCBmcm9tIG91ciB0aGUgbWlnaHQgb2Ygb3VyIGFybXMgb3IgdGhlIHNjYWxlIG9mIG91ciB3ZWFsdGgsIGJ1dCBmcm9tIHRoZSBlbmR1cmluZyBwb3dlciBvZiBvdXIgaWRlYWxzOiBkZW1vY3JhY3ksIGxpYmVydHksIG9wcG9ydHVuaXR5LCBhbmQgdW55aWVsZGluZyBob3BlLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydQZXJtZW5hbnQnLCAnRmluYW5jZSddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdMaWJlcnR5IEdhbGxlZ29zJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ05lYyBEaWFtIExMQycsXG4gICAgICAgICdvZmZpY2UnOiAnR2hhbmEnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wNi8xOCcpLFxuICAgICAgICAnc2FsYXJ5JzogNTU0Mzc1LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdBbmQgdG8gYWxsIHRob3NlIHdhdGNoaW5nIHRvbmlnaHQgZnJvbSBiZXlvbmQgb3VyIHNob3JlcywgZnJvbSBwYXJsaWFtZW50cyBhbmQgcGFsYWNlcyB0byB0aG9zZSB3aG8gYXJlIGh1ZGRsZWQgYXJvdW5kIHJhZGlvcyBpbiB0aGUgZm9yZ290dGVuIGNvcm5lcnMgb2Ygb3VyIHdvcmxkIOKAkyBvdXIgc3RvcmllcyBhcmUgc2luZ3VsYXIsIGJ1dCBvdXIgZGVzdGlueSBpcyBzaGFyZWQsIGFuZCBhIG5ldyBkYXduIG9mIEFtZXJpY2FuIGxlYWRlcnNoaXAgaXMgYXQgaGFuZC4gVG8gdGhvc2Ugd2hvIHdvdWxkIHRlYXIgdGhpcyB3b3JsZCBkb3duIOKAkyB3ZSB3aWxsIGRlZmVhdCB5b3UuIFRvIHRob3NlIHdobyBzZWVrIHBlYWNlIGFuZCBzZWN1cml0eSDigJMgd2Ugc3VwcG9ydCB5b3UuIEFuZCB0byBhbGwgdGhvc2Ugd2hvIGhhdmUgd29uZGVyZWQgaWYgQW1lcmljYeKAmXMgYmVhY29uIHN0aWxsIGJ1cm5zIGFzIGJyaWdodCDigJMgdG9uaWdodCB3ZSBwcm92ZWQgb25jZSBtb3JlIHRoYXQgdGhlIHRydWUgc3RyZW5ndGggb2Ygb3VyIG5hdGlvbiBjb21lcyBub3QgZnJvbSBvdXIgdGhlIG1pZ2h0IG9mIG91ciBhcm1zIG9yIHRoZSBzY2FsZSBvZiBvdXIgd2VhbHRoLCBidXQgZnJvbSB0aGUgZW5kdXJpbmcgcG93ZXIgb2Ygb3VyIGlkZWFsczogZGVtb2NyYWN5LCBsaWJlcnR5LCBvcHBvcnR1bml0eSwgYW5kIHVueWllbGRpbmcgaG9wZS4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnUGVybWVuYW50JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdEZW5uaXMgWW9yaycsXG4gICAgICAgICdwb3NpdGlvbic6ICdOdWxsYW0gU3VzY2lwaXQgRm91bmRhdGlvbicsXG4gICAgICAgICdvZmZpY2UnOiAnTmFtaWJpYScsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzAzLzIwJyksXG4gICAgICAgICdzYWxhcnknOiA5MDQxNyxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQW5kIHRvIGFsbCB0aG9zZSB3YXRjaGluZyB0b25pZ2h0IGZyb20gYmV5b25kIG91ciBzaG9yZXMsIGZyb20gcGFybGlhbWVudHMgYW5kIHBhbGFjZXMgdG8gdGhvc2Ugd2hvIGFyZSBodWRkbGVkIGFyb3VuZCByYWRpb3MgaW4gdGhlIGZvcmdvdHRlbiBjb3JuZXJzIG9mIG91ciB3b3JsZCDigJMgb3VyIHN0b3JpZXMgYXJlIHNpbmd1bGFyLCBidXQgb3VyIGRlc3RpbnkgaXMgc2hhcmVkLCBhbmQgYSBuZXcgZGF3biBvZiBBbWVyaWNhbiBsZWFkZXJzaGlwIGlzIGF0IGhhbmQuIFRvIHRob3NlIHdobyB3b3VsZCB0ZWFyIHRoaXMgd29ybGQgZG93biDigJMgd2Ugd2lsbCBkZWZlYXQgeW91LiBUbyB0aG9zZSB3aG8gc2VlayBwZWFjZSBhbmQgc2VjdXJpdHkg4oCTIHdlIHN1cHBvcnQgeW91LiBBbmQgdG8gYWxsIHRob3NlIHdobyBoYXZlIHdvbmRlcmVkIGlmIEFtZXJpY2HigJlzIGJlYWNvbiBzdGlsbCBidXJucyBhcyBicmlnaHQg4oCTIHRvbmlnaHQgd2UgcHJvdmVkIG9uY2UgbW9yZSB0aGF0IHRoZSB0cnVlIHN0cmVuZ3RoIG9mIG91ciBuYXRpb24gY29tZXMgbm90IGZyb20gb3VyIHRoZSBtaWdodCBvZiBvdXIgYXJtcyBvciB0aGUgc2NhbGUgb2Ygb3VyIHdlYWx0aCwgYnV0IGZyb20gdGhlIGVuZHVyaW5nIHBvd2VyIG9mIG91ciBpZGVhbHM6IGRlbW9jcmFjeSwgbGliZXJ0eSwgb3Bwb3J0dW5pdHksIGFuZCB1bnlpZWxkaW5nIGhvcGUuJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1Blcm1lbmFudCcsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnUGV0cmEgQ2hhbmRsZXInLFxuICAgICAgICAncG9zaXRpb24nOiAnUGVkZSBOb251bW15IEluYy4nLFxuICAgICAgICAnb2ZmaWNlJzogJ05hbWliaWEnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wMy8yNicpLFxuICAgICAgICAnc2FsYXJ5JzogNTk4OTE1LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdBbmQgdG8gYWxsIHRob3NlIHdhdGNoaW5nIHRvbmlnaHQgZnJvbSBiZXlvbmQgb3VyIHNob3JlcywgZnJvbSBwYXJsaWFtZW50cyBhbmQgcGFsYWNlcyB0byB0aG9zZSB3aG8gYXJlIGh1ZGRsZWQgYXJvdW5kIHJhZGlvcyBpbiB0aGUgZm9yZ290dGVuIGNvcm5lcnMgb2Ygb3VyIHdvcmxkIOKAkyBvdXIgc3RvcmllcyBhcmUgc2luZ3VsYXIsIGJ1dCBvdXIgZGVzdGlueSBpcyBzaGFyZWQsIGFuZCBhIG5ldyBkYXduIG9mIEFtZXJpY2FuIGxlYWRlcnNoaXAgaXMgYXQgaGFuZC4gVG8gdGhvc2Ugd2hvIHdvdWxkIHRlYXIgdGhpcyB3b3JsZCBkb3duIOKAkyB3ZSB3aWxsIGRlZmVhdCB5b3UuIFRvIHRob3NlIHdobyBzZWVrIHBlYWNlIGFuZCBzZWN1cml0eSDigJMgd2Ugc3VwcG9ydCB5b3UuIEFuZCB0byBhbGwgdGhvc2Ugd2hvIGhhdmUgd29uZGVyZWQgaWYgQW1lcmljYeKAmXMgYmVhY29uIHN0aWxsIGJ1cm5zIGFzIGJyaWdodCDigJMgdG9uaWdodCB3ZSBwcm92ZWQgb25jZSBtb3JlIHRoYXQgdGhlIHRydWUgc3RyZW5ndGggb2Ygb3VyIG5hdGlvbiBjb21lcyBub3QgZnJvbSBvdXIgdGhlIG1pZ2h0IG9mIG91ciBhcm1zIG9yIHRoZSBzY2FsZSBvZiBvdXIgd2VhbHRoLCBidXQgZnJvbSB0aGUgZW5kdXJpbmcgcG93ZXIgb2Ygb3VyIGlkZWFsczogZGVtb2NyYWN5LCBsaWJlcnR5LCBvcHBvcnR1bml0eSwgYW5kIHVueWllbGRpbmcgaG9wZS4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnUGVybWVuYW50JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdBdXJlbGlhIE1hcnNoYWxsJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0RvbmVjIENvbnN1bHRpbmcnLFxuICAgICAgICAnb2ZmaWNlJzogJ05pY2FyYWd1YScsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzA4LzE4JyksXG4gICAgICAgICdzYWxhcnknOiAyMDE2ODAsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0FuZCB0byBhbGwgdGhvc2Ugd2F0Y2hpbmcgdG9uaWdodCBmcm9tIGJleW9uZCBvdXIgc2hvcmVzLCBmcm9tIHBhcmxpYW1lbnRzIGFuZCBwYWxhY2VzIHRvIHRob3NlIHdobyBhcmUgaHVkZGxlZCBhcm91bmQgcmFkaW9zIGluIHRoZSBmb3Jnb3R0ZW4gY29ybmVycyBvZiBvdXIgd29ybGQg4oCTIG91ciBzdG9yaWVzIGFyZSBzaW5ndWxhciwgYnV0IG91ciBkZXN0aW55IGlzIHNoYXJlZCwgYW5kIGEgbmV3IGRhd24gb2YgQW1lcmljYW4gbGVhZGVyc2hpcCBpcyBhdCBoYW5kLiBUbyB0aG9zZSB3aG8gd291bGQgdGVhciB0aGlzIHdvcmxkIGRvd24g4oCTIHdlIHdpbGwgZGVmZWF0IHlvdS4gVG8gdGhvc2Ugd2hvIHNlZWsgcGVhY2UgYW5kIHNlY3VyaXR5IOKAkyB3ZSBzdXBwb3J0IHlvdS4gQW5kIHRvIGFsbCB0aG9zZSB3aG8gaGF2ZSB3b25kZXJlZCBpZiBBbWVyaWNh4oCZcyBiZWFjb24gc3RpbGwgYnVybnMgYXMgYnJpZ2h0IOKAkyB0b25pZ2h0IHdlIHByb3ZlZCBvbmNlIG1vcmUgdGhhdCB0aGUgdHJ1ZSBzdHJlbmd0aCBvZiBvdXIgbmF0aW9uIGNvbWVzIG5vdCBmcm9tIG91ciB0aGUgbWlnaHQgb2Ygb3VyIGFybXMgb3IgdGhlIHNjYWxlIG9mIG91ciB3ZWFsdGgsIGJ1dCBmcm9tIHRoZSBlbmR1cmluZyBwb3dlciBvZiBvdXIgaWRlYWxzOiBkZW1vY3JhY3ksIGxpYmVydHksIG9wcG9ydHVuaXR5LCBhbmQgdW55aWVsZGluZyBob3BlLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydQZXJtZW5hbnQnLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ1Jvc2UgQ2FydGVyJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0VuaW0gQ29uc2VxdWF0IFB1cnVzIEluZHVzdHJpZXMnLFxuICAgICAgICAnb2ZmaWNlJzogJ01vcm9jY28nLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wMy8wNicpLFxuICAgICAgICAnc2FsYXJ5JzogMjIwMTg3LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1Blcm1lbmFudCcsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnRGVudG9uIEF0a2lucycsXG4gICAgICAgICdwb3NpdGlvbic6ICdOb24gVmVzdGlidWx1bSBQQycsXG4gICAgICAgICdvZmZpY2UnOiAnTWFsaScsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzA0LzE5JyksXG4gICAgICAgICdzYWxhcnknOiAzMjQ1ODgsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1doZW4gdGhlcmUgd2FzIGRlc3BhaXIgaW4gdGhlIGR1c3QgYm93bCBhbmQgZGVwcmVzc2lvbiBhY3Jvc3MgdGhlIGxhbmQsIHNoZSBzYXcgYSBuYXRpb24gY29ucXVlciBmZWFyIGl0c2VsZiB3aXRoIGEgTmV3IERlYWwsIG5ldyBqb2JzIGFuZCBhIG5ldyBzZW5zZSBvZiBjb21tb24gcHVycG9zZS4gWWVzIHdlIGNhbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnUGVybWVuYW50JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdHZXJtYWluZSBPc2Jvcm4nLFxuICAgICAgICAncG9zaXRpb24nOiAnVHJpc3RpcXVlIEFsaXF1ZXQgUEMnLFxuICAgICAgICAnb2ZmaWNlJzogJ0xlc290aG8nLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wMS8xOScpLFxuICAgICAgICAnc2FsYXJ5JzogMzUxMTA4LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnTmVsbCBCdXRsZXInLFxuICAgICAgICAncG9zaXRpb24nOiAnU2l0IEFtZXQgRGFwaWJ1cyBJbmR1c3RyaWVzJyxcbiAgICAgICAgJ29mZmljZSc6ICdDdWJhJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDEvMDYnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDIzMDA3MixcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnV2hlbiB0aGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnTWFya2V0aW5nJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0JyZW50IFN0ZWluJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0V1IEF1Z3VlIFBvcnR0aXRvciBMTFAnLFxuICAgICAgICAnb2ZmaWNlJzogJ0N5cHJ1cycsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzExLzAyJyksXG4gICAgICAgICdzYWxhcnknOiA4NTM0MTMsXG4gICAgICAgICdzdGF0dXMnOiAnTmV3IExlYWQnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnV2hlbiB0aGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnTWFya2V0aW5nJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0FsZXhhbmRyYSBTaGF3JyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0FlbmVhbiBHcmF2aWRhIExpbWl0ZWQnLFxuICAgICAgICAnb2ZmaWNlJzogJ1VydWd1YXknLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wNS8xNicpLFxuICAgICAgICAnc2FsYXJ5JzogNDAxOTcwLFxuICAgICAgICAnc3RhdHVzJzogJ0FyY2hpdmVkJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1doZW4gdGhlcmUgd2FzIGRlc3BhaXIgaW4gdGhlIGR1c3QgYm93bCBhbmQgZGVwcmVzc2lvbiBhY3Jvc3MgdGhlIGxhbmQsIHNoZSBzYXcgYSBuYXRpb24gY29ucXVlciBmZWFyIGl0c2VsZiB3aXRoIGEgTmV3IERlYWwsIG5ldyBqb2JzIGFuZCBhIG5ldyBzZW5zZSBvZiBjb21tb24gcHVycG9zZS4gWWVzIHdlIGNhbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ01hcmtldGluZyddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdWZXJvbmljYSBBbGxpc29uJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0FsaXF1ZXQgRGlhbSBTZWQgSW5zdGl0dXRlJyxcbiAgICAgICAgJ29mZmljZSc6ICdTYW1vYScsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzA1LzE3JyksXG4gICAgICAgICdzYWxhcnknOiA3OTE5MyxcbiAgICAgICAgJ3N0YXR1cyc6ICdOZXcgTGVhZCcsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdNYXJrZXRpbmcnXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnS2F0ZWx5biBHYW1ibGUnLFxuICAgICAgICAncG9zaXRpb24nOiAnU2VkIEFzc29jaWF0ZXMnLFxuICAgICAgICAnb2ZmaWNlJzogJ01hdXJpdGl1cycsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzAzLzIwJyksXG4gICAgICAgICdzYWxhcnknOiA0ODQyOTksXG4gICAgICAgICdzdGF0dXMnOiAnTmV3IExlYWQnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnV2hlbiB0aGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnTWFya2V0aW5nJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0phbWVzIEdyZWVyJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0EgRHVpIEluY29ycG9yYXRlZCcsXG4gICAgICAgICdvZmZpY2UnOiAnTm9yd2F5JyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDIvMjEnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDMzMzUxOCxcbiAgICAgICAgJ3N0YXR1cyc6ICdOZXcgTGVhZCcsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ0NvbnRyYWN0b3InLCAnTWFya2V0aW5nJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0NhaW4gVmFzcXVleicsXG4gICAgICAgICdwb3NpdGlvbic6ICdOdWxsYSBGYWNpbGlzaXMgU3VzcGVuZGlzc2UgSW5zdGl0dXRlJyxcbiAgICAgICAgJ29mZmljZSc6ICdDaGluYScsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzA1LzI3JyksXG4gICAgICAgICdzYWxhcnknOiA2NTE3NjEsXG4gICAgICAgICdzdGF0dXMnOiAnTmV3IExlYWQnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnV2hlbiB0aGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydDb250cmFjdG9yJywgJ01hcmtldGluZyddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdTaGFlbGVpZ2ggQmFycicsXG4gICAgICAgICdwb3NpdGlvbic6ICdFbGVpZmVuZCBDcmFzIEluc3RpdHV0ZScsXG4gICAgICAgICdvZmZpY2UnOiAnR2hhbmEnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wNC8wMScpLFxuICAgICAgICAnc2FsYXJ5JzogNjI3MDk1LFxuICAgICAgICAnc3RhdHVzJzogJ0FyY2hpdmVkJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1doZW4gdGhlcmUgd2FzIGRlc3BhaXIgaW4gdGhlIGR1c3QgYm93bCBhbmQgZGVwcmVzc2lvbiBhY3Jvc3MgdGhlIGxhbmQsIHNoZSBzYXcgYSBuYXRpb24gY29ucXVlciBmZWFyIGl0c2VsZiB3aXRoIGEgTmV3IERlYWwsIG5ldyBqb2JzIGFuZCBhIG5ldyBzZW5zZSBvZiBjb21tb24gcHVycG9zZS4gWWVzIHdlIGNhbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnQ29udHJhY3RvcicsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnQmFrZXIgTWNrYXknLFxuICAgICAgICAncG9zaXRpb24nOiAnVXQgU2FnaXR0aXMgQXNzb2NpYXRlcycsXG4gICAgICAgICdvZmZpY2UnOiAnSXNsZSBvZiBNYW4nLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wMS8xMicpLFxuICAgICAgICAnc2FsYXJ5JzogNzQyMjQ3LFxuICAgICAgICAnc3RhdHVzJzogJ05ldyBMZWFkJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1doZW4gdGhlcmUgd2FzIGRlc3BhaXIgaW4gdGhlIGR1c3QgYm93bCBhbmQgZGVwcmVzc2lvbiBhY3Jvc3MgdGhlIGxhbmQsIHNoZSBzYXcgYSBuYXRpb24gY29ucXVlciBmZWFyIGl0c2VsZiB3aXRoIGEgTmV3IERlYWwsIG5ldyBqb2JzIGFuZCBhIG5ldyBzZW5zZSBvZiBjb21tb24gcHVycG9zZS4gWWVzIHdlIGNhbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnQ29udHJhY3RvcicsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnSmF5bWUgUGFjZScsXG4gICAgICAgICdwb3NpdGlvbic6ICdDcmFzIEV1IFRlbGx1cyBBc3NvY2lhdGVzJyxcbiAgICAgICAgJ29mZmljZSc6ICdCb3V2ZXQgSXNsYW5kJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDgvMTInKSxcbiAgICAgICAgJ3NhbGFyeSc6IDU5MTU4OCxcbiAgICAgICAgJ3N0YXR1cyc6ICdOZXcgTGVhZCcsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ0NvbnRyYWN0b3InLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ1JldWJlbiBBbGJlcnQnLFxuICAgICAgICAncG9zaXRpb24nOiAnTG9ib3J0aXMgSW5zdGl0dXRlJyxcbiAgICAgICAgJ29mZmljZSc6ICdaYW1iaWEnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wNC8wNCcpLFxuICAgICAgICAnc2FsYXJ5JzogNzkxNDA4LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ0NvbnRyYWN0b3InLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0lkb2xhIEJ1cm5zJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ05vbiBJbmR1c3RyaWVzJyxcbiAgICAgICAgJ29mZmljZSc6ICdNeWFubWFyJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDYvMjQnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDE0MjkwNixcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnV2hlbiB0aGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydDb250cmFjdG9yJywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdMYXVyYSBNYWNpYXMnLFxuICAgICAgICAncG9zaXRpb24nOiAnUGhhc2VsbHVzIEluYy4nLFxuICAgICAgICAnb2ZmaWNlJzogJ01hdXJpdGFuaWEnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8xMS8yMScpLFxuICAgICAgICAnc2FsYXJ5JzogMjI2NTkxLFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnTmljaG9sZSBTYWxhcycsXG4gICAgICAgICdwb3NpdGlvbic6ICdEdWlzIFBDJyxcbiAgICAgICAgJ29mZmljZSc6ICdNYWRhZ2FzY2FyJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDEvMTgnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDIzNDE5NixcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnSSB3YW50IHRvIHRoYW5rIG15IHBhcnRuZXIgaW4gdGhpcyBqb3VybmV5LCBhIG1hbiB3aG8gY2FtcGFpZ25lZCBmcm9tIGhpcyBoZWFydCBhbmQgc3Bva2UgZm9yIHRoZSBtZW4gYW5kIHdvbWVuIGhlIGdyZXcgdXAgd2l0aCBvbiB0aGUgc3RyZWV0cyBvZiBTY3JhbnRvbiBhbmQgcm9kZSB3aXRoIG9uIHRoYXQgdHJhaW4gaG9tZSB0byBEZWxhd2FyZSwgdGhlIFZpY2UgUHJlc2lkZW50LWVsZWN0IG9mIHRoZSBVbml0ZWQgU3RhdGVzLCBKb2UgQmlkZW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnSHVudGVyIFdhbHRlcicsXG4gICAgICAgICdwb3NpdGlvbic6ICdVbGxhbWNvcnBlciBEdWlzIEN1cnN1cyBGb3VuZGF0aW9uJyxcbiAgICAgICAgJ29mZmljZSc6ICdCcmF6aWwnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wMi8yOCcpLFxuICAgICAgICAnc2FsYXJ5JzogNjU1MDUyLFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdJIHdhbnQgdG8gdGhhbmsgbXkgcGFydG5lciBpbiB0aGlzIGpvdXJuZXksIGEgbWFuIHdobyBjYW1wYWlnbmVkIGZyb20gaGlzIGhlYXJ0IGFuZCBzcG9rZSBmb3IgdGhlIG1lbiBhbmQgd29tZW4gaGUgZ3JldyB1cCB3aXRoIG9uIHRoZSBzdHJlZXRzIG9mIFNjcmFudG9uIGFuZCByb2RlIHdpdGggb24gdGhhdCB0cmFpbiBob21lIHRvIERlbGF3YXJlLCB0aGUgVmljZSBQcmVzaWRlbnQtZWxlY3Qgb2YgdGhlIFVuaXRlZCBTdGF0ZXMsIEpvZSBCaWRlbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdBc2hlciBSaWNoJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ01hdXJpcyBJcHN1bSBMTFAnLFxuICAgICAgICAnb2ZmaWNlJzogJ1BhcmFndWF5JyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDgvMDgnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDIyMjk0NixcbiAgICAgICAgJ3N0YXR1cyc6ICdBcmNoaXZlZCcsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdJIHdhbnQgdG8gdGhhbmsgbXkgcGFydG5lciBpbiB0aGlzIGpvdXJuZXksIGEgbWFuIHdobyBjYW1wYWlnbmVkIGZyb20gaGlzIGhlYXJ0IGFuZCBzcG9rZSBmb3IgdGhlIG1lbiBhbmQgd29tZW4gaGUgZ3JldyB1cCB3aXRoIG9uIHRoZSBzdHJlZXRzIG9mIFNjcmFudG9uIGFuZCByb2RlIHdpdGggb24gdGhhdCB0cmFpbiBob21lIHRvIERlbGF3YXJlLCB0aGUgVmljZSBQcmVzaWRlbnQtZWxlY3Qgb2YgdGhlIFVuaXRlZCBTdGF0ZXMsIEpvZSBCaWRlbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdBbmdlbGEgQ2FybHNvbicsXG4gICAgICAgICdwb3NpdGlvbic6ICdEb25lYyBUZW1wb3IgSW5zdGl0dXRlJyxcbiAgICAgICAgJ29mZmljZSc6ICdQYXB1YSBOZXcgR3VpbmVhJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDIvMTInKSxcbiAgICAgICAgJ3NhbGFyeSc6IDU2MjE5NCxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnSSB3YW50IHRvIHRoYW5rIG15IHBhcnRuZXIgaW4gdGhpcyBqb3VybmV5LCBhIG1hbiB3aG8gY2FtcGFpZ25lZCBmcm9tIGhpcyBoZWFydCBhbmQgc3Bva2UgZm9yIHRoZSBtZW4gYW5kIHdvbWVuIGhlIGdyZXcgdXAgd2l0aCBvbiB0aGUgc3RyZWV0cyBvZiBTY3JhbnRvbiBhbmQgcm9kZSB3aXRoIG9uIHRoYXQgdHJhaW4gaG9tZSB0byBEZWxhd2FyZSwgdGhlIFZpY2UgUHJlc2lkZW50LWVsZWN0IG9mIHRoZSBVbml0ZWQgU3RhdGVzLCBKb2UgQmlkZW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnSmFtZXMgRG9yc2V5JyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0lwc3VtIExlbyBBc3NvY2lhdGVzJyxcbiAgICAgICAgJ29mZmljZSc6ICdDb25nbyAoQnJhenphdmlsbGUpJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDEvMTAnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDYyOTkyNSxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnSSB3YW50IHRvIHRoYW5rIG15IHBhcnRuZXIgaW4gdGhpcyBqb3VybmV5LCBhIG1hbiB3aG8gY2FtcGFpZ25lZCBmcm9tIGhpcyBoZWFydCBhbmQgc3Bva2UgZm9yIHRoZSBtZW4gYW5kIHdvbWVuIGhlIGdyZXcgdXAgd2l0aCBvbiB0aGUgc3RyZWV0cyBvZiBTY3JhbnRvbiBhbmQgcm9kZSB3aXRoIG9uIHRoYXQgdHJhaW4gaG9tZSB0byBEZWxhd2FyZSwgdGhlIFZpY2UgUHJlc2lkZW50LWVsZWN0IG9mIHRoZSBVbml0ZWQgU3RhdGVzLCBKb2UgQmlkZW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnV2VzbGV5IENvYmInLFxuICAgICAgICAncG9zaXRpb24nOiAnTnVuYyBFc3QgSW5jb3Jwb3JhdGVkJyxcbiAgICAgICAgJ29mZmljZSc6ICdBdXN0cmFsaWEnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wMS8zMCcpLFxuICAgICAgICAnc2FsYXJ5JzogMzQzNDc2LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdJIHdhbnQgdG8gdGhhbmsgbXkgcGFydG5lciBpbiB0aGlzIGpvdXJuZXksIGEgbWFuIHdobyBjYW1wYWlnbmVkIGZyb20gaGlzIGhlYXJ0IGFuZCBzcG9rZSBmb3IgdGhlIG1lbiBhbmQgd29tZW4gaGUgZ3JldyB1cCB3aXRoIG9uIHRoZSBzdHJlZXRzIG9mIFNjcmFudG9uIGFuZCByb2RlIHdpdGggb24gdGhhdCB0cmFpbiBob21lIHRvIERlbGF3YXJlLCB0aGUgVmljZSBQcmVzaWRlbnQtZWxlY3Qgb2YgdGhlIFVuaXRlZCBTdGF0ZXMsIEpvZSBCaWRlbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnQ29tbXVuaWNhdGlvbnMnLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ01lZ2hhbiBTdGVwaGVucycsXG4gICAgICAgICdwb3NpdGlvbic6ICdJbnRlcmR1bSBQQycsXG4gICAgICAgICdvZmZpY2UnOiAnVHVya2V5JyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMTAvMTEnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDQ2OTMwNSxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnSSB3YW50IHRvIHRoYW5rIG15IHBhcnRuZXIgaW4gdGhpcyBqb3VybmV5LCBhIG1hbiB3aG8gY2FtcGFpZ25lZCBmcm9tIGhpcyBoZWFydCBhbmQgc3Bva2UgZm9yIHRoZSBtZW4gYW5kIHdvbWVuIGhlIGdyZXcgdXAgd2l0aCBvbiB0aGUgc3RyZWV0cyBvZiBTY3JhbnRvbiBhbmQgcm9kZSB3aXRoIG9uIHRoYXQgdHJhaW4gaG9tZSB0byBEZWxhd2FyZSwgdGhlIFZpY2UgUHJlc2lkZW50LWVsZWN0IG9mIHRoZSBVbml0ZWQgU3RhdGVzLCBKb2UgQmlkZW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ0NvbW11bmljYXRpb25zJywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdCZXJ0aGEgSGVycmVyYScsXG4gICAgICAgICdwb3NpdGlvbic6ICdBbWV0IExpbWl0ZWQnLFxuICAgICAgICAnb2ZmaWNlJzogJ0tlbnlhJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMTEvMjInKSxcbiAgICAgICAgJ3NhbGFyeSc6IDU2NjA2LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdJIHdhbnQgdG8gdGhhbmsgbXkgcGFydG5lciBpbiB0aGlzIGpvdXJuZXksIGEgbWFuIHdobyBjYW1wYWlnbmVkIGZyb20gaGlzIGhlYXJ0IGFuZCBzcG9rZSBmb3IgdGhlIG1lbiBhbmQgd29tZW4gaGUgZ3JldyB1cCB3aXRoIG9uIHRoZSBzdHJlZXRzIG9mIFNjcmFudG9uIGFuZCByb2RlIHdpdGggb24gdGhhdCB0cmFpbiBob21lIHRvIERlbGF3YXJlLCB0aGUgVmljZSBQcmVzaWRlbnQtZWxlY3Qgb2YgdGhlIFVuaXRlZCBTdGF0ZXMsIEpvZSBCaWRlbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnQ29tbXVuaWNhdGlvbnMnLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0thcmluYSBLZXknLFxuICAgICAgICAncG9zaXRpb24nOiAnUXVpc3F1ZSBWYXJpdXMgTmFtIENvbXBhbnknLFxuICAgICAgICAnb2ZmaWNlJzogJ0ZyYW5jZScsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzAzLzI2JyksXG4gICAgICAgICdzYWxhcnknOiAzMTQyNjAsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0kgd2FudCB0byB0aGFuayBteSBwYXJ0bmVyIGluIHRoaXMgam91cm5leSwgYSBtYW4gd2hvIGNhbXBhaWduZWQgZnJvbSBoaXMgaGVhcnQgYW5kIHNwb2tlIGZvciB0aGUgbWVuIGFuZCB3b21lbiBoZSBncmV3IHVwIHdpdGggb24gdGhlIHN0cmVldHMgb2YgU2NyYW50b24gYW5kIHJvZGUgd2l0aCBvbiB0aGF0IHRyYWluIGhvbWUgdG8gRGVsYXdhcmUsIHRoZSBWaWNlIFByZXNpZGVudC1lbGVjdCBvZiB0aGUgVW5pdGVkIFN0YXRlcywgSm9lIEJpZGVuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydDb21tdW5pY2F0aW9ucycsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnVXJpZWwgQ2Fyc29uJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ1BlbmF0aWJ1cyBQQycsXG4gICAgICAgICdvZmZpY2UnOiAnVmVuZXp1ZWxhJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDEvMDcnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDEwNjMzNSxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnV2hlbiB0aGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydDb21tdW5pY2F0aW9ucycsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnTWlyYSBCYWlyZCcsXG4gICAgICAgICdwb3NpdGlvbic6ICdGZWxpcyBPcmNpIFBDJyxcbiAgICAgICAgJ29mZmljZSc6ICdOaXVlJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDgvMjUnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDUxNTY3MSxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnV2hlbiB0aGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydDb21tdW5pY2F0aW9ucycsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnVXJzdWxhIFBhcnJpc2gnLFxuICAgICAgICAncG9zaXRpb24nOiAnQWMgQ29ycG9yYXRpb24nLFxuICAgICAgICAnb2ZmaWNlJzogJ01hY2FvJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDYvMzAnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDcyMjk1LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ0NvbW11bmljYXRpb25zJywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdKb3NlcGhpbmUgU3lrZXMnLFxuICAgICAgICAncG9zaXRpb24nOiAnQmxhbmRpdCBDb25ndWUgTGltaXRlZCcsXG4gICAgICAgICdvZmZpY2UnOiAnSG9seSBTZWUgKFZhdGljYW4gQ2l0eSBTdGF0ZSknLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8xMi8yMicpLFxuICAgICAgICAnc2FsYXJ5JzogNjk0NjU2LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ0NvbW11bmljYXRpb25zJywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdNYWdnaWUgU2ltcycsXG4gICAgICAgICdwb3NpdGlvbic6ICdWdWxwdXRhdGUgUG9zdWVyZSBJbmR1c3RyaWVzJyxcbiAgICAgICAgJ29mZmljZSc6ICdTdWRhbicsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzExLzIyJyksXG4gICAgICAgICdzYWxhcnknOiAzNjM3NDMsXG4gICAgICAgICdzdGF0dXMnOiAnTmV3IExlYWQnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnV2hlbiB0aGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydDb21tdW5pY2F0aW9ucycsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnUm9nYW4gRnVlbnRlcycsXG4gICAgICAgICdwb3NpdGlvbic6ICdWZXN0aWJ1bHVtIEFjY3Vtc2FuIE5lcXVlIENvbXBhbnknLFxuICAgICAgICAnb2ZmaWNlJzogJ0plcnNleScsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzA3LzI5JyksXG4gICAgICAgICdzYWxhcnknOiA2MDYwMDQsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1doZW4gdGhlcmUgd2FzIGRlc3BhaXIgaW4gdGhlIGR1c3QgYm93bCBhbmQgZGVwcmVzc2lvbiBhY3Jvc3MgdGhlIGxhbmQsIHNoZSBzYXcgYSBuYXRpb24gY29ucXVlciBmZWFyIGl0c2VsZiB3aXRoIGEgTmV3IERlYWwsIG5ldyBqb2JzIGFuZCBhIG5ldyBzZW5zZSBvZiBjb21tb24gcHVycG9zZS4gWWVzIHdlIGNhbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnQ29tbXVuaWNhdGlvbnMnLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ01heWEgSGFuZXknLFxuICAgICAgICAncG9zaXRpb24nOiAnQWMgRm91bmRhdGlvbicsXG4gICAgICAgICdvZmZpY2UnOiAnRmFsa2xhbmQgSXNsYW5kcycsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzA5LzAzJyksXG4gICAgICAgICdzYWxhcnknOiA3NDU1MDAsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1doZW4gdGhlcmUgd2FzIGRlc3BhaXIgaW4gdGhlIGR1c3QgYm93bCBhbmQgZGVwcmVzc2lvbiBhY3Jvc3MgdGhlIGxhbmQsIHNoZSBzYXcgYSBuYXRpb24gY29ucXVlciBmZWFyIGl0c2VsZiB3aXRoIGEgTmV3IERlYWwsIG5ldyBqb2JzIGFuZCBhIG5ldyBzZW5zZSBvZiBjb21tb24gcHVycG9zZS4gWWVzIHdlIGNhbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnQ29tbXVuaWNhdGlvbnMnLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0FxdWlsYSBCYXR0bGUnLFxuICAgICAgICAncG9zaXRpb24nOiAnU29jaWlzIE5hdG9xdWUgUGVuYXRpYnVzIEZvdW5kYXRpb24nLFxuICAgICAgICAnb2ZmaWNlJzogJ0F6ZXJiYWlqYW4nLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wMy8wNicpLFxuICAgICAgICAnc2FsYXJ5JzogNTgyMjY1LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ0NvbW11bmljYXRpb25zJywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdDb25ub3IgQ29sZW1hbicsXG4gICAgICAgICdwb3NpdGlvbic6ICdPcmNpIExhY3VzIFZlc3RpYnVsdW0gRm91bmRhdGlvbicsXG4gICAgICAgICdvZmZpY2UnOiAnQ3JvYXRpYScsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzEwLzIxJyksXG4gICAgICAgICdzYWxhcnknOiA0MTY5NTgsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1doZW4gdGhlcmUgd2FzIGRlc3BhaXIgaW4gdGhlIGR1c3QgYm93bCBhbmQgZGVwcmVzc2lvbiBhY3Jvc3MgdGhlIGxhbmQsIHNoZSBzYXcgYSBuYXRpb24gY29ucXVlciBmZWFyIGl0c2VsZiB3aXRoIGEgTmV3IERlYWwsIG5ldyBqb2JzIGFuZCBhIG5ldyBzZW5zZSBvZiBjb21tb24gcHVycG9zZS4gWWVzIHdlIGNhbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnQ29tbXVuaWNhdGlvbnMnLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0NoYXJpdHkgVGhvbWFzJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0NvbnZhbGxpcyBMaWd1bGEgRG9uZWMgSW5jLicsXG4gICAgICAgICdvZmZpY2UnOiAnQmVuaW4nLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wNy8xMicpLFxuICAgICAgICAnc2FsYXJ5JzogNTQwOTk5LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ0NvbW11bmljYXRpb25zJywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdCbHl0aGUgUG93ZXJzJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0FtZXQgT3JjaSBMaW1pdGVkJyxcbiAgICAgICAgJ29mZmljZSc6ICdGYWxrbGFuZCBJc2xhbmRzJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDEvMjMnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDQ4MDA2NyxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnV2hlbiB0aGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydDb21tdW5pY2F0aW9ucycsICdIdW1hbiBSZXNvdXJjZXMnXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnQWRyaWEgQmF0dGxlJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ09ybmFyZSBMZWN0dXMgSW5jb3Jwb3JhdGVkJyxcbiAgICAgICAgJ29mZmljZSc6ICdCcml0aXNoIEluZGlhbiBPY2VhbiBUZXJyaXRvcnknLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wNS8yOCcpLFxuICAgICAgICAnc2FsYXJ5JzogMjU3OTM3LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ0NvbW11bmljYXRpb25zJywgJ0h1bWFuIFJlc291cmNlcyddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdNZWxhbmllIE1jaW50eXJlJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ051bmMgQ29ycC4nLFxuICAgICAgICAnb2ZmaWNlJzogJ01vbmdvbGlhJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDEvMDYnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDM1OTczNyxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnV2hlbiB0aGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydDb21tdW5pY2F0aW9ucycsICdIdW1hbiBSZXNvdXJjZXMnXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnS2VlbHkgQmF1ZXInLFxuICAgICAgICAncG9zaXRpb24nOiAnTmVjIFRlbXB1cyBJbnN0aXR1dGUnLFxuICAgICAgICAnb2ZmaWNlJzogJ1NvbWFsaWEnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wMy8wOScpLFxuICAgICAgICAnc2FsYXJ5JzogOTk3MTgsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1doZW4gdGhlcmUgd2FzIGRlc3BhaXIgaW4gdGhlIGR1c3QgYm93bCBhbmQgZGVwcmVzc2lvbiBhY3Jvc3MgdGhlIGxhbmQsIHNoZSBzYXcgYSBuYXRpb24gY29ucXVlciBmZWFyIGl0c2VsZiB3aXRoIGEgTmV3IERlYWwsIG5ldyBqb2JzIGFuZCBhIG5ldyBzZW5zZSBvZiBjb21tb24gcHVycG9zZS4gWWVzIHdlIGNhbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnQ29tbXVuaWNhdGlvbnMnLCAnSHVtYW4gUmVzb3VyY2VzJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ05vZWxhbmkgU3Ryb25nJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ05lYyBMTFAnLFxuICAgICAgICAnb2ZmaWNlJzogJ0lyYW4nLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wOC8yNCcpLFxuICAgICAgICAnc2FsYXJ5JzogNDgwNzE4LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ0NvbW11bmljYXRpb25zJywgJ0h1bWFuIFJlc291cmNlcyddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdKZWFuZXR0ZSBIZW5kZXJzb24nLFxuICAgICAgICAncG9zaXRpb24nOiAnRXUgRWxpdCBOdWxsYSBDb3Jwb3JhdGlvbicsXG4gICAgICAgICdvZmZpY2UnOiAnSXRhbHknLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wNi8xOScpLFxuICAgICAgICAnc2FsYXJ5JzogMjUzNzcyLFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnQ2FuZGFjZSBIdWJlcicsXG4gICAgICAgICdwb3NpdGlvbic6ICdTZWQgSW5zdGl0dXRlJyxcbiAgICAgICAgJ29mZmljZSc6ICdVZ2FuZGEnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wNi8xNicpLFxuICAgICAgICAnc2FsYXJ5JzogMzg4ODc5LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnQmV0aGFueSBQb3R0ZXInLFxuICAgICAgICAncG9zaXRpb24nOiAnVml2YW11cyBOaWJoIERvbG9yIEluY29ycG9yYXRlZCcsXG4gICAgICAgICdvZmZpY2UnOiAnUHVlcnRvIFJpY28nLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8xMS8xMicpLFxuICAgICAgICAnc2FsYXJ5JzogNzQ3MzEwLFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnV2hvb3BpIEJ1cmtzJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0p1c3RvIEluYy4nLFxuICAgICAgICAnb2ZmaWNlJzogJ0ZpamknLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wOS8yNCcpLFxuICAgICAgICAnc2FsYXJ5JzogODAzMDM3LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ1NoZWlsYSBMb25nJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0RpYW0gQXNzb2NpYXRlcycsXG4gICAgICAgICdvZmZpY2UnOiAnU2FvIFRvbWUgYW5kIFByaW5jaXBlJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMTIvMjEnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDY3NDM3OSxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlcmUgd2FzIGRlc3BhaXIgaW4gdGhlIGR1c3QgYm93bCBhbmQgZGVwcmVzc2lvbiBhY3Jvc3MgdGhlIGxhbmQsIHNoZSBzYXcgYSBuYXRpb24gY29ucXVlciBmZWFyIGl0c2VsZiB3aXRoIGEgTmV3IERlYWwsIG5ldyBqb2JzIGFuZCBhIG5ldyBzZW5zZSBvZiBjb21tb24gcHVycG9zZS4gWWVzIHdlIGNhbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdTb255YSBDaHVyY2gnLFxuICAgICAgICAncG9zaXRpb24nOiAnTGFvcmVldCBJbnN0aXR1dGUnLFxuICAgICAgICAnb2ZmaWNlJzogJ0dyZW5hZGEnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wNi8wMycpLFxuICAgICAgICAnc2FsYXJ5JzogNjI1MTQ3LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ1NoYWluZSBGb3JiZXMnLFxuICAgICAgICAncG9zaXRpb24nOiAnRXUgQXJjdSBMTFAnLFxuICAgICAgICAnb2ZmaWNlJzogJ0N5cHJ1cycsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzAxLzE4JyksXG4gICAgICAgICdzYWxhcnknOiAyMDgxMDAsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnQWxleGFuZHJhIFBhdHJpY2snLFxuICAgICAgICAncG9zaXRpb24nOiAnTGlndWxhIERvbmVjIEluYy4nLFxuICAgICAgICAnb2ZmaWNlJzogJ1ZpZXQgTmFtJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDQvMDknKSxcbiAgICAgICAgJ3NhbGFyeSc6IDEwNDA2MyxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlcmUgd2FzIGRlc3BhaXIgaW4gdGhlIGR1c3QgYm93bCBhbmQgZGVwcmVzc2lvbiBhY3Jvc3MgdGhlIGxhbmQsIHNoZSBzYXcgYSBuYXRpb24gY29ucXVlciBmZWFyIGl0c2VsZiB3aXRoIGEgTmV3IERlYWwsIG5ldyBqb2JzIGFuZCBhIG5ldyBzZW5zZSBvZiBjb21tb24gcHVycG9zZS4gWWVzIHdlIGNhbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdQYXRpZW5jZSBWaW5jZW50JyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ1NlbSBNb2xlc3RpZSBBc3NvY2lhdGVzJyxcbiAgICAgICAgJ29mZmljZSc6ICdQaGlsaXBwaW5lcycsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzA3LzA0JyksXG4gICAgICAgICdzYWxhcnknOiA2NzM1NTYsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnRXZlbHluIFNtaXRoJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0Z1c2NlIEluZHVzdHJpZXMnLFxuICAgICAgICAnb2ZmaWNlJzogJ1RvZ28nLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wOC8xNScpLFxuICAgICAgICAnc2FsYXJ5JzogNzM3Mjg0LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0tpZXJhbiBHb256YWxleicsXG4gICAgICAgICdwb3NpdGlvbic6ICdOb24gQ29ycC4nLFxuICAgICAgICAnb2ZmaWNlJzogJ0VxdWF0b3JpYWwgR3VpbmVhJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDgvMjQnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDkwMTk1LFxuICAgICAgICAnc3RhdHVzJzogJ05ldyBMZWFkJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnTW9sbHkgT25laWwnLFxuICAgICAgICAncG9zaXRpb24nOiAnTm9uIER1aSBDb25zdWx0aW5nJyxcbiAgICAgICAgJ29mZmljZSc6ICdCZWxpemUnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8xMC8yOCcpLFxuICAgICAgICAnc2FsYXJ5JzogMTQwNzY3LFxuICAgICAgICAnc3RhdHVzJzogJ0FyY2hpdmVkJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnTmlnZWwgRGF2ZW5wb3J0JyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ1VsbGFtY29ycGVyIFZlbGl0IEluIEluZHVzdHJpZXMnLFxuICAgICAgICAnb2ZmaWNlJzogJ1ZhbnVhdHUnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wMy8xNicpLFxuICAgICAgICAnc2FsYXJ5JzogNzA1MzYsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnVGhvciBZb3VuZycsXG4gICAgICAgICdwb3NpdGlvbic6ICdNYWxlc3VhZGEgQ29uc3VsdGluZycsXG4gICAgICAgICdvZmZpY2UnOiAnRnJlbmNoIFNvdXRoZXJuIFRlcnJpdG9yaWVzJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDEvMjgnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDc1NTAxLFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0Zpbm4gRGVsYWNydXonLFxuICAgICAgICAncG9zaXRpb24nOiAnTG9yZW0gSW5kdXN0cmllcycsXG4gICAgICAgICdvZmZpY2UnOiAnQ29jb3MgKEtlZWxpbmcpIElzbGFuZHMnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8xMi8xMScpLFxuICAgICAgICAnc2FsYXJ5JzogNzU0OTY3LFxuICAgICAgICAnc3RhdHVzJzogJ0FyY2hpdmVkJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnTGFuZSBIZW5kZXJzb24nLFxuICAgICAgICAncG9zaXRpb24nOiAnUGVkZSBGb3VuZGF0aW9uJyxcbiAgICAgICAgJ29mZmljZSc6ICdLYXpha2hzdGFuJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDcvMDInKSxcbiAgICAgICAgJ3NhbGFyeSc6IDg0MjA1MCxcbiAgICAgICAgJ3N0YXR1cyc6ICdBcmNoaXZlZCcsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ1NoZWEgUG90dGVyJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0N1cmFiaXR1ciBMaW1pdGVkJyxcbiAgICAgICAgJ29mZmljZSc6ICdUaW1vci1MZXN0ZScsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzA1LzA3JyksXG4gICAgICAgICdzYWxhcnknOiAyNjM2MjksXG4gICAgICAgICdzdGF0dXMnOiAnQXJjaGl2ZWQnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnTGFib3JlIHNpdCBudWxsYSBhbWV0IGVuaW0gcmVwcmVoZW5kZXJpdCBlc3NlIGxhYm9ydW0gTG9yZW0gcXVpcyBpbiBldS4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdCcnlubiBZYW5nJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ1V0IExpbWl0ZWQnLFxuICAgICAgICAnb2ZmaWNlJzogJ01heW90dGUnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wMS8xNycpLFxuICAgICAgICAnc2FsYXJ5JzogNzQyOTIsXG4gICAgICAgICdzdGF0dXMnOiAnQXJjaGl2ZWQnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnTGFib3JlIHNpdCBudWxsYSBhbWV0IGVuaW0gcmVwcmVoZW5kZXJpdCBlc3NlIGxhYm9ydW0gTG9yZW0gcXVpcyBpbiBldS4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdLeWxhbiBGdWVudGVzJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ1NhcGllbiBBZW5lYW4gQXNzb2NpYXRlcycsXG4gICAgICAgICdvZmZpY2UnOiAnQnJhemlsJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMTIvMjgnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDEwODYzMixcbiAgICAgICAgJ3N0YXR1cyc6ICdBcmNoaXZlZCcsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdMYWJvcmUgc2l0IG51bGxhIGFtZXQgZW5pbSByZXByZWhlbmRlcml0IGVzc2UgbGFib3J1bSBMb3JlbSBxdWlzIGluIGV1LicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0xpb25lbCBNY2JyaWRlJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ0lwc3VtIFBDJyxcbiAgICAgICAgJ29mZmljZSc6ICdQb3J0dWdhbCcsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzA3LzExJyksXG4gICAgICAgICdzYWxhcnknOiAzNDI0NCxcbiAgICAgICAgJ3N0YXR1cyc6ICdBcmNoaXZlZCcsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdMYWJvcmUgc2l0IG51bGxhIGFtZXQgZW5pbSByZXByZWhlbmRlcml0IGVzc2UgbGFib3J1bSBMb3JlbSBxdWlzIGluIGV1LicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ1BhdWwgTHVjYXMnLFxuICAgICAgICAncG9zaXRpb24nOiAnRWdldCBMTFAnLFxuICAgICAgICAnb2ZmaWNlJzogJ05pY2FyYWd1YScsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzA5LzMwJyksXG4gICAgICAgICdzYWxhcnknOiA2OTA4MzQsXG4gICAgICAgICdzdGF0dXMnOiAnQXJjaGl2ZWQnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnTGFib3JlIHNpdCBudWxsYSBhbWV0IGVuaW0gcmVwcmVoZW5kZXJpdCBlc3NlIGxhYm9ydW0gTG9yZW0gcXVpcyBpbiBldS4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdMYXJlaW5hIFdpbGxpYW1zb24nLFxuICAgICAgICAncG9zaXRpb24nOiAnSW1wZXJkaWV0IFVsbGFtY29ycGVyIEx0ZCcsXG4gICAgICAgICdvZmZpY2UnOiAnQ29jb3MgKEtlZWxpbmcpIElzbGFuZHMnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8xMi8wMScpLFxuICAgICAgICAnc2FsYXJ5JzogNjAzNDk4LFxuICAgICAgICAnc3RhdHVzJzogJ0FyY2hpdmVkJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0xhYm9yZSBzaXQgbnVsbGEgYW1ldCBlbmltIHJlcHJlaGVuZGVyaXQgZXNzZSBsYWJvcnVtIExvcmVtIHF1aXMgaW4gZXUuJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnQW15IEFjZXZlZG8nLFxuICAgICAgICAncG9zaXRpb24nOiAnSWQgSW5zdGl0dXRlJyxcbiAgICAgICAgJ29mZmljZSc6ICdDb29rIElzbGFuZHMnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wMi8wNCcpLFxuICAgICAgICAnc2FsYXJ5JzogMTI1MTY1LFxuICAgICAgICAnc3RhdHVzJzogJ0FyY2hpdmVkJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0xhYm9yZSBzaXQgbnVsbGEgYW1ldCBlbmltIHJlcHJlaGVuZGVyaXQgZXNzZSBsYWJvcnVtIExvcmVtIHF1aXMgaW4gZXUuJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ1RlbXBvcmFyeScsICdEZXZlbG9wZXInXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnTm9tbGFuZ2EgU2lsdmEnLFxuICAgICAgICAncG9zaXRpb24nOiAnRWdldCBMTEMnLFxuICAgICAgICAnb2ZmaWNlJzogJ0JlbGl6ZScsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzAxLzMxJyksXG4gICAgICAgICdzYWxhcnknOiAyNjg1MDksXG4gICAgICAgICdzdGF0dXMnOiAnQXJjaGl2ZWQnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnTGFib3JlIHNpdCBudWxsYSBhbWV0IGVuaW0gcmVwcmVoZW5kZXJpdCBlc3NlIGxhYm9ydW0gTG9yZW0gcXVpcyBpbiBldS4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdBbWVuYSBTdG9uZScsXG4gICAgICAgICdwb3NpdGlvbic6ICdFbmltIEluY29ycG9yYXRlZCcsXG4gICAgICAgICdvZmZpY2UnOiAnR3VpbmVhJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDkvMjMnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDIxNDM4MSxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlcmUgd2FzIGRlc3BhaXIgaW4gdGhlIGR1c3QgYm93bCBhbmQgZGVwcmVzc2lvbiBhY3Jvc3MgdGhlIGxhbmQsIHNoZSBzYXcgYSBuYXRpb24gY29ucXVlciBmZWFyIGl0c2VsZiB3aXRoIGEgTmV3IERlYWwsIG5ldyBqb2JzIGFuZCBhIG5ldyBzZW5zZSBvZiBjb21tb24gcHVycG9zZS4gWWVzIHdlIGNhbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnVGVtcG9yYXJ5JywgJ0RldmVsb3BlciddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdEYW5pZWxsZSBDb2ZmZXknLFxuICAgICAgICAncG9zaXRpb24nOiAnRmV1Z2lhdCBQbGFjZXJhdCBDb3JwLicsXG4gICAgICAgICdvZmZpY2UnOiAnU2FvIFRvbWUgYW5kIFByaW5jaXBlJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDYvMTcnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDEzNzQyMyxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnV2hlbiB0aGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydUZW1wb3JhcnknLCAnRGV2ZWxvcGVyJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0J1ZmZ5IFJ1c3NlbGwnLFxuICAgICAgICAncG9zaXRpb24nOiAnTGFjdXMgUXVpc3F1ZSBMdGQnLFxuICAgICAgICAnb2ZmaWNlJzogJ0VjdWFkb3InLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8xMC8xNycpLFxuICAgICAgICAnc2FsYXJ5JzogNjEyMTg0LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ09mZmljZSBTa2lsbHMnXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnS2FpdGxpbiBMYW1iJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ01hbGVzdWFkYSBGcmluZ2lsbGEgRXN0IEFzc29jaWF0ZXMnLFxuICAgICAgICAnb2ZmaWNlJzogJ0FsZ2VyaWEnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8xMC8xOCcpLFxuICAgICAgICAnc2FsYXJ5JzogMzI3MzY3LFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ09mZmljZSBTa2lsbHMnXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnTGVpbGFuaSBZYXRlcycsXG4gICAgICAgICdwb3NpdGlvbic6ICdNdXMgUHJvaW4gTExDJyxcbiAgICAgICAgJ29mZmljZSc6ICdTb3V0aCBTdWRhbicsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzA1LzI3JyksXG4gICAgICAgICdzYWxhcnknOiA3NDM0OTMsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1doZW4gdGhlcmUgd2FzIGRlc3BhaXIgaW4gdGhlIGR1c3QgYm93bCBhbmQgZGVwcmVzc2lvbiBhY3Jvc3MgdGhlIGxhbmQsIHNoZSBzYXcgYSBuYXRpb24gY29ucXVlciBmZWFyIGl0c2VsZiB3aXRoIGEgTmV3IERlYWwsIG5ldyBqb2JzIGFuZCBhIG5ldyBzZW5zZSBvZiBjb21tb24gcHVycG9zZS4gWWVzIHdlIGNhbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnT2ZmaWNlIFNraWxscyddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdKZW1pbWEgTW9vbicsXG4gICAgICAgICdwb3NpdGlvbic6ICdQaGFzZWxsdXMgQ29ycC4nLFxuICAgICAgICAnb2ZmaWNlJzogJ1NvdXRoIEdlb3JnaWEgYW5kIFRoZSBTb3V0aCBTYW5kd2ljaCBJc2xhbmRzJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDUvMjEnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDQ5NjA2NyxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnV2hlbiB0aGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydPZmZpY2UgU2tpbGxzJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ0hpcm9rbyBTY2h3YXJ0eicsXG4gICAgICAgICdwb3NpdGlvbic6ICdOZXF1ZSBJbnN0aXR1dGUnLFxuICAgICAgICAnb2ZmaWNlJzogJ1NhaW50IFZpbmNlbnQgYW5kIFRoZSBHcmVuYWRpbmVzJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDMvMTMnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDE3ODc4MixcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnV2hlbiB0aGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydPZmZpY2UgU2tpbGxzJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ05hdGhhbmllbCBKZW5zZW4nLFxuICAgICAgICAncG9zaXRpb24nOiAnTWkgVGVtcG9yIExpbWl0ZWQnLFxuICAgICAgICAnb2ZmaWNlJzogJ0RvbWluaWNhJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMTIvMDUnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDM3NDQxLFxuICAgICAgICAnc3RhdHVzJzogJ0FjdGl2ZScsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdXaGVuIHRoZXJlIHdhcyBkZXNwYWlyIGluIHRoZSBkdXN0IGJvd2wgYW5kIGRlcHJlc3Npb24gYWNyb3NzIHRoZSBsYW5kLCBzaGUgc2F3IGEgbmF0aW9uIGNvbnF1ZXIgZmVhciBpdHNlbGYgd2l0aCBhIE5ldyBEZWFsLCBuZXcgam9icyBhbmQgYSBuZXcgc2Vuc2Ugb2YgY29tbW9uIHB1cnBvc2UuIFllcyB3ZSBjYW4uJyxcbiAgICAgICAgJ2NhdGVnb3JpZXMnOiBbJ09mZmljZSBTa2lsbHMnXVxuICAgIH0sIHtcbiAgICAgICAgJ25hbWUnOiAnU2lsYXMgU3dlZW5leScsXG4gICAgICAgICdwb3NpdGlvbic6ICdVbHRyaWNlcyBJbnN0aXR1dGUnLFxuICAgICAgICAnb2ZmaWNlJzogJ1R1cmttZW5pc3RhbicsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzExLzEzJyksXG4gICAgICAgICdzYWxhcnknOiAxNTI5ODAsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1doZW4gdGhlcmUgd2FzIGRlc3BhaXIgaW4gdGhlIGR1c3QgYm93bCBhbmQgZGVwcmVzc2lvbiBhY3Jvc3MgdGhlIGxhbmQsIHNoZSBzYXcgYSBuYXRpb24gY29ucXVlciBmZWFyIGl0c2VsZiB3aXRoIGEgTmV3IERlYWwsIG5ldyBqb2JzIGFuZCBhIG5ldyBzZW5zZSBvZiBjb21tb24gcHVycG9zZS4gWWVzIHdlIGNhbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnT2ZmaWNlIFNraWxscyddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdKZXJtYWluZSBCYXJyeScsXG4gICAgICAgICdwb3NpdGlvbic6ICdEYXBpYnVzIENvcnBvcmF0aW9uJyxcbiAgICAgICAgJ29mZmljZSc6ICdVemJla2lzdGFuJyxcbiAgICAgICAgJ2V4dCc6IHsgJ29iaic6ICc4MjYyJyB9LFxuICAgICAgICAnc3RhcnREYXRlJzogbmV3IERhdGUoJzIwMTYvMDMvMDYnKSxcbiAgICAgICAgJ3NhbGFyeSc6IDQwOTQ2MyxcbiAgICAgICAgJ3N0YXR1cyc6ICdBY3RpdmUnLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnV2hlbiB0aGVyZSB3YXMgZGVzcGFpciBpbiB0aGUgZHVzdCBib3dsIGFuZCBkZXByZXNzaW9uIGFjcm9zcyB0aGUgbGFuZCwgc2hlIHNhdyBhIG5hdGlvbiBjb25xdWVyIGZlYXIgaXRzZWxmIHdpdGggYSBOZXcgRGVhbCwgbmV3IGpvYnMgYW5kIGEgbmV3IHNlbnNlIG9mIGNvbW1vbiBwdXJwb3NlLiBZZXMgd2UgY2FuLicsXG4gICAgICAgICdjYXRlZ29yaWVzJzogWydPZmZpY2UgU2tpbGxzJ11cbiAgICB9LCB7XG4gICAgICAgICduYW1lJzogJ1RhdGlhbmEgTmljaG9scycsXG4gICAgICAgICdwb3NpdGlvbic6ICdOZWMgRGlhbSBJbmR1c3RyaWVzJyxcbiAgICAgICAgJ29mZmljZSc6ICdDb29rIElzbGFuZHMnLFxuICAgICAgICAnZXh0JzogeyAnb2JqJzogJzgyNjInIH0sXG4gICAgICAgICdzdGFydERhdGUnOiBuZXcgRGF0ZSgnMjAxNi8wNS8yMicpLFxuICAgICAgICAnc2FsYXJ5JzogNTExNTUsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1doZW4gdGhlcmUgd2FzIGRlc3BhaXIgaW4gdGhlIGR1c3QgYm93bCBhbmQgZGVwcmVzc2lvbiBhY3Jvc3MgdGhlIGxhbmQsIHNoZSBzYXcgYSBuYXRpb24gY29ucXVlciBmZWFyIGl0c2VsZiB3aXRoIGEgTmV3IERlYWwsIG5ldyBqb2JzIGFuZCBhIG5ldyBzZW5zZSBvZiBjb21tb24gcHVycG9zZS4gWWVzIHdlIGNhbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnT2ZmaWNlIFNraWxscyddXG4gICAgfSwge1xuICAgICAgICAnbmFtZSc6ICdSYW1hIFdhbGxlcicsXG4gICAgICAgICdwb3NpdGlvbic6ICdTZW0gUGVsbGVudGVzcXVlIExMQycsXG4gICAgICAgICdvZmZpY2UnOiAnQW5kb3JyYScsXG4gICAgICAgICdleHQnOiB7ICdvYmonOiAnODI2MicgfSxcbiAgICAgICAgJ3N0YXJ0RGF0ZSc6IG5ldyBEYXRlKCcyMDE2LzEyLzAxJyksXG4gICAgICAgICdzYWxhcnknOiAyMjMyMjcsXG4gICAgICAgICdzdGF0dXMnOiAnQWN0aXZlJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1doZW4gdGhlcmUgd2FzIGRlc3BhaXIgaW4gdGhlIGR1c3QgYm93bCBhbmQgZGVwcmVzc2lvbiBhY3Jvc3MgdGhlIGxhbmQsIHNoZSBzYXcgYSBuYXRpb24gY29ucXVlciBmZWFyIGl0c2VsZiB3aXRoIGEgTmV3IERlYWwsIG5ldyBqb2JzIGFuZCBhIG5ldyBzZW5zZSBvZiBjb21tb24gcHVycG9zZS4gWWVzIHdlIGNhbi4nLFxuICAgICAgICAnY2F0ZWdvcmllcyc6IFsnT2ZmaWNlIFNraWxscyddXG4gICAgfV07XG4iXX0=

/***/ },
/* 386 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TabsDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _ButtonTabDemo = __webpack_require__(523);
	
	var _ButtonTabDemo2 = _interopRequireDefault(_ButtonTabDemo);
	
	var _ColorDemo = __webpack_require__(524);
	
	var _ColorDemo2 = _interopRequireDefault(_ColorDemo);
	
	var _RouterDemo = __webpack_require__(525);
	
	var _RouterDemo2 = _interopRequireDefault(_RouterDemo);
	
	var _VerticalDemo = __webpack_require__(526);
	
	var _VerticalDemo2 = _interopRequireDefault(_VerticalDemo);
	
	var _WhiteDemo = __webpack_require__(527);
	
	var _WhiteDemo2 = _interopRequireDefault(_WhiteDemo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Tabs <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/tabs">(source)</a></small></h1>\n    <p>Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets. Tabs in Bullhorn have two different themes; A \'color\' theme for tabbed navigation on a colored background, and a \'white\' theme for tabs on a white background.</p>\n\n    <h2>Themes</h2>\n\n    <h5>Color</h5>\n    <p>Colored background tab navigation gets the theme <code>theme="color"</code></p>\n    <div class="example color-tab-demo">' + _ColorDemo2.default + '</div>\n    <code-snippet [code]="ColorDemoTpl"></code-snippet>\n\n    <h5>White</h5>\n    <p>White background tab navigation gets the theme <code>theme="white"</code></p>\n    <div class="example transparent-tab-demo">' + _WhiteDemo2.default + '</div>\n    <code-snippet [code]="WhiteDemoTpl"></code-snippet>\n\n    <h2>Types</h2>\n\n    <h5>Vertical</h5>\n    <p>Vertical tabs get a direction attribute <code>direction="vertical"</code></p>\n    <div class="example vertical-tab-demo">' + _VerticalDemo2.default + '</div>\n    <code-snippet [code]="VerticalDemoTpl"></code-snippet>\n\n    <h5>Button Tab Bars</h5>\n    <p>Tabbed Button Bars get a similar style treatment to the <code>"header"</code> theme button.</p>\n    <div class="example example button-tab-demo">' + _ButtonTabDemo2.default + '</div>\n    <code-snippet [code]="ButtonTabDemoTpl"></code-snippet>\n\n    <h2>As Application Routing Mechanism</h2>\n    <p>Follows the same color/white theme as above, but doesn\'t use the "novo-tabs" tag and you have to add the classes and html accordingly. The header will now control and route your application and put the content in the "router-outlet" and look/feel like our tabs component.</p>\n    <div class="example transparent-tab-demo">' + _RouterDemo2.default + '</div>\n    <code-snippet [code]="RouterDemoTpl"></code-snippet>\n</div>\n';
	
	var TabsDemoComponent = exports.TabsDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'tabs-demo',
	    template: template
	}), _dec(_class = function () {
	    function TabsDemoComponent() {
	        _classCallCheck(this, TabsDemoComponent);
	
	        this.ColorDemoTpl = _ColorDemo2.default;
	        this.WhiteDemoTpl = _WhiteDemo2.default;
	        this.VerticalDemoTpl = _VerticalDemo2.default;
	        this.ButtonTabDemoTpl = _ButtonTabDemo2.default;
	        this.RouterDemoTpl = _RouterDemo2.default;
	    }
	
	    _createClass(TabsDemoComponent, [{
	        key: 'tabSelected',
	        value: function tabSelected() {
	            console.log('TAB SELECTED'); // eslint-disable-line
	        }
	    }, {
	        key: 'tabDeselected',
	        value: function tabDeselected() {
	            console.log('TAB DESELECTED'); // eslint-disable-line
	        }
	    }]);
	
	    return TabsDemoComponent;
	}()) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvdGFicy9UYWJzRGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7a0JBQUE7O0FBRUE7OztBQURBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSw0L0RBQU47O0lBd0NhLGlCLFdBQUEsaUIsV0FKWixxQkFBVTtBQUNQLGNBQVUsV0FESDtBQUVQLGNBQVU7QUFGSCxDQUFWLEM7QUFLRyxpQ0FBYztBQUFBOztBQUNWLGFBQUssWUFBTDtBQUNBLGFBQUssWUFBTDtBQUNBLGFBQUssZUFBTDtBQUNBLGFBQUssZ0JBQUw7QUFDQSxhQUFLLGFBQUw7QUFDSDs7OztzQ0FFYTtBQUNWLG9CQUFRLEdBQVIsQ0FBWSxjQUFaLEVBRFUsQ0FDbUI7QUFDaEM7Ozt3Q0FFZTtBQUNaLG9CQUFRLEdBQVIsQ0FBWSxnQkFBWixFQURZLENBQ21CO0FBQ2xDIiwiZmlsZSI6IlRhYnNEZW1vLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ29kaS9ub3ZvLWRldi9saWJzL25vdm8tZWxlbWVudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgQnV0dG9uVGFiRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9CdXR0b25UYWJEZW1vLmh0bWwnO1xuaW1wb3J0IENvbG9yRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9Db2xvckRlbW8uaHRtbCc7XG5pbXBvcnQgUm91dGVyRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9Sb3V0ZXJEZW1vLmh0bWwnO1xuaW1wb3J0IFZlcnRpY2FsRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9WZXJ0aWNhbERlbW8uaHRtbCc7XG5pbXBvcnQgV2hpdGVEZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL1doaXRlRGVtby5odG1sJztcblxuY29uc3QgdGVtcGxhdGUgPSBgXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGgxPlRhYnMgPHNtYWxsPjxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYnVsbGhvcm4vbm92by1lbGVtZW50cy9ibG9iL21hc3Rlci9zcmMvZWxlbWVudHMvdGFic1wiPihzb3VyY2UpPC9hPjwvc21hbGw+PC9oMT5cbiAgICA8cD5UYWJzIG1ha2UgaXQgZWFzeSB0byBleHBsb3JlIGFuZCBzd2l0Y2ggYmV0d2VlbiBkaWZmZXJlbnQgdmlld3Mgb3IgZnVuY3Rpb25hbCBhc3BlY3RzIG9mIGFuIGFwcCBvciB0byBicm93c2UgY2F0ZWdvcml6ZWQgZGF0YSBzZXRzLiBUYWJzIGluIEJ1bGxob3JuIGhhdmUgdHdvIGRpZmZlcmVudCB0aGVtZXM7IEEgJ2NvbG9yJyB0aGVtZSBmb3IgdGFiYmVkIG5hdmlnYXRpb24gb24gYSBjb2xvcmVkIGJhY2tncm91bmQsIGFuZCBhICd3aGl0ZScgdGhlbWUgZm9yIHRhYnMgb24gYSB3aGl0ZSBiYWNrZ3JvdW5kLjwvcD5cblxuICAgIDxoMj5UaGVtZXM8L2gyPlxuXG4gICAgPGg1PkNvbG9yPC9oNT5cbiAgICA8cD5Db2xvcmVkIGJhY2tncm91bmQgdGFiIG5hdmlnYXRpb24gZ2V0cyB0aGUgdGhlbWUgPGNvZGU+dGhlbWU9XCJjb2xvclwiPC9jb2RlPjwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSBjb2xvci10YWItZGVtb1wiPiR7Q29sb3JEZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiQ29sb3JEZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG5cbiAgICA8aDU+V2hpdGU8L2g1PlxuICAgIDxwPldoaXRlIGJhY2tncm91bmQgdGFiIG5hdmlnYXRpb24gZ2V0cyB0aGUgdGhlbWUgPGNvZGU+dGhlbWU9XCJ3aGl0ZVwiPC9jb2RlPjwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSB0cmFuc3BhcmVudC10YWItZGVtb1wiPiR7V2hpdGVEZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiV2hpdGVEZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG5cbiAgICA8aDI+VHlwZXM8L2gyPlxuXG4gICAgPGg1PlZlcnRpY2FsPC9oNT5cbiAgICA8cD5WZXJ0aWNhbCB0YWJzIGdldCBhIGRpcmVjdGlvbiBhdHRyaWJ1dGUgPGNvZGU+ZGlyZWN0aW9uPVwidmVydGljYWxcIjwvY29kZT48L3A+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgdmVydGljYWwtdGFiLWRlbW9cIj4ke1ZlcnRpY2FsRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIlZlcnRpY2FsRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuXG4gICAgPGg1PkJ1dHRvbiBUYWIgQmFyczwvaDU+XG4gICAgPHA+VGFiYmVkIEJ1dHRvbiBCYXJzIGdldCBhIHNpbWlsYXIgc3R5bGUgdHJlYXRtZW50IHRvIHRoZSA8Y29kZT5cImhlYWRlclwiPC9jb2RlPiB0aGVtZSBidXR0b24uPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIGV4YW1wbGUgYnV0dG9uLXRhYi1kZW1vXCI+JHtCdXR0b25UYWJEZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiQnV0dG9uVGFiRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuXG4gICAgPGgyPkFzIEFwcGxpY2F0aW9uIFJvdXRpbmcgTWVjaGFuaXNtPC9oMj5cbiAgICA8cD5Gb2xsb3dzIHRoZSBzYW1lIGNvbG9yL3doaXRlIHRoZW1lIGFzIGFib3ZlLCBidXQgZG9lc24ndCB1c2UgdGhlIFwibm92by10YWJzXCIgdGFnIGFuZCB5b3UgaGF2ZSB0byBhZGQgdGhlIGNsYXNzZXMgYW5kIGh0bWwgYWNjb3JkaW5nbHkuIFRoZSBoZWFkZXIgd2lsbCBub3cgY29udHJvbCBhbmQgcm91dGUgeW91ciBhcHBsaWNhdGlvbiBhbmQgcHV0IHRoZSBjb250ZW50IGluIHRoZSBcInJvdXRlci1vdXRsZXRcIiBhbmQgbG9vay9mZWVsIGxpa2Ugb3VyIHRhYnMgY29tcG9uZW50LjwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSB0cmFuc3BhcmVudC10YWItZGVtb1wiPiR7Um91dGVyRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIlJvdXRlckRlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cbjwvZGl2PlxuYDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0YWJzLWRlbW8nLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBUYWJzRGVtb0NvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuQ29sb3JEZW1vVHBsID0gQ29sb3JEZW1vVHBsO1xuICAgICAgICB0aGlzLldoaXRlRGVtb1RwbCA9IFdoaXRlRGVtb1RwbDtcbiAgICAgICAgdGhpcy5WZXJ0aWNhbERlbW9UcGwgPSBWZXJ0aWNhbERlbW9UcGw7XG4gICAgICAgIHRoaXMuQnV0dG9uVGFiRGVtb1RwbCA9IEJ1dHRvblRhYkRlbW9UcGw7XG4gICAgICAgIHRoaXMuUm91dGVyRGVtb1RwbCA9IFJvdXRlckRlbW9UcGw7XG4gICAgfVxuXG4gICAgdGFiU2VsZWN0ZWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUQUIgU0VMRUNURUQnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH1cblxuICAgIHRhYkRlc2VsZWN0ZWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUQUIgREVTRUxFQ1RFRCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfVxufVxuIl19

/***/ },
/* 387 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TilesDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _TilesDemo = __webpack_require__(528);
	
	var _TilesDemo2 = _interopRequireDefault(_TilesDemo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Tiles <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/tiles">(source)</a></small></h1>\n    <p>\n        This component is intended to behave akin to the radio button component.\n    </p>\n    <h4>Demo</h4>\n    <div>' + _TilesDemo2.default + '</div>\n    <br>\n    You have picked (output): <strong>{{ currentColor || \'No selection\' }}</strong>\n    <br/>\n    You have picked (ngModel): <strong>{{ value || \'No selection\' }}</strong>\n    <h4>Code</h4>\n    <code-snippet [code]="TilesDemoTpl"></code-snippet>\n</div>\n';
	
	var TilesDemoComponent = exports.TilesDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'tiles-demo',
	    template: template
	}), _dec(_class = function () {
	    function TilesDemoComponent() {
	        _classCallCheck(this, TilesDemoComponent);
	
	        this.shown = false;
	
	        this.TilesDemoTpl = _TilesDemo2.default;
	        this.demoTiles = [{
	            label: 'Red',
	            value: 'red'
	        }, {
	            label: 'Green',
	            value: 'green'
	        }, {
	            label: 'Blue',
	            value: 'blue'
	        }];
	    }
	
	    _createClass(TilesDemoComponent, [{
	        key: 'colorSelect',
	        value: function colorSelect(newColorValue) {
	            this.currentColor = newColorValue;
	        }
	    }, {
	        key: 'toggleShown',
	        value: function toggleShown() {
	            this.shown = !this.shown;
	        }
	    }]);
	
	    return TilesDemoComponent;
	}()) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvdGlsZXMvVGlsZXNEZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztrQkFBQTs7QUFFQTs7O0FBREE7O0FBRUE7Ozs7Ozs7O0FBRUEsSUFBTSxnbkJBQU47O0lBcUJhLGtCLFdBQUEsa0IsV0FKWixxQkFBVTtBQUNQLGNBQVUsWUFESDtBQUVQLGNBQVU7QUFGSCxDQUFWLEM7QUFNRyxrQ0FBYztBQUFBOztBQUFBLGFBRGQsS0FDYyxHQURFLEtBQ0Y7O0FBQ1YsYUFBSyxZQUFMO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLENBQ2I7QUFDSSxtQkFBTyxLQURYO0FBRUksbUJBQU87QUFGWCxTQURhLEVBS2I7QUFDSSxtQkFBTyxPQURYO0FBRUksbUJBQU87QUFGWCxTQUxhLEVBU2I7QUFDSSxtQkFBTyxNQURYO0FBRUksbUJBQU87QUFGWCxTQVRhLENBQWpCO0FBY0g7Ozs7b0NBRVcsYSxFQUFlO0FBQ3ZCLGlCQUFLLFlBQUwsR0FBb0IsYUFBcEI7QUFDSDs7O3NDQUVhO0FBQ1YsaUJBQUssS0FBTCxHQUFhLENBQUMsS0FBSyxLQUFuQjtBQUNIIiwiZmlsZSI6IlRpbGVzRGVtby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdvZGkvbm92by1kZXYvbGlicy9ub3ZvLWVsZW1lbnRzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IFRpbGVzRGVtb1RwbCBmcm9tICcuL3RlbXBsYXRlcy9UaWxlc0RlbW8uaHRtbCc7XG5cbmNvbnN0IHRlbXBsYXRlID0gYFxuPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxoMT5UaWxlcyA8c21hbGw+PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9idWxsaG9ybi9ub3ZvLWVsZW1lbnRzL2Jsb2IvbWFzdGVyL3NyYy9lbGVtZW50cy90aWxlc1wiPihzb3VyY2UpPC9hPjwvc21hbGw+PC9oMT5cbiAgICA8cD5cbiAgICAgICAgVGhpcyBjb21wb25lbnQgaXMgaW50ZW5kZWQgdG8gYmVoYXZlIGFraW4gdG8gdGhlIHJhZGlvIGJ1dHRvbiBjb21wb25lbnQuXG4gICAgPC9wPlxuICAgIDxoND5EZW1vPC9oND5cbiAgICA8ZGl2PiR7VGlsZXNEZW1vVHBsfTwvZGl2PlxuICAgIDxicj5cbiAgICBZb3UgaGF2ZSBwaWNrZWQgKG91dHB1dCk6IDxzdHJvbmc+e3sgY3VycmVudENvbG9yIHx8ICdObyBzZWxlY3Rpb24nIH19PC9zdHJvbmc+XG4gICAgPGJyLz5cbiAgICBZb3UgaGF2ZSBwaWNrZWQgKG5nTW9kZWwpOiA8c3Ryb25nPnt7IHZhbHVlIHx8ICdObyBzZWxlY3Rpb24nIH19PC9zdHJvbmc+XG4gICAgPGg0PkNvZGU8L2g0PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiVGlsZXNEZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG48L2Rpdj5cbmA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndGlsZXMtZGVtbycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG59KVxuZXhwb3J0IGNsYXNzIFRpbGVzRGVtb0NvbXBvbmVudCB7XG4gICAgc2hvd246Qm9vbGVhbiA9IGZhbHNlO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLlRpbGVzRGVtb1RwbCA9IFRpbGVzRGVtb1RwbDtcbiAgICAgICAgdGhpcy5kZW1vVGlsZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdSZWQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAncmVkJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0dyZWVuJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ2dyZWVuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0JsdWUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnYmx1ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBjb2xvclNlbGVjdChuZXdDb2xvclZhbHVlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudENvbG9yID0gbmV3Q29sb3JWYWx1ZTtcbiAgICB9XG5cbiAgICB0b2dnbGVTaG93bigpIHtcbiAgICAgICAgdGhpcy5zaG93biA9ICF0aGlzLnNob3duO1xuICAgIH1cbn1cbiJdfQ==

/***/ },
/* 388 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TipWellDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// App
	
	
	var _core = __webpack_require__(2);
	
	var _TipWellDemo = __webpack_require__(529);
	
	var _TipWellDemo2 = _interopRequireDefault(_TipWellDemo);
	
	var _TipWellNoButtonDemo = __webpack_require__(531);
	
	var _TipWellNoButtonDemo2 = _interopRequireDefault(_TipWellNoButtonDemo);
	
	var _TipWellIconDemo = __webpack_require__(530);
	
	var _TipWellIconDemo2 = _interopRequireDefault(_TipWellIconDemo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>TipWell <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/tip-well">(source)</a></small></h1>\n    <p>\n        This component is meant to be akin to Bootstrap\'s \'well\'. It\'s a small container for help text.\n    </p>\n    <h4>Demo</h4>\n    <div>' + _TipWellDemo2.default + '</div>\n    <br />\n    <p>Did you hide the TipWell?</p>\n    <button theme="primary" color="success" icon="refresh" (click)="clearLocalStorage()">Reset localStorage and Reload</button>\n    <br />\n    <h4>Code</h4>\n    <code-snippet [code]="TipWellDemoTpl"></code-snippet>\n    <h4>No Button Demo</h4>\n    <div>' + _TipWellNoButtonDemo2.default + '</div>\n    <br />\n    <h4>Code</h4>\n    <code-snippet [code]="TipWellNoButtonDemoTpl"></code-snippet>\n    <h4>Icon Demo</h4>\n    <div>' + _TipWellIconDemo2.default + '</div>\n    <br />\n    <p>Did you hide the TipWell?</p>\n    <button theme="primary" color="success" icon="refresh" (click)="clearLocalStorage()">Reset localStorage and Reload</button>\n    <br />\n    <h4>Code</h4>\n    <code-snippet [code]="TipWellIconDemoTpl"></code-snippet>\n</div>\n';
	
	var TipWellDemoComponent = exports.TipWellDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'tip-well-demo',
	    template: template
	}), _dec(_class = function () {
	    function TipWellDemoComponent() {
	        _classCallCheck(this, TipWellDemoComponent);
	
	        this.TipWellDemoTpl = _TipWellDemo2.default;
	        this.TipWellNoButtonDemoTpl = _TipWellNoButtonDemo2.default;
	        this.TipWellIconDemoTpl = _TipWellIconDemo2.default;
	        this.demoTip = 'Sed sodales ligula et fermentum bibendum. Aliquam tincidunt sagittis leo eget auctor. Fusce eu sagittis metus, ut viverra magna. Mauris mollis nisl nec libero tincidunt posuere.';
	    }
	
	    _createClass(TipWellDemoComponent, [{
	        key: 'clearLocalStorage',
	        value: function clearLocalStorage() {
	            localStorage.removeItem('novo-tw_Demo');
	            location.reload();
	        }
	    }]);
	
	    return TipWellDemoComponent;
	}()) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvdGlwLXdlbGwvVGlwV2VsbERlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O2tCQUFBOztBQUVBOzs7QUFEQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSxzcUNBQU47O0lBa0NhLG9CLFdBQUEsb0IsV0FKWixxQkFBVTtBQUNQLGNBQVUsZUFESDtBQUVQLGNBQVU7QUFGSCxDQUFWLEM7QUFLRyxvQ0FBYztBQUFBOztBQUNWLGFBQUssY0FBTDtBQUNBLGFBQUssc0JBQUw7QUFDQSxhQUFLLGtCQUFMO0FBQ0EsYUFBSyxPQUFMLEdBQWUsbUxBQWY7QUFDSDs7Ozs0Q0FFbUI7QUFDaEIseUJBQWEsVUFBYixDQUF3QixjQUF4QjtBQUNBLHFCQUFTLE1BQVQ7QUFDSCIsImZpbGUiOiJUaXBXZWxsRGVtby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdvZGkvbm92by1kZXYvbGlicy9ub3ZvLWVsZW1lbnRzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFwcFxuaW1wb3J0IFRpcFdlbGxEZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL1RpcFdlbGxEZW1vLmh0bWwnO1xuaW1wb3J0IFRpcFdlbGxOb0J1dHRvbkRlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvVGlwV2VsbE5vQnV0dG9uRGVtby5odG1sJztcbmltcG9ydCBUaXBXZWxsSWNvbkRlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvVGlwV2VsbEljb25EZW1vLmh0bWwnO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGBcbjxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICA8aDE+VGlwV2VsbCA8c21hbGw+PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9idWxsaG9ybi9ub3ZvLWVsZW1lbnRzL2Jsb2IvbWFzdGVyL3NyYy9lbGVtZW50cy90aXAtd2VsbFwiPihzb3VyY2UpPC9hPjwvc21hbGw+PC9oMT5cbiAgICA8cD5cbiAgICAgICAgVGhpcyBjb21wb25lbnQgaXMgbWVhbnQgdG8gYmUgYWtpbiB0byBCb290c3RyYXAncyAnd2VsbCcuIEl0J3MgYSBzbWFsbCBjb250YWluZXIgZm9yIGhlbHAgdGV4dC5cbiAgICA8L3A+XG4gICAgPGg0PkRlbW88L2g0PlxuICAgIDxkaXY+JHtUaXBXZWxsRGVtb1RwbH08L2Rpdj5cbiAgICA8YnIgLz5cbiAgICA8cD5EaWQgeW91IGhpZGUgdGhlIFRpcFdlbGw/PC9wPlxuICAgIDxidXR0b24gdGhlbWU9XCJwcmltYXJ5XCIgY29sb3I9XCJzdWNjZXNzXCIgaWNvbj1cInJlZnJlc2hcIiAoY2xpY2spPVwiY2xlYXJMb2NhbFN0b3JhZ2UoKVwiPlJlc2V0IGxvY2FsU3RvcmFnZSBhbmQgUmVsb2FkPC9idXR0b24+XG4gICAgPGJyIC8+XG4gICAgPGg0PkNvZGU8L2g0PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiVGlwV2VsbERlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cbiAgICA8aDQ+Tm8gQnV0dG9uIERlbW88L2g0PlxuICAgIDxkaXY+JHtUaXBXZWxsTm9CdXR0b25EZW1vVHBsfTwvZGl2PlxuICAgIDxiciAvPlxuICAgIDxoND5Db2RlPC9oND5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIlRpcFdlbGxOb0J1dHRvbkRlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cbiAgICA8aDQ+SWNvbiBEZW1vPC9oND5cbiAgICA8ZGl2PiR7VGlwV2VsbEljb25EZW1vVHBsfTwvZGl2PlxuICAgIDxiciAvPlxuICAgIDxwPkRpZCB5b3UgaGlkZSB0aGUgVGlwV2VsbD88L3A+XG4gICAgPGJ1dHRvbiB0aGVtZT1cInByaW1hcnlcIiBjb2xvcj1cInN1Y2Nlc3NcIiBpY29uPVwicmVmcmVzaFwiIChjbGljayk9XCJjbGVhckxvY2FsU3RvcmFnZSgpXCI+UmVzZXQgbG9jYWxTdG9yYWdlIGFuZCBSZWxvYWQ8L2J1dHRvbj5cbiAgICA8YnIgLz5cbiAgICA8aDQ+Q29kZTwvaDQ+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJUaXBXZWxsSWNvbkRlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cbjwvZGl2PlxuYDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0aXAtd2VsbC1kZW1vJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbn0pXG5leHBvcnQgY2xhc3MgVGlwV2VsbERlbW9Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLlRpcFdlbGxEZW1vVHBsID0gVGlwV2VsbERlbW9UcGw7XG4gICAgICAgIHRoaXMuVGlwV2VsbE5vQnV0dG9uRGVtb1RwbCA9IFRpcFdlbGxOb0J1dHRvbkRlbW9UcGw7XG4gICAgICAgIHRoaXMuVGlwV2VsbEljb25EZW1vVHBsID0gVGlwV2VsbEljb25EZW1vVHBsO1xuICAgICAgICB0aGlzLmRlbW9UaXAgPSAnU2VkIHNvZGFsZXMgbGlndWxhIGV0IGZlcm1lbnR1bSBiaWJlbmR1bS4gQWxpcXVhbSB0aW5jaWR1bnQgc2FnaXR0aXMgbGVvIGVnZXQgYXVjdG9yLiBGdXNjZSBldSBzYWdpdHRpcyBtZXR1cywgdXQgdml2ZXJyYSBtYWduYS4gTWF1cmlzIG1vbGxpcyBuaXNsIG5lYyBsaWJlcm8gdGluY2lkdW50IHBvc3VlcmUuJztcbiAgICB9XG5cbiAgICBjbGVhckxvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ25vdm8tdHdfRGVtbycpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9XG59XG4iXX0=

/***/ },
/* 389 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ToastDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	// Vendor
	
	
	var _core = __webpack_require__(2);
	
	var _ToastDemo = __webpack_require__(532);
	
	var _ToastDemo2 = _interopRequireDefault(_ToastDemo);
	
	var _ToastServiceDemo = __webpack_require__(533);
	
	var _ToastServiceDemo2 = _interopRequireDefault(_ToastServiceDemo);
	
	var _novoElements = __webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Toast Notifications\n        <small>\n            <a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/toast">(source)</a>\n        </small>\n    </h1>\n    <p>Toasts are used as system notifications. They can contain custom\n    text titles and messages, as well as any icons from bh-icons and any color\n    from our color palletes.</p>\n\n    <h2>Types</h2>\n\n    <h5>Alert</h5>\n    <p>This type of toast notification takes a template, a style,\n        and a location.</p>\n    <div class="example toast-demo">\n        <h2>Embedded Toast</h2>\n        ' + _ToastDemo2.default + '\n    </div>\n    <code-snippet [code]="ToastDemoTpl"></code-snippet>\n\n    <div class="example toast-demo">\n        <h2>Toaster Service</h2>\n        ' + _ToastServiceDemo2.default + '\n    </div>\n    <code-snippet [code]="ToastServiceDemoTpl"></code-snippet>\n</div>\n';
	
	var ToastDemoComponent = exports.ToastDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'toast-demo',
	    template: template
	}), _dec(_class = function () {
	    function ToastDemoComponent(toaster) {
	        _classCallCheck(this, ToastDemoComponent);
	
	        // Templates
	        this.ToastDemoTpl = _ToastDemo2.default;
	        this.ToastServiceDemoTpl = _ToastServiceDemo2.default;
	
	        // Toaster Service
	        this.toaster = toaster;
	
	        // Default Toast styles
	        this.positions = ['fixedTop', 'fixedBottom', 'growlTopLeft', 'growlTopRight', 'growlBottomLeft', 'growlBottomRight'];
	        this.themes = ['default', 'success', 'info', 'warning', 'danger'];
	        this.icons = ['add', 'check', 'clock', 'lock', 'caution'];
	        this.options = {
	            'title': 'Title',
	            'message': 'Some Message...'
	        };
	        this.toast = {
	            theme: 'danger',
	            icon: 'caution'
	        };
	    }
	
	    _createClass(ToastDemoComponent, [{
	        key: 'changeToast',
	        value: function changeToast() {
	            this.toast = {
	                theme: this.themes[(this.themes.indexOf(this.toast.theme) + 1) % this.themes.length],
	                icon: this.icons[(this.icons.indexOf(this.toast.icon) + 1) % this.icons.length]
	            };
	        }
	    }, {
	        key: 'toastToggled',
	        value: function toastToggled(arg) {
	            if (arg === 'top') {
	                this.options = {
	                    title: 'Top',
	                    message: 'This positioning is fixedTop',
	                    icon: 'coffee',
	                    theme: 'success',
	                    position: 'fixedTop'
	                };
	            } else if (arg === 'bottom') {
	                this.options = {
	                    title: 'Bottom',
	                    message: 'This positioning is fixedBottom',
	                    icon: 'check',
	                    theme: 'ocean',
	                    position: 'fixedBottom'
	                };
	            } else if (arg === 'growlTopRight') {
	                this.options = {
	                    title: 'Growl',
	                    message: 'This positioning is growlTopRight',
	                    icon: 'times',
	                    theme: 'danger',
	                    position: 'growlTopRight',
	                    hideDelay: 100000000
	                };
	            } else if (arg === 'growlTopLeft') {
	                this.options = {
	                    title: 'Growl',
	                    message: 'This positioning is growlTopLeft',
	                    icon: 'coffee',
	                    theme: 'ocean',
	                    position: 'growlTopLeft',
	                    hideDelay: 100000000
	                };
	            } else if (arg === 'growlBottomRight') {
	                this.options = {
	                    title: 'Growl',
	                    message: 'This positioning is growlTopRight',
	                    icon: 'times',
	                    theme: 'danger',
	                    position: 'growlBottomRight'
	                };
	            } else if (arg === 'growlBottomLeft') {
	                this.options = {
	                    title: 'Growl',
	                    message: 'This positioning is growlTopLeft',
	                    icon: 'coffee',
	                    theme: 'ocean',
	                    position: 'growlBottomLeft'
	                };
	            }
	            this.toaster.alert(this.options);
	        }
	    }]);
	
	    return ToastDemoComponent;
	}()) || _class);
	Reflect.defineMetadata('design:paramtypes', [_novoElements.NovoToastService], ToastDemoComponent);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvdG9hc3QvVG9hc3REZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztrQkFBQTs7QUFFQTs7QUFHQTs7O0FBSkE7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFFQSxJQUFNLGs3QkFBTjs7SUFrQ2Esa0IsV0FBQSxrQixXQUpaLHFCQUFVO0FBQ1AsY0FBVSxZQURIO0FBRVAsY0FBVTtBQUZILENBQVYsQztBQUtHLGdDQUFZLE9BQVosRUFBc0M7QUFBQTs7QUFDbEM7QUFDQSxhQUFLLFlBQUw7QUFDQSxhQUFLLG1CQUFMOztBQUVBO0FBQ0EsYUFBSyxPQUFMLEdBQWUsT0FBZjs7QUFFQTtBQUNBLGFBQUssU0FBTCxHQUFpQixDQUNiLFVBRGEsRUFFYixhQUZhLEVBR2IsY0FIYSxFQUliLGVBSmEsRUFLYixpQkFMYSxFQU1iLGtCQU5hLENBQWpCO0FBUUEsYUFBSyxNQUFMLEdBQWMsQ0FDVixTQURVLEVBRVYsU0FGVSxFQUdWLE1BSFUsRUFJVixTQUpVLEVBS1YsUUFMVSxDQUFkO0FBT0EsYUFBSyxLQUFMLEdBQWEsQ0FDVCxLQURTLEVBRVQsT0FGUyxFQUdULE9BSFMsRUFJVCxNQUpTLEVBS1QsU0FMUyxDQUFiO0FBT0EsYUFBSyxPQUFMLEdBQWU7QUFDWCxxQkFBUyxPQURFO0FBRVgsdUJBQVc7QUFGQSxTQUFmO0FBSUEsYUFBSyxLQUFMLEdBQWE7QUFDVCxtQkFBTyxRQURFO0FBRVQsa0JBQU07QUFGRyxTQUFiO0FBSUg7Ozs7c0NBRWE7QUFDVixpQkFBSyxLQUFMLEdBQWE7QUFDVCx1QkFBTyxLQUFLLE1BQUwsQ0FBWSxDQUFDLEtBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsS0FBSyxLQUFMLENBQVcsS0FBL0IsSUFBd0MsQ0FBekMsSUFBK0MsS0FBSyxNQUFMLENBQVksTUFBdkUsQ0FERTtBQUVULHNCQUFNLEtBQUssS0FBTCxDQUFXLENBQUMsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixLQUFLLEtBQUwsQ0FBVyxJQUE5QixJQUFzQyxDQUF2QyxJQUE2QyxLQUFLLEtBQUwsQ0FBVyxNQUFuRTtBQUZHLGFBQWI7QUFJSDs7O3FDQUVZLEcsRUFBSztBQUNkLGdCQUFJLFFBQVEsS0FBWixFQUFtQjtBQUNmLHFCQUFLLE9BQUwsR0FBZTtBQUNYLDJCQUFPLEtBREk7QUFFWCw2QkFBUyw4QkFGRTtBQUdYLDBCQUFNLFFBSEs7QUFJWCwyQkFBTyxTQUpJO0FBS1gsOEJBQVU7QUFMQyxpQkFBZjtBQU9ILGFBUkQsTUFRTyxJQUFJLFFBQVEsUUFBWixFQUFzQjtBQUN6QixxQkFBSyxPQUFMLEdBQWU7QUFDWCwyQkFBTyxRQURJO0FBRVgsNkJBQVMsaUNBRkU7QUFHWCwwQkFBTSxPQUhLO0FBSVgsMkJBQU8sT0FKSTtBQUtYLDhCQUFVO0FBTEMsaUJBQWY7QUFPSCxhQVJNLE1BUUEsSUFBSSxRQUFRLGVBQVosRUFBNkI7QUFDaEMscUJBQUssT0FBTCxHQUFlO0FBQ1gsMkJBQU8sT0FESTtBQUVYLDZCQUFTLG1DQUZFO0FBR1gsMEJBQU0sT0FISztBQUlYLDJCQUFPLFFBSkk7QUFLWCw4QkFBVSxlQUxDO0FBTVgsK0JBQVc7QUFOQSxpQkFBZjtBQVFILGFBVE0sTUFTQSxJQUFJLFFBQVEsY0FBWixFQUE0QjtBQUMvQixxQkFBSyxPQUFMLEdBQWU7QUFDWCwyQkFBTyxPQURJO0FBRVgsNkJBQVMsa0NBRkU7QUFHWCwwQkFBTSxRQUhLO0FBSVgsMkJBQU8sT0FKSTtBQUtYLDhCQUFVLGNBTEM7QUFNWCwrQkFBVztBQU5BLGlCQUFmO0FBUUgsYUFUTSxNQVNBLElBQUksUUFBUSxrQkFBWixFQUFnQztBQUNuQyxxQkFBSyxPQUFMLEdBQWU7QUFDWCwyQkFBTyxPQURJO0FBRVgsNkJBQVMsbUNBRkU7QUFHWCwwQkFBTSxPQUhLO0FBSVgsMkJBQU8sUUFKSTtBQUtYLDhCQUFVO0FBTEMsaUJBQWY7QUFPSCxhQVJNLE1BUUEsSUFBSSxRQUFRLGlCQUFaLEVBQStCO0FBQ2xDLHFCQUFLLE9BQUwsR0FBZTtBQUNYLDJCQUFPLE9BREk7QUFFWCw2QkFBUyxrQ0FGRTtBQUdYLDBCQUFNLFFBSEs7QUFJWCwyQkFBTyxPQUpJO0FBS1gsOEJBQVU7QUFMQyxpQkFBZjtBQU9IO0FBQ0QsaUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsS0FBSyxPQUF4QjtBQUNIOzs7Ozs4RUF0R1Esa0IiLCJmaWxlIjoiVG9hc3REZW1vLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ29kaS9ub3ZvLWRldi9saWJzL25vdm8tZWxlbWVudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgVG9hc3REZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL1RvYXN0RGVtby5odG1sJztcbmltcG9ydCBUb2FzdFNlcnZpY2VEZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL1RvYXN0U2VydmljZURlbW8uaHRtbCc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IE5vdm9Ub2FzdFNlcnZpY2UgfSBmcm9tICcuLy4uLy4uLy4uLy4uL3NyYy9ub3ZvLWVsZW1lbnRzJztcblxuY29uc3QgdGVtcGxhdGUgPSBgXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGgxPlRvYXN0IE5vdGlmaWNhdGlvbnNcbiAgICAgICAgPHNtYWxsPlxuICAgICAgICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9idWxsaG9ybi9ub3ZvLWVsZW1lbnRzL2Jsb2IvbWFzdGVyL3NyYy9lbGVtZW50cy90b2FzdFwiPihzb3VyY2UpPC9hPlxuICAgICAgICA8L3NtYWxsPlxuICAgIDwvaDE+XG4gICAgPHA+VG9hc3RzIGFyZSB1c2VkIGFzIHN5c3RlbSBub3RpZmljYXRpb25zLiBUaGV5IGNhbiBjb250YWluIGN1c3RvbVxuICAgIHRleHQgdGl0bGVzIGFuZCBtZXNzYWdlcywgYXMgd2VsbCBhcyBhbnkgaWNvbnMgZnJvbSBiaC1pY29ucyBhbmQgYW55IGNvbG9yXG4gICAgZnJvbSBvdXIgY29sb3IgcGFsbGV0ZXMuPC9wPlxuXG4gICAgPGgyPlR5cGVzPC9oMj5cblxuICAgIDxoNT5BbGVydDwvaDU+XG4gICAgPHA+VGhpcyB0eXBlIG9mIHRvYXN0IG5vdGlmaWNhdGlvbiB0YWtlcyBhIHRlbXBsYXRlLCBhIHN0eWxlLFxuICAgICAgICBhbmQgYSBsb2NhdGlvbi48L3A+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgdG9hc3QtZGVtb1wiPlxuICAgICAgICA8aDI+RW1iZWRkZWQgVG9hc3Q8L2gyPlxuICAgICAgICAke1RvYXN0RGVtb1RwbH1cbiAgICA8L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIlRvYXN0RGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuXG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgdG9hc3QtZGVtb1wiPlxuICAgICAgICA8aDI+VG9hc3RlciBTZXJ2aWNlPC9oMj5cbiAgICAgICAgJHtUb2FzdFNlcnZpY2VEZW1vVHBsfVxuICAgIDwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiVG9hc3RTZXJ2aWNlRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuPC9kaXY+XG5gO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3RvYXN0LWRlbW8nLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdERlbW9Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHRvYXN0ZXI6Tm92b1RvYXN0U2VydmljZSkge1xuICAgICAgICAvLyBUZW1wbGF0ZXNcbiAgICAgICAgdGhpcy5Ub2FzdERlbW9UcGwgPSBUb2FzdERlbW9UcGw7XG4gICAgICAgIHRoaXMuVG9hc3RTZXJ2aWNlRGVtb1RwbCA9IFRvYXN0U2VydmljZURlbW9UcGw7XG5cbiAgICAgICAgLy8gVG9hc3RlciBTZXJ2aWNlXG4gICAgICAgIHRoaXMudG9hc3RlciA9IHRvYXN0ZXI7XG5cbiAgICAgICAgLy8gRGVmYXVsdCBUb2FzdCBzdHlsZXNcbiAgICAgICAgdGhpcy5wb3NpdGlvbnMgPSBbXG4gICAgICAgICAgICAnZml4ZWRUb3AnLFxuICAgICAgICAgICAgJ2ZpeGVkQm90dG9tJyxcbiAgICAgICAgICAgICdncm93bFRvcExlZnQnLFxuICAgICAgICAgICAgJ2dyb3dsVG9wUmlnaHQnLFxuICAgICAgICAgICAgJ2dyb3dsQm90dG9tTGVmdCcsXG4gICAgICAgICAgICAnZ3Jvd2xCb3R0b21SaWdodCdcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy50aGVtZXMgPSBbXG4gICAgICAgICAgICAnZGVmYXVsdCcsXG4gICAgICAgICAgICAnc3VjY2VzcycsXG4gICAgICAgICAgICAnaW5mbycsXG4gICAgICAgICAgICAnd2FybmluZycsXG4gICAgICAgICAgICAnZGFuZ2VyJ1xuICAgICAgICBdO1xuICAgICAgICB0aGlzLmljb25zID0gW1xuICAgICAgICAgICAgJ2FkZCcsXG4gICAgICAgICAgICAnY2hlY2snLFxuICAgICAgICAgICAgJ2Nsb2NrJyxcbiAgICAgICAgICAgICdsb2NrJyxcbiAgICAgICAgICAgICdjYXV0aW9uJ1xuICAgICAgICBdO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICAndGl0bGUnOiAnVGl0bGUnLFxuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnU29tZSBNZXNzYWdlLi4uJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRvYXN0ID0ge1xuICAgICAgICAgICAgdGhlbWU6ICdkYW5nZXInLFxuICAgICAgICAgICAgaWNvbjogJ2NhdXRpb24nXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2hhbmdlVG9hc3QoKSB7XG4gICAgICAgIHRoaXMudG9hc3QgPSB7XG4gICAgICAgICAgICB0aGVtZTogdGhpcy50aGVtZXNbKHRoaXMudGhlbWVzLmluZGV4T2YodGhpcy50b2FzdC50aGVtZSkgKyAxKSAlICh0aGlzLnRoZW1lcy5sZW5ndGgpXSxcbiAgICAgICAgICAgIGljb246IHRoaXMuaWNvbnNbKHRoaXMuaWNvbnMuaW5kZXhPZih0aGlzLnRvYXN0Lmljb24pICsgMSkgJSAodGhpcy5pY29ucy5sZW5ndGgpXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHRvYXN0VG9nZ2xlZChhcmcpIHtcbiAgICAgICAgaWYgKGFyZyA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1RvcCcsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ1RoaXMgcG9zaXRpb25pbmcgaXMgZml4ZWRUb3AnLFxuICAgICAgICAgICAgICAgIGljb246ICdjb2ZmZWUnLFxuICAgICAgICAgICAgICAgIHRoZW1lOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZFRvcCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoYXJnID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnQm90dG9tJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVGhpcyBwb3NpdGlvbmluZyBpcyBmaXhlZEJvdHRvbScsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2NoZWNrJyxcbiAgICAgICAgICAgICAgICB0aGVtZTogJ29jZWFuJyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkQm90dG9tJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChhcmcgPT09ICdncm93bFRvcFJpZ2h0Jykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnR3Jvd2wnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdUaGlzIHBvc2l0aW9uaW5nIGlzIGdyb3dsVG9wUmlnaHQnLFxuICAgICAgICAgICAgICAgIGljb246ICd0aW1lcycsXG4gICAgICAgICAgICAgICAgdGhlbWU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZ3Jvd2xUb3BSaWdodCcsXG4gICAgICAgICAgICAgICAgaGlkZURlbGF5OiAxMDAwMDAwMDBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoYXJnID09PSAnZ3Jvd2xUb3BMZWZ0Jykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnR3Jvd2wnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdUaGlzIHBvc2l0aW9uaW5nIGlzIGdyb3dsVG9wTGVmdCcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2NvZmZlZScsXG4gICAgICAgICAgICAgICAgdGhlbWU6ICdvY2VhbicsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdncm93bFRvcExlZnQnLFxuICAgICAgICAgICAgICAgIGhpZGVEZWxheTogMTAwMDAwMDAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGFyZyA9PT0gJ2dyb3dsQm90dG9tUmlnaHQnKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdHcm93bCcsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ1RoaXMgcG9zaXRpb25pbmcgaXMgZ3Jvd2xUb3BSaWdodCcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ3RpbWVzJyxcbiAgICAgICAgICAgICAgICB0aGVtZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdncm93bEJvdHRvbVJpZ2h0J1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChhcmcgPT09ICdncm93bEJvdHRvbUxlZnQnKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdHcm93bCcsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ1RoaXMgcG9zaXRpb25pbmcgaXMgZ3Jvd2xUb3BMZWZ0JyxcbiAgICAgICAgICAgICAgICBpY29uOiAnY29mZmVlJyxcbiAgICAgICAgICAgICAgICB0aGVtZTogJ29jZWFuJyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2dyb3dsQm90dG9tTGVmdCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50b2FzdGVyLmFsZXJ0KHRoaXMub3B0aW9ucyk7XG4gICAgfVxufVxuIl19

/***/ },
/* 390 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TooltipDemoComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class; // NG2
	
	// APP
	
	
	var _core = __webpack_require__(2);
	
	var _TooltipOptionsDemo = __webpack_require__(535);
	
	var _TooltipOptionsDemo2 = _interopRequireDefault(_TooltipOptionsDemo);
	
	var _TooltipPlacementDemo = __webpack_require__(536);
	
	var _TooltipPlacementDemo2 = _interopRequireDefault(_TooltipPlacementDemo);
	
	var _TooltipAlignDemo = __webpack_require__(534);
	
	var _TooltipAlignDemo2 = _interopRequireDefault(_TooltipAlignDemo);
	
	var _TooltipTypesDemo = __webpack_require__(538);
	
	var _TooltipTypesDemo2 = _interopRequireDefault(_TooltipTypesDemo);
	
	var _TooltipToggleDemo = __webpack_require__(537);
	
	var _TooltipToggleDemo2 = _interopRequireDefault(_TooltipToggleDemo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<div class="container">\n    <h1>Tooltips <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/tooltip">(source)</a></small></h1>\n    <p>We use the <a href="http://kushagragour.in/lab/hint/">hint.css</a> module for our tooltip implementation, wrapping it inside a directive.</p>\n\n    <h2>Helper</h2>\n    <p>Helper tooltips contain basic text that provides some additional information about an element.</p>\n\n    <h5>Placement</h5>\n    <div class="example tooltip-demo">' + _TooltipPlacementDemo2.default + '</div>\n    <code-snippet [code]="TooltipPlacementDemoTpl"></code-snippet>\n\n    <h5>Alignment</h5>\n    <div class="example tooltip-demo">' + _TooltipAlignDemo2.default + '</div>\n    <code-snippet [code]="TooltipAlignDemoTpl"></code-snippet>\n\n    <h5>Types</h5>\n    <div class="example tooltip-demo">' + _TooltipTypesDemo2.default + '</div>\n    <code-snippet [code]="TooltipTypesDemoTpl"></code-snippet>\n\n    <h5>Options</h5>\n    <div class="example tooltip-demo">' + _TooltipOptionsDemo2.default + '</div>\n    <code-snippet [code]="TooltipOptionsDemoTpl"></code-snippet>\n\n    <h5>Toggle Trigger</h5>\n    <div class="example tooltip-demo">' + _TooltipToggleDemo2.default + '</div>\n    <code-snippet [code]="TooltipToggleDemoTpl"></code-snippet>\n</div>\n';
	var TooltipDemoComponent = exports.TooltipDemoComponent = (_dec = (0, _core.Component)({
	    selector: 'tooltip-demo',
	    template: template
	}), _dec(_class = function () {
	    function TooltipDemoComponent() {
	        _classCallCheck(this, TooltipDemoComponent);
	
	        this.TooltipOptionsDemoTpl = _TooltipOptionsDemo2.default;
	        this.TooltipTypesDemoTpl = _TooltipTypesDemo2.default;
	        this.TooltipPlacementDemoTpl = _TooltipPlacementDemo2.default;
	        this.TooltipAlignDemoTpl = _TooltipAlignDemo2.default;
	        this.TooltipToggleDemoTpl = _TooltipToggleDemo2.default;
	    }
	
	    _createClass(TooltipDemoComponent, [{
	        key: 'toggleTooltip',
	        value: function toggleTooltip() {
	            this.tooltipActive = !this.tooltipActive;
	        }
	    }]);
	
	    return TooltipDemoComponent;
	}()) || _class);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvZWxlbWVudHMvdG9vbHRpcC9Ub29sdGlwRGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7a0JBQUE7O0FBRUE7OztBQURBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSwrekNBQU47SUFpQ2Esb0IsV0FBQSxvQixXQUpaLHFCQUFVO0FBQ1AsY0FBVSxjQURIO0FBRVAsY0FBVTtBQUZILENBQVYsQztBQUtHLG9DQUFjO0FBQUE7O0FBQ1YsYUFBSyxxQkFBTDtBQUNBLGFBQUssbUJBQUw7QUFDQSxhQUFLLHVCQUFMO0FBQ0EsYUFBSyxtQkFBTDtBQUNBLGFBQUssb0JBQUw7QUFDSDs7Ozt3Q0FFZTtBQUNaLGlCQUFLLGFBQUwsR0FBcUIsQ0FBQyxLQUFLLGFBQTNCO0FBQ0giLCJmaWxlIjoiVG9vbHRpcERlbW8uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pnb2RpL25vdm8tZGV2L2xpYnMvbm92by1lbGVtZW50cyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCBUb29sdGlwT3B0aW9uc0RlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvVG9vbHRpcE9wdGlvbnNEZW1vLmh0bWwnO1xuaW1wb3J0IFRvb2x0aXBQbGFjZW1lbnREZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL1Rvb2x0aXBQbGFjZW1lbnREZW1vLmh0bWwnO1xuaW1wb3J0IFRvb2x0aXBBbGlnbkRlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvVG9vbHRpcEFsaWduRGVtby5odG1sJztcbmltcG9ydCBUb29sdGlwVHlwZXNEZW1vVHBsIGZyb20gJy4vdGVtcGxhdGVzL1Rvb2x0aXBUeXBlc0RlbW8uaHRtbCc7XG5pbXBvcnQgVG9vbHRpcFRvZ2dsZURlbW9UcGwgZnJvbSAnLi90ZW1wbGF0ZXMvVG9vbHRpcFRvZ2dsZURlbW8uaHRtbCc7XG5cbmNvbnN0IHRlbXBsYXRlID0gYFxuPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxoMT5Ub29sdGlwcyA8c21hbGw+PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9idWxsaG9ybi9ub3ZvLWVsZW1lbnRzL2Jsb2IvbWFzdGVyL3NyYy9lbGVtZW50cy90b29sdGlwXCI+KHNvdXJjZSk8L2E+PC9zbWFsbD48L2gxPlxuICAgIDxwPldlIHVzZSB0aGUgPGEgaHJlZj1cImh0dHA6Ly9rdXNoYWdyYWdvdXIuaW4vbGFiL2hpbnQvXCI+aGludC5jc3M8L2E+IG1vZHVsZSBmb3Igb3VyIHRvb2x0aXAgaW1wbGVtZW50YXRpb24sIHdyYXBwaW5nIGl0IGluc2lkZSBhIGRpcmVjdGl2ZS48L3A+XG5cbiAgICA8aDI+SGVscGVyPC9oMj5cbiAgICA8cD5IZWxwZXIgdG9vbHRpcHMgY29udGFpbiBiYXNpYyB0ZXh0IHRoYXQgcHJvdmlkZXMgc29tZSBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGFib3V0IGFuIGVsZW1lbnQuPC9wPlxuXG4gICAgPGg1PlBsYWNlbWVudDwvaDU+XG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUgdG9vbHRpcC1kZW1vXCI+JHtUb29sdGlwUGxhY2VtZW50RGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIlRvb2x0aXBQbGFjZW1lbnREZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG5cbiAgICA8aDU+QWxpZ25tZW50PC9oNT5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSB0b29sdGlwLWRlbW9cIj4ke1Rvb2x0aXBBbGlnbkRlbW9UcGx9PC9kaXY+XG4gICAgPGNvZGUtc25pcHBldCBbY29kZV09XCJUb29sdGlwQWxpZ25EZW1vVHBsXCI+PC9jb2RlLXNuaXBwZXQ+XG5cbiAgICA8aDU+VHlwZXM8L2g1PlxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlIHRvb2x0aXAtZGVtb1wiPiR7VG9vbHRpcFR5cGVzRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIlRvb2x0aXBUeXBlc0RlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cblxuICAgIDxoNT5PcHRpb25zPC9oNT5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSB0b29sdGlwLWRlbW9cIj4ke1Rvb2x0aXBPcHRpb25zRGVtb1RwbH08L2Rpdj5cbiAgICA8Y29kZS1zbmlwcGV0IFtjb2RlXT1cIlRvb2x0aXBPcHRpb25zRGVtb1RwbFwiPjwvY29kZS1zbmlwcGV0PlxuXG4gICAgPGg1PlRvZ2dsZSBUcmlnZ2VyPC9oNT5cbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZSB0b29sdGlwLWRlbW9cIj4ke1Rvb2x0aXBUb2dnbGVEZW1vVHBsfTwvZGl2PlxuICAgIDxjb2RlLXNuaXBwZXQgW2NvZGVdPVwiVG9vbHRpcFRvZ2dsZURlbW9UcGxcIj48L2NvZGUtc25pcHBldD5cbjwvZGl2PlxuYDtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndG9vbHRpcC1kZW1vJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcERlbW9Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLlRvb2x0aXBPcHRpb25zRGVtb1RwbCA9IFRvb2x0aXBPcHRpb25zRGVtb1RwbDtcbiAgICAgICAgdGhpcy5Ub29sdGlwVHlwZXNEZW1vVHBsID0gVG9vbHRpcFR5cGVzRGVtb1RwbDtcbiAgICAgICAgdGhpcy5Ub29sdGlwUGxhY2VtZW50RGVtb1RwbCA9IFRvb2x0aXBQbGFjZW1lbnREZW1vVHBsO1xuICAgICAgICB0aGlzLlRvb2x0aXBBbGlnbkRlbW9UcGwgPSBUb29sdGlwQWxpZ25EZW1vVHBsO1xuICAgICAgICB0aGlzLlRvb2x0aXBUb2dnbGVEZW1vVHBsID0gVG9vbHRpcFRvZ2dsZURlbW9UcGw7XG4gICAgfVxuXG4gICAgdG9nZ2xlVG9vbHRpcCgpIHtcbiAgICAgICAgdGhpcy50b29sdGlwQWN0aXZlID0gIXRoaXMudG9vbHRpcEFjdGl2ZTtcbiAgICB9XG59XG4iXX0=

/***/ },
/* 391 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _PipesDemo = __webpack_require__(163);
	
	Object.keys(_PipesDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _PipesDemo[key];
	    }
	  });
	});
	
	var _UtilsDemo = __webpack_require__(164);
	
	Object.keys(_UtilsDemo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _UtilsDemo[key];
	    }
	  });
	});
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8vcGFnZXMvdXRpbHMvYWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdvZGkvbm92by1kZXYvbGlicy9ub3ZvLWVsZW1lbnRzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSAnLi9waXBlcy9QaXBlc0RlbW8nO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy9VdGlsc0RlbW8nO1xuIl19

/***/ },
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 452 */,
/* 453 */
/***/ function(module, exports) {

	module.exports = "<nav class=\"main-nav\" [ngClass]=\"{open: menuOpen}\">\n    <span class=\"logo\">\n        <svg routerLink=\"Home\" data-name=\"novo-logo\" xmlns=\"http://www.w3.org/2000/svg\"\n             viewBox=\"0 0 400 400\" class=\"{% if page.url != '/' %}site-avatar{% endif %}\">\n            <defs></defs>\n            <title>NovoBranding</title>\n            <circle class=\"center-dot\" cx=\"200.18\" cy=\"197.5\" r=\"28.65\"/>\n            <path class=\"outer-ring\" d=\"M371,178.06C362,98.75,298.92,35.6,219.6,26.65a19.88,19.88,0,0,0-38.84,0c-79.32,9-142.43,72.11-151.4,151.43a19.88,19.88,0,0,0,0,38.85c9,79.32,72.07,142.47,151.4,151.43a19.88,19.88,0,0,0,38.84,0c79.32-9,142.43-72.1,151.4-151.42A19.88,19.88,0,0,0,371,178.06ZM192.56,25.72a9.25,9.25,0,0,1,1-1.18l0.26-.27a9.31,9.31,0,0,1,1.17-1l0.24-.15a9.13,9.13,0,0,1,1.22-.66l0.26-.12a9.17,9.17,0,0,1,1.49-.46l0.34-.07a8.29,8.29,0,0,1,3.32,0l0.34,0.07a9.17,9.17,0,0,1,1.49.46l0.26,0.12a9.13,9.13,0,0,1,1.22.66l0.24,0.15a9.31,9.31,0,0,1,1.17,1l0.26,0.27a9.25,9.25,0,0,1,1,1.18,9.1,9.1,0,0,1-.29,10.68h0a9.28,9.28,0,0,1-1.27,1.36l-0.42.35a9.1,9.1,0,0,1-.89.62,9.21,9.21,0,0,1-.87.47l-0.5.22a9,9,0,0,1-1.38.43l-0.34.06a8.24,8.24,0,0,1-3.3,0l-0.34-.06a9,9,0,0,1-1.38-.43l-0.5-.22a9.21,9.21,0,0,1-.87-0.47,9.1,9.1,0,0,1-.89-0.62l-0.42-.35a9.28,9.28,0,0,1-1.27-1.36h0A9.1,9.1,0,0,1,192.56,25.72ZM28.39,205.09a9.25,9.25,0,0,1-1.14-.94l-0.3-.3a9.26,9.26,0,0,1-.94-1.14l-0.16-.26a9.09,9.09,0,0,1-.65-1.19c0-.09-0.09-0.18-0.13-0.28a9.1,9.1,0,0,1-.46-1.49c0-.11,0-0.23-0.07-0.34a8.27,8.27,0,0,1,0-3.31c0-.12,0-0.23.07-0.34a9.1,9.1,0,0,1,.46-1.49c0-.1.09-0.19,0.13-0.28a9.09,9.09,0,0,1,.65-1.19l0.16-.26a9.22,9.22,0,0,1,.94-1.14l0.3-.3a9.11,9.11,0,0,1,13.2.59c0.13,0.14.25,0.29,0.37,0.44a9.22,9.22,0,0,1,1.08,1.75c0.08,0.16.15,0.33,0.22,0.49a9.08,9.08,0,0,1,.43,1.39c0,0.11,0,.23.06,0.34a8.22,8.22,0,0,1,0,3.29c0,0.11,0,.23-0.06.34a9.08,9.08,0,0,1-.43,1.39c-0.07.17-.15,0.33-0.22,0.49a9.22,9.22,0,0,1-1.08,1.75c-0.12.15-.24,0.3-0.37,0.44A9.12,9.12,0,0,1,28.39,205.09ZM200.18,374a9.21,9.21,0,1,1,9.21-9.21A9.22,9.22,0,0,1,200.18,374ZM219,357.67a19.86,19.86,0,0,0-37.59,0A161.56,161.56,0,0,1,40,216.29a19.86,19.86,0,0,0,0-37.58A161.56,161.56,0,0,1,181.38,37.32a19.86,19.86,0,0,0,37.59,0,161.56,161.56,0,0,1,141.35,141.4,19.86,19.86,0,0,0,0,37.55A161.56,161.56,0,0,1,219,357.67Zm147.84-151A9.21,9.21,0,1,1,376,197.5,9.22,9.22,0,0,1,366.81,206.7Z\"\n            />\n            <path class=\"inner-ring\" d=\"M219.76,103.11a19.86,19.86,0,0,0-39.17,0,96.4,96.4,0,0,0,0,188.78,19.86,19.86,0,0,0,39.17,0A96.4,96.4,0,0,0,219.76,103.11Zm-19.58-5.87a9.17,9.17,0,0,1,5.9,16.22l-0.25.2a9.11,9.11,0,0,1-1,.67c-0.26.16-.53,0.31-0.8,0.44l-0.55.24a8.92,8.92,0,0,1-1.35.42l-0.33.06a8.24,8.24,0,0,1-3.3,0l-0.33-.06a8.92,8.92,0,0,1-1.35-.42l-0.55-.24c-0.28-.13-0.54-0.28-0.8-0.44a9.11,9.11,0,0,1-1-.67l-0.25-.2A9.17,9.17,0,0,1,200.18,97.24ZM207.54,294a9.21,9.21,0,0,1-.61.74c-0.13.15-.27,0.29-0.41,0.43a9.25,9.25,0,0,1-1.06.87l-0.41.26a9.11,9.11,0,0,1-1.07.58l-0.31.15a9.08,9.08,0,0,1-1.47.46l-0.38.07a8.22,8.22,0,0,1-3.29,0l-0.38-.07a9.08,9.08,0,0,1-1.47-.46l-0.31-.15a9.11,9.11,0,0,1-1.07-.58l-0.41-.26a9.25,9.25,0,0,1-1.06-.87c-0.14-.14-0.27-0.29-0.41-0.43a9.08,9.08,0,0,1,.85-13.22l0.25-.2a9.11,9.11,0,0,1,1-.67c0.26-.16.53-0.31,0.8-0.44l0.55-.24a8.92,8.92,0,0,1,1.35-.42l0.33-.06a8.24,8.24,0,0,1,3.3,0l0.33,0.06a8.92,8.92,0,0,1,1.35.42l0.55,0.24c0.28,0.13.54,0.28,0.8,0.44a9.11,9.11,0,0,1,1,.67l0.25,0.2A9.06,9.06,0,0,1,207.54,294Zm11.1-12.84a19.86,19.86,0,0,0-36.92,0,85.7,85.7,0,0,1,0-167.38,19.86,19.86,0,0,0,36.92,0A85.7,85.7,0,0,1,218.63,281.19Z\"\n            />\n        </svg>\n        <svg routerLink=\"Home\" data-name=\"bullhorn-text\" version=\"1.1\"\n            xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n            xmlns:a=\"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/\"\n            x=\"0px\" y=\"0px\" width=\"240.2px\" height=\"48.8px\" viewBox=\"0 0 240.2 48.8\"\n            style=\"enable-background:new 0 0 240.2 48.8;\" xml:space=\"preserve\">\n            <style type=\"text/css\">\n                .st0 {\n                    fill: #FFFFFF;\n                }\n            </style>\n            <defs></defs>\n            <g>\n                <path class=\"st0\" d=\"M0,1.5c0-0.6,0.5-1.1,1.1-1.1h20c5.4,0,9.5,1.4,12.3,4.2c2.1,2.1,3.2,4.7,3.2,7.8v0.1c0,1.4-0.2,2.6-0.6,3.8\n                c-0.4,1.1-0.9,2.1-1.5,2.9c-0.6,0.8-1.3,1.6-2.1,2.2c-0.2,0.2-0.4,0.3-0.7,0.5c-0.7,0.5-0.6,1.6,0.1,1.9c1.9,0.9,3.4,1.9,4.7,3.2\n                c1.7,1.7,2.6,4.2,2.6,7.4v0.1c0,2.1-0.4,4-1.2,5.6c-0.8,1.6-2,3-3.5,4c-1.5,1.1-3.4,1.9-5.5,2.5c-2.1,0.6-4.5,0.8-7.2,0.8H1.1\n                C0.5,47.5,0,47,0,46.4V1.5z M19.4,20.3c2.7,0,4.8-0.5,6.5-1.6c1.6-1,2.4-2.6,2.4-4.8v-0.1c0-1.9-0.7-3.3-2.1-4.4\n                c-1.4-1-3.5-1.6-6.2-1.6H9.3c-0.6,0-1.1,0.5-1.1,1.1v10.2c0,0.6,0.5,1.1,1.1,1.1H19.4z M21.8,40.1c2.8,0,5-0.5,6.7-1.6\n                c1.6-1.1,2.4-2.7,2.4-4.8v-0.1c0-2-0.8-3.6-2.4-4.6c-1.6-1.1-4-1.6-7.3-1.6h-12c-0.6,0-1.1,0.5-1.1,1.1V39c0,0.6,0.5,1.1,1.1,1.1\n                H21.8z\" />\n                <path class=\"st0\" d=\"M81.3,0h5.9c0.7,0,1.3,0.6,1.3,1.3v45c0,0.7-0.6,1.3-1.3,1.3h-5.9c-0.7,0-1.3-0.6-1.3-1.3v-45\n                C80.1,0.6,80.6,0,81.3,0z\" />\n                <path class=\"st0\" d=\"M96,0h5.9c0.7,0,1.3,0.6,1.3,1.3v45c0,0.7-0.6,1.3-1.3,1.3H96c-0.7,0-1.3-0.6-1.3-1.3v-45\n                C94.8,0.6,95.3,0,96,0z\" />\n                <path class=\"st0\" d=\"M109.5,0l4,0c2.3,0,4.2,1.9,4.2,4.2v13.3c0.9-0.9,2.1-1.9,3.7-2.8c1.6-0.9,3.7-1.4,6.3-1.4c2,0,3.9,0.3,5.5,1\n                c1.6,0.7,3,1.6,4,2.8c1.1,1.2,1.9,2.7,2.5,4.4c0.6,1.7,0.9,3.6,0.9,5.6v19.1c0,0.6-0.5,1.2-1.2,1.2h-6.1c-0.6,0-1.2-0.5-1.2-1.2\n                V27.3c0-2.1-0.6-3.8-1.7-4.9c-1.2-1.2-2.7-1.7-4.5-1.7c-1.1,0-2.2,0.2-3.2,0.7c-1,0.5-1.9,1.1-2.6,1.9c-0.7,0.8-1.3,1.7-1.7,2.8\n                c-0.4,1.1-0.6,2.2-0.6,3.5v16.9c0,0.6-0.5,1.2-1.2,1.2h-6.1c-0.6,0-1.2-0.5-1.2-1.2V5.8V0z\"\n                />\n                <path class=\"st0\" d=\"M210.5,14.1h5.3c0.7,0,1.4,0.6,1.4,1.3l0.1,2.4c0.4-0.5,0.9-1,1.5-1.5c0.6-0.5,1.3-1,2.1-1.5\n                c0.8-0.5,1.8-0.8,2.8-1.1c1-0.3,2.2-0.4,3.6-0.4c4.2,0,7.4,1.2,9.5,3.7c2.2,2.5,3.3,5.8,3.3,10.1V46c0,0.8-0.7,1.5-1.5,1.5h-5.4\n                c-0.8,0-1.5-0.7-1.5-1.5V27.3c0-2.1-0.6-3.8-1.7-4.9c-1.2-1.2-2.7-1.7-4.5-1.7c-1.1,0-2.2,0.2-3.2,0.7c-1,0.5-1.9,1.1-2.6,1.9\n                c-0.7,0.8-1.3,1.7-1.7,2.8c-0.4,1.1-0.6,2.2-0.6,3.5V46c0,0.8-0.7,1.5-1.5,1.5h-5.4c-0.8,0-1.5-0.7-1.5-1.5V15.5\n                C209.1,14.7,209.7,14.1,210.5,14.1z\" />\n                <g>\n                    <path class=\"st0\" d=\"M184.5,14h5.3c0.8,0,1.4,0.6,1.4,1.4l0.1,2.8c0.4-0.5,0.9-1,1.5-1.6c0.6-0.6,1.3-1.1,2.1-1.6\n                    c0.8-0.5,1.7-0.9,2.8-1.2c1.1-0.3,2.3-0.5,3.7-0.5c0.8,0,1.5,0,2.2,0.1c0.3,0,0.5,0.1,0.8,0.2c0.6,0.2,1,0.8,0.9,1.4l-1.2,5.5\n                    c-0.1,0.7-0.8,1.1-1.5,0.9c-0.2,0-0.4-0.1-0.6-0.1c-0.6-0.1-1.3-0.1-2.1-0.1c-1.1,0-2.2,0.2-3.3,0.6c-1,0.4-1.9,0.9-2.7,1.6\n                    c-0.8,0.7-1.4,1.6-1.8,2.6c-0.5,1-0.7,2.1-0.7,3.3V46c0,0.8-0.6,1.4-1.4,1.4h-5.6c-0.8,0-1.4-0.6-1.4-1.4V15.4\n                    C183.1,14.6,183.7,14,184.5,14z\" />\n                </g>\n                <path id=\"u_1_\" class=\"st0\" d=\"M67.4,14.6c-0.7,0-1.3,0.6-1.3,1.3v16.2c0,4.4-3.2,7.4-7,7.4c-0.7,0-1.2,0-1.5,0c-3.9,0-7-3-7-7.4\n                V15.9c0-0.7-0.6-1.3-1.3-1.3H44c-0.7,0-1.3,0.6-1.3,1.3v18c0,7.8,7.2,13.3,14.7,13.3v0h0.1c0,0,0.1,0,0.1,0l0,0h1.4l0,0\n                c0,0,0.1,0,0.1,0h0.2v0c7.5-0.1,14.6-5.5,14.6-13.3v-18c0-0.7-0.6-1.3-1.3-1.3H67.4z\"\n                />\n                <g>\n                    <g>\n                        <g>\n                            <path class=\"st0\" d=\"M144,30.9c0-2.4,0.4-4.7,1.3-6.9c0.9-2.2,2.1-4,3.7-5.7c1.6-1.6,3.5-2.9,5.7-3.8c2.2-0.9,4.6-1.4,7.3-1.4\n                            c2.7,0,5.1,0.5,7.3,1.4c2.2,0.9,4.1,2.2,5.7,3.8c1.6,1.6,2.8,3.5,3.7,5.7c0.9,2.2,1.3,4.4,1.3,6.9s-0.4,4.7-1.3,6.9\n                            c-0.9,2.2-2.1,4.1-3.7,5.7c-1.6,1.6-3.5,2.9-5.7,3.9c-2.2,0.9-4.6,1.4-7.3,1.4c-2.7,0-5.1-0.5-7.3-1.4c-2.2-0.9-4.1-2.2-5.7-3.9\n                            c-1.6-1.6-2.8-3.5-3.7-5.7C144.4,35.6,144,33.3,144,30.9z M161.9,41.5c1.6,0,3-0.3,4.2-1c1.2-0.6,2.2-1.5,3-2.5\n                            c0.8-1,1.4-2.2,1.7-3.4c0.4-1.2,0.6-2.5,0.6-3.7c0-1.2-0.2-2.4-0.6-3.7c-0.4-1.3-1-2.4-1.7-3.4c-0.8-1-1.8-1.9-3-2.5\n                            c-1.2-0.6-2.6-1-4.2-1c-1.6,0-3,0.3-4.2,1c-1.2,0.6-2.2,1.5-3,2.5c-0.8,1-1.4,2.2-1.7,3.4c-0.4,1.3-0.6,2.5-0.6,3.7\n                            c0,1.2,0.2,2.5,0.6,3.7c0.4,1.2,1,2.4,1.7,3.4c0.8,1,1.8,1.9,3,2.5C158.9,41.2,160.3,41.5,161.9,41.5z\"\n                            />\n                        </g>\n                    </g>\n                </g>\n            </g>\n        </svg>\n\n        <h5 routerLink=\"Home\">NOVO Design System</h5>\n        <span class=\"version\">v. {{version}}</span>\n        <a href=\"https://github.com/bullhorn/novo-elements\" target=\"_blank\"\n           class=\"fork-me\">Fork Me On Github</a>\n    </span>\n    <ul class=\"menu-list\">\n        <li class=\"menu-item\" routerLinkActive=\"current\" [routerLinkActiveOptions]=\"{exact: true}\">\n            <a routerLink=\"/home\" class=\"menu-link\">Introduction</a>\n        </li>\n\n        <li class=\"menu-section-header\">\n            <span class=\"menu-item-header\">Design</span>\n        </li>\n        <li class=\"menu-item\" *ngFor=\"let route of designRoutes\" routerLinkActive=\"current\" [routerLinkActiveOptions]=\"{exact: true}\">\n            <a [routerLink]=\"route.path\" class=\"menu-link\">{{route.title}}</a>\n        </li>\n        <li class=\"menu-section-header\">\n            <span class=\"menu-item-header\">Components</span>\n        </li>\n        <li class=\"menu-item\" *ngFor=\"let route of componentRoutes\" routerLinkActive=\"current\" [routerLinkActiveOptions]=\"{exact: true}\">\n            <a [routerLink]=\"route.path\" class=\"menu-link\">{{route.title}}</a>\n        </li>\n        <li class=\"menu-section-header\">\n            <span class=\"menu-item-header\">Utils</span>\n        </li>\n        <li class=\"menu-item\" *ngFor=\"let route of utilRoutes\" routerLinkActive=\"current\" [routerLinkActiveOptions]=\"{exact: true}\">\n            <a [routerLink]=\"route.path\" class=\"menu-link\">{{route.title}}</a>\n        </li>\n        <li class=\"menu-line\"></li>\n    </ul>\n</nav>\n<main class=\"main-content\" [ngClass]=\"{open: menuOpen}\">\n    <nav class=\"responsive-nav\">\n        <button name=\"open-menu\" (click)=\"toggleMenu()\">\n            <span>&#9776;</span>\n        </button>\n        <svg data-name=\"bullhorn-text\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"\n            xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:a=\"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/\"\n            x=\"0px\" y=\"0px\" width=\"240.2px\" height=\"48.8px\" viewBox=\"0 0 240.2 48.8\"\n            style=\"enable-background:new 0 0 240.2 48.8;\" xml:space=\"preserve\">\n            <g>\n                <path class=\"st0\" d=\"M0,1.5c0-0.6,0.5-1.1,1.1-1.1h20c5.4,0,9.5,1.4,12.3,4.2c2.1,2.1,3.2,4.7,3.2,7.8v0.1c0,1.4-0.2,2.6-0.6,3.8\n            c-0.4,1.1-0.9,2.1-1.5,2.9c-0.6,0.8-1.3,1.6-2.1,2.2c-0.2,0.2-0.4,0.3-0.7,0.5c-0.7,0.5-0.6,1.6,0.1,1.9c1.9,0.9,3.4,1.9,4.7,3.2\n            c1.7,1.7,2.6,4.2,2.6,7.4v0.1c0,2.1-0.4,4-1.2,5.6c-0.8,1.6-2,3-3.5,4c-1.5,1.1-3.4,1.9-5.5,2.5c-2.1,0.6-4.5,0.8-7.2,0.8H1.1\n            C0.5,47.5,0,47,0,46.4V1.5z M19.4,20.3c2.7,0,4.8-0.5,6.5-1.6c1.6-1,2.4-2.6,2.4-4.8v-0.1c0-1.9-0.7-3.3-2.1-4.4\n            c-1.4-1-3.5-1.6-6.2-1.6H9.3c-0.6,0-1.1,0.5-1.1,1.1v10.2c0,0.6,0.5,1.1,1.1,1.1H19.4z M21.8,40.1c2.8,0,5-0.5,6.7-1.6\n            c1.6-1.1,2.4-2.7,2.4-4.8v-0.1c0-2-0.8-3.6-2.4-4.6c-1.6-1.1-4-1.6-7.3-1.6h-12c-0.6,0-1.1,0.5-1.1,1.1V39c0,0.6,0.5,1.1,1.1,1.1\n            H21.8z\" />\n                <path class=\"st0\" d=\"M81.3,0h5.9c0.7,0,1.3,0.6,1.3,1.3v45c0,0.7-0.6,1.3-1.3,1.3h-5.9c-0.7,0-1.3-0.6-1.3-1.3v-45\n            C80.1,0.6,80.6,0,81.3,0z\" />\n                <path class=\"st0\" d=\"M96,0h5.9c0.7,0,1.3,0.6,1.3,1.3v45c0,0.7-0.6,1.3-1.3,1.3H96c-0.7,0-1.3-0.6-1.3-1.3v-45\n            C94.8,0.6,95.3,0,96,0z\" />\n                <path class=\"st0\" d=\"M109.5,0l4,0c2.3,0,4.2,1.9,4.2,4.2v13.3c0.9-0.9,2.1-1.9,3.7-2.8c1.6-0.9,3.7-1.4,6.3-1.4c2,0,3.9,0.3,5.5,1\n            c1.6,0.7,3,1.6,4,2.8c1.1,1.2,1.9,2.7,2.5,4.4c0.6,1.7,0.9,3.6,0.9,5.6v19.1c0,0.6-0.5,1.2-1.2,1.2h-6.1c-0.6,0-1.2-0.5-1.2-1.2\n            V27.3c0-2.1-0.6-3.8-1.7-4.9c-1.2-1.2-2.7-1.7-4.5-1.7c-1.1,0-2.2,0.2-3.2,0.7c-1,0.5-1.9,1.1-2.6,1.9c-0.7,0.8-1.3,1.7-1.7,2.8\n            c-0.4,1.1-0.6,2.2-0.6,3.5v16.9c0,0.6-0.5,1.2-1.2,1.2h-6.1c-0.6,0-1.2-0.5-1.2-1.2V5.8V0z\"\n                />\n                <path class=\"st0\" d=\"M210.5,14.1h5.3c0.7,0,1.4,0.6,1.4,1.3l0.1,2.4c0.4-0.5,0.9-1,1.5-1.5c0.6-0.5,1.3-1,2.1-1.5\n            c0.8-0.5,1.8-0.8,2.8-1.1c1-0.3,2.2-0.4,3.6-0.4c4.2,0,7.4,1.2,9.5,3.7c2.2,2.5,3.3,5.8,3.3,10.1V46c0,0.8-0.7,1.5-1.5,1.5h-5.4\n            c-0.8,0-1.5-0.7-1.5-1.5V27.3c0-2.1-0.6-3.8-1.7-4.9c-1.2-1.2-2.7-1.7-4.5-1.7c-1.1,0-2.2,0.2-3.2,0.7c-1,0.5-1.9,1.1-2.6,1.9\n            c-0.7,0.8-1.3,1.7-1.7,2.8c-0.4,1.1-0.6,2.2-0.6,3.5V46c0,0.8-0.7,1.5-1.5,1.5h-5.4c-0.8,0-1.5-0.7-1.5-1.5V15.5\n            C209.1,14.7,209.7,14.1,210.5,14.1z\" />\n                <g>\n                    <path class=\"st0\" d=\"M184.5,14h5.3c0.8,0,1.4,0.6,1.4,1.4l0.1,2.8c0.4-0.5,0.9-1,1.5-1.6c0.6-0.6,1.3-1.1,2.1-1.6\n                c0.8-0.5,1.7-0.9,2.8-1.2c1.1-0.3,2.3-0.5,3.7-0.5c0.8,0,1.5,0,2.2,0.1c0.3,0,0.5,0.1,0.8,0.2c0.6,0.2,1,0.8,0.9,1.4l-1.2,5.5\n                c-0.1,0.7-0.8,1.1-1.5,0.9c-0.2,0-0.4-0.1-0.6-0.1c-0.6-0.1-1.3-0.1-2.1-0.1c-1.1,0-2.2,0.2-3.3,0.6c-1,0.4-1.9,0.9-2.7,1.6\n                c-0.8,0.7-1.4,1.6-1.8,2.6c-0.5,1-0.7,2.1-0.7,3.3V46c0,0.8-0.6,1.4-1.4,1.4h-5.6c-0.8,0-1.4-0.6-1.4-1.4V15.4\n                C183.1,14.6,183.7,14,184.5,14z\" />\n                </g>\n                <path id=\"u_1_\" class=\"st0\" d=\"M67.4,14.6c-0.7,0-1.3,0.6-1.3,1.3v16.2c0,4.4-3.2,7.4-7,7.4c-0.7,0-1.2,0-1.5,0c-3.9,0-7-3-7-7.4\n            V15.9c0-0.7-0.6-1.3-1.3-1.3H44c-0.7,0-1.3,0.6-1.3,1.3v18c0,7.8,7.2,13.3,14.7,13.3v0h0.1c0,0,0.1,0,0.1,0l0,0h1.4l0,0\n            c0,0,0.1,0,0.1,0h0.2v0c7.5-0.1,14.6-5.5,14.6-13.3v-18c0-0.7-0.6-1.3-1.3-1.3H67.4z\"\n                />\n                <g>\n                    <g>\n                        <g>\n                            <path class=\"st0\" d=\"M144,30.9c0-2.4,0.4-4.7,1.3-6.9c0.9-2.2,2.1-4,3.7-5.7c1.6-1.6,3.5-2.9,5.7-3.8c2.2-0.9,4.6-1.4,7.3-1.4\n                        c2.7,0,5.1,0.5,7.3,1.4c2.2,0.9,4.1,2.2,5.7,3.8c1.6,1.6,2.8,3.5,3.7,5.7c0.9,2.2,1.3,4.4,1.3,6.9s-0.4,4.7-1.3,6.9\n                        c-0.9,2.2-2.1,4.1-3.7,5.7c-1.6,1.6-3.5,2.9-5.7,3.9c-2.2,0.9-4.6,1.4-7.3,1.4c-2.7,0-5.1-0.5-7.3-1.4c-2.2-0.9-4.1-2.2-5.7-3.9\n                        c-1.6-1.6-2.8-3.5-3.7-5.7C144.4,35.6,144,33.3,144,30.9z M161.9,41.5c1.6,0,3-0.3,4.2-1c1.2-0.6,2.2-1.5,3-2.5\n                        c0.8-1,1.4-2.2,1.7-3.4c0.4-1.2,0.6-2.5,0.6-3.7c0-1.2-0.2-2.4-0.6-3.7c-0.4-1.3-1-2.4-1.7-3.4c-0.8-1-1.8-1.9-3-2.5\n                        c-1.2-0.6-2.6-1-4.2-1c-1.6,0-3,0.3-4.2,1c-1.2,0.6-2.2,1.5-3,2.5c-0.8,1-1.4,2.2-1.7,3.4c-0.4,1.3-0.6,2.5-0.6,3.7\n                        c0,1.2,0.2,2.5,0.6,3.7c0.4,1.2,1,2.4,1.7,3.4c0.8,1,1.8,1.9,3,2.5C158.9,41.2,160.3,41.5,161.9,41.5z\"\n                            />\n                        </g>\n                    </g>\n                </g>\n            </g>\n        </svg>\n        <strong>Design System</strong>\n    </nav>\n    <router-outlet></router-outlet>\n</main>\n"

/***/ },
/* 454 */
/***/ function(module, exports) {

	module.exports = "<header class=\"design container\" [ngClass]=\"color\">\n    <div>\n        <h1 class=\"title\">Color</h1>\n        <h2 class=\"sub-title\">Efficient and expressive</h2>\n        <p class=\"description\">Our colors are bold, fresh, and approachable. They are expressive and delightful, but selected with usability and accessibility in mind.</p>\n    </div>\n    <div class=\"background-boxes\">\n        <div class=\"bb-lead\" (mouseover)=\"changeColor('lead')\" (mouseout)=\"changeColor('background')\"></div>\n        <div class=\"bb-contact\" (mouseover)=\"changeColor('contact')\" (mouseout)=\"changeColor('background')\"></div>\n        <div class=\"bb-company\" (mouseover)=\"changeColor('company')\" (mouseout)=\"changeColor('background')\"></div>\n        <div class=\"bb-candidate\" (mouseover)=\"changeColor('candidate')\" (mouseout)=\"changeColor('background')\"></div>\n        <div class=\"bb-opportunity\" (mouseover)=\"changeColor('opportunity')\" (mouseout)=\"changeColor('background')\"></div>\n        <div class=\"bb-job\" (mouseover)=\"changeColor('job')\" (mouseout)=\"changeColor('background')\"></div>\n        <div class=\"bb-placement\" (mouseover)=\"changeColor('placement')\" (mouseout)=\"changeColor('background')\"></div>\n        <div class=\"bb-grapefruit\" (mouseover)=\"changeColor('grapefruit')\" (mouseout)=\"changeColor('background')\"></div>\n        <div class=\"bb-bittersweet\" (mouseover)=\"changeColor('bittersweet')\" (mouseout)=\"changeColor('background')\"></div>\n        <div class=\"bb-sunflower\" (mouseover)=\"changeColor('sunflower')\" (mouseout)=\"changeColor('background')\"></div>\n        <div class=\"bb-grass\" (mouseover)=\"changeColor('grass')\" (mouseout)=\"changeColor('background')\"></div>\n        <div class=\"bb-mint\" (mouseover)=\"changeColor('mint')\" (mouseout)=\"changeColor('background')\"></div>\n        <div class=\"bb-aqua\" (mouseover)=\"changeColor('aqua')\" (mouseout)=\"changeColor('background')\"></div>\n        <div class=\"bb-ocean\" (mouseover)=\"changeColor('ocean')\" (mouseout)=\"changeColor('background')\"></div>\n        <div class=\"bb-carnation\" (mouseover)=\"changeColor('carnation')\" (mouseout)=\"changeColor('background')\"></div>\n        <div class=\"bb-lavender\" (mouseover)=\"changeColor('lavender')\" (mouseout)=\"changeColor('background')\"></div>\n    </div>\n</header>\n<section class=\"design container\">\n    <h2>Primary Colors</h2>\n    <p>These are the base colors of the application.</p>\n\n    <article class=\"color-blocks primary-colors\">\n        <div *ngFor=\"let color of primaryColors\" class=\"block {{color.name}}-cb\">\n            <div class=\"color-square\" (click)=\"copyLink(color)\"></div>\n            <h3 class=\"color-text\" (click)=\"copyLink(color)\"><span>#</span>{{color.hex}}</h3>\n            <h6>{{color.name}}</h6>\n            <span class=\"vars\" *ngFor=\"let variable of color.variables\">${{variable}}</span>\n        </div>\n    </article>\n\n    <h2>Entity Colors</h2>\n    <p>This bold palette uses carefully balanced colors to distinguish entities from one another.</p>\n\n    <article class=\"color-blocks entity-colors\">\n        <div *ngFor=\"let color of entityColors\" class=\"block {{color.name}}-cb\">\n            <div class=\"color-square\" (click)=\"copyLink(color)\"></div>\n            <h3 class=\"color-text\" (click)=\"copyLink(color)\"><span>#</span>{{color.hex}}</h3>\n            <h6>{{color.name}}</h6>\n            <span class=\"vars\" *ngFor=\"let variable of color.variables\">${{variable}}</span>\n        </div>\n    </article>\n\n    <h2>Analytics Colors</h2>\n    <p>This palette features vibrant, bold colors for use in data visualization.</p>\n\n    <article class=\"color-blocks analytics-colors\">\n        <div *ngFor=\"let color of analyticsColors\" class=\"block {{color.name}}-cb\">\n            <div class=\"color-square\" (click)=\"copyLink(color)\"></div>\n            <h3 class=\"color-text\" (click)=\"copyLink(color)\"><span>#</span>{{color.hex}}</h3>\n            <h6>{{color.name}}</h6>\n            <span class=\"vars\" *ngFor=\"let variable of color.variables\">${{variable}}</span>\n        </div>\n    </article>\n</section>\n"

/***/ },
/* 455 */
/***/ function(module, exports) {

	module.exports = "<header class=\"design container\">\n    <div>\n        <h1 class=\"title\">Composition</h1>\n        <h2 class=\"sub-title\">A universal language</h2>\n        <p class=\"description\">\n            Comprehensive design principles and language helps maintain\n            usability and a sense of harmony across a large family\n            of products. Consistency and common elements greatly\n            reduce the user effort requred to learn a new interface.\n        </p>\n    </div>\n    <img src=\"assets/images/CompositionPageIcon.svg\" alt=\"\"/>\n</header>\n\n<section class=\"design container\">\n    <h2>Mainframe</h2>\n    <p>\n        The Mainframe refers to the permanently fixed portions of\n        the application that never change. It contains the primary\n        navigation and core functions.\n    </p>\n\n    <aside class=\"design-principle\" style=\"margin-top: 60px;\">\n        <h6>Design Principles:\n            <span>Hierarchy &amp; Unity</span>\n        </h6>\n        <p>\n            Unity implies relation through proximity, size, and color.\n            Making elements clearly distinct or unified helps\n            create a strong visual hierarchy. This is important\n            because it helps to easily differentiate the level\n            of importance between different elements, and controls\n            a user's cognitive flow.\n        </p>\n    </aside>\n\n    <article>\n        <h5>Top Frame</h5>\n        <p>\n            The top frame contains key functions (Find, Add) and navigation\n            to the Resource Center and to User Profile options.\n        </p>\n        <img src=\"assets/images/LayoutMainframeTopFrame.svg\" alt=\"mainframe\"/>\n    </article>\n\n    <article>\n        <h5>Bowling Alley</h5>\n        <p>\n            The bowling alley is where all active items are displayed, allowing\n            users to easily shift between them.\n        </p>\n        <img class=\"bowling-alley\" src=\"assets/images/LayoutMainframeBowlingAlley.svg\" alt=\"bowling alley\"/>\n    </article>\n\n    <article>\n        <h5>Menu</h5>\n        <p>\n            The menu functions as the primary navigation for the application.\n            It contains links to every list, the dashboard, admin\n            functions, tools, and third-party applications. The\n            items on the menu can be toggled, grouped, and organized\n            however the user wishes.\n        </p>\n        <img class=\"menu\" src=\"assets/images/LayoutMainframeMenu.svg\" alt=\"menu\"/>\n    </article>\n\n    <h2>Headers</h2>\n    <p>\n        Headers hold key information and controls for a page. They serve\n        as a wayfinding marker to help the user understand context\n        and easily access important actions.\n    </p>\n\n    <article>\n        <h5>Overviews &amp; Slideouts</h5>\n        <p>\n            Overview and Slideout headers are dominant features which focus\n            the user's attention to the context of a particular\n            record and contains key information on the left,\n            and actions on the right. These headers inherit the\n            color of the entity type.\n        </p>\n        <img src=\"assets/images/LayoutMainframeHeaderOverview.svg\" alt=\"overview header\"/>\n    </article>\n\n    <article>\n        <h5>List Headers</h5>\n        <p>\n            List headers contain the filter and column controls for the list\n            and the primary actions. They are fixed so that results\n            can eaily be modified and actioned regardless of\n            scrolling position.\n        </p>\n        <img src=\"assets/images/LayoutMainframeHeaderList.svg\" alt=\"list header\"/>\n    </article>\n\n    <aside class=\"design-principle\">\n        <h6>Design Principles:\n            <span>Navigation &amp; Consistency</span>\n        </h6>\n        <p>A consistent navigation structure allows users to master\n            an interface much more quickly, as they know that\n            certain functions are always in the same place. We\n            use headers to provide quick access to key functions\n            and aid findability of data in a complex system.\n        </p>\n    </aside>\n\n    <article>\n        <h5>Add &amp; Edit Pages</h5>\n        <p>\n            The headers of Add and Edit pages generally serve as a simple\n            visual element to help provide context.\n        </p>\n        <img src=\"assets/images/LayoutMainframeHeaderEditPage.svg\" alt=\"add page header\"/>\n    </article>\n\n    <h2>Cards</h2>\n    <p>\n        Essential to our design paradigm, cards are independent blocks\n        of information. They can contain text, tables, and data\n        visualizations. They offer a curated view of data. Bringing\n        the most pertinent information to the forefont, they\n        allow users to scan large amounts of data quickly.\n    </p>\n\n    <article>\n        <h5>Basic Structure</h5>\n        <p>\n            Cards have a header which contains the card title and the card\n            controls. The controls can vary depending on card\n            type, gut generally include move, refresh, configure,\n            and remove. The content area has padding by default\n            but can also run edge-to-edge. Pulse cards have a\n            special icon next to the title.\n        </p>\n        <img src=\"assets/images/LayoutMainframeCardsNPSCard.svg\" alt=\"card\"/>\n    </article>\n\n    <aside class=\"design-principle\">\n        <h6>Design Principle:\n            <span>Cards</span>\n        </h6>\n        <p>\n            The card system scales easily, both in individual size\n            and in groups. Because of this, cards are essential\n            to our design language. Cards balance and align very\n            easily, promoting findability. These handy little\n            containers also provide a contextually relevant home\n            for all content.\n        </p>\n        <div class=\"hint\">\n            <span>\n                <i class=\"bhi-idea\"></i>\n                <strong>Hint: </strong>This is a great place for third-party\n                developers to fit into the Bullhorn system.\n            </span>\n            <a class=\"link\" routerLink=\"/cards\">\n                <i class=\"bhi-link\"></i>\n                <strong>Are you a developer?</strong> Check out card\n                markup and documentation here\n            </a>\n        </div>\n    </aside>\n\n    <article>\n        <h5>Dashboard &amp; Overviews</h5>\n        <p>\n            Dashboards and Records Overviews are the primary home for our\n            cards. They offer a customizable workspace to arrange\n            and configure to most appropriately fit the user's\n            needs. Cards have a fixed height, but mildly flexible\n            width. They can also be expanded to full-screen.\n            The \"add card\" control is always located in the top\n            right, to be consistent with the placement of action\n            buttons on tables and lists.\n        </p>\n        <img class=\"dashboard\" src=\"assets/images/LayoutMainframeCardsDashboard.svg\" alt=\"dashboard cards\"/>\n    </article>\n\n    <article>\n        <h5>Slideouts and Mobile</h5>\n        <p>\n            Cards are so flexible, they also work well in a mobile setting.\n            They help users to easily scan chunks of information\n            and find what they need.\n        </p>\n        <img class=\"mobile\" src=\"assets/images/LayoutMobileCard.svg\" alt=\"mobile cards\"/>\n    </article>\n</section>\n"

/***/ },
/* 456 */
/***/ function(module, exports) {

	module.exports = "<header class=\"design container\">\n    <div>\n        <h1 class=\"title\">Iconography</h1>\n        <h2 class=\"sub-title\">Certified Pixel-Perfect</h2>\n\n        <p class=\"description\">\n            Icons are used to represent an action or concept through the most simplistic imagery possible. Icons give additional context to written material, allowing the user to quickly comprehend any given concept. The icons are designed on a highly specific\n            grid to ensure maximum clarity even at a small size. Their design is friendly, human, and bold.\n        </p>\n\n        <p>\n            <a href=\"https://cdn.rawgit.com/bullhorn/bullhorn-icons/development/fonts/Bullhorn-Glyphicons.html\">Bullhorn's Icon Set</a>\n        </p>\n    </div>\n    <img src=\"assets/images/IconographyPageIcon.svg\" alt=\"\"/>\n</header>\n<section class=\"design container\">\n    <h2>Icons with Typography</h2>\n    <p>\n        An icon will always have slightly larger dimensions than text when they are paired together. This ensures that the icon is visually the same size as the text and that it scales proportionally.\n    </p>\n\n    <article>\n        <h5>Base sizing</h5>\n        <p>Icons placed next to typography should alays follow this convention.</p>\n\n        <div class=\"base-sizing\">\n            <div class=\"sizing-specs\">\n                <span>Bullhorn Glyphicons</span>\n                <span><strong>Size: </strong>1.29em</span>\n                <span><strong>Padding: </strong>.25em</span>\n                <span><strong>Border Radius: </strong>.625em</span>\n            </div>\n            <div class=\"sizing-demo\">\n                <h1><i class=\"bhi-company\"></i>Company Name</h1>\n            </div>\n        </div>\n    </article>\n\n    <article class=\"entities\">\n        <h5>Padding</h5>\n        <p>\n            Icons should have sufficient padding when followed by text.\n        </p>\n\n        <div class=\"padding\">\n            <div>\n                <h4><i class=\"bhi-circle\"></i>Alice Hughes</h4>\n                <h6><i class=\"bhi-location\"></i>Boston, MA</h6>\n                <span class=\"not-accepted\"><i class=\"bhi-close-o\"></i>I feel squished</span>\n            </div>\n            <div>\n                <h4><i class=\"bhi-circle\"></i>Alice Hughes</h4>\n                <h6><i class=\"bhi-location\"></i>Boston, MA</h6>\n                <span class=\"accepted\"><i class=\"bhi-check\"></i>Much better</span>\n            </div>\n        </div>\n    </article>\n\n    <article>\n        <h2>Entity Icons</h2>\n        <h5>Standard Entity Icons</h5>\n        <p>Used with corresponding entity color.</p>\n\n        <div class=\"example standard-icon-row\">\n            <div>\n                <i theme=\"entity\" class=\"bhi-lead lead\"></i>\n                <p>Lead</p>\n            </div>\n            <div>\n                <i theme=\"entity\" class=\"bhi-person contact\"></i>\n                <p>Contact</p>\n            </div>\n            <div>\n                <i theme=\"entity\" class=\"bhi-company company\"></i>\n                <p>Company</p>\n            </div>\n            <div>\n                <i theme=\"entity\" class=\"bhi-candidate candidate\"></i>\n                <p>Candidate</p>\n            </div>\n            <div>\n                <i theme=\"entity\" class=\"bhi-opportunity opportunity\"></i>\n                <p>Opportunity</p>\n            </div>\n            <div>\n                <i theme=\"entity\" class=\"bhi-job job\"></i>\n                <p>Job</p>\n            </div>\n            <div>\n                <i theme=\"entity\" class=\"bhi-star placement\"></i>\n                <p>Placement</p>\n            </div>\n        </div>\n        <pre><code>\n            &lt;i theme=\"entity\" class=\"bhi-lead lead\">&lt;/i&gt;\n            &lt;h6&gt;Lead&lt;/h6&gt;\n            &lt;i theme=\"entity\" class=\"bhi-person contact\"&gt;&lt;/i&gt;\n            &lt;h6&gt;Contact&lt;/h6&gt;\n            &lt;i theme=\"entity\" class=\"bhi-company company\"&gt;&lt;/i&gt;\n            &lt;h6&gt;Company&lt;/h6&gt;\n            &lt;i theme=\"entity\" class=\"bhi-candidate candidate\"&gt;&lt;/i&gt;\n            &lt;h6&gt;Candidate&lt;/h6&gt;\n            &lt;i theme=\"entity\" class=\"bhi-opportunity opportunity\"&gt;&lt;/i&gt;\n            &lt;h6&gt;Opportunity&lt;/h6&gt;\n            &lt;i theme=\"entity\" class=\"bhi-job job\"&gt;&lt;/i&gt;\n            &lt;h6&gt;Job&lt;/h6&gt;\n            &lt;i theme=\"entity\" class=\"bhi-star placement\"&gt;&lt;/i&gt;\n            &lt;h6&gt;Placement&lt;/h6&gt;\n        </code>\n        </pre>\n    </article>\n\n    <h2>Contained Icons</h2>\n    <h5>Scaling</h5>\n    <p>Make sure to scale the corner radius appropriately when enlarging or decreasing the size of the icon.</p>\n\n    <article class=\"contained-scaling\">\n        <figure>\n            <img src=\"assets/images/IconographyScalingDont.svg\" alt=\"\"/>\n            <figcaption class=\"not-accepted\"><i class=\"bhi-close-o\"></i>That doesn't look like a rectangle</figcaption>\n        </figure>\n        <figure>\n            <img src=\"assets/images/IconographyScalingDo.svg\" alt=\"\"/>\n            <figcaption class=\"accepted\"><i class=\"bhi-check\"></i>Always maintain the proportions</figcaption>\n        </figure>\n    </article>\n\n    <h5>Padding</h5>\n    <p>To preserve readability, icons should have sufficient padding from the edges of their containers. Additionally, the icons should be visually centered in their containers.</p>\n\n    <article class=\"contained-padding\">\n        <figure>\n            <img src=\"assets/images/IconographyPaddingDont.svg\" alt=\"\"/>\n            <figcaption class=\"not-accepted\"><i class=\"bhi-close-o\"></i>It's getting crowded in here</figcaption>\n        </figure>\n        <figure>\n            <img src=\"assets/images/IconographyPaddingDo.svg\" alt=\"\"/>\n            <figcaption class=\"accepted\"><i class=\"bhi-check\"></i>It's good to have some breathing room</figcaption>\n        </figure>\n    </article>\n\n    <article>\n        <h5>Examples</h5>\n\n        <div class=\"example contained-icon-row\">\n            <h1><i theme=\"contained\" class=\"bhi-lead lead\"></i>Heading One</h1>\n            <h2><i theme=\"contained\" class=\"bhi-person contact\"></i>Heading Two</h2>\n            <h3><i theme=\"contained\" class=\"bhi-company company\"></i>Heading Three</h3>\n            <h4><i theme=\"contained\" class=\"bhi-candidate candidate\"></i>Heading Four</h4>\n            <h5><i theme=\"contained\" class=\"bhi-opportunity opportunity\"></i>Heading Five</h5>\n            <h6><i theme=\"contained\" class=\"bhi-job job\"></i>Heading Six</h6>\n            <!-- <p><i theme=\"contained\" class=\"bhi-star placement\"></i>Body</p> -->\n        </div>\n        <pre><code class=\"hljs xml\">\n            &lt;h1&gt;&lt;i theme=\"contained\" class=\"bhi-lead lead\"&gt;&lt;/i&gt;Heading One&lt;/h1&gt;\n            &lt;h2&gt;&lt;i theme=\"contained\" class=\"bhi-person contact\"&gt;&lt;/i&gt;Heading Two&lt;/h2&gt;\n            &lt;h3&gt;&lt;i theme=\"contained\" class=\"bhi-company company\"&gt;&lt;/i&gt;Heading Three&lt;/h3&gt;\n            &lt;h4&gt;&lt;i theme=\"contained\" class=\"bhi-candidate candidate\"&gt;&lt;/i&gt;Heading Four&lt;/h4&gt;\n            &lt;h5&gt;&lt;i theme=\"contained\" class=\"bhi-opportunity opportunity\"&gt;&lt;/i&gt;Heading Five&lt;/h5&gt;\n            &lt;h6&gt;&lt;i theme=\"contained\" class=\"bhi-job job\"&gt;&lt;/i&gt;Heading Six&lt;/h6&gt;\n            <!-- &lt;p&gt;&lt;i theme=\"contained\" class=\"bhi-star placement\"&gt;&lt;/i&gt;Body&lt;/p&gt; -->\n        </code>\n        </pre>\n    </article>\n</section>\n"

/***/ },
/* 457 */
/***/ function(module, exports) {

	module.exports = "<header class=\"design container\">\n    <div>\n        <h1 class=\"title\">Typography</h1>\n        <h2 class=\"sub-title\">Roboto, not robotic.</h2>\n\n        <p class=\"description\">\n            Roboto's refined letterforms combine geometry with open, rounded features to create a structured, yet friendly typeface. It maintains a human-like quality while expressing a clean and modern aesthetic.\n        </p>\n        <a href=\"https://www.google.com/fonts/specimen/Roboto\" target=\"_blank\"><i class=\"bhi-link\"></i> Roboto Typeface on Google Fonts</a>\n    </div>\n    <img src=\"assets/images/TypographyPageIcon.svg\" alt=\"\"/>\n</header>\n\n<section class=\"design container\">\n    <aside class=\"design-principle\">\n        <h6>Design Principle: <span>Clarity</span></h6>\n        <p>Proper line length, adequate white space, and appropriate line breaks\n            are necessary to preserve readability, rhythm, and overall clarity.</p>\n    </aside>\n\n    <article class=\"line-height\">\n        <h5>Line Height</h5>\n\n        <div>\n            <p style=\"line-height: 1em;\">\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.\n            </p>\n\n            <p class=\"not-accepted\">\n                <i class=\"bhi-close-o\"></i>These lines are too close for comfort\n            </p>\n        </div>\n        <div>\n            <p>\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.\n            </p>\n\n            <p class=\"accepted\">\n                <i class=\"bhi-check\"></i>Thumbs up for great readability\n            </p>\n        </div>\n        <div>\n            <p style=\"line-height: 2.8em;\">\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.\n            </p>\n\n            <p class=\"not-accepted\">\n                <i class=\"bhi-close-o\"></i>I'm losing focus with all this space\n            </p>\n        </div>\n    </article>\n\n    <aside class=\"design-principle\">\n        <h6>Design Principle: <span>Balance</span></h6>\n        <p>Typographic balance is critical to readability and understanding\n            information hierarchy. The weight and size of the font helps determine\n            which element on a page receives a user’s attention first.</p>\n    </aside>\n\n    <article class=\"line-length\">\n        <h5>Line Length</h5>\n\n        <div class=\"too-short\">\n            <div class=\"ruler\">\n                <hr>\n                <span>30</span>\n\n                <p class=\"not-accepted\">\n                    <i class=\"bhi-close-o\"></i>Short lines interrupt the reader's rhythm\n                </p>\n            </div>\n            <p style=\"width: 15em;\">\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.\n            </p>\n        </div>\n        <div class=\"just-right\">\n            <div class=\"ruler\">\n                <hr>\n                <span>55-75</span>\n\n                <p class=\"accepted\">\n                    <i class=\"bhi-check\"></i>Optimal line length for readability\n                </p>\n            </div>\n            <p>\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.\n            </p>\n        </div>\n        <div class=\"too-long\">\n            <div class=\"ruler\">\n                <hr>\n                <span>100</span>\n\n                <p class=\"not-accepted\">\n                    <i class=\"bhi-close-o\"></i>Difficult to jump to the next line\n                </p>\n            </div>\n            <p style=\"width: 55em; max-width: 100%;\">\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.\n            </p>\n        </div>\n    </article>\n\n    <aside class=\"imp-note\">\n        <h6><i class=\"bhi-mobile\"></i>How does this work with responsive design?</h6>\n        <p>\n            Line length is always relative to its font-size. This means that if a\n            font scales up or down in sizing (relative to its device's screen size) the\n            line length will automatically scale with it. Line length is about maintaining\n            a comfortable reading flow and rhythm from line to line.\n            <br><br>\n            <strong>When implementing</strong>, native line length will always be secondary to the width of\n            the text's container. This means that if a screen's width is smaller than\n            the text's native line length, the text will wrap early.\n        </p>\n    </aside>\n\n    <h2>Styles</h2>\n    <p>There a number of general styles that are present throughout the application. To maintain consistency, these styles should be adhered to as much as possible.</p>\n\n    <div class=\"example\">\n        <div class=\"type-group\">\n            <h1>Header 1</h1>\n            <span>Roboto</span>\n            <span><strong>Size: </strong>2.5em (35px)</span>\n            <span><strong>Weight: </strong>400</span>\n            <span><strong>Margin: </strong>0</span>\n            <span><strong>Padding: </strong>0.45em 0 0.35em</span>\n        </div>\n        <div class=\"type-group\">\n            <h2>Header 2</h2>\n            <span>Roboto</span>\n            <span><strong>Size: </strong>2em (28px)</span>\n            <span><strong>Weight: </strong>500</span>\n            <span><strong>Margin: </strong>0</span>\n            <span><strong>Padding: </strong>0.75em 0 0.3em</span>\n        </div>\n        <div class=\"type-group\">\n            <h3>Header 3</h3>\n            <span>Roboto</span>\n            <span><strong>Size: </strong>1.75em (24px)</span>\n            <span><strong>Weight: </strong>300</span>\n            <span><strong>Margin: </strong>0</span>\n            <span><strong>Padding: </strong>0.6em 0 0.4em</span>\n        </div>\n        <div class=\"type-group\">\n            <h4>Header 4</h4>\n            <span>Roboto</span>\n            <span><strong>Size: </strong>1.375em (19.25px)</span>\n            <span><strong>Weight: </strong>400</span>\n            <span><strong>Margin: </strong>0</span>\n            <span><strong>Padding: </strong>0.75em 0 0.5em</span>\n        </div>\n        <div class=\"type-group\">\n            <h5>Header 5</h5>\n            <span>Roboto</span>\n            <span><strong>Size: </strong>1.125em (15.75px)</span>\n            <span><strong>Weight: </strong>700</span>\n            <span><strong>Margin: </strong>0</span>\n            <span><strong>Padding: </strong>0.75em 0 0.25em</span>\n            <span><strong>Transform: </strong>UPPERCASE</span>\n        </div>\n        <div class=\"type-group\">\n            <h6>Header 6</h6>\n            <span>Roboto</span>\n            <span><strong>Size: </strong>1.125em (15.75px)</span>\n            <span><strong>Weight: </strong>500</span>\n            <span><strong>Margin: </strong>0</span>\n            <span><strong>Padding: </strong>0.75em 0 0.25em</span>\n        </div>\n        <div class=\"type-group\">\n            <span class=\"caption\">Caption</span>\n        </div>\n    </div>\n    <pre><code>\n        &lt;h1&gt;Heading 1&lt;/h1&gt;\n        &lt;h2&gt;Heading 2&lt;/h2&gt;\n        &lt;h3&gt;Heading 3&lt;/h3&gt;\n        &lt;h4&gt;Heading 4&lt;/h4&gt;\n        &lt;h5&gt;Heading 5&lt;/h5&gt;\n        &lt;h6&gt;Heading 6&lt;/h6&gt;\n        &lt;p&gt;\n        Body\n        &lt;/p&gt;\n        &lt;hr&gt;\n        &lt;span class=\"caption\"&gt;Caption&lt;/span&gt;</code>\n    </pre>\n</section>\n"

/***/ },
/* 458 */
/***/ function(module, exports) {

	module.exports = "<button theme=\"dialogue\" icon=\"addcard\">Add Card</button>\n<div class=\"inverse-color\">\n    <button theme=\"dialogue\" icon=\"list-o\" side=\"left\" color=\"white\" inverse [loading]=\"loading\" (click)=\"fakeRequest()\">Add/Remove</button>\n</div>\n<button theme=\"dialogue\" icon=\"check\" color=\"success\" [loading]=\"loading\" (click)=\"fakeRequest()\">Dialogue</button>\n<button theme=\"dialogue\" disabled>Dialogue</button>\n"

/***/ },
/* 459 */
/***/ function(module, exports) {

	module.exports = "<button [theme]=\"theme\" [icon]=\"isChecked ? 'check' : 'times'\" (click)=\"changeTheme()\">Change Theme</button>\n<novo-checkbox label=\"Checked?\" [(ngModel)]=\"isChecked\"></novo-checkbox>\n"

/***/ },
/* 460 */
/***/ function(module, exports) {

	module.exports = "<button theme=\"secondary\" icon=\"collapse\" inverse>Actions</button>\n<button theme=\"secondary\" icon=\"convert\" inverse [loading]=\"loading\" (click)=\"fakeRequest()\">Convert</button>\n<button theme=\"secondary\" icon=\"convert\" inverse disabled>Convert</button>\n"

/***/ },
/* 461 */
/***/ function(module, exports) {

	module.exports = "<button theme=\"icon\" icon=\"print\" inverse [loading]=\"loading\" (click)=\"fakeRequest()\"></button>\n<button theme=\"icon\" icon=\"print\" inverse disabled></button>\n"

/***/ },
/* 462 */
/***/ function(module, exports) {

	module.exports = "<button theme=\"primary\" [color]=\"negativeColor\" icon=\"times\" [loading]=\"loading\" (click)=\"fakeRequest()\">{{loadingButtonText}}</button>\n"

/***/ },
/* 463 */
/***/ function(module, exports) {

	module.exports = "<button theme=\"primary\" icon=\"next\">Next</button>\n<button theme=\"primary\" [color]=\"negativeColor\" icon=\"times\">Cancel</button>\n<button theme=\"primary\" color=\"success\" icon=\"check\">Save</button>\n<button theme=\"primary\" color=\"warning\" icon=\"caution-o\">Caution</button>\n<button theme=\"primary\" color=\"pulse\" icon=\"next\" disabled>Submit</button>\n"

/***/ },
/* 464 */
/***/ function(module, exports) {

	module.exports = "<button theme=\"secondary\" [loading]=\"loading\" (click)=\"fakeRequest()\">Secondary</button>\n<button theme=\"secondary\" disabled>Secondary</button>\n"

/***/ },
/* 465 */
/***/ function(module, exports) {

	module.exports = "<button theme=\"standard\">Standard</button>\n<button theme=\"standard\" color=\"light\">Standard</button>\n<button theme=\"standard\" color=\"light\" disabled>Standard</button>\n"

/***/ },
/* 466 */
/***/ function(module, exports) {

	module.exports = "<div class=\"calendar-demo-side-by-side\">\n    <p>\n        <label>Value One</label>\n        {{(dateOne | date) || 'N/A'}}\n\n        <label>Value Two</label>\n        {{(dateTwo | date) || 'N/A'}}\n    </p>\n    <novo-date-picker [(ngModel)]=\"dateOne\" minYear=\"2000\" maxYear=\"2020\"\n                      [start]=\"start\" [end]=\"end\"></novo-date-picker>\n    <novo-date-picker [(ngModel)]=\"dateTwo\"></novo-date-picker>\n</div>\n"

/***/ },
/* 467 */
/***/ function(module, exports) {

	module.exports = "<div class=\"calendar-demo-side-by-side\">\n    <p>\n        <label>Start date</label>\n        {{(value?.startDate | date) || 'N/A'}}\n\n        <label>End date</label>\n        {{(value?.endDate | date) || 'N/A'}}\n    </p>\n    <novo-date-picker [(ngModel)]=\"value\" range=\"true\" (onSelect)=\"range\"></novo-date-picker>\n</div>\n"

/***/ },
/* 468 */
/***/ function(module, exports) {

	module.exports = "<div class=\"calendar-demo-side-by-side\">\n    <p>\n        <label>Value</label>\n        {{(time | date:'mediumTime') || 'N/A'}}\n    </p>\n    <novo-time-picker [(ngModel)]=\"time\"></novo-time-picker>\n    <novo-time-picker [(ngModel)]=\"time\" military=\"true\"></novo-time-picker>\n</div>\n"

/***/ },
/* 469 */
/***/ function(module, exports) {

	module.exports = "<novo-card [title]=\"'All Attributes'\"\n           icon=\"activity\"\n           [loading]=\"loading\"\n           [message]=\"message\"\n           [messageIcon]=\"messageIcon\"\n           [refresh]=\"refresh\"\n           [move]=\"move\"\n           [close]=\"close\"\n           (onRefresh)=\"onRefresh()\"\n           (onClose)=\"onClose()\"\n           [padding]=\"padding\">\n    This is the ALL attribute card content!\n</novo-card>\n"

/***/ },
/* 470 */
/***/ function(module, exports) {

	module.exports = "<novo-card-best-time [label]=\"bestLabel\" [day]=\"bestDay\" [time]=\"bestTime\"></novo-card-best-time>\n"

/***/ },
/* 471 */
/***/ function(module, exports) {

	module.exports = "<novo-card-chart-donut [value]=\"donutValue\" [label]=\"donutLabel\" [color]=\"donutColor\"></novo-card-chart-donut>\n"

/***/ },
/* 472 */
/***/ function(module, exports) {

	module.exports = "<novo-card-timeline [start]=\"start\" [end]=\"end\" [created]=\"created\"></novo-card-timeline>\n"

/***/ },
/* 473 */
/***/ function(module, exports) {

	module.exports = "<novo-card [config]=\"fullConfig\">\n    <novo-card-actions>\n        <button theme=\"icon\" icon=\"info\" (click)=\"singleAction()\"></button>\n    </novo-card-actions>\n    DEMO :)\n</novo-card>\n"

/***/ },
/* 474 */
/***/ function(module, exports) {

	module.exports = "<novo-category-dropdown [categories]=\"basicCategories\" (itemSelected)=\"onSelect($event)\">\n    <button type=\"button\" theme=\"dialogue\" icon=\"menu\">Basic Implementation</button>\n</novo-category-dropdown>\n"

/***/ },
/* 475 */
/***/ function(module, exports) {

	module.exports = "<novo-category-dropdown [categories]=\"searchCategories\" (itemSelected)=\"onSelect($event)\" search=\"true\">\n    <button type=\"button\" theme=\"dialogue\" icon=\"menu\">Searching (basic)</button>\n</novo-category-dropdown>\n"

/***/ },
/* 476 */
/***/ function(module, exports) {

	module.exports = "<novo-category-dropdown [categories]=\"basicCategories\" (itemSelected)=\"onSelect($event)\" closeOnSelect=\"true\">\n    <button type=\"button\" theme=\"dialogue\" icon=\"menu\">Close on Select</button>\n</novo-category-dropdown>\n"

/***/ },
/* 477 */
/***/ function(module, exports) {

	module.exports = "<novo-category-dropdown [categories]=\"searchCategories\" (itemSelected)=\"onSelect($event)\" [search]=\"searchConfig\">\n    <button type=\"button\" theme=\"dialogue\" icon=\"menu\">Searching (custom)</button>\n</novo-category-dropdown>\n"

/***/ },
/* 478 */
/***/ function(module, exports) {

	module.exports = "<novo-category-dropdown [categories]=\"basicCategories\" (itemSelected)=\"onSelect($event)\" [footer]=\"footerConfig\">\n    <button type=\"button\" theme=\"dialogue\" icon=\"menu\">Footer</button>\n</novo-category-dropdown>\n"

/***/ },
/* 479 */
/***/ function(module, exports) {

	module.exports = "<novo-category-dropdown [categories]=\"hoverCategories\" (itemSelected)=\"onSelect($event)\">\n    <button type=\"button\" theme=\"dialogue\" icon=\"menu\">Hover Text/Icons on Items</button>\n</novo-category-dropdown>\n"

/***/ },
/* 480 */
/***/ function(module, exports) {

	module.exports = "<novo-category-dropdown [categories]=\"persistCategories\" (itemSelected)=\"onSelect($event)\" persistSelection=\"true\">\n    <button type=\"button\" theme=\"dialogue\" icon=\"menu\">Persisting Selection</button>\n</novo-category-dropdown>\n"

/***/ },
/* 481 */
/***/ function(module, exports) {

	module.exports = "<div class=\"selected-value\">Selected Value: {{avalue}}</div>\n<chips\n    [source]=\"async\"\n    [placeholder]=\"placeholder\"\n    [(ngModel)]=\"avalue\"\n    (changed)=\"onChanged($event)\">\n</chips>\n"

/***/ },
/* 482 */
/***/ function(module, exports) {

	module.exports = "<div class=\"selected-value\">Selected Value: {{value}}</div>\n<chips\n    [source]=\"static\"\n    [placeholder]=\"placeholder\"\n    [(ngModel)]=\"value\"\n    (changed)=\"onChanged($event)\">\n</chips>\n"

/***/ },
/* 483 */
/***/ function(module, exports) {

	module.exports = "<div class=\"selected-value\">Selected Value: {{fvalue}}</div>\n<chips\n    [source]=\"formatted\"\n    [placeholder]=\"placeholder\"\n    [(ngModel)]=\"fvalue\"\n    (changed)=\"onChanged($event)\">\n</chips>\n"

/***/ },
/* 484 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper\">\n    <div class=\"drag-container\" [dragula]=\"'first-bag'\">\n        <div>You can move these elements between these two containers</div>\n        <div>Moving them anywhere else isn\"t quite possible</div>\n        <div>There\"s also the possibility of moving elements around in the same container, changing their position</div>\n    </div>\n    <div class=\"drag-container\" [dragula]=\"'first-bag'\">\n        <div>This is the default use case. You only need to specify the containers you want to use</div>\n        <div>More interactive use cases lie ahead</div>\n        <div>Make sure to check out the\n            <a href=\"https://github.com/bevacqua/dragula#readme\">documentation on GitHub!</a>\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 485 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper\">\n    <div class=\"drag-container\" [dragula]=\"'another-bag'\" [dragulaModel]=\"many\">\n        <div *ngFor=\"let text of many\" [innerHtml]=\"text\"></div>\n    </div>\n    <div class=\"drag-container\" [dragula]=\"'another-bag'\" [dragulaModel]=\"many2\">\n        <div *ngFor=\"let text of many2\" [innerHtml]=\"text\"></div>\n    </div>\n</div>\n<div class=\"wrapper\">\n    <div class=\"drag-container\">\n        <pre>{{many | json}}</pre>\n    </div>\n    <div class=\"drag-container\">\n        <pre>{{many2 | json}}</pre>\n    </div>\n</div>\n"

/***/ },
/* 486 */
/***/ function(module, exports) {

	module.exports = "<div drawer [position]=\"'left'\" (onDrawerToggle)=\"drawerToggled($event)\">\n    <button theme=\"secondary\" drawerToggle [disabled]=\"disabled\">Show Left</button>\n    <div class=\"drawer-content\">\n        <h4>I am a left drawer!</h4>\n    </div>\n</div>\n\n<div drawer [position]=\"'right'\" (onDrawerToggle)=\"drawerToggled($event)\">\n    <button theme=\"secondary\" drawerToggle [disabled]=\"disabled\">Show Right</button>\n    <div class=\"drawer-content\">\n        <h4>I am a right drawer!</h4>\n    </div>\n</div>\n\n<div drawer [position]=\"'right'\" (onDrawerToggle)=\"drawerToggled($event)\">\n    <button theme=\"secondary\" drawerToggle [disabled]=\"disabled\">Show Right <strong>*Two*</strong></button>\n    <div class=\"drawer-content\">\n        <h4>I am *another* right drawer!</h4>\n    </div>\n</div>\n\n<div drawer [position]=\"'top'\" (onDrawerToggle)=\"drawerToggled($event)\">\n    <button theme=\"secondary\" drawerToggle [disabled]=\"disabled\">Show Top</button>\n    <div class=\"drawer-content\">\n        <h4>I am a top drawer!</h4>\n    </div>\n</div>\n\n<div drawer [position]=\"'bottom'\" (onDrawerToggle)=\"drawerToggled($event)\">\n    <button theme=\"secondary\" drawerToggle [disabled]=\"disabled\">Show Bottom</button>\n    <div class=\"drawer-content\">\n        <h4>I am a bottom drawer!</h4>\n    </div>\n</div>\n"

/***/ },
/* 487 */
/***/ function(module, exports) {

	module.exports = "<novo-dropdown>\n    <button type=\"button\" theme=\"secondary\" icon=\"collapse\" inverse>Actions</button>\n    <list>\n        <item (action)=\"clickMe()\">Action 1</item>\n        <item (action)=\"clickMe('WITH DATA')\">Action 2</item>\n        <item tooltip=\"Test tooltip :)\" tooltipPosition=\"right\" [disabled]=\"true\" (action)=\"clickMe()\">Action 3</item>\n    </list>\n</novo-dropdown>\n<novo-dropdown side=\"right\">\n    <button type=\"button\" theme=\"icon\" icon=\"menu\" inverse></button>\n    <list>\n        <item>Action 1</item>\n        <item tooltip=\"Test tooltip :)\" tooltipPosition=\"left\">Action 2</item>\n        <item>Action 3</item>\n    </list>\n</novo-dropdown>\n"

/***/ },
/* 488 */
/***/ function(module, exports) {

	module.exports = "<novo-editor [name]=\"'demoEditor'\" [(ngModel)]=\"editorValue\" #editor></novo-editor>\n\n<p>Value:</p>\n<p [innerHtml]=\"editorValue\"></p>\n"

/***/ },
/* 489 */
/***/ function(module, exports) {

	module.exports = "<!--Check out the FormDemo.js for more information!-->\n<novo-form [form]=\"calendarForm\" layout=\"vertical\">\n    <div class=\"novo-form-row\">\n        <novo-control [form]=\"calendarForm\" [control]=\"dateControl\"></novo-control>\n    </div>\n    <div class=\"novo-form-row\">\n        <novo-control [form]=\"calendarForm\" [control]=\"timeControl\"></novo-control>\n    </div>\n    <div class=\"novo-form-row\">\n        <novo-control [form]=\"calendarForm\" [control]=\"dateTimeControl\"></novo-control>\n    </div>\n</novo-form>\n<div class=\"final-value\">Value: {{calendarForm.value | json}}</div>\n"

/***/ },
/* 490 */
/***/ function(module, exports) {

	module.exports = "<!--Check out the FormDemo.js for more information!-->\n<novo-form [form]=\"checkForm\">\n    <div class=\"novo-form-row\">\n        <novo-control [form]=\"checkForm\" [control]=\"checkControl\"></novo-control>\n    </div>\n    <div class=\"novo-form-row\">\n        <novo-control [form]=\"checkForm\" [control]=\"checkListControl\"></novo-control>\n    </div>\n    <div class=\"novo-form-row\">\n        <novo-control [form]=\"checkForm\" [control]=\"tilesControl\" (change)=\"onChange($event)\"></novo-control>\n    </div>\n</novo-form>\n<div class=\"final-value\">Value: {{checkForm.value | json}}</div>\n"

/***/ },
/* 491 */
/***/ function(module, exports) {

	module.exports = "<button theme=\"secondary\" *ngIf=\"!myform.showingAllFields && !(myform.allFieldsRequired || myform.allFieldsNotRequired)\" (click)=\"myform.showAllFields()\">Show All Fields</button>\n<button theme=\"secondary\" *ngIf=\"!myform.showingRequiredFields && !(myform.allFieldsRequired || myform.allFieldsNotRequired)\" (click)=\"myform.showOnlyRequired()\">Show Required Fields</button>\n<novo-dynamic-form class=\"dynamic\" [controls]=\"dynamic\" [(form)]=\"dynamicForm\" #myform></novo-dynamic-form>\n<footer class=\"dynamic-demo-footer\">\n    <button (click)=\"save(myform)\" theme=\"primary\" icon=\"check\">Save</button>\n    <button (click)=\"clear()\" theme=\"secondary\" icon=\"check\">Clear</button>\n</footer>\n<div class=\"final-value\">Valid: {{myform.isValid | json}}</div>\n<div class=\"final-value\">Values: {{myform.values | json}}</div>\n<div class=\"final-value\">Updated Values: {{myform.updatedValues() | json}}</div>\n"

/***/ },
/* 492 */
/***/ function(module, exports) {

	module.exports = "<!--Check out the FormDemo.js for more information!-->\n<novo-form [form]=\"fileForm\" layout=\"vertical\">\n    <div class=\"novo-form-row\">\n        <novo-control [form]=\"fileForm\" [control]=\"fileControl\"></novo-control>\n    </div>\n    <div class=\"novo-form-row\">\n        <novo-control [form]=\"fileForm\" [control]=\"multiFileControl\"></novo-control>\n    </div>\n</novo-form>\n<div class=\"final-value\">Value: {{fileForm.value | json}}</div>\n"

/***/ },
/* 493 */
/***/ function(module, exports) {

	module.exports = "<!--Check out the FormDemo.js for more information!-->\n<novo-form [form]=\"textForm\">\n    <div class=\"novo-form-row\">\n        <novo-control [form]=\"textForm\" [control]=\"textControl\"></novo-control>\n    </div>\n    <div class=\"novo-form-row\">\n        <novo-control [form]=\"textForm\" [control]=\"emailControl\"></novo-control>\n    </div>\n    <div class=\"novo-form-row\">\n        <novo-control [form]=\"textForm\" [control]=\"numberControl\"></novo-control>\n    </div>\n    <div class=\"novo-form-row\">\n        <novo-control [form]=\"textForm\" [control]=\"currencyControl\"></novo-control>\n    </div>\n    <div class=\"novo-form-row\">\n        <novo-control [form]=\"textForm\" [control]=\"floatControl\"></novo-control>\n    </div>\n    <div class=\"novo-form-row\">\n        <novo-control [form]=\"textForm\" [control]=\"percentageControl\"></novo-control>\n    </div>\n    <div class=\"novo-form-row\">\n        <novo-control [form]=\"textForm\" [control]=\"quickNoteControl\"></novo-control>\n    </div>\n</novo-form>\n<div class=\"final-value\">Value: {{textForm.value | json}}</div>\n"

/***/ },
/* 494 */
/***/ function(module, exports) {

	module.exports = "<button theme=\"secondary\" (click)=\"nomyform.showAllFields()\">Show All Fields</button>\n<button theme=\"secondary\" (click)=\"nomyform.showOnlyRequired()\">Show Required Fields</button>\n<novo-dynamic-form layout=\"vertical\" class=\"dynamic\" [controls]=\"dynamicVertical\" [(form)]=\"dynamicVerticalForm\" #nomyform></novo-dynamic-form>\n<div class=\"final-value\">Valid: {{nomyform.isValid | json}}</div>\n<div class=\"final-value\">Values: {{nomyform.values | json}}</div>\n<div class=\"final-value\">Updated Values: {{nomyform.updatedValues() | json}}</div>\n"

/***/ },
/* 495 */
/***/ function(module, exports) {

	module.exports = "<header title=\"John Deere\" icon=\"person\" [theme]=\"entity\">\n    <utils>\n        <util-action icon=\"flag\" (click)=\"catchEv('pin', $event)\"></util-action>\n        <util-action icon=\"refresh\" (click)=\"catchEv('refresh', $event)\"></util-action>\n        <util-action icon=\"times\" (click)=\"catchEv('close', $event)\"></util-action>\n    </utils>\n    <section>\n        Extra Info\n    </section>\n    <novo-nav theme=\"color\" [outlet]=\"colornav\" direction=\"horizontal\">\n        <novo-tab>\n            <span>Overview</span>\n        </novo-tab>\n        <novo-tab>\n            <span>Activity</span>\n        </novo-tab>\n        <novo-tab>\n            <span>Email</span>\n        </novo-tab>\n    </novo-nav>\n</header>\n"

/***/ },
/* 496 */
/***/ function(module, exports) {

	module.exports = "<header>\n    <novo-list direction=\"vertical\">\n        <novo-list-item *ngFor=\"let item of pulseItems\">\n            <item-header>\n                <item-avatar [icon]=\"item.type\"></item-avatar>\n                <item-title>{{item.name}}</item-title>\n                <item-date>\n                    <span>\n                        <i class=\"bhi-clock\"></i>\n                        {{item.timeAgo | date: 'shortTime'}}\n                    </span>\n                </item-date>\n            </item-header>\n            <item-content direction=\"vertical\">\n                <p>\n                    <i *ngIf=\"item.icon.name\" class=\"{{item.icon.name}} {{item.icon.sentiment}}\"></i>\n                    {{item.comment}}\n                </p>\n            </item-content>\n        </novo-list-item>\n    </novo-list>\n</header>\n"

/***/ },
/* 497 */
/***/ function(module, exports) {

	module.exports = "<header>\n    <novo-list theme=\"navigation\" direction=\"vertical\">\n        <novo-list-item *ngFor=\"let item of pulseItems\">\n            <item-header>\n                <item-avatar [icon]=\"item.type\"></item-avatar>\n                <item-title>{{item.name}}</item-title>\n            </item-header>\n            <item-content direction=\"vertical\">\n                <p>\n                    <i *ngIf=\"item.icon.name\" class=\"{{item.icon.name}} {{item.icon.sentiment}}\"></i>\n                    {{item.comment}}\n                </p>\n                <span>\n                    <i class=\"bhi-clock\"></i>\n                    {{item.timeAgo | date: 'shortTime'}}\n                </span>\n            </item-content>\n            <item-end>\n                <i class=\"bhi-next\"></i>\n            </item-end>\n        </novo-list-item>\n    </novo-list>\n</header>\n"

/***/ },
/* 498 */
/***/ function(module, exports) {

	module.exports = "<section>\n    <div class=\"whiteBg\">\n        <novo-spinner theme=\"multicolor\"></novo-spinner>\n    </div>\n    <div class=\"grayBg\">\n        <novo-spinner></novo-spinner>\n    </div>\n</section>\n<section>\n    <div class=\"blueBg\">\n        <novo-spinner inverse></novo-spinner>\n    </div>\n    <div class=\"darkBlueBg\">\n        <novo-spinner theme=\"bittersweet\"></novo-spinner>\n    </div>\n</section>\n"

/***/ },
/* 499 */
/***/ function(module, exports) {

	module.exports = "<header>\n    <novo-loading></novo-loading>\n</header>\n<header class=\"color-container\">\n    <novo-loading inverse></novo-loading>\n</header>\n"

/***/ },
/* 500 */
/***/ function(module, exports) {

	module.exports = "<novo-modal>\n    <header title=\"Add Contact\" icon=\"person\" theme=\"contact\">\n        <utils>\n            <util-action icon=\"times\" (click)=\"close()\"></util-action>\n        </utils>\n    </header>\n    <section>\n        <novo-form [form]=\"textForm\">\n            <div class=\"novo-form-row\">\n                <novo-control [form]=\"textForm\" [control]=\"textControl\"></novo-control>\n            </div>\n            <div class=\"novo-form-row\">\n                <novo-control [form]=\"textForm\" [control]=\"emailControl\"></novo-control>\n            </div>\n            <div class=\"novo-form-row\">\n                <novo-control [form]=\"textForm\" [control]=\"numberControl\"></novo-control>\n            </div>\n        </novo-form>\n    </section>\n    <button theme=\"standard\" (click)=\"close()\">Cancel</button>\n    <button theme=\"primary\" color=\"success\" icon=\"check\" (click)=\"close()\">Save</button>\n</novo-modal>\n"

/***/ },
/* 501 */
/***/ function(module, exports) {

	module.exports = "<novo-notification type=\"custom\" icon=\"trending-up\">\n    <h1>I have a trending icon!</h1>\n    <h4>This notification type allows for any Bullhorn Icon</h4>\n    <button theme=\"primary\" icon=\"check\" (click)=\"close()\">Sweet.</button>\n</novo-notification>\n"

/***/ },
/* 502 */
/***/ function(module, exports) {

	module.exports = "<novo-modal>\n    <header title=\"John Deere\" icon=\"candidate\" theme=\"candidate\">\n        <utils>\n            <util-action icon=\"times\" (click)=\"close()\"></util-action>\n        </utils>\n    </header>\n    <section>\n        <novo-form [form]=\"textForm\">\n            <div class=\"novo-form-row\">\n                <novo-control [form]=\"textForm\" [control]=\"textControl\"></novo-control>\n            </div>\n            <div class=\"novo-form-row\">\n                <novo-control [form]=\"textForm\" [control]=\"emailControl\"></novo-control>\n            </div>\n            <div class=\"novo-form-row\">\n                <novo-control [form]=\"textForm\" [control]=\"numberControl\"></novo-control>\n            </div>\n        </novo-form>\n    </section>\n    <button theme=\"standard\" (click)=\"close()\">Cancel</button>\n    <button theme=\"primary\" color=\"success\" icon=\"check\" (click)=\"close()\">Save</button>\n</novo-modal>\n"

/***/ },
/* 503 */
/***/ function(module, exports) {

	module.exports = "<novo-notification type=\"error\">\n    <h1>Sorry, something went wrong.</h1>\n    <h4>You did not have 1.21 gigawatts of power.</h4>\n    <button theme=\"primary\" icon=\"refresh-o\" (click)=\"close()\">Refresh this page</button>\n</novo-notification>\n"

/***/ },
/* 504 */
/***/ function(module, exports) {

	module.exports = "<novo-notification type=\"success\">\n    <h1>Woooo!</h1>\n    <h4>You did something awesome!</h4>\n    <button theme=\"primary\" icon=\"check\" (click)=\"close()\">I'm awesome</button>\n</novo-notification>\n"

/***/ },
/* 505 */
/***/ function(module, exports) {

	module.exports = "<novo-notification type=\"warning\">\n    <h1>This action will delete 25 records.</h1>\n    <h4>Are you sure you wish to continue?</h4>\n    <button theme=\"standard\" (click)=\"close()\">Cancel</button>\n    <button theme=\"primary\" color=\"negative\" icon=\"delete\" (click)=\"close()\">Delete</button>\n</novo-notification>\n"

/***/ },
/* 506 */
/***/ function(module, exports) {

	module.exports = "<div class=\"selected-value\">Selected States: <span *ngFor=\"let item of value.states\">{{item}} </span>\n    Selected Collaborators: <span *ngFor=\"let item of value.collaborators\">{{item}} </span></div>\n<multi-picker\n    [source]=\"static\"\n    [placeholder]=\"placeholder\"\n    [types]=\"types\"\n    [(ngModel)]=\"value\"\n    (changed)=\"onChanged($event)\">\n</multi-picker>\n"

/***/ },
/* 507 */
/***/ function(module, exports) {

	module.exports = "<div class=\"selected-value\">Selected Value: {{avalue}}</div>\n<novo-picker [config]=\"async\" [placeholder]=\"placeholder\" [(ngModel)]=\"avalue\"></novo-picker>\n"

/***/ },
/* 508 */
/***/ function(module, exports) {

	module.exports = "<div class=\"selected-value\">Selected Value: {{value}}</div>\n<novo-picker [config]=\"static\" [placeholder]=\"placeholder\" [(ngModel)]=\"value\"></novo-picker>\n"

/***/ },
/* 509 */
/***/ function(module, exports) {

	module.exports = "<div class=\"selected-value\">Selected Value: {{cvalue}}</div>\n<novo-picker [config]=\"custom\" [placeholder]=\"placeholder\" [(ngModel)]=\"cvalue\"></novo-picker>\n"

/***/ },
/* 510 */
/***/ function(module, exports) {

	module.exports = "<div class=\"selected-value\">Selected Value: {{fvalue}}</div>\n<novo-picker [config]=\"formatted\" [placeholder]=\"placeholder\" [(ngModel)]=\"fvalue\"></novo-picker>\n"

/***/ },
/* 511 */
/***/ function(module, exports) {

	module.exports = "<novo-quick-note [(ngModel)]=\"note\" [placeholder]=\"placeholder\" [config]=\"config\"></novo-quick-note>\n<div class=\"data\">\n    <p>Note: {{note | json}}</p>\n</div>\n"

/***/ },
/* 512 */
/***/ function(module, exports) {

	module.exports = "<novo-quick-note [(ngModel)]=\"note2\" [placeholder]=\"placeholder\" [config]=\"custom\"></novo-quick-note>\n<div class=\"data\">\n    <p>Note: {{note2 | json}}</p>\n</div>\n"

/***/ },
/* 513 */
/***/ function(module, exports) {

	module.exports = "<novo-quick-note [(ngModel)]=\"note3\" [placeholder]=\"placeholder\" [config]=\"custom2\"></novo-quick-note>\n<div class=\"data\">\n    <p>Note: {{note3 | json}}</p>\n</div>\n"

/***/ },
/* 514 */
/***/ function(module, exports) {

	module.exports = "<novo-radio [checked]=\"false\" name=\"basic\" value=\"one\" (change)=\"onChangeBasic($event)\">Make me anything!</novo-radio>\n<novo-radio [checked]=\"true\" name=\"basic\" value=\"two\" (change)=\"onChangeBasic($event)\">I get transcluded in!</novo-radio>\n<novo-radio [checked]=\"false\" name=\"basic\" value=\"three\" (change)=\"onChangeBasic($event)\">REALLY!</novo-radio>\n"

/***/ },
/* 515 */
/***/ function(module, exports) {

	module.exports = "<novo-radio vertical=\"true\" [checked]=\"false\" name=\"vertical\" value=\"one\" (change)=\"onChangeVertical($event)\">Make me anything!</novo-radio>\n<novo-radio vertical=\"true\" [checked]=\"true\" name=\"vertical\" value=\"two\" (change)=\"onChangeVertical($event)\">I get transcluded in!</novo-radio>\n<novo-radio vertical=\"true\" [checked]=\"false\" name=\"vertical\" value=\"three\" (change)=\"onChangeVertical($event)\">REALLY!</novo-radio>\n"

/***/ },
/* 516 */
/***/ function(module, exports) {

	module.exports = "<div>\n    <label>\n        <span class=\"caption\">Selected Value:</span> {{value}}\n    </label>\n    <novo-select [options]=\"options\" [placeholder]=\"placeholder\" [(ngModel)]=\"value\"></novo-select>\n</div>\n<div>\n    <label>\n        <span class=\"caption\">Selected Value:</span> {{withNumbersValue}}\n    </label>\n    <novo-select [options]=\"withNumbers\" [(ngModel)]=\"withNumbersValue\"></novo-select>\n</div>\n<div>\n    <label>\n        <span class=\"caption\">Disabled State</span>\n    </label>\n    <novo-select [options]=\"options\" [placeholder]=\"placeholder\" [(ngModel)]=\"value\" disabled></novo-select>\n</div>\n<div>\n    <label>\n        <span class=\"caption\">No Model With Header</span>\n    </label>\n    <novo-select [options]=\"options\" [placeholder]=\"placeholder\" [headerConfig]=\"headerConfig\"></novo-select>\n</div>\n"

/***/ },
/* 517 */
/***/ function(module, exports) {

	module.exports = "<div>\n    <label>\n        <span class=\"caption\">Selected Value:</span>{{state}}</label>\n    <novo-select [options]=\"states\" [placeholder]=\"placeholder\" [(ngModel)]=\"state\"></novo-select>\n</div>\n"

/***/ },
/* 518 */
/***/ function(module, exports) {

	module.exports = "<novo-slider [slides]=\"2\">\n    <div slide=\"1\">\n        SLIDE #1\n    </div>\n    <div slide=\"2\">\n        SLIDE #2\n    </div>\n</novo-slider>\n"

/***/ },
/* 519 */
/***/ function(module, exports) {

	module.exports = "<label>\n    Count\n    <span>{{toggleCount}}</span>\n</label>\n<label>\n    Toggled\n    <span>{{checked}}</span>\n</label>\n<novo-switch [(ngModel)]=\"checked\" (onChange)=\"increment()\"></novo-switch>\n<novo-switch theme=\"grapefruit\"></novo-switch>\n<novo-switch disabled></novo-switch>\n"

/***/ },
/* 520 */
/***/ function(module, exports) {

	module.exports = "<novo-table [rows]=\"details.rows\" [columns]=\"details.columns\" [config]=\"details.config\"></novo-table>\n"

/***/ },
/* 521 */
/***/ function(module, exports) {

	module.exports = "<novo-table [rows]=\"selectAll.rows\" [columns]=\"selectAll.columns\" [config]=\"selectAll.config\" #table>\n    <novo-table-actions>\n        <button theme=\"secondary\" (click)=\"singleAction()\">Click Me!</button>\n        <novo-dropdown side=\"right\" *ngIf=\"table.selected.length\">\n            <button theme=\"primary\" icon=\"collapse\" inverse>{{table.selected.length}} Selected</button>\n            <list>\n                <item (action)=\"selectedAction('action 1')\">Action 1</item>\n                <item (action)=\"selectedAction('action 2')\">Action 2</item>\n                <item (action)=\"selectedAction('action 3')\" disabled=\"true\">Action 3</item>\n            </list>\n        </novo-dropdown>\n    </novo-table-actions>\n</novo-table>\n"

/***/ },
/* 522 */
/***/ function(module, exports) {

	module.exports = "<novo-table [theme]=\"theme\" [rows]=\"basic.rows\" [columns]=\"basic.columns\" [config]=\"basic.config\">\n    <novo-table-header class=\"demo-custom-header\">\n        TEST :)\n        <button theme=\"secondary\" (click)=\"changeTheme()\">Change Theme!</button>\n    </novo-table-header>\n</novo-table>\n"

/***/ },
/* 523 */
/***/ function(module, exports) {

	module.exports = "<header class=\"color\">\n    <novo-nav theme=\"color\" [outlet]=\"buttonTab\" type=\"button-bar\">\n        <novo-tab-button>Button 1</novo-tab-button>\n        <novo-tab-button>Button 2</novo-tab-button>\n        <novo-tab-button>Button 3</novo-tab-button>\n    </novo-nav>\n</header>\n\n<novo-nav-outlet #buttonTab>\n    <novo-nav-content>\n        <h1>Tab 1 Content</h1>\n    </novo-nav-content>\n    <novo-nav-content>\n        <h1>Tab 2 Content</h1>\n    </novo-nav-content>\n    <novo-nav-content>\n        <h1>Tab 3 Content</h1>\n    </novo-nav-content>\n</novo-nav-outlet>\n\n<header>\n    <novo-nav theme=\"white\" [outlet]=\"buttonTabWhite\" type=\"button-bar\">\n        <novo-tab-button>Button 1</novo-tab-button>\n        <novo-tab-button>Button 2</novo-tab-button>\n        <novo-tab-button>Button 3</novo-tab-button>\n    </novo-nav>\n</header>\n\n<novo-nav-outlet #buttonTabWhite>\n    <novo-nav-content>\n        <h1>Tab 1 Content</h1>\n    </novo-nav-content>\n    <novo-nav-content>\n        <h1>Tab 2 Content</h1>\n    </novo-nav-content>\n    <novo-nav-content>\n        <h1>Tab 3 Content</h1>\n    </novo-nav-content>\n</novo-nav-outlet>\n"

/***/ },
/* 524 */
/***/ function(module, exports) {

	module.exports = "<header>\n    <novo-nav theme=\"color\" [outlet]=\"colornav\" direction=\"horizontal\">\n        <novo-tab>\n            <span>\n                <i class=\"bhi-person\"></i>Tab 1</span>\n        </novo-tab>\n        <novo-tab>\n            <span>\n                <i class=\"bhi-person\"></i>Tab 2</span>\n        </novo-tab>\n    </novo-nav>\n</header>\n\n<novo-nav-outlet #colornav>\n    <novo-nav-content>\n        <h1>Tab 1 Content</h1>\n    </novo-nav-content>\n    <novo-nav-content>\n        <h1>Tab 2 Content</h1>\n    </novo-nav-content>\n</novo-nav-outlet>\n"

/***/ },
/* 525 */
/***/ function(module, exports) {

	module.exports = "<header>\n    <novo-nav theme=\"white\" router>\n        <novo-tab-link>\n            <span>\n                <i class=\"bhi-person\"></i>Tab 1</span>\n        </novo-tab-link>\n        <novo-tab-link>\n            <span>\n                <i class=\"bhi-person\"></i>Tab 2</span>\n        </novo-tab-link>\n    </novo-nav>\n</header>\n"

/***/ },
/* 526 */
/***/ function(module, exports) {

	module.exports = "<novo-nav theme=\"white\" [outlet]=\"colorVert\" direction=\"vertical\">\n    <novo-tab>\n        <span>\n            <i class=\"bhi-person\"></i>Tab 1</span>\n    </novo-tab>\n    <novo-tab>\n        <span>\n            <i class=\"bhi-person\"></i>Tab 2</span>\n    </novo-tab>\n</novo-nav>\n\n<novo-nav-outlet #colorVert>\n    <novo-nav-content>\n        <h1>Tab 1 Content</h1>\n\n        <p>\n            Synth polaroid bitters chillwave pickled. Vegan disrupt tousled,\n            Portland keffiyeh aesthetic food truck sriracha cornhole\n            single-origin coffee church-key roof party. Leggings\n            ethical McSweeney's, normcore you probably haven't\n            heard of them Marfa organic squid. Slow-carb 90's\n            ennui Godard pug asymmetrical, narwhal VHS Tonx High\n            Life. Retro dreamcatcher synth Godard pickled Etsy\n            jean shorts beard, pour-over fanny pack mumblecore.\n            Quinoa retro aesthetic polaroid, Williamsburg American\n            Apparel plaid small batch. Blue Bottle Vice fanny\n            pack, Williamsburg roof party Wes Anderson mlkshk\n            seitan brunch before they sold out lo-fi XOXO tofu\n            scenester small batch.\n        </p>\n    </novo-nav-content>\n    <novo-nav-content>\n        <h1>Tab 2 Content</h1>\n\n        <p>\n            Synth polaroid bitters chillwave pickled.\n        </p>\n    </novo-nav-content>\n</novo-nav-outlet>\n"

/***/ },
/* 527 */
/***/ function(module, exports) {

	module.exports = "<header>\n    <novo-nav theme=\"white\" [outlet]=\"whitenav\">\n        <novo-tab>\n            <span>\n                <i class=\"bhi-person\"></i>Tab 1</span>\n        </novo-tab>\n        <novo-tab>\n            <span>\n                <i class=\"bhi-person\"></i>Tab 2</span>\n        </novo-tab>\n    </novo-nav>\n</header>\n\n<novo-nav-outlet #whitenav>\n    <novo-nav-content>\n        <h1>Tab 1 Content</h1>\n    </novo-nav-content>\n    <novo-nav-content>\n        <h1>Tab 2 Content</h1>\n    </novo-nav-content>\n</novo-nav-outlet>\n"

/***/ },
/* 528 */
/***/ function(module, exports) {

	module.exports = "<novo-tiles [options]=\"demoTiles\" (onChange)=\"colorSelect($event)\" [(ngModel)]=\"value\"></novo-tiles>\n<hr>\n<button type=\"button\" name=\"button\" (click)=\"toggleShown()\">Show Tiles</button>\n<novo-tiles *ngIf=\"shown\" [options]=\"demoTiles\" (onChange)=\"colorSelect($event)\" [(ngModel)]=\"value\"></novo-tiles>\n"

/***/ },
/* 529 */
/***/ function(module, exports) {

	module.exports = "<novo-tip-well name=\"Demo\" [tip]=\"demoTip\"></novo-tip-well>"

/***/ },
/* 530 */
/***/ function(module, exports) {

	module.exports = "<novo-tip-well name=\"Demo\" [tip]=\"demoTip\" icon=\"info\" button=\"false\"></novo-tip-well>"

/***/ },
/* 531 */
/***/ function(module, exports) {

	module.exports = "<novo-tip-well name=\"Demo\" [tip]=\"demoTip\" button=\"false\"></novo-tip-well>\n"

/***/ },
/* 532 */
/***/ function(module, exports) {

	module.exports = "<div class=\"fake-card\">\n    <header title=\"John Deere\" icon=\"person\" theme=\"contact\">\n        <utils>\n            <util-action icon=\"flag\"></util-action>\n            <util-action icon=\"refresh\"></util-action>\n            <util-action icon=\"times\"></util-action>\n        </utils>\n    </header>\n    <novo-toast [theme]=\"toast.theme\" [icon]=\"toast.icon\" title=\"Save Failed\" message=\"Oops! Looks like you're missing some required fields\"></novo-toast>\n    <div class=\"content\">\n        <p>\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed\n            do eiusmod tempor incididunt ut labore et dolore\n            magna aliqua. Ut enim ad minim veniam, quis nostrud\n            exercitation ullamco laboris nisi ut aliquip ex ea\n            commodo consequat. Duis aute irure dolor in reprehenderit\n            in voluptate velit esse cillum dolore eu fugiat nulla\n            pariatur. Excepteur sint occaecat cupidatat non proident,\n            sunt in culpa qui officia deserunt mollit anim id\n            est laborum.\n        </p>\n        <button (click)=\"changeToast()\">Change toast!</button>\n    </div>\n</div>\n"

/***/ },
/* 533 */
/***/ function(module, exports) {

	module.exports = "<button theme=\"dialogue\" color=\"success\" icon=\"coffee\" (click)=\"toastToggled('top')\" data-automation-id=\"toast-trigger\">Fixed Top</button>\n<button theme=\"dialogue\" color=\"primary\" icon=\"check\" (click)=\"toastToggled('bottom')\">Fixed Bottom</button>\n<button theme=\"dialogue\" color=\"negative\" icon=\"times\" (click)=\"toastToggled('growlTopRight')\">Growl: Top Right</button>\n<button theme=\"dialogue\" color=\"primary\" icon=\"coffee\" (click)=\"toastToggled('growlTopLeft')\">Growl: Top Left</button>\n<button theme=\"dialogue\" color=\"negative\" icon=\"times\" (click)=\"toastToggled('growlBottomRight')\">Growl: Bottom Right</button>\n<button theme=\"dialogue\" color=\"primary\" icon=\"coffee\" (click)=\"toastToggled('growlBottomLeft')\">Growl: Bottom Left</button>\n"

/***/ },
/* 534 */
/***/ function(module, exports) {

	module.exports = "<span tooltip=\"bottom-left\" tooltipPosition=\"bottom-left\">Bottom Left</span>\n<span tooltip=\"bottom-right\" tooltipPosition=\"bottom-right\">Bottom Right</span>\n<span tooltip=\"top-left\" tooltipPosition=\"top-left\">Top Left</span>\n<span tooltip=\"top-right\" tooltipPosition=\"top-right\">Top Right</span>\n"

/***/ },
/* 535 */
/***/ function(module, exports) {

	module.exports = "<span tooltip=\"ALWAYS\" tooltipAlways=\"true\">Always Shown</span>\n<span tooltip=\"ROUNDED\" tooltipRounded=\"true\">Rounded</span>\n<span tooltip=\"NO ANIMATE\" tooltipNoAnimate=\"true\">No Animation</span>\n<span tooltip=\"BOUNCE\" tooltipBounce=\"true\">Bounce</span>\n"

/***/ },
/* 536 */
/***/ function(module, exports) {

	module.exports = "<span tooltip=\"left\" tooltipPosition=\"left\">Left</span>\n<span tooltip=\"right\" tooltipPosition=\"right\">Right</span>\n<span tooltip=\"top\" tooltipPosition=\"top\">Top</span>\n<span tooltip=\"bottom\" tooltipPosition=\"bottom\">Bottom</span>\n"

/***/ },
/* 537 */
/***/ function(module, exports) {

	module.exports = "<span tooltip=\"I HAVE A TOOLTIP!\" [tooltipActive]=\"tooltipActive\">\n    <span *ngIf=\"tooltipActive\">My tooltip can display!</span>\n    <span *ngIf=\"!tooltipActive\">My tooltip is disabled!</span>\n</span>\n<button theme=\"secondary\" (click)=\"toggleTooltip()\">Toggle</button>\n"

/***/ },
/* 538 */
/***/ function(module, exports) {

	module.exports = "<span tooltip=\"ERROR\" tooltipType=\"error\">Error</span>\n<span tooltip=\"INFO\" tooltipType=\"info\">Info</span>\n<span tooltip=\"WARNING\" tooltipType=\"warning\">Warning</span>\n<span tooltip=\"SUCCESS\" tooltipType=\"success\">Success</span>\n"

/***/ },
/* 539 */
/***/ function(module, exports) {

	module.exports = "<header class=\"design container\">\n    <div>\n        <h1 class=\"title\">Introduction</h1>\n        <h2 class=\"sub-title\">Crafted amid Complexity</h2>\n\n        <p class=\"description\">\n            Enterprise software is highly complex and demands a\n            high level of flexibility. Design offers clarity and enables us to make\n            deep, powerful connections.\n        </p>\n    </div>\n    <img src=\"assets/images/IntroPageHeaderImage.svg\" alt=\"\"/>\n</header>\n\n<section class=\"design container\">\n    <h5>A NEW STANDARD</h5>\n    <p>Elegance in utility helps to create a system for humans, not robots. We strive not just to empower users but to delight them in the process.</p>\n\n    <h5>INSIGHTS AT SCALE</h5>\n    <p>Vast data reservoirs need a finely tuned system to surface the critical information right when it is needed, no matter the scale or setting.</p>\n\n    <h5>POWER IN FLEXIBILITY</h5>\n    <p>Users have vastly differing needs and goals. By identifying key commonalities and themes, we provide a strong experience for all.</p>\n\n    <article class=\"jump-to code\">\n        <i class=\"bhi-link\"></i>\n        <span>Are you a developer and what to skip right to the code?<br><a href=\"#\" routerLink=\"Buttons\">View Components here</a></span>\n    </article>\n\n    <article class=\"jump-to brand\">\n        <i class=\"bhi-link\"></i>\n        <span>Looking for the Bullhorn corporate brand guidelines? <br/><a href=\"https://brandfolder.com/bullhorn\" target=\"_blank\">Bullhorn Brand Folder</a></span>\n    </article>\n</section>\n"

/***/ },
/* 540 */
/***/ function(module, exports) {

	module.exports = "<p>{{'Kitty' | plural}}</p>\n<p>{{'Cat' | plural}}</p>\n"

/***/ },
/* 541 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container\">\n    <h1>Utils</h1>\n    <p>Helpful utility functions and objects.</p>\n\n    <h5>Key Codes\n        <small><a target=\"_blank\" href=\"https://github.com/bullhorn/novo-elements/blob/master/src/utils/key-codes\">(source)</a></small>\n    </h5>\n    <p>List of all Key Codes to import and use, no magic strings!</p>\n\n    <h5>Deferred\n        <small><a target=\"_blank\" href=\"https://github.com/bullhorn/novo-elements/blob/master/src/utils/deferred\">(source)</a></small>\n    </h5>\n    <p>Custom deferred object</p>\n\n    <h5>Outside Click\n        <small><a target=\"_blank\" href=\"https://github.com/bullhorn/novo-elements/blob/master/src/utils/outside-click\">(source)</a></small>\n    </h5>\n    <p>Helper class to listen to and automatically close a component when an outside click is detected.</p>\n</div>\n"

/***/ }
]);
//# sourceMappingURL=demo.e2d3c45369ef38c7d286.map