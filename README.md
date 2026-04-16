# 🩸 BloodLink — Blood Donation App

A fully functional frontend blood donation web app with mock data. No backend required to run.

## Project Structure

```
blood-donation-app/
└── frontend/
    ├── index.html        ← Landing page (hero, stats, urgent requests preview)
    ├── login.html        ← Sign in / Register (donor or recipient)
    ├── dashboard.html    ← Main app (find donors, blood requests, profile)
    ├── css/
    │   └── style.css     ← Shared design system
    └── js/
        └── app.js        ← Mock data, Auth, DonorStore, RequestStore, Toast
```

## How to Run

Just open `frontend/index.html` in your browser. No server needed.

Or use VS Code Live Server:
```bash
# Install Live Server extension in VS Code
# Right-click index.html → "Open with Live Server"
```

## Features

| Feature | Description |
|---|---|
| 🔐 Register / Login | Email + password auth stored in localStorage |
| 👤 Donor or Recipient | Role-based registration |
| 🩸 Donor Search | Filter by blood group and city |
| 📋 Blood Requests | View, filter, and post requests |
| 📞 Contact Donor | View phone details in modal |
| 👤 Profile Page | View your info and donor status |

## Mock Data

- **10 pre-seeded donors** across Mumbai, Delhi, Bangalore, Chennai, etc.
- **5 pre-seeded blood requests** (3 urgent, 1 closed, 1 normal)
- All 8 blood groups: A+, A−, B+, B−, AB+, AB−, O+, O−
- New donors/requests added by users are saved to `localStorage`

## Adding a Real Backend

When ready to add Node.js + Express + MongoDB:

1. Replace `DonorStore` and `RequestStore` methods with `fetch()` calls to your API
2. Replace `Auth` with JWT-based auth
3. Keep all HTML/CSS as-is — only `js/app.js` needs updating

### Example API endpoints to build:
```
POST /api/auth/register
POST /api/auth/login
GET  /api/donors?blood=O+&city=Mumbai
POST /api/requests
GET  /api/requests
```

## Design

- **Typography**: Playfair Display (headings) + DM Sans (body)
- **Color**: Deep crimson (`#C0180C`) on warm cream (`#FDF6EE`)
- **Theme**: Editorial / refined medical — serious but human
