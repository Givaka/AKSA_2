// @ts-nocheck

const db = require("./dataBase");

const express = require("express"),
  app = express(),
  http = require("http"),
  server = http.createServer(app);

app.use(express.json({ limit: "500kb" }));

app.use(express.static(__dirname));
app.get("/", (_, res) => {
  res.send("Server is running");
});

app.get("/api", (_, res) => {
  res.send("API is running");
});

// Работа с БД Студенты
app.get('/api/students', async (req, res) => {
  return res.send(await db.getStudents());
})

app.post('/api/students', async (req, res) => {
  await db.setStudents(req.body);
  return res.status(201).send({ title: 'Добавлен новый студент', status: 'positive' });
})

app.put('/api/students/:id', async (req, res) => {
  await db.editStudents(req.params.id, req.body);
  return res.status(201).send({ title: 'Данные студента обновлены', status: 'positive' });
})
app.delete('/api/students/:id', async (req, res) => {
  await db.deleteStudents(req.params.id);
  return res.status(201).send({ title: 'Студент удален', status: 'positive' });
})

// Работа с БД Преподаватели
app.get('/api/teachers', async (req, res) => {
  return res.send(await db.getTeachers());
})

app.post('/api/teachers', async (req, res) => {
  await db.setTeachers(req.body);
  return res.status(201).send({ title: 'Добавлен новый преподаватель', status: 'positive' });
})

app.put('/api/teachers/:id', async (req, res) => {
  await db.editTeachers(req.params.id, req.body);
  return res.status(201).send({ title: 'Данные преподавателя обновлены', status: 'positive' });
})

app.delete('/api/teachers/:id', async (req, res) => {
  await db.deleteTeachers(req.params.id);
  return res.status(201).send({ title: 'Преподаватель удален', status: 'positive' });
})

// Получение статичных списков
app.get('/api/reference/status/student', async (req, res) => {
  return res.send(await db.getStatusStudent());
})

app.get('/api/reference/status/benefit', async (req, res) => {
  return res.send(await db.getStatusBenefit());
})

app.get('/api/reference/form/admission', async (req, res) => {
  return res.send(await db.getFormAdmission());
})

app.get('/api/reference/form/study', async (req, res) => {
  return res.send(await db.getFormStudy());
})

app.get('/api/reference/scientific', async (req, res) => {
  return res.send(await db.getScientific());
})

app.get('/api/reference/positions', async (req, res) => {
  return res.send(await db.getPositions());
})

// Работа со справочниками
// Кафедры
app.get('/api/reference/departments', async (req, res) => {
  return res.send(await db.getDepartments());
})

app.post('/api/reference/departments', async (req, res) => {
  await db.setDepartments(req.body);
  return res.status(201).send({ title: 'Добавлена новая кафедра', status: 'positive' });
})

app.put('/api/reference/departments/:id', async (req, res) => {
  await db.editDepartments(req.params.id, req.body);
  return res.status(201).send({ title: 'Данные кафедры обновлены', status: 'positive' });
})

app.delete('/api/reference/departments/:id', async (req, res) => {
  await db.deleteDepartments(req.params.id);
  return res.status(201).send({ title: 'Кафедра удалена', status: 'positive' });
})

// Группы
app.get('/api/reference/group', async (req, res) => {
  return res.send(await db.getGroup());
})

app.post('/api/reference/group', async (req, res) => {
  await db.setGroup(req.body);
  return res.status(201).send({ title: 'Добавлена новая группы', status: 'positive' });
})

app.put('/api/reference/group/:id', async (req, res) => {
  await db.editGroup(req.params.id, req.body);
  return res.status(201).send({ title: 'Данные группы обновлены', status: 'positive' });
})

app.delete('/api/reference/group/:id', async (req, res) => {
  await db.deleteGroup(req.params.id);
  return res.status(201).send({ title: 'Группы удалена', status: 'positive' });
})

// Дисциплины
app.get('/api/reference/disciplines', async (req, res) => {
  return res.send(await db.getDisciplines());
})

app.post('/api/reference/disciplines', async (req, res) => {
  await db.setDisciplines(req.body);
  return res.status(201).send({ title: 'Добавлена новая дисциплина', status: 'positive' });
})

app.put('/api/reference/disciplines/:id', async (req, res) => {
  await db.editDisciplines(req.params.id, req.body);
  return res.status(201).send({ title: 'Данные дисциплины обновлены', status: 'positive' });
})

app.delete('/api/reference/disciplines/:id', async (req, res) => {
  await db.deleteDisciplines(req.params.id);
  return res.status(201).send({ title: 'Дисциплина удалена', status: 'positive' });
})

app.get('/api/reference/salary', async (req, res) => {
  return res.send(await db.getSalary());
})

app.get('/api/reference/scholarship', async (req, res) => {
  return res.send(await db.getScholarship());
})




server.listen(3000, () => {
  console.log(`listening on *:${3000}`);
});