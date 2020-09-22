const { age, date, reverseDate, formatString } = require('../../lib/utils');
const db = require('../../config/db');
const Student = require('../models/student');


module.exports = {
  index(req, res) {
    let { filter, page, limit } =req.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    let params = {
      filter,
      page,
      limit,
      offset,
      callback(students) {
        const pagination = {
          total: Math.ceil(students[0].total / limit),
          page
        }
        return res.render("students/index", {students, pagination, filter})
      }
    }

  Student.paginate(params);
    
  //   Student.all((students) => {

  //     return res.render('students/index', {students});
  //   })
  },
  register(req, res) {
    Student.teachersSelectOptions((options) => {
      return res.render("students/register", {teacherOptions: options})
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todos os campos!!!");
      };
    };

    student.create(req.body, (student) => {
      return res.redirect('/students');
    })
  },
  show(req, res) {
    Student.find(req.params.id, (student) => {
      if(!student) {
        return res.send('Student not found!!!');
      }

      student.birth_date = reverseDate(date(student.birth_date).iso);
      student.school_year = formatString(student.school_year);

      return res.render(`students/show`, {student});
    })
  },
  edit(req, res) {
    Student.find(req.params.id, (student) => {
      if(!student) {
        return res.send('Student not found!!!');
      }

      student.birth_date = date(student.birth_date).iso;

      Student.teachersSelectOptions((options) => {
        return res.render(`students/edit`, {student, teacherOptions: options});
      })

    });
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todos os campos!!!");
      };
    };

    Student.update(req.body, (student) => {
      return res.redirect(`students/${req.body.id}`);
    })
  },
  delete(req, res) {
    Student.delete(req.body.id, () => {
      return res.redirect('/students');
    })
  }
};