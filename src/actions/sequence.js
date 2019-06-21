import axios from "axios";
import actionTypes from "../actionTypes";
import api from "../config/api";

export const sequence = data => dispatch => {
  const { height, width, length, limitedwt } = data || {};
  axios
    .post(`${api.fleetApi}/2/findsequence.json`, null, {
      params: {
        app_id: "LgSX5H49ey4TlUS7lCkP",
        app_code: "xRmuALQVNJKr_-_5Byrrmg",
        start: "Hotel;-36.8414,174.76474",
        destination1: "VoyagerNewZealandMaritimeMuseum;-36.84234,174.76315",
        destination2: "FerryBuilding;-36.84314,174.76681",
        destination3: "AucklandTownHall;-36.85248,174.76362",
        destination4: "SkyTower;-36.84827,174.76223",
        destination5: "OldGovernmentHouse;-36.849635,174.770146",
        destination6: "ClockTower;-36.85015,174.76912",
        destination7: "AucklandArtGallery;-36.851082,174.765274",
        destination8: "AlbertPark;-36.85057,174.76792",
        destination9: "AucklandHarbourBridge;-36.83908,174.74169",
        improveFor: "time",
        height,
        width,
        length,
        limitedWeight: limitedwt,
        mode: "fastest;pedestrian"
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
