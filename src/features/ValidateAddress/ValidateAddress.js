import React, { useEffect } from 'react';
import ValidateAddressForm from './ValidateAddressForm';
import { validateResultFunc, MSG_SUCCESS } from './validatefunc';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchAddress, 
  selectAllAddress, 
  selectError, 
  selectFetchAddrStatus, 
  selectQuery, 
  setError
} from './ValidateAddressSlice';

const ValidateAddress = () => {

  const addr = useSelector(selectQuery);
  const status = useSelector(selectFetchAddrStatus);
  const errMsg = useSelector(selectError);
  const results = useSelector(selectAllAddress);

  const dispatch = useDispatch();

  useEffect(() => {
    if(status === "idle" && addr.postcode && addr.suburb && addr.state) {
        dispatch(fetchAddress(addr));
      }
  }, [addr, status, dispatch]);

  useEffect(() => {
    if(errMsg) {
      dispatch(setError(errMsg));
    } else if(status === "succeeded") {
      let result = validateResultFunc(addr, results);
      if(!result) {
        //found the validate address and use setError to set message and update UI to keep it simple
        result = MSG_SUCCESS;
      } 
      dispatch(setError(result));
    }  
  }, [status, addr, results, dispatch, errMsg]);


  return (
    <ValidateAddressForm />
  )
}

export default ValidateAddress;
