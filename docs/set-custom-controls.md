```jsx
import React from 'react';
import MapGL from '@urbica/react-map-gl';
import Draw from '@urbica/react-map-gl-draw';  

initialState = {
  data: {
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      properties:{},
      geometry: {
        coordinates: [
          -122.41411987304815,
          37.792209769935084
        ],
      type: "Point"
      }
    }]
  }
};

<>
  <MapGL
    style={{ width: "100%", height: "400px" }}
    mapStyle="mapbox://styles/mapbox/light-v9"
    accessToken={MAPBOX_ACCESS_TOKEN}
    latitude={37.78}
    longitude={-122.41}
    zoom={11}
  >
    <Draw
      data={state.data}
      onChange={(data) => setState({data})}
      customControls={{
          alert: {
            type: 'myBTN',
            className: 'my-btn',
            title: 'My custom control',
            onActivate: ctx => alert('Boo!'), // whatever
            icon: './icon.svg'
          }
        }}
    />
  </MapGL>
  <div>
    {JSON.stringify(state.data)}
  </div>
</>
```
