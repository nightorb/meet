// takes an events array, then uses mao to create new array with only locations
// also removes duplicates by creating another new array using spread operator and spreading a set
// set removes all duplicates from array
export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};