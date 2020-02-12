const validateLngLat = (latitude, longitude) => {
  if (!(isNaN(latitude) || isNaN(longitude))) {
    const lat = Number(latitude);
    const lng = Number(longitude);
    if (lng > -180 && lng < 180 && lat > -90 && lat < 90) return true;
  }
  return;
};

module.exports = {
  validateLngLat,
}
