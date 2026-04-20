const http = require('http');
http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log("HTML length:", data.length);
    const heroMatch = data.match(/<section[^>]*>/);
    console.log("Hero Section:", heroMatch ? heroMatch[0] : "Not found");
  });
}).on('error', err => console.log(err.message));
