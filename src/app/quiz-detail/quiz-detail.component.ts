import { QUIZ_QUESTION_TIME_GAP } from './../app.constants';
import { Component, OnInit } from '@angular/core';
import { QuestionModel } from '../models/QuestionModel';
import { QuestionAnswerModel } from '../models/QuestionAnswerModel';
import { SocketClientService } from '../services/socket-client.service';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {

  connected = false;
  question: QuestionModel;
  questionAnswer: QuestionAnswerModel;
  questionAnswerList: QuestionAnswerModel[];
  answerIndex: number;
  quizStarted = false;
  quizEnded = false;
  timer: number;

  constructor(private socketClientService: SocketClientService, private quizService: QuizService) { }

  ngOnInit() {
    this.question = new QuestionModel();
    this.questionAnswerList = [];
    this.answerIndex = -1;
    this.connect();
  }

  connect() {
    this.connected = true;
    this.socketClientService
      .onMessage('/topic/quiz')
        .subscribe(payload => {
          this.startTimer();
          this.question = payload;
          this.answerIndex++;
          this.questionAnswer = new QuestionAnswerModel();
          this.questionAnswer.questionId = this.question.id;
          this.questionAnswerList.push(this.questionAnswer);
        });
  }

  selectAnswer(): void {
    this.questionAnswerList[this.answerIndex].answerId = this.questionAnswer.answerId;
  }

  startTimer(): void {
    if (!this.quizStarted) {
      this.quizStarted = true;
      this.timer = QUIZ_QUESTION_TIME_GAP * this.quizService.getQuizQuestionLimit();
      const timerInterval = setInterval(() => {
        this.timer--;
      }, 1000);
      setTimeout(() => {
        this.quizEnded = true;
        clearInterval(timerInterval);
      }, this.calculateQuizOverTime() );
    }

  }

  calculateQuizOverTime(): number {
    return QUIZ_QUESTION_TIME_GAP * 1000 * this.quizService.getQuizQuestionLimit();
  }

  showResults(): void {
    this.quizService.showResults(this.questionAnswerList).subscribe(score => {
      console.log(score);
    });
  }

}
