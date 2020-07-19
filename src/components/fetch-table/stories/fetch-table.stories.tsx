import * as React from "react";
import { State, Store } from "@sambego/storybook-state";
import { action } from "@storybook/addon-actions";
import { FetchTable } from "../fetch-table";
import { IRow, ICell, IActions } from "@patternfly/react-table";

const columns: ICell[] = [
  { title: "Col1" },
  { title: "Col2" },
  { title: "Col3" },
];
const rows: IRow[] = [...Array(15)].map((_, rowIndex) => {
  return {
    cells: [...Array(columns.length)].map((_, colIndex) => ({
      title: `${rowIndex},${colIndex}`,
    })),
  };
});
const actions: IActions = [
  {
    title: "Action1",
    onClick: action("Action1"),
  },
  {
    title: "Action2",
    onClick: action("Action2"),
  },
];

const store = new Store({
  params: { columns, rows, actions },
});

export default {
  title: "Components / FetchTable",
};

export const inProgressSpinner = () => (
  <State store={store}>
    <FetchTable
      {...store.state.params}
      fetchStatus="inProgress"
      loadingVariant="spinner"
    />
  </State>
);

export const inProgressSkeleton = () => (
  <State store={store}>
    <FetchTable
      {...store.state.params}
      fetchStatus="inProgress"
      loadingVariant="skeleton"
    />
  </State>
);

export const inProgressNone = () => (
  <State store={store}>
    <FetchTable
      {...store.state.params}
      fetchStatus="inProgress"
      loadingVariant="none"
    />
  </State>
);

export const error = () => (
  <State store={store}>
    <FetchTable
      {...store.state.params}
      fetchStatus="complete"
      fetchError="Error message"
      loadingVariant="spinner"
    />
  </State>
);

export const basic = () => (
  <State store={store}>
    <FetchTable
      {...store.state.params}
      fetchStatus="complete"
      loadingVariant="spinner"
    />
  </State>
);

export const empty = () => (
  <State store={store}>
    <FetchTable
      {...store.state.params}
      rows={[]}
      fetchStatus="complete"
      loadingVariant="spinner"
      onClearFilters={action("Clear filters")}
    />
  </State>
);
