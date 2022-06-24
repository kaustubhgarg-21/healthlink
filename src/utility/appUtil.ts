import axios from "axios";
import { Country } from "country-state-city";
import storage from "redux-persist/lib/storage";
import { LocalStorageKeys } from "../web/constants/enums";

export const getHeight = (classname : string) => {
    const node = document.querySelector<any>(classname);
    if( node !== null|| node !== undefined)
    {
      const screenHeight = document.body?.clientHeight;
      const remainingHeight = screenHeight-node?.getBoundingClientRect().y;
      return remainingHeight
    }
    return 0;
  }

export const replaceAll = (
  searchRegExp: RegExp,
  baseText: string,
  replacement: string
): string => {
  const result = baseText.replace(searchRegExp, replacement);
  return result;
};
export const getCountriesList = () => {
  return Country.getAllCountries().map((country: any) => {
      return {
          text: country.name,
          value: country.isoCode
      };
  });
};

export const concatNames = (firstName: string = "", lastName: string = "", middleName?: string, title?: string) => {
  let name = "";
  if(title){
    name = title.trim();
    if (firstName) {
      name = `${name} ${firstName}`.trim();
    }
    if (middleName) {
      name = `${name} ${middleName}`.trim();
    }
    if (lastName) {
      name = `${name} ${lastName}`.trim();
    }
  }
  else if (firstName) {
    name = firstName.trim();

    if (middleName) {
      name = `${name} ${middleName}`.trim();
    }

    if (lastName) {
      name = `${name} ${lastName}`.trim();
    }
  } else if (middleName) {
    name = middleName.trim();

    if (lastName) {
      name = `${name} ${lastName}`.trim();
    }
  } else if (lastName) {
    name = lastName.trim();
  }
  return name.trim();
};

export const getAccessToken = () => {
  const token = window.localStorage.getItem(LocalStorageKeys.ACC_TOKEN)
  return token;
}

export const getIdToken = () => {
  const token = window.localStorage.getItem(LocalStorageKeys.ID_TOKEN)
  return token;
}

export const getRefreshToken = () => {
  const token = window.localStorage.getItem(LocalStorageKeys.REF_TOKEN)
  return token;
}

export const getIPAddress = () => {
  const ip = window.localStorage.getItem(LocalStorageKeys.IP)
  return ip
}

export const getLastActivity = () => {
  const lastActive = window.localStorage.getItem(LocalStorageKeys.LAST_ACTIVE)
  return lastActive
}

export const getData = async()=>{
  const endpoint = 'https://geolocation-db.com/json/'
  const res = await axios.get(endpoint)
  // console.log(res.data);
  return Promise.resolve(res?.data?.IPv4)
}
export async function clearLocalStorage() {
  storage.removeItem('@@appStateStores/STATE')
  localStorage.clear()
}
export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
  });
};