import { queryAddress } from "./api";
import { DEBUG } from '../app';

import { cleanup } from '@testing-library/react';

afterEach(cleanup);

/* To pass the testing, the authroziation header for CORS in the api.js need to be removed */

test("API test- queryAddress", async () => {
  const addr = {
    postcode: 2122,
    suburb: 'EASTWOOD',
    state:'NSW'
  };

  const data = await queryAddress(addr);
  if(true) console.log(data);

  const expected = {
    postcode: data.localities.locality.postcode,
    suburb: data.localities.locality.location,
    state: data.localities.locality.state
  };
  expect(expected).toEqual(addr);
});
