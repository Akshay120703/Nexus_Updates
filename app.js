(() => {
  "use strict";

  const ROUTES = [
    { path: "home", role: "public", label: "Home" },
    { path: "guest/assessment", role: "public", label: "AI health assessment" },
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
    { path: "assistant/tasks", role: "assistant", label: "My tasks", icon: "T" },
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
    { path: "patient/assessment", role: "patient", label: "AI assessment", icon: "Q" },
    { path: "patient/medications", role: "patient", label: "My medications", icon: "M" },
    { path: "patient/monitoring", role: "patient", label: "My monitoring", icon: "V" },
    { path: "patient/follow-up", role: "patient", label: "Submit follow-up", icon: "+" },
    { path: "patient/pgx", role: "patient", label: "My PGx report", icon: "G" },
    { path: "patient/appointments", role: "patient", label: "Appointments", icon: "C" },
    { path: "patient/records", role: "patient", label: "Health records", icon: "R" },
    { path: "patient/profile", role: "patient", label: "Profile", icon: "P" }
  ];

  if (new Set(ROUTES.map(r => r.path)).size !== ROUTES.length) {
    throw new Error("NEXUS route registry must contain unique routes.");
  }

  const ASSESSMENT_QUESTIONS = [
    { id: "cough", label: "How long have you had a persistent cough?", options: [["No persistent cough", 0], ["Less than 2 weeks", 1], ["2–3 weeks", 3], ["More than 3 weeks", 4]] },
    { id: "fever", label: "How frequently have you experienced fever?", options: [["Not recently", 0], ["Occasionally", 1], ["Several days this week", 3], ["Daily or persistent", 4]] },
    { id: "sweats", label: "Do you wake with night sweats?", options: [["Never", 0], ["Rarely", 1], ["Some nights", 2], ["Most nights", 3]] },
    { id: "weight", label: "Have you had unexplained weight loss?", options: [["No", 0], ["Unsure", 1], ["About 2–4 kg", 2], ["More than 4 kg", 4]] },
    { id: "appetite", label: "How has your appetite changed?", options: [["No change", 0], ["Slightly reduced", 1], ["Clearly reduced", 2], ["Very poor", 3]] },
    { id: "fatigue", label: "How much fatigue affects your normal activities?", options: [["Not at all", 0], ["Mildly", 1], ["Moderately", 2], ["Severely", 3]] },
    { id: "exposure", label: "Have you had close contact with a person diagnosed with TB?", options: [["No known contact", 0], ["Unsure", 1], ["Past contact", 2], ["Recent close contact", 4]] },
    { id: "sputum", label: "Which description best matches your cough?", options: [["Dry or no cough", 0], ["Some sputum", 1], ["Frequent sputum", 2], ["Blood-streaked sputum", 4]] },
    { id: "history", label: "Have you previously been treated for TB?", options: [["No", 0], ["Unsure", 1], ["Yes, completed treatment", 2], ["Yes, treatment was interrupted", 4]] },
    { id: "liver", label: "Do you have a known liver condition or previous medicine-related liver reaction?", options: [["No", 0], ["Unsure", 1], ["Past mild concern", 2], ["Known condition or reaction", 4]] },
    { id: "kidney", label: "Do you have a known kidney condition?", options: [["No", 0], ["Unsure", 1], ["Mild condition", 2], ["Moderate or severe condition", 4]] },
    { id: "bodyWeight", label: "Which range includes your current body weight?", options: [["Below 40 kg", 1], ["40–54 kg", 2], ["55–69 kg", 3], ["70 kg or above", 4]] }
  ];

  const SEED = {
    activePatientId: "NXS-1048",
    patients: [
      { id: "NXS-1048", name: "Aarav Mehta", age: 42, sex: "Male", weight: 68, phone: "+91 98••• 2146", condition: "Pulmonary TB", risk: "Moderate", stage: "Maintenance", adherence: 94, nextVisit: "18 Sep 2026", district: "Varanasi", intake: { mainComplaint: "Persistent cough and fatigue", duration: "Three weeks", symptoms: "Productive cough, evening fever, night sweats", conditions: ["Hypertension"], otherCondition: "", currentMedications: "Telmisartan 40 mg once daily", sideEffects: "None reported", adverseReaction: "No", drugAllergies: "No", allergyDetails: "", familyIllness: "No", familyDetails: "", smoking: "No", alcohol: "No", concern: "Whether the current treatment will interact with blood-pressure medicine" } },
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
    assessments: [
      { id: "ASM-901", patientId: "NXS-1124", email: "kabir@example.com", at: "10 Sep 2026, 14:20", score: 29, confidence: 83, likelihood: "High", status: "Waiting for doctor's approval", parameters: [{ label: "Respiratory symptoms", value: 88 }, { label: "Systemic symptoms", value: 74 }, { label: "Exposure and history", value: 65 }, { label: "Hepatic caution", value: 75 }, { label: "Renal caution", value: 25 }], medicines: [{ drug: "Isoniazid", percent: 70, basis: "Weight and hepatic caution" }, { drug: "Rifampicin", percent: 90, basis: "Weight and interaction caution" }, { drug: "Pyrazinamide", percent: 65, basis: "Weight and hepatic caution" }, { drug: "Ethambutol", percent: 85, basis: "Weight and renal caution" }] }
    ],
    tasks: [
      { id: "TSK-101", patientId: "NXS-1157", title: "Verify SLCO1B1 report", due: "Today, 12:30", priority: "High", status: "Pending", assignedTo: "Rohan Verma" },
      { id: "TSK-102", patientId: "NXS-1124", title: "Record repeat liver panel", due: "Today, 15:00", priority: "High", status: "Pending", assignedTo: "Rohan Verma" },
      { id: "TSK-103", patientId: "NXS-1048", title: "Confirm follow-up call", due: "16 Sep, 10:00", priority: "Normal", status: "Pending", assignedTo: "Rohan Verma" },
      { id: "TSK-104", patientId: "NXS-1081", title: "Prepare monthly sample labels", due: "18 Sep, 09:00", priority: "Normal", status: "Pending", assignedTo: "Rohan Verma" }
    ],
    signedInEmail: "",
    guestReport: null,
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
      if (!parsed || !Array.isArray(parsed.patients)) return clone(SEED);
      return {
        ...clone(SEED),
        ...parsed,
        assessments: Array.isArray(parsed.assessments) ? parsed.assessments : clone(SEED.assessments),
        tasks: Array.isArray(parsed.tasks) ? parsed.tasks : clone(SEED.tasks)
      };
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
  function nextPatientId() { return `NXS-${1200 + state.patients.length * 17}`; }
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
    if (route.path === "home") app.innerHTML = landingPage();
    else if (route.path === "guest/assessment") app.innerHTML = publicAssessmentPage();
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
              <article class="role-card assessment"><div class="role-icon">AI</div><h3>Free AI health assessment</h3><p>Answer a focused symptom questionnaire and receive an AI-only preliminary result with modeled medicine-dose percentages. No account or care team is assigned.</p><button class="btn btn-outline" data-route="guest/assessment">Start without signing in</button></article>
              <article class="role-card patient"><div class="role-icon">P</div><h3>Patient</h3><p>Sign in with email to complete a linked assessment, view doctor-approved medicine doses and monitor your care record.</p><button class="btn btn-outline" data-action="patient-signin">Sign in to patient portal</button></article>
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

  function assessmentForm(mode) {
    return `<form class="assessment-form" data-form="assessment" data-mode="${mode}">
      <div class="assessment-intro"><div><span class="section-kicker">NEXUS AI assessment</span><h2>Tell us what you are experiencing</h2><p>Select one answer for every item. Your responses are processed together to create a preliminary pulmonary-TB likelihood and modeled dose percentages.</p></div><span class="assessment-mode">${mode === "guest" ? "Guest · AI only" : "Signed in · Doctor review"}</span></div>
      <div class="question-grid">${ASSESSMENT_QUESTIONS.map((q, index) => `<fieldset class="question-card"><legend><span>${String(index + 1).padStart(2, "0")}</span>${esc(q.label)}</legend><div class="option-grid">${q.options.map(([label, value]) => `<label class="answer-option"><input type="radio" name="q_${q.id}" value="${value}" required><span>${esc(label)}</span></label>`).join("")}</div></fieldset>`).join("")}</div>
      <div class="assessment-submit"><div><b>${mode === "guest" ? "No doctor or clinical assistant will be assigned." : `The report will be linked to ${esc(state.signedInEmail || "your patient account")}.`}</b><span>The generated percentages are assessment outputs and require clinical confirmation before any medicine is used or changed.</span></div><button class="btn btn-primary" type="submit">Generate AI report</button></div>
    </form>`;
  }

  function publicAssessmentPage() {
    return `<a class="skip-link" href="#main">Skip to assessment</a><div class="assessment-page"><nav class="assessment-nav">${logo()}<div><button class="btn btn-ghost" data-route="home">Back to home</button><button class="btn btn-dark" data-action="patient-signin">Sign in for doctor review</button></div></nav><main id="main" class="assessment-shell" tabindex="-1">${state.guestReport ? assessmentResult(state.guestReport, "guest") : assessmentForm("guest")}</main></div>`;
  }

  function calculateAssessment(data, mode) {
    const values = Object.fromEntries(ASSESSMENT_QUESTIONS.map(q => [q.id, Number(data[`q_${q.id}`] || 0)]));
    const symptomScore = ["cough", "fever", "sweats", "weight", "appetite", "fatigue", "exposure", "sputum", "history"].reduce((sum, key) => sum + values[key], 0);
    const likelihood = symptomScore >= 20 ? "High" : symptomScore >= 11 ? "Moderate" : "Low";
    const weightPercent = { 1: 70, 2: 85, 3: 100, 4: 100 }[values.bodyWeight] || 85;
    const liverPenalty = { 0: 0, 1: 5, 2: 15, 4: 30 }[values.liver] || 0;
    const kidneyPenalty = { 0: 0, 1: 4, 2: 12, 4: 25 }[values.kidney] || 0;
    const medicine = (drug, percent, basis) => ({ drug, percent: Math.max(50, Math.min(100, percent)), basis });
    return {
      id: `ASM-${Date.now()}`,
      patientId: mode === "patient" ? state.activePatientId : null,
      email: mode === "patient" ? state.signedInEmail : "",
      at: new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      score: symptomScore,
      likelihood,
      confidence: Math.min(94, 54 + symptomScore),
      status: mode === "guest" ? "AI-only result · No doctor assigned" : "Waiting for doctor's approval",
      parameters: [
        { label: "Respiratory symptoms", value: Math.min(100, (values.cough + values.sputum) * 13) },
        { label: "Systemic symptoms", value: Math.min(100, (values.fever + values.sweats + values.fatigue) * 10) },
        { label: "Exposure and history", value: Math.min(100, (values.exposure + values.history) * 13) },
        { label: "Hepatic caution", value: Math.min(100, values.liver * 25) },
        { label: "Renal caution", value: Math.min(100, values.kidney * 25) }
      ],
      medicines: [
        medicine("Isoniazid", weightPercent - liverPenalty, "Weight and hepatic caution"),
        medicine("Rifampicin", weightPercent - Math.round(liverPenalty * .35), "Weight and interaction caution"),
        medicine("Pyrazinamide", weightPercent - liverPenalty, "Weight and hepatic caution"),
        medicine("Ethambutol", weightPercent - kidneyPenalty, "Weight and renal caution")
      ]
    };
  }

  function assessmentResult(report, mode) {
    const doctorReviewed = report.status === "Doctor approved";
    return `<section class="assessment-result">
      <div class="result-hero"><div><span class="section-kicker">AI assessment report</span><h1>${esc(report.likelihood)} pulmonary-TB likelihood</h1><p>Generated ${esc(report.at)} from the submitted symptom, history and safety-factor responses.</p></div><div class="score-orb"><b>${report.confidence || Math.min(94, 54 + report.score)}%</b><span>pattern match</span></div></div>
      <div class="result-status ${doctorReviewed ? "approved" : "waiting"}"><b>${esc(report.status)}</b><span>${mode === "guest" ? "This guest report is not connected to a doctor or clinical assistant." : doctorReviewed ? "The treating doctor has reviewed the AI collaboration and authorized the recorded plan." : "The AI collaboration is in the doctor's approval queue."}</span></div>
      <div class="result-grid"><section class="result-panel"><div class="card-head"><div><h2>Parameter profile</h2><p>Response magnitudes used in this assessment</p></div></div>${report.parameters.map(p => `<div class="parameter-row"><div><b>${esc(p.label)}</b><span>${p.value < 30 ? "Low" : p.value < 65 ? "Moderate" : "High"}</span></div><div class="parameter-track"><i style="width:${p.value}%"></i></div><strong>${p.value}%</strong></div>`).join("")}</section>
      <section class="result-panel"><div class="card-head"><div><h2>AI medicine-dose model</h2><p>Percentage of the protocol reference dose calculated from questionnaire inputs</p></div></div><div class="table-wrap"><table><thead><tr><th>Medicine</th><th>AI dose %</th><th>Adjustment basis</th><th>Status</th></tr></thead><tbody>${report.medicines.map(m => `<tr><td><b>${esc(m.drug)}</b></td><td><div class="dose-percent"><span style="width:${m.percent}%"></span><b>${m.percent}%</b></div></td><td>${esc(m.basis || "Questionnaire context")}</td><td>${status(doctorReviewed ? "approved" : mode === "guest" ? "AI only" : "pending")}</td></tr>`).join("")}</tbody></table></div></section></div>
      <div class="assessment-boundary"><b>Clinical next step</b><span>A high or moderate result should be followed by qualified clinical evaluation and confirmatory testing. Do not start, stop or change medicine from an AI-only report.</span></div>
      <div class="result-actions"><button class="btn btn-outline" data-action="retake-${mode}">Retake assessment</button>${mode === "guest" ? `<button class="btn btn-primary" data-action="patient-signin">Sign in and request doctor review</button>` : `<button class="btn btn-primary" data-route="patient/overview">Return to dashboard</button>`}</div>
    </section>`;
  }

  function patientAssessmentPage() {
    const report = state.assessments.filter(a => a.patientId === state.activePatientId).at(-1);
    return `${pageHead("AI health assessment", "Complete the questionnaire to create a patient-linked AI dosage collaboration for doctor approval.")}${report && !state.retakeAssessment ? assessmentResult(report, "patient") : assessmentForm("patient")}`;
  }

  function openSignInModal() {
    modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="signin-title" data-modal-panel><span class="section-kicker">Patient access</span><h2 id="signin-title">Sign in with email</h2><p>Your assessment will be linked to the current patient record and sent to the doctor approval queue.</p><form data-form="patient-signin"><div class="field"><label for="signin-email">Email address</label><input id="signin-email" type="email" name="email" value="${esc(state.signedInEmail)}" placeholder="patient@example.com" required></div><div class="form-actions"><button class="btn btn-outline" type="button" data-action="close-modal">Cancel</button><button class="btn btn-primary" type="submit">Continue to assessment</button></div></form></section></div>`;
    modalRoot.querySelector("input")?.focus();
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
    return `<div class="clinical-banner"><div class="banner-icon">i</div><div><b>Doctor-in-the-loop safeguard.</b> NEXUS can generate a preliminary assessment and modeled dose collaboration, while prescriptions and dose changes remain under qualified clinician authorization.</div></div>`;
  }
  function patientSelect(targetRoute) {
    return `<div class="patient-selector"><label for="patient-picker">Patient record</label><select id="patient-picker" class="control" data-patient-route="${targetRoute}">${state.patients.map(p => `<option value="${p.id}" ${p.id === state.activePatientId ? "selected" : ""}>${esc(p.name)} · ${p.id}</option>`).join("")}</select></div>`;
  }
  function pageContent(route) {
    const [, page] = route.path.split("/");
    if (page === "overview") return overviewPage(route.role);
    if (route.path === "patient/assessment") return patientAssessmentPage();
    if (route.path === "assistant/tasks") return assistantTasksPage();
    if (page === "patients") return patientsPage(route.role);
    if (page === "patient") return patientDetailPage(route.role);
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
    const pendingAssessments = state.assessments.filter(a => a.patientId && a.status === "Waiting for doctor's approval");
    const pendingTasks = state.tasks.filter(t => t.assignedTo === "Rohan Verma" && t.status === "Pending");
    const latest = state.audit.slice(0, 4);
    return `
      ${pageHead(role === "doctor" ? "Clinical command center" : "Care operations", role === "doctor" ? "Prioritized patients. Open one profile to review every clinical signal and decision in context." : "Complete patient-linked records and keep the clinical team current.", role === "assistant" ? `<button class="btn btn-primary" data-route="assistant/register">Register patient</button>` : `<button class="btn btn-primary" data-route="doctor/patients">Open patient profiles</button>`)}
      ${clinicalBanner()}
      <div class="grid grid-4">
        <div class="card metric"><span class="metric-label">Active patients</span><b class="metric-value">${state.patients.length}</b><span class="metric-delta">All records available</span></div>
        <div class="card metric"><span class="metric-label">High-risk records</span><b class="metric-value">${highRisk}</b><span class="metric-delta" style="color:var(--danger)">Priority review</span></div>
        <div class="card metric"><span class="metric-label">${role === "doctor" ? "AI assessment reviews" : "Assigned tasks"}</span><b class="metric-value">${role === "doctor" ? pendingAssessments.length : pendingTasks.length}</b><span class="metric-delta">${role === "doctor" ? "Awaiting approval" : "Pending completion"}</span></div>
        <div class="card metric"><span class="metric-label">${role === "doctor" ? "Medication actions" : "Unverified PGx"}</span><b class="metric-value">${role === "doctor" ? pendingMeds : pendingPgx}</b><span class="metric-delta">${role === "doctor" ? "Awaiting doctor" : "Verification queue"}</span></div>
      </div>
      <div class="grid grid-3" style="margin-top:17px">
        <section class="card span-2"><div class="card-head"><div><h2>${role === "doctor" ? "AI collaboration approval queue" : "My pending tasks"}</h2><p>${role === "doctor" ? "Patient-submitted assessments requiring a clinical decision" : "Tasks assigned to Rohan Verma, ordered by priority"}</p></div><button class="btn btn-sm btn-outline" data-route="${role === "doctor" ? "doctor/dose-review" : "assistant/tasks"}">View all</button></div>${role === "doctor" ? (pendingAssessments.map(assessmentReviewCard).join("") || empty("No assessment approvals pending")) : taskList(pendingTasks.slice(0, 4))}</section>
        <section class="card"><div class="card-head"><div><h2>Recent activity</h2><p>Latest workspace updates</p></div></div><div class="list">${latest.map(a => `<div class="list-item"><div class="list-item__icon">A</div><div class="list-item__body"><b>${esc(a.action)}</b><span>${esc(a.detail)}</span></div></div>`).join("")}</div></section>
      </div>
      <section class="card" style="margin-top:17px"><div class="card-head"><div><h2>Patient priority list</h2><p>Risk, adherence and next clinical action</p></div><button class="btn btn-sm btn-outline" data-route="${role}/patients">View all</button></div>${patientTable(state.patients.slice(0, 4), role)}</section>`;
  }

  function assessmentReviewCard(report) {
    const pending = report.status === "Waiting for doctor's approval";
    return `<article class="approval-card"><div><div class="action-row"><h3>${esc(patientName(report.patientId))}</h3>${status(pending ? "AI collaboration" : report.status)}</div><p>${esc(report.likelihood)} likelihood · ${report.medicines.length} modeled medicine doses · ${esc(report.at)}</p><div class="dose-chip-row">${report.medicines.map(m => `<span>${esc(m.drug)} <b>${m.percent}%</b></span>`).join("")}</div></div><div class="approval-actions">${pending ? `<button class="btn btn-sm btn-primary" data-assessment-decision="approved" data-id="${report.id}">Approve plan</button><button class="btn btn-sm btn-danger" data-assessment-decision="rejected" data-id="${report.id}">Reject</button>` : ""}<button class="btn btn-sm btn-outline" data-open-patient="${report.patientId}" data-role="doctor">Open patient</button></div></article>`;
  }

  function taskList(tasks) {
    return `<div class="task-list">${tasks.map(t => `<article class="task-row"><button class="task-check" data-task-complete="${t.id}" aria-label="Mark ${esc(t.title)} complete">✓</button><div><b>${esc(t.title)}</b><span>${esc(patientName(t.patientId))} · Due ${esc(t.due)}</span></div>${status(t.priority)}</article>`).join("") || empty("No pending tasks")}</div>`;
  }

  function assistantTasksPage() {
    const pending = state.tasks.filter(t => t.assignedTo === "Rohan Verma" && t.status === "Pending");
    const completed = state.tasks.filter(t => t.assignedTo === "Rohan Verma" && t.status === "Completed");
    return `${pageHead("My assigned tasks", "Patient-linked work assigned to this clinical assistant, with completion recorded in the audit trail.")}<div class="grid grid-3"><div class="card metric"><span class="metric-label">Pending</span><b class="metric-value">${pending.length}</b><span class="metric-delta">Requires action</span></div><div class="card metric"><span class="metric-label">High priority</span><b class="metric-value">${pending.filter(t => t.priority === "High").length}</b><span class="metric-delta" style="color:var(--danger)">Complete first</span></div><div class="card metric"><span class="metric-label">Completed</span><b class="metric-value">${completed.length}</b><span class="metric-delta">Recorded actions</span></div></div><div class="grid grid-2" style="margin-top:17px"><section class="card"><div class="card-head"><div><h2>Pending tasks</h2><p>Assigned to Rohan Verma</p></div></div>${taskList(pending)}</section><section class="card"><div class="card-head"><div><h2>Completed tasks</h2><p>Most recent completed work</p></div></div><div class="task-list">${completed.map(t => `<article class="task-row completed"><span class="task-check">✓</span><div><b>${esc(t.title)}</b><span>${esc(patientName(t.patientId))} · ${esc(t.completedAt || "Completed")}</span></div>${status("completed")}</article>`).join("") || empty("No completed tasks")}</div></section></div>`;
  }

  function patientOverview() {
    const p = selectedPatient();
    const bio = itemsFor("biomarkers")[0];
    const meds = itemsFor("medications");
    const apt = itemsFor("appointments")[0];
    const assessment = state.assessments.filter(a => a.patientId === p.id).at(-1);
    return `
      ${pageHead(`Welcome, ${esc(p.name.split(" ")[0])}`, "Your assessment, medicines, monitoring and next care actions in one place.", `<button class="btn btn-outline" data-route="patient/follow-up">Submit follow-up</button><button class="btn btn-primary" data-route="patient/assessment">${assessment ? "View AI assessment" : "Start AI assessment"}</button>`)}
      <section class="patient-assessment-callout"><div class="callout-icon">AI</div><div><span class="section-kicker">Patient assessment</span><h2>${assessment ? `${esc(assessment.likelihood)} likelihood report` : "Complete your health questionnaire"}</h2><p>${assessment ? `${esc(assessment.status)} · ${assessment.medicines.length} medicine-dose percentages generated.` : "Your responses will create an AI collaboration for your treating doctor's approval."}</p></div><button class="btn btn-primary" data-route="patient/assessment">${assessment ? "Open report" : "Begin"}</button></section>
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
    const assessment = state.assessments.filter(a => a.patientId === p.id).at(-1);
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

          <section class="card palette-card insight-palette full-palette"><div class="card-head"><div><span class="section-kicker">AI + doctor collaboration</span><h2>Questionnaire assessment</h2><p>Patient-submitted response model and dosage percentages</p></div>${assessment ? status(assessment.status === "Doctor approved" ? "approved" : assessment.status === "Rejected by doctor" ? "rejected" : "pending") : ""}</div>${assessment ? assessmentReviewCard(assessment) : empty("No patient assessment")}</section>

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
      </div>${role === "assistant" ? intakeSummary(p) : ""}`;
  }

  function intakeSummary(p) {
    const i = p.intake;
    if (!i) return `<section class="card intake-summary" style="margin-top:17px"><div class="card-head"><div><span class="section-kicker">Medicine Department</span><h2>Patient questionnaire</h2><p>No registration questionnaire is stored for this patient.</p></div></div></section>`;
    const conditions = [...(i.conditions || []), i.otherCondition].filter(Boolean).join(", ") || "None reported";
    const item = (label, value) => `<div class="intake-summary-item"><span>${esc(label)}</span><b>${esc(value || "Not reported")}</b></div>`;
    return `<section class="card intake-summary" style="margin-top:17px"><div class="card-head"><div><span class="section-kicker">Medicine Department</span><h2>Patient questionnaire</h2><p>Registration intake captured by the clinical assistant</p></div>${status("complete")}</div><div class="intake-summary-grid">${item("Patient ID", p.id)}${item("Age / sex / weight", `${p.age} years · ${p.sex} · ${p.weight || "—"} kg`)}${item("Main health problem", i.mainComplaint)}${item("Duration", i.duration)}${item("Main symptoms", i.symptoms)}${item("Existing conditions", conditions)}${item("Current medicines", i.currentMedications)}${item("Side effects", i.sideEffects)}${item("Previous adverse reaction", i.adverseReaction)}${item("Known drug allergies", `${i.drugAllergies}${i.allergyDetails ? ` · ${i.allergyDetails}` : ""}`)}${item("Major family illness", `${i.familyIllness}${i.familyDetails ? ` · ${i.familyDetails}` : ""}`)}${item("Smoking / alcohol", `${i.smoking} / ${i.alcohol}`)}<div class="intake-summary-item concern"><span>Main treatment concern</span><b>${esc(i.concern)}</b></div></div></section>`;
  }

  function doctorMedicationsPage() {
    return `${pageHead("Medication decisions", "Approve, modify or reject entries after reviewing patient-specific context.", patientSelect("doctor/medications"))}${clinicalBanner()}<section class="card"><div class="card-head"><div><h2>${esc(selectedPatient().name)}</h2><p>Medication authorization queue</p></div></div>${itemsFor("medications").map(m => medicationCard(m, true)).join("") || empty("No medication entries")}</section>`;
  }
  function medicationCard(m, controls) {
    return `<article class="medication-card"><div><div class="action-row"><h3>${esc(m.drug)}</h3>${status(m.status)}</div><p>${esc(patientName(m.patientId))} · ${esc(m.frequency)}</p><div class="dose">${esc(m.dose)}</div><div class="recommendation"><b>Clinical consideration:</b> ${esc(m.recommendation)}</div></div>${controls ? `<div class="medication-actions"><button class="btn btn-sm btn-primary" data-med-decision="approved" data-id="${m.id}">Approve</button><button class="btn btn-sm btn-outline" data-modify-med="${m.id}">Modify</button><button class="btn btn-sm btn-danger" data-med-decision="rejected" data-id="${m.id}">Reject</button></div>` : ""}</article>`;
  }
  function doseReviewPage() {
    const queue = state.medications.filter(m => ["pending", "review", "modified"].includes(m.status));
    const assessments = state.assessments.filter(a => a.patientId && a.status === "Waiting for doctor's approval");
    return `${pageHead("Dose review queue", "Patient-specific AI collaborations and medication records ordered by urgency.")} ${clinicalBanner()}<div class="grid grid-2"><section class="card"><div class="card-head"><div><h2>AI assessment approvals</h2><p>${assessments.length} patient-submitted reports</p></div></div>${assessments.map(assessmentReviewCard).join("") || empty("No assessment approvals pending")}</section><section class="card"><div class="card-head"><div><h2>Medication authorizations</h2><p>${queue.length} open actions</p></div></div>${queue.map(m => medicationCard(m, true)).join("") || empty("No open dose reviews")}</section></div>`;
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
    return `${pageHead("Workspace settings", "Device-local controls and the clinical-use boundary.")}<div class="grid grid-2"><section class="card"><div class="card-head"><div><h2>Workspace data</h2><p>This browser stores the current workspace records</p></div></div><p style="color:var(--muted);line-height:1.7;font-size:.82rem">Resetting restores the original patients, medications, assessments, tasks, PGx, biomarker and follow-up records. It does not contact an external service.</p><button class="btn btn-danger" data-action="confirm-reset">Reset workspace data</button></section><section class="card"><div class="card-head"><div><h2>Clinical use</h2><p>Required operating boundary</p></div></div><div class="list"><div class="list-item"><div class="list-item__icon">1</div><div class="list-item__body"><b>Decision support only</b><span>Outputs organize information for professional review.</span></div></div><div class="list-item"><div class="list-item__icon">2</div><div class="list-item__body"><b>Doctor approval required</b><span>No medication or dose changes itself.</span></div></div><div class="list-item"><div class="list-item__icon">3</div><div class="list-item__body"><b>Confirm patient context</b><span>Use qualified clinical review and confirmatory testing before treatment decisions.</span></div></div></div></section></div>`;
  }

  function registerPage() {
    const yesNo = name => `<div class="binary-choice"><label><input type="radio" name="${name}" value="Yes" required><span>Yes</span></label><label><input type="radio" name="${name}" value="No" required><span>No</span></label></div>`;
    const conditions = ["Diabetes", "Hypertension", "Heart disease", "Kidney disease", "Liver disease"].map((condition, index) => `<label class="check-option"><input type="checkbox" name="condition_${index}" value="${condition}"><span>${condition}</span></label>`).join("");
    return `${pageHead("Register patient", "Create the patient identity and Medicine Department intake before adding clinical records.")}
      <section class="registration-hero"><div><span class="section-kicker">Medicine Department</span><h2>Patient questionnaire</h2><p>Capture the patient’s complaint, history, current medicines, allergies, lifestyle and treatment concern in one intake.</p></div><div class="registration-id"><span>New patient ID</span><b>${nextPatientId()}</b></div></section>
      <form class="registration-form" data-form="patient">
        <nav class="intake-index" aria-label="Registration sections"><b>Patient intake</b>${["Basic details", "Presenting complaint", "Medical history", "Current medications", "Drug & allergy history", "Family & lifestyle", "Patient concern"].map((label, index) => `<a href="#intake-${index + 1}"><span>${index + 1}</span>${label}</a>`).join("")}<div><strong>After registration</strong><p>The patient profile opens automatically so samples, biomarkers, PGx and medication entries can be added.</p></div></nav>
        <div class="intake-sections">
          <section class="intake-section" id="intake-1"><header><span>01</span><div><h2>Basic details</h2><p>Patient identity and physical details</p></div></header><div class="form-grid"><div class="field"><label for="p-id">Patient ID</label><input id="p-id" value="${nextPatientId()}" readonly></div><div class="field"><label for="p-name">Full name</label><input id="p-name" name="name" autocomplete="name" required></div><div class="field"><label for="p-age">Age</label><input id="p-age" name="age" type="number" min="1" max="120" required></div><div class="field"><label for="p-sex">Sex</label><select id="p-sex" name="sex" required><option value="">Select</option><option>Female</option><option>Male</option><option>Other</option></select></div><div class="field"><label for="p-weight">Weight (kg)</label><input id="p-weight" name="weight" type="number" min="2" max="300" step="0.1" required></div><div class="field"><label for="p-phone">Phone</label><input id="p-phone" name="phone" autocomplete="tel" required></div><div class="field full"><label for="p-district">District</label><input id="p-district" name="district" required></div></div></section>
          <section class="intake-section" id="intake-2"><header><span>02</span><div><h2>Presenting complaint</h2><p>Reason for the current visit</p></div></header><div class="form-grid"><div class="field full"><label for="main-problem">What is your main health problem?</label><input id="main-problem" name="mainProblem" required></div><div class="field full"><label for="complaint-duration">Since when are you experiencing it?</label><input id="complaint-duration" name="duration" placeholder="e.g. Three weeks" required></div><div class="field full"><label for="main-symptoms">What are your main symptoms?</label><textarea id="main-symptoms" name="symptoms" required></textarea></div></div></section>
          <section class="intake-section" id="intake-3"><header><span>03</span><div><h2>Medical history</h2><p>Existing medical conditions</p></div></header><div class="field full"><label>Select all that apply</label><div class="check-grid">${conditions}<label class="check-option"><input type="checkbox" name="condition_other" value="Other"><span>Other</span></label></div></div><div class="field full intake-followup"><label for="other-condition">Other condition</label><input id="other-condition" name="otherCondition" placeholder="Specify if applicable"></div></section>
          <section class="intake-section" id="intake-4"><header><span>04</span><div><h2>Current medications</h2><p>Medicines and reported side effects</p></div></header><div class="form-grid"><div class="field full"><label for="current-medicines">Which medicines are you currently taking?</label><textarea id="current-medicines" name="currentMedications" placeholder="Include medicine name, strength and frequency"></textarea></div><div class="field full"><label for="side-effects">Have you experienced any side effects?</label><textarea id="side-effects" name="sideEffects" placeholder="Enter side effects or write None"></textarea></div></div></section>
          <section class="intake-section" id="intake-5"><header><span>05</span><div><h2>Drug & allergy history</h2><p>Previous reactions and known allergies</p></div></header><div class="form-grid"><div class="field"><label>Previous adverse reaction to a medicine?</label>${yesNo("adverseReaction")}</div><div class="field"><label>Known drug allergies?</label>${yesNo("drugAllergies")}</div><div class="field full"><label for="allergy-details">If yes, specify the medicine and reaction</label><textarea id="allergy-details" name="allergyDetails"></textarea></div></div></section>
          <section class="intake-section" id="intake-6"><header><span>06</span><div><h2>Family & lifestyle</h2><p>Relevant family history and habits</p></div></header><div class="form-grid"><div class="field"><label>Any major illness in your family?</label>${yesNo("familyIllness")}</div><div class="field"><label>Smoking</label>${yesNo("smoking")}</div><div class="field"><label>Alcohol</label>${yesNo("alcohol")}</div><div class="field"><label for="family-details">Family illness details</label><input id="family-details" name="familyDetails" placeholder="Specify if applicable"></div></div></section>
          <section class="intake-section" id="intake-7"><header><span>07</span><div><h2>Patient concern</h2><p>The patient’s priority for the care team</p></div></header><div class="field full"><label for="patient-concern">What is your main concern regarding your current treatment?</label><textarea id="patient-concern" name="concern" required></textarea></div></section>
          <div class="registration-actions"><div><b>Ready to create the patient record?</b><span>The questionnaire will be available inside the patient profile.</span></div><button class="btn btn-primary" type="submit">Create patient record</button></div>
        </div>
      </form>`;
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
    if (action === "patient-signin") openSignInModal();
    if (action === "retake-guest") { state.guestReport = null; saveState(); render(); }
    if (action === "retake-patient") { state.retakeAssessment = true; saveState(); render(); }
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
    const assessmentDecision = event.target.closest("[data-assessment-decision]");
    if (assessmentDecision) {
      const report = state.assessments.find(a => a.id === assessmentDecision.dataset.id);
      if (!report) return;
      const approved = assessmentDecision.dataset.assessmentDecision === "approved";
      report.status = approved ? "Doctor approved" : "Rejected by doctor";
      state.medications.filter(m => m.assessmentId === report.id).forEach(m => { m.status = approved ? "approved" : "rejected"; });
      audit("Dr. Priya Sharma", approved ? "AI dosage collaboration approved" : "AI dosage collaboration rejected", `${patientName(report.patientId)} · ${report.medicines.length} medicine-dose outputs`);
      saveState(approved ? "AI collaboration approved." : "AI collaboration rejected."); render(); return;
    }
    const taskButton = event.target.closest("[data-task-complete]");
    if (taskButton) {
      const task = state.tasks.find(t => t.id === taskButton.dataset.taskComplete);
      if (!task) return;
      task.status = "Completed";
      task.completedAt = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
      audit("Rohan Verma", "Assigned task completed", `${task.title} for ${patientName(task.patientId)}`);
      saveState("Task marked complete."); render(); return;
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
    if (type === "patient-signin") {
      state.signedInEmail = data.email;
      state.retakeAssessment = false;
      saveState("Patient account connected.");
      modalRoot.innerHTML = "";
      navigate("patient/assessment"); return;
    }
    if (type === "assessment") {
      const mode = form.dataset.mode;
      const report = calculateAssessment(data, mode);
      if (mode === "guest") {
        state.guestReport = report;
        saveState("AI-only guest report generated."); render(); return;
      }
      state.assessments.push(report);
      report.medicines.forEach((m, index) => state.medications.unshift({ id: `MED-AI-${Date.now()}-${index}`, assessmentId: report.id, patientId: report.patientId, drug: m.drug, dose: `${m.percent}% of protocol reference`, frequency: "Per clinician-authorized regimen", status: "pending", recommendation: `AI collaboration from patient questionnaire. ${m.percent}% modeled dose based on ${m.basis.toLowerCase()}; awaiting doctor approval.` }));
      state.retakeAssessment = false;
      audit(state.signedInEmail || selectedPatient().name, "Patient AI assessment submitted", `${report.likelihood} pulmonary-TB likelihood · sent for doctor approval`);
      saveState("Assessment sent to the doctor approval queue."); render(); return;
    }
    if (type === "patient") {
      const id = nextPatientId();
      const conditions = Object.entries(data).filter(([key, value]) => key.startsWith("condition_") && value !== "Other").map(([, value]) => value);
      if (data.condition_other) conditions.push("Other");
      const p = {
        id,
        name: data.name,
        age: Number(data.age),
        sex: data.sex,
        weight: Number(data.weight),
        phone: data.phone,
        district: data.district,
        condition: data.mainProblem,
        stage: "Assessment",
        risk: "Pending",
        adherence: 100,
        nextVisit: "Not scheduled",
        intake: {
          mainComplaint: data.mainProblem,
          duration: data.duration,
          symptoms: data.symptoms,
          conditions,
          otherCondition: data.otherCondition || "",
          currentMedications: data.currentMedications || "None reported",
          sideEffects: data.sideEffects || "None reported",
          adverseReaction: data.adverseReaction,
          drugAllergies: data.drugAllergies,
          allergyDetails: data.allergyDetails || "",
          familyIllness: data.familyIllness,
          familyDetails: data.familyDetails || "",
          smoking: data.smoking,
          alcohol: data.alcohol,
          concern: data.concern
        }
      };
      state.patients.push(p); state.activePatientId = id;
      audit("Rohan Verma", "Medicine Department intake completed", `${p.name} · ${id}`);
      saveState("Patient questionnaire and record created."); navigate("assistant/patient"); return;
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
