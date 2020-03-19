import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import '../Components/Nav';

it('renders nav'), () => {
    const{container} = render(
        <MemoryRouter>
            <Nav />
        </MemoryRouter>
    ) 
    expect(container.textContent).toContain(text)
}


footer
dashboard
auth
maps