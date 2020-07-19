import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { AppPlaceholder } from "./PresentationalComponents/Components/AppPlaceholder";
import { Paths } from "./Paths";

const Organizations = lazy(() => import("./containers/organizations"));
const NotFound = lazy(() =>
  import("./PresentationalComponents/PageNotFound404")
);
const PageOrganizationContext = lazy(() =>
  import("./PresentationalComponents/PageOrganizationContext")
);

export const AppRoutes = () => {
  const routes = [
    { component: Organizations, path: Paths.organizations },
    { component: PageOrganizationContext, path: Paths.serverOrganization },
    { component: NotFound, path: Paths.notFound },
  ];

  return (
    <Suspense fallback={<AppPlaceholder />}>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            component={route.component}
          ></Route>
        ))}
        <Redirect from={Paths.base} to={Paths.organizations} exact />
      </Switch>
    </Suspense>
  );
};
