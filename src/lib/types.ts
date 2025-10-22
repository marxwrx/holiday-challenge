export type HolidayType = 'national' | 'state' | 'municipal' | string;

export interface HolidayDTO {
  date: string;
  name: string;
  type?: HolidayType;
}

export class HolidayVO {
  constructor(private readonly dto: Required<HolidayDTO>) {}

  get iso(): string {
    return this.dto.date;
  }

  get name(): string {
    return this.dto.name;
  }

  get type(): string {
    return this.dto.type;
  }

  get date(): Date {
    return new Date(`${this.dto.date}T00:00:00`);
  }
}
