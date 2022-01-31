const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar('v3');

// SCOPES allows you to set access levels (readonly)
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

// credentials are the values required to get access to your calendar
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  redirect_uris: ['https://nightorb.github.io/meet'],
  javascript_origins: ['https://nightorb.github.io', 'http://localhost:3000']
};

const { client_id, client_secret, redirect_uris, calendar_id } = credentials;

const oAuth2Client = new OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// first step in OAuth process: generate URL so users can login with google and be authorized to see calendar
// after loggin in: user receives a code as a URL parameter
module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      authUrl: authUrl
    })
  };
};

// second step: generate the access token
module.exports.getAccessToken = async (e) => {
  const oAuth2Client = new OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${e.pathParameters.code}`);

  // exchange authorization code for access token with a callback after exchange
  // the callback in this case is an arrow function with the results as parameters: err, token
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
  // respond with OAuth token
  .then((token) => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(token)
    };
  })
  .catch((err) => {
    console.error(err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(err)
    };
  });
};
