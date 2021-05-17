import { DEBUG } from "../App";
import { Validator } from "./validator";
import {
  isNonEmpty,
  isNumber,
  isPostcodeMatchSuburb,
  isSuburbMatchState,
  ERR_POSTCODE_EMPTY,
  ERR_SUBURB_EMPTY,
  ERR_STATE_EMPTY,
  ERR_POSTCODE_NOT_4DIGIT,
  ERR_POSTCODE_NOT_MATCH_SUBURB,
  ERR_SUBURB_NOT_MATCH_STATE
} from "../features/ValidateAddress/validatefunc";

const validateFunc = (addr, objects) => {
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

  validator.add(addr, [{
    strategy: isPostcodeMatchSuburb,
    args:objects,
    errorMsg: ERR_POSTCODE_NOT_MATCH_SUBURB
  }, {
    strategy: isSuburbMatchState,
    args:objects,
    errorMsg: ERR_SUBURB_NOT_MATCH_STATE
  }]);

  var errorMsg = validator.start();
  return errorMsg;
}

test("Validator validation function postcode is empty", () => {
  const addr = {
    postcode: '',
    suburb: "Carlingford",
    state: "NSW"
  };
  const objects = [
    {
      "category": "Delivery Area",
      "id": 740,
      "latitude": -33.77564385,
      "location": "CARLINGFORD",
      "longitude": 151.0453192,
      "postcode": 2118,
      "state": "NSW"
    }
  ];
 
  const errorMsg = validateFunc(addr, objects);
  expect(errorMsg).toBe(ERR_POSTCODE_EMPTY);
});


test("Validator validation function postcode is not 4 digits", () => {
  const addr = {
    postcode: 211,
    suburb: "Carlingford",
    state: "NSW"
  };
  const objects = [
    {
      "category": "Delivery Area",
      "id": 740,
      "latitude": -33.77564385,
      "location": "CARLINGFORD",
      "longitude": 151.0453192,
      "postcode": 2118,
      "state": "NSW"
    }
  ];

  const errorMsg = validateFunc(addr, objects);
  expect(errorMsg).toBe(ERR_POSTCODE_NOT_4DIGIT);
});

test("Validator validation function suburb is empty", () => {
  
  const addr = {
    postcode: 2118,
    suburb: "",
    state: "NSW"
  };
  const objects = [
    {
      "category": "Delivery Area",
      "id": 740,
      "latitude": -33.77564385,
      "location": "CARLINGFORD",
      "longitude": 151.0453192,
      "postcode": 2118,
      "state": "NSW"
    }
  ];

  const errorMsg = validateFunc(addr, objects);
  expect(errorMsg).toBe(ERR_SUBURB_EMPTY);
});

test("Validator validation function state is empty", () => {
  const addr = {
    postcode: 2118,
    suburb: "Carlingford",
    state: ""
  };
  const objects = [
    {
      "category": "Delivery Area",
      "id": 740,
      "latitude": -33.77564385,
      "location": "CARLINGFORD",
      "longitude": 151.0453192,
      "postcode": 2118,
      "state": "NSW"
    }
  ];

  const errorMsg = validateFunc(addr, objects);
  expect(errorMsg).toBe(ERR_STATE_EMPTY);
});

test("Validator validation function postcode doesn't match suburb", () => {
  const addr = {
    postcode: 2118,
    suburb: "Carlingford",
    state: "NSW"
  };
  const objects = [
    {
      "category": "Delivery Area",
      "id": 740,
      "latitude": -33.77564385,
      "location": "CARLINGFORD EAST",
      "longitude": 151.0453192,
      "postcode": 2118,
      "state": "NSW"
    },
    {
      "category": "Delivery Area",
      "id": 741,
      "latitude": -33.776725,
      "location": "CARLINGFORD COURT",
      "longitude": 151.056382,
      "postcode": 2118,
      "state": "NSW"
    },
    {
      "category": "Delivery Area",
      "id": 742,
      "latitude": -33.763237,
      "location": "CARLINGFORD NORTH",
      "longitude": 151.047719,
      "postcode": 2118,
      "state": "NSW"
    }
  ];

  const errorMsg = validateFunc(addr, objects);
  expect(errorMsg).toBe(ERR_POSTCODE_NOT_MATCH_SUBURB);
});

test("Validator validation function suburb doesn't match state", () => {
  const addr = {
    postcode: 2118,
    suburb: "Carlingford",
    state: "NSW"
  };
  const objects = [
    {
      "category": "Delivery Area",
      "id": 740,
      "latitude": -33.77564385,
      "location": "CARLINGFORD EAST",
      "longitude": 151.0453192,
      "postcode": 2118,
      "state": "NSWg"
    },
    {
      "category": "Delivery Area",
      "id": 741,
      "latitude": -33.776725,
      "location": "CARLINGFORD COURT",
      "longitude": 151.056382,
      "postcode": 2118,
      "state": "NSWsf"
    },
    {
      "category": "Delivery Area",
      "id": 742,
      "latitude": -33.763237,
      "location": "CARLINGFORD",
      "longitude": 151.047719,
      "postcode": 2118,
      "state": "VIC"
    }
  ];

  const errorMsg = validateFunc(addr, objects);
  expect(errorMsg).toBe(ERR_SUBURB_NOT_MATCH_STATE);
});

test("Validator validation function working normal", () => {
  const addr = {
    postcode: 2118,
    suburb: "Carlingford NORTH",
    state: "NSW"
  };
  const objects = [
    {
      "category": "Delivery Area",
      "id": 740,
      "latitude": -33.77564385,
      "location": "CARLINGFORD",
      "longitude": 151.0453192,
      "postcode": 2118,
      "state": "NSW"
    },
    {
      "category": "Delivery Area",
      "id": 741,
      "latitude": -33.776725,
      "location": "CARLINGFORD COURT",
      "longitude": 151.056382,
      "postcode": 2118,
      "state": "NSW"
    },
    {
      "category": "Delivery Area",
      "id": 742,
      "latitude": -33.763237,
      "location": "CARLINGFORD NORTH",
      "longitude": 151.047719,
      "postcode": 2118,
      "state": "NSW"
    }
  ];

  const errorMsg = validateFunc(addr, objects);
  expect(errorMsg).toBeUndefined();
});
