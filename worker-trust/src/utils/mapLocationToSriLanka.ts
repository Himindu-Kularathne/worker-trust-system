import { SRI_LANKA_PROVINCES } from "@/src/constants/sriLankaLocations";

export function mapSriLankaLocation(
  provinceName?: string,
  districtName?: string,
  cityName?: string
) {
  for (const p of SRI_LANKA_PROVINCES) {
    if (p.name.toLowerCase() === provinceName?.toLowerCase()) {
      for (const d of p.districts) {
        if (d.name.toLowerCase() === districtName?.toLowerCase()) {
          for (const c of d.cities) {
            if (c.name.toLowerCase() === cityName?.toLowerCase()) {
              return { province: p.id, district: d.id, city: c.id };
            }
          }
          return { province: p.id, district: d.id };
        }
      }
      return { province: p.id };
    }
  }
  return {};
}
