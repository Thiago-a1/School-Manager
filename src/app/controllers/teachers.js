const { age, date, reverseDate } = require('../../lib/utils');
const teacher = require('../models/teacher');

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    let params = {
      filter,
      page,
      limit,
      offset,
      callback(teachers) {
        const pagination = {
          total: Math.ceil(teachers[0].total / limit),
          page
        }
        return res.render("teachers/index", {teachers, pagination, filter})
      }
    };

    teacher.paginate(params);
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todos os campos!!!");
      };
    };

    teacher.create(req.body, (teacher) => {
      return res.redirect(`/teachers/${teacher.id}`);
    })
  },
  show(req, res) {
    teacher.find(req.params.id, (teacher) => {
      if (!teacher) {
        return res.send("teacher not found!!!");
      }

      teacher.subjects_taught = teacher.subjects_taught.split(',');
      teacher.education_level = teacher.education_level.split('_').join(' ');
      teacher.birth_date = reverseDate(date(teacher.birth_date).iso);
      teacher.created_at = reverseDate(date(teacher.created_at).iso);

      return res.render('teachers/show', {teacher});
    })
  },
  edit(req, res) {
    teacher.find(req.params.id, (teacher) => {
      if (!teacher) {
        return res.send("teacher not found!!!");
      }

      teacher.subjects_taught = teacher.subjects_taught.split(',');
      teacher.education_level = teacher.education_level.split('_').join(' ');
      teacher.birth_date = date(teacher.birth_date).iso;
      teacher.created_at = reverseDate(date(teacher.created_at).iso);

      return res.render('teachers/edit', {teacher});
    });
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todos os campos!!!");
      };
    };

    teacher.update(req.body, (teacher) => {
      return res.redirect(`teachers/${req.body.id}`);
    })
  },
  delete(req, res) {
    teacher.delete(req.body.id, () => {
      return res.redirect('/teachers');
    })
  }
};