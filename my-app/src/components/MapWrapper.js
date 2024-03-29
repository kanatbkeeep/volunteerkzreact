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

function MapWrapper(props) {
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

                initalFeaturesLayer

            ],
            view: new View({
                projection: 'EPSG:3857',
                center: fromLonLat([71.449074, 51.169392]),
                zoom: 11
            }),
            controls: []
        })

        initialMap.on('click', handleMapClick)

        setMap(initialMap)
        setFeaturesLayer(initalFeaturesLayer)

    }, [])

    useEffect(() => {

        if (props.features.length) {

            featuresLayer.setSource(
                new VectorSource({
                    features: props.features
                })
            )

            map.getView().fit(featuresLayer.getSource().getExtent(), {
                padding: [100, 100, 100, 100]
            })

        }

    }, [props.features])

    const handleMapClick = (event) => {
        const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);
        const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
        setSelectedCoord(transormedCoord)

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
                            geometry: new Point(fromLonLat(transormedCoord)),
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
                center: fromLonLat(transormedCoord),
                zoom: 11
            }),
            controls: []
        })
        initialMap.on('click', handleMapClick)

        setMap(initialMap)

        console.log(transormedCoord)
    }

    // render component
    return (
        <div ref={mapElement} data-value={selectedCoord} id="mapCreateEvent" className="map-container"/>
    )

}

export default MapWrapper