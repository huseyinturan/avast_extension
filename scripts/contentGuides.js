/*! For license information please see contentGuides.js.LICENSE.txt */
(() => {
  var e = {
      6698: (e, t, n) => {
        "use strict";
        var r = n(5318);
        t.default = void 0;
        var s = r(n(8)),
          a = n(891),
          i = {
            name: "sprintf",
            type: "postProcessor",
            process: function (e, t, n) {
              return n.sprintf
                ? "[object Array]" ===
                  Object.prototype.toString.apply(n.sprintf)
                  ? (0, a.vsprintf)(e, n.sprintf)
                  : "object" === (0, s.default)(n.sprintf)
                  ? (0, a.sprintf)(e, n.sprintf)
                  : e
                : e;
            },
            overloadTranslationOptionHandler: function (e) {
              for (var t = [], n = 1; n < e.length; n++) t.push(e[n]);
              return { postProcess: "sprintf", sprintf: t };
            },
          };
        t.default = i;
      },
      891: (e, t, n) => {
        "use strict";
        var r = n(5318);
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.sprintf = i),
          (t.vsprintf = function (e, t) {
            return i.apply(null, [e].concat(t || []));
          });
        var s = r(n(8)),
          a = {
            not_string: /[^s]/,
            not_bool: /[^t]/,
            not_type: /[^T]/,
            not_primitive: /[^v]/,
            number: /[diefg]/,
            numeric_arg: /[bcdiefguxX]/,
            json: /[j]/,
            not_json: /[^j]/,
            text: /^[^\x25]+/,
            modulo: /^\x25{2}/,
            placeholder:
              /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
            key: /^([a-z_][a-z_\d]*)/i,
            key_access: /^\.([a-z_][a-z_\d]*)/i,
            index_access: /^\[(\d+)\]/,
            sign: /^[+-]/,
          };
        function i(e) {
          var t = i.cache;
          return (
            (t[e] && t.hasOwnProperty(e)) || (t[e] = i.parse(e)),
            i.format(i.parse(e), arguments)
          );
        }
        (i.format = function (e, t) {
          var n,
            r,
            o,
            u,
            d,
            l,
            c,
            _,
            h,
            m = 1,
            p = e.length,
            f = "";
          for (r = 0; r < p; r++)
            if ("string" == typeof e[r]) f += e[r];
            else if ("object" === (0, s.default)(e[r])) {
              if ((u = e[r]).keys)
                for (n = t[m], o = 0; o < u.keys.length; o++) {
                  if (null == n)
                    throw new Error(
                      i(
                        '[sprintf] Cannot access property "%s" of undefined value "%s"',
                        u.keys[o],
                        u.keys[o - 1]
                      )
                    );
                  n = n[u.keys[o]];
                }
              else n = u.param_no ? t[u.param_no] : t[m++];
              if (
                (a.not_type.test(u.type) &&
                  a.not_primitive.test(u.type) &&
                  n instanceof Function &&
                  (n = n()),
                a.numeric_arg.test(u.type) && "number" != typeof n && isNaN(n))
              )
                throw new TypeError(
                  i("[sprintf] expecting number but found %T", n)
                );
              switch ((a.number.test(u.type) && (_ = n >= 0), u.type)) {
                case "b":
                  n = parseInt(n, 10).toString(2);
                  break;
                case "c":
                  n = String.fromCharCode(parseInt(n, 10));
                  break;
                case "d":
                case "i":
                  n = parseInt(n, 10);
                  break;
                case "j":
                  n = JSON.stringify(n, null, u.width ? parseInt(u.width) : 0);
                  break;
                case "e":
                  n = u.precision
                    ? parseFloat(n).toExponential(u.precision)
                    : parseFloat(n).toExponential();
                  break;
                case "f":
                  n = u.precision
                    ? parseFloat(n).toFixed(u.precision)
                    : parseFloat(n);
                  break;
                case "g":
                  n = u.precision
                    ? String(Number(n.toPrecision(u.precision)))
                    : parseFloat(n);
                  break;
                case "o":
                  n = (parseInt(n, 10) >>> 0).toString(8);
                  break;
                case "s":
                  (n = String(n)),
                    (n = u.precision ? n.substring(0, u.precision) : n);
                  break;
                case "t":
                  (n = String(!!n)),
                    (n = u.precision ? n.substring(0, u.precision) : n);
                  break;
                case "T":
                  (n = Object.prototype.toString
                    .call(n)
                    .slice(8, -1)
                    .toLowerCase()),
                    (n = u.precision ? n.substring(0, u.precision) : n);
                  break;
                case "u":
                  n = parseInt(n, 10) >>> 0;
                  break;
                case "v":
                  (n = n.valueOf()),
                    (n = u.precision ? n.substring(0, u.precision) : n);
                  break;
                case "x":
                  n = (parseInt(n, 10) >>> 0).toString(16);
                  break;
                case "X":
                  n = (parseInt(n, 10) >>> 0).toString(16).toUpperCase();
              }
              a.json.test(u.type)
                ? (f += n)
                : (!a.number.test(u.type) || (_ && !u.sign)
                    ? (h = "")
                    : ((h = _ ? "+" : "-"),
                      (n = n.toString().replace(a.sign, ""))),
                  (l = u.pad_char
                    ? "0" === u.pad_char
                      ? "0"
                      : u.pad_char.charAt(1)
                    : " "),
                  (c = u.width - (h + n).length),
                  (d = u.width && c > 0 ? l.repeat(c) : ""),
                  (f += u.align
                    ? h + n + d
                    : "0" === l
                    ? h + d + n
                    : d + h + n));
            }
          return f;
        }),
          (i.cache = {}),
          (i.parse = function (e) {
            if (i.cache[e]) return i.cache[e];
            for (var t, n = e, r = [], s = 0; n; ) {
              if (null !== (t = a.text.exec(n))) r.push(t[0]);
              else if (null !== (t = a.modulo.exec(n))) r.push("%");
              else {
                if (null === (t = a.placeholder.exec(n)))
                  throw new SyntaxError("[sprintf] unexpected placeholder");
                if (t[2]) {
                  s |= 1;
                  var o = [],
                    u = t[2],
                    d = [];
                  if (null === (d = a.key.exec(u)))
                    throw new SyntaxError(
                      "[sprintf] failed to parse named argument key"
                    );
                  for (o.push(d[1]); "" !== (u = u.substring(d[0].length)); )
                    if (null !== (d = a.key_access.exec(u))) o.push(d[1]);
                    else {
                      if (null === (d = a.index_access.exec(u)))
                        throw new SyntaxError(
                          "[sprintf] failed to parse named argument key"
                        );
                      o.push(d[1]);
                    }
                  t[2] = o;
                } else s |= 2;
                if (3 === s)
                  throw new Error(
                    "[sprintf] mixing positional and named placeholders is not (yet) supported"
                  );
                r.push({
                  placeholder: t[0],
                  param_no: t[1],
                  keys: t[2],
                  sign: t[3],
                  pad_char: t[4],
                  align: t[5],
                  width: t[6],
                  precision: t[7],
                  type: t[8],
                });
              }
              n = n.substring(t[0].length);
            }
            return (i.cache[e] = r);
          });
      },
      1076: (e, t, n) => {
        e.exports = n(6698).default;
      },
      6146: (e, t, n) => {
        "use strict";
        t.hd = void 0;
        var r = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var r = t[n];
                (r.enumerable = r.enumerable || !1),
                  (r.configurable = !0),
                  "value" in r && (r.writable = !0),
                  Object.defineProperty(e, r.key, r);
              }
            }
            return function (t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t;
            };
          })(),
          s =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                },
          a = _(n(4470)),
          i = _(n(381)),
          o = _(n(2353)),
          u = _(n(7794)),
          d = _(n(1076)),
          l = _(n(586)),
          c = _(n(8872));
        function _(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var h = l.default,
          m = (l.default.localStorage, {}),
          p = {},
          f = {},
          y = {},
          g = null,
          M = null,
          L = void 0;
        function v(e) {
          return e
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
        }
        function Y(e, t) {
          return "string" == typeof e &&
            "number" == typeof t &&
            t > 3 &&
            e.length >= t
            ? e.substr(0, t - 3) + "..."
            : e;
        }
        function b(e, t) {
          for (
            var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), a = 2;
            a < n;
            a++
          )
            r[a - 2] = arguments[a];
          if (!y[e] && !p.resources)
            return (
              '<span class="__nls__ __nls__MISSINGSTRING">⚐&nbsp;' +
              e +
              "</span>"
            );
          if (p.resources) {
            var i = {
                postProcess: "sprintf",
                sprintf: (r = r.map(function (e) {
                  return v(e + "");
                })),
              },
              o = u.default.t(e, i),
              d = void 0;
            return (
              "number" == typeof t
                ? ((i.count = t), (d = u.default.t(e, i)))
                : null !== t &&
                  "object" === (void 0 === t ? "undefined" : s(t)) &&
                  void 0 === t.length &&
                  (i.sprintf.length > 1
                    ? (i.sprintf.shift(), Object.assign(i, t))
                    : (i = t),
                  (d = u.default.t(e, i))),
              w(d || o)
            );
          }
          var l = y[e],
            c = L.translate(l);
          return (
            (c = c.withContext(e)),
            "number" == typeof t && (c = c.ifPlural(t)),
            (r = r.map(function (e) {
              return v(e + "");
            })),
            w(c.fetch.apply(c, r))
          );
        }
        function k(e, t, n) {
          return (
            (h.__TRANSLATE || h.__LOCALIZED) &&
              (t = (function (e, t) {
                return t;
              })(0, t)),
            n && n.ellipsis && (t = Y(t, n.ellipsis)),
            t
          );
        }
        function w(e) {
          return e ? e.replace(/(?:\r|\n)/g, "<br />") : e;
        }
        var D = (function () {
            function e() {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
                (this.moment = i.default);
            }
            return (
              r(e, [
                {
                  key: "direction",
                  value: function () {
                    return p.resources
                      ? u.default.dir(g)
                      : c.default.indexOf(g) > -1
                      ? "rtl"
                      : "ltr";
                  },
                },
                {
                  key: "register",
                  value: function (e, t) {
                    if (e.resources)
                      return (0, a.default)(!0, f, e), this.register_lng(e, t);
                    for (var n in e) {
                      if (n.indexOf("_") > -1 && e[n].locale_data)
                        for (var r in e[n].locale_data.messages)
                          "" == e[n].locale_data.messages[r][0] &&
                            delete e[n].locale_data.messages[r];
                      e[n.toLowerCase()] = e[n];
                    }
                    (0, a.default)(!0, f, e), (m = e);
                  },
                },
                {
                  key: "register_lng",
                  value: function (e, t) {
                    (0, a.default)(!0, f, e), (p = e);
                  },
                },
                {
                  key: "nls",
                  value: function (e) {
                    for (
                      var t = arguments.length,
                        n = Array(t > 1 ? t - 1 : 0),
                        r = 1;
                      r < t;
                      r++
                    )
                      n[r - 1] = arguments[r];
                    var s = n && n[0];
                    try {
                      return k(0, b.apply(null, [e, s].concat(n)), s);
                    } catch (e) {
                      throw e;
                    }
                  },
                },
                {
                  key: "nlsc",
                  value: function (e, t) {
                    try {
                      for (
                        var n = arguments.length,
                          r = Array(n > 2 ? n - 2 : 0),
                          s = 2;
                        s < n;
                        s++
                      )
                        r[s - 2] = arguments[s];
                      return k(0, b.apply(null, [e, t].concat(r)), t);
                    } catch (e) {
                      throw e;
                    }
                  },
                },
                {
                  key: "nlsRaw",
                  value: function (e) {
                    var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : M;
                    t = t.toLowerCase();
                    var n = e + "" + y[e],
                      r = t.split("_")[0];
                    if (f.resources) {
                      if (s(t, e)) return [f.resources[t].translation[e]];
                      if (s(r, e)) return [f.resources[r].translation[e]];
                    } else {
                      if (s(t, n)) return f[t].locale_data.messages[n];
                      if (s(r, n)) return f[r].locale_data.messages[n];
                    }
                    return null;
                    function s(e, t) {
                      return f.resources
                        ? f.resources &&
                            f.resources[e] &&
                            f.resources[e].translation &&
                            f.resources[e].translation[t] &&
                            "" !== f.resources[e].translation[t]
                        : !(!f[e] || !f[e].locale_data.messages[t]) &&
                            f[e].locale_data.messages[t].some(function (e) {
                              return null != e && "" !== e;
                            });
                    }
                  },
                },
                {
                  key: "escapeHtml",
                  value: function (e) {
                    return v(e + "");
                  },
                },
                {
                  key: "ellipsis",
                  value: function () {
                    return Y.apply(null, arguments);
                  },
                },
                {
                  key: "TRANSLATE",
                  get: function () {
                    return h.debuggerTRANSLATE;
                  },
                  set: function (e) {
                    h.debuggerTRANSLATE = e;
                  },
                },
                {
                  key: "locale",
                  get: function () {
                    return g;
                  },
                  set: function (e) {
                    var t,
                      n,
                      r = e.replace("-", "_"),
                      s = r.split("_")[0],
                      l = r.split("_")[1],
                      c = s + (l ? "_" + l.toUpperCase() : ""),
                      _ = void 0;
                    if ((M != r || g != s) && null != s) {
                      i.default.locale(e), (M = r), (g = s);
                      p.resources &&
                        ((e = (function (e) {
                          var t = e;
                          if (p.resources[e]) return e;
                          if (
                            (/-/.test(e)
                              ? (e = e.replace("-", "_"))
                              : /_/.test(e) && (e = e.replace("_", "-")),
                            p.resources[e])
                          )
                            return e;
                          var n = e.split(/[-_]/);
                          return (
                            (e = [n[0], n[1].toUpperCase()].join("_")),
                            p.resources[e]
                              ? e
                              : ((e = e.replace("_", "-")),
                                p.resources[e]
                                  ? e
                                  : ((e = n[0]), p.resources[e] ? e : t))
                          );
                        })(e)),
                        u.default
                          .use(d.default)
                          .init({
                            resources: p.resources,
                            lng: e,
                            keySeparator: !1,
                            fallbackLng: "en",
                          })),
                        (n = {
                          domain: "messages",
                          locale_data: {
                            messages: {
                              "": {
                                domain: "messages",
                                plural_forms: void 0,
                                lang: g,
                              },
                            },
                          },
                        }),
                        (m[c] = (0, a.default)(
                          !0,
                          {},
                          n,
                          m.en,
                          m[g],
                          m[g + "_" + g.toUpperCase()],
                          m[c]
                        )),
                        (t = m[c]),
                        m.en &&
                          m.en.locale_data &&
                          m.en.locale_data.messages &&
                          Object.keys(m.en.locale_data.messages).forEach(
                            function (e) {
                              e && ((_ = e.split("")), (y[_[0]] = _[1]));
                            }
                          ),
                        (L = new o.default({
                          domain: t.domain,
                          missing_key_callback: function (e) {},
                          locale_data: t.locale_data,
                        }));
                    }
                  },
                },
              ]),
              e
            );
          })(),
          T = (h._NITRO_LOCALIZATION = h._NITRO_LOCALIZATION
            ? h._NITRO_LOCALIZATION
            : new D());
        t.ZP = T;
        (t.hd = T.nls), T.nlsc, T.escapeHtml, T.ellipsis;
      },
      5318: (e) => {
        (e.exports = function (e) {
          return e && e.__esModule ? e : { default: e };
        }),
          (e.exports.__esModule = !0),
          (e.exports.default = e.exports);
      },
      8: (e) => {
        function t(n) {
          return (
            (e.exports = t =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            (e.exports.__esModule = !0),
            (e.exports.default = e.exports),
            t(n)
          );
        }
        (e.exports = t),
          (e.exports.__esModule = !0),
          (e.exports.default = e.exports);
      },
      4470: (e) => {
        "use strict";
        var t = Object.prototype.hasOwnProperty,
          n = Object.prototype.toString,
          r = function (e) {
            return "function" == typeof Array.isArray
              ? Array.isArray(e)
              : "[object Array]" === n.call(e);
          },
          s = function (e) {
            if (!e || "[object Object]" !== n.call(e)) return !1;
            var r,
              s = t.call(e, "constructor"),
              a =
                e.constructor &&
                e.constructor.prototype &&
                t.call(e.constructor.prototype, "isPrototypeOf");
            if (e.constructor && !s && !a) return !1;
            for (r in e);
            return void 0 === r || t.call(e, r);
          };
        e.exports = function e() {
          var t,
            n,
            a,
            i,
            o,
            u,
            d = arguments[0],
            l = 1,
            c = arguments.length,
            _ = !1;
          for (
            "boolean" == typeof d
              ? ((_ = d), (d = arguments[1] || {}), (l = 2))
              : (("object" != typeof d && "function" != typeof d) ||
                  null == d) &&
                (d = {});
            l < c;
            ++l
          )
            if (null != (t = arguments[l]))
              for (n in t)
                (a = d[n]),
                  d !== (i = t[n]) &&
                    (_ && i && (s(i) || (o = r(i)))
                      ? (o
                          ? ((o = !1), (u = a && r(a) ? a : []))
                          : (u = a && s(a) ? a : {}),
                        (d[n] = e(_, u, i)))
                      : void 0 !== i && (d[n] = i));
          return d;
        };
      },
      7794: (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            changeLanguage: () => ue,
            cloneInstance: () => de,
            createInstance: () => le,
            default: () => oe,
            dir: () => ce,
            exists: () => _e,
            getFixedT: () => he,
            init: () => me,
            loadLanguages: () => pe,
            loadNamespaces: () => fe,
            loadResources: () => ye,
            off: () => ge,
            on: () => Me,
            setDefaultNamespace: () => Le,
            t: () => ve,
            use: () => Ye,
          });
        var r =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          };
        function s(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        var a = {
          type: "logger",
          log: function (e) {
            this.output("log", e);
          },
          warn: function (e) {
            this.output("warn", e);
          },
          error: function (e) {
            this.output("error", e);
          },
          output: function (e, t) {
            var n;
            console &&
              console[e] &&
              (n = console)[e].apply(
                n,
                (function (e) {
                  if (Array.isArray(e)) {
                    for (var t = 0, n = Array(e.length); t < e.length; t++)
                      n[t] = e[t];
                    return n;
                  }
                  return Array.from(e);
                })(t)
              );
          },
        };
        const i = new ((function () {
          function e(t) {
            var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            s(this, e), this.init(t, n);
          }
          return (
            (e.prototype.init = function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
              (this.prefix = t.prefix || "i18next:"),
                (this.logger = e || a),
                (this.options = t),
                (this.debug = t.debug);
            }),
            (e.prototype.setDebug = function (e) {
              this.debug = e;
            }),
            (e.prototype.log = function () {
              for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
              return this.forward(t, "log", "", !0);
            }),
            (e.prototype.warn = function () {
              for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
              return this.forward(t, "warn", "", !0);
            }),
            (e.prototype.error = function () {
              for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
              return this.forward(t, "error", "");
            }),
            (e.prototype.deprecate = function () {
              for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
              return this.forward(t, "warn", "WARNING DEPRECATED: ", !0);
            }),
            (e.prototype.forward = function (e, t, n, r) {
              return r && !this.debug
                ? null
                : ("string" == typeof e[0] &&
                    (e[0] = "" + n + this.prefix + " " + e[0]),
                  this.logger[t](e));
            }),
            (e.prototype.create = function (t) {
              return new e(
                this.logger,
                r({ prefix: this.prefix + ":" + t + ":" }, this.options)
              );
            }),
            e
          );
        })())();
        const o = (function () {
          function e() {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
              (this.observers = {});
          }
          return (
            (e.prototype.on = function (e, t) {
              var n = this;
              e.split(" ").forEach(function (e) {
                (n.observers[e] = n.observers[e] || []), n.observers[e].push(t);
              });
            }),
            (e.prototype.off = function (e, t) {
              var n = this;
              this.observers[e] &&
                this.observers[e].forEach(function () {
                  if (t) {
                    var r = n.observers[e].indexOf(t);
                    r > -1 && n.observers[e].splice(r, 1);
                  } else delete n.observers[e];
                });
            }),
            (e.prototype.emit = function (e) {
              for (
                var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1;
                r < t;
                r++
              )
                n[r - 1] = arguments[r];
              if (this.observers[e]) {
                var s = [].concat(this.observers[e]);
                s.forEach(function (e) {
                  e.apply(void 0, n);
                });
              }
              if (this.observers["*"]) {
                var a = [].concat(this.observers["*"]);
                a.forEach(function (t) {
                  var r;
                  t.apply(t, (r = [e]).concat.apply(r, n));
                });
              }
            }),
            e
          );
        })();
        function u(e) {
          return null == e ? "" : "" + e;
        }
        function d(e, t, n) {
          e.forEach(function (e) {
            t[e] && (n[e] = t[e]);
          });
        }
        function l(e, t, n) {
          function r(e) {
            return e && e.indexOf("###") > -1 ? e.replace(/###/g, ".") : e;
          }
          function s() {
            return !e || "string" == typeof e;
          }
          for (
            var a = "string" != typeof t ? [].concat(t) : t.split(".");
            a.length > 1;

          ) {
            if (s()) return {};
            var i = r(a.shift());
            !e[i] && n && (e[i] = new n()), (e = e[i]);
          }
          return s() ? {} : { obj: e, k: r(a.shift()) };
        }
        function c(e, t, n) {
          var r = l(e, t, Object);
          r.obj[r.k] = n;
        }
        function _(e, t) {
          var n = l(e, t),
            r = n.obj,
            s = n.k;
          if (r) return r[s];
        }
        function h(e, t, n) {
          for (var r in t)
            r in e
              ? "string" == typeof e[r] ||
                e[r] instanceof String ||
                "string" == typeof t[r] ||
                t[r] instanceof String
                ? n && (e[r] = t[r])
                : h(e[r], t[r], n)
              : (e[r] = t[r]);
          return e;
        }
        function m(e) {
          return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
        var p = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
          "/": "&#x2F;",
        };
        function f(e) {
          return "string" == typeof e
            ? e.replace(/[&<>"'\/]/g, function (e) {
                return p[e];
              })
            : e;
        }
        var y =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          };
        function g(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function M(e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
        }
        function L(e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
            t &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(e, t)
                : (function (e, t) {
                    for (
                      var n = Object.getOwnPropertyNames(t), r = 0;
                      r < n.length;
                      r++
                    ) {
                      var s = n[r],
                        a = Object.getOwnPropertyDescriptor(t, s);
                      a &&
                        a.configurable &&
                        void 0 === e[s] &&
                        Object.defineProperty(e, s, a);
                    }
                  })(e, t));
        }
        const v = (function (e) {
            function t() {
              var n =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                r =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : { ns: ["translation"], defaultNS: "translation" };
              g(this, t);
              var s = M(this, e.call(this));
              return (s.data = n), (s.options = r), s;
            }
            return (
              L(t, e),
              (t.prototype.addNamespaces = function (e) {
                this.options.ns.indexOf(e) < 0 && this.options.ns.push(e);
              }),
              (t.prototype.removeNamespaces = function (e) {
                var t = this.options.ns.indexOf(e);
                t > -1 && this.options.ns.splice(t, 1);
              }),
              (t.prototype.getResource = function (e, t, n) {
                var r =
                    arguments.length > 3 && void 0 !== arguments[3]
                      ? arguments[3]
                      : {},
                  s = r.keySeparator || this.options.keySeparator;
                void 0 === s && (s = ".");
                var a = [e, t];
                return (
                  n && "string" != typeof n && (a = a.concat(n)),
                  n &&
                    "string" == typeof n &&
                    (a = a.concat(s ? n.split(s) : n)),
                  e.indexOf(".") > -1 && (a = e.split(".")),
                  _(this.data, a)
                );
              }),
              (t.prototype.addResource = function (e, t, n, r) {
                var s =
                    arguments.length > 4 && void 0 !== arguments[4]
                      ? arguments[4]
                      : { silent: !1 },
                  a = this.options.keySeparator;
                void 0 === a && (a = ".");
                var i = [e, t];
                n && (i = i.concat(a ? n.split(a) : n)),
                  e.indexOf(".") > -1 && ((r = t), (t = (i = e.split("."))[1])),
                  this.addNamespaces(t),
                  c(this.data, i, r),
                  s.silent || this.emit("added", e, t, n, r);
              }),
              (t.prototype.addResources = function (e, t, n) {
                for (var r in n)
                  "string" == typeof n[r] &&
                    this.addResource(e, t, r, n[r], { silent: !0 });
                this.emit("added", e, t, n);
              }),
              (t.prototype.addResourceBundle = function (e, t, n, r, s) {
                var a = [e, t];
                e.indexOf(".") > -1 &&
                  ((r = n), (n = t), (t = (a = e.split("."))[1])),
                  this.addNamespaces(t);
                var i = _(this.data, a) || {};
                r ? h(i, n, s) : (i = y({}, i, n)),
                  c(this.data, a, i),
                  this.emit("added", e, t, n);
              }),
              (t.prototype.removeResourceBundle = function (e, t) {
                this.hasResourceBundle(e, t) && delete this.data[e][t],
                  this.removeNamespaces(t),
                  this.emit("removed", e, t);
              }),
              (t.prototype.hasResourceBundle = function (e, t) {
                return void 0 !== this.getResource(e, t);
              }),
              (t.prototype.getResourceBundle = function (e, t) {
                return (
                  t || (t = this.options.defaultNS),
                  "v1" === this.options.compatibilityAPI
                    ? y({}, this.getResource(e, t))
                    : this.getResource(e, t)
                );
              }),
              (t.prototype.toJSON = function () {
                return this.data;
              }),
              t
            );
          })(o),
          Y = {
            processors: {},
            addPostProcessor: function (e) {
              this.processors[e.name] = e;
            },
            handle: function (e, t, n, r, s) {
              var a = this;
              return (
                e.forEach(function (e) {
                  a.processors[e] && (t = a.processors[e].process(t, n, r, s));
                }),
                t
              );
            },
          };
        function b(e) {
          return (
            (e.interpolation = { unescapeSuffix: "HTML" }),
            (e.interpolation.prefix = e.interpolationPrefix || "__"),
            (e.interpolation.suffix = e.interpolationSuffix || "__"),
            (e.interpolation.escapeValue = e.escapeInterpolation || !1),
            (e.interpolation.nestingPrefix = e.reusePrefix || "$t("),
            (e.interpolation.nestingSuffix = e.reuseSuffix || ")"),
            e
          );
        }
        function k(e) {
          return (
            (e.interpolationPrefix ||
              e.interpolationSuffix ||
              void 0 !== e.escapeInterpolation) &&
              (e = b(e)),
            (e.nsSeparator = e.nsseparator),
            (e.keySeparator = e.keyseparator),
            (e.returnObjects = e.returnObjectTrees),
            e
          );
        }
        var w =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            },
          D =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                };
        function T(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function S(e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
        }
        function x(e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
            t &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(e, t)
                : (function (e, t) {
                    for (
                      var n = Object.getOwnPropertyNames(t), r = 0;
                      r < n.length;
                      r++
                    ) {
                      var s = n[r],
                        a = Object.getOwnPropertyDescriptor(t, s);
                      a &&
                        a.configurable &&
                        void 0 === e[s] &&
                        Object.defineProperty(e, s, a);
                    }
                  })(e, t));
        }
        const j = (function (e) {
          function t(n) {
            var r =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            T(this, t);
            var s = S(this, e.call(this));
            return (
              d(
                [
                  "resourceStore",
                  "languageUtils",
                  "pluralResolver",
                  "interpolator",
                  "backendConnector",
                ],
                n,
                s
              ),
              (s.options = r),
              (s.logger = i.create("translator")),
              s
            );
          }
          return (
            x(t, e),
            (t.prototype.changeLanguage = function (e) {
              e && (this.language = e);
            }),
            (t.prototype.exists = function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : { interpolation: {} };
              return (
                "v1" === this.options.compatibilityAPI && (t = k(t)),
                void 0 !== this.resolve(e, t)
              );
            }),
            (t.prototype.extractFromKey = function (e, t) {
              var n = t.nsSeparator || this.options.nsSeparator;
              void 0 === n && (n = ":");
              var r = t.keySeparator || this.options.keySeparator || ".",
                s = t.ns || this.options.defaultNS;
              if (n && e.indexOf(n) > -1) {
                var a = e.split(n);
                (n !== r || (n === r && this.options.ns.indexOf(a[0]) > -1)) &&
                  (s = a.shift()),
                  (e = a.join(r));
              }
              return (
                "string" == typeof s && (s = [s]), { key: e, namespaces: s }
              );
            }),
            (t.prototype.translate = function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
              if (
                ("object" !== (void 0 === t ? "undefined" : D(t))
                  ? (t =
                      this.options.overloadTranslationOptionHandler(arguments))
                  : "v1" === this.options.compatibilityAPI && (t = k(t)),
                null == e || "" === e)
              )
                return "";
              "number" == typeof e && (e = String(e)),
                "string" == typeof e && (e = [e]);
              var n = t.keySeparator || this.options.keySeparator || ".",
                r = this.extractFromKey(e[e.length - 1], t),
                s = r.key,
                a = r.namespaces,
                i = a[a.length - 1],
                o = t.lng || this.language,
                u =
                  t.appendNamespaceToCIMode ||
                  this.options.appendNamespaceToCIMode;
              if (o && "cimode" === o.toLowerCase()) {
                if (u) {
                  var d = t.nsSeparator || this.options.nsSeparator;
                  return i + d + s;
                }
                return s;
              }
              var l = this.resolve(e, t),
                c = Object.prototype.toString.apply(l),
                _ = ["[object Number]", "[object Function]", "[object RegExp]"],
                h =
                  void 0 !== t.joinArrays
                    ? t.joinArrays
                    : this.options.joinArrays;
              if (
                l &&
                "string" != typeof l &&
                _.indexOf(c) < 0 &&
                (!h || "[object Array]" !== c)
              ) {
                if (!t.returnObjects && !this.options.returnObjects)
                  return (
                    this.logger.warn(
                      "accessing an object - but returnObjects options is not enabled!"
                    ),
                    this.options.returnedObjectHandler
                      ? this.options.returnedObjectHandler(s, l, t)
                      : "key '" +
                        s +
                        " (" +
                        this.language +
                        ")' returned an object instead of string."
                  );
                if (t.keySeparator || this.options.keySeparator) {
                  var m = "[object Array]" === c ? [] : {};
                  for (var p in l)
                    Object.prototype.hasOwnProperty.call(l, p) &&
                      (m[p] = this.translate(
                        "" + s + n + p,
                        w({}, t, { joinArrays: !1, ns: a })
                      ));
                  l = m;
                }
              } else if (h && "[object Array]" === c)
                (l = l.join(h)) && (l = this.extendTranslation(l, s, t));
              else {
                var f = !1,
                  y = !1;
                if (
                  (this.isValidLookup(l) ||
                    void 0 === t.defaultValue ||
                    ((f = !0), (l = t.defaultValue)),
                  this.isValidLookup(l) || ((y = !0), (l = s)),
                  y || f)
                ) {
                  this.logger.log("missingKey", o, i, s, l);
                  var g = [],
                    M = this.languageUtils.getFallbackCodes(
                      this.options.fallbackLng,
                      t.lng || this.language
                    );
                  if ("fallback" === this.options.saveMissingTo && M && M[0])
                    for (var L = 0; L < M.length; L++) g.push(M[L]);
                  else
                    "all" === this.options.saveMissingTo
                      ? (g = this.languageUtils.toResolveHierarchy(
                          t.lng || this.language
                        ))
                      : g.push(t.lng || this.language);
                  this.options.saveMissing &&
                    (this.options.missingKeyHandler
                      ? this.options.missingKeyHandler(g, i, s, l)
                      : this.backendConnector &&
                        this.backendConnector.saveMissing &&
                        this.backendConnector.saveMissing(g, i, s, l)),
                    this.emit("missingKey", g, i, s, l);
                }
                (l = this.extendTranslation(l, s, t)),
                  y &&
                    l === s &&
                    this.options.appendNamespaceToMissingKey &&
                    (l = i + ":" + s),
                  y &&
                    this.options.parseMissingKeyHandler &&
                    (l = this.options.parseMissingKeyHandler(l));
              }
              return l;
            }),
            (t.prototype.extendTranslation = function (e, t, n) {
              var r = this;
              n.interpolation &&
                this.interpolator.init(
                  w({}, n, {
                    interpolation: w(
                      {},
                      this.options.interpolation,
                      n.interpolation
                    ),
                  })
                );
              var s = n.replace && "string" != typeof n.replace ? n.replace : n;
              this.options.interpolation.defaultVariables &&
                (s = w({}, this.options.interpolation.defaultVariables, s)),
                (e = this.interpolator.interpolate(
                  e,
                  s,
                  n.lng || this.language
                )),
                !1 !== n.nest &&
                  (e = this.interpolator.nest(
                    e,
                    function () {
                      return r.translate.apply(r, arguments);
                    },
                    n
                  )),
                n.interpolation && this.interpolator.reset();
              var a = n.postProcess || this.options.postProcess,
                i = "string" == typeof a ? [a] : a;
              return (
                void 0 !== e &&
                  i &&
                  i.length &&
                  !1 !== n.applyPostProcessor &&
                  (e = Y.handle(i, e, t, n, this)),
                e
              );
            }),
            (t.prototype.resolve = function (e) {
              var t = this,
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                r = void 0;
              return (
                "string" == typeof e && (e = [e]),
                e.forEach(function (e) {
                  if (!t.isValidLookup(r)) {
                    var s = t.extractFromKey(e, n),
                      a = s.key,
                      i = s.namespaces;
                    t.options.fallbackNS &&
                      (i = i.concat(t.options.fallbackNS));
                    var o = void 0 !== n.count && "string" != typeof n.count,
                      u =
                        void 0 !== n.context &&
                        "string" == typeof n.context &&
                        "" !== n.context,
                      d = n.lngs
                        ? n.lngs
                        : t.languageUtils.toResolveHierarchy(
                            n.lng || t.language
                          );
                    i.forEach(function (e) {
                      t.isValidLookup(r) ||
                        d.forEach(function (s) {
                          if (!t.isValidLookup(r)) {
                            var i = a,
                              d = [i],
                              l = void 0;
                            o && (l = t.pluralResolver.getSuffix(s, n.count)),
                              o && u && d.push(i + l),
                              u &&
                                d.push(
                                  (i +=
                                    "" + t.options.contextSeparator + n.context)
                                ),
                              o && d.push((i += l));
                            for (var c = void 0; (c = d.pop()); )
                              t.isValidLookup(r) ||
                                (r = t.getResource(s, e, c, n));
                          }
                        });
                    });
                  }
                }),
                r
              );
            }),
            (t.prototype.isValidLookup = function (e) {
              return !(
                void 0 === e ||
                (!this.options.returnNull && null === e) ||
                (!this.options.returnEmptyString && "" === e)
              );
            }),
            (t.prototype.getResource = function (e, t, n) {
              var r =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : {};
              return this.resourceStore.getResource(e, t, n, r);
            }),
            t
          );
        })(o);
        function H(e) {
          return e.charAt(0).toUpperCase() + e.slice(1);
        }
        const P = (function () {
          function e(t) {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
              (this.options = t),
              (this.whitelist = this.options.whitelist || !1),
              (this.logger = i.create("languageUtils"));
          }
          return (
            (e.prototype.getScriptPartFromCode = function (e) {
              if (!e || e.indexOf("-") < 0) return null;
              var t = e.split("-");
              return 2 === t.length
                ? null
                : (t.pop(), this.formatLanguageCode(t.join("-")));
            }),
            (e.prototype.getLanguagePartFromCode = function (e) {
              if (!e || e.indexOf("-") < 0) return e;
              var t = e.split("-");
              return this.formatLanguageCode(t[0]);
            }),
            (e.prototype.formatLanguageCode = function (e) {
              if ("string" == typeof e && e.indexOf("-") > -1) {
                var t = [
                    "hans",
                    "hant",
                    "latn",
                    "cyrl",
                    "cans",
                    "mong",
                    "arab",
                  ],
                  n = e.split("-");
                return (
                  this.options.lowerCaseLng
                    ? (n = n.map(function (e) {
                        return e.toLowerCase();
                      }))
                    : 2 === n.length
                    ? ((n[0] = n[0].toLowerCase()),
                      (n[1] = n[1].toUpperCase()),
                      t.indexOf(n[1].toLowerCase()) > -1 &&
                        (n[1] = H(n[1].toLowerCase())))
                    : 3 === n.length &&
                      ((n[0] = n[0].toLowerCase()),
                      2 === n[1].length && (n[1] = n[1].toUpperCase()),
                      "sgn" !== n[0] &&
                        2 === n[2].length &&
                        (n[2] = n[2].toUpperCase()),
                      t.indexOf(n[1].toLowerCase()) > -1 &&
                        (n[1] = H(n[1].toLowerCase())),
                      t.indexOf(n[2].toLowerCase()) > -1 &&
                        (n[2] = H(n[2].toLowerCase()))),
                  n.join("-")
                );
              }
              return this.options.cleanCode || this.options.lowerCaseLng
                ? e.toLowerCase()
                : e;
            }),
            (e.prototype.isWhitelisted = function (e) {
              return (
                ("languageOnly" === this.options.load ||
                  this.options.nonExplicitWhitelist) &&
                  (e = this.getLanguagePartFromCode(e)),
                !this.whitelist ||
                  !this.whitelist.length ||
                  this.whitelist.indexOf(e) > -1
              );
            }),
            (e.prototype.getFallbackCodes = function (e, t) {
              if (!e) return [];
              if (
                ("string" == typeof e && (e = [e]),
                "[object Array]" === Object.prototype.toString.apply(e))
              )
                return e;
              if (!t) return e.default || [];
              var n = e[t];
              return (
                n || (n = e[this.getScriptPartFromCode(t)]),
                n || (n = e[this.formatLanguageCode(t)]),
                n || (n = e.default),
                n || []
              );
            }),
            (e.prototype.toResolveHierarchy = function (e, t) {
              var n = this,
                r = this.getFallbackCodes(
                  t || this.options.fallbackLng || [],
                  e
                ),
                s = [],
                a = function (e) {
                  e &&
                    (n.isWhitelisted(e)
                      ? s.push(e)
                      : n.logger.warn(
                          "rejecting non-whitelisted language code: " + e
                        ));
                };
              return (
                "string" == typeof e && e.indexOf("-") > -1
                  ? ("languageOnly" !== this.options.load &&
                      a(this.formatLanguageCode(e)),
                    "languageOnly" !== this.options.load &&
                      "currentOnly" !== this.options.load &&
                      a(this.getScriptPartFromCode(e)),
                    "currentOnly" !== this.options.load &&
                      a(this.getLanguagePartFromCode(e)))
                  : "string" == typeof e && a(this.formatLanguageCode(e)),
                r.forEach(function (e) {
                  s.indexOf(e) < 0 && a(n.formatLanguageCode(e));
                }),
                s
              );
            }),
            e
          );
        })();
        function O(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        var A = [
            {
              lngs: [
                "ach",
                "ak",
                "am",
                "arn",
                "br",
                "fil",
                "gun",
                "ln",
                "mfe",
                "mg",
                "mi",
                "oc",
                "tg",
                "ti",
                "tr",
                "uz",
                "wa",
              ],
              nr: [1, 2],
              fc: 1,
            },
            {
              lngs: [
                "af",
                "an",
                "ast",
                "az",
                "bg",
                "bn",
                "ca",
                "da",
                "de",
                "dev",
                "el",
                "en",
                "eo",
                "es",
                "es_ar",
                "et",
                "eu",
                "fi",
                "fo",
                "fur",
                "fy",
                "gl",
                "gu",
                "ha",
                "he",
                "hi",
                "hu",
                "hy",
                "ia",
                "it",
                "kn",
                "ku",
                "lb",
                "mai",
                "ml",
                "mn",
                "mr",
                "nah",
                "nap",
                "nb",
                "ne",
                "nl",
                "nn",
                "no",
                "nso",
                "pa",
                "pap",
                "pms",
                "ps",
                "pt",
                "pt_br",
                "rm",
                "sco",
                "se",
                "si",
                "so",
                "son",
                "sq",
                "sv",
                "sw",
                "ta",
                "te",
                "tk",
                "ur",
                "yo",
              ],
              nr: [1, 2],
              fc: 2,
            },
            {
              lngs: [
                "ay",
                "bo",
                "cgg",
                "fa",
                "id",
                "ja",
                "jbo",
                "ka",
                "kk",
                "km",
                "ko",
                "ky",
                "lo",
                "ms",
                "sah",
                "su",
                "th",
                "tt",
                "ug",
                "vi",
                "wo",
                "zh",
              ],
              nr: [1],
              fc: 3,
            },
            {
              lngs: ["be", "bs", "dz", "hr", "ru", "sr", "uk"],
              nr: [1, 2, 5],
              fc: 4,
            },
            { lngs: ["ar"], nr: [0, 1, 2, 3, 11, 100], fc: 5 },
            { lngs: ["cs", "sk"], nr: [1, 2, 5], fc: 6 },
            { lngs: ["csb", "pl"], nr: [1, 2, 5], fc: 7 },
            { lngs: ["cy"], nr: [1, 2, 3, 8], fc: 8 },
            { lngs: ["fr"], nr: [1, 2], fc: 9 },
            { lngs: ["ga"], nr: [1, 2, 3, 7, 11], fc: 10 },
            { lngs: ["gd"], nr: [1, 2, 3, 20], fc: 11 },
            { lngs: ["is"], nr: [1, 2], fc: 12 },
            { lngs: ["jv"], nr: [0, 1], fc: 13 },
            { lngs: ["kw"], nr: [1, 2, 3, 4], fc: 14 },
            { lngs: ["lt"], nr: [1, 2, 10], fc: 15 },
            { lngs: ["lv"], nr: [1, 2, 0], fc: 16 },
            { lngs: ["mk"], nr: [1, 2], fc: 17 },
            { lngs: ["mnk"], nr: [0, 1, 2], fc: 18 },
            { lngs: ["mt"], nr: [1, 2, 11, 20], fc: 19 },
            { lngs: ["or"], nr: [2, 1], fc: 2 },
            { lngs: ["ro"], nr: [1, 2, 20], fc: 20 },
            { lngs: ["sl"], nr: [5, 1, 2, 3], fc: 21 },
          ],
          E = {
            1: function (e) {
              return Number(e > 1);
            },
            2: function (e) {
              return Number(1 != e);
            },
            3: function (e) {
              return 0;
            },
            4: function (e) {
              return Number(
                e % 10 == 1 && e % 100 != 11
                  ? 0
                  : e % 10 >= 2 &&
                    e % 10 <= 4 &&
                    (e % 100 < 10 || e % 100 >= 20)
                  ? 1
                  : 2
              );
            },
            5: function (e) {
              return Number(
                0 === e
                  ? 0
                  : 1 == e
                  ? 1
                  : 2 == e
                  ? 2
                  : e % 100 >= 3 && e % 100 <= 10
                  ? 3
                  : e % 100 >= 11
                  ? 4
                  : 5
              );
            },
            6: function (e) {
              return Number(1 == e ? 0 : e >= 2 && e <= 4 ? 1 : 2);
            },
            7: function (e) {
              return Number(
                1 == e
                  ? 0
                  : e % 10 >= 2 &&
                    e % 10 <= 4 &&
                    (e % 100 < 10 || e % 100 >= 20)
                  ? 1
                  : 2
              );
            },
            8: function (e) {
              return Number(
                1 == e ? 0 : 2 == e ? 1 : 8 != e && 11 != e ? 2 : 3
              );
            },
            9: function (e) {
              return Number(e >= 2);
            },
            10: function (e) {
              return Number(
                1 == e ? 0 : 2 == e ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4
              );
            },
            11: function (e) {
              return Number(
                1 == e || 11 == e
                  ? 0
                  : 2 == e || 12 == e
                  ? 1
                  : e > 2 && e < 20
                  ? 2
                  : 3
              );
            },
            12: function (e) {
              return Number(e % 10 != 1 || e % 100 == 11);
            },
            13: function (e) {
              return Number(0 !== e);
            },
            14: function (e) {
              return Number(1 == e ? 0 : 2 == e ? 1 : 3 == e ? 2 : 3);
            },
            15: function (e) {
              return Number(
                e % 10 == 1 && e % 100 != 11
                  ? 0
                  : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20)
                  ? 1
                  : 2
              );
            },
            16: function (e) {
              return Number(e % 10 == 1 && e % 100 != 11 ? 0 : 0 !== e ? 1 : 2);
            },
            17: function (e) {
              return Number(1 == e || e % 10 == 1 ? 0 : 1);
            },
            18: function (e) {
              return Number(0 == e ? 0 : 1 == e ? 1 : 2);
            },
            19: function (e) {
              return Number(
                1 == e
                  ? 0
                  : 0 === e || (e % 100 > 1 && e % 100 < 11)
                  ? 1
                  : e % 100 > 10 && e % 100 < 20
                  ? 2
                  : 3
              );
            },
            20: function (e) {
              return Number(
                1 == e ? 0 : 0 === e || (e % 100 > 0 && e % 100 < 20) ? 1 : 2
              );
            },
            21: function (e) {
              return Number(
                e % 100 == 1
                  ? 1
                  : e % 100 == 2
                  ? 2
                  : e % 100 == 3 || e % 100 == 4
                  ? 3
                  : 0
              );
            },
          };
        function C() {
          var e = {};
          return (
            A.forEach(function (t) {
              t.lngs.forEach(function (n) {
                e[n] = { numbers: t.nr, plurals: E[t.fc] };
              });
            }),
            e
          );
        }
        const N = (function () {
          function e(t) {
            var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            O(this, e),
              (this.languageUtils = t),
              (this.options = n),
              (this.logger = i.create("pluralResolver")),
              (this.rules = C());
          }
          return (
            (e.prototype.addRule = function (e, t) {
              this.rules[e] = t;
            }),
            (e.prototype.getRule = function (e) {
              return this.rules[this.languageUtils.getLanguagePartFromCode(e)];
            }),
            (e.prototype.needsPlural = function (e) {
              var t = this.getRule(e);
              return t && t.numbers.length > 1;
            }),
            (e.prototype.getSuffix = function (e, t) {
              var n = this,
                r = this.getRule(e);
              if (r) {
                if (1 === r.numbers.length) return "";
                var s = r.noAbs ? r.plurals(t) : r.plurals(Math.abs(t)),
                  a = r.numbers[s];
                this.options.simplifyPluralSuffix &&
                  2 === r.numbers.length &&
                  1 === r.numbers[0] &&
                  (2 === a ? (a = "plural") : 1 === a && (a = ""));
                var i = function () {
                  return n.options.prepend && a.toString()
                    ? n.options.prepend + a.toString()
                    : a.toString();
                };
                return "v1" === this.options.compatibilityJSON
                  ? 1 === a
                    ? ""
                    : "number" == typeof a
                    ? "_plural_" + a.toString()
                    : i()
                  : "v2" === this.options.compatibilityJSON ||
                    (2 === r.numbers.length && 1 === r.numbers[0]) ||
                    (2 === r.numbers.length && 1 === r.numbers[0])
                  ? i()
                  : this.options.prepend && s.toString()
                  ? this.options.prepend + s.toString()
                  : s.toString();
              }
              return this.logger.warn("no plural rule found for: " + e), "";
            }),
            e
          );
        })();
        var F =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          };
        function W(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        const R = (function () {
          function e() {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            W(this, e),
              (this.logger = i.create("interpolator")),
              this.init(t, !0);
          }
          return (
            (e.prototype.init = function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                t = arguments[1];
              t &&
                ((this.options = e),
                (this.format =
                  (e.interpolation && e.interpolation.format) ||
                  function (e) {
                    return e;
                  }),
                (this.escape =
                  (e.interpolation && e.interpolation.escape) || f)),
                e.interpolation || (e.interpolation = { escapeValue: !0 });
              var n = e.interpolation;
              (this.escapeValue = void 0 === n.escapeValue || n.escapeValue),
                (this.prefix = n.prefix
                  ? m(n.prefix)
                  : n.prefixEscaped || "{{"),
                (this.suffix = n.suffix
                  ? m(n.suffix)
                  : n.suffixEscaped || "}}"),
                (this.formatSeparator = n.formatSeparator
                  ? n.formatSeparator
                  : n.formatSeparator || ","),
                (this.unescapePrefix = n.unescapeSuffix
                  ? ""
                  : n.unescapePrefix || "-"),
                (this.unescapeSuffix = this.unescapePrefix
                  ? ""
                  : n.unescapeSuffix || ""),
                (this.nestingPrefix = n.nestingPrefix
                  ? m(n.nestingPrefix)
                  : n.nestingPrefixEscaped || m("$t(")),
                (this.nestingSuffix = n.nestingSuffix
                  ? m(n.nestingSuffix)
                  : n.nestingSuffixEscaped || m(")")),
                this.resetRegExp();
            }),
            (e.prototype.reset = function () {
              this.options && this.init(this.options);
            }),
            (e.prototype.resetRegExp = function () {
              var e = this.prefix + "(.+?)" + this.suffix;
              this.regexp = new RegExp(e, "g");
              var t =
                "" +
                this.prefix +
                this.unescapePrefix +
                "(.+?)" +
                this.unescapeSuffix +
                this.suffix;
              this.regexpUnescape = new RegExp(t, "g");
              var n = this.nestingPrefix + "(.+?)" + this.nestingSuffix;
              this.nestingRegexp = new RegExp(n, "g");
            }),
            (e.prototype.interpolate = function (e, t, n) {
              var r = this,
                s = void 0,
                a = void 0;
              function i(e) {
                return e.replace(/\$/g, "$$$$");
              }
              var o = function (e) {
                if (e.indexOf(r.formatSeparator) < 0) return _(t, e);
                var s = e.split(r.formatSeparator),
                  a = s.shift().trim(),
                  i = s.join(r.formatSeparator).trim();
                return r.format(_(t, a), i, n);
              };
              for (this.resetRegExp(); (s = this.regexpUnescape.exec(e)); )
                (a = o(s[1].trim())),
                  (e = e.replace(s[0], a)),
                  (this.regexpUnescape.lastIndex = 0);
              for (; (s = this.regexp.exec(e)); )
                "string" != typeof (a = o(s[1].trim())) && (a = u(a)),
                  a ||
                    (this.logger.warn(
                      "missed to pass in variable " +
                        s[1] +
                        " for interpolating " +
                        e
                    ),
                    (a = "")),
                  (a = this.escapeValue ? i(this.escape(a)) : i(a)),
                  (e = e.replace(s[0], a)),
                  (this.regexp.lastIndex = 0);
              return e;
            }),
            (e.prototype.nest = function (e, t) {
              var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {},
                r = void 0,
                s = void 0,
                a = F({}, n);
              function i(e) {
                if (e.indexOf(",") < 0) return e;
                var t = e.split(",");
                e = t.shift();
                var n = t.join(",");
                n = (n = this.interpolate(n, a)).replace(/'/g, '"');
                try {
                  a = JSON.parse(n);
                } catch (t) {
                  this.logger.error(
                    "failed parsing options string in nesting for key " + e,
                    t
                  );
                }
                return e;
              }
              for (
                a.applyPostProcessor = !1;
                (r = this.nestingRegexp.exec(e));

              ) {
                if (
                  (s = t(i.call(this, r[1].trim()), a)) &&
                  r[0] === e &&
                  "string" != typeof s
                )
                  return s;
                "string" != typeof s && (s = u(s)),
                  s ||
                    (this.logger.warn(
                      "missed to resolve " + r[1] + " for nesting " + e
                    ),
                    (s = "")),
                  (e = e.replace(r[0], s)),
                  (this.regexp.lastIndex = 0);
              }
              return e;
            }),
            e
          );
        })();
        var I =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            },
          z = function (e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e))
              return (function (e, t) {
                var n = [],
                  r = !0,
                  s = !1,
                  a = void 0;
                try {
                  for (
                    var i, o = e[Symbol.iterator]();
                    !(r = (i = o.next()).done) &&
                    (n.push(i.value), !t || n.length !== t);
                    r = !0
                  );
                } catch (e) {
                  (s = !0), (a = e);
                } finally {
                  try {
                    !r && o.return && o.return();
                  } finally {
                    if (s) throw a;
                  }
                }
                return n;
              })(e, t);
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          };
        function U(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function G(e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
        }
        function J(e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
            t &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(e, t)
                : (function (e, t) {
                    for (
                      var n = Object.getOwnPropertyNames(t), r = 0;
                      r < n.length;
                      r++
                    ) {
                      var s = n[r],
                        a = Object.getOwnPropertyDescriptor(t, s);
                      a &&
                        a.configurable &&
                        void 0 === e[s] &&
                        Object.defineProperty(e, s, a);
                    }
                  })(e, t));
        }
        const V = (function (e) {
          function t(n, r, s) {
            var a =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : {};
            U(this, t);
            var o = G(this, e.call(this));
            return (
              (o.backend = n),
              (o.store = r),
              (o.services = s),
              (o.options = a),
              (o.logger = i.create("backendConnector")),
              (o.state = {}),
              (o.queue = []),
              o.backend && o.backend.init && o.backend.init(s, a.backend, a),
              o
            );
          }
          return (
            J(t, e),
            (t.prototype.queueLoad = function (e, t, n) {
              var r = this,
                s = [],
                a = [],
                i = [],
                o = [];
              return (
                e.forEach(function (e) {
                  var n = !0;
                  t.forEach(function (t) {
                    var i = e + "|" + t;
                    r.store.hasResourceBundle(e, t)
                      ? (r.state[i] = 2)
                      : r.state[i] < 0 ||
                        (1 === r.state[i]
                          ? a.indexOf(i) < 0 && a.push(i)
                          : ((r.state[i] = 1),
                            (n = !1),
                            a.indexOf(i) < 0 && a.push(i),
                            s.indexOf(i) < 0 && s.push(i),
                            o.indexOf(t) < 0 && o.push(t)));
                  }),
                    n || i.push(e);
                }),
                (s.length || a.length) &&
                  this.queue.push({
                    pending: a,
                    loaded: {},
                    errors: [],
                    callback: n,
                  }),
                {
                  toLoad: s,
                  pending: a,
                  toLoadLanguages: i,
                  toLoadNamespaces: o,
                }
              );
            }),
            (t.prototype.loaded = function (e, t, n) {
              var r = this,
                s = e.split("|"),
                a = z(s, 2),
                i = a[0],
                o = a[1];
              t && this.emit("failedLoading", i, o, t),
                n && this.store.addResourceBundle(i, o, n),
                (this.state[e] = t ? -1 : 2),
                this.queue.forEach(function (n) {
                  var s, a, u, d, c, _;
                  (s = n.loaded),
                    (a = o),
                    (d = l(s, [i], Object)),
                    (c = d.obj),
                    (_ = d.k),
                    (c[_] = c[_] || []),
                    u && (c[_] = c[_].concat(a)),
                    u || c[_].push(a),
                    (function (e, t) {
                      for (var n = e.indexOf(t); -1 !== n; )
                        e.splice(n, 1), (n = e.indexOf(t));
                    })(n.pending, e),
                    t && n.errors.push(t),
                    0 !== n.pending.length ||
                      n.done ||
                      (r.emit("loaded", n.loaded),
                      (n.done = !0),
                      n.errors.length ? n.callback(n.errors) : n.callback());
                }),
                (this.queue = this.queue.filter(function (e) {
                  return !e.done;
                }));
            }),
            (t.prototype.read = function (e, t, n) {
              var r =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : 0,
                s = this,
                a =
                  arguments.length > 4 && void 0 !== arguments[4]
                    ? arguments[4]
                    : 250,
                i = arguments[5];
              return e.length
                ? this.backend[n](e, t, function (o, u) {
                    o && u && r < 5
                      ? setTimeout(function () {
                          s.read.call(s, e, t, n, r + 1, 2 * a, i);
                        }, a)
                      : i(o, u);
                  })
                : i(null, {});
            }),
            (t.prototype.load = function (e, t, n) {
              var r = this;
              if (!this.backend)
                return (
                  this.logger.warn(
                    "No backend was added via i18next.use. Will not load resources."
                  ),
                  n && n()
                );
              var s = I({}, this.backend.options, this.options.backend);
              "string" == typeof e &&
                (e = this.services.languageUtils.toResolveHierarchy(e)),
                "string" == typeof t && (t = [t]);
              var a = this.queueLoad(e, t, n);
              if (!a.toLoad.length) return a.pending.length || n(), null;
              s.allowMultiLoading && this.backend.readMulti
                ? this.read(
                    a.toLoadLanguages,
                    a.toLoadNamespaces,
                    "readMulti",
                    null,
                    null,
                    function (e, t) {
                      e &&
                        r.logger.warn(
                          "loading namespaces " +
                            a.toLoadNamespaces.join(", ") +
                            " for languages " +
                            a.toLoadLanguages.join(", ") +
                            " via multiloading failed",
                          e
                        ),
                        !e &&
                          t &&
                          r.logger.log(
                            "successfully loaded namespaces " +
                              a.toLoadNamespaces.join(", ") +
                              " for languages " +
                              a.toLoadLanguages.join(", ") +
                              " via multiloading",
                            t
                          ),
                        a.toLoad.forEach(function (n) {
                          var s = n.split("|"),
                            a = z(s, 2),
                            i = a[0],
                            o = a[1],
                            u = _(t, [i, o]);
                          if (u) r.loaded(n, e, u);
                          else {
                            var d =
                              "loading namespace " +
                              o +
                              " for language " +
                              i +
                              " via multiloading failed";
                            r.loaded(n, d), r.logger.error(d);
                          }
                        });
                    }
                  )
                : a.toLoad.forEach(function (e) {
                    r.loadOne(e);
                  });
            }),
            (t.prototype.reload = function (e, t) {
              var n = this;
              this.backend ||
                this.logger.warn(
                  "No backend was added via i18next.use. Will not load resources."
                );
              var r = I({}, this.backend.options, this.options.backend);
              "string" == typeof e &&
                (e = this.services.languageUtils.toResolveHierarchy(e)),
                "string" == typeof t && (t = [t]),
                r.allowMultiLoading && this.backend.readMulti
                  ? this.read(e, t, "readMulti", null, null, function (r, s) {
                      r &&
                        n.logger.warn(
                          "reloading namespaces " +
                            t.join(", ") +
                            " for languages " +
                            e.join(", ") +
                            " via multiloading failed",
                          r
                        ),
                        !r &&
                          s &&
                          n.logger.log(
                            "successfully reloaded namespaces " +
                              t.join(", ") +
                              " for languages " +
                              e.join(", ") +
                              " via multiloading",
                            s
                          ),
                        e.forEach(function (e) {
                          t.forEach(function (t) {
                            var a = _(s, [e, t]);
                            if (a) n.loaded(e + "|" + t, r, a);
                            else {
                              var i =
                                "reloading namespace " +
                                t +
                                " for language " +
                                e +
                                " via multiloading failed";
                              n.loaded(e + "|" + t, i), n.logger.error(i);
                            }
                          });
                        });
                    })
                  : e.forEach(function (e) {
                      t.forEach(function (t) {
                        n.loadOne(e + "|" + t, "re");
                      });
                    });
            }),
            (t.prototype.loadOne = function (e) {
              var t = this,
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : "",
                r = e.split("|"),
                s = z(r, 2),
                a = s[0],
                i = s[1];
              this.read(a, i, "read", null, null, function (r, s) {
                r &&
                  t.logger.warn(
                    n +
                      "loading namespace " +
                      i +
                      " for language " +
                      a +
                      " failed",
                    r
                  ),
                  !r &&
                    s &&
                    t.logger.log(
                      n + "loaded namespace " + i + " for language " + a,
                      s
                    ),
                  t.loaded(e, r, s);
              });
            }),
            (t.prototype.saveMissing = function (e, t, n, r) {
              this.backend &&
                this.backend.create &&
                this.backend.create(e, t, n, r),
                e && e[0] && this.store.addResource(e[0], t, n, r);
            }),
            t
          );
        })(o);
        var B =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          };
        function $(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function q(e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
        }
        function K(e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
            t &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(e, t)
                : (function (e, t) {
                    for (
                      var n = Object.getOwnPropertyNames(t), r = 0;
                      r < n.length;
                      r++
                    ) {
                      var s = n[r],
                        a = Object.getOwnPropertyDescriptor(t, s);
                      a &&
                        a.configurable &&
                        void 0 === e[s] &&
                        Object.defineProperty(e, s, a);
                    }
                  })(e, t));
        }
        var X = (function (e) {
          function t(n, r, s) {
            var a =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : {};
            $(this, t);
            var o = q(this, e.call(this));
            return (
              (o.cache = n),
              (o.store = r),
              (o.services = s),
              (o.options = a),
              (o.logger = i.create("cacheConnector")),
              o.cache && o.cache.init && o.cache.init(s, a.cache, a),
              o
            );
          }
          return (
            K(t, e),
            (t.prototype.load = function (e, t, n) {
              var r = this;
              if (!this.cache) return n && n();
              var s = B({}, this.cache.options, this.options.cache),
                a =
                  "string" == typeof e
                    ? this.services.languageUtils.toResolveHierarchy(e)
                    : e;
              s.enabled
                ? this.cache.load(a, function (e, t) {
                    if (
                      (e &&
                        r.logger.error(
                          "loading languages " +
                            a.join(", ") +
                            " from cache failed",
                          e
                        ),
                      t)
                    )
                      for (var s in t)
                        if (Object.prototype.hasOwnProperty.call(t, s))
                          for (var i in t[s])
                            if (
                              Object.prototype.hasOwnProperty.call(t[s], i) &&
                              "i18nStamp" !== i
                            ) {
                              var o = t[s][i];
                              o && r.store.addResourceBundle(s, i, o);
                            }
                    n && n();
                  })
                : n && n();
            }),
            (t.prototype.save = function () {
              this.cache &&
                this.options.cache &&
                this.options.cache.enabled &&
                this.cache.save(this.store.data);
            }),
            t
          );
        })(o);
        const Z = X;
        function Q(e) {
          return (
            "string" == typeof e.ns && (e.ns = [e.ns]),
            "string" == typeof e.fallbackLng &&
              (e.fallbackLng = [e.fallbackLng]),
            "string" == typeof e.fallbackNS && (e.fallbackNS = [e.fallbackNS]),
            e.whitelist &&
              e.whitelist.indexOf("cimode") < 0 &&
              e.whitelist.push("cimode"),
            e
          );
        }
        var ee =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          };
        function te(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function ne(e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
        }
        function re(e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
            t &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(e, t)
                : (function (e, t) {
                    for (
                      var n = Object.getOwnPropertyNames(t), r = 0;
                      r < n.length;
                      r++
                    ) {
                      var s = n[r],
                        a = Object.getOwnPropertyDescriptor(t, s);
                      a &&
                        a.configurable &&
                        void 0 === e[s] &&
                        Object.defineProperty(e, s, a);
                    }
                  })(e, t));
        }
        function se() {}
        var ae = (function (e) {
          function t() {
            var n =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              r = arguments[1];
            te(this, t);
            var s = ne(this, e.call(this));
            if (
              ((s.options = Q(n)),
              (s.services = {}),
              (s.logger = i),
              (s.modules = { external: [] }),
              r && !s.isInitialized && !n.isClone)
            ) {
              var a;
              if (!s.options.initImmediate) return (a = s.init(n, r)), ne(s, a);
              setTimeout(function () {
                s.init(n, r);
              }, 0);
            }
            return s;
          }
          return (
            re(t, e),
            (t.prototype.init = function (e, t) {
              var n = this;
              function r(e) {
                return e ? ("function" == typeof e ? new e() : e) : null;
              }
              if (
                ("function" == typeof e && ((t = e), (e = {})),
                e || (e = {}),
                "v1" === e.compatibilityAPI
                  ? (this.options = ee(
                      {},
                      {
                        debug: !1,
                        initImmediate: !0,
                        ns: ["translation"],
                        defaultNS: ["translation"],
                        fallbackLng: ["dev"],
                        fallbackNS: !1,
                        whitelist: !1,
                        nonExplicitWhitelist: !1,
                        load: "all",
                        preload: !1,
                        simplifyPluralSuffix: !0,
                        keySeparator: ".",
                        nsSeparator: ":",
                        pluralSeparator: "_",
                        contextSeparator: "_",
                        saveMissing: !1,
                        saveMissingTo: "fallback",
                        missingKeyHandler: !1,
                        postProcess: !1,
                        returnNull: !0,
                        returnEmptyString: !0,
                        returnObjects: !1,
                        joinArrays: !1,
                        returnedObjectHandler: function () {},
                        parseMissingKeyHandler: !1,
                        appendNamespaceToMissingKey: !1,
                        appendNamespaceToCIMode: !1,
                        overloadTranslationOptionHandler: function (e) {
                          return { defaultValue: e[1] };
                        },
                        interpolation: {
                          escapeValue: !0,
                          format: function (e, t, n) {
                            return e;
                          },
                          prefix: "{{",
                          suffix: "}}",
                          formatSeparator: ",",
                          unescapePrefix: "-",
                          nestingPrefix: "$t(",
                          nestingSuffix: ")",
                          defaultVariables: void 0,
                        },
                      },
                      Q(
                        (function (e) {
                          return (
                            e.resStore && (e.resources = e.resStore),
                            e.ns && e.ns.defaultNs
                              ? ((e.defaultNS = e.ns.defaultNs),
                                (e.ns = e.ns.namespaces))
                              : (e.defaultNS = e.ns || "translation"),
                            e.fallbackToDefaultNS &&
                              e.defaultNS &&
                              (e.fallbackNS = e.defaultNS),
                            (e.saveMissing = e.sendMissing),
                            (e.saveMissingTo = e.sendMissingTo || "current"),
                            (e.returnNull = !e.fallbackOnNull),
                            (e.returnEmptyString = !e.fallbackOnEmpty),
                            (e.returnObjects = e.returnObjectTrees),
                            (e.joinArrays = "\n"),
                            (e.returnedObjectHandler = e.objectTreeKeyHandler),
                            (e.parseMissingKeyHandler = e.parseMissingKey),
                            (e.appendNamespaceToMissingKey = !0),
                            (e.nsSeparator = e.nsseparator || ":"),
                            (e.keySeparator = e.keyseparator || "."),
                            "sprintf" === e.shortcutFunction &&
                              (e.overloadTranslationOptionHandler = function (
                                e
                              ) {
                                for (var t = [], n = 1; n < e.length; n++)
                                  t.push(e[n]);
                                return { postProcess: "sprintf", sprintf: t };
                              }),
                            (e.whitelist = e.lngWhitelist),
                            (e.preload = e.preload),
                            "current" === e.load && (e.load = "currentOnly"),
                            "unspecific" === e.load &&
                              (e.load = "languageOnly"),
                            (e.backend = e.backend || {}),
                            (e.backend.loadPath =
                              e.resGetPath || "locales/__lng__/__ns__.json"),
                            (e.backend.addPath =
                              e.resPostPath || "locales/add/__lng__/__ns__"),
                            (e.backend.allowMultiLoading = e.dynamicLoad),
                            (e.cache = e.cache || {}),
                            (e.cache.prefix = "res_"),
                            (e.cache.expirationTime = 6048e5),
                            (e.cache.enabled = e.useLocalStorage),
                            (e = b(e)).defaultVariables &&
                              (e.interpolation.defaultVariables =
                                e.defaultVariables),
                            e
                          );
                        })(e)
                      ),
                      {}
                    ))
                  : "v1" === e.compatibilityJSON
                  ? (this.options = ee(
                      {},
                      {
                        debug: !1,
                        initImmediate: !0,
                        ns: ["translation"],
                        defaultNS: ["translation"],
                        fallbackLng: ["dev"],
                        fallbackNS: !1,
                        whitelist: !1,
                        nonExplicitWhitelist: !1,
                        load: "all",
                        preload: !1,
                        simplifyPluralSuffix: !0,
                        keySeparator: ".",
                        nsSeparator: ":",
                        pluralSeparator: "_",
                        contextSeparator: "_",
                        saveMissing: !1,
                        saveMissingTo: "fallback",
                        missingKeyHandler: !1,
                        postProcess: !1,
                        returnNull: !0,
                        returnEmptyString: !0,
                        returnObjects: !1,
                        joinArrays: !1,
                        returnedObjectHandler: function () {},
                        parseMissingKeyHandler: !1,
                        appendNamespaceToMissingKey: !1,
                        appendNamespaceToCIMode: !1,
                        overloadTranslationOptionHandler: function (e) {
                          return { defaultValue: e[1] };
                        },
                        interpolation: {
                          escapeValue: !0,
                          format: function (e, t, n) {
                            return e;
                          },
                          prefix: "{{",
                          suffix: "}}",
                          formatSeparator: ",",
                          unescapePrefix: "-",
                          nestingPrefix: "$t(",
                          nestingSuffix: ")",
                          defaultVariables: void 0,
                        },
                      },
                      Q(
                        (function (e) {
                          return ((e = b(e)).joinArrays = "\n"), e;
                        })(e)
                      ),
                      {}
                    ))
                  : (this.options = ee(
                      {},
                      {
                        debug: !1,
                        initImmediate: !0,
                        ns: ["translation"],
                        defaultNS: ["translation"],
                        fallbackLng: ["dev"],
                        fallbackNS: !1,
                        whitelist: !1,
                        nonExplicitWhitelist: !1,
                        load: "all",
                        preload: !1,
                        simplifyPluralSuffix: !0,
                        keySeparator: ".",
                        nsSeparator: ":",
                        pluralSeparator: "_",
                        contextSeparator: "_",
                        saveMissing: !1,
                        saveMissingTo: "fallback",
                        missingKeyHandler: !1,
                        postProcess: !1,
                        returnNull: !0,
                        returnEmptyString: !0,
                        returnObjects: !1,
                        joinArrays: !1,
                        returnedObjectHandler: function () {},
                        parseMissingKeyHandler: !1,
                        appendNamespaceToMissingKey: !1,
                        appendNamespaceToCIMode: !1,
                        overloadTranslationOptionHandler: function (e) {
                          return { defaultValue: e[1] };
                        },
                        interpolation: {
                          escapeValue: !0,
                          format: function (e, t, n) {
                            return e;
                          },
                          prefix: "{{",
                          suffix: "}}",
                          formatSeparator: ",",
                          unescapePrefix: "-",
                          nestingPrefix: "$t(",
                          nestingSuffix: ")",
                          defaultVariables: void 0,
                        },
                      },
                      this.options,
                      Q(e)
                    )),
                (this.format = this.options.interpolation.format),
                t || (t = se),
                !this.options.isClone)
              ) {
                this.modules.logger
                  ? i.init(r(this.modules.logger), this.options)
                  : i.init(null, this.options);
                var s = new P(this.options);
                this.store = new v(this.options.resources, this.options);
                var a = this.services;
                (a.logger = i),
                  (a.resourceStore = this.store),
                  a.resourceStore.on("added removed", function (e, t) {
                    a.cacheConnector.save();
                  }),
                  (a.languageUtils = s),
                  (a.pluralResolver = new N(s, {
                    prepend: this.options.pluralSeparator,
                    compatibilityJSON: this.options.compatibilityJSON,
                    simplifyPluralSuffix: this.options.simplifyPluralSuffix,
                  })),
                  (a.interpolator = new R(this.options)),
                  (a.backendConnector = new V(
                    r(this.modules.backend),
                    a.resourceStore,
                    a,
                    this.options
                  )),
                  a.backendConnector.on("*", function (e) {
                    for (
                      var t = arguments.length,
                        r = Array(t > 1 ? t - 1 : 0),
                        s = 1;
                      s < t;
                      s++
                    )
                      r[s - 1] = arguments[s];
                    n.emit.apply(n, [e].concat(r));
                  }),
                  a.backendConnector.on("loaded", function (e) {
                    a.cacheConnector.save();
                  }),
                  (a.cacheConnector = new Z(
                    r(this.modules.cache),
                    a.resourceStore,
                    a,
                    this.options
                  )),
                  a.cacheConnector.on("*", function (e) {
                    for (
                      var t = arguments.length,
                        r = Array(t > 1 ? t - 1 : 0),
                        s = 1;
                      s < t;
                      s++
                    )
                      r[s - 1] = arguments[s];
                    n.emit.apply(n, [e].concat(r));
                  }),
                  this.modules.languageDetector &&
                    ((a.languageDetector = r(this.modules.languageDetector)),
                    a.languageDetector.init(
                      a,
                      this.options.detection,
                      this.options
                    )),
                  (this.translator = new j(this.services, this.options)),
                  this.translator.on("*", function (e) {
                    for (
                      var t = arguments.length,
                        r = Array(t > 1 ? t - 1 : 0),
                        s = 1;
                      s < t;
                      s++
                    )
                      r[s - 1] = arguments[s];
                    n.emit.apply(n, [e].concat(r));
                  }),
                  this.modules.external.forEach(function (e) {
                    e.init && e.init(n);
                  });
              }
              var o;
              [
                "getResource",
                "addResource",
                "addResources",
                "addResourceBundle",
                "removeResourceBundle",
                "hasResourceBundle",
                "getResourceBundle",
              ].forEach(function (e) {
                n[e] = function () {
                  var t;
                  return (t = n.store)[e].apply(t, arguments);
                };
              }),
                "v1" === this.options.compatibilityAPI &&
                  (((o = this).lng = function () {
                    return (
                      i.deprecate(
                        "i18next.lng() can be replaced by i18next.language for detected language or i18next.languages for languages ordered by translation lookup."
                      ),
                      o.services.languageUtils.toResolveHierarchy(o.language)[0]
                    );
                  }),
                  (o.preload = function (e, t) {
                    i.deprecate(
                      "i18next.preload() can be replaced with i18next.loadLanguages()"
                    ),
                      o.loadLanguages(e, t);
                  }),
                  (o.setLng = function (e, t, n) {
                    return (
                      i.deprecate(
                        "i18next.setLng() can be replaced with i18next.changeLanguage() or i18next.getFixedT() to get a translation function with fixed language or namespace."
                      ),
                      "function" == typeof t && ((n = t), (t = {})),
                      t || (t = {}),
                      !0 === t.fixLng && n
                        ? n(null, o.getFixedT(e))
                        : o.changeLanguage(e, n)
                    );
                  }),
                  (o.addPostProcessor = function (e, t) {
                    i.deprecate(
                      "i18next.addPostProcessor() can be replaced by i18next.use({ type: 'postProcessor', name: 'name', process: fc })"
                    ),
                      o.use({ type: "postProcessor", name: e, process: t });
                  }));
              var u = function () {
                n.changeLanguage(n.options.lng, function (e, r) {
                  (n.isInitialized = !0),
                    n.logger.log("initialized", n.options),
                    n.emit("initialized", n.options),
                    t(e, r);
                });
              };
              return (
                this.options.resources || !this.options.initImmediate
                  ? u()
                  : setTimeout(u, 0),
                this
              );
            }),
            (t.prototype.loadResources = function () {
              var e = this,
                t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : se;
              if (this.options.resources) t(null);
              else {
                if (this.language && "cimode" === this.language.toLowerCase())
                  return t();
                var n = [],
                  r = function (t) {
                    t &&
                      e.services.languageUtils
                        .toResolveHierarchy(t)
                        .forEach(function (e) {
                          n.indexOf(e) < 0 && n.push(e);
                        });
                  };
                if (this.language) r(this.language);
                else {
                  var s = this.services.languageUtils.getFallbackCodes(
                    this.options.fallbackLng
                  );
                  s.forEach(function (e) {
                    return r(e);
                  });
                }
                this.options.preload &&
                  this.options.preload.forEach(function (e) {
                    return r(e);
                  }),
                  this.services.cacheConnector.load(
                    n,
                    this.options.ns,
                    function () {
                      e.services.backendConnector.load(n, e.options.ns, t);
                    }
                  );
              }
            }),
            (t.prototype.reloadResources = function (e, t) {
              e || (e = this.languages),
                t || (t = this.options.ns),
                this.services.backendConnector.reload(e, t);
            }),
            (t.prototype.use = function (e) {
              return (
                "backend" === e.type && (this.modules.backend = e),
                "cache" === e.type && (this.modules.cache = e),
                ("logger" === e.type || (e.log && e.warn && e.error)) &&
                  (this.modules.logger = e),
                "languageDetector" === e.type &&
                  (this.modules.languageDetector = e),
                "postProcessor" === e.type && Y.addPostProcessor(e),
                "3rdParty" === e.type && this.modules.external.push(e),
                this
              );
            }),
            (t.prototype.changeLanguage = function (e, t) {
              var n = this,
                r = function (e) {
                  e &&
                    ((n.language = e),
                    (n.languages =
                      n.services.languageUtils.toResolveHierarchy(e)),
                    n.translator.changeLanguage(e),
                    n.services.languageDetector &&
                      n.services.languageDetector.cacheUserLanguage(e)),
                    n.loadResources(function (r) {
                      !(function (e, r) {
                        r &&
                          (n.emit("languageChanged", r),
                          n.logger.log("languageChanged", r)),
                          t &&
                            t(e, function () {
                              return n.t.apply(n, arguments);
                            });
                      })(r, e);
                    });
                };
              e ||
              !this.services.languageDetector ||
              this.services.languageDetector.async
                ? !e &&
                  this.services.languageDetector &&
                  this.services.languageDetector.async
                  ? this.services.languageDetector.detect(r)
                  : r(e)
                : r(this.services.languageDetector.detect());
            }),
            (t.prototype.getFixedT = function (e, t) {
              var n = this,
                r = function e(t) {
                  var r =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {},
                    s = ee({}, r);
                  return (
                    (s.lng = s.lng || e.lng),
                    (s.lngs = s.lngs || e.lngs),
                    (s.ns = s.ns || e.ns),
                    n.t(t, s)
                  );
                };
              return (
                "string" == typeof e ? (r.lng = e) : (r.lngs = e), (r.ns = t), r
              );
            }),
            (t.prototype.t = function () {
              var e;
              return (
                this.translator &&
                (e = this.translator).translate.apply(e, arguments)
              );
            }),
            (t.prototype.exists = function () {
              var e;
              return (
                this.translator &&
                (e = this.translator).exists.apply(e, arguments)
              );
            }),
            (t.prototype.setDefaultNamespace = function (e) {
              this.options.defaultNS = e;
            }),
            (t.prototype.loadNamespaces = function (e, t) {
              var n = this;
              if (!this.options.ns) return t && t();
              "string" == typeof e && (e = [e]),
                e.forEach(function (e) {
                  n.options.ns.indexOf(e) < 0 && n.options.ns.push(e);
                }),
                this.loadResources(t);
            }),
            (t.prototype.loadLanguages = function (e, t) {
              "string" == typeof e && (e = [e]);
              var n = this.options.preload || [],
                r = e.filter(function (e) {
                  return n.indexOf(e) < 0;
                });
              if (!r.length) return t();
              (this.options.preload = n.concat(r)), this.loadResources(t);
            }),
            (t.prototype.dir = function (e) {
              if (
                (e ||
                  (e =
                    this.languages && this.languages.length > 0
                      ? this.languages[0]
                      : this.language),
                !e)
              )
                return "rtl";
              return [
                "ar",
                "shu",
                "sqr",
                "ssh",
                "xaa",
                "yhd",
                "yud",
                "aao",
                "abh",
                "abv",
                "acm",
                "acq",
                "acw",
                "acx",
                "acy",
                "adf",
                "ads",
                "aeb",
                "aec",
                "afb",
                "ajp",
                "apc",
                "apd",
                "arb",
                "arq",
                "ars",
                "ary",
                "arz",
                "auz",
                "avl",
                "ayh",
                "ayl",
                "ayn",
                "ayp",
                "bbz",
                "pga",
                "he",
                "iw",
                "ps",
                "pbt",
                "pbu",
                "pst",
                "prp",
                "prd",
                "ur",
                "ydd",
                "yds",
                "yih",
                "ji",
                "yi",
                "hbo",
                "men",
                "xmn",
                "fa",
                "jpr",
                "peo",
                "pes",
                "prs",
                "dv",
                "sam",
              ].indexOf(
                this.services.languageUtils.getLanguagePartFromCode(e)
              ) >= 0
                ? "rtl"
                : "ltr";
            }),
            (t.prototype.createInstance = function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                n = arguments[1];
              return new t(e, n);
            }),
            (t.prototype.cloneInstance = function () {
              var e = this,
                n =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                r =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : se,
                s = ee({}, this.options, n, { isClone: !0 }),
                a = new t(s, r),
                i = ["store", "services", "language"];
              return (
                i.forEach(function (t) {
                  a[t] = e[t];
                }),
                (a.translator = new j(a.services, a.options)),
                a.translator.on("*", function (e) {
                  for (
                    var t = arguments.length,
                      n = Array(t > 1 ? t - 1 : 0),
                      r = 1;
                    r < t;
                    r++
                  )
                    n[r - 1] = arguments[r];
                  a.emit.apply(a, [e].concat(n));
                }),
                a.init(s, r),
                a
              );
            }),
            t
          );
        })(o);
        const ie = new ae(),
          oe = ie;
        var ue = ie.changeLanguage.bind(ie),
          de = ie.cloneInstance.bind(ie),
          le = ie.createInstance.bind(ie),
          ce = ie.dir.bind(ie),
          _e = ie.exists.bind(ie),
          he = ie.getFixedT.bind(ie),
          me = ie.init.bind(ie),
          pe = ie.loadLanguages.bind(ie),
          fe = ie.loadNamespaces.bind(ie),
          ye = ie.loadResources.bind(ie),
          ge = ie.off.bind(ie),
          Me = ie.on.bind(ie),
          Le = ie.setDefaultNamespace.bind(ie),
          ve = ie.t.bind(ie),
          Ye = ie.use.bind(ie);
      },
      2353: function (e, t) {
        !(function (n, r) {
          var s = Array.prototype,
            a = Object.prototype,
            i = s.slice,
            o = a.hasOwnProperty,
            u = s.forEach,
            d = {},
            l = {
              forEach: function (e, t, n) {
                var r, s, a;
                if (null !== e)
                  if (u && e.forEach === u) e.forEach(t, n);
                  else if (e.length === +e.length) {
                    for (r = 0, s = e.length; r < s; r++)
                      if (r in e && t.call(n, e[r], r, e) === d) return;
                  } else
                    for (a in e)
                      if (o.call(e, a) && t.call(n, e[a], a, e) === d) return;
              },
              extend: function (e) {
                return (
                  this.forEach(i.call(arguments, 1), function (t) {
                    for (var n in t) e[n] = t[n];
                  }),
                  e
                );
              },
            },
            c = function (e) {
              if (
                ((this.defaults = {
                  locale_data: {
                    messages: {
                      "": {
                        domain: "messages",
                        lang: "en",
                        plural_forms: "nplurals=2; plural=(n != 1);",
                      },
                    },
                  },
                  domain: "messages",
                  debug: !1,
                }),
                (this.options = l.extend({}, this.defaults, e)),
                this.textdomain(this.options.domain),
                e.domain && !this.options.locale_data[this.options.domain])
              )
                throw new Error(
                  "Text domain set to non-existent domain: `" + e.domain + "`"
                );
            };
          function _(e) {
            return c.PF.compile(e || "nplurals=2; plural=(n != 1);");
          }
          function h(e, t) {
            (this._key = e), (this._i18n = t);
          }
          (c.context_delimiter = String.fromCharCode(4)),
            l.extend(h.prototype, {
              onDomain: function (e) {
                return (this._domain = e), this;
              },
              withContext: function (e) {
                return (this._context = e), this;
              },
              ifPlural: function (e, t) {
                return (this._val = e), (this._pkey = t), this;
              },
              fetch: function (e) {
                return (
                  "[object Array]" != {}.toString.call(e) &&
                    (e = [].slice.call(arguments, 0)),
                  (e && e.length
                    ? c.sprintf
                    : function (e) {
                        return e;
                      })(
                    this._i18n.dcnpgettext(
                      this._domain,
                      this._context,
                      this._key,
                      this._pkey,
                      this._val
                    ),
                    e
                  )
                );
              },
            }),
            l.extend(c.prototype, {
              translate: function (e) {
                return new h(e, this);
              },
              textdomain: function (e) {
                if (!e) return this._textdomain;
                this._textdomain = e;
              },
              gettext: function (e) {
                return this.dcnpgettext.call(this, r, r, e);
              },
              dgettext: function (e, t) {
                return this.dcnpgettext.call(this, e, r, t);
              },
              dcgettext: function (e, t) {
                return this.dcnpgettext.call(this, e, r, t);
              },
              ngettext: function (e, t, n) {
                return this.dcnpgettext.call(this, r, r, e, t, n);
              },
              dngettext: function (e, t, n, s) {
                return this.dcnpgettext.call(this, e, r, t, n, s);
              },
              dcngettext: function (e, t, n, s) {
                return this.dcnpgettext.call(this, e, r, t, n, s);
              },
              pgettext: function (e, t) {
                return this.dcnpgettext.call(this, r, e, t);
              },
              dpgettext: function (e, t, n) {
                return this.dcnpgettext.call(this, e, t, n);
              },
              dcpgettext: function (e, t, n) {
                return this.dcnpgettext.call(this, e, t, n);
              },
              npgettext: function (e, t, n, s) {
                return this.dcnpgettext.call(this, r, e, t, n, s);
              },
              dnpgettext: function (e, t, n, r, s) {
                return this.dcnpgettext.call(this, e, t, n, r, s);
              },
              dcnpgettext: function (e, t, n, r, s) {
                var a;
                if (((r = r || n), (e = e || this._textdomain), !this.options))
                  return (a = new c()).dcnpgettext.call(
                    a,
                    void 0,
                    void 0,
                    n,
                    r,
                    s
                  );
                if (!this.options.locale_data)
                  throw new Error("No locale data provided.");
                if (!this.options.locale_data[e])
                  throw new Error("Domain `" + e + "` was not found.");
                if (!this.options.locale_data[e][""])
                  throw new Error("No locale meta information provided.");
                if (!n) throw new Error("No translation key found.");
                var i,
                  o,
                  u,
                  d = t ? t + c.context_delimiter + n : n,
                  l = this.options.locale_data,
                  h = l[e],
                  m = (l.messages || this.defaults.locale_data.messages)[""],
                  p =
                    h[""].plural_forms ||
                    h[""]["Plural-Forms"] ||
                    h[""]["plural-forms"] ||
                    m.plural_forms ||
                    m["Plural-Forms"] ||
                    m["plural-forms"];
                if (void 0 === s) u = 0;
                else {
                  if ("number" != typeof s && ((s = parseInt(s, 10)), isNaN(s)))
                    throw new Error(
                      "The number that was passed in is not a number."
                    );
                  u = _(p)(s);
                }
                if (!h)
                  throw new Error(
                    "No domain named `" + e + "` could be found."
                  );
                return !(i = h[d]) || u > i.length
                  ? (this.options.missing_key_callback &&
                      this.options.missing_key_callback(d, e),
                    (o = [n, r]),
                    this.options.debug,
                    o[_()(s)])
                  : (o = i[u]) || (o = [n, r])[_()(s)];
              },
            });
          var m,
            p,
            f = (function () {
              function e(e) {
                return Object.prototype.toString
                  .call(e)
                  .slice(8, -1)
                  .toLowerCase();
              }
              function t(e, t) {
                for (var n = []; t > 0; n[--t] = e);
                return n.join("");
              }
              var n = function () {
                return (
                  n.cache.hasOwnProperty(arguments[0]) ||
                    (n.cache[arguments[0]] = n.parse(arguments[0])),
                  n.format.call(null, n.cache[arguments[0]], arguments)
                );
              };
              return (
                (n.format = function (n, r) {
                  var s,
                    a,
                    i,
                    o,
                    u,
                    d,
                    l,
                    c = 1,
                    _ = n.length,
                    h = "",
                    m = [];
                  for (a = 0; a < _; a++)
                    if ("string" === (h = e(n[a]))) m.push(n[a]);
                    else if ("array" === h) {
                      if ((o = n[a])[2])
                        for (s = r[c], i = 0; i < o[2].length; i++) {
                          if (!s.hasOwnProperty(o[2][i]))
                            throw f(
                              '[sprintf] property "%s" does not exist',
                              o[2][i]
                            );
                          s = s[o[2][i]];
                        }
                      else s = o[1] ? r[o[1]] : r[c++];
                      if (/[^s]/.test(o[8]) && "number" != e(s))
                        throw f(
                          "[sprintf] expecting number but found %s",
                          e(s)
                        );
                      switch ((null == s && (s = ""), o[8])) {
                        case "b":
                          s = s.toString(2);
                          break;
                        case "c":
                          s = String.fromCharCode(s);
                          break;
                        case "d":
                          s = parseInt(s, 10);
                          break;
                        case "e":
                          s = o[7] ? s.toExponential(o[7]) : s.toExponential();
                          break;
                        case "f":
                          s = o[7]
                            ? parseFloat(s).toFixed(o[7])
                            : parseFloat(s);
                          break;
                        case "o":
                          s = s.toString(8);
                          break;
                        case "s":
                          s =
                            (s = String(s)) && o[7] ? s.substring(0, o[7]) : s;
                          break;
                        case "u":
                          s = Math.abs(s);
                          break;
                        case "x":
                          s = s.toString(16);
                          break;
                        case "X":
                          s = s.toString(16).toUpperCase();
                      }
                      (s = /[def]/.test(o[8]) && o[3] && s >= 0 ? "+" + s : s),
                        (d = o[4] ? ("0" == o[4] ? "0" : o[4].charAt(1)) : " "),
                        (l = o[6] - String(s).length),
                        (u = o[6] ? t(d, l) : ""),
                        m.push(o[5] ? s + u : u + s);
                    }
                  return m.join("");
                }),
                (n.cache = {}),
                (n.parse = function (e) {
                  for (var t = e, n = [], r = [], s = 0; t; ) {
                    if (null !== (n = /^[^\x25]+/.exec(t))) r.push(n[0]);
                    else if (null !== (n = /^\x25{2}/.exec(t))) r.push("%");
                    else {
                      if (
                        null ===
                        (n =
                          /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(
                            t
                          ))
                      )
                        throw "[sprintf] huh?";
                      if (n[2]) {
                        s |= 1;
                        var a = [],
                          i = n[2],
                          o = [];
                        if (null === (o = /^([a-z_][a-z_\d]*)/i.exec(i)))
                          throw "[sprintf] huh?";
                        for (
                          a.push(o[1]);
                          "" !== (i = i.substring(o[0].length));

                        )
                          if (null !== (o = /^\.([a-z_][a-z_\d]*)/i.exec(i)))
                            a.push(o[1]);
                          else {
                            if (null === (o = /^\[(\d+)\]/.exec(i)))
                              throw "[sprintf] huh?";
                            a.push(o[1]);
                          }
                        n[2] = a;
                      } else s |= 2;
                      if (3 === s)
                        throw "[sprintf] mixing positional and named placeholders is not (yet) supported";
                      r.push(n);
                    }
                    t = t.substring(n[0].length);
                  }
                  return r;
                }),
                n
              );
            })(),
            y = function (e, t) {
              return t.unshift(e), f.apply(null, t);
            };
          (c.parse_plural = function (e, t) {
            return (e = e.replace(/n/g, t)), c.parse_expression(e);
          }),
            (c.sprintf = function (e, t) {
              return "[object Array]" == {}.toString.call(t)
                ? y(e, [].slice.call(t))
                : f.apply(this, [].slice.call(arguments));
            }),
            (c.prototype.sprintf = function () {
              return c.sprintf.apply(this, arguments);
            }),
            ((c.PF = {}).parse = function (e) {
              var t = c.PF.extractPluralExpr(e);
              return c.PF.parser.parse.call(c.PF.parser, t);
            }),
            (c.PF.compile = function (e) {
              var t = c.PF.parse(e);
              return function (e) {
                return !0 === (n = c.PF.interpreter(t)(e)) ? 1 : n || 0;
                var n;
              };
            }),
            (c.PF.interpreter = function (e) {
              return function (t) {
                switch (e.type) {
                  case "GROUP":
                    return c.PF.interpreter(e.expr)(t);
                  case "TERNARY":
                    return c.PF.interpreter(e.expr)(t)
                      ? c.PF.interpreter(e.truthy)(t)
                      : c.PF.interpreter(e.falsey)(t);
                  case "OR":
                    return (
                      c.PF.interpreter(e.left)(t) ||
                      c.PF.interpreter(e.right)(t)
                    );
                  case "AND":
                    return (
                      c.PF.interpreter(e.left)(t) &&
                      c.PF.interpreter(e.right)(t)
                    );
                  case "LT":
                    return (
                      c.PF.interpreter(e.left)(t) < c.PF.interpreter(e.right)(t)
                    );
                  case "GT":
                    return (
                      c.PF.interpreter(e.left)(t) > c.PF.interpreter(e.right)(t)
                    );
                  case "LTE":
                    return (
                      c.PF.interpreter(e.left)(t) <=
                      c.PF.interpreter(e.right)(t)
                    );
                  case "GTE":
                    return (
                      c.PF.interpreter(e.left)(t) >=
                      c.PF.interpreter(e.right)(t)
                    );
                  case "EQ":
                    return (
                      c.PF.interpreter(e.left)(t) ==
                      c.PF.interpreter(e.right)(t)
                    );
                  case "NEQ":
                    return (
                      c.PF.interpreter(e.left)(t) !=
                      c.PF.interpreter(e.right)(t)
                    );
                  case "MOD":
                    return (
                      c.PF.interpreter(e.left)(t) % c.PF.interpreter(e.right)(t)
                    );
                  case "VAR":
                    return t;
                  case "NUM":
                    return e.val;
                  default:
                    throw new Error("Invalid Token found.");
                }
              };
            }),
            (c.PF.extractPluralExpr = function (e) {
              (e = e.replace(/^\s\s*/, "").replace(/\s\s*$/, "")),
                /;\s*$/.test(e) || (e = e.concat(";"));
              var t,
                n = /nplurals\=(\d+);/,
                r = e.match(n);
              if (!(r.length > 1))
                throw new Error(
                  "nplurals not found in plural_forms string: " + e
                );
              if (
                (r[1],
                !(
                  (t = (e = e.replace(n, "")).match(/plural\=(.*);/)) &&
                  t.length > 1
                ))
              )
                throw new Error("`plural` expression not found: " + e);
              return t[1];
            }),
            (c.PF.parser =
              ((m = {
                trace: function () {},
                yy: {},
                symbols_: {
                  error: 2,
                  expressions: 3,
                  e: 4,
                  EOF: 5,
                  "?": 6,
                  ":": 7,
                  "||": 8,
                  "&&": 9,
                  "<": 10,
                  "<=": 11,
                  ">": 12,
                  ">=": 13,
                  "!=": 14,
                  "==": 15,
                  "%": 16,
                  "(": 17,
                  ")": 18,
                  n: 19,
                  NUMBER: 20,
                  $accept: 0,
                  $end: 1,
                },
                terminals_: {
                  2: "error",
                  5: "EOF",
                  6: "?",
                  7: ":",
                  8: "||",
                  9: "&&",
                  10: "<",
                  11: "<=",
                  12: ">",
                  13: ">=",
                  14: "!=",
                  15: "==",
                  16: "%",
                  17: "(",
                  18: ")",
                  19: "n",
                  20: "NUMBER",
                },
                productions_: [
                  0,
                  [3, 2],
                  [4, 5],
                  [4, 3],
                  [4, 3],
                  [4, 3],
                  [4, 3],
                  [4, 3],
                  [4, 3],
                  [4, 3],
                  [4, 3],
                  [4, 3],
                  [4, 3],
                  [4, 1],
                  [4, 1],
                ],
                performAction: function (e, t, n, r, s, a, i) {
                  var o = a.length - 1;
                  switch (s) {
                    case 1:
                      return { type: "GROUP", expr: a[o - 1] };
                    case 2:
                      this.$ = {
                        type: "TERNARY",
                        expr: a[o - 4],
                        truthy: a[o - 2],
                        falsey: a[o],
                      };
                      break;
                    case 3:
                      this.$ = { type: "OR", left: a[o - 2], right: a[o] };
                      break;
                    case 4:
                      this.$ = { type: "AND", left: a[o - 2], right: a[o] };
                      break;
                    case 5:
                      this.$ = { type: "LT", left: a[o - 2], right: a[o] };
                      break;
                    case 6:
                      this.$ = { type: "LTE", left: a[o - 2], right: a[o] };
                      break;
                    case 7:
                      this.$ = { type: "GT", left: a[o - 2], right: a[o] };
                      break;
                    case 8:
                      this.$ = { type: "GTE", left: a[o - 2], right: a[o] };
                      break;
                    case 9:
                      this.$ = { type: "NEQ", left: a[o - 2], right: a[o] };
                      break;
                    case 10:
                      this.$ = { type: "EQ", left: a[o - 2], right: a[o] };
                      break;
                    case 11:
                      this.$ = { type: "MOD", left: a[o - 2], right: a[o] };
                      break;
                    case 12:
                      this.$ = { type: "GROUP", expr: a[o - 1] };
                      break;
                    case 13:
                      this.$ = { type: "VAR" };
                      break;
                    case 14:
                      this.$ = { type: "NUM", val: Number(e) };
                  }
                },
                table: [
                  { 3: 1, 4: 2, 17: [1, 3], 19: [1, 4], 20: [1, 5] },
                  { 1: [3] },
                  {
                    5: [1, 6],
                    6: [1, 7],
                    8: [1, 8],
                    9: [1, 9],
                    10: [1, 10],
                    11: [1, 11],
                    12: [1, 12],
                    13: [1, 13],
                    14: [1, 14],
                    15: [1, 15],
                    16: [1, 16],
                  },
                  { 4: 17, 17: [1, 3], 19: [1, 4], 20: [1, 5] },
                  {
                    5: [2, 13],
                    6: [2, 13],
                    7: [2, 13],
                    8: [2, 13],
                    9: [2, 13],
                    10: [2, 13],
                    11: [2, 13],
                    12: [2, 13],
                    13: [2, 13],
                    14: [2, 13],
                    15: [2, 13],
                    16: [2, 13],
                    18: [2, 13],
                  },
                  {
                    5: [2, 14],
                    6: [2, 14],
                    7: [2, 14],
                    8: [2, 14],
                    9: [2, 14],
                    10: [2, 14],
                    11: [2, 14],
                    12: [2, 14],
                    13: [2, 14],
                    14: [2, 14],
                    15: [2, 14],
                    16: [2, 14],
                    18: [2, 14],
                  },
                  { 1: [2, 1] },
                  { 4: 18, 17: [1, 3], 19: [1, 4], 20: [1, 5] },
                  { 4: 19, 17: [1, 3], 19: [1, 4], 20: [1, 5] },
                  { 4: 20, 17: [1, 3], 19: [1, 4], 20: [1, 5] },
                  { 4: 21, 17: [1, 3], 19: [1, 4], 20: [1, 5] },
                  { 4: 22, 17: [1, 3], 19: [1, 4], 20: [1, 5] },
                  { 4: 23, 17: [1, 3], 19: [1, 4], 20: [1, 5] },
                  { 4: 24, 17: [1, 3], 19: [1, 4], 20: [1, 5] },
                  { 4: 25, 17: [1, 3], 19: [1, 4], 20: [1, 5] },
                  { 4: 26, 17: [1, 3], 19: [1, 4], 20: [1, 5] },
                  { 4: 27, 17: [1, 3], 19: [1, 4], 20: [1, 5] },
                  {
                    6: [1, 7],
                    8: [1, 8],
                    9: [1, 9],
                    10: [1, 10],
                    11: [1, 11],
                    12: [1, 12],
                    13: [1, 13],
                    14: [1, 14],
                    15: [1, 15],
                    16: [1, 16],
                    18: [1, 28],
                  },
                  {
                    6: [1, 7],
                    7: [1, 29],
                    8: [1, 8],
                    9: [1, 9],
                    10: [1, 10],
                    11: [1, 11],
                    12: [1, 12],
                    13: [1, 13],
                    14: [1, 14],
                    15: [1, 15],
                    16: [1, 16],
                  },
                  {
                    5: [2, 3],
                    6: [2, 3],
                    7: [2, 3],
                    8: [2, 3],
                    9: [1, 9],
                    10: [1, 10],
                    11: [1, 11],
                    12: [1, 12],
                    13: [1, 13],
                    14: [1, 14],
                    15: [1, 15],
                    16: [1, 16],
                    18: [2, 3],
                  },
                  {
                    5: [2, 4],
                    6: [2, 4],
                    7: [2, 4],
                    8: [2, 4],
                    9: [2, 4],
                    10: [1, 10],
                    11: [1, 11],
                    12: [1, 12],
                    13: [1, 13],
                    14: [1, 14],
                    15: [1, 15],
                    16: [1, 16],
                    18: [2, 4],
                  },
                  {
                    5: [2, 5],
                    6: [2, 5],
                    7: [2, 5],
                    8: [2, 5],
                    9: [2, 5],
                    10: [2, 5],
                    11: [2, 5],
                    12: [2, 5],
                    13: [2, 5],
                    14: [2, 5],
                    15: [2, 5],
                    16: [1, 16],
                    18: [2, 5],
                  },
                  {
                    5: [2, 6],
                    6: [2, 6],
                    7: [2, 6],
                    8: [2, 6],
                    9: [2, 6],
                    10: [2, 6],
                    11: [2, 6],
                    12: [2, 6],
                    13: [2, 6],
                    14: [2, 6],
                    15: [2, 6],
                    16: [1, 16],
                    18: [2, 6],
                  },
                  {
                    5: [2, 7],
                    6: [2, 7],
                    7: [2, 7],
                    8: [2, 7],
                    9: [2, 7],
                    10: [2, 7],
                    11: [2, 7],
                    12: [2, 7],
                    13: [2, 7],
                    14: [2, 7],
                    15: [2, 7],
                    16: [1, 16],
                    18: [2, 7],
                  },
                  {
                    5: [2, 8],
                    6: [2, 8],
                    7: [2, 8],
                    8: [2, 8],
                    9: [2, 8],
                    10: [2, 8],
                    11: [2, 8],
                    12: [2, 8],
                    13: [2, 8],
                    14: [2, 8],
                    15: [2, 8],
                    16: [1, 16],
                    18: [2, 8],
                  },
                  {
                    5: [2, 9],
                    6: [2, 9],
                    7: [2, 9],
                    8: [2, 9],
                    9: [2, 9],
                    10: [2, 9],
                    11: [2, 9],
                    12: [2, 9],
                    13: [2, 9],
                    14: [2, 9],
                    15: [2, 9],
                    16: [1, 16],
                    18: [2, 9],
                  },
                  {
                    5: [2, 10],
                    6: [2, 10],
                    7: [2, 10],
                    8: [2, 10],
                    9: [2, 10],
                    10: [2, 10],
                    11: [2, 10],
                    12: [2, 10],
                    13: [2, 10],
                    14: [2, 10],
                    15: [2, 10],
                    16: [1, 16],
                    18: [2, 10],
                  },
                  {
                    5: [2, 11],
                    6: [2, 11],
                    7: [2, 11],
                    8: [2, 11],
                    9: [2, 11],
                    10: [2, 11],
                    11: [2, 11],
                    12: [2, 11],
                    13: [2, 11],
                    14: [2, 11],
                    15: [2, 11],
                    16: [2, 11],
                    18: [2, 11],
                  },
                  {
                    5: [2, 12],
                    6: [2, 12],
                    7: [2, 12],
                    8: [2, 12],
                    9: [2, 12],
                    10: [2, 12],
                    11: [2, 12],
                    12: [2, 12],
                    13: [2, 12],
                    14: [2, 12],
                    15: [2, 12],
                    16: [2, 12],
                    18: [2, 12],
                  },
                  { 4: 30, 17: [1, 3], 19: [1, 4], 20: [1, 5] },
                  {
                    5: [2, 2],
                    6: [1, 7],
                    7: [2, 2],
                    8: [1, 8],
                    9: [1, 9],
                    10: [1, 10],
                    11: [1, 11],
                    12: [1, 12],
                    13: [1, 13],
                    14: [1, 14],
                    15: [1, 15],
                    16: [1, 16],
                    18: [2, 2],
                  },
                ],
                defaultActions: { 6: [2, 1] },
                parseError: function (e, t) {
                  throw new Error(e);
                },
                parse: function (e) {
                  var t = this,
                    n = [0],
                    r = [null],
                    s = [],
                    a = this.table,
                    i = "",
                    o = 0,
                    u = 0,
                    d = 0;
                  this.lexer.setInput(e),
                    (this.lexer.yy = this.yy),
                    (this.yy.lexer = this.lexer),
                    void 0 === this.lexer.yylloc && (this.lexer.yylloc = {});
                  var l = this.lexer.yylloc;
                  function c() {
                    var e;
                    return (
                      "number" != typeof (e = t.lexer.lex() || 1) &&
                        (e = t.symbols_[e] || e),
                      e
                    );
                  }
                  s.push(l),
                    "function" == typeof this.yy.parseError &&
                      (this.parseError = this.yy.parseError);
                  for (var _, h, m, p, f, y, g, M, L, v, Y = {}; ; ) {
                    if (
                      ((m = n[n.length - 1]),
                      this.defaultActions[m]
                        ? (p = this.defaultActions[m])
                        : (null == _ && (_ = c()), (p = a[m] && a[m][_])),
                      void 0 === p || !p.length || !p[0])
                    ) {
                      if (!d) {
                        for (y in ((L = []), a[m]))
                          this.terminals_[y] &&
                            y > 2 &&
                            L.push("'" + this.terminals_[y] + "'");
                        var b = "";
                        (b = this.lexer.showPosition
                          ? "Parse error on line " +
                            (o + 1) +
                            ":\n" +
                            this.lexer.showPosition() +
                            "\nExpecting " +
                            L.join(", ") +
                            ", got '" +
                            this.terminals_[_] +
                            "'"
                          : "Parse error on line " +
                            (o + 1) +
                            ": Unexpected " +
                            (1 == _
                              ? "end of input"
                              : "'" + (this.terminals_[_] || _) + "'")),
                          this.parseError(b, {
                            text: this.lexer.match,
                            token: this.terminals_[_] || _,
                            line: this.lexer.yylineno,
                            loc: l,
                            expected: L,
                          });
                      }
                      if (3 == d) {
                        if (1 == _) throw new Error(b || "Parsing halted.");
                        (u = this.lexer.yyleng),
                          (i = this.lexer.yytext),
                          (o = this.lexer.yylineno),
                          (l = this.lexer.yylloc),
                          (_ = c());
                      }
                      for (; !((2).toString() in a[m]); ) {
                        if (0 == m) throw new Error(b || "Parsing halted.");
                        (v = 1),
                          (n.length = n.length - 2 * v),
                          (r.length = r.length - v),
                          (s.length = s.length - v),
                          (m = n[n.length - 1]);
                      }
                      (h = _),
                        (_ = 2),
                        (p = a[(m = n[n.length - 1])] && a[m][2]),
                        (d = 3);
                    }
                    if (p[0] instanceof Array && p.length > 1)
                      throw new Error(
                        "Parse Error: multiple actions possible at state: " +
                          m +
                          ", token: " +
                          _
                      );
                    switch (p[0]) {
                      case 1:
                        n.push(_),
                          r.push(this.lexer.yytext),
                          s.push(this.lexer.yylloc),
                          n.push(p[1]),
                          (_ = null),
                          h
                            ? ((_ = h), (h = null))
                            : ((u = this.lexer.yyleng),
                              (i = this.lexer.yytext),
                              (o = this.lexer.yylineno),
                              (l = this.lexer.yylloc),
                              d > 0 && d--);
                        break;
                      case 2:
                        if (
                          ((g = this.productions_[p[1]][1]),
                          (Y.$ = r[r.length - g]),
                          (Y._$ = {
                            first_line: s[s.length - (g || 1)].first_line,
                            last_line: s[s.length - 1].last_line,
                            first_column: s[s.length - (g || 1)].first_column,
                            last_column: s[s.length - 1].last_column,
                          }),
                          void 0 !==
                            (f = this.performAction.call(
                              Y,
                              i,
                              u,
                              o,
                              this.yy,
                              p[1],
                              r,
                              s
                            )))
                        )
                          return f;
                        g &&
                          ((n = n.slice(0, -1 * g * 2)),
                          (r = r.slice(0, -1 * g)),
                          (s = s.slice(0, -1 * g))),
                          n.push(this.productions_[p[1]][0]),
                          r.push(Y.$),
                          s.push(Y._$),
                          (M = a[n[n.length - 2]][n[n.length - 1]]),
                          n.push(M);
                        break;
                      case 3:
                        return !0;
                    }
                  }
                  return !0;
                },
              }),
              (p = (function () {
                var e = {
                  EOF: 1,
                  parseError: function (e, t) {
                    if (!this.yy.parseError) throw new Error(e);
                    this.yy.parseError(e, t);
                  },
                  setInput: function (e) {
                    return (
                      (this._input = e),
                      (this._more = this._less = this.done = !1),
                      (this.yylineno = this.yyleng = 0),
                      (this.yytext = this.matched = this.match = ""),
                      (this.conditionStack = ["INITIAL"]),
                      (this.yylloc = {
                        first_line: 1,
                        first_column: 0,
                        last_line: 1,
                        last_column: 0,
                      }),
                      this
                    );
                  },
                  input: function () {
                    var e = this._input[0];
                    return (
                      (this.yytext += e),
                      this.yyleng++,
                      (this.match += e),
                      (this.matched += e),
                      e.match(/\n/) && this.yylineno++,
                      (this._input = this._input.slice(1)),
                      e
                    );
                  },
                  unput: function (e) {
                    return (this._input = e + this._input), this;
                  },
                  more: function () {
                    return (this._more = !0), this;
                  },
                  pastInput: function () {
                    var e = this.matched.substr(
                      0,
                      this.matched.length - this.match.length
                    );
                    return (
                      (e.length > 20 ? "..." : "") +
                      e.substr(-20).replace(/\n/g, "")
                    );
                  },
                  upcomingInput: function () {
                    var e = this.match;
                    return (
                      e.length < 20 &&
                        (e += this._input.substr(0, 20 - e.length)),
                      (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(
                        /\n/g,
                        ""
                      )
                    );
                  },
                  showPosition: function () {
                    var e = this.pastInput(),
                      t = new Array(e.length + 1).join("-");
                    return e + this.upcomingInput() + "\n" + t + "^";
                  },
                  next: function () {
                    if (this.done) return this.EOF;
                    var e, t;
                    this._input || (this.done = !0),
                      this._more || ((this.yytext = ""), (this.match = ""));
                    for (var n = this._currentRules(), r = 0; r < n.length; r++)
                      if ((e = this._input.match(this.rules[n[r]])))
                        return (
                          (t = e[0].match(/\n.*/g)) &&
                            (this.yylineno += t.length),
                          (this.yylloc = {
                            first_line: this.yylloc.last_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.last_column,
                            last_column: t
                              ? t[t.length - 1].length - 1
                              : this.yylloc.last_column + e[0].length,
                          }),
                          (this.yytext += e[0]),
                          (this.match += e[0]),
                          (this.matches = e),
                          (this.yyleng = this.yytext.length),
                          (this._more = !1),
                          (this._input = this._input.slice(e[0].length)),
                          (this.matched += e[0]),
                          this.performAction.call(
                            this,
                            this.yy,
                            this,
                            n[r],
                            this.conditionStack[this.conditionStack.length - 1]
                          ) || void 0
                        );
                    if ("" === this._input) return this.EOF;
                    this.parseError(
                      "Lexical error on line " +
                        (this.yylineno + 1) +
                        ". Unrecognized text.\n" +
                        this.showPosition(),
                      { text: "", token: null, line: this.yylineno }
                    );
                  },
                  lex: function () {
                    var e = this.next();
                    return void 0 !== e ? e : this.lex();
                  },
                  begin: function (e) {
                    this.conditionStack.push(e);
                  },
                  popState: function () {
                    return this.conditionStack.pop();
                  },
                  _currentRules: function () {
                    return this.conditions[
                      this.conditionStack[this.conditionStack.length - 1]
                    ].rules;
                  },
                  topState: function () {
                    return this.conditionStack[this.conditionStack.length - 2];
                  },
                  pushState: function (e) {
                    this.begin(e);
                  },
                  performAction: function (e, t, n, r) {
                    switch (n) {
                      case 0:
                        break;
                      case 1:
                        return 20;
                      case 2:
                        return 19;
                      case 3:
                        return 8;
                      case 4:
                        return 9;
                      case 5:
                        return 6;
                      case 6:
                        return 7;
                      case 7:
                        return 11;
                      case 8:
                        return 13;
                      case 9:
                        return 10;
                      case 10:
                        return 12;
                      case 11:
                        return 14;
                      case 12:
                        return 15;
                      case 13:
                        return 16;
                      case 14:
                        return 17;
                      case 15:
                        return 18;
                      case 16:
                        return 5;
                      case 17:
                        return "INVALID";
                    }
                  },
                  rules: [
                    /^\s+/,
                    /^[0-9]+(\.[0-9]+)?\b/,
                    /^n\b/,
                    /^\|\|/,
                    /^&&/,
                    /^\?/,
                    /^:/,
                    /^<=/,
                    /^>=/,
                    /^</,
                    /^>/,
                    /^!=/,
                    /^==/,
                    /^%/,
                    /^\(/,
                    /^\)/,
                    /^$/,
                    /^./,
                  ],
                  conditions: {
                    INITIAL: {
                      rules: [
                        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                        16, 17,
                      ],
                      inclusive: !0,
                    },
                  },
                };
                return e;
              })()),
              (m.lexer = p),
              m)),
            e.exports && (t = e.exports = c),
            (t.Jed = c);
        })();
      },
      2786: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("af", {
            months:
              "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split(
                "_"
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),
            weekdays:
              "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split(
                "_"
              ),
            weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),
            weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"),
            meridiemParse: /vm|nm/i,
            isPM: function (e) {
              return /^nm$/i.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 12 ? (n ? "vm" : "VM") : n ? "nm" : "NM";
            },
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Vandag om] LT",
              nextDay: "[Môre om] LT",
              nextWeek: "dddd [om] LT",
              lastDay: "[Gister om] LT",
              lastWeek: "[Laas] dddd [om] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "oor %s",
              past: "%s gelede",
              s: "'n paar sekondes",
              m: "'n minuut",
              mm: "%d minute",
              h: "'n uur",
              hh: "%d ure",
              d: "'n dag",
              dd: "%d dae",
              M: "'n maand",
              MM: "%d maande",
              y: "'n jaar",
              yy: "%d jaar",
            },
            ordinalParse: /\d{1,2}(ste|de)/,
            ordinal: function (e) {
              return e + (1 === e || 8 === e || e >= 20 ? "ste" : "de");
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      7702: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ar-ma", {
            months:
              "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split(
                "_"
              ),
            monthsShort:
              "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split(
                "_"
              ),
            weekdays:
              "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[اليوم على الساعة] LT",
              nextDay: "[غدا على الساعة] LT",
              nextWeek: "dddd [على الساعة] LT",
              lastDay: "[أمس على الساعة] LT",
              lastWeek: "dddd [على الساعة] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "في %s",
              past: "منذ %s",
              s: "ثوان",
              m: "دقيقة",
              mm: "%d دقائق",
              h: "ساعة",
              hh: "%d ساعات",
              d: "يوم",
              dd: "%d أيام",
              M: "شهر",
              MM: "%d أشهر",
              y: "سنة",
              yy: "%d سنوات",
            },
            week: { dow: 6, doy: 12 },
          });
        })(n(381));
      },
      6040: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "١",
              2: "٢",
              3: "٣",
              4: "٤",
              5: "٥",
              6: "٦",
              7: "٧",
              8: "٨",
              9: "٩",
              0: "٠",
            },
            n = {
              "١": "1",
              "٢": "2",
              "٣": "3",
              "٤": "4",
              "٥": "5",
              "٦": "6",
              "٧": "7",
              "٨": "8",
              "٩": "9",
              "٠": "0",
            };
          e.defineLocale("ar-sa", {
            months:
              "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split(
                "_"
              ),
            monthsShort:
              "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split(
                "_"
              ),
            weekdays:
              "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            meridiemParse: /ص|م/,
            isPM: function (e) {
              return "م" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "ص" : "م";
            },
            calendar: {
              sameDay: "[اليوم على الساعة] LT",
              nextDay: "[غدا على الساعة] LT",
              nextWeek: "dddd [على الساعة] LT",
              lastDay: "[أمس على الساعة] LT",
              lastWeek: "dddd [على الساعة] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "في %s",
              past: "منذ %s",
              s: "ثوان",
              m: "دقيقة",
              mm: "%d دقائق",
              h: "ساعة",
              hh: "%d ساعات",
              d: "يوم",
              dd: "%d أيام",
              M: "شهر",
              MM: "%d أشهر",
              y: "سنة",
              yy: "%d سنوات",
            },
            preparse: function (e) {
              return e
                .replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (e) {
                  return n[e];
                })
                .replace(/،/g, ",");
            },
            postformat: function (e) {
              return e
                .replace(/\d/g, function (e) {
                  return t[e];
                })
                .replace(/,/g, "،");
            },
            week: { dow: 6, doy: 12 },
          });
        })(n(381));
      },
      7100: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ar-tn", {
            months:
              "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split(
                "_"
              ),
            monthsShort:
              "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split(
                "_"
              ),
            weekdays:
              "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[اليوم على الساعة] LT",
              nextDay: "[غدا على الساعة] LT",
              nextWeek: "dddd [على الساعة] LT",
              lastDay: "[أمس على الساعة] LT",
              lastWeek: "dddd [على الساعة] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "في %s",
              past: "منذ %s",
              s: "ثوان",
              m: "دقيقة",
              mm: "%d دقائق",
              h: "ساعة",
              hh: "%d ساعات",
              d: "يوم",
              dd: "%d أيام",
              M: "شهر",
              MM: "%d أشهر",
              y: "سنة",
              yy: "%d سنوات",
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      867: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "١",
              2: "٢",
              3: "٣",
              4: "٤",
              5: "٥",
              6: "٦",
              7: "٧",
              8: "٨",
              9: "٩",
              0: "٠",
            },
            n = {
              "١": "1",
              "٢": "2",
              "٣": "3",
              "٤": "4",
              "٥": "5",
              "٦": "6",
              "٧": "7",
              "٨": "8",
              "٩": "9",
              "٠": "0",
            },
            r = function (e) {
              return 0 === e
                ? 0
                : 1 === e
                ? 1
                : 2 === e
                ? 2
                : e % 100 >= 3 && e % 100 <= 10
                ? 3
                : e % 100 >= 11
                ? 4
                : 5;
            },
            s = {
              s: [
                "أقل من ثانية",
                "ثانية واحدة",
                ["ثانيتان", "ثانيتين"],
                "%d ثوان",
                "%d ثانية",
                "%d ثانية",
              ],
              m: [
                "أقل من دقيقة",
                "دقيقة واحدة",
                ["دقيقتان", "دقيقتين"],
                "%d دقائق",
                "%d دقيقة",
                "%d دقيقة",
              ],
              h: [
                "أقل من ساعة",
                "ساعة واحدة",
                ["ساعتان", "ساعتين"],
                "%d ساعات",
                "%d ساعة",
                "%d ساعة",
              ],
              d: [
                "أقل من يوم",
                "يوم واحد",
                ["يومان", "يومين"],
                "%d أيام",
                "%d يومًا",
                "%d يوم",
              ],
              M: [
                "أقل من شهر",
                "شهر واحد",
                ["شهران", "شهرين"],
                "%d أشهر",
                "%d شهرا",
                "%d شهر",
              ],
              y: [
                "أقل من عام",
                "عام واحد",
                ["عامان", "عامين"],
                "%d أعوام",
                "%d عامًا",
                "%d عام",
              ],
            },
            a = function (e) {
              return function (t, n, a, i) {
                var o = r(t),
                  u = s[e][r(t)];
                return 2 === o && (u = u[n ? 0 : 1]), u.replace(/%d/i, t);
              };
            },
            i = [
              "كانون الثاني يناير",
              "شباط فبراير",
              "آذار مارس",
              "نيسان أبريل",
              "أيار مايو",
              "حزيران يونيو",
              "تموز يوليو",
              "آب أغسطس",
              "أيلول سبتمبر",
              "تشرين الأول أكتوبر",
              "تشرين الثاني نوفمبر",
              "كانون الأول ديسمبر",
            ];
          e.defineLocale("ar", {
            months: i,
            monthsShort: i,
            weekdays:
              "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "D/‏M/‏YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            meridiemParse: /ص|م/,
            isPM: function (e) {
              return "م" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "ص" : "م";
            },
            calendar: {
              sameDay: "[اليوم عند الساعة] LT",
              nextDay: "[غدًا عند الساعة] LT",
              nextWeek: "dddd [عند الساعة] LT",
              lastDay: "[أمس عند الساعة] LT",
              lastWeek: "dddd [عند الساعة] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "بعد %s",
              past: "منذ %s",
              s: a("s"),
              m: a("m"),
              mm: a("m"),
              h: a("h"),
              hh: a("h"),
              d: a("d"),
              dd: a("d"),
              M: a("M"),
              MM: a("M"),
              y: a("y"),
              yy: a("y"),
            },
            preparse: function (e) {
              return e
                .replace(/\u200f/g, "")
                .replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (e) {
                  return n[e];
                })
                .replace(/،/g, ",");
            },
            postformat: function (e) {
              return e
                .replace(/\d/g, function (e) {
                  return t[e];
                })
                .replace(/,/g, "،");
            },
            week: { dow: 6, doy: 12 },
          });
        })(n(381));
      },
      1083: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            1: "-inci",
            5: "-inci",
            8: "-inci",
            70: "-inci",
            80: "-inci",
            2: "-nci",
            7: "-nci",
            20: "-nci",
            50: "-nci",
            3: "-üncü",
            4: "-üncü",
            100: "-üncü",
            6: "-ncı",
            9: "-uncu",
            10: "-uncu",
            30: "-uncu",
            60: "-ıncı",
            90: "-ıncı",
          };
          e.defineLocale("az", {
            months:
              "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split(
                "_"
              ),
            monthsShort:
              "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),
            weekdays:
              "Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split(
                "_"
              ),
            weekdaysShort: "Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"),
            weekdaysMin: "Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[bugün saat] LT",
              nextDay: "[sabah saat] LT",
              nextWeek: "[gələn həftə] dddd [saat] LT",
              lastDay: "[dünən] LT",
              lastWeek: "[keçən həftə] dddd [saat] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s sonra",
              past: "%s əvvəl",
              s: "birneçə saniyyə",
              m: "bir dəqiqə",
              mm: "%d dəqiqə",
              h: "bir saat",
              hh: "%d saat",
              d: "bir gün",
              dd: "%d gün",
              M: "bir ay",
              MM: "%d ay",
              y: "bir il",
              yy: "%d il",
            },
            meridiemParse: /gecə|səhər|gündüz|axşam/,
            isPM: function (e) {
              return /^(gündüz|axşam)$/.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "gecə"
                : e < 12
                ? "səhər"
                : e < 17
                ? "gündüz"
                : "axşam";
            },
            ordinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
            ordinal: function (e) {
              if (0 === e) return e + "-ıncı";
              var n = e % 10,
                r = (e % 100) - n,
                s = e >= 100 ? 100 : null;
              return e + (t[n] || t[r] || t[s]);
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      9808: function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t) {
            var n = e.split("_");
            return t % 10 == 1 && t % 100 != 11
              ? n[0]
              : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20)
              ? n[1]
              : n[2];
          }
          function n(e, n, r) {
            return "m" === r
              ? n
                ? "хвіліна"
                : "хвіліну"
              : "h" === r
              ? n
                ? "гадзіна"
                : "гадзіну"
              : e +
                " " +
                t(
                  {
                    mm: n ? "хвіліна_хвіліны_хвілін" : "хвіліну_хвіліны_хвілін",
                    hh: n ? "гадзіна_гадзіны_гадзін" : "гадзіну_гадзіны_гадзін",
                    dd: "дзень_дні_дзён",
                    MM: "месяц_месяцы_месяцаў",
                    yy: "год_гады_гадоў",
                  }[r],
                  +e
                );
          }
          e.defineLocale("be", {
            months: {
              format:
                "студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split(
                  "_"
                ),
              standalone:
                "студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split(
                  "_"
                ),
            },
            monthsShort:
              "студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж".split(
                "_"
              ),
            weekdays: {
              format:
                "нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу".split(
                  "_"
                ),
              standalone:
                "нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота".split(
                  "_"
                ),
              isFormat: /\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/,
            },
            weekdaysShort: "нд_пн_ат_ср_чц_пт_сб".split("_"),
            weekdaysMin: "нд_пн_ат_ср_чц_пт_сб".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY г.",
              LLL: "D MMMM YYYY г., HH:mm",
              LLLL: "dddd, D MMMM YYYY г., HH:mm",
            },
            calendar: {
              sameDay: "[Сёння ў] LT",
              nextDay: "[Заўтра ў] LT",
              lastDay: "[Учора ў] LT",
              nextWeek: function () {
                return "[У] dddd [ў] LT";
              },
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                  case 3:
                  case 5:
                  case 6:
                    return "[У мінулую] dddd [ў] LT";
                  case 1:
                  case 2:
                  case 4:
                    return "[У мінулы] dddd [ў] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "праз %s",
              past: "%s таму",
              s: "некалькі секунд",
              m: n,
              mm: n,
              h: n,
              hh: n,
              d: "дзень",
              dd: n,
              M: "месяц",
              MM: n,
              y: "год",
              yy: n,
            },
            meridiemParse: /ночы|раніцы|дня|вечара/,
            isPM: function (e) {
              return /^(дня|вечара)$/.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "ночы"
                : e < 12
                ? "раніцы"
                : e < 17
                ? "дня"
                : "вечара";
            },
            ordinalParse: /\d{1,2}-(і|ы|га)/,
            ordinal: function (e, t) {
              switch (t) {
                case "M":
                case "d":
                case "DDD":
                case "w":
                case "W":
                  return (e % 10 != 2 && e % 10 != 3) ||
                    e % 100 == 12 ||
                    e % 100 == 13
                    ? e + "-ы"
                    : e + "-і";
                case "D":
                  return e + "-га";
                default:
                  return e;
              }
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      8338: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("bg", {
            months:
              "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split(
                "_"
              ),
            monthsShort:
              "янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
            weekdays:
              "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split(
                "_"
              ),
            weekdaysShort: "нед_пон_вто_сря_чет_пет_съб".split("_"),
            weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "D.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY H:mm",
              LLLL: "dddd, D MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[Днес в] LT",
              nextDay: "[Утре в] LT",
              nextWeek: "dddd [в] LT",
              lastDay: "[Вчера в] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                  case 3:
                  case 6:
                    return "[В изминалата] dddd [в] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[В изминалия] dddd [в] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "след %s",
              past: "преди %s",
              s: "няколко секунди",
              m: "минута",
              mm: "%d минути",
              h: "час",
              hh: "%d часа",
              d: "ден",
              dd: "%d дни",
              M: "месец",
              MM: "%d месеца",
              y: "година",
              yy: "%d години",
            },
            ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
            ordinal: function (e) {
              var t = e % 10,
                n = e % 100;
              return 0 === e
                ? e + "-ев"
                : 0 === n
                ? e + "-ен"
                : n > 10 && n < 20
                ? e + "-ти"
                : 1 === t
                ? e + "-ви"
                : 2 === t
                ? e + "-ри"
                : 7 === t || 8 === t
                ? e + "-ми"
                : e + "-ти";
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      8905: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "১",
              2: "২",
              3: "৩",
              4: "৪",
              5: "৫",
              6: "৬",
              7: "৭",
              8: "৮",
              9: "৯",
              0: "০",
            },
            n = {
              "১": "1",
              "২": "2",
              "৩": "3",
              "৪": "4",
              "৫": "5",
              "৬": "6",
              "৭": "7",
              "৮": "8",
              "৯": "9",
              "০": "0",
            };
          e.defineLocale("bn", {
            months:
              "জানুয়ারী_ফেবুয়ারী_মার্চ_এপ্রিল_মে_জুন_জুলাই_অগাস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split(
                "_"
              ),
            monthsShort:
              "জানু_ফেব_মার্চ_এপর_মে_জুন_জুল_অগ_সেপ্ট_অক্টো_নভ_ডিসেম্".split(
                "_"
              ),
            weekdays:
              "রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পত্তিবার_শুক্রবার_শনিবার".split(
                "_"
              ),
            weekdaysShort: "রবি_সোম_মঙ্গল_বুধ_বৃহস্পত্তি_শুক্র_শনি".split("_"),
            weekdaysMin: "রব_সম_মঙ্গ_বু_ব্রিহ_শু_শনি".split("_"),
            longDateFormat: {
              LT: "A h:mm সময়",
              LTS: "A h:mm:ss সময়",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, A h:mm সময়",
              LLLL: "dddd, D MMMM YYYY, A h:mm সময়",
            },
            calendar: {
              sameDay: "[আজ] LT",
              nextDay: "[আগামীকাল] LT",
              nextWeek: "dddd, LT",
              lastDay: "[গতকাল] LT",
              lastWeek: "[গত] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s পরে",
              past: "%s আগে",
              s: "কয়েক সেকেন্ড",
              m: "এক মিনিট",
              mm: "%d মিনিট",
              h: "এক ঘন্টা",
              hh: "%d ঘন্টা",
              d: "এক দিন",
              dd: "%d দিন",
              M: "এক মাস",
              MM: "%d মাস",
              y: "এক বছর",
              yy: "%d বছর",
            },
            preparse: function (e) {
              return e.replace(/[১২৩৪৫৬৭৮৯০]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                ("রাত" === t && e >= 4) ||
                ("দুপুর" === t && e < 5) ||
                "বিকাল" === t
                  ? e + 12
                  : e
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "রাত"
                : e < 10
                ? "সকাল"
                : e < 17
                ? "দুপুর"
                : e < 20
                ? "বিকাল"
                : "রাত";
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(381));
      },
      1560: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "༡",
              2: "༢",
              3: "༣",
              4: "༤",
              5: "༥",
              6: "༦",
              7: "༧",
              8: "༨",
              9: "༩",
              0: "༠",
            },
            n = {
              "༡": "1",
              "༢": "2",
              "༣": "3",
              "༤": "4",
              "༥": "5",
              "༦": "6",
              "༧": "7",
              "༨": "8",
              "༩": "9",
              "༠": "0",
            };
          e.defineLocale("bo", {
            months:
              "ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split(
                "_"
              ),
            monthsShort:
              "ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split(
                "_"
              ),
            weekdays:
              "གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split(
                "_"
              ),
            weekdaysShort:
              "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),
            weekdaysMin:
              "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),
            longDateFormat: {
              LT: "A h:mm",
              LTS: "A h:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, A h:mm",
              LLLL: "dddd, D MMMM YYYY, A h:mm",
            },
            calendar: {
              sameDay: "[དི་རིང] LT",
              nextDay: "[སང་ཉིན] LT",
              nextWeek: "[བདུན་ཕྲག་རྗེས་མ], LT",
              lastDay: "[ཁ་སང] LT",
              lastWeek: "[བདུན་ཕྲག་མཐའ་མ] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s ལ་",
              past: "%s སྔན་ལ",
              s: "ལམ་སང",
              m: "སྐར་མ་གཅིག",
              mm: "%d སྐར་མ",
              h: "ཆུ་ཚོད་གཅིག",
              hh: "%d ཆུ་ཚོད",
              d: "ཉིན་གཅིག",
              dd: "%d ཉིན་",
              M: "ཟླ་བ་གཅིག",
              MM: "%d ཟླ་བ",
              y: "ལོ་གཅིག",
              yy: "%d ལོ",
            },
            preparse: function (e) {
              return e.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                ("མཚན་མོ" === t && e >= 4) ||
                ("ཉིན་གུང" === t && e < 5) ||
                "དགོང་དག" === t
                  ? e + 12
                  : e
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "མཚན་མོ"
                : e < 10
                ? "ཞོགས་ཀས"
                : e < 17
                ? "ཉིན་གུང"
                : e < 20
                ? "དགོང་དག"
                : "མཚན་མོ";
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(381));
      },
      1278: function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n) {
            return (
              e + " " + s({ mm: "munutenn", MM: "miz", dd: "devezh" }[n], e)
            );
          }
          function n(e) {
            switch (r(e)) {
              case 1:
              case 3:
              case 4:
              case 5:
              case 9:
                return e + " bloaz";
              default:
                return e + " vloaz";
            }
          }
          function r(e) {
            return e > 9 ? r(e % 10) : e;
          }
          function s(e, t) {
            return 2 === t ? a(e) : e;
          }
          function a(e) {
            var t = { m: "v", b: "v", d: "z" };
            return void 0 === t[e.charAt(0)]
              ? e
              : t[e.charAt(0)] + e.substring(1);
          }
          e.defineLocale("br", {
            months:
              "Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split(
                "_"
              ),
            monthsShort:
              "Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),
            weekdays: "Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),
            weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),
            weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),
            longDateFormat: {
              LT: "h[e]mm A",
              LTS: "h[e]mm:ss A",
              L: "DD/MM/YYYY",
              LL: "D [a viz] MMMM YYYY",
              LLL: "D [a viz] MMMM YYYY h[e]mm A",
              LLLL: "dddd, D [a viz] MMMM YYYY h[e]mm A",
            },
            calendar: {
              sameDay: "[Hiziv da] LT",
              nextDay: "[Warc'hoazh da] LT",
              nextWeek: "dddd [da] LT",
              lastDay: "[Dec'h da] LT",
              lastWeek: "dddd [paset da] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "a-benn %s",
              past: "%s 'zo",
              s: "un nebeud segondennoù",
              m: "ur vunutenn",
              mm: t,
              h: "un eur",
              hh: "%d eur",
              d: "un devezh",
              dd: t,
              M: "ur miz",
              MM: t,
              y: "ur bloaz",
              yy: n,
            },
            ordinalParse: /\d{1,2}(añ|vet)/,
            ordinal: function (e) {
              return e + (1 === e ? "añ" : "vet");
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      622: function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n) {
            var r = e + " ";
            switch (n) {
              case "m":
                return t ? "jedna minuta" : "jedne minute";
              case "mm":
                return (r +=
                  1 === e
                    ? "minuta"
                    : 2 === e || 3 === e || 4 === e
                    ? "minute"
                    : "minuta");
              case "h":
                return t ? "jedan sat" : "jednog sata";
              case "hh":
                return (r +=
                  1 === e
                    ? "sat"
                    : 2 === e || 3 === e || 4 === e
                    ? "sata"
                    : "sati");
              case "dd":
                return (r += 1 === e ? "dan" : "dana");
              case "MM":
                return (r +=
                  1 === e
                    ? "mjesec"
                    : 2 === e || 3 === e || 4 === e
                    ? "mjeseca"
                    : "mjeseci");
              case "yy":
                return (r +=
                  1 === e
                    ? "godina"
                    : 2 === e || 3 === e || 4 === e
                    ? "godine"
                    : "godina");
            }
          }
          e.defineLocale("bs", {
            months:
              "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split(
                "_"
              ),
            monthsShort:
              "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split(
                "_"
              ),
            weekdays:
              "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split(
                "_"
              ),
            weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
            weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD. MM. YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd, D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[danas u] LT",
              nextDay: "[sutra u] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[u] [nedjelju] [u] LT";
                  case 3:
                    return "[u] [srijedu] [u] LT";
                  case 6:
                    return "[u] [subotu] [u] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[u] dddd [u] LT";
                }
              },
              lastDay: "[jučer u] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                  case 3:
                    return "[prošlu] dddd [u] LT";
                  case 6:
                    return "[prošle] [subote] [u] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[prošli] dddd [u] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "za %s",
              past: "prije %s",
              s: "par sekundi",
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: "dan",
              dd: t,
              M: "mjesec",
              MM: t,
              y: "godinu",
              yy: t,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      2468: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ca", {
            months:
              "gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split(
                "_"
              ),
            monthsShort:
              "gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.".split(
                "_"
              ),
            weekdays:
              "diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split(
                "_"
              ),
            weekdaysShort: "dg._dl._dt._dc._dj._dv._ds.".split("_"),
            weekdaysMin: "Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY H:mm",
              LLLL: "dddd D MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: function () {
                return (
                  "[avui a " + (1 !== this.hours() ? "les" : "la") + "] LT"
                );
              },
              nextDay: function () {
                return (
                  "[demà a " + (1 !== this.hours() ? "les" : "la") + "] LT"
                );
              },
              nextWeek: function () {
                return (
                  "dddd [a " + (1 !== this.hours() ? "les" : "la") + "] LT"
                );
              },
              lastDay: function () {
                return (
                  "[ahir a " + (1 !== this.hours() ? "les" : "la") + "] LT"
                );
              },
              lastWeek: function () {
                return (
                  "[el] dddd [passat a " +
                  (1 !== this.hours() ? "les" : "la") +
                  "] LT"
                );
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "en %s",
              past: "fa %s",
              s: "uns segons",
              m: "un minut",
              mm: "%d minuts",
              h: "una hora",
              hh: "%d hores",
              d: "un dia",
              dd: "%d dies",
              M: "un mes",
              MM: "%d mesos",
              y: "un any",
              yy: "%d anys",
            },
            ordinalParse: /\d{1,2}(r|n|t|è|a)/,
            ordinal: function (e, t) {
              var n =
                1 === e
                  ? "r"
                  : 2 === e
                  ? "n"
                  : 3 === e
                  ? "r"
                  : 4 === e
                  ? "t"
                  : "è";
              return ("w" !== t && "W" !== t) || (n = "a"), e + n;
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      5822: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split(
                "_"
              ),
            n = "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_");
          function r(e) {
            return e > 1 && e < 5 && 1 != ~~(e / 10);
          }
          function s(e, t, n, s) {
            var a = e + " ";
            switch (n) {
              case "s":
                return t || s ? "pár sekund" : "pár sekundami";
              case "m":
                return t ? "minuta" : s ? "minutu" : "minutou";
              case "mm":
                return t || s
                  ? a + (r(e) ? "minuty" : "minut")
                  : a + "minutami";
              case "h":
                return t ? "hodina" : s ? "hodinu" : "hodinou";
              case "hh":
                return t || s
                  ? a + (r(e) ? "hodiny" : "hodin")
                  : a + "hodinami";
              case "d":
                return t || s ? "den" : "dnem";
              case "dd":
                return t || s ? a + (r(e) ? "dny" : "dní") : a + "dny";
              case "M":
                return t || s ? "měsíc" : "měsícem";
              case "MM":
                return t || s ? a + (r(e) ? "měsíce" : "měsíců") : a + "měsíci";
              case "y":
                return t || s ? "rok" : "rokem";
              case "yy":
                return t || s ? a + (r(e) ? "roky" : "let") : a + "lety";
            }
          }
          e.defineLocale("cs", {
            months: t,
            monthsShort: n,
            monthsParse: (function (e, t) {
              var n,
                r = [];
              for (n = 0; n < 12; n++)
                r[n] = new RegExp("^" + e[n] + "$|^" + t[n] + "$", "i");
              return r;
            })(t, n),
            shortMonthsParse: (function (e) {
              var t,
                n = [];
              for (t = 0; t < 12; t++) n[t] = new RegExp("^" + e[t] + "$", "i");
              return n;
            })(n),
            longMonthsParse: (function (e) {
              var t,
                n = [];
              for (t = 0; t < 12; t++) n[t] = new RegExp("^" + e[t] + "$", "i");
              return n;
            })(t),
            weekdays: "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split(
              "_"
            ),
            weekdaysShort: "ne_po_út_st_čt_pá_so".split("_"),
            weekdaysMin: "ne_po_út_st_čt_pá_so".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[dnes v] LT",
              nextDay: "[zítra v] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[v neděli v] LT";
                  case 1:
                  case 2:
                    return "[v] dddd [v] LT";
                  case 3:
                    return "[ve středu v] LT";
                  case 4:
                    return "[ve čtvrtek v] LT";
                  case 5:
                    return "[v pátek v] LT";
                  case 6:
                    return "[v sobotu v] LT";
                }
              },
              lastDay: "[včera v] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[minulou neděli v] LT";
                  case 1:
                  case 2:
                    return "[minulé] dddd [v] LT";
                  case 3:
                    return "[minulou středu v] LT";
                  case 4:
                  case 5:
                    return "[minulý] dddd [v] LT";
                  case 6:
                    return "[minulou sobotu v] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "za %s",
              past: "před %s",
              s,
              m: s,
              mm: s,
              h: s,
              hh: s,
              d: s,
              dd: s,
              M: s,
              MM: s,
              y: s,
              yy: s,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      877: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("cv", {
            months:
              "кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split(
                "_"
              ),
            monthsShort:
              "кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"),
            weekdays:
              "вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split(
                "_"
              ),
            weekdaysShort: "выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"),
            weekdaysMin: "вр_тн_ыт_юн_кҫ_эр_шм".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD-MM-YYYY",
              LL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]",
              LLL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm",
              LLLL: "dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm",
            },
            calendar: {
              sameDay: "[Паян] LT [сехетре]",
              nextDay: "[Ыран] LT [сехетре]",
              lastDay: "[Ӗнер] LT [сехетре]",
              nextWeek: "[Ҫитес] dddd LT [сехетре]",
              lastWeek: "[Иртнӗ] dddd LT [сехетре]",
              sameElse: "L",
            },
            relativeTime: {
              future: function (e) {
                return (
                  e +
                  (/сехет$/i.exec(e) ? "рен" : /ҫул$/i.exec(e) ? "тан" : "ран")
                );
              },
              past: "%s каялла",
              s: "пӗр-ик ҫеккунт",
              m: "пӗр минут",
              mm: "%d минут",
              h: "пӗр сехет",
              hh: "%d сехет",
              d: "пӗр кун",
              dd: "%d кун",
              M: "пӗр уйӑх",
              MM: "%d уйӑх",
              y: "пӗр ҫул",
              yy: "%d ҫул",
            },
            ordinalParse: /\d{1,2}-мӗш/,
            ordinal: "%d-мӗш",
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      7373: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("cy", {
            months:
              "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split(
                "_"
              ),
            monthsShort:
              "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),
            weekdays:
              "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split(
                "_"
              ),
            weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
            weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Heddiw am] LT",
              nextDay: "[Yfory am] LT",
              nextWeek: "dddd [am] LT",
              lastDay: "[Ddoe am] LT",
              lastWeek: "dddd [diwethaf am] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "mewn %s",
              past: "%s yn ôl",
              s: "ychydig eiliadau",
              m: "munud",
              mm: "%d munud",
              h: "awr",
              hh: "%d awr",
              d: "diwrnod",
              dd: "%d diwrnod",
              M: "mis",
              MM: "%d mis",
              y: "blwyddyn",
              yy: "%d flynedd",
            },
            ordinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
            ordinal: function (e) {
              var t = "";
              return (
                e > 20
                  ? (t =
                      40 === e || 50 === e || 60 === e || 80 === e || 100 === e
                        ? "fed"
                        : "ain")
                  : e > 0 &&
                    (t = [
                      "",
                      "af",
                      "il",
                      "ydd",
                      "ydd",
                      "ed",
                      "ed",
                      "ed",
                      "fed",
                      "fed",
                      "fed",
                      "eg",
                      "fed",
                      "eg",
                      "eg",
                      "fed",
                      "eg",
                      "eg",
                      "fed",
                      "eg",
                      "fed",
                    ][e]),
                e + t
              );
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      4780: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("da", {
            months:
              "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split(
                "_"
              ),
            monthsShort:
              "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
            weekdays:
              "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
            weekdaysShort: "søn_man_tir_ons_tor_fre_lør".split("_"),
            weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY HH:mm",
              LLLL: "dddd [d.] D. MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[I dag kl.] LT",
              nextDay: "[I morgen kl.] LT",
              nextWeek: "dddd [kl.] LT",
              lastDay: "[I går kl.] LT",
              lastWeek: "[sidste] dddd [kl] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "om %s",
              past: "%s siden",
              s: "få sekunder",
              m: "et minut",
              mm: "%d minutter",
              h: "en time",
              hh: "%d timer",
              d: "en dag",
              dd: "%d dage",
              M: "en måned",
              MM: "%d måneder",
              y: "et år",
              yy: "%d år",
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      217: function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n, r) {
            var s = {
              m: ["eine Minute", "einer Minute"],
              h: ["eine Stunde", "einer Stunde"],
              d: ["ein Tag", "einem Tag"],
              dd: [e + " Tage", e + " Tagen"],
              M: ["ein Monat", "einem Monat"],
              MM: [e + " Monate", e + " Monaten"],
              y: ["ein Jahr", "einem Jahr"],
              yy: [e + " Jahre", e + " Jahren"],
            };
            return t ? s[n][0] : s[n][1];
          }
          e.defineLocale("de-at", {
            months:
              "Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split(
                "_"
              ),
            monthsShort:
              "Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split(
                "_"
              ),
            weekdays:
              "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split(
                "_"
              ),
            weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
            weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY HH:mm",
              LLLL: "dddd, D. MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[heute um] LT [Uhr]",
              sameElse: "L",
              nextDay: "[morgen um] LT [Uhr]",
              nextWeek: "dddd [um] LT [Uhr]",
              lastDay: "[gestern um] LT [Uhr]",
              lastWeek: "[letzten] dddd [um] LT [Uhr]",
            },
            relativeTime: {
              future: "in %s",
              past: "vor %s",
              s: "ein paar Sekunden",
              m: t,
              mm: "%d Minuten",
              h: t,
              hh: "%d Stunden",
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      9740: function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n, r) {
            var s = {
              m: ["eine Minute", "einer Minute"],
              h: ["eine Stunde", "einer Stunde"],
              d: ["ein Tag", "einem Tag"],
              dd: [e + " Tage", e + " Tagen"],
              M: ["ein Monat", "einem Monat"],
              MM: [e + " Monate", e + " Monaten"],
              y: ["ein Jahr", "einem Jahr"],
              yy: [e + " Jahre", e + " Jahren"],
            };
            return t ? s[n][0] : s[n][1];
          }
          e.defineLocale("de", {
            months:
              "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split(
                "_"
              ),
            monthsShort:
              "Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split(
                "_"
              ),
            weekdays:
              "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split(
                "_"
              ),
            weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
            weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY HH:mm",
              LLLL: "dddd, D. MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[heute um] LT [Uhr]",
              sameElse: "L",
              nextDay: "[morgen um] LT [Uhr]",
              nextWeek: "dddd [um] LT [Uhr]",
              lastDay: "[gestern um] LT [Uhr]",
              lastWeek: "[letzten] dddd [um] LT [Uhr]",
            },
            relativeTime: {
              future: "in %s",
              past: "vor %s",
              s: "ein paar Sekunden",
              m: t,
              mm: "%d Minuten",
              h: t,
              hh: "%d Stunden",
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      5300: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = [
              "ޖެނުއަރީ",
              "ފެބްރުއަރީ",
              "މާރިޗު",
              "އޭޕްރީލު",
              "މޭ",
              "ޖޫން",
              "ޖުލައި",
              "އޯގަސްޓު",
              "ސެޕްޓެމްބަރު",
              "އޮކްޓޯބަރު",
              "ނޮވެމްބަރު",
              "ޑިސެމްބަރު",
            ],
            n = [
              "އާދިއްތަ",
              "ހޯމަ",
              "އަންގާރަ",
              "ބުދަ",
              "ބުރާސްފަތި",
              "ހުކުރު",
              "ހޮނިހިރު",
            ];
          e.defineLocale("dv", {
            months: t,
            monthsShort: t,
            weekdays: n,
            weekdaysShort: n,
            weekdaysMin: "އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "D/M/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            meridiemParse: /މކ|މފ/,
            isPM: function (e) {
              return "މފ" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "މކ" : "މފ";
            },
            calendar: {
              sameDay: "[މިއަދު] LT",
              nextDay: "[މާދަމާ] LT",
              nextWeek: "dddd LT",
              lastDay: "[އިއްޔެ] LT",
              lastWeek: "[ފާއިތުވި] dddd LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "ތެރޭގައި %s",
              past: "ކުރިން %s",
              s: "ސިކުންތުކޮޅެއް",
              m: "މިނިޓެއް",
              mm: "މިނިޓު %d",
              h: "ގަޑިއިރެއް",
              hh: "ގަޑިއިރު %d",
              d: "ދުވަހެއް",
              dd: "ދުވަސް %d",
              M: "މަހެއް",
              MM: "މަސް %d",
              y: "އަހަރެއް",
              yy: "އަހަރު %d",
            },
            preparse: function (e) {
              return e.replace(/،/g, ",");
            },
            postformat: function (e) {
              return e.replace(/,/g, "،");
            },
            week: { dow: 7, doy: 12 },
          });
        })(n(381));
      },
      837: function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e) {
            return (
              e instanceof Function ||
              "[object Function]" === Object.prototype.toString.call(e)
            );
          }
          e.defineLocale("el", {
            monthsNominativeEl:
              "Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split(
                "_"
              ),
            monthsGenitiveEl:
              "Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split(
                "_"
              ),
            months: function (e, t) {
              return /D/.test(t.substring(0, t.indexOf("MMMM")))
                ? this._monthsGenitiveEl[e.month()]
                : this._monthsNominativeEl[e.month()];
            },
            monthsShort:
              "Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),
            weekdays:
              "Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split(
                "_"
              ),
            weekdaysShort: "Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),
            weekdaysMin: "Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),
            meridiem: function (e, t, n) {
              return e > 11 ? (n ? "μμ" : "ΜΜ") : n ? "πμ" : "ΠΜ";
            },
            isPM: function (e) {
              return "μ" === (e + "").toLowerCase()[0];
            },
            meridiemParse: /[ΠΜ]\.?Μ?\.?/i,
            longDateFormat: {
              LT: "h:mm A",
              LTS: "h:mm:ss A",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY h:mm A",
              LLLL: "dddd, D MMMM YYYY h:mm A",
            },
            calendarEl: {
              sameDay: "[Σήμερα {}] LT",
              nextDay: "[Αύριο {}] LT",
              nextWeek: "dddd [{}] LT",
              lastDay: "[Χθες {}] LT",
              lastWeek: function () {
                return 6 === this.day()
                  ? "[το προηγούμενο] dddd [{}] LT"
                  : "[την προηγούμενη] dddd [{}] LT";
              },
              sameElse: "L",
            },
            calendar: function (e, n) {
              var r = this._calendarEl[e],
                s = n && n.hours();
              return (
                t(r) && (r = r.apply(n)),
                r.replace("{}", s % 12 == 1 ? "στη" : "στις")
              );
            },
            relativeTime: {
              future: "σε %s",
              past: "%s πριν",
              s: "λίγα δευτερόλεπτα",
              m: "ένα λεπτό",
              mm: "%d λεπτά",
              h: "μία ώρα",
              hh: "%d ώρες",
              d: "μία μέρα",
              dd: "%d μέρες",
              M: "ένας μήνας",
              MM: "%d μήνες",
              y: "ένας χρόνος",
              yy: "%d χρόνια",
            },
            ordinalParse: /\d{1,2}η/,
            ordinal: "%dη",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      8348: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("en-au", {
            months:
              "January_February_March_April_May_June_July_August_September_October_November_December".split(
                "_"
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays:
              "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                "_"
              ),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat: {
              LT: "h:mm A",
              LTS: "h:mm:ss A",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY h:mm A",
              LLLL: "dddd, D MMMM YYYY h:mm A",
            },
            calendar: {
              sameDay: "[Today at] LT",
              nextDay: "[Tomorrow at] LT",
              nextWeek: "dddd [at] LT",
              lastDay: "[Yesterday at] LT",
              lastWeek: "[Last] dddd [at] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "in %s",
              past: "%s ago",
              s: "a few seconds",
              m: "a minute",
              mm: "%d minutes",
              h: "an hour",
              hh: "%d hours",
              d: "a day",
              dd: "%d days",
              M: "a month",
              MM: "%d months",
              y: "a year",
              yy: "%d years",
            },
            ordinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 == ~~((e % 100) / 10)
                  ? "th"
                  : 1 === t
                  ? "st"
                  : 2 === t
                  ? "nd"
                  : 3 === t
                  ? "rd"
                  : "th")
              );
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      7925: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("en-ca", {
            months:
              "January_February_March_April_May_June_July_August_September_October_November_December".split(
                "_"
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays:
              "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                "_"
              ),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat: {
              LT: "h:mm A",
              LTS: "h:mm:ss A",
              L: "YYYY-MM-DD",
              LL: "MMMM D, YYYY",
              LLL: "MMMM D, YYYY h:mm A",
              LLLL: "dddd, MMMM D, YYYY h:mm A",
            },
            calendar: {
              sameDay: "[Today at] LT",
              nextDay: "[Tomorrow at] LT",
              nextWeek: "dddd [at] LT",
              lastDay: "[Yesterday at] LT",
              lastWeek: "[Last] dddd [at] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "in %s",
              past: "%s ago",
              s: "a few seconds",
              m: "a minute",
              mm: "%d minutes",
              h: "an hour",
              hh: "%d hours",
              d: "a day",
              dd: "%d days",
              M: "a month",
              MM: "%d months",
              y: "a year",
              yy: "%d years",
            },
            ordinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 == ~~((e % 100) / 10)
                  ? "th"
                  : 1 === t
                  ? "st"
                  : 2 === t
                  ? "nd"
                  : 3 === t
                  ? "rd"
                  : "th")
              );
            },
          });
        })(n(381));
      },
      2243: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("en-gb", {
            months:
              "January_February_March_April_May_June_July_August_September_October_November_December".split(
                "_"
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays:
              "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                "_"
              ),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Today at] LT",
              nextDay: "[Tomorrow at] LT",
              nextWeek: "dddd [at] LT",
              lastDay: "[Yesterday at] LT",
              lastWeek: "[Last] dddd [at] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "in %s",
              past: "%s ago",
              s: "a few seconds",
              m: "a minute",
              mm: "%d minutes",
              h: "an hour",
              hh: "%d hours",
              d: "a day",
              dd: "%d days",
              M: "a month",
              MM: "%d months",
              y: "a year",
              yy: "%d years",
            },
            ordinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 == ~~((e % 100) / 10)
                  ? "th"
                  : 1 === t
                  ? "st"
                  : 2 === t
                  ? "nd"
                  : 3 === t
                  ? "rd"
                  : "th")
              );
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      6436: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("en-ie", {
            months:
              "January_February_March_April_May_June_July_August_September_October_November_December".split(
                "_"
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays:
              "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                "_"
              ),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD-MM-YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Today at] LT",
              nextDay: "[Tomorrow at] LT",
              nextWeek: "dddd [at] LT",
              lastDay: "[Yesterday at] LT",
              lastWeek: "[Last] dddd [at] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "in %s",
              past: "%s ago",
              s: "a few seconds",
              m: "a minute",
              mm: "%d minutes",
              h: "an hour",
              hh: "%d hours",
              d: "a day",
              dd: "%d days",
              M: "a month",
              MM: "%d months",
              y: "a year",
              yy: "%d years",
            },
            ordinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 == ~~((e % 100) / 10)
                  ? "th"
                  : 1 === t
                  ? "st"
                  : 2 === t
                  ? "nd"
                  : 3 === t
                  ? "rd"
                  : "th")
              );
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      6319: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("en-nz", {
            months:
              "January_February_March_April_May_June_July_August_September_October_November_December".split(
                "_"
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays:
              "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                "_"
              ),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat: {
              LT: "h:mm A",
              LTS: "h:mm:ss A",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY h:mm A",
              LLLL: "dddd, D MMMM YYYY h:mm A",
            },
            calendar: {
              sameDay: "[Today at] LT",
              nextDay: "[Tomorrow at] LT",
              nextWeek: "dddd [at] LT",
              lastDay: "[Yesterday at] LT",
              lastWeek: "[Last] dddd [at] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "in %s",
              past: "%s ago",
              s: "a few seconds",
              m: "a minute",
              mm: "%d minutes",
              h: "an hour",
              hh: "%d hours",
              d: "a day",
              dd: "%d days",
              M: "a month",
              MM: "%d months",
              y: "a year",
              yy: "%d years",
            },
            ordinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 == ~~((e % 100) / 10)
                  ? "th"
                  : 1 === t
                  ? "st"
                  : 2 === t
                  ? "nd"
                  : 3 === t
                  ? "rd"
                  : "th")
              );
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      2915: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("eo", {
            months:
              "januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split(
                "_"
              ),
            monthsShort:
              "jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),
            weekdays:
              "Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),
            weekdaysShort: "Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),
            weekdaysMin: "Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "YYYY-MM-DD",
              LL: "D[-an de] MMMM, YYYY",
              LLL: "D[-an de] MMMM, YYYY HH:mm",
              LLLL: "dddd, [la] D[-an de] MMMM, YYYY HH:mm",
            },
            meridiemParse: /[ap]\.t\.m/i,
            isPM: function (e) {
              return "p" === e.charAt(0).toLowerCase();
            },
            meridiem: function (e, t, n) {
              return e > 11
                ? n
                  ? "p.t.m."
                  : "P.T.M."
                : n
                ? "a.t.m."
                : "A.T.M.";
            },
            calendar: {
              sameDay: "[Hodiaŭ je] LT",
              nextDay: "[Morgaŭ je] LT",
              nextWeek: "dddd [je] LT",
              lastDay: "[Hieraŭ je] LT",
              lastWeek: "[pasinta] dddd [je] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "je %s",
              past: "antaŭ %s",
              s: "sekundoj",
              m: "minuto",
              mm: "%d minutoj",
              h: "horo",
              hh: "%d horoj",
              d: "tago",
              dd: "%d tagoj",
              M: "monato",
              MM: "%d monatoj",
              y: "jaro",
              yy: "%d jaroj",
            },
            ordinalParse: /\d{1,2}a/,
            ordinal: "%da",
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      5655: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split(
                "_"
              ),
            n = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
          e.defineLocale("es", {
            months:
              "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split(
                "_"
              ),
            monthsShort: function (e, r) {
              return /-MMM-/.test(r) ? n[e.month()] : t[e.month()];
            },
            weekdays:
              "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
            weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
            weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D [de] MMMM [de] YYYY",
              LLL: "D [de] MMMM [de] YYYY H:mm",
              LLLL: "dddd, D [de] MMMM [de] YYYY H:mm",
            },
            calendar: {
              sameDay: function () {
                return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT";
              },
              nextDay: function () {
                return (
                  "[mañana a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                );
              },
              nextWeek: function () {
                return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT";
              },
              lastDay: function () {
                return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT";
              },
              lastWeek: function () {
                return (
                  "[el] dddd [pasado a la" +
                  (1 !== this.hours() ? "s" : "") +
                  "] LT"
                );
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "en %s",
              past: "hace %s",
              s: "unos segundos",
              m: "un minuto",
              mm: "%d minutos",
              h: "una hora",
              hh: "%d horas",
              d: "un día",
              dd: "%d días",
              M: "un mes",
              MM: "%d meses",
              y: "un año",
              yy: "%d años",
            },
            ordinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      5603: function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n, r) {
            var s = {
              s: ["mõne sekundi", "mõni sekund", "paar sekundit"],
              m: ["ühe minuti", "üks minut"],
              mm: [e + " minuti", e + " minutit"],
              h: ["ühe tunni", "tund aega", "üks tund"],
              hh: [e + " tunni", e + " tundi"],
              d: ["ühe päeva", "üks päev"],
              M: ["kuu aja", "kuu aega", "üks kuu"],
              MM: [e + " kuu", e + " kuud"],
              y: ["ühe aasta", "aasta", "üks aasta"],
              yy: [e + " aasta", e + " aastat"],
            };
            return t ? (s[n][2] ? s[n][2] : s[n][1]) : r ? s[n][0] : s[n][1];
          }
          e.defineLocale("et", {
            months:
              "jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split(
                "_"
              ),
            monthsShort:
              "jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split(
                "_"
              ),
            weekdays:
              "pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split(
                "_"
              ),
            weekdaysShort: "P_E_T_K_N_R_L".split("_"),
            weekdaysMin: "P_E_T_K_N_R_L".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd, D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[Täna,] LT",
              nextDay: "[Homme,] LT",
              nextWeek: "[Järgmine] dddd LT",
              lastDay: "[Eile,] LT",
              lastWeek: "[Eelmine] dddd LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s pärast",
              past: "%s tagasi",
              s: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: t,
              dd: "%d päeva",
              M: t,
              MM: t,
              y: t,
              yy: t,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      7763: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("eu", {
            months:
              "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split(
                "_"
              ),
            monthsShort:
              "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split(
                "_"
              ),
            weekdays:
              "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split(
                "_"
              ),
            weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"),
            weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "YYYY-MM-DD",
              LL: "YYYY[ko] MMMM[ren] D[a]",
              LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm",
              LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",
              l: "YYYY-M-D",
              ll: "YYYY[ko] MMM D[a]",
              lll: "YYYY[ko] MMM D[a] HH:mm",
              llll: "ddd, YYYY[ko] MMM D[a] HH:mm",
            },
            calendar: {
              sameDay: "[gaur] LT[etan]",
              nextDay: "[bihar] LT[etan]",
              nextWeek: "dddd LT[etan]",
              lastDay: "[atzo] LT[etan]",
              lastWeek: "[aurreko] dddd LT[etan]",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s barru",
              past: "duela %s",
              s: "segundo batzuk",
              m: "minutu bat",
              mm: "%d minutu",
              h: "ordu bat",
              hh: "%d ordu",
              d: "egun bat",
              dd: "%d egun",
              M: "hilabete bat",
              MM: "%d hilabete",
              y: "urte bat",
              yy: "%d urte",
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      6959: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "۱",
              2: "۲",
              3: "۳",
              4: "۴",
              5: "۵",
              6: "۶",
              7: "۷",
              8: "۸",
              9: "۹",
              0: "۰",
            },
            n = {
              "۱": "1",
              "۲": "2",
              "۳": "3",
              "۴": "4",
              "۵": "5",
              "۶": "6",
              "۷": "7",
              "۸": "8",
              "۹": "9",
              "۰": "0",
            };
          e.defineLocale("fa", {
            months:
              "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split(
                "_"
              ),
            monthsShort:
              "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split(
                "_"
              ),
            weekdays:
              "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
            weekdaysShort:
              "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
            weekdaysMin: "ی_د_س_چ_پ_ج_ش".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            meridiemParse: /قبل از ظهر|بعد از ظهر/,
            isPM: function (e) {
              return /بعد از ظهر/.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "قبل از ظهر" : "بعد از ظهر";
            },
            calendar: {
              sameDay: "[امروز ساعت] LT",
              nextDay: "[فردا ساعت] LT",
              nextWeek: "dddd [ساعت] LT",
              lastDay: "[دیروز ساعت] LT",
              lastWeek: "dddd [پیش] [ساعت] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "در %s",
              past: "%s پیش",
              s: "چندین ثانیه",
              m: "یک دقیقه",
              mm: "%d دقیقه",
              h: "یک ساعت",
              hh: "%d ساعت",
              d: "یک روز",
              dd: "%d روز",
              M: "یک ماه",
              MM: "%d ماه",
              y: "یک سال",
              yy: "%d سال",
            },
            preparse: function (e) {
              return e
                .replace(/[۰-۹]/g, function (e) {
                  return n[e];
                })
                .replace(/،/g, ",");
            },
            postformat: function (e) {
              return e
                .replace(/\d/g, function (e) {
                  return t[e];
                })
                .replace(/,/g, "،");
            },
            ordinalParse: /\d{1,2}م/,
            ordinal: "%dم",
            week: { dow: 6, doy: 12 },
          });
        })(n(381));
      },
      1897: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(
                " "
              ),
            n = [
              "nolla",
              "yhden",
              "kahden",
              "kolmen",
              "neljän",
              "viiden",
              "kuuden",
              t[7],
              t[8],
              t[9],
            ];
          function r(e, t, n, r) {
            var a = "";
            switch (n) {
              case "s":
                return r ? "muutaman sekunnin" : "muutama sekunti";
              case "m":
                return r ? "minuutin" : "minuutti";
              case "mm":
                a = r ? "minuutin" : "minuuttia";
                break;
              case "h":
                return r ? "tunnin" : "tunti";
              case "hh":
                a = r ? "tunnin" : "tuntia";
                break;
              case "d":
                return r ? "päivän" : "päivä";
              case "dd":
                a = r ? "päivän" : "päivää";
                break;
              case "M":
                return r ? "kuukauden" : "kuukausi";
              case "MM":
                a = r ? "kuukauden" : "kuukautta";
                break;
              case "y":
                return r ? "vuoden" : "vuosi";
              case "yy":
                a = r ? "vuoden" : "vuotta";
            }
            return (a = s(e, r) + " " + a);
          }
          function s(e, r) {
            return e < 10 ? (r ? n[e] : t[e]) : e;
          }
          e.defineLocale("fi", {
            months:
              "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split(
                "_"
              ),
            monthsShort:
              "tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split(
                "_"
              ),
            weekdays:
              "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split(
                "_"
              ),
            weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
            weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
            longDateFormat: {
              LT: "HH.mm",
              LTS: "HH.mm.ss",
              L: "DD.MM.YYYY",
              LL: "Do MMMM[ta] YYYY",
              LLL: "Do MMMM[ta] YYYY, [klo] HH.mm",
              LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm",
              l: "D.M.YYYY",
              ll: "Do MMM YYYY",
              lll: "Do MMM YYYY, [klo] HH.mm",
              llll: "ddd, Do MMM YYYY, [klo] HH.mm",
            },
            calendar: {
              sameDay: "[tänään] [klo] LT",
              nextDay: "[huomenna] [klo] LT",
              nextWeek: "dddd [klo] LT",
              lastDay: "[eilen] [klo] LT",
              lastWeek: "[viime] dddd[na] [klo] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s päästä",
              past: "%s sitten",
              s: r,
              m: r,
              mm: r,
              h: r,
              hh: r,
              d: r,
              dd: r,
              M: r,
              MM: r,
              y: r,
              yy: r,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      4694: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("fo", {
            months:
              "januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split(
                "_"
              ),
            monthsShort:
              "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
            weekdays:
              "sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split(
                "_"
              ),
            weekdaysShort: "sun_mán_týs_mik_hós_frí_ley".split("_"),
            weekdaysMin: "su_má_tý_mi_hó_fr_le".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D. MMMM, YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Í dag kl.] LT",
              nextDay: "[Í morgin kl.] LT",
              nextWeek: "dddd [kl.] LT",
              lastDay: "[Í gjár kl.] LT",
              lastWeek: "[síðstu] dddd [kl] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "um %s",
              past: "%s síðani",
              s: "fá sekund",
              m: "ein minutt",
              mm: "%d minuttir",
              h: "ein tími",
              hh: "%d tímar",
              d: "ein dagur",
              dd: "%d dagar",
              M: "ein mánaði",
              MM: "%d mánaðir",
              y: "eitt ár",
              yy: "%d ár",
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      3049: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("fr-ca", {
            months:
              "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
                "_"
              ),
            monthsShort:
              "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split(
                "_"
              ),
            weekdays:
              "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
            weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
            weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "YYYY-MM-DD",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Aujourd'hui à] LT",
              nextDay: "[Demain à] LT",
              nextWeek: "dddd [à] LT",
              lastDay: "[Hier à] LT",
              lastWeek: "dddd [dernier à] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "dans %s",
              past: "il y a %s",
              s: "quelques secondes",
              m: "une minute",
              mm: "%d minutes",
              h: "une heure",
              hh: "%d heures",
              d: "un jour",
              dd: "%d jours",
              M: "un mois",
              MM: "%d mois",
              y: "un an",
              yy: "%d ans",
            },
            ordinalParse: /\d{1,2}(er|e)/,
            ordinal: function (e) {
              return e + (1 === e ? "er" : "e");
            },
          });
        })(n(381));
      },
      2330: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("fr-ch", {
            months:
              "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
                "_"
              ),
            monthsShort:
              "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split(
                "_"
              ),
            weekdays:
              "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
            weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
            weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Aujourd'hui à] LT",
              nextDay: "[Demain à] LT",
              nextWeek: "dddd [à] LT",
              lastDay: "[Hier à] LT",
              lastWeek: "dddd [dernier à] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "dans %s",
              past: "il y a %s",
              s: "quelques secondes",
              m: "une minute",
              mm: "%d minutes",
              h: "une heure",
              hh: "%d heures",
              d: "un jour",
              dd: "%d jours",
              M: "un mois",
              MM: "%d mois",
              y: "un an",
              yy: "%d ans",
            },
            ordinalParse: /\d{1,2}(er|e)/,
            ordinal: function (e) {
              return e + (1 === e ? "er" : "e");
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      5596: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("fr", {
            months:
              "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
                "_"
              ),
            monthsShort:
              "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split(
                "_"
              ),
            weekdays:
              "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
            weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
            weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Aujourd'hui à] LT",
              nextDay: "[Demain à] LT",
              nextWeek: "dddd [à] LT",
              lastDay: "[Hier à] LT",
              lastWeek: "dddd [dernier à] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "dans %s",
              past: "il y a %s",
              s: "quelques secondes",
              m: "une minute",
              mm: "%d minutes",
              h: "une heure",
              hh: "%d heures",
              d: "un jour",
              dd: "%d jours",
              M: "un mois",
              MM: "%d mois",
              y: "un an",
              yy: "%d ans",
            },
            ordinalParse: /\d{1,2}(er|)/,
            ordinal: function (e) {
              return e + (1 === e ? "er" : "");
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      5044: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split(
                "_"
              ),
            n = "jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_");
          e.defineLocale("fy", {
            months:
              "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split(
                "_"
              ),
            monthsShort: function (e, r) {
              return /-MMM-/.test(r) ? n[e.month()] : t[e.month()];
            },
            weekdays:
              "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split(
                "_"
              ),
            weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"),
            weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD-MM-YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[hjoed om] LT",
              nextDay: "[moarn om] LT",
              nextWeek: "dddd [om] LT",
              lastDay: "[juster om] LT",
              lastWeek: "[ôfrûne] dddd [om] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "oer %s",
              past: "%s lyn",
              s: "in pear sekonden",
              m: "ien minút",
              mm: "%d minuten",
              h: "ien oere",
              hh: "%d oeren",
              d: "ien dei",
              dd: "%d dagen",
              M: "ien moanne",
              MM: "%d moannen",
              y: "ien jier",
              yy: "%d jierren",
            },
            ordinalParse: /\d{1,2}(ste|de)/,
            ordinal: function (e) {
              return e + (1 === e || 8 === e || e >= 20 ? "ste" : "de");
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      2101: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = [
              "Am Faoilleach",
              "An Gearran",
              "Am Màrt",
              "An Giblean",
              "An Cèitean",
              "An t-Ògmhios",
              "An t-Iuchar",
              "An Lùnastal",
              "An t-Sultain",
              "An Dàmhair",
              "An t-Samhain",
              "An Dùbhlachd",
            ],
            n = [
              "Faoi",
              "Gear",
              "Màrt",
              "Gibl",
              "Cèit",
              "Ògmh",
              "Iuch",
              "Lùn",
              "Sult",
              "Dàmh",
              "Samh",
              "Dùbh",
            ],
            r = [
              "Didòmhnaich",
              "Diluain",
              "Dimàirt",
              "Diciadain",
              "Diardaoin",
              "Dihaoine",
              "Disathairne",
            ],
            s = ["Did", "Dil", "Dim", "Dic", "Dia", "Dih", "Dis"],
            a = ["Dò", "Lu", "Mà", "Ci", "Ar", "Ha", "Sa"];
          e.defineLocale("gd", {
            months: t,
            monthsShort: n,
            monthsParseExact: !0,
            weekdays: r,
            weekdaysShort: s,
            weekdaysMin: a,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[An-diugh aig] LT",
              nextDay: "[A-màireach aig] LT",
              nextWeek: "dddd [aig] LT",
              lastDay: "[An-dè aig] LT",
              lastWeek: "dddd [seo chaidh] [aig] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "ann an %s",
              past: "bho chionn %s",
              s: "beagan diogan",
              m: "mionaid",
              mm: "%d mionaidean",
              h: "uair",
              hh: "%d uairean",
              d: "latha",
              dd: "%d latha",
              M: "mìos",
              MM: "%d mìosan",
              y: "bliadhna",
              yy: "%d bliadhna",
            },
            ordinalParse: /\d{1,2}(d|na|mh)/,
            ordinal: function (e) {
              return e + (1 === e ? "d" : e % 10 == 2 ? "na" : "mh");
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      8794: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("gl", {
            months:
              "Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro".split(
                "_"
              ),
            monthsShort:
              "Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.".split(
                "_"
              ),
            weekdays: "Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado".split(
              "_"
            ),
            weekdaysShort: "Dom._Lun._Mar._Mér._Xov._Ven._Sáb.".split("_"),
            weekdaysMin: "Do_Lu_Ma_Mé_Xo_Ve_Sá".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY H:mm",
              LLLL: "dddd D MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: function () {
                return "[hoxe " + (1 !== this.hours() ? "ás" : "á") + "] LT";
              },
              nextDay: function () {
                return "[mañá " + (1 !== this.hours() ? "ás" : "á") + "] LT";
              },
              nextWeek: function () {
                return "dddd [" + (1 !== this.hours() ? "ás" : "a") + "] LT";
              },
              lastDay: function () {
                return "[onte " + (1 !== this.hours() ? "á" : "a") + "] LT";
              },
              lastWeek: function () {
                return (
                  "[o] dddd [pasado " +
                  (1 !== this.hours() ? "ás" : "a") +
                  "] LT"
                );
              },
              sameElse: "L",
            },
            relativeTime: {
              future: function (e) {
                return "uns segundos" === e ? "nuns segundos" : "en " + e;
              },
              past: "hai %s",
              s: "uns segundos",
              m: "un minuto",
              mm: "%d minutos",
              h: "unha hora",
              hh: "%d horas",
              d: "un día",
              dd: "%d días",
              M: "un mes",
              MM: "%d meses",
              y: "un ano",
              yy: "%d anos",
            },
            ordinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      4206: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("he", {
            months:
              "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split(
                "_"
              ),
            monthsShort:
              "ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split(
                "_"
              ),
            weekdays: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
            weekdaysShort: "א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),
            weekdaysMin: "א_ב_ג_ד_ה_ו_ש".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D [ב]MMMM YYYY",
              LLL: "D [ב]MMMM YYYY HH:mm",
              LLLL: "dddd, D [ב]MMMM YYYY HH:mm",
              l: "D/M/YYYY",
              ll: "D MMM YYYY",
              lll: "D MMM YYYY HH:mm",
              llll: "ddd, D MMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[היום ב־]LT",
              nextDay: "[מחר ב־]LT",
              nextWeek: "dddd [בשעה] LT",
              lastDay: "[אתמול ב־]LT",
              lastWeek: "[ביום] dddd [האחרון בשעה] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "בעוד %s",
              past: "לפני %s",
              s: "מספר שניות",
              m: "דקה",
              mm: "%d דקות",
              h: "שעה",
              hh: function (e) {
                return 2 === e ? "שעתיים" : e + " שעות";
              },
              d: "יום",
              dd: function (e) {
                return 2 === e ? "יומיים" : e + " ימים";
              },
              M: "חודש",
              MM: function (e) {
                return 2 === e ? "חודשיים" : e + " חודשים";
              },
              y: "שנה",
              yy: function (e) {
                return 2 === e
                  ? "שנתיים"
                  : e % 10 == 0 && 10 !== e
                  ? e + " שנה"
                  : e + " שנים";
              },
            },
            meridiemParse:
              /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
            isPM: function (e) {
              return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 5
                ? "לפנות בוקר"
                : e < 10
                ? "בבוקר"
                : e < 12
                ? n
                  ? 'לפנה"צ'
                  : "לפני הצהריים"
                : e < 18
                ? n
                  ? 'אחה"צ'
                  : "אחרי הצהריים"
                : "בערב";
            },
          });
        })(n(381));
      },
      94: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "१",
              2: "२",
              3: "३",
              4: "४",
              5: "५",
              6: "६",
              7: "७",
              8: "८",
              9: "९",
              0: "०",
            },
            n = {
              "१": "1",
              "२": "2",
              "३": "3",
              "४": "4",
              "५": "5",
              "६": "6",
              "७": "7",
              "८": "8",
              "९": "9",
              "०": "0",
            };
          e.defineLocale("hi", {
            months:
              "जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split(
                "_"
              ),
            monthsShort:
              "जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split(
                "_"
              ),
            weekdays:
              "रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
            weekdaysShort: "रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),
            weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"),
            longDateFormat: {
              LT: "A h:mm बजे",
              LTS: "A h:mm:ss बजे",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, A h:mm बजे",
              LLLL: "dddd, D MMMM YYYY, A h:mm बजे",
            },
            calendar: {
              sameDay: "[आज] LT",
              nextDay: "[कल] LT",
              nextWeek: "dddd, LT",
              lastDay: "[कल] LT",
              lastWeek: "[पिछले] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s में",
              past: "%s पहले",
              s: "कुछ ही क्षण",
              m: "एक मिनट",
              mm: "%d मिनट",
              h: "एक घंटा",
              hh: "%d घंटे",
              d: "एक दिन",
              dd: "%d दिन",
              M: "एक महीने",
              MM: "%d महीने",
              y: "एक वर्ष",
              yy: "%d वर्ष",
            },
            preparse: function (e) {
              return e.replace(/[१२३४५६७८९०]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            meridiemParse: /रात|सुबह|दोपहर|शाम/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "रात" === t
                  ? e < 4
                    ? e
                    : e + 12
                  : "सुबह" === t
                  ? e
                  : "दोपहर" === t
                  ? e >= 10
                    ? e
                    : e + 12
                  : "शाम" === t
                  ? e + 12
                  : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "रात"
                : e < 10
                ? "सुबह"
                : e < 17
                ? "दोपहर"
                : e < 20
                ? "शाम"
                : "रात";
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(381));
      },
      316: function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n) {
            var r = e + " ";
            switch (n) {
              case "m":
                return t ? "jedna minuta" : "jedne minute";
              case "mm":
                return (r +=
                  1 === e
                    ? "minuta"
                    : 2 === e || 3 === e || 4 === e
                    ? "minute"
                    : "minuta");
              case "h":
                return t ? "jedan sat" : "jednog sata";
              case "hh":
                return (r +=
                  1 === e
                    ? "sat"
                    : 2 === e || 3 === e || 4 === e
                    ? "sata"
                    : "sati");
              case "dd":
                return (r += 1 === e ? "dan" : "dana");
              case "MM":
                return (r +=
                  1 === e
                    ? "mjesec"
                    : 2 === e || 3 === e || 4 === e
                    ? "mjeseca"
                    : "mjeseci");
              case "yy":
                return (r +=
                  1 === e
                    ? "godina"
                    : 2 === e || 3 === e || 4 === e
                    ? "godine"
                    : "godina");
            }
          }
          e.defineLocale("hr", {
            months: {
              format:
                "siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split(
                  "_"
                ),
              standalone:
                "siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split(
                  "_"
                ),
            },
            monthsShort:
              "sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split(
                "_"
              ),
            weekdays:
              "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split(
                "_"
              ),
            weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
            weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD. MM. YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd, D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[danas u] LT",
              nextDay: "[sutra u] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[u] [nedjelju] [u] LT";
                  case 3:
                    return "[u] [srijedu] [u] LT";
                  case 6:
                    return "[u] [subotu] [u] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[u] dddd [u] LT";
                }
              },
              lastDay: "[jučer u] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                  case 3:
                    return "[prošlu] dddd [u] LT";
                  case 6:
                    return "[prošle] [subote] [u] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[prošli] dddd [u] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "za %s",
              past: "prije %s",
              s: "par sekundi",
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: "dan",
              dd: t,
              M: "mjesec",
              MM: t,
              y: "godinu",
              yy: t,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      2138: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
            "vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(
              " "
            );
          function n(e, t, n, r) {
            var s = e;
            switch (n) {
              case "s":
                return r || t ? "néhány másodperc" : "néhány másodperce";
              case "m":
                return "egy" + (r || t ? " perc" : " perce");
              case "mm":
                return s + (r || t ? " perc" : " perce");
              case "h":
                return "egy" + (r || t ? " óra" : " órája");
              case "hh":
                return s + (r || t ? " óra" : " órája");
              case "d":
                return "egy" + (r || t ? " nap" : " napja");
              case "dd":
                return s + (r || t ? " nap" : " napja");
              case "M":
                return "egy" + (r || t ? " hónap" : " hónapja");
              case "MM":
                return s + (r || t ? " hónap" : " hónapja");
              case "y":
                return "egy" + (r || t ? " év" : " éve");
              case "yy":
                return s + (r || t ? " év" : " éve");
            }
            return "";
          }
          function r(e) {
            return (e ? "" : "[múlt] ") + "[" + t[this.day()] + "] LT[-kor]";
          }
          e.defineLocale("hu", {
            months:
              "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split(
                "_"
              ),
            monthsShort:
              "jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),
            weekdays:
              "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
            weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"),
            weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "YYYY.MM.DD.",
              LL: "YYYY. MMMM D.",
              LLL: "YYYY. MMMM D. H:mm",
              LLLL: "YYYY. MMMM D., dddd H:mm",
            },
            meridiemParse: /de|du/i,
            isPM: function (e) {
              return "u" === e.charAt(1).toLowerCase();
            },
            meridiem: function (e, t, n) {
              return e < 12 ? (!0 === n ? "de" : "DE") : !0 === n ? "du" : "DU";
            },
            calendar: {
              sameDay: "[ma] LT[-kor]",
              nextDay: "[holnap] LT[-kor]",
              nextWeek: function () {
                return r.call(this, !0);
              },
              lastDay: "[tegnap] LT[-kor]",
              lastWeek: function () {
                return r.call(this, !1);
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "%s múlva",
              past: "%s",
              s: n,
              m: n,
              mm: n,
              h: n,
              hh: n,
              d: n,
              dd: n,
              M: n,
              MM: n,
              y: n,
              yy: n,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      1423: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("hy-am", {
            months: {
              format:
                "հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split(
                  "_"
                ),
              standalone:
                "հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split(
                  "_"
                ),
            },
            monthsShort:
              "հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_"),
            weekdays:
              "կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split(
                "_"
              ),
            weekdaysShort: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
            weekdaysMin: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY թ.",
              LLL: "D MMMM YYYY թ., HH:mm",
              LLLL: "dddd, D MMMM YYYY թ., HH:mm",
            },
            calendar: {
              sameDay: "[այսօր] LT",
              nextDay: "[վաղը] LT",
              lastDay: "[երեկ] LT",
              nextWeek: function () {
                return "dddd [օրը ժամը] LT";
              },
              lastWeek: function () {
                return "[անցած] dddd [օրը ժամը] LT";
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "%s հետո",
              past: "%s առաջ",
              s: "մի քանի վայրկյան",
              m: "րոպե",
              mm: "%d րոպե",
              h: "ժամ",
              hh: "%d ժամ",
              d: "օր",
              dd: "%d օր",
              M: "ամիս",
              MM: "%d ամիս",
              y: "տարի",
              yy: "%d տարի",
            },
            meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
            isPM: function (e) {
              return /^(ցերեկվա|երեկոյան)$/.test(e);
            },
            meridiem: function (e) {
              return e < 4
                ? "գիշերվա"
                : e < 12
                ? "առավոտվա"
                : e < 17
                ? "ցերեկվա"
                : "երեկոյան";
            },
            ordinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
            ordinal: function (e, t) {
              switch (t) {
                case "DDD":
                case "w":
                case "W":
                case "DDDo":
                  return 1 === e ? e + "-ին" : e + "-րդ";
                default:
                  return e;
              }
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      9218: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("id", {
            months:
              "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split(
                "_"
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),
            weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
            weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
            weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
            longDateFormat: {
              LT: "HH.mm",
              LTS: "HH.mm.ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY [pukul] HH.mm",
              LLLL: "dddd, D MMMM YYYY [pukul] HH.mm",
            },
            meridiemParse: /pagi|siang|sore|malam/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "pagi" === t
                  ? e
                  : "siang" === t
                  ? e >= 11
                    ? e
                    : e + 12
                  : "sore" === t || "malam" === t
                  ? e + 12
                  : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 11
                ? "pagi"
                : e < 15
                ? "siang"
                : e < 19
                ? "sore"
                : "malam";
            },
            calendar: {
              sameDay: "[Hari ini pukul] LT",
              nextDay: "[Besok pukul] LT",
              nextWeek: "dddd [pukul] LT",
              lastDay: "[Kemarin pukul] LT",
              lastWeek: "dddd [lalu pukul] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "dalam %s",
              past: "%s yang lalu",
              s: "beberapa detik",
              m: "semenit",
              mm: "%d menit",
              h: "sejam",
              hh: "%d jam",
              d: "sehari",
              dd: "%d hari",
              M: "sebulan",
              MM: "%d bulan",
              y: "setahun",
              yy: "%d tahun",
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      135: function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e) {
            return e % 100 == 11 || e % 10 != 1;
          }
          function n(e, n, r, s) {
            var a = e + " ";
            switch (r) {
              case "s":
                return n || s ? "nokkrar sekúndur" : "nokkrum sekúndum";
              case "m":
                return n ? "mínúta" : "mínútu";
              case "mm":
                return t(e)
                  ? a + (n || s ? "mínútur" : "mínútum")
                  : n
                  ? a + "mínúta"
                  : a + "mínútu";
              case "hh":
                return t(e)
                  ? a + (n || s ? "klukkustundir" : "klukkustundum")
                  : a + "klukkustund";
              case "d":
                return n ? "dagur" : s ? "dag" : "degi";
              case "dd":
                return t(e)
                  ? n
                    ? a + "dagar"
                    : a + (s ? "daga" : "dögum")
                  : n
                  ? a + "dagur"
                  : a + (s ? "dag" : "degi");
              case "M":
                return n ? "mánuður" : s ? "mánuð" : "mánuði";
              case "MM":
                return t(e)
                  ? n
                    ? a + "mánuðir"
                    : a + (s ? "mánuði" : "mánuðum")
                  : n
                  ? a + "mánuður"
                  : a + (s ? "mánuð" : "mánuði");
              case "y":
                return n || s ? "ár" : "ári";
              case "yy":
                return t(e)
                  ? a + (n || s ? "ár" : "árum")
                  : a + (n || s ? "ár" : "ári");
            }
          }
          e.defineLocale("is", {
            months:
              "janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split(
                "_"
              ),
            monthsShort:
              "jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),
            weekdays:
              "sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split(
                "_"
              ),
            weekdaysShort: "sun_mán_þri_mið_fim_fös_lau".split("_"),
            weekdaysMin: "Su_Má_Þr_Mi_Fi_Fö_La".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY [kl.] H:mm",
              LLLL: "dddd, D. MMMM YYYY [kl.] H:mm",
            },
            calendar: {
              sameDay: "[í dag kl.] LT",
              nextDay: "[á morgun kl.] LT",
              nextWeek: "dddd [kl.] LT",
              lastDay: "[í gær kl.] LT",
              lastWeek: "[síðasta] dddd [kl.] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "eftir %s",
              past: "fyrir %s síðan",
              s: n,
              m: n,
              mm: n,
              h: "klukkustund",
              hh: n,
              d: n,
              dd: n,
              M: n,
              MM: n,
              y: n,
              yy: n,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      626: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("it", {
            months:
              "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split(
                "_"
              ),
            monthsShort:
              "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
            weekdays:
              "Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split(
                "_"
              ),
            weekdaysShort: "Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
            weekdaysMin: "Do_Lu_Ma_Me_Gi_Ve_Sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Oggi alle] LT",
              nextDay: "[Domani alle] LT",
              nextWeek: "dddd [alle] LT",
              lastDay: "[Ieri alle] LT",
              lastWeek: function () {
                return 0 === this.day()
                  ? "[la scorsa] dddd [alle] LT"
                  : "[lo scorso] dddd [alle] LT";
              },
              sameElse: "L",
            },
            relativeTime: {
              future: function (e) {
                return (/^[0-9].+$/.test(e) ? "tra" : "in") + " " + e;
              },
              past: "%s fa",
              s: "alcuni secondi",
              m: "un minuto",
              mm: "%d minuti",
              h: "un'ora",
              hh: "%d ore",
              d: "un giorno",
              dd: "%d giorni",
              M: "un mese",
              MM: "%d mesi",
              y: "un anno",
              yy: "%d anni",
            },
            ordinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      9183: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ja", {
            months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split(
              "_"
            ),
            monthsShort:
              "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
            weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split(
              "_"
            ),
            weekdaysShort: "日_月_火_水_木_金_土".split("_"),
            weekdaysMin: "日_月_火_水_木_金_土".split("_"),
            longDateFormat: {
              LT: "Ah時m分",
              LTS: "Ah時m分s秒",
              L: "YYYY/MM/DD",
              LL: "YYYY年M月D日",
              LLL: "YYYY年M月D日Ah時m分",
              LLLL: "YYYY年M月D日Ah時m分 dddd",
            },
            meridiemParse: /午前|午後/i,
            isPM: function (e) {
              return "午後" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "午前" : "午後";
            },
            calendar: {
              sameDay: "[今日] LT",
              nextDay: "[明日] LT",
              nextWeek: "[来週]dddd LT",
              lastDay: "[昨日] LT",
              lastWeek: "[前週]dddd LT",
              sameElse: "L",
            },
            ordinalParse: /\d{1,2}日/,
            ordinal: function (e, t) {
              switch (t) {
                case "d":
                case "D":
                case "DDD":
                  return e + "日";
                default:
                  return e;
              }
            },
            relativeTime: {
              future: "%s後",
              past: "%s前",
              s: "数秒",
              m: "1分",
              mm: "%d分",
              h: "1時間",
              hh: "%d時間",
              d: "1日",
              dd: "%d日",
              M: "1ヶ月",
              MM: "%dヶ月",
              y: "1年",
              yy: "%d年",
            },
          });
        })(n(381));
      },
      4286: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("jv", {
            months:
              "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split(
                "_"
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),
            weekdays: "Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),
            weekdaysShort: "Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),
            weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),
            longDateFormat: {
              LT: "HH.mm",
              LTS: "HH.mm.ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY [pukul] HH.mm",
              LLLL: "dddd, D MMMM YYYY [pukul] HH.mm",
            },
            meridiemParse: /enjing|siyang|sonten|ndalu/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "enjing" === t
                  ? e
                  : "siyang" === t
                  ? e >= 11
                    ? e
                    : e + 12
                  : "sonten" === t || "ndalu" === t
                  ? e + 12
                  : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 11
                ? "enjing"
                : e < 15
                ? "siyang"
                : e < 19
                ? "sonten"
                : "ndalu";
            },
            calendar: {
              sameDay: "[Dinten puniko pukul] LT",
              nextDay: "[Mbenjang pukul] LT",
              nextWeek: "dddd [pukul] LT",
              lastDay: "[Kala wingi pukul] LT",
              lastWeek: "dddd [kepengker pukul] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "wonten ing %s",
              past: "%s ingkang kepengker",
              s: "sawetawis detik",
              m: "setunggal menit",
              mm: "%d menit",
              h: "setunggal jam",
              hh: "%d jam",
              d: "sedinten",
              dd: "%d dinten",
              M: "sewulan",
              MM: "%d wulan",
              y: "setaun",
              yy: "%d taun",
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      2105: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ka", {
            months: {
              standalone:
                "იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split(
                  "_"
                ),
              format:
                "იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split(
                  "_"
                ),
            },
            monthsShort:
              "იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),
            weekdays: {
              standalone:
                "კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split(
                  "_"
                ),
              format:
                "კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split(
                  "_"
                ),
              isFormat: /(წინა|შემდეგ)/,
            },
            weekdaysShort: "კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),
            weekdaysMin: "კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),
            longDateFormat: {
              LT: "h:mm A",
              LTS: "h:mm:ss A",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY h:mm A",
              LLLL: "dddd, D MMMM YYYY h:mm A",
            },
            calendar: {
              sameDay: "[დღეს] LT[-ზე]",
              nextDay: "[ხვალ] LT[-ზე]",
              lastDay: "[გუშინ] LT[-ზე]",
              nextWeek: "[შემდეგ] dddd LT[-ზე]",
              lastWeek: "[წინა] dddd LT-ზე",
              sameElse: "L",
            },
            relativeTime: {
              future: function (e) {
                return /(წამი|წუთი|საათი|წელი)/.test(e)
                  ? e.replace(/ი$/, "ში")
                  : e + "ში";
              },
              past: function (e) {
                return /(წამი|წუთი|საათი|დღე|თვე)/.test(e)
                  ? e.replace(/(ი|ე)$/, "ის წინ")
                  : /წელი/.test(e)
                  ? e.replace(/წელი$/, "წლის წინ")
                  : void 0;
              },
              s: "რამდენიმე წამი",
              m: "წუთი",
              mm: "%d წუთი",
              h: "საათი",
              hh: "%d საათი",
              d: "დღე",
              dd: "%d დღე",
              M: "თვე",
              MM: "%d თვე",
              y: "წელი",
              yy: "%d წელი",
            },
            ordinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
            ordinal: function (e) {
              return 0 === e
                ? e
                : 1 === e
                ? e + "-ლი"
                : e < 20 || (e <= 100 && e % 20 == 0) || e % 100 == 0
                ? "მე-" + e
                : e + "-ე";
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      7772: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            0: "-ші",
            1: "-ші",
            2: "-ші",
            3: "-ші",
            4: "-ші",
            5: "-ші",
            6: "-шы",
            7: "-ші",
            8: "-ші",
            9: "-шы",
            10: "-шы",
            20: "-шы",
            30: "-шы",
            40: "-шы",
            50: "-ші",
            60: "-шы",
            70: "-ші",
            80: "-ші",
            90: "-шы",
            100: "-ші",
          };
          e.defineLocale("kk", {
            months:
              "Қаңтар_Ақпан_Наурыз_Сәуір_Мамыр_Маусым_Шілде_Тамыз_Қыркүйек_Қазан_Қараша_Желтоқсан".split(
                "_"
              ),
            monthsShort:
              "Қаң_Ақп_Нау_Сәу_Мам_Мау_Шіл_Там_Қыр_Қаз_Қар_Жел".split("_"),
            weekdays:
              "Жексенбі_Дүйсенбі_Сейсенбі_Сәрсенбі_Бейсенбі_Жұма_Сенбі".split(
                "_"
              ),
            weekdaysShort: "Жек_Дүй_Сей_Сәр_Бей_Жұм_Сен".split("_"),
            weekdaysMin: "Жк_Дй_Сй_Ср_Бй_Жм_Сн".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Бүгін сағат] LT",
              nextDay: "[Ертең сағат] LT",
              nextWeek: "dddd [сағат] LT",
              lastDay: "[Кеше сағат] LT",
              lastWeek: "[Өткен аптаның] dddd [сағат] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s ішінде",
              past: "%s бұрын",
              s: "бірнеше секунд",
              m: "бір минут",
              mm: "%d минут",
              h: "бір сағат",
              hh: "%d сағат",
              d: "бір күн",
              dd: "%d күн",
              M: "бір ай",
              MM: "%d ай",
              y: "бір жыл",
              yy: "%d жыл",
            },
            ordinalParse: /\d{1,2}-(ші|шы)/,
            ordinal: function (e) {
              var n = e % 10,
                r = e >= 100 ? 100 : null;
              return e + (t[e] || t[n] || t[r]);
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      8758: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("km", {
            months:
              "មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split(
                "_"
              ),
            monthsShort:
              "មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split(
                "_"
              ),
            weekdays: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split(
              "_"
            ),
            weekdaysShort:
              "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
            weekdaysMin: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split(
              "_"
            ),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[ថ្ងៃនេះ ម៉ោង] LT",
              nextDay: "[ស្អែក ម៉ោង] LT",
              nextWeek: "dddd [ម៉ោង] LT",
              lastDay: "[ម្សិលមិញ ម៉ោង] LT",
              lastWeek: "dddd [សប្តាហ៍មុន] [ម៉ោង] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%sទៀត",
              past: "%sមុន",
              s: "ប៉ុន្មានវិនាទី",
              m: "មួយនាទី",
              mm: "%d នាទី",
              h: "មួយម៉ោង",
              hh: "%d ម៉ោង",
              d: "មួយថ្ងៃ",
              dd: "%d ថ្ងៃ",
              M: "មួយខែ",
              MM: "%d ខែ",
              y: "មួយឆ្នាំ",
              yy: "%d ឆ្នាំ",
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      3730: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ko", {
            months: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split(
              "_"
            ),
            monthsShort:
              "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
            weekdays: "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split(
              "_"
            ),
            weekdaysShort: "일_월_화_수_목_금_토".split("_"),
            weekdaysMin: "일_월_화_수_목_금_토".split("_"),
            longDateFormat: {
              LT: "A h시 m분",
              LTS: "A h시 m분 s초",
              L: "YYYY.MM.DD",
              LL: "YYYY년 MMMM D일",
              LLL: "YYYY년 MMMM D일 A h시 m분",
              LLLL: "YYYY년 MMMM D일 dddd A h시 m분",
            },
            calendar: {
              sameDay: "오늘 LT",
              nextDay: "내일 LT",
              nextWeek: "dddd LT",
              lastDay: "어제 LT",
              lastWeek: "지난주 dddd LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s 후",
              past: "%s 전",
              s: "몇초",
              ss: "%d초",
              m: "일분",
              mm: "%d분",
              h: "한시간",
              hh: "%d시간",
              d: "하루",
              dd: "%d일",
              M: "한달",
              MM: "%d달",
              y: "일년",
              yy: "%d년",
            },
            ordinalParse: /\d{1,2}일/,
            ordinal: "%d일",
            meridiemParse: /오전|오후/,
            isPM: function (e) {
              return "오후" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "오전" : "오후";
            },
          });
        })(n(381));
      },
      6841: function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n, r) {
            var s = {
              m: ["eng Minutt", "enger Minutt"],
              h: ["eng Stonn", "enger Stonn"],
              d: ["een Dag", "engem Dag"],
              M: ["ee Mount", "engem Mount"],
              y: ["ee Joer", "engem Joer"],
            };
            return t ? s[n][0] : s[n][1];
          }
          function n(e) {
            return s(e.substr(0, e.indexOf(" "))) ? "a " + e : "an " + e;
          }
          function r(e) {
            return s(e.substr(0, e.indexOf(" "))) ? "viru " + e : "virun " + e;
          }
          function s(e) {
            if (((e = parseInt(e, 10)), isNaN(e))) return !1;
            if (e < 0) return !0;
            if (e < 10) return 4 <= e && e <= 7;
            if (e < 100) {
              var t = e % 10;
              return s(0 === t ? e / 10 : t);
            }
            if (e < 1e4) {
              for (; e >= 10; ) e /= 10;
              return s(e);
            }
            return s((e /= 1e3));
          }
          e.defineLocale("lb", {
            months:
              "Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split(
                "_"
              ),
            monthsShort:
              "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split(
                "_"
              ),
            weekdays:
              "Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split(
                "_"
              ),
            weekdaysShort: "So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),
            weekdaysMin: "So_Mé_Dë_Më_Do_Fr_Sa".split("_"),
            longDateFormat: {
              LT: "H:mm [Auer]",
              LTS: "H:mm:ss [Auer]",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm [Auer]",
              LLLL: "dddd, D. MMMM YYYY H:mm [Auer]",
            },
            calendar: {
              sameDay: "[Haut um] LT",
              sameElse: "L",
              nextDay: "[Muer um] LT",
              nextWeek: "dddd [um] LT",
              lastDay: "[Gëschter um] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 2:
                  case 4:
                    return "[Leschten] dddd [um] LT";
                  default:
                    return "[Leschte] dddd [um] LT";
                }
              },
            },
            relativeTime: {
              future: n,
              past: r,
              s: "e puer Sekonnen",
              m: t,
              mm: "%d Minutten",
              h: t,
              hh: "%d Stonnen",
              d: t,
              dd: "%d Deeg",
              M: t,
              MM: "%d Méint",
              y: t,
              yy: "%d Joer",
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      5466: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("lo", {
            months:
              "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split(
                "_"
              ),
            monthsShort:
              "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split(
                "_"
              ),
            weekdays: "ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),
            weekdaysShort: "ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),
            weekdaysMin: "ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "ວັນdddd D MMMM YYYY HH:mm",
            },
            meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
            isPM: function (e) {
              return "ຕອນແລງ" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "ຕອນເຊົ້າ" : "ຕອນແລງ";
            },
            calendar: {
              sameDay: "[ມື້ນີ້ເວລາ] LT",
              nextDay: "[ມື້ອື່ນເວລາ] LT",
              nextWeek: "[ວັນ]dddd[ໜ້າເວລາ] LT",
              lastDay: "[ມື້ວານນີ້ເວລາ] LT",
              lastWeek: "[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "ອີກ %s",
              past: "%sຜ່ານມາ",
              s: "ບໍ່ເທົ່າໃດວິນາທີ",
              m: "1 ນາທີ",
              mm: "%d ນາທີ",
              h: "1 ຊົ່ວໂມງ",
              hh: "%d ຊົ່ວໂມງ",
              d: "1 ມື້",
              dd: "%d ມື້",
              M: "1 ເດືອນ",
              MM: "%d ເດືອນ",
              y: "1 ປີ",
              yy: "%d ປີ",
            },
            ordinalParse: /(ທີ່)\d{1,2}/,
            ordinal: function (e) {
              return "ທີ່" + e;
            },
          });
        })(n(381));
      },
      7010: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            m: "minutė_minutės_minutę",
            mm: "minutės_minučių_minutes",
            h: "valanda_valandos_valandą",
            hh: "valandos_valandų_valandas",
            d: "diena_dienos_dieną",
            dd: "dienos_dienų_dienas",
            M: "mėnuo_mėnesio_mėnesį",
            MM: "mėnesiai_mėnesių_mėnesius",
            y: "metai_metų_metus",
            yy: "metai_metų_metus",
          };
          function n(e, t, n, r) {
            return t
              ? "kelios sekundės"
              : r
              ? "kelių sekundžių"
              : "kelias sekundes";
          }
          function r(e, t, n, r) {
            return t ? a(n)[0] : r ? a(n)[1] : a(n)[2];
          }
          function s(e) {
            return e % 10 == 0 || (e > 10 && e < 20);
          }
          function a(e) {
            return t[e].split("_");
          }
          function i(e, t, n, i) {
            var o = e + " ";
            return 1 === e
              ? o + r(e, t, n[0], i)
              : t
              ? o + (s(e) ? a(n)[1] : a(n)[0])
              : i
              ? o + a(n)[1]
              : o + (s(e) ? a(n)[1] : a(n)[2]);
          }
          e.defineLocale("lt", {
            months: {
              format:
                "sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split(
                  "_"
                ),
              standalone:
                "sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split(
                  "_"
                ),
            },
            monthsShort:
              "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
            weekdays: {
              format:
                "sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį".split(
                  "_"
                ),
              standalone:
                "sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split(
                  "_"
                ),
              isFormat: /dddd HH:mm/,
            },
            weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),
            weekdaysMin: "S_P_A_T_K_Pn_Š".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "YYYY-MM-DD",
              LL: "YYYY [m.] MMMM D [d.]",
              LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
              LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
              l: "YYYY-MM-DD",
              ll: "YYYY [m.] MMMM D [d.]",
              lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
              llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]",
            },
            calendar: {
              sameDay: "[Šiandien] LT",
              nextDay: "[Rytoj] LT",
              nextWeek: "dddd LT",
              lastDay: "[Vakar] LT",
              lastWeek: "[Praėjusį] dddd LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "po %s",
              past: "prieš %s",
              s: n,
              m: r,
              mm: i,
              h: r,
              hh: i,
              d: r,
              dd: i,
              M: r,
              MM: i,
              y: r,
              yy: i,
            },
            ordinalParse: /\d{1,2}-oji/,
            ordinal: function (e) {
              return e + "-oji";
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      7595: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            m: "minūtes_minūtēm_minūte_minūtes".split("_"),
            mm: "minūtes_minūtēm_minūte_minūtes".split("_"),
            h: "stundas_stundām_stunda_stundas".split("_"),
            hh: "stundas_stundām_stunda_stundas".split("_"),
            d: "dienas_dienām_diena_dienas".split("_"),
            dd: "dienas_dienām_diena_dienas".split("_"),
            M: "mēneša_mēnešiem_mēnesis_mēneši".split("_"),
            MM: "mēneša_mēnešiem_mēnesis_mēneši".split("_"),
            y: "gada_gadiem_gads_gadi".split("_"),
            yy: "gada_gadiem_gads_gadi".split("_"),
          };
          function n(e, t, n) {
            return n
              ? t % 10 == 1 && 11 !== t
                ? e[2]
                : e[3]
              : t % 10 == 1 && 11 !== t
              ? e[0]
              : e[1];
          }
          function r(e, r, s) {
            return e + " " + n(t[s], e, r);
          }
          function s(e, r, s) {
            return n(t[s], e, r);
          }
          function a(e, t) {
            return t ? "dažas sekundes" : "dažām sekundēm";
          }
          e.defineLocale("lv", {
            months:
              "janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split(
                "_"
              ),
            monthsShort:
              "jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),
            weekdays:
              "svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split(
                "_"
              ),
            weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"),
            weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY.",
              LL: "YYYY. [gada] D. MMMM",
              LLL: "YYYY. [gada] D. MMMM, HH:mm",
              LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm",
            },
            calendar: {
              sameDay: "[Šodien pulksten] LT",
              nextDay: "[Rīt pulksten] LT",
              nextWeek: "dddd [pulksten] LT",
              lastDay: "[Vakar pulksten] LT",
              lastWeek: "[Pagājušā] dddd [pulksten] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "pēc %s",
              past: "pirms %s",
              s: a,
              m: s,
              mm: r,
              h: s,
              hh: r,
              d: s,
              dd: r,
              M: s,
              MM: r,
              y: s,
              yy: r,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      9861: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            words: {
              m: ["jedan minut", "jednog minuta"],
              mm: ["minut", "minuta", "minuta"],
              h: ["jedan sat", "jednog sata"],
              hh: ["sat", "sata", "sati"],
              dd: ["dan", "dana", "dana"],
              MM: ["mjesec", "mjeseca", "mjeseci"],
              yy: ["godina", "godine", "godina"],
            },
            correctGrammaticalCase: function (e, t) {
              return 1 === e ? t[0] : e >= 2 && e <= 4 ? t[1] : t[2];
            },
            translate: function (e, n, r) {
              var s = t.words[r];
              return 1 === r.length
                ? n
                  ? s[0]
                  : s[1]
                : e + " " + t.correctGrammaticalCase(e, s);
            },
          };
          e.defineLocale("me", {
            months: [
              "januar",
              "februar",
              "mart",
              "april",
              "maj",
              "jun",
              "jul",
              "avgust",
              "septembar",
              "oktobar",
              "novembar",
              "decembar",
            ],
            monthsShort: [
              "jan.",
              "feb.",
              "mar.",
              "apr.",
              "maj",
              "jun",
              "jul",
              "avg.",
              "sep.",
              "okt.",
              "nov.",
              "dec.",
            ],
            weekdays: [
              "nedjelja",
              "ponedjeljak",
              "utorak",
              "srijeda",
              "četvrtak",
              "petak",
              "subota",
            ],
            weekdaysShort: [
              "ned.",
              "pon.",
              "uto.",
              "sri.",
              "čet.",
              "pet.",
              "sub.",
            ],
            weekdaysMin: ["ne", "po", "ut", "sr", "če", "pe", "su"],
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD. MM. YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd, D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[danas u] LT",
              nextDay: "[sjutra u] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[u] [nedjelju] [u] LT";
                  case 3:
                    return "[u] [srijedu] [u] LT";
                  case 6:
                    return "[u] [subotu] [u] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[u] dddd [u] LT";
                }
              },
              lastDay: "[juče u] LT",
              lastWeek: function () {
                return [
                  "[prošle] [nedjelje] [u] LT",
                  "[prošlog] [ponedjeljka] [u] LT",
                  "[prošlog] [utorka] [u] LT",
                  "[prošle] [srijede] [u] LT",
                  "[prošlog] [četvrtka] [u] LT",
                  "[prošlog] [petka] [u] LT",
                  "[prošle] [subote] [u] LT",
                ][this.day()];
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "za %s",
              past: "prije %s",
              s: "nekoliko sekundi",
              m: t.translate,
              mm: t.translate,
              h: t.translate,
              hh: t.translate,
              d: "dan",
              dd: t.translate,
              M: "mjesec",
              MM: t.translate,
              y: "godinu",
              yy: t.translate,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      5966: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("mk", {
            months:
              "јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split(
                "_"
              ),
            monthsShort:
              "јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),
            weekdays:
              "недела_понеделник_вторник_среда_четврток_петок_сабота".split(
                "_"
              ),
            weekdaysShort: "нед_пон_вто_сре_чет_пет_саб".split("_"),
            weekdaysMin: "нe_пo_вт_ср_че_пе_сa".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "D.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY H:mm",
              LLLL: "dddd, D MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[Денес во] LT",
              nextDay: "[Утре во] LT",
              nextWeek: "[Во] dddd [во] LT",
              lastDay: "[Вчера во] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                  case 3:
                  case 6:
                    return "[Изминатата] dddd [во] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[Изминатиот] dddd [во] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "после %s",
              past: "пред %s",
              s: "неколку секунди",
              m: "минута",
              mm: "%d минути",
              h: "час",
              hh: "%d часа",
              d: "ден",
              dd: "%d дена",
              M: "месец",
              MM: "%d месеци",
              y: "година",
              yy: "%d години",
            },
            ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
            ordinal: function (e) {
              var t = e % 10,
                n = e % 100;
              return 0 === e
                ? e + "-ев"
                : 0 === n
                ? e + "-ен"
                : n > 10 && n < 20
                ? e + "-ти"
                : 1 === t
                ? e + "-ви"
                : 2 === t
                ? e + "-ри"
                : 7 === t || 8 === t
                ? e + "-ми"
                : e + "-ти";
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      7341: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ml", {
            months:
              "ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split(
                "_"
              ),
            monthsShort:
              "ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split(
                "_"
              ),
            weekdays:
              "ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split(
                "_"
              ),
            weekdaysShort: "ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split(
              "_"
            ),
            weekdaysMin: "ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),
            longDateFormat: {
              LT: "A h:mm -നു",
              LTS: "A h:mm:ss -നു",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, A h:mm -നു",
              LLLL: "dddd, D MMMM YYYY, A h:mm -നു",
            },
            calendar: {
              sameDay: "[ഇന്ന്] LT",
              nextDay: "[നാളെ] LT",
              nextWeek: "dddd, LT",
              lastDay: "[ഇന്നലെ] LT",
              lastWeek: "[കഴിഞ്ഞ] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s കഴിഞ്ഞ്",
              past: "%s മുൻപ്",
              s: "അൽപ നിമിഷങ്ങൾ",
              m: "ഒരു മിനിറ്റ്",
              mm: "%d മിനിറ്റ്",
              h: "ഒരു മണിക്കൂർ",
              hh: "%d മണിക്കൂർ",
              d: "ഒരു ദിവസം",
              dd: "%d ദിവസം",
              M: "ഒരു മാസം",
              MM: "%d മാസം",
              y: "ഒരു വർഷം",
              yy: "%d വർഷം",
            },
            meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                ("രാത്രി" === t && e >= 4) ||
                "ഉച്ച കഴിഞ്ഞ്" === t ||
                "വൈകുന്നേരം" === t
                  ? e + 12
                  : e
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "രാത്രി"
                : e < 12
                ? "രാവിലെ"
                : e < 17
                ? "ഉച്ച കഴിഞ്ഞ്"
                : e < 20
                ? "വൈകുന്നേരം"
                : "രാത്രി";
            },
          });
        })(n(381));
      },
      370: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "१",
              2: "२",
              3: "३",
              4: "४",
              5: "५",
              6: "६",
              7: "७",
              8: "८",
              9: "९",
              0: "०",
            },
            n = {
              "१": "1",
              "२": "2",
              "३": "3",
              "४": "4",
              "५": "5",
              "६": "6",
              "७": "7",
              "८": "8",
              "९": "9",
              "०": "0",
            };
          function r(e, t, n, r) {
            var s = "";
            if (t)
              switch (n) {
                case "s":
                  s = "काही सेकंद";
                  break;
                case "m":
                  s = "एक मिनिट";
                  break;
                case "mm":
                  s = "%d मिनिटे";
                  break;
                case "h":
                  s = "एक तास";
                  break;
                case "hh":
                  s = "%d तास";
                  break;
                case "d":
                  s = "एक दिवस";
                  break;
                case "dd":
                  s = "%d दिवस";
                  break;
                case "M":
                  s = "एक महिना";
                  break;
                case "MM":
                  s = "%d महिने";
                  break;
                case "y":
                  s = "एक वर्ष";
                  break;
                case "yy":
                  s = "%d वर्षे";
              }
            else
              switch (n) {
                case "s":
                  s = "काही सेकंदां";
                  break;
                case "m":
                  s = "एका मिनिटा";
                  break;
                case "mm":
                  s = "%d मिनिटां";
                  break;
                case "h":
                  s = "एका तासा";
                  break;
                case "hh":
                  s = "%d तासां";
                  break;
                case "d":
                  s = "एका दिवसा";
                  break;
                case "dd":
                  s = "%d दिवसां";
                  break;
                case "M":
                  s = "एका महिन्या";
                  break;
                case "MM":
                  s = "%d महिन्यां";
                  break;
                case "y":
                  s = "एका वर्षा";
                  break;
                case "yy":
                  s = "%d वर्षां";
              }
            return s.replace(/%d/i, e);
          }
          e.defineLocale("mr", {
            months:
              "जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split(
                "_"
              ),
            monthsShort:
              "जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split(
                "_"
              ),
            weekdays:
              "रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
            weekdaysShort: "रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),
            weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"),
            longDateFormat: {
              LT: "A h:mm वाजता",
              LTS: "A h:mm:ss वाजता",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, A h:mm वाजता",
              LLLL: "dddd, D MMMM YYYY, A h:mm वाजता",
            },
            calendar: {
              sameDay: "[आज] LT",
              nextDay: "[उद्या] LT",
              nextWeek: "dddd, LT",
              lastDay: "[काल] LT",
              lastWeek: "[मागील] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%sमध्ये",
              past: "%sपूर्वी",
              s: r,
              m: r,
              mm: r,
              h: r,
              hh: r,
              d: r,
              dd: r,
              M: r,
              MM: r,
              y: r,
              yy: r,
            },
            preparse: function (e) {
              return e.replace(/[१२३४५६७८९०]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "रात्री" === t
                  ? e < 4
                    ? e
                    : e + 12
                  : "सकाळी" === t
                  ? e
                  : "दुपारी" === t
                  ? e >= 10
                    ? e
                    : e + 12
                  : "सायंकाळी" === t
                  ? e + 12
                  : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "रात्री"
                : e < 10
                ? "सकाळी"
                : e < 17
                ? "दुपारी"
                : e < 20
                ? "सायंकाळी"
                : "रात्री";
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(381));
      },
      1237: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ms-my", {
            months:
              "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split(
                "_"
              ),
            monthsShort:
              "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
            weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
            weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
            weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
            longDateFormat: {
              LT: "HH.mm",
              LTS: "HH.mm.ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY [pukul] HH.mm",
              LLLL: "dddd, D MMMM YYYY [pukul] HH.mm",
            },
            meridiemParse: /pagi|tengahari|petang|malam/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "pagi" === t
                  ? e
                  : "tengahari" === t
                  ? e >= 11
                    ? e
                    : e + 12
                  : "petang" === t || "malam" === t
                  ? e + 12
                  : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 11
                ? "pagi"
                : e < 15
                ? "tengahari"
                : e < 19
                ? "petang"
                : "malam";
            },
            calendar: {
              sameDay: "[Hari ini pukul] LT",
              nextDay: "[Esok pukul] LT",
              nextWeek: "dddd [pukul] LT",
              lastDay: "[Kelmarin pukul] LT",
              lastWeek: "dddd [lepas pukul] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "dalam %s",
              past: "%s yang lepas",
              s: "beberapa saat",
              m: "seminit",
              mm: "%d minit",
              h: "sejam",
              hh: "%d jam",
              d: "sehari",
              dd: "%d hari",
              M: "sebulan",
              MM: "%d bulan",
              y: "setahun",
              yy: "%d tahun",
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      9847: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ms", {
            months:
              "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split(
                "_"
              ),
            monthsShort:
              "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
            weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
            weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
            weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
            longDateFormat: {
              LT: "HH.mm",
              LTS: "HH.mm.ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY [pukul] HH.mm",
              LLLL: "dddd, D MMMM YYYY [pukul] HH.mm",
            },
            meridiemParse: /pagi|tengahari|petang|malam/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "pagi" === t
                  ? e
                  : "tengahari" === t
                  ? e >= 11
                    ? e
                    : e + 12
                  : "petang" === t || "malam" === t
                  ? e + 12
                  : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 11
                ? "pagi"
                : e < 15
                ? "tengahari"
                : e < 19
                ? "petang"
                : "malam";
            },
            calendar: {
              sameDay: "[Hari ini pukul] LT",
              nextDay: "[Esok pukul] LT",
              nextWeek: "dddd [pukul] LT",
              lastDay: "[Kelmarin pukul] LT",
              lastWeek: "dddd [lepas pukul] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "dalam %s",
              past: "%s yang lepas",
              s: "beberapa saat",
              m: "seminit",
              mm: "%d minit",
              h: "sejam",
              hh: "%d jam",
              d: "sehari",
              dd: "%d hari",
              M: "sebulan",
              MM: "%d bulan",
              y: "setahun",
              yy: "%d tahun",
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      6165: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "၁",
              2: "၂",
              3: "၃",
              4: "၄",
              5: "၅",
              6: "၆",
              7: "၇",
              8: "၈",
              9: "၉",
              0: "၀",
            },
            n = {
              "၁": "1",
              "၂": "2",
              "၃": "3",
              "၄": "4",
              "၅": "5",
              "၆": "6",
              "၇": "7",
              "၈": "8",
              "၉": "9",
              "၀": "0",
            };
          e.defineLocale("my", {
            months:
              "ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split(
                "_"
              ),
            monthsShort:
              "ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"),
            weekdays:
              "တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split(
                "_"
              ),
            weekdaysShort: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),
            weekdaysMin: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[ယနေ.] LT [မှာ]",
              nextDay: "[မနက်ဖြန်] LT [မှာ]",
              nextWeek: "dddd LT [မှာ]",
              lastDay: "[မနေ.က] LT [မှာ]",
              lastWeek: "[ပြီးခဲ့သော] dddd LT [မှာ]",
              sameElse: "L",
            },
            relativeTime: {
              future: "လာမည့် %s မှာ",
              past: "လွန်ခဲ့သော %s က",
              s: "စက္ကန်.အနည်းငယ်",
              m: "တစ်မိနစ်",
              mm: "%d မိနစ်",
              h: "တစ်နာရီ",
              hh: "%d နာရီ",
              d: "တစ်ရက်",
              dd: "%d ရက်",
              M: "တစ်လ",
              MM: "%d လ",
              y: "တစ်နှစ်",
              yy: "%d နှစ်",
            },
            preparse: function (e) {
              return e.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      4924: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("nb", {
            months:
              "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split(
                "_"
              ),
            monthsShort:
              "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split(
                "_"
              ),
            weekdays:
              "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
            weekdaysShort: "sø._ma._ti._on._to._fr._lø.".split("_"),
            weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY [kl.] HH:mm",
              LLLL: "dddd D. MMMM YYYY [kl.] HH:mm",
            },
            calendar: {
              sameDay: "[i dag kl.] LT",
              nextDay: "[i morgen kl.] LT",
              nextWeek: "dddd [kl.] LT",
              lastDay: "[i går kl.] LT",
              lastWeek: "[forrige] dddd [kl.] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "om %s",
              past: "for %s siden",
              s: "noen sekunder",
              m: "ett minutt",
              mm: "%d minutter",
              h: "en time",
              hh: "%d timer",
              d: "en dag",
              dd: "%d dager",
              M: "en måned",
              MM: "%d måneder",
              y: "ett år",
              yy: "%d år",
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      6744: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "१",
              2: "२",
              3: "३",
              4: "४",
              5: "५",
              6: "६",
              7: "७",
              8: "८",
              9: "९",
              0: "०",
            },
            n = {
              "१": "1",
              "२": "2",
              "३": "3",
              "४": "4",
              "५": "5",
              "६": "6",
              "७": "7",
              "८": "8",
              "९": "9",
              "०": "0",
            };
          e.defineLocale("ne", {
            months:
              "जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split(
                "_"
              ),
            monthsShort:
              "जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split(
                "_"
              ),
            weekdays:
              "आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split(
                "_"
              ),
            weekdaysShort: "आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),
            weekdaysMin: "आ._सो._मं._बु._बि._शु._श.".split("_"),
            longDateFormat: {
              LT: "Aको h:mm बजे",
              LTS: "Aको h:mm:ss बजे",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, Aको h:mm बजे",
              LLLL: "dddd, D MMMM YYYY, Aको h:mm बजे",
            },
            preparse: function (e) {
              return e.replace(/[१२३४५६७८९०]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "राति" === t
                  ? e < 4
                    ? e
                    : e + 12
                  : "बिहान" === t
                  ? e
                  : "दिउँसो" === t
                  ? e >= 10
                    ? e
                    : e + 12
                  : "साँझ" === t
                  ? e + 12
                  : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 3
                ? "राति"
                : e < 12
                ? "बिहान"
                : e < 16
                ? "दिउँसो"
                : e < 20
                ? "साँझ"
                : "राति";
            },
            calendar: {
              sameDay: "[आज] LT",
              nextDay: "[भोलि] LT",
              nextWeek: "[आउँदो] dddd[,] LT",
              lastDay: "[हिजो] LT",
              lastWeek: "[गएको] dddd[,] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%sमा",
              past: "%s अगाडि",
              s: "केही क्षण",
              m: "एक मिनेट",
              mm: "%d मिनेट",
              h: "एक घण्टा",
              hh: "%d घण्टा",
              d: "एक दिन",
              dd: "%d दिन",
              M: "एक महिना",
              MM: "%d महिना",
              y: "एक बर्ष",
              yy: "%d बर्ष",
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(381));
      },
      3901: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split(
                "_"
              ),
            n = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");
          e.defineLocale("nl", {
            months:
              "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split(
                "_"
              ),
            monthsShort: function (e, r) {
              return /-MMM-/.test(r) ? n[e.month()] : t[e.month()];
            },
            weekdays:
              "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split(
                "_"
              ),
            weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
            weekdaysMin: "Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD-MM-YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[vandaag om] LT",
              nextDay: "[morgen om] LT",
              nextWeek: "dddd [om] LT",
              lastDay: "[gisteren om] LT",
              lastWeek: "[afgelopen] dddd [om] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "over %s",
              past: "%s geleden",
              s: "een paar seconden",
              m: "één minuut",
              mm: "%d minuten",
              h: "één uur",
              hh: "%d uur",
              d: "één dag",
              dd: "%d dagen",
              M: "één maand",
              MM: "%d maanden",
              y: "één jaar",
              yy: "%d jaar",
            },
            ordinalParse: /\d{1,2}(ste|de)/,
            ordinal: function (e) {
              return e + (1 === e || 8 === e || e >= 20 ? "ste" : "de");
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      3877: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("nn", {
            months:
              "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split(
                "_"
              ),
            monthsShort:
              "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
            weekdays:
              "sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
            weekdaysShort: "sun_mån_tys_ons_tor_fre_lau".split("_"),
            weekdaysMin: "su_må_ty_on_to_fr_lø".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY [kl.] H:mm",
              LLLL: "dddd D. MMMM YYYY [kl.] HH:mm",
            },
            calendar: {
              sameDay: "[I dag klokka] LT",
              nextDay: "[I morgon klokka] LT",
              nextWeek: "dddd [klokka] LT",
              lastDay: "[I går klokka] LT",
              lastWeek: "[Føregåande] dddd [klokka] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "om %s",
              past: "for %s sidan",
              s: "nokre sekund",
              m: "eit minutt",
              mm: "%d minutt",
              h: "ein time",
              hh: "%d timar",
              d: "ein dag",
              dd: "%d dagar",
              M: "ein månad",
              MM: "%d månader",
              y: "eit år",
              yy: "%d år",
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      5858: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "੧",
              2: "੨",
              3: "੩",
              4: "੪",
              5: "੫",
              6: "੬",
              7: "੭",
              8: "੮",
              9: "੯",
              0: "੦",
            },
            n = {
              "੧": "1",
              "੨": "2",
              "੩": "3",
              "੪": "4",
              "੫": "5",
              "੬": "6",
              "੭": "7",
              "੮": "8",
              "੯": "9",
              "੦": "0",
            };
          e.defineLocale("pa-in", {
            months:
              "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split(
                "_"
              ),
            monthsShort:
              "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split(
                "_"
              ),
            weekdays:
              "ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ".split(
                "_"
              ),
            weekdaysShort: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),
            weekdaysMin: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),
            longDateFormat: {
              LT: "A h:mm ਵਜੇ",
              LTS: "A h:mm:ss ਵਜੇ",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, A h:mm ਵਜੇ",
              LLLL: "dddd, D MMMM YYYY, A h:mm ਵਜੇ",
            },
            calendar: {
              sameDay: "[ਅਜ] LT",
              nextDay: "[ਕਲ] LT",
              nextWeek: "dddd, LT",
              lastDay: "[ਕਲ] LT",
              lastWeek: "[ਪਿਛਲੇ] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s ਵਿੱਚ",
              past: "%s ਪਿਛਲੇ",
              s: "ਕੁਝ ਸਕਿੰਟ",
              m: "ਇਕ ਮਿੰਟ",
              mm: "%d ਮਿੰਟ",
              h: "ਇੱਕ ਘੰਟਾ",
              hh: "%d ਘੰਟੇ",
              d: "ਇੱਕ ਦਿਨ",
              dd: "%d ਦਿਨ",
              M: "ਇੱਕ ਮਹੀਨਾ",
              MM: "%d ਮਹੀਨੇ",
              y: "ਇੱਕ ਸਾਲ",
              yy: "%d ਸਾਲ",
            },
            preparse: function (e) {
              return e.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "ਰਾਤ" === t
                  ? e < 4
                    ? e
                    : e + 12
                  : "ਸਵੇਰ" === t
                  ? e
                  : "ਦੁਪਹਿਰ" === t
                  ? e >= 10
                    ? e
                    : e + 12
                  : "ਸ਼ਾਮ" === t
                  ? e + 12
                  : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "ਰਾਤ"
                : e < 10
                ? "ਸਵੇਰ"
                : e < 17
                ? "ਦੁਪਹਿਰ"
                : e < 20
                ? "ਸ਼ਾਮ"
                : "ਰਾਤ";
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(381));
      },
      4495: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split(
                "_"
              ),
            n =
              "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split(
                "_"
              );
          function r(e) {
            return e % 10 < 5 && e % 10 > 1 && ~~(e / 10) % 10 != 1;
          }
          function s(e, t, n) {
            var s = e + " ";
            switch (n) {
              case "m":
                return t ? "minuta" : "minutę";
              case "mm":
                return s + (r(e) ? "minuty" : "minut");
              case "h":
                return t ? "godzina" : "godzinę";
              case "hh":
                return s + (r(e) ? "godziny" : "godzin");
              case "MM":
                return s + (r(e) ? "miesiące" : "miesięcy");
              case "yy":
                return s + (r(e) ? "lata" : "lat");
            }
          }
          e.defineLocale("pl", {
            months: function (e, r) {
              return "" === r
                ? "(" + n[e.month()] + "|" + t[e.month()] + ")"
                : /D MMMM/.test(r)
                ? n[e.month()]
                : t[e.month()];
            },
            monthsShort:
              "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
            weekdays:
              "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split(
                "_"
              ),
            weekdaysShort: "nie_pon_wt_śr_czw_pt_sb".split("_"),
            weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Dziś o] LT",
              nextDay: "[Jutro o] LT",
              nextWeek: "[W] dddd [o] LT",
              lastDay: "[Wczoraj o] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[W zeszłą niedzielę o] LT";
                  case 3:
                    return "[W zeszłą środę o] LT";
                  case 6:
                    return "[W zeszłą sobotę o] LT";
                  default:
                    return "[W zeszły] dddd [o] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "za %s",
              past: "%s temu",
              s: "kilka sekund",
              m: s,
              mm: s,
              h: s,
              hh: s,
              d: "1 dzień",
              dd: "%d dni",
              M: "miesiąc",
              MM: s,
              y: "rok",
              yy: s,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      7971: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("pt-br", {
            months:
              "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
                "_"
              ),
            monthsShort:
              "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
            weekdays:
              "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split(
                "_"
              ),
            weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
            weekdaysMin: "Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D [de] MMMM [de] YYYY",
              LLL: "D [de] MMMM [de] YYYY [às] HH:mm",
              LLLL: "dddd, D [de] MMMM [de] YYYY [às] HH:mm",
            },
            calendar: {
              sameDay: "[Hoje às] LT",
              nextDay: "[Amanhã às] LT",
              nextWeek: "dddd [às] LT",
              lastDay: "[Ontem às] LT",
              lastWeek: function () {
                return 0 === this.day() || 6 === this.day()
                  ? "[Último] dddd [às] LT"
                  : "[Última] dddd [às] LT";
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "em %s",
              past: "%s atrás",
              s: "poucos segundos",
              m: "um minuto",
              mm: "%d minutos",
              h: "uma hora",
              hh: "%d horas",
              d: "um dia",
              dd: "%d dias",
              M: "um mês",
              MM: "%d meses",
              y: "um ano",
              yy: "%d anos",
            },
            ordinalParse: /\d{1,2}º/,
            ordinal: "%dº",
          });
        })(n(381));
      },
      9520: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("pt", {
            months:
              "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
                "_"
              ),
            monthsShort:
              "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
            weekdays:
              "Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split(
                "_"
              ),
            weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
            weekdaysMin: "Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D [de] MMMM [de] YYYY",
              LLL: "D [de] MMMM [de] YYYY HH:mm",
              LLLL: "dddd, D [de] MMMM [de] YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Hoje às] LT",
              nextDay: "[Amanhã às] LT",
              nextWeek: "dddd [às] LT",
              lastDay: "[Ontem às] LT",
              lastWeek: function () {
                return 0 === this.day() || 6 === this.day()
                  ? "[Último] dddd [às] LT"
                  : "[Última] dddd [às] LT";
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "em %s",
              past: "há %s",
              s: "segundos",
              m: "um minuto",
              mm: "%d minutos",
              h: "uma hora",
              hh: "%d horas",
              d: "um dia",
              dd: "%d dias",
              M: "um mês",
              MM: "%d meses",
              y: "um ano",
              yy: "%d anos",
            },
            ordinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      6459: function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n) {
            var r = " ";
            return (
              (e % 100 >= 20 || (e >= 100 && e % 100 == 0)) && (r = " de "),
              e +
                r +
                { mm: "minute", hh: "ore", dd: "zile", MM: "luni", yy: "ani" }[
                  n
                ]
            );
          }
          e.defineLocale("ro", {
            months:
              "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split(
                "_"
              ),
            monthsShort:
              "ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split(
                "_"
              ),
            weekdays: "duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split(
              "_"
            ),
            weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
            weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY H:mm",
              LLLL: "dddd, D MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[azi la] LT",
              nextDay: "[mâine la] LT",
              nextWeek: "dddd [la] LT",
              lastDay: "[ieri la] LT",
              lastWeek: "[fosta] dddd [la] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "peste %s",
              past: "%s în urmă",
              s: "câteva secunde",
              m: "un minut",
              mm: t,
              h: "o oră",
              hh: t,
              d: "o zi",
              dd: t,
              M: "o lună",
              MM: t,
              y: "un an",
              yy: t,
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      1793: function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t) {
            var n = e.split("_");
            return t % 10 == 1 && t % 100 != 11
              ? n[0]
              : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20)
              ? n[1]
              : n[2];
          }
          function n(e, n, r) {
            return "m" === r
              ? n
                ? "минута"
                : "минуту"
              : e +
                  " " +
                  t(
                    {
                      mm: n ? "минута_минуты_минут" : "минуту_минуты_минут",
                      hh: "час_часа_часов",
                      dd: "день_дня_дней",
                      MM: "месяц_месяца_месяцев",
                      yy: "год_года_лет",
                    }[r],
                    +e
                  );
          }
          var r = [
            /^янв/i,
            /^фев/i,
            /^мар/i,
            /^апр/i,
            /^ма[й|я]/i,
            /^июн/i,
            /^июл/i,
            /^авг/i,
            /^сен/i,
            /^окт/i,
            /^ноя/i,
            /^дек/i,
          ];
          e.defineLocale("ru", {
            months: {
              format:
                "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split(
                  "_"
                ),
              standalone:
                "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split(
                  "_"
                ),
            },
            monthsShort: {
              format: "янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split(
                "_"
              ),
              standalone:
                "янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),
            },
            weekdays: {
              standalone:
                "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split(
                  "_"
                ),
              format:
                "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split(
                  "_"
                ),
              isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/,
            },
            weekdaysShort: "вс_пн_вт_ср_чт_пт_сб".split("_"),
            weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
            monthsParse: r,
            longMonthsParse: r,
            shortMonthsParse: r,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY г.",
              LLL: "D MMMM YYYY г., HH:mm",
              LLLL: "dddd, D MMMM YYYY г., HH:mm",
            },
            calendar: {
              sameDay: "[Сегодня в] LT",
              nextDay: "[Завтра в] LT",
              lastDay: "[Вчера в] LT",
              nextWeek: function (e) {
                if (e.week() === this.week())
                  return 2 === this.day()
                    ? "[Во] dddd [в] LT"
                    : "[В] dddd [в] LT";
                switch (this.day()) {
                  case 0:
                    return "[В следующее] dddd [в] LT";
                  case 1:
                  case 2:
                  case 4:
                    return "[В следующий] dddd [в] LT";
                  case 3:
                  case 5:
                  case 6:
                    return "[В следующую] dddd [в] LT";
                }
              },
              lastWeek: function (e) {
                if (e.week() === this.week())
                  return 2 === this.day()
                    ? "[Во] dddd [в] LT"
                    : "[В] dddd [в] LT";
                switch (this.day()) {
                  case 0:
                    return "[В прошлое] dddd [в] LT";
                  case 1:
                  case 2:
                  case 4:
                    return "[В прошлый] dddd [в] LT";
                  case 3:
                  case 5:
                  case 6:
                    return "[В прошлую] dddd [в] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "через %s",
              past: "%s назад",
              s: "несколько секунд",
              m: n,
              mm: n,
              h: "час",
              hh: n,
              d: "день",
              dd: n,
              M: "месяц",
              MM: n,
              y: "год",
              yy: n,
            },
            meridiemParse: /ночи|утра|дня|вечера/i,
            isPM: function (e) {
              return /^(дня|вечера)$/.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "ночи"
                : e < 12
                ? "утра"
                : e < 17
                ? "дня"
                : "вечера";
            },
            ordinalParse: /\d{1,2}-(й|го|я)/,
            ordinal: function (e, t) {
              switch (t) {
                case "M":
                case "d":
                case "DDD":
                  return e + "-й";
                case "D":
                  return e + "-го";
                case "w":
                case "W":
                  return e + "-я";
                default:
                  return e;
              }
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      490: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("se", {
            months:
              "ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu".split(
                "_"
              ),
            monthsShort:
              "ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov".split(
                "_"
              ),
            weekdays:
              "sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat".split(
                "_"
              ),
            weekdaysShort: "sotn_vuos_maŋ_gask_duor_bear_láv".split("_"),
            weekdaysMin: "s_v_m_g_d_b_L".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "MMMM D. [b.] YYYY",
              LLL: "MMMM D. [b.] YYYY [ti.] HH:mm",
              LLLL: "dddd, MMMM D. [b.] YYYY [ti.] HH:mm",
            },
            calendar: {
              sameDay: "[otne ti] LT",
              nextDay: "[ihttin ti] LT",
              nextWeek: "dddd [ti] LT",
              lastDay: "[ikte ti] LT",
              lastWeek: "[ovddit] dddd [ti] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s geažes",
              past: "maŋit %s",
              s: "moadde sekunddat",
              m: "okta minuhta",
              mm: "%d minuhtat",
              h: "okta diimmu",
              hh: "%d diimmut",
              d: "okta beaivi",
              dd: "%d beaivvit",
              M: "okta mánnu",
              MM: "%d mánut",
              y: "okta jahki",
              yy: "%d jagit",
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      124: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("si", {
            months:
              "ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්".split(
                "_"
              ),
            monthsShort:
              "ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ".split(
                "_"
              ),
            weekdays:
              "ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split(
                "_"
              ),
            weekdaysShort: "ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"),
            weekdaysMin: "ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"),
            longDateFormat: {
              LT: "a h:mm",
              LTS: "a h:mm:ss",
              L: "YYYY/MM/DD",
              LL: "YYYY MMMM D",
              LLL: "YYYY MMMM D, a h:mm",
              LLLL: "YYYY MMMM D [වැනි] dddd, a h:mm:ss",
            },
            calendar: {
              sameDay: "[අද] LT[ට]",
              nextDay: "[හෙට] LT[ට]",
              nextWeek: "dddd LT[ට]",
              lastDay: "[ඊයේ] LT[ට]",
              lastWeek: "[පසුගිය] dddd LT[ට]",
              sameElse: "L",
            },
            relativeTime: {
              future: "%sකින්",
              past: "%sකට පෙර",
              s: "තත්පර කිහිපය",
              m: "මිනිත්තුව",
              mm: "මිනිත්තු %d",
              h: "පැය",
              hh: "පැය %d",
              d: "දිනය",
              dd: "දින %d",
              M: "මාසය",
              MM: "මාස %d",
              y: "වසර",
              yy: "වසර %d",
            },
            ordinalParse: /\d{1,2} වැනි/,
            ordinal: function (e) {
              return e + " වැනි";
            },
            meridiemParse: /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
            isPM: function (e) {
              return "ප.ව." === e || "පස් වරු" === e;
            },
            meridiem: function (e, t, n) {
              return e > 11
                ? n
                  ? "ප.ව."
                  : "පස් වරු"
                : n
                ? "පෙ.ව."
                : "පෙර වරු";
            },
          });
        })(n(381));
      },
      4249: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split(
                "_"
              ),
            n = "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");
          function r(e) {
            return e > 1 && e < 5;
          }
          function s(e, t, n, s) {
            var a = e + " ";
            switch (n) {
              case "s":
                return t || s ? "pár sekúnd" : "pár sekundami";
              case "m":
                return t ? "minúta" : s ? "minútu" : "minútou";
              case "mm":
                return t || s
                  ? a + (r(e) ? "minúty" : "minút")
                  : a + "minútami";
              case "h":
                return t ? "hodina" : s ? "hodinu" : "hodinou";
              case "hh":
                return t || s
                  ? a + (r(e) ? "hodiny" : "hodín")
                  : a + "hodinami";
              case "d":
                return t || s ? "deň" : "dňom";
              case "dd":
                return t || s ? a + (r(e) ? "dni" : "dní") : a + "dňami";
              case "M":
                return t || s ? "mesiac" : "mesiacom";
              case "MM":
                return t || s
                  ? a + (r(e) ? "mesiace" : "mesiacov")
                  : a + "mesiacmi";
              case "y":
                return t || s ? "rok" : "rokom";
              case "yy":
                return t || s ? a + (r(e) ? "roky" : "rokov") : a + "rokmi";
            }
          }
          e.defineLocale("sk", {
            months: t,
            monthsShort: n,
            weekdays:
              "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),
            weekdaysShort: "ne_po_ut_st_št_pi_so".split("_"),
            weekdaysMin: "ne_po_ut_st_št_pi_so".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[dnes o] LT",
              nextDay: "[zajtra o] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[v nedeľu o] LT";
                  case 1:
                  case 2:
                    return "[v] dddd [o] LT";
                  case 3:
                    return "[v stredu o] LT";
                  case 4:
                    return "[vo štvrtok o] LT";
                  case 5:
                    return "[v piatok o] LT";
                  case 6:
                    return "[v sobotu o] LT";
                }
              },
              lastDay: "[včera o] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[minulú nedeľu o] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[minulý] dddd [o] LT";
                  case 3:
                    return "[minulú stredu o] LT";
                  case 6:
                    return "[minulú sobotu o] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "za %s",
              past: "pred %s",
              s,
              m: s,
              mm: s,
              h: s,
              hh: s,
              d: s,
              dd: s,
              M: s,
              MM: s,
              y: s,
              yy: s,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      4985: function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n, r) {
            var s = e + " ";
            switch (n) {
              case "s":
                return t || r ? "nekaj sekund" : "nekaj sekundami";
              case "m":
                return t ? "ena minuta" : "eno minuto";
              case "mm":
                return (s +=
                  1 === e
                    ? t
                      ? "minuta"
                      : "minuto"
                    : 2 === e
                    ? t || r
                      ? "minuti"
                      : "minutama"
                    : e < 5
                    ? t || r
                      ? "minute"
                      : "minutami"
                    : t || r
                    ? "minut"
                    : "minutami");
              case "h":
                return t ? "ena ura" : "eno uro";
              case "hh":
                return (s +=
                  1 === e
                    ? t
                      ? "ura"
                      : "uro"
                    : 2 === e
                    ? t || r
                      ? "uri"
                      : "urama"
                    : e < 5
                    ? t || r
                      ? "ure"
                      : "urami"
                    : t || r
                    ? "ur"
                    : "urami");
              case "d":
                return t || r ? "en dan" : "enim dnem";
              case "dd":
                return (s +=
                  1 === e
                    ? t || r
                      ? "dan"
                      : "dnem"
                    : 2 === e
                    ? t || r
                      ? "dni"
                      : "dnevoma"
                    : t || r
                    ? "dni"
                    : "dnevi");
              case "M":
                return t || r ? "en mesec" : "enim mesecem";
              case "MM":
                return (s +=
                  1 === e
                    ? t || r
                      ? "mesec"
                      : "mesecem"
                    : 2 === e
                    ? t || r
                      ? "meseca"
                      : "mesecema"
                    : e < 5
                    ? t || r
                      ? "mesece"
                      : "meseci"
                    : t || r
                    ? "mesecev"
                    : "meseci");
              case "y":
                return t || r ? "eno leto" : "enim letom";
              case "yy":
                return (s +=
                  1 === e
                    ? t || r
                      ? "leto"
                      : "letom"
                    : 2 === e
                    ? t || r
                      ? "leti"
                      : "letoma"
                    : e < 5
                    ? t || r
                      ? "leta"
                      : "leti"
                    : t || r
                    ? "let"
                    : "leti");
            }
          }
          e.defineLocale("sl", {
            months:
              "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split(
                "_"
              ),
            monthsShort:
              "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split(
                "_"
              ),
            weekdays:
              "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
            weekdaysShort: "ned._pon._tor._sre._čet._pet._sob.".split("_"),
            weekdaysMin: "ne_po_to_sr_če_pe_so".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD. MM. YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd, D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[danes ob] LT",
              nextDay: "[jutri ob] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[v] [nedeljo] [ob] LT";
                  case 3:
                    return "[v] [sredo] [ob] LT";
                  case 6:
                    return "[v] [soboto] [ob] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[v] dddd [ob] LT";
                }
              },
              lastDay: "[včeraj ob] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[prejšnjo] [nedeljo] [ob] LT";
                  case 3:
                    return "[prejšnjo] [sredo] [ob] LT";
                  case 6:
                    return "[prejšnjo] [soboto] [ob] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[prejšnji] dddd [ob] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "čez %s",
              past: "pred %s",
              s: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      1104: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("sq", {
            months:
              "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split(
                "_"
              ),
            monthsShort:
              "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),
            weekdays:
              "E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split(
                "_"
              ),
            weekdaysShort: "Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),
            weekdaysMin: "D_H_Ma_Më_E_P_Sh".split("_"),
            meridiemParse: /PD|MD/,
            isPM: function (e) {
              return "M" === e.charAt(0);
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "PD" : "MD";
            },
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Sot në] LT",
              nextDay: "[Nesër në] LT",
              nextWeek: "dddd [në] LT",
              lastDay: "[Dje në] LT",
              lastWeek: "dddd [e kaluar në] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "në %s",
              past: "%s më parë",
              s: "disa sekonda",
              m: "një minutë",
              mm: "%d minuta",
              h: "një orë",
              hh: "%d orë",
              d: "një ditë",
              dd: "%d ditë",
              M: "një muaj",
              MM: "%d muaj",
              y: "një vit",
              yy: "%d vite",
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      9915: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            words: {
              m: ["један минут", "једне минуте"],
              mm: ["минут", "минуте", "минута"],
              h: ["један сат", "једног сата"],
              hh: ["сат", "сата", "сати"],
              dd: ["дан", "дана", "дана"],
              MM: ["месец", "месеца", "месеци"],
              yy: ["година", "године", "година"],
            },
            correctGrammaticalCase: function (e, t) {
              return 1 === e ? t[0] : e >= 2 && e <= 4 ? t[1] : t[2];
            },
            translate: function (e, n, r) {
              var s = t.words[r];
              return 1 === r.length
                ? n
                  ? s[0]
                  : s[1]
                : e + " " + t.correctGrammaticalCase(e, s);
            },
          };
          e.defineLocale("sr-cyrl", {
            months: [
              "јануар",
              "фебруар",
              "март",
              "април",
              "мај",
              "јун",
              "јул",
              "август",
              "септембар",
              "октобар",
              "новембар",
              "децембар",
            ],
            monthsShort: [
              "јан.",
              "феб.",
              "мар.",
              "апр.",
              "мај",
              "јун",
              "јул",
              "авг.",
              "сеп.",
              "окт.",
              "нов.",
              "дец.",
            ],
            weekdays: [
              "недеља",
              "понедељак",
              "уторак",
              "среда",
              "четвртак",
              "петак",
              "субота",
            ],
            weekdaysShort: [
              "нед.",
              "пон.",
              "уто.",
              "сре.",
              "чет.",
              "пет.",
              "суб.",
            ],
            weekdaysMin: ["не", "по", "ут", "ср", "че", "пе", "су"],
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD. MM. YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd, D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[данас у] LT",
              nextDay: "[сутра у] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[у] [недељу] [у] LT";
                  case 3:
                    return "[у] [среду] [у] LT";
                  case 6:
                    return "[у] [суботу] [у] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[у] dddd [у] LT";
                }
              },
              lastDay: "[јуче у] LT",
              lastWeek: function () {
                return [
                  "[прошле] [недеље] [у] LT",
                  "[прошлог] [понедељка] [у] LT",
                  "[прошлог] [уторка] [у] LT",
                  "[прошле] [среде] [у] LT",
                  "[прошлог] [четвртка] [у] LT",
                  "[прошлог] [петка] [у] LT",
                  "[прошле] [суботе] [у] LT",
                ][this.day()];
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "за %s",
              past: "пре %s",
              s: "неколико секунди",
              m: t.translate,
              mm: t.translate,
              h: t.translate,
              hh: t.translate,
              d: "дан",
              dd: t.translate,
              M: "месец",
              MM: t.translate,
              y: "годину",
              yy: t.translate,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      9131: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            words: {
              m: ["jedan minut", "jedne minute"],
              mm: ["minut", "minute", "minuta"],
              h: ["jedan sat", "jednog sata"],
              hh: ["sat", "sata", "sati"],
              dd: ["dan", "dana", "dana"],
              MM: ["mesec", "meseca", "meseci"],
              yy: ["godina", "godine", "godina"],
            },
            correctGrammaticalCase: function (e, t) {
              return 1 === e ? t[0] : e >= 2 && e <= 4 ? t[1] : t[2];
            },
            translate: function (e, n, r) {
              var s = t.words[r];
              return 1 === r.length
                ? n
                  ? s[0]
                  : s[1]
                : e + " " + t.correctGrammaticalCase(e, s);
            },
          };
          e.defineLocale("sr", {
            months: [
              "januar",
              "februar",
              "mart",
              "april",
              "maj",
              "jun",
              "jul",
              "avgust",
              "septembar",
              "oktobar",
              "novembar",
              "decembar",
            ],
            monthsShort: [
              "jan.",
              "feb.",
              "mar.",
              "apr.",
              "maj",
              "jun",
              "jul",
              "avg.",
              "sep.",
              "okt.",
              "nov.",
              "dec.",
            ],
            weekdays: [
              "nedelja",
              "ponedeljak",
              "utorak",
              "sreda",
              "četvrtak",
              "petak",
              "subota",
            ],
            weekdaysShort: [
              "ned.",
              "pon.",
              "uto.",
              "sre.",
              "čet.",
              "pet.",
              "sub.",
            ],
            weekdaysMin: ["ne", "po", "ut", "sr", "če", "pe", "su"],
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD. MM. YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd, D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[danas u] LT",
              nextDay: "[sutra u] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[u] [nedelju] [u] LT";
                  case 3:
                    return "[u] [sredu] [u] LT";
                  case 6:
                    return "[u] [subotu] [u] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[u] dddd [u] LT";
                }
              },
              lastDay: "[juče u] LT",
              lastWeek: function () {
                return [
                  "[prošle] [nedelje] [u] LT",
                  "[prošlog] [ponedeljka] [u] LT",
                  "[prošlog] [utorka] [u] LT",
                  "[prošle] [srede] [u] LT",
                  "[prošlog] [četvrtka] [u] LT",
                  "[prošlog] [petka] [u] LT",
                  "[prošle] [subote] [u] LT",
                ][this.day()];
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "za %s",
              past: "pre %s",
              s: "nekoliko sekundi",
              m: t.translate,
              mm: t.translate,
              h: t.translate,
              hh: t.translate,
              d: "dan",
              dd: t.translate,
              M: "mesec",
              MM: t.translate,
              y: "godinu",
              yy: t.translate,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      8760: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("sv", {
            months:
              "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split(
                "_"
              ),
            monthsShort:
              "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
            weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split(
              "_"
            ),
            weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"),
            weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "YYYY-MM-DD",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Idag] LT",
              nextDay: "[Imorgon] LT",
              lastDay: "[Igår] LT",
              nextWeek: "[På] dddd LT",
              lastWeek: "[I] dddd[s] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "om %s",
              past: "för %s sedan",
              s: "några sekunder",
              m: "en minut",
              mm: "%d minuter",
              h: "en timme",
              hh: "%d timmar",
              d: "en dag",
              dd: "%d dagar",
              M: "en månad",
              MM: "%d månader",
              y: "ett år",
              yy: "%d år",
            },
            ordinalParse: /\d{1,2}(e|a)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 == ~~((e % 100) / 10) ? "e" : 1 === t || 2 === t ? "a" : "e")
              );
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      1172: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("sw", {
            months:
              "Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split(
                "_"
              ),
            monthsShort:
              "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),
            weekdays:
              "Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split(
                "_"
              ),
            weekdaysShort: "Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),
            weekdaysMin: "J2_J3_J4_J5_Al_Ij_J1".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[leo saa] LT",
              nextDay: "[kesho saa] LT",
              nextWeek: "[wiki ijayo] dddd [saat] LT",
              lastDay: "[jana] LT",
              lastWeek: "[wiki iliyopita] dddd [saat] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s baadaye",
              past: "tokea %s",
              s: "hivi punde",
              m: "dakika moja",
              mm: "dakika %d",
              h: "saa limoja",
              hh: "masaa %d",
              d: "siku moja",
              dd: "masiku %d",
              M: "mwezi mmoja",
              MM: "miezi %d",
              y: "mwaka mmoja",
              yy: "miaka %d",
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      7333: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "௧",
              2: "௨",
              3: "௩",
              4: "௪",
              5: "௫",
              6: "௬",
              7: "௭",
              8: "௮",
              9: "௯",
              0: "௦",
            },
            n = {
              "௧": "1",
              "௨": "2",
              "௩": "3",
              "௪": "4",
              "௫": "5",
              "௬": "6",
              "௭": "7",
              "௮": "8",
              "௯": "9",
              "௦": "0",
            };
          e.defineLocale("ta", {
            months:
              "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split(
                "_"
              ),
            monthsShort:
              "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split(
                "_"
              ),
            weekdays:
              "ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split(
                "_"
              ),
            weekdaysShort:
              "ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"),
            weekdaysMin: "ஞா_தி_செ_பு_வி_வெ_ச".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, HH:mm",
              LLLL: "dddd, D MMMM YYYY, HH:mm",
            },
            calendar: {
              sameDay: "[இன்று] LT",
              nextDay: "[நாளை] LT",
              nextWeek: "dddd, LT",
              lastDay: "[நேற்று] LT",
              lastWeek: "[கடந்த வாரம்] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s இல்",
              past: "%s முன்",
              s: "ஒரு சில விநாடிகள்",
              m: "ஒரு நிமிடம்",
              mm: "%d நிமிடங்கள்",
              h: "ஒரு மணி நேரம்",
              hh: "%d மணி நேரம்",
              d: "ஒரு நாள்",
              dd: "%d நாட்கள்",
              M: "ஒரு மாதம்",
              MM: "%d மாதங்கள்",
              y: "ஒரு வருடம்",
              yy: "%d ஆண்டுகள்",
            },
            ordinalParse: /\d{1,2}வது/,
            ordinal: function (e) {
              return e + "வது";
            },
            preparse: function (e) {
              return e.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
            meridiem: function (e, t, n) {
              return e < 2
                ? " யாமம்"
                : e < 6
                ? " வைகறை"
                : e < 10
                ? " காலை"
                : e < 14
                ? " நண்பகல்"
                : e < 18
                ? " எற்பாடு"
                : e < 22
                ? " மாலை"
                : " யாமம்";
            },
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "யாமம்" === t
                  ? e < 2
                    ? e
                    : e + 12
                  : "வைகறை" === t ||
                    "காலை" === t ||
                    ("நண்பகல்" === t && e >= 10)
                  ? e
                  : e + 12
              );
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(381));
      },
      3110: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("te", {
            months:
              "జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్".split(
                "_"
              ),
            monthsShort:
              "జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.".split(
                "_"
              ),
            weekdays:
              "ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం".split(
                "_"
              ),
            weekdaysShort: "ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని".split("_"),
            weekdaysMin: "ఆ_సో_మం_బు_గు_శు_శ".split("_"),
            longDateFormat: {
              LT: "A h:mm",
              LTS: "A h:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, A h:mm",
              LLLL: "dddd, D MMMM YYYY, A h:mm",
            },
            calendar: {
              sameDay: "[నేడు] LT",
              nextDay: "[రేపు] LT",
              nextWeek: "dddd, LT",
              lastDay: "[నిన్న] LT",
              lastWeek: "[గత] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s లో",
              past: "%s క్రితం",
              s: "కొన్ని క్షణాలు",
              m: "ఒక నిమిషం",
              mm: "%d నిమిషాలు",
              h: "ఒక గంట",
              hh: "%d గంటలు",
              d: "ఒక రోజు",
              dd: "%d రోజులు",
              M: "ఒక నెల",
              MM: "%d నెలలు",
              y: "ఒక సంవత్సరం",
              yy: "%d సంవత్సరాలు",
            },
            ordinalParse: /\d{1,2}వ/,
            ordinal: "%dవ",
            meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "రాత్రి" === t
                  ? e < 4
                    ? e
                    : e + 12
                  : "ఉదయం" === t
                  ? e
                  : "మధ్యాహ్నం" === t
                  ? e >= 10
                    ? e
                    : e + 12
                  : "సాయంత్రం" === t
                  ? e + 12
                  : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "రాత్రి"
                : e < 10
                ? "ఉదయం"
                : e < 17
                ? "మధ్యాహ్నం"
                : e < 20
                ? "సాయంత్రం"
                : "రాత్రి";
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(381));
      },
      9041: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("th", {
            months:
              "มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split(
                "_"
              ),
            monthsShort:
              "มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา".split(
                "_"
              ),
            weekdays: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split(
              "_"
            ),
            weekdaysShort: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split(
              "_"
            ),
            weekdaysMin: "อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),
            longDateFormat: {
              LT: "H นาฬิกา m นาที",
              LTS: "H นาฬิกา m นาที s วินาที",
              L: "YYYY/MM/DD",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY เวลา H นาฬิกา m นาที",
              LLLL: "วันddddที่ D MMMM YYYY เวลา H นาฬิกา m นาที",
            },
            meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
            isPM: function (e) {
              return "หลังเที่ยง" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "ก่อนเที่ยง" : "หลังเที่ยง";
            },
            calendar: {
              sameDay: "[วันนี้ เวลา] LT",
              nextDay: "[พรุ่งนี้ เวลา] LT",
              nextWeek: "dddd[หน้า เวลา] LT",
              lastDay: "[เมื่อวานนี้ เวลา] LT",
              lastWeek: "[วัน]dddd[ที่แล้ว เวลา] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "อีก %s",
              past: "%sที่แล้ว",
              s: "ไม่กี่วินาที",
              m: "1 นาที",
              mm: "%d นาที",
              h: "1 ชั่วโมง",
              hh: "%d ชั่วโมง",
              d: "1 วัน",
              dd: "%d วัน",
              M: "1 เดือน",
              MM: "%d เดือน",
              y: "1 ปี",
              yy: "%d ปี",
            },
          });
        })(n(381));
      },
      5768: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("tl-ph", {
            months:
              "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split(
                "_"
              ),
            monthsShort:
              "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),
            weekdays:
              "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split(
                "_"
              ),
            weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),
            weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "MM/D/YYYY",
              LL: "MMMM D, YYYY",
              LLL: "MMMM D, YYYY HH:mm",
              LLLL: "dddd, MMMM DD, YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Ngayon sa] LT",
              nextDay: "[Bukas sa] LT",
              nextWeek: "dddd [sa] LT",
              lastDay: "[Kahapon sa] LT",
              lastWeek: "dddd [huling linggo] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "sa loob ng %s",
              past: "%s ang nakalipas",
              s: "ilang segundo",
              m: "isang minuto",
              mm: "%d minuto",
              h: "isang oras",
              hh: "%d oras",
              d: "isang araw",
              dd: "%d araw",
              M: "isang buwan",
              MM: "%d buwan",
              y: "isang taon",
              yy: "%d taon",
            },
            ordinalParse: /\d{1,2}/,
            ordinal: function (e) {
              return e;
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      9444: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = "pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_");
          function n(e) {
            var t = e;
            return (t =
              -1 !== e.indexOf("jaj")
                ? t.slice(0, -3) + "leS"
                : -1 !== e.indexOf("jar")
                ? t.slice(0, -3) + "waQ"
                : -1 !== e.indexOf("DIS")
                ? t.slice(0, -3) + "nem"
                : t + " pIq");
          }
          function r(e) {
            var t = e;
            return (t =
              -1 !== e.indexOf("jaj")
                ? t.slice(0, -3) + "Hu’"
                : -1 !== e.indexOf("jar")
                ? t.slice(0, -3) + "wen"
                : -1 !== e.indexOf("DIS")
                ? t.slice(0, -3) + "ben"
                : t + " ret");
          }
          function s(e, t, n, r) {
            var s = a(e);
            switch (n) {
              case "mm":
                return s + " tup";
              case "hh":
                return s + " rep";
              case "dd":
                return s + " jaj";
              case "MM":
                return s + " jar";
              case "yy":
                return s + " DIS";
            }
          }
          function a(e) {
            var n = Math.floor((e % 1e3) / 100),
              r = Math.floor((e % 100) / 10),
              s = e % 10,
              a = "";
            return (
              n > 0 && (a += t[n] + "vatlh"),
              r > 0 && (a += ("" !== a ? " " : "") + t[r] + "maH"),
              s > 0 && (a += ("" !== a ? " " : "") + t[s]),
              "" === a ? "pagh" : a
            );
          }
          e.defineLocale("tlh", {
            months:
              "tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’".split(
                "_"
              ),
            monthsShort:
              "jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’".split(
                "_"
              ),
            weekdays:
              "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split(
                "_"
              ),
            weekdaysShort:
              "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split(
                "_"
              ),
            weekdaysMin:
              "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split(
                "_"
              ),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[DaHjaj] LT",
              nextDay: "[wa’leS] LT",
              nextWeek: "LLL",
              lastDay: "[wa’Hu’] LT",
              lastWeek: "LLL",
              sameElse: "L",
            },
            relativeTime: {
              future: n,
              past: r,
              s: "puS lup",
              m: "wa’ tup",
              mm: s,
              h: "wa’ rep",
              hh: s,
              d: "wa’ jaj",
              dd: s,
              M: "wa’ jar",
              MM: s,
              y: "wa’ DIS",
              yy: s,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      2397: function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            1: "'inci",
            5: "'inci",
            8: "'inci",
            70: "'inci",
            80: "'inci",
            2: "'nci",
            7: "'nci",
            20: "'nci",
            50: "'nci",
            3: "'üncü",
            4: "'üncü",
            100: "'üncü",
            6: "'ncı",
            9: "'uncu",
            10: "'uncu",
            30: "'uncu",
            60: "'ıncı",
            90: "'ıncı",
          };
          e.defineLocale("tr", {
            months:
              "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split(
                "_"
              ),
            monthsShort:
              "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
            weekdays:
              "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split(
                "_"
              ),
            weekdaysShort: "Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
            weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[bugün saat] LT",
              nextDay: "[yarın saat] LT",
              nextWeek: "[haftaya] dddd [saat] LT",
              lastDay: "[dün] LT",
              lastWeek: "[geçen hafta] dddd [saat] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s sonra",
              past: "%s önce",
              s: "birkaç saniye",
              m: "bir dakika",
              mm: "%d dakika",
              h: "bir saat",
              hh: "%d saat",
              d: "bir gün",
              dd: "%d gün",
              M: "bir ay",
              MM: "%d ay",
              y: "bir yıl",
              yy: "%d yıl",
            },
            ordinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
            ordinal: function (e) {
              if (0 === e) return e + "'ıncı";
              var n = e % 10,
                r = (e % 100) - n,
                s = e >= 100 ? 100 : null;
              return e + (t[n] || t[r] || t[s]);
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      8254: function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n, r) {
            var s = {
              s: ["viensas secunds", "'iensas secunds"],
              m: ["'n míut", "'iens míut"],
              mm: [e + " míuts", e + " míuts"],
              h: ["'n þora", "'iensa þora"],
              hh: [e + " þoras", e + " þoras"],
              d: ["'n ziua", "'iensa ziua"],
              dd: [e + " ziuas", e + " ziuas"],
              M: ["'n mes", "'iens mes"],
              MM: [e + " mesen", e + " mesen"],
              y: ["'n ar", "'iens ar"],
              yy: [e + " ars", e + " ars"],
            };
            return r || t ? s[n][0] : s[n][1];
          }
          e.defineLocale("tzl", {
            months:
              "Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split(
                "_"
              ),
            monthsShort:
              "Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"),
            weekdays:
              "Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"),
            weekdaysShort: "Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"),
            weekdaysMin: "Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"),
            longDateFormat: {
              LT: "HH.mm",
              LTS: "HH.mm.ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM [dallas] YYYY",
              LLL: "D. MMMM [dallas] YYYY HH.mm",
              LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm",
            },
            meridiemParse: /d\'o|d\'a/i,
            isPM: function (e) {
              return "d'o" === e.toLowerCase();
            },
            meridiem: function (e, t, n) {
              return e > 11 ? (n ? "d'o" : "D'O") : n ? "d'a" : "D'A";
            },
            calendar: {
              sameDay: "[oxhi à] LT",
              nextDay: "[demà à] LT",
              nextWeek: "dddd [à] LT",
              lastDay: "[ieiri à] LT",
              lastWeek: "[sür el] dddd [lasteu à] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "osprei %s",
              past: "ja%s",
              s: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t,
            },
            ordinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      699: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("tzm-latn", {
            months:
              "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split(
                "_"
              ),
            monthsShort:
              "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split(
                "_"
              ),
            weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split(
              "_"
            ),
            weekdaysShort:
              "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
            weekdaysMin:
              "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[asdkh g] LT",
              nextDay: "[aska g] LT",
              nextWeek: "dddd [g] LT",
              lastDay: "[assant g] LT",
              lastWeek: "dddd [g] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "dadkh s yan %s",
              past: "yan %s",
              s: "imik",
              m: "minuḍ",
              mm: "%d minuḍ",
              h: "saɛa",
              hh: "%d tassaɛin",
              d: "ass",
              dd: "%d ossan",
              M: "ayowr",
              MM: "%d iyyirn",
              y: "asgas",
              yy: "%d isgasn",
            },
            week: { dow: 6, doy: 12 },
          });
        })(n(381));
      },
      1106: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("tzm", {
            months:
              "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split(
                "_"
              ),
            monthsShort:
              "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split(
                "_"
              ),
            weekdays: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split(
              "_"
            ),
            weekdaysShort:
              "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
            weekdaysMin:
              "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[ⴰⵙⴷⵅ ⴴ] LT",
              nextDay: "[ⴰⵙⴽⴰ ⴴ] LT",
              nextWeek: "dddd [ⴴ] LT",
              lastDay: "[ⴰⵚⴰⵏⵜ ⴴ] LT",
              lastWeek: "dddd [ⴴ] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",
              past: "ⵢⴰⵏ %s",
              s: "ⵉⵎⵉⴽ",
              m: "ⵎⵉⵏⵓⴺ",
              mm: "%d ⵎⵉⵏⵓⴺ",
              h: "ⵙⴰⵄⴰ",
              hh: "%d ⵜⴰⵙⵙⴰⵄⵉⵏ",
              d: "ⴰⵙⵙ",
              dd: "%d oⵙⵙⴰⵏ",
              M: "ⴰⵢoⵓⵔ",
              MM: "%d ⵉⵢⵢⵉⵔⵏ",
              y: "ⴰⵙⴳⴰⵙ",
              yy: "%d ⵉⵙⴳⴰⵙⵏ",
            },
            week: { dow: 6, doy: 12 },
          });
        })(n(381));
      },
      7691: function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t) {
            var n = e.split("_");
            return t % 10 == 1 && t % 100 != 11
              ? n[0]
              : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20)
              ? n[1]
              : n[2];
          }
          function n(e, n, r) {
            return "m" === r
              ? n
                ? "хвилина"
                : "хвилину"
              : "h" === r
              ? n
                ? "година"
                : "годину"
              : e +
                " " +
                t(
                  {
                    mm: n ? "хвилина_хвилини_хвилин" : "хвилину_хвилини_хвилин",
                    hh: n ? "година_години_годин" : "годину_години_годин",
                    dd: "день_дні_днів",
                    MM: "місяць_місяці_місяців",
                    yy: "рік_роки_років",
                  }[r],
                  +e
                );
          }
          function r(e, t) {
            return {
              nominative:
                "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split(
                  "_"
                ),
              accusative:
                "неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split(
                  "_"
                ),
              genitive:
                "неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split(
                  "_"
                ),
            }[
              /(\[[ВвУу]\]) ?dddd/.test(t)
                ? "accusative"
                : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(t)
                ? "genitive"
                : "nominative"
            ][e.day()];
          }
          function s(e) {
            return function () {
              return e + "о" + (11 === this.hours() ? "б" : "") + "] LT";
            };
          }
          e.defineLocale("uk", {
            months: {
              format:
                "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split(
                  "_"
                ),
              standalone:
                "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split(
                  "_"
                ),
            },
            monthsShort:
              "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split(
                "_"
              ),
            weekdays: r,
            weekdaysShort: "нд_пн_вт_ср_чт_пт_сб".split("_"),
            weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY р.",
              LLL: "D MMMM YYYY р., HH:mm",
              LLLL: "dddd, D MMMM YYYY р., HH:mm",
            },
            calendar: {
              sameDay: s("[Сьогодні "),
              nextDay: s("[Завтра "),
              lastDay: s("[Вчора "),
              nextWeek: s("[У] dddd ["),
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                  case 3:
                  case 5:
                  case 6:
                    return s("[Минулої] dddd [").call(this);
                  case 1:
                  case 2:
                  case 4:
                    return s("[Минулого] dddd [").call(this);
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "за %s",
              past: "%s тому",
              s: "декілька секунд",
              m: n,
              mm: n,
              h: "годину",
              hh: n,
              d: "день",
              dd: n,
              M: "місяць",
              MM: n,
              y: "рік",
              yy: n,
            },
            meridiemParse: /ночі|ранку|дня|вечора/,
            isPM: function (e) {
              return /^(дня|вечора)$/.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "ночі"
                : e < 12
                ? "ранку"
                : e < 17
                ? "дня"
                : "вечора";
            },
            ordinalParse: /\d{1,2}-(й|го)/,
            ordinal: function (e, t) {
              switch (t) {
                case "M":
                case "d":
                case "DDD":
                case "w":
                case "W":
                  return e + "-й";
                case "D":
                  return e + "-го";
                default:
                  return e;
              }
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      6791: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("uz", {
            months:
              "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split(
                "_"
              ),
            monthsShort:
              "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
            weekdays:
              "Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),
            weekdaysShort: "Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),
            weekdaysMin: "Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "D MMMM YYYY, dddd HH:mm",
            },
            calendar: {
              sameDay: "[Бугун соат] LT [да]",
              nextDay: "[Эртага] LT [да]",
              nextWeek: "dddd [куни соат] LT [да]",
              lastDay: "[Кеча соат] LT [да]",
              lastWeek: "[Утган] dddd [куни соат] LT [да]",
              sameElse: "L",
            },
            relativeTime: {
              future: "Якин %s ичида",
              past: "Бир неча %s олдин",
              s: "фурсат",
              m: "бир дакика",
              mm: "%d дакика",
              h: "бир соат",
              hh: "%d соат",
              d: "бир кун",
              dd: "%d кун",
              M: "бир ой",
              MM: "%d ой",
              y: "бир йил",
              yy: "%d йил",
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(381));
      },
      5666: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("vi", {
            months:
              "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split(
                "_"
              ),
            monthsShort:
              "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split(
                "_"
              ),
            weekdays:
              "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split(
                "_"
              ),
            weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
            weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
            meridiemParse: /sa|ch/i,
            isPM: function (e) {
              return /^ch$/i.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 12 ? (n ? "sa" : "SA") : n ? "ch" : "CH";
            },
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM [năm] YYYY",
              LLL: "D MMMM [năm] YYYY HH:mm",
              LLLL: "dddd, D MMMM [năm] YYYY HH:mm",
              l: "DD/M/YYYY",
              ll: "D MMM YYYY",
              lll: "D MMM YYYY HH:mm",
              llll: "ddd, D MMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Hôm nay lúc] LT",
              nextDay: "[Ngày mai lúc] LT",
              nextWeek: "dddd [tuần tới lúc] LT",
              lastDay: "[Hôm qua lúc] LT",
              lastWeek: "dddd [tuần rồi lúc] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s tới",
              past: "%s trước",
              s: "vài giây",
              m: "một phút",
              mm: "%d phút",
              h: "một giờ",
              hh: "%d giờ",
              d: "một ngày",
              dd: "%d ngày",
              M: "một tháng",
              MM: "%d tháng",
              y: "một năm",
              yy: "%d năm",
            },
            ordinalParse: /\d{1,2}/,
            ordinal: function (e) {
              return e;
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      3839: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("zh-cn", {
            months:
              "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
                "_"
              ),
            monthsShort:
              "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
            weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split(
              "_"
            ),
            weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
            weekdaysMin: "日_一_二_三_四_五_六".split("_"),
            longDateFormat: {
              LT: "Ah点mm分",
              LTS: "Ah点m分s秒",
              L: "YYYY-MM-DD",
              LL: "YYYY年MMMD日",
              LLL: "YYYY年MMMD日Ah点mm分",
              LLLL: "YYYY年MMMD日ddddAh点mm分",
              l: "YYYY-MM-DD",
              ll: "YYYY年MMMD日",
              lll: "YYYY年MMMD日Ah点mm分",
              llll: "YYYY年MMMD日ddddAh点mm分",
            },
            meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "凌晨" === t || "早上" === t || "上午" === t
                  ? e
                  : "下午" === t || "晚上" === t
                  ? e + 12
                  : e >= 11
                  ? e
                  : e + 12
              );
            },
            meridiem: function (e, t, n) {
              var r = 100 * e + t;
              return r < 600
                ? "凌晨"
                : r < 900
                ? "早上"
                : r < 1130
                ? "上午"
                : r < 1230
                ? "中午"
                : r < 1800
                ? "下午"
                : "晚上";
            },
            calendar: {
              sameDay: function () {
                return 0 === this.minutes() ? "[今天]Ah[点整]" : "[今天]LT";
              },
              nextDay: function () {
                return 0 === this.minutes() ? "[明天]Ah[点整]" : "[明天]LT";
              },
              lastDay: function () {
                return 0 === this.minutes() ? "[昨天]Ah[点整]" : "[昨天]LT";
              },
              nextWeek: function () {
                var t, n;
                return (
                  (t = e().startOf("week")),
                  (n = this.unix() - t.unix() >= 604800 ? "[下]" : "[本]"),
                  0 === this.minutes() ? n + "dddAh点整" : n + "dddAh点mm"
                );
              },
              lastWeek: function () {
                var t, n;
                return (
                  (t = e().startOf("week")),
                  (n = this.unix() < t.unix() ? "[上]" : "[本]"),
                  0 === this.minutes() ? n + "dddAh点整" : n + "dddAh点mm"
                );
              },
              sameElse: "LL",
            },
            ordinalParse: /\d{1,2}(日|月|周)/,
            ordinal: function (e, t) {
              switch (t) {
                case "d":
                case "D":
                case "DDD":
                  return e + "日";
                case "M":
                  return e + "月";
                case "w":
                case "W":
                  return e + "周";
                default:
                  return e;
              }
            },
            relativeTime: {
              future: "%s内",
              past: "%s前",
              s: "几秒",
              m: "1 分钟",
              mm: "%d 分钟",
              h: "1 小时",
              hh: "%d 小时",
              d: "1 天",
              dd: "%d 天",
              M: "1 个月",
              MM: "%d 个月",
              y: "1 年",
              yy: "%d 年",
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(381));
      },
      4152: function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("zh-tw", {
            months:
              "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
                "_"
              ),
            monthsShort:
              "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
            weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split(
              "_"
            ),
            weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
            weekdaysMin: "日_一_二_三_四_五_六".split("_"),
            longDateFormat: {
              LT: "Ah點mm分",
              LTS: "Ah點m分s秒",
              L: "YYYY年MMMD日",
              LL: "YYYY年MMMD日",
              LLL: "YYYY年MMMD日Ah點mm分",
              LLLL: "YYYY年MMMD日ddddAh點mm分",
              l: "YYYY年MMMD日",
              ll: "YYYY年MMMD日",
              lll: "YYYY年MMMD日Ah點mm分",
              llll: "YYYY年MMMD日ddddAh點mm分",
            },
            meridiemParse: /早上|上午|中午|下午|晚上/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "早上" === t || "上午" === t
                  ? e
                  : "中午" === t
                  ? e >= 11
                    ? e
                    : e + 12
                  : "下午" === t || "晚上" === t
                  ? e + 12
                  : void 0
              );
            },
            meridiem: function (e, t, n) {
              var r = 100 * e + t;
              return r < 900
                ? "早上"
                : r < 1130
                ? "上午"
                : r < 1230
                ? "中午"
                : r < 1800
                ? "下午"
                : "晚上";
            },
            calendar: {
              sameDay: "[今天]LT",
              nextDay: "[明天]LT",
              nextWeek: "[下]ddddLT",
              lastDay: "[昨天]LT",
              lastWeek: "[上]ddddLT",
              sameElse: "L",
            },
            ordinalParse: /\d{1,2}(日|月|週)/,
            ordinal: function (e, t) {
              switch (t) {
                case "d":
                case "D":
                case "DDD":
                  return e + "日";
                case "M":
                  return e + "月";
                case "w":
                case "W":
                  return e + "週";
                default:
                  return e;
              }
            },
            relativeTime: {
              future: "%s內",
              past: "%s前",
              s: "幾秒",
              m: "一分鐘",
              mm: "%d分鐘",
              h: "一小時",
              hh: "%d小時",
              d: "一天",
              dd: "%d天",
              M: "一個月",
              MM: "%d個月",
              y: "一年",
              yy: "%d年",
            },
          });
        })(n(381));
      },
      6700: (e, t, n) => {
        var r = {
          "./af": 2786,
          "./af.js": 2786,
          "./ar": 867,
          "./ar-ma": 7702,
          "./ar-ma.js": 7702,
          "./ar-sa": 6040,
          "./ar-sa.js": 6040,
          "./ar-tn": 7100,
          "./ar-tn.js": 7100,
          "./ar.js": 867,
          "./az": 1083,
          "./az.js": 1083,
          "./be": 9808,
          "./be.js": 9808,
          "./bg": 8338,
          "./bg.js": 8338,
          "./bn": 8905,
          "./bn.js": 8905,
          "./bo": 1560,
          "./bo.js": 1560,
          "./br": 1278,
          "./br.js": 1278,
          "./bs": 622,
          "./bs.js": 622,
          "./ca": 2468,
          "./ca.js": 2468,
          "./cs": 5822,
          "./cs.js": 5822,
          "./cv": 877,
          "./cv.js": 877,
          "./cy": 7373,
          "./cy.js": 7373,
          "./da": 4780,
          "./da.js": 4780,
          "./de": 9740,
          "./de-at": 217,
          "./de-at.js": 217,
          "./de.js": 9740,
          "./dv": 5300,
          "./dv.js": 5300,
          "./el": 837,
          "./el.js": 837,
          "./en-au": 8348,
          "./en-au.js": 8348,
          "./en-ca": 7925,
          "./en-ca.js": 7925,
          "./en-gb": 2243,
          "./en-gb.js": 2243,
          "./en-ie": 6436,
          "./en-ie.js": 6436,
          "./en-nz": 6319,
          "./en-nz.js": 6319,
          "./eo": 2915,
          "./eo.js": 2915,
          "./es": 5655,
          "./es.js": 5655,
          "./et": 5603,
          "./et.js": 5603,
          "./eu": 7763,
          "./eu.js": 7763,
          "./fa": 6959,
          "./fa.js": 6959,
          "./fi": 1897,
          "./fi.js": 1897,
          "./fo": 4694,
          "./fo.js": 4694,
          "./fr": 5596,
          "./fr-ca": 3049,
          "./fr-ca.js": 3049,
          "./fr-ch": 2330,
          "./fr-ch.js": 2330,
          "./fr.js": 5596,
          "./fy": 5044,
          "./fy.js": 5044,
          "./gd": 2101,
          "./gd.js": 2101,
          "./gl": 8794,
          "./gl.js": 8794,
          "./he": 4206,
          "./he.js": 4206,
          "./hi": 94,
          "./hi.js": 94,
          "./hr": 316,
          "./hr.js": 316,
          "./hu": 2138,
          "./hu.js": 2138,
          "./hy-am": 1423,
          "./hy-am.js": 1423,
          "./id": 9218,
          "./id.js": 9218,
          "./is": 135,
          "./is.js": 135,
          "./it": 626,
          "./it.js": 626,
          "./ja": 9183,
          "./ja.js": 9183,
          "./jv": 4286,
          "./jv.js": 4286,
          "./ka": 2105,
          "./ka.js": 2105,
          "./kk": 7772,
          "./kk.js": 7772,
          "./km": 8758,
          "./km.js": 8758,
          "./ko": 3730,
          "./ko.js": 3730,
          "./lb": 6841,
          "./lb.js": 6841,
          "./lo": 5466,
          "./lo.js": 5466,
          "./lt": 7010,
          "./lt.js": 7010,
          "./lv": 7595,
          "./lv.js": 7595,
          "./me": 9861,
          "./me.js": 9861,
          "./mk": 5966,
          "./mk.js": 5966,
          "./ml": 7341,
          "./ml.js": 7341,
          "./mr": 370,
          "./mr.js": 370,
          "./ms": 9847,
          "./ms-my": 1237,
          "./ms-my.js": 1237,
          "./ms.js": 9847,
          "./my": 6165,
          "./my.js": 6165,
          "./nb": 4924,
          "./nb.js": 4924,
          "./ne": 6744,
          "./ne.js": 6744,
          "./nl": 3901,
          "./nl.js": 3901,
          "./nn": 3877,
          "./nn.js": 3877,
          "./pa-in": 5858,
          "./pa-in.js": 5858,
          "./pl": 4495,
          "./pl.js": 4495,
          "./pt": 9520,
          "./pt-br": 7971,
          "./pt-br.js": 7971,
          "./pt.js": 9520,
          "./ro": 6459,
          "./ro.js": 6459,
          "./ru": 1793,
          "./ru.js": 1793,
          "./se": 490,
          "./se.js": 490,
          "./si": 124,
          "./si.js": 124,
          "./sk": 4249,
          "./sk.js": 4249,
          "./sl": 4985,
          "./sl.js": 4985,
          "./sq": 1104,
          "./sq.js": 1104,
          "./sr": 9131,
          "./sr-cyrl": 9915,
          "./sr-cyrl.js": 9915,
          "./sr.js": 9131,
          "./sv": 8760,
          "./sv.js": 8760,
          "./sw": 1172,
          "./sw.js": 1172,
          "./ta": 7333,
          "./ta.js": 7333,
          "./te": 3110,
          "./te.js": 3110,
          "./th": 9041,
          "./th.js": 9041,
          "./tl-ph": 5768,
          "./tl-ph.js": 5768,
          "./tlh": 9444,
          "./tlh.js": 9444,
          "./tr": 2397,
          "./tr.js": 2397,
          "./tzl": 8254,
          "./tzl.js": 8254,
          "./tzm": 1106,
          "./tzm-latn": 699,
          "./tzm-latn.js": 699,
          "./tzm.js": 1106,
          "./uk": 7691,
          "./uk.js": 7691,
          "./uz": 6791,
          "./uz.js": 6791,
          "./vi": 5666,
          "./vi.js": 5666,
          "./zh-cn": 3839,
          "./zh-cn.js": 3839,
          "./zh-tw": 4152,
          "./zh-tw.js": 4152,
        };
        function s(e) {
          var t = a(e);
          return n(t);
        }
        function a(e) {
          if (!n.o(r, e)) {
            var t = new Error("Cannot find module '" + e + "'");
            throw ((t.code = "MODULE_NOT_FOUND"), t);
          }
          return r[e];
        }
        (s.keys = function () {
          return Object.keys(r);
        }),
          (s.resolve = a),
          (e.exports = s),
          (s.id = 6700);
      },
      381: function (e, t, n) {
        (e = n.nmd(e)).exports = (function () {
          "use strict";
          var t;
          function r() {
            return t.apply(null, arguments);
          }
          function s(e) {
            t = e;
          }
          function a(e) {
            return (
              e instanceof Array ||
              "[object Array]" === Object.prototype.toString.call(e)
            );
          }
          function i(e) {
            return (
              e instanceof Date ||
              "[object Date]" === Object.prototype.toString.call(e)
            );
          }
          function o(e, t) {
            var n,
              r = [];
            for (n = 0; n < e.length; ++n) r.push(t(e[n], n));
            return r;
          }
          function u(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }
          function d(e, t) {
            for (var n in t) u(t, n) && (e[n] = t[n]);
            return (
              u(t, "toString") && (e.toString = t.toString),
              u(t, "valueOf") && (e.valueOf = t.valueOf),
              e
            );
          }
          function l(e, t, n, r) {
            return Ot(e, t, n, r, !0).utc();
          }
          function c() {
            return {
              empty: !1,
              unusedTokens: [],
              unusedInput: [],
              overflow: -2,
              charsLeftOver: 0,
              nullInput: !1,
              invalidMonth: null,
              invalidFormat: !1,
              userInvalidated: !1,
              iso: !1,
            };
          }
          function _(e) {
            return null == e._pf && (e._pf = c()), e._pf;
          }
          function h(e) {
            if (null == e._isValid) {
              var t = _(e);
              (e._isValid = !(
                isNaN(e._d.getTime()) ||
                !(t.overflow < 0) ||
                t.empty ||
                t.invalidMonth ||
                t.invalidWeekday ||
                t.nullInput ||
                t.invalidFormat ||
                t.userInvalidated
              )),
                e._strict &&
                  (e._isValid =
                    e._isValid &&
                    0 === t.charsLeftOver &&
                    0 === t.unusedTokens.length &&
                    void 0 === t.bigHour);
            }
            return e._isValid;
          }
          function m(e) {
            var t = l(NaN);
            return null != e ? d(_(t), e) : (_(t).userInvalidated = !0), t;
          }
          function p(e) {
            return void 0 === e;
          }
          var f = (r.momentProperties = []);
          function y(e, t) {
            var n, r, s;
            if (
              (p(t._isAMomentObject) ||
                (e._isAMomentObject = t._isAMomentObject),
              p(t._i) || (e._i = t._i),
              p(t._f) || (e._f = t._f),
              p(t._l) || (e._l = t._l),
              p(t._strict) || (e._strict = t._strict),
              p(t._tzm) || (e._tzm = t._tzm),
              p(t._isUTC) || (e._isUTC = t._isUTC),
              p(t._offset) || (e._offset = t._offset),
              p(t._pf) || (e._pf = _(t)),
              p(t._locale) || (e._locale = t._locale),
              f.length > 0)
            )
              for (n in f) p((s = t[(r = f[n])])) || (e[r] = s);
            return e;
          }
          var g = !1;
          function M(e) {
            y(this, e),
              (this._d = new Date(null != e._d ? e._d.getTime() : NaN)),
              !1 === g && ((g = !0), r.updateOffset(this), (g = !1));
          }
          function L(e) {
            return e instanceof M || (null != e && null != e._isAMomentObject);
          }
          function v(e) {
            return e < 0 ? Math.ceil(e) : Math.floor(e);
          }
          function Y(e) {
            var t = +e,
              n = 0;
            return 0 !== t && isFinite(t) && (n = v(t)), n;
          }
          function b(e, t, n) {
            var r,
              s = Math.min(e.length, t.length),
              a = Math.abs(e.length - t.length),
              i = 0;
            for (r = 0; r < s; r++)
              ((n && e[r] !== t[r]) || (!n && Y(e[r]) !== Y(t[r]))) && i++;
            return i + a;
          }
          function k(e) {
            !1 === r.suppressDeprecationWarnings &&
              "undefined" != typeof console &&
              console.warn;
          }
          function w(e, t) {
            var n = !0;
            return d(function () {
              return (
                n &&
                  (k(
                    e +
                      "\nArguments: " +
                      Array.prototype.slice.call(arguments).join(", ") +
                      "\n" +
                      new Error().stack
                  ),
                  (n = !1)),
                t.apply(this, arguments)
              );
            }, t);
          }
          var D = {};
          function T(e, t) {
            D[e] || (k(t), (D[e] = !0));
          }
          function S(e) {
            return (
              e instanceof Function ||
              "[object Function]" === Object.prototype.toString.call(e)
            );
          }
          function x(e) {
            return "[object Object]" === Object.prototype.toString.call(e);
          }
          function j(e) {
            var t, n;
            for (n in e) S((t = e[n])) ? (this[n] = t) : (this["_" + n] = t);
            (this._config = e),
              (this._ordinalParseLenient = new RegExp(
                this._ordinalParse.source + "|" + /\d{1,2}/.source
              ));
          }
          function H(e, t) {
            var n,
              r = d({}, e);
            for (n in t)
              u(t, n) &&
                (x(e[n]) && x(t[n])
                  ? ((r[n] = {}), d(r[n], e[n]), d(r[n], t[n]))
                  : null != t[n]
                  ? (r[n] = t[n])
                  : delete r[n]);
            return r;
          }
          function P(e) {
            null != e && this.set(e);
          }
          r.suppressDeprecationWarnings = !1;
          var O,
            A = {};
          function E(e) {
            return e ? e.toLowerCase().replace("_", "-") : e;
          }
          function C(e) {
            for (var t, n, r, s, a = 0; a < e.length; ) {
              for (
                t = (s = E(e[a]).split("-")).length,
                  n = (n = E(e[a + 1])) ? n.split("-") : null;
                t > 0;

              ) {
                if ((r = N(s.slice(0, t).join("-")))) return r;
                if (n && n.length >= t && b(s, n, !0) >= t - 1) break;
                t--;
              }
              a++;
            }
            return null;
          }
          function N(t) {
            var r = null;
            if (!A[t] && e && e.exports)
              try {
                (r = O._abbr), n(6700)("./" + t), F(r);
              } catch (e) {}
            return A[t];
          }
          function F(e, t) {
            var n;
            return e && (n = p(t) ? I(e) : W(e, t)) && (O = n), O._abbr;
          }
          function W(e, t) {
            return null !== t
              ? ((t.abbr = e),
                null != A[e]
                  ? (T(
                      "defineLocaleOverride",
                      "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale"
                    ),
                    (t = H(A[e]._config, t)))
                  : null != t.parentLocale &&
                    (null != A[t.parentLocale]
                      ? (t = H(A[t.parentLocale]._config, t))
                      : T(
                          "parentLocaleUndefined",
                          "specified parentLocale is not defined yet"
                        )),
                (A[e] = new P(t)),
                F(e),
                A[e])
              : (delete A[e], null);
          }
          function R(e, t) {
            var n;
            return (
              null != t
                ? (null != A[e] && (t = H(A[e]._config, t)),
                  ((n = new P(t)).parentLocale = A[e]),
                  (A[e] = n),
                  F(e))
                : null != A[e] &&
                  (null != A[e].parentLocale
                    ? (A[e] = A[e].parentLocale)
                    : null != A[e] && delete A[e]),
              A[e]
            );
          }
          function I(e) {
            var t;
            if (
              (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
            )
              return O;
            if (!a(e)) {
              if ((t = N(e))) return t;
              e = [e];
            }
            return C(e);
          }
          function z() {
            return Object.keys(A);
          }
          var U = {};
          function G(e, t) {
            var n = e.toLowerCase();
            U[n] = U[n + "s"] = U[t] = e;
          }
          function J(e) {
            return "string" == typeof e ? U[e] || U[e.toLowerCase()] : void 0;
          }
          function V(e) {
            var t,
              n,
              r = {};
            for (n in e) u(e, n) && (t = J(n)) && (r[t] = e[n]);
            return r;
          }
          function B(e, t) {
            return function (n) {
              return null != n
                ? (q(this, e, n), r.updateOffset(this, t), this)
                : $(this, e);
            };
          }
          function $(e, t) {
            return e.isValid()
              ? e._d["get" + (e._isUTC ? "UTC" : "") + t]()
              : NaN;
          }
          function q(e, t, n) {
            e.isValid() && e._d["set" + (e._isUTC ? "UTC" : "") + t](n);
          }
          function K(e, t) {
            var n;
            if ("object" == typeof e) for (n in e) this.set(n, e[n]);
            else if (S(this[(e = J(e))])) return this[e](t);
            return this;
          }
          function X(e, t, n) {
            var r = "" + Math.abs(e),
              s = t - r.length;
            return (
              (e >= 0 ? (n ? "+" : "") : "-") +
              Math.pow(10, Math.max(0, s)).toString().substr(1) +
              r
            );
          }
          var Z =
              /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
            Q = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
            ee = {},
            te = {};
          function ne(e, t, n, r) {
            var s = r;
            "string" == typeof r &&
              (s = function () {
                return this[r]();
              }),
              e && (te[e] = s),
              t &&
                (te[t[0]] = function () {
                  return X(s.apply(this, arguments), t[1], t[2]);
                }),
              n &&
                (te[n] = function () {
                  return this.localeData().ordinal(s.apply(this, arguments), e);
                });
          }
          function re(e) {
            return e.match(/\[[\s\S]/)
              ? e.replace(/^\[|\]$/g, "")
              : e.replace(/\\/g, "");
          }
          function se(e) {
            var t,
              n,
              r = e.match(Z);
            for (t = 0, n = r.length; t < n; t++)
              te[r[t]] ? (r[t] = te[r[t]]) : (r[t] = re(r[t]));
            return function (s) {
              var a = "";
              for (t = 0; t < n; t++)
                a += r[t] instanceof Function ? r[t].call(s, e) : r[t];
              return a;
            };
          }
          function ae(e, t) {
            return e.isValid()
              ? ((t = ie(t, e.localeData())),
                (ee[t] = ee[t] || se(t)),
                ee[t](e))
              : e.localeData().invalidDate();
          }
          function ie(e, t) {
            var n = 5;
            function r(e) {
              return t.longDateFormat(e) || e;
            }
            for (Q.lastIndex = 0; n >= 0 && Q.test(e); )
              (e = e.replace(Q, r)), (Q.lastIndex = 0), (n -= 1);
            return e;
          }
          var oe = /\d/,
            ue = /\d\d/,
            de = /\d{3}/,
            le = /\d{4}/,
            ce = /[+-]?\d{6}/,
            _e = /\d\d?/,
            he = /\d\d\d\d?/,
            me = /\d\d\d\d\d\d?/,
            pe = /\d{1,3}/,
            fe = /\d{1,4}/,
            ye = /[+-]?\d{1,6}/,
            ge = /\d+/,
            Me = /[+-]?\d+/,
            Le = /Z|[+-]\d\d:?\d\d/gi,
            ve = /Z|[+-]\d\d(?::?\d\d)?/gi,
            Ye = /[+-]?\d+(\.\d{1,3})?/,
            be =
              /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
            ke = {};
          function we(e, t, n) {
            ke[e] = S(t)
              ? t
              : function (e, r) {
                  return e && n ? n : t;
                };
          }
          function De(e, t) {
            return u(ke, e) ? ke[e](t._strict, t._locale) : new RegExp(Te(e));
          }
          function Te(e) {
            return Se(
              e
                .replace("\\", "")
                .replace(
                  /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
                  function (e, t, n, r, s) {
                    return t || n || r || s;
                  }
                )
            );
          }
          function Se(e) {
            return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
          }
          var xe = {};
          function je(e, t) {
            var n,
              r = t;
            for (
              "string" == typeof e && (e = [e]),
                "number" == typeof t &&
                  (r = function (e, n) {
                    n[t] = Y(e);
                  }),
                n = 0;
              n < e.length;
              n++
            )
              xe[e[n]] = r;
          }
          function He(e, t) {
            je(e, function (e, n, r, s) {
              (r._w = r._w || {}), t(e, r._w, r, s);
            });
          }
          function Pe(e, t, n) {
            null != t && u(xe, e) && xe[e](t, n._a, n, e);
          }
          var Oe = 0,
            Ae = 1,
            Ee = 2,
            Ce = 3,
            Ne = 4,
            Fe = 5,
            We = 6,
            Re = 7,
            Ie = 8;
          function ze(e, t) {
            return new Date(Date.UTC(e, t + 1, 0)).getUTCDate();
          }
          ne("M", ["MM", 2], "Mo", function () {
            return this.month() + 1;
          }),
            ne("MMM", 0, 0, function (e) {
              return this.localeData().monthsShort(this, e);
            }),
            ne("MMMM", 0, 0, function (e) {
              return this.localeData().months(this, e);
            }),
            G("month", "M"),
            we("M", _e),
            we("MM", _e, ue),
            we("MMM", function (e, t) {
              return t.monthsShortRegex(e);
            }),
            we("MMMM", function (e, t) {
              return t.monthsRegex(e);
            }),
            je(["M", "MM"], function (e, t) {
              t[Ae] = Y(e) - 1;
            }),
            je(["MMM", "MMMM"], function (e, t, n, r) {
              var s = n._locale.monthsParse(e, r, n._strict);
              null != s ? (t[Ae] = s) : (_(n).invalidMonth = e);
            });
          var Ue = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,
            Ge =
              "January_February_March_April_May_June_July_August_September_October_November_December".split(
                "_"
              );
          function Je(e, t) {
            return a(this._months)
              ? this._months[e.month()]
              : this._months[Ue.test(t) ? "format" : "standalone"][e.month()];
          }
          var Ve = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
          function Be(e, t) {
            return a(this._monthsShort)
              ? this._monthsShort[e.month()]
              : this._monthsShort[Ue.test(t) ? "format" : "standalone"][
                  e.month()
                ];
          }
          function $e(e, t, n) {
            var r, s, a;
            for (
              this._monthsParse ||
                ((this._monthsParse = []),
                (this._longMonthsParse = []),
                (this._shortMonthsParse = [])),
                r = 0;
              r < 12;
              r++
            ) {
              if (
                ((s = l([2e3, r])),
                n &&
                  !this._longMonthsParse[r] &&
                  ((this._longMonthsParse[r] = new RegExp(
                    "^" + this.months(s, "").replace(".", "") + "$",
                    "i"
                  )),
                  (this._shortMonthsParse[r] = new RegExp(
                    "^" + this.monthsShort(s, "").replace(".", "") + "$",
                    "i"
                  ))),
                n ||
                  this._monthsParse[r] ||
                  ((a =
                    "^" + this.months(s, "") + "|^" + this.monthsShort(s, "")),
                  (this._monthsParse[r] = new RegExp(a.replace(".", ""), "i"))),
                n && "MMMM" === t && this._longMonthsParse[r].test(e))
              )
                return r;
              if (n && "MMM" === t && this._shortMonthsParse[r].test(e))
                return r;
              if (!n && this._monthsParse[r].test(e)) return r;
            }
          }
          function qe(e, t) {
            var n;
            if (!e.isValid()) return e;
            if ("string" == typeof t)
              if (/^\d+$/.test(t)) t = Y(t);
              else if ("number" != typeof (t = e.localeData().monthsParse(t)))
                return e;
            return (
              (n = Math.min(e.date(), ze(e.year(), t))),
              e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n),
              e
            );
          }
          function Ke(e) {
            return null != e
              ? (qe(this, e), r.updateOffset(this, !0), this)
              : $(this, "Month");
          }
          function Xe() {
            return ze(this.year(), this.month());
          }
          var Ze = be;
          function Qe(e) {
            return this._monthsParseExact
              ? (u(this, "_monthsRegex") || nt.call(this),
                e ? this._monthsShortStrictRegex : this._monthsShortRegex)
              : this._monthsShortStrictRegex && e
              ? this._monthsShortStrictRegex
              : this._monthsShortRegex;
          }
          var et = be;
          function tt(e) {
            return this._monthsParseExact
              ? (u(this, "_monthsRegex") || nt.call(this),
                e ? this._monthsStrictRegex : this._monthsRegex)
              : this._monthsStrictRegex && e
              ? this._monthsStrictRegex
              : this._monthsRegex;
          }
          function nt() {
            function e(e, t) {
              return t.length - e.length;
            }
            var t,
              n,
              r = [],
              s = [],
              a = [];
            for (t = 0; t < 12; t++)
              (n = l([2e3, t])),
                r.push(this.monthsShort(n, "")),
                s.push(this.months(n, "")),
                a.push(this.months(n, "")),
                a.push(this.monthsShort(n, ""));
            for (r.sort(e), s.sort(e), a.sort(e), t = 0; t < 12; t++)
              (r[t] = Se(r[t])), (s[t] = Se(s[t])), (a[t] = Se(a[t]));
            (this._monthsRegex = new RegExp("^(" + a.join("|") + ")", "i")),
              (this._monthsShortRegex = this._monthsRegex),
              (this._monthsStrictRegex = new RegExp(
                "^(" + s.join("|") + ")$",
                "i"
              )),
              (this._monthsShortStrictRegex = new RegExp(
                "^(" + r.join("|") + ")$",
                "i"
              ));
          }
          function rt(e) {
            var t,
              n = e._a;
            return (
              n &&
                -2 === _(e).overflow &&
                ((t =
                  n[Ae] < 0 || n[Ae] > 11
                    ? Ae
                    : n[Ee] < 1 || n[Ee] > ze(n[Oe], n[Ae])
                    ? Ee
                    : n[Ce] < 0 ||
                      n[Ce] > 24 ||
                      (24 === n[Ce] &&
                        (0 !== n[Ne] || 0 !== n[Fe] || 0 !== n[We]))
                    ? Ce
                    : n[Ne] < 0 || n[Ne] > 59
                    ? Ne
                    : n[Fe] < 0 || n[Fe] > 59
                    ? Fe
                    : n[We] < 0 || n[We] > 999
                    ? We
                    : -1),
                _(e)._overflowDayOfYear && (t < Oe || t > Ee) && (t = Ee),
                _(e)._overflowWeeks && -1 === t && (t = Re),
                _(e)._overflowWeekday && -1 === t && (t = Ie),
                (_(e).overflow = t)),
              e
            );
          }
          var st =
              /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
            at =
              /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
            it = /Z|[+-]\d\d(?::?\d\d)?/,
            ot = [
              ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
              ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
              ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
              ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
              ["YYYY-DDD", /\d{4}-\d{3}/],
              ["YYYY-MM", /\d{4}-\d\d/, !1],
              ["YYYYYYMMDD", /[+-]\d{10}/],
              ["YYYYMMDD", /\d{8}/],
              ["GGGG[W]WWE", /\d{4}W\d{3}/],
              ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
              ["YYYYDDD", /\d{7}/],
            ],
            ut = [
              ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
              ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
              ["HH:mm:ss", /\d\d:\d\d:\d\d/],
              ["HH:mm", /\d\d:\d\d/],
              ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
              ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
              ["HHmmss", /\d\d\d\d\d\d/],
              ["HHmm", /\d\d\d\d/],
              ["HH", /\d\d/],
            ],
            dt = /^\/?Date\((\-?\d+)/i;
          function lt(e) {
            var t,
              n,
              r,
              s,
              a,
              i,
              o = e._i,
              u = st.exec(o) || at.exec(o);
            if (u) {
              for (_(e).iso = !0, t = 0, n = ot.length; t < n; t++)
                if (ot[t][1].exec(u[1])) {
                  (s = ot[t][0]), (r = !1 !== ot[t][2]);
                  break;
                }
              if (null == s) return void (e._isValid = !1);
              if (u[3]) {
                for (t = 0, n = ut.length; t < n; t++)
                  if (ut[t][1].exec(u[3])) {
                    a = (u[2] || " ") + ut[t][0];
                    break;
                  }
                if (null == a) return void (e._isValid = !1);
              }
              if (!r && null != a) return void (e._isValid = !1);
              if (u[4]) {
                if (!it.exec(u[4])) return void (e._isValid = !1);
                i = "Z";
              }
              (e._f = s + (a || "") + (i || "")), Dt(e);
            } else e._isValid = !1;
          }
          function ct(e) {
            var t = dt.exec(e._i);
            null === t
              ? (lt(e),
                !1 === e._isValid &&
                  (delete e._isValid, r.createFromInputFallback(e)))
              : (e._d = new Date(+t[1]));
          }
          function _t(e, t, n, r, s, a, i) {
            var o = new Date(e, t, n, r, s, a, i);
            return (
              e < 100 &&
                e >= 0 &&
                isFinite(o.getFullYear()) &&
                o.setFullYear(e),
              o
            );
          }
          function ht(e) {
            var t = new Date(Date.UTC.apply(null, arguments));
            return (
              e < 100 &&
                e >= 0 &&
                isFinite(t.getUTCFullYear()) &&
                t.setUTCFullYear(e),
              t
            );
          }
          function mt(e) {
            return pt(e) ? 366 : 365;
          }
          function pt(e) {
            return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0;
          }
          (r.createFromInputFallback = w(
            "moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",
            function (e) {
              e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
            }
          )),
            ne("Y", 0, 0, function () {
              var e = this.year();
              return e <= 9999 ? "" + e : "+" + e;
            }),
            ne(0, ["YY", 2], 0, function () {
              return this.year() % 100;
            }),
            ne(0, ["YYYY", 4], 0, "year"),
            ne(0, ["YYYYY", 5], 0, "year"),
            ne(0, ["YYYYYY", 6, !0], 0, "year"),
            G("year", "y"),
            we("Y", Me),
            we("YY", _e, ue),
            we("YYYY", fe, le),
            we("YYYYY", ye, ce),
            we("YYYYYY", ye, ce),
            je(["YYYYY", "YYYYYY"], Oe),
            je("YYYY", function (e, t) {
              t[Oe] = 2 === e.length ? r.parseTwoDigitYear(e) : Y(e);
            }),
            je("YY", function (e, t) {
              t[Oe] = r.parseTwoDigitYear(e);
            }),
            je("Y", function (e, t) {
              t[Oe] = parseInt(e, 10);
            }),
            (r.parseTwoDigitYear = function (e) {
              return Y(e) + (Y(e) > 68 ? 1900 : 2e3);
            });
          var ft = B("FullYear", !1);
          function yt() {
            return pt(this.year());
          }
          function gt(e, t, n) {
            var r = 7 + t - n;
            return (-(7 + ht(e, 0, r).getUTCDay() - t) % 7) + r - 1;
          }
          function Mt(e, t, n, r, s) {
            var a,
              i,
              o = 1 + 7 * (t - 1) + ((7 + n - r) % 7) + gt(e, r, s);
            return (
              o <= 0
                ? (i = mt((a = e - 1)) + o)
                : o > mt(e)
                ? ((a = e + 1), (i = o - mt(e)))
                : ((a = e), (i = o)),
              { year: a, dayOfYear: i }
            );
          }
          function Lt(e, t, n) {
            var r,
              s,
              a = gt(e.year(), t, n),
              i = Math.floor((e.dayOfYear() - a - 1) / 7) + 1;
            return (
              i < 1
                ? (r = i + vt((s = e.year() - 1), t, n))
                : i > vt(e.year(), t, n)
                ? ((r = i - vt(e.year(), t, n)), (s = e.year() + 1))
                : ((s = e.year()), (r = i)),
              { week: r, year: s }
            );
          }
          function vt(e, t, n) {
            var r = gt(e, t, n),
              s = gt(e + 1, t, n);
            return (mt(e) - r + s) / 7;
          }
          function Yt(e, t, n) {
            return null != e ? e : null != t ? t : n;
          }
          function bt(e) {
            var t = new Date(r.now());
            return e._useUTC
              ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()]
              : [t.getFullYear(), t.getMonth(), t.getDate()];
          }
          function kt(e) {
            var t,
              n,
              r,
              s,
              a = [];
            if (!e._d) {
              for (
                r = bt(e),
                  e._w && null == e._a[Ee] && null == e._a[Ae] && wt(e),
                  e._dayOfYear &&
                    ((s = Yt(e._a[Oe], r[Oe])),
                    e._dayOfYear > mt(s) && (_(e)._overflowDayOfYear = !0),
                    (n = ht(s, 0, e._dayOfYear)),
                    (e._a[Ae] = n.getUTCMonth()),
                    (e._a[Ee] = n.getUTCDate())),
                  t = 0;
                t < 3 && null == e._a[t];
                ++t
              )
                e._a[t] = a[t] = r[t];
              for (; t < 7; t++)
                e._a[t] = a[t] = null == e._a[t] ? (2 === t ? 1 : 0) : e._a[t];
              24 === e._a[Ce] &&
                0 === e._a[Ne] &&
                0 === e._a[Fe] &&
                0 === e._a[We] &&
                ((e._nextDay = !0), (e._a[Ce] = 0)),
                (e._d = (e._useUTC ? ht : _t).apply(null, a)),
                null != e._tzm &&
                  e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
                e._nextDay && (e._a[Ce] = 24);
            }
          }
          function wt(e) {
            var t, n, r, s, a, i, o, u;
            null != (t = e._w).GG || null != t.W || null != t.E
              ? ((a = 1),
                (i = 4),
                (n = Yt(t.GG, e._a[Oe], Lt(At(), 1, 4).year)),
                (r = Yt(t.W, 1)),
                ((s = Yt(t.E, 1)) < 1 || s > 7) && (u = !0))
              : ((a = e._locale._week.dow),
                (i = e._locale._week.doy),
                (n = Yt(t.gg, e._a[Oe], Lt(At(), a, i).year)),
                (r = Yt(t.w, 1)),
                null != t.d
                  ? ((s = t.d) < 0 || s > 6) && (u = !0)
                  : null != t.e
                  ? ((s = t.e + a), (t.e < 0 || t.e > 6) && (u = !0))
                  : (s = a)),
              r < 1 || r > vt(n, a, i)
                ? (_(e)._overflowWeeks = !0)
                : null != u
                ? (_(e)._overflowWeekday = !0)
                : ((o = Mt(n, r, s, a, i)),
                  (e._a[Oe] = o.year),
                  (e._dayOfYear = o.dayOfYear));
          }
          function Dt(e) {
            if (e._f !== r.ISO_8601) {
              (e._a = []), (_(e).empty = !0);
              var t,
                n,
                s,
                a,
                i,
                o = "" + e._i,
                u = o.length,
                d = 0;
              for (
                s = ie(e._f, e._locale).match(Z) || [], t = 0;
                t < s.length;
                t++
              )
                (a = s[t]),
                  (n = (o.match(De(a, e)) || [])[0]) &&
                    ((i = o.substr(0, o.indexOf(n))).length > 0 &&
                      _(e).unusedInput.push(i),
                    (o = o.slice(o.indexOf(n) + n.length)),
                    (d += n.length)),
                  te[a]
                    ? (n ? (_(e).empty = !1) : _(e).unusedTokens.push(a),
                      Pe(a, n, e))
                    : e._strict && !n && _(e).unusedTokens.push(a);
              (_(e).charsLeftOver = u - d),
                o.length > 0 && _(e).unusedInput.push(o),
                !0 === _(e).bigHour &&
                  e._a[Ce] <= 12 &&
                  e._a[Ce] > 0 &&
                  (_(e).bigHour = void 0),
                (e._a[Ce] = Tt(e._locale, e._a[Ce], e._meridiem)),
                kt(e),
                rt(e);
            } else lt(e);
          }
          function Tt(e, t, n) {
            var r;
            return null == n
              ? t
              : null != e.meridiemHour
              ? e.meridiemHour(t, n)
              : null != e.isPM
              ? ((r = e.isPM(n)) && t < 12 && (t += 12),
                r || 12 !== t || (t = 0),
                t)
              : t;
          }
          function St(e) {
            var t, n, r, s, a;
            if (0 === e._f.length)
              return (_(e).invalidFormat = !0), void (e._d = new Date(NaN));
            for (s = 0; s < e._f.length; s++)
              (a = 0),
                (t = y({}, e)),
                null != e._useUTC && (t._useUTC = e._useUTC),
                (t._f = e._f[s]),
                Dt(t),
                h(t) &&
                  ((a += _(t).charsLeftOver),
                  (a += 10 * _(t).unusedTokens.length),
                  (_(t).score = a),
                  (null == r || a < r) && ((r = a), (n = t)));
            d(e, n || t);
          }
          function xt(e) {
            if (!e._d) {
              var t = V(e._i);
              (e._a = o(
                [
                  t.year,
                  t.month,
                  t.day || t.date,
                  t.hour,
                  t.minute,
                  t.second,
                  t.millisecond,
                ],
                function (e) {
                  return e && parseInt(e, 10);
                }
              )),
                kt(e);
            }
          }
          function jt(e) {
            var t = new M(rt(Ht(e)));
            return t._nextDay && (t.add(1, "d"), (t._nextDay = void 0)), t;
          }
          function Ht(e) {
            var t = e._i,
              n = e._f;
            return (
              (e._locale = e._locale || I(e._l)),
              null === t || (void 0 === n && "" === t)
                ? m({ nullInput: !0 })
                : ("string" == typeof t && (e._i = t = e._locale.preparse(t)),
                  L(t)
                    ? new M(rt(t))
                    : (a(n) ? St(e) : n ? Dt(e) : i(t) ? (e._d = t) : Pt(e),
                      h(e) || (e._d = null),
                      e))
            );
          }
          function Pt(e) {
            var t = e._i;
            void 0 === t
              ? (e._d = new Date(r.now()))
              : i(t)
              ? (e._d = new Date(+t))
              : "string" == typeof t
              ? ct(e)
              : a(t)
              ? ((e._a = o(t.slice(0), function (e) {
                  return parseInt(e, 10);
                })),
                kt(e))
              : "object" == typeof t
              ? xt(e)
              : "number" == typeof t
              ? (e._d = new Date(t))
              : r.createFromInputFallback(e);
          }
          function Ot(e, t, n, r, s) {
            var a = {};
            return (
              "boolean" == typeof n && ((r = n), (n = void 0)),
              (a._isAMomentObject = !0),
              (a._useUTC = a._isUTC = s),
              (a._l = n),
              (a._i = e),
              (a._f = t),
              (a._strict = r),
              jt(a)
            );
          }
          function At(e, t, n, r) {
            return Ot(e, t, n, r, !1);
          }
          r.ISO_8601 = function () {};
          var Et = w(
              "moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",
              function () {
                var e = At.apply(null, arguments);
                return this.isValid() && e.isValid()
                  ? e < this
                    ? this
                    : e
                  : m();
              }
            ),
            Ct = w(
              "moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",
              function () {
                var e = At.apply(null, arguments);
                return this.isValid() && e.isValid()
                  ? e > this
                    ? this
                    : e
                  : m();
              }
            );
          function Nt(e, t) {
            var n, r;
            if ((1 === t.length && a(t[0]) && (t = t[0]), !t.length))
              return At();
            for (n = t[0], r = 1; r < t.length; ++r)
              (t[r].isValid() && !t[r][e](n)) || (n = t[r]);
            return n;
          }
          function Ft() {
            return Nt("isBefore", [].slice.call(arguments, 0));
          }
          function Wt() {
            return Nt("isAfter", [].slice.call(arguments, 0));
          }
          var Rt = function () {
            return Date.now ? Date.now() : +new Date();
          };
          function It(e) {
            var t = V(e),
              n = t.year || 0,
              r = t.quarter || 0,
              s = t.month || 0,
              a = t.week || 0,
              i = t.day || 0,
              o = t.hour || 0,
              u = t.minute || 0,
              d = t.second || 0,
              l = t.millisecond || 0;
            (this._milliseconds = +l + 1e3 * d + 6e4 * u + 36e5 * o),
              (this._days = +i + 7 * a),
              (this._months = +s + 3 * r + 12 * n),
              (this._data = {}),
              (this._locale = I()),
              this._bubble();
          }
          function zt(e) {
            return e instanceof It;
          }
          function Ut(e, t) {
            ne(e, 0, 0, function () {
              var e = this.utcOffset(),
                n = "+";
              return (
                e < 0 && ((e = -e), (n = "-")),
                n + X(~~(e / 60), 2) + t + X(~~e % 60, 2)
              );
            });
          }
          Ut("Z", ":"),
            Ut("ZZ", ""),
            we("Z", ve),
            we("ZZ", ve),
            je(["Z", "ZZ"], function (e, t, n) {
              (n._useUTC = !0), (n._tzm = Jt(ve, e));
            });
          var Gt = /([\+\-]|\d\d)/gi;
          function Jt(e, t) {
            var n = (t || "").match(e) || [],
              r = ((n[n.length - 1] || []) + "").match(Gt) || ["-", 0, 0],
              s = 60 * r[1] + Y(r[2]);
            return "+" === r[0] ? s : -s;
          }
          function Vt(e, t) {
            var n, s;
            return t._isUTC
              ? ((n = t.clone()),
                (s = (L(e) || i(e) ? +e : +At(e)) - +n),
                n._d.setTime(+n._d + s),
                r.updateOffset(n, !1),
                n)
              : At(e).local();
          }
          function Bt(e) {
            return 15 * -Math.round(e._d.getTimezoneOffset() / 15);
          }
          function $t(e, t) {
            var n,
              s = this._offset || 0;
            return this.isValid()
              ? null != e
                ? ("string" == typeof e
                    ? (e = Jt(ve, e))
                    : Math.abs(e) < 16 && (e *= 60),
                  !this._isUTC && t && (n = Bt(this)),
                  (this._offset = e),
                  (this._isUTC = !0),
                  null != n && this.add(n, "m"),
                  s !== e &&
                    (!t || this._changeInProgress
                      ? mn(this, un(e - s, "m"), 1, !1)
                      : this._changeInProgress ||
                        ((this._changeInProgress = !0),
                        r.updateOffset(this, !0),
                        (this._changeInProgress = null))),
                  this)
                : this._isUTC
                ? s
                : Bt(this)
              : null != e
              ? this
              : NaN;
          }
          function qt(e, t) {
            return null != e
              ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this)
              : -this.utcOffset();
          }
          function Kt(e) {
            return this.utcOffset(0, e);
          }
          function Xt(e) {
            return (
              this._isUTC &&
                (this.utcOffset(0, e),
                (this._isUTC = !1),
                e && this.subtract(Bt(this), "m")),
              this
            );
          }
          function Zt() {
            return (
              this._tzm
                ? this.utcOffset(this._tzm)
                : "string" == typeof this._i && this.utcOffset(Jt(Le, this._i)),
              this
            );
          }
          function Qt(e) {
            return (
              !!this.isValid() &&
              ((e = e ? At(e).utcOffset() : 0),
              (this.utcOffset() - e) % 60 == 0)
            );
          }
          function en() {
            return (
              this.utcOffset() > this.clone().month(0).utcOffset() ||
              this.utcOffset() > this.clone().month(5).utcOffset()
            );
          }
          function tn() {
            if (!p(this._isDSTShifted)) return this._isDSTShifted;
            var e = {};
            if ((y(e, this), (e = Ht(e))._a)) {
              var t = e._isUTC ? l(e._a) : At(e._a);
              this._isDSTShifted = this.isValid() && b(e._a, t.toArray()) > 0;
            } else this._isDSTShifted = !1;
            return this._isDSTShifted;
          }
          function nn() {
            return !!this.isValid() && !this._isUTC;
          }
          function rn() {
            return !!this.isValid() && this._isUTC;
          }
          function sn() {
            return !!this.isValid() && this._isUTC && 0 === this._offset;
          }
          r.updateOffset = function () {};
          var an =
              /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,
            on =
              /^(-)?P(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)W)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?$/;
          function un(e, t) {
            var n,
              r,
              s,
              a = e,
              i = null;
            return (
              zt(e)
                ? (a = { ms: e._milliseconds, d: e._days, M: e._months })
                : "number" == typeof e
                ? ((a = {}), t ? (a[t] = e) : (a.milliseconds = e))
                : (i = an.exec(e))
                ? ((n = "-" === i[1] ? -1 : 1),
                  (a = {
                    y: 0,
                    d: Y(i[Ee]) * n,
                    h: Y(i[Ce]) * n,
                    m: Y(i[Ne]) * n,
                    s: Y(i[Fe]) * n,
                    ms: Y(i[We]) * n,
                  }))
                : (i = on.exec(e))
                ? ((n = "-" === i[1] ? -1 : 1),
                  (a = {
                    y: dn(i[2], n),
                    M: dn(i[3], n),
                    w: dn(i[4], n),
                    d: dn(i[5], n),
                    h: dn(i[6], n),
                    m: dn(i[7], n),
                    s: dn(i[8], n),
                  }))
                : null == a
                ? (a = {})
                : "object" == typeof a &&
                  ("from" in a || "to" in a) &&
                  ((s = cn(At(a.from), At(a.to))),
                  ((a = {}).ms = s.milliseconds),
                  (a.M = s.months)),
              (r = new It(a)),
              zt(e) && u(e, "_locale") && (r._locale = e._locale),
              r
            );
          }
          function dn(e, t) {
            var n = e && parseFloat(e.replace(",", "."));
            return (isNaN(n) ? 0 : n) * t;
          }
          function ln(e, t) {
            var n = { milliseconds: 0, months: 0 };
            return (
              (n.months = t.month() - e.month() + 12 * (t.year() - e.year())),
              e.clone().add(n.months, "M").isAfter(t) && --n.months,
              (n.milliseconds = +t - +e.clone().add(n.months, "M")),
              n
            );
          }
          function cn(e, t) {
            var n;
            return e.isValid() && t.isValid()
              ? ((t = Vt(t, e)),
                e.isBefore(t)
                  ? (n = ln(e, t))
                  : (((n = ln(t, e)).milliseconds = -n.milliseconds),
                    (n.months = -n.months)),
                n)
              : { milliseconds: 0, months: 0 };
          }
          function _n(e) {
            return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e);
          }
          function hn(e, t) {
            return function (n, r) {
              var s;
              return (
                null === r ||
                  isNaN(+r) ||
                  (T(
                    t,
                    "moment()." +
                      t +
                      "(period, number) is deprecated. Please use moment()." +
                      t +
                      "(number, period)."
                  ),
                  (s = n),
                  (n = r),
                  (r = s)),
                mn(this, un((n = "string" == typeof n ? +n : n), r), e),
                this
              );
            };
          }
          function mn(e, t, n, s) {
            var a = t._milliseconds,
              i = _n(t._days),
              o = _n(t._months);
            e.isValid() &&
              ((s = null == s || s),
              a && e._d.setTime(+e._d + a * n),
              i && q(e, "Date", $(e, "Date") + i * n),
              o && qe(e, $(e, "Month") + o * n),
              s && r.updateOffset(e, i || o));
          }
          un.fn = It.prototype;
          var pn = hn(1, "add"),
            fn = hn(-1, "subtract");
          function yn(e, t) {
            var n = e || At(),
              r = Vt(n, this).startOf("day"),
              s = this.diff(r, "days", !0),
              a =
                s < -6
                  ? "sameElse"
                  : s < -1
                  ? "lastWeek"
                  : s < 0
                  ? "lastDay"
                  : s < 1
                  ? "sameDay"
                  : s < 2
                  ? "nextDay"
                  : s < 7
                  ? "nextWeek"
                  : "sameElse",
              i = t && (S(t[a]) ? t[a]() : t[a]);
            return this.format(i || this.localeData().calendar(a, this, At(n)));
          }
          function gn() {
            return new M(this);
          }
          function Mn(e, t) {
            var n = L(e) ? e : At(e);
            return (
              !(!this.isValid() || !n.isValid()) &&
              ("millisecond" === (t = J(p(t) ? "millisecond" : t))
                ? +this > +n
                : +n < +this.clone().startOf(t))
            );
          }
          function Ln(e, t) {
            var n = L(e) ? e : At(e);
            return (
              !(!this.isValid() || !n.isValid()) &&
              ("millisecond" === (t = J(p(t) ? "millisecond" : t))
                ? +this < +n
                : +this.clone().endOf(t) < +n)
            );
          }
          function vn(e, t, n) {
            return this.isAfter(e, n) && this.isBefore(t, n);
          }
          function Yn(e, t) {
            var n,
              r = L(e) ? e : At(e);
            return (
              !(!this.isValid() || !r.isValid()) &&
              ("millisecond" === (t = J(t || "millisecond"))
                ? +this == +r
                : ((n = +r),
                  +this.clone().startOf(t) <= n && n <= +this.clone().endOf(t)))
            );
          }
          function bn(e, t) {
            return this.isSame(e, t) || this.isAfter(e, t);
          }
          function kn(e, t) {
            return this.isSame(e, t) || this.isBefore(e, t);
          }
          function wn(e, t, n) {
            var r, s, a, i;
            return this.isValid() && (r = Vt(e, this)).isValid()
              ? ((s = 6e4 * (r.utcOffset() - this.utcOffset())),
                "year" === (t = J(t)) || "month" === t || "quarter" === t
                  ? ((i = Dn(this, r)),
                    "quarter" === t ? (i /= 3) : "year" === t && (i /= 12))
                  : ((a = this - r),
                    (i =
                      "second" === t
                        ? a / 1e3
                        : "minute" === t
                        ? a / 6e4
                        : "hour" === t
                        ? a / 36e5
                        : "day" === t
                        ? (a - s) / 864e5
                        : "week" === t
                        ? (a - s) / 6048e5
                        : a)),
                n ? i : v(i))
              : NaN;
          }
          function Dn(e, t) {
            var n = 12 * (t.year() - e.year()) + (t.month() - e.month()),
              r = e.clone().add(n, "months");
            return -(
              n +
              (t - r < 0
                ? (t - r) / (r - e.clone().add(n - 1, "months"))
                : (t - r) / (e.clone().add(n + 1, "months") - r))
            );
          }
          function Tn() {
            return this.clone()
              .locale("en")
              .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
          }
          function Sn() {
            var e = this.clone().utc();
            return 0 < e.year() && e.year() <= 9999
              ? S(Date.prototype.toISOString)
                ? this.toDate().toISOString()
                : ae(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
              : ae(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
          }
          function xn(e) {
            var t = ae(this, e || r.defaultFormat);
            return this.localeData().postformat(t);
          }
          function jn(e, t) {
            return this.isValid() && ((L(e) && e.isValid()) || At(e).isValid())
              ? un({ to: this, from: e }).locale(this.locale()).humanize(!t)
              : this.localeData().invalidDate();
          }
          function Hn(e) {
            return this.from(At(), e);
          }
          function Pn(e, t) {
            return this.isValid() && ((L(e) && e.isValid()) || At(e).isValid())
              ? un({ from: this, to: e }).locale(this.locale()).humanize(!t)
              : this.localeData().invalidDate();
          }
          function On(e) {
            return this.to(At(), e);
          }
          function An(e) {
            var t;
            return void 0 === e
              ? this._locale._abbr
              : (null != (t = I(e)) && (this._locale = t), this);
          }
          r.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
          var En = w(
            "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
            function (e) {
              return void 0 === e ? this.localeData() : this.locale(e);
            }
          );
          function Cn() {
            return this._locale;
          }
          function Nn(e) {
            switch ((e = J(e))) {
              case "year":
                this.month(0);
              case "quarter":
              case "month":
                this.date(1);
              case "week":
              case "isoWeek":
              case "day":
                this.hours(0);
              case "hour":
                this.minutes(0);
              case "minute":
                this.seconds(0);
              case "second":
                this.milliseconds(0);
            }
            return (
              "week" === e && this.weekday(0),
              "isoWeek" === e && this.isoWeekday(1),
              "quarter" === e && this.month(3 * Math.floor(this.month() / 3)),
              this
            );
          }
          function Fn(e) {
            return void 0 === (e = J(e)) || "millisecond" === e
              ? this
              : this.startOf(e)
                  .add(1, "isoWeek" === e ? "week" : e)
                  .subtract(1, "ms");
          }
          function Wn() {
            return +this._d - 6e4 * (this._offset || 0);
          }
          function Rn() {
            return Math.floor(+this / 1e3);
          }
          function In() {
            return this._offset ? new Date(+this) : this._d;
          }
          function zn() {
            var e = this;
            return [
              e.year(),
              e.month(),
              e.date(),
              e.hour(),
              e.minute(),
              e.second(),
              e.millisecond(),
            ];
          }
          function Un() {
            var e = this;
            return {
              years: e.year(),
              months: e.month(),
              date: e.date(),
              hours: e.hours(),
              minutes: e.minutes(),
              seconds: e.seconds(),
              milliseconds: e.milliseconds(),
            };
          }
          function Gn() {
            return this.isValid() ? this.toISOString() : null;
          }
          function Jn() {
            return h(this);
          }
          function Vn() {
            return d({}, _(this));
          }
          function Bn() {
            return _(this).overflow;
          }
          function $n() {
            return {
              input: this._i,
              format: this._f,
              locale: this._locale,
              isUTC: this._isUTC,
              strict: this._strict,
            };
          }
          function qn(e, t) {
            ne(0, [e, e.length], 0, t);
          }
          function Kn(e) {
            return er.call(
              this,
              e,
              this.week(),
              this.weekday(),
              this.localeData()._week.dow,
              this.localeData()._week.doy
            );
          }
          function Xn(e) {
            return er.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
          }
          function Zn() {
            return vt(this.year(), 1, 4);
          }
          function Qn() {
            var e = this.localeData()._week;
            return vt(this.year(), e.dow, e.doy);
          }
          function er(e, t, n, r, s) {
            var a;
            return null == e
              ? Lt(this, r, s).year
              : (t > (a = vt(e, r, s)) && (t = a),
                tr.call(this, e, t, n, r, s));
          }
          function tr(e, t, n, r, s) {
            var a = Mt(e, t, n, r, s),
              i = ht(a.year, 0, a.dayOfYear);
            return (
              this.year(i.getUTCFullYear()),
              this.month(i.getUTCMonth()),
              this.date(i.getUTCDate()),
              this
            );
          }
          function nr(e) {
            return null == e
              ? Math.ceil((this.month() + 1) / 3)
              : this.month(3 * (e - 1) + (this.month() % 3));
          }
          function rr(e) {
            return Lt(e, this._week.dow, this._week.doy).week;
          }
          ne(0, ["gg", 2], 0, function () {
            return this.weekYear() % 100;
          }),
            ne(0, ["GG", 2], 0, function () {
              return this.isoWeekYear() % 100;
            }),
            qn("gggg", "weekYear"),
            qn("ggggg", "weekYear"),
            qn("GGGG", "isoWeekYear"),
            qn("GGGGG", "isoWeekYear"),
            G("weekYear", "gg"),
            G("isoWeekYear", "GG"),
            we("G", Me),
            we("g", Me),
            we("GG", _e, ue),
            we("gg", _e, ue),
            we("GGGG", fe, le),
            we("gggg", fe, le),
            we("GGGGG", ye, ce),
            we("ggggg", ye, ce),
            He(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, n, r) {
              t[r.substr(0, 2)] = Y(e);
            }),
            He(["gg", "GG"], function (e, t, n, s) {
              t[s] = r.parseTwoDigitYear(e);
            }),
            ne("Q", 0, "Qo", "quarter"),
            G("quarter", "Q"),
            we("Q", oe),
            je("Q", function (e, t) {
              t[Ae] = 3 * (Y(e) - 1);
            }),
            ne("w", ["ww", 2], "wo", "week"),
            ne("W", ["WW", 2], "Wo", "isoWeek"),
            G("week", "w"),
            G("isoWeek", "W"),
            we("w", _e),
            we("ww", _e, ue),
            we("W", _e),
            we("WW", _e, ue),
            He(["w", "ww", "W", "WW"], function (e, t, n, r) {
              t[r.substr(0, 1)] = Y(e);
            });
          var sr = { dow: 0, doy: 6 };
          function ar() {
            return this._week.dow;
          }
          function ir() {
            return this._week.doy;
          }
          function or(e) {
            var t = this.localeData().week(this);
            return null == e ? t : this.add(7 * (e - t), "d");
          }
          function ur(e) {
            var t = Lt(this, 1, 4).week;
            return null == e ? t : this.add(7 * (e - t), "d");
          }
          ne("D", ["DD", 2], "Do", "date"),
            G("date", "D"),
            we("D", _e),
            we("DD", _e, ue),
            we("Do", function (e, t) {
              return e ? t._ordinalParse : t._ordinalParseLenient;
            }),
            je(["D", "DD"], Ee),
            je("Do", function (e, t) {
              t[Ee] = Y(e.match(_e)[0], 10);
            });
          var dr = B("Date", !0);
          function lr(e, t) {
            return "string" != typeof e
              ? e
              : isNaN(e)
              ? "number" == typeof (e = t.weekdaysParse(e))
                ? e
                : null
              : parseInt(e, 10);
          }
          ne("d", 0, "do", "day"),
            ne("dd", 0, 0, function (e) {
              return this.localeData().weekdaysMin(this, e);
            }),
            ne("ddd", 0, 0, function (e) {
              return this.localeData().weekdaysShort(this, e);
            }),
            ne("dddd", 0, 0, function (e) {
              return this.localeData().weekdays(this, e);
            }),
            ne("e", 0, 0, "weekday"),
            ne("E", 0, 0, "isoWeekday"),
            G("day", "d"),
            G("weekday", "e"),
            G("isoWeekday", "E"),
            we("d", _e),
            we("e", _e),
            we("E", _e),
            we("dd", be),
            we("ddd", be),
            we("dddd", be),
            He(["dd", "ddd", "dddd"], function (e, t, n, r) {
              var s = n._locale.weekdaysParse(e, r, n._strict);
              null != s ? (t.d = s) : (_(n).invalidWeekday = e);
            }),
            He(["d", "e", "E"], function (e, t, n, r) {
              t[r] = Y(e);
            });
          var cr =
            "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
              "_"
            );
          function _r(e, t) {
            return a(this._weekdays)
              ? this._weekdays[e.day()]
              : this._weekdays[
                  this._weekdays.isFormat.test(t) ? "format" : "standalone"
                ][e.day()];
          }
          var hr = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
          function mr(e) {
            return this._weekdaysShort[e.day()];
          }
          var pr = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
          function fr(e) {
            return this._weekdaysMin[e.day()];
          }
          function yr(e, t, n) {
            var r, s, a;
            for (
              this._weekdaysParse ||
                ((this._weekdaysParse = []),
                (this._minWeekdaysParse = []),
                (this._shortWeekdaysParse = []),
                (this._fullWeekdaysParse = [])),
                r = 0;
              r < 7;
              r++
            ) {
              if (
                ((s = At([2e3, 1]).day(r)),
                n &&
                  !this._fullWeekdaysParse[r] &&
                  ((this._fullWeekdaysParse[r] = new RegExp(
                    "^" + this.weekdays(s, "").replace(".", ".?") + "$",
                    "i"
                  )),
                  (this._shortWeekdaysParse[r] = new RegExp(
                    "^" + this.weekdaysShort(s, "").replace(".", ".?") + "$",
                    "i"
                  )),
                  (this._minWeekdaysParse[r] = new RegExp(
                    "^" + this.weekdaysMin(s, "").replace(".", ".?") + "$",
                    "i"
                  ))),
                this._weekdaysParse[r] ||
                  ((a =
                    "^" +
                    this.weekdays(s, "") +
                    "|^" +
                    this.weekdaysShort(s, "") +
                    "|^" +
                    this.weekdaysMin(s, "")),
                  (this._weekdaysParse[r] = new RegExp(
                    a.replace(".", ""),
                    "i"
                  ))),
                n && "dddd" === t && this._fullWeekdaysParse[r].test(e))
              )
                return r;
              if (n && "ddd" === t && this._shortWeekdaysParse[r].test(e))
                return r;
              if (n && "dd" === t && this._minWeekdaysParse[r].test(e))
                return r;
              if (!n && this._weekdaysParse[r].test(e)) return r;
            }
          }
          function gr(e) {
            if (!this.isValid()) return null != e ? this : NaN;
            var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != e
              ? ((e = lr(e, this.localeData())), this.add(e - t, "d"))
              : t;
          }
          function Mr(e) {
            if (!this.isValid()) return null != e ? this : NaN;
            var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null == e ? t : this.add(e - t, "d");
          }
          function Lr(e) {
            return this.isValid()
              ? null == e
                ? this.day() || 7
                : this.day(this.day() % 7 ? e : e - 7)
              : null != e
              ? this
              : NaN;
          }
          function vr(e) {
            var t =
              Math.round(
                (this.clone().startOf("day") - this.clone().startOf("year")) /
                  864e5
              ) + 1;
            return null == e ? t : this.add(e - t, "d");
          }
          function Yr() {
            return this.hours() % 12 || 12;
          }
          function br(e, t) {
            ne(e, 0, 0, function () {
              return this.localeData().meridiem(
                this.hours(),
                this.minutes(),
                t
              );
            });
          }
          function kr(e, t) {
            return t._meridiemParse;
          }
          function wr(e) {
            return "p" === (e + "").toLowerCase().charAt(0);
          }
          ne("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
            G("dayOfYear", "DDD"),
            we("DDD", pe),
            we("DDDD", de),
            je(["DDD", "DDDD"], function (e, t, n) {
              n._dayOfYear = Y(e);
            }),
            ne("H", ["HH", 2], 0, "hour"),
            ne("h", ["hh", 2], 0, Yr),
            ne("hmm", 0, 0, function () {
              return "" + Yr.apply(this) + X(this.minutes(), 2);
            }),
            ne("hmmss", 0, 0, function () {
              return (
                "" +
                Yr.apply(this) +
                X(this.minutes(), 2) +
                X(this.seconds(), 2)
              );
            }),
            ne("Hmm", 0, 0, function () {
              return "" + this.hours() + X(this.minutes(), 2);
            }),
            ne("Hmmss", 0, 0, function () {
              return (
                "" + this.hours() + X(this.minutes(), 2) + X(this.seconds(), 2)
              );
            }),
            br("a", !0),
            br("A", !1),
            G("hour", "h"),
            we("a", kr),
            we("A", kr),
            we("H", _e),
            we("h", _e),
            we("HH", _e, ue),
            we("hh", _e, ue),
            we("hmm", he),
            we("hmmss", me),
            we("Hmm", he),
            we("Hmmss", me),
            je(["H", "HH"], Ce),
            je(["a", "A"], function (e, t, n) {
              (n._isPm = n._locale.isPM(e)), (n._meridiem = e);
            }),
            je(["h", "hh"], function (e, t, n) {
              (t[Ce] = Y(e)), (_(n).bigHour = !0);
            }),
            je("hmm", function (e, t, n) {
              var r = e.length - 2;
              (t[Ce] = Y(e.substr(0, r))),
                (t[Ne] = Y(e.substr(r))),
                (_(n).bigHour = !0);
            }),
            je("hmmss", function (e, t, n) {
              var r = e.length - 4,
                s = e.length - 2;
              (t[Ce] = Y(e.substr(0, r))),
                (t[Ne] = Y(e.substr(r, 2))),
                (t[Fe] = Y(e.substr(s))),
                (_(n).bigHour = !0);
            }),
            je("Hmm", function (e, t, n) {
              var r = e.length - 2;
              (t[Ce] = Y(e.substr(0, r))), (t[Ne] = Y(e.substr(r)));
            }),
            je("Hmmss", function (e, t, n) {
              var r = e.length - 4,
                s = e.length - 2;
              (t[Ce] = Y(e.substr(0, r))),
                (t[Ne] = Y(e.substr(r, 2))),
                (t[Fe] = Y(e.substr(s)));
            });
          var Dr = /[ap]\.?m?\.?/i;
          function Tr(e, t, n) {
            return e > 11 ? (n ? "pm" : "PM") : n ? "am" : "AM";
          }
          var Sr = B("Hours", !0);
          ne("m", ["mm", 2], 0, "minute"),
            G("minute", "m"),
            we("m", _e),
            we("mm", _e, ue),
            je(["m", "mm"], Ne);
          var xr = B("Minutes", !1);
          ne("s", ["ss", 2], 0, "second"),
            G("second", "s"),
            we("s", _e),
            we("ss", _e, ue),
            je(["s", "ss"], Fe);
          var jr,
            Hr = B("Seconds", !1);
          for (
            ne("S", 0, 0, function () {
              return ~~(this.millisecond() / 100);
            }),
              ne(0, ["SS", 2], 0, function () {
                return ~~(this.millisecond() / 10);
              }),
              ne(0, ["SSS", 3], 0, "millisecond"),
              ne(0, ["SSSS", 4], 0, function () {
                return 10 * this.millisecond();
              }),
              ne(0, ["SSSSS", 5], 0, function () {
                return 100 * this.millisecond();
              }),
              ne(0, ["SSSSSS", 6], 0, function () {
                return 1e3 * this.millisecond();
              }),
              ne(0, ["SSSSSSS", 7], 0, function () {
                return 1e4 * this.millisecond();
              }),
              ne(0, ["SSSSSSSS", 8], 0, function () {
                return 1e5 * this.millisecond();
              }),
              ne(0, ["SSSSSSSSS", 9], 0, function () {
                return 1e6 * this.millisecond();
              }),
              G("millisecond", "ms"),
              we("S", pe, oe),
              we("SS", pe, ue),
              we("SSS", pe, de),
              jr = "SSSS";
            jr.length <= 9;
            jr += "S"
          )
            we(jr, ge);
          function Pr(e, t) {
            t[We] = Y(1e3 * ("0." + e));
          }
          for (jr = "S"; jr.length <= 9; jr += "S") je(jr, Pr);
          var Or = B("Milliseconds", !1);
          function Ar() {
            return this._isUTC ? "UTC" : "";
          }
          function Er() {
            return this._isUTC ? "Coordinated Universal Time" : "";
          }
          ne("z", 0, 0, "zoneAbbr"), ne("zz", 0, 0, "zoneName");
          var Cr = M.prototype;
          (Cr.add = pn),
            (Cr.calendar = yn),
            (Cr.clone = gn),
            (Cr.diff = wn),
            (Cr.endOf = Fn),
            (Cr.format = xn),
            (Cr.from = jn),
            (Cr.fromNow = Hn),
            (Cr.to = Pn),
            (Cr.toNow = On),
            (Cr.get = K),
            (Cr.invalidAt = Bn),
            (Cr.isAfter = Mn),
            (Cr.isBefore = Ln),
            (Cr.isBetween = vn),
            (Cr.isSame = Yn),
            (Cr.isSameOrAfter = bn),
            (Cr.isSameOrBefore = kn),
            (Cr.isValid = Jn),
            (Cr.lang = En),
            (Cr.locale = An),
            (Cr.localeData = Cn),
            (Cr.max = Ct),
            (Cr.min = Et),
            (Cr.parsingFlags = Vn),
            (Cr.set = K),
            (Cr.startOf = Nn),
            (Cr.subtract = fn),
            (Cr.toArray = zn),
            (Cr.toObject = Un),
            (Cr.toDate = In),
            (Cr.toISOString = Sn),
            (Cr.toJSON = Gn),
            (Cr.toString = Tn),
            (Cr.unix = Rn),
            (Cr.valueOf = Wn),
            (Cr.creationData = $n),
            (Cr.year = ft),
            (Cr.isLeapYear = yt),
            (Cr.weekYear = Kn),
            (Cr.isoWeekYear = Xn),
            (Cr.quarter = Cr.quarters = nr),
            (Cr.month = Ke),
            (Cr.daysInMonth = Xe),
            (Cr.week = Cr.weeks = or),
            (Cr.isoWeek = Cr.isoWeeks = ur),
            (Cr.weeksInYear = Qn),
            (Cr.isoWeeksInYear = Zn),
            (Cr.date = dr),
            (Cr.day = Cr.days = gr),
            (Cr.weekday = Mr),
            (Cr.isoWeekday = Lr),
            (Cr.dayOfYear = vr),
            (Cr.hour = Cr.hours = Sr),
            (Cr.minute = Cr.minutes = xr),
            (Cr.second = Cr.seconds = Hr),
            (Cr.millisecond = Cr.milliseconds = Or),
            (Cr.utcOffset = $t),
            (Cr.utc = Kt),
            (Cr.local = Xt),
            (Cr.parseZone = Zt),
            (Cr.hasAlignedHourOffset = Qt),
            (Cr.isDST = en),
            (Cr.isDSTShifted = tn),
            (Cr.isLocal = nn),
            (Cr.isUtcOffset = rn),
            (Cr.isUtc = sn),
            (Cr.isUTC = sn),
            (Cr.zoneAbbr = Ar),
            (Cr.zoneName = Er),
            (Cr.dates = w(
              "dates accessor is deprecated. Use date instead.",
              dr
            )),
            (Cr.months = w(
              "months accessor is deprecated. Use month instead",
              Ke
            )),
            (Cr.years = w(
              "years accessor is deprecated. Use year instead",
              ft
            )),
            (Cr.zone = w(
              "moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",
              qt
            ));
          var Nr = Cr;
          function Fr(e) {
            return At(1e3 * e);
          }
          function Wr() {
            return At.apply(null, arguments).parseZone();
          }
          var Rr = {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L",
          };
          function Ir(e, t, n) {
            var r = this._calendar[e];
            return S(r) ? r.call(t, n) : r;
          }
          var zr = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A",
          };
          function Ur(e) {
            var t = this._longDateFormat[e],
              n = this._longDateFormat[e.toUpperCase()];
            return t || !n
              ? t
              : ((this._longDateFormat[e] = n.replace(
                  /MMMM|MM|DD|dddd/g,
                  function (e) {
                    return e.slice(1);
                  }
                )),
                this._longDateFormat[e]);
          }
          var Gr = "Invalid date";
          function Jr() {
            return this._invalidDate;
          }
          var Vr = "%d",
            Br = /\d{1,2}/;
          function $r(e) {
            return this._ordinal.replace("%d", e);
          }
          function qr(e) {
            return e;
          }
          var Kr = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years",
          };
          function Xr(e, t, n, r) {
            var s = this._relativeTime[n];
            return S(s) ? s(e, t, n, r) : s.replace(/%d/i, e);
          }
          function Zr(e, t) {
            var n = this._relativeTime[e > 0 ? "future" : "past"];
            return S(n) ? n(t) : n.replace(/%s/i, t);
          }
          var Qr = P.prototype;
          function es(e, t, n, r) {
            var s = I(),
              a = l().set(r, t);
            return s[n](a, e);
          }
          function ts(e, t, n, r, s) {
            if (
              ("number" == typeof e && ((t = e), (e = void 0)),
              (e = e || ""),
              null != t)
            )
              return es(e, t, n, s);
            var a,
              i = [];
            for (a = 0; a < r; a++) i[a] = es(e, a, n, s);
            return i;
          }
          function ns(e, t) {
            return ts(e, t, "months", 12, "month");
          }
          function rs(e, t) {
            return ts(e, t, "monthsShort", 12, "month");
          }
          function ss(e, t) {
            return ts(e, t, "weekdays", 7, "day");
          }
          function as(e, t) {
            return ts(e, t, "weekdaysShort", 7, "day");
          }
          function is(e, t) {
            return ts(e, t, "weekdaysMin", 7, "day");
          }
          (Qr._calendar = Rr),
            (Qr.calendar = Ir),
            (Qr._longDateFormat = zr),
            (Qr.longDateFormat = Ur),
            (Qr._invalidDate = Gr),
            (Qr.invalidDate = Jr),
            (Qr._ordinal = Vr),
            (Qr.ordinal = $r),
            (Qr._ordinalParse = Br),
            (Qr.preparse = qr),
            (Qr.postformat = qr),
            (Qr._relativeTime = Kr),
            (Qr.relativeTime = Xr),
            (Qr.pastFuture = Zr),
            (Qr.set = j),
            (Qr.months = Je),
            (Qr._months = Ge),
            (Qr.monthsShort = Be),
            (Qr._monthsShort = Ve),
            (Qr.monthsParse = $e),
            (Qr._monthsRegex = et),
            (Qr.monthsRegex = tt),
            (Qr._monthsShortRegex = Ze),
            (Qr.monthsShortRegex = Qe),
            (Qr.week = rr),
            (Qr._week = sr),
            (Qr.firstDayOfYear = ir),
            (Qr.firstDayOfWeek = ar),
            (Qr.weekdays = _r),
            (Qr._weekdays = cr),
            (Qr.weekdaysMin = fr),
            (Qr._weekdaysMin = pr),
            (Qr.weekdaysShort = mr),
            (Qr._weekdaysShort = hr),
            (Qr.weekdaysParse = yr),
            (Qr.isPM = wr),
            (Qr._meridiemParse = Dr),
            (Qr.meridiem = Tr),
            F("en", {
              ordinalParse: /\d{1,2}(th|st|nd|rd)/,
              ordinal: function (e) {
                var t = e % 10;
                return (
                  e +
                  (1 === Y((e % 100) / 10)
                    ? "th"
                    : 1 === t
                    ? "st"
                    : 2 === t
                    ? "nd"
                    : 3 === t
                    ? "rd"
                    : "th")
                );
              },
            }),
            (r.lang = w(
              "moment.lang is deprecated. Use moment.locale instead.",
              F
            )),
            (r.langData = w(
              "moment.langData is deprecated. Use moment.localeData instead.",
              I
            ));
          var os = Math.abs;
          function us() {
            var e = this._data;
            return (
              (this._milliseconds = os(this._milliseconds)),
              (this._days = os(this._days)),
              (this._months = os(this._months)),
              (e.milliseconds = os(e.milliseconds)),
              (e.seconds = os(e.seconds)),
              (e.minutes = os(e.minutes)),
              (e.hours = os(e.hours)),
              (e.months = os(e.months)),
              (e.years = os(e.years)),
              this
            );
          }
          function ds(e, t, n, r) {
            var s = un(t, n);
            return (
              (e._milliseconds += r * s._milliseconds),
              (e._days += r * s._days),
              (e._months += r * s._months),
              e._bubble()
            );
          }
          function ls(e, t) {
            return ds(this, e, t, 1);
          }
          function cs(e, t) {
            return ds(this, e, t, -1);
          }
          function _s(e) {
            return e < 0 ? Math.floor(e) : Math.ceil(e);
          }
          function hs() {
            var e,
              t,
              n,
              r,
              s,
              a = this._milliseconds,
              i = this._days,
              o = this._months,
              u = this._data;
            return (
              (a >= 0 && i >= 0 && o >= 0) ||
                (a <= 0 && i <= 0 && o <= 0) ||
                ((a += 864e5 * _s(ps(o) + i)), (i = 0), (o = 0)),
              (u.milliseconds = a % 1e3),
              (e = v(a / 1e3)),
              (u.seconds = e % 60),
              (t = v(e / 60)),
              (u.minutes = t % 60),
              (n = v(t / 60)),
              (u.hours = n % 24),
              (i += v(n / 24)),
              (o += s = v(ms(i))),
              (i -= _s(ps(s))),
              (r = v(o / 12)),
              (o %= 12),
              (u.days = i),
              (u.months = o),
              (u.years = r),
              this
            );
          }
          function ms(e) {
            return (4800 * e) / 146097;
          }
          function ps(e) {
            return (146097 * e) / 4800;
          }
          function fs(e) {
            var t,
              n,
              r = this._milliseconds;
            if ("month" === (e = J(e)) || "year" === e)
              return (
                (t = this._days + r / 864e5),
                (n = this._months + ms(t)),
                "month" === e ? n : n / 12
              );
            switch (((t = this._days + Math.round(ps(this._months))), e)) {
              case "week":
                return t / 7 + r / 6048e5;
              case "day":
                return t + r / 864e5;
              case "hour":
                return 24 * t + r / 36e5;
              case "minute":
                return 1440 * t + r / 6e4;
              case "second":
                return 86400 * t + r / 1e3;
              case "millisecond":
                return Math.floor(864e5 * t) + r;
              default:
                throw new Error("Unknown unit " + e);
            }
          }
          function ys() {
            return (
              this._milliseconds +
              864e5 * this._days +
              (this._months % 12) * 2592e6 +
              31536e6 * Y(this._months / 12)
            );
          }
          function gs(e) {
            return function () {
              return this.as(e);
            };
          }
          var Ms = gs("ms"),
            Ls = gs("s"),
            vs = gs("m"),
            Ys = gs("h"),
            bs = gs("d"),
            ks = gs("w"),
            ws = gs("M"),
            Ds = gs("y");
          function Ts(e) {
            return this[(e = J(e)) + "s"]();
          }
          function Ss(e) {
            return function () {
              return this._data[e];
            };
          }
          var xs = Ss("milliseconds"),
            js = Ss("seconds"),
            Hs = Ss("minutes"),
            Ps = Ss("hours"),
            Os = Ss("days"),
            As = Ss("months"),
            Es = Ss("years");
          function Cs() {
            return v(this.days() / 7);
          }
          var Ns = Math.round,
            Fs = { s: 45, m: 45, h: 22, d: 26, M: 11 };
          function Ws(e, t, n, r, s) {
            return s.relativeTime(t || 1, !!n, e, r);
          }
          function Rs(e, t, n) {
            var r = un(e).abs(),
              s = Ns(r.as("s")),
              a = Ns(r.as("m")),
              i = Ns(r.as("h")),
              o = Ns(r.as("d")),
              u = Ns(r.as("M")),
              d = Ns(r.as("y")),
              l = (s < Fs.s && ["s", s]) ||
                (a <= 1 && ["m"]) ||
                (a < Fs.m && ["mm", a]) ||
                (i <= 1 && ["h"]) ||
                (i < Fs.h && ["hh", i]) ||
                (o <= 1 && ["d"]) ||
                (o < Fs.d && ["dd", o]) ||
                (u <= 1 && ["M"]) ||
                (u < Fs.M && ["MM", u]) ||
                (d <= 1 && ["y"]) || ["yy", d];
            return (l[2] = t), (l[3] = +e > 0), (l[4] = n), Ws.apply(null, l);
          }
          function Is(e, t) {
            return (
              void 0 !== Fs[e] && (void 0 === t ? Fs[e] : ((Fs[e] = t), !0))
            );
          }
          function zs(e) {
            var t = this.localeData(),
              n = Rs(this, !e, t);
            return e && (n = t.pastFuture(+this, n)), t.postformat(n);
          }
          var Us = Math.abs;
          function Gs() {
            var e,
              t,
              n = Us(this._milliseconds) / 1e3,
              r = Us(this._days),
              s = Us(this._months);
            (e = v(n / 60)), (t = v(e / 60)), (n %= 60), (e %= 60);
            var a = v(s / 12),
              i = (s %= 12),
              o = r,
              u = t,
              d = e,
              l = n,
              c = this.asSeconds();
            return c
              ? (c < 0 ? "-" : "") +
                  "P" +
                  (a ? a + "Y" : "") +
                  (i ? i + "M" : "") +
                  (o ? o + "D" : "") +
                  (u || d || l ? "T" : "") +
                  (u ? u + "H" : "") +
                  (d ? d + "M" : "") +
                  (l ? l + "S" : "")
              : "P0D";
          }
          var Js = It.prototype;
          return (
            (Js.abs = us),
            (Js.add = ls),
            (Js.subtract = cs),
            (Js.as = fs),
            (Js.asMilliseconds = Ms),
            (Js.asSeconds = Ls),
            (Js.asMinutes = vs),
            (Js.asHours = Ys),
            (Js.asDays = bs),
            (Js.asWeeks = ks),
            (Js.asMonths = ws),
            (Js.asYears = Ds),
            (Js.valueOf = ys),
            (Js._bubble = hs),
            (Js.get = Ts),
            (Js.milliseconds = xs),
            (Js.seconds = js),
            (Js.minutes = Hs),
            (Js.hours = Ps),
            (Js.days = Os),
            (Js.weeks = Cs),
            (Js.months = As),
            (Js.years = Es),
            (Js.humanize = zs),
            (Js.toISOString = Gs),
            (Js.toString = Gs),
            (Js.toJSON = Gs),
            (Js.locale = An),
            (Js.localeData = Cn),
            (Js.toIsoString = w(
              "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
              Gs
            )),
            (Js.lang = En),
            ne("X", 0, 0, "unix"),
            ne("x", 0, 0, "valueOf"),
            we("x", Me),
            we("X", Ye),
            je("X", function (e, t, n) {
              n._d = new Date(1e3 * parseFloat(e, 10));
            }),
            je("x", function (e, t, n) {
              n._d = new Date(Y(e));
            }),
            (r.version = "2.12.0"),
            s(At),
            (r.fn = Nr),
            (r.min = Ft),
            (r.max = Wt),
            (r.now = Rt),
            (r.utc = l),
            (r.unix = Fr),
            (r.months = ns),
            (r.isDate = i),
            (r.locale = F),
            (r.invalid = m),
            (r.duration = un),
            (r.isMoment = L),
            (r.weekdays = ss),
            (r.parseZone = Wr),
            (r.localeData = I),
            (r.isDuration = zt),
            (r.monthsShort = rs),
            (r.weekdaysMin = is),
            (r.defineLocale = W),
            (r.updateLocale = R),
            (r.locales = z),
            (r.weekdaysShort = as),
            (r.normalizeUnits = J),
            (r.relativeTimeThreshold = Is),
            (r.prototype = Nr),
            r
          );
        })();
      },
      586: function (e) {
        "use strict";
        e.exports =
          ("object" == typeof self && self.self === self && self) ||
          ("object" == typeof global && global.global === global && global) ||
          this;
      },
      8872: (e) => {
        "use strict";
        e.exports = JSON.parse(
          '["ar","arc","dv","fa","ha","he","khw","ks","ku","ps","ur","yi"]'
        );
      },
    },
    t = {};
  function n(r) {
    var s = t[r];
    if (void 0 !== s) return s.exports;
    var a = (t[r] = { id: r, loaded: !1, exports: {} });
    return e[r].call(a.exports, a, a.exports, n), (a.loaded = !0), a.exports;
  }
  (n.d = (e, t) => {
    for (var r in t)
      n.o(t, r) &&
        !n.o(e, r) &&
        Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
  }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (() => {
      "use strict";
      var e = function (t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }),
          e(t, n)
        );
      };
      function t(t, n) {
        if ("function" != typeof n && null !== n)
          throw new TypeError(
            "Class extends value " + String(n) + " is not a constructor or null"
          );
        function r() {
          this.constructor = t;
        }
        e(t, n),
          (t.prototype =
            null === n
              ? Object.create(n)
              : ((r.prototype = n.prototype), new r()));
      }
      var r,
        s,
        a = function () {
          return (
            (a =
              Object.assign ||
              function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                  for (var s in (t = arguments[n]))
                    Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
                return e;
              }),
            a.apply(this, arguments)
          );
        };
      function i(e, t, n, r) {
        return new (n || (n = Promise))(function (s, a) {
          function i(e) {
            try {
              u(r.next(e));
            } catch (e) {
              a(e);
            }
          }
          function o(e) {
            try {
              u(r.throw(e));
            } catch (e) {
              a(e);
            }
          }
          function u(e) {
            var t;
            e.done
              ? s(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t);
                    })).then(i, o);
          }
          u((r = r.apply(e, t || [])).next());
        });
      }
      function o(e, t) {
        var n,
          r,
          s,
          a,
          i = {
            label: 0,
            sent: function () {
              if (1 & s[0]) throw s[1];
              return s[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (a = { next: o(0), throw: o(1), return: o(2) }),
          "function" == typeof Symbol &&
            (a[Symbol.iterator] = function () {
              return this;
            }),
          a
        );
        function o(a) {
          return function (o) {
            return (function (a) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; i; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (s =
                        2 & a[0]
                          ? r.return
                          : a[0]
                          ? r.throw || ((s = r.return) && s.call(r), 0)
                          : r.next) &&
                      !(s = s.call(r, a[1])).done)
                  )
                    return s;
                  switch (((r = 0), s && (a = [2 & a[0], s.value]), a[0])) {
                    case 0:
                    case 1:
                      s = a;
                      break;
                    case 4:
                      return i.label++, { value: a[1], done: !1 };
                    case 5:
                      i.label++, (r = a[1]), (a = [0]);
                      continue;
                    case 7:
                      (a = i.ops.pop()), i.trys.pop();
                      continue;
                    default:
                      if (
                        !((s = i.trys),
                        (s = s.length > 0 && s[s.length - 1]) ||
                          (6 !== a[0] && 2 !== a[0]))
                      ) {
                        i = 0;
                        continue;
                      }
                      if (3 === a[0] && (!s || (a[1] > s[0] && a[1] < s[3]))) {
                        i.label = a[1];
                        break;
                      }
                      if (6 === a[0] && i.label < s[1]) {
                        (i.label = s[1]), (s = a);
                        break;
                      }
                      if (s && i.label < s[2]) {
                        (i.label = s[2]), i.ops.push(a);
                        break;
                      }
                      s[2] && i.ops.pop(), i.trys.pop();
                      continue;
                  }
                  a = t.call(e, i);
                } catch (e) {
                  (a = [6, e]), (r = 0);
                } finally {
                  n = s = 0;
                }
              if (5 & a[0]) throw a[1];
              return { value: a[0] ? a[1] : void 0, done: !0 };
            })([a, o]);
          };
        }
      }
      function u(e) {
        var t = "function" == typeof Symbol && Symbol.iterator,
          n = t && e[t],
          r = 0;
        if (n) return n.call(e);
        if (e && "number" == typeof e.length)
          return {
            next: function () {
              return (
                e && r >= e.length && (e = void 0),
                { value: e && e[r++], done: !e }
              );
            },
          };
        throw new TypeError(
          t ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      }
      function d(e, t) {
        for (var n = 0, r = t.length, s = e.length; n < r; n++, s++)
          e[s] = t[n];
        return e;
      }
      function l(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var t,
          n = e[Symbol.asyncIterator];
        return n
          ? n.call(e)
          : ((e = u(e)),
            (t = {}),
            r("next"),
            r("throw"),
            r("return"),
            (t[Symbol.asyncIterator] = function () {
              return this;
            }),
            t);
        function r(n) {
          t[n] =
            e[n] &&
            function (t) {
              return new Promise(function (r, s) {
                (function (e, t, n, r) {
                  Promise.resolve(r).then(function (t) {
                    e({ value: t, done: n });
                  }, t);
                })(r, s, (t = e[n](t)).done, t.value);
              });
            };
        }
      }
      !(function (e) {
        (e.name = "name"), (e.pages = "pages");
      })(r || (r = {})),
        (function (e) {
          (e.target = "target"),
            (e.actions = "actions"),
            (e.groupedActions = "groupedActions"),
            (e.hooks = "hooks");
        })(s || (s = {}));
      var c,
        _,
        h = (function (e) {
          function n() {
            var t = this.constructor,
              n = e.call(this) || this;
            return (
              (n.name = t.name),
              (n.message = "Unexpected error occurred."),
              Object.setPrototypeOf(n, t.prototype),
              n
            );
          }
          return (
            t(n, e),
            Object.defineProperty(n.prototype, "errorDetails", {
              get: function () {},
              enumerable: !1,
              configurable: !0,
            }),
            n
          );
        })(Error),
        m = (function (e) {
          function n() {
            var t = e.call(this) || this;
            return (
              (t.message =
                'Unable to parse the page - "actions" or "groupedActions" field is either missing or the value is not valid.'),
              t
            );
          }
          return t(n, e), n;
        })(h),
        p = (function (e) {
          function n(t) {
            var n = e.call(this) || this;
            return (
              (n.invalidActions = t),
              (n.message =
                'Unable to parse following page actions: "' +
                t.join(", ") +
                '".'),
              n
            );
          }
          return t(n, e), n;
        })(h),
        f = (function (e) {
          function n(t) {
            var n = e.call(this) || this;
            return (
              (n.invalidHooks = t),
              (n.message =
                'Unable to parse following page actions: "' +
                t.join(", ") +
                '".'),
              n
            );
          }
          return t(n, e), n;
        })(h),
        y = (function (e) {
          function n() {
            var t = e.call(this) || this;
            return (
              (t.message =
                'Unable to parse the page - "target" field is either missing or the value is not valid.'),
              t
            );
          }
          return t(n, e), n;
        })(h);
      !(function (e) {
        (e.onSuccess = "onSuccess"),
          (e.onStop = "onStop"),
          (e.onDisposed = "onDisposed"),
          (e.onFailed = "onFailed");
      })(c || (c = {})),
        (function (e) {
          (e.bulkClick = "bulkClick"),
            (e.click = "click"),
            (e.clickWhenVisible = "clickWhenVisible"),
            (e.executeScript = "executeScript"),
            (e.injectStyles = "injectStyles"),
            (e.notification = "notification"),
            (e.scroll = "scroll"),
            (e.stopScenario = "stopScenario"),
            (e.tooltip = "tooltip"),
            (e.unknown = "unknown"),
            (e.verifyOk = "verifyOk"),
            (e.waitUntilVisible = "waitUntilVisible");
        })(_ || (_ = {}));
      var g,
        M = (function (e) {
          function n(t, n) {
            var r = e.call(this) || this;
            return (
              (r.event = t),
              (r.failReason = n),
              (r.message = 'Action "' + r.event + '" execution failed.'),
              r
            );
          }
          return (
            t(n, e),
            Object.defineProperty(n.prototype, "errorDetails", {
              get: function () {
                return [
                  {
                    key: this.event,
                    description: this.failReason.message,
                    failReason: this.failReason,
                  },
                ];
              },
              enumerable: !1,
              configurable: !0,
            }),
            n
          );
        })(h),
        L = function (e, t) {
          (this.resolution = e), (this.nextGroup = t);
        },
        v = (function (e) {
          function n(t, n) {
            var r = e.call(this) || this;
            return (
              (r.scenarioName = t),
              (r.invalidValues = n),
              (r.message =
                "Parsing the " +
                t +
                ' failed - "' +
                r.getInvalidKeysString() +
                '" entries are invalid.'),
              r
            );
          }
          return (
            t(n, e),
            Object.defineProperty(n.prototype, "errorDetails", {
              get: function () {
                return this.invalidValues;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (n.prototype.getInvalidKeysString = function () {
              return this.invalidValues
                .map(function (e) {
                  return e.key;
                })
                .join(", ");
            }),
            n
          );
        })(h),
        Y = (function () {
          function e(e, t, n, r) {
            (this.scenarioName = e),
              (this.resolution = t),
              (this.stack = n),
              (this.error = r);
          }
          return (
            (e.buildFailedResult = function (t, n, r) {
              return new e(
                this.resolveScenarioName(t, n),
                g.failed,
                r,
                this.getScenarioError(n)
              );
            }),
            (e.resolveScenarioName = function (e, t) {
              return t instanceof v
                ? t.scenarioName
                : (null == e ? void 0 : e.name)
                ? e.name
                : "Unknown";
            }),
            (e.getScenarioError = function (e) {
              return {
                name: e.name,
                message: e.message,
                details: e.errorDetails,
              };
            }),
            e
          );
        })();
      !(function (e) {
        (e.failed = "failed"),
          (e.succeeded = "succeeded"),
          (e.stopped = "stopped"),
          (e.terminated = "terminated");
      })(g || (g = {}));
      var b,
        k,
        w,
        D = (function () {
          function e() {}
          return (
            (e.prototype.dispose = function () {
              for (var e in this) this.hasOwnProperty(e) && delete this[e];
            }),
            (e.prototype.getEvent = function () {
              return this.constructor.event;
            }),
            (e.prototype.handleSuccess = function (e, t) {
              return (
                void 0 === e && (e = g.succeeded), Promise.resolve(new L(e, t))
              );
            }),
            (e.prototype.handleFail = function (e, t) {
              return Promise.reject(new M(e, t));
            }),
            e
          );
        })(),
        T = (function (e) {
          function n(t, n) {
            var r = e.call(this) || this;
            return (
              (r.message =
                "Couldn't find \"" +
                t +
                '" element in "' +
                n.nodeName +
                '" parent.'),
              r
            );
          }
          return t(n, e), n;
        })(h),
        S = (function (e) {
          function n(t, n) {
            void 0 === n && (n = document);
            var r = e.call(this) || this;
            return (
              (r.message =
                "Multiple elements matches " +
                t +
                " selector in " +
                n.nodeName +
                " parent."),
              r
            );
          }
          return t(n, e), n;
        })(h),
        x = (function () {
          function e() {}
          return (
            (e.getSingleElementByXPath = function (t, n) {
              var r = e.getAllElementsByXpath(t, n);
              if (r.length > 1) throw new S(t, n);
              return r.shift();
            }),
            (e.getAllElementsByXpath = function (t, n) {
              for (
                var r = [],
                  s = e.getNodeDocument(n),
                  a = s.evaluate(
                    t,
                    s,
                    null,
                    XPathResult.ORDERED_NODE_ITERATOR_TYPE,
                    null
                  ),
                  i = a.iterateNext();
                i;

              )
                r.push(i), (i = a.iterateNext());
              if (0 === r.length) throw new T(t, s);
              return r;
            }),
            (e.isIFrame = function (e) {
              return e instanceof HTMLIFrameElement;
            }),
            (e.getNodeDocument = function (e) {
              return e && this.isIFrame(e)
                ? e.contentWindow.document
                : document;
            }),
            e
          );
        })(),
        j = (function (e) {
          function n(t, n) {
            var r = e.call(this) || this;
            return (r.xpath = t), (r.parent = n), r;
          }
          return (
            t(n, e),
            (n.prototype.getNode = function (e, t) {
              var n = t ? this.getNode(t) : void 0;
              return x.getSingleElementByXPath(e, n);
            }),
            n
          );
        })(D),
        H = (function (e) {
          function n(t, n) {
            return e.call(this, t, n) || this;
          }
          return (
            t(n, e),
            (n.prototype.execute = function () {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (t) {
                  try {
                    return (
                      (e = this.getNode(this.xpath, this.parent)),
                      this.invokeClick(e),
                      [2, this.handleSuccess()]
                    );
                  } catch (e) {
                    return [2, this.handleFail(n.event, e)];
                  }
                  return [2];
                });
              });
            }),
            (n.prototype.invokeClick = function (e) {
              e.click();
            }),
            (n.event = _.click),
            n
          );
        })(j),
        P = (function (e) {
          function n(t, n) {
            var r = e.call(this) || this;
            return (
              (r.message =
                "Couldn't find \"" + t + '" element within ' + n + "ms."),
              r
            );
          }
          return t(n, e), n;
        })(h),
        O = (function () {
          function e(e, t, n, r) {
            void 0 === r && (r = 500),
              (this.xpath = e),
              (this.timeout = t),
              (this.parent = n),
              (this.interval = r);
          }
          return (
            Object.defineProperty(e.prototype, "isTimedOut", {
              get: function () {
                return !this.timeoutTime || Date.now() > this.timeoutTime;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.onElementVisible = function () {
              return i(this, void 0, void 0, function () {
                var e,
                  t = this;
                return o(this, function (n) {
                  return (
                    (e = new Promise(function (e, n) {
                      (t.promiseResolve = e), (t.promiseReject = n);
                    })),
                    (this.timeoutTime = Date.now() + this.timeout),
                    this.createTimeout(),
                    [2, e]
                  );
                });
              });
            }),
            (e.prototype.dispose = function () {
              var e = this;
              clearTimeout(this.timeoutInstance),
                Object.keys(this).forEach(function (t) {
                  return delete e[t];
                });
            }),
            (e.prototype.createTimeout = function () {
              var e = this;
              this.timeoutInstance = window.setTimeout(function () {
                return e.onTimeout();
              }, this.interval);
            }),
            (e.prototype.onTimeout = function () {
              var e, t, n;
              try {
                return null === (e = this.promiseResolve) || void 0 === e
                  ? void 0
                  : e.call(this, this.getTargetElement());
              } catch (e) {
                if (!(e instanceof T))
                  return null === (t = this.promiseReject) || void 0 === t
                    ? void 0
                    : t.call(this, e);
                if (this.isTimedOut)
                  return null === (n = this.promiseReject) || void 0 === n
                    ? void 0
                    : n.call(this, new P(this.xpath, this.timeout));
              }
              this.createTimeout();
            }),
            (e.prototype.getTargetElement = function () {
              var e = this.getNode(this.parent);
              return this.getNode(this.xpath, e);
            }),
            (e.prototype.getNode = function (e, t) {
              return e ? x.getSingleElementByXPath(e, t) : void 0;
            }),
            e
          );
        })(),
        A = (function (e) {
          function n(t, n, r) {
            var s = e.call(this, t, r) || this;
            return (s.timeout = n), s;
          }
          return (
            t(n, e),
            (n.prototype.execute = function () {
              return i(this, void 0, void 0, function () {
                var e, t;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        n.trys.push([0, 2, , 3]),
                        (this.domObserver = new O(
                          this.xpath,
                          this.timeout,
                          this.parent
                        )),
                        [4, this.domObserver.onElementVisible()]
                      );
                    case 1:
                      return (
                        (e = n.sent()),
                        this.invokeClick(e),
                        [2, this.handleSuccess()]
                      );
                    case 2:
                      return (
                        (t = n.sent()),
                        [2, this.handleFail(_.clickWhenVisible, t)]
                      );
                    case 3:
                      return [2];
                  }
                });
              });
            }),
            (n.prototype.dispose = function () {
              var t;
              null === (t = this.domObserver) || void 0 === t || t.dispose(),
                e.prototype.dispose.call(this);
            }),
            (n.event = _.clickWhenVisible),
            n
          );
        })(H),
        E = (function (e) {
          function n(t) {
            var n = e.call(this) || this;
            return (
              (n.event = t),
              (n.message = 'Unable to parse the "' + t + '" action.'),
              n
            );
          }
          return t(n, e), n;
        })(h),
        C = (function () {
          function e() {}
          return (
            (e.isObjectWithKeys = function (e) {
              return (
                !!e &&
                !this.isNumber(e) &&
                !this.isString(e) &&
                !this.isArray(e) &&
                this.notEmptyObjectKeys(e)
              );
            }),
            (e.isNumber = function (e) {
              return "number" == typeof e;
            }),
            (e.nonEmptyString = function (e) {
              return this.isString(e) && e.length > 0;
            }),
            (e.isString = function (e) {
              return "string" == typeof e;
            }),
            (e.isEmptyArray = function (e) {
              return this.isArray(e) && 0 === e.length;
            }),
            (e.nonEmptyArray = function (e) {
              return this.isArray(e) && !!e.length;
            }),
            (e.isArray = function (e) {
              return Array.isArray(e);
            }),
            (e.isQueryString = function (e) {
              if (!this.nonEmptyString(e)) return !1;
              var t = e.split("=");
              if (2 !== t.length) return !1;
              for (var n = 0, r = t; n < r.length; n++) {
                var s = r[n];
                if (!this.nonEmptyString(s)) return !1;
              }
              return !0;
            }),
            (e.isValidUrl = function (e) {
              try {
                return new URL(e), !0;
              } catch (e) {
                return !1;
              }
            }),
            (e.isRegex = function (e) {
              return this.nonEmptyString(e) && "/" === e[0];
            }),
            (e.isEnumValue = function (e, t) {
              return !!(null == t ? void 0 : t[e]);
            }),
            (e.notEmptyObjectKeys = function (e) {
              return Object.keys(e).length > 0;
            }),
            (e.isBoolean = function (e) {
              return "boolean" == typeof e;
            }),
            e
          );
        })(),
        N = (function () {
          function e() {}
          return (
            (e.prototype.validateXpath = function (e) {
              return C.nonEmptyString(e);
            }),
            (e.prototype.validateTimeout = function (e) {
              return C.isNumber(e);
            }),
            (e.prototype.validateUrl = function (e) {
              return C.isValidUrl(e);
            }),
            (e.prototype.validateClassName = function (e) {
              return C.nonEmptyString(e);
            }),
            (e.prototype.validatePosition = function (e) {
              return C.nonEmptyString(e);
            }),
            (e.prototype.throwParseError = function (e) {
              throw new E(e);
            }),
            e
          );
        })(),
        F = (function (e) {
          function n() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            t(n, e),
            (n.prototype.parse = function (e) {
              return (
                (this.validateXpath(e.xpath) &&
                  this.validateTimeout(e.timeout)) ||
                  this.throwParseError(A.event),
                new A(e.xpath, e.timeout, e.parent)
              );
            }),
            n
          );
        })(N),
        W = (function (e) {
          function n(t) {
            var n = e.call(this) || this;
            return (n.executionMethod = t), n;
          }
          return (
            t(n, e),
            (n.prototype.execute = function () {
              return i(this, void 0, void 0, function () {
                return o(this, function (e) {
                  try {
                    return this.executionMethod(), [2, this.handleSuccess()];
                  } catch (e) {
                    return [2, this.handleFail(_.executeScript, e)];
                  }
                  return [2];
                });
              });
            }),
            (n.event = _.executeScript),
            n
          );
        })(D),
        R = (function (e) {
          function n() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            t(n, e),
            (n.prototype.parse = function (e) {
              try {
                var t = this.parseExecutionMethod(e.script);
                return new W(t);
              } catch (e) {
                this.throwParseError(W.event);
              }
            }),
            (n.prototype.parseExecutionMethod = function (e) {
              if (!this.validateScript(e)) throw new Error();
              return Function(e);
            }),
            (n.prototype.validateScript = function (e) {
              return C.nonEmptyString(e);
            }),
            n
          );
        })(N),
        I = (function (e) {
          function n(t) {
            var n = e.call(this) || this;
            return (n.stylesheetUrl = t), n;
          }
          return (
            t(n, e),
            (n.prototype.dispose = function () {
              for (var e in this) this.hasOwnProperty(e) && delete this[e];
            }),
            (n.prototype.execute = function () {
              try {
                return this.injectStyles(), this.handleSuccess();
              } catch (e) {
                return this.handleFail(n.event, e);
              }
            }),
            (n.prototype.injectStyles = function () {
              var e = document.createElement("link");
              (e.href = this.stylesheetUrl),
                (e.type = "text/css"),
                (e.rel = "stylesheet"),
                document.getElementsByTagName("head")[0].appendChild(e);
            }),
            (n.event = _.injectStyles),
            n
          );
        })(D),
        z = (function (e) {
          function n() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            t(n, e),
            (n.prototype.parse = function (e) {
              return (
                this.validateUrl(e.stylesheetUrl) ||
                  this.throwParseError(I.event),
                new I(e.stylesheetUrl)
              );
            }),
            n
          );
        })(N),
        U = (function (e) {
          function n() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            t(n, e),
            (n.prototype.parseResolveConditions = function (e) {
              var t = this;
              return e.map(function (e) {
                var n = { elements: t.parseElements(e.elements) };
                return t.parseGroupId(e) && (n.groupId = e.groupId), n;
              });
            }),
            (n.prototype.parseElements = function (e) {
              var t = this;
              return e.map(function (e) {
                return "string" == typeof e
                  ? t.parseStringNodeComponent(e)
                  : t.parseObjectNodeComponent(e);
              });
            }),
            (n.prototype.parseStringNodeComponent = function (e) {
              if (!C.nonEmptyString(e)) throw new Error();
              return { xpath: e, multipleMatch: !1 };
            }),
            (n.prototype.parseObjectNodeComponent = function (e) {
              var t = !!e.hasOwnProperty("multipleMatch") && e.multipleMatch;
              if (
                !this.validateElementWithParent(e) ||
                !this.validateMultipleMatchFlag(t)
              )
                throw new Error();
              return a(a({}, e), { multipleMatch: t });
            }),
            (n.prototype.validateElementWithParent = function (e) {
              return (
                C.nonEmptyString(e.xpath) &&
                (!e.hasOwnProperty("parent") || C.nonEmptyString(e.parent))
              );
            }),
            (n.prototype.validateMultipleMatchFlag = function (e) {
              return C.isBoolean(e);
            }),
            (n.prototype.parseGroupId = function (e) {
              if (e.hasOwnProperty("groupId")) {
                if (!C.nonEmptyString(e.groupId)) throw Error();
                return e.groupId;
              }
            }),
            (n.prototype.validateHtmlContent = function (e) {
              return C.nonEmptyString(e);
            }),
            n
          );
        })(N),
        G = new ((function () {
          function e() {
            this.events = {};
          }
          return (
            (e.prototype.addListener = function (e, t) {
              var n = this;
              return (
                this.events[e] || (this.events[e] = []),
                this.events[e].push(t),
                function () {
                  return n.removeListener(e, t);
                }
              );
            }),
            (e.prototype.removeListener = function (e, t) {
              if (this.events[e]) {
                var n = this.events[e].indexOf(t);
                n > -1 && this.events[e].splice(n, 1);
              }
            }),
            (e.prototype.removeAllListeners = function () {
              var e = this;
              Object.keys(this.events).forEach(function (t) {
                return (e.events[t] = []);
              });
            }),
            (e.prototype.emit = function (e) {
              for (var t = this, n = [], r = 1; r < arguments.length; r++)
                n[r - 1] = arguments[r];
              this.events[e] &&
                d([], this.events[e]).forEach(function (e) {
                  return e.apply(t, n);
                });
            }),
            (e.prototype.once = function (e, t) {
              var n = this,
                r = this.addListener(e, function () {
                  for (var e = [], s = 0; s < arguments.length; s++)
                    e[s] = arguments[s];
                  r(), t.apply(n, e);
                });
              return r;
            }),
            e
          );
        })())();
      !(function (e) {
        (e.onBeforeLastAction = "scenario.onBeforeLastAction"),
          (e.onError = "scenario.onError");
      })(b || (b = {})),
        (function (e) {
          (e.TooltipResolved = "track.tooltipResolved"),
            (e.TooltipClosed = "track.tooltipClosed"),
            (e.NotificationResolved = "track.notificationResolved"),
            (e.NotificationClosed = "track.notificationClosed");
        })(k || (k = {})),
        (function (e) {
          (e.ScenarioClosed = "scenario-closed"),
            (e.ScenarioRevoked = "scenario-revoked");
        })(w || (w = {}));
      var J,
        V = (function (e) {
          function n(t, n) {
            var r = e.call(this) || this;
            return (
              (r.element = t),
              (r.failReason = n),
              (r.message = "Resolve Condition Failed: " + r.failReason.message),
              r
            );
          }
          return (
            t(n, e),
            Object.defineProperty(n.prototype, "errorDetails", {
              get: function () {
                var e;
                return [
                  {
                    key:
                      this.element.xpath +
                      " " +
                      (null !== (e = this.element.parent) && void 0 !== e
                        ? e
                        : ""),
                    description: this.failReason.message,
                    failReason: this.failReason,
                  },
                ];
              },
              enumerable: !1,
              configurable: !0,
            }),
            n
          );
        })(h),
        B = (function (e) {
          function n(t) {
            var n = e.call(this) || this;
            return (
              (n.uniqueId = t),
              (n.message =
                "Element is not unique: " +
                n.uniqueId +
                " id already exists in DOM."),
              n
            );
          }
          return t(n, e), n;
        })(h),
        $ = (function () {
          function e() {}
          return (
            (e.generate = function () {
              return Math.random().toString(36).substr(2, 9);
            }),
            e
          );
        })(),
        q = (function () {
          function e(e) {
            (this.content = e),
              (this.domListeners = []),
              (this.uniqueId = $.generate());
          }
          return (
            (e.prototype.renderComponent = function (e, t, n) {
              try {
                (this.onResolve = t),
                  this.render(),
                  this.registerConditionListeners(e);
              } catch (e) {
                n(e);
              }
            }),
            (e.prototype.dispose = function () {
              var e;
              for (var t in (this.removeDomListeners(),
              null === (e = this.element) || void 0 === e || e.remove(),
              this))
                this.hasOwnProperty(t) && delete this[t];
            }),
            (e.prototype.render = function () {
              if (document.getElementById(this.uniqueId))
                throw new B(this.uniqueId);
              (this.element = this.buildElement()),
                this.appendComponentElement();
            }),
            (e.prototype.appendComponentElement = function () {
              document.body.appendChild(this.element);
            }),
            (e.prototype.registerConditionListeners = function (e) {
              var t = this;
              e.forEach(function (e) {
                t.getConditionElements(e.elements).forEach(function (n) {
                  return t.addDomListener(n, "click", function () {
                    return t.onResolve(e);
                  });
                });
              });
            }),
            (e.prototype.getConditionElements = function (e) {
              var t = this,
                n = [];
              return (
                e.forEach(function (e) {
                  try {
                    n = n.concat(t.getElement(e));
                  } catch (t) {
                    throw new V(e, t);
                  }
                }),
                n
              );
            }),
            (e.prototype.getElement = function (e) {
              return (
                e.multipleMatch
                  ? x.getAllElementsByXpath
                  : x.getSingleElementByXPath
              )(e.xpath, this.getParentNode(e.parent));
            }),
            (e.prototype.getParentNode = function (e) {
              return e ? x.getSingleElementByXPath(e) : void 0;
            }),
            (e.prototype.addDomListener = function (e, t, n) {
              this.domListeners.push({ target: e, type: t, callback: n }),
                e.addEventListener(t, n);
            }),
            (e.prototype.removeDomListeners = function () {
              this.domListeners.forEach(function (e) {
                return e.target.removeEventListener(e.type, e.callback);
              });
            }),
            e
          );
        })(),
        K = (function (e) {
          function n(t, n) {
            var r = e.call(this, t) || this;
            return (r.content = t), (r.className = n), r;
          }
          return (
            t(n, e),
            (n.prototype.buildElement = function () {
              var e = document.createElement("div");
              return (
                (e.id = this.uniqueId),
                (e.className = this.className),
                (e.innerHTML = this.content),
                e
              );
            }),
            n
          );
        })(q),
        X = (function (e) {
          function n() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            return (
              (t.resolveConditions = []),
              (t.resolve = function () {}),
              (t.reject = function () {}),
              t
            );
          }
          return (
            t(n, e),
            (n.prototype.execute = function () {
              var e = this;
              return new Promise(function (t, n) {
                (e.resolve = t), (e.reject = n), e.setComponent();
              });
            }),
            (n.prototype.dispose = function () {
              this.disposeComponent(), e.prototype.dispose.call(this);
            }),
            (n.prototype.getResolveConditionsGroupIds = function () {
              return this.resolveConditions.map(function (e) {
                return e.groupId;
              });
            }),
            (n.prototype.disposeComponent = function () {
              var e;
              null === (e = this.component) || void 0 === e || e.dispose(),
                (this.component = void 0);
            }),
            (n.prototype.setComponent = function () {
              var e = this;
              (this.component = this.buildComponent()),
                this.component.renderComponent(
                  this.resolveConditions,
                  function (t) {
                    return e.onResolve(t);
                  },
                  function (t) {
                    return e.reject(t);
                  }
                );
            }),
            (n.prototype.onResolve = function (e) {
              this.disposeComponent(),
                this.resolve(new L(g.succeeded, e.groupId));
            }),
            n
          );
        })(j),
        Z = (function (e) {
          function n(t, n, r, s) {
            var a = e.call(this, "", n) || this;
            return (
              (a.content = t),
              (a.className = n),
              (a.resolveConditions = r),
              (a.trackableContent = s),
              a
            );
          }
          return (
            t(n, e),
            (n.prototype.onResolve = function (t) {
              G.emit(this.getTrackEventFromCondition(t), {
                content: this.trackableContent,
              }),
                e.prototype.onResolve.call(this, t);
            }),
            (n.prototype.getTrackEventFromCondition = function (e) {
              return e.groupId === w.ScenarioClosed
                ? k.NotificationClosed
                : k.NotificationResolved;
            }),
            (n.prototype.buildComponent = function () {
              return new K(this.content, this.className);
            }),
            (n.event = _.notification),
            n
          );
        })(X),
        Q = (function (e) {
          function n() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            t(n, e),
            (n.prototype.parse = function (e) {
              return (
                this.validateNotificationData(e) ||
                  this.throwParseError(e.event),
                this.getParsedNotificationAction(e)
              );
            }),
            (n.prototype.validateNotificationData = function (e) {
              return (
                this.validateHtmlContent(e.htmlContent) &&
                this.validateActionClassName(e)
              );
            }),
            (n.prototype.getParsedNotificationAction = function (e) {
              try {
                var t = e.htmlContent,
                  n = e.className,
                  r = e.resolveConditions,
                  s = this.parseResolveConditions(r);
                return new Z(t, null != n ? n : "", s);
              } catch (t) {
                this.throwParseError(e.event);
              }
            }),
            (n.prototype.validateActionClassName = function (e) {
              return (
                !e.hasOwnProperty("className") ||
                this.validateClassName(e.className)
              );
            }),
            n
          );
        })(U),
        ee = (function (e) {
          function n(t, n, r, s) {
            var a = e.call(this, t, s) || this;
            return (
              (a.timeout = n),
              (a.scrollToOptions = r),
              (a.domObserver = new O(t, n, s)),
              a
            );
          }
          return (
            t(n, e),
            (n.prototype.execute = function () {
              return i(this, void 0, void 0, function () {
                var e, t, n;
                return o(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return (
                        r.trys.push([0, 2, , 3]),
                        (this.domObserver = new O(
                          this.xpath,
                          this.timeout,
                          this.parent
                        )),
                        [4, this.domObserver.onElementVisible()]
                      );
                    case 1:
                      return (
                        (e = r.sent()),
                        (t = this.scrollToOptions
                          ? this.scrollToOptions
                          : { left: e.scrollWidth, top: e.scrollHeight }),
                        e.scrollBy(t),
                        [2, this.handleSuccess()]
                      );
                    case 2:
                      return (n = r.sent()), [2, this.handleFail(_.scroll, n)];
                    case 3:
                      return [2];
                  }
                });
              });
            }),
            (n.event = _.scroll),
            n
          );
        })(j),
        te = (function (e) {
          function n() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            t(n, e),
            (n.prototype.parse = function (e) {
              return (
                (this.validateXpath(e.xpath) &&
                  this.validateTimeout(e.timeout) &&
                  this.validateScrollToOptionsGrouped(e)) ||
                  this.throwParseError(ee.event),
                new ee(e.xpath, e.timeout, e.scrollToOptions, e.parent)
              );
            }),
            (n.prototype.validateScrollToOptionsGrouped = function (e) {
              return (
                !e.hasOwnProperty("scrollToOptions") ||
                this.validateScrollToOptions(e.scrollToOptions)
              );
            }),
            (n.prototype.validateScrollToOptions = function (e) {
              var t = e;
              return (
                C.isObjectWithKeys(e) && C.isNumber(t.left) && C.isNumber(t.top)
              );
            }),
            n
          );
        })(N);
      !(function (e) {
        (e.topLeft = "topLeft"),
          (e.topRight = "topRight"),
          (e.bottomLeft = "bottomLeft"),
          (e.bottomRight = "bottomRight"),
          (e.leftTop = "leftTop"),
          (e.leftBottom = "leftBottom"),
          (e.rightTop = "rightTop"),
          (e.rightBottom = "rightBottom");
      })(J || (J = {}));
      var ne = { x: 0, y: 0 },
        re = (function (e) {
          function n(t, n, r, s) {
            var a,
              i,
              o,
              u,
              d = e.call(this, r) || this;
            return (
              (d.targetNode = t),
              (d.targetParent = n),
              (d.content = r),
              (d.options = s),
              (d.debouncedSetPosition =
                ((a = d.setPosition.bind(d)),
                (i = 100),
                (u = function () {
                  for (var e = this, t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  clearTimeout(o),
                    (o = setTimeout(function () {
                      return a.apply(e, t);
                    }, i));
                }),
                (u.cancel = function () {
                  clearTimeout(o);
                }),
                u)),
              d
            );
          }
          return (
            t(n, e),
            (n.prototype.render = function () {
              e.prototype.render.call(this),
                this.registerPositionListeners(),
                this.setPosition();
            }),
            (n.prototype.dispose = function () {
              var t;
              null === (t = this.debouncedSetPosition) ||
                void 0 === t ||
                t.cancel(),
                e.prototype.dispose.call(this);
            }),
            (n.prototype.buildElement = function () {
              var e = document.createElement("div");
              return (
                (e.id = this.uniqueId),
                (e.className =
                  this.options.className +
                  " position-" +
                  this.options.position),
                (e.innerHTML = this.content),
                e
              );
            }),
            (n.prototype.registerPositionListeners = function () {
              var e = this;
              this.addDomListener(window, "resize", function () {
                return e.debouncedSetPosition();
              }),
                this.addDomListener(
                  this.resolveScrollElement(),
                  "scroll",
                  function () {
                    return e.setPosition();
                  }
                );
            }),
            Object.defineProperty(n.prototype, "isParentIFrame", {
              get: function () {
                return x.isIFrame(this.targetParent);
              },
              enumerable: !1,
              configurable: !0,
            }),
            (n.prototype.resolveScrollElement = function () {
              var e;
              return this.isParentIFrame
                ? this.targetNode.ownerDocument
                : null !== (e = this.targetParent) && void 0 !== e
                ? e
                : document;
            }),
            (n.prototype.getParentsBoundingRect = function () {
              return this.isParentIFrame
                ? this.targetParent.getBoundingClientRect()
                : ne;
            }),
            (n.prototype.setPosition = function () {
              if (this.targetNode) {
                var e = this.targetNode.getBoundingClientRect(),
                  t = this.getParentsBoundingRect(),
                  n = this.options.spaceBetween;
                switch (this.options.position) {
                  case J.topLeft:
                    this.alignHorizontally(
                      t.x + e.right - this.element.offsetWidth - e.width / 2
                    ),
                      this.alignVertically(
                        t.y + e.top - this.element.offsetHeight - n
                      );
                    break;
                  case J.topRight:
                    this.alignHorizontally(t.x + e.right - e.width / 2),
                      this.alignVertically(
                        t.y + e.top - this.element.offsetHeight - n
                      );
                    break;
                  case J.bottomLeft:
                    this.alignHorizontally(
                      t.x + e.right - this.element.offsetWidth - e.width / 2
                    ),
                      this.alignVertically(t.y + e.bottom + n);
                    break;
                  case J.bottomRight:
                    this.alignHorizontally(t.x + e.right - e.width / 2),
                      this.alignVertically(t.y + e.bottom + n);
                    break;
                  case J.leftTop:
                    this.alignHorizontally(
                      t.x + e.left - this.element.offsetWidth - n
                    ),
                      this.alignVertically(
                        t.y +
                          e.bottom -
                          this.element.offsetHeight -
                          e.height / 2
                      );
                    break;
                  case J.leftBottom:
                    this.alignHorizontally(
                      t.x + e.left - this.element.offsetWidth - n
                    ),
                      this.alignVertically(t.y + e.bottom - e.height / 2);
                    break;
                  case J.rightTop:
                    this.alignHorizontally(t.x + e.right + n),
                      this.alignVertically(
                        t.y +
                          e.bottom -
                          this.element.offsetHeight -
                          e.height / 2
                      );
                    break;
                  case J.rightBottom:
                    this.alignHorizontally(t.x + e.right + n),
                      this.alignVertically(t.y + e.bottom - e.height / 2);
                }
              }
            }),
            (n.prototype.alignHorizontally = function (e) {
              this.element.style.left = e + "px";
            }),
            (n.prototype.alignVertically = function (e) {
              this.element.style.top = e + "px";
            }),
            n
          );
        })(q),
        se = (function (e) {
          function n(t, n, r, s, a, i) {
            var o = e.call(this, t, a) || this;
            return (
              (o.xpath = t),
              (o.htmlContent = n),
              (o.options = r),
              (o.resolveConditions = s),
              (o.trackableContent = i),
              o
            );
          }
          return (
            t(n, e),
            (n.prototype.onResolve = function (t) {
              G.emit(this.getTrackEventFromCondition(t), {
                content: this.trackableContent,
              }),
                e.prototype.onResolve.call(this, t);
            }),
            (n.prototype.getTrackEventFromCondition = function (e) {
              return e.groupId === w.ScenarioClosed
                ? k.TooltipClosed
                : k.TooltipResolved;
            }),
            (n.prototype.buildComponent = function () {
              return new re(
                this.getNode(this.xpath, this.parent),
                this.parent ? this.getNode(this.parent) : void 0,
                this.htmlContent,
                this.options
              );
            }),
            (n.event = _.tooltip),
            n
          );
        })(X),
        ae = (function (e) {
          function n() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            return (t.DEFAULT_ARROW_HEIGHT = 12), t;
          }
          return (
            t(n, e),
            (n.prototype.parse = function (e) {
              return (
                this.validateTooltipActionData(e) ||
                  this.throwParseError(e.event),
                this.getParsedTooltipAction(e)
              );
            }),
            (n.prototype.validateTooltipActionData = function (e) {
              return (
                this.validateXpath(e.xpath) &&
                this.validateHtmlContent(e.htmlContent) &&
                this.validateParent(e)
              );
            }),
            (n.prototype.getParsedTooltipAction = function (e) {
              try {
                var t = e.xpath,
                  n = e.parent,
                  r = e.htmlContent,
                  s = this.parseOptions(e.options),
                  a = this.parseResolveConditions(e.resolveConditions);
                return new se(t, r, s, a, n);
              } catch (t) {
                this.throwParseError(e.event);
              }
            }),
            (n.prototype.validateParent = function (e) {
              return (
                !e.hasOwnProperty("parent") || this.validateXpath(e.parent)
              );
            }),
            (n.prototype.parseOptions = function (e) {
              var t;
              return (
                this.validateTooltipOptions(e) ||
                  this.throwParseError(se.event),
                {
                  position: e.position,
                  className:
                    null !== (t = e.className) && void 0 !== t ? t : "",
                  spaceBetween: e.spaceBetween,
                }
              );
            }),
            (n.prototype.validateTooltipOptions = function (e) {
              var t = e.position;
              return (
                C.isObjectWithKeys(e) &&
                this.validatePosition(t) &&
                C.isEnumValue(t, J) &&
                this.validateTooltipClassName(e) &&
                this.validateSpaceBetween(e)
              );
            }),
            (n.prototype.validateTooltipClassName = function (e) {
              return !e.hasOwnProperty("className") || C.isString(e.className);
            }),
            (n.prototype.validateSpaceBetween = function (e) {
              return (
                e.hasOwnProperty("spaceBetween") ||
                  (e.spaceBetween = this.DEFAULT_ARROW_HEIGHT),
                C.isNumber(e.spaceBetween)
              );
            }),
            n
          );
        })(U),
        ie = (function (e) {
          function n(t, n, r) {
            var s = e.call(this, t, r) || this;
            return (s.timeout = n), s;
          }
          return (
            t(n, e),
            (n.prototype.execute = function () {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (t) {
                  switch (t.label) {
                    case 0:
                      this.setObserver(), (t.label = 1);
                    case 1:
                      return (
                        t.trys.push([1, 3, , 4]),
                        [4, this.domObserver.onElementVisible()]
                      );
                    case 2:
                      return t.sent(), [2, this.handleSuccess()];
                    case 3:
                      return (e = t.sent()), [2, Promise.reject(e)];
                    case 4:
                      return [2];
                  }
                });
              });
            }),
            (n.prototype.setObserver = function () {
              this.disposeObserver(),
                (this.domObserver = new O(
                  this.xpath,
                  this.timeout,
                  this.parent
                ));
            }),
            (n.prototype.disposeObserver = function () {
              var e;
              null === (e = this.domObserver) || void 0 === e || e.dispose();
            }),
            (n.prototype.dispose = function () {
              this.disposeObserver(), e.prototype.dispose.call(this);
            }),
            (n.event = _.waitUntilVisible),
            n
          );
        })(j),
        oe = (function (e) {
          function n() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            t(n, e),
            (n.prototype.parse = function (e) {
              return (
                (this.validateXpath(e.xpath) &&
                  this.validateTimeout(e.timeout)) ||
                  this.throwParseError(ie.event),
                new ie(e.xpath, e.timeout, e.parent)
              );
            }),
            n
          );
        })(N),
        ue = (function (e) {
          function n(t, n) {
            var r = e.call(this, t, n) || this;
            return (r.CLICK_DELAY = 50), r;
          }
          return (
            t(n, e),
            (n.prototype.execute = function () {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (t) {
                  try {
                    return (
                      (e = this.getNodes(this.xpath, this.parent)),
                      this.delayedBatchClick(e, this.CLICK_DELAY),
                      [2, this.handleSuccess()]
                    );
                  } catch (e) {
                    return [2, this.handleFail(n.event, e)];
                  }
                  return [2];
                });
              });
            }),
            (n.prototype.dispose = function () {
              clearTimeout(this.delayTimeout), e.prototype.dispose.call(this);
            }),
            (n.prototype.delayedBatchClick = function (e, t) {
              var n = this;
              e.length &&
                (this.delayTimeout = window.setTimeout(function () {
                  var r = e.shift();
                  n.invokeClick(r), n.delayedBatchClick(e, t);
                }, t));
            }),
            (n.prototype.getNodes = function (e, t) {
              var n = t ? this.getNode(t) : void 0;
              return x.getAllElementsByXpath(e, n);
            }),
            (n.event = _.bulkClick),
            n
          );
        })(H),
        de = (function (e) {
          function n() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            t(n, e),
            (n.prototype.parse = function (e) {
              return (
                this.validateXpath(e.xpath) || this.throwParseError(ue.event),
                new ue(e.xpath, e.parent)
              );
            }),
            n
          );
        })(N),
        le = (function (e) {
          function n() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            t(n, e),
            (n.prototype.parse = function (e) {
              return (
                this.validateXpath(e.xpath) || this.throwParseError(H.event),
                new H(e.xpath, e.parent)
              );
            }),
            n
          );
        })(N),
        ce = (function (e) {
          function n() {
            return e.call(this) || this;
          }
          return (
            t(n, e),
            (n.prototype.execute = function () {
              return i(this, void 0, void 0, function () {
                return o(this, function (e) {
                  return [2, this.handleSuccess(g.stopped)];
                });
              });
            }),
            (n.event = _.stopScenario),
            n
          );
        })(D),
        _e = (function (e) {
          function n(t, n) {
            return e.call(this, t, n) || this;
          }
          return (
            t(n, e),
            (n.prototype.execute = function () {
              return i(this, void 0, void 0, function () {
                return o(this, function (e) {
                  try {
                    return (
                      this.getNode(this.xpath, this.parent),
                      [2, this.handleSuccess()]
                    );
                  } catch (e) {
                    return [2, this.handleFail(_.verifyOk, e)];
                  }
                  return [2];
                });
              });
            }),
            (n.event = _.verifyOk),
            n
          );
        })(j),
        he = (function (e) {
          function n() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            t(n, e),
            (n.prototype.parse = function (e) {
              return (
                this.validateXpath(e.xpath) || this.throwParseError(_e.event),
                new _e(e.xpath, e.parent)
              );
            }),
            n
          );
        })(N),
        me = (function () {
          function e() {
            this.invalidActions = [];
          }
          return (
            (e.prototype.parse = function (e) {
              var t = this;
              if (((this.invalidActions = []), !C.nonEmptyArray(e)))
                throw new m();
              var n = [];
              if (
                (e.forEach(function (e) {
                  try {
                    var r = t.parseAction(e);
                    n.push(r);
                  } catch (e) {
                    t.handleActionError(e);
                  }
                }),
                this.invalidActions.length)
              )
                throw new p(this.invalidActions);
              return n;
            }),
            (e.prototype.parseAction = function (e) {
              switch (
                (e.event || this.throwActionError("unspecified"), e.event)
              ) {
                case H.event:
                  return new le().parse(e);
                case ue.event:
                  return new de().parse(e);
                case A.event:
                  return new F().parse(e);
                case W.event:
                  return new R().parse(e);
                case I.event:
                  return new z().parse(e);
                case Z.event:
                  return new Q().parse(e);
                case ee.event:
                  return new te().parse(e);
                case ce.event:
                  return new ce();
                case se.event:
                  return new ae().parse(e);
                case _e.event:
                  return new he().parse(e);
                case ie.event:
                  return new oe().parse(e);
                default:
                  this.throwActionError(e.event);
              }
            }),
            (e.prototype.handleActionError = function (e) {
              e instanceof E && this.invalidActions.push(e.event);
            }),
            (e.prototype.throwActionError = function (e) {
              throw new E(e);
            }),
            e
          );
        })(),
        pe = (function () {
          function e() {
            var e = this;
            (this.invalidHooks = []),
              (this.parseHooks = function (t, n) {
                var r,
                  s = n,
                  a = null === (r = e.hooks) || void 0 === r ? void 0 : r[s];
                return (
                  a && !a.actions && e.invalidHooks.push(s),
                  a &&
                    !e.invalidHooks.length &&
                    (t[s] = { actions: e.parseHookActions(a) }),
                  t
                );
              });
          }
          return (
            (e.prototype.parse = function (e) {
              this.hooks = e;
              var t = Object.keys(c).reduce(this.parseHooks, {});
              if (this.invalidHooks.length) throw new f(this.invalidHooks);
              return t;
            }),
            (e.prototype.parseHookActions = function (e) {
              return new me().parse(null == e ? void 0 : e.actions);
            }),
            e
          );
        })(),
        fe = new ((function () {
          function e() {
            this.stack = [];
          }
          return (
            (e.prototype.getStack = function () {
              return this.stack;
            }),
            (e.prototype.addActionStack = function (e) {
              this.stack.push(e);
            }),
            (e.prototype.addPageStack = function (e) {
              this.stack.push(e);
            }),
            (e.prototype.clearStack = function () {
              this.stack = [];
            }),
            e
          );
        })())(),
        ye = (function (e) {
          function n(t) {
            var n = e.call(this) || this;
            return (
              (n.groupId = t),
              (n.message =
                'Page group actions could not be executed due to missing "' +
                n.groupId +
                '" group.'),
              n
            );
          }
          return t(n, e), n;
        })(h),
        ge = (function (e) {
          function n(t) {
            var n = e.call(this) || this;
            return (
              (n.target = t),
              (n.message =
                "Page actions could not be executed due to preconditions are not met."),
              n
            );
          }
          return (
            t(n, e),
            Object.defineProperty(n.prototype, "errorDetails", {
              get: function () {
                return [
                  {
                    key: "Preconditions",
                    description: this.getDetailsDescription(),
                  },
                ];
              },
              enumerable: !1,
              configurable: !0,
            }),
            (n.prototype.getDetailsDescription = function () {
              return this.target.query
                ? "Current url and queries doesn't match target \"" +
                    this.target.url +
                    '" and [' +
                    this.target.query.join(", ") +
                    "] queries."
                : "Current url doesn't match target \"" + this.target.url + '"';
            }),
            n
          );
        })(h),
        Me = function (e) {
          this.resolution = e;
        },
        Le = (function () {
          function e(e, t, n) {
            void 0 === n && (n = !1),
              (this.target = e),
              (this.actions = t),
              (this.optional = n);
          }
          return (
            (e.prototype.execute = function () {
              return i(this, void 0, void 0, function () {
                return o(this, function (e) {
                  return this.verifyPreconditions()
                    ? (fe.addPageStack({ target: this.target }),
                      [2, this.executeActions()])
                    : [
                        2,
                        this.optional
                          ? this.handleSuccess()
                          : this.handleError(new ge(this.target)),
                      ];
                });
              });
            }),
            (e.prototype.verifyPreconditions = function () {
              return this.pathnameMatches() && this.queryMatches();
            }),
            (e.prototype.dispose = function () {
              for (var e in (this.disposeActions(), this))
                this.hasOwnProperty(e) && delete this[e];
            }),
            (e.prototype.pathnameMatches = function () {
              var e = window.location.origin + window.location.pathname,
                t = this.target.url;
              return C.isRegex(t) ? new RegExp(t.slice(1)).test(e) : t === e;
            }),
            (e.prototype.queryMatches = function () {
              if (
                void 0 === this.target.query ||
                C.isEmptyArray(this.target.query)
              )
                return !0;
              for (var e = 0, t = this.target.query; e < t.length; e++) {
                var n = t[e];
                if (window.location.search.indexOf(n) >= 0) return !0;
              }
              return !1;
            }),
            (e.prototype.handleSuccess = function (e) {
              return (
                void 0 === e && (e = g.succeeded), Promise.resolve(new Me(e))
              );
            }),
            (e.prototype.handleError = function (e) {
              return Promise.reject(e);
            }),
            e
          );
        })(),
        ve = (function () {
          function e() {}
          return (
            (e.getActionStack = function (e, t) {
              var n = {
                event: t.getEvent(),
                nextGroup: e.nextGroup,
                resolution: e.resolution,
              };
              return t instanceof j ? a(a({}, n), { xpath: t.xpath }) : n;
            }),
            (e.getGroupedActionStack = function (e, t, n) {
              var r = this.getActionStack(e, t);
              return a(a({}, r), { groupId: n });
            }),
            e
          );
        })(),
        Ye = (function (e) {
          function n() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            t(n, e),
            (n.prototype.executeActions = function () {
              return i(this, void 0, void 0, function () {
                var e, t;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        n.trys.push([0, 2, , 3]),
                        [4, this.executeGroupActions("initial")]
                      );
                    case 1:
                      return (e = n.sent()), [3, 3];
                    case 2:
                      return (t = n.sent()), [2, this.handleError(t)];
                    case 3:
                      return [2, this.handleSuccess(e.resolution)];
                  }
                });
              });
            }),
            (n.prototype.disposeActions = function () {
              var e = this;
              this.actions.forEach(function (t) {
                return e.disposeGroupAction(t);
              });
            }),
            (n.prototype.executeGroupActions = function (e) {
              var t, n;
              return i(this, void 0, void 0, function () {
                var r, s, a, i, u, d, c, _;
                return o(this, function (o) {
                  switch (o.label) {
                    case 0:
                      if (!(r = this.getGroupById(e))) throw new ye(e);
                      o.label = 1;
                    case 1:
                      o.trys.push([1, 7, 8, 13]),
                        (a = l(r.actions.entries())),
                        (o.label = 2);
                    case 2:
                      return [4, a.next()];
                    case 3:
                      return (i = o.sent()).done
                        ? [3, 6]
                        : ((u = i.value),
                          (d = u[0]),
                          (c = u[1]),
                          this.isLastAction(c, d, r) &&
                            G.emit(b.onBeforeLastAction, c.getEvent()),
                          [4, this.executeAction(c, e)]);
                    case 4:
                      if ((s = o.sent()).nextGroup)
                        return [2, this.executeGroupActions(s.nextGroup)];
                      if (s.resolution !== g.succeeded) return [3, 6];
                      o.label = 5;
                    case 5:
                      return [3, 2];
                    case 6:
                      return [3, 13];
                    case 7:
                      return (_ = o.sent()), (t = { error: _ }), [3, 13];
                    case 8:
                      return (
                        o.trys.push([8, , 11, 12]),
                        i && !i.done && (n = a.return)
                          ? [4, n.call(a)]
                          : [3, 10]
                      );
                    case 9:
                      o.sent(), (o.label = 10);
                    case 10:
                      return [3, 12];
                    case 11:
                      if (t) throw t.error;
                      return [7];
                    case 12:
                      return [7];
                    case 13:
                      return [2, s];
                  }
                });
              });
            }),
            (n.prototype.getGroupById = function (e) {
              return this.actions.filter(function (t) {
                return t.id === e;
              })[0];
            }),
            (n.prototype.isLastAction = function (e, t, n) {
              var r =
                  e.action instanceof X
                    ? e.action.getResolveConditionsGroupIds()
                    : null,
                s =
                  null == r
                    ? void 0
                    : r.find(function (e) {
                        return (
                          e && e != w.ScenarioClosed && e != w.ScenarioRevoked
                        );
                      });
              return (
                void 0 === e.resolveGroup &&
                t === n.actions.length - 1 &&
                e.getEvent() != _.stopScenario &&
                !s
              );
            }),
            (n.prototype.disposeGroupAction = function (e) {
              e.actions.forEach(function (e) {
                return e.dispose();
              });
            }),
            (n.prototype.executeAction = function (e, t) {
              return i(this, void 0, void 0, function () {
                var n;
                return o(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return [4, e.execute()];
                    case 1:
                      return (
                        (n = r.sent()),
                        fe.addActionStack(ve.getGroupedActionStack(n, e, t)),
                        [2, n]
                      );
                  }
                });
              });
            }),
            n
          );
        })(Le),
        be = (function (e) {
          function n() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            t(n, e),
            (n.prototype.executeActions = function () {
              var e, t, n;
              return i(this, void 0, void 0, function () {
                var r, s, a, i, u, d, c, _;
                return o(this, function (o) {
                  switch (o.label) {
                    case 0:
                      o.trys.push([0, 9, 10, 15]),
                        (s = l(this.actions.entries())),
                        (o.label = 1);
                    case 1:
                      return [4, s.next()];
                    case 2:
                      if ((a = o.sent()).done) return [3, 8];
                      (i = a.value),
                        (u = i[0]),
                        (d = i[1]),
                        this.isLastAction(u) &&
                          G.emit(b.onBeforeLastAction, d.getEvent()),
                        (o.label = 3);
                    case 3:
                      return (
                        o.trys.push([3, 5, , 6]), [4, this.executeAction(d)]
                      );
                    case 4:
                      return (r = o.sent()), [3, 6];
                    case 5:
                      return (c = o.sent()), [2, this.handleError(c)];
                    case 6:
                      if (r.resolution !== g.succeeded) return [3, 8];
                      o.label = 7;
                    case 7:
                      return [3, 1];
                    case 8:
                      return [3, 15];
                    case 9:
                      return (_ = o.sent()), (e = { error: _ }), [3, 15];
                    case 10:
                      return (
                        o.trys.push([10, , 13, 14]),
                        a && !a.done && (t = s.return)
                          ? [4, t.call(s)]
                          : [3, 12]
                      );
                    case 11:
                      o.sent(), (o.label = 12);
                    case 12:
                      return [3, 14];
                    case 13:
                      if (e) throw e.error;
                      return [7];
                    case 14:
                      return [7];
                    case 15:
                      return [
                        2,
                        this.handleSuccess(
                          null !== (n = r.resolution) && void 0 !== n
                            ? n
                            : g.succeeded
                        ),
                      ];
                  }
                });
              });
            }),
            (n.prototype.disposeActions = function () {
              this.actions.forEach(function (e) {
                return e.dispose();
              });
            }),
            (n.prototype.executeAction = function (e) {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return [4, e.execute()];
                    case 1:
                      return (
                        (t = n.sent()),
                        fe.addActionStack(ve.getActionStack(t, e)),
                        [2, t]
                      );
                  }
                });
              });
            }),
            (n.prototype.isLastAction = function (e) {
              return e === this.actions.length - 1;
            }),
            n
          );
        })(Le),
        ke = (function (e) {
          function n() {
            var t = e.call(this) || this;
            return (
              (t.message =
                'Unable to parse the page - either define "actions" or "groupedActions" both of them are not supported in single page.'),
              t
            );
          }
          return t(n, e), n;
        })(h),
        we = (function () {
          function e(e, t, n) {
            (this.action = e), (this.resolveGroup = t), (this.rejectGroup = n);
          }
          return (
            (e.prototype.getEvent = function () {
              return this.action.getEvent();
            }),
            (e.prototype.execute = function () {
              return i(this, void 0, void 0, function () {
                var e, t, n;
                return o(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return (
                        r.trys.push([0, 2, , 3]), [4, this.action.execute()]
                      );
                    case 1:
                      return (
                        (e = r.sent()),
                        (t = e.nextGroup
                          ? e
                          : new L(e.resolution, this.resolveGroup)),
                        [2, this.handleSuccess(t)]
                      );
                    case 2:
                      return (
                        (n = r.sent()),
                        this.rejectGroup
                          ? [
                              2,
                              this.handleSuccess(
                                new L(g.succeeded, this.rejectGroup)
                              ),
                            ]
                          : [2, this.handleError(n)]
                      );
                    case 3:
                      return [2];
                  }
                });
              });
            }),
            (e.prototype.dispose = function () {
              var e;
              for (var t in (null === (e = this.action) ||
                void 0 === e ||
                e.dispose(),
              this))
                this.hasOwnProperty(t) && delete this[t];
            }),
            (e.prototype.handleSuccess = function (e) {
              return Promise.resolve(e);
            }),
            (e.prototype.handleError = function (e) {
              return Promise.reject(new M(this.getEvent(), e));
            }),
            e
          );
        })(),
        De = (function (e) {
          function n(t) {
            void 0 === t && (t = new me());
            var n = e.call(this) || this;
            return (n.actionParser = t), n;
          }
          return (
            t(n, e),
            (n.prototype.parse = function (e) {
              if (!C.nonEmptyArray(e)) throw new m();
              return this.parseGroupedActions(e);
            }),
            (n.prototype.parseGroupedActions = function (e) {
              var t = this;
              return e.map(function (e) {
                var n = t.actionParser.parse(e.actions),
                  r = t.decorateGroupActions(n, e.actions);
                return { id: e.id, actions: r };
              });
            }),
            (n.prototype.decorateGroupActions = function (e, t) {
              return e.map(function (e, n) {
                var r = t[n],
                  s = r.resolveGroup,
                  a = r.rejectGroup;
                return new we(e, s, a);
              });
            }),
            n
          );
        })(N),
        Te = (function () {
          function e(e) {
            void 0 === e && (e = new me()), (this.actionParser = e);
          }
          return (
            (e.prototype.parse = function (e) {
              var t = this.getParsedPageTarget(e.target);
              if (!this.validateIsOptional(e)) throw new y();
              var n = e.hasOwnProperty("actions"),
                r = e.hasOwnProperty("groupedActions");
              if (n && r) throw new ke();
              return n
                ? new be(t, this.parseActions(e.actions), e.optional)
                : new Ye(
                    t,
                    this.parseGroupedActions(e.groupedActions),
                    e.optional
                  );
            }),
            (e.prototype.getParsedPageTarget = function (e) {
              if (this.isValidUrlOrRegex(e)) return { url: e };
              if (this.isValidPageTarget(e)) return e;
              throw new y();
            }),
            (e.prototype.isValidPageTarget = function (e) {
              return (
                C.isObjectWithKeys(e) &&
                this.isValidUrlOrRegex(e.url) &&
                this.validatePageTargetQueries(e)
              );
            }),
            (e.prototype.isValidUrlOrRegex = function (e) {
              return C.isValidUrl(e) || C.isRegex(e);
            }),
            (e.prototype.validatePageTargetQueries = function (e) {
              if (void 0 === e.query) return !0;
              if (!C.isArray(e.query)) return !1;
              for (var t = 0, n = e.query; t < n.length; t++) {
                var r = n[t];
                if (!C.isQueryString(r)) return !1;
              }
              return !0;
            }),
            (e.prototype.validateIsOptional = function (e) {
              return !e.hasOwnProperty("optional") || C.isBoolean(e.optional);
            }),
            (e.prototype.parseActions = function (e) {
              return this.actionParser.parse(e);
            }),
            (e.prototype.parseGroupedActions = function (e) {
              return new De(this.actionParser).parse(e);
            }),
            e
          );
        })(),
        Se = (function (e) {
          function n(t) {
            var n = e.call(this) || this;
            return (n.resolution = t), (n.message = "Hook type is unknown."), n;
          }
          return (
            t(n, e),
            Object.defineProperty(n.prototype, "errorDetails", {
              get: function () {
                return [
                  {
                    key: "Hook",
                    description:
                      "Hook type for '" +
                      this.resolution +
                      "' resolution is unknown.",
                  },
                ];
              },
              enumerable: !1,
              configurable: !0,
            }),
            n
          );
        })(h),
        xe = (function () {
          function e(e, t, n) {
            (this.name = e), (this.scenarioPages = t), (this.hooks = n);
          }
          return (
            (e.prototype.run = function () {
              return i(this, void 0, void 0, function () {
                return o(this, function (e) {
                  return [2, this.executePages()];
                });
              });
            }),
            (e.prototype.getHookType = function (e) {
              switch (e.resolution) {
                case g.succeeded:
                  return c.onSuccess;
                case g.stopped:
                case g.terminated:
                  return c.onStop;
                default:
                  throw new Se(e.resolution);
              }
            }),
            (e.prototype.executeHook = function (e) {
              var t;
              return i(this, void 0, void 0, function () {
                var n, r, s;
                return o(this, function (a) {
                  switch (a.label) {
                    case 0:
                      if (
                        !(n =
                          null === (t = this.hooks) || void 0 === t
                            ? void 0
                            : t[e])
                      )
                        return [2];
                      (r = 0), (s = n.actions), (a.label = 1);
                    case 1:
                      return r < s.length ? [4, s[r].execute()] : [3, 4];
                    case 2:
                      a.sent(), (a.label = 3);
                    case 3:
                      return r++, [3, 1];
                    case 4:
                      return [2];
                  }
                });
              });
            }),
            (e.prototype.disposeActions = function () {
              this.scenarioPages.forEach(function (e) {
                return e.disposeActions();
              });
            }),
            (e.prototype.disposeHookActions = function (e) {
              e.actions.forEach(function (e) {
                return e.dispose();
              });
            }),
            (e.prototype.dispose = function () {
              for (var e in (this.scenarioPages.forEach(function (e) {
                return e.dispose();
              }),
              this.hooks &&
                Object.values(this.hooks).forEach(this.disposeHookActions),
              this))
                this.hasOwnProperty(e) && delete this[e];
            }),
            (e.prototype.executePages = function () {
              return i(this, void 0, void 0, function () {
                var e, t, n, r, s;
                return o(this, function (a) {
                  switch (a.label) {
                    case 0:
                      (t = 0), (n = this.scenarioPages), (a.label = 1);
                    case 1:
                      if (!(t < n.length)) return [3, 7];
                      (r = n[t]), (a.label = 2);
                    case 2:
                      return a.trys.push([2, 4, , 5]), [4, r.execute()];
                    case 3:
                      return (e = a.sent()), [3, 5];
                    case 4:
                      return (s = a.sent()), [2, this.handleError(s)];
                    case 5:
                      if (e.resolution !== g.succeeded) return [3, 7];
                      a.label = 6;
                    case 6:
                      return t++, [3, 1];
                    case 7:
                      return [
                        2,
                        this.handleSuccess(
                          new Y(this.name, e.resolution, fe.getStack())
                        ),
                      ];
                  }
                });
              });
            }),
            (e.prototype.handleSuccess = function (e) {
              return Promise.resolve(e);
            }),
            (e.prototype.handleError = function (e) {
              return Promise.reject(e);
            }),
            e
          );
        })(),
        je = (function (e) {
          function n(t, n) {
            void 0 === t && (t = new Te()), void 0 === n && (n = new pe());
            var r = e.call(this) || this;
            return (r.pageParser = t), (r.hooksParser = n), r;
          }
          return (
            t(n, e),
            (n.prototype.parseScenario = function (e) {
              var t = e.name,
                n = e.pages,
                r = e.hooks;
              this.validateScenarioName(t);
              var s = this.getParsedPages(n),
                a = this.hooksParser.parse(r);
              return (
                this.invalidKeys.length && this.throwHandledError(t),
                new xe(t, s, a)
              );
            }),
            (n.prototype.validateScenarioName = function (e) {
              C.nonEmptyString(e) ||
                this.pushInvalidKey(
                  r.name,
                  "The Scenario name was either not provided or the value is valid."
                );
            }),
            (n.prototype.getParsedPages = function (e) {
              var t = this;
              if (!C.nonEmptyArray(e))
                return (
                  this.pushInvalidKey(
                    r.pages,
                    "The Scenario pages are either not provided or the value is valid."
                  ),
                  []
                );
              var n = [];
              return (
                e.forEach(function (e) {
                  try {
                    n.push(t.pageParser.parse(e));
                  } catch (e) {
                    t.handleParsePageError(e);
                  }
                }),
                n
              );
            }),
            (n.prototype.handleParsePageError = function (e) {
              return e instanceof y
                ? this.pushInvalidKey(s.target, e.message)
                : e instanceof m || e instanceof p
                ? this.pushInvalidKey(s.actions, e.message)
                : e instanceof f
                ? this.pushInvalidKey(s.hooks, e.message)
                : void this.pushInvalidKey(r.pages, e.message);
            }),
            n
          );
        })(
          (function () {
            function e() {
              this.invalidKeys = [];
            }
            return (
              (e.prototype.parse = function (e) {
                return (
                  (this.invalidKeys = []),
                  (this.sourceData = this.parseSourceData(e)),
                  C.isObjectWithKeys(this.sourceData) ||
                    this.throwInvalidSourceData(),
                  this.parseScenario(this.sourceData)
                );
              }),
              (e.prototype.parseSourceData = function (e) {
                try {
                  return C.isString(e) ? JSON.parse(e) : e;
                } catch (e) {
                  this.throwInvalidSourceData();
                }
              }),
              (e.prototype.pushInvalidKey = function (e, t) {
                this.invalidKeys.push({ key: e, description: t });
              }),
              (e.prototype.throwInvalidSourceData = function () {
                this.pushInvalidKey(
                  "source-data",
                  "The Scenario is not valid JSON or an Object."
                ),
                  this.throwHandledError();
              }),
              (e.prototype.throwHandledError = function (e) {
                throw (
                  (void 0 === e && (e = "Unknown"),
                  (this.sourceData = void 0),
                  new v(e, this.invalidKeys))
                );
              }),
              e
            );
          })()
        ),
        He = (function (e) {
          function n(t, n) {
            void 0 === t && (t = "unknown"), void 0 === n && (n = "unknown");
            var r = e.call(this) || this;
            return (
              (r.caller = t),
              (r.methodName = n),
              (r.message =
                "Scenario has not been initiated or it has been already disposed."),
              r
            );
          }
          return (
            t(n, e),
            Object.defineProperty(n.prototype, "errorDetails", {
              get: function () {
                return [
                  {
                    key: this.caller,
                    description:
                      'Method "' +
                      this.methodName +
                      "\" couldn't be executed without the scenario",
                  },
                ];
              },
              enumerable: !1,
              configurable: !0,
            }),
            n
          );
        })(h),
        Pe = (function (e) {
          function n(t) {
            var n = e.call(this) || this;
            return (
              (n.failReason = t),
              (n.message = "An unhandled exception occurred."),
              n
            );
          }
          return (
            t(n, e),
            Object.defineProperty(n.prototype, "errorDetails", {
              get: function () {
                return [
                  {
                    key: this.failReason.name,
                    description: this.failReason.message,
                    failReason: this.failReason,
                  },
                ];
              },
              enumerable: !1,
              configurable: !0,
            }),
            n
          );
        })(h),
        Oe = (function () {
          function e(e) {
            (this.parser = e), (this.eventEmitter = G);
          }
          return (
            (e.prototype.initiateScenario = function (e) {
              return i(this, void 0, void 0, function () {
                var t;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        n.trys.push([0, 2, , 4]), [4, this.disposeScenario()]
                      );
                    case 1:
                      return (
                        n.sent(),
                        (this.scenario = this.getParsedScenario(e)),
                        [3, 4]
                      );
                    case 2:
                      return (t = n.sent()), [4, this.handleError(t)];
                    case 3:
                      return n.sent(), [3, 4];
                    case 4:
                      return [2];
                  }
                });
              });
            }),
            (e.prototype.start = function () {
              return i(this, void 0, void 0, function () {
                var e, t;
                return o(this, function (n) {
                  switch (n.label) {
                    case 0:
                      if (!this.scenario)
                        return [
                          2,
                          this.handleError(
                            new He(this.constructor.name, "start")
                          ),
                        ];
                      n.label = 1;
                    case 1:
                      return n.trys.push([1, 3, , 4]), [4, this.scenario.run()];
                    case 2:
                      return (e = n.sent()), [2, this.handleSuccess(e)];
                    case 3:
                      return (t = n.sent()), [2, this.handleError(t)];
                    case 4:
                      return [2];
                  }
                });
              });
            }),
            (e.prototype.stop = function () {
              return i(this, void 0, void 0, function () {
                var e;
                return o(this, function (t) {
                  return this.scenario
                    ? (this.scenario.disposeActions(),
                      (e = new Y(
                        this.scenario.name,
                        g.terminated,
                        fe.getStack()
                      )),
                      [2, this.handleSuccess(e)])
                    : [
                        2,
                        this.handleError(new He(this.constructor.name, "stop")),
                      ];
                });
              });
            }),
            (e.prototype.handleSuccess = function (e) {
              var t, n;
              return i(this, void 0, void 0, function () {
                var r;
                return o(this, function (s) {
                  switch (s.label) {
                    case 0:
                      return (
                        s.trys.push([0, 2, 4, 6]),
                        [
                          4,
                          null === (t = this.scenario) || void 0 === t
                            ? void 0
                            : t.executeHook(this.scenario.getHookType(e)),
                        ]
                      );
                    case 1:
                    case 3:
                      return s.sent(), [3, 6];
                    case 2:
                      return (r = s.sent()), [4, this.handleError(r)];
                    case 4:
                      return [
                        4,
                        null === (n = this.scenario) || void 0 === n
                          ? void 0
                          : n.executeHook(c.onDisposed),
                      ];
                    case 5:
                      return s.sent(), [7];
                    case 6:
                      return [4, this.disposeScenario()];
                    case 7:
                      return s.sent(), [2, Promise.resolve(e)];
                  }
                });
              });
            }),
            (e.prototype.handleError = function (e) {
              var t;
              return i(this, void 0, void 0, function () {
                var n, r;
                return o(this, function (s) {
                  switch (s.label) {
                    case 0:
                      return (
                        (n = e instanceof h ? e : new Pe(e)),
                        (r = Y.buildFailedResult(
                          this.scenario,
                          n,
                          fe.getStack()
                        )),
                        this.eventEmitter.emit(b.onError, r),
                        [
                          4,
                          null === (t = this.scenario) || void 0 === t
                            ? void 0
                            : t.executeHook(c.onFailed),
                        ]
                      );
                    case 1:
                      return s.sent(), [2, Promise.reject(r)];
                  }
                });
              });
            }),
            (e.prototype.disposeScenario = function () {
              return i(this, void 0, void 0, function () {
                return o(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return this.scenario ? [4, this.scenario.dispose()] : [2];
                    case 1:
                      return (
                        e.sent(), (this.scenario = void 0), fe.clearStack(), [2]
                      );
                  }
                });
              });
            }),
            (e.prototype.getParsedScenario = function (e) {
              return this.parser.parse(e);
            }),
            e
          );
        })(),
        Ae = (function () {
          function e() {}
          return (
            (e.logResult = function (e) {
              if (e.resolution === g.failed) return this.logFailedResult(e);
            }),
            (e.logFailedResult = function (e) {
              var t = e.error;
              e.scenarioName, null == t || t.name, null == t || t.message;
              (null == t ? void 0 : t.details) &&
                this.logErrorDetails(t.details);
            }),
            (e.logErrorDetails = function (e) {
              var t = this;
              e.forEach(function (e) {
                return e.failReason
                  ? t.logErrorFailReason(e)
                  : t.logErrorMessage(e.key, e.description);
              });
            }),
            (e.logErrorFailReason = function (e) {}),
            (e.logErrorMessage = function (e, t) {}),
            (e.errorLabelStyle =
              "background: #d5322a; color: #fff; padding: 2px; font-weight: bold"),
            (e.errorBodyStyle =
              "background: #fff0f0; color: #d5322a; padding: 2px;"),
            e
          );
        })(),
        Ee = n(6146);
      const Ce = JSON.parse(
        '{"aos":"Avast Online Security & Privacy","onboarding.firefox.permission":"we need your permission","onboarding.firefox.button3":"Close","onboarding.firefox.button2":"Close extension","onboarding.firefox.button1":"Allow","onboarding.firefox.text":"Allow our extension to protect you from online trackers and unsafe sites as you browse the web. For more info, see our <a href=\\"https://addons.mozilla.org/firefox/addon/avast-online-security/privacy\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Privacy Policy</a>","onboarding.firefox.header":"Let us protect you online?","onboarding.guides.text":"We’ve chosen this step-by-step guide to help you hide your online tracks from %s in just a few minutes. Simply start or <a id=\\"action-link\\" class=\\"a\\">choose a different guide</a>","onboarding.guides.header":"Let’s improve your privacy on %s","onboarding.advertisers.error.text":"Sorry, we weren’t able to opt you out from these advertisers this time. Let’s try it again.","onboarding.advertisers.error.header":"Let’s try it again?","onboarding.advertisers.partial.text":"This means you’ve gotten rid of some of those advertising companies that were collecting your private data. If any new ones appear, we’ll automatically opt you out. Check this page anytime by clicking on the extension. ","onboarding.advertisers.partial.header":"You’re free from <b>some advertisers</b>","onboarding.advertisers.success.text":"This means you’ve gotten rid of those advertising companies that were collecting your private data. If any new ones appear, we’ll automatically opt you out. Check this page anytime by clicking on the extension. ","onboarding.advertisers.success.header":"You’re free from <b>all advertisers!</b>","onboarding.advertisers.text":"Advertisers are constantly collecting info about you, your shopping habits, and more to target you with ads.  Simply opt out of their database to protect your online privacy.  Keep in mind that opting out isn’t reversible.","onboarding.advertisers.header":"Opt out from these advertisers?","onboarding.tracking.text":"Be shielded as you browse the web against advertisers who want to collect your data. We also use GPC to make all sites you visit aware of your privacy preferences and respect it. Learn more about <a class=\\"a\\" href=\\"https://globalprivacycontrol.org/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Global Privacy Control</a>","onboarding.tracking.header":"Limit advertisers from tracking your online data and habits?","onboarding.tabs.guides":"Use a privacy guide","onboarding.tabs.advertisers":"Opt out from advertisers","onboarding.tabs.step":"Step %s","onboarding.tabs.tracking":"Limit tracking","onboarding.text":"Take one minute to quickly boost your privacy as you browse the web. Not this time? Skip it and use our default settings instead.","onboarding.header":"Let\'s set up your privacy","onboarding.greeting":"Hey there","postUpdate.button":"set up now","postUpdate.text5":"Quickly set up your privacy preferences now?","postUpdate.text4":"<b>Global Privacy Control</b> communicates your privacy preferences to the websites you visit, so you don’t need to mess around with your privacy settings.","postUpdate.text3":"<b>Privacy Advisor</b> helps you optimize your privacy settings in seconds, across your favorite platforms.","postUpdate.text2":"Welcome to a brand-new look for Avast, and a beautifully smooth user experience. We believe everyone has a right to live freely online, so we’ve added new privacy features that we think you’re going to like.","postUpdate.text1":"So what\'s new?","postUpdate.header":"You\'ve just updated to the <b>latest version</b>","home.banner.getAvastOne.text":"Download Free Avast One","home.banner.getAvastOne.header":"Take one more step to powerful protection","home.notSafe.text":"Careful, we just found some bad code here that may try to steal your sensitive info (like passwords and credit cards) when you enter the site.","home.notSafe.header":"This website <b>is not safe</b>","home.tracking.text":"We’re constantly scanning the web and found a website that is allowing trackers to identify you online.","home.tracking.header":"This website <b>can track</b> you online","home.good.text":"We’re constantly scanning the web and haven’t found anything bad here that’s trying to get your info.","home.good.header":"Everything <b>looks good!</b>","tracking.tooltip.detected":"Tracker detected","tracking.tooltip.allowed":"Allowed tracker","tracking.tooltip.blocked":"Blocked tracker","tracking.allowed":"%s allowed","tracking.detected":"%s detected","tracking.blocked":"%s blocked","tracking.other":"Other","tracking.webAnalytics":"Web analytics","tracking.adTracking":"Ad tracking","tracking.socialNetworks":"Social networks","tracking.number.detected":"%s trackers detected on %s","tracking.notFound":"No trackers found","tracking.found":"%s trackers found on %s","tracking.banner.button.getAntiTrack":"Get AntiTrack","tracking.statistics.button.antiTrack":"View in AntiTrack","tracking.text.getAntiTrack":"Get Avast AntiTrack to turn on tracking prevention and automatically block trackers as you browse the web.","tracking.banner.button.getAvastOne":"Get Avast One","tracking.banner.button.goPremium":"Go premium","tracking.banner.text":"Stop being followed by data collection companies and prevent invasive personalized advertising.","tracking.banner.header":"Be more private online","tracking.text.getAvastOne":"Get Avast One Premium to turn on tracking prevention and automatically block trackers as you browse the web.","tracking.statistics.button.avastOne":"View in Avast One","tracking.statistics.text":"total trackers blocked so far","tracking.text":"Keep this on to automatically block trackers as you browse the web.","tracking.header":"Prevent tracking on all websites","tracking":"Anti-tracking","advertisers.footer.tryAgain":"Try again","advertisers.footer.button":"Opt out","advertisers.footer.error":"Sorry, we weren’t able to opt you out from these advertisers this time.","advertisers.footer.optingOut":"Opting out is in progress.","advertisers.new.text":"Turn us back on to automatically opt you out.","advertisers.new.header":"%s new advertiser ready for opt out","advertisers.new.header_plural":"%s new advertisers ready for opt out","advertisers.kept.text":"You’ll still receive personalized offers from them.","advertisers.kept.header":"You’ve kept %s advertising company","advertisers.kept.header_plural":"You’ve kept %s advertising companies","advertisers.success.text":"You’ll no longer receive personalized offers from these companies.","advertisers.success.header":"Successfully opted out from %s advertiser","advertisers.success.header_plural":"Successfully opted out from %s advertisers","advertisers.text.off":"Turn this back on anytime to automatically opt out and stop new advertisers from using your data.","advertisers.text.on":"Keep this on to automatically opt out from new advertisers and protect your online privacy.","advertisers.header":"Opt out from all new advertisers","advertisers.optingOut":"Opting you out... Go on and we’ll let you know when it’s done!","advertisers.time":"This process may take a minute.","advertisers":"Ads opt out","guides.badge.minutes":"%s min","guides.tooltip":"Click to open in a new browser tab.","guides.tabs.completed":"Completed guides","guides.tabs.explore":"Guides to explore","guides.text":"Quickly improve your privacy across your online accounts with our interactive step-by-step guides. Click on any of the guides below to begin in a new browser tab.","guides":"Privacy Advisor","support.text":"Take a look at our support page to find the answers you’re looking for.","support.header":"Need some help?","support":"Support","settings.notifications":"Change notification preferences","settings.improve.text":"Contribute to improving our products and creating a better experience for Avast users like you. We’ll never send this data to third-party analytic tools. See our <a href=\\"https://www.avast.com/products-policy\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Product Policy</a>","settings.improve.header":"Help us improve by sharing your usage data with us","settings.gpc.text":"Join over 40 million users worldwide with this extension that helps you automatically make sites you visit aware of unwanted tracking so they can respect it. <a href=\\"https://globalprivacycontrol.org/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Learn more about GPC</a>","settings.gpc.header":"Enable Global Privacy Control (GPC)","settings.guides.text":"Show a message when you visit a website we have a specific privacy guide for.","settings.guides.header":"Offer contextual privacy guides","settings.tracker.text":"Add a badge to your browser to display the number of trackers on any website.","settings.tracker.header":"Show tracker count on extension icon","settings.search.text":"Get warning labels to see which search results are safe to click on.","settings.search.header":"Scan my search results","settings":"Settings","common.header.button.getAvastOne":"Get Avast One","common.header.button.upgrade":"Upgrade","common.toaster.getAvastOne.secondaryButton":"Not now","common.toaster.getAvastOne.primaryButton":"Download Free Avast One","common.toaster.getAvastOne.text":"Avast One is the all-in-one service that delivers comprehensive protection with an award-winning antivirus, VPN, data breach monitoring, and device cleanup tools.","common.toaster.getAvastOne.heading":"Take one more step to powerful protection with Avast One","error.cantFix.text":"Sorry about this, we’ll need some time to figure this out. Try again in a bit?","error.cantFix.header":"There’s an error on our side","error.inline.text":"We\'ve run into a few issues but don\'t worry, just reload your extension to keep being safe online.","error.inline.header":"Try reloading your extension","error.button":"Reload extension","error.text":"We’ve run into a few issues but don’t worry, just reload to continue being safe online. If the issue persists, try restarting your browser or computer.","error.header":"Try reloading extension","fullscreen.malware.text":"We\'ve found <b>malicious code</b> on this website that could harm your computer or steal your private data.  We recommend avoiding the site completely.","fullscreen.phishing.text":"This is a <b>phishing site</b> – a fake site that tries to steal your sensitive info (passwords, credit card numbers, and more).  We recommend avoiding the site completely.","fullscreen.malicious.header":"Hold on, this <b>website isn’t safe</b>","banner.avastone.guides":"Get 30+ desktop and mobile privacy guides with Avast One","banner.breachGuard.guides":"Get 30+ desktop and mobile privacy guides with Avast BreachGuard","banner.breachGuard.advertisers":"Crank it up a notch and opt out from <b>%s data brokers</b> with Avast BreachGuard","banner.antiTrack":"Go beyond regular tracking protection with Avast AntiTrack","banner.feedback.text":"Take a 1-minute survey","banner.feedback.header":"Help us improve this product for you","banner.checkOutGuides":"Check out our Privacy Advisor.","tooltip.searching.notSafe":"This website is not safe","tooltip.searching.safe":"This website is safe","tooltip.settings":"Customize your experience with Avast Online Security & Privacy.","tooltip.support":"Visit our Support Center.","tooltip.guides":"Use interactive guides to improve your online privacy.","tooltip.advertisers":"Send requests to advertisers to stop using your data.","tooltip.tracking":"Prevent tracking on websites you visit with this browser.","button.continueAnyway":"Continue anyway","button.avoidSite":"Avoid site","button.support":"Visit our Support Center","button.learnMore":"Learn more","button.leaveWebsite":"Leave website","button.viewAllowedTrackers":"View allowed trackers","button.viewBlockedTrackers":"View blocked trackers","button.startGuide":"Yes, start guide","button.notNow":"Not now","button.tryAgain":"Try again now","button.next":"Next","button.nextStep":"Next step","button.maybeLater":"Maybe later","button.optOut":"Opt out now","button.noThanks":"No thanks","button.limitTrackers":"Yes, limit all trackers","button.skip":"Skip it","button.ready":"I\'m ready","promo.one.text":"Avast One is the free all-in-one service that combines an award-winning antivirus with VPN, speed-up, and security tools to help you stay private and safe.","promo.one":"Get essential protection with Avast One","promo.antiTrack.text":"Disguise your online profile so snoops can’t track you or collect and share your data with 3rd parties.","promo.antiTrack":"AntiTrack","promo.breachGuard.text":"Get 24/7 protection against data breaches and leaks of your personal information.","promo.breachGuard":"BreachGuard","promo.vpn.text":"Connect safely to any network, even unsecured public Wi-Fi, and access your favorite content from anywhere.","promo.vpn":"SecureLine VPN","promo.button":"Learn more","promo.header":"A small step for you, a giant leap for your privacy","empty.button":"Send feedback","empty.text":"If you’d like to share your experience with us, please click on the feedback button below.","empty.header":"Hello!","reload.button":"Reload now","reload.text":"Don’t forget to save any unfinished data you might have on the page.","reload.header":"Please reload the current page to open the extension","welcome.extension.header.edge":"Find your extension up here","welcome.extension.text.firefox":"Just click the <span id=\\"avast-icon\\"></span> on any website to start using Avast Online Security & Privacy.","welcome.extension.header.firefox":"Find your add-on up here","welcome.extension.text":"Just click the <span id=\\"extension-icon\\"></span> above and use the <span id=\\"pin-icon\\"></span> to keep it visible in your browser for easy access.","welcome.extension.header":"Keep your extension visible","welcome.button2":"Open STARTER Guide","welcome.button1":"set up now","welcome.text4":"Need help getting started?","welcome.text3":"Set up your privacy in a few clicks?","welcome.text2":"Start browsing the web with total confidence, privacy, and security. Not sure how to use our extension? Take a look at our starter guide below.","welcome.text1":"Congrats! Don’t forget to set up your privacy and begin using Avast Online Security & Privacy as you browse the web.","welcome.header":"Installed <b>successfully</b>"}'
      );
      class Ne {
        constructor(e, t = null) {
          (this.avastWRC = e),
            (this.translations = t),
            (this.CDN_TRANSLATIONS_URL =
              "https://s-install.avcdn.net/aos/assets/prod/translations"),
            (this.api = e.Api),
            (this.locale = this.getDefaultLocale()),
            this.api.runtime.onMessage.addListener(this.onMessage.bind(this));
        }
        static async create(e, t = null) {
          const n = new Ne(e, t);
          return await n.init(), n;
        }
        static getTrackingTranslation(e) {
          const t = Ee.ZP.nlsRaw(e, "en");
          return t && Array.isArray(t) ? t[0] : t;
        }
        async init() {
          await this.registerI18nLocales();
        }
        translate(e, t = []) {
          return Ee.ZP.nls(e, ...t);
        }
        getLanguage() {
          const e = this.api.i18n.getUILanguage(),
            t = e.substring(0, 2);
          return { locale: e, code: t };
        }
        onMessage(e, t, n) {
          if (e === Fe.GET_TRANSLATIONS) n(this.translations);
        }
        async getTranslations() {
          const [e, t, n] = await Promise.all([
            this.fetchTranslation(
              `${this.CDN_TRANSLATIONS_URL}/Locale-en.json`
            ),
            this.fetchTranslation(
              this.api.runtime.getURL(`./locales/Locale-${this.locale}.json`)
            ),
            this.fetchTranslation(
              `${this.CDN_TRANSLATIONS_URL}/Locale-${this.locale}.json`
            ),
          ]);
          return {
            en: { translation: Object.assign(Object.assign({}, Ce), e) },
            [this.locale]: {
              translation: Object.assign(Object.assign({}, t), n),
            },
          };
        }
        async fetchTranslation(e) {
          return fetch(e)
            .then((e) => e.json())
            .catch(() => {});
        }
        async registerI18nLocales() {
          this.translations ||
            (this.translations = { resources: await this.getTranslations() }),
            await Ee.ZP.register(this.translations),
            (Ee.ZP.locale = this.locale);
        }
        getDefaultLocale() {
          const { locale: e } = this.getLanguage();
          return e || "en";
        }
      }
      var Fe, We, Re;
      !(function (e) {
        e.GET_TRANSLATIONS = "localization.getTranslations";
      })(Fe || (Fe = {})),
        (function (e) {
          e.OpenPreferences = "scenario.openPreferences";
        })(We || (We = {}));
      class Ie extends Z {
        buildComponent() {
          return new ze(this.content, this.className);
        }
      }
      class ze extends K {
        render() {
          super.render(),
            [...document.getElementsByClassName(Re.OpenPreferences)].forEach(
              (e) => {
                this.addDomListener(e, "click", this.onClick);
              }
            );
        }
        onClick() {
          G.emit(We.OpenPreferences);
        }
      }
      !(function (e) {
        e.OpenPreferences = "open-preferences";
      })(Re || (Re = {}));
      class Ue extends Q {
        parse(e) {
          return (
            this.validateNotificationData(e) || this.throwParseError(e.event),
            this.getParsedNotificationAction(e)
          );
        }
        parseHtmlContent(e) {
          if (!this.validateHtmlContent(e.componentData)) throw new Error();
          const {
            label: t,
            heading: n,
            minutes: r,
            body: s,
            button: a,
            secondaryButton: i,
          } = e.componentData;
          return `\n\t\t\t${this.renderOverlay(
            e
          )}\n\n\t\t\t<aside class='aos-notification'>\n\t\t\t\t<header>\n\t\t\t\t\t<h2>${(0,
          Ee.hd)(
            t
          )}</h2>\n\t\t\t\t\t<button class='close-icon'></button>\n\t\t\t\t</header>\n\n\t\t\t\t<div class='illustration'></div>\n\n\t\t\t\t<div class='component-body'>\n\t\t\t\t\t${this.renderBadge(
            e.className,
            r
          )}\n\t\t\t\t\t${this.renderHeading(n)}\n\t\t\t\t\t<p>${(0, Ee.hd)(
            s
          )}</p>\n\t\t\t\t\t${this.renderButtonWrap(
            a
          )}\n\t\t\t\t\t${this.renderSecondaryButtonWrap(
            i
          )}\n\t\t\t\t\t${this.renderActionLink(
            e.className
          )}\n\t\t\t\t</div>\n\t\t\t</aside>\n\t\t`;
        }
        renderOverlay(e) {
          return !e.hasOwnProperty("showOverlay") || e.showOverlay
            ? '<div class="aos-overlay"></div>'
            : "";
        }
        renderHeading(e) {
          return e ? `<h3>${(0, Ee.hd)(e)}</h3>` : "";
        }
        renderButtonWrap(e) {
          if (!e) return "";
          const t = e.isClose ? "close-button" : "";
          return `\n\t\t\t<div class='button-wrap'>\n\t\t\t\t<a ${
            e.href && `href=${e.href}`
          } class="${t}" id='aos-init-guide'>${(0, Ee.hd)(
            e.text
          )}</a>\n\t\t\t</div>\n\t\t`;
        }
        renderSecondaryButtonWrap(e) {
          return e
            ? `\n\t\t\t<div class='button-wrap'>\n\t\t\t\t<a class='aos-secondary-button' ${
                e.href && `href=${e.href}`
              } id='aos-init-guide'>${(0, Ee.hd)(
                e.text
              )}</a>\n\t\t\t</div>\n\t\t`
            : "";
        }
        renderBadge(e, t) {
          return e.includes("trigger-notification")
            ? `\n\t\t\t<span class='badge'>${(0, Ee.hd)(
                "guides.notification.minutes",
                t
              )}</span>\n\t\t`
            : "";
        }
        renderActionLink(e) {
          return e.includes("trigger-notification")
            ? `\n\t\t\t<a class='a preferences ${Re.OpenPreferences}'>${(0,
              Ee.hd)("settings.notifications")}</a>\n\t\t`
            : "";
        }
        validateNotificationData(e) {
          return this.validateActionClassName(e);
        }
        getParsedNotificationAction(e) {
          try {
            const t = `aos-component aos-notification-component ${
                e.className || ""
              }`,
              n = this.parseResolveConditions(e.resolveConditions).concat(
                this.getCustomCloseConditions(e)
              ),
              r = this.getTrackableContent(e.componentData);
            return new Ie(this.parseHtmlContent(e), t, n, r);
          } catch (t) {
            this.throwParseError(e.event);
          }
        }
        getTrackableContent(e) {
          const { body: t, heading: n } = e;
          return `[${Ne.getTrackingTranslation(n)}] ${Ne.getTrackingTranslation(
            t
          )}`;
        }
        getCustomCloseConditions(e) {
          const t = e.componentData.button && e.componentData.button.isClose;
          return (
            !e.hasOwnProperty("showOverlay") || e.showOverlay
              ? ["close-icon", "aos-overlay"]
              : ["close-icon"]
          ).map((e) => {
            const n = [
              {
                xpath: `//div[contains(@class, "aos-component")]//*[@class="${e}"]`,
              },
            ];
            return (
              "close-icon" === e &&
                t &&
                n.push({
                  xpath:
                    '//div[contains(@class, "aos-component")]//*[@class="close-button"]',
                }),
              { elements: n, groupId: "scenario-closed" }
            );
          });
        }
        validateHtmlContent(e) {
          return (
            !!(
              [e.label, e.body].every((e) => C.isString(e)) &&
              this.validateButton(e) &&
              this.validateSecondaryButton(e) &&
              this.validateHeading(e) &&
              this.validateBadge(e)
            ) && this.validateButton(e)
          );
        }
        validateButton(e) {
          if (!e.hasOwnProperty("button")) return !0;
          const t = e.button;
          return (
            C.isString(t.text) ||
            (t.hasOwnProperty("href") && C.isString(t.href)) ||
            (t.hasOwnProperty("isClose") && C.isBoolean(t.isClose))
          );
        }
        validateSecondaryButton(e) {
          if (!e.hasOwnProperty("secondaryButton")) return !0;
          const t = e.secondaryButton;
          return (
            C.isString(t.text) ||
            (t.hasOwnProperty("href") && C.isString(t.href))
          );
        }
        validateHeading(e) {
          return !e.hasOwnProperty("heading") || C.isString(e.heading);
        }
        validateBadge(e) {
          return !e.hasOwnProperty("badge") || C.isBoolean(e.badge);
        }
      }
      class Ge extends ae {
        validateTooltipActionData(e) {
          return this.validateXpath(e.xpath) && this.validateParent(e);
        }
        parseOptions(e) {
          const t = super.parseOptions(e);
          return (t.className += " aos-component aos-tooltip-component"), t;
        }
        getParsedTooltipAction(e) {
          try {
            const { xpath: t, parent: n } = e,
              r = this.parseHtmlContent(e.componentData),
              s = this.parseOptions(e.options),
              a = this.parseResolveConditions(e.resolveConditions),
              i = this.getTrackableContent(e.componentData);
            return (
              a.push(this.getCloseResolveCondition()), new se(t, r, s, a, n, i)
            );
          } catch (t) {
            this.throwParseError(e.event);
          }
        }
        getTrackableContent(e) {
          const { body: t, label: n } = e;
          return `[${Ne.getTrackingTranslation(n)}] ${Ne.getTrackingTranslation(
            t
          )}`;
        }
        getCloseResolveCondition() {
          return {
            elements: [
              {
                xpath:
                  '//div[contains(@class, "aos-component")]//button[@class="close-icon"]',
              },
            ],
            groupId: "scenario-closed",
          };
        }
        parseHtmlContent(e) {
          const { label: t, step: n, body: r, button: s } = e;
          if (![t, r].every((e) => C.isString(e)) || !this.validateButton(e))
            throw new Error();
          const a = n ? (0, Ee.hd)(t, n) : (0, Ee.hd)(t);
          return `\n\t\t\t<header>\n\t\t\t\t<h2>${(0, Ee.hd)(
            "aos"
          )}</h2>\n\t\t\t\t<button class='close-icon'></button>\n\t\t\t</header>\n\t\t\t<div class='component-body'>\n\t\t\t\t<h4>${a}</h4>\n\t\t\t\t<p>${(0,
          Ee.hd)(r)}</p>\n\t\t\t\t${this.renderButtonWrap(
            s
          )}\n\t\t\t</div>\n\t\t`;
        }
        validateButton(e) {
          return (
            !e.hasOwnProperty("button") ||
            (C.nonEmptyString(e.button.text) &&
              this.validateButtonHref(e.button))
          );
        }
        validateButtonHref(e) {
          return !e.hasOwnProperty("href") || C.nonEmptyString(e.href);
        }
        renderButtonWrap(e) {
          return e
            ? `\n\t\t\t<div class='button-wrap'>\n\t\t\t\t<a id="aos-next-step" ${
                e.className && `class=${e.className}`
              } ${e.href && `href=${e.href}`}>\n\t\t\t\t\t${(0, Ee.hd)(
                e.text
              )}\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t`
            : "";
        }
      }
      class Je extends me {
        parseAction(e) {
          switch (e.event) {
            case "aos-notification":
              return new Ue().parse(e);
            case "aos-tooltip":
              return new Ge().parse(e);
            default:
              return super.parseAction(e);
          }
        }
      }
      class Ve {
        constructor(e) {
          this.execute = e;
        }
        enable() {
          return this.execute("browserAction", "enable", ...arguments);
        }
        disable() {
          return this.execute("browserAction", "disable", ...arguments);
        }
        setTitle() {
          return this.execute("browserAction", "setTitle", ...arguments);
        }
        setIcon() {
          return this.execute("browserAction", "setIcon", ...arguments);
        }
        setBadgeText() {
          return this.execute("browserAction", "setBadgeText", ...arguments);
        }
        setBadgeTextColor() {
          return this.execute(
            "browserAction",
            "setBadgeTextColor",
            ...arguments
          );
        }
        setBadgeBackgroundColor() {
          return this.execute(
            "browserAction",
            "setBadgeBackgroundColor",
            ...arguments
          );
        }
        get onClicked() {
          return {
            addListener: this.execute.bind(
              this,
              "browserAction.onClicked",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "browserAction.onClicked",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "browserAction.onClicked",
              "removeListener"
            ),
          };
        }
      }
      class Be {
        constructor(e) {
          this.execute = e;
        }
        getURL() {
          return this.execute("extension", "getURL", ...arguments);
        }
      }
      class $e {
        constructor(e) {
          this.execute = e;
        }
        get lastError() {
          return this.execute("runtime", "lastError");
        }
        get onInstalled() {
          return {
            addListener: this.execute.bind(
              this,
              "runtime.onInstalled",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "runtime.onInstalled",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "runtime.onInstalled",
              "removeListener"
            ),
          };
        }
        get onMessage() {
          return {
            addListener: this.execute.bind(
              this,
              "runtime.onMessage",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "runtime.onMessage",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "runtime.onMessage",
              "removeListener"
            ),
          };
        }
        sendMessage() {
          return this.execute("runtime", "sendMessage", ...arguments);
        }
        setUninstallURL() {
          return this.execute("runtime", "setUninstallURL", ...arguments);
        }
        getManifest() {
          return this.execute("runtime", "getManifest", ...arguments);
        }
        getURL() {
          return this.execute("runtime", "getURL", ...arguments);
        }
        reload() {
          return this.execute("runtime", "reload");
        }
      }
      class qe {
        constructor(e) {
          this.execute = e;
        }
        getUILanguage() {
          return this.execute("i18n", "getUILanguage");
        }
        getMessage() {
          return this.execute("i18n", "getMessage", ...arguments);
        }
      }
      class Ke {
        constructor(e, t) {
          (this.execute = e), (this.browser = t);
        }
        get onChanged() {
          return this.browser.storage.onChanged;
        }
        get local() {
          return {
            get: this.execute.bind(this, "storage.local", "get"),
            set: this.execute.bind(this, "storage.local", "set"),
            remove: this.execute.bind(this, "storage.local", "remove"),
            clear: this.execute.bind(this, "storage.local", "clear"),
            getBytesInUse: this.execute.bind(
              this,
              "storage.local",
              "getBytesInUse"
            ),
          };
        }
        get sync() {
          return {
            get: this.execute.bind(this, "storage.sync", "get"),
            set: this.execute.bind(this, "storage.sync", "set"),
            remove: this.execute.bind(this, "storage.sync", "remove"),
            clear: this.execute.bind(this, "storage.sync", "clear"),
          };
        }
      }
      class Xe {
        constructor(e) {
          this.execute = e;
        }
        sendMessage() {
          return this.execute("tabs", "sendMessage", ...arguments);
        }
        create() {
          return this.execute("tabs", "create", ...arguments);
        }
        get() {
          return this.execute("tabs", "get", ...arguments);
        }
        query() {
          return this.execute("tabs", "query", ...arguments);
        }
        remove() {
          return this.execute("tabs", "remove", ...arguments);
        }
        update() {
          return this.execute("tabs", "update", ...arguments);
        }
        executeScript() {
          return this.execute("tabs", "executeScript", ...arguments);
        }
        insertCSS() {
          return this.execute("tabs", "insertCSS", ...arguments);
        }
        get onActivated() {
          return {
            addListener: this.execute.bind(
              this,
              "tabs.onActivated",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "tabs.onActivated",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "tabs.onActivated",
              "removeListener"
            ),
          };
        }
        get onUpdated() {
          return {
            addListener: this.execute.bind(
              this,
              "tabs.onUpdated",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "tabs.onUpdated",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "tabs.onUpdated",
              "removeListener"
            ),
          };
        }
        get onCreated() {
          return {
            addListener: this.execute.bind(
              this,
              "tabs.onCreated",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "tabs.onCreated",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "tabs.onCreated",
              "removeListener"
            ),
          };
        }
        get onRemoved() {
          return {
            addListener: this.execute.bind(
              this,
              "tabs.onRemoved",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "tabs.onRemoved",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "tabs.onRemoved",
              "removeListener"
            ),
          };
        }
      }
      class Ze {
        constructor(e) {
          this.execute = e;
        }
        create() {
          return this.execute("windows", "create", ...arguments);
        }
        update() {
          return this.execute("windows", "update", ...arguments);
        }
        remove() {
          return this.execute("windows", "remove", ...arguments);
        }
        get() {
          return this.execute("windows", "get", ...arguments);
        }
        get onFocusChanged() {
          return {
            addListener: this.execute.bind(
              this,
              "windows.onFocusChanged",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "windows.onFocusChanged",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "windows.onFocusChanged",
              "removeListener"
            ),
          };
        }
      }
      class Qe {
        constructor(e) {
          this.execute = e;
        }
        get onCommitted() {
          return {
            addListener: this.execute.bind(
              this,
              "webNavigation.onCommitted",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "webNavigation.onCommitted",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "webNavigation.onCommitted",
              "removeListener"
            ),
          };
        }
        get onHistoryStateUpdated() {
          return {
            addListener: this.execute.bind(
              this,
              "webNavigation.onHistoryStateUpdated",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "webNavigation.onHistoryStateUpdated",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "webNavigation.onHistoryStateUpdated",
              "removeListener"
            ),
          };
        }
        get onReferenceFragmentUpdated() {
          return {
            addListener: this.execute.bind(
              this,
              "webNavigation.onReferenceFragmentUpdated",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "webNavigation.onReferenceFragmentUpdated",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "webNavigation.onReferenceFragmentUpdated",
              "removeListener"
            ),
          };
        }
        get onBeforeNavigate() {
          return {
            addListener: this.execute.bind(
              this,
              "webNavigation.onBeforeNavigate",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "webNavigation.onBeforeNavigate",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "webNavigation.onBeforeNavigate",
              "removeListener"
            ),
          };
        }
        get onDOMContentLoaded() {
          return {
            addListener: this.execute.bind(
              this,
              "webNavigation.onDOMContentLoaded",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "webNavigation.onDOMContentLoaded",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "webNavigation.onDOMContentLoaded",
              "removeListener"
            ),
          };
        }
        get onCompleted() {
          return {
            addListener: this.execute.bind(
              this,
              "webNavigation.onCompleted",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "webNavigation.onCompleted",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "webNavigation.onCompleted",
              "removeListener"
            ),
          };
        }
        get onErrorOccurred() {
          return {
            addListener: this.execute.bind(
              this,
              "webNavigation.onErrorOccurred",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "webNavigation.onErrorOccurred",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "webNavigation.onErrorOccurred",
              "removeListener"
            ),
          };
        }
      }
      class et {
        constructor(e) {
          this.execute = e;
        }
        get onBeforeRequest() {
          return {
            addListener: this.execute.bind(
              this,
              "webRequest.onBeforeRequest",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "webRequest.onBeforeRequest",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "webRequest.onBeforeRequest",
              "removeListener"
            ),
          };
        }
        get onBeforeRedirect() {
          return {
            addListener: this.execute.bind(
              this,
              "webRequest.onBeforeRedirect",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "webRequest.onBeforeRedirect",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "webRequest.onBeforeRedirect",
              "removeListener"
            ),
          };
        }
        get onSendHeaders() {
          return {
            addListener: this.execute.bind(
              this,
              "webRequest.onSendHeaders",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "webRequest.onSendHeaders",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "webRequest.onSendHeaders",
              "removeListener"
            ),
          };
        }
        get onHeadersReceived() {
          return {
            addListener: this.execute.bind(
              this,
              "webRequest.onHeadersReceived",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "webRequest.onHeadersReceived",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "webRequest.onHeadersReceived",
              "removeListener"
            ),
          };
        }
        get onBeforeSendHeaders() {
          return {
            addListener: this.execute.bind(
              this,
              "webRequest.onBeforeSendHeaders",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "webRequest.onBeforeSendHeaders",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "webRequest.onBeforeSendHeaders",
              "removeListener"
            ),
          };
        }
        get onResponseStarted() {
          return {
            addListener: this.execute.bind(
              this,
              "webRequest.onResponseStarted",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "webRequest.onResponseStarted",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "webRequest.onResponseStarted",
              "removeListener"
            ),
          };
        }
        get onCompleted() {
          return {
            addListener: this.execute.bind(
              this,
              "webRequest.onCompleted",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "webRequest.onCompleted",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "webRequest.onCompleted",
              "removeListener"
            ),
          };
        }
        get onErrorOccurred() {
          return {
            addListener: this.execute.bind(
              this,
              "webRequest.onErrorOccurred",
              "addListener"
            ),
            hasListener: this.execute.bind(
              this,
              "webRequest.onErrorOccurred",
              "hasListener"
            ),
            removeListener: this.execute.bind(
              this,
              "webRequest.onErrorOccurred",
              "removeListener"
            ),
          };
        }
      }
      const tt = Array.isArray;
      const nt =
        "object" == typeof global &&
        global &&
        global.Object === Object &&
        global;
      var rt =
        "object" == typeof self && self && self.Object === Object && self;
      const st = nt || rt || Function("return this")();
      const at = st.Symbol;
      var it = Object.prototype,
        ot = it.hasOwnProperty,
        ut = it.toString,
        dt = at ? at.toStringTag : void 0;
      const lt = function (e) {
        var t = ot.call(e, dt),
          n = e[dt];
        try {
          e[dt] = void 0;
          var r = !0;
        } catch (e) {}
        var s = ut.call(e);
        return r && (t ? (e[dt] = n) : delete e[dt]), s;
      };
      var ct = Object.prototype.toString;
      const _t = function (e) {
        return ct.call(e);
      };
      var ht = at ? at.toStringTag : void 0;
      const mt = function (e) {
        return null == e
          ? void 0 === e
            ? "[object Undefined]"
            : "[object Null]"
          : ht && ht in Object(e)
          ? lt(e)
          : _t(e);
      };
      const pt = function (e) {
        return null != e && "object" == typeof e;
      };
      const ft = function (e) {
        return "symbol" == typeof e || (pt(e) && "[object Symbol]" == mt(e));
      };
      var yt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        gt = /^\w*$/;
      const Mt = function (e, t) {
        if (tt(e)) return !1;
        var n = typeof e;
        return (
          !(
            "number" != n &&
            "symbol" != n &&
            "boolean" != n &&
            null != e &&
            !ft(e)
          ) ||
          gt.test(e) ||
          !yt.test(e) ||
          (null != t && e in Object(t))
        );
      };
      const Lt = function (e) {
        var t = typeof e;
        return null != e && ("object" == t || "function" == t);
      };
      const vt = function (e) {
        if (!Lt(e)) return !1;
        var t = mt(e);
        return (
          "[object Function]" == t ||
          "[object GeneratorFunction]" == t ||
          "[object AsyncFunction]" == t ||
          "[object Proxy]" == t
        );
      };
      const Yt = st["__core-js_shared__"];
      var bt,
        kt = (bt = /[^.]+$/.exec((Yt && Yt.keys && Yt.keys.IE_PROTO) || ""))
          ? "Symbol(src)_1." + bt
          : "";
      const wt = function (e) {
        return !!kt && kt in e;
      };
      var Dt = Function.prototype.toString;
      const Tt = function (e) {
        if (null != e) {
          try {
            return Dt.call(e);
          } catch (e) {}
          try {
            return e + "";
          } catch (e) {}
        }
        return "";
      };
      var St = /^\[object .+?Constructor\]$/,
        xt = Function.prototype,
        jt = Object.prototype,
        Ht = xt.toString,
        Pt = jt.hasOwnProperty,
        Ot = RegExp(
          "^" +
            Ht.call(Pt)
              .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
              .replace(
                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                "$1.*?"
              ) +
            "$"
        );
      const At = function (e) {
        return !(!Lt(e) || wt(e)) && (vt(e) ? Ot : St).test(Tt(e));
      };
      const Et = function (e, t) {
        return null == e ? void 0 : e[t];
      };
      const Ct = function (e, t) {
        var n = Et(e, t);
        return At(n) ? n : void 0;
      };
      const Nt = Ct(Object, "create");
      const Ft = function () {
        (this.__data__ = Nt ? Nt(null) : {}), (this.size = 0);
      };
      const Wt = function (e) {
        var t = this.has(e) && delete this.__data__[e];
        return (this.size -= t ? 1 : 0), t;
      };
      var Rt = Object.prototype.hasOwnProperty;
      const It = function (e) {
        var t = this.__data__;
        if (Nt) {
          var n = t[e];
          return "__lodash_hash_undefined__" === n ? void 0 : n;
        }
        return Rt.call(t, e) ? t[e] : void 0;
      };
      var zt = Object.prototype.hasOwnProperty;
      const Ut = function (e) {
        var t = this.__data__;
        return Nt ? void 0 !== t[e] : zt.call(t, e);
      };
      const Gt = function (e, t) {
        var n = this.__data__;
        return (
          (this.size += this.has(e) ? 0 : 1),
          (n[e] = Nt && void 0 === t ? "__lodash_hash_undefined__" : t),
          this
        );
      };
      function Jt(e) {
        var t = -1,
          n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var r = e[t];
          this.set(r[0], r[1]);
        }
      }
      (Jt.prototype.clear = Ft),
        (Jt.prototype.delete = Wt),
        (Jt.prototype.get = It),
        (Jt.prototype.has = Ut),
        (Jt.prototype.set = Gt);
      const Vt = Jt;
      const Bt = function () {
        (this.__data__ = []), (this.size = 0);
      };
      const $t = function (e, t) {
        return e === t || (e != e && t != t);
      };
      const qt = function (e, t) {
        for (var n = e.length; n--; ) if ($t(e[n][0], t)) return n;
        return -1;
      };
      var Kt = Array.prototype.splice;
      const Xt = function (e) {
        var t = this.__data__,
          n = qt(t, e);
        return (
          !(n < 0) &&
          (n == t.length - 1 ? t.pop() : Kt.call(t, n, 1), --this.size, !0)
        );
      };
      const Zt = function (e) {
        var t = this.__data__,
          n = qt(t, e);
        return n < 0 ? void 0 : t[n][1];
      };
      const Qt = function (e) {
        return qt(this.__data__, e) > -1;
      };
      const en = function (e, t) {
        var n = this.__data__,
          r = qt(n, e);
        return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
      };
      function tn(e) {
        var t = -1,
          n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var r = e[t];
          this.set(r[0], r[1]);
        }
      }
      (tn.prototype.clear = Bt),
        (tn.prototype.delete = Xt),
        (tn.prototype.get = Zt),
        (tn.prototype.has = Qt),
        (tn.prototype.set = en);
      const nn = tn;
      const rn = Ct(st, "Map");
      const sn = function () {
        (this.size = 0),
          (this.__data__ = {
            hash: new Vt(),
            map: new (rn || nn)(),
            string: new Vt(),
          });
      };
      const an = function (e) {
        var t = typeof e;
        return "string" == t || "number" == t || "symbol" == t || "boolean" == t
          ? "__proto__" !== e
          : null === e;
      };
      const on = function (e, t) {
        var n = e.__data__;
        return an(t) ? n["string" == typeof t ? "string" : "hash"] : n.map;
      };
      const un = function (e) {
        var t = on(this, e).delete(e);
        return (this.size -= t ? 1 : 0), t;
      };
      const dn = function (e) {
        return on(this, e).get(e);
      };
      const ln = function (e) {
        return on(this, e).has(e);
      };
      const cn = function (e, t) {
        var n = on(this, e),
          r = n.size;
        return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
      };
      function _n(e) {
        var t = -1,
          n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var r = e[t];
          this.set(r[0], r[1]);
        }
      }
      (_n.prototype.clear = sn),
        (_n.prototype.delete = un),
        (_n.prototype.get = dn),
        (_n.prototype.has = ln),
        (_n.prototype.set = cn);
      const hn = _n;
      function mn(e, t) {
        if ("function" != typeof e || (null != t && "function" != typeof t))
          throw new TypeError("Expected a function");
        var n = function () {
          var r = arguments,
            s = t ? t.apply(this, r) : r[0],
            a = n.cache;
          if (a.has(s)) return a.get(s);
          var i = e.apply(this, r);
          return (n.cache = a.set(s, i) || a), i;
        };
        return (n.cache = new (mn.Cache || hn)()), n;
      }
      mn.Cache = hn;
      const pn = mn;
      var fn =
          /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        yn = /\\(\\)?/g;
      const gn = (function (e) {
        var t = pn(e, function (e) {
            return 500 === n.size && n.clear(), e;
          }),
          n = t.cache;
        return t;
      })(function (e) {
        var t = [];
        return (
          46 === e.charCodeAt(0) && t.push(""),
          e.replace(fn, function (e, n, r, s) {
            t.push(r ? s.replace(yn, "$1") : n || e);
          }),
          t
        );
      });
      const Mn = function (e, t) {
        for (var n = -1, r = null == e ? 0 : e.length, s = Array(r); ++n < r; )
          s[n] = t(e[n], n, e);
        return s;
      };
      var Ln = at ? at.prototype : void 0,
        vn = Ln ? Ln.toString : void 0;
      const Yn = function e(t) {
        if ("string" == typeof t) return t;
        if (tt(t)) return Mn(t, e) + "";
        if (ft(t)) return vn ? vn.call(t) : "";
        var n = t + "";
        return "0" == n && 1 / t == -Infinity ? "-0" : n;
      };
      const bn = function (e) {
        return null == e ? "" : Yn(e);
      };
      const kn = function (e, t) {
        return tt(e) ? e : Mt(e, t) ? [e] : gn(bn(e));
      };
      const wn = function (e) {
        if ("string" == typeof e || ft(e)) return e;
        var t = e + "";
        return "0" == t && 1 / e == -Infinity ? "-0" : t;
      };
      const Dn = function (e, t) {
        for (var n = 0, r = (t = kn(t, e)).length; null != e && n < r; )
          e = e[wn(t[n++])];
        return n && n == r ? e : void 0;
      };
      const Tn = function (e, t, n) {
        var r = null == e ? void 0 : Dn(e, t);
        return void 0 === r ? n : r;
      };
      class Sn {
        constructor(e) {
          this.browser = e;
          const t = function (...t) {
            const n = Tn(e, t.shift()) || {},
              r = n[t.shift()];
            return "function" == typeof r ? r.apply(n, t) : r;
          };
          (this.browserAction = new Ve(t)),
            (this.extension = new Be(t)),
            (this.i18n = new qe(t)),
            (this.runtime = new $e(t)),
            (this.storage = new Ke(t, this.browser)),
            (this.tabs = new Xe(t)),
            (this.windows = new Ze(t)),
            (this.webNavigation = new Qe(t)),
            (this.webRequest = new et(t));
        }
      }
      class xn {
        static getCurrentTab(e) {
          return new Promise((t, n) => {
            e.tabs.query({ currentWindow: !0, active: !0 }, (e) => {
              const r = e[0];
              return r ? t(r) : n(new Error("Failed to get current tab."));
            });
          });
        }
        static async getCurrentTabId(e) {
          return (await xn.getCurrentTab(e)).id;
        }
        static redirectTab(e, t, n) {
          return e.tabs.update(t.id, { url: n });
        }
        static async injectScript(e, t, n) {
          return new Promise((r) => e.tabs.executeScript(t.id, { file: n }, r));
        }
        static async injectStyle(e, t, n) {
          return new Promise((r) => e.tabs.insertCSS(t.id, { file: n }, r));
        }
        static async sendBackgroundMessage(e, t, n, r) {
          return new Promise((s) =>
            e.tabs.sendMessage(t.id, { message: n, data: r }, null, s)
          );
        }
        static async sendContentMessage(e, t, n) {
          return new Promise((r) =>
            e.runtime.sendMessage({ message: t, data: n }, null, r)
          );
        }
        static injectNitroFont(e) {
          const t = document.getElementsByTagName("head")[0],
            n = document.createElement("style");
          (n.innerHTML = `\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'Nitro Font';\n\t\t\t\tfont-style: normal;\n\t\t\t\tfont-weight: 400;\n\t\t\t\tsrc: url("${e.runtime.getURL(
            "common/ui/fonts/NitroFont-400.woff2"
          )}") format('woff2');\n\t\t\t}\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'Nitro Font';\n\t\t\t\tfont-style: bold;\n\t\t\t\tfont-weight: 700;\n\t\t\t\tsrc: url("${e.runtime.getURL(
            "common/ui/fonts/NitroFont-700.woff2"
          )}") format('woff2');\n\t\t\t}\n\t\t`),
            t.appendChild(n);
        }
      }
      const jn = "aos.runner.setScenario",
        Hn = "aos.runner.start",
        Pn = "aos.runner.stop",
        On = "aos.runner.fail",
        An = "aos.runner.completed",
        En = "aos.runner.getRunnerInfo",
        Cn = "aos.runner.registerRunnerEvents";
      const Nn = new je(
        new Te(new Je()),
        new (class extends pe {
          parseHookActions(e) {
            return new Je().parse(e.actions);
          }
        })()
      );
      xn.injectNitroFont(new Sn(chrome)),
        new (class extends Oe {
          constructor(e) {
            super(e),
              (this.api = new Sn(chrome)),
              this.api.runtime.onMessage.addListener(this.onMessage.bind(this)),
              (this.currentScenario = void 0);
          }
          onMessage(e, t, n) {
            switch (e.message) {
              case En:
                return this.onRunnerInfo(e, n), !0;
              case jn:
                return this.setScenario(e, n), !0;
              case Hn:
                return this.onStart(e, n), !0;
              case Pn:
                return this.onStop(e, n), !0;
              case Cn:
                return this.registerBackgroundListeners(e.data.events), n(), !0;
            }
          }
          onRunnerInfo(e, t) {
            t({ injected: !0 });
          }
          setScenario(e, t) {
            (this.currentScenario = e && e.data && e.data.scenario),
              this.initiateScenario(this.currentScenario)
                .then(() => t())
                .catch((e) => t({ error: e, scenario: this.currentScenario }));
          }
          onStart(e, t) {
            this.start().then(this.onCompletedScenario.bind(this)), t();
          }
          onStop(e, t) {
            this.stop().catch(this.onRuntimeError.bind(this)), t();
          }
          onRuntimeError(e) {
            Ae.logResult(e),
              xn.sendContentMessage(this.api, On, {
                scenario: this.currentScenario,
                error: e,
              });
          }
          onCompletedScenario(e) {
            xn.sendContentMessage(this.api, An, { result: e });
          }
          registerBackgroundListeners(e) {
            e &&
              Array.isArray(e) &&
              e.forEach((e) => {
                this.eventEmitter.addListener(e, (...t) => {
                  const n = JSON.parse(JSON.stringify(t));
                  xn.sendContentMessage(this.api, e, {
                    scenario: this.currentScenario,
                    eventArgs: n,
                  });
                });
              });
          }
        })(Nn);
    })();
})();
