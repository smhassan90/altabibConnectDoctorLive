// reducers.js
import { SELECT_PATIENT_ID } from '../actions/selectedPatientAction';

const initialState = {
  selectedPatientId: "",
};

const selectedPatientId = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PATIENT_ID:
      return {
        ...state,
        selectedPatientId: action.payload,
      };
    default:
      return state;
  }
};

export default selectedPatientId;
