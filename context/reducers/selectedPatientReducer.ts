// reducers.js
import { SELECT_PATIENT } from '../actions/selectedPatientAction';

const initialState = {
  selectedPatient: null,
};

const selectedPatient = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PATIENT:
      return {
        ...state,
        selectedPatient: action.payload,
      };
    default:
      return state;
  }
};

export default selectedPatient;
