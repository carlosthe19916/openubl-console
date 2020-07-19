import * as React from "react";
import { State, Store } from "@sambego/storybook-state";
import { SimplePageSection } from "../simple-page-section";

const store = new Store({
  params: { title: "My title" },
});

export default {
  title: "Components / SimplePageSection",
};

export const basic = () => (
  <State store={store}>
    <SimplePageSection {...store.state.params} />
  </State>
);
