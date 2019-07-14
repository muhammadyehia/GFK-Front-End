import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { IQuestion } from '../models/IQuestion';
import { Subscription } from 'rxjs';
import { ValidationService } from '../validation.service';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {
  @Input() Question: IQuestion;
  @Input() ShowAnswersPercentage: boolean;
  @Input()  TotalNumberOfAnswers:number;
  @Output() QuestionAnswersOutPut: EventEmitter<number[]> = new EventEmitter<number[]>();
  ChosenAnswers: number[];
  CanValidate:boolean;
  subscription: Subscription;
  constructor(private validationService: ValidationService) {
    validationService.ValidationAnnounced$.subscribe(
      () => {
        let validateResult: boolean = this.validate();
        validationService.confirmValidation(validateResult);
      });
  }
  ngOnInit() {
    this.ChosenAnswers = [];
    this.CanValidate=false;
  }
  onChosenAnswers(answers: number[]): void {
    this.ChosenAnswers = answers;
    console.log(answers);
  }
  validate(): boolean {
    this.CanValidate=true;
    let validateResult: boolean = this.ChosenAnswers.length > 0;
    if (validateResult) {
      this.QuestionAnswersOutPut.emit(this.ChosenAnswers);
    }
    return validateResult;
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    if(this.subscription)
    this.subscription.unsubscribe();
  }
}
