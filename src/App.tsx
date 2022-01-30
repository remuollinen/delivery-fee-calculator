import React, { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";
import Result from "./components/Result";

const App = () => {
	const [deliveryFee, setDeliveryFee] = useState(0);

	const getCalcData = (data: number) => {
		setDeliveryFee(data);
	};

	return (
		<div className="App">
			<Header />
			<Form getCalcData={getCalcData} />
			<Result deliveryFee={deliveryFee} />
			<Footer />
		</div>
	);
};

export default App;
