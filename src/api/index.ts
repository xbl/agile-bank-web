import axios from 'axios';

export default class API {
  public static getQuestions = () => axios.get('https://q0t3rnph2f.execute-api.us-east-1.amazonaws.com/Prod/questions');
}
