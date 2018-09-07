export interface MockData {
  id: number;
  embeddedObj: { id: number; test: string; another: { id: number } };
  simpleEmbeddedObj: { id: number };
  name: string;
  status: string;
  enabled: boolean;
  date: Date;
  dateTime: Date;
  time: Date;
  money: number;
  percent: number;
  telephone: string;
  email: string;
  address: { city?: string; state?: string };
}
