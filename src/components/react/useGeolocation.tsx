import { useEffect, useState } from "react";

async function getCoords(
  navigator: Navigator
): Promise<GeolocationCoordinates | undefined> {
  console.log("navigator", navigator);
  const permission = await navigator.permissions.query({ name: "geolocation" });
  console.log("permission", permission);
  if (permission.state === "granted") {
    console.log("oh yeah its geolocation time ", navigator.geolocation);
    const position: GeolocationPosition = await new Promise(
      async (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
        });
      }
    );
    return position.coords;
  } else if (permission.state === "prompt") {
    console.log("prompting for geolocation");
  } else {
    console.error("no geolocation for you");
    return;
  }
}

export const useGeolocation = (): GeolocationCoordinates | null => {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
  const navigator = window.navigator;

  useEffect(() => {
    const asyncUseEffect = async () => {
      const coords = await getCoords(navigator);
      if (coords) {
        setCoords(coords);
      }
    };
    asyncUseEffect();
  });

  return coords;
};
