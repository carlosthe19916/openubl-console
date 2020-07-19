import * as React from "react";
import { State, Store } from "@sambego/storybook-state";
import { PageSkeleton } from "../page-skeleton";

const store = new Store({});

export default {
  title: "Components / PageSkeleton",
};

export const basic = () => (
  <State store={store}>
    <PageSkeleton />
  </State>
);
