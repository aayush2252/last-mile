import axios from "axios";
import actionTypes from "../actionTypes";
import api from "../config/api";

export const sequence = data => dispatch => {
  const { height, width, length, limitedwt, improveFor, vehicle } = data || {};
  console.log("dasau", data);
  axios
    .post(`${api.fleetApi}/2/findsequence.json`, null, {
      params: {
        app_id: "LgSX5H49ey4TlUS7lCkP",
        app_code: "xRmuALQVNJKr_-_5Byrrmg",
        start: "RcpGhansoliLatitude; 19.126856,73.004379",
        destination1: "RamadaNaviMumbai;19.1243057,73.0035507",
        destination2: "ThaneStation(W);19.1867685,72.9750417",
        destination3: "McDonald's;19.1877466,72.972719",
        destination4: "ShriDurgaSnacks;19.1871391,72.9685715",
        destination5: "LalaTulsiramUdyan.;19.1759002,72.9452778",
        destination6: "FortisHiranandaniHospital;19.1421305,72.9667101",
        destination7: "shivShankarTemple;19.2638124,73.1121202",
        destination8: "DAMANIREALMSERVICESPVT.LTD.Taloja;19.1445261,73.1316009",
        destination9: "CountryInn&SuitesbyRadissonNaviMumbai;19.1243057,73.0035507",
        improveFor,
        // height,
        // width,
        // length,
        // limitedWeight: limitedwt,
        mode: `fastest;${vehicle}`
      }
    })
    .then(res => {
      console.log("response seq api", res);
      if (res.status === 200)
        dispatch({
          type: actionTypes.GET_SEQUENCE_DATA,
          payload: res.data
        });
      else
        dispatch({
          type: actionTypes.GET_SEQUENCE_DATA_ERROR,
          payload: res.data
        });
    })
    .catch(err =>
      dispatch({
        type: actionTypes.GET_SEQUENCE_DATA_ERROR,
        payload: err
      })
    );
};
