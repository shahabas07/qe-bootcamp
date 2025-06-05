import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // Virtual users
  duration: '10s', // Duration of the test
};

export default function () {
  const res = http.get('http://localhost:2024/ping');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
