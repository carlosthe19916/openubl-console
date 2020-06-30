import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Card, CardBody, GridItem, Grid } from "@patternfly/react-core";
import {
  ServerInfoRepresentation,
  ComponentTypeRepresentation,
  ComponentRepresentation,
} from "../../../models/api";
import { FetchStatus } from "../../../store/common";
import { KeyForm } from "../../../PresentationalComponents/PageOrganizationContext/PageKeys/Forms/KeyForm";
import { AppRouterProps } from "../../../models/routerProps";

interface StateToProps {
  serverInfo: ServerInfoRepresentation | undefined;
  serverInfoFetchStatus: FetchStatus | undefined;
  serverInfoError: AxiosError | undefined;
}

interface DispatchToProps {
  fetchServerInfo: () => void;
  requestCreateComponent: (
    organizationId: string,
    component: ComponentRepresentation
  ) => Promise<void>;
}

interface KeyListProps extends StateToProps, DispatchToProps, AppRouterProps {
  organizationId: string;
  providerId: string;
}

export const CreateKey: React.FC<KeyListProps> = ({
  organizationId,
  providerId,
  serverInfo,
  history: { push },
  fetchServerInfo,
  requestCreateComponent,
}) => {
  const [componentType, setComponentType] = useState<
    ComponentTypeRepresentation
  >();

  useEffect(() => {
    fetchServerInfo();
  }, [fetchServerInfo]);

  useEffect(() => {
    if (serverInfo) {
      const keyProviders = serverInfo.componentTypes.keyProviders;
      for (let i = 0; i < keyProviders.length; i++) {
        const provider = keyProviders[i];
        if (provider.id === providerId) {
          setComponentType(provider);
        }
      }
    }
  }, [providerId, serverInfo]);

  const onSubmit = async (values: any) => {
    const { name, ...restValues } = values;
    const payload: any = {
      name,
      parentId: organizationId,
      providerId: providerId,
      providerType: "io.github.project.openubl.keys.KeyProvider",
      config: Object.keys(restValues).reduce(
        (accumulator: any, currentKey: string) => {
          accumulator[currentKey] = [restValues[currentKey].toString()];
          return accumulator;
        },
        {} as any
      ),
    };

    await requestCreateComponent(organizationId, payload);
    push(`/server/org/${organizationId}/keys`);
  };

  const onCancel = () => {
    push(`/server/org/${organizationId}/keys`);
  };

  return (
    <Grid hasGutter lg={6}>
      <GridItem>
        <Card>
          <CardBody>
            {componentType && (
              <KeyForm
                componentType={componentType}
                onSubmit={onSubmit}
                onCancel={onCancel}
              />
            )}
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};
