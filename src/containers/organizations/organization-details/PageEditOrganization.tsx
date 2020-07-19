import React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  PageSection,
  PageSectionVariants,
  Divider,
  Card,
  CardBody,
} from "@patternfly/react-core";
import { AppRouterProps } from "../../../models/routerProps";
import OrganizationPageSection from "../../../SmartComponents/Organizations/OrganizationPageSection";
import OrganizationInfo from "../../../SmartComponents/Organizations/Forms/OrganizationInfo";
import OrganizationReview from "../../../SmartComponents/Organizations/Forms/OrganizationReview";
import WebServices from "../../../SmartComponents/Organizations/Forms/Sunat";
import LegalEntity from "../../../SmartComponents/Organizations/Forms/LegalEntity";
import Address from "../../../SmartComponents/Organizations/Forms/Address";
import Contact from "../../../SmartComponents/Organizations/Forms/Contact";
// import TabsBasedOnRouter from "../../Components/TabsBasedOnRouter";
// import RoutersBasedOnMatch from "../../Components/RoutersBasedOnMatch";

export interface PageEditOrganizationProps extends AppRouterProps {}

interface TabInfo {
  path: string;
  title: string;
  children?: TabInfo[];
  render?: () => JSX.Element;
}

export const PageEditOrganization: React.FC<PageEditOrganizationProps> = ({
  match,
  history: { push },
}) => {
  const organizationId: string = match.params.id;
  const tabs: TabInfo[] = [
    {
      path: "overview",
      title: "Overview",
      render: () => <OrganizationReview organizationId={organizationId} />,
    },
    {
      path: "general-info",
      title: "Información general",
      render: () => (
        <OrganizationInfo
          organizationId={organizationId}
          onCancel={() => {
            push(getRedirectUrl("overview"));
          }}
        />
      ),
    },
    {
      path: "tu-empresa",
      title: "Tu empresa",
      children: [
        {
          path: "legal-entity",
          title: "Persona jurídica",
          render: () => (
            <LegalEntity
              organizationId={organizationId}
              onCancel={() => {
                push(getRedirectUrl("overview"));
              }}
            />
          ),
        },
        {
          path: "address",
          title: "Dirección",
          render: () => (
            <Address
              organizationId={organizationId}
              onCancel={() => {
                push(getRedirectUrl("overview"));
              }}
            />
          ),
        },
        {
          path: "contact",
          title: "Contacto",
          render: () => (
            <Contact
              organizationId={organizationId}
              onCancel={() => {
                push(getRedirectUrl("overview"));
              }}
            />
          ),
        },
      ],
    },
    {
      path: "sunat",
      title: "SUNAT",
      render: () => <WebServices organizationId={organizationId} />,
    },
  ];
  console.log(tabs);

  const getRedirectUrl = (path: number | string) => {
    return `${match.url}/${path}`;
  };

  return (
    <React.Fragment>
      <section className="pf-m-light pf-c-page__main-breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/organizations">Organizations</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Details</BreadcrumbItem>
        </Breadcrumb>
      </section>
      <OrganizationPageSection organizationId={organizationId} />
      <PageSection
        variant={PageSectionVariants.light}
        className="oul-c-page__tabs-section"
      >
        <Divider />
        {/* <TabsBasedOnRouter tabs={tabs} /> */}
      </PageSection>
      <PageSection>
        <Card>
          <CardBody>{/* <RoutersBasedOnMatch tabs={tabs} /> */}</CardBody>
        </Card>
      </PageSection>
    </React.Fragment>
  );
};
