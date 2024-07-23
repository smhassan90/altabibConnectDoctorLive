// actions.js
export const SELECT_PATIENT = 'SELECT_PATIENT';

export const selectPatient = (patient: any) => ({
  type: SELECT_PATIENT,
  payload: patient,
});
