import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import {fireEvent, render, screen} from '@testing-library/react';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import HomePage from '../pages/HomePage/HomePage';

// let container = null;
// beforeEach(() => {
    // container = document.createElement('div');
    // document.body.appendChild(container);
// });

beforeEach(() => {
    // fetch.mockClear();
    fetch.resetMocks();
});

// afterEach(() => {
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
// })

// global.fetch = jest.fn(() => 
//     Promise.resolve(() => {
//         json: Promise.resolve({});
// }));

describe("Sign up form tests", () => {
    test('Places error message over first name when no name is passed', () => {
        render(<SignUpForm />);
        fireEvent.click(screen.getByRole('button', {name:"SIGN UP"}));
        expect(screen.getByTestId("first-name-error").style.display).not.toBe("none");
    });

    test("API mock for submitting only valid values", () => {
        // fetch.mockImplementationOnce(() => Promise.resolve(() => {json: Promise.resolve(ok: true, {user_id: 12344})}));
        fetch.mockResponseOnce(JSON.stringify({status: 200, user_id: 1234}));
        // jest.fn(())
        const mockShowWelcomeModal = jest.fn().mockImplementationOnce((user_id) => {});
        render(<SignUpForm showWelcomeModal={mockShowWelcomeModal}/>);
      
        fireEvent.change(screen.getByTestId("first-name-input"), {target: {value: "Brenden"}})
        fireEvent.change(screen.getByTestId("last-name-input"), {target: {value: "Prieto"}})
        fireEvent.change(screen.getByTestId("email-input"), {target: {value: "bp@gmail.com"}})
        fireEvent.change(screen.getByTestId("password-input"), {target: {value: "12314$@"}})

        fireEvent.click(screen.getByRole('button', {name:"SIGN UP"}));
        
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith("/api/register/newUser?email=bp@gmail.com&pwd=12314$@", {method: "POST"});
    });

    test("That API is not called when an invalid entry is submitted", () => {
        // fetch.mockImplementationOnce(() => Promise.resolve(() => {json: Promise.resolve({user_id: 12344})}));
        fetch.mockResponseOnce(JSON.stringify({user_id: 2314}));
        render(<SignUpForm />);
        fireEvent.change(screen.getByTestId("first-name-input"), {target: {value: "Brenden"}})
        fireEvent.change(screen.getByTestId("last-name-input"), {target: {value: ""}})
        fireEvent.change(screen.getByTestId("email-input"), {target: {value: ""}})
        fireEvent.change(screen.getByTestId("password-input"), {target: {value: "12314$@"}})

        fireEvent.click(screen.getByRole('button', {name:"SIGN UP"}));
        expect(global.fetch).not.toHaveBeenCalled();
    });

    // test("All valid entries in the form shows the sign up modal", () => {
    //     render(<HomePage />, container);
    //     container.querySelector("#first-name-input").value = "Brenden"
    //     container.querySelector("#last-name-input").value = "Prieto"
    //     container.querySelector("#email-input").value = "bp@gmail.com"
    //     container.querySelector("#password-input").value = "12314$@"

    //     fireEvent.click(screen.getByRole('button', {name:"SIGN UP"}));
    //     expect(screen.getByTestId("welcome-modal")).not.toBeNull();
    // })
});