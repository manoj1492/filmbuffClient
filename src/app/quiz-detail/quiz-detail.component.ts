import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionAnswerModel } from '../question/QuestionAnswerModel';
import { QuestionModel } from '../question/QuestionModel';
import { ScoreDialogComponent } from '../score-dialog/score-dialog.component';
import { QuizService } from '../quiz/quiz.service';
import { SocketClientService } from '../socket-util/socket-client.service';
import { QUIZ_QUESTION_TIME_GAP } from './../app.constants';

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
  constructor(private socketClientService: SocketClientService, private quizService: QuizService, private dialog: MatDialog) { }

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
          this.startQuizOverTimer();
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

  startQuizOverTimer(): void {
    if (!this.quizStarted) {
      this.quizStarted = true;
      setTimeout(() => {
        this.quizEnded = true;
      }, this.calculateQuizOverTime() );
    }

  }

  startTimer(): void {
    this.timer = QUIZ_QUESTION_TIME_GAP;
    const timerInterval = setInterval(() => {
      this.timer--;
    }, 1000);
    setInterval(() => {
      this.timer = 0;
      clearInterval(timerInterval);
    }, QUIZ_QUESTION_TIME_GAP * 1000);
  }

  calculateQuizOverTime(): number {
    return QUIZ_QUESTION_TIME_GAP * 1000 * this.quizService.getQuizQuestionLimit();
  }

  showResults(): void {

    this.quizService.showResults(this.questionAnswerList).subscribe(score => {
      this.quizService.setQuizScore(score);
      this.dialog.open(ScoreDialogComponent);
    });
  }

}
