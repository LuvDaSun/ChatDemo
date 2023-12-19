import { observable } from "@trpc/server/observable";

export function toObservable<T>(factory: (signal: AbortSignal) => AsyncIterable<T>) {
  return observable<T>((a) => {
    const controller = new AbortController();
    (async () => {
      for await (const element of factory(controller.signal)) {
        a.next(element);
      }
    })().then(
      () => a.complete(),
      (error) => a.error(error),
    );

    return () => controller.abort();
  });
}
