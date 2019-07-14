import { Component, OnInit, Input } from '@angular/core';
import { IQuestion } from '../models/IQuestion';
import { ValidationService } from '../validation.service';
import { QuestionServiceService } from '../question-service.service';
import {Router} from "@angular/router"
@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  providers: [ValidationService]
})
export class QuestionListComponent implements OnInit {
  @Input() ShowAnswersPercentage: boolean;
  ShowLoder:boolean;
  Questions: IQuestion[];
  QuestionsAnswers: number[];
  ErrorMessage: string;
  constructor(private validationService: ValidationService, private questionService: QuestionServiceService,private router: Router) {
    validationService.ValidationConfirmed$.subscribe(validationResult => {
      this.isValid = this.isValid && validationResult;
    });
  }
  isValid: boolean;
  ngOnInit() {
    this.QuestionsAnswers = [];
    this.ShowLoder=true;
    this.isValid = true;
    this.questionService.getQuestions().subscribe(questions =>
      {
      this.Questions = questions;
      this.ShowLoder=false;
      },
      error => {
        this.ErrorMessage = error as any;
        this.ShowLoder=false;
      }
    );
  }
  private validate() {
    this.isValid = true;
    this.validationService.announceValidation();
  }
  submit() {
    this.validate();
    if (this.isValid) {

      this.questionService.AnswerQuestions(this.QuestionsAnswers).subscribe(result => {
        if (result) {
          alert("success");
          this.router.navigate(['/'])
        }
        else
        {
          alert("error");
        }
      }
      );
    }
  }
  onQuestionAnswer(QuestionAnswers: number[]) {

    this.QuestionsAnswers = this.QuestionsAnswers.concat(QuestionAnswers);
  }
}
