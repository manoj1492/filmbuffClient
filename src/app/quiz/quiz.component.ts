import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizModel } from './QuizModel';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizzes: QuizModel[];
  quizDetail: QuizModel;
  time: Date = new Date();
  canEnterQuiz = false;

  constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
       this.quizService.getAllQuizzes(params.get('id')).subscribe(quizList => {
          this.quizzes = quizList;
      });
    });
    this.quizDetail = new QuizModel();
    setInterval(() => {
      this.time = new Date();
      this.enableEnterQuiz(this.time);
   }, 1000);
  }

  showQuizDetail(quiz: QuizModel): void {
    this.quizDetail = quiz;
    this.canEnterQuiz = false;
  }

  registerinQuiz(): void {
    this.quizService.addParticipant(this.quizDetail.id.toString()).subscribe(message => {
      console.log(message);
      this.quizDetail.isRegistered = true;
    });
  }

  enableEnterQuiz(time: Date): void {
    if (this.quizDetail) {
      const quizStartTime = new Date (this.quizDetail.startTime);
      const duration: number = ((quizStartTime.getTime() - time.getTime()) / 1000 / 60);
      if (duration < 5 && duration > 0) {
        this.canEnterQuiz = true;
      }
    }
  }

  enterQuiz() {
    this.quizService.setQuizQuestionLimit(this.quizDetail.questionLimit);
    this.quizService.enterQuiz(this.quizDetail.id.toString()).subscribe(message => {
      this.router.navigate(['quizDetail']);
    });
  }

}
