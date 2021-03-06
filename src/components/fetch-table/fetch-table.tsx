import * as React from "react";
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
  EmptyStateBody,
  Button,
  Bullseye,
  Spinner,
} from "@patternfly/react-core";
import {
  Table,
  TableHeader,
  TableBody,
  ICell,
  IRow,
  IActions,
} from "@patternfly/react-table";
import { ExclamationCircleIcon, SearchIcon } from "@patternfly/react-icons";
import { global_danger_color_200 as globalDangerColor200 } from "@patternfly/react-tokens";
import Skeleton from "@material-ui/lab/Skeleton";
import { FetchStatus } from "../../store/common";
import { Constants } from "../../Constants";

interface Props {
  columns: ICell[];
  rows?: IRow[];
  actions?: IActions;
  fetchStatus: FetchStatus;
  loadingVariant: "skeleton" | "spinner" | "none";
  fetchError?: any;
  onClearFilters?: () => void;
}

export const FetchTable: React.FC<Props> = ({
  columns,
  rows,
  actions,
  fetchStatus,
  fetchError,
  loadingVariant,
  onClearFilters,
}) => {
  let rowsValue: IRow[] = [];

  if (fetchStatus !== "complete" && loadingVariant) {
    if (loadingVariant === "skeleton") {
      rowsValue = [...Array(Constants.DEFAULT_PAGE_SIZE)].map(() => {
        return {
          cells: [...Array(columns.length)].map(() => ({
            title: <Skeleton />,
          })),
        };
      });
    } else if (loadingVariant === "spinner") {
      rowsValue = [
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
  }

  if (fetchError) {
    rowsValue = [
      {
        heightAuto: true,
        cells: [
          {
            props: { colSpan: columns.length },
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
                  There was an error retrieving data. Check your connection and
                  try again.
                </EmptyStateBody>
              </EmptyState>
            ),
          },
        ],
      },
    ];
  }

  if (rowsValue.length === 0 && rows && rows.length === 0) {
    rowsValue = [
      {
        heightAuto: true,
        cells: [
          {
            props: { colSpan: columns.length },
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
                {onClearFilters && (
                  <Button variant="link" onClick={onClearFilters}>
                    Clear all filters
                  </Button>
                )}
              </EmptyState>
            ),
          },
        ],
      },
    ];
  }

  if (rowsValue.length === 0) {
    rowsValue = rows || [];
  }

  return (
    <React.Fragment>
      <Table
        aria-label="Table"
        cells={columns}
        rows={rowsValue}
        actions={rowsValue === rows ? actions : undefined}
      >
        <TableHeader />
        <TableBody />
      </Table>
    </React.Fragment>
  );
};
