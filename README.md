<div align="center">

<br />


<img width="1353" height="808" alt="image" src="https://github.com/user-attachments/assets/b797af9b-ceaa-403b-81a7-132bbfd32938" />



**Code snippet sharing, but make it aesthetic.**

*A social platform where developers post and discover beautiful code snippets.*

<br />

![Status](https://img.shields.io/badge/Status-Active%20Development-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

</div>

---

## Overview

**Lumine** is a full-stack social media platform built for developers who want to share beautiful code snippets. Share syntax-highlighted snippets, discover curated code from others, and build a portfolio of elegant solutions.

---

## Tech Stack

### 🖥️ Frontend

<p>
  <img src="https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/CodeMirror-D30707?style=for-the-badge&logo=codemirror&logoColor=white" alt="CodeMirror" />
  <img src="https://img.shields.io/badge/jwt--decode-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="jwt-decode" />
  <img src="https://img.shields.io/badge/react--icons-E91E63?style=for-the-badge&logo=react&logoColor=white" alt="react-icons" />
  <img src="https://img.shields.io/badge/react--syntax--highlighter-1E1E1E?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react-syntax-highlighter" />
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/Testing_Library-E33332?style=for-the-badge&logo=testing-library&logoColor=white" alt="Testing Library" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
</p>

### ⚙️ Backend

<p>
  <img src="https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/PostgreSQL-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white" alt="Passport" />
  <img src="https://img.shields.io/badge/bcryptjs-525252?style=for-the-badge&logo=lock&logoColor=white" alt="bcryptjs" />
  <img src="https://img.shields.io/badge/express--validator-339933?style=for-the-badge&logo=express&logoColor=white" alt="express-validator" />
  <img src="https://img.shields.io/badge/express--rate--limit-FF6B35?style=for-the-badge&logo=express&logoColor=white" alt="express-rate-limit" />
  <img src="https://img.shields.io/badge/express--session-000000?style=for-the-badge&logo=express&logoColor=white" alt="express-session" />
  <img src="https://img.shields.io/badge/CORS-007ACC?style=for-the-badge&logo=cors&logoColor=white" alt="CORS" />
  <img src="https://img.shields.io/badge/node--postgres_(pg)-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="pg" />
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/Supertest-E535AB?style=for-the-badge&logo=node.js&logoColor=white" alt="Supertest" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
</p>

---

## Features

### Authentication & Access
- **JWT-based authentication** with secure token handling via `passport-jwt`
- **Password hashing** with `bcryptjs`
- **Guest mode** — browse and discover snippets without an account
- **Protected routes** with auto-redirect on unauthorized access

### Snippet Sharing
- Rich code editing powered by **CodeMirror** with syntax highlighting
- Post, view, and interact with code snippets
- Social discovery feed

### Frontend Experience
- Built with **React + Vite** for fast, modern performance
- State management via **Zustand**
- Client-side routing with **React Router**
- **Fully responsive** — works on mobile, tablet, and desktop
- Custom error pages and descriptive user-facing error messages
- Custom client-side form validation for a polished UX

### backend Architecture
- **MVC pattern** for clean separation of concerns
- **RESTful API** following modern industry standards
- Input validation on all routes via `express-validator`
- **PostgreSQL** database
- **Rate limiting** via `express-rate-limit` — protects all API routes from abuse.

---

## Screenshots

### Landing Page
<div align="center">
  <img width="1351" height="811" alt="Lumine landing page" src="https://github.com/user-attachments/assets/818e3804-5ef4-4882-b566-19a6820699f5" />
  <img width="1351" height="813" alt="Lumine landing page scrolled" src="https://github.com/user-attachments/assets/c4ab7f2e-edb7-4734-a2b9-58a77ac3a813" />
</div>

### Fully Responsive — Mobile, Tablet & Desktop
<div align="center">
  <img width="369" height="809" alt="Lumine mobile view" src="https://github.com/user-attachments/assets/63279b36-fc74-4bf7-b3c3-ac20d7708b17" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="368" height="811" alt="Lumine tablet view" src="https://github.com/user-attachments/assets/bbbe9613-14e0-499b-8c05-9f3f6a623c01" />
</div>

### Custom Error Handling
<div align="center">
  <img width="1350" height="811" alt="Custom error page" src="https://github.com/user-attachments/assets/c2209eba-6c2b-4810-bd43-61ee758f2bac" />
  <img width="1350" height="807" alt="Custom error message" src="https://github.com/user-attachments/assets/97b544a5-6d19-4965-9091-9d8af84df952" />
  <img width="1348" height="810" alt="Form validation error" src="https://github.com/user-attachments/assets/1c7dc30f-670a-438b-b8ff-c998c83a9c6d" />
</div>

### User Authentication
<div align="center">
  <img width="1347" height="806" alt="Login page" src="https://github.com/user-attachments/assets/be54efb2-6214-4f64-9949-7e0d503ba8a2" />
  <img width="1111" height="814" alt="Authenticated user view" src="https://github.com/user-attachments/assets/0b7b447b-aa06-464f-89e9-4c0d383e6244" />
</div>


## Testing

Lumine includes **automated tests** across both the frontend and backend.

### Frontend Tests (Vitest)
- **Unit tests** for individual components and utilities
- **Integration tests** that simulate real user interactions
- User event simulation (clicks, form inputs)


### Backend Tests (Vitest + Supertest)
- **Route-level integration tests** for every API endpoint
- Authentication and authorization flow testing
- Input validation and error response coverage

```bash
# Run all frontend tests
cd client && npm run test

# Run all backend tests
cd server && npm run test
```

---

## Project Structure

```
lumine/
├── client/                   # React + Vite frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Route-level page components
│   │   ├── store/            # Zustand state management
│   │   ├── hooks/            # Custom React hooks
|   |   ├── layout/           # Parent layout for pages 
|   |   ├── helpers/          # Reusable helper functions
│   │   └── tests__/          # Vitest unit & integration tests
│   └── vite.config.js
│
└── server/                   # Express.js backend
    ├── controllers/          # Request handlers (MVC)
    ├── models/               # Database models
    ├── routes/               # API route definitions
    ├── middleware/           # Auth, validation, error handling
    ├── config/               # Cofig files for database and authentication
    └── tests__/              # Vitest + Supertest API tests
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/lumine.git
cd lumine

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### Environment Variables

**Server** — create `server/.env`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/lumine
JWT_SECRET=your_jwt_secret
PORT=3000
```

**Client** — create `client/.env`:
```env
VITE_API_BASE_URLL=http://localhost:3000
```

### Run in Development

```bash
# Start the backend
cd server && npm run dev

# Start the frontend (new terminal)
cd client && npm run dev
```
---

## Roadmap

> 🚧 Lumine is actively being developed. Core features are live and new ones are shipping regularly.

- [x] JWT authentication & guest mode
- [x] Code editor with syntax highlighting (CodeMirror)
- [x] Snippet creation and discovery feed
- [x] Fully responsive layout (mobile, tablet, desktop)
- [x] Route protection & custom error pages
- [x] REST API with MVC architecture
- [x] Frontend & backend test suites
- [x] edit and delete posts
- [ ] Like system
- [ ] Search and tag filtering

---

## Contributing

Contributions, issues, and feature requests are welcome. This project is under active development — feel free to open an issue to discuss what you'd like to see.

---

## License

[MIT](LICENSE)

---

<div align="center">
  <sub>Built with intention. Designed for developers who appreciate beautiful code.</sub>
</div>
