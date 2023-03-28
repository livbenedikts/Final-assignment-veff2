<<<<<<< HEAD
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
=======
import * as constants from '../constants';

export default function sessionReducer(state = {}, action) {
    switch (action.type) {
        case constants.ADD_SESSION:
            const { sessionID } = action.payload;
            console.log('sessionID', sessionID);
            localStorage.setItem('s.id', sessionID); // store the session id in local storage, so when we refresh the page, we can still access the session
            return action.payload;
        default: return state;
    }
}
>>>>>>> ab105edfcfe26abb75377a010dd27da70b024b66
