import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import { AnswerListComponent } from './answer-list/answer-list.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SubmitFeedbackComponent } from './submit-feedback/submit-feedback.component';
import { FeedbackResultComponent } from './feedback-result/feedback-result.component';
import { MenuComponent } from './menu/menu.component';

const appRoutes: Routes = [
  { path: 'SubmitFeedback', component: SubmitFeedbackComponent} ,
  { path: 'FeedbackResult',      component: FeedbackResultComponent },
  { path: '**', component: MenuComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    AnswerComponent,
    AnswerListComponent,
    QuestionListComponent,
    SubmitFeedbackComponent,
    FeedbackResultComponent,
    MenuComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
