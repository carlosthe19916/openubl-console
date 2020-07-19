import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { AxiosError } from "axios";
import {
  PageSection,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Button,
  ToolbarItemVariant,
} from "@patternfly/react-core";
import { IRow, ICell, cellWidth, IActions } from "@patternfly/react-table";
import { SimplePageSection, SimplePagination } from "../../../components";
import {
  PaginationResponseRepresentation,
  OrganizationRepresentation,
} from "../../../models/api";
import { FetchStatus } from "../../../store/common";
import { deleteDialogActions } from "../../../store/deleteDialog";
import { AlertModel } from "../../../models/alert";
import { FilterToolbarItem } from "../../../components/filter-toolbar-item";
import { Paths, formatPath } from "../../../Paths";
import { FetchTable } from "../../../components/fetch-table/fetch-table";
import { deleteOrganization } from "../../../api/api";
import {
  getDeleteErrorAlertModel,
  getDeleteSuccessAlertModel,
} from "../../../Constants";
import { PageSkeleton } from "../../../components/page-skeleton";
import { debouncedFetch } from "../../../utils/debounce";

interface StateToProps {
  organizations:
    | PaginationResponseRepresentation<OrganizationRepresentation>
    | undefined;
  error: AxiosError<any> | null;
  fetchStatus: FetchStatus;
}

interface DispatchToProps {
  fetchOrganizations: (
    name: string,
    page: number,
    pageSize: number
  ) => Promise<void>;
  showDeleteDialog: typeof deleteDialogActions.openModal;
  closeDeleteDialog: typeof deleteDialogActions.closeModal;
  processingDeleteDialog: typeof deleteDialogActions.processing;
  addAlert: (alert: AlertModel) => void;
}

interface Props extends StateToProps, DispatchToProps, RouteComponentProps {}

export const OrganizationList: React.FC<Props> = ({
  organizations,
  fetchStatus,
  error,
  history: { push },
  fetchOrganizations,
  showDeleteDialog,
  closeDeleteDialog,
  processingDeleteDialog,
  addAlert,
}) => {
  const [filterText, setFilterText] = useState("");
  const [paginationParams, setPaginationParams] = useState({
    page: 1,
    perPage: 10,
  });

  const columns: ICell[] = [
    { title: "Name", transforms: [cellWidth(30)] },
    { title: "Description", transforms: [] },
  ];
  const [rows, setRows] = useState<IRow[]>();
  const actions: IActions = [
    {
      title: "Edit",
      onClick: (_, rowIndex: number) => {
        push(
          formatPath(Paths.organizationDetails, {
            organizationId: organizations!.data[rowIndex].id,
          })
        );
      },
    },
    {
      title: "Delete",
      onClick: (_, rowIndex: number) => {
        const organization = organizations!.data[rowIndex];

        showDeleteDialog({
          name: organization.name,
          type: "organization",
          onDelete: () => {
            processingDeleteDialog();
            deleteOrganization(organization.id)
              .then(() => {
                addAlert(getDeleteSuccessAlertModel("Organization"));
                fetchOrganizations(
                  filterText,
                  paginationParams.page,
                  paginationParams.perPage
                );
              })
              .catch(() => {
                addAlert(getDeleteErrorAlertModel("organization"));
              })
              .finally(() => closeDeleteDialog());
          },
          onCancel: () => {
            closeDeleteDialog();
          },
        });
      },
    },
  ];

  useEffect(() => {
    if (organizations) {
      let rows: IRow[] = organizations.data.map(
        (item: OrganizationRepresentation) => {
          return {
            cells: [
              {
                title: (
                  <Link
                    to={formatPath(Paths.organizationDetails, {
                      organizationId: item.id,
                    })}
                  >
                    {item.name}
                  </Link>
                ),
              },
              {
                title: item.description ? (
                  <span>{item.description}</span>
                ) : (
                  <small>No description</small>
                ),
              },
            ],
          };
        }
      );

      setRows(rows);
    }
  }, [organizations]);

  useEffect(() => {
    fetchOrganizations(
      filterText,
      paginationParams.page,
      paginationParams.perPage
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlFilterTextChange = (filterText: string) => {
    const newParams = { page: 1, perPage: paginationParams.perPage };
    debouncedFetch(() => {
      fetchOrganizations(filterText, newParams.page, newParams.perPage);
    });
    setFilterText(filterText);
    setPaginationParams(newParams);
  };
  const handlPaginationChange = ({
    page,
    perPage,
  }: {
    page: number;
    perPage: number;
  }) => {
    fetchOrganizations(filterText, page, perPage);
    setPaginationParams({ page, perPage });
  };

  return (
    <React.Fragment>
      {organizations || error ? (
        <React.Fragment>
          <SimplePageSection title="Organizations" />
          <PageSection>
            <Toolbar>
              <ToolbarContent>
                <FilterToolbarItem
                  searchValue={filterText}
                  onFilterChange={handlFilterTextChange}
                  placeholder="Filter by name"
                />
                <ToolbarItem>
                  <Link to={Paths.newOrganization}>
                    <Button>New organization</Button>
                  </Link>
                </ToolbarItem>
                <ToolbarItem
                  variant={ToolbarItemVariant.pagination}
                  alignment={{ default: "alignRight" }}
                >
                  <SimplePagination
                    count={organizations ? organizations.meta.count : 0}
                    params={paginationParams}
                    isTop={true}
                    onChange={handlPaginationChange}
                  />
                </ToolbarItem>
              </ToolbarContent>
            </Toolbar>
            <FetchTable
              columns={columns}
              rows={rows}
              actions={actions}
              fetchStatus={fetchStatus}
              fetchError={error}
              loadingVariant="skeleton"
              onClearFilters={() => setFilterText("")}
            />
            <SimplePagination
              count={organizations ? organizations.meta.count : 0}
              params={paginationParams}
              onChange={handlPaginationChange}
            />
          </PageSection>
        </React.Fragment>
      ) : (
        <PageSkeleton />
      )}
    </React.Fragment>
  );
};
