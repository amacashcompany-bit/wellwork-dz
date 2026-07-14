# QVT Platform: Registration, Privacy, and Security Architecture
## Gap Analysis & Enhancement Recommendations

> This document builds on the original QVT platform identity management spec, identifying gaps and proposing concrete controls to harden the registration, privacy, and "Blind Vault" security layers.

---

## Original Document Summary

The platform manages employee identity through three pillars:

1. **Registration & Lifecycle** — Employee ID verification, HR sync, automated offboarding
2. **Privacy & Anonymization** — Data decoupling, pseudonymization
3. **Blind Vault** — Separated mapping store, AES-256 encryption, HMAC-SHA256 tokenization, break-glass re-identification

---

## Part 1 — Strengths of the Current Architecture

- **Layered design** — clean separation between registration, privacy, and vault concerns
- **HMAC-SHA256 with inaccessible salt** — defensible pseudonymization pattern resistant to rainbow tables
- **Break-glass with dual authorization** — best-practice emergency re-identification
- **Immutable audit log** — provides forensic trail for compliance
- **Automated HR sync** — closes a common offboarding gap
- **Separation of duties** — DBAs cannot reverse tokens

---

## Part 2 — Gaps and Recommended Additions

### 2.1 Registration & Lifecycle Management

| Missing Control | Risk Addressed | Recommendation |
|---|---|---|
| Multi-Factor Authentication (MFA) at enrollment | Stolen Employee ID = account takeover | Require TOTP or WebAuthn second factor |
| Device trust / fingerprinting | Credential replay from unknown devices | Bind sessions to known device profiles |
| Rate limiting & anti-enumeration | ID harvesting via timing analysis | Constant-time responses, IP-based throttling |
| Role provisioning from HR feed | Stale role assignments after transfers | Sync department/role changes, not just status |
| Re-onboarding path | Rehired employees get duplicate pseudonyms | Re-link existing pseudonym on rehire |
| Time-bound sessions & token rotation | Long-lived tokens bypass revocation | Short JWT TTL (15 min) + rotating refresh tokens |
| Cryptographic erasure on offboarding | Residual mapping data persists | Destroy pseudonym mapping key on termination |

### 2.2 Privacy & Anonymization

The current section is too thin. Add the following controls:

- **Metadata Leakage Mitigation**
  - Strip or truncate IP addresses (last octet)
  - Coarse-grain timestamps to date or hour
  - Remove device identifiers from activity logs
  - These are common re-identification vectors even when pseudonyms are used

- **Pseudonym Rotation Policy**
  - Static pseudonyms become linkable over time
  - Consider per-context pseudonyms (e.g., one for surveys, one for forums)
  - Or use blinded tokens (e.g., Privacy Pass style)

- **Differential Privacy for Analytics**
  - Aggregate reporting on user activity is vulnerable to membership inference
  - Add calibrated noise (Laplace or Gaussian mechanism) to all aggregate queries
  - Define a privacy budget (ε) per analyst, per quarter

- **Data Retention & Right to Erasure**
  - Define explicit retention windows per data category (e.g., 90 days for activity logs, 7 years for audit)
  - Implement automated purging pipelines
  - Honor GDPR Art. 17 right to erasure requests within 30 days

- **Consent Ledger**
  - If QVT collects behavioral or sentiment data, maintain an immutable consent ledger
  - Allow withdrawal of consent with downstream propagation

### 2.3 The Blind Vault — Hardening Recommendations

| Control | Purpose | Priority |
|---|---|---|
| **Key Rotation & Crypto-Agility** | Limit blast radius of key compromise; rotate AES-256 keys annually, HMAC salt on a 2-year cycle with re-hash migration | High |
| **Quorum Decryption (Shamir's Secret Sharing)** | Replace simple dual-auth with M-of-N key shares (e.g., 3-of-5) so no single party — not even the DPO — can decrypt alone | High |
| **Time-Locked Break-Glass** | Limit emergency access to a fixed window (e.g., 15 minutes), auto-revoke afterwards | High |
| **mTLS + Network Isolation** | Vault sits in a separate network segment, reachable only via mTLS-authenticated service-to-service calls | High |
| **Vault HA/DR** | Cross-region replication with split keys to avoid single point of failure | Medium |
| **HSM vs KMS Justification** | Document why one is chosen — HSM for FIPS 140-2 Level 3+ if regulated, KMS for operational simplicity | Medium |
| **Tokenization Alternative** | Consider format-preserving tokenization so the app never even stores the HMAC — only the vault resolves it | Medium |
| **Anomaly Detection on Vault Access** | Any read of the mapping table should trigger real-time alerting, not just break-glass events | High |

---

## Part 3 — Entirely Missing Sections (Recommend Adding)

### 3.1 Authentication & Session Management
- SSO/SAML/OIDC integration with corporate IdP
- MFA enforcement (TOTP, WebAuthn, or push)
- JWT short TTL (15 min) + refresh token rotation
- Idle timeout and absolute session limits
- Step-up authentication for sensitive actions

### 3.2 Authorization Model
- RBAC (Role-Based Access Control) with least-privilege defaults
- ABAC (Attribute-Based Access Control) for context-aware decisions
- Just-in-time elevation with approval workflow
- Periodic access reviews (quarterly)

### 3.3 Network & Perimeter Security
- Zero-Trust Architecture (NIST SP 800-207)
- WAF (Web Application Firewall) at the edge
- API Gateway with rate limiting and schema validation
- Egress filtering to prevent data exfiltration
- Private subnets for data tier; no direct internet egress

### 3.4 Application Security
- OWASP Top 10 controls (input validation, output encoding, CSRF tokens)
- SAST + DAST in CI/CD pipelines
- Dependency scanning (SCA) — e.g., Snyk, Dependabot
- Secrets scanning in repositories
- Secure coding training for developers

### 3.5 Monitoring, Logging & Detection
- SIEM integration (Splunk, Sentinel, or ELK)
- UEBA (User and Entity Behavior Analytics) for insider threat detection
- Immutable, tamper-evident audit logs (blockchain or WORM storage)
- Real-time alerting on vault reads, break-glass events, and failed MFA
- 24/7 SOC monitoring or managed detection service

### 3.6 Incident Response & Breach Notification
- Documented IR playbook with roles and escalation paths
- 72-hour breach notification workflow (GDPR Art. 33)
- Quarterly tabletop exercises
- Post-incident review with corrective action tracking
- Cyber insurance coverage validation

### 3.7 Compliance & Regulatory Mapping
- **GDPR** — Art. 25 (data protection by design), Art. 32 (security of processing)
- **SOC 2 Type II** — Trust Service Criteria (Security, Availability, Confidentiality)
- **ISO 27001** — Annex A controls
- **HIPAA** — if any health-related data is processed
- **Works Council / Labor Law** — employee monitoring consent (varies by jurisdiction)

### 3.8 Data Governance
- Data classification framework: Public / Internal / Confidential / Restricted
- DLP (Data Loss Prevention) at endpoint, network, and cloud tiers
- Retention schedules per data category
- Data minimization: collect only what is strictly necessary

### 3.9 Third-Party / Vendor Risk Management
- Vendor security questionnaires (SIG, CAIQ)
- Sub-processor DPAs (Data Processing Agreements)
- Annual vendor reassessment
- Right-to-audit clauses in contracts

### 3.10 Disaster Recovery & Business Continuity
- Defined RTO (Recovery Time Objective) and RPO (Recovery Point Objective)
- Quarterly DR drills with documented results
- Backup encryption with offsite copies (3-2-1 rule)
- Vault DR with split-key recovery ceremony

### 3.11 Secure SDLC
- Mandatory code review (PR approval by 2+ reviewers)
- Pre-commit hooks for secrets scanning
- IaC security scanning (TFSec, Checkov)
- Container image scanning (Trivy, Snyk Container)
- Signed artifacts (Sigstore, Cosign)

### 3.12 DPIA (Data Protection Impact Assessment)
- **Mandatory** under GDPR Art. 35 for high-risk processing
- Pseudonymized employee behavioral data qualifies as high-risk
- Must be completed *before* processing begins
- Reviewed by DPO, refreshed annually or upon material change

### 3.13 Threat Model
- **STRIDE** analysis for each system component
- **LINDDUN** analysis specifically for privacy/re-identification threats
- Map threats to controls in a traceability matrix
- Refresh threat model annually and after major architecture changes

### 3.14 Legal Framework for Re-Identification Requests
- Define lawful bases for re-identification (law enforcement, internal investigation, employee consent)
- Specify who can request (legal, HR, law enforcement with warrant)
- Evidentiary chain of custody for any re-identification event
- Judicial review threshold for law enforcement requests

---

## Part 4 — Quick Wins (Highest ROI, Ranked)

| # | Action | Effort | Impact |
|---|---|---|---|
| 1 | Add MFA + device binding to registration | Medium | Critical |
| 2 | Strip metadata (IP, timestamps) from activity logs | Low | High |
| 3 | Implement Shamir's quorum + time-locked break-glass | Medium | Critical |
| 4 | Complete a formal DPIA | Medium | Critical (compliance) |
| 5 | Define retention windows + crypto-erasure on offboarding | Low | High |
| 6 | Add real-time alerting on all vault reads | Low | High |
| 7 | Move Vault behind mTLS in isolated network segment | Medium | High |
| 8 | Implement differential privacy on analytics queries | High | Medium |

---

## Part 5 — Recommended Next Steps

1. **Short term (0–3 months):** Implement Quick Wins #1, #2, #5, #6
2. **Medium term (3–6 months):** Complete DPIA, threat model, Shamir's quorum, mTLS isolation
3. **Long term (6–12 months):** Differential privacy, full SIEM/UEBA integration, SOC 2 Type II audit

---

## Appendix A — Reference Standards

- **NIST SP 800-207** — Zero Trust Architecture
- **NIST SP 800-63B** — Digital Identity Guidelines
- **ISO/IEC 27001:2022** — Information Security Management
- **ISO/IEC 27701:2019** — Privacy Information Management
- **GDPR** — Articles 25, 32, 33, 35
- **OWASP ASVS v4.0** — Application Security Verification Standard
- **FIPS 140-2** — Cryptographic Module Validation
- **CSA CCM v4** — Cloud Controls Matrix
