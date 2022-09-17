const { pool } = require('../../db/index');

// Posts a new question to the db with supplied body params
exports.postAnswer = (req, res) => {
  const question = req.body.question_id;
  const { body, name, email } = req.body;
  pool.query(`INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
  VALUES (${question}, ${body}, ${Date.now()}, ${name}, ${email}, false, 0)`)
    .then(() => {
      res.sendStatus(200);
    }).catch(err => console.log(err));
};
// Gets answers based on the specified question id
exports.getAnswers = (req, res) => {
  const question = req.params.question_id;
  const { page, count } = req.params;
  pool.query(`SELECT answer_id, body, to_timestamp(date_written), answerer_name, helpful
  FROM answers WHERE question_id = $1 AND reported != true
  OFFSET $2 LIMIT $3`, [ question, (page * count), count ])
    .then((response) => {
      res.status(201).send(response.rows);
    }).catch(err => console.log(err));
};
// Marks a specific answer id as helpful
exports.putAnswerHelpful = (req, res) => {
  pool.query(`UPDATE answers SET helpful = helpful + 1 WHERE answer_id = ${req.params.answer_id}`)
    .then(res.sendStatus(200))
    .catch(err => console.log(err));
};
// Marks a specific answer id as reported which prevents it from being sent to the client
exports.putAnswerReported = (req, res) => {
  pool.query(`UPDATE answers SET reported = true WHERE answer_id = ${req.params.answer_id}`)
    .then(res.sendStatus(200))
    .catch(err => console.log(err));
};
