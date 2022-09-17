
SELECT json_build_object(
  'results', (SELECT json_agg(row_to_json(questions))q FROM ( SELECT question_id, body, helpful,
  (SELECT json_object_agg(
          answers.answer_id, json_build_object(
            'id', answers.answer_id,
            'body', answers.body,
            'photos', (SELECT array_agg(row_to_json(answers_photos))photos
            FROM (SELECT url FROM answers_photos WHERE answer_id = answers.answer_id) answers_photos)
          )
  ) AS answers FROM answers WHERE questions.question_id = answers.question_id)
  FROM questions where questions.product_id = 737888) questions
)) object
