--default questions table--
CREATE TABLE IF NOT EXISTS questions (
  question_id SERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  body TEXT NOT NULL,
  date_written BIGINT NOT NULL,
  asker_name TEXT NOT NULL,
  asker_email TEXT,
  reported BOOLEAN,
  helpful INT
);
--default answers table
CREATE TABLE IF NOT EXISTS answers (
  answer_id SERIAL NOT NULL PRIMARY KEY,
  question_id INT NOT NULL,
  body TEXT NOT NULL,
  date_written BIGINT NOT NULL,
  answerer_name TEXT NOT NULL,
  answerer_email TEXT,
  reported BOOLEAN NOT NULL,
  helpful INT NOT NULL,
  CONSTRAINT questions
    FOREIGN KEY(question_id)
      REFERENCES questions(question_id)
);
--default photos table--
CREATE TABLE IF NOT EXISTS answers_photos (
  photo_id SERIAL NOT NULL PRIMARY KEY,
  answer_id INT,
  url TEXT,
  CONSTRAINT answers
    FOREIGN KEY (answer_id)
      REFERENCES answers(answer_id)
);