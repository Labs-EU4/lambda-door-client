import axios from 'axios';
import store from '../state/store';
import { editProfile } from '../state/actions/user';

export async function showPosition(position, id) {
  const { longitude, latitude } = position.coords;

  const {
    data: { results },
  } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=country&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  );
  await store.dispatch(
    editProfile(
      { longitude, latitude, location: results[0].formatted_address },
      id
    )
  );
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log('User denied the request for Geolocation.');
      break;
    case error.POSITION_UNAVAILABLE:
      console.log('Location information is unavailable.');
      break;
    case error.TIMEOUT:
      console.log('The request to get user location timed out.');
      break;
    case error.UNKNOWN_ERROR:
      console.log('An unknown error occurred.');
      break;
    default:
      return null;
  }
  return null;
}
export function getLocation(id) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => showPosition(position, id),
      showError
    );
  }
}
