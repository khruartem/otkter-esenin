type EventStatus = "scheduled" | "completed" | "cancelled";

type Venue = {
  name: string;
  city: string;
  streetAddress: string;
  country: string;
};

type Tickets = {
  minPrice: number;
  maxPrice: number;
  currency: "RUB";
  availability: "InStock" | "SoldOut";
};

interface IPerformanceEvent {
  name: string;
  description: string;
  startDate: string;
  dateLabel: string;
  status: EventStatus;
  ticketURL: string;
  venue: Venue;
  tickets: Tickets;
}

type TPerformanceEvent = {
  name: string;
  description: string;
  startDate: string;
  dateLabel: string;
  status: EventStatus;
  ticketURL: string;
  venue: Venue;
  tickets: Tickets;
};

class PerformanceEvent implements IPerformanceEvent {
  private _name: string;
  private _description: string;
  private _startDate: string;
  private _dateLabel: string;
  private _status: EventStatus;
  private _ticketURL: string;
  private _venue: Venue;
  private _tickets: Tickets;

  constructor(performanceEvent: TPerformanceEvent) {
    const {
      name,
      description,
      startDate,
      dateLabel,
      status,
      ticketURL,
      venue,
      tickets,
    } = performanceEvent;

    this.checkStartDate(startDate);

    this._name = name;
    this._description = description;
    this._startDate = startDate;
    this._dateLabel = dateLabel;
    this._status = status;
    this._ticketURL = ticketURL;
    this._venue = venue;
    this._tickets = tickets;
  }

  private checkStartDate(startDate: string): void {
    const parsedDate = startDate ? new Date(startDate) : null;

    if (parsedDate && Number.isNaN(parsedDate.getTime())) {
      throw new Error("Некорректная дата спектакля в src/data/event.ts");
    }
  }

  // private setStatus(
  //   performanceDate: string,
  //   currentStatus: EventStatus,
  // ): EventStatus {
  //   if (currentStatus === "cancelled") {
  //     return currentStatus;
  //   }

  //   const currentDateMs = new Date().getMilliseconds();
  //   const performanceDateMs = new Date(performanceDate).getMilliseconds();

  //   if (currentDateMs > performanceDateMs) {
  //     return "completed" as EventStatus;
  //   } else {
  //     return "scheduled" as EventStatus;
  //   }
  // }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get startDate(): string {
    return this._startDate;
  }

  get dateLabel(): string {
    return this._dateLabel;
  }

  get status(): EventStatus {
    return this._status;
  }

  get ticketURL(): string {
    return this._ticketURL;
  }

  get venue(): Venue {
    return this._venue;
  }

  get tickets(): Tickets {
    return this._tickets;
  }
}

const defaultData: TPerformanceEvent = {
  name: "Есенин. Жизнь в стихах",

  description:
    "Музыкально-поэтический спектакль творческого объединения «Открытая Территория». Стихи и песни Сергея Есенина под аккомпанемент фортепиано.",

  // Фактическая дата спектакля
  // Формат: YYYY-MM-DDTHH:mm:ss+03:00
  startDate: "2026-10-18T18:00:00+03:00",

  // Подпись, которая будет отображаться на сайте.
  dateLabel: "18 октября, 18:00 и 20:00",

  status: "scheduled",

  ticketURL:
    "https://afisha.yandex.ru/moscow/literary-reading/esenin-zhizn-v-stikhakh-tvorcheskoe-obedinenie-otkrytaia-territoriia",

  venue: {
    name: "Театр «Фэст»",
    city: "Мытищи",
    streetAddress: "ул. Щербакова, 6А",
    country: "RU",
  },
  tickets: {
    minPrice: 1900,
    maxPrice: 2500,
    currency: "RUB",
    availability: "InStock",
  },
};

const performanceEvent = new PerformanceEvent(defaultData);

export { performanceEvent };
