import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QUIZ } from '../app.constants';
import { QuizModel } from './QuizModel';
import { QuestionAnswerModel } from '../question/QuestionAnswerModel';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizQuestionLimit: number;
  quizScore: number;

  constructor(private httpClient: HttpClient) { }

  getAllQuizzes(categoryId: string): Observable<QuizModel[]> {
    return this.httpClient.get<QuizModel[]>(environment.api + QUIZ + categoryId);
  }

  addParticipant(quizId: string): Observable<any> {
    const params = new HttpParams()
                    .set('quizId', quizId);
    const requestOptions: object = {
      params,
      responseType: 'text'
    };
    return this.httpClient.get<any>(environment.api + QUIZ + 'register', requestOptions);
  }

  enterQuiz(quizId: string) {
    const params = new HttpParams()
                    .set('quizId', quizId);
    const requestOptions: object = {
      params,
      responseType: 'text'
    };
    return this.httpClient.get<any>(environment.api + QUIZ + 'enter', requestOptions);
  }

  setQuizQuestionLimit(questionLimit: number): void {
    this.quizQuestionLimit = questionLimit;
  }

  getQuizQuestionLimit(): number {
    return this.quizQuestionLimit;
  }

  setQuizScore(score: number): void {
    this.quizScore = score;
  }

  getQuizScore(): number {
    return this.quizScore;
  }

  showResults(answers: QuestionAnswerModel[]) {
    const requestOptions: object = {
      responseType: 'text'
    };
    return this.httpClient.post<any>(environment.api + QUIZ + 'results', answers, requestOptions);
  }
}
