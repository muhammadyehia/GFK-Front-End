import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAnswer } from '../models/IAnswer';
import { QuestionType } from '../models/IQuestion';
@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input() Answer: IAnswer;
  @Input() ChoiceType: QuestionType;
  @Input() AnswerGroup: string;
  @Input() TotalNumberOfAnswers: number;
  @Input() ShowAnswersPercentage: boolean;
  @Output() ChosenAnswer: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }
  isSingleChoice(): boolean {
    return this.ChoiceType === QuestionType.SingleChoice;
  }
  isMultipleChoice(): boolean {
    return this.ChoiceType === QuestionType.MultipleChoice;
  }
  checked() {
    this.ChosenAnswer.emit(this.Answer.Id)
  }
  calculateAnswerPercentage(): number {
    if(this.TotalNumberOfAnswers===0   ) return 0;
    let percentage = Math.round((this.Answer.Number / this.TotalNumberOfAnswers) * 100);
    return percentage;
  }
}

