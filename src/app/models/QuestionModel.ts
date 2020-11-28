import { AnswerModel } from './AnswerModel';

export class QuestionModel {
  id: number;
  statement: string;
  categoryName: string;
  type: string;
  answerList: AnswerModel[];
}
