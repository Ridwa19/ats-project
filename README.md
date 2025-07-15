# ATS Project

A full-stack Applicant Tracking System (ATS) built with React and Node.js/Express.

## Features

### Admin Dashboard
- Simulated login (hardcoded: `admin` / `admin123`)
- Create, edit, and delete job postings (title, description, deadline)
- View lists of applicants per job
- View detailed CV information submitted by applicants

### Public Application Form
- Candidates enter all CV details via input fields (no file uploads)
- Fields: Full Name, Email, Phone, LinkedIn (optional), Education (multi), Experience (multi), Skills, Cover Letter, Position Applied For (dropdown)
- Dynamic add/remove for education and experience entries

### UI/UX
- Modern, clean interface using Material-UI
- Responsive design for both admin and public users
- All CRUD operations for jobs and applicants

## Technologies Used

- **Frontend:** React, Material-UI, React Router
- **Backend:** Node.js, Express, CORS
- **Data Storage:** JSON files (no database required)
- **Authentication:** Hardcoded admin credentials

## How to Run

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm start
```

- Admin login: username `admin`, password `admin123`
- Public application form: [http://localhost:3000/apply](http://localhost:3000/apply)
- Admin dashboard: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Project Structure

```
backend/
  server.js
  data/
    jobs.json
    applicants.json
frontend/
  src/
    components/
    pages/
    App.js
    index.js
  public/
README.md
```

## Demo

- [Add your Loom/Google Drive demo link here]



## Author

- Ridwaan adan ali 
