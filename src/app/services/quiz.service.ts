import { QuestionAnswerModel } from './../models/QuestionAnswerModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QUIZ } from '../app.constants';
import { QuestionModel } from '../models/QuestionModel';
import { QuizModel } from '../models/QuizModel';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizQuestionLimit: number;

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

  showResults(answers: QuestionAnswerModel[]) {
    const requestOptions: object = {
      responseType: 'text'
    };
    return this.httpClient.post<any>(environment.api + QUIZ + 'results', answers, requestOptions);
  }
}
