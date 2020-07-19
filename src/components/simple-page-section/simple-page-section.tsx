import * as React from "react";
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
} from "@patternfly/react-core";

interface Props {
  title: string;
}

export const SimplePageSection: React.FC<Props> = ({ title }) => {
  return (
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>
        <Text component="h1">{title}</Text>
      </TextContent>
    </PageSection>
  );
};
