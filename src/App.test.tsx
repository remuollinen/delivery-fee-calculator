import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("test if components are rendered", () => {
	test("app, form, header and inputs are in the document", () => {
		render(<App />);
		const formElement: HTMLFormElement = screen.getByTestId("form");
		expect(formElement).toBeInTheDocument();
		const inputs = screen.getAllByAltText("input");
		expect(inputs).toHaveLength(5);
	});
});
