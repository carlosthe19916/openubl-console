import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { OrganizationRepresentation } from "../../models/api";
import { FetchStatus } from "../../store/common";
import { AppRouterProps } from "../../models/routerProps";
import { ArticleSkeleton } from "../../PresentationalComponents/Skeleton/ArticleSkeleton";
import { Grid, GridItem } from "@patternfly/react-core";
import { OrganizationFormData } from "../../models/ui";
import { AddressForm } from "../AddressForm";

interface StateToProps {
  organization: OrganizationRepresentation | undefined;
  organizationError: AxiosError | undefined;
  organizationFetchStatus: FetchStatus | undefined;
}

interface DispatchToProps {
  fetchOrganization: (organizationId: string) => Promise<void>;
  updateOrganization: (
    organizationId: string,
    organization: OrganizationRepresentation
  ) => Promise<void>;
}

interface AddressProps extends StateToProps, DispatchToProps, AppRouterProps {
  organizationId: string;
}

export const Address: React.FC<AddressProps> = ({
  organizationId,
  organization,
  organizationFetchStatus,
  organizationError,
  fetchOrganization,
  updateOrganization,
}) => {
  const [formData, setValues] = useState<OrganizationFormData>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    fetchOrganization(organizationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (organization) {
      setValues({
        legalEntityAddress: {
          ubigeo: organization.settings.address?.ubigeo,
          departamento: organization.settings.address?.departamento,
          provincia: organization.settings.address?.provincia,
          distrito: organization.settings.address?.distrito,
          urbanizacion: organization.settings.address?.urbanizacion,
          codigoLocal: organization.settings.address?.codigoLocal,
          direccion: organization.settings.address?.direccion,
          codigoPais: organization.settings.address?.codigoPais,
        },
      });
    }
  }, [organization]);

  const handleChange = (data: OrganizationFormData) => {
    setValues({ ...formData, ...data });
  };

  const handleFormChange = (data: OrganizationFormData, isValid: boolean) => {
    handleChange(data);
    setIsFormValid(isValid);
  };

  const onSubmit = async () => {
    if (organization) {
      const data: OrganizationRepresentation = {
        ...organization,
        settings: {
          ...organization.settings,
          address: {
            ...organization.settings.address,
            ubigeo: formData.legalEntityAddress?.ubigeo || "",
            departamento: formData.legalEntityAddress?.departamento || "",
            provincia: formData.legalEntityAddress?.provincia || "",
            distrito: formData.legalEntityAddress?.distrito || "",
            urbanizacion: formData.legalEntityAddress?.urbanizacion || "",
            codigoLocal: formData.legalEntityAddress?.codigoLocal || "",
            direccion: formData.legalEntityAddress?.direccion || "",
            codigoPais: formData.legalEntityAddress?.codigoPais || "",
          },
        },
      };

      await updateOrganization(organizationId, data);
    }
  };

  return (
    <React.Fragment>
      {(organizationFetchStatus !== "complete" || organizationError) && (
        <ArticleSkeleton />
      )}
      <Grid lg={6}>
        <GridItem>
          <AddressForm
            formData={formData}
            onHandleChange={handleFormChange}
            showActions
            disableActions={!isFormValid}
            onSave={() => {
              onSubmit();
            }}
            onCancel={() => {}}
          />
        </GridItem>
      </Grid>
    </React.Fragment>
  );
};
