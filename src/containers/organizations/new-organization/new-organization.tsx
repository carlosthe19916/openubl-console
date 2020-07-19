import React from "react";
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
} from "@patternfly/react-core";
import CreateOrganization from "../../../SmartComponents/Organizations/CreateOrganization";

export const NewOrganization: React.FC = () => {
  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Crear organización</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <CreateOrganization />
      </PageSection>
    </React.Fragment>
  );
};
