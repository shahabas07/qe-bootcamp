# Day 15 – Performance Test Analysis Report

## ✅ Test Setup

- **Tool Used**: k6
- **Test File**: `tests/performance/load_test.js`
- **Tested Endpoint**: `GET /api/posts`
- **Duration**: 20 seconds (3-stage ramp-up/down scenario)
- **Virtual Users**: 1 to 10
- **Total Iterations**: 155
- **Checks**: Status 200 and response time < 500ms

---

## 📊 k6 Output Summary

| **Metric**               | **Value**                 | **Interpretation**                                 |
|--------------------------|---------------------------|-----------------------------------------------------|
| **Total Requests**       | 155 requests              | Number of HTTP requests made during the test       |
| **Checks Passed**        | 310 out of 310 (✅ 100%)   | All assertions passed (`status == 200`, fast resp) |
| **Avg Response Time**    | 1.8ms                     | Very responsive and fast                           |
| **Max Response Time**    | 2.86ms                    | Well within 500ms threshold                        |
| **HTTP Failures**        | 0%                        | All requests succeeded                             |
| **VUs (Users)**          | 1 to 10                   | Scaled from 1 to 10 virtual users                  |
| **Data Received**        | 66 kB                     | Light payload                                      |
| **Data Sent**            | 12 kB                     | Efficient request size                             |

---

## 📈 Observations

- ✅ All performance checks passed (status and response time).
- ⚡ The response time was consistently **under 3ms**, even at peak VUs.
- 📉 No failures, drops, or timeout issues were observed.
- 📊 The load was handled smoothly across 3 stages of virtual user ramp-up.

---

## 🔍 Conclusion

The API endpoint `/api/posts` is performing **efficiently and reliably** under moderate simulated load using k6. The results show:
- Fast response time
- High reliability
- Full availability under test pressure
