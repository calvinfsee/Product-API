const { pool } = require('../../db/index');

// Primary read function to supply all necessary data for QnA service
exports.getAll = (req, res) => {
  const product = req.params.product_id;
  // eslint-disable-next-line function-paren-newline
  pool.query(
    `SELECT json_build_object(
      'results', (SELECT json_agg(row_to_json(questions))q FROM ( SELECT question_id AS id, body AS question_body, helpful AS question_helpfulness,
      (SELECT json_object_agg(
              answers.answer_id, json_build_object(
                'id', answers.answer_id,
                'body', answers.body,
                'answerer_name', answers.answerer_name,
                'helpfulness', answers.helpful,
                'photos', (SELECT array_agg(row_to_json(answers_photos))photos
                FROM (SELECT url FROM answers_photos WHERE answer_id = answers.answer_id) answers_photos)
              )
      ) AS answers FROM answers WHERE questions.question_id = answers.question_id AND answers.reported = 'f')
      FROM questions where questions.product_id = $1 AND questions.reported = 'f') questions
    )) as object`, [ product ])
    .then((response) => {
      res.status(200).send(response.rows[0].object.results);
    }).catch(err => console.log(err));
};

// Post a new question to the database
exports.postQuestion = (req, res) => {
  const product = req.body.product_id;
  const { body, name, email } = req.body;
  pool.query(`INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES (${product},
  ${body}, ${Date.now()}, ${name}, ${email}, false, ${0})`)
    .then(res.sendStatus(201))
    .catch(err => console.log(err));
};

// Mark a qquestion as helpful
exports.putQuestionHelpful = (req, res) => {
  pool.query(`UPDATE questions SET helpful = helpful + 1  WHERE question_id = ${req.params.question_id} `)
    .then(res.sendStatus(200))
    .catch(err => console.log(err));
};

// Report a question and keep it from being included in any data sent to client
exports.putQuestionReported = (req, res) => {
  pool.query(`UPDATE questions SET reported = true WHERE question_id = ${req.params.question_id}`)
    .then(res.sendStatus(200))
    .catch(err => console.log(err));
};
