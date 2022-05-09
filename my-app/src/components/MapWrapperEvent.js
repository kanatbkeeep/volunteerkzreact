// react
import React, {useState, useEffect, useRef} from 'react';

// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import {fromLonLat, transform} from 'ol/proj'
import {OSM} from "ol/source";
import {Icon, Style} from "ol/style";
import mapPointImage from "../image/mapPoint.png"
import {Point} from "ol/geom";
import Feature from "ol/Feature";

function MapWrapperFuncEvent(props, lat, long) {
    const [map, setMap] = useState()
    const [featuresLayer, setFeaturesLayer] = useState()
    const [selectedCoord, setSelectedCoord] = useState()

    const mapElement = useRef()

    const mapRef = useRef()
    mapRef.current = map

    useEffect(() => {

        const initalFeaturesLayer = new VectorLayer({
            source: new VectorSource()
        })

        const initialMap = new Map({
            target: mapElement.current,
            layers: [

                new TileLayer({
                    source: new OSM()
                }),

                new VectorLayer({
                    source: new VectorSource({
                        features: [new Feature({
                            geometry: new Point(fromLonLat([lat, long])),
                            name: 'Somewhere near Nottingham',
                        })]
                    }),
                    style: new Style({
                        image: new Icon({
                            anchor: [0.5, 46],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'pixels',
                            src: mapPointImage
                        })
                    })
                }),

                initalFeaturesLayer

            ],
            view: new View({
                projection: 'EPSG:3857',
                center: fromLonLat([lat, long]),
                zoom: 11
            }),
            controls: []
        })

        setMap(initialMap)
        setFeaturesLayer(initalFeaturesLayer)

    }, [])


    // render component
    return (
        <div ref={mapElement} data-value={selectedCoord} id="mapCreateEvent" className="map-container"/>
    )

}

export default MapWrapperFuncEvent