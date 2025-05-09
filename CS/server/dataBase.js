
const pg = require('pg'),
  Client = pg.Client;

const connectionParam = {
  user: 'postgres',
  password: '159753',
  host: 'localhost',
  port: 5432,
  database: 'University',
}

const clientPg = new Client(connectionParam);
clientPg.connect();

module.exports.getStudents = async function getStudents() {
  const query = await clientPg.query('SELECT * FROM "Students" WHERE is_removed = $1', [false])
  return (query.rows);
}

module.exports.setStudents = async function setStudents(data) {
  const res = await clientPg.query(
    `INSERT INTO public."Students"(
	"fullname", "birthday", "group", "dayEnrollment", "course", "statusStudy", "formStudy", "statusBenefit", "formAdmission", "scholarship")
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [data.fullname,
    data.birthday,
    data.group,
    data.dayEnrollment,
    data.course,
    data.statusStudy,
    data.formStudy,
    data.statusBenefit,
    data.formAdmission,
    data.scholarship]);
}

module.exports.editStudents = async function editStudents(id, data) {
  const res = await clientPg.query(
    `UPDATE public."Students" SET "fullname"=$2, "birthday"=$3, "group"=$4, "dayEnrollment"=$5, "course"=$6, "statusStudy"=$7, "formStudy"=$8, "statusBenefit"=$9, "formAdmission"=$10, "scholarship"=$11
	WHERE id = $1;`,
    [id, data.fullname,
      data.birthday,
      data.group,
      data.dayEnrollment,
      data.course,
      data.statusStudy,
      data.formStudy,
      data.statusBenefit,
      data.formAdmission,
      data.scholarship]);
}

module.exports.deleteStudents = async function deleteStudents(id) {
  const res = await clientPg.query('UPDATE public."Students" SET is_removed = $2 WHERE id = $1;', [id, true]);

  return res;
}

module.exports.getTeachers = async function getTeachers() {
  const query = await clientPg.query('SELECT * FROM "Teachers" WHERE is_removed = $1', [false])
  return (query.rows);
}

module.exports.setTeachers = async function setTeachers(data) {
  const res = await clientPg.query(
    `INSERT INTO public."Teachers"(
	"fullname", birthday, "dayHiring", "dayAppointment", "position", "statusScientific")
	VALUES ($1, $2, $3, $4, $5, $6)`,
    [data.fullname,
    data.birthday,
    data.dayHiring,
    data.dayAppointment,
    data.position,
    data.statusScientific,
    ]);
}

module.exports.editTeachers = async function editTeachers(id, data) {
  const res = await clientPg.query(
    `UPDATE public."Teachers"
      SET "fullname"=$2, birthday=$3, "dayHiring"=$4, "dayAppointment"=$5, "position"=$6, "statusScientific"=$7
      WHERE id = $1`,
    [id, data.fullname,
      data.birthday,
      data.dayHiring,
      data.dayAppointment,
      data.position,
      data.statusScientific,
    ]);
}

module.exports.deleteTeachers = async function deleteTeachers(id) {
  const res = await clientPg.query('UPDATE public."Teachers" SET is_removed = $2 WHERE id = $1;', [id, true]);

  return res;
}

module.exports.getGroup = async function getGroup() {
  const query = await clientPg.query('SELECT * FROM "Groups"')
  return (query.rows);
}

module.exports.setGroup = async function setGroup(data) {
  const res = await clientPg.query(
    `INSERT INTO public."Groups"( name ) VALUES ($1)`,
    [data.name]);
}

module.exports.editGroup = async function editGroup(id, data) {
  const res = await clientPg.query(
    `UPDATE public."Groups" SET "name"=$2 WHERE id = $1`,
    [id, data.name]);
}

module.exports.deleteGroup = async function deleteGroup(id) {
  const res = await clientPg.query('DELETE FROM public."Groups" WHERE id = $1;', [id]);
  return res;
}

module.exports.getDepartments = async function getDepartments() {
  const query = await clientPg.query('SELECT * FROM "Departments"')
  return (query.rows);
}

module.exports.setDepartments = async function setDepartments(data) {
  const res = await clientPg.query(
    `INSERT INTO public."Departments"( name ) VALUES ($1)`,
    [data.name]);
}

module.exports.editDepartments = async function editDepartments(id, data) {
  const res = await clientPg.query(
    `UPDATE public."Departments" SET "name"=$2 WHERE id = $1`,
    [id, data.name]);
}

module.exports.deleteDepartments = async function deleteDepartments(id) {
  const res = await clientPg.query('DELETE FROM public."Departments" WHERE id = $1;', [id]);
  return res;
}

module.exports.getDisciplines = async function getDisciplines() {
  const query = await clientPg.query('SELECT * FROM "Disciplines"')
  return (query.rows);
}

module.exports.setDisciplines = async function setDisciplines(data) {
  const res = await clientPg.query(
    `INSERT INTO public."Disciplines"( name ) VALUES ($1)`,
    [data.name]);
}

module.exports.editDisciplines = async function editDisciplines(id, data) {
  const res = await clientPg.query(
    `UPDATE public."Disciplines" SET "name"=$2 WHERE id = $1`,
    [id, data.name]);
}

module.exports.deleteDisciplines = async function deleteDisciplines(id) {
  const res = await clientPg.query('DELETE FROM public."Disciplines" WHERE id = $1;', [id]);
  return res;
}


module.exports.getSalary = async function getSalary() {
  const query = await clientPg.query('SELECT * FROM "Salary"')
  return (query.rows);
}

module.exports.getScholarship = async function getScholarship() {
  const query = await clientPg.query('SELECT * FROM "Scholarship"')
  return (query.rows);
}



module.exports.getScientific = async function getScientific() {
  const query = await clientPg.query('SELECT * FROM "Scientific activity"')
  return (query.rows);
}

module.exports.getPositions = async function getPositions() {
  const query = await clientPg.query('SELECT * FROM "Positions"')
  return (query.rows);
}

module.exports.getStatusStudent = async function getStatusStudent() {
  const query = await clientPg.query('SELECT * FROM "Student status"')
  return (query.rows);
}

module.exports.getStatusBenefit = async function getStatusBenefit() {
  const query = await clientPg.query('SELECT * FROM "Benefit status"')
  return (query.rows);
}

module.exports.getFormAdmission = async function getFormAdmission() {
  const query = await clientPg.query('SELECT * FROM "Admission form"')
  return (query.rows);
}

module.exports.getFormStudy = async function getFormStudy() {
  const query = await clientPg.query('SELECT * FROM "Form of study"')
  return (query.rows);
}
