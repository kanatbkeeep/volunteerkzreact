// react
import React, {useState, useEffect, useRef} from 'react';

// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import {fromLonLat} from 'ol/proj'
import {OSM} from "ol/source";
import {Icon, Style} from "ol/style";
import mapPointImage from "../image/mapPoint.png"
import {Point} from "ol/geom";
import Feature from "ol/Feature";

function MapWrapperFuncEvent() {
    const [map, setMap] = useState()

    let baseUrl = (window.location).href; // You can also use document.URL
    let eventId = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
    const mapElement = useRef()
    const mapRef = useRef()
    mapRef.current = map

    useEffect(() => {
        fetch(
            "https://volunteer-kz.herokuapp.com/event/getById?" + new URLSearchParams({
                id: eventId
            }),
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => res.json())
            .then((json) => {
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
                                    geometry: new Point(fromLonLat([json.lat, json.lng])),
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
                        center: fromLonLat([json.lat, json.lng]),
                        zoom: 11
                    }),
                    controls: []
                })

                setMap(initialMap)
            })
    }, [])

    // render component
    return (
        <div ref={mapElement} id="mapCreateEvent" className="map-container"/>
    )

}

export default MapWrapperFuncEvent