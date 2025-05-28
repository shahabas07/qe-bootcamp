# Week 1 Summary Report – Shahabas Aman

## ✅ Topics Covered (Days 1–5)
1. **Day 1** – Setup testing with Mocha and Chai
   - Created basic `sample.test.js`
   - Wrote simple tests for arithmetic functions

2. **Day 2** – Unit Testing
   - Extracted helper functions (OTP generator, expiry check)
   - Wrote unit tests for utility logic in `utils.test.js`

3. **Day 3** – Integration Testing
   - Used Supertest to test Express API endpoints
   - Created `api.test.js` to test POST, GET, PUT, DELETE

4. **Day 4** – In-Memory DB Testing
   - Integrated `mongodb-memory-server`
   - Validated DB logic without touching real database

5. **Day 5** – Code Coverage
   - Installed and used NYC
   - Generated coverage report for all tests

---

## 🧪 Tools and Libraries Used
- Mocha & Chai for testing
- Supertest for API testing
- mongodb-memory-server for isolated DB testing
- NYC for code coverage reporting

---

## 🎯 What I Learned
- How to organize test files for backend logic
- Difference between unit and integration testing
- Benefits of in-memory testing for speed and isolation
- How to measure and improve test coverage

---

## ⚠️ Challenges Faced
- Large files in `node_modules` caused push errors
- Timeout bugs in async hooks (fixed by switching to in-memory DB)
- Learned to use `.gitignore` and create clean test branches

---

## 🚀 Final Outcome
- All tests pass ✅
- Coverage generated ✅
- Video recorded ✅
- Repo clean and committed ✅
