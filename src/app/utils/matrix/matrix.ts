import { MatrixLogin } from 'app/utils/matrix/types';
import * as sdk from 'matrix-js-sdk';

// baseUrl to be used in prod -> https://matrix.org
function getMatrixClient(baseUrl = 'http://localhost:8008') {
  return new Promise((resolve, reject) => {
    const matric = sdk.createClient({ baseUrl });
    if (matric) {
      resolve(matric);
    } else {
      reject('matrix client not created');
    }
  });
}

function loginToMatrix(matrix: sdk.MatrixClient, { username, password }: MatrixLogin) {
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

async function getGuestMatrixClient(baseUrl = 'http://localhost:8008') {
  const tmpClient = await sdk.createClient({ baseUrl });
  const { user_id, device_id, access_token } = await tmpClient.registerGuest({ body: {} });
  return { user_id, device_id, access_token };
}

async function registerToMatrix(matrix: sdk.MatrixClient, { username, password }: MatrixLogin) {
  let output = {};
  const { user_id, device_id, access_token } = await getGuestMatrixClient();
  const sessionId = createSessionId();
  await matrix.register(username, password, sessionId, {}, null, access_token, false, (err, data) => {
    if (err) {
      output = { err };
    } else {
      output = { data };
    }
  });

  return output;
}

export { getMatrixClient, loginToMatrix, registerToMatrix };
