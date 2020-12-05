export default class QuestionModel {
  id!: string;

  title!: string;

  hint!: string;

  options!: [];

  answer = [];

  type!: string;

  public constructor(json: any) {
    this.id = json.id;
    this.title = json.title;
    this.hint = json.hint;
    this.type = json.type;
    this.options = json.options;
    this.answer = [];
  }
}
