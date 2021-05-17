import { render, screen, cleanup } from '@testing-library/react';

import ValidateAddressForm from './ValidateAddressForm';

afterEach(cleanup);

test("Render ValidateAddressForm Component", () => {
  render(<ValidateAddressForm />);
  const component = screen.getByText(/Postcode:/i);
  expect(component).toBeInTheDocument();
});