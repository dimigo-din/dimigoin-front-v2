export type statusType =
  | 'applied'
  | 'document-fail'
  | 'document-pass'
  | 'interview-fail'
  | 'interview-pass'
  | 'final';

export interface AppliedCircle {
  name: string;
  imageKey: string;
}

export interface Application {
  _id: string;
  status: statusType;
  circle: {
    _id: string;
    name: string;
  };
  form: {
    [key: string]: string;
  };
  applier: {
    _id: string;
    name: string;
    serial: number;
    appliedCircles: AppliedCircle[];
  };
}
