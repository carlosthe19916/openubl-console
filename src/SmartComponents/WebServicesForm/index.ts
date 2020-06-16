import { connect } from "react-redux";
import { WebServicesForm } from "./WebServicesForm";
import { createMapStateToProps } from "../../store/common";
import {
  wsTemplatesSelectors,
  wsTemplatesActions,
} from "../../store/wstemplates";

const mapStateToProps = createMapStateToProps((state) => ({
  wsTemplates: wsTemplatesSelectors.wsTemplates(state),
  wsTemplatesError: wsTemplatesSelectors.error(state),
  wsTemplatesFetchStatus: wsTemplatesSelectors.status(state),
}));

const mapDispatchToProps = {
  fetchAllTemplates: wsTemplatesActions.fetchAllWSTemplates,
};

export default connect(mapStateToProps, mapDispatchToProps)(WebServicesForm);
