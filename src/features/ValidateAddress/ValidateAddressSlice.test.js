import {cleanup} from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import { fetchAddress, setQuery, setError } from "./ValidateAddressSlice";

//const mockStore = configureMockStore([thunk, promiseMiddleware()]);
const initState = ({
  query: {
    postcode:'',
    suburb:'',
    state:'',
  },
  status: 'idle',   /* the status could be 'idle' | 'loading' | 'succeeded' | 'failed' */
  error: null
});

describe("ValidateAddressSlice Actions", () => {
  /*
  let store;

  beforeEach(() => {
    store = mockStore({
      address: {}
    })
  });
*/
 
  afterEach(cleanup);

  //1. Test the syncrhonized actions
  test("ValidateAddressSlice setQuery", () => {
    const newState = {
      query: {
        postcode:2118,
        suburb:'carlingford',
        state:'NSW',
      },
      status: 'idle',   /* the status could be 'idle' | 'loading' | 'succeeded' | 'failed' */
      error: null
    };
    const action = {
      type: 'address/setQuery',
      payload: {
        query: {
          postcode:2118,
          suburb:'carlingford',
          state:'NSW',
        }
      }
    };
    const state = initState;

    const ret = setQuery(state, action);

    expect(ret).toEqual(newState); 
  });

  test("ValidateAddressSlice setError", () => {
    const newState = {
      query: {
        postcode:'',
        suburb:'',
        state:'',
      },
      status: 'idle',   /* the status could be 'idle' | 'loading' | 'succeeded' | 'failed' */
      error: 'empty'
    };
    const action = {
      type: 'address/setError',
      payload: {
        query: {
          postcode:'',
          suburb:'',
          state:'',
        }
      }
    };
    const state = initState;

    const ret = setError(state, action);

    expect(ret).toEqual(newState); 
  });

  //2. Test the Async actions
  test("ValidateAddressSlice fetchAddress", () => {
//TODO
    expect(1).toEqual(1);
  });

});


describe("ValidateAddressSlice Reducer", () => {
 /*
  let store;

  beforeEach(() => {
    store = mockStore({
      address: {}
    });
  });

  afterEach(cleanup);
*/
  //1. Test the initial state
  test("ValidateAddressSlice initialState", () => {
//TODO
expect(1).toEqual(1);

  });


  //2. Test the Async actions
  test("ValidateAddressSlice fetchAddress", () => {
//TODO
expect(1).toEqual(1);

  });

});

describe("ValidateAddressSlice Selectors", () => {
  /*
  let store;

  beforeEach(() => {
    store = mockStore({
      address: {}
    });
  });

  afterEach(cleanup);
*/
  test("ValidateAddressSlice selectAllAddress", () => {
//TODO
expect(1).toEqual(1);

  });

  test("ValidateAddressSlice selectAddressById", () => {
//TODO
expect(1).toEqual(1);

  });

  test("ValidateAddressSlice selectAddressIds", () => {
//TODO
expect(1).toEqual(1);

  });


  test("ValidateAddressSlice selectQuery", () => {
//TODO
expect(1).toEqual(1);

  });
  
  test("ValidateAddressSlice selectFetchAddrStatus", () => {
//TODO
expect(1).toEqual(1);

  });
  
  test("ValidateAddressSlice selectError", () => {
//TODO
expect(1).toEqual(1);

  });
  
});