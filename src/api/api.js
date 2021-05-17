import axios from 'axios';

import { DEBUG } from '../App';

(async () => {
  
  //Use interceptors to add the authorization header automatically for each request
  axios.interceptors.request.use((config) => {
    config.headers = {
      "AUTH-KEY": process.env.REACT_APP_API_KEY,
      "Access-Control-Allow-Origin": "*",
      "Accept": "application/json",
      "Access-Control-Allow-Headers":"Origin"
    };
    
    if (DEBUG) { console.info("✉️ ", config); }

    return config;
  }, (error) => {
    
    if (DEBUG) { console.error("✉️ ", error); }
    
    return Promise.reject(error);
  });

})();


/*********************
 * example for the API request
 * GET https://digitalapi.auspost.com.au/postcode/search.json?q=2118&state=
 * 
 *   * "params": {
 *     "q": "Carlingford",
 *     "state": ""        //optional filter
 *     },
 *     "headers": {
 *     "AUTH-KEY": "872608e3-4530-4c6a-a369-052accb03ca8",
 *     "Accept": "application/json"
 *     }
 * 
*/
export const queryAddress = async (addr, url = process.env.REACT_APP_URL) => {
  try {
    
    const config = { 
      params: {
        "q": addr.suburb,
        "state":addr.state
      },
      redirect: 'follow'
    }; 

    const res = await axios.get(url,config);
    console.log(res);
    if(res && res.data) {
      return res.data;
    }
    if(DEBUG) { console.error("✉️ ", "This should not happen!!!"); }
  } catch(error) {
    if(DEBUG) { console.error("✉️ ", error); }
    throw new Error(error);
  }
};
