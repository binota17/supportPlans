import AsyncStorage from "@react-native-async-storage/async-storage";



export const storePINCode = async (value) => {
  try {
    console.log(value);
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("PINCode", jsonValue);
  } catch {
    (err) => console.log(err);
  }
};


export const storeData = async (value) => {
  try {
    console.log(value);
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("Notes", jsonValue);
  } catch {
    (err) => console.log(err);
  }
};

export const storeNotification = async (value) => {
  try {
    console.log(value);
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("Notification", jsonValue);
  } catch {
    (err) => console.log(err);
  }
};

export const getPINCode = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("PINCode");
    if (jsonValue) {
      const parsedValue = JSON.parse(jsonValue);
      if (parsedValue && typeof parsedValue === "object") {
        return parsedValue;
      }
    }
  } catch (e) {
    (err) => console.log(err);
  }
};



export const getNotification = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("Notification");
    if (jsonValue) {
      const parsedValue = JSON.parse(jsonValue);
      if (parsedValue && typeof parsedValue === "object") {
        return parsedValue;
      }
    }
  } catch (e) {
    (err) => console.log(err);
  }
};

