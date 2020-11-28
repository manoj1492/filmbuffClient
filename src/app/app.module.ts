import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuestionComponent,
    HomeComponent,
    CategoryComponent,
    QuizDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
