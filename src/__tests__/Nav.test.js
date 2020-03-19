import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import Dashboard from '../Components/Dashboard';
import Auth from '../Components/Auth';
import Maps from '../Components/Maps';


it('renders nav', () => {
    const{container} = render(
        <MemoryRouter>
            <Nav />
        </MemoryRouter>,
    ); 
    expect(container.textContent).toContain(text);
});

it('renders footer', () => {
    const{container} = render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>,
    ); 
    expect(container.textContent).toContain(text);
});

it('renders dashboard', () => {
    const{container} = render(
        <MemoryRouter>
            <Dashboard />
        </MemoryRouter>,
    ); 
    expect(container.textContent).toContain(text);
});

it('renders auth', () => {
    const{container} = render(
        <MemoryRouter>
            <Auth />
        </MemoryRouter>,
    ); 
    expect(container.textContent).toContain(text);
});

it('renders maps', () => {
    const{container} = render(
        <MemoryRouter>
            <Maps />
        </MemoryRouter>,
    ); 
    expect(container.textContent).toContain(text);
});
