import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import {
  Button,
  Toolbar,
  ToolbarItem,
  Pagination,
  ToolbarContent,
  Bullseye,
  Spinner,
  EmptyState,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  EmptyStateVariant,
} from "@patternfly/react-core";
import {
  Table,
  TableHeader,
  TableBody,
  ICell,
  IRow,
  cellWidth,
  IAction,
} from "@patternfly/react-table";
import { SearchIcon, ExclamationCircleIcon } from "@patternfly/react-icons";
import { global_danger_color_200 as globalDangerColor200 } from "@patternfly/react-tokens";
import {
  OrganizationRepresentation,
  PaginationResponseRepresentation,
} from "../../models/api";
import { FetchStatus } from "../../store/common";
import { deleteDialogActions } from "../../store/deleteDialog";
import { XmlBuilderRouterProps } from "../../models/routerProps";
import { FilterToolbarItem } from "../../PresentationalComponents/FilterToolbarItem";
import { debouncedFetch } from "../../utils/debounce";

interface StateToProps {
  organizations: PaginationResponseRepresentation<OrganizationRepresentation>;
  error: AxiosError<any> | null;
  fetchStatus: FetchStatus;
}

interface DispatchToProps {
  fetchOrganizations: (
    filterText: string,
    page: number,
    pageSize: number
  ) => Promise<void>;
  deleteOrganization: (organizationId: string) => Promise<void>;
  showDeleteDialog: typeof deleteDialogActions.openModal;
  closeDeleteDialog: typeof deleteDialogActions.closeModal;
}

interface Props extends StateToProps, DispatchToProps, XmlBuilderRouterProps {}

interface State {
  filterText: string;
  page: number;
  pageSize: number;
  rows: IRow[];
  columns: ICell[];
  actions: IAction[];
}

export class OrganizationList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filterText: "",
      page: 1,
      pageSize: 10,
      rows: [],
      columns: [
        { title: "Nombre", transforms: [cellWidth(30)] },
        { title: "Descripcion", transforms: [] },
      ],
      actions: [
        {
          title: "Editar",
          onClick: this.handleEditar,
        },
        {
          title: "Eliminar",
          onClick: this.handleEliminar,
        },
      ],
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData = async (
    page: number = this.state.page,
    pageSize: number = this.state.pageSize,
    filterText: string = this.state.filterText
  ) => {
    const { fetchOrganizations } = this.props;

    await fetchOrganizations(filterText, page, pageSize);
    this.filtersInRowsAndCells();
  };

  filtersInRowsAndCells = (
    organizations: PaginationResponseRepresentation<
      OrganizationRepresentation
    > = this.props.organizations
  ) => {
    let rows: IRow[] = organizations.data.map(
      (item: OrganizationRepresentation) => {
        return {
          cells: [
            {
              title: (
                <Link to={`/organizations/manage/${item.id}/keys`}>
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

    this.setState({ rows });
  };

  // handlers

  handleEditar = (event: React.MouseEvent, rowIndex: number): void => {
    const { history, organizations } = this.props;
    history.push(
      "/organizations/manage/" + organizations.data[rowIndex].id + "/edit"
    );
  };

  handleEliminar = (event: React.MouseEvent, rowIndex: number) => {
    const {
      showDeleteDialog,
      closeDeleteDialog,
      deleteOrganization,
    } = this.props;

    const { organizations } = this.props;
    const organization = organizations.data[rowIndex];

    showDeleteDialog({
      name: organization.name,
      type: "organización",
      onDelete: () => {
        deleteOrganization(organization.id).then(() => {
          closeDeleteDialog();
        });
      },
      onCancel: () => {
        closeDeleteDialog();
      },
    });
  };

  onPageChange = (event: any, page: number) => {
    this.setState({ page }, () => {
      this.refreshData(page);
    });
  };

  handleOnSetPage = (event: any, page: number) => {
    return this.onPageChange(event, page);
  };

  handleOnPageInput = (event: any, page: number) => {
    return this.onPageChange(event, page);
  };

  handleOnPerPageSelect = (_event: any, pageSize: number) => {
    let page = 1;

    this.setState({ page, pageSize }, () => {
      this.refreshData(page, pageSize);
    });
  };

  // render

  renderPagination = (isCompact: boolean) => {
    const { page, pageSize } = this.state;
    const { organizations } = this.props;
    return (
      <Pagination
        itemCount={organizations.meta.count}
        page={page}
        perPage={pageSize}
        onPageInput={this.handleOnPageInput}
        onSetPage={this.handleOnSetPage}
        widgetId="pagination-options-menu-top"
        onPerPageSelect={this.handleOnPerPageSelect}
        isCompact={isCompact}
      />
    );
  };

  renderTable = () => {
    const { fetchStatus, error } = this.props;
    const { columns, rows, actions } = this.state;

    let showActions = true;
    let selectedRows = rows;
    if (fetchStatus !== "complete") {
      showActions = false;
      selectedRows = [
        {
          heightAuto: true,
          cells: [
            {
              props: { colSpan: 8 },
              title: (
                <Bullseye>
                  <Spinner size="xl" />
                </Bullseye>
              ),
            },
          ],
        },
      ];
    }
    if (error) {
      showActions = false;
      selectedRows = [
        {
          heightAuto: true,
          cells: [
            {
              props: { colSpan: 8 },
              title: (
                <EmptyState variant={EmptyStateVariant.small}>
                  <EmptyStateIcon
                    icon={ExclamationCircleIcon}
                    color={globalDangerColor200.value}
                  />
                  <Title headingLevel="h2" size="lg">
                    Unable to connect
                  </Title>
                  <EmptyStateBody>
                    There was an error retrieving data. Check your connection
                    and try again.
                  </EmptyStateBody>
                </EmptyState>
              ),
            },
          ],
        },
      ];
    }

    if (selectedRows.length === 0) {
      showActions = false;
      selectedRows = [
        {
          heightAuto: true,
          cells: [
            {
              props: { colSpan: 8 },
              title: (
                <EmptyState variant={EmptyStateVariant.small}>
                  <EmptyStateIcon icon={SearchIcon} />
                  <Title headingLevel="h2" size="lg">
                    No results found
                  </Title>
                  <EmptyStateBody>
                    No results match the filter criteria. Remove all filters or
                    clear all filters to show results.
                  </EmptyStateBody>
                  <Button variant="link" onClick={this.onClearFilters}>
                    Clear all filters
                  </Button>
                </EmptyState>
              ),
            },
          ],
        },
      ];
    }

    return (
      <React.Fragment>
        <Table
          aria-label="Organization List Table"
          cells={columns}
          rows={selectedRows}
          actions={showActions ? actions : undefined}
        >
          <TableHeader />
          <TableBody />
          {rows.length > 0 && (
            <tfoot>
              <tr>
                <td colSpan={10}>{this.renderPagination(false)}</td>
              </tr>
            </tfoot>
          )}
        </Table>
      </React.Fragment>
    );
  };

  //

  onFilterChange = (
    value: string,
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const page = 1;
    const { pageSize } = this.state;
    const filterText: string = value.trim();

    this.setState({ filterText });
    debouncedFetch(() => {
      this.refreshData(page, pageSize, filterText);
    });
  };

  onClearFilters = () => {
    const filterText = "";
    this.setState({ filterText }, () => {
      this.refreshData(undefined, undefined, filterText);
    });
  };

  render() {
    const { filterText } = this.state;
    return (
      <React.Fragment>
        <Toolbar id="toolbar">
          <ToolbarContent>
            <FilterToolbarItem
              searchValue={filterText}
              onFilterChange={this.onFilterChange}
              placeholder="Filter by name"
            />
            <ToolbarItem>
              <Link to="/organizations/create">
                <Button aria-label="Crear organización">
                  Crear organización
                </Button>
              </Link>
            </ToolbarItem>
            <ToolbarItem
              variant="pagination"
              alignment={{ default: "alignRight" }}
            >
              {this.renderPagination(true)}
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
        {this.renderTable()}
      </React.Fragment>
    );
  }
}