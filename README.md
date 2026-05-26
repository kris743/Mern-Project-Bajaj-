# DeskFlow 🎫

A modern support ticket management dashboard built with the MERN stack. Inspired by Trello/Jira with SLA tracking and a beautiful Kanban board UI.

## 🌐 Live Links

- **Frontend (Netlify):** _Available after deployment_
- **Backend (Render):** _Add your Render URL here_

---

## 🚀 Features

- **Kanban Board** – 4 columns: Open, In Progress, Resolved, Closed
- **Create Tickets** – Subject, description, email, priority
- **SLA Tracking** – Auto-calculated per priority tier
- **Status Transitions** – Strict rules enforced on backend
- **Breach Indicators** – Visual alerts when SLA exceeded
- **Stats Strip** – Live dashboard metrics
- **Toast Notifications** – User-friendly feedback
- **Responsive Design** – Works on all screen sizes

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React + Vite, Tailwind CSS v4, Axios |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB Atlas + Mongoose            |
| Deploy FE | Netlify                             |
| Deploy BE | Render                              |
| Testing   | Postman                             |

---

## 📦 Project Structure

```
├── backend/
│   ├── models/
│   │   └── Ticket.js
│   ├── routes/
│   │   └── ticketRoutes.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── KanbanBoard.jsx
│   │   │   ├── TicketCard.jsx
│   │   │   ├── StatsStrip.jsx
│   │   │   └── CreateTicketModal.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
│
├── netlify.toml
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint         | Description                          |
|--------|-----------------|--------------------------------------|
| GET    | /tickets         | Get all tickets (with filters)       |
| POST   | /tickets         | Create a new ticket                  |
| PATCH  | /tickets/:id     | Update ticket (status/fields)        |
| DELETE | /tickets/:id     | Delete a ticket                      |
| GET    | /tickets/stats   | Get aggregated ticket statistics     |

### Query Filters for `GET /tickets`
- `?status=open|in_progress|resolved|closed`
- `?priority=low|medium|high|urgent`
- `?breached=true|false`

---

## ⚙️ Status Transition Rules

```
open → in_progress → resolved → closed
resolved → in_progress  (rollback, clears resolvedAt)
closed → resolved       (rollback)

❌ Invalid: open → resolved, open → closed, in_progress → closed
```

---

## ⏱️ SLA Targets

| Priority | SLA Limit |
|----------|-----------|
| urgent   | 1 hour    |
| high     | 4 hours   |
| medium   | 24 hours  |
| low      | 72 hours  |

---

## 🔧 Environment Variables

### Backend
| Variable   | Description                |
|------------|----------------------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `PORT`      | Server port (default 5000) |

### Frontend
| Variable       | Description              |
|----------------|--------------------------|
| `VITE_API_URL` | Backend base URL         |

---

## 🚀 Local Development

### Backend
```bash
cd backend
npm install
# create .env with MONGO_URI=<your-atlas-uri>
npm start
```

### Frontend
```bash
cd frontend
npm install
# create .env.local with VITE_API_URL=http://localhost:5000
npm run dev
```

---

## 📬 Postman Collection

A complete Postman collection is available in the repository covering all API endpoints with example requests and responses.

---

## 📄 License

MIT
