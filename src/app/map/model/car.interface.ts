import {IPosition} from './position.interface';

export interface ICar {
  carId: string;
  sensorId: string;
  sensorType: string;
  sensorValue: string;
  sensorUnit: string;
  sensorTimestamp: string;
  currentSpeed: number;
  positions: IPosition[];
  isMoving: boolean;
  lastMovementTimestamp: string;
  hotData: boolean;
}
