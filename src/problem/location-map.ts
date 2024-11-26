import {Location} from "./location";

export const locationMap: Record<Location, Map<Location, number>> = {
    [Location.London]: new Map([[Location.Paris, 150],[Location.Berlin, 200]]),
    [Location.Paris]: new Map([[Location.London, 150],[Location.Berlin, 100],[Location.Rome, 120]]),
    [Location.Berlin]: new Map([[Location.London, 200],[Location.Paris, 100],[Location.Vienna, 100]]),
    [Location.Rome]: new Map([[Location.Vienna, 90],[Location.Paris, 120]]),
    [Location.Vienna]: new Map([[Location.Berlin, 100],[Location.Rome, 90],[Location.Budapest, 60]]),
    [Location.Bucharest]: new Map([[Location.Budapest, 70],[Location.Istanbul, 200]]),
    [Location.Budapest]: new Map([[Location.Vienna, 60],[Location.Bucharest, 70]]),
    [Location.Istanbul]: new Map([[Location.Bucharest, 200]]),
    [Location.Mars]: new Map([]),
}