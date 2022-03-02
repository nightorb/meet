/* eslint-disable no-useless-concat */
import axios from "axios";
import NProgress from "nprogress";
import { mockData } from "./mock-data";

export const getAccessToken = async () => {
  // first check whether user already has access token or not by looking in local storage
  const accessToken = localStorage.getItem('access_token');

  // check whether access token was found
  const tokenCheck = accessToken && (await checkToken(accessToken));

  // if no token was found, check for authorization code
  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');

    // if no authorization code was found, user is redirected to Google Authorization screen to sign in and receive code
    if (!code) {
      const results = await axios.get('https://1qdkvgn2ia.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url');
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

// check token's validity
export const checkToken = async (accessToken) => {
  const result = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`)
    .then((res) => res.json())
    .catch((err) => err.json());

  return result;
};

// fetch new token
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    'https://1qdkvgn2ia.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => err);

  access_token && localStorage.setItem('access_token', access_token);

  return access_token;
};

// get events from API or mockData (for localhost)
export const getEvents = async () => {
  // progress bar
  NProgress.start();

  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  }

  if (!navigator.onLine) {
    const data = localStorage.getItem('lastEvents');
    NProgress.done();
    return data ? JSON.parse(data).events : [];;
  }

  const token = await getAccessToken();

  if (token) {
    // removes code from URL once it's no longer needed
    removeQuery();
    const url = 'https://1qdkvgn2ia.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' + '/' + token;
    const result = await axios.get(url);

    if (result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem('lastEvents', JSON.stringify(result.data));
      localStorage.setItem('locations', JSON.stringify(locations));
    }

    NProgress.done();
    return result.data.events;
  }
};

const removeQuery = () => {
  // checks whether there's a path
  if (window.history.pushState && window.location.pathname) {
    // then build URL with current path
    var newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
    window.history.pushState('', '', newUrl);
  } else {
    // or build URL without a path
    newUrl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newUrl);
  }
};

// takes an events array, then uses mao to create new array with only locations
// also removes duplicates by creating another new array using spread operator and spreading a set
// set removes all duplicates from array
export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};
