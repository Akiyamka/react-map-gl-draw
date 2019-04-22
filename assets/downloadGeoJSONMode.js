const saveData = (function () {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  return function (data, fileName) {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'octet/stream' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}());

const debounce = (function () {
  let timer = null;
  return (cb, timeout) => {
    timer && clearTimeout(timer);
    timer = setTimeout(cb, timeout);
  };
}());

export default {
  onSetup: function (opts) {
    const state = {
      type: 'FeatureCollection',
      features: [],
    };
    return state;
  },

  toDisplayFeatures: function (state, geojson, display) {
    state.features.push(geojson);
    /**
     * Suddenly mods don't have mounted / unmounted hook.
     * That hack allow download GeoJson after last feature mounted;
     **/
    debounce(() => saveData(state, 'shape.json'), 50);
    display(geojson);
  }

};