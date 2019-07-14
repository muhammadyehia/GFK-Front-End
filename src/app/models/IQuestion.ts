import { IAnswer } from './IAnswer';
export interface IQuestion {
    Id: number;
    Text: string;
    Type: QuestionType;
    Answers: IAnswer[];
}
export enum QuestionType {
    SingleChoice = 0,
    MultipleChoice = 1
}
