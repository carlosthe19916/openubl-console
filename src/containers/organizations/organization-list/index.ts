import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { OrganizationList } from "./organization-list";
import { createMapStateToProps } from "../../../store/common";
import {
  organizationListSelectors,
  organizationListActions,
} from "../../../store/organizationList";
import { deleteDialogActions } from "../../../store/deleteDialog";
import { alertActions } from "../../../store/alert";

const mapStateToProps = createMapStateToProps((state) => ({
  organizations: organizationListSelectors.organizations(state),
  error: organizationListSelectors.error(state),
  fetchStatus: organizationListSelectors.status(state),
}));

const mapDispatchToProps = {
  fetchOrganizations: organizationListActions.fetchOrganizations,
  showDeleteDialog: deleteDialogActions.openModal,
  closeDeleteDialog: deleteDialogActions.closeModal,
  processingDeleteDialog: deleteDialogActions.processing,
  addAlert: alertActions.alert,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrganizationList)
);
