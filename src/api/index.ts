import axios from 'axios';

export default class API {
  public static getQuestions = () => axios.get('/questions');

  public static opstAssessments = (data: {}) => axios.post('/assessments', data);
}
