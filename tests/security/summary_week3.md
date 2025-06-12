# Week 3 Summary Report – Shahabas Aman

## ✅ Topics Covered (Days 13–17)

1. **Day 13** – Intro to Performance Testing
   - Installed k6 and created a basic load test for `GET /api/posts`.

2. **Day 14** – Ramp-Up Load Testing
   - Implemented a staged VU increase (1 → 10) and graceful stop.

3. **Day 15** – Performance Analysis
   - Interpreted metrics from k6 output (response time, throughput, errors).
   - Created `performance_report_day15.md`.

4. **Day 16** – OWASP ZAP Scanning
   - Installed ZAP, performed an active scan on the local app.
   - Found common issues like missing security headers.

5. **Day 17** – Vulnerability Fixes
   - Implemented security headers (`helmet`, CORS config).
   - Summary documented in `security_fixes_summary.md`.

---

## 🛠️ Tools Used

- **k6** – Load testing
- **OWASP ZAP** – Security scanning
- **VS Code** + Terminal – Code fixes and testing

---

## 💡 Learnings

- Understood the importance of **non-functional testing** (perf + security).
- Learned how to simulate **realistic load scenarios**.
- Practiced fixing security issues before they reach production.
- Improved confidence in validating app robustness.

---

## 🎯 Outcome

- ✅ All performance tests and metrics verified
- ✅ Security scan performed
- ✅ Fixes implemented and tested
- ✅ Video recorded and repository updated
