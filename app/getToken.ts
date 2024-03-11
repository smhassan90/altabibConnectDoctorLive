import * as SecureStore from 'expo-secure-store';

export const tokenCache = {
  async getToken() {
    try {
      return SecureStore.getItem("token");
    } catch (e) {
      console.log('TOKEN CACHE GET ERROR: ', e);
    }
  },
  async setToken(value: string) {
    try {
      return SecureStore.setItem("token", value);
    } catch (e) {
      console.log('TOKEN CACHE SET ERROR: ', e);
    }
  },
  async deleteToken() {
    try {
      return await SecureStore.deleteItemAsync("token");
    } catch (e) {
      console.log('TOKEN CACHE DELETE ERROR: ', e);
    }
  },
};

export const appointmentData = {
  async getAppointmentId(key: string) {
    try {
      const result = await SecureStore.getItemAsync(key);
      return parseInt(result || '0');
    } catch (e) {
      console.log('APPOINTMENT ID GET ERROR: ', e);
    }
  },
  async setAppointmentId(key: string, value: string) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.log('APPOINTMENT ID SET ERROR: ', e);
    }
  },
  async deleteAppointmentId(key: string) {
    try {
      return await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.log('APPOINTMENT ID DELETE ERROR: ', e);
    }
  },
};

export const clinicData = {
  async getClinicId(key: string) {
    try {
      const result = await SecureStore.getItemAsync(key);
      return parseInt(result || '0');
    } catch (e) {
      console.log('CLINIC ID GET ERROR: ', e);
    }
  },
  async setClinicId(key: string, value:string) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.log('CLINIC ID SET ERROR: ', e);
    }
  },
  async deleteClinicId(key: string) {
    try {
      return await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.log('CLINIC ID DELETE ERROR: ', e);
    }
  },
};
