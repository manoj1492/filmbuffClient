import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz/quiz.service';

@Component({
  selector: 'app-score-dialog',
  templateUrl: './score-dialog.component.html',
  styleUrls: ['./score-dialog.component.css']
})
export class ScoreDialogComponent implements OnInit {

  quizScore: number;
  constructor(private quizService: QuizService) {
    this.quizScore = this.quizService.getQuizScore();
  }

  ngOnInit() {
  }

}
