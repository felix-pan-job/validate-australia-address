
export const strategies = {
  isNonEmpty: (value, objects, errorMsg) => {
    if ( value === '' ){
      return errorMsg;
    }
  },
  isNumber: (value, objects, errorMsg ) => {
      if ( !/(^[0-9]{4}$)/.test( value )) {
        return errorMsg;
      }
  },
  isPostcodeMatchSuburb: (value, objects, errorMsg) => {
    for(let i=0; i < objects.length; i++)
    {
      if(value.postcode === objects[i].postcode 
        && value.suburb.toUpperCase() === objects[i].location.toUpperCase()) {
        return;
      }
    }
    return errorMsg;
  },
  isSuburbMatchState: (value, objects, errorMsg) => {
    for(let i=0; i < objects.length; i++)
    {
      if(value.postcode === objects[i].postcode 
        && value.suburb.toUpperCase() === objects[i].location.toUpperCase()
        && value.state.toUpperCase() === objects[i].state.toUpperCase()) {
        return;
      }
    }
    return errorMsg;
  }
};