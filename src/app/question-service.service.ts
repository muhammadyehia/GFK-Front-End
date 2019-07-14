import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders  } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IQuestion } from './models/IQuestion';
import { AppSetting } from '../app/config/app.setting'
@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor(private http: HttpClient) { }
  getQuestions(): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(AppSetting.BaseApiUrl+ AppSetting.QuestionsUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handelError)
    );
  }
  AnswerQuestions(answersIds:number[]):Observable<boolean>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<boolean>(AppSetting.BaseApiUrl+AppSetting.AnswersUrl, answersIds, httpOptions).pipe(
      tap(data =>console.log(' Answer result is ' + JSON.stringify(data))),
      catchError(this.handelError)
    );
  }
  private handelError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
