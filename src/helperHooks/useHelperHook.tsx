import { useEffect, useState } from "react";

export const useDeviceDimension = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);

	const handleResize = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return [width, height];
}

export const useLocalStorage = (key: string, initialValue: any) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(storedValue))
	}, [storedValue])

	return [storedValue, setStoredValue]
}


