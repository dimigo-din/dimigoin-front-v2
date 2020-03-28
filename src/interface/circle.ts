export interface ICircle {
  imageKey: string;
  _id: string;
  name: string;
  category: string;
  description: string;
  chair: { _id: string; name: string; serial: number };
  viceChair: { _id: string; name: string; serial: number };
  videoLink: string;
  applied?: boolean;
}
