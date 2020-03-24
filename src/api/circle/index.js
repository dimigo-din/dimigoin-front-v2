import { CircleRequestorService, CircleManagerService } from './circle.service';

export const circleRequestor = new CircleRequestorService('/circle');
export const circleManager = new CircleManagerService('/circle');
