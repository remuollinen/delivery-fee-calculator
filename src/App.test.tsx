/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import Form from "./components/Form";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Result from "./components/Result";
import { act } from "react-dom/test-utils";

test("components render correctly", () => {
	render(<App />);
	render(<Header />);
	render(<Footer />);
	render(<Form getCalcData={function (data: number): void {}} />);
	render(<Result deliveryFee={0} />);
});

test("submitting form with values 5 as cart value, 1499 as distance and 5 as amount of items (without date input)", async () => {
	const mockOnSubmit = jest.fn();
	render(<Form getCalcData={mockOnSubmit} />);

	const cart = screen.getByTestId("cart") as HTMLInputElement;
	const distance = screen.getByTestId("distance") as HTMLInputElement;
	const items = screen.getByTestId("items") as HTMLInputElement;
	const date = screen.getByTestId("date") as HTMLInputElement;

	// eslint-disable-next-line testing-library/no-unnecessary-act
	await act(async () => {
		fireEvent.change(cart, { target: { value: 5 } });
		expect(cart.value).toBe("5");

		fireEvent.change(distance, {
			target: { value: 1499 },
		});
		expect(distance.value).toBe("1499");

		fireEvent.change(items, { target: { value: 5 } });
		expect(items.value).toBe("5");

		fireEvent.change(date, { target: { value: "" } });
	});

	await act(async () => {
		const submitButton = screen.getByTestId("submit");
		fireEvent.click(submitButton);
		console.log("submitted!!!");
	});

	expect(mockOnSubmit).toHaveBeenCalledWith(8.5);
});
