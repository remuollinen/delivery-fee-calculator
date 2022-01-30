import React, { useState, useEffect } from "react";

const Form = ({ getCalcData }: { getCalcData: (data: number) => void }) => {
	const [deliveryPrice, setDeliveryPrice] = useState(0);

	let cartValue: number = 0;
	let total: number = 0;
	let surcharge: number = 0;
	let distanceFee: number = 0;

	const returnCalcDataToParent = (data: number) => {
		getCalcData(data);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => returnCalcDataToParent(deliveryPrice), [deliveryPrice]);

	const calcDeliveryFee = (e: React.FormEvent) => {
		e.preventDefault();
		getCartValue();
		getDistance();
		getNumOfItems();
		getOrderTime();
		if (total > 15) {
			total = 15;
		}
		if (cartValue >= 100 || cartValue === 0) {
			total = 0;
		}
		setDeliveryPrice(total);
		returnCalcDataToParent(deliveryPrice);
	};

	const getCartValue = () => {
		const cartInput: number = +(
			document.getElementById("cart") as HTMLInputElement
		).value;
		if (cartInput < 10) {
			surcharge = 10 - cartInput;
		}
		cartValue = cartInput;
	};

	const getDistance = () => {
		const distance: number = +(
			document.getElementById("distance") as HTMLInputElement
		).value;
		const baseFee: number = 2;
		if (distance > 1000) {
			const difference: number = distance - 1000;
			const differenceCutPoints: number[] = new Array(20)
				.fill(500)
				.map((val, i) => val + i * 500);
			differenceCutPoints.find((cutPoint, i) =>
				difference <= cutPoint ? (distanceFee = baseFee + (i + 1)) : null
			);
		} else {
			distanceFee = baseFee;
		}
	};

	const getNumOfItems = () => {
		const amountOfItems: number = +(
			document.getElementById("items") as HTMLInputElement
		).value;
		if (amountOfItems > 4) {
			const difference: number = amountOfItems - 4;
			const additionalFee: number = difference * 0.5;
			surcharge = surcharge + additionalFee;
		}
	};

	const getOrderTime = () => {
		const dateInput = (document.getElementById("date") as HTMLInputElement)
			.value;
		const date: Date = new Date(dateInput);
		if (date.getUTCDay() === 5) {
			if (date.getUTCHours() >= 15 && date.getUTCHours() < 19) {
				total = +((surcharge + distanceFee) * 1.1).toFixed(2);
			} else {
				total = +(surcharge + distanceFee).toFixed(2);
			}
		} else {
			total = +(surcharge + distanceFee).toFixed(2);
		}
	};

	return (
		<main>
			<form data-testid="form" onSubmit={calcDeliveryFee}>
				<label>
					<span>Cart value (€)</span>
					<input
						type="number"
						id="cart"
						min="0"
						step="0.01"
						alt="input"
						required
					/>
				</label>
				<label>
					<span>Distance (m)</span>
					<input type="number" id="distance" min="0" alt="input" required />
				</label>
				<label>
					<span>Amount of Items</span>
					<input type="number" id="items" min="0" alt="input" required />
				</label>
				<label>
					<span>Time</span>
					<input type="datetime-local" id="date" alt="input" required />
				</label>
				<input
					data-testid="submit"
					type="submit"
					id="submit"
					value="Calculate Delivery Price"
					alt="input"
				/>
			</form>
		</main>
	);
};

export default Form;
