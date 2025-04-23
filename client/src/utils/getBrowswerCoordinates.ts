import { Coordinates } from "../types/coordinates";

const getBrowserCoordinates = (): Promise<Coordinates> => {
  if (!navigator.geolocation) {
    throw new Error("Browser does not support geolocation");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { coords } = position;
        const { latitude, longitude } = coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export default getBrowserCoordinates;
