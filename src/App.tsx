import React, { useLayoutEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import "./App.css";

const coordinates = {
	lat: Number(process.env.REACT_APP_GOOGLE_MAPS_COOR_LAT as string),
	lng: Number(process.env.REACT_APP_GOOGLE_MAPS_COOR_LONG as string),
};

const MAP_ID = "MAP_ID";
const ZOOM = 12;

const App = () => {
	const map = useRef<google.maps.Map>();
	const additionalOptions = {};

	const { isLoaded, loadError } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
	});

	/**
	 * Note: Non-React implementation
	 * Remove ref
	 */
	useLayoutEffect(() => {
		const loader = new Loader({
			apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
			version: "weekly",
			...additionalOptions,
		});

		loader.load().then(async () => {
			const { Map } = (await google.maps.importLibrary(
				"maps"
			)) as google.maps.MapsLibrary;
			const { AdvancedMarkerElement } = (await google.maps.importLibrary(
				"marker"
			)) as google.maps.MarkerLibrary;

			map.current = new Map(
				document.getElementById("map-container") as HTMLElement,
				{
					center: coordinates,
					zoom: ZOOM,
					mapId: MAP_ID,
				}
			);

			new AdvancedMarkerElement({
				map: map.current, // Ref for now
				position: coordinates,
				title: "Uluru",
			});
		});
	});

	if (loadError) {
		return <div>Error loading maps</div>;
	}

	if (!isLoaded) {
		return <div>Loading maps</div>;
	}

	return (
		<div className="app">
			<div className="hero-text">
				<h1>Lorem Ipsum</h1>
			</div>
			<div id="map-container" className="map-container">
				{/* <GoogleMap
					mapContainerStyle={{
						width: "100%",
						height: "100%",
						borderRadius: "1em",
					}}
					zoom={ZOOM}
					center={coordinates}
				>
					<Marker position={coordinates} />
				</GoogleMap> */}
			</div>
		</div>
	);
};

export default App;
