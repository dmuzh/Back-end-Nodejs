const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../utils');
const {
  q1,
  q3a,
} = require('./validations');
const {
  question1,
  question1a,
  question1b,
  question2a,
  question2b,
  question3,
  question3a,
  question5,
  question7,
  question7a,
  question8a,
  question8b,
  question9,
  question10,
  question11,
  question12,
  question13,
  question18,
  question19,
  question20,
  question24,
  question25,
  question27,
  hotSale,
  hotSaleFull,
  selling,
  spRandom,
  categorelimit,
 




} = require('./controller');

router.get('/1', question1);
router.get('/1a', validateSchema(q1), question1a);
router.get('/1b', question1b);
router.get('/2a', question2a);
router.get('/2b', question2b);
router.get('/3', question3);
router.get('/3a', validateSchema(q3a), question3a);
router.get('/5', question5);
router.get('/7', question7);
router.get('/7a', question7a);
router.get('/8a', question8a);
router.get('/8b', question8b);

router.get('/9', question9);
router.get('/10', question10);
router.get('/11', question11);
router.get('/12', question12);
router.get('/13', question13);
router.get('/18', question18);
router.get('/19', question19);
router.get('/20', question20);
router.get('/24', question24);
router.get('/25', question25);
router.get('/27', question27);
router.get('/hotSale', hotSale);
router.get('/hotSaleFull', hotSaleFull);

router.get('/selling', selling);
router.get('/spRandom',spRandom) 
router.get('/categorelimit',categorelimit)















module.exports = router;