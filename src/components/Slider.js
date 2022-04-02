import React, { useEffect, useState } from "react";

const useFetch = (url) => {
	const [weather, setWeather] = useState(null);

	useEffect(async () => {
		const response = await fetch(url);
		const data = await response.json();
		const item = data.list;
		setWeather(item);
	}, []);

	return { weather };
};

const useCurrentCity = () => {
	const jsonData = require("./citylist.json");

	var user = "London";
	try {
		let result = jsonData.find((x) => x.name == user);
		const cityID = result["id"];
		return cityID;
	} catch {
		console.error("Not available");
	}
};

export default function Slider() {
	let cityID = useCurrentCity();
	console.log(cityID);
	const fullURL =
		"https://api.openweathermap.org/data/2.5/forecast?id=" +
		cityID +
		"&appid=1a8282c6c01e5c5c1bfbc93c189de372";
	console.log(fullURL);
	const { weather } = useFetch(fullURL);
	const [currentStartTime, setCurrentStartTime] = useState(0);
	const [currentEndTime, setCurrentEndTime] = useState(3);

	const nextSlide = () => {
		setCurrentStartTime(currentStartTime === 6 ? 0 : currentStartTime + 3);
		setCurrentEndTime(currentEndTime === 9 ? 3 : currentEndTime + 3);
	};

	const previousSlide = () => {
		setCurrentStartTime(currentStartTime === 0 ? 6 : currentStartTime - 3);
		setCurrentEndTime(currentEndTime === 3 ? 9 : currentEndTime - 3);
	};

	return (
		<div>
			{weather &&
				weather.slice(currentStartTime, currentEndTime).map((data) => {
					return (
						<div key={data.dt}>
							<h1>{data.dt_txt.slice(11, 16)}</h1>
							<h3>{(data.main.temp - 32) / 1.8}</h3>
						</div>
					);
				})}

			<button onClick={nextSlide}>Next</button>
			<button onClick={previousSlide}>Previous</button>
		</div>
	);
}
