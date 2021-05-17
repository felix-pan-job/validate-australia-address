import { configureStore } from '@reduxjs/toolkit';
import addressReducer from '../features/ValidateAddress/ValidateAddressSlice';


export default configureStore({
  reducer: {
    address: addressReducer
  }
})