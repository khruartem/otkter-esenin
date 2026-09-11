import type { EventMap } from "./event-types";

type EventName = keyof EventMap;

type Handler<K extends EventName> = (data: EventMap[K]) => void;

type EventArgs<K extends EventName> = EventMap[K] extends undefined
  ? []
  : [data: EventMap[K]];

export interface IEvents {
  on<K extends EventName>(event: K, callback: Handler<K>): () => void;

  emit<K extends EventName>(event: K, ...args: EventArgs<K>): void;
}

export class EventEmitter implements IEvents {
  private readonly listeners = new Map<
    EventName,
    Set<(data: unknown) => void>
  >();

  on<K extends EventName>(event: K, callback: Handler<K>): () => void {
    let subscribers = this.listeners.get(event);

    if (!subscribers) {
      subscribers = new Set();
      this.listeners.set(event, subscribers);
    }

    const listener = (data: unknown): void => {
      callback(data as EventMap[K]);
    };

    subscribers.add(listener);

    return () => {
      const currentSubscribers = this.listeners.get(event);

      currentSubscribers?.delete(listener);

      if (currentSubscribers?.size === 0) {
        this.listeners.delete(event);
      }
    };
  }

  emit<K extends EventName>(event: K, ...args: EventArgs<K>): void {
    const subscribers = this.listeners.get(event);

    if (!subscribers) {
      return;
    }

    for (const subscriber of [...subscribers]) {
      subscriber(args[0]);
    }
  }
}
