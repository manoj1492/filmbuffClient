import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { QuizComponent } from './quiz/quiz.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'quiz/:id', component: QuizComponent},
  {path: 'quizDetail', component: QuizDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
