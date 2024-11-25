import {Location} from "./location";

export const locationMap: Record<Location, Location[]> = {
    [Location.London]: [Location.Paris, Location.Berlin],
    [Location.Paris]: [Location.London, Location.Berlin, Location.Rome],
    [Location.Berlin]: [Location.London, Location.Paris, Location.Vienna],
    [Location.Rome]: [Location.Paris, Location.Vienna, Location.Bucharest],
    [Location.Vienna]: [Location.Berlin, Location.Rome, Location.Budapest],
    [Location.Bucharest]: [Location.Rome, Location.Istanbul],
    [Location.Budapest]: [Location.Vienna, Location.Istanbul],
    [Location.Istanbul]: [Location.Bucharest, Location.Budapest],
    [Location.Mars]: [],
}