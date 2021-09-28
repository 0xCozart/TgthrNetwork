import * as sdk from 'matrix-js-sdk';

// baseUrl to be used in prod -> https://matrix.org
async function getMatrixClient(baseUrl = 'https://matrix.org') {
  try {
    return await sdk.createClient(baseUrl);
  } catch (err) {
    console.error(err);
    return null;
  }
}

function loginToMatrix(matrix: sdk.MatrixClient, username: string, password: string) {
  return new Promise((resolve, reject) => {
    matrix
      .loginWithPassword(username, password, (err, data) => {
        if (err) {
          reject(err);
        } else {
          console.log({ login: data });
          resolve(data);
        }
      })
      .then((res) => {
        console.log({ res });
      });
  });
}

function createSessionId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

async function getGuestMatrixClient(baseUrl = 'https://matrix.org') {
  try {
    const tmpClient = await sdk.createClient({ baseUrl });
    const { user_id, device_id, access_token } = await tmpClient.registerGuest({ body: {} });
    console.log({ user_id, device_id, access_token });
    return { user_id, device_id, access_token };
  } catch (err) {
    console.log({ err });
    return null;
  }
}

async function registerToMatrix(matrix: sdk.MatrixClient, username: string, password: string) {
  let output = {};
  try {
    const guestData = await getGuestMatrixClient();
    const sessionId = createSessionId();
    if (guestData) {
      await matrix.register(username, password, sessionId, {}, null, guestData.access_token, false, (err, data) => {
        if (err) {
          output = { err };
        } else {
          output = { data };
        }
      });
    }
  } catch (err) {
    output = { err };
    console.log({ err });
  }

  return output;
}

export { getMatrixClient, loginToMatrix, registerToMatrix };
