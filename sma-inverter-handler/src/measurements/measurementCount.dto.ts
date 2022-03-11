export class MeasurementCountDto {
  readonly measurements: number;
}

export function countDtoFor(count: number) {
  return { measurements: count };
}
