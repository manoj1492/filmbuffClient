export class QuizModel {
  id: number;
  categoryName: string;
  timeLimit: number;
  date: Date;
  startTime: Date;
  createdBy: number;
  questionLimit: number;
  isRegistered: boolean;
}
