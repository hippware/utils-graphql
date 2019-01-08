(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
    ? define(["exports"], factory)
    : factory((global.UtilsGraphql = {}));
})(this, exports => {
  function createCommonjsModule(fn, module) {
    return (module = {exports: {}}), fn(module, module.exports), module.exports;
  }

  const _global = createCommonjsModule(module => {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    let global = (module.exports =
      typeof window !== "undefined" && window.Math == Math
        ? window
        : typeof self !== "undefined" && self.Math == Math
        ? self
        : // eslint-disable-next-line no-new-func
          Function("return this")());
    if (typeof __g === "number") __g = global; // eslint-disable-line no-undef
  });

  const _core = createCommonjsModule(module => {
    let core = (module.exports = {version: "2.6.0"});
    if (typeof __e === "number") __e = core; // eslint-disable-line no-undef
  });
  const _core_1 = _core.version;

  const _isObject = function(it) {
    return typeof it === "object" ? it !== null : typeof it === "function";
  };

  const _anObject = function(it) {
    if (!_isObject(it)) throw TypeError(`${it} is not an object!`);
    return it;
  };

  const _fails = function(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  const _descriptors = !_fails(() => (
      Object.defineProperty({}, "a", {
        get: function() {
          return 7;
        }
      }).a != 7
    ));

  const document = _global.document;
  // typeof document.createElement is 'object' in old IE
  const is = _isObject(document) && _isObject(document.createElement);
  const _domCreate = function(it) {
    return is ? document.createElement(it) : {};
  };

  const _ie8DomDefine =
    !_descriptors &&
    !_fails(() => (
        Object.defineProperty(_domCreate("div"), "a", {
          get: function() {
            return 7;
          }
        }).a != 7
      ));

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  const _toPrimitive = function(it, S) {
    if (!_isObject(it)) return it;
    let fn;
    let val;
    if (
      S &&
      typeof (fn = it.toString) === "function" &&
      !_isObject((val = fn.call(it)))
    )
      return val;
    if (
      typeof (fn = it.valueOf) === "function" &&
      !_isObject((val = fn.call(it)))
    )
      return val;
    if (
      !S &&
      typeof (fn = it.toString) === "function" &&
      !_isObject((val = fn.call(it)))
    )
      return val;
    throw TypeError("Can't convert object to primitive value");
  };

  const dP = Object.defineProperty;

  const f = _descriptors
    ? Object.defineProperty
    : function defineProperty(O, P, Attributes) {
        _anObject(O);
        P = _toPrimitive(P, true);
        _anObject(Attributes);
        if (_ie8DomDefine)
          try {
            return dP(O, P, Attributes);
          } catch (e) {
            /* empty */
          }
        if ("get" in Attributes || "set" in Attributes)
          throw TypeError("Accessors not supported!");
        if ("value" in Attributes) O[P] = Attributes.value;
        return O;
      };

  const _objectDp = {
    f
  };

  const _propertyDesc = function(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value
    };
  };

  const _hide = _descriptors
    ? function(object, key, value) {
        return _objectDp.f(object, key, _propertyDesc(1, value));
      }
    : function(object, key, value) {
        object[key] = value;
        return object;
      };

  const hasOwnProperty = {}.hasOwnProperty;
  const _has = function(it, key) {
    return hasOwnProperty.call(it, key);
  };

  let id = 0;
  const px = Math.random();
  const _uid = function(key) {
    return "Symbol(".concat(
      key === undefined ? "" : key,
      ")_",
      (++id + px).toString(36)
    );
  };

  const _redefine = createCommonjsModule(module => {
    let SRC = _uid("src");
    let TO_STRING = "toString";
    let $toString = Function[TO_STRING];
    let TPL = (`${  $toString}`).split(TO_STRING);

    _core.inspectSource = function(it) {
      return $toString.call(it);
    };

    (module.exports = function(O, key, val, safe) {
      let isFunction = typeof val === "function";
      if (isFunction) _has(val, "name") || _hide(val, "name", key);
      if (O[key] === val) return;
      if (isFunction)
        _has(val, SRC) ||
          _hide(val, SRC, O[key] ? `${  O[key]}` : TPL.join(String(key)));
      if (O === _global) {
        O[key] = val;
      } else if (!safe) {
        delete O[key];
        _hide(O, key, val);
      } else if (O[key]) {
        O[key] = val;
      } else {
        _hide(O, key, val);
      }
      // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, TO_STRING, function toString() {
      return (typeof this === "function" && this[SRC]) || $toString.call(this);
    });
  });

  const _aFunction = function(it) {
    if (typeof it !== "function") throw TypeError(`${it} is not a function!`);
    return it;
  };

  // optional / simple context binding

  const _ctx = function(fn, that, length) {
    _aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1:
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function(/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  const PROTOTYPE = "prototype";

  var $export = function(type, name, source) {
    const IS_FORCED = type & $export.F;
    const IS_GLOBAL = type & $export.G;
    const IS_STATIC = type & $export.S;
    const IS_PROTO = type & $export.P;
    const IS_BIND = type & $export.B;
    const target = IS_GLOBAL
      ? _global
      : IS_STATIC
      ? _global[name] || (_global[name] = {})
      : (_global[name] || {})[PROTOTYPE];
    const exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    const expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
    let key;
    let own;
    let out;
    let exp;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      // export native or passed
      out = (own ? target : source)[key];
      // bind timers to global for call from export context
      exp =
        IS_BIND && own
          ? _ctx(out, _global)
          : IS_PROTO && typeof out === "function"
          ? _ctx(Function.call, out)
          : out;
      // extend global
      if (target) _redefine(target, key, out, type & $export.U);
      // export
      if (exports[key] != out) _hide(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };
  _global.core = _core;
  // type bitmap
  $export.F = 1; // forced
  $export.G = 2; // global
  $export.S = 4; // static
  $export.P = 8; // proto
  $export.B = 16; // bind
  $export.W = 32; // wrap
  $export.U = 64; // safe
  $export.R = 128; // real proto method for `library`
  const _export = $export;

  const toString = {}.toString;

  const _cof = function(it) {
    return toString.call(it).slice(8, -1);
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  const _iobject = Object("z").propertyIsEnumerable(0)
    ? Object
    : function(it) {
        return _cof(it) == "String" ? it.split("") : Object(it);
      };

  // 7.2.1 RequireObjectCoercible(argument)
  const _defined = function(it) {
    if (it == undefined) throw TypeError(`Can't call method on  ${it}`);
    return it;
  };

  // 7.1.13 ToObject(argument)

  const _toObject = function(it) {
    return Object(_defined(it));
  };

  // 7.1.4 ToInteger
  const ceil = Math.ceil;
  const floor = Math.floor;
  const _toInteger = function(it) {
    return isNaN((it = +it)) ? 0 : (it > 0 ? floor : ceil)(it);
  };

  // 7.1.15 ToLength

  const min = Math.min;
  const _toLength = function(it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  // 7.2.2 IsArray(argument)

  const _isArray =
    Array.isArray ||
    function isArray(arg) {
      return _cof(arg) == "Array";
    };

  const _library = false;

  const _shared = createCommonjsModule(module => {
    let SHARED = "__core-js_shared__";
    let store = _global[SHARED] || (_global[SHARED] = {});

    (module.exports = function(key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {});
    })("versions", []).push({
      version: _core.version,
      mode: _library ? "pure" : "global",
      copyright: "© 2018 Denis Pushkarev (zloirock.ru)"
    });
  });

  const _wks = createCommonjsModule(module => {
    let store = _shared("wks");

    let Symbol = _global.Symbol;
    let USE_SYMBOL = typeof Symbol === "function";

    let $exports = (module.exports = function(name) {
      return (
        store[name] ||
        (store[name] =
          (USE_SYMBOL && Symbol[name]) ||
          (USE_SYMBOL ? Symbol : _uid)(`Symbol.${  name}`))
      );
    });

    $exports.store = store;
  });

  const SPECIES = _wks("species");

  const _arraySpeciesConstructor = function(original) {
    let C;
    if (_isArray(original)) {
      C = original.constructor;
      // cross-realm fallback
      if (typeof C === "function" && (C === Array || _isArray(C.prototype)))
        C = undefined;
      if (_isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    }
    return C === undefined ? Array : C;
  };

  // 9.4.2.3 ArraySpeciesCreate(originalArray, length)

  const _arraySpeciesCreate = function(original, length) {
    return new (_arraySpeciesConstructor(original))(length);
  };

  // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex

  const _arrayMethods = function(TYPE, $create) {
    const IS_MAP = TYPE == 1;
    const IS_FILTER = TYPE == 2;
    const IS_SOME = TYPE == 3;
    const IS_EVERY = TYPE == 4;
    const IS_FIND_INDEX = TYPE == 6;
    const NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    const create = $create || _arraySpeciesCreate;
    return function($this, callbackfn, that) {
      const O = _toObject($this);
      const self = _iobject(O);
      const f = _ctx(callbackfn, that, 3);
      const length = _toLength(self.length);
      let index = 0;
      const result = IS_MAP
        ? create($this, length)
        : IS_FILTER
        ? create($this, 0)
        : undefined;
      let val;
      let res;
      for (; length > index; index++)
        if (NO_HOLES || index in self) {
          val = self[index];
          res = f(val, index, O);
          if (TYPE) {
            if (IS_MAP) result[index] = res;
            // map
            else if (res)
              switch (TYPE) {
                case 3:
                  return true; // some
                case 5:
                  return val; // find
                case 6:
                  return index; // findIndex
                case 2:
                  result.push(val); // filter
              }
            else if (IS_EVERY) return false; // every
          }
        }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

  const _strictMethod = function(method, arg) {
    return (
      !!method &&
      _fails(() => {
        // eslint-disable-next-line no-useless-call
        arg
          ? method.call(
              null,
              () => {
                /* empty */
              },
              1
            )
          : method.call(null);
      })
    );
  };

  const $map = _arrayMethods(1);

  _export(_export.P + _export.F * !_strictMethod([].map, true), "Array", {
    // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments[1]);
    }
  });

  // fast apply, http://jsperf.lnkit.com/fast-apply/5
  const _invoke = function(fn, args, that) {
    const un = that === undefined;
    switch (args.length) {
      case 0:
        return un ? fn() : fn.call(that);
      case 1:
        return un ? fn(args[0]) : fn.call(that, args[0]);
      case 2:
        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
      case 3:
        return un
          ? fn(args[0], args[1], args[2])
          : fn.call(that, args[0], args[1], args[2]);
      case 4:
        return un
          ? fn(args[0], args[1], args[2], args[3])
          : fn.call(that, args[0], args[1], args[2], args[3]);
    }
    return fn.apply(that, args);
  };

  const arraySlice = [].slice;
  const factories = {};

  const construct = function(F, len, args) {
    if (!(len in factories)) {
      for (var n = [], i = 0; i < len; i++) n[i] = `a[${i}]`;
      // eslint-disable-next-line no-new-func
      factories[len] = Function("F,a", `return new F(${n.join(",")})`);
    }
    return factories[len](F, args);
  };

  const _bind =
    Function.bind ||
    function bind(that /* , ...args */) {
      const fn = _aFunction(this);
      const partArgs = arraySlice.call(arguments, 1);
      var bound = function(/* args... */) {
        const args = partArgs.concat(arraySlice.call(arguments));
        return this instanceof bound
          ? construct(fn, args.length, args)
          : _invoke(fn, args, that);
      };
      if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
      return bound;
    };

  // 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)

  _export(_export.P, "Function", {bind: _bind});

  function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }

  const newArrowCheck = _newArrowCheck;

  const _this;

  const locationsToString = function locationsToString(locations) {
    const _this2 = this;

    newArrowCheck(this, _this);

    return locations
      .map(_ref => {
        const column = _ref.column;

        var line = _ref.line;

        newArrowCheck(this, _this2);

        return "".concat(line, ":").concat(column);
      })
      .join("; ");
  }.bind(undefined);

  const errorToString = function errorToString(_ref2) {
    const message = _ref2.message;

    let locations = _ref2.locations;

    newArrowCheck(this, _this);

    return (
      message +
      (locations ? " (".concat(locationsToString(locations), ")") : "")
    );
  }.bind(undefined);
  /**
   * Transforms an array of GqlError into a string.
   *
   * @example
   *
   * const gqlRespose = {
   *   errors: [
   *     {message: "First Error", locations: [{column: 10, line: 2}]},
   *     {message: "Second Error", locations: [{column: 2, line: 4}]}
   *   ]
   * }
   *
   * const error = errorsToString(gqlRespose.errors);
   * // string with the following:
   * // First Error (2:10)
   * // Second Error (4:2)
   */

  const errorsToString = function errorsToString(gqlErrors) {
    newArrowCheck(this, _this);

    return gqlErrors.map(errorToString).join("\n");
  }.bind(undefined);

  // true  -> String#at
  // false -> String#codePointAt
  const _stringAt = function(TO_STRING) {
    return function(that, pos) {
      const s = String(_defined(that));
      const i = _toInteger(pos);
      const l = s.length;
      let a;
      let b;
      if (i < 0 || i >= l) return TO_STRING ? "" : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 ||
        a > 0xdbff ||
        i + 1 === l ||
        (b = s.charCodeAt(i + 1)) < 0xdc00 ||
        b > 0xdfff
        ? TO_STRING
          ? s.charAt(i)
          : a
        : TO_STRING
        ? s.slice(i, i + 2)
        : ((a - 0xd800) << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  const at = _stringAt(true);

  // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex
  const _advanceStringIndex = function(S, index, unicode) {
    return index + (unicode ? at(S, index).length : 1);
  };

  // getting tag from 19.1.3.6 Object.prototype.toString()

  const TAG = _wks("toStringTag");
  // ES3 wrong here
  const ARG =
    _cof(
      (function() {
        return arguments;
      })()
    ) == "Arguments";

  // fallback for IE11 Script Access Denied error
  const tryGet = function(it, key) {
    try {
      return it[key];
    } catch (e) {
      /* empty */
    }
  };

  const _classof = function(it) {
    let O;
    let T;
    let B;
    return it === undefined
      ? "Undefined"
      : it === null
      ? "Null"
      : // @@toStringTag case
      typeof (T = tryGet((O = Object(it)), TAG)) === "string"
      ? T
      : // builtinTag case
      ARG
      ? _cof(O)
      : // ES3 arguments fallback
      (B = _cof(O)) == "Object" && typeof O.callee === "function"
      ? "Arguments"
      : B;
  };

  const builtinExec = RegExp.prototype.exec;

  // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec
  const _regexpExecAbstract = function(R, S) {
    const exec = R.exec;
    if (typeof exec === "function") {
      const result = exec.call(R, S);
      if (typeof result !== "object") {
        throw new TypeError(
          "RegExp exec method returned something other than an Object or null"
        );
      }
      return result;
    }
    if (_classof(R) !== "RegExp") {
      throw new TypeError("RegExp#exec called on incompatible receiver");
    }
    return builtinExec.call(R, S);
  };

  // 21.2.5.3 get RegExp.prototype.flags

  const _flags = function() {
    const that = _anObject(this);
    let result = "";
    if (that.global) result += "g";
    if (that.ignoreCase) result += "i";
    if (that.multiline) result += "m";
    if (that.unicode) result += "u";
    if (that.sticky) result += "y";
    return result;
  };

  const nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  const nativeReplace = String.prototype.replace;

  let patchedExec = nativeExec;

  const LAST_INDEX = "lastIndex";

  const UPDATES_LAST_INDEX_WRONG = (function() {
    const re1 = /a/;

    let re2 = /b*/g;
    nativeExec.call(re1, "a");
    nativeExec.call(re2, "a");
    return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
  })();

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  const NPCG_INCLUDED = /()??/.exec("")[1] !== undefined;

  const PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

  if (PATCH) {
    patchedExec = function exec(str) {
      const re = this;
      let lastIndex;
      let reCopy;
      let match;
      let i;

      if (NPCG_INCLUDED) {
        reCopy = new RegExp(`^${re.source}$(?!\\s)`, _flags.call(re));
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

      match = nativeExec.call(re, str);

      if (UPDATES_LAST_INDEX_WRONG && match) {
        re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        // eslint-disable-next-line no-loop-func
        nativeReplace.call(match[0], reCopy, function() {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  const _regexpExec = patchedExec;

  _export(
    {
      target: "RegExp",
      proto: true,
      forced: _regexpExec !== /./.exec
    },
    {
      exec: _regexpExec
    }
  );

  const SPECIES$1 = _wks("species");

  const REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(() => {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    const re = /./;
    re.exec = function() {
      let result = [];
      result.groups = {a: "7"};
      return result;
    };
    return "".replace(re, "$<a>") !== "7";
  });

  const SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function() {
    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
    const re = /(?:)/;
    const originalExec = re.exec;
    re.exec = function() {
      return originalExec.apply(this, arguments);
    };
    const result = "ab".split(re);
    return result.length === 2 && result[0] === "a" && result[1] === "b";
  })();

  const _fixReWks = function(KEY, length, exec) {
    const SYMBOL = _wks(KEY);

    const DELEGATES_TO_SYMBOL = !_fails(() => {
      // String methods call symbol-named RegEp methods
      const O = {};
      O[SYMBOL] = function() {
        return 7;
      };
      return ""[KEY](O) != 7;
    });

    const DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL
      ? !_fails(() => {
          // Symbol-named RegExp methods call .exec
          let execCalled = false;
          const re = /a/;
          re.exec = function() {
            execCalled = true;
            return null;
          };
          if (KEY === "split") {
            // RegExp[@@split] doesn't call the regex's exec method, but first creates
            // a new one. We need to return the patched regex when creating the new one.
            re.constructor = {};
            re.constructor[SPECIES$1] = function() {
              return re;
            };
          }
          re[SYMBOL]("");
          return !execCalled;
        })
      : undefined;

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === "replace" && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
      (KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      const nativeRegExpMethod = /./[SYMBOL];
      const fns = exec(
        _defined,
        SYMBOL,
        ""[KEY],
        (nativeMethod, regexp, str, arg2, forceStringMethod) => {
          if (regexp.exec === _regexpExec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return {
                done: true,
                value: nativeRegExpMethod.call(regexp, str, arg2)
              };
            }
            return {done: true, value: nativeMethod.call(str, regexp, arg2)};
          }
          return {done: false};
        }
      );
      const strfn = fns[0];
      const rxfn = fns[1];

      _redefine(String.prototype, KEY, strfn);
      _hide(
        RegExp.prototype,
        SYMBOL,
        length == 2
          ? // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
            // 21.2.5.11 RegExp.prototype[@@split](string, limit)
            function(string, arg) {
              return rxfn.call(string, this, arg);
            }
          : // 21.2.5.6 RegExp.prototype[@@match](string)
            // 21.2.5.9 RegExp.prototype[@@search](string)
            function(string) {
              return rxfn.call(string, this);
            }
      );
    }
  };

  // @@match logic
  _fixReWks("match", 1, (defined, MATCH, $match, maybeCallNative) => [
      // `String.prototype.match` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = defined(this);
        let fn = regexp == undefined ? undefined : regexp[MATCH];
        return fn !== undefined
          ? fn.call(regexp, O)
          : new RegExp(regexp)[MATCH](String(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
      function(regexp) {
        let res = maybeCallNative($match, regexp, this);
        if (res.done) return res.value;
        let rx = _anObject(regexp);
        let S = String(this);
        if (!rx.global) return _regexpExecAbstract(rx, S);
        let fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        let A = [];
        let n = 0;
        let result;
        while ((result = _regexpExecAbstract(rx, S)) !== null) {
          let matchStr = String(result[0]);
          A[n] = matchStr;
          if (matchStr === "")
            rx.lastIndex = _advanceStringIndex(
              S,
              _toLength(rx.lastIndex),
              fullUnicode
            );
          n++;
        }
        return n === 0 ? null : A;
      }
    ]);

  const _this$1;

  const operationTypeRe = /^\s*(query|mutation|subscription|\{)/;

  const getOperationTypeFromMatched = function getOperationTypeFromMatched(
    matched
  ) {
    newArrowCheck(this, _this$1);

    return matched === "{" ? "query" : matched;
  }.bind(undefined);
  /**
   * Returns the type (query, mutation, or subscription) of the given operation
   *
   * @example
   *
   * const operation = `
   *   subscription userSubscription($userId: ID!) {
   *     user(userId: $userId) {
   *       id
   *       name
   *     }
   *   }
   * `;
   *
   * const operationType = getOperationType(operation);
   *
   * console.log(operationType); // "subscription"
   */

  const getOperationType = function getOperationType(operation) {
    newArrowCheck(this, _this$1);

    const result = operation.match(operationTypeRe);

    if (!result) {
      throw new TypeError("Invalid operation:\n".concat(operation));
    }

    return getOperationTypeFromMatched(result[1]);
  }.bind(undefined);

  const $some = _arrayMethods(3);

  _export(_export.P + _export.F * !_strictMethod([].some, true), "Array", {
    // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
    some: function some(callbackfn /* , thisArg */) {
      return $some(this, callbackfn, arguments[1]);
    }
  });

  const _this$2;

  const isSubscription = function isSubscription(definition) {
    newArrowCheck(this, _this$2);

    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  }.bind(undefined);
  /**
   * Returns true if documentNode has a subscription or false otherwise
   */

  const hasSubscription = function hasSubscription(documentNode) {
    newArrowCheck(this, _this$2);

    return documentNode.definitions.some(isSubscription);
  }.bind(undefined);

  const _this$3;

  /**
   * Creates a GqlRequest using given GqlRequestCompat
   *
   * @param {GqlRequestCompat<Variables>} gqlRequestCompat
   *
   * @return {GqlRequest<Variables>}
   *
   * @example
   * const query = `
   *   query userQuery($userId: ID!) {
   *     user(userId: $userId) {
   *       id
   *       email
   *     }
   *   }
   * `;
   *
   * console.log(requestFromCompat({query, variables: {userId: 10}}));
   * // {operation: "...", variables: {userId: 10}}
   */
  const requestFromCompat = function requestFromCompat(_ref) {
    const operation = _ref.query;

    let variables = _ref.variables;

    newArrowCheck(this, _this$3);

    return variables
      ? {
          operation,
          variables
        }
      : {
          operation
        };
  }.bind(undefined);

  const _this$4;

  /**
   * Creates a GqlRequest using given GqlRequestCompat
   *
   * @param {GqlRequest<Variables>} gqlRequest
   *
   * @return {GqlRequestCompat<Variables>}
   *
   * @example
   * const operation = `
   *   query userQuery($userId: ID!) {
   *     user(userId: $userId) {
   *       id
   *       email
   *     }
   *   }
   * `;
   *
   * console.log(requestToCompat({operation, variables: {userId: 10}}));
   * // {query: "...", variables: {userId: 10}}
   */
  const requestToCompat = function requestToCompat(_ref) {
    const query = _ref.operation;

    let variables = _ref.variables;

    newArrowCheck(this, _this$4);

    return variables
      ? {
          query,
          variables
        }
      : {
          query
        };
  }.bind(undefined);

  exports.errorsToString = errorsToString;
  exports.getOperationType = getOperationType;
  exports.hasSubscription = hasSubscription;
  exports.requestFromCompat = requestFromCompat;
  exports.requestToCompat = requestToCompat;

  Object.defineProperty(exports, "__esModule", {value: true});
});
// # sourceMappingURL=index.js.map
