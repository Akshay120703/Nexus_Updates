(() => {
  "use strict";

  const ROUTES = [
    { path: "home", role: "public", label: "Home" },
    { path: "doctor/overview", role: "doctor", label: "Overview", icon: "O" },
    { path: "doctor/patients", role: "doctor", label: "Patients", icon: "P" },
    { path: "doctor/patient", role: "doctor", label: "Patient record", icon: "R", hidden: true },
    { path: "doctor/medications", role: "doctor", label: "Medications", icon: "M", hidden: true },
    { path: "doctor/dose-review", role: "doctor", label: "Dose review", icon: "D", hidden: true },
    { path: "doctor/pgx", role: "doctor", label: "PGx reports", icon: "G", hidden: true },
    { path: "doctor/monitoring", role: "doctor", label: "Monitoring", icon: "V", hidden: true },
    { path: "doctor/alerts", role: "doctor", label: "Clinical alerts", icon: "!" },
    { path: "doctor/audit", role: "doctor", label: "Audit trail", icon: "A" },
    { path: "doctor/settings", role: "doctor", label: "Settings", icon: "S" },
    { path: "assistant/overview", role: "assistant", label: "Overview", icon: "O" },
    { path: "assistant/patients", role: "assistant", label: "Patients", icon: "P" },
    { path: "assistant/patient", role: "assistant", label: "Patient record", icon: "R", hidden: true },
    { path: "assistant/register", role: "assistant", label: "Register patient", icon: "+" },
    { path: "assistant/samples", role: "assistant", label: "Samples", icon: "S" },
    { path: "assistant/biomarkers", role: "assistant", label: "Biomarkers", icon: "B" },
    { path: "assistant/pgx", role: "assistant", label: "PGx entry", icon: "G" },
    { path: "assistant/medications", role: "assistant", label: "Medication entry", icon: "M" },
    { path: "assistant/follow-ups", role: "assistant", label: "Follow-ups", icon: "F" },
    { path: "assistant/audit", role: "assistant", label: "Audit trail", icon: "A" },
    { path: "patient/overview", role: "patient", label: "Overview", icon: "O" },
    { path: "patient/medications", role: "patient", label: "My medications", icon: "M" },
    { path: "patient/monitoring", role: "patient", label: "My monitoring", icon: "V" },
    { path: "patient/follow-up", role: "patient", label: "Submit follow-up", icon: "+" },
    { path: "patient/pgx", role: "patient", label: "My PGx report", icon: "G" },
    { path: "patient/appointments", role: "patient", label: "Appointments", icon: "C" },
    { path: "patient/records", role: "patient", label: "Health records", icon: "R" },
    { path: "patient/profile", role: "patient", label: "Profile", icon: "P" }
  ];

  if (ROUTES.length !== 29 || new Set(ROUTES.map(r => r.path)).size !== 29) {
    throw new Error("NEXUS route registry must contain exactly 29 unique routes.");
  }

  const SEED = {
    activePatientId: "NXS-1048",
    patients: [
      { id: "NXS-1048", name: "Aarav Mehta", age: 42, sex: "Male", phone: "+91 98••• 2146", condition: "Pulmonary TB", risk: "Moderate", stage: "Maintenance", adherence: 94, nextVisit: "18 Sep 2026", district: "Varanasi" },
      { id: "NXS-1081", name: "Meera Singh", age: 36, sex: "Female", phone: "+91 87••• 6012", condition: "Pulmonary TB", risk: "Low", stage: "Maintenance", adherence: 98, nextVisit: "21 Sep 2026", district: "Mirzapur" },
      { id: "NXS-1124", name: "Kabir Khan", age: 51, sex: "Male", phone: "+91 90••• 8853", condition: "Pulmonary TB", risk: "High", stage: "Dose review", adherence: 81, nextVisit: "12 Sep 2026", district: "Chandauli" },
      { id: "NXS-1157", name: "Ananya Rao", age: 29, sex: "Female", phone: "+91 99••• 4071", condition: "Pulmonary TB", risk: "Moderate", stage: "Initiation", adherence: 91, nextVisit: "16 Sep 2026", district: "Jaunpur" }
    ],
    medications: [
      { id: "MED-301", patientId: "NXS-1048", drug: "Rifampicin", dose: "450 mg", frequency: "Once daily", status: "approved", recommendation: "Continue current maintenance dose; exposure estimate remains inside the target band." },
      { id: "MED-302", patientId: "NXS-1048", drug: "Isoniazid", dose: "300 mg", frequency: "Once daily", status: "review", recommendation: "Review dose with NAT2 phenotype and the latest ALT value before authorization." },
      { id: "MED-303", patientId: "NXS-1081", drug: "Rifampicin", dose: "450 mg", frequency: "Once daily", status: "approved", recommendation: "Stable laboratory trend and strong reported adherence." },
      { id: "MED-304", patientId: "NXS-1124", drug: "Isoniazid", dose: "250 mg", frequency: "Once daily", status: "pending", recommendation: "Elevated liver enzymes require clinician review; no autonomous change has been applied." },
      { id: "MED-305", patientId: "NXS-1157", drug: "Pyrazinamide", dose: "1000 mg", frequency: "Once daily", status: "pending", recommendation: "New regimen entry awaiting doctor authorization." }
    ],
    biomarkers: [
      { id: "BIO-401", patientId: "NXS-1048", date: "2026-09-08", alt: 42, ast: 37, creatinine: 0.9, hb: 13.8 },
      { id: "BIO-402", patientId: "NXS-1048", date: "2026-08-23", alt: 39, ast: 35, creatinine: 0.9, hb: 13.6 },
      { id: "BIO-403", patientId: "NXS-1081", date: "2026-09-06", alt: 31, ast: 29, creatinine: 0.8, hb: 12.9 },
      { id: "BIO-404", patientId: "NXS-1124", date: "2026-09-09", alt: 76, ast: 69, creatinine: 1.1, hb: 12.4 },
      { id: "BIO-405", patientId: "NXS-1157", date: "2026-09-07", alt: 46, ast: 40, creatinine: 0.8, hb: 12.7 }
    ],
    pgx: [
      { id: "PGX-501", patientId: "NXS-1048", gene: "NAT2", phenotype: "Intermediate acetylator", implication: "Standard initiation with closer toxicity monitoring", verified: true },
      { id: "PGX-502", patientId: "NXS-1081", gene: "NAT2", phenotype: "Rapid acetylator", implication: "Assess exposure if clinical response is below expectation", verified: true },
      { id: "PGX-503", patientId: "NXS-1124", gene: "NAT2", phenotype: "Slow acetylator", implication: "Higher toxicity risk; doctor-led dose review required", verified: false },
      { id: "PGX-504", patientId: "NXS-1157", gene: "SLCO1B1", phenotype: "Reduced function", implication: "Review with clinical and laboratory context", verified: false }
    ],
    samples: [
      { id: "SMP-6381", patientId: "NXS-1048", type: "Whole blood", date: "2026-09-08", status: "Processed" },
      { id: "SMP-6402", patientId: "NXS-1124", type: "Whole blood", date: "2026-09-09", status: "In laboratory" },
      { id: "SMP-6418", patientId: "NXS-1157", type: "Plasma", date: "2026-09-10", status: "Collected" }
    ],
    followUps: [
      { id: "FU-701", patientId: "NXS-1048", date: "2026-09-09", adherence: 95, symptoms: "Mild fatigue", notes: "No missed dose reported this week.", source: "Patient" },
      { id: "FU-702", patientId: "NXS-1081", date: "2026-09-08", adherence: 100, symptoms: "None", notes: "Tolerating medication well.", source: "Clinical assistant" },
      { id: "FU-703", patientId: "NXS-1124", date: "2026-09-10", adherence: 78, symptoms: "Nausea", notes: "Escalated for clinician review because of symptoms and ALT trend.", source: "Clinical assistant" }
    ],
    appointments: [
      { id: "APT-201", patientId: "NXS-1048", date: "2026-09-18", time: "10:30", clinician: "Dr. Priya Sharma", type: "Maintenance review" },
      { id: "APT-202", patientId: "NXS-1081", date: "2026-09-21", time: "12:00", clinician: "Dr. Priya Sharma", type: "Monthly follow-up" },
      { id: "APT-203", patientId: "NXS-1124", date: "2026-09-12", time: "09:15", clinician: "Dr. Priya Sharma", type: "Priority dose review" }
    ],
    audit: [
      { id: "AUD-801", at: "11 Sep, 09:44", actor: "Dr. Priya Sharma", action: "Medication approved", detail: "Rifampicin 450 mg for NXS-1048" },
      { id: "AUD-802", at: "10 Sep, 16:18", actor: "Rohan Verma", action: "Follow-up recorded", detail: "Clinical follow-up added for NXS-1124" },
      { id: "AUD-803", at: "10 Sep, 12:32", actor: "Lab integration", action: "Biomarkers synchronized", detail: "ALT, AST, creatinine and Hb for NXS-1157" },
      { id: "AUD-804", at: "09 Sep, 17:06", actor: "Aarav Mehta", action: "Follow-up submitted", detail: "Patient-reported adherence and symptoms" }
    ]
  };

  const app = document.getElementById("app");
  const modalRoot = document.getElementById("modal-root");
  const toastRegion = document.getElementById("toast-region");
  let state = loadState();

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem("nexus-connected-care-v4"));
      return parsed && Array.isArray(parsed.patients) ? parsed : clone(SEED);
    } catch (_) { return clone(SEED); }
  }
  function saveState(message) {
    localStorage.setItem("nexus-connected-care-v4", JSON.stringify(state));
    if (message) toast(message);
  }
  function esc(value) {
    return String(value ?? "").replace(/[&<>'"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[ch]));
  }
  function initials(name) { return name.split(/\s+/).map(v => v[0]).slice(0, 2).join("").toUpperCase(); }
  function today() { return new Date().toISOString().slice(0, 10); }
  function selectedPatient() { return state.patients.find(p => p.id === state.activePatientId) || state.patients[0]; }
  function patientName(id) { return state.patients.find(p => p.id === id)?.name || id; }
  function itemsFor(list, patientId = state.activePatientId) { return state[list].filter(item => item.patientId === patientId); }
  function currentPath() { return location.hash.replace(/^#\/?/, "") || "home"; }
  function navigate(path) { location.hash = `#/${path}`; }
  function routeRecord(path = currentPath()) { return ROUTES.find(r => r.path === path); }
  function status(value) { return `<span class="status ${esc(String(value).toLowerCase())}">${esc(value)}</span>`; }
  function toast(message) {
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    toastRegion.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
  function audit(actor, action, detail) {
    state.audit.unshift({ id: `AUD-${Date.now()}`, at: new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), actor, action, detail });
  }

  function logo() {
    return `<a class="brand" href="#/home" aria-label="NEXUS home"><img src="./assets/Logo.jpeg" alt="NEXUS Connected Care logo"></a>`;
  }

  function render() {
    const route = routeRecord();
    if (!route) { navigate("home"); return; }
    document.documentElement.dataset.role = route.role;
    if (route.role === "public") app.innerHTML = landingPage();
    else app.innerHTML = portalShell(route);
    document.querySelector("main")?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }

  function landingPage() {
    return `
      <a class="skip-link" href="#main">Skip to main content</a>
      <div class="landing">
        <main id="main" tabindex="-1">
          <div class="hero-stage">
            <nav class="landing-nav" aria-label="Primary navigation">
              ${logo()}
              <div class="nav-links">
                <a href="#platform">Platform</a>
                <a href="#workspaces">Workspaces</a>
                <button class="btn btn-dark" data-route="doctor/overview">Open workspace</button>
              </div>
            </nav>
            <section class="hero">
              <div class="hero-copy">
                <span class="eyebrow">Precision care workspace</span>
                <h1>Connected intelligence. <span>One patient at a time.</span></h1>
                <p>NEXUS brings patient records, pharmacogenomics, biomarkers, medication history and follow-up signals into one coordinated workspace—while keeping the final decision with the treating doctor.</p>
                <div class="hero-actions">
                  <button class="btn btn-primary" data-route="doctor/overview">Enter doctor portal</button>
                  <button class="btn btn-outline" data-route="assistant/overview">Enter assistant portal</button>
                </div>
                <div class="trust-row">
                  <span><i>✓</i> Doctor authorization</span>
                  <span><i>✓</i> Patient-linked records</span>
                  <span><i>✓</i> Traceable actions</span>
                </div>
              </div>
              <div class="workspace-preview" aria-label="Clinical workspace preview">
                <div class="preview-shell">
                  <div class="preview-top"><span class="preview-title">Clinical workspace</span><span class="live-pill">Records synchronized</span></div>
                  <div class="preview-body">
                    <div class="system-line"><span>NEXUS CARE INTELLIGENCE</span><span>LIVE CONTEXT</span></div>
                    <div class="preview-patient"><div class="avatar">AM</div><div class="patient-meta"><strong>Aarav Mehta</strong><small>NXS-1048 · Maintenance phase</small></div><span class="risk-badge">Review due</span></div>
                    <div class="preview-grid">
                      <div class="mini-card"><span>Adherence</span><strong>94%</strong><em>Stable this month</em></div>
                      <div class="mini-card"><span>Latest ALT</span><strong>42</strong><em>U/L · monitored</em></div>
                      <div class="mini-card"><span>PGx</span><strong>NAT2</strong><em>Verified result</em></div>
                      <div class="mini-card"><span>Open reviews</span><strong>01</strong><em>Doctor action</em></div>
                    </div>
                    <div class="dose-card">
                      <div class="dose-card__head"><small>Ranked clinical consideration</small><span class="confidence">Context complete</span></div>
                      <h3>Isoniazid dose review</h3>
                      <small>PGx, laboratory trend and adherence assembled for clinician authorization.</small>
                      <div class="signal-row"><i class="on"></i><i class="on"></i><i class="on"></i><i></i></div>
                    </div>
                  </div>
                </div>
                <div class="floating-note"><b>Clinical boundary</b>NEXUS organizes evidence and flags risk. It never changes a prescription without doctor approval.</div>
              </div>
            </section>
          </div>

          <section class="section" id="workspaces">
            <div class="section-head"><span class="eyebrow">Role-specific access</span><h2>The right tools for every person in the care team.</h2><p>Each workspace shows only the actions needed by that role, while every patient record remains connected and auditable.</p></div>
            <div class="role-grid">
              <article class="role-card patient"><div class="role-icon">P</div><h3>Patient</h3><p>View medications and records, monitor progress, and submit a follow-up directly to the care team.</p><button class="btn btn-outline" data-route="patient/overview">Open patient portal</button></article>
              <article class="role-card doctor"><div class="role-icon">D</div><h3>Doctor</h3><p>Review patient-specific clinical context, approve medications and record dose decisions.</p><button class="btn btn-outline" data-route="doctor/overview">Open doctor portal</button></article>
              <article class="role-card assistant"><div class="role-icon">A</div><h3>Clinical assistant</h3><p>Register patients, capture samples and biomarkers, and keep follow-up records complete.</p><button class="btn btn-outline" data-route="assistant/overview">Open assistant portal</button></article>
            </div>
          </section>

          <section class="section" id="platform">
            <div class="platform-strip">
              <div class="platform-item"><b>Unified patient record</b><span>One record for medication, biomarker, PGx and follow-up data.</span></div>
              <div class="platform-item"><b>Explainable review</b><span>Every consideration shows the patient signals that informed it.</span></div>
              <div class="platform-item"><b>Human authorization</b><span>Medication and dose decisions remain under clinician control.</span></div>
              <div class="platform-item"><b>Accountable history</b><span>Every create, verify, modify and delete action is recorded.</span></div>
            </div>
          </section>
        </main>
        <footer class="landing-footer"><div class="footer-inner">${logo()}<p>Clinical decision-support interface. Patient-specific recommendations require validation and approval by a qualified treating physician.</p></div></footer>
      </div>`;
  }

  function portalShell(route) {
    const role = route.role;
    const theme = role === "doctor" ? "#245dd8" : role === "assistant" ? "#7048e8" : "#08a99b";
    const soft = role === "doctor" ? "#edf3ff" : role === "assistant" ? "#f3efff" : "#e8faf7";
    const user = role === "doctor" ? { name: "Dr. Priya Sharma", meta: "Pulmonology", initials: "PS" } : role === "assistant" ? { name: "Rohan Verma", meta: "Clinical assistant", initials: "RV" } : { name: selectedPatient().name, meta: selectedPatient().id, initials: initials(selectedPatient().name) };
    const nav = ROUTES.filter(r => r.role === role && !r.hidden);
    return `
      <a class="skip-link" href="#main">Skip to main content</a>
      <div class="portal" style="--role:${theme};--role-soft:${soft}">
        <div class="mobile-overlay" data-action="close-menu"></div>
        <aside class="sidebar">
          ${logo()}
          <span class="role-chip">${role === "assistant" ? "Clinical assistant" : role}</span>
          <nav class="side-nav" aria-label="${esc(role)} portal">
            ${nav.map(r => `<button class="side-link ${route.path === r.path ? "active" : ""}" data-route="${r.path}"><span class="nav-symbol">${r.icon}</span>${r.label}</button>`).join("")}
          </nav>
          <div class="side-footer"><button class="btn btn-ghost" data-route="home">← Exit workspace</button></div>
        </aside>
        <section class="portal-main">
          <header class="topbar">
            <button class="btn btn-ghost menu-button" data-action="open-menu" aria-label="Open navigation">☰</button>
            <div class="topbar-title"><b>${esc(route.label)}</b><span>NEXUS Connected Care</span></div>
            <div class="topbar-actions"><div class="search-box">Search patient or record</div><div class="user-badge"><div class="avatar">${user.initials}</div><div><b>${esc(user.name)}</b><span>${esc(user.meta)}</span></div></div></div>
          </header>
          <main id="main" class="content" tabindex="-1">${pageContent(route)}</main>
        </section>
      </div>`;
  }

  function pageHead(title, description, actions = "") {
    return `<div class="page-head"><div><h1>${title}</h1><p>${description}</p></div>${actions ? `<div class="page-actions">${actions}</div>` : ""}</div>`;
  }
  function clinicalBanner() {
    return `<div class="clinical-banner"><div class="banner-icon">i</div><div><b>Doctor-in-the-loop safeguard.</b> NEXUS combines patient information for review. It does not diagnose disease or autonomously prescribe, stop or alter medication.</div></div>`;
  }
  function patientSelect(targetRoute) {
    return `<div class="patient-selector"><label for="patient-picker">Patient record</label><select id="patient-picker" class="control" data-patient-route="${targetRoute}">${state.patients.map(p => `<option value="${p.id}" ${p.id === state.activePatientId ? "selected" : ""}>${esc(p.name)} · ${p.id}</option>`).join("")}</select></div>`;
  }
  function pageContent(route) {
    const [, page] = route.path.split("/");
    if (page === "overview") return overviewPage(route.role);
    if (page === "patients") return patientsPage(route.role);
    if (page === "patient") return patientDetailPage(route.role);
    if (route.role === "doctor" && ["medications", "dose-review", "pgx", "monitoring"].includes(page)) return patientDetailPage("doctor");
    if (route.path === "doctor/medications") return doctorMedicationsPage();
    if (route.path === "doctor/dose-review") return doseReviewPage();
    if (page === "pgx") return pgxPage(route.role);
    if (page === "monitoring") return monitoringPage(route.role);
    if (page === "alerts") return alertsPage();
    if (page === "audit") return auditPage(route.role);
    if (page === "settings") return settingsPage();
    if (page === "register") return registerPage();
    if (page === "samples") return samplesPage();
    if (page === "biomarkers") return biomarkersPage();
    if (route.path === "assistant/medications") return assistantMedicationsPage();
    if (page === "follow-ups" || page === "follow-up") return followUpsPage(route.role);
    if (page === "medications") return patientMedicationsPage();
    if (page === "appointments") return appointmentsPage();
    if (page === "records") return recordsPage();
    if (page === "profile") return profilePage();
    return `<div class="empty"><strong>Page unavailable</strong>Return to the workspace overview.</div>`;
  }

  function overviewPage(role) {
    if (role === "patient") return patientOverview();
    const highRisk = state.patients.filter(p => p.risk === "High").length;
    const pendingMeds = state.medications.filter(m => ["pending", "review"].includes(m.status)).length;
    const pendingPgx = state.pgx.filter(g => !g.verified).length;
    const latest = state.audit.slice(0, 4);
    return `
      ${pageHead(role === "doctor" ? "Clinical command center" : "Care operations", role === "doctor" ? "Prioritized patients. Open one profile to review every clinical signal and decision in context." : "Complete patient-linked records and keep the clinical team current.", role === "assistant" ? `<button class="btn btn-primary" data-route="assistant/register">Register patient</button>` : `<button class="btn btn-primary" data-route="doctor/patients">Open patient profiles</button>`)}
      ${clinicalBanner()}
      <div class="grid grid-4">
        <div class="card metric"><span class="metric-label">Active patients</span><b class="metric-value">${state.patients.length}</b><span class="metric-delta">All records available</span></div>
        <div class="card metric"><span class="metric-label">High-risk records</span><b class="metric-value">${highRisk}</b><span class="metric-delta" style="color:var(--danger)">Priority review</span></div>
        <div class="card metric"><span class="metric-label">Medication actions</span><b class="metric-value">${pendingMeds}</b><span class="metric-delta">Awaiting doctor</span></div>
        <div class="card metric"><span class="metric-label">Unverified PGx</span><b class="metric-value">${pendingPgx}</b><span class="metric-delta">Verification queue</span></div>
      </div>
      <div class="grid grid-3" style="margin-top:17px">
        <section class="card span-2"><div class="card-head"><div><h2>Patient priority list</h2><p>Risk, adherence and next clinical action</p></div><button class="btn btn-sm btn-outline" data-route="${role}/patients">View all</button></div>${patientTable(state.patients.slice(0, 4), role)}</section>
        <section class="card"><div class="card-head"><div><h2>Recent activity</h2><p>Latest workspace updates</p></div></div><div class="list">${latest.map(a => `<div class="list-item"><div class="list-item__icon">A</div><div class="list-item__body"><b>${esc(a.action)}</b><span>${esc(a.detail)}</span></div></div>`).join("")}</div></section>
      </div>`;
  }

  function patientOverview() {
    const p = selectedPatient();
    const bio = itemsFor("biomarkers")[0];
    const meds = itemsFor("medications");
    const apt = itemsFor("appointments")[0];
    return `
      ${pageHead(`Welcome, ${esc(p.name.split(" ")[0])}`, "Your medicines, monitoring and next care actions in one place.", `<button class="btn btn-primary" data-route="patient/follow-up">Submit follow-up</button>`)}
      <div class="profile-hero"><div class="avatar">${initials(p.name)}</div><div><h2>${esc(p.name)}</h2><p>${p.id} · ${esc(p.condition)} · ${esc(p.stage)} phase</p></div><div class="profile-tags"><span>${p.adherence}% adherence</span><span>${esc(p.risk)} risk</span></div></div>
      <div class="grid grid-4">
        <div class="card metric"><span class="metric-label">Active medicines</span><b class="metric-value">${meds.length}</b><span class="metric-delta">Doctor reviewed</span></div>
        <div class="card metric"><span class="metric-label">Adherence</span><b class="metric-value">${p.adherence}%</b><span class="metric-delta">Last 30 days</span></div>
        <div class="card metric"><span class="metric-label">Latest ALT</span><b class="metric-value">${bio?.alt ?? "—"}</b><span class="metric-delta">U/L</span></div>
        <div class="card metric"><span class="metric-label">Next visit</span><b class="metric-value" style="font-size:1.3rem">${esc(apt?.date || p.nextVisit)}</b><span class="metric-delta">${esc(apt?.time || "Scheduled")}</span></div>
      </div>
      <div class="grid grid-2" style="margin-top:17px">
        <section class="card"><div class="card-head"><div><h2>Today’s medication</h2><p>Follow the prescription authorized by your doctor</p></div></div><div class="list">${meds.map(m => `<div class="list-item"><div class="list-item__icon">Rx</div><div class="list-item__body"><b>${esc(m.drug)} · ${esc(m.dose)}</b><span>${esc(m.frequency)}</span></div>${status(m.status)}</div>`).join("") || empty("No medication entries")}</div></section>
        <section class="card"><div class="card-head"><div><h2>Next appointment</h2><p>Your upcoming clinician review</p></div></div>${apt ? `<div class="list-item"><div class="list-item__icon">C</div><div class="list-item__body"><b>${esc(apt.type)}</b><span>${esc(apt.clinician)} · ${esc(apt.date)} at ${esc(apt.time)}</span></div></div>` : empty("No appointment scheduled")}</section>
      </div>`;
  }

  function patientTable(patients, role) {
    return `<div class="table-wrap"><table><thead><tr><th>Patient</th><th>Phase</th><th>Adherence</th><th>Risk</th><th>Next visit</th><th></th></tr></thead><tbody>${patients.map(p => `<tr><td><div class="patient-cell"><div class="avatar">${initials(p.name)}</div><div><b>${esc(p.name)}</b><small>${p.id}</small></div></div></td><td>${esc(p.stage)}</td><td>${p.adherence}%</td><td>${status(p.risk)}</td><td>${esc(p.nextVisit)}</td><td><button class="btn btn-sm btn-outline" data-open-patient="${p.id}" data-role="${role}">Open</button></td></tr>`).join("")}</tbody></table></div>`;
  }
  function patientsPage(role) {
    return `${pageHead("Patients", "Open an individual patient record before viewing or entering clinical information.", role === "assistant" ? `<button class="btn btn-primary" data-route="assistant/register">Register patient</button>` : "")}<section class="card"><div class="card-head"><div><h2>Patient directory</h2><p>${state.patients.length} active records</p></div></div>${patientTable(state.patients, role)}</section>`;
  }
  function patientDetailPage(role) {
    const p = selectedPatient();
    const meds = itemsFor("medications");
    const bios = itemsFor("biomarkers");
    const bio = bios[0];
    const pgx = itemsFor("pgx");
    const samples = itemsFor("samples");
    const followUps = itemsFor("followUps");
    const pendingMeds = meds.filter(m => ["pending", "review", "modified"].includes(m.status)).length;
    const pgxReady = pgx.length > 0 && pgx.every(g => g.verified);
    if (role === "doctor") {
      return `
        ${pageHead("Patient profile", "Every clinical signal and doctor action for one patient—kept together, never split across separate sections.", patientSelect("doctor/patient"))}
        ${clinicalBanner()}
        <div class="profile-hero profile-hero--doctor"><div class="avatar">${initials(p.name)}</div><div><span class="section-kicker">Integrated clinical profile</span><h2>${esc(p.name)}</h2><p>${p.id} · ${p.age} years · ${esc(p.sex)} · ${esc(p.condition)} · ${esc(p.district)}</p></div><div class="profile-tags"><span>${esc(p.stage)} phase</span><span>${p.adherence}% adherence</span><span>${esc(p.risk)} risk</span></div></div>
        <div class="grid grid-4 profile-metrics">
          <div class="card metric"><span class="metric-label">Medication actions</span><b class="metric-value">${pendingMeds}</b><span class="metric-delta">Inside this profile</span></div>
          <div class="card metric"><span class="metric-label">PGx readiness</span><b class="metric-value metric-word">${pgxReady ? "Verified" : "Review"}</b><span class="metric-delta">${pgx.length} result${pgx.length === 1 ? "" : "s"}</span></div>
          <div class="card metric"><span class="metric-label">Latest ALT / AST</span><b class="metric-value metric-word">${bio ? `${bio.alt} / ${bio.ast}` : "—"}</b><span class="metric-delta">U/L · ${esc(bio?.date || "No result")}</span></div>
          <div class="card metric"><span class="metric-label">Adherence</span><b class="metric-value">${p.adherence}%</b><span class="metric-delta">Current record</span></div>
        </div>
        <div class="profile-dashboard">
          <section class="card palette-card clinical-summary-palette"><div class="card-head"><div><span class="section-kicker">Patient context</span><h2>Clinical summary</h2></div>${status(p.risk)}</div><div class="list"><div class="list-item"><div class="list-item__icon">Dx</div><div class="list-item__body"><b>${esc(p.condition)}</b><span>Active condition</span></div></div><div class="list-item"><div class="list-item__icon">Ph</div><div class="list-item__body"><b>${esc(p.stage)} phase</b><span>Current treatment stage</span></div></div><div class="list-item"><div class="list-item__icon">V</div><div class="list-item__body"><b>${esc(p.nextVisit)}</b><span>Next clinical visit</span></div></div></div></section>

          <section class="card palette-card insight-palette"><div class="card-head"><div><span class="section-kicker">Integrated insight</span><h2>Treatment considerations</h2><p>Signals ranked for clinician review</p></div><span class="status info">Explainable</span></div><article class="insight-card"><div class="insight-rank">01</div><div><b>${pendingMeds ? "Medication review requires authorization" : "Current regimen is authorized"}</b><p>${pendingMeds ? "PGx, liver markers, adherence and current dose are assembled below for one decision." : "No open medication authorization is present; continue monitoring the linked signals."}</p><div class="context-pills"><span>PGx ${pgxReady ? "verified" : "pending"}</span><span>ALT ${bio?.alt ?? "—"}</span><span>Adherence ${p.adherence}%</span></div></div></article><article class="insight-card secondary"><div class="insight-rank">02</div><div><b>${p.risk} monitoring priority</b><p>Risk tier reflects the patient’s current linked record and does not replace clinical judgment.</p></div></article></section>

          <section class="card palette-card monitoring-palette"><div class="card-head"><div><span class="section-kicker">Monitoring</span><h2>Current signals</h2></div></div><div class="bar-row"><b>Adherence</b><div class="progress"><span style="width:${p.adherence}%"></span></div><b>${p.adherence}%</b></div><div class="list compact-list"><div class="list-item"><div class="list-item__body"><b>Latest symptoms</b><span>${esc(followUps[0]?.symptoms || "No symptom entry")}</span></div></div><div class="list-item"><div class="list-item__body"><b>Creatinine / Hb</b><span>${bio ? `${bio.creatinine} mg/dL · ${bio.hb} g/dL` : "No laboratory result"}</span></div></div></div></section>

          <section class="card palette-card biomarker-palette wide-palette"><div class="card-head"><div><span class="section-kicker">Laboratory record</span><h2>Biomarkers</h2><p>Measured values, newest first</p></div></div>${biomarkerTable(bios)}</section>

          <section class="card palette-card pgx-palette"><div class="card-head"><div><span class="section-kicker">Pharmacogenomics</span><h2>PGx reports</h2></div></div><div class="list">${pgx.map(g => `<div class="list-item"><div class="list-item__icon">G</div><div class="list-item__body"><b>${esc(g.gene)} · ${esc(g.phenotype)}</b><span>${esc(g.implication)}</span></div>${status(g.verified ? "verified" : "pending")}</div>`).join("") || empty("No PGx result")}</div></section>

          <section class="card palette-card medication-palette full-palette"><div class="card-head"><div><span class="section-kicker">Doctor authorization</span><h2>Medications and dose decisions</h2><p>Approve, modify or reject with the patient’s other signals visible on this page</p></div></div>${meds.map(m => medicationCard(m, true)).join("") || empty("No medication entries")}</section>

          <section class="card palette-card sample-palette"><div class="card-head"><div><span class="section-kicker">Specimens</span><h2>Samples</h2></div></div><div class="list">${samples.map(s => `<div class="list-item"><div class="list-item__icon">S</div><div class="list-item__body"><b>${esc(s.type)}</b><span>${esc(s.id)} · ${esc(s.date)}</span></div>${status(s.status)}</div>`).join("") || empty("No sample records")}</div></section>

          <section class="card palette-card followup-palette wide-palette"><div class="card-head"><div><span class="section-kicker">Continuity</span><h2>Follow-ups</h2><p>Patient and assistant entries</p></div></div><div class="list">${followUps.map(f => `<div class="list-item"><div class="list-item__icon">F</div><div class="list-item__body"><b>${esc(f.symptoms)} · ${f.adherence}% adherence</b><span>${esc(f.date)} · ${esc(f.source)}<br>${esc(f.notes)}</span></div></div>`).join("") || empty("No follow-up records")}</div></section>
        </div>`;
    }
    return `
      ${pageHead("Patient record", "A single patient context across clinical entries and review actions.", patientSelect(`${role}/patient`))}
      <div class="profile-hero"><div class="avatar">${initials(p.name)}</div><div><h2>${esc(p.name)}</h2><p>${p.id} · ${p.age} years · ${esc(p.sex)} · ${esc(p.district)}</p></div><div class="profile-tags"><span>${esc(p.stage)}</span><span>${p.adherence}% adherence</span><span>${esc(p.risk)} risk</span></div></div>
      <div class="grid grid-3">
        <section class="card"><div class="card-head"><div><h3>Clinical summary</h3></div></div><div class="list"><div class="list-item"><div class="list-item__icon">Dx</div><div class="list-item__body"><b>${esc(p.condition)}</b><span>Active condition</span></div></div><div class="list-item"><div class="list-item__icon">Ph</div><div class="list-item__body"><b>${esc(p.stage)}</b><span>Treatment phase</span></div></div><div class="list-item"><div class="list-item__icon">R</div><div class="list-item__body"><b>${esc(p.risk)} risk</b><span>Current review tier</span></div></div></div></section>
        <section class="card"><div class="card-head"><div><h3>Latest biomarkers</h3></div></div>${bio ? `<div class="list"><div class="list-item"><div class="list-item__body"><b>ALT / AST</b><span>${esc(bio.date)}</span></div><span class="list-item__value">${bio.alt} / ${bio.ast} U/L</span></div><div class="list-item"><div class="list-item__body"><b>Creatinine</b><span>Renal marker</span></div><span class="list-item__value">${bio.creatinine} mg/dL</span></div><div class="list-item"><div class="list-item__body"><b>Hemoglobin</b><span>Latest value</span></div><span class="list-item__value">${bio.hb} g/dL</span></div></div>` : empty("No biomarker entry")}</section>
        <section class="card"><div class="card-head"><div><h3>PGx status</h3></div></div><div class="list">${pgx.map(g => `<div class="list-item"><div class="list-item__icon">G</div><div class="list-item__body"><b>${esc(g.gene)}</b><span>${esc(g.phenotype)}</span></div>${status(g.verified ? "verified" : "pending")}</div>`).join("") || empty("No PGx result")}</div></section>
        <section class="card span-3"><div class="card-head"><div><h3>Medication record</h3><p>Current entries and doctor status</p></div></div><div class="table-wrap"><table><thead><tr><th>Medication</th><th>Dose</th><th>Frequency</th><th>Status</th></tr></thead><tbody>${meds.map(m => `<tr><td><b>${esc(m.drug)}</b></td><td>${esc(m.dose)}</td><td>${esc(m.frequency)}</td><td>${status(m.status)}</td></tr>`).join("")}</tbody></table></div></section>
      </div>`;
  }

  function doctorMedicationsPage() {
    return `${pageHead("Medication decisions", "Approve, modify or reject entries after reviewing patient-specific context.", patientSelect("doctor/medications"))}${clinicalBanner()}<section class="card"><div class="card-head"><div><h2>${esc(selectedPatient().name)}</h2><p>Medication authorization queue</p></div></div>${itemsFor("medications").map(m => medicationCard(m, true)).join("") || empty("No medication entries")}</section>`;
  }
  function medicationCard(m, controls) {
    return `<article class="medication-card"><div><div class="action-row"><h3>${esc(m.drug)}</h3>${status(m.status)}</div><p>${esc(patientName(m.patientId))} · ${esc(m.frequency)}</p><div class="dose">${esc(m.dose)}</div><div class="recommendation"><b>Clinical consideration:</b> ${esc(m.recommendation)}</div></div>${controls ? `<div class="medication-actions"><button class="btn btn-sm btn-primary" data-med-decision="approved" data-id="${m.id}">Approve</button><button class="btn btn-sm btn-outline" data-modify-med="${m.id}">Modify</button><button class="btn btn-sm btn-danger" data-med-decision="rejected" data-id="${m.id}">Reject</button></div>` : ""}</article>`;
  }
  function doseReviewPage() {
    const queue = state.medications.filter(m => ["pending", "review", "modified"].includes(m.status));
    return `${pageHead("Dose review queue", "Patient-specific medication records ordered by urgency.")} ${clinicalBanner()}<section class="card"><div class="card-head"><div><h2>Reviews requiring authorization</h2><p>${queue.length} open actions</p></div></div>${queue.map(m => medicationCard(m, true)).join("") || empty("No open dose reviews")}</section>`;
  }

  function pgxPage(role) {
    if (role === "patient") {
      const rows = itemsFor("pgx");
      return `${pageHead("My PGx report", "Genetic factors that may help your doctor interpret medication response.")}${clinicalBanner()}<div class="grid grid-2">${rows.map(g => `<section class="card"><div class="card-head"><div><h2>${esc(g.gene)}</h2><p>Pharmacogenomic result</p></div>${status(g.verified ? "verified" : "pending")}</div><div class="list"><div class="list-item"><div class="list-item__body"><b>Phenotype</b><span>${esc(g.phenotype)}</span></div></div><div class="list-item"><div class="list-item__body"><b>Clinical context</b><span>${esc(g.implication)}</span></div></div></div></section>`).join("") || empty("No PGx report")}</div>`;
    }
    const form = role === "assistant" ? pgxForm() : "";
    return `${pageHead(role === "assistant" ? "PGx entry and verification" : "PGx reports", "Review phenotype interpretation inside the patient’s complete clinical context.", patientSelect(`${role}/pgx`))}${clinicalBanner()}<div class="grid grid-2">${form}<section class="card ${form ? "" : "span-2"}"><div class="card-head"><div><h2>${esc(selectedPatient().name)}</h2><p>Patient-linked PGx results</p></div></div><div class="list">${itemsFor("pgx").map(g => `<div class="list-item"><div class="list-item__icon">G</div><div class="list-item__body"><b>${esc(g.gene)} · ${esc(g.phenotype)}</b><span>${esc(g.implication)}</span></div>${status(g.verified ? "verified" : "pending")}${role === "assistant" && !g.verified ? `<button class="btn btn-sm btn-primary" data-verify-pgx="${g.id}">Verify</button>` : ""}</div>`).join("") || empty("No PGx result")}</div></section></div>`;
  }
  function pgxForm() {
    return `<section class="card"><div class="card-head"><div><h2>Add PGx result</h2><p>Entry remains unverified until checked</p></div></div><form data-form="pgx"><div class="form-grid"><div class="field"><label for="pgx-gene">Gene</label><input id="pgx-gene" name="gene" required placeholder="e.g. NAT2"></div><div class="field"><label for="pgx-phenotype">Phenotype</label><input id="pgx-phenotype" name="phenotype" required placeholder="e.g. Slow acetylator"></div><div class="field full"><label for="pgx-implication">Clinical context</label><textarea id="pgx-implication" name="implication" required placeholder="Record the laboratory interpretation; do not enter an autonomous prescription."></textarea></div></div><div class="form-actions"><button class="btn btn-primary" type="submit">Save unverified result</button></div></form></section>`;
  }

  function monitoringPage(role) {
    const p = selectedPatient();
    const bios = itemsFor("biomarkers");
    const fus = itemsFor("followUps");
    return `${pageHead(role === "patient" ? "My monitoring" : "Clinical monitoring", "A direct record of biomarker values, adherence and reported symptoms.", role !== "patient" ? patientSelect(`${role}/monitoring`) : "")}
      <div class="grid grid-4"><div class="card metric"><span class="metric-label">Adherence</span><b class="metric-value">${p.adherence}%</b><span class="metric-delta">30-day record</span></div><div class="card metric"><span class="metric-label">Latest ALT</span><b class="metric-value">${bios[0]?.alt ?? "—"}</b><span class="metric-delta">U/L</span></div><div class="card metric"><span class="metric-label">Latest AST</span><b class="metric-value">${bios[0]?.ast ?? "—"}</b><span class="metric-delta">U/L</span></div><div class="card metric"><span class="metric-label">Follow-ups</span><b class="metric-value">${fus.length}</b><span class="metric-delta">Recorded entries</span></div></div>
      <div class="grid grid-2" style="margin-top:17px"><section class="card"><div class="card-head"><div><h2>Adherence</h2><p>Current reported completion</p></div></div><div class="bar-row"><b>Completed</b><div class="progress"><span style="width:${p.adherence}%"></span></div><b>${p.adherence}%</b></div><div class="bar-row"><b>Target</b><div class="progress"><span style="width:95%"></span></div><b>95%</b></div></section><section class="card"><div class="card-head"><div><h2>Recent follow-ups</h2><p>Symptoms and adherence entries</p></div></div><div class="list">${fus.map(f => `<div class="list-item"><div class="list-item__icon">F</div><div class="list-item__body"><b>${esc(f.symptoms)}</b><span>${esc(f.date)} · ${esc(f.source)} · ${f.adherence}% adherence</span></div></div>`).join("") || empty("No follow-up entries")}</div></section></div>
      <section class="card" style="margin-top:17px"><div class="card-head"><div><h2>Biomarker history</h2><p>Recorded laboratory values, newest first</p></div></div>${biomarkerTable(bios)}</section>`;
  }

  function alertsPage() {
    const alerts = [
      { patientId: "NXS-1124", title: "Liver enzymes above review threshold", detail: "ALT 76 U/L and AST 69 U/L; medication decision remains pending.", level: "high" },
      { patientId: "NXS-1048", title: "Dose review ready", detail: "NAT2 result and current biomarker record are available for Isoniazid review.", level: "review" },
      { patientId: "NXS-1157", title: "PGx verification pending", detail: "SLCO1B1 result requires clinical-assistant verification.", level: "pending" }
    ];
    return `${pageHead("Clinical alerts", "Signals requiring attention, ordered by potential clinical impact.")}${clinicalBanner()}<section class="card"><div class="list">${alerts.map(a => `<div class="list-item"><div class="list-item__icon">!</div><div class="list-item__body"><b>${esc(a.title)}</b><span>${esc(patientName(a.patientId))} · ${esc(a.detail)}</span></div>${status(a.level)}<button class="btn btn-sm btn-outline" data-open-patient="${a.patientId}" data-role="doctor">Open</button></div>`).join("")}</div></section>`;
  }

  function auditPage(role) {
    return `${pageHead("Audit trail", "Traceable record of clinical and administrative actions.")}<section class="card"><div class="card-head"><div><h2>Workspace activity</h2><p>Newest action first</p></div></div><div class="audit-list">${state.audit.map(a => `<div class="audit-entry"><time>${esc(a.at)}</time><div><b>${esc(a.action)}</b><p>${esc(a.detail)}</p></div><span class="status info">${esc(a.actor)}</span></div>`).join("")}</div></section>`;
  }
  function settingsPage() {
    return `${pageHead("Workspace settings", "Local prototype controls and clinical-use boundary.")}<div class="grid grid-2"><section class="card"><div class="card-head"><div><h2>Local data</h2><p>This browser stores all records for the prototype</p></div></div><p style="color:var(--muted);line-height:1.7;font-size:.82rem">Resetting restores the seeded patients, medications, PGx, biomarker and follow-up records. It does not contact any external service.</p><button class="btn btn-danger" data-action="confirm-reset">Reset workspace data</button></section><section class="card"><div class="card-head"><div><h2>Clinical use</h2><p>Required operating boundary</p></div></div><div class="list"><div class="list-item"><div class="list-item__icon">1</div><div class="list-item__body"><b>Decision support only</b><span>Outputs organize information for professional review.</span></div></div><div class="list-item"><div class="list-item__icon">2</div><div class="list-item__body"><b>Doctor approval required</b><span>No medication or dose changes itself.</span></div></div><div class="list-item"><div class="list-item__icon">3</div><div class="list-item__body"><b>Validate before clinical use</b><span>The sample model and data are not a clinical device.</span></div></div></div></section></div>`;
  }

  function registerPage() {
    return `${pageHead("Register patient", "Create a patient record before adding samples, biomarkers or medications.")}<section class="card"><form data-form="patient"><div class="form-grid"><div class="field"><label for="p-name">Full name</label><input id="p-name" name="name" required></div><div class="field"><label for="p-age">Age</label><input id="p-age" name="age" type="number" min="1" max="120" required></div><div class="field"><label for="p-sex">Sex</label><select id="p-sex" name="sex" required><option value="">Select</option><option>Female</option><option>Male</option><option>Other</option></select></div><div class="field"><label for="p-phone">Phone</label><input id="p-phone" name="phone" required></div><div class="field"><label for="p-district">District</label><input id="p-district" name="district" required></div><div class="field"><label for="p-condition">Condition</label><input id="p-condition" name="condition" value="Pulmonary TB" required></div><div class="field"><label for="p-stage">Treatment phase</label><select id="p-stage" name="stage"><option>Initiation</option><option>Maintenance</option><option>Dose review</option></select></div><div class="field"><label for="p-risk">Initial risk tier</label><select id="p-risk" name="risk"><option>Low</option><option selected>Moderate</option><option>High</option></select></div></div><div class="form-actions"><button class="btn btn-primary" type="submit">Create patient record</button></div></form></section>`;
  }

  function samplesPage() {
    return `${pageHead("Samples", "Record collection status against the selected patient.", patientSelect("assistant/samples"))}<div class="grid grid-2"><section class="card"><div class="card-head"><div><h2>Add sample</h2><p>${esc(selectedPatient().name)}</p></div></div><form data-form="sample"><div class="form-grid"><div class="field"><label for="sample-type">Sample type</label><select id="sample-type" name="type"><option>Whole blood</option><option>Plasma</option><option>Serum</option><option>Sputum</option></select></div><div class="field"><label for="sample-date">Collection date</label><input id="sample-date" name="date" type="date" value="${today()}" required></div><div class="field full"><label for="sample-status">Status</label><select id="sample-status" name="status"><option>Collected</option><option>In laboratory</option><option>Processed</option></select></div></div><div class="form-actions"><button class="btn btn-primary" type="submit">Save sample</button></div></form></section><section class="card"><div class="card-head"><div><h2>Patient samples</h2><p>Newest records</p></div></div><div class="list">${itemsFor("samples").map(s => `<div class="list-item"><div class="list-item__icon">S</div><div class="list-item__body"><b>${esc(s.type)}</b><span>${esc(s.id)} · ${esc(s.date)}</span></div>${status(s.status)}<button class="btn btn-sm btn-danger" data-delete="samples" data-id="${s.id}">Delete</button></div>`).join("") || empty("No sample records")}</div></section></div>`;
  }

  function biomarkersPage() {
    return `${pageHead("Biomarkers", "Enter measured laboratory values for one selected patient.", patientSelect("assistant/biomarkers"))}<div class="grid grid-2"><section class="card"><div class="card-head"><div><h2>Add laboratory values</h2><p>${esc(selectedPatient().name)}</p></div></div><form data-form="biomarker"><div class="form-grid"><div class="field"><label for="bio-date">Collection date</label><input id="bio-date" name="date" type="date" value="${today()}" required></div><div class="field"><label for="bio-alt">ALT (U/L)</label><input id="bio-alt" name="alt" type="number" min="0" step="0.1" required></div><div class="field"><label for="bio-ast">AST (U/L)</label><input id="bio-ast" name="ast" type="number" min="0" step="0.1" required></div><div class="field"><label for="bio-creatinine">Creatinine (mg/dL)</label><input id="bio-creatinine" name="creatinine" type="number" min="0" step="0.1" required></div><div class="field full"><label for="bio-hb">Hemoglobin (g/dL)</label><input id="bio-hb" name="hb" type="number" min="0" step="0.1" required></div></div><div class="form-actions"><button class="btn btn-primary" type="submit">Save biomarkers</button></div></form></section><section class="card"><div class="card-head"><div><h2>Biomarker history</h2><p>Newest first</p></div></div>${biomarkerTable(itemsFor("biomarkers"), true)}</section></div>`;
  }
  function biomarkerTable(rows, controls = false) {
    if (!rows.length) return empty("No biomarker records");
    return `<div class="table-wrap"><table><thead><tr><th>Date</th><th>ALT</th><th>AST</th><th>Creatinine</th><th>Hb</th>${controls ? "<th></th>" : ""}</tr></thead><tbody>${rows.map(b => `<tr><td>${esc(b.date)}</td><td>${b.alt}</td><td>${b.ast}</td><td>${b.creatinine}</td><td>${b.hb}</td>${controls ? `<td><button class="btn btn-sm btn-danger" data-delete="biomarkers" data-id="${b.id}">Delete</button></td>` : ""}</tr>`).join("")}</tbody></table></div>`;
  }

  function assistantMedicationsPage() {
    return `${pageHead("Medication entry", "Record a proposed medication; only a doctor can authorize it.", patientSelect("assistant/medications"))}${clinicalBanner()}<div class="grid grid-2"><section class="card"><div class="card-head"><div><h2>Add medication</h2><p>Status will be pending</p></div></div><form data-form="medication"><div class="form-grid"><div class="field"><label for="med-drug">Drug</label><input id="med-drug" name="drug" required></div><div class="field"><label for="med-dose">Dose</label><input id="med-dose" name="dose" required placeholder="e.g. 300 mg"></div><div class="field full"><label for="med-frequency">Frequency</label><input id="med-frequency" name="frequency" required value="Once daily"></div><div class="field full"><label for="med-note">Clinical note</label><textarea id="med-note" name="recommendation" required></textarea></div></div><div class="form-actions"><button class="btn btn-primary" type="submit">Send for doctor review</button></div></form></section><section class="card"><div class="card-head"><div><h2>Patient medication entries</h2><p>${esc(selectedPatient().name)}</p></div></div>${itemsFor("medications").map(m => medicationCard(m, false)).join("") || empty("No medication entries")}</section></div>`;
  }

  function followUpsPage(role) {
    const patientView = role === "patient";
    return `${pageHead(patientView ? "Submit follow-up" : "Follow-ups", patientView ? "Send adherence, symptoms and notes to your care team." : "Record or review follow-up information for one patient.", patientView ? "" : patientSelect("assistant/follow-ups"))}<div class="grid grid-2"><section class="card"><div class="card-head"><div><h2>${patientView ? "New follow-up" : "Add follow-up"}</h2><p>${esc(selectedPatient().name)}</p></div></div><form data-form="followup" data-source="${patientView ? "Patient" : "Clinical assistant"}"><div class="form-grid"><div class="field"><label for="fu-date">Date</label><input id="fu-date" name="date" type="date" value="${today()}" required></div><div class="field"><label for="fu-adherence">Adherence (%)</label><input id="fu-adherence" name="adherence" type="number" min="0" max="100" required></div><div class="field full"><label for="fu-symptoms">Symptoms</label><input id="fu-symptoms" name="symptoms" required placeholder="Short factual description"></div><div class="field full"><label for="fu-notes">Notes</label><textarea id="fu-notes" name="notes" required></textarea></div></div><div class="form-actions"><button class="btn btn-primary" type="submit">Submit follow-up</button></div></form></section><section class="card"><div class="card-head"><div><h2>Previous follow-ups</h2><p>Patient-linked entries</p></div></div><div class="list">${itemsFor("followUps").map(f => `<div class="list-item"><div class="list-item__icon">F</div><div class="list-item__body"><b>${esc(f.symptoms)} · ${f.adherence}%</b><span>${esc(f.date)} · ${esc(f.source)}<br>${esc(f.notes)}</span></div><button class="btn btn-sm btn-danger" data-delete="followUps" data-id="${f.id}">Delete</button></div>`).join("") || empty("No follow-up records")}</div></section></div>`;
  }

  function patientMedicationsPage() {
    return `${pageHead("My medications", "Medication instructions and current doctor-authorization status.")}${clinicalBanner()}<section class="card">${itemsFor("medications").map(m => medicationCard(m, false)).join("") || empty("No medication entries")}</section>`;
  }
  function appointmentsPage() {
    return `${pageHead("Appointments", "Upcoming reviews scheduled by your care team.")}<section class="card"><div class="list">${itemsFor("appointments").map(a => `<div class="list-item"><div class="list-item__icon">C</div><div class="list-item__body"><b>${esc(a.type)}</b><span>${esc(a.date)} at ${esc(a.time)} · ${esc(a.clinician)}</span></div>${status("confirmed")}</div>`).join("") || empty("No appointments scheduled")}</div></section>`;
  }
  function recordsPage() {
    const records = [
      ...itemsFor("biomarkers").map(x => ({ date: x.date, title: "Laboratory biomarkers", detail: `ALT ${x.alt}, AST ${x.ast}, creatinine ${x.creatinine}, Hb ${x.hb}` })),
      ...itemsFor("pgx").map(x => ({ date: "PGx", title: `${x.gene} report`, detail: `${x.phenotype} · ${x.verified ? "Verified" : "Verification pending"}` })),
      ...itemsFor("samples").map(x => ({ date: x.date, title: `${x.type} sample`, detail: `${x.id} · ${x.status}` }))
    ];
    return `${pageHead("Health records", "Laboratory, PGx and sample records shared with your care team.")}<section class="card"><div class="list">${records.map(r => `<div class="list-item"><div class="list-item__icon">R</div><div class="list-item__body"><b>${esc(r.title)}</b><span>${esc(r.date)} · ${esc(r.detail)}</span></div></div>`).join("") || empty("No health records")}</div></section>`;
  }
  function profilePage() {
    const p = selectedPatient();
    return `${pageHead("Profile", "Your patient identity and care-team contact details.")}<div class="profile-hero"><div class="avatar">${initials(p.name)}</div><div><h2>${esc(p.name)}</h2><p>${p.id} · ${esc(p.condition)}</p></div><div class="profile-tags"><span>${esc(p.stage)}</span><span>${esc(p.district)}</span></div></div><div class="grid grid-2"><section class="card"><div class="card-head"><div><h2>Personal details</h2></div></div><div class="list"><div class="list-item"><div class="list-item__body"><b>Age and sex</b><span>${p.age} years · ${esc(p.sex)}</span></div></div><div class="list-item"><div class="list-item__body"><b>Phone</b><span>${esc(p.phone)}</span></div></div><div class="list-item"><div class="list-item__body"><b>District</b><span>${esc(p.district)}</span></div></div></div></section><section class="card"><div class="card-head"><div><h2>Care team</h2></div></div><div class="list"><div class="list-item"><div class="list-item__icon">D</div><div class="list-item__body"><b>Dr. Priya Sharma</b><span>Treating pulmonologist</span></div></div><div class="list-item"><div class="list-item__icon">A</div><div class="list-item__body"><b>Rohan Verma</b><span>Clinical assistant</span></div></div></div></section></div>`;
  }

  function empty(message) { return `<div class="empty"><strong>${esc(message)}</strong>No matching patient-linked entries are available.</div>`; }

  function openModifyModal(id) {
    const med = state.medications.find(m => m.id === id);
    if (!med) return;
    modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" data-modal-panel><h2 id="modal-title">Modify dose</h2><p>Record the clinician-authorized dose and reason. The change is added to the audit trail.</p><form data-form="modify-med" data-id="${med.id}"><div class="form-grid"><div class="field full"><label for="new-dose">Authorized dose</label><input id="new-dose" name="dose" value="${esc(med.dose)}" required></div><div class="field full"><label for="change-reason">Clinical reason</label><textarea id="change-reason" name="reason" required></textarea></div></div><div class="form-actions"><button class="btn btn-outline" type="button" data-action="close-modal">Cancel</button><button class="btn btn-primary" type="submit">Save modification</button></div></form></section></div>`;
    modalRoot.querySelector("input")?.focus();
  }
  function confirmReset() {
    modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="reset-title" data-modal-panel><h2 id="reset-title">Reset workspace data?</h2><p>This restores the original patient and clinical records stored in this browser.</p><div class="form-actions"><button class="btn btn-outline" data-action="close-modal">Cancel</button><button class="btn btn-danger" data-action="reset-data">Reset data</button></div></section></div>`;
  }

  document.addEventListener("click", event => {
    const routeTarget = event.target.closest("[data-route]");
    if (routeTarget) { navigate(routeTarget.dataset.route); return; }
    const openPatient = event.target.closest("[data-open-patient]");
    if (openPatient) { state.activePatientId = openPatient.dataset.openPatient; saveState(); navigate(`${openPatient.dataset.role}/patient`); return; }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "open-menu") document.querySelector(".portal")?.classList.add("sidebar-open");
    if (action === "close-menu") document.querySelector(".portal")?.classList.remove("sidebar-open");
    if (action === "close-modal" && !event.target.closest("[data-modal-panel]") || event.target.closest("[data-action='close-modal']")?.matches("button")) modalRoot.innerHTML = "";
    if (action === "confirm-reset") confirmReset();
    if (action === "reset-data") { state = clone(SEED); saveState("Workspace data restored."); modalRoot.innerHTML = ""; render(); }
    const decision = event.target.closest("[data-med-decision]");
    if (decision) {
      const med = state.medications.find(m => m.id === decision.dataset.id);
      if (!med) return;
      med.status = decision.dataset.medDecision;
      audit("Dr. Priya Sharma", `Medication ${med.status}`, `${med.drug} ${med.dose} for ${patientName(med.patientId)}`);
      saveState(`Medication ${med.status}.`); render();
    }
    const modify = event.target.closest("[data-modify-med]");
    if (modify) openModifyModal(modify.dataset.modifyMed);
    const verify = event.target.closest("[data-verify-pgx]");
    if (verify) {
      const result = state.pgx.find(g => g.id === verify.dataset.verifyPgx);
      if (!result) return;
      result.verified = true;
      audit("Rohan Verma", "PGx report verified", `${result.gene} for ${patientName(result.patientId)}`);
      saveState("PGx report verified."); render();
    }
    const del = event.target.closest("[data-delete]");
    if (del) {
      const collection = del.dataset.delete;
      const item = state[collection]?.find(x => x.id === del.dataset.id);
      if (!item) return;
      state[collection] = state[collection].filter(x => x.id !== del.dataset.id);
      audit(currentPath().startsWith("patient/") ? selectedPatient().name : "Rohan Verma", "Entry deleted", `${collection} entry ${item.id} for ${patientName(item.patientId)}`);
      saveState("Entry deleted and recorded in the audit trail."); render();
    }
  });

  document.addEventListener("change", event => {
    const picker = event.target.closest("[data-patient-route]");
    if (!picker) return;
    state.activePatientId = picker.value;
    saveState();
    render();
  });

  document.addEventListener("submit", event => {
    const form = event.target.closest("form[data-form]");
    if (!form) return;
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const type = form.dataset.form;
    if (type === "patient") {
      const id = `NXS-${1200 + state.patients.length * 17}`;
      const p = { id, name: data.name, age: Number(data.age), sex: data.sex, phone: data.phone, district: data.district, condition: data.condition, stage: data.stage, risk: data.risk, adherence: 100, nextVisit: "Not scheduled" };
      state.patients.push(p); state.activePatientId = id;
      audit("Rohan Verma", "Patient registered", `${p.name} · ${id}`);
      saveState("Patient record created."); navigate("assistant/patient"); return;
    }
    if (type === "sample") {
      const item = { id: `SMP-${Date.now().toString().slice(-6)}`, patientId: state.activePatientId, type: data.type, date: data.date, status: data.status };
      state.samples.unshift(item); audit("Rohan Verma", "Sample entry added", `${item.type} for ${patientName(item.patientId)}`); saveState("Sample entry saved."); render(); return;
    }
    if (type === "biomarker") {
      const item = { id: `BIO-${Date.now()}`, patientId: state.activePatientId, date: data.date, alt: Number(data.alt), ast: Number(data.ast), creatinine: Number(data.creatinine), hb: Number(data.hb) };
      state.biomarkers.unshift(item); audit("Rohan Verma", "Biomarkers recorded", `ALT, AST, creatinine and Hb for ${patientName(item.patientId)}`); saveState("Biomarkers saved."); render(); return;
    }
    if (type === "pgx") {
      const item = { id: `PGX-${Date.now()}`, patientId: state.activePatientId, gene: data.gene, phenotype: data.phenotype, implication: data.implication, verified: false };
      state.pgx.unshift(item); audit("Rohan Verma", "PGx result entered", `${item.gene} for ${patientName(item.patientId)}`); saveState("PGx result saved for verification."); render(); return;
    }
    if (type === "medication") {
      const item = { id: `MED-${Date.now()}`, patientId: state.activePatientId, drug: data.drug, dose: data.dose, frequency: data.frequency, recommendation: data.recommendation, status: "pending" };
      state.medications.unshift(item); audit("Rohan Verma", "Medication entry created", `${item.drug} ${item.dose} for ${patientName(item.patientId)}`); saveState("Medication sent for doctor review."); render(); return;
    }
    if (type === "followup") {
      const item = { id: `FU-${Date.now()}`, patientId: state.activePatientId, date: data.date, adherence: Number(data.adherence), symptoms: data.symptoms, notes: data.notes, source: form.dataset.source };
      state.followUps.unshift(item);
      const p = selectedPatient(); p.adherence = item.adherence;
      audit(item.source === "Patient" ? p.name : "Rohan Verma", "Follow-up submitted", `${item.symptoms} · ${item.adherence}% adherence for ${p.name}`);
      saveState("Follow-up submitted to the care record."); render(); return;
    }
    if (type === "modify-med") {
      const med = state.medications.find(m => m.id === form.dataset.id);
      if (!med) return;
      med.dose = data.dose; med.status = "modified"; med.recommendation = data.reason;
      audit("Dr. Priya Sharma", "Medication dose modified", `${med.drug} changed to ${med.dose} for ${patientName(med.patientId)} · ${data.reason}`);
      saveState("Dose modification saved."); modalRoot.innerHTML = ""; render();
    }
  });

  window.addEventListener("hashchange", render);
  if (!location.hash) history.replaceState(null, "", "#/home");
  render();
})();
