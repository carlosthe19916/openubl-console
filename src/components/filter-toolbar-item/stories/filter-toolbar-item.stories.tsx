import * as React from "react";
import { State, Store } from "@sambego/storybook-state";
import { FilterToolbarItem } from "../filter-toolbar-item";

const store = new Store({
  searchValue: "",
});

export default {
  title: "Components / FilterToolbarItem",
};

export const basic = () => (
  <State store={store}>
    <FilterToolbarItem
      onFilterChange={(val: string) => store.set({ searchValue: val })}
      placeholder="Filter by field"
    />
  </State>
);
