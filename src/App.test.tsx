import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("test if components are rendered", () => {
	test("app, form, header and inputs are in the document", () => {
		render(<App />);
		const formElement: HTMLFormElement = screen.getByTestId("form");
		expect(formElement).toBeInTheDocument();
		const inputs = screen.getAllByAltText("input");
		expect(inputs).toHaveLength(5);
	});

	test("form submit functionality", () => {
		render(<App />);
		const submitButton = screen.getByTestId("submit");
		fireEvent.submit(submitButton);
		expect(submitButton).toHaveValue(0);
	});
});
