import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { ScoreDialogComponent } from './score-dialog/score-dialog.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './auth/TokenInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuestionComponent,
    HomeComponent,
    CategoryComponent,
    QuizDetailComponent,
    ScoreDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule
  ],
  entryComponents: [
    ScoreDialogComponent,
    LoginComponent
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
