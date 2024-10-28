import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000, // Number of virtual users
  duration: '4m', // Test duration
};

export default function () {
  const url = 'http://localhost:3000/create'; // Replace with your actual API endpoint
  const payload = JSON.stringify({
    // Your POST request body
    title: 'Post Title 1',
    content: 'Post Content ',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      // Add any other required headers
    },
  };

  const res = http.post(url, payload, params);

  // Perform checks on the response
//   check(res, {
//     'status is 200': (r) => r.status === 200,
//     'response body contains expected data': (r) => r.body.includes('POST Created'), // Replace with your expected data
//   });

  sleep(1); // Wait for 1 second before the next iteration
}