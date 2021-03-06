import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";

import { deleteDialogStateKey, deleteDialogReducer } from "./deleteDialog";
import {
  organizationListStateKey,
  organizationListReducer,
} from "./organizationList";
import { organizationStateKey, organizationReducer } from "./organization";
import {
  organizationContextReducer,
  organizationContextStateKey,
} from "./organizationContext";
import { wsTeamplatesReducer, wsTemplatesStateKey } from "./wstemplates";
import {
  organizationKeysStateKey,
  organizationKeysReducer,
} from "./organizationKeys";
import {
  organizationComponentsStateKey,
  organizationComponentsReducer,
} from "./organizationComponents";
import { componentStateKey, componentReducer } from "./organizationComponent";
import { serverInfoStateKey, serverInfoReducer } from "./serverInfo";

const frontendComponentsNotifications = require("@redhat-cloud-services/frontend-components-notifications");

export type RootState = StateType<typeof rootReducer>;

export const rootReducer = combineReducers({
  [deleteDialogStateKey]: deleteDialogReducer,
  notifications: frontendComponentsNotifications.notifications,
  [organizationListStateKey]: organizationListReducer,
  [organizationStateKey]: organizationReducer,
  [organizationContextStateKey]: organizationContextReducer,
  [organizationContextStateKey]: organizationContextReducer,
  [wsTemplatesStateKey]: wsTeamplatesReducer,
  [organizationKeysStateKey]: organizationKeysReducer,
  [organizationComponentsStateKey]: organizationComponentsReducer,
  [componentStateKey]: componentReducer,
  [serverInfoStateKey]: serverInfoReducer,
});
