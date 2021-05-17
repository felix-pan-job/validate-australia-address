import { 
  createAsyncThunk, 
  createDraftSafeSelector, 
  createEntityAdapter, 
  createSlice 
} from '@reduxjs/toolkit';

import { queryAddress } from '../../api/api';

const addressAdapter = createEntityAdapter();

const initialState = addressAdapter.getInitialState({
  query: {
    postcode:'',
    suburb:'',
    state:'',
  },
  status: 'idle',   /* the status could be 'idle' | 'loading' | 'succeeded' | 'failed' */
  error: null
});

export const fetchAddress = createAsyncThunk('address/fetchAddress', async (query, thunkAPI) => {
  const response = await queryAddress(query);
  console.log(response);
  return response;
})

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setQuery(state,action) {
      const query = action.payload;
      state.status = 'idle';
      state.error = null;
      state.query = query;
    },
    setError(state,action) {
      const error = action.payload;
      state.error = error;
    },
    setStatus(state,action) {
      const status = action.payload;
      state.status = status;
    }
  },
  extraReducers: {
    [fetchAddress.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchAddress.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      const addresses = action.payload;
      if(addresses.localities)
      {
        if(addresses.localities.locality.length > 1)
        {
          addressAdapter.setAll(state, addresses.localities.locality);
        } else {
          addressAdapter.setAll(state, addresses.localities);
        }
      } 
    },
    [fetchAddress.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  }
})


export const { setQuery, setError, setStatus } = addressSlice.actions;

export const {
  selectAll: selectAllAddress,
  selectById: selectAddressById,
  selectAllIds: selectAddressIds
} = addressAdapter.getSelectors((state) => state.address)

const selectSelf = state => state.address;
export const selectQuery = createDraftSafeSelector(
  selectSelf,
  state => state.query
);
export const selectFetchAddrStatus = createDraftSafeSelector(
  selectSelf,
  state => state.status
);

export const selectError = createDraftSafeSelector(
  selectSelf,
  state => state.error
);

export default addressSlice.reducer;

