import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';
const setAlert = (msg, alertType) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};

export default setAlert;
