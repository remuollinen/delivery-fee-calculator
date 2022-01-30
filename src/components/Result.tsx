import React from "react";

const Result = ({ deliveryFee }: { deliveryFee: number }) => {
	return (
		<div className="result-area">
			<h2>Delivery price is:</h2>
			<h3>{deliveryFee} €</h3>
		</div>
	);
};

export default Result;
