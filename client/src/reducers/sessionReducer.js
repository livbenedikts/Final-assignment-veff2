import * as constants from "../constants";

export default function sessionReducer(
  state = {
    username: "",
  },
  action
) {
  switch (action.type) {
    case constants.ADD_SESSION:
      const username = action.payload;
      return {
        username,
      };
    default:
      return state;
  }
}
