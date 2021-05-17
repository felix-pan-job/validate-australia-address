import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectFetchAddrStatus, setQuery } from './ValidateAddressSlice';
import { validateInputFunc } from './validatefunc';

const ValidateAddressForm = () => {
  const [postcode, setPostcode] = useState('');
  const [suburb, setSuburb] = useState('');
  const [ausState, setAusState] = useState('');
  const [error ,setError] = useState('');

  const dispatch = useDispatch();
  let errMsg = useSelector(selectError);
  const status = useSelector(selectFetchAddrStatus);

  const handlePostcodeChange = e => {
    setPostcode(Number(e.target.value.trim()));
  };

  const handleSuburbChange = e => {
    setSuburb(e.target.value.trim());
  };

  const handleStateChange = e => {
    setAusState(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = {
      postcode: postcode,
      suburb: suburb,
      state: ausState
    };
    
    const errMsg = validateInputFunc(query, {});
    if(errMsg) {
      setError(errMsg);
    } else {
      setError('');
      dispatch(setQuery(query));
    }
  };

  let content;
  if(status === 'loading') {
    content = <div className='result'>Loading...</div>;
  } else if (status === "succeeded") {
    content =  <div className="result">{errMsg}</div>
  } else if (errMsg) {
    alert(status);
    content =  <div className="errMsg">{errMsg}</div>
  } else {
    content =  <div className="errMsg">{error}</div>
  }

  return (
    <div>
    <form className="form-horizontal">
        <h4 className="form-title text-center">Validate Australia Address</h4>
        <div className="form-group">
            <label className="control-label col-sm-4" htmlFor="postcode">Postcode:</label>
            <div className="col-sm-12">
              <input type="text" id="postcode" className="form-control w-100" 
                  placeholder="Please input 4 digit postcode number"
                  value={postcode === 0 ?'':postcode} onChange={handlePostcodeChange}
              />
            </div>
        </div>    
        <div className="form-group">
            <label className="control-label col-sm-4" htmlFor='suburb'>Suburb:</label>
            <div className="col-sm-12">
              <input type="text" id="suburb" className="form-control w-100" 
                  placeholder="please input suburb"
                  value={suburb} onChange={handleSuburbChange}
              />
            </div> 
        </div>
        <div className="form-group">
            <label className="control-label col-sm-4" htmlFor='ausState'>State:</label>
            <div className="col-sm-12">
              <input type="text" id="ausState" className="form-control w-100" 
                  placeholder="please input state"
                  value={ausState} onChange={handleStateChange}
              />
            </div>
        </div> 
        <div className="form-group">
          <div className="col-sm-12 text-center">
            <button type="submit" className='btn btn-primary' onClick={handleSubmit}>Search</button>
          </div>
        </div>
        <div className="form-group">
        <div className="col-sm-12">
          <hr />
          {content}
        </div>
        </div>  
    </form>
    </div>
  )
}

export default React.memo(ValidateAddressForm);
