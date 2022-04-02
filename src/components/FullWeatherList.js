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

export default function FullWeatherList() {
	let cityID = useCurrentCity();
	console.log(cityID);
	const fullURL =
		"https://api.openweathermap.org/data/2.5/forecast?id=" +
		cityID +
		"&appid=1a8282c6c01e5c5c1bfbc93c189de372";
	console.log(fullURL);
	const { weather } = useFetch(fullURL);
	return (
		<div>
			{weather &&
				weather.slice(9).map((data) => {
					return (
						<div key={data.dt}>
							{data.dt_txt.slice(11, 16) === "12:00" ? (
								<div>
									<h1>{data.dt_txt.slice(0, 10)}</h1>
									<h2>{data.weather[0].main}</h2>
									<h3>{data.main.temp}</h3>
								</div>
							) : (
								""
							)}
						</div>
					);
				})}
		</div>
	);
}
