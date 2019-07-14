import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAnswer } from '../models/IAnswer';
import { QuestionType } from '../models/IQuestion';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {
  @Input() Answers: IAnswer[];
  @Input() ChoiceType: QuestionType;
  @Input() TotalNumberOfAnswers: number;
  @Input() AnswersGroup: string;
  @Input() ShowAnswersPercentage: boolean;
  @Output() ChosenAnswersOutPut: EventEmitter<number[]> = new EventEmitter<number[]>();
  ChosenAnswers: number[] = [];

  constructor() { }

  ngOnInit() {
  }
  onChosenAnswer(answer: number): void {
    if (this.ChoiceType === QuestionType.SingleChoice) {
      this.ChosenAnswers.length = 0;
      this.ChosenAnswers.push(answer);
    }
    else if (this.ChoiceType === QuestionType.MultipleChoice) {
      const index = this.ChosenAnswers.indexOf(answer, 0);
      if (index > -1) {
        this.ChosenAnswers.splice(index, 1);
      }
      else {
        this.ChosenAnswers.push(answer);
      }
    }
    this.ChosenAnswersOutPut.emit(this.ChosenAnswers);
  }
}
