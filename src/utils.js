getRequestData = (req) => {
  return new Promise((resolve, reject) => {
   // Write logic to read the request body data here
    let body = '';
    try {
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(JSON.parse(body));
      });
    } catch (e) {
      reject({ message: 'Reading request data failed', reason: e });
    }
  });
}

module.exports = getRequestData