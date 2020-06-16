import React from "react";
import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./Routes";

import "./App.scss";

import { DefaultLayout } from "./PresentationalComponents/DefaultLayout";
import { SecuredComponent } from "./PresentationalComponents/SecuredComponent";

import "@redhat-cloud-services/frontend-components-notifications/index.css";
const frontendComponentsNotifications = require("@redhat-cloud-services/frontend-components-notifications");

const App: React.FC = () => {
  const renderApp = () => (
    <DefaultLayout>
      <AppRoutes />
    </DefaultLayout>
  );

  const NotificationsPortal =
    frontendComponentsNotifications.NotificationsPortal;
  return (
    <React.Fragment>
      <HashRouter>
        {process.env.REACT_APP_SECURED ? (
          <SecuredComponent>{renderApp()}</SecuredComponent>
        ) : (
          renderApp()
        )}
        <NotificationsPortal />
      </HashRouter>
    </React.Fragment>
  );
};

export default App;
