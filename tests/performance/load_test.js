import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 10 }, // Ramp up to 10 users over 5s
    { duration: '10s', target: 10 }, // Stay at 10 users for 10s
    { duration: '5s', target: 0 }, // Ramp down to 0 users over 5s
  ],
};

export default function () {
  const res = http.get('http://localhost:2024/ping');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1); // Simulate user thinking time
}
