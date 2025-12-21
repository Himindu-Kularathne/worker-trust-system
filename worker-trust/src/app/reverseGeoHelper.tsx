export const extractAddressFromCoords = async (lat: number, lng: number) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );

  const json = await res.json();
  const components = json.results[0].address_components;

  const get = (type: string) => components.find((c: any) => c.types.includes(type))?.long_name ?? "";

  return {
    province: get("administrative_area_level_1"),
    district: get("administrative_area_level_2"),
    city: get("locality") || get("administrative_area_level_3"),
  };
};
