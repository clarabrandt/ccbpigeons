const responseStatusCheck = response => (((response.status >= 200 && response.status < 300) || response.status === 302) && response.ok);

const checkFetchReturnStatus = response => {
  let type; let msg;
  if (response.status === 401) {
    // un authorized
    const error = new Error(msg);
    error.type = 'unauthorized';
    error.response = response;
    throw error;
  } else if (!responseStatusCheck(response)) {
    const error = new Error(msg);
    error.response = response;
    error.type = type;
    throw error;
  }
  return response;
};

const restCall = (url, options = {}, token = true) => {
  let cacheSafeUrl = url;
  return fetch(cacheSafeUrl, options);
};

export {
  checkFetchReturnStatus,
  restCall,
};