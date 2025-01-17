'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactMapGl = require('@urbica/react-map-gl');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var mapboxGlDraw = createCommonjsModule(function (module, exports) {
!function (e) {
  module.exports = e();
}(function () {
  return function () {
    function e(t, n, o) {
      function r(s, a) {
        if (!n[s]) {
          if (!t[s]) {
            var c = "function" == typeof commonjsRequire && commonjsRequire;
            if (!a && c) return c(s, !0);
            if (i) return i(s, !0);
            var u = new Error("Cannot find module '" + s + "'");
            throw u.code = "MODULE_NOT_FOUND", u;
          }

          var l = n[s] = {
            exports: {}
          };
          t[s][0].call(l.exports, function (e) {
            return r(t[s][1][e] || e);
          }, l, l.exports, e, t, n, o);
        }

        return n[s].exports;
      }

      for (var i = "function" == typeof commonjsRequire && commonjsRequire, s = 0; s < o.length; s++) r(o[s]);

      return r;
    }

    return e;
  }()({
    1: [function (e, t, n) {

      var o = e("./src/setup"),
          r = e("./src/options"),
          i = e("./src/api"),
          s = e("./src/constants"),
          a = function (e, t) {
        console.debug("setupDraw draw", Object.keys(e && e.modes)), e = r(e), console.debug("setupOptions draw", Object.keys(e && e.modes));
        var n = {
          options: e
        };
        t = i(n, t), n.api = t;
        var a = o(n);
        return console.debug("runSetup", n.options && Object.keys(n.options.modes)), t.onAdd = a.onAdd, t.onRemove = a.onRemove, t.types = s.types, t.options = e, console.debug("api.options", t.options && Object.keys(t.options.modes)), t;
      };

      t.exports = function (e) {
        a(e, this);
      }, t.exports.modes = e("./src/modes");
    }, {
      "./src/api": 22,
      "./src/constants": 23,
      "./src/modes": 56,
      "./src/options": 61,
      "./src/setup": 63
    }],
    2: [function (e, t, n) {
      function o(e) {
        if (!(this instanceof o)) return new o(e);
        this._bbox = e || [1 / 0, 1 / 0, -1 / 0, -1 / 0], this._valid = !!e;
      }

      t.exports = o, o.prototype.include = function (e) {
        return this._valid = !0, this._bbox[0] = Math.min(this._bbox[0], e[0]), this._bbox[1] = Math.min(this._bbox[1], e[1]), this._bbox[2] = Math.max(this._bbox[2], e[0]), this._bbox[3] = Math.max(this._bbox[3], e[1]), this;
      }, o.prototype.equals = function (e) {
        var t;
        return t = e instanceof o ? e.bbox() : e, this._bbox[0] == t[0] && this._bbox[1] == t[1] && this._bbox[2] == t[2] && this._bbox[3] == t[3];
      }, o.prototype.center = function (e) {
        return this._valid ? [(this._bbox[0] + this._bbox[2]) / 2, (this._bbox[1] + this._bbox[3]) / 2] : null;
      }, o.prototype.union = function (e) {
        this._valid = !0;
        var t;
        return t = e instanceof o ? e.bbox() : e, this._bbox[0] = Math.min(this._bbox[0], t[0]), this._bbox[1] = Math.min(this._bbox[1], t[1]), this._bbox[2] = Math.max(this._bbox[2], t[2]), this._bbox[3] = Math.max(this._bbox[3], t[3]), this;
      }, o.prototype.bbox = function () {
        return this._valid ? this._bbox : null;
      }, o.prototype.contains = function (e) {
        if (!e) return this._fastContains();
        if (!this._valid) return null;
        var t = e[0],
            n = e[1];
        return this._bbox[0] <= t && this._bbox[1] <= n && this._bbox[2] >= t && this._bbox[3] >= n;
      }, o.prototype.intersect = function (e) {
        if (!this._valid) return null;
        var t;
        return t = e instanceof o ? e.bbox() : e, !(this._bbox[0] > t[2] || this._bbox[2] < t[0] || this._bbox[3] < t[1] || this._bbox[1] > t[3]);
      }, o.prototype._fastContains = function () {
        if (!this._valid) return new Function("return null;");
        var e = "return " + this._bbox[0] + "<= ll[0] &&" + this._bbox[1] + "<= ll[1] &&" + this._bbox[2] + ">= ll[0] &&" + this._bbox[3] + ">= ll[1]";
        return new Function("ll", e);
      }, o.prototype.polygon = function () {
        return this._valid ? {
          type: "Polygon",
          coordinates: [[[this._bbox[0], this._bbox[1]], [this._bbox[2], this._bbox[1]], [this._bbox[2], this._bbox[3]], [this._bbox[0], this._bbox[3]], [this._bbox[0], this._bbox[1]]]]
        } : null;
      };
    }, {}],
    3: [function (e, t, n) {
      function o(e) {
        var t,
            n = 0;

        switch (e.type) {
          case "Polygon":
            return r(e.coordinates);

          case "MultiPolygon":
            for (t = 0; t < e.coordinates.length; t++) n += r(e.coordinates[t]);

            return n;

          case "Point":
          case "MultiPoint":
          case "LineString":
          case "MultiLineString":
            return 0;

          case "GeometryCollection":
            for (t = 0; t < e.geometries.length; t++) n += o(e.geometries[t]);

            return n;
        }
      }

      function r(e) {
        var t = 0;

        if (e && e.length > 0) {
          t += Math.abs(i(e[0]));

          for (var n = 1; n < e.length; n++) t -= Math.abs(i(e[n]));
        }

        return t;
      }

      function i(e) {
        var t,
            n,
            o,
            r,
            i,
            c,
            u = 0,
            l = e.length;

        if (l > 2) {
          for (c = 0; c < l; c++) c === l - 2 ? (o = l - 2, r = l - 1, i = 0) : c === l - 1 ? (o = l - 1, r = 0, i = 1) : (o = c, r = c + 1, i = c + 2), t = e[o], n = e[r], u += (s(e[i][0]) - s(t[0])) * Math.sin(s(n[1]));

          u = u * a.RADIUS * a.RADIUS / 2;
        }

        return u;
      }

      function s(e) {
        return e * Math.PI / 180;
      }

      var a = e("wgs84");
      t.exports.geometry = o, t.exports.ring = i;
    }, {
      wgs84: 20
    }],
    4: [function (e, t, n) {
      t.exports = function (e) {
        function t(e) {
          return Array.isArray(e) && e.length && "number" == typeof e[0] ? [e] : e.reduce(function (e, n) {
            return Array.isArray(n) && Array.isArray(n[0]) ? e.concat(t(n)) : (e.push(n), e);
          }, []);
        }

        return t(e);
      };
    }, {}],
    5: [function (e, t, n) {
      var o = e("@mapbox/geojson-normalize"),
          r = e("geojson-flatten"),
          i = e("./flatten");

      t.exports = function (e) {
        if (!e) return [];
        var t = [];
        return r(o(e)).features.forEach(function (e) {
          e.geometry && (t = t.concat(i(e.geometry.coordinates)));
        }), t;
      };
    }, {
      "./flatten": 4,
      "@mapbox/geojson-normalize": 7,
      "geojson-flatten": 14
    }],
    6: [function (e, t, n) {
      function o(e) {
        for (var t = s(), n = r(e), o = 0; o < n.length; o++) t.include(n[o]);

        return t;
      }

      var r = e("@mapbox/geojson-coords"),
          i = e("traverse"),
          s = e("@mapbox/extent"),
          a = {
        features: ["FeatureCollection"],
        coordinates: ["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon"],
        geometry: ["Feature"],
        geometries: ["GeometryCollection"]
      },
          c = Object.keys(a);
      t.exports = function (e) {
        return o(e).bbox();
      }, t.exports.polygon = function (e) {
        return o(e).polygon();
      }, t.exports.bboxify = function (e) {
        return i(e).map(function (e) {
          e && c.some(function (t) {
            return !!e[t] && -1 !== a[t].indexOf(e.type);
          }) && (e.bbox = o(e).bbox(), this.update(e));
        });
      };
    }, {
      "@mapbox/extent": 2,
      "@mapbox/geojson-coords": 5,
      traverse: 19
    }],
    7: [function (e, t, n) {
      t.exports = function (e) {
        if (!e || !e.type) return null;
        var t = o[e.type];
        return t ? "geometry" === t ? {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            properties: {},
            geometry: e
          }]
        } : "feature" === t ? {
          type: "FeatureCollection",
          features: [e]
        } : "featurecollection" === t ? e : void 0 : null;
      };

      var o = {
        Point: "geometry",
        MultiPoint: "geometry",
        LineString: "geometry",
        MultiLineString: "geometry",
        Polygon: "geometry",
        MultiPolygon: "geometry",
        GeometryCollection: "geometry",
        Feature: "feature",
        FeatureCollection: "featurecollection"
      };
    }, {}],
    8: [function (e, t, n) {
      var o = e("jsonlint-lines"),
          r = e("./object");

      t.exports.hint = function (e, t) {
        var n,
            i = [];
        if ("object" == typeof e) n = e;else {
          if ("string" != typeof e) return [{
            message: "Expected string or object as input",
            line: 0
          }];

          try {
            n = o.parse(e);
          } catch (e) {
            var s = e.message.match(/line (\d+)/);
            return [{
              line: parseInt(s[1], 10) - 1,
              message: e.message,
              error: e
            }];
          }
        }
        return i = i.concat(r.hint(n, t));
      };
    }, {
      "./object": 9,
      "jsonlint-lines": 11
    }],
    9: [function (e, t, n) {
      var o = e("./rhr");

      t.exports.hint = function (e, t) {
        function n(e) {
          if (t && !1 === t.noDuplicateMembers || !e.__duplicateProperties__ || f.push({
            message: "An object contained duplicate members, making parsing ambigous: " + e.__duplicateProperties__.join(", "),
            line: e.__line__
          }), !i(e, "type", "string")) if (y[e.type]) e && y[e.type](e);else {
            var n = m[e.type.toLowerCase()];
            void 0 !== n ? f.push({
              message: "Expected " + n + " but got " + e.type + " (case sensitive)",
              line: e.__line__
            }) : f.push({
              message: "The type " + e.type + " is unknown",
              line: e.__line__
            });
          }
        }

        function r(e, t) {
          return e.every(function (e) {
            return null !== e && typeof e === t;
          });
        }

        function i(e, t, n) {
          if (void 0 === e[t]) return f.push({
            message: '"' + t + '" member required',
            line: e.__line__
          });

          if ("array" === n) {
            if (!Array.isArray(e[t])) return f.push({
              message: '"' + t + '" member should be an array, but is an ' + typeof e[t] + " instead",
              line: e.__line__
            });
          } else {
            if ("object" === n && e[t] && "Object" !== e[t].constructor.name) return f.push({
              message: '"' + t + '" member should be ' + n + ", but is an " + e[t].constructor.name + " instead",
              line: e.__line__
            });
            if (n && typeof e[t] !== n) return f.push({
              message: '"' + t + '" member should be ' + n + ", but is an " + typeof e[t] + " instead",
              line: e.__line__
            });
          }
        }

        function s(e, n) {
          if (!Array.isArray(e)) return f.push({
            message: "position should be an array, is a " + typeof e + " instead",
            line: e.__line__ || n
          });
          if (e.length < 2) return f.push({
            message: "position must have 2 or more elements",
            line: e.__line__ || n
          });
          if (e.length > 3) return f.push({
            message: "position should not have more than 3 elements",
            level: "message",
            line: e.__line__ || n
          });
          if (!r(e, "number")) return f.push({
            message: "each element in a position must be a number",
            line: e.__line__ || n
          });

          if (t && t.precisionWarning) {
            if (h === d) return h += 1, f.push({
              message: "truncated warnings: we've encountered coordinate precision warning " + d + " times, no more warnings will be reported",
              level: "message",
              line: e.__line__ || n
            });
            h < d && e.forEach(function (t) {
              var o = 0,
                  r = String(t).split(".")[1];
              if (void 0 !== r && (o = r.length), o > g) return h += 1, f.push({
                message: "precision of coordinates should be reduced",
                level: "message",
                line: e.__line__ || n
              });
            });
          }
        }

        function a(e, t, n, o) {
          if (void 0 === o && void 0 !== e.__line__ && (o = e.__line__), 0 === n) return s(e, o);
          if (1 === n && t) if ("LinearRing" === t) {
            if (!Array.isArray(e[e.length - 1])) return f.push({
              message: "a number was found where a coordinate array should have been found: this needs to be nested more deeply",
              line: o
            }), !0;
            if (e.length < 4 && f.push({
              message: "a LinearRing of coordinates needs to have four or more positions",
              line: o
            }), e.length && (e[e.length - 1].length !== e[0].length || !e[e.length - 1].every(function (t, n) {
              return e[0][n] === t;
            }))) return f.push({
              message: "the first and last positions in a LinearRing of coordinates must be the same",
              line: o
            }), !0;
          } else if ("Line" === t && e.length < 2) return f.push({
            message: "a line needs to have two or more coordinates to be valid",
            line: o
          });
          if (Array.isArray(e)) return e.map(function (e) {
            return a(e, t, n - 1, e.__line__ || o);
          }).some(function (e) {
            return e;
          });
          f.push({
            message: "a number was found where a coordinate array should have been found: this needs to be nested more deeply",
            line: o
          });
        }

        function c(e) {
          e.crs && ("object" == typeof e.crs && e.crs.properties && "urn:ogc:def:crs:OGC:1.3:CRS84" === e.crs.properties.name ? f.push({
            message: "old-style crs member is not recommended, this object is equivalent to the default and should be removed",
            line: e.__line__
          }) : f.push({
            message: "old-style crs member is not recommended",
            line: e.__line__
          }));
        }

        function u(e) {
          if (e.bbox) return Array.isArray(e.bbox) ? (r(e.bbox, "number") || f.push({
            message: "each element in a bbox member must be a number",
            line: e.bbox.__line__
          }), 4 !== e.bbox.length && 6 !== e.bbox.length && f.push({
            message: "bbox must contain 4 elements (for 2D) or 6 elements (for 3D)",
            line: e.bbox.__line__
          }), f.length) : void f.push({
            message: "bbox member must be an array of numbers, but is a " + typeof e.bbox,
            line: e.__line__
          });
        }

        function l(e) {
          void 0 !== e.properties && f.push({
            message: 'geometry object cannot contain a "properties" member',
            line: e.__line__
          }), void 0 !== e.geometry && f.push({
            message: 'geometry object cannot contain a "geometry" member',
            line: e.__line__
          }), void 0 !== e.features && f.push({
            message: 'geometry object cannot contain a "features" member',
            line: e.__line__
          });
        }

        function p(e) {
          c(e), u(e), void 0 !== e.id && "string" != typeof e.id && "number" != typeof e.id && f.push({
            message: 'Feature "id" member must have a string or number value',
            line: e.__line__
          }), void 0 !== e.features && f.push({
            message: 'Feature object cannot contain a "features" member',
            line: e.__line__
          }), void 0 !== e.coordinates && f.push({
            message: 'Feature object cannot contain a "coordinates" member',
            line: e.__line__
          }), "Feature" !== e.type && f.push({
            message: "GeoJSON features must have a type=feature member",
            line: e.__line__
          }), i(e, "properties", "object"), i(e, "geometry", "object") || e.geometry && n(e.geometry);
        }

        var f = [],
            h = 0,
            d = 10,
            g = 6,
            y = {
          Point: function (e) {
            c(e), u(e), l(e), i(e, "coordinates", "array") || s(e.coordinates);
          },
          Feature: p,
          MultiPoint: function (e) {
            c(e), u(e), i(e, "coordinates", "array") || a(e.coordinates, "", 1);
          },
          LineString: function (e) {
            c(e), u(e), i(e, "coordinates", "array") || a(e.coordinates, "Line", 1);
          },
          MultiLineString: function (e) {
            c(e), u(e), i(e, "coordinates", "array") || a(e.coordinates, "Line", 2);
          },
          FeatureCollection: function (e) {
            if (c(e), u(e), void 0 !== e.properties && f.push({
              message: 'FeatureCollection object cannot contain a "properties" member',
              line: e.__line__
            }), void 0 !== e.coordinates && f.push({
              message: 'FeatureCollection object cannot contain a "coordinates" member',
              line: e.__line__
            }), !i(e, "features", "array")) {
              if (!r(e.features, "object")) return f.push({
                message: "Every feature must be an object",
                line: e.__line__
              });
              e.features.forEach(p);
            }
          },
          GeometryCollection: function (e) {
            c(e), u(e), i(e, "geometries", "array") || (r(e.geometries, "object") || f.push({
              message: "The geometries array in a GeometryCollection must contain only geometry objects",
              line: e.__line__
            }), 1 === e.geometries.length && f.push({
              message: "GeometryCollection with a single geometry should be avoided in favor of single part or a single object of multi-part type",
              line: e.geometries.__line__
            }), e.geometries.forEach(function (t) {
              t && ("GeometryCollection" === t.type && f.push({
                message: "GeometryCollection should avoid nested geometry collections",
                line: e.geometries.__line__
              }), n(t));
            }));
          },
          Polygon: function (e) {
            c(e), u(e), i(e, "coordinates", "array") || a(e.coordinates, "LinearRing", 2) || o(e, f);
          },
          MultiPolygon: function (e) {
            c(e), u(e), i(e, "coordinates", "array") || a(e.coordinates, "LinearRing", 3) || o(e, f);
          }
        },
            m = Object.keys(y).reduce(function (e, t) {
          return e[t.toLowerCase()] = t, e;
        }, {});
        return "object" != typeof e || null === e || void 0 === e ? (f.push({
          message: "The root of a GeoJSON object must be an object.",
          line: 0
        }), f) : (n(e), f.forEach(function (e) {
          ({}).hasOwnProperty.call(e, "line") && void 0 === e.line && delete e.line;
        }), f);
      };
    }, {
      "./rhr": 10
    }],
    10: [function (e, t, n) {
      function o(e) {
        return e * Math.PI / 180;
      }

      function r(e) {
        var t = 0;
        if (e.length > 2) for (var n, r, i = 0; i < e.length - 1; i++) n = e[i], t += o((r = e[i + 1])[0] - n[0]) * (2 + Math.sin(o(n[1])) + Math.sin(o(r[1])));
        return t >= 0;
      }

      function i(e) {
        if (e && e.length > 0) {
          if (r(e[0])) return !1;
          if (!e.slice(1, e.length).every(r)) return !1;
        }

        return !0;
      }

      function s(e) {
        return "Polygon" === e.type ? i(e.coordinates) : "MultiPolygon" === e.type ? e.coordinates.every(i) : void 0;
      }

      t.exports = function (e, t) {
        s(e) || t.push({
          message: "Polygons and MultiPolygons should follow the right-hand rule",
          level: "message",
          line: e.__line__
        });
      };
    }, {}],
    11: [function (e, t, n) {
      (function (o) {
        var r = function () {
          function e() {
            this.yy = {};
          }

          var t = function (e, t, n, o) {
            for (n = n || {}, o = e.length; o--; n[e[o]] = t);

            return n;
          },
              n = [1, 12],
              o = [1, 13],
              r = [1, 9],
              i = [1, 10],
              s = [1, 11],
              a = [1, 14],
              c = [1, 15],
              u = [14, 18, 22, 24],
              l = [18, 22],
              p = [22, 24],
              f = {
            trace: function () {},
            yy: {},
            symbols_: {
              error: 2,
              JSONString: 3,
              STRING: 4,
              JSONNumber: 5,
              NUMBER: 6,
              JSONNullLiteral: 7,
              NULL: 8,
              JSONBooleanLiteral: 9,
              TRUE: 10,
              FALSE: 11,
              JSONText: 12,
              JSONValue: 13,
              EOF: 14,
              JSONObject: 15,
              JSONArray: 16,
              "{": 17,
              "}": 18,
              JSONMemberList: 19,
              JSONMember: 20,
              ":": 21,
              ",": 22,
              "[": 23,
              "]": 24,
              JSONElementList: 25,
              $accept: 0,
              $end: 1
            },
            terminals_: {
              2: "error",
              4: "STRING",
              6: "NUMBER",
              8: "NULL",
              10: "TRUE",
              11: "FALSE",
              14: "EOF",
              17: "{",
              18: "}",
              21: ":",
              22: ",",
              23: "[",
              24: "]"
            },
            productions_: [0, [3, 1], [5, 1], [7, 1], [9, 1], [9, 1], [12, 2], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [15, 2], [15, 3], [20, 3], [19, 1], [19, 3], [16, 2], [16, 3], [25, 1], [25, 3]],
            performAction: function (e, t, n, o, r, i, s) {
              var a = i.length - 1;

              switch (r) {
                case 1:
                  this.$ = e.replace(/\\(\\|")/g, "$1").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t").replace(/\\v/g, "\v").replace(/\\f/g, "\f").replace(/\\b/g, "\b");
                  break;

                case 2:
                  this.$ = Number(e);
                  break;

                case 3:
                  this.$ = null;
                  break;

                case 4:
                  this.$ = !0;
                  break;

                case 5:
                  this.$ = !1;
                  break;

                case 6:
                  return this.$ = i[a - 1];

                case 13:
                  this.$ = {}, Object.defineProperty(this.$, "__line__", {
                    value: this._$.first_line,
                    enumerable: !1
                  });
                  break;

                case 14:
                case 19:
                  this.$ = i[a - 1], Object.defineProperty(this.$, "__line__", {
                    value: this._$.first_line,
                    enumerable: !1
                  });
                  break;

                case 15:
                  this.$ = [i[a - 2], i[a]];
                  break;

                case 16:
                  this.$ = {}, this.$[i[a][0]] = i[a][1];
                  break;

                case 17:
                  this.$ = i[a - 2], void 0 !== i[a - 2][i[a][0]] && (this.$.__duplicateProperties__ || Object.defineProperty(this.$, "__duplicateProperties__", {
                    value: [],
                    enumerable: !1
                  }), this.$.__duplicateProperties__.push(i[a][0])), i[a - 2][i[a][0]] = i[a][1];
                  break;

                case 18:
                  this.$ = [], Object.defineProperty(this.$, "__line__", {
                    value: this._$.first_line,
                    enumerable: !1
                  });
                  break;

                case 20:
                  this.$ = [i[a]];
                  break;

                case 21:
                  this.$ = i[a - 2], i[a - 2].push(i[a]);
              }
            },
            table: [{
              3: 5,
              4: n,
              5: 6,
              6: o,
              7: 3,
              8: r,
              9: 4,
              10: i,
              11: s,
              12: 1,
              13: 2,
              15: 7,
              16: 8,
              17: a,
              23: c
            }, {
              1: [3]
            }, {
              14: [1, 16]
            }, t(u, [2, 7]), t(u, [2, 8]), t(u, [2, 9]), t(u, [2, 10]), t(u, [2, 11]), t(u, [2, 12]), t(u, [2, 3]), t(u, [2, 4]), t(u, [2, 5]), t([14, 18, 21, 22, 24], [2, 1]), t(u, [2, 2]), {
              3: 20,
              4: n,
              18: [1, 17],
              19: 18,
              20: 19
            }, {
              3: 5,
              4: n,
              5: 6,
              6: o,
              7: 3,
              8: r,
              9: 4,
              10: i,
              11: s,
              13: 23,
              15: 7,
              16: 8,
              17: a,
              23: c,
              24: [1, 21],
              25: 22
            }, {
              1: [2, 6]
            }, t(u, [2, 13]), {
              18: [1, 24],
              22: [1, 25]
            }, t(l, [2, 16]), {
              21: [1, 26]
            }, t(u, [2, 18]), {
              22: [1, 28],
              24: [1, 27]
            }, t(p, [2, 20]), t(u, [2, 14]), {
              3: 20,
              4: n,
              20: 29
            }, {
              3: 5,
              4: n,
              5: 6,
              6: o,
              7: 3,
              8: r,
              9: 4,
              10: i,
              11: s,
              13: 30,
              15: 7,
              16: 8,
              17: a,
              23: c
            }, t(u, [2, 19]), {
              3: 5,
              4: n,
              5: 6,
              6: o,
              7: 3,
              8: r,
              9: 4,
              10: i,
              11: s,
              13: 31,
              15: 7,
              16: 8,
              17: a,
              23: c
            }, t(l, [2, 17]), t(l, [2, 15]), t(p, [2, 21])],
            defaultActions: {
              16: [2, 6]
            },
            parseError: function (e, t) {
              function n(e, t) {
                this.message = e, this.hash = t;
              }

              if (!t.recoverable) throw n.prototype = Error, new n(e, t);
              this.trace(e);
            },
            parse: function (e) {
              var t = this,
                  n = [0],
                  o = [null],
                  r = [],
                  i = this.table,
                  s = "",
                  a = 0,
                  c = 0,
                  u = 0,
                  l = r.slice.call(arguments, 1),
                  p = Object.create(this.lexer),
                  f = {
                yy: {}
              };

              for (var h in this.yy) Object.prototype.hasOwnProperty.call(this.yy, h) && (f.yy[h] = this.yy[h]);

              p.setInput(e, f.yy), f.yy.lexer = p, f.yy.parser = this, void 0 === p.yylloc && (p.yylloc = {});
              var d = p.yylloc;
              r.push(d);
              var g = p.options && p.options.ranges;
              "function" == typeof f.yy.parseError ? this.parseError = f.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;

              for (var y, m, _, v, b, E, T, x, S, O = function () {
                var e;
                return "number" != typeof (e = p.lex() || 1) && (e = t.symbols_[e] || e), e;
              }, C = {};;) {
                if (_ = n[n.length - 1], this.defaultActions[_] ? v = this.defaultActions[_] : (null !== y && void 0 !== y || (y = O()), v = i[_] && i[_][y]), void 0 === v || !v.length || !v[0]) {
                  var I = "";
                  S = [];

                  for (E in i[_]) this.terminals_[E] && E > 2 && S.push("'" + this.terminals_[E] + "'");

                  I = p.showPosition ? "Parse error on line " + (a + 1) + ":\n" + p.showPosition() + "\nExpecting " + S.join(", ") + ", got '" + (this.terminals_[y] || y) + "'" : "Parse error on line " + (a + 1) + ": Unexpected " + (1 == y ? "end of input" : "'" + (this.terminals_[y] || y) + "'"), this.parseError(I, {
                    text: p.match,
                    token: this.terminals_[y] || y,
                    line: p.yylineno,
                    loc: d,
                    expected: S
                  });
                }

                if (v[0] instanceof Array && v.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + _ + ", token: " + y);

                switch (v[0]) {
                  case 1:
                    n.push(y), o.push(p.yytext), r.push(p.yylloc), n.push(v[1]), y = null, m ? (y = m, m = null) : (c = p.yyleng, s = p.yytext, a = p.yylineno, d = p.yylloc, u > 0 && u--);
                    break;

                  case 2:
                    if (T = this.productions_[v[1]][1], C.$ = o[o.length - T], C._$ = {
                      first_line: r[r.length - (T || 1)].first_line,
                      last_line: r[r.length - 1].last_line,
                      first_column: r[r.length - (T || 1)].first_column,
                      last_column: r[r.length - 1].last_column
                    }, g && (C._$.range = [r[r.length - (T || 1)].range[0], r[r.length - 1].range[1]]), void 0 !== (b = this.performAction.apply(C, [s, c, a, f.yy, v[1], o, r].concat(l)))) return b;
                    T && (n = n.slice(0, -1 * T * 2), o = o.slice(0, -1 * T), r = r.slice(0, -1 * T)), n.push(this.productions_[v[1]][0]), o.push(C.$), r.push(C._$), x = i[n[n.length - 2]][n[n.length - 1]], n.push(x);
                    break;

                  case 3:
                    return !0;
                }
              }

              return !0;
            }
          },
              h = {
            EOF: 1,
            parseError: function (e, t) {
              if (!this.yy.parser) throw new Error(e);
              this.yy.parser.parseError(e, t);
            },
            setInput: function (e, t) {
              return this.yy = t || this.yy || {}, this._input = e, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                first_line: 1,
                first_column: 0,
                last_line: 1,
                last_column: 0
              }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
            },
            input: function () {
              var e = this._input[0];
              return this.yytext += e, this.yyleng++, this.offset++, this.match += e, this.matched += e, e.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), e;
            },
            unput: function (e) {
              var t = e.length,
                  n = e.split(/(?:\r\n?|\n)/g);
              this._input = e + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - t), this.offset -= t;
              var o = this.match.split(/(?:\r\n?|\n)/g);
              this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), n.length - 1 && (this.yylineno -= n.length - 1);
              var r = this.yylloc.range;
              return this.yylloc = {
                first_line: this.yylloc.first_line,
                last_line: this.yylineno + 1,
                first_column: this.yylloc.first_column,
                last_column: n ? (n.length === o.length ? this.yylloc.first_column : 0) + o[o.length - n.length].length - n[0].length : this.yylloc.first_column - t
              }, this.options.ranges && (this.yylloc.range = [r[0], r[0] + this.yyleng - t]), this.yyleng = this.yytext.length, this;
            },
            more: function () {
              return this._more = !0, this;
            },
            reject: function () {
              return this.options.backtrack_lexer ? (this._backtrack = !0, this) : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
              });
            },
            less: function (e) {
              this.unput(this.match.slice(e));
            },
            pastInput: function () {
              var e = this.matched.substr(0, this.matched.length - this.match.length);
              return (e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "");
            },
            upcomingInput: function () {
              var e = this.match;
              return e.length < 20 && (e += this._input.substr(0, 20 - e.length)), (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "");
            },
            showPosition: function () {
              var e = this.pastInput(),
                  t = new Array(e.length + 1).join("-");
              return e + this.upcomingInput() + "\n" + t + "^";
            },
            test_match: function (e, t) {
              var n, o, r;
              if (this.options.backtrack_lexer && (r = {
                yylineno: this.yylineno,
                yylloc: {
                  first_line: this.yylloc.first_line,
                  last_line: this.last_line,
                  first_column: this.yylloc.first_column,
                  last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
              }, this.options.ranges && (r.yylloc.range = this.yylloc.range.slice(0))), (o = e[0].match(/(?:\r\n?|\n).*/g)) && (this.yylineno += o.length), this.yylloc = {
                first_line: this.yylloc.last_line,
                last_line: this.yylineno + 1,
                first_column: this.yylloc.last_column,
                last_column: o ? o[o.length - 1].length - o[o.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + e[0].length
              }, this.yytext += e[0], this.match += e[0], this.matches = e, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(e[0].length), this.matched += e[0], n = this.performAction.call(this, this.yy, this, t, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), n) return n;

              if (this._backtrack) {
                for (var i in r) this[i] = r[i];

                return !1;
              }

              return !1;
            },
            next: function () {
              if (this.done) return this.EOF;
              this._input || (this.done = !0);
              var e, t, n, o;
              this._more || (this.yytext = "", this.match = "");

              for (var r = this._currentRules(), i = 0; i < r.length; i++) if ((n = this._input.match(this.rules[r[i]])) && (!t || n[0].length > t[0].length)) {
                if (t = n, o = i, this.options.backtrack_lexer) {
                  if (!1 !== (e = this.test_match(n, r[i]))) return e;

                  if (this._backtrack) {
                    t = !1;
                    continue;
                  }

                  return !1;
                }

                if (!this.options.flex) break;
              }

              return t ? !1 !== (e = this.test_match(t, r[o])) && e : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
              });
            },
            lex: function () {
              var e = this.next();
              return e || this.lex();
            },
            begin: function (e) {
              this.conditionStack.push(e);
            },
            popState: function () {
              return this.conditionStack.length - 1 > 0 ? this.conditionStack.pop() : this.conditionStack[0];
            },
            _currentRules: function () {
              return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
            },
            topState: function (e) {
              return (e = this.conditionStack.length - 1 - Math.abs(e || 0)) >= 0 ? this.conditionStack[e] : "INITIAL";
            },
            pushState: function (e) {
              this.begin(e);
            },
            stateStackSize: function () {
              return this.conditionStack.length;
            },
            options: {},
            performAction: function (e, t, n, o) {
              switch (n) {
                case 0:
                  break;

                case 1:
                  return 6;

                case 2:
                  return t.yytext = t.yytext.substr(1, t.yyleng - 2), 4;

                case 3:
                  return 17;

                case 4:
                  return 18;

                case 5:
                  return 23;

                case 6:
                  return 24;

                case 7:
                  return 22;

                case 8:
                  return 21;

                case 9:
                  return 10;

                case 10:
                  return 11;

                case 11:
                  return 8;

                case 12:
                  return 14;

                case 13:
                  return "INVALID";
              }
            },
            rules: [/^(?:\s+)/, /^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/, /^(?:"(?:\\[\\"bfnrt\/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/, /^(?:\{)/, /^(?:\})/, /^(?:\[)/, /^(?:\])/, /^(?:,)/, /^(?::)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:null\b)/, /^(?:$)/, /^(?:.)/],
            conditions: {
              INITIAL: {
                rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                inclusive: !0
              }
            }
          };

          return f.lexer = h, e.prototype = f, f.Parser = e, new e();
        }();

        void 0 !== e && void 0 !== n && (n.parser = r, n.Parser = r.Parser, n.parse = function () {
          return r.parse.apply(r, arguments);
        }, n.main = function (t) {
          t[1] || (console.log("Usage: " + t[0] + " FILE"), o.exit(1));
          var r = e("fs").readFileSync(e("path").normalize(t[1]), "utf8");
          return n.parser.parse(r);
        }, void 0 !== t && e.main === t && n.main(o.argv.slice(1)));
      }).call(this, e("_process"));
    }, {
      _process: 18,
      fs: 13,
      path: 17
    }],
    12: [function (e, t, n) {

      function o(e, t) {
        this.x = e, this.y = t;
      }

      t.exports = o, o.prototype = {
        clone: function () {
          return new o(this.x, this.y);
        },
        add: function (e) {
          return this.clone()._add(e);
        },
        sub: function (e) {
          return this.clone()._sub(e);
        },
        multByPoint: function (e) {
          return this.clone()._multByPoint(e);
        },
        divByPoint: function (e) {
          return this.clone()._divByPoint(e);
        },
        mult: function (e) {
          return this.clone()._mult(e);
        },
        div: function (e) {
          return this.clone()._div(e);
        },
        rotate: function (e) {
          return this.clone()._rotate(e);
        },
        rotateAround: function (e, t) {
          return this.clone()._rotateAround(e, t);
        },
        matMult: function (e) {
          return this.clone()._matMult(e);
        },
        unit: function () {
          return this.clone()._unit();
        },
        perp: function () {
          return this.clone()._perp();
        },
        round: function () {
          return this.clone()._round();
        },
        mag: function () {
          return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        equals: function (e) {
          return this.x === e.x && this.y === e.y;
        },
        dist: function (e) {
          return Math.sqrt(this.distSqr(e));
        },
        distSqr: function (e) {
          var t = e.x - this.x,
              n = e.y - this.y;
          return t * t + n * n;
        },
        angle: function () {
          return Math.atan2(this.y, this.x);
        },
        angleTo: function (e) {
          return Math.atan2(this.y - e.y, this.x - e.x);
        },
        angleWith: function (e) {
          return this.angleWithSep(e.x, e.y);
        },
        angleWithSep: function (e, t) {
          return Math.atan2(this.x * t - this.y * e, this.x * e + this.y * t);
        },
        _matMult: function (e) {
          var t = e[0] * this.x + e[1] * this.y,
              n = e[2] * this.x + e[3] * this.y;
          return this.x = t, this.y = n, this;
        },
        _add: function (e) {
          return this.x += e.x, this.y += e.y, this;
        },
        _sub: function (e) {
          return this.x -= e.x, this.y -= e.y, this;
        },
        _mult: function (e) {
          return this.x *= e, this.y *= e, this;
        },
        _div: function (e) {
          return this.x /= e, this.y /= e, this;
        },
        _multByPoint: function (e) {
          return this.x *= e.x, this.y *= e.y, this;
        },
        _divByPoint: function (e) {
          return this.x /= e.x, this.y /= e.y, this;
        },
        _unit: function () {
          return this._div(this.mag()), this;
        },
        _perp: function () {
          var e = this.y;
          return this.y = this.x, this.x = -e, this;
        },
        _rotate: function (e) {
          var t = Math.cos(e),
              n = Math.sin(e),
              o = t * this.x - n * this.y,
              r = n * this.x + t * this.y;
          return this.x = o, this.y = r, this;
        },
        _rotateAround: function (e, t) {
          var n = Math.cos(e),
              o = Math.sin(e),
              r = t.x + n * (this.x - t.x) - o * (this.y - t.y),
              i = t.y + o * (this.x - t.x) + n * (this.y - t.y);
          return this.x = r, this.y = i, this;
        },
        _round: function () {
          return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
        }
      }, o.convert = function (e) {
        return e instanceof o ? e : Array.isArray(e) ? new o(e[0], e[1]) : e;
      };
    }, {}],
    13: [function (e, t, n) {}, {}],
    14: [function (e, t, n) {
      t.exports = function e(t) {
        switch (t && t.type || null) {
          case "FeatureCollection":
            return t.features = t.features.reduce(function (t, n) {
              return t.concat(e(n));
            }, []), t;

          case "Feature":
            return t.geometry ? e(t.geometry).map(function (e) {
              var n = {
                type: "Feature",
                properties: JSON.parse(JSON.stringify(t.properties)),
                geometry: e
              };
              return void 0 !== t.id && (n.id = t.id), n;
            }) : t;

          case "MultiPoint":
            return t.coordinates.map(function (e) {
              return {
                type: "Point",
                coordinates: e
              };
            });

          case "MultiPolygon":
            return t.coordinates.map(function (e) {
              return {
                type: "Polygon",
                coordinates: e
              };
            });

          case "MultiLineString":
            return t.coordinates.map(function (e) {
              return {
                type: "LineString",
                coordinates: e
              };
            });

          case "GeometryCollection":
            return t.geometries.map(e).reduce(function (e, t) {
              return e.concat(t);
            }, []);

          case "Point":
          case "Polygon":
          case "LineString":
            return [t];
        }
      };
    }, {}],
    15: [function (e, t, n) {
      var o = t.exports = function (e, t) {
        if (t || (t = 16), void 0 === e && (e = 128), e <= 0) return "0";

        for (var n = Math.log(Math.pow(2, e)) / Math.log(t), r = 2; n === 1 / 0; r *= 2) n = Math.log(Math.pow(2, e / r)) / Math.log(t) * r;

        for (var i = n - Math.floor(n), s = "", r = 0; r < Math.floor(n); r++) s = (c = Math.floor(Math.random() * t).toString(t)) + s;

        if (i) {
          var a = Math.pow(t, i),
              c = Math.floor(Math.random() * a).toString(t);
          s = c + s;
        }

        var u = parseInt(s, t);
        return u !== 1 / 0 && u >= Math.pow(2, e) ? o(e, t) : s;
      };

      o.rack = function (e, t, n) {
        var r = function (r) {
          var s = 0;

          do {
            if (s++ > 10) {
              if (!n) throw new Error("too many ID collisions, use more bits");
              e += n;
            }

            var a = o(e, t);
          } while (Object.hasOwnProperty.call(i, a));

          return i[a] = r, a;
        },
            i = r.hats = {};

        return r.get = function (e) {
          return r.hats[e];
        }, r.set = function (e, t) {
          return r.hats[e] = t, r;
        }, r.bits = e || 128, r.base = t || 16, r;
      };
    }, {}],
    16: [function (e, t, n) {
      (function (e) {
        function o(e, t) {
          for (var n = -1, o = null == e ? 0 : e.length, r = 0, i = []; ++n < o;) {
            var s = e[n];
            t(s, n, e) && (i[r++] = s);
          }

          return i;
        }

        function r(e, t) {
          for (var n = -1, o = t.length, r = e.length; ++n < o;) e[r + n] = t[n];

          return e;
        }

        function i(e, t) {
          for (var n = -1, o = null == e ? 0 : e.length; ++n < o;) if (t(e[n], n, e)) return !0;

          return !1;
        }

        function s(e, t) {
          for (var n = -1, o = Array(e); ++n < e;) o[n] = t(n);

          return o;
        }

        function a(e, t) {
          return e.has(t);
        }

        function c(e, t) {
          return null == e ? void 0 : e[t];
        }

        function u(e) {
          var t = -1,
              n = Array(e.size);
          return e.forEach(function (e, o) {
            n[++t] = [o, e];
          }), n;
        }

        function l(e) {
          var t = -1,
              n = Array(e.size);
          return e.forEach(function (e) {
            n[++t] = e;
          }), n;
        }

        function p(e) {
          var t = -1,
              n = null == e ? 0 : e.length;

          for (this.clear(); ++t < n;) {
            var o = e[t];
            this.set(o[0], o[1]);
          }
        }

        function f(e) {
          var t = -1,
              n = null == e ? 0 : e.length;

          for (this.clear(); ++t < n;) {
            var o = e[t];
            this.set(o[0], o[1]);
          }
        }

        function h(e) {
          var t = -1,
              n = null == e ? 0 : e.length;

          for (this.clear(); ++t < n;) {
            var o = e[t];
            this.set(o[0], o[1]);
          }
        }

        function d(e) {
          var t = -1,
              n = null == e ? 0 : e.length;

          for (this.__data__ = new h(); ++t < n;) this.add(e[t]);
        }

        function g(e) {
          var t = this.__data__ = new f(e);
          this.size = t.size;
        }

        function y(e, t) {
          var n = ut(e),
              o = !n && ct(e),
              r = !n && !o && lt(e),
              i = !n && !o && !r && pt(e),
              a = n || o || r || i,
              c = a ? s(e.length, String) : [],
              u = c.length;

          for (var l in e) !t && !je.call(e, l) || a && ("length" == l || r && ("offset" == l || "parent" == l) || i && ("buffer" == l || "byteLength" == l || "byteOffset" == l) || N(l, u)) || c.push(l);

          return c;
        }

        function m(e, t) {
          for (var n = e.length; n--;) if (D(e[n][0], t)) return n;

          return -1;
        }

        function _(e, t, n) {
          var o = t(e);
          return ut(e) ? o : r(o, n(e));
        }

        function v(e) {
          return null == e ? void 0 === e ? he : se : $e && $e in Object(e) ? A(e) : k(e);
        }

        function b(e) {
          return $(e) && v(e) == K;
        }

        function E(e, t, n, o, r) {
          return e === t || (null == e || null == t || !$(e) && !$(t) ? e !== e && t !== t : T(e, t, n, o, E, r));
        }

        function T(e, t, n, o, r, i) {
          var s = ut(e),
              a = ut(t),
              c = s ? H : at(e),
              u = a ? H : at(t),
              l = (c = c == K ? ae : c) == ae,
              p = (u = u == K ? ae : u) == ae,
              f = c == u;

          if (f && lt(e)) {
            if (!lt(t)) return !1;
            s = !0, l = !1;
          }

          if (f && !l) return i || (i = new g()), s || pt(e) ? O(e, t, n, o, r, i) : C(e, t, c, n, o, r, i);

          if (!(n & Y)) {
            var h = l && je.call(e, "__wrapped__"),
                d = p && je.call(t, "__wrapped__");

            if (h || d) {
              var y = h ? e.value() : e,
                  m = d ? t.value() : t;
              return i || (i = new g()), r(y, m, n, o, i);
            }
          }

          return !!f && (i || (i = new g()), I(e, t, n, o, r, i));
        }

        function x(e) {
          return !(!B(e) || j(e)) && (V(e) ? Re : me).test(R(e));
        }

        function S(e) {
          if (!F(e)) return qe(e);
          var t = [];

          for (var n in Object(e)) je.call(e, n) && "constructor" != n && t.push(n);

          return t;
        }

        function O(e, t, n, o, r, s) {
          var c = n & Y,
              u = e.length,
              l = t.length;
          if (u != l && !(c && l > u)) return !1;
          var p = s.get(e);
          if (p && s.get(t)) return p == t;
          var f = -1,
              h = !0,
              g = n & X ? new d() : void 0;

          for (s.set(e, t), s.set(t, e); ++f < u;) {
            var y = e[f],
                m = t[f];
            if (o) var _ = c ? o(m, y, f, t, e, s) : o(y, m, f, e, t, s);

            if (void 0 !== _) {
              if (_) continue;
              h = !1;
              break;
            }

            if (g) {
              if (!i(t, function (e, t) {
                if (!a(g, t) && (y === e || r(y, e, n, o, s))) return g.push(t);
              })) {
                h = !1;
                break;
              }
            } else if (y !== m && !r(y, m, n, o, s)) {
              h = !1;
              break;
            }
          }

          return s.delete(e), s.delete(t), h;
        }

        function C(e, t, n, o, r, i, s) {
          switch (n) {
            case ge:
              if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
              e = e.buffer, t = t.buffer;

            case de:
              return !(e.byteLength != t.byteLength || !i(new Ve(e), new Ve(t)));

            case Q:
            case ee:
            case ie:
              return D(+e, +t);

            case te:
              return e.name == t.name && e.message == t.message;

            case ue:
            case pe:
              return e == t + "";

            case re:
              var a = u;

            case le:
              var c = o & Y;
              if (a || (a = l), e.size != t.size && !c) return !1;
              var p = s.get(e);
              if (p) return p == t;
              o |= X, s.set(e, t);
              var f = O(a(e), a(t), o, r, i, s);
              return s.delete(e), f;

            case fe:
              if (it) return it.call(e) == it.call(t);
          }

          return !1;
        }

        function I(e, t, n, o, r, i) {
          var s = n & Y,
              a = L(e),
              c = a.length;
          if (c != L(t).length && !s) return !1;

          for (var u = c; u--;) {
            var l = a[u];
            if (!(s ? l in t : je.call(t, l))) return !1;
          }

          var p = i.get(e);
          if (p && i.get(t)) return p == t;
          var f = !0;
          i.set(e, t), i.set(t, e);

          for (var h = s; ++u < c;) {
            var d = e[l = a[u]],
                g = t[l];
            if (o) var y = s ? o(g, d, l, t, e, i) : o(d, g, l, e, t, i);

            if (!(void 0 === y ? d === g || r(d, g, n, o, i) : y)) {
              f = !1;
              break;
            }

            h || (h = "constructor" == l);
          }

          if (f && !h) {
            var m = e.constructor,
                _ = t.constructor;
            m != _ && "constructor" in e && "constructor" in t && !("function" == typeof m && m instanceof m && "function" == typeof _ && _ instanceof _) && (f = !1);
          }

          return i.delete(e), i.delete(t), f;
        }

        function L(e) {
          return _(e, J, st);
        }

        function M(e, t) {
          var n = e.__data__;
          return P(t) ? n["string" == typeof t ? "string" : "hash"] : n.map;
        }

        function w(e, t) {
          var n = c(e, t);
          return x(n) ? n : void 0;
        }

        function A(e) {
          var t = je.call(e, $e),
              n = e[$e];

          try {
            e[$e] = void 0;
            var o = !0;
          } catch (e) {}

          var r = ke.call(e);
          return o && (t ? e[$e] = n : delete e[$e]), r;
        }

        function N(e, t) {
          return !!(t = null == t ? W : t) && ("number" == typeof e || _e.test(e)) && e > -1 && e % 1 == 0 && e < t;
        }

        function P(e) {
          var t = typeof e;
          return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e;
        }

        function j(e) {
          return !!Fe && Fe in e;
        }

        function F(e) {
          var t = e && e.constructor;
          return e === ("function" == typeof t && t.prototype || Ae);
        }

        function k(e) {
          return ke.call(e);
        }

        function R(e) {
          if (null != e) {
            try {
              return Pe.call(e);
            } catch (e) {}

            try {
              return e + "";
            } catch (e) {}
          }

          return "";
        }

        function D(e, t) {
          return e === t || e !== e && t !== t;
        }

        function U(e) {
          return null != e && G(e.length) && !V(e);
        }

        function V(e) {
          if (!B(e)) return !1;
          var t = v(e);
          return t == ne || t == oe || t == Z || t == ce;
        }

        function G(e) {
          return "number" == typeof e && e > -1 && e % 1 == 0 && e <= W;
        }

        function B(e) {
          var t = typeof e;
          return null != e && ("object" == t || "function" == t);
        }

        function $(e) {
          return null != e && "object" == typeof e;
        }

        function J(e) {
          return U(e) ? y(e) : S(e);
        }

        var z = 200,
            q = "__lodash_hash_undefined__",
            Y = 1,
            X = 2,
            W = 9007199254740991,
            K = "[object Arguments]",
            H = "[object Array]",
            Z = "[object AsyncFunction]",
            Q = "[object Boolean]",
            ee = "[object Date]",
            te = "[object Error]",
            ne = "[object Function]",
            oe = "[object GeneratorFunction]",
            re = "[object Map]",
            ie = "[object Number]",
            se = "[object Null]",
            ae = "[object Object]",
            ce = "[object Proxy]",
            ue = "[object RegExp]",
            le = "[object Set]",
            pe = "[object String]",
            fe = "[object Symbol]",
            he = "[object Undefined]",
            de = "[object ArrayBuffer]",
            ge = "[object DataView]",
            ye = /[\\^$.*+?()[\]{}|]/g,
            me = /^\[object .+?Constructor\]$/,
            _e = /^(?:0|[1-9]\d*)$/,
            ve = {};
        ve["[object Float32Array]"] = ve["[object Float64Array]"] = ve["[object Int8Array]"] = ve["[object Int16Array]"] = ve["[object Int32Array]"] = ve["[object Uint8Array]"] = ve["[object Uint8ClampedArray]"] = ve["[object Uint16Array]"] = ve["[object Uint32Array]"] = !0, ve[K] = ve[H] = ve[de] = ve[Q] = ve[ge] = ve[ee] = ve[te] = ve[ne] = ve[re] = ve[ie] = ve[ae] = ve[ue] = ve[le] = ve[pe] = ve["[object WeakMap]"] = !1;

        var be = "object" == typeof e && e && e.Object === Object && e,
            Ee = "object" == typeof self && self && self.Object === Object && self,
            Te = be || Ee || Function("return this")(),
            xe = "object" == typeof n && n && !n.nodeType && n,
            Se = xe && "object" == typeof t && t && !t.nodeType && t,
            Oe = Se && Se.exports === xe,
            Ce = Oe && be.process,
            Ie = function () {
          try {
            return Ce && Ce.binding && Ce.binding("util");
          } catch (e) {}
        }(),
            Le = Ie && Ie.isTypedArray,
            Me = Array.prototype,
            we = Function.prototype,
            Ae = Object.prototype,
            Ne = Te["__core-js_shared__"],
            Pe = we.toString,
            je = Ae.hasOwnProperty,
            Fe = function () {
          var e = /[^.]+$/.exec(Ne && Ne.keys && Ne.keys.IE_PROTO || "");
          return e ? "Symbol(src)_1." + e : "";
        }(),
            ke = Ae.toString,
            Re = RegExp("^" + Pe.call(je).replace(ye, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
            De = Oe ? Te.Buffer : void 0,
            Ue = Te.Symbol,
            Ve = Te.Uint8Array,
            Ge = Ae.propertyIsEnumerable,
            Be = Me.splice,
            $e = Ue ? Ue.toStringTag : void 0,
            Je = Object.getOwnPropertySymbols,
            ze = De ? De.isBuffer : void 0,
            qe = function (e, t) {
          return function (n) {
            return e(t(n));
          };
        }(Object.keys, Object),
            Ye = w(Te, "DataView"),
            Xe = w(Te, "Map"),
            We = w(Te, "Promise"),
            Ke = w(Te, "Set"),
            He = w(Te, "WeakMap"),
            Ze = w(Object, "create"),
            Qe = R(Ye),
            et = R(Xe),
            tt = R(We),
            nt = R(Ke),
            ot = R(He),
            rt = Ue ? Ue.prototype : void 0,
            it = rt ? rt.valueOf : void 0;

        p.prototype.clear = function () {
          this.__data__ = Ze ? Ze(null) : {}, this.size = 0;
        }, p.prototype.delete = function (e) {
          var t = this.has(e) && delete this.__data__[e];
          return this.size -= t ? 1 : 0, t;
        }, p.prototype.get = function (e) {
          var t = this.__data__;

          if (Ze) {
            var n = t[e];
            return n === q ? void 0 : n;
          }

          return je.call(t, e) ? t[e] : void 0;
        }, p.prototype.has = function (e) {
          var t = this.__data__;
          return Ze ? void 0 !== t[e] : je.call(t, e);
        }, p.prototype.set = function (e, t) {
          var n = this.__data__;
          return this.size += this.has(e) ? 0 : 1, n[e] = Ze && void 0 === t ? q : t, this;
        }, f.prototype.clear = function () {
          this.__data__ = [], this.size = 0;
        }, f.prototype.delete = function (e) {
          var t = this.__data__,
              n = m(t, e);
          return !(n < 0 || (n == t.length - 1 ? t.pop() : Be.call(t, n, 1), --this.size, 0));
        }, f.prototype.get = function (e) {
          var t = this.__data__,
              n = m(t, e);
          return n < 0 ? void 0 : t[n][1];
        }, f.prototype.has = function (e) {
          return m(this.__data__, e) > -1;
        }, f.prototype.set = function (e, t) {
          var n = this.__data__,
              o = m(n, e);
          return o < 0 ? (++this.size, n.push([e, t])) : n[o][1] = t, this;
        }, h.prototype.clear = function () {
          this.size = 0, this.__data__ = {
            hash: new p(),
            map: new (Xe || f)(),
            string: new p()
          };
        }, h.prototype.delete = function (e) {
          var t = M(this, e).delete(e);
          return this.size -= t ? 1 : 0, t;
        }, h.prototype.get = function (e) {
          return M(this, e).get(e);
        }, h.prototype.has = function (e) {
          return M(this, e).has(e);
        }, h.prototype.set = function (e, t) {
          var n = M(this, e),
              o = n.size;
          return n.set(e, t), this.size += n.size == o ? 0 : 1, this;
        }, d.prototype.add = d.prototype.push = function (e) {
          return this.__data__.set(e, q), this;
        }, d.prototype.has = function (e) {
          return this.__data__.has(e);
        }, g.prototype.clear = function () {
          this.__data__ = new f(), this.size = 0;
        }, g.prototype.delete = function (e) {
          var t = this.__data__,
              n = t.delete(e);
          return this.size = t.size, n;
        }, g.prototype.get = function (e) {
          return this.__data__.get(e);
        }, g.prototype.has = function (e) {
          return this.__data__.has(e);
        }, g.prototype.set = function (e, t) {
          var n = this.__data__;

          if (n instanceof f) {
            var o = n.__data__;
            if (!Xe || o.length < z - 1) return o.push([e, t]), this.size = ++n.size, this;
            n = this.__data__ = new h(o);
          }

          return n.set(e, t), this.size = n.size, this;
        };
        var st = Je ? function (e) {
          return null == e ? [] : (e = Object(e), o(Je(e), function (t) {
            return Ge.call(e, t);
          }));
        } : function () {
          return [];
        },
            at = v;
        (Ye && at(new Ye(new ArrayBuffer(1))) != ge || Xe && at(new Xe()) != re || We && "[object Promise]" != at(We.resolve()) || Ke && at(new Ke()) != le || He && "[object WeakMap]" != at(new He())) && (at = function (e) {
          var t = v(e),
              n = t == ae ? e.constructor : void 0,
              o = n ? R(n) : "";
          if (o) switch (o) {
            case Qe:
              return ge;

            case et:
              return re;

            case tt:
              return "[object Promise]";

            case nt:
              return le;

            case ot:
              return "[object WeakMap]";
          }
          return t;
        });

        var ct = b(function () {
          return arguments;
        }()) ? b : function (e) {
          return $(e) && je.call(e, "callee") && !Ge.call(e, "callee");
        },
            ut = Array.isArray,
            lt = ze || function () {
          return !1;
        },
            pt = Le ? function (e) {
          return function (t) {
            return e(t);
          };
        }(Le) : function (e) {
          return $(e) && G(e.length) && !!ve[v(e)];
        };

        t.exports = function (e, t) {
          return E(e, t);
        };
      }).call(this, "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}],
    17: [function (e, t, n) {
      (function (e) {
        function t(e, t) {
          for (var n = 0, o = e.length - 1; o >= 0; o--) {
            var r = e[o];
            "." === r ? e.splice(o, 1) : ".." === r ? (e.splice(o, 1), n++) : n && (e.splice(o, 1), n--);
          }

          if (t) for (; n--; n) e.unshift("..");
          return e;
        }

        function o(e) {
          "string" != typeof e && (e += "");
          var t,
              n = 0,
              o = -1,
              r = !0;

          for (t = e.length - 1; t >= 0; --t) if (47 === e.charCodeAt(t)) {
            if (!r) {
              n = t + 1;
              break;
            }
          } else -1 === o && (r = !1, o = t + 1);

          return -1 === o ? "" : e.slice(n, o);
        }

        function r(e, t) {
          if (e.filter) return e.filter(t);

          for (var n = [], o = 0; o < e.length; o++) t(e[o], o, e) && n.push(e[o]);

          return n;
        }

        n.resolve = function () {
          for (var n = "", o = !1, i = arguments.length - 1; i >= -1 && !o; i--) {
            var s = i >= 0 ? arguments[i] : e.cwd();
            if ("string" != typeof s) throw new TypeError("Arguments to path.resolve must be strings");
            s && (n = s + "/" + n, o = "/" === s.charAt(0));
          }

          return n = t(r(n.split("/"), function (e) {
            return !!e;
          }), !o).join("/"), (o ? "/" : "") + n || ".";
        }, n.normalize = function (e) {
          var o = n.isAbsolute(e),
              s = "/" === i(e, -1);
          return (e = t(r(e.split("/"), function (e) {
            return !!e;
          }), !o).join("/")) || o || (e = "."), e && s && (e += "/"), (o ? "/" : "") + e;
        }, n.isAbsolute = function (e) {
          return "/" === e.charAt(0);
        }, n.join = function () {
          var e = Array.prototype.slice.call(arguments, 0);
          return n.normalize(r(e, function (e, t) {
            if ("string" != typeof e) throw new TypeError("Arguments to path.join must be strings");
            return e;
          }).join("/"));
        }, n.relative = function (e, t) {
          function o(e) {
            for (var t = 0; t < e.length && "" === e[t]; t++);

            for (var n = e.length - 1; n >= 0 && "" === e[n]; n--);

            return t > n ? [] : e.slice(t, n - t + 1);
          }

          e = n.resolve(e).substr(1), t = n.resolve(t).substr(1);

          for (var r = o(e.split("/")), i = o(t.split("/")), s = Math.min(r.length, i.length), a = s, c = 0; c < s; c++) if (r[c] !== i[c]) {
            a = c;
            break;
          }

          for (var u = [], c = a; c < r.length; c++) u.push("..");

          return (u = u.concat(i.slice(a))).join("/");
        }, n.sep = "/", n.delimiter = ":", n.dirname = function (e) {
          if ("string" != typeof e && (e += ""), 0 === e.length) return ".";

          for (var t = e.charCodeAt(0), n = 47 === t, o = -1, r = !0, i = e.length - 1; i >= 1; --i) if (47 === (t = e.charCodeAt(i))) {
            if (!r) {
              o = i;
              break;
            }
          } else r = !1;

          return -1 === o ? n ? "/" : "." : n && 1 === o ? "/" : e.slice(0, o);
        }, n.basename = function (e, t) {
          var n = o(e);
          return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)), n;
        }, n.extname = function (e) {
          "string" != typeof e && (e += "");

          for (var t = -1, n = 0, o = -1, r = !0, i = 0, s = e.length - 1; s >= 0; --s) {
            var a = e.charCodeAt(s);
            if (47 !== a) -1 === o && (r = !1, o = s + 1), 46 === a ? -1 === t ? t = s : 1 !== i && (i = 1) : -1 !== t && (i = -1);else if (!r) {
              n = s + 1;
              break;
            }
          }

          return -1 === t || -1 === o || 0 === i || 1 === i && t === o - 1 && t === n + 1 ? "" : e.slice(t, o);
        };
        var i = "b" === "ab".substr(-1) ? function (e, t, n) {
          return e.substr(t, n);
        } : function (e, t, n) {
          return t < 0 && (t = e.length + t), e.substr(t, n);
        };
      }).call(this, e("_process"));
    }, {
      _process: 18
    }],
    18: [function (e, t, n) {
      function o() {
        throw new Error("setTimeout has not been defined");
      }

      function r() {
        throw new Error("clearTimeout has not been defined");
      }

      function i(e) {
        if (p === setTimeout) return setTimeout(e, 0);
        if ((p === o || !p) && setTimeout) return p = setTimeout, setTimeout(e, 0);

        try {
          return p(e, 0);
        } catch (t) {
          try {
            return p.call(null, e, 0);
          } catch (t) {
            return p.call(this, e, 0);
          }
        }
      }

      function s(e) {
        if (f === clearTimeout) return clearTimeout(e);
        if ((f === r || !f) && clearTimeout) return f = clearTimeout, clearTimeout(e);

        try {
          return f(e);
        } catch (t) {
          try {
            return f.call(null, e);
          } catch (t) {
            return f.call(this, e);
          }
        }
      }

      function a() {
        y && d && (y = !1, d.length ? g = d.concat(g) : m = -1, g.length && c());
      }

      function c() {
        if (!y) {
          var e = i(a);
          y = !0;

          for (var t = g.length; t;) {
            for (d = g, g = []; ++m < t;) d && d[m].run();

            m = -1, t = g.length;
          }

          d = null, y = !1, s(e);
        }
      }

      function u(e, t) {
        this.fun = e, this.array = t;
      }

      function l() {}

      var p,
          f,
          h = t.exports = {};
      !function () {
        try {
          p = "function" == typeof setTimeout ? setTimeout : o;
        } catch (e) {
          p = o;
        }

        try {
          f = "function" == typeof clearTimeout ? clearTimeout : r;
        } catch (e) {
          f = r;
        }
      }();
      var d,
          g = [],
          y = !1,
          m = -1;
      h.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        g.push(new u(e, t)), 1 !== g.length || y || i(c);
      }, u.prototype.run = function () {
        this.fun.apply(null, this.array);
      }, h.title = "browser", h.browser = !0, h.env = {}, h.argv = [], h.version = "", h.versions = {}, h.on = l, h.addListener = l, h.once = l, h.off = l, h.removeListener = l, h.removeAllListeners = l, h.emit = l, h.prependListener = l, h.prependOnceListener = l, h.listeners = function (e) {
        return [];
      }, h.binding = function (e) {
        throw new Error("process.binding is not supported");
      }, h.cwd = function () {
        return "/";
      }, h.chdir = function (e) {
        throw new Error("process.chdir is not supported");
      }, h.umask = function () {
        return 0;
      };
    }, {}],
    19: [function (e, t, n) {
      function o(e) {
        this.value = e;
      }

      function r(e, t, n) {
        var o = [],
            r = [],
            s = !0;
        return function e(a) {
          function c() {
            if ("object" == typeof p.node && null !== p.node) {
              p.keys && p.node_ === p.node || (p.keys = d(p.node)), p.isLeaf = 0 == p.keys.length;

              for (var e = 0; e < r.length; e++) if (r[e].node_ === a) {
                p.circular = r[e];
                break;
              }
            } else p.isLeaf = !0, p.keys = null;

            p.notLeaf = !p.isLeaf, p.notRoot = !p.isRoot;
          }

          var u = {},
              l = !0,
              p = {
            node: n ? i(a) : a,
            node_: a,
            path: [].concat(o),
            parent: r[r.length - 1],
            parents: r,
            key: o.slice(-1)[0],
            isRoot: 0 === o.length,
            level: o.length,
            circular: null,
            update: function (e, t) {
              p.isRoot || (p.parent.node[p.key] = e), p.node = e, t && (l = !1);
            },
            delete: function (e) {
              delete p.parent.node[p.key], e && (l = !1);
            },
            remove: function (e) {
              g(p.parent.node) ? p.parent.node.splice(p.key, 1) : delete p.parent.node[p.key], e && (l = !1);
            },
            keys: null,
            before: function (e) {
              u.before = e;
            },
            after: function (e) {
              u.after = e;
            },
            pre: function (e) {
              u.pre = e;
            },
            post: function (e) {
              u.post = e;
            },
            stop: function () {
              s = !1;
            },
            block: function () {
              l = !1;
            }
          };
          if (!s) return p;
          c();
          var f = t.call(p, p.node);
          return void 0 !== f && p.update && p.update(f), u.before && u.before.call(p, p.node), l ? ("object" != typeof p.node || null === p.node || p.circular || (r.push(p), c(), y(p.keys, function (t, r) {
            o.push(t), u.pre && u.pre.call(p, p.node[t], t);
            var i = e(p.node[t]);
            n && m.call(p.node, t) && (p.node[t] = i.node), i.isLast = r == p.keys.length - 1, i.isFirst = 0 == r, u.post && u.post.call(p, i), o.pop();
          }), r.pop()), u.after && u.after.call(p, p.node), p) : p;
        }(e).node;
      }

      function i(e) {
        if ("object" == typeof e && null !== e) {
          var t;
          if (g(e)) t = [];else if (a(e)) t = new Date(e.getTime ? e.getTime() : e);else if (c(e)) t = new RegExp(e);else if (u(e)) t = {
            message: e.message
          };else if (l(e)) t = new Boolean(e);else if (p(e)) t = new Number(e);else if (f(e)) t = new String(e);else if (Object.create && Object.getPrototypeOf) t = Object.create(Object.getPrototypeOf(e));else if (e.constructor === Object) t = {};else {
            var n = e.constructor && e.constructor.prototype || e.__proto__ || {},
                o = function () {};

            o.prototype = n, t = new o();
          }
          return y(d(e), function (n) {
            t[n] = e[n];
          }), t;
        }

        return e;
      }

      function s(e) {
        return Object.prototype.toString.call(e);
      }

      function a(e) {
        return "[object Date]" === s(e);
      }

      function c(e) {
        return "[object RegExp]" === s(e);
      }

      function u(e) {
        return "[object Error]" === s(e);
      }

      function l(e) {
        return "[object Boolean]" === s(e);
      }

      function p(e) {
        return "[object Number]" === s(e);
      }

      function f(e) {
        return "[object String]" === s(e);
      }

      var h = t.exports = function (e) {
        return new o(e);
      };

      o.prototype.get = function (e) {
        for (var t = this.value, n = 0; n < e.length; n++) {
          var o = e[n];

          if (!t || !m.call(t, o)) {
            t = void 0;
            break;
          }

          t = t[o];
        }

        return t;
      }, o.prototype.has = function (e) {
        for (var t = this.value, n = 0; n < e.length; n++) {
          var o = e[n];
          if (!t || !m.call(t, o)) return !1;
          t = t[o];
        }

        return !0;
      }, o.prototype.set = function (e, t) {
        for (var n = this.value, o = 0; o < e.length - 1; o++) {
          var r = e[o];
          m.call(n, r) || (n[r] = {}), n = n[r];
        }

        return n[e[o]] = t, t;
      }, o.prototype.map = function (e) {
        return r(this.value, e, !0);
      }, o.prototype.forEach = function (e) {
        return this.value = r(this.value, e, !1), this.value;
      }, o.prototype.reduce = function (e, t) {
        var n = 1 === arguments.length,
            o = n ? this.value : t;
        return this.forEach(function (t) {
          this.isRoot && n || (o = e.call(this, o, t));
        }), o;
      }, o.prototype.paths = function () {
        var e = [];
        return this.forEach(function (t) {
          e.push(this.path);
        }), e;
      }, o.prototype.nodes = function () {
        var e = [];
        return this.forEach(function (t) {
          e.push(this.node);
        }), e;
      }, o.prototype.clone = function () {
        var e = [],
            t = [];
        return function n(o) {
          for (var r = 0; r < e.length; r++) if (e[r] === o) return t[r];

          if ("object" == typeof o && null !== o) {
            var s = i(o);
            return e.push(o), t.push(s), y(d(o), function (e) {
              s[e] = n(o[e]);
            }), e.pop(), t.pop(), s;
          }

          return o;
        }(this.value);
      };

      var d = Object.keys || function (e) {
        var t = [];

        for (var n in e) t.push(n);

        return t;
      },
          g = Array.isArray || function (e) {
        return "[object Array]" === Object.prototype.toString.call(e);
      },
          y = function (e, t) {
        if (e.forEach) return e.forEach(t);

        for (var n = 0; n < e.length; n++) t(e[n], n, e);
      };

      y(d(o.prototype), function (e) {
        h[e] = function (t) {
          var n = [].slice.call(arguments, 1),
              r = new o(t);
          return r[e].apply(r, n);
        };
      });

      var m = Object.hasOwnProperty || function (e, t) {
        return t in e;
      };
    }, {}],
    20: [function (e, t, n) {
      t.exports.RADIUS = 6378137, t.exports.FLATTENING = 1 / 298.257223563, t.exports.POLAR_RADIUS = 6356752.3142;
    }, {}],
    21: [function (e, t, n) {
      t.exports = function () {
        for (var e = {}, t = 0; t < arguments.length; t++) {
          var n = arguments[t];

          for (var r in n) o.call(n, r) && (e[r] = n[r]);
        }

        return e;
      };

      var o = Object.prototype.hasOwnProperty;
    }, {}],
    22: [function (e, t, n) {

      var o = e("lodash.isequal"),
          r = e("@mapbox/geojson-normalize"),
          i = e("hat"),
          s = e("./lib/features_at"),
          a = e("./lib/string_sets_are_equal"),
          c = e("@mapbox/geojsonhint"),
          u = e("./constants"),
          l = e("./lib/string_set"),
          p = {
        Polygon: e("./feature_types/polygon"),
        LineString: e("./feature_types/line_string"),
        Point: e("./feature_types/point"),
        MultiPolygon: e("./feature_types/multi_feature"),
        MultiLineString: e("./feature_types/multi_feature"),
        MultiPoint: e("./feature_types/multi_feature")
      };

      t.exports = function (e, t) {
        return t.modes = u.modes, t.getFeatureIdsAt = function (t) {
          return s.click({
            point: t
          }, null, e).map(function (e) {
            return e.properties.id;
          });
        }, t.getSelectedIds = function () {
          return e.store.getSelectedIds();
        }, t.getSelected = function () {
          return {
            type: u.geojsonTypes.FEATURE_COLLECTION,
            features: e.store.getSelectedIds().map(function (t) {
              return e.store.get(t);
            }).map(function (e) {
              return e.toGeoJSON();
            })
          };
        }, t.getSelectedPoints = function () {
          return {
            type: u.geojsonTypes.FEATURE_COLLECTION,
            features: e.store.getSelectedCoordinates().map(function (e) {
              return {
                type: u.geojsonTypes.FEATURE,
                properties: {},
                geometry: {
                  type: u.geojsonTypes.POINT,
                  coordinates: e.coordinates
                }
              };
            })
          };
        }, t.set = function (n) {
          if (void 0 === n.type || n.type !== u.geojsonTypes.FEATURE_COLLECTION || !Array.isArray(n.features)) throw new Error("Invalid FeatureCollection");
          var o = e.store.createRenderBatch(),
              r = e.store.getAllIds().slice(),
              i = t.add(n),
              s = new l(i);
          return (r = r.filter(function (e) {
            return !s.has(e);
          })).length && t.delete(r), o(), i;
        }, t.add = function (t) {
          var n = c.hint(t, {
            precisionWarning: !1
          }).filter(function (e) {
            return "message" !== e.level;
          });
          if (n.length) throw new Error(n[0].message);
          var s = JSON.parse(JSON.stringify(r(t))).features.map(function (t) {
            if (t.id = t.id || i(), null === t.geometry) throw new Error("Invalid geometry: null");

            if (void 0 === e.store.get(t.id) || e.store.get(t.id).type !== t.geometry.type) {
              var n = p[t.geometry.type];
              if (void 0 === n) throw new Error("Invalid geometry type: ".concat(t.geometry.type, "."));
              var r = new n(e, t);
              e.store.add(r);
            } else {
              var s = e.store.get(t.id);
              s.properties = t.properties, o(s.getCoordinates(), t.geometry.coordinates) || s.incomingCoords(t.geometry.coordinates);
            }

            return t.id;
          });
          return e.store.render(), s;
        }, t.get = function (t) {
          var n = e.store.get(t);
          if (n) return n.toGeoJSON();
        }, t.getAll = function () {
          return {
            type: u.geojsonTypes.FEATURE_COLLECTION,
            features: e.store.getAll().map(function (e) {
              return e.toGeoJSON();
            })
          };
        }, t.delete = function (n) {
          return e.store.delete(n, {
            silent: !0
          }), t.getMode() !== u.modes.DIRECT_SELECT || e.store.getSelectedIds().length ? e.store.render() : e.events.changeMode(u.modes.SIMPLE_SELECT, void 0, {
            silent: !0
          }), t;
        }, t.deleteAll = function () {
          return e.store.delete(e.store.getAllIds(), {
            silent: !0
          }), t.getMode() === u.modes.DIRECT_SELECT ? e.events.changeMode(u.modes.SIMPLE_SELECT, void 0, {
            silent: !0
          }) : e.store.render(), t;
        }, t.changeMode = function (n) {
          var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return n === u.modes.SIMPLE_SELECT && t.getMode() === u.modes.SIMPLE_SELECT ? a(o.featureIds || [], e.store.getSelectedIds()) ? t : (e.store.setSelected(o.featureIds, {
            silent: !0
          }), e.store.render(), t) : n === u.modes.DIRECT_SELECT && t.getMode() === u.modes.DIRECT_SELECT && o.featureId === e.store.getSelectedIds()[0] ? t : (e.events.changeMode(n, o, {
            silent: !0
          }), t);
        }, t.getMode = function () {
          return e.events.getMode();
        }, t.trash = function () {
          return e.events.trash({
            silent: !0
          }), t;
        }, t.combineFeatures = function () {
          return e.events.combineFeatures({
            silent: !0
          }), t;
        }, t.uncombineFeatures = function () {
          return e.events.uncombineFeatures({
            silent: !0
          }), t;
        }, t.setFeatureProperty = function (n, o, r) {
          return e.store.setFeatureProperty(n, o, r), t;
        }, t;
      };
    }, {
      "./constants": 23,
      "./feature_types/line_string": 26,
      "./feature_types/multi_feature": 27,
      "./feature_types/point": 28,
      "./feature_types/polygon": 29,
      "./lib/features_at": 37,
      "./lib/string_set": 47,
      "./lib/string_sets_are_equal": 48,
      "@mapbox/geojson-normalize": 7,
      "@mapbox/geojsonhint": 8,
      hat: 15,
      "lodash.isequal": 16
    }],
    23: [function (e, t, n) {

      t.exports = {
        classes: {
          CONTROL_BASE: "mapboxgl-ctrl",
          CONTROL_PREFIX: "mapboxgl-ctrl-",
          CONTROL_BUTTON: "mapbox-gl-draw_ctrl-draw-btn",
          CONTROL_BUTTON_LINE: "mapbox-gl-draw_line",
          CONTROL_BUTTON_POLYGON: "mapbox-gl-draw_polygon",
          CONTROL_BUTTON_POINT: "mapbox-gl-draw_point",
          CONTROL_BUTTON_TRASH: "mapbox-gl-draw_trash",
          CONTROL_BUTTON_COMBINE_FEATURES: "mapbox-gl-draw_combine",
          CONTROL_BUTTON_UNCOMBINE_FEATURES: "mapbox-gl-draw_uncombine",
          CONTROL_GROUP: "mapboxgl-ctrl-group",
          ATTRIBUTION: "mapboxgl-ctrl-attrib",
          ACTIVE_BUTTON: "active",
          BOX_SELECT: "mapbox-gl-draw_boxselect"
        },
        sources: {
          HOT: "mapbox-gl-draw-hot",
          COLD: "mapbox-gl-draw-cold"
        },
        cursors: {
          ADD: "add",
          MOVE: "move",
          DRAG: "drag",
          POINTER: "pointer",
          NONE: "none"
        },
        types: {
          POLYGON: "polygon",
          LINE: "line_string",
          POINT: "point"
        },
        geojsonTypes: {
          FEATURE: "Feature",
          POLYGON: "Polygon",
          LINE_STRING: "LineString",
          POINT: "Point",
          FEATURE_COLLECTION: "FeatureCollection",
          MULTI_PREFIX: "Multi",
          MULTI_POINT: "MultiPoint",
          MULTI_LINE_STRING: "MultiLineString",
          MULTI_POLYGON: "MultiPolygon"
        },
        modes: {
          DRAW_LINE_STRING: "draw_line_string",
          DRAW_POLYGON: "draw_polygon",
          DRAW_POINT: "draw_point",
          SIMPLE_SELECT: "simple_select",
          DIRECT_SELECT: "direct_select",
          STATIC: "static"
        },
        events: {
          CREATE: "draw.create",
          DELETE: "draw.delete",
          UPDATE: "draw.update",
          SELECTION_CHANGE: "draw.selectionchange",
          MODE_CHANGE: "draw.modechange",
          ACTIONABLE: "draw.actionable",
          RENDER: "draw.render",
          COMBINE_FEATURES: "draw.combine",
          UNCOMBINE_FEATURES: "draw.uncombine"
        },
        updateActions: {
          MOVE: "move",
          CHANGE_COORDINATES: "change_coordinates"
        },
        meta: {
          FEATURE: "feature",
          MIDPOINT: "midpoint",
          VERTEX: "vertex"
        },
        activeStates: {
          ACTIVE: "true",
          INACTIVE: "false"
        },
        interactions: ["scrollZoom", "boxZoom", "dragRotate", "dragPan", "keyboard", "doubleClickZoom", "touchZoomRotate"],
        LAT_MIN: -90,
        LAT_RENDERED_MIN: -85,
        LAT_MAX: 90,
        LAT_RENDERED_MAX: 85,
        LNG_MIN: -270,
        LNG_MAX: 270
      };
    }, {}],
    24: [function (e, t, n) {

      var o = e("./lib/mode_handler"),
          r = e("./lib/get_features_and_set_cursor"),
          i = e("./lib/features_at"),
          s = e("./lib/is_click"),
          a = e("./lib/is_tap"),
          c = e("./constants"),
          u = e("./modes/object_to_mode");

      t.exports = function (e) {
        function t(t, r) {
          var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          d.stop();
          var s = n[t];
          if (void 0 === s) throw new Error("".concat(t, " is not valid"));
          h = t;
          var a = s(e, r);
          d = o(a, e), i.silent || e.map.fire(c.events.MODE_CHANGE, {
            mode: t
          }), e.store.setDirty(), e.store.render();
        }

        var n = Object.keys(e.options.modes).reduce(function (t, n) {
          return t[n] = u(e.options.modes[n]), t;
        }, {}),
            l = {},
            p = {},
            f = {},
            h = null,
            d = null;
        f.drag = function (t, n) {
          n({
            point: t.point,
            time: new Date().getTime()
          }) ? (e.ui.queueMapClasses({
            mouse: c.cursors.DRAG
          }), d.drag(t)) : t.originalEvent.stopPropagation();
        }, f.mousedrag = function (e) {
          f.drag(e, function (e) {
            return !s(l, e);
          });
        }, f.touchdrag = function (e) {
          f.drag(e, function (e) {
            return !a(p, e);
          });
        }, f.mousemove = function (t) {
          if (1 === (void 0 !== t.originalEvent.buttons ? t.originalEvent.buttons : t.originalEvent.which)) return f.mousedrag(t);
          var n = r(t, e);
          t.featureTarget = n, d.mousemove(t);
        }, f.mousedown = function (t) {
          l = {
            time: new Date().getTime(),
            point: t.point
          };
          var n = r(t, e);
          t.featureTarget = n, d.mousedown(t);
        }, f.mouseup = function (t) {
          var n = r(t, e);
          t.featureTarget = n, s(l, {
            point: t.point,
            time: new Date().getTime()
          }) ? d.click(t) : d.mouseup(t);
        }, f.mouseout = function (e) {
          d.mouseout(e);
        }, f.touchstart = function (t) {
          if (t.originalEvent.preventDefault(), e.options.touchEnabled) {
            p = {
              time: new Date().getTime(),
              point: t.point
            };
            var n = i.touch(t, null, e)[0];
            t.featureTarget = n, d.touchstart(t);
          }
        }, f.touchmove = function (t) {
          if (t.originalEvent.preventDefault(), e.options.touchEnabled) return d.touchmove(t), f.touchdrag(t);
        }, f.touchend = function (t) {
          if (t.originalEvent.preventDefault(), e.options.touchEnabled) {
            var n = i.touch(t, null, e)[0];
            t.featureTarget = n, a(p, {
              time: new Date().getTime(),
              point: t.point
            }) ? d.tap(t) : d.touchend(t);
          }
        };

        var g = function (e) {
          return !(8 === e || 46 === e || e >= 48 && e <= 57);
        };

        f.keydown = function (n) {
          "mapboxgl-canvas" === (n.srcElement || n.target).classList[0] && (8 !== n.keyCode && 46 !== n.keyCode || !e.options.controls.trash ? g(n.keyCode) ? d.keydown(n) : 49 === n.keyCode && e.options.controls.point ? t(c.modes.DRAW_POINT) : 50 === n.keyCode && e.options.controls.line_string ? t(c.modes.DRAW_LINE_STRING) : 51 === n.keyCode && e.options.controls.polygon && t(c.modes.DRAW_POLYGON) : (n.preventDefault(), d.trash()));
        }, f.keyup = function (e) {
          g(e.keyCode) && d.keyup(e);
        }, f.zoomend = function () {
          e.store.changeZoom();
        }, f.data = function (t) {
          if ("style" === t.dataType) {
            var n = e.setup,
                o = e.map,
                r = e.options,
                i = e.store;
            r.styles.some(function (e) {
              return o.getLayer(e.id);
            }) || (n.addLayers(), i.setDirty(), i.render());
          }
        };
        var y = {
          trash: !1,
          combineFeatures: !1,
          uncombineFeatures: !1
        };
        return {
          start: function () {
            h = e.options.defaultMode, d = o(n[h](e), e);
          },
          changeMode: t,
          actionable: function (t) {
            var n = !1;
            Object.keys(t).forEach(function (e) {
              if (void 0 === y[e]) throw new Error("Invalid action type");
              y[e] !== t[e] && (n = !0), y[e] = t[e];
            }), n && e.map.fire(c.events.ACTIONABLE, {
              actions: y
            });
          },
          currentModeName: function () {
            return h;
          },
          currentModeRender: function (e, t) {
            return d.render(e, t);
          },
          fire: function (e, t) {
            f[e] && f[e](t);
          },
          addEventListeners: function () {
            e.map.on("mousemove", f.mousemove), e.map.on("mousedown", f.mousedown), e.map.on("mouseup", f.mouseup), e.map.on("data", f.data), e.map.on("touchmove", f.touchmove), e.map.on("touchstart", f.touchstart), e.map.on("touchend", f.touchend), e.container.addEventListener("mouseout", f.mouseout), e.options.keybindings && (e.container.addEventListener("keydown", f.keydown), e.container.addEventListener("keyup", f.keyup));
          },
          removeEventListeners: function () {
            e.map.off("mousemove", f.mousemove), e.map.off("mousedown", f.mousedown), e.map.off("mouseup", f.mouseup), e.map.off("data", f.data), e.map.off("touchmove", f.touchmove), e.map.off("touchstart", f.touchstart), e.map.off("touchend", f.touchend), e.container.removeEventListener("mouseout", f.mouseout), e.options.keybindings && (e.container.removeEventListener("keydown", f.keydown), e.container.removeEventListener("keyup", f.keyup));
          },
          trash: function (e) {
            d.trash(e);
          },
          combineFeatures: function () {
            d.combineFeatures();
          },
          uncombineFeatures: function () {
            d.uncombineFeatures();
          },
          getMode: function () {
            return h;
          }
        };
      };
    }, {
      "./constants": 23,
      "./lib/features_at": 37,
      "./lib/get_features_and_set_cursor": 38,
      "./lib/is_click": 39,
      "./lib/is_tap": 41,
      "./lib/mode_handler": 43,
      "./modes/object_to_mode": 59
    }],
    25: [function (e, t, n) {

      var o = e("hat"),
          r = e("../constants"),
          i = function (e, t) {
        this.ctx = e, this.properties = t.properties || {}, this.coordinates = t.geometry.coordinates, this.id = t.id || o(), this.type = t.geometry.type;
      };

      i.prototype.changed = function () {
        this.ctx.store.featureChanged(this.id);
      }, i.prototype.incomingCoords = function (e) {
        this.setCoordinates(e);
      }, i.prototype.setCoordinates = function (e) {
        this.coordinates = e, this.changed();
      }, i.prototype.getCoordinates = function () {
        return JSON.parse(JSON.stringify(this.coordinates));
      }, i.prototype.setProperty = function (e, t) {
        this.properties[e] = t;
      }, i.prototype.toGeoJSON = function () {
        return JSON.parse(JSON.stringify({
          id: this.id,
          type: r.geojsonTypes.FEATURE,
          properties: this.properties,
          geometry: {
            coordinates: this.getCoordinates(),
            type: this.type
          }
        }));
      }, i.prototype.internal = function (e) {
        var t = {
          id: this.id,
          meta: r.meta.FEATURE,
          "meta:type": this.type,
          active: r.activeStates.INACTIVE,
          mode: e
        };
        if (this.ctx.options.userProperties) for (var n in this.properties) t["user_".concat(n)] = this.properties[n];
        return {
          type: r.geojsonTypes.FEATURE,
          properties: t,
          geometry: {
            coordinates: this.getCoordinates(),
            type: this.type
          }
        };
      }, t.exports = i;
    }, {
      "../constants": 23,
      hat: 15
    }],
    26: [function (e, t, n) {

      var o = e("./feature"),
          r = function (e, t) {
        o.call(this, e, t);
      };

      (r.prototype = Object.create(o.prototype)).isValid = function () {
        return this.coordinates.length > 1;
      }, r.prototype.addCoordinate = function (e, t, n) {
        this.changed();
        var o = parseInt(e, 10);
        this.coordinates.splice(o, 0, [t, n]);
      }, r.prototype.getCoordinate = function (e) {
        var t = parseInt(e, 10);
        return JSON.parse(JSON.stringify(this.coordinates[t]));
      }, r.prototype.removeCoordinate = function (e) {
        this.changed(), this.coordinates.splice(parseInt(e, 10), 1);
      }, r.prototype.updateCoordinate = function (e, t, n) {
        var o = parseInt(e, 10);
        this.coordinates[o] = [t, n], this.changed();
      }, t.exports = r;
    }, {
      "./feature": 25
    }],
    27: [function (e, t, n) {

      var o = e("./feature"),
          r = e("../constants"),
          i = e("hat"),
          s = {
        MultiPoint: e("./point"),
        MultiLineString: e("./line_string"),
        MultiPolygon: e("./polygon")
      },
          a = function (e, t, n, o, r) {
        var i = n.split("."),
            s = parseInt(i[0], 10),
            a = i[1] ? i.slice(1).join(".") : null;
        return e[s][t](a, o, r);
      },
          c = function (e, t) {
        if (o.call(this, e, t), delete this.coordinates, this.model = s[t.geometry.type], void 0 === this.model) throw new TypeError("".concat(t.geometry.type, " is not a valid type"));
        this.features = this._coordinatesToFeatures(t.geometry.coordinates);
      };

      (c.prototype = Object.create(o.prototype))._coordinatesToFeatures = function (e) {
        var t = this,
            n = this.model.bind(this);
        return e.map(function (e) {
          return new n(t.ctx, {
            id: i(),
            type: r.geojsonTypes.FEATURE,
            properties: {},
            geometry: {
              coordinates: e,
              type: t.type.replace("Multi", "")
            }
          });
        });
      }, c.prototype.isValid = function () {
        return this.features.every(function (e) {
          return e.isValid();
        });
      }, c.prototype.setCoordinates = function (e) {
        this.features = this._coordinatesToFeatures(e), this.changed();
      }, c.prototype.getCoordinate = function (e) {
        return a(this.features, "getCoordinate", e);
      }, c.prototype.getCoordinates = function () {
        return JSON.parse(JSON.stringify(this.features.map(function (e) {
          return e.type === r.geojsonTypes.POLYGON ? e.getCoordinates() : e.coordinates;
        })));
      }, c.prototype.updateCoordinate = function (e, t, n) {
        a(this.features, "updateCoordinate", e, t, n), this.changed();
      }, c.prototype.addCoordinate = function (e, t, n) {
        a(this.features, "addCoordinate", e, t, n), this.changed();
      }, c.prototype.removeCoordinate = function (e) {
        a(this.features, "removeCoordinate", e), this.changed();
      }, c.prototype.getFeatures = function () {
        return this.features;
      }, t.exports = c;
    }, {
      "../constants": 23,
      "./feature": 25,
      "./line_string": 26,
      "./point": 28,
      "./polygon": 29,
      hat: 15
    }],
    28: [function (e, t, n) {

      var o = e("./feature"),
          r = function (e, t) {
        o.call(this, e, t);
      };

      (r.prototype = Object.create(o.prototype)).isValid = function () {
        return "number" == typeof this.coordinates[0] && "number" == typeof this.coordinates[1];
      }, r.prototype.updateCoordinate = function (e, t, n) {
        3 === arguments.length ? this.coordinates = [t, n] : this.coordinates = [e, t], this.changed();
      }, r.prototype.getCoordinate = function () {
        return this.getCoordinates();
      }, t.exports = r;
    }, {
      "./feature": 25
    }],
    29: [function (e, t, n) {

      var o = e("./feature"),
          r = function (e, t) {
        o.call(this, e, t), this.coordinates = this.coordinates.map(function (e) {
          return e.slice(0, -1);
        });
      };

      (r.prototype = Object.create(o.prototype)).isValid = function () {
        return 0 !== this.coordinates.length && this.coordinates.every(function (e) {
          return e.length > 2;
        });
      }, r.prototype.incomingCoords = function (e) {
        this.coordinates = e.map(function (e) {
          return e.slice(0, -1);
        }), this.changed();
      }, r.prototype.setCoordinates = function (e) {
        this.coordinates = e, this.changed();
      }, r.prototype.addCoordinate = function (e, t, n) {
        this.changed();
        var o = e.split(".").map(function (e) {
          return parseInt(e, 10);
        });
        this.coordinates[o[0]].splice(o[1], 0, [t, n]);
      }, r.prototype.removeCoordinate = function (e) {
        this.changed();
        var t = e.split(".").map(function (e) {
          return parseInt(e, 10);
        }),
            n = this.coordinates[t[0]];
        n && (n.splice(t[1], 1), n.length < 3 && this.coordinates.splice(t[0], 1));
      }, r.prototype.getCoordinate = function (e) {
        var t = e.split(".").map(function (e) {
          return parseInt(e, 10);
        }),
            n = this.coordinates[t[0]];
        return JSON.parse(JSON.stringify(n[t[1]]));
      }, r.prototype.getCoordinates = function () {
        return this.coordinates.map(function (e) {
          return e.concat([e[0]]);
        });
      }, r.prototype.updateCoordinate = function (e, t, n) {
        this.changed();
        var o = e.split("."),
            r = parseInt(o[0], 10),
            i = parseInt(o[1], 10);
        void 0 === this.coordinates[r] && (this.coordinates[r] = []), this.coordinates[r][i] = [t, n];
      }, t.exports = r;
    }, {
      "./feature": 25
    }],
    30: [function (e, t, n) {

      var o = e("../constants");
      t.exports = {
        isOfMetaType: function (e) {
          return function (t) {
            var n = t.featureTarget;
            return !!n && !!n.properties && n.properties.meta === e;
          };
        },
        isShiftMousedown: function (e) {
          return !!e.originalEvent && !!e.originalEvent.shiftKey && 0 === e.originalEvent.button;
        },
        isActiveFeature: function (e) {
          return !!e.featureTarget && !!e.featureTarget.properties && e.featureTarget.properties.active === o.activeStates.ACTIVE && e.featureTarget.properties.meta === o.meta.FEATURE;
        },
        isInactiveFeature: function (e) {
          return !!e.featureTarget && !!e.featureTarget.properties && e.featureTarget.properties.active === o.activeStates.INACTIVE && e.featureTarget.properties.meta === o.meta.FEATURE;
        },
        noTarget: function (e) {
          return void 0 === e.featureTarget;
        },
        isFeature: function (e) {
          return !!e.featureTarget && !!e.featureTarget.properties && e.featureTarget.properties.meta === o.meta.FEATURE;
        },
        isVertex: function (e) {
          var t = e.featureTarget;
          return !!t && !!t.properties && t.properties.meta === o.meta.VERTEX;
        },
        isShiftDown: function (e) {
          return !!e.originalEvent && !0 === e.originalEvent.shiftKey;
        },
        isEscapeKey: function (e) {
          return 27 === e.keyCode;
        },
        isEnterKey: function (e) {
          return 13 === e.keyCode;
        },
        true: function () {
          return !0;
        }
      };
    }, {
      "../constants": 23
    }],
    31: [function (e, t, n) {

      var o = e("@mapbox/geojson-extent"),
          r = e("../constants"),
          i = r.LAT_MIN,
          s = r.LAT_MAX,
          a = r.LAT_RENDERED_MIN,
          c = r.LAT_RENDERED_MAX,
          u = r.LNG_MIN,
          l = r.LNG_MAX;

      t.exports = function (e, t) {
        var n = i,
            r = s,
            p = i,
            f = s,
            h = l,
            d = u;
        e.forEach(function (e) {
          var t = o(e),
              i = t[1],
              s = t[3],
              a = t[0],
              c = t[2];
          i > n && (n = i), s < r && (r = s), s > p && (p = s), i < f && (f = i), a < h && (h = a), c > d && (d = c);
        });
        var g = t;
        return n + g.lat > c && (g.lat = c - n), p + g.lat > s && (g.lat = s - p), r + g.lat < a && (g.lat = a - r), f + g.lat < i && (g.lat = i - f), h + g.lng <= u && (g.lng += 360 * Math.ceil(Math.abs(g.lng) / 360)), d + g.lng >= l && (g.lng -= 360 * Math.ceil(Math.abs(g.lng) / 360)), g;
      };
    }, {
      "../constants": 23,
      "@mapbox/geojson-extent": 6
    }],
    32: [function (e, t, n) {

      var o = e("../constants");

      t.exports = function (e, t, n, r) {
        var i = t.geometry.coordinates,
            s = n.geometry.coordinates;
        if (i[1] > o.LAT_RENDERED_MAX || i[1] < o.LAT_RENDERED_MIN || s[1] > o.LAT_RENDERED_MAX || s[1] < o.LAT_RENDERED_MIN) return null;
        var a = r.project([i[0], i[1]]),
            c = r.project([s[0], s[1]]),
            u = r.unproject([(a.x + c.x) / 2, (a.y + c.y) / 2]);
        return {
          type: o.geojsonTypes.FEATURE,
          properties: {
            meta: o.meta.MIDPOINT,
            parent: e,
            lng: u.lng,
            lat: u.lat,
            coord_path: n.properties.coord_path
          },
          geometry: {
            type: o.geojsonTypes.POINT,
            coordinates: [u.lng, u.lat]
          }
        };
      };
    }, {
      "../constants": 23
    }],
    33: [function (e, t, n) {

      function o(e) {
        function t(e, t) {
          var o = "",
              s = null;
          e.forEach(function (e, c) {
            var u = void 0 !== t && null !== t ? "".concat(t, ".").concat(c) : String(c),
                l = r(f, e, u, n(u));

            if (a.midpoints && s) {
              var p = i(f, s, l, a.map);
              p && h.push(p);
            }

            s = l;
            var d = JSON.stringify(e);
            o !== d && h.push(l), 0 === c && (o = d);
          });
        }

        function n(e) {
          return !!a.selectedPaths && -1 !== a.selectedPaths.indexOf(e);
        }

        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            u = e.geometry,
            l = u.type,
            p = u.coordinates,
            f = e.properties && e.properties.id,
            h = [];
        return l === s.geojsonTypes.POINT ? h.push(r(f, p, c, n(c))) : l === s.geojsonTypes.POLYGON ? p.forEach(function (e, n) {
          t(e, null !== c ? "".concat(c, ".").concat(n) : String(n));
        }) : l === s.geojsonTypes.LINE_STRING ? t(p, c) : 0 === l.indexOf(s.geojsonTypes.MULTI_PREFIX) && function () {
          var t = l.replace(s.geojsonTypes.MULTI_PREFIX, "");
          p.forEach(function (n, r) {
            var i = {
              type: s.geojsonTypes.FEATURE,
              properties: e.properties,
              geometry: {
                type: t,
                coordinates: n
              }
            };
            h = h.concat(o(i, a, r));
          });
        }(), h;
      }

      var r = e("./create_vertex"),
          i = e("./create_midpoint"),
          s = e("../constants");
      t.exports = o;
    }, {
      "../constants": 23,
      "./create_midpoint": 32,
      "./create_vertex": 34
    }],
    34: [function (e, t, n) {

      var o = e("../constants");

      t.exports = function (e, t, n, r) {
        return {
          type: o.geojsonTypes.FEATURE,
          properties: {
            meta: o.meta.VERTEX,
            parent: e,
            coord_path: n,
            active: r ? o.activeStates.ACTIVE : o.activeStates.INACTIVE
          },
          geometry: {
            type: o.geojsonTypes.POINT,
            coordinates: t
          }
        };
      };
    }, {
      "../constants": 23
    }],
    35: [function (e, t, n) {

      t.exports = {
        enable: function (e) {
          setTimeout(function () {
            e.map && e.map.doubleClickZoom && e._ctx && e._ctx.store && e._ctx.store.getInitialConfigValue && e._ctx.store.getInitialConfigValue("doubleClickZoom") && e.map.doubleClickZoom.enable();
          }, 0);
        },
        disable: function (e) {
          setTimeout(function () {
            e.map && e.map.doubleClickZoom && e.map.doubleClickZoom.disable();
          }, 0);
        }
      };
    }, {}],
    36: [function (e, t, n) {

      t.exports = function (e, t) {
        var n = e.x - t.x,
            o = e.y - t.y;
        return Math.sqrt(n * n + o * o);
      };
    }, {}],
    37: [function (e, t, n) {

      function o(e, t, n, o) {
        if (null === n.map) return [];
        var s = e ? i(e, o) : t,
            u = {};
        n.options.styles && (u.layers = n.options.styles.map(function (e) {
          return e.id;
        }));
        var l = n.map.queryRenderedFeatures(s, u).filter(function (e) {
          return -1 !== c.indexOf(e.properties.meta);
        }),
            p = new a(),
            f = [];
        return l.forEach(function (e) {
          var t = e.properties.id;
          p.has(t) || (p.add(t), f.push(e));
        }), r(f);
      }

      var r = e("./sort_features"),
          i = e("./map_event_to_bounding_box"),
          s = e("../constants"),
          a = e("./string_set"),
          c = [s.meta.FEATURE, s.meta.MIDPOINT, s.meta.VERTEX];
      t.exports = {
        click: function (e, t, n) {
          return o(e, t, n, n.options.clickBuffer);
        },
        touch: function (e, t, n) {
          return o(e, t, n, n.options.touchBuffer);
        }
      };
    }, {
      "../constants": 23,
      "./map_event_to_bounding_box": 42,
      "./sort_features": 46,
      "./string_set": 47
    }],
    38: [function (e, t, n) {

      var o = e("./features_at"),
          r = e("../constants");

      t.exports = function (e, t) {
        var n = o.click(e, null, t),
            i = {
          mouse: r.cursors.NONE
        };
        return n[0] && (i.mouse = n[0].properties.active === r.activeStates.ACTIVE ? r.cursors.MOVE : r.cursors.POINTER, i.feature = n[0].properties.meta), -1 !== t.events.currentModeName().indexOf("draw") && (i.mouse = r.cursors.ADD), t.ui.queueMapClasses(i), t.ui.updateMapClasses(), n[0];
      };
    }, {
      "../constants": 23,
      "./features_at": 37
    }],
    39: [function (e, t, n) {

      var o = e("./euclidean_distance");

      t.exports = function (e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = null != n.fineTolerance ? n.fineTolerance : 4,
            i = null != n.grossTolerance ? n.grossTolerance : 12,
            s = null != n.interval ? n.interval : 500;
        e.point = e.point || t.point, e.time = e.time || t.time;
        var a = o(e.point, t.point);
        return a < r || a < i && t.time - e.time < s;
      };
    }, {
      "./euclidean_distance": 36
    }],
    40: [function (e, t, n) {

      t.exports = function (e, t) {
        return !!e.lngLat && e.lngLat.lng === t[0] && e.lngLat.lat === t[1];
      };
    }, {}],
    41: [function (e, t, n) {

      var o = e("./euclidean_distance");

      t.exports = function (e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = null != n.tolerance ? n.tolerance : 25,
            i = null != n.interval ? n.interval : 250;
        return e.point = e.point || t.point, e.time = e.time || t.time, o(e.point, t.point) < r && t.time - e.time < i;
      };
    }, {
      "./euclidean_distance": 36
    }],
    42: [function (e, t, n) {

      t.exports = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        return [[e.point.x - t, e.point.y - t], [e.point.x + t, e.point.y + t]];
      };
    }, {}],
    43: [function (e, t, n) {

      t.exports = function (e, t) {
        var n = {
          drag: [],
          click: [],
          mousemove: [],
          mousedown: [],
          mouseup: [],
          mouseout: [],
          keydown: [],
          keyup: [],
          touchstart: [],
          touchmove: [],
          touchend: [],
          tap: []
        },
            o = {
          on: function (e, t, o) {
            if (void 0 === n[e]) throw new Error("Invalid event type: ".concat(e));
            n[e].push({
              selector: t,
              fn: o
            });
          },
          render: function (e) {
            t.store.featureChanged(e);
          }
        },
            r = function (e, r) {
          for (var i = n[e], s = i.length; s--;) {
            var a = i[s];

            if (a.selector(r)) {
              a.fn.call(o, r), t.store.render(), t.ui.updateMapClasses();
              break;
            }
          }
        };

        return e.start.call(o), {
          render: e.render,
          stop: function () {
            e.stop && e.stop();
          },
          trash: function () {
            e.trash && (e.trash(), t.store.render());
          },
          combineFeatures: function () {
            e.combineFeatures && e.combineFeatures();
          },
          uncombineFeatures: function () {
            e.uncombineFeatures && e.uncombineFeatures();
          },
          drag: function (e) {
            r("drag", e);
          },
          click: function (e) {
            r("click", e);
          },
          mousemove: function (e) {
            r("mousemove", e);
          },
          mousedown: function (e) {
            r("mousedown", e);
          },
          mouseup: function (e) {
            r("mouseup", e);
          },
          mouseout: function (e) {
            r("mouseout", e);
          },
          keydown: function (e) {
            r("keydown", e);
          },
          keyup: function (e) {
            r("keyup", e);
          },
          touchstart: function (e) {
            r("touchstart", e);
          },
          touchmove: function (e) {
            r("touchmove", e);
          },
          touchend: function (e) {
            r("touchend", e);
          },
          tap: function (e) {
            r("tap", e);
          }
        };
      };
    }, {}],
    44: [function (e, t, n) {

      var o = e("@mapbox/point-geometry");

      t.exports = function (e, t) {
        var n = t.getBoundingClientRect();
        return new o(e.clientX - n.left - (t.clientLeft || 0), e.clientY - n.top - (t.clientTop || 0));
      };
    }, {
      "@mapbox/point-geometry": 12
    }],
    45: [function (e, t, n) {

      var o = e("./constrain_feature_movement"),
          r = e("../constants");

      t.exports = function (e, t) {
        var n = o(e.map(function (e) {
          return e.toGeoJSON();
        }), t);
        e.forEach(function (e) {
          var t,
              o = e.getCoordinates(),
              i = function (e) {
            var t = {
              lng: e[0] + n.lng,
              lat: e[1] + n.lat
            };
            return [t.lng, t.lat];
          },
              s = function (e) {
            return e.map(function (e) {
              return i(e);
            });
          };

          e.type === r.geojsonTypes.POINT ? t = i(o) : e.type === r.geojsonTypes.LINE_STRING || e.type === r.geojsonTypes.MULTI_POINT ? t = o.map(i) : e.type === r.geojsonTypes.POLYGON || e.type === r.geojsonTypes.MULTI_LINE_STRING ? t = o.map(s) : e.type === r.geojsonTypes.MULTI_POLYGON && (t = o.map(function (e) {
            return e.map(function (e) {
              return s(e);
            });
          })), e.incomingCoords(t);
        });
      };
    }, {
      "../constants": 23,
      "./constrain_feature_movement": 31
    }],
    46: [function (e, t, n) {

      function o(e, t) {
        var n = s[e.geometry.type] - s[t.geometry.type];
        return 0 === n && e.geometry.type === i.geojsonTypes.POLYGON ? e.area - t.area : n;
      }

      var r = e("@mapbox/geojson-area"),
          i = e("../constants"),
          s = {
        Point: 0,
        LineString: 1,
        Polygon: 2
      };

      t.exports = function (e) {
        return e.map(function (e) {
          return e.geometry.type === i.geojsonTypes.POLYGON && (e.area = r.geometry({
            type: i.geojsonTypes.FEATURE,
            property: {},
            geometry: e.geometry
          })), e;
        }).sort(o).map(function (e) {
          return delete e.area, e;
        });
      };
    }, {
      "../constants": 23,
      "@mapbox/geojson-area": 3
    }],
    47: [function (e, t, n) {

      function o(e) {
        if (this._items = {}, this._nums = {}, this._length = e ? e.length : 0, e) for (var t = 0, n = e.length; t < n; t++) this.add(e[t]), void 0 !== e[t] && ("string" == typeof e[t] ? this._items[e[t]] = t : this._nums[e[t]] = t);
      }

      o.prototype.add = function (e) {
        return this.has(e) ? this : (this._length++, "string" == typeof e ? this._items[e] = this._length : this._nums[e] = this._length, this);
      }, o.prototype.delete = function (e) {
        return !1 === this.has(e) ? this : (this._length--, delete this._items[e], delete this._nums[e], this);
      }, o.prototype.has = function (e) {
        return ("string" == typeof e || "number" == typeof e) && (void 0 !== this._items[e] || void 0 !== this._nums[e]);
      }, o.prototype.values = function () {
        var e = this,
            t = [];
        return Object.keys(this._items).forEach(function (n) {
          t.push({
            k: n,
            v: e._items[n]
          });
        }), Object.keys(this._nums).forEach(function (n) {
          t.push({
            k: JSON.parse(n),
            v: e._nums[n]
          });
        }), t.sort(function (e, t) {
          return e.v - t.v;
        }).map(function (e) {
          return e.k;
        });
      }, o.prototype.clear = function () {
        return this._length = 0, this._items = {}, this._nums = {}, this;
      }, t.exports = o;
    }, {}],
    48: [function (e, t, n) {

      t.exports = function (e, t) {
        return e.length === t.length && JSON.stringify(e.map(function (e) {
          return e;
        }).sort()) === JSON.stringify(t.map(function (e) {
          return e;
        }).sort());
      };
    }, {}],
    49: [function (e, t, n) {

      t.exports = [{
        id: "gl-draw-polygon-fill-inactive",
        type: "fill",
        filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
        paint: {
          "fill-color": "#3bb2d0",
          "fill-outline-color": "#3bb2d0",
          "fill-opacity": .1
        }
      }, {
        id: "gl-draw-polygon-fill-active",
        type: "fill",
        filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
        paint: {
          "fill-color": "#fbb03b",
          "fill-outline-color": "#fbb03b",
          "fill-opacity": .1
        }
      }, {
        id: "gl-draw-polygon-midpoint",
        type: "circle",
        filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
        paint: {
          "circle-radius": 3,
          "circle-color": "#fbb03b"
        }
      }, {
        id: "gl-draw-polygon-stroke-inactive",
        type: "line",
        filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
        layout: {
          "line-cap": "round",
          "line-join": "round"
        },
        paint: {
          "line-color": "#3bb2d0",
          "line-width": 2
        }
      }, {
        id: "gl-draw-polygon-stroke-active",
        type: "line",
        filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
        layout: {
          "line-cap": "round",
          "line-join": "round"
        },
        paint: {
          "line-color": "#fbb03b",
          "line-dasharray": [.2, 2],
          "line-width": 2
        }
      }, {
        id: "gl-draw-line-inactive",
        type: "line",
        filter: ["all", ["==", "active", "false"], ["==", "$type", "LineString"], ["!=", "mode", "static"]],
        layout: {
          "line-cap": "round",
          "line-join": "round"
        },
        paint: {
          "line-color": "#3bb2d0",
          "line-width": 2
        }
      }, {
        id: "gl-draw-line-active",
        type: "line",
        filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]],
        layout: {
          "line-cap": "round",
          "line-join": "round"
        },
        paint: {
          "line-color": "#fbb03b",
          "line-dasharray": [.2, 2],
          "line-width": 2
        }
      }, {
        id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
        type: "circle",
        filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
        paint: {
          "circle-radius": 5,
          "circle-color": "#fff"
        }
      }, {
        id: "gl-draw-polygon-and-line-vertex-inactive",
        type: "circle",
        filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
        paint: {
          "circle-radius": 3,
          "circle-color": "#fbb03b"
        }
      }, {
        id: "gl-draw-point-point-stroke-inactive",
        type: "circle",
        filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
        paint: {
          "circle-radius": 5,
          "circle-opacity": 1,
          "circle-color": "#fff"
        }
      }, {
        id: "gl-draw-point-inactive",
        type: "circle",
        filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
        paint: {
          "circle-radius": 3,
          "circle-color": "#3bb2d0"
        }
      }, {
        id: "gl-draw-point-stroke-active",
        type: "circle",
        filter: ["all", ["==", "$type", "Point"], ["==", "active", "true"], ["!=", "meta", "midpoint"]],
        paint: {
          "circle-radius": 7,
          "circle-color": "#fff"
        }
      }, {
        id: "gl-draw-point-active",
        type: "circle",
        filter: ["all", ["==", "$type", "Point"], ["!=", "meta", "midpoint"], ["==", "active", "true"]],
        paint: {
          "circle-radius": 5,
          "circle-color": "#fbb03b"
        }
      }, {
        id: "gl-draw-polygon-fill-static",
        type: "fill",
        filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
        paint: {
          "fill-color": "#404040",
          "fill-outline-color": "#404040",
          "fill-opacity": .1
        }
      }, {
        id: "gl-draw-polygon-stroke-static",
        type: "line",
        filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
        layout: {
          "line-cap": "round",
          "line-join": "round"
        },
        paint: {
          "line-color": "#404040",
          "line-width": 2
        }
      }, {
        id: "gl-draw-line-static",
        type: "line",
        filter: ["all", ["==", "mode", "static"], ["==", "$type", "LineString"]],
        layout: {
          "line-cap": "round",
          "line-join": "round"
        },
        paint: {
          "line-color": "#404040",
          "line-width": 2
        }
      }, {
        id: "gl-draw-point-static",
        type: "circle",
        filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]],
        paint: {
          "circle-radius": 5,
          "circle-color": "#404040"
        }
      }];
    }, {}],
    50: [function (e, t, n) {

      t.exports = function (e, t, n) {
        function o() {
          i = !1, s && (r.apply(n, s), s = !1);
        }

        function r() {
          i ? s = arguments : (i = !0, e.apply(n, arguments), setTimeout(o, t));
        }

        var i, s;
        return r;
      };
    }, {}],
    51: [function (e, t, n) {

      t.exports = function (e) {
        return [].concat(e).filter(function (e) {
          return void 0 !== e;
        });
      };
    }, {}],
    52: [function (e, t, n) {

      var o = e("../lib/common_selectors"),
          r = o.noTarget,
          i = o.isOfMetaType,
          s = o.isInactiveFeature,
          a = o.isShiftDown,
          c = e("../lib/create_supplementary_points"),
          u = e("../lib/constrain_feature_movement"),
          l = e("../lib/double_click_zoom"),
          p = e("../constants"),
          f = e("../lib/common_selectors"),
          h = e("../lib/move_features"),
          d = i(p.meta.VERTEX),
          g = i(p.meta.MIDPOINT),
          y = {};
      y.fireUpdate = function () {
        this.map.fire(p.events.UPDATE, {
          action: p.updateActions.CHANGE_COORDINATES,
          features: this.getSelected().map(function (e) {
            return e.toGeoJSON();
          })
        });
      }, y.fireActionable = function (e) {
        this.setActionableState({
          combineFeatures: !1,
          uncombineFeatures: !1,
          trash: e.selectedCoordPaths.length > 0
        });
      }, y.startDragging = function (e, t) {
        this.map.dragPan.disable(), e.canDragMove = !0, e.dragMoveLocation = t.lngLat;
      }, y.stopDragging = function (e) {
        this.map.dragPan.enable(), e.dragMoving = !1, e.canDragMove = !1, e.dragMoveLocation = null;
      }, y.onVertex = function (e, t) {
        this.startDragging(e, t);
        var n = t.featureTarget.properties,
            o = e.selectedCoordPaths.indexOf(n.coord_path);
        a(t) || -1 !== o ? a(t) && -1 === o && e.selectedCoordPaths.push(n.coord_path) : e.selectedCoordPaths = [n.coord_path];
        var r = this.pathsToCoordinates(e.featureId, e.selectedCoordPaths);
        this.setSelectedCoordinates(r);
      }, y.onMidpoint = function (e, t) {
        this.startDragging(e, t);
        var n = t.featureTarget.properties;
        e.feature.addCoordinate(n.coord_path, n.lng, n.lat), this.fireUpdate(), e.selectedCoordPaths = [n.coord_path];
      }, y.pathsToCoordinates = function (e, t) {
        return t.map(function (t) {
          return {
            feature_id: e,
            coord_path: t
          };
        });
      }, y.onFeature = function (e, t) {
        0 === e.selectedCoordPaths.length ? this.startDragging(e, t) : this.stopDragging(e);
      }, y.dragFeature = function (e, t, n) {
        h(this.getSelected(), n), e.dragMoveLocation = t.lngLat;
      }, y.dragVertex = function (e, t, n) {
        for (var o = e.selectedCoordPaths.map(function (t) {
          return e.feature.getCoordinate(t);
        }), r = o.map(function (e) {
          return {
            type: p.geojsonTypes.FEATURE,
            properties: {},
            geometry: {
              type: p.geojsonTypes.POINT,
              coordinates: e
            }
          };
        }), i = u(r, n), s = 0; s < o.length; s++) {
          var a = o[s];
          e.feature.updateCoordinate(e.selectedCoordPaths[s], a[0] + i.lng, a[1] + i.lat);
        }
      }, y.clickNoTarget = function () {
        this.changeMode(p.modes.SIMPLE_SELECT);
      }, y.clickInactive = function () {
        this.changeMode(p.modes.SIMPLE_SELECT);
      }, y.clickActiveFeature = function (e) {
        e.selectedCoordPaths = [], this.clearSelectedCoordinates(), e.feature.changed();
      }, y.onSetup = function (e) {
        var t = e.featureId,
            n = this.getFeature(t);
        if (!n) throw new Error("You must provide a featureId to enter direct_select mode");
        if (n.type === p.geojsonTypes.POINT) throw new TypeError("direct_select mode doesn't handle point features");
        var o = {
          featureId: t,
          feature: n,
          dragMoveLocation: e.startPos || null,
          dragMoving: !1,
          canDragMove: !1,
          selectedCoordPaths: e.coordPath ? [e.coordPath] : []
        };
        return this.setSelectedCoordinates(this.pathsToCoordinates(t, o.selectedCoordPaths)), this.setSelected(t), l.disable(this), this.setActionableState({
          trash: !0
        }), o;
      }, y.onStop = function () {
        l.enable(this), this.clearSelectedCoordinates();
      }, y.toDisplayFeatures = function (e, t, n) {
        e.featureId === t.properties.id ? (t.properties.active = p.activeStates.ACTIVE, n(t), c(t, {
          map: this.map,
          midpoints: !0,
          selectedPaths: e.selectedCoordPaths
        }).forEach(n)) : (t.properties.active = p.activeStates.INACTIVE, n(t)), this.fireActionable(e);
      }, y.onTrash = function (e) {
        e.selectedCoordPaths.sort().reverse().forEach(function (t) {
          return e.feature.removeCoordinate(t);
        }), this.fireUpdate(), e.selectedCoordPaths = [], this.clearSelectedCoordinates(), this.fireActionable(e), !1 === e.feature.isValid() && (this.deleteFeature([e.featureId]), this.changeMode(p.modes.SIMPLE_SELECT, {}));
      }, y.onMouseMove = function (e, t) {
        var n = f.isActiveFeature(t),
            o = d(t),
            r = 0 === e.selectedCoordPaths.length;
        n && r ? this.updateUIClasses({
          mouse: p.cursors.MOVE
        }) : o && !r ? this.updateUIClasses({
          mouse: p.cursors.MOVE
        }) : this.updateUIClasses({
          mouse: p.cursors.NONE
        }), this.stopDragging(e);
      }, y.onMouseOut = function (e) {
        e.dragMoving && this.fireUpdate();
      }, y.onTouchStart = y.onMouseDown = function (e, t) {
        return d(t) ? this.onVertex(e, t) : f.isActiveFeature(t) ? this.onFeature(e, t) : g(t) ? this.onMidpoint(e, t) : void 0;
      }, y.onDrag = function (e, t) {
        if (!0 === e.canDragMove) {
          e.dragMoving = !0, t.originalEvent.stopPropagation();
          var n = {
            lng: t.lngLat.lng - e.dragMoveLocation.lng,
            lat: t.lngLat.lat - e.dragMoveLocation.lat
          };
          e.selectedCoordPaths.length > 0 ? this.dragVertex(e, t, n) : this.dragFeature(e, t, n), e.dragMoveLocation = t.lngLat;
        }
      }, y.onClick = function (e, t) {
        return r(t) ? this.clickNoTarget(e, t) : f.isActiveFeature(t) ? this.clickActiveFeature(e, t) : s(t) ? this.clickInactive(e, t) : void this.stopDragging(e);
      }, y.onTap = function (e, t) {
        return r(t) ? this.clickNoTarget(e, t) : f.isActiveFeature(t) ? this.clickActiveFeature(e, t) : s(t) ? this.clickInactive(e, t) : void 0;
      }, y.onTouchEnd = y.onMouseUp = function (e) {
        e.dragMoving && this.fireUpdate(), this.stopDragging(e);
      }, t.exports = y;
    }, {
      "../constants": 23,
      "../lib/common_selectors": 30,
      "../lib/constrain_feature_movement": 31,
      "../lib/create_supplementary_points": 33,
      "../lib/double_click_zoom": 35,
      "../lib/move_features": 45
    }],
    53: [function (e, t, n) {

      function o(e) {
        return s(e) || i(e) || r();
      }

      function r() {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      }

      function i(e) {
        if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
      }

      function s(e) {
        if (Array.isArray(e)) {
          for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];

          return n;
        }
      }

      var a = e("../lib/common_selectors"),
          c = e("../lib/is_event_at_coordinates"),
          u = e("../lib/double_click_zoom"),
          l = e("../constants"),
          p = e("../lib/create_vertex"),
          f = {};
      f.onSetup = function (e) {
        var t,
            n,
            r = (e = e || {}).featureId,
            i = "forward";

        if (r) {
          if (!(t = this.getFeature(r))) throw new Error("Could not find a feature with the provided featureId");
          var s = e.from;
          if (s && "Feature" === s.type && s.geometry && "Point" === s.geometry.type && (s = s.geometry), s && "Point" === s.type && s.coordinates && 2 === s.coordinates.length && (s = s.coordinates), !s || !Array.isArray(s)) throw new Error("Please use the `from` property to indicate which point to continue the line from");
          var a = t.coordinates.length - 1;

          if (t.coordinates[a][0] === s[0] && t.coordinates[a][1] === s[1]) {
            var c;
            n = a + 1, (c = t).addCoordinate.apply(c, [n].concat(o(t.coordinates[a])));
          } else {
            if (t.coordinates[0][0] !== s[0] || t.coordinates[0][1] !== s[1]) throw new Error("`from` should match the point at either the start or the end of the provided LineString");
            var p;
            i = "backwards", n = 0, (p = t).addCoordinate.apply(p, [n].concat(o(t.coordinates[0])));
          }
        } else t = this.newFeature({
          type: l.geojsonTypes.FEATURE,
          properties: {},
          geometry: {
            type: l.geojsonTypes.LINE_STRING,
            coordinates: []
          }
        }), n = 0, this.addFeature(t);

        return this.clearSelectedFeatures(), u.disable(this), this.updateUIClasses({
          mouse: l.cursors.ADD
        }), this.activateUIButton(l.types.LINE), this.setActionableState({
          trash: !0
        }), {
          line: t,
          currentVertexPosition: n,
          direction: i
        };
      }, f.clickAnywhere = function (e, t) {
        if (e.currentVertexPosition > 0 && c(t, e.line.coordinates[e.currentVertexPosition - 1]) || "backwards" === e.direction && c(t, e.line.coordinates[e.currentVertexPosition + 1])) return this.changeMode(l.modes.SIMPLE_SELECT, {
          featureIds: [e.line.id]
        });
        this.updateUIClasses({
          mouse: l.cursors.ADD
        }), e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat), "forward" === e.direction ? (e.currentVertexPosition++, e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat)) : e.line.addCoordinate(0, t.lngLat.lng, t.lngLat.lat);
      }, f.clickOnVertex = function (e) {
        return this.changeMode(l.modes.SIMPLE_SELECT, {
          featureIds: [e.line.id]
        });
      }, f.onMouseMove = function (e, t) {
        e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat), a.isVertex(t) && this.updateUIClasses({
          mouse: l.cursors.POINTER
        });
      }, f.onTap = f.onClick = function (e, t) {
        if (a.isVertex(t)) return this.clickOnVertex(e, t);
        this.clickAnywhere(e, t);
      }, f.onKeyUp = function (e, t) {
        a.isEnterKey(t) ? this.changeMode(l.modes.SIMPLE_SELECT, {
          featureIds: [e.line.id]
        }) : a.isEscapeKey(t) && (this.deleteFeature([e.line.id], {
          silent: !0
        }), this.changeMode(l.modes.SIMPLE_SELECT));
      }, f.onStop = function (e) {
        u.enable(this), this.activateUIButton(), void 0 !== this.getFeature(e.line.id) && (e.line.removeCoordinate("".concat(e.currentVertexPosition)), e.line.isValid() ? this.map.fire(l.events.CREATE, {
          features: [e.line.toGeoJSON()]
        }) : (this.deleteFeature([e.line.id], {
          silent: !0
        }), this.changeMode(l.modes.SIMPLE_SELECT, {}, {
          silent: !0
        })));
      }, f.onTrash = function (e) {
        this.deleteFeature([e.line.id], {
          silent: !0
        }), this.changeMode(l.modes.SIMPLE_SELECT);
      }, f.toDisplayFeatures = function (e, t, n) {
        var o = t.properties.id === e.line.id;
        if (t.properties.active = o ? l.activeStates.ACTIVE : l.activeStates.INACTIVE, !o) return n(t);
        t.geometry.coordinates.length < 2 || (t.properties.meta = l.meta.FEATURE, n(p(e.line.id, t.geometry.coordinates["forward" === e.direction ? t.geometry.coordinates.length - 2 : 1], "".concat("forward" === e.direction ? t.geometry.coordinates.length - 2 : 1), !1)), n(t));
      }, t.exports = f;
    }, {
      "../constants": 23,
      "../lib/common_selectors": 30,
      "../lib/create_vertex": 34,
      "../lib/double_click_zoom": 35,
      "../lib/is_event_at_coordinates": 40
    }],
    54: [function (e, t, n) {

      var o = e("../lib/common_selectors"),
          r = e("../constants"),
          i = {};
      i.onSetup = function () {
        var e = this.newFeature({
          type: r.geojsonTypes.FEATURE,
          properties: {},
          geometry: {
            type: r.geojsonTypes.POINT,
            coordinates: []
          }
        });
        return this.addFeature(e), this.clearSelectedFeatures(), this.updateUIClasses({
          mouse: r.cursors.ADD
        }), this.activateUIButton(r.types.POINT), this.setActionableState({
          trash: !0
        }), {
          point: e
        };
      }, i.stopDrawingAndRemove = function (e) {
        this.deleteFeature([e.point.id], {
          silent: !0
        }), this.changeMode(r.modes.SIMPLE_SELECT);
      }, i.onTap = i.onClick = function (e, t) {
        this.updateUIClasses({
          mouse: r.cursors.MOVE
        }), e.point.updateCoordinate("", t.lngLat.lng, t.lngLat.lat), this.map.fire(r.events.CREATE, {
          features: [e.point.toGeoJSON()]
        }), this.changeMode(r.modes.SIMPLE_SELECT, {
          featureIds: [e.point.id]
        });
      }, i.onStop = function (e) {
        this.activateUIButton(), e.point.getCoordinate().length || this.deleteFeature([e.point.id], {
          silent: !0
        });
      }, i.toDisplayFeatures = function (e, t, n) {
        var o = t.properties.id === e.point.id;
        if (t.properties.active = o ? r.activeStates.ACTIVE : r.activeStates.INACTIVE, !o) return n(t);
      }, i.onTrash = i.stopDrawingAndRemove, i.onKeyUp = function (e, t) {
        if (o.isEscapeKey(t) || o.isEnterKey(t)) return this.stopDrawingAndRemove(e, t);
      }, t.exports = i;
    }, {
      "../constants": 23,
      "../lib/common_selectors": 30
    }],
    55: [function (e, t, n) {

      var o = e("../lib/common_selectors"),
          r = e("../lib/double_click_zoom"),
          i = e("../constants"),
          s = e("../lib/is_event_at_coordinates"),
          a = e("../lib/create_vertex"),
          c = {};
      c.onSetup = function () {
        var e = this.newFeature({
          type: i.geojsonTypes.FEATURE,
          properties: {},
          geometry: {
            type: i.geojsonTypes.POLYGON,
            coordinates: [[]]
          }
        });
        return this.addFeature(e), this.clearSelectedFeatures(), r.disable(this), this.updateUIClasses({
          mouse: i.cursors.ADD
        }), this.activateUIButton(i.types.POLYGON), this.setActionableState({
          trash: !0
        }), {
          polygon: e,
          currentVertexPosition: 0
        };
      }, c.clickAnywhere = function (e, t) {
        if (e.currentVertexPosition > 0 && s(t, e.polygon.coordinates[0][e.currentVertexPosition - 1])) return this.changeMode(i.modes.SIMPLE_SELECT, {
          featureIds: [e.polygon.id]
        });
        this.updateUIClasses({
          mouse: i.cursors.ADD
        }), e.polygon.updateCoordinate("0.".concat(e.currentVertexPosition), t.lngLat.lng, t.lngLat.lat), e.currentVertexPosition++, e.polygon.updateCoordinate("0.".concat(e.currentVertexPosition), t.lngLat.lng, t.lngLat.lat);
      }, c.clickOnVertex = function (e) {
        return this.changeMode(i.modes.SIMPLE_SELECT, {
          featureIds: [e.polygon.id]
        });
      }, c.onMouseMove = function (e, t) {
        e.polygon.updateCoordinate("0.".concat(e.currentVertexPosition), t.lngLat.lng, t.lngLat.lat), o.isVertex(t) && this.updateUIClasses({
          mouse: i.cursors.POINTER
        });
      }, c.onTap = c.onClick = function (e, t) {
        return o.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
      }, c.onKeyUp = function (e, t) {
        o.isEscapeKey(t) ? (this.deleteFeature([e.polygon.id], {
          silent: !0
        }), this.changeMode(i.modes.SIMPLE_SELECT)) : o.isEnterKey(t) && this.changeMode(i.modes.SIMPLE_SELECT, {
          featureIds: [e.polygon.id]
        });
      }, c.onStop = function (e) {
        this.updateUIClasses({
          mouse: i.cursors.NONE
        }), r.enable(this), this.activateUIButton(), void 0 !== this.getFeature(e.polygon.id) && (e.polygon.removeCoordinate("0.".concat(e.currentVertexPosition)), e.polygon.isValid() ? this.map.fire(i.events.CREATE, {
          features: [e.polygon.toGeoJSON()]
        }) : (this.deleteFeature([e.polygon.id], {
          silent: !0
        }), this.changeMode(i.modes.SIMPLE_SELECT, {}, {
          silent: !0
        })));
      }, c.toDisplayFeatures = function (e, t, n) {
        var o = t.properties.id === e.polygon.id;
        if (t.properties.active = o ? i.activeStates.ACTIVE : i.activeStates.INACTIVE, !o) return n(t);

        if (0 !== t.geometry.coordinates.length) {
          var r = t.geometry.coordinates[0].length;

          if (!(r < 3)) {
            if (t.properties.meta = i.meta.FEATURE, n(a(e.polygon.id, t.geometry.coordinates[0][0], "0.0", !1)), r > 3) {
              var s = t.geometry.coordinates[0].length - 3;
              n(a(e.polygon.id, t.geometry.coordinates[0][s], "0.".concat(s), !1));
            }

            if (r <= 4) {
              var c = [[t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]], [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]]];
              if (n({
                type: i.geojsonTypes.FEATURE,
                properties: t.properties,
                geometry: {
                  coordinates: c,
                  type: i.geojsonTypes.LINE_STRING
                }
              }), 3 === r) return;
            }

            return n(t);
          }
        }
      }, c.onTrash = function (e) {
        this.deleteFeature([e.polygon.id], {
          silent: !0
        }), this.changeMode(i.modes.SIMPLE_SELECT);
      }, t.exports = c;
    }, {
      "../constants": 23,
      "../lib/common_selectors": 30,
      "../lib/create_vertex": 34,
      "../lib/double_click_zoom": 35,
      "../lib/is_event_at_coordinates": 40
    }],
    56: [function (e, t, n) {

      t.exports = {
        simple_select: e("./simple_select"),
        direct_select: e("./direct_select"),
        draw_point: e("./draw_point"),
        draw_polygon: e("./draw_polygon"),
        draw_line_string: e("./draw_line_string")
      };
    }, {
      "./direct_select": 52,
      "./draw_line_string": 53,
      "./draw_point": 54,
      "./draw_polygon": 55,
      "./simple_select": 60
    }],
    57: [function (e, t, n) {

      var o = t.exports = e("./mode_interface_accessors");
      o.prototype.onSetup = function () {}, o.prototype.onDrag = function () {}, o.prototype.onClick = function () {}, o.prototype.onMouseMove = function () {}, o.prototype.onMouseDown = function () {}, o.prototype.onMouseUp = function () {}, o.prototype.onMouseOut = function () {}, o.prototype.onKeyUp = function () {}, o.prototype.onKeyDown = function () {}, o.prototype.onTouchStart = function () {}, o.prototype.onTouchMove = function () {}, o.prototype.onTouchEnd = function () {}, o.prototype.onTap = function () {}, o.prototype.onStop = function () {}, o.prototype.onTrash = function () {}, o.prototype.onCombineFeature = function () {}, o.prototype.onUncombineFeature = function () {}, o.prototype.toDisplayFeatures = function () {
        throw new Error("You must overwrite toDisplayFeatures");
      };
    }, {
      "./mode_interface_accessors": 58
    }],
    58: [function (e, t, n) {

      var o = e("../constants"),
          r = e("../lib/features_at"),
          i = e("../feature_types/point"),
          s = e("../feature_types/line_string"),
          a = e("../feature_types/polygon"),
          c = e("../feature_types/multi_feature"),
          u = t.exports = function (e) {
        this.map = e.map, this.drawConfig = JSON.parse(JSON.stringify(e.options || {})), this._ctx = e;
      };

      u.prototype.setSelected = function (e) {
        return this._ctx.store.setSelected(e);
      }, u.prototype.setSelectedCoordinates = function (e) {
        var t = this;
        this._ctx.store.setSelectedCoordinates(e), e.reduce(function (e, n) {
          return void 0 === e[n.feature_id] && (e[n.feature_id] = !0, t._ctx.store.get(n.feature_id).changed()), e;
        }, {});
      }, u.prototype.getSelected = function () {
        return this._ctx.store.getSelected();
      }, u.prototype.getSelectedIds = function () {
        return this._ctx.store.getSelectedIds();
      }, u.prototype.isSelected = function (e) {
        return this._ctx.store.isSelected(e);
      }, u.prototype.getFeature = function (e) {
        return this._ctx.store.get(e);
      }, u.prototype.select = function (e) {
        return this._ctx.store.select(e);
      }, u.prototype.deselect = function (e) {
        return this._ctx.store.deselect(e);
      }, u.prototype.deleteFeature = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return this._ctx.store.delete(e, t);
      }, u.prototype.addFeature = function (e) {
        return this._ctx.store.add(e);
      }, u.prototype.clearSelectedFeatures = function () {
        return this._ctx.store.clearSelected();
      }, u.prototype.clearSelectedCoordinates = function () {
        return this._ctx.store.clearSelectedCoordinates();
      }, u.prototype.setActionableState = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = {
          trash: e.trash || !1,
          combineFeatures: e.combineFeatures || !1,
          uncombineFeatures: e.uncombineFeatures || !1
        };
        return this._ctx.events.actionable(t);
      }, u.prototype.changeMode = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return this._ctx.events.changeMode(e, t, n);
      }, u.prototype.updateUIClasses = function (e) {
        return this._ctx.ui.queueMapClasses(e);
      }, u.prototype.activateUIButton = function (e) {
        return this._ctx.ui.setActiveButton(e);
      }, u.prototype.featuresAt = function (e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "click";
        if ("click" !== n && "touch" !== n) throw new Error("invalid buffer type");
        return r[n](e, t, this._ctx);
      }, u.prototype.newFeature = function (e) {
        var t = e.geometry.type;
        return t === o.geojsonTypes.POINT ? new i(this._ctx, e) : t === o.geojsonTypes.LINE_STRING ? new s(this._ctx, e) : t === o.geojsonTypes.POLYGON ? new a(this._ctx, e) : new c(this._ctx, e);
      }, u.prototype.isInstanceOf = function (e, t) {
        if (e === o.geojsonTypes.POINT) return t instanceof i;
        if (e === o.geojsonTypes.LINE_STRING) return t instanceof s;
        if (e === o.geojsonTypes.POLYGON) return t instanceof a;
        if ("MultiFeature" === e) return t instanceof c;
        throw new Error("Unknown feature class: ".concat(e));
      }, u.prototype.doRender = function (e) {
        return this._ctx.store.featureChanged(e);
      };
    }, {
      "../constants": 23,
      "../feature_types/line_string": 26,
      "../feature_types/multi_feature": 27,
      "../feature_types/point": 28,
      "../feature_types/polygon": 29,
      "../lib/features_at": 37
    }],
    59: [function (e, t, n) {

      var o = e("./mode_interface"),
          r = {
        drag: "onDrag",
        click: "onClick",
        mousemove: "onMouseMove",
        mousedown: "onMouseDown",
        mouseup: "onMouseUp",
        mouseout: "onMouseOut",
        keyup: "onKeyUp",
        keydown: "onKeyDown",
        touchstart: "onTouchStart",
        touchmove: "onTouchMove",
        touchend: "onTouchEnd",
        tap: "onTap"
      },
          i = Object.keys(r);

      t.exports = function (e) {
        var t = Object.keys(e);
        return function (n) {
          function s(e) {
            return function (t) {
              u[e](c, t);
            };
          }

          var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              c = {},
              u = t.reduce(function (t, n) {
            return t[n] = e[n], t;
          }, new o(n));
          return {
            start: function () {
              var t = this;
              c = u.onSetup(a), i.forEach(function (n) {
                var o = r[n],
                    i = function () {
                  return !1;
                };

                e[o] && (i = function () {
                  return !0;
                }), t.on(n, i, s(o));
              });
            },
            stop: function () {
              u.onStop(c);
            },
            trash: function () {
              u.onTrash(c);
            },
            combineFeatures: function () {
              u.onCombineFeatures(c);
            },
            uncombineFeatures: function () {
              u.onUncombineFeatures(c);
            },
            render: function (e, t) {
              u.toDisplayFeatures(c, e, t);
            }
          };
        };
      };
    }, {
      "./mode_interface": 57
    }],
    60: [function (e, t, n) {

      var o = e("../lib/common_selectors"),
          r = e("../lib/mouse_event_point"),
          i = e("../lib/create_supplementary_points"),
          s = e("../lib/string_set"),
          a = e("../lib/double_click_zoom"),
          c = e("../lib/move_features"),
          u = e("../constants"),
          l = {};
      l.onSetup = function (e) {
        var t = this,
            n = {
          dragMoveLocation: null,
          boxSelectStartLocation: null,
          boxSelectElement: void 0,
          boxSelecting: !1,
          canBoxSelect: !1,
          dragMoveing: !1,
          canDragMove: !1,
          initiallySelectedFeatureIds: e.featureIds || []
        };
        return this.setSelected(n.initiallySelectedFeatureIds.filter(function (e) {
          return void 0 !== t.getFeature(e);
        })), this.fireActionable(), this.setActionableState({
          combineFeatures: !0,
          uncombineFeatures: !0,
          trash: !0
        }), n;
      }, l.fireUpdate = function () {
        this.map.fire(u.events.UPDATE, {
          action: u.updateActions.MOVE,
          features: this.getSelected().map(function (e) {
            return e.toGeoJSON();
          })
        });
      }, l.fireActionable = function () {
        var e = this,
            t = this.getSelected(),
            n = t.filter(function (t) {
          return e.isInstanceOf("MultiFeature", t);
        }),
            o = !1;

        if (t.length > 1) {
          o = !0;
          var r = t[0].type.replace("Multi", "");
          t.forEach(function (e) {
            e.type.replace("Multi", "") !== r && (o = !1);
          });
        }

        var i = n.length > 0,
            s = t.length > 0;
        this.setActionableState({
          combineFeatures: o,
          uncombineFeatures: i,
          trash: s
        });
      }, l.getUniqueIds = function (e) {
        return e.length ? e.map(function (e) {
          return e.properties.id;
        }).filter(function (e) {
          return void 0 !== e;
        }).reduce(function (e, t) {
          return e.add(t), e;
        }, new s()).values() : [];
      }, l.stopExtendedInteractions = function (e) {
        e.boxSelectElement && (e.boxSelectElement.parentNode && e.boxSelectElement.parentNode.removeChild(e.boxSelectElement), e.boxSelectElement = null), this.map.dragPan.enable(), e.boxSelecting = !1, e.canBoxSelect = !1, e.dragMoving = !1, e.canDragMove = !1;
      }, l.onStop = function () {
        a.enable(this);
      }, l.onMouseMove = function (e) {
        return this.stopExtendedInteractions(e);
      }, l.onMouseOut = function (e) {
        if (e.dragMoving) return this.fireUpdate();
      }, l.onTap = l.onClick = function (e, t) {
        return o.noTarget(t) ? this.clickAnywhere(e, t) : o.isOfMetaType(u.meta.VERTEX)(t) ? this.clickOnVertex(e, t) : o.isFeature(t) ? this.clickOnFeature(e, t) : void 0;
      }, l.clickAnywhere = function (e) {
        var t = this,
            n = this.getSelectedIds();
        n.length && (this.clearSelectedFeatures(), n.forEach(function (e) {
          return t.doRender(e);
        })), a.enable(this), this.stopExtendedInteractions(e);
      }, l.clickOnVertex = function (e, t) {
        this.changeMode(u.modes.DIRECT_SELECT, {
          featureId: t.featureTarget.properties.parent,
          coordPath: t.featureTarget.properties.coord_path,
          startPos: t.lngLat
        }), this.updateUIClasses({
          mouse: u.cursors.MOVE
        });
      }, l.startOnActiveFeature = function (e, t) {
        this.stopExtendedInteractions(e), this.map.dragPan.disable(), this.doRender(t.featureTarget.properties.id), e.canDragMove = !0, e.dragMoveLocation = t.lngLat;
      }, l.clickOnFeature = function (e, t) {
        var n = this;
        a.disable(this), this.stopExtendedInteractions(e);
        var r = o.isShiftDown(t),
            i = this.getSelectedIds(),
            s = t.featureTarget.properties.id,
            c = this.isSelected(s);
        if (!r && c && this.getFeature(s).type !== u.geojsonTypes.POINT) return this.changeMode(u.modes.DIRECT_SELECT, {
          featureId: s
        });
        c && r ? (this.deselect(s), this.updateUIClasses({
          mouse: u.cursors.POINTER
        }), 1 === i.length && a.enable(this)) : !c && r ? (this.select(s), this.updateUIClasses({
          mouse: u.cursors.MOVE
        })) : c || r || (i.forEach(function (e) {
          return n.doRender(e);
        }), this.setSelected(s), this.updateUIClasses({
          mouse: u.cursors.MOVE
        })), this.doRender(s);
      }, l.onMouseDown = function (e, t) {
        return o.isActiveFeature(t) ? this.startOnActiveFeature(e, t) : this.drawConfig.boxSelect && o.isShiftMousedown(t) ? this.startBoxSelect(e, t) : void 0;
      }, l.startBoxSelect = function (e, t) {
        this.stopExtendedInteractions(e), this.map.dragPan.disable(), e.boxSelectStartLocation = r(t.originalEvent, this.map.getContainer()), e.canBoxSelect = !0;
      }, l.onTouchStart = function (e, t) {
        if (o.isActiveFeature(t)) return this.startOnActiveFeature(e, t);
      }, l.onDrag = function (e, t) {
        return e.canDragMove ? this.dragMove(e, t) : this.drawConfig.boxSelect && e.canBoxSelect ? this.whileBoxSelect(e, t) : void 0;
      }, l.whileBoxSelect = function (e, t) {
        e.boxSelecting = !0, this.updateUIClasses({
          mouse: u.cursors.ADD
        }), e.boxSelectElement || (e.boxSelectElement = document.createElement("div"), e.boxSelectElement.classList.add(u.classes.BOX_SELECT), this.map.getContainer().appendChild(e.boxSelectElement));
        var n = r(t.originalEvent, this.map.getContainer()),
            o = Math.min(e.boxSelectStartLocation.x, n.x),
            i = Math.max(e.boxSelectStartLocation.x, n.x),
            s = Math.min(e.boxSelectStartLocation.y, n.y),
            a = Math.max(e.boxSelectStartLocation.y, n.y),
            c = "translate(".concat(o, "px, ").concat(s, "px)");
        e.boxSelectElement.style.transform = c, e.boxSelectElement.style.WebkitTransform = c, e.boxSelectElement.style.width = "".concat(i - o, "px"), e.boxSelectElement.style.height = "".concat(a - s, "px");
      }, l.dragMove = function (e, t) {
        e.dragMoving = !0, t.originalEvent.stopPropagation();
        var n = {
          lng: t.lngLat.lng - e.dragMoveLocation.lng,
          lat: t.lngLat.lat - e.dragMoveLocation.lat
        };
        c(this.getSelected(), n), e.dragMoveLocation = t.lngLat;
      }, l.onMouseUp = function (e, t) {
        var n = this;
        if (e.dragMoving) this.fireUpdate();else if (e.boxSelecting) {
          var o = [e.boxSelectStartLocation, r(t.originalEvent, this.map.getContainer())],
              i = this.featuresAt(null, o, "click"),
              s = this.getUniqueIds(i).filter(function (e) {
            return !n.isSelected(e);
          });
          s.length && (this.select(s), s.forEach(function (e) {
            return n.doRender(e);
          }), this.updateUIClasses({
            mouse: u.cursors.MOVE
          }));
        }
        this.stopExtendedInteractions(e);
      }, l.toDisplayFeatures = function (e, t, n) {
        t.properties.active = this.isSelected(t.properties.id) ? u.activeStates.ACTIVE : u.activeStates.INACTIVE, n(t), this.fireActionable(), t.properties.active === u.activeStates.ACTIVE && t.geometry.type !== u.geojsonTypes.POINT && i(t).forEach(n);
      }, l.onTrash = function () {
        this.deleteFeature(this.getSelectedIds()), this.fireActionable();
      }, l.onCombineFeatures = function () {
        var e = this.getSelected();

        if (!(0 === e.length || e.length < 2)) {
          for (var t = [], n = [], o = e[0].type.replace("Multi", ""), r = 0; r < e.length; r++) {
            var i = e[r];
            if (i.type.replace("Multi", "") !== o) return;
            i.type.includes("Multi") ? i.getCoordinates().forEach(function (e) {
              t.push(e);
            }) : t.push(i.getCoordinates()), n.push(i.toGeoJSON());
          }

          if (n.length > 1) {
            var s = this.newFeature({
              type: u.geojsonTypes.FEATURE,
              properties: n[0].properties,
              geometry: {
                type: "Multi".concat(o),
                coordinates: t
              }
            });
            this.addFeature(s), this.deleteFeature(this.getSelectedIds(), {
              silent: !0
            }), this.setSelected([s.id]), this.map.fire(u.events.COMBINE_FEATURES, {
              createdFeatures: [s.toGeoJSON()],
              deletedFeatures: n
            });
          }

          this.fireActionable();
        }
      }, l.onUncombineFeatures = function () {
        var e = this,
            t = this.getSelected();

        if (0 !== t.length) {
          for (var n = [], o = [], r = 0; r < t.length; r++) !function (r) {
            var i = t[r];
            e.isInstanceOf("MultiFeature", i) && (i.getFeatures().forEach(function (t) {
              e.addFeature(t), t.properties = i.properties, n.push(t.toGeoJSON()), e.select([t.id]);
            }), e.deleteFeature(i.id, {
              silent: !0
            }), o.push(i.toGeoJSON()));
          }(r);

          n.length > 1 && this.map.fire(u.events.UNCOMBINE_FEATURES, {
            createdFeatures: n,
            deletedFeatures: o
          }), this.fireActionable();
        }
      }, t.exports = l;
    }, {
      "../constants": 23,
      "../lib/common_selectors": 30,
      "../lib/create_supplementary_points": 33,
      "../lib/double_click_zoom": 35,
      "../lib/mouse_event_point": 44,
      "../lib/move_features": 45,
      "../lib/string_set": 47
    }],
    61: [function (e, t, n) {

      function o(e, t) {
        return e.map(function (e) {
          return e.source ? e : r(e, {
            id: "".concat(e.id, ".").concat(t),
            source: "hot" === t ? i.sources.HOT : i.sources.COLD
          });
        });
      }

      var r = e("xtend"),
          i = e("./constants"),
          s = {
        defaultMode: i.modes.SIMPLE_SELECT,
        keybindings: !0,
        touchEnabled: !0,
        clickBuffer: 2,
        touchBuffer: 25,
        boxSelect: !0,
        displayControlsDefault: !0,
        styles: e("./lib/theme"),
        modes: e("./modes"),
        controls: {},
        userProperties: !1
      },
          a = {
        point: !0,
        line_string: !0,
        polygon: !0,
        trash: !0,
        combine_features: !0,
        uncombine_features: !0
      },
          c = {
        point: !1,
        line_string: !1,
        polygon: !1,
        trash: !1,
        combine_features: !1,
        uncombine_features: !1
      };

      t.exports = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        console.debug("Setup", e && e.modes);
        var t = r(e);
        return e.controls || (t.controls = {}), !1 === e.displayControlsDefault ? t.controls = r(c, e.controls) : t.controls = r(a, e.controls), t = r(s, t), t.styles = o(t.styles, "cold").concat(o(t.styles, "hot")), console.debug("Setup with defaults", t && t.modes), t;
      };
    }, {
      "./constants": 23,
      "./lib/theme": 49,
      "./modes": 56,
      xtend: 21
    }],
    62: [function (e, t, n) {

      var o = e("./constants");

      t.exports = function () {
        function e(e, t) {
          var o = n.get(e).internal(r);
          n.ctx.events.currentModeRender(o, function (e) {
            n.sources[t].push(e);
          });
        }

        function t() {
          n.isDirty = !1, n.clearChangedIds();
        }

        var n = this;
        if (!(n.ctx.map && void 0 !== n.ctx.map.getSource(o.sources.HOT))) return t();
        var r = n.ctx.events.currentModeName();
        n.ctx.ui.queueMapClasses({
          mode: r
        });
        var i = [],
            s = [];
        n.isDirty ? s = n.getAllIds() : (i = n.getChangedIds().filter(function (e) {
          return void 0 !== n.get(e);
        }), s = n.sources.hot.filter(function (e) {
          return e.properties.id && -1 === i.indexOf(e.properties.id) && void 0 !== n.get(e.properties.id);
        }).map(function (e) {
          return e.properties.id;
        })), n.sources.hot = [];
        var a = n.sources.cold.length;
        n.sources.cold = n.isDirty ? [] : n.sources.cold.filter(function (e) {
          var t = e.properties.id || e.properties.parent;
          return -1 === i.indexOf(t);
        });
        var c = a !== n.sources.cold.length || s.length > 0;

        if (i.forEach(function (t) {
          return e(t, "hot");
        }), s.forEach(function (t) {
          return e(t, "cold");
        }), c && n.ctx.map.getSource(o.sources.COLD).setData({
          type: o.geojsonTypes.FEATURE_COLLECTION,
          features: n.sources.cold
        }), n.ctx.map.getSource(o.sources.HOT).setData({
          type: o.geojsonTypes.FEATURE_COLLECTION,
          features: n.sources.hot
        }), n._emitSelectionChange && (n.ctx.map.fire(o.events.SELECTION_CHANGE, {
          features: n.getSelected().map(function (e) {
            return e.toGeoJSON();
          }),
          points: n.getSelectedCoordinates().map(function (e) {
            return {
              type: o.geojsonTypes.FEATURE,
              properties: {},
              geometry: {
                type: o.geojsonTypes.POINT,
                coordinates: e.coordinates
              }
            };
          })
        }), n._emitSelectionChange = !1), n._deletedFeaturesToEmit.length) {
          var u = n._deletedFeaturesToEmit.map(function (e) {
            return e.toGeoJSON();
          });

          n._deletedFeaturesToEmit = [], n.ctx.map.fire(o.events.DELETE, {
            features: u
          });
        }

        t(), n.ctx.map.fire(o.events.RENDER, {});
      };
    }, {
      "./constants": 23
    }],
    63: [function (e, t, n) {

      var o = e("./events"),
          r = e("./store"),
          i = e("./ui"),
          s = e("./constants"),
          a = e("xtend");

      t.exports = function (e) {
        var t = null,
            n = null,
            c = {
          onRemove: function () {
            return e.map.off("load", c.connect), clearInterval(n), c.removeLayers(), e.store.restoreMapConfig(), e.ui.removeButtons(), e.events.removeEventListeners(), e.ui.clearMapClasses(), e.map = null, e.container = null, e.store = null, t && t.parentNode && t.parentNode.removeChild(t), t = null, this;
          },
          connect: function () {
            e.map.off("load", c.connect), clearInterval(n), c.addLayers(), e.store.storeMapConfig(), e.events.addEventListeners();
          },
          onAdd: function (s) {
            var u = s.fire;
            return s.fire = function (e, t) {
              var n = arguments;
              return 1 === u.length && 1 !== arguments.length && (n = [a({}, {
                type: e
              }, t)]), u.apply(s, n);
            }, e.map = s, e.events = o(e), e.ui = i(e), e.container = s.getContainer(), e.store = new r(e), t = e.ui.addButtons(), e.options.boxSelect && (s.boxZoom.disable(), s.dragPan.disable(), s.dragPan.enable()), s.loaded() ? c.connect() : (s.on("load", c.connect), n = setInterval(function () {
              s.loaded() && c.connect();
            }, 16)), e.events.start(), t;
          },
          addLayers: function () {
            e.map.addSource(s.sources.COLD, {
              data: {
                type: s.geojsonTypes.FEATURE_COLLECTION,
                features: []
              },
              type: "geojson"
            }), e.map.addSource(s.sources.HOT, {
              data: {
                type: s.geojsonTypes.FEATURE_COLLECTION,
                features: []
              },
              type: "geojson"
            }), e.options.styles.forEach(function (t) {
              e.map.addLayer(t);
            }), e.store.setDirty(!0), e.store.render();
          },
          removeLayers: function () {
            e.options.styles.forEach(function (t) {
              e.map.getLayer(t.id) && e.map.removeLayer(t.id);
            }), e.map.getSource(s.sources.COLD) && e.map.removeSource(s.sources.COLD), e.map.getSource(s.sources.HOT) && e.map.removeSource(s.sources.HOT);
          }
        };
        return e.setup = c, c;
      };
    }, {
      "./constants": 23,
      "./events": 24,
      "./store": 64,
      "./ui": 65,
      xtend: 21
    }],
    64: [function (e, t, n) {

      function o(e) {
        var t = this,
            n = this._selectedCoordinates.filter(function (e) {
          return t._selectedFeatureIds.has(e.feature_id);
        });

        this._selectedCoordinates.length === n.length || e.silent || (this._emitSelectionChange = !0), this._selectedCoordinates = n;
      }

      var r = e("./lib/throttle"),
          i = e("./lib/to_dense_array"),
          s = e("./lib/string_set"),
          a = e("./render"),
          c = e("./constants").interactions,
          u = t.exports = function (e) {
        this._features = {}, this._featureIds = new s(), this._selectedFeatureIds = new s(), this._selectedCoordinates = [], this._changedFeatureIds = new s(), this._deletedFeaturesToEmit = [], this._emitSelectionChange = !1, this._mapInitialConfig = {}, this.ctx = e, this.sources = {
          hot: [],
          cold: []
        }, this.render = r(a, 16, this), this.isDirty = !1;
      };

      u.prototype.createRenderBatch = function () {
        var e = this,
            t = this.render,
            n = 0;
        return this.render = function () {
          n++;
        }, function () {
          e.render = t, n > 0 && e.render();
        };
      }, u.prototype.setDirty = function () {
        return this.isDirty = !0, this;
      }, u.prototype.featureChanged = function (e) {
        return this._changedFeatureIds.add(e), this;
      }, u.prototype.getChangedIds = function () {
        return this._changedFeatureIds.values();
      }, u.prototype.clearChangedIds = function () {
        return this._changedFeatureIds.clear(), this;
      }, u.prototype.getAllIds = function () {
        return this._featureIds.values();
      }, u.prototype.add = function (e) {
        return this.featureChanged(e.id), this._features[e.id] = e, this._featureIds.add(e.id), this;
      }, u.prototype.delete = function (e) {
        var t = this,
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return i(e).forEach(function (e) {
          t._featureIds.has(e) && (t._featureIds.delete(e), t._selectedFeatureIds.delete(e), n.silent || -1 === t._deletedFeaturesToEmit.indexOf(t._features[e]) && t._deletedFeaturesToEmit.push(t._features[e]), delete t._features[e], t.isDirty = !0);
        }), o.call(this, n), this;
      }, u.prototype.get = function (e) {
        return this._features[e];
      }, u.prototype.getAll = function () {
        var e = this;
        return Object.keys(this._features).map(function (t) {
          return e._features[t];
        });
      }, u.prototype.select = function (e) {
        var t = this,
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return i(e).forEach(function (e) {
          t._selectedFeatureIds.has(e) || (t._selectedFeatureIds.add(e), t._changedFeatureIds.add(e), n.silent || (t._emitSelectionChange = !0));
        }), this;
      }, u.prototype.deselect = function (e) {
        var t = this,
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return i(e).forEach(function (e) {
          t._selectedFeatureIds.has(e) && (t._selectedFeatureIds.delete(e), t._changedFeatureIds.add(e), n.silent || (t._emitSelectionChange = !0));
        }), o.call(this, n), this;
      }, u.prototype.clearSelected = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return this.deselect(this._selectedFeatureIds.values(), {
          silent: e.silent
        }), this;
      }, u.prototype.setSelected = function (e) {
        var t = this,
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return e = i(e), this.deselect(this._selectedFeatureIds.values().filter(function (t) {
          return -1 === e.indexOf(t);
        }), {
          silent: n.silent
        }), this.select(e.filter(function (e) {
          return !t._selectedFeatureIds.has(e);
        }), {
          silent: n.silent
        }), this;
      }, u.prototype.setSelectedCoordinates = function (e) {
        return this._selectedCoordinates = e, this._emitSelectionChange = !0, this;
      }, u.prototype.clearSelectedCoordinates = function () {
        return this._selectedCoordinates = [], this._emitSelectionChange = !0, this;
      }, u.prototype.getSelectedIds = function () {
        return this._selectedFeatureIds.values();
      }, u.prototype.getSelected = function () {
        var e = this;
        return this._selectedFeatureIds.values().map(function (t) {
          return e.get(t);
        });
      }, u.prototype.getSelectedCoordinates = function () {
        var e = this;
        return this._selectedCoordinates.map(function (t) {
          return {
            coordinates: e.get(t.feature_id).getCoordinate(t.coord_path)
          };
        });
      }, u.prototype.isSelected = function (e) {
        return this._selectedFeatureIds.has(e);
      }, u.prototype.setFeatureProperty = function (e, t, n) {
        this.get(e).setProperty(t, n), this.featureChanged(e);
      }, u.prototype.storeMapConfig = function () {
        var e = this;
        c.forEach(function (t) {
          e.ctx.map[t] && (e._mapInitialConfig[t] = e.ctx.map[t].isEnabled());
        });
      }, u.prototype.restoreMapConfig = function () {
        var e = this;
        Object.keys(this._mapInitialConfig).forEach(function (t) {
          e._mapInitialConfig[t] ? e.ctx.map[t].enable() : e.ctx.map[t].disable();
        });
      }, u.prototype.getInitialConfigValue = function (e) {
        return void 0 === this._mapInitialConfig[e] || this._mapInitialConfig[e];
      };
    }, {
      "./constants": 23,
      "./lib/string_set": 47,
      "./lib/throttle": 50,
      "./lib/to_dense_array": 51,
      "./render": 62
    }],
    65: [function (e, t, n) {

      function o(e) {
        return s(e) || i(e) || r();
      }

      function r() {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      }

      function i(e) {
        if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
      }

      function s(e) {
        if (Array.isArray(e)) {
          for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];

          return n;
        }
      }

      function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : e[t] = n, e;
      }

      var c = e("xtend"),
          u = e("./constants"),
          l = ["mode", "feature", "mouse"];

      t.exports = function (e) {
        function t(e) {
          y = c(y, e);
        }

        function n() {
          if (e.container) {
            var t = [],
                n = [];
            l.forEach(function (e) {
              y[e] !== g[e] && (t.push("".concat(e, "-").concat(g[e])), null !== y[e] && n.push("".concat(e, "-").concat(y[e])));
            }), t.length > 0 && e.container.classList.remove.apply(e.container.classList, t), n.length > 0 && e.container.classList.add.apply(e.container.classList, n), g = c(g, y);
          }
        }

        function r(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = document.createElement("button");
          return n.className = "".concat(u.classes.CONTROL_BUTTON, " ").concat(t.className), n.setAttribute("title", t.title), t.icon && n.setAttribute("style", "background-image: url(".concat(t.icon, "); background-size: contain;")), t.container.appendChild(n), n.addEventListener("click", function (n) {
            n.preventDefault(), n.stopPropagation(), n.target !== d ? (s(e), t.onActivate()) : i();
          }, !0), n;
        }

        function i() {
          d && (d.classList.remove(u.classes.ACTIVE_BUTTON), d = null);
        }

        function s(e) {
          i();
          var t = h[e];
          t && t && "trash" !== e && (t.classList.add(u.classes.ACTIVE_BUTTON), d = t);
        }

        var p,
            f = (p = {}, a(p, u.types.LINE, {
          type: u.types.LINE,
          className: u.classes.CONTROL_BUTTON_LINE,
          title: function (e) {
            return "LineString tool ".concat(e.keybindings ? "(l)" : "");
          },
          onActivate: function (e) {
            return e.events.changeMode(u.modes.DRAW_LINE_STRING);
          }
        }), a(p, u.types.POLYGON, {
          type: u.types.POLYGON,
          className: u.classes.CONTROL_BUTTON_POLYGON,
          title: function (e) {
            return "Polygon tool ".concat(e.keybindings ? "(p)" : "");
          },
          onActivate: function (e) {
            return e.events.changeMode(u.modes.DRAW_POLYGON);
          }
        }), a(p, u.types.POINT, {
          type: u.types.POINT,
          className: u.classes.CONTROL_BUTTON_POINT,
          title: function (e) {
            return "Marker tool ".concat(e.keybindings ? "(m)" : "");
          },
          onActivate: function (e) {
            return e.events.changeMode(u.modes.DRAW_POINT);
          }
        }), a(p, "trash", {
          type: "trash",
          className: u.classes.CONTROL_BUTTON_TRASH,
          title: "Delete",
          onActivate: function (e) {
            return e.events.trash();
          }
        }), a(p, "combine_features", {
          type: "combine_features",
          className: u.classes.CONTROL_BUTTON_COMBINE_FEATURES,
          title: "Combine",
          onActivate: function (e) {
            return e.events.combineFeatures();
          }
        }), a(p, "uncombine_features", {
          type: "uncombine_features",
          className: u.classes.CONTROL_BUTTON_UNCOMBINE_FEATURES,
          title: "Uncombine",
          onActivate: function (e) {
            return e.events.uncombineFeatures();
          }
        }), p),
            h = {},
            d = null,
            g = {
          mode: null,
          feature: null,
          mouse: null
        },
            y = {
          mode: null,
          feature: null,
          mouse: null
        };
        return {
          setActiveButton: s,
          queueMapClasses: t,
          updateMapClasses: n,
          clearMapClasses: function () {
            t({
              mode: null,
              feature: null,
              mouse: null
            }), n();
          },
          addButtons: function () {
            var t = e.options.controls,
                n = document.createElement("div");
            n.className = "".concat(u.classes.CONTROL_GROUP, " ").concat(u.classes.CONTROL_BASE);
            var i = [];
            return t ? ("[object Object]" === String(t) && Object.keys(t).forEach(function (e) {
              var n = t[e];
              "boolean" == typeof n && n && i.push(e), "[object Object]" === String(n) && (n.type = e, i.push(n));
            }), Array.isArray(t) && (i = o(t)), i.forEach(function (t) {
              var o = "string" == typeof t ? f[t] : t;
              o && (h[o.type] = r(o.type, {
                container: n,
                className: o.className,
                title: "function" == typeof o.title ? o.title(e.options) : o.title,
                onActivate: function () {
                  return o.onActivate(e);
                },
                icon: o.icon
              }));
            }), n) : n;
          },
          removeButtons: function () {
            Object.keys(h).forEach(function (e) {
              var t = h[e];
              t.parentNode && t.parentNode.removeChild(t), delete h[e];
            });
          }
        };
      };
    }, {
      "./constants": 23,
      xtend: 21
    }]
  }, {}, [1])(1);
});
});

var theme = [{
  'id': 'gl-draw-polygon-fill-inactive',
  'type': 'fill',
  'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
  'paint': {
    'fill-color': '#3bb2d0',
    'fill-outline-color': '#3bb2d0',
    'fill-opacity': 0.1
  }
}, {
  'id': 'gl-draw-polygon-fill-active',
  'type': 'fill',
  'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
  'paint': {
    'fill-color': '#fbb03b',
    'fill-outline-color': '#fbb03b',
    'fill-opacity': 0.1
  }
}, {
  'id': 'gl-draw-polygon-midpoint',
  'type': 'circle',
  'filter': ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']],
  'paint': {
    'circle-radius': 3,
    'circle-color': '#fbb03b'
  }
}, {
  'id': 'gl-draw-polygon-stroke-inactive',
  'type': 'line',
  'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#3bb2d0',
    'line-width': 2
  }
}, {
  'id': 'gl-draw-polygon-stroke-active',
  'type': 'line',
  'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#fbb03b',
    'line-dasharray': [0.2, 2],
    'line-width': 2
  }
}, {
  'id': 'gl-draw-line-inactive',
  'type': 'line',
  'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#3bb2d0',
    'line-width': 2
  }
}, {
  'id': 'gl-draw-line-active',
  'type': 'line',
  'filter': ['all', ['==', '$type', 'LineString'], ['==', 'active', 'true']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#fbb03b',
    'line-dasharray': [0.2, 2],
    'line-width': 2
  }
}, {
  'id': 'gl-draw-polygon-and-line-vertex-stroke-inactive',
  'type': 'circle',
  'filter': ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
  'paint': {
    'circle-radius': 5,
    'circle-color': '#fff'
  }
}, {
  'id': 'gl-draw-polygon-and-line-vertex-inactive',
  'type': 'circle',
  'filter': ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
  'paint': {
    'circle-radius': 3,
    'circle-color': '#fbb03b'
  }
}, {
  'id': 'gl-draw-point-point-stroke-inactive',
  'type': 'circle',
  'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'Point'], ['==', 'meta', 'feature'], ['!=', 'mode', 'static']],
  'paint': {
    'circle-radius': 5,
    'circle-opacity': 1,
    'circle-color': '#fff'
  }
}, {
  'id': 'gl-draw-point-inactive',
  'type': 'circle',
  'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'Point'], ['==', 'meta', 'feature'], ['!=', 'mode', 'static']],
  'paint': {
    'circle-radius': 3,
    'circle-color': '#3bb2d0'
  }
}, {
  'id': 'gl-draw-point-stroke-active',
  'type': 'circle',
  'filter': ['all', ['==', '$type', 'Point'], ['==', 'active', 'true'], ['!=', 'meta', 'midpoint']],
  'paint': {
    'circle-radius': 7,
    'circle-color': '#fff'
  }
}, {
  'id': 'gl-draw-point-active',
  'type': 'circle',
  'filter': ['all', ['==', '$type', 'Point'], ['!=', 'meta', 'midpoint'], ['==', 'active', 'true']],
  'paint': {
    'circle-radius': 5,
    'circle-color': '#fbb03b'
  }
}, {
  'id': 'gl-draw-polygon-fill-static',
  'type': 'fill',
  'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
  'paint': {
    'fill-color': '#404040',
    'fill-outline-color': '#404040',
    'fill-opacity': 0.1
  }
}, {
  'id': 'gl-draw-polygon-stroke-static',
  'type': 'line',
  'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#404040',
    'line-width': 2
  }
}, {
  'id': 'gl-draw-line-static',
  'type': 'line',
  'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'LineString']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#404040',
    'line-width': 2
  }
}, {
  'id': 'gl-draw-point-static',
  'type': 'circle',
  'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Point']],
  'paint': {
    'circle-radius': 5,
    'circle-color': '#404040'
  }
}];

var constants = {
  classes: {
    CONTROL_BASE: 'mapboxgl-ctrl',
    CONTROL_PREFIX: 'mapboxgl-ctrl-',
    CONTROL_BUTTON: 'mapbox-gl-draw_ctrl-draw-btn',
    CONTROL_BUTTON_LINE: 'mapbox-gl-draw_line',
    CONTROL_BUTTON_POLYGON: 'mapbox-gl-draw_polygon',
    CONTROL_BUTTON_POINT: 'mapbox-gl-draw_point',
    CONTROL_BUTTON_TRASH: 'mapbox-gl-draw_trash',
    CONTROL_BUTTON_COMBINE_FEATURES: 'mapbox-gl-draw_combine',
    CONTROL_BUTTON_UNCOMBINE_FEATURES: 'mapbox-gl-draw_uncombine',
    CONTROL_GROUP: 'mapboxgl-ctrl-group',
    ATTRIBUTION: 'mapboxgl-ctrl-attrib',
    ACTIVE_BUTTON: 'active',
    BOX_SELECT: 'mapbox-gl-draw_boxselect'
  },
  sources: {
    HOT: 'mapbox-gl-draw-hot',
    COLD: 'mapbox-gl-draw-cold'
  },
  cursors: {
    ADD: 'add',
    MOVE: 'move',
    DRAG: 'drag',
    POINTER: 'pointer',
    NONE: 'none'
  },
  types: {
    POLYGON: 'polygon',
    LINE: 'line_string',
    POINT: 'point'
  },
  geojsonTypes: {
    FEATURE: 'Feature',
    POLYGON: 'Polygon',
    LINE_STRING: 'LineString',
    POINT: 'Point',
    FEATURE_COLLECTION: 'FeatureCollection',
    MULTI_PREFIX: 'Multi',
    MULTI_POINT: 'MultiPoint',
    MULTI_LINE_STRING: 'MultiLineString',
    MULTI_POLYGON: 'MultiPolygon'
  },
  modes: {
    DRAW_LINE_STRING: 'draw_line_string',
    DRAW_POLYGON: 'draw_polygon',
    DRAW_POINT: 'draw_point',
    SIMPLE_SELECT: 'simple_select',
    DIRECT_SELECT: 'direct_select',
    STATIC: 'static'
  },
  events: {
    CREATE: 'draw.create',
    DELETE: 'draw.delete',
    UPDATE: 'draw.update',
    SELECTION_CHANGE: 'draw.selectionchange',
    MODE_CHANGE: 'draw.modechange',
    ACTIONABLE: 'draw.actionable',
    RENDER: 'draw.render',
    COMBINE_FEATURES: 'draw.combine',
    UNCOMBINE_FEATURES: 'draw.uncombine'
  },
  updateActions: {
    MOVE: 'move',
    CHANGE_COORDINATES: 'change_coordinates'
  },
  meta: {
    FEATURE: 'feature',
    MIDPOINT: 'midpoint',
    VERTEX: 'vertex'
  },
  activeStates: {
    ACTIVE: 'true',
    INACTIVE: 'false'
  },
  interactions: ['scrollZoom', 'boxZoom', 'dragRotate', 'dragPan', 'keyboard', 'doubleClickZoom', 'touchZoomRotate'],
  LAT_MIN: -90,
  LAT_RENDERED_MIN: -85,
  LAT_MAX: 90,
  LAT_RENDERED_MAX: 85,
  LNG_MIN: -270,
  LNG_MAX: 270
};

var common_selectors = {
  isOfMetaType: function (type) {
    return function (e) {
      const featureTarget = e.featureTarget;
      if (!featureTarget) return false;
      if (!featureTarget.properties) return false;
      return featureTarget.properties.meta === type;
    };
  },
  isShiftMousedown: function (e) {
    if (!e.originalEvent) return false;
    if (!e.originalEvent.shiftKey) return false;
    return e.originalEvent.button === 0;
  },
  isActiveFeature: function (e) {
    if (!e.featureTarget) return false;
    if (!e.featureTarget.properties) return false;
    return e.featureTarget.properties.active === constants.activeStates.ACTIVE && e.featureTarget.properties.meta === constants.meta.FEATURE;
  },
  isInactiveFeature: function (e) {
    if (!e.featureTarget) return false;
    if (!e.featureTarget.properties) return false;
    return e.featureTarget.properties.active === constants.activeStates.INACTIVE && e.featureTarget.properties.meta === constants.meta.FEATURE;
  },
  noTarget: function (e) {
    return e.featureTarget === undefined;
  },
  isFeature: function (e) {
    if (!e.featureTarget) return false;
    if (!e.featureTarget.properties) return false;
    return e.featureTarget.properties.meta === constants.meta.FEATURE;
  },
  isVertex: function (e) {
    const featureTarget = e.featureTarget;
    if (!featureTarget) return false;
    if (!featureTarget.properties) return false;
    return featureTarget.properties.meta === constants.meta.VERTEX;
  },
  isShiftDown: function (e) {
    if (!e.originalEvent) return false;
    return e.originalEvent.shiftKey === true;
  },
  isEscapeKey: function (e) {
    return e.keyCode === 27;
  },
  isEnterKey: function (e) {
    return e.keyCode === 13;
  },
  true: function () {
    return true;
  }
};

var pointGeometry = Point;
/**
 * A standalone point geometry with useful accessor, comparison, and
 * modification methods.
 *
 * @class Point
 * @param {Number} x the x-coordinate. this could be longitude or screen
 * pixels, or any other sort of unit.
 * @param {Number} y the y-coordinate. this could be latitude or screen
 * pixels, or any other sort of unit.
 * @example
 * var point = new Point(-77, 38);
 */

function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype = {
  /**
   * Clone this point, returning a new point that can be modified
   * without affecting the old one.
   * @return {Point} the clone
   */
  clone: function () {
    return new Point(this.x, this.y);
  },

  /**
   * Add this point's x & y coordinates to another point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  add: function (p) {
    return this.clone()._add(p);
  },

  /**
   * Subtract this point's x & y coordinates to from point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  sub: function (p) {
    return this.clone()._sub(p);
  },

  /**
   * Multiply this point's x & y coordinates by point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  multByPoint: function (p) {
    return this.clone()._multByPoint(p);
  },

  /**
   * Divide this point's x & y coordinates by point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  divByPoint: function (p) {
    return this.clone()._divByPoint(p);
  },

  /**
   * Multiply this point's x & y coordinates by a factor,
   * yielding a new point.
   * @param {Point} k factor
   * @return {Point} output point
   */
  mult: function (k) {
    return this.clone()._mult(k);
  },

  /**
   * Divide this point's x & y coordinates by a factor,
   * yielding a new point.
   * @param {Point} k factor
   * @return {Point} output point
   */
  div: function (k) {
    return this.clone()._div(k);
  },

  /**
   * Rotate this point around the 0, 0 origin by an angle a,
   * given in radians
   * @param {Number} a angle to rotate around, in radians
   * @return {Point} output point
   */
  rotate: function (a) {
    return this.clone()._rotate(a);
  },

  /**
   * Rotate this point around p point by an angle a,
   * given in radians
   * @param {Number} a angle to rotate around, in radians
   * @param {Point} p Point to rotate around
   * @return {Point} output point
   */
  rotateAround: function (a, p) {
    return this.clone()._rotateAround(a, p);
  },

  /**
   * Multiply this point by a 4x1 transformation matrix
   * @param {Array<Number>} m transformation matrix
   * @return {Point} output point
   */
  matMult: function (m) {
    return this.clone()._matMult(m);
  },

  /**
   * Calculate this point but as a unit vector from 0, 0, meaning
   * that the distance from the resulting point to the 0, 0
   * coordinate will be equal to 1 and the angle from the resulting
   * point to the 0, 0 coordinate will be the same as before.
   * @return {Point} unit vector point
   */
  unit: function () {
    return this.clone()._unit();
  },

  /**
   * Compute a perpendicular point, where the new y coordinate
   * is the old x coordinate and the new x coordinate is the old y
   * coordinate multiplied by -1
   * @return {Point} perpendicular point
   */
  perp: function () {
    return this.clone()._perp();
  },

  /**
   * Return a version of this point with the x & y coordinates
   * rounded to integers.
   * @return {Point} rounded point
   */
  round: function () {
    return this.clone()._round();
  },

  /**
   * Return the magitude of this point: this is the Euclidean
   * distance from the 0, 0 coordinate to this point's x and y
   * coordinates.
   * @return {Number} magnitude
   */
  mag: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },

  /**
   * Judge whether this point is equal to another point, returning
   * true or false.
   * @param {Point} other the other point
   * @return {boolean} whether the points are equal
   */
  equals: function (other) {
    return this.x === other.x && this.y === other.y;
  },

  /**
   * Calculate the distance from this point to another point
   * @param {Point} p the other point
   * @return {Number} distance
   */
  dist: function (p) {
    return Math.sqrt(this.distSqr(p));
  },

  /**
   * Calculate the distance from this point to another point,
   * without the square root step. Useful if you're comparing
   * relative distances.
   * @param {Point} p the other point
   * @return {Number} distance
   */
  distSqr: function (p) {
    var dx = p.x - this.x,
        dy = p.y - this.y;
    return dx * dx + dy * dy;
  },

  /**
   * Get the angle from the 0, 0 coordinate to this point, in radians
   * coordinates.
   * @return {Number} angle
   */
  angle: function () {
    return Math.atan2(this.y, this.x);
  },

  /**
   * Get the angle from this point to another point, in radians
   * @param {Point} b the other point
   * @return {Number} angle
   */
  angleTo: function (b) {
    return Math.atan2(this.y - b.y, this.x - b.x);
  },

  /**
   * Get the angle between this point and another point, in radians
   * @param {Point} b the other point
   * @return {Number} angle
   */
  angleWith: function (b) {
    return this.angleWithSep(b.x, b.y);
  },

  /*
   * Find the angle of the two vectors, solving the formula for
   * the cross product a x b = |a||b|sin(θ) for θ.
   * @param {Number} x the x-coordinate
   * @param {Number} y the y-coordinate
   * @return {Number} the angle in radians
   */
  angleWithSep: function (x, y) {
    return Math.atan2(this.x * y - this.y * x, this.x * x + this.y * y);
  },
  _matMult: function (m) {
    var x = m[0] * this.x + m[1] * this.y,
        y = m[2] * this.x + m[3] * this.y;
    this.x = x;
    this.y = y;
    return this;
  },
  _add: function (p) {
    this.x += p.x;
    this.y += p.y;
    return this;
  },
  _sub: function (p) {
    this.x -= p.x;
    this.y -= p.y;
    return this;
  },
  _mult: function (k) {
    this.x *= k;
    this.y *= k;
    return this;
  },
  _div: function (k) {
    this.x /= k;
    this.y /= k;
    return this;
  },
  _multByPoint: function (p) {
    this.x *= p.x;
    this.y *= p.y;
    return this;
  },
  _divByPoint: function (p) {
    this.x /= p.x;
    this.y /= p.y;
    return this;
  },
  _unit: function () {
    this._div(this.mag());

    return this;
  },
  _perp: function () {
    var y = this.y;
    this.y = this.x;
    this.x = -y;
    return this;
  },
  _rotate: function (angle) {
    var cos = Math.cos(angle),
        sin = Math.sin(angle),
        x = cos * this.x - sin * this.y,
        y = sin * this.x + cos * this.y;
    this.x = x;
    this.y = y;
    return this;
  },
  _rotateAround: function (angle, p) {
    var cos = Math.cos(angle),
        sin = Math.sin(angle),
        x = p.x + cos * (this.x - p.x) - sin * (this.y - p.y),
        y = p.y + sin * (this.x - p.x) + cos * (this.y - p.y);
    this.x = x;
    this.y = y;
    return this;
  },
  _round: function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }
};
/**
 * Construct a point from an array if necessary, otherwise if the input
 * is already a Point, or an unknown type, return it unchanged
 * @param {Array<Number>|Point|*} a any kind of input value
 * @return {Point} constructed point, or passed-through value.
 * @example
 * // this
 * var point = Point.convert([0, 1]);
 * // is equivalent to
 * var point = new Point(0, 1);
 */

Point.convert = function (a) {
  if (a instanceof Point) {
    return a;
  }

  if (Array.isArray(a)) {
    return new Point(a[0], a[1]);
  }

  return a;
};

/**
 * Returns a Point representing a mouse event's position
 * relative to a containing element.
 *
 * @param {MouseEvent} mouseEvent
 * @param {Node} container
 * @returns {Point}
 */


function mouseEventPoint(mouseEvent, container) {
  const rect = container.getBoundingClientRect();
  return new pointGeometry(mouseEvent.clientX - rect.left - (container.clientLeft || 0), mouseEvent.clientY - rect.top - (container.clientTop || 0));
}

var mouse_event_point = mouseEventPoint;

/**
 * Returns GeoJSON for a Point representing the
 * vertex of another feature.
 *
 * @param {string} parentId
 * @param {Array<number>} coordinates
 * @param {string} path - Dot-separated numbers indicating exactly
 *   where the point exists within its parent feature's coordinates.
 * @param {boolean} selected
 * @return {GeoJSON} Point
 */


var create_vertex = function (parentId, coordinates, path, selected) {
  return {
    type: constants.geojsonTypes.FEATURE,
    properties: {
      meta: constants.meta.VERTEX,
      parent: parentId,
      coord_path: path,
      active: selected ? constants.activeStates.ACTIVE : constants.activeStates.INACTIVE
    },
    geometry: {
      type: constants.geojsonTypes.POINT,
      coordinates: coordinates
    }
  };
};

var create_midpoint = function (parent, startVertex, endVertex, map) {
  const startCoord = startVertex.geometry.coordinates;
  const endCoord = endVertex.geometry.coordinates; // If a coordinate exceeds the projection, we can't calculate a midpoint,
  // so run away

  if (startCoord[1] > constants.LAT_RENDERED_MAX || startCoord[1] < constants.LAT_RENDERED_MIN || endCoord[1] > constants.LAT_RENDERED_MAX || endCoord[1] < constants.LAT_RENDERED_MIN) {
    return null;
  }

  const ptA = map.project([startCoord[0], startCoord[1]]);
  const ptB = map.project([endCoord[0], endCoord[1]]);
  const mid = map.unproject([(ptA.x + ptB.x) / 2, (ptA.y + ptB.y) / 2]);
  return {
    type: constants.geojsonTypes.FEATURE,
    properties: {
      meta: constants.meta.MIDPOINT,
      parent: parent,
      lng: mid.lng,
      lat: mid.lat,
      coord_path: endVertex.properties.coord_path
    },
    geometry: {
      type: constants.geojsonTypes.POINT,
      coordinates: [mid.lng, mid.lat]
    }
  };
};

function createSupplementaryPoints(geojson, options = {}, basePath = null) {
  const {
    type,
    coordinates
  } = geojson.geometry;
  const featureId = geojson.properties && geojson.properties.id;
  let supplementaryPoints = [];

  if (type === constants.geojsonTypes.POINT) {
    // For points, just create a vertex
    supplementaryPoints.push(create_vertex(featureId, coordinates, basePath, isSelectedPath(basePath)));
  } else if (type === constants.geojsonTypes.POLYGON) {
    // Cycle through a Polygon's rings and
    // process each line
    coordinates.forEach((line, lineIndex) => {
      processLine(line, basePath !== null ? `${basePath}.${lineIndex}` : String(lineIndex));
    });
  } else if (type === constants.geojsonTypes.LINE_STRING) {
    processLine(coordinates, basePath);
  } else if (type.indexOf(constants.geojsonTypes.MULTI_PREFIX) === 0) {
    processMultiGeometry();
  }

  function processLine(line, lineBasePath) {
    let firstPointString = '';
    let lastVertex = null;
    line.forEach((point, pointIndex) => {
      const pointPath = lineBasePath !== undefined && lineBasePath !== null ? `${lineBasePath}.${pointIndex}` : String(pointIndex);
      const vertex = create_vertex(featureId, point, pointPath, isSelectedPath(pointPath)); // If we're creating midpoints, check if there was a
      // vertex before this one. If so, add a midpoint
      // between that vertex and this one.

      if (options.midpoints && lastVertex) {
        const midpoint = create_midpoint(featureId, lastVertex, vertex, options.map);

        if (midpoint) {
          supplementaryPoints.push(midpoint);
        }
      }

      lastVertex = vertex; // A Polygon line's last point is the same as the first point. If we're on the last
      // point, we want to draw a midpoint before it but not another vertex on it
      // (since we already a vertex there, from the first point).

      const stringifiedPoint = JSON.stringify(point);

      if (firstPointString !== stringifiedPoint) {
        supplementaryPoints.push(vertex);
      }

      if (pointIndex === 0) {
        firstPointString = stringifiedPoint;
      }
    });
  }

  function isSelectedPath(path) {
    if (!options.selectedPaths) return false;
    return options.selectedPaths.indexOf(path) !== -1;
  } // Split a multi-geometry into constituent
  // geometries, and accumulate the supplementary points
  // for each of those constituents


  function processMultiGeometry() {
    const subType = type.replace(constants.geojsonTypes.MULTI_PREFIX, '');
    coordinates.forEach((subCoordinates, index) => {
      const subFeature = {
        type: constants.geojsonTypes.FEATURE,
        properties: geojson.properties,
        geometry: {
          type: subType,
          coordinates: subCoordinates
        }
      };
      supplementaryPoints = supplementaryPoints.concat(createSupplementaryPoints(subFeature, options, index));
    });
  }

  return supplementaryPoints;
}

var create_supplementary_points = createSupplementaryPoints;

function StringSet(items) {
  this._items = {};
  this._nums = {};
  this._length = items ? items.length : 0;
  if (!items) return;

  for (let i = 0, l = items.length; i < l; i++) {
    this.add(items[i]);
    if (items[i] === undefined) continue;
    if (typeof items[i] === 'string') this._items[items[i]] = i;else this._nums[items[i]] = i;
  }
}

StringSet.prototype.add = function (x) {
  if (this.has(x)) return this;
  this._length++;
  if (typeof x === 'string') this._items[x] = this._length;else this._nums[x] = this._length;
  return this;
};

StringSet.prototype.delete = function (x) {
  if (this.has(x) === false) return this;
  this._length--;
  delete this._items[x];
  delete this._nums[x];
  return this;
};

StringSet.prototype.has = function (x) {
  if (typeof x !== 'string' && typeof x !== 'number') return false;
  return this._items[x] !== undefined || this._nums[x] !== undefined;
};

StringSet.prototype.values = function () {
  const values = [];
  Object.keys(this._items).forEach(k => {
    values.push({
      k: k,
      v: this._items[k]
    });
  });
  Object.keys(this._nums).forEach(k => {
    values.push({
      k: JSON.parse(k),
      v: this._nums[k]
    });
  });
  return values.sort((a, b) => a.v - b.v).map(a => a.k);
};

StringSet.prototype.clear = function () {
  this._length = 0;
  this._items = {};
  this._nums = {};
  return this;
};

var string_set = StringSet;

var double_click_zoom = {
  enable(ctx) {
    setTimeout(() => {
      // First check we've got a map and some context.
      if (!ctx.map || !ctx.map.doubleClickZoom || !ctx._ctx || !ctx._ctx.store || !ctx._ctx.store.getInitialConfigValue) return; // Now check initial state wasn't false (we leave it disabled if so)

      if (!ctx._ctx.store.getInitialConfigValue('doubleClickZoom')) return;
      ctx.map.doubleClickZoom.enable();
    }, 0);
  },

  disable(ctx) {
    setTimeout(() => {
      if (!ctx.map || !ctx.map.doubleClickZoom) return; // Always disable here, as it's necessary in some cases.

      ctx.map.doubleClickZoom.disable();
    }, 0);
  }

};

var geojsonNormalize = normalize;
var types = {
  Point: 'geometry',
  MultiPoint: 'geometry',
  LineString: 'geometry',
  MultiLineString: 'geometry',
  Polygon: 'geometry',
  MultiPolygon: 'geometry',
  GeometryCollection: 'geometry',
  Feature: 'feature',
  FeatureCollection: 'featurecollection'
};
/**
 * Normalize a GeoJSON feature into a FeatureCollection.
 *
 * @param {object} gj geojson data
 * @returns {object} normalized geojson data
 */

function normalize(gj) {
  if (!gj || !gj.type) return null;
  var type = types[gj.type];
  if (!type) return null;

  if (type === 'geometry') {
    return {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {},
        geometry: gj
      }]
    };
  } else if (type === 'feature') {
    return {
      type: 'FeatureCollection',
      features: [gj]
    };
  } else if (type === 'featurecollection') {
    return gj;
  }
}

var dist = function e(t) {
  switch (t && t.type || null) {
    case "FeatureCollection":
      return t.features = t.features.reduce(function (t, r) {
        return t.concat(e(r));
      }, []), t;

    case "Feature":
      return t.geometry ? e(t.geometry).map(function (e) {
        var r = {
          type: "Feature",
          properties: JSON.parse(JSON.stringify(t.properties)),
          geometry: e
        };
        return void 0 !== t.id && (r.id = t.id), r;
      }) : t;

    case "MultiPoint":
      return t.coordinates.map(function (e) {
        return {
          type: "Point",
          coordinates: e
        };
      });

    case "MultiPolygon":
      return t.coordinates.map(function (e) {
        return {
          type: "Polygon",
          coordinates: e
        };
      });

    case "MultiLineString":
      return t.coordinates.map(function (e) {
        return {
          type: "LineString",
          coordinates: e
        };
      });

    case "GeometryCollection":
      return t.geometries.map(e).reduce(function (e, t) {
        return e.concat(t);
      }, []);

    case "Point":
    case "Polygon":
    case "LineString":
      return [t];
  }
};

var flatten = function flatten(list) {
  return _flatten(list);

  function _flatten(list) {
    if (Array.isArray(list) && list.length && typeof list[0] === 'number') {
      return [list];
    }

    return list.reduce(function (acc, item) {
      if (Array.isArray(item) && Array.isArray(item[0])) {
        return acc.concat(_flatten(item));
      } else {
        acc.push(item);
        return acc;
      }
    }, []);
  }
};

var geojsonCoords = function (_) {
  if (!_) return [];
  var normalized = dist(geojsonNormalize(_)),
      coordinates = [];
  normalized.features.forEach(function (feature) {
    if (!feature.geometry) return;
    coordinates = coordinates.concat(flatten(feature.geometry.coordinates));
  });
  return coordinates;
};

var traverse_1 = createCommonjsModule(function (module) {
var traverse = module.exports = function (obj) {
  return new Traverse(obj);
};

function Traverse(obj) {
  this.value = obj;
}

Traverse.prototype.get = function (ps) {
  var node = this.value;

  for (var i = 0; i < ps.length; i++) {
    var key = ps[i];

    if (!node || !hasOwnProperty.call(node, key)) {
      node = undefined;
      break;
    }

    node = node[key];
  }

  return node;
};

Traverse.prototype.has = function (ps) {
  var node = this.value;

  for (var i = 0; i < ps.length; i++) {
    var key = ps[i];

    if (!node || !hasOwnProperty.call(node, key)) {
      return false;
    }

    node = node[key];
  }

  return true;
};

Traverse.prototype.set = function (ps, value) {
  var node = this.value;

  for (var i = 0; i < ps.length - 1; i++) {
    var key = ps[i];
    if (!hasOwnProperty.call(node, key)) node[key] = {};
    node = node[key];
  }

  node[ps[i]] = value;
  return value;
};

Traverse.prototype.map = function (cb) {
  return walk(this.value, cb, true);
};

Traverse.prototype.forEach = function (cb) {
  this.value = walk(this.value, cb, false);
  return this.value;
};

Traverse.prototype.reduce = function (cb, init) {
  var skip = arguments.length === 1;
  var acc = skip ? this.value : init;
  this.forEach(function (x) {
    if (!this.isRoot || !skip) {
      acc = cb.call(this, acc, x);
    }
  });
  return acc;
};

Traverse.prototype.paths = function () {
  var acc = [];
  this.forEach(function (x) {
    acc.push(this.path);
  });
  return acc;
};

Traverse.prototype.nodes = function () {
  var acc = [];
  this.forEach(function (x) {
    acc.push(this.node);
  });
  return acc;
};

Traverse.prototype.clone = function () {
  var parents = [],
      nodes = [];
  return function clone(src) {
    for (var i = 0; i < parents.length; i++) {
      if (parents[i] === src) {
        return nodes[i];
      }
    }

    if (typeof src === 'object' && src !== null) {
      var dst = copy(src);
      parents.push(src);
      nodes.push(dst);
      forEach(objectKeys(src), function (key) {
        dst[key] = clone(src[key]);
      });
      parents.pop();
      nodes.pop();
      return dst;
    } else {
      return src;
    }
  }(this.value);
};

function walk(root, cb, immutable) {
  var path = [];
  var parents = [];
  var alive = true;
  return function walker(node_) {
    var node = immutable ? copy(node_) : node_;
    var modifiers = {};
    var keepGoing = true;
    var state = {
      node: node,
      node_: node_,
      path: [].concat(path),
      parent: parents[parents.length - 1],
      parents: parents,
      key: path.slice(-1)[0],
      isRoot: path.length === 0,
      level: path.length,
      circular: null,
      update: function (x, stopHere) {
        if (!state.isRoot) {
          state.parent.node[state.key] = x;
        }

        state.node = x;
        if (stopHere) keepGoing = false;
      },
      'delete': function (stopHere) {
        delete state.parent.node[state.key];
        if (stopHere) keepGoing = false;
      },
      remove: function (stopHere) {
        if (isArray(state.parent.node)) {
          state.parent.node.splice(state.key, 1);
        } else {
          delete state.parent.node[state.key];
        }

        if (stopHere) keepGoing = false;
      },
      keys: null,
      before: function (f) {
        modifiers.before = f;
      },
      after: function (f) {
        modifiers.after = f;
      },
      pre: function (f) {
        modifiers.pre = f;
      },
      post: function (f) {
        modifiers.post = f;
      },
      stop: function () {
        alive = false;
      },
      block: function () {
        keepGoing = false;
      }
    };
    if (!alive) return state;

    function updateState() {
      if (typeof state.node === 'object' && state.node !== null) {
        if (!state.keys || state.node_ !== state.node) {
          state.keys = objectKeys(state.node);
        }

        state.isLeaf = state.keys.length == 0;

        for (var i = 0; i < parents.length; i++) {
          if (parents[i].node_ === node_) {
            state.circular = parents[i];
            break;
          }
        }
      } else {
        state.isLeaf = true;
        state.keys = null;
      }

      state.notLeaf = !state.isLeaf;
      state.notRoot = !state.isRoot;
    }

    updateState(); // use return values to update if defined

    var ret = cb.call(state, state.node);
    if (ret !== undefined && state.update) state.update(ret);
    if (modifiers.before) modifiers.before.call(state, state.node);
    if (!keepGoing) return state;

    if (typeof state.node == 'object' && state.node !== null && !state.circular) {
      parents.push(state);
      updateState();
      forEach(state.keys, function (key, i) {
        path.push(key);
        if (modifiers.pre) modifiers.pre.call(state, state.node[key], key);
        var child = walker(state.node[key]);

        if (immutable && hasOwnProperty.call(state.node, key)) {
          state.node[key] = child.node;
        }

        child.isLast = i == state.keys.length - 1;
        child.isFirst = i == 0;
        if (modifiers.post) modifiers.post.call(state, child);
        path.pop();
      });
      parents.pop();
    }

    if (modifiers.after) modifiers.after.call(state, state.node);
    return state;
  }(root).node;
}

function copy(src) {
  if (typeof src === 'object' && src !== null) {
    var dst;

    if (isArray(src)) {
      dst = [];
    } else if (isDate(src)) {
      dst = new Date(src.getTime ? src.getTime() : src);
    } else if (isRegExp(src)) {
      dst = new RegExp(src);
    } else if (isError(src)) {
      dst = {
        message: src.message
      };
    } else if (isBoolean(src)) {
      dst = new Boolean(src);
    } else if (isNumber(src)) {
      dst = new Number(src);
    } else if (isString(src)) {
      dst = new String(src);
    } else if (Object.create && Object.getPrototypeOf) {
      dst = Object.create(Object.getPrototypeOf(src));
    } else if (src.constructor === Object) {
      dst = {};
    } else {
      var proto = src.constructor && src.constructor.prototype || src.__proto__ || {};

      var T = function () {};

      T.prototype = proto;
      dst = new T();
    }

    forEach(objectKeys(src), function (key) {
      dst[key] = src[key];
    });
    return dst;
  } else return src;
}

var objectKeys = Object.keys || function keys(obj) {
  var res = [];

  for (var key in obj) res.push(key);

  return res;
};

function toS(obj) {
  return Object.prototype.toString.call(obj);
}

function isDate(obj) {
  return toS(obj) === '[object Date]';
}

function isRegExp(obj) {
  return toS(obj) === '[object RegExp]';
}

function isError(obj) {
  return toS(obj) === '[object Error]';
}

function isBoolean(obj) {
  return toS(obj) === '[object Boolean]';
}

function isNumber(obj) {
  return toS(obj) === '[object Number]';
}

function isString(obj) {
  return toS(obj) === '[object String]';
}

var isArray = Array.isArray || function isArray(xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

var forEach = function (xs, fn) {
  if (xs.forEach) return xs.forEach(fn);else for (var i = 0; i < xs.length; i++) {
    fn(xs[i], i, xs);
  }
};

forEach(objectKeys(Traverse.prototype), function (key) {
  traverse[key] = function (obj) {
    var args = [].slice.call(arguments, 1);
    var t = new Traverse(obj);
    return t[key].apply(t, args);
  };
});

var hasOwnProperty = Object.hasOwnProperty || function (obj, key) {
  return key in obj;
};
});

var extent = Extent;

function Extent(bbox) {
  if (!(this instanceof Extent)) {
    return new Extent(bbox);
  }

  this._bbox = bbox || [Infinity, Infinity, -Infinity, -Infinity];
  this._valid = !!bbox;
}

Extent.prototype.include = function (ll) {
  this._valid = true;
  this._bbox[0] = Math.min(this._bbox[0], ll[0]);
  this._bbox[1] = Math.min(this._bbox[1], ll[1]);
  this._bbox[2] = Math.max(this._bbox[2], ll[0]);
  this._bbox[3] = Math.max(this._bbox[3], ll[1]);
  return this;
};

Extent.prototype.equals = function (_) {
  var other;

  if (_ instanceof Extent) {
    other = _.bbox();
  } else {
    other = _;
  }

  return this._bbox[0] == other[0] && this._bbox[1] == other[1] && this._bbox[2] == other[2] && this._bbox[3] == other[3];
};

Extent.prototype.center = function (_) {
  if (!this._valid) return null;
  return [(this._bbox[0] + this._bbox[2]) / 2, (this._bbox[1] + this._bbox[3]) / 2];
};

Extent.prototype.union = function (_) {
  this._valid = true;
  var other;

  if (_ instanceof Extent) {
    other = _.bbox();
  } else {
    other = _;
  }

  this._bbox[0] = Math.min(this._bbox[0], other[0]);
  this._bbox[1] = Math.min(this._bbox[1], other[1]);
  this._bbox[2] = Math.max(this._bbox[2], other[2]);
  this._bbox[3] = Math.max(this._bbox[3], other[3]);
  return this;
};

Extent.prototype.bbox = function () {
  if (!this._valid) return null;
  return this._bbox;
};

Extent.prototype.contains = function (ll) {
  if (!ll) return this._fastContains();
  if (!this._valid) return null;
  var lon = ll[0],
      lat = ll[1];
  return this._bbox[0] <= lon && this._bbox[1] <= lat && this._bbox[2] >= lon && this._bbox[3] >= lat;
};

Extent.prototype.intersect = function (_) {
  if (!this._valid) return null;
  var other;

  if (_ instanceof Extent) {
    other = _.bbox();
  } else {
    other = _;
  }

  return !(this._bbox[0] > other[2] || this._bbox[2] < other[0] || this._bbox[3] < other[1] || this._bbox[1] > other[3]);
};

Extent.prototype._fastContains = function () {
  if (!this._valid) return new Function('return null;');
  var body = 'return ' + this._bbox[0] + '<= ll[0] &&' + this._bbox[1] + '<= ll[1] &&' + this._bbox[2] + '>= ll[0] &&' + this._bbox[3] + '>= ll[1]';
  return new Function('ll', body);
};

Extent.prototype.polygon = function () {
  if (!this._valid) return null;
  return {
    type: 'Polygon',
    coordinates: [[// W, S
    [this._bbox[0], this._bbox[1]], // E, S
    [this._bbox[2], this._bbox[1]], // E, N
    [this._bbox[2], this._bbox[3]], // W, N
    [this._bbox[0], this._bbox[3]], // W, S
    [this._bbox[0], this._bbox[1]]]]
  };
};

var geojsonTypesByDataAttributes = {
  features: ['FeatureCollection'],
  coordinates: ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon'],
  geometry: ['Feature'],
  geometries: ['GeometryCollection']
};
var dataAttributes = Object.keys(geojsonTypesByDataAttributes);

var geojsonExtent = function (_) {
  return getExtent(_).bbox();
};

var polygon = function (_) {
  return getExtent(_).polygon();
};

var bboxify = function (_) {
  return traverse_1(_).map(function (value) {
    if (!value) return;
    var isValid = dataAttributes.some(function (attribute) {
      if (value[attribute]) {
        return geojsonTypesByDataAttributes[attribute].indexOf(value.type) !== -1;
      }

      return false;
    });

    if (isValid) {
      value.bbox = getExtent(value).bbox();
      this.update(value);
    }
  });
};

function getExtent(_) {
  var ext = extent(),
      coords = geojsonCoords(_);

  for (var i = 0; i < coords.length; i++) ext.include(coords[i]);

  return ext;
}
geojsonExtent.polygon = polygon;
geojsonExtent.bboxify = bboxify;

const {
  LAT_MIN,
  LAT_MAX,
  LAT_RENDERED_MIN,
  LAT_RENDERED_MAX,
  LNG_MIN,
  LNG_MAX
} = constants; // Ensure that we do not drag north-south far enough for
// - any part of any feature to exceed the poles
// - any feature to be completely lost in the space between the projection's
//   edge and the poles, such that it couldn't be re-selected and moved back

var constrain_feature_movement = function (geojsonFeatures, delta) {
  // "inner edge" = a feature's latitude closest to the equator
  let northInnerEdge = LAT_MIN;
  let southInnerEdge = LAT_MAX; // "outer edge" = a feature's latitude furthest from the equator

  let northOuterEdge = LAT_MIN;
  let southOuterEdge = LAT_MAX;
  let westEdge = LNG_MAX;
  let eastEdge = LNG_MIN;
  geojsonFeatures.forEach(feature => {
    const bounds = geojsonExtent(feature);
    const featureSouthEdge = bounds[1];
    const featureNorthEdge = bounds[3];
    const featureWestEdge = bounds[0];
    const featureEastEdge = bounds[2];
    if (featureSouthEdge > northInnerEdge) northInnerEdge = featureSouthEdge;
    if (featureNorthEdge < southInnerEdge) southInnerEdge = featureNorthEdge;
    if (featureNorthEdge > northOuterEdge) northOuterEdge = featureNorthEdge;
    if (featureSouthEdge < southOuterEdge) southOuterEdge = featureSouthEdge;
    if (featureWestEdge < westEdge) westEdge = featureWestEdge;
    if (featureEastEdge > eastEdge) eastEdge = featureEastEdge;
  }); // These changes are not mutually exclusive: we might hit the inner
  // edge but also have hit the outer edge and therefore need
  // another readjustment

  const constrainedDelta = delta;

  if (northInnerEdge + constrainedDelta.lat > LAT_RENDERED_MAX) {
    constrainedDelta.lat = LAT_RENDERED_MAX - northInnerEdge;
  }

  if (northOuterEdge + constrainedDelta.lat > LAT_MAX) {
    constrainedDelta.lat = LAT_MAX - northOuterEdge;
  }

  if (southInnerEdge + constrainedDelta.lat < LAT_RENDERED_MIN) {
    constrainedDelta.lat = LAT_RENDERED_MIN - southInnerEdge;
  }

  if (southOuterEdge + constrainedDelta.lat < LAT_MIN) {
    constrainedDelta.lat = LAT_MIN - southOuterEdge;
  }

  if (westEdge + constrainedDelta.lng <= LNG_MIN) {
    constrainedDelta.lng += Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
  }

  if (eastEdge + constrainedDelta.lng >= LNG_MAX) {
    constrainedDelta.lng -= Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
  }

  return constrainedDelta;
};

var move_features = function (features, delta) {
  const constrainedDelta = constrain_feature_movement(features.map(feature => feature.toGeoJSON()), delta);
  features.forEach(feature => {
    const currentCoordinates = feature.getCoordinates();

    const moveCoordinate = coord => {
      const point = {
        lng: coord[0] + constrainedDelta.lng,
        lat: coord[1] + constrainedDelta.lat
      };
      return [point.lng, point.lat];
    };

    const moveRing = ring => ring.map(coord => moveCoordinate(coord));

    const moveMultiPolygon = multi => multi.map(ring => moveRing(ring));

    let nextCoordinates;

    if (feature.type === constants.geojsonTypes.POINT) {
      nextCoordinates = moveCoordinate(currentCoordinates);
    } else if (feature.type === constants.geojsonTypes.LINE_STRING || feature.type === constants.geojsonTypes.MULTI_POINT) {
      nextCoordinates = currentCoordinates.map(moveCoordinate);
    } else if (feature.type === constants.geojsonTypes.POLYGON || feature.type === constants.geojsonTypes.MULTI_LINE_STRING) {
      nextCoordinates = currentCoordinates.map(moveRing);
    } else if (feature.type === constants.geojsonTypes.MULTI_POLYGON) {
      nextCoordinates = currentCoordinates.map(moveMultiPolygon);
    }

    feature.incomingCoords(nextCoordinates);
  });
};

const SimpleSelect = {};

SimpleSelect.onSetup = function (opts) {
  // turn the opts into state.
  const state = {
    dragMoveLocation: null,
    boxSelectStartLocation: null,
    boxSelectElement: undefined,
    boxSelecting: false,
    canBoxSelect: false,
    dragMoveing: false,
    canDragMove: false,
    initiallySelectedFeatureIds: opts.featureIds || []
  };
  this.setSelected(state.initiallySelectedFeatureIds.filter(id => {
    return this.getFeature(id) !== undefined;
  }));
  this.fireActionable();
  this.setActionableState({
    combineFeatures: true,
    uncombineFeatures: true,
    trash: true
  });
  return state;
};

SimpleSelect.fireUpdate = function () {
  this.map.fire(constants.events.UPDATE, {
    action: constants.updateActions.MOVE,
    features: this.getSelected().map(f => f.toGeoJSON())
  });
};

SimpleSelect.fireActionable = function () {
  const selectedFeatures = this.getSelected();
  const multiFeatures = selectedFeatures.filter(feature => this.isInstanceOf('MultiFeature', feature));
  let combineFeatures = false;

  if (selectedFeatures.length > 1) {
    combineFeatures = true;
    const featureType = selectedFeatures[0].type.replace('Multi', '');
    selectedFeatures.forEach(feature => {
      if (feature.type.replace('Multi', '') !== featureType) {
        combineFeatures = false;
      }
    });
  }

  const uncombineFeatures = multiFeatures.length > 0;
  const trash = selectedFeatures.length > 0;
  this.setActionableState({
    combineFeatures,
    uncombineFeatures,
    trash
  });
};

SimpleSelect.getUniqueIds = function (allFeatures) {
  if (!allFeatures.length) return [];
  const ids = allFeatures.map(s => s.properties.id).filter(id => id !== undefined).reduce((memo, id) => {
    memo.add(id);
    return memo;
  }, new string_set());
  return ids.values();
};

SimpleSelect.stopExtendedInteractions = function (state) {
  if (state.boxSelectElement) {
    if (state.boxSelectElement.parentNode) state.boxSelectElement.parentNode.removeChild(state.boxSelectElement);
    state.boxSelectElement = null;
  }

  this.map.dragPan.enable();
  state.boxSelecting = false;
  state.canBoxSelect = false;
  state.dragMoving = false;
  state.canDragMove = false;
};

SimpleSelect.onStop = function () {
  double_click_zoom.enable(this);
};

SimpleSelect.onMouseMove = function (state) {
  // On mousemove that is not a drag, stop extended interactions.
  // This is useful if you drag off the canvas, release the button,
  // then move the mouse back over the canvas --- we don't allow the
  // interaction to continue then, but we do let it continue if you held
  // the mouse button that whole time
  return this.stopExtendedInteractions(state);
};

SimpleSelect.onMouseOut = function (state) {
  // As soon as you mouse leaves the canvas, update the feature
  if (state.dragMoving) return this.fireUpdate();
};

SimpleSelect.onTap = SimpleSelect.onClick = function (state, e) {
  // Click (with or without shift) on no feature
  if (common_selectors.noTarget(e)) return this.clickAnywhere(state, e); // also tap

  if (common_selectors.isOfMetaType(constants.meta.VERTEX)(e)) return this.clickOnVertex(state, e); //tap

  if (common_selectors.isFeature(e)) return this.clickOnFeature(state, e);
};

SimpleSelect.clickAnywhere = function (state) {
  // Clear the re-render selection
  const wasSelected = this.getSelectedIds();

  if (wasSelected.length) {
    this.clearSelectedFeatures();
    wasSelected.forEach(id => this.doRender(id));
  }

  double_click_zoom.enable(this);
  this.stopExtendedInteractions(state);
};

SimpleSelect.clickOnVertex = function (state, e) {
  // Enter direct select mode
  this.changeMode(constants.modes.DIRECT_SELECT, {
    featureId: e.featureTarget.properties.parent,
    coordPath: e.featureTarget.properties.coord_path,
    startPos: e.lngLat
  });
  this.updateUIClasses({
    mouse: constants.cursors.MOVE
  });
};

SimpleSelect.startOnActiveFeature = function (state, e) {
  // Stop any already-underway extended interactions
  this.stopExtendedInteractions(state); // Disable map.dragPan immediately so it can't start

  this.map.dragPan.disable(); // Re-render it and enable drag move

  this.doRender(e.featureTarget.properties.id); // Set up the state for drag moving

  state.canDragMove = true;
  state.dragMoveLocation = e.lngLat;
};

SimpleSelect.clickOnFeature = function (state, e) {
  // Stop everything
  double_click_zoom.disable(this);
  this.stopExtendedInteractions(state);
  const isShiftClick = common_selectors.isShiftDown(e);
  const selectedFeatureIds = this.getSelectedIds();
  const featureId = e.featureTarget.properties.id;
  const isFeatureSelected = this.isSelected(featureId); // Click (without shift) on any selected feature but a point

  if (!isShiftClick && isFeatureSelected && this.getFeature(featureId).type !== constants.geojsonTypes.POINT) {
    // Enter direct select mode
    return this.changeMode(constants.modes.DIRECT_SELECT, {
      featureId: featureId
    });
  } // Shift-click on a selected feature


  if (isFeatureSelected && isShiftClick) {
    // Deselect it
    this.deselect(featureId);
    this.updateUIClasses({
      mouse: constants.cursors.POINTER
    });

    if (selectedFeatureIds.length === 1) {
      double_click_zoom.enable(this);
    } // Shift-click on an unselected feature

  } else if (!isFeatureSelected && isShiftClick) {
    // Add it to the selection
    this.select(featureId);
    this.updateUIClasses({
      mouse: constants.cursors.MOVE
    }); // Click (without shift) on an unselected feature
  } else if (!isFeatureSelected && !isShiftClick) {
    // Make it the only selected feature
    selectedFeatureIds.forEach(id => this.doRender(id));
    this.setSelected(featureId);
    this.updateUIClasses({
      mouse: constants.cursors.MOVE
    });
  } // No matter what, re-render the clicked feature


  this.doRender(featureId);
};

SimpleSelect.onMouseDown = function (state, e) {
  if (common_selectors.isActiveFeature(e)) return this.startOnActiveFeature(state, e);
  if (this.drawConfig.boxSelect && common_selectors.isShiftMousedown(e)) return this.startBoxSelect(state, e);
};

SimpleSelect.startBoxSelect = function (state, e) {
  this.stopExtendedInteractions(state);
  this.map.dragPan.disable(); // Enable box select

  state.boxSelectStartLocation = mouse_event_point(e.originalEvent, this.map.getContainer());
  state.canBoxSelect = true;
};

SimpleSelect.onTouchStart = function (state, e) {
  if (common_selectors.isActiveFeature(e)) return this.startOnActiveFeature(state, e);
};

SimpleSelect.onDrag = function (state, e) {
  if (state.canDragMove) return this.dragMove(state, e);
  if (this.drawConfig.boxSelect && state.canBoxSelect) return this.whileBoxSelect(state, e);
};

SimpleSelect.whileBoxSelect = function (state, e) {
  state.boxSelecting = true;
  this.updateUIClasses({
    mouse: constants.cursors.ADD
  }); // Create the box node if it doesn't exist

  if (!state.boxSelectElement) {
    state.boxSelectElement = document.createElement('div');
    state.boxSelectElement.classList.add(constants.classes.BOX_SELECT);
    this.map.getContainer().appendChild(state.boxSelectElement);
  } // Adjust the box node's width and xy position


  const current = mouse_event_point(e.originalEvent, this.map.getContainer());
  const minX = Math.min(state.boxSelectStartLocation.x, current.x);
  const maxX = Math.max(state.boxSelectStartLocation.x, current.x);
  const minY = Math.min(state.boxSelectStartLocation.y, current.y);
  const maxY = Math.max(state.boxSelectStartLocation.y, current.y);
  const translateValue = `translate(${minX}px, ${minY}px)`;
  state.boxSelectElement.style.transform = translateValue;
  state.boxSelectElement.style.WebkitTransform = translateValue;
  state.boxSelectElement.style.width = `${maxX - minX}px`;
  state.boxSelectElement.style.height = `${maxY - minY}px`;
};

SimpleSelect.dragMove = function (state, e) {
  // Dragging when drag move is enabled
  state.dragMoving = true;
  e.originalEvent.stopPropagation();
  const delta = {
    lng: e.lngLat.lng - state.dragMoveLocation.lng,
    lat: e.lngLat.lat - state.dragMoveLocation.lat
  };
  move_features(this.getSelected(), delta);
  state.dragMoveLocation = e.lngLat;
};

SimpleSelect.onMouseUp = function (state, e) {
  // End any extended interactions
  if (state.dragMoving) {
    this.fireUpdate();
  } else if (state.boxSelecting) {
    const bbox = [state.boxSelectStartLocation, mouse_event_point(e.originalEvent, this.map.getContainer())];
    const featuresInBox = this.featuresAt(null, bbox, 'click');
    const idsToSelect = this.getUniqueIds(featuresInBox).filter(id => !this.isSelected(id));

    if (idsToSelect.length) {
      this.select(idsToSelect);
      idsToSelect.forEach(id => this.doRender(id));
      this.updateUIClasses({
        mouse: constants.cursors.MOVE
      });
    }
  }

  this.stopExtendedInteractions(state);
};

SimpleSelect.toDisplayFeatures = function (state, geojson, display) {
  geojson.properties.active = this.isSelected(geojson.properties.id) ? constants.activeStates.ACTIVE : constants.activeStates.INACTIVE;
  display(geojson);
  this.fireActionable();
  if (geojson.properties.active !== constants.activeStates.ACTIVE || geojson.geometry.type === constants.geojsonTypes.POINT) return;
  create_supplementary_points(geojson).forEach(display);
};

SimpleSelect.onTrash = function () {
  this.deleteFeature(this.getSelectedIds());
  this.fireActionable();
};

SimpleSelect.onCombineFeatures = function () {
  const selectedFeatures = this.getSelected();
  if (selectedFeatures.length === 0 || selectedFeatures.length < 2) return;
  const coordinates = [],
        featuresCombined = [];
  const featureType = selectedFeatures[0].type.replace('Multi', '');

  for (let i = 0; i < selectedFeatures.length; i++) {
    const feature = selectedFeatures[i];

    if (feature.type.replace('Multi', '') !== featureType) {
      return;
    }

    if (feature.type.includes('Multi')) {
      feature.getCoordinates().forEach(subcoords => {
        coordinates.push(subcoords);
      });
    } else {
      coordinates.push(feature.getCoordinates());
    }

    featuresCombined.push(feature.toGeoJSON());
  }

  if (featuresCombined.length > 1) {
    const multiFeature = this.newFeature({
      type: constants.geojsonTypes.FEATURE,
      properties: featuresCombined[0].properties,
      geometry: {
        type: `Multi${featureType}`,
        coordinates: coordinates
      }
    });
    this.addFeature(multiFeature);
    this.deleteFeature(this.getSelectedIds(), {
      silent: true
    });
    this.setSelected([multiFeature.id]);
    this.map.fire(constants.events.COMBINE_FEATURES, {
      createdFeatures: [multiFeature.toGeoJSON()],
      deletedFeatures: featuresCombined
    });
  }

  this.fireActionable();
};

SimpleSelect.onUncombineFeatures = function () {
  const selectedFeatures = this.getSelected();
  if (selectedFeatures.length === 0) return;
  const createdFeatures = [];
  const featuresUncombined = [];

  for (let i = 0; i < selectedFeatures.length; i++) {
    const feature = selectedFeatures[i];

    if (this.isInstanceOf('MultiFeature', feature)) {
      feature.getFeatures().forEach(subFeature => {
        this.addFeature(subFeature);
        subFeature.properties = feature.properties;
        createdFeatures.push(subFeature.toGeoJSON());
        this.select([subFeature.id]);
      });
      this.deleteFeature(feature.id, {
        silent: true
      });
      featuresUncombined.push(feature.toGeoJSON());
    }
  }

  if (createdFeatures.length > 1) {
    this.map.fire(constants.events.UNCOMBINE_FEATURES, {
      createdFeatures: createdFeatures,
      deletedFeatures: featuresUncombined
    });
  }

  this.fireActionable();
};

var simple_select = SimpleSelect;

const {
  noTarget,
  isOfMetaType,
  isInactiveFeature,
  isShiftDown
} = common_selectors;









const CommonSelectors = common_selectors;



const isVertex = isOfMetaType(constants.meta.VERTEX);
const isMidpoint = isOfMetaType(constants.meta.MIDPOINT);
const DirectSelect = {}; // INTERNAL FUCNTIONS

DirectSelect.fireUpdate = function () {
  this.map.fire(constants.events.UPDATE, {
    action: constants.updateActions.CHANGE_COORDINATES,
    features: this.getSelected().map(f => f.toGeoJSON())
  });
};

DirectSelect.fireActionable = function (state) {
  this.setActionableState({
    combineFeatures: false,
    uncombineFeatures: false,
    trash: state.selectedCoordPaths.length > 0
  });
};

DirectSelect.startDragging = function (state, e) {
  this.map.dragPan.disable();
  state.canDragMove = true;
  state.dragMoveLocation = e.lngLat;
};

DirectSelect.stopDragging = function (state) {
  this.map.dragPan.enable();
  state.dragMoving = false;
  state.canDragMove = false;
  state.dragMoveLocation = null;
};

DirectSelect.onVertex = function (state, e) {
  this.startDragging(state, e);
  const about = e.featureTarget.properties;
  const selectedIndex = state.selectedCoordPaths.indexOf(about.coord_path);

  if (!isShiftDown(e) && selectedIndex === -1) {
    state.selectedCoordPaths = [about.coord_path];
  } else if (isShiftDown(e) && selectedIndex === -1) {
    state.selectedCoordPaths.push(about.coord_path);
  }

  const selectedCoordinates = this.pathsToCoordinates(state.featureId, state.selectedCoordPaths);
  this.setSelectedCoordinates(selectedCoordinates);
};

DirectSelect.onMidpoint = function (state, e) {
  this.startDragging(state, e);
  const about = e.featureTarget.properties;
  state.feature.addCoordinate(about.coord_path, about.lng, about.lat);
  this.fireUpdate();
  state.selectedCoordPaths = [about.coord_path];
};

DirectSelect.pathsToCoordinates = function (featureId, paths) {
  return paths.map(coord_path => {
    return {
      feature_id: featureId,
      coord_path
    };
  });
};

DirectSelect.onFeature = function (state, e) {
  if (state.selectedCoordPaths.length === 0) this.startDragging(state, e);else this.stopDragging(state);
};

DirectSelect.dragFeature = function (state, e, delta) {
  move_features(this.getSelected(), delta);
  state.dragMoveLocation = e.lngLat;
};

DirectSelect.dragVertex = function (state, e, delta) {
  const selectedCoords = state.selectedCoordPaths.map(coord_path => state.feature.getCoordinate(coord_path));
  const selectedCoordPoints = selectedCoords.map(coords => ({
    type: constants.geojsonTypes.FEATURE,
    properties: {},
    geometry: {
      type: constants.geojsonTypes.POINT,
      coordinates: coords
    }
  }));
  const constrainedDelta = constrain_feature_movement(selectedCoordPoints, delta);

  for (let i = 0; i < selectedCoords.length; i++) {
    const coord = selectedCoords[i];
    state.feature.updateCoordinate(state.selectedCoordPaths[i], coord[0] + constrainedDelta.lng, coord[1] + constrainedDelta.lat);
  }
};

DirectSelect.clickNoTarget = function () {
  this.changeMode(constants.modes.SIMPLE_SELECT);
};

DirectSelect.clickInactive = function () {
  this.changeMode(constants.modes.SIMPLE_SELECT);
};

DirectSelect.clickActiveFeature = function (state) {
  state.selectedCoordPaths = [];
  this.clearSelectedCoordinates();
  state.feature.changed();
}; // EXTERNAL FUNCTIONS


DirectSelect.onSetup = function (opts) {
  const featureId = opts.featureId;
  const feature = this.getFeature(featureId);

  if (!feature) {
    throw new Error('You must provide a featureId to enter direct_select mode');
  }

  if (feature.type === constants.geojsonTypes.POINT) {
    throw new TypeError('direct_select mode doesn\'t handle point features');
  }

  const state = {
    featureId,
    feature,
    dragMoveLocation: opts.startPos || null,
    dragMoving: false,
    canDragMove: false,
    selectedCoordPaths: opts.coordPath ? [opts.coordPath] : []
  };
  this.setSelectedCoordinates(this.pathsToCoordinates(featureId, state.selectedCoordPaths));
  this.setSelected(featureId);
  double_click_zoom.disable(this);
  this.setActionableState({
    trash: true
  });
  return state;
};

DirectSelect.onStop = function () {
  double_click_zoom.enable(this);
  this.clearSelectedCoordinates();
};

DirectSelect.toDisplayFeatures = function (state, geojson, push) {
  if (state.featureId === geojson.properties.id) {
    geojson.properties.active = constants.activeStates.ACTIVE;
    push(geojson);
    create_supplementary_points(geojson, {
      map: this.map,
      midpoints: true,
      selectedPaths: state.selectedCoordPaths
    }).forEach(push);
  } else {
    geojson.properties.active = constants.activeStates.INACTIVE;
    push(geojson);
  }

  this.fireActionable(state);
};

DirectSelect.onTrash = function (state) {
  state.selectedCoordPaths.sort().reverse().forEach(id => state.feature.removeCoordinate(id));
  this.fireUpdate();
  state.selectedCoordPaths = [];
  this.clearSelectedCoordinates();
  this.fireActionable(state);

  if (state.feature.isValid() === false) {
    this.deleteFeature([state.featureId]);
    this.changeMode(constants.modes.SIMPLE_SELECT, {});
  }
};

DirectSelect.onMouseMove = function (state, e) {
  // On mousemove that is not a drag, stop vertex movement.
  const isFeature = CommonSelectors.isActiveFeature(e);
  const onVertex = isVertex(e);
  const noCoords = state.selectedCoordPaths.length === 0;
  if (isFeature && noCoords) this.updateUIClasses({
    mouse: constants.cursors.MOVE
  });else if (onVertex && !noCoords) this.updateUIClasses({
    mouse: constants.cursors.MOVE
  });else this.updateUIClasses({
    mouse: constants.cursors.NONE
  });
  this.stopDragging(state);
};

DirectSelect.onMouseOut = function (state) {
  // As soon as you mouse leaves the canvas, update the feature
  if (state.dragMoving) this.fireUpdate();
};

DirectSelect.onTouchStart = DirectSelect.onMouseDown = function (state, e) {
  if (isVertex(e)) return this.onVertex(state, e);
  if (CommonSelectors.isActiveFeature(e)) return this.onFeature(state, e);
  if (isMidpoint(e)) return this.onMidpoint(state, e);
};

DirectSelect.onDrag = function (state, e) {
  if (state.canDragMove !== true) return;
  state.dragMoving = true;
  e.originalEvent.stopPropagation();
  const delta = {
    lng: e.lngLat.lng - state.dragMoveLocation.lng,
    lat: e.lngLat.lat - state.dragMoveLocation.lat
  };
  if (state.selectedCoordPaths.length > 0) this.dragVertex(state, e, delta);else this.dragFeature(state, e, delta);
  state.dragMoveLocation = e.lngLat;
};

DirectSelect.onClick = function (state, e) {
  if (noTarget(e)) return this.clickNoTarget(state, e);
  if (CommonSelectors.isActiveFeature(e)) return this.clickActiveFeature(state, e);
  if (isInactiveFeature(e)) return this.clickInactive(state, e);
  this.stopDragging(state);
};

DirectSelect.onTap = function (state, e) {
  if (noTarget(e)) return this.clickNoTarget(state, e);
  if (CommonSelectors.isActiveFeature(e)) return this.clickActiveFeature(state, e);
  if (isInactiveFeature(e)) return this.clickInactive(state, e);
};

DirectSelect.onTouchEnd = DirectSelect.onMouseUp = function (state) {
  if (state.dragMoving) {
    this.fireUpdate();
  }

  this.stopDragging(state);
};

var direct_select = DirectSelect;

const DrawPoint = {};

DrawPoint.onSetup = function () {
  const point = this.newFeature({
    type: constants.geojsonTypes.FEATURE,
    properties: {},
    geometry: {
      type: constants.geojsonTypes.POINT,
      coordinates: []
    }
  });
  this.addFeature(point);
  this.clearSelectedFeatures();
  this.updateUIClasses({
    mouse: constants.cursors.ADD
  });
  this.activateUIButton(constants.types.POINT);
  this.setActionableState({
    trash: true
  });
  return {
    point
  };
};

DrawPoint.stopDrawingAndRemove = function (state) {
  this.deleteFeature([state.point.id], {
    silent: true
  });
  this.changeMode(constants.modes.SIMPLE_SELECT);
};

DrawPoint.onTap = DrawPoint.onClick = function (state, e) {
  this.updateUIClasses({
    mouse: constants.cursors.MOVE
  });
  state.point.updateCoordinate('', e.lngLat.lng, e.lngLat.lat);
  this.map.fire(constants.events.CREATE, {
    features: [state.point.toGeoJSON()]
  });
  this.changeMode(constants.modes.SIMPLE_SELECT, {
    featureIds: [state.point.id]
  });
};

DrawPoint.onStop = function (state) {
  this.activateUIButton();

  if (!state.point.getCoordinate().length) {
    this.deleteFeature([state.point.id], {
      silent: true
    });
  }
};

DrawPoint.toDisplayFeatures = function (state, geojson, display) {
  // Never render the point we're drawing
  const isActivePoint = geojson.properties.id === state.point.id;
  geojson.properties.active = isActivePoint ? constants.activeStates.ACTIVE : constants.activeStates.INACTIVE;
  if (!isActivePoint) return display(geojson);
};

DrawPoint.onTrash = DrawPoint.stopDrawingAndRemove;

DrawPoint.onKeyUp = function (state, e) {
  if (common_selectors.isEscapeKey(e) || common_selectors.isEnterKey(e)) {
    return this.stopDrawingAndRemove(state, e);
  }
};

var draw_point = DrawPoint;

function isEventAtCoordinates(event, coordinates) {
  if (!event.lngLat) return false;
  return event.lngLat.lng === coordinates[0] && event.lngLat.lat === coordinates[1];
}

var is_event_at_coordinates = isEventAtCoordinates;

const DrawPolygon = {};

DrawPolygon.onSetup = function () {
  const polygon = this.newFeature({
    type: constants.geojsonTypes.FEATURE,
    properties: {},
    geometry: {
      type: constants.geojsonTypes.POLYGON,
      coordinates: [[]]
    }
  });
  this.addFeature(polygon);
  this.clearSelectedFeatures();
  double_click_zoom.disable(this);
  this.updateUIClasses({
    mouse: constants.cursors.ADD
  });
  this.activateUIButton(constants.types.POLYGON);
  this.setActionableState({
    trash: true
  });
  return {
    polygon,
    currentVertexPosition: 0
  };
};

DrawPolygon.clickAnywhere = function (state, e) {
  if (state.currentVertexPosition > 0 && is_event_at_coordinates(e, state.polygon.coordinates[0][state.currentVertexPosition - 1])) {
    return this.changeMode(constants.modes.SIMPLE_SELECT, {
      featureIds: [state.polygon.id]
    });
  }

  this.updateUIClasses({
    mouse: constants.cursors.ADD
  });
  state.polygon.updateCoordinate(`0.${state.currentVertexPosition}`, e.lngLat.lng, e.lngLat.lat);
  state.currentVertexPosition++;
  state.polygon.updateCoordinate(`0.${state.currentVertexPosition}`, e.lngLat.lng, e.lngLat.lat);
};

DrawPolygon.clickOnVertex = function (state) {
  return this.changeMode(constants.modes.SIMPLE_SELECT, {
    featureIds: [state.polygon.id]
  });
};

DrawPolygon.onMouseMove = function (state, e) {
  state.polygon.updateCoordinate(`0.${state.currentVertexPosition}`, e.lngLat.lng, e.lngLat.lat);

  if (common_selectors.isVertex(e)) {
    this.updateUIClasses({
      mouse: constants.cursors.POINTER
    });
  }
};

DrawPolygon.onTap = DrawPolygon.onClick = function (state, e) {
  if (common_selectors.isVertex(e)) return this.clickOnVertex(state, e);
  return this.clickAnywhere(state, e);
};

DrawPolygon.onKeyUp = function (state, e) {
  if (common_selectors.isEscapeKey(e)) {
    this.deleteFeature([state.polygon.id], {
      silent: true
    });
    this.changeMode(constants.modes.SIMPLE_SELECT);
  } else if (common_selectors.isEnterKey(e)) {
    this.changeMode(constants.modes.SIMPLE_SELECT, {
      featureIds: [state.polygon.id]
    });
  }
};

DrawPolygon.onStop = function (state) {
  this.updateUIClasses({
    mouse: constants.cursors.NONE
  });
  double_click_zoom.enable(this);
  this.activateUIButton(); // check to see if we've deleted this feature

  if (this.getFeature(state.polygon.id) === undefined) return; //remove last added coordinate

  state.polygon.removeCoordinate(`0.${state.currentVertexPosition}`);

  if (state.polygon.isValid()) {
    this.map.fire(constants.events.CREATE, {
      features: [state.polygon.toGeoJSON()]
    });
  } else {
    this.deleteFeature([state.polygon.id], {
      silent: true
    });
    this.changeMode(constants.modes.SIMPLE_SELECT, {}, {
      silent: true
    });
  }
};

DrawPolygon.toDisplayFeatures = function (state, geojson, display) {
  const isActivePolygon = geojson.properties.id === state.polygon.id;
  geojson.properties.active = isActivePolygon ? constants.activeStates.ACTIVE : constants.activeStates.INACTIVE;
  if (!isActivePolygon) return display(geojson); // Don't render a polygon until it has two positions
  // (and a 3rd which is just the first repeated)

  if (geojson.geometry.coordinates.length === 0) return;
  const coordinateCount = geojson.geometry.coordinates[0].length; // 2 coordinates after selecting a draw type
  // 3 after creating the first point

  if (coordinateCount < 3) {
    return;
  }

  geojson.properties.meta = constants.meta.FEATURE;
  display(create_vertex(state.polygon.id, geojson.geometry.coordinates[0][0], '0.0', false));

  if (coordinateCount > 3) {
    // Add a start position marker to the map, clicking on this will finish the feature
    // This should only be shown when we're in a valid spot
    const endPos = geojson.geometry.coordinates[0].length - 3;
    display(create_vertex(state.polygon.id, geojson.geometry.coordinates[0][endPos], `0.${endPos}`, false));
  }

  if (coordinateCount <= 4) {
    // If we've only drawn two positions (plus the closer),
    // make a LineString instead of a Polygon
    const lineCoordinates = [[geojson.geometry.coordinates[0][0][0], geojson.geometry.coordinates[0][0][1]], [geojson.geometry.coordinates[0][1][0], geojson.geometry.coordinates[0][1][1]]]; // create an initial vertex so that we can track the first point on mobile devices

    display({
      type: constants.geojsonTypes.FEATURE,
      properties: geojson.properties,
      geometry: {
        coordinates: lineCoordinates,
        type: constants.geojsonTypes.LINE_STRING
      }
    });

    if (coordinateCount === 3) {
      return;
    }
  } // render the Polygon


  return display(geojson);
};

DrawPolygon.onTrash = function (state) {
  this.deleteFeature([state.polygon.id], {
    silent: true
  });
  this.changeMode(constants.modes.SIMPLE_SELECT);
};

var draw_polygon = DrawPolygon;

const DrawLineString = {};

DrawLineString.onSetup = function (opts) {
  opts = opts || {};
  const featureId = opts.featureId;
  let line, currentVertexPosition;
  let direction = 'forward';

  if (featureId) {
    line = this.getFeature(featureId);

    if (!line) {
      throw new Error('Could not find a feature with the provided featureId');
    }

    let from = opts.from;

    if (from && from.type === 'Feature' && from.geometry && from.geometry.type === 'Point') {
      from = from.geometry;
    }

    if (from && from.type === 'Point' && from.coordinates && from.coordinates.length === 2) {
      from = from.coordinates;
    }

    if (!from || !Array.isArray(from)) {
      throw new Error('Please use the `from` property to indicate which point to continue the line from');
    }

    const lastCoord = line.coordinates.length - 1;

    if (line.coordinates[lastCoord][0] === from[0] && line.coordinates[lastCoord][1] === from[1]) {
      currentVertexPosition = lastCoord + 1; // add one new coordinate to continue from

      line.addCoordinate(currentVertexPosition, ...line.coordinates[lastCoord]);
    } else if (line.coordinates[0][0] === from[0] && line.coordinates[0][1] === from[1]) {
      direction = 'backwards';
      currentVertexPosition = 0; // add one new coordinate to continue from

      line.addCoordinate(currentVertexPosition, ...line.coordinates[0]);
    } else {
      throw new Error('`from` should match the point at either the start or the end of the provided LineString');
    }
  } else {
    line = this.newFeature({
      type: constants.geojsonTypes.FEATURE,
      properties: {},
      geometry: {
        type: constants.geojsonTypes.LINE_STRING,
        coordinates: []
      }
    });
    currentVertexPosition = 0;
    this.addFeature(line);
  }

  this.clearSelectedFeatures();
  double_click_zoom.disable(this);
  this.updateUIClasses({
    mouse: constants.cursors.ADD
  });
  this.activateUIButton(constants.types.LINE);
  this.setActionableState({
    trash: true
  });
  return {
    line,
    currentVertexPosition,
    direction
  };
};

DrawLineString.clickAnywhere = function (state, e) {
  if (state.currentVertexPosition > 0 && is_event_at_coordinates(e, state.line.coordinates[state.currentVertexPosition - 1]) || state.direction === 'backwards' && is_event_at_coordinates(e, state.line.coordinates[state.currentVertexPosition + 1])) {
    return this.changeMode(constants.modes.SIMPLE_SELECT, {
      featureIds: [state.line.id]
    });
  }

  this.updateUIClasses({
    mouse: constants.cursors.ADD
  });
  state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);

  if (state.direction === 'forward') {
    state.currentVertexPosition++;
    state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
  } else {
    state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
  }
};

DrawLineString.clickOnVertex = function (state) {
  return this.changeMode(constants.modes.SIMPLE_SELECT, {
    featureIds: [state.line.id]
  });
};

DrawLineString.onMouseMove = function (state, e) {
  state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);

  if (common_selectors.isVertex(e)) {
    this.updateUIClasses({
      mouse: constants.cursors.POINTER
    });
  }
};

DrawLineString.onTap = DrawLineString.onClick = function (state, e) {
  if (common_selectors.isVertex(e)) return this.clickOnVertex(state, e);
  this.clickAnywhere(state, e);
};

DrawLineString.onKeyUp = function (state, e) {
  if (common_selectors.isEnterKey(e)) {
    this.changeMode(constants.modes.SIMPLE_SELECT, {
      featureIds: [state.line.id]
    });
  } else if (common_selectors.isEscapeKey(e)) {
    this.deleteFeature([state.line.id], {
      silent: true
    });
    this.changeMode(constants.modes.SIMPLE_SELECT);
  }
};

DrawLineString.onStop = function (state) {
  double_click_zoom.enable(this);
  this.activateUIButton(); // check to see if we've deleted this feature

  if (this.getFeature(state.line.id) === undefined) return; //remove last added coordinate

  state.line.removeCoordinate(`${state.currentVertexPosition}`);

  if (state.line.isValid()) {
    this.map.fire(constants.events.CREATE, {
      features: [state.line.toGeoJSON()]
    });
  } else {
    this.deleteFeature([state.line.id], {
      silent: true
    });
    this.changeMode(constants.modes.SIMPLE_SELECT, {}, {
      silent: true
    });
  }
};

DrawLineString.onTrash = function (state) {
  this.deleteFeature([state.line.id], {
    silent: true
  });
  this.changeMode(constants.modes.SIMPLE_SELECT);
};

DrawLineString.toDisplayFeatures = function (state, geojson, display) {
  const isActiveLine = geojson.properties.id === state.line.id;
  geojson.properties.active = isActiveLine ? constants.activeStates.ACTIVE : constants.activeStates.INACTIVE;
  if (!isActiveLine) return display(geojson); // Only render the line if it has at least one real coordinate

  if (geojson.geometry.coordinates.length < 2) return;
  geojson.properties.meta = constants.meta.FEATURE;
  display(create_vertex(state.line.id, geojson.geometry.coordinates[state.direction === 'forward' ? geojson.geometry.coordinates.length - 2 : 1], `${state.direction === 'forward' ? geojson.geometry.coordinates.length - 2 : 1}`, false));
  display(geojson);
};

var draw_line_string = DrawLineString;

var modes = {
  simple_select: simple_select,
  direct_select: direct_select,
  draw_point: draw_point,
  draw_polygon: draw_polygon,
  draw_line_string: draw_line_string
};

class Draw extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onChange", () => {
      const {
        onChange
      } = this.props;

      if (onChange) {
        // $FlowFixMe
        const allFeatures = this._draw.getAll();

        onChange(allFeatures);
      }
    });

    _defineProperty(this, "_onDrawCreate", event => {
      if (this.props.onDrawCreate) {
        this.props.onDrawCreate(event);
      }
    });

    _defineProperty(this, "_onDrawDelete", event => {
      if (this.props.onDrawDelete) {
        this.props.onDrawDelete(event);
      }
    });

    _defineProperty(this, "_onDrawCombine", event => {
      if (this.props.onDrawCombine) {
        this.props.onDrawCombine(event);
      }
    });

    _defineProperty(this, "_onDrawUncombine", event => {
      if (this.props.onDrawUncombine) {
        this.props.onDrawUncombine(event);
      }
    });

    _defineProperty(this, "_onDrawUpdate", event => {
      if (this.props.onDrawUpdate) {
        this.props.onDrawUpdate(event);
      }
    });

    _defineProperty(this, "_onDrawSelectionchange", event => {
      if (this.props.onDrawSelectionChange) {
        this.props.onDrawSelectionChange(event);
      }
    });

    _defineProperty(this, "_onDrawModechange", event => {
      if (this.props.onDrawModeChange) {
        this.props.onDrawModeChange(event);
      }
    });

    _defineProperty(this, "_onDrawRender", event => {
      if (this.props.onDrawRender) {
        this.props.onDrawRender(event);
      }
    });

    _defineProperty(this, "_onDrawActionable", event => {
      if (this.props.onDrawActionable) {
        this.props.onDrawActionable(event);
      }
    });
  }

  componentDidMount() {
    const newModes = typeof this.props.modes === 'function' ? this.props.modes(this.constructor.defaultProps.modes) : this.props.modes; // $FlowFixMe

    const map = this._map;
    const draw = new mapboxGlDraw({
      keybindings: this.props.keybindings,
      touchEnabled: this.props.touchEnabled,
      boxSelect: this.props.boxSelect,
      clickBuffer: this.props.clickBuffer,
      touchBuffer: this.props.touchBuffer,
      controls: {
        point: this.props.pointControl,
        line_string: this.props.lineStringControl,
        polygon: this.props.polygonControl,
        trash: this.props.trashControl,
        combine_features: this.props.combineFeaturesControl,
        uncombine_features: this.props.uncombineFeaturesControl,
        ...this.props.customControls
      },
      displayControlsDefault: this.props.displayControlsDefault,
      styles: this.props.styles,
      modes: newModes,
      defaultMode: this.props.mode,
      userProperties: this.props.userProperties
    }, this.props.position); // draw.modes = newModes // ??? WTF

    map.addControl(draw);
    map.on('draw.create', this._onDrawCreate);
    map.on('draw.create', this._onChange);
    map.on('draw.delete', this._onDrawDelete);
    map.on('draw.delete', this._onChange);
    map.on('draw.combine', this._onDrawCombine);
    map.on('draw.combine', this._onChange);
    map.on('draw.uncombine', this._onDrawUncombine);
    map.on('draw.uncombine', this._onChange);
    map.on('draw.update', this._onDrawUpdate);
    map.on('draw.update', this._onChange);
    map.on('draw.selectionchange', this._onDrawSelectionchange);
    map.on('draw.modechange', this._onDrawModechange);
    map.on('draw.render', this._onDrawRender);
    map.on('draw.actionable', this._onDrawActionable);

    if (this.props.data) {
      draw.add(this.props.data);
    } // $FlowFixMe


    this._draw = draw;
  }

  componentDidUpdate(prevProps) {
    if (this.props.data) {
      // $FlowFixMe
      this._draw.set(this.props.data);
    }

    if (prevProps.mode !== this.props.mode) {
      // $FlowFixMe
      this._draw.changeMode(this.props.mode, this.props.modeOptions);
    }
  }

  componentWillUnmount() {
    // $FlowFixMe
    if (!this._map || !this._map.getStyle()) {
      return;
    } // $FlowFixMe


    this._draw.onRemove();
  }

  getDraw() {
    // $FlowFixMe
    return this._draw;
  }

  render() {
    return React.createElement(reactMapGl.MapContext.Consumer, {}, map => {
      if (map) {
        // $FlowFixMe
        this._map = map;
      }

      return null;
    });
  }

}

_defineProperty(Draw, "defaultProps", {
  position: 'top-right',
  keybindings: true,
  touchEnabled: true,
  boxSelect: true,
  clickBuffer: 2,
  touchBuffer: 25,
  pointControl: true,
  lineStringControl: true,
  polygonControl: true,
  trashControl: true,
  combineFeaturesControl: true,
  uncombineFeaturesControl: true,
  displayControlsDefault: true,
  styles: theme,
  modes,
  mode: 'simple_select',
  modeOptions: {},
  userProperties: false,
  data: null,
  onDrawCreate: null,
  onDrawDelete: null,
  onDrawCombine: null,
  onDrawUncombine: null,
  onDrawUpdate: null,
  onDrawSelectionChange: null,
  onDrawModeChange: null,
  onDrawRender: null,
  onDrawActionable: null,
  onChange: null,
  customControls: {}
});

exports.default = Draw;
//# sourceMappingURL=react-map-gl-draw.cjs.js.map
