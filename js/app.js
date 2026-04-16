/* ═══════════════════════════════════════════════
   BLOODLINK  —  Shared JS (mock data + helpers)
   ═══════════════════════════════════════════════ */

// ── MOCK DATA ──────────────────────────────────
const MOCK_DONORS = [
  { id: 1, name: 'Aarav Sharma',    blood: 'O+', city: 'Mumbai',    available: true,  lastDonated: '2024-11-10', age: 27, phone: '98765-43210' },
  { id: 2, name: 'Priya Mehta',     blood: 'A+', city: 'Delhi',     available: true,  lastDonated: '2025-01-05', age: 24, phone: '91234-56789' },
  { id: 3, name: 'Rahul Verma',     blood: 'B+', city: 'Bangalore', available: false, lastDonated: '2025-03-01', age: 30, phone: '99887-76655' },
  { id: 4, name: 'Sneha Iyer',      blood: 'AB-',city: 'Chennai',   available: true,  lastDonated: '2024-10-20', age: 22, phone: '88776-65544' },
  { id: 5, name: 'Karan Singh',     blood: 'O-', city: 'Hyderabad', available: true,  lastDonated: '2024-12-15', age: 35, phone: '77665-54433' },
  { id: 6, name: 'Nisha Gupta',     blood: 'A-', city: 'Pune',      available: true,  lastDonated: '2025-02-10', age: 29, phone: '66554-43322' },
  { id: 7, name: 'Vikram Patil',    blood: 'B-', city: 'Mumbai',    available: false, lastDonated: '2025-04-01', age: 31, phone: '55443-32211' },
  { id: 8, name: 'Anjali Rao',      blood: 'AB+',city: 'Kolkata',   available: true,  lastDonated: '2024-09-30', age: 26, phone: '44332-21100' },
  { id: 9, name: 'Deepak Nair',     blood: 'O+', city: 'Bangalore', available: true,  lastDonated: '2025-01-22', age: 33, phone: '33221-10099' },
  { id:10, name: 'Meera Joshi',     blood: 'A+', city: 'Ahmedabad', available: true,  lastDonated: '2024-08-18', age: 28, phone: '22110-09988' },
];

const MOCK_REQUESTS = [
  { id: 1, patient: 'Riya Patel',   blood: 'O+', hospital: 'Lilavati Hospital',    city: 'Mumbai',    units: 2, urgency: 'urgent', status: 'active',  postedBy: 'Anil Patel',  contact: '98001-23456', note: 'Surgery scheduled tomorrow morning.', date: '2025-04-16' },
  { id: 2, patient: 'Manoj Kumar',  blood: 'B+', hospital: 'AIIMS',                city: 'Delhi',     units: 3, urgency: 'normal', status: 'active',  postedBy: 'Sunita Kumar',contact: '97002-34567', note: 'Thalassemia patient, monthly requirement.', date: '2025-04-15' },
  { id: 3, patient: 'Lakshmi Devi', blood: 'AB-',hospital: 'Apollo Hospital',      city: 'Chennai',   units: 1, urgency: 'urgent', status: 'active',  postedBy: 'Raj Devi',    contact: '96003-45678', note: 'Rare blood type needed urgently.', date: '2025-04-17' },
  { id: 4, patient: 'Sanjay Mehta', blood: 'A-', hospital: 'Kokilaben Hospital',   city: 'Mumbai',    units: 2, urgency: 'normal', status: 'closed',  postedBy: 'Geeta Mehta', contact: '95004-56789', note: 'Requirement fulfilled. Thank you!', date: '2025-04-10' },
  { id: 5, patient: 'Fatima Sheikh',blood: 'O-', hospital: 'Manipal Hospital',     city: 'Bangalore', units: 4, urgency: 'urgent', status: 'active',  postedBy: 'Ahmed Sheikh',contact: '94005-67890', note: 'Accident victim, multiple units needed.', date: '2025-04-17' },
];

const BLOOD_GROUPS = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
const CITIES = ['Mumbai','Delhi','Bangalore','Chennai','Hyderabad','Pune','Kolkata','Ahmedabad'];

// ── STORAGE HELPERS ────────────────────────────
const Store = {
  get: (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } },
  set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
  remove: (key) => localStorage.removeItem(key),
};

// ── AUTH ───────────────────────────────────────
const Auth = {
  login(user) { Store.set('bl_user', user); },
  logout() { Store.remove('bl_user'); window.location.href = 'login.html'; },
  current() { return Store.get('bl_user'); },
  require() {
    if (!this.current()) { window.location.href = 'login.html'; return false; }
    return true;
  },
  redirectIfLoggedIn() {
    if (this.current()) { window.location.href = 'dashboard.html'; }
  }
};

// ── DONOR STORE ────────────────────────────────
const DonorStore = {
  getAll() {
    const saved = Store.get('bl_donors');
    return saved ? [...MOCK_DONORS, ...saved] : MOCK_DONORS;
  },
  add(donor) {
    const saved = Store.get('bl_donors') || [];
    const newDonor = { ...donor, id: Date.now(), available: true };
    Store.set('bl_donors', [...saved, newDonor]);
    return newDonor;
  },
  search({ blood, city }) {
    return this.getAll().filter(d => {
      const matchBlood = !blood || d.blood === blood;
      const matchCity  = !city  || d.city.toLowerCase().includes(city.toLowerCase());
      return matchBlood && matchCity;
    });
  }
};

// ── REQUEST STORE ──────────────────────────────
const RequestStore = {
  getAll() {
    const saved = Store.get('bl_requests');
    return saved ? [...MOCK_REQUESTS, ...saved] : MOCK_REQUESTS;
  },
  add(req) {
    const saved = Store.get('bl_requests') || [];
    const newReq = { ...req, id: Date.now(), status: 'active', date: new Date().toISOString().split('T')[0] };
    Store.set('bl_requests', [...saved, newReq]);
    return newReq;
  },
  getActive() { return this.getAll().filter(r => r.status === 'active'); }
};

// ── TOAST ──────────────────────────────────────
function toast(message, type = 'default') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✓', error: '✕', default: 'ℹ' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${icons[type] || icons.default}</span> ${message}`;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// ── NAV USER CHIP ──────────────────────────────
function renderNavUser() {
  const user = Auth.current();
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;
  if (user) {
    const chip = document.querySelector('#nav-user-chip');
    if (chip) chip.remove();
    navLinks.insertAdjacentHTML('beforeend', `
      <div id="nav-user-chip" style="display:flex;align-items:center;gap:8px;">
        <div style="width:32px;height:32px;border-radius:50%;background:var(--blood);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;">
          ${user.name.charAt(0).toUpperCase()}
        </div>
        <span style="font-size:0.88rem;font-weight:500;">${user.name.split(' ')[0]}</span>
        <button onclick="Auth.logout()" class="btn btn-ghost btn-sm">Sign out</button>
      </div>
    `);
  }
}

document.addEventListener('DOMContentLoaded', renderNavUser);
