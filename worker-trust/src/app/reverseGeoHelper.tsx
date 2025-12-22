export async function extractAddressFromCoords(lat: number, lng: number) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );

  const json = await res.json();

  // ✅ GUARD 1: API-level failure
  if (json.status !== "OK" || !json.results || json.results.length === 0) {
    console.warn("Geocoding failed:", json.status, json.error_message);
    return {
      province: "",
      district: "",
      city: "",
    };
  }

  const components = json.results[0].address_components;
  // ✅ GUARD 2: Missing components
  if (!components) {
    return {
      province: "",
      district: "",
      city: "",
    };
  }

  const get = (type: string) => components.find((c: any) => c.types.includes(type))?.long_name ?? "";

  return {
    province: get("administrative_area_level_1"),
    district: get("administrative_area_level_2"),
    city: get("locality") || get("administrative_area_level_3"),
  };
}
