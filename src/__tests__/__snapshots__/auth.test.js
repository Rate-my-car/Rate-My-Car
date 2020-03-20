import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import Dashboard from '../Components/Dashboard';
import Auth from '../Components/Auth';
import Maps from '../Components/Maps';
import { text } from '@fortawesome/fontawesome-svg-core';


it('logs in with correct user and password', () => {
    const {constainer} = render(
        <MemoryRouter>
            <Dashboard/>
        </MemoryRouter>,
    );
    expect(container.textContent).toContain(text);
});

it('Register new user', () => {
    const {container} = render(
        <MemoryRouter>
            <Dashboard/>
        </MemoryRouter>,
    );
    expect(container.textContent).toContain(text);
})