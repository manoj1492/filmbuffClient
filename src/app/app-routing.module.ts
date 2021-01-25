import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { QuizComponent } from './quiz/quiz.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'quiz/:id', component: QuizComponent, canActivate : [AuthGuardService]},
  {path: 'quizDetail', component: QuizDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
