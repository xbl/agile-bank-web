export default class QuestionModel {
  id!: string;

  title!: string;

  hint!: string;

  options!: [];

  answer = [];

  type!: string;

  constructor(json?: object) {
    Object.assign(this, json);
    this.answer = [];
  }
}
