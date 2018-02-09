import _ from 'lodash';

const scoreRecords = 10;

const getFullScores = (fullScores) => {
  let scores = {};
  if (!_.isEmpty(fullScores)) {
    scores = JSON.parse(fullScores);
  }

  return scores;
};

const prepareAllScoresForStorage = (fullScores, fieldSize, score, steps) => {
  const scores = getFullScores(fullScores);

  let fieldScore = _.get(scores, `${fieldSize}`, []);
  fieldScore.push({
    score, steps,
  });
  // sort
  fieldScore = _.orderBy(fieldScore, ['score', 'steps'], ['desc', 'asc']);
  // remove duplicates
  fieldScore = _.uniqWith(fieldScore, _.isEqual);
  // limit records
  fieldScore = _.slice(fieldScore, 0, scoreRecords);

  scores[fieldSize] = fieldScore;
  return JSON.stringify(scores);
};

export default {
  prepareAllScoresForStorage,
  getFullScores,
};
