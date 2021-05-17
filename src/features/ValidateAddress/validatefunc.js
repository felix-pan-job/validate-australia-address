
import { Validator } from "../../utils/validator";

export const isNonEmpty = "isNonEmpty";
export const ERR_POSTCODE_EMPTY = "Postcode can't be empty!";
export const ERR_SUBURB_EMPTY = "Suburb shouldn't be empty!";
export const ERR_STATE_EMPTY = "State shouldn't be empty!";

export const isNumber = "isNumber";
export const ERR_POSTCODE_NOT_4DIGIT = "Postcode should be 4 digits!";

export const isPostcodeMatchSuburb = "isPostcodeMatchSuburb";
export const ERR_POSTCODE_NOT_MATCH_SUBURB = "Postcode doesn't match Suburb";

export const isSuburbMatchState ="isSuburbMatchState";
export const ERR_SUBURB_NOT_MATCH_STATE = "Suburb doesn't match State";

export const MSG_SUCCESS = "The postcode, suburb and state entered are valid";

export const validateInputFunc = (addr, objects) => {
  
  if(!addr) return;

  const validator = new Validator();
  validator.add( addr.postcode, [{
    strategy: isNonEmpty,
    args:objects,
    errorMsg: ERR_POSTCODE_EMPTY
  }, {
    strategy: isNumber,
    args:objects,
    errorMsg: ERR_POSTCODE_NOT_4DIGIT
  }]);
  
  validator.add(addr.suburb, [{
    strategy: isNonEmpty,
    args:objects,
    errorMsg: ERR_SUBURB_EMPTY
  }]);

  validator.add(addr.state, [{
    strategy: isNonEmpty,
    args:objects,
    errorMsg: ERR_STATE_EMPTY
  }]);

  var errorMsg = validator.start();
  return errorMsg;
};

export const validateResultFunc = (addr, objects) => {
  const validator = new Validator();
  
  validator.add(addr, [{
    strategy: isPostcodeMatchSuburb,
    args:objects,
    errorMsg: `The postcode ${addr.postcode} does not match the suburb ${addr.suburb}`
  }, {
    strategy: isSuburbMatchState,
    args:objects,
    errorMsg: `The suburb ${addr.suburb} does not exist in the state ${addr.state}`
  }]);

  let errorMsg = validator.start();
  return errorMsg;
};
