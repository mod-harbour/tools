// In all three functions, the `resultFn` and `errorFn` parameters take
// functions that will be called when the request finishes successfully, or
// when it fails, respectively.
//
// `resultFn` must be a function with two arguments: `text`, which takes the
// text returned by the request; and `result`, which is an object with metadata
// about the request (https://developer.mozilla.org/en-US/docs/Web/API/Response).
//
// `errorFn` must be a function that takes one parameter, `error`, which is an
// error object representing how the request failed.

function fetch_get(url, resultFn, errorFn) {
  fetch(url, {method: "GET"})
    .then(result =>
      result.ok  // Checks that the result has a 200 (or 20x) status code.
        ? Promise.all([result.text(), result])
        : Promise.reject(new Error(result.statusCode + " " + result.statusText)))
    .then(([text, result]) => resultFn(text, result))
    .catch(error => errorFn(error));
}

function fetch_get_json(url, resultFn, errorFn) {
  fetch(url, {method: "GET"})
    .then(result =>
      result.ok  // Checks that the result has a 200 (or 20x) status code.
        ? Promise.all([result.json(), result])
        : Promise.reject(new Error(result.statusCode + " " + result.statusText)))
    .then(([json, result]) => resultFn(json, result))
    .catch(error => errorFn(error));
}

function fetch_post(url, params, resultFn, errorFn) {
  const reqMetadata = {
    // mode: "no-cors",
    method: "POST",
    // The following two lines send `params` as urlencoded.
    body: new URLSearchParams(params),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  };
  fetch(url, reqMetadata)
    .then(result =>
      result.ok  // Checks that the result has a 200 (or 20x) status code.
        ? Promise.all([result.text(), result])
        : Promise.reject(new Error(result.status + " " + result.statusText)))
    .then(([text, result]) => resultFn(text, result))
    .catch(error => errorFn(error));
}