import * as React from "react";
import { State, Store } from "@sambego/storybook-state";
import { SimplePagination } from "../simple-pagination";

const store = new Store({
  params: {},
});

export default {
  title: "Components / SimplePagination",
};

export const basic = () => (
  <State store={store}>
    <SimplePagination
      count={100}
      params={store.state.params}
      onChange={(p) => store.set({ params: p })}
    ></SimplePagination>
  </State>
);

export const compact = () => (
  <State store={store}>
    <SimplePagination
      count={100}
      params={store.state.params}
      onChange={(p) => store.set({ params: p })}
      isCompact
    ></SimplePagination>
  </State>
);

export const perPageOptions = () => (
  <State store={store}>
    <SimplePagination
      count={100}
      params={store.state.params}
      onChange={(p) => store.set({ params: p })}
      perPageOptions={[12, 24]}
    ></SimplePagination>
  </State>
);

export const isTop = () => (
  <State store={store}>
    <SimplePagination
      count={100}
      params={store.state.params}
      onChange={(p) => store.set({ params: p })}
      isTop={true}
    ></SimplePagination>
  </State>
);
