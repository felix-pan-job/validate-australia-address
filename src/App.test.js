import { render, screen, cleanup } from '@testing-library/react';

import App from './App';

afterEach(cleanup);

test('renders App endpoint', () => {
  render(<App />);
  const app = screen.getByText(/Validate Australia Address/i);
  expect(app).toBeInTheDocument();
});
