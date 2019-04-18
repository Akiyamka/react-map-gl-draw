'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var reactMapGl = require('@urbica/react-map-gl');
var MapboxDraw = _interopDefault(require('@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw'));

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

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

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
    // $FlowFixMe
    const map = this._map;
    const draw = new MapboxDraw({
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
      modes: this.props.modes,
      defaultMode: this.props.mode,
      userProperties: this.props.userProperties
    }, this.props.position);
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
