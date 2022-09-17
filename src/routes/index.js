/* eslint-disable import/extensions */
const express = require('express');
// eslint-disable-next-line import/no-unresolved
const config = require('../../config.js');
const {
  getAll, postQuestion, putQuestionHelpful, putQuestionReported
} = require('../controllers/questions.js');
const {
  getAnswers, postAnswer, putAnswerHelpful, putAnswerReported
} = require('../controllers/answers.js');

// Declare express router
const router = express.Router();
// Default route
router.get('/', (req, res,) => res.status(200).json({ message: 'Welcome!' }));

// Define all routes for questions
// Primary read route used to pull data set for questions service
router.get('/qa/questions/:product_id/:page/:count', getAll);
// Used to add a new question to the DB
router.post('/qa/questions', postQuestion);
// Used to mark a particular questions as helpful incrementing the helpful score by 1
router.put('/qa/questions/:question_id/helpful', putQuestionHelpful);
// Used to report a particular question and prevent it from being seen client side
router.put('/qa/questions/:question_id/report', putQuestionReported);

// Define all routes for answers
// Can be used to get answers from a specific question id <-- NOT USED IN CURRENT FRONT END APP
router.get('/qa/questions/:question_id/answers/:page/:count', getAnswers);
// Used to add a new answer
router.post('/qa/questions/:question_id/answers', postAnswer);
// Used to mark an answer as helpful
router.put('/qa/answers/:answer_id/helpful', putAnswerHelpful);
// Used to mark an answer as reported
router.put('/qa/answers/:answer_id/report', putAnswerReported);

// This route is for loader.io verification only
router.get('/loaderio-ad1a572d7e260ccc32b6d608ceb6ee9d', (req, res) => {
  res.status(200).send('loaderio-ad1a572d7e260ccc32b6d608ceb6ee9d');
});
module.exports = router;
