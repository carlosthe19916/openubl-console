import awesomeDebouncePromise from "awesome-debounce-promise";

export const debouncePromise = (
  asyncFunction: any,
  time = 250,
  config = { onlyResolvesLast: true }
) => awesomeDebouncePromise(asyncFunction, time, config);

export const debouncedFetch = debouncePromise((callback: any) => callback());
