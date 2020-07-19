import React from "react";
import { Switch, Route } from "react-router-dom";
import OrganizationList from "./organization-list";
import { PageOrganizationDetails } from "./organization-details";
import { PageCreateOrganization } from "./new-organization";
import { Paths } from "../../Paths";

export const Organizations: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={Paths.organizations} component={OrganizationList} exact />
        <Route
          path={Paths.newOrganization}
          component={PageCreateOrganization}
          exact
        />
        <Route
          path={Paths.organizationDetails}
          component={PageOrganizationDetails}
        />
      </Switch>
    </React.Fragment>
  );
};
