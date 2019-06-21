import actionTypes from "../actionTypes";

const INITIAL_STATE = {
  waypoints: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.GET_SEQUENCE_DATA: {
      const { results } = action.payload;
      const { waypoints } = results[0];
      console.log("waypoit", waypoints);
      const params = waypoints.map((item, id) => ({
        [`waypoint${id}`]: `${item.lat}, ${item.lng}`
      }));
      console.log("param", params);
      return {
        ...state,
        waypoints
      };
    }

    default:
      return state;
  }
}
