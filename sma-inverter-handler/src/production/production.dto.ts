export class ProductionDto {
  readonly total: number;
  readonly today: number;
  current: {
    readonly dc: number;
    readonly ac: number;
  };
}
