// actions.js
export const SELECT_PATIENT = 'SELECT_PATIENT';
export const SELECT_PATIENT_ID = 'SELECT_PATIENT_ID';

export const selectPatient = (patient: any) => ({
  type: SELECT_PATIENT,
  payload: patient,
});

export const selectPatientId = (patient: any) => ({
  type: SELECT_PATIENT_ID,
  payload: patient,
});
