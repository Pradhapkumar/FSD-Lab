# CS1510 Full-Stack Development Lab

A complete repository containing 10 full-stack web development projects aligned with the CS1510 lab curriculum.

## Repository Structure

| Directory | Stack | Description |
| :--- | :--- | :--- |
| `simple-webpage/` | HTML5, CSS3 | Structured webpage with header, nav bar, about section, button, and footer |
| `chat-module/` | HTML5, CSS3, Vanilla JS | Interactive chat interface with automatic bot reply echo and auto-scroll |
| `angular-calculator/` | AngularJS 1.8.2, CSS3 | Arithmetic calculator supporting `+`, `-`, `*`, `/`, `%`, clear, and backspace |
| `angular-todo/` | AngularJS 1.8.2, CSS3 | User registration/login, session toggle, add/delete tasks, and completion tracking |
| `react-microblog/` | React 18 | Twitter-style microblog with posting, like counter, post deletion, and empty state |
| `react-food-delivery/` | React 18 | Food ordering app with menu cards, cart quantity controls, dynamic totals, and checkout modal |
| `shopping-cart/` | Node.js, Express, HTML/CSS/JS | E-commerce catalog with search filtering, `localStorage` cart, summary, and checkout form |
| `leave-management/` | MongoDB, Express, Node.js, HTML/JS | Full-stack leave management app for applying and querying Casual/Medical leaves |
| `project-dashboard/` | MongoDB, Express, React, Node.js | Task management dashboard for adding tasks and updating statuses (`Pending`, `In Progress`, `Completed`) |
| `online-survey/` | MongoDB, Express, React, Node.js | Random 5-question survey powered by MongoDB `$sample` aggregation and client scoring |

## Running the Projects

### Static HTML / AngularJS Projects
Open `index.html` directly in a browser (or serve via a static dev server) for:
- `simple-webpage/`
- `chat-module/`
- `angular-calculator/`
- `angular-todo/`

### React Projects (`react-microblog/`, `react-food-delivery/`)
```bash
cd react-microblog   # or react-food-delivery
npm install
npm start
```

### Node.js Shopping Cart (`shopping-cart/`)
```bash
cd shopping-cart
npm install
npm start
# Open http://localhost:3000
```

### Full-Stack Projects (`leave-management/`, `project-dashboard/`, `online-survey/`)
Ensure MongoDB is running locally (`mongodb://127.0.0.1:27017`).

**Leave Management (`leave-management/`):**
```bash
cd leave-management/backend
npm install
npm start
# Then open leave-management/frontend/index.html in your browser
```

**Project Dashboard (`project-dashboard/`):**
```bash
# Terminal 1 (Backend)
cd project-dashboard/backend
npm install
npm start

# Terminal 2 (Frontend)
cd project-dashboard/frontend
npm install
npm start
```

**Online Survey (`online-survey/`):**
```bash
# Terminal 1 (Backend)
cd online-survey/backend
npm install
npm run seed   # optional; server also auto-seeds if database is empty
npm start

# Terminal 2 (Frontend)
cd online-survey/frontend
npm install
npm start
```

