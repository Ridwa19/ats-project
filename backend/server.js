const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const JOBS_FILE = path.join(__dirname, 'data', 'jobs.json');
const APPLICANTS_FILE = path.join(__dirname, 'data', 'applicants.json');

function readData(file) {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}
function writeData(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

const ADMIN = { username: 'admin', password: 'admin123' };

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN.username && password === ADMIN.password) {
    res.json({ token: 'admin-token' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/jobs', (req, res) => {
  res.json(readData(JOBS_FILE));
});
app.post('/api/jobs', (req, res) => {
  const jobs = readData(JOBS_FILE);
  const newJob = { ...req.body, id: Date.now().toString() };
  jobs.push(newJob);
  writeData(JOBS_FILE, jobs);
  res.json(newJob);
});
app.put('/api/jobs/:id', (req, res) => {
  const jobs = readData(JOBS_FILE);
  const idx = jobs.findIndex(j => j.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Job not found' });
  jobs[idx] = { ...jobs[idx], ...req.body };
  writeData(JOBS_FILE, jobs);
  res.json(jobs[idx]);
});
app.delete('/api/jobs/:id', (req, res) => {
  let jobs = readData(JOBS_FILE);
  jobs = jobs.filter(j => j.id !== req.params.id);
  writeData(JOBS_FILE, jobs);
  res.json({ success: true });
});

app.post('/api/applicants', (req, res) => {
  const applicants = readData(APPLICANTS_FILE);
  const newApplicant = { ...req.body, id: Date.now().toString(), appliedAt: new Date().toISOString() };
  applicants.push(newApplicant);
  writeData(APPLICANTS_FILE, applicants);
  res.json(newApplicant);
});
app.get('/api/applicants', (req, res) => {
  const { jobId } = req.query;
  const applicants = readData(APPLICANTS_FILE);
  if (jobId) {
    res.json(applicants.filter(a => a.jobId === jobId));
  } else {
    res.json(applicants);
  }
});
app.get('/api/applicants/:id', (req, res) => {
  const applicants = readData(APPLICANTS_FILE);
  const applicant = applicants.find(a => a.id === req.params.id);
  if (!applicant) return res.status(404).json({ error: 'Not found' });
  res.json(applicant);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`)); 