import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";

const _ = require("lodash");
const {compose, withProps, lifecycle} = require("recompose");

const MapWithASearchBox = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB8S-gt0NjQZtdv342m7X_jVDGR-LEbDu8&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                bounds: null,
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onBoundsChanged: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter(),
                    })
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const bounds = new window.google.maps.LatLngBounds();

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));
                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
                    this.props.input.onChange({lat: nextCenter.lat(), lng: nextCenter.lng()});

                },
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={15}
        center={props.input.value || {
            lat: 41.9, lng: -87.624
        }}
        onBoundsChanged={props.onBoundsChanged}
        defaultOptions={{
            scrollwheel: false,
        }}
    >
        <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Customized your placeholder"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    marginTop: `27px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
            />
        </SearchBox>
        <Marker position={props.input.value || {
            lat: 41.9, lng: -87.624
        }}/>
    </GoogleMap>
);
export default MapWithASearchBox;
