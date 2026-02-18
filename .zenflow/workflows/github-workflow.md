# Multi-Agent PR Review Workflow

## Configuration
- **GitHub Repo**: sample-api-review
- **PR Number**: #{PR_NUMBER}
- **Artifacts Path**: .zenflow/reviews/{PR_NUMBER}

## Workflow Steps

### [ ] Step 1: Fetch PR Details
<!-- agent: claude-sonnet-4-20250514 -->

Using GitHub MCP, fetch PR details for PR #{PR_NUMBER}:
- Get changed files
- Get diff for each file
- Get PR description
- Get existing comments

Save to: `{@artifacts_path}/pr-details.json`

---

### [ ] Step 2: Bug Detection Review
<!-- agent: claude-opus-4-20250514 -->

Analyze the code changes for bugs and logic errors.

Focus on:
- SQL injection vulnerabilities
- Null pointer exceptions
- Race conditions
- Logic errors
- Error handling gaps
- Edge cases not handled
- Type mismatches
- Async/await issues

For each bug found:
1. Identify exact file and line number
2. Explain the bug
3. Show how it could be exploited/triggered
4. Provide fix suggestion
5. Rate severity (CRITICAL/HIGH/MEDIUM/LOW)

Output: `{@artifacts_path}/bugs-found.md`

---

### [ ] Step 3: Style & Conventions Review
<!-- agent: claude-sonnet-4-20250514 -->

Review code style and conventions.

Check for:
- Inconsistent naming (camelCase, PascalCase, snake_case)
- Missing JSDoc/comments
- Spacing and formatting issues
- Code organization
- Import/export style
- Consistency with project patterns
- Function length and complexity
- Magic numbers
- Commented-out code

Output: `{@artifacts_path}/style-issues.md`

---

### [ ] Step 4: Security Audit
<!-- agent: claude-opus-4-20250514 -->

Perform comprehensive security review.

Scan for:
- SQL/NoSQL injection
- XSS vulnerabilities
- CSRF risks
- Authentication bypasses
- Authorization flaws
- Sensitive data exposure
- Insecure dependencies
- Cryptographic issues
- Input validation gaps
- Rate limiting absence
- CORS misconfigurations

For each vulnerability:
1. Describe the security risk
2. Show exploit scenario
3. Provide secure code example
4. Rate severity using CVSS

Output: `{@artifacts_path}/security-audit.md`

---

### [ ] Step 5: Performance Analysis
<!-- agent: claude-sonnet-4-20250514 -->

Analyze performance implications.

Look for:
- N+1 query problems
- Missing database indexes
- Inefficient algorithms
- Memory leaks
- Unnecessary API calls
- Missing caching opportunities
- Blocking operations
- Large payload responses
- Unoptimized loops
- Synchronous operations that could be async

For each issue:
1. Explain performance impact
2. Provide benchmarks if possible
3. Suggest optimization
4. Show optimized code

Output: `{@artifacts_path}/performance-review.md`

---

### [ ] Step 6: Consolidate Review
<!-- agent: claude-opus-4-20250514 -->

Consolidate all agent findings into one comprehensive review.

Create markdown review with:
1. Executive Summary
2. Critical Issues (must fix before merge)
3. High Priority Issues
4. Suggestions & Best Practices
5. Action Items Checklist
6. Final Recommendation (Approve/Request Changes/Comment)

Use this format:
- 🔴 for critical issues
- 🟡 for high priority
- 🟢 for suggestions
- Include code examples
- Link to specific lines
- Provide fixes, not just problems

Output: `{@artifacts_path}/final-review.md`

---

### [ ] Step 7: Post Review to GitHub
<!-- agent: claude-sonnet-4-20250514 -->

Using GitHub MCP:
1. Read `{@artifacts_path}/final-review.md`
2. Post as PR review comment
3. If critical issues found: Request Changes
4. If only suggestions: Approve with comments
5. Add labels based on severity:
   - `security` if security issues
   - `performance` if performance issues
   - `needs-work` if critical issues
   - `ready-to-merge` if approved

Confirm review posted successfully.

---

## Success Criteria

- [ ] All 5 agents completed their review
- [ ] Findings consolidated into single review
- [ ] Review posted to GitHub PR
- [ ] Appropriate labels added
- [ ] PR status updated (Approved/Changes Requested)