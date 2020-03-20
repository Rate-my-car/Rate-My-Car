import React from 'react'
import {render} from '@testing-library/react'
import InvVehicle from '../Components/InvVehicle'
import Services from '../Components/Services'
import {MemoryRouter} from 'react-router-dom'
import ServiceForm from '../Components/ServiceForm'
import Profile from '../Components/Profile'

it('Renders a vehicle', () => {
    const { container } = render(
      <MemoryRouter>
        <InvVehicle />
      </MemoryRouter>,
    );
    expect(container.textContent).toContain(text);
});

it('Renders a service form', () => {
    const { container } = render(
      <MemoryRouter>
        <ServiceForm id={2} />
      </MemoryRouter>,
    );
    expect(container.textContent).toContain(text);
});

it('Renders a service', () => {
    const { container } = render(
      <MemoryRouter>
        <Services id={1} />
      </MemoryRouter>,
    );
    expect(container.textContent).toContain(text);
});

it('Renders out an ownership table', () => {
    const { container } = render(
      <MemoryRouter>
        <Ownership id={1} />
      </MemoryRouter>,
    );
    expect(container.textContent).toContain(text);
});

it('Renders out a Profile', () => {
    const { container } = render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );
    expect(container.textContent).toContain(text);
});

it('Routes to details', () => {
  const {container} = render(
    <MemoryRouter>
      <InvVehicle/>>
    </MemoryRouter>,
  );
  expect(container.textContent).toContain(text);
})