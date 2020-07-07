import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";
import { alert } from "../alert/actions";
import { ComponentRepresentation } from "../../models/api";
import {
  getOrganizationComponent,
  createOrganizationComponent,
  updateOrganizationComponent,
  deleteOrganizationComponent,
} from "../../api/api";

interface OrganizationComponentActionMeta {
  organizationId: string;
}

interface ComponentItemActionMeta extends OrganizationComponentActionMeta {
  componentId: string;
}

export const fetchComponentRequest = createAction("component/fetch/request")<
  ComponentItemActionMeta
>();
export const fetchComponentSuccess = createAction("component/fetch/success")<
  ComponentRepresentation,
  ComponentItemActionMeta
>();
export const fetchComponentFailure = createAction("component/fetch/failure")<
  AxiosError,
  ComponentItemActionMeta
>();

export const createComponentRequest = createAction("component/create/request")<
  OrganizationComponentActionMeta
>();
export const createComponentSuccess = createAction("component/create/success")<
  ComponentRepresentation,
  OrganizationComponentActionMeta
>();
export const createComponentFailure = createAction("component/create/failure")<
  AxiosError,
  OrganizationComponentActionMeta
>();

export const updateComponentRequest = createAction("component/update/request")<
  ComponentItemActionMeta
>();
export const updateComponentSuccess = createAction("component/update/success")<
  ComponentRepresentation,
  ComponentItemActionMeta
>();
export const updateComponentFailure = createAction("component/update/failure")<
  AxiosError,
  ComponentItemActionMeta
>();

export const deleteComponentRequest = createAction("component/delete/request")<
  ComponentItemActionMeta
>();
export const deleteComponentSuccess = createAction("component/delete/success")<
  string,
  ComponentItemActionMeta
>();
export const deleteComponentFailure = createAction("component/delete/failure")<
  AxiosError,
  ComponentItemActionMeta
>();

export const fetchComponent = (organizationId: string, componentId: string) => {
  return (dispatch: Dispatch) => {
    const meta: ComponentItemActionMeta = {
      organizationId: organizationId,
      componentId: componentId,
    };

    dispatch(fetchComponentRequest(meta));

    return getOrganizationComponent(organizationId, componentId)
      .then((res: AxiosResponse<ComponentRepresentation>) => {
        dispatch(fetchComponentSuccess(res.data, meta));
      })
      .catch((err: AxiosError) => {
        dispatch(fetchComponentFailure(err, meta));
      });
  };
};

export const requestCreateComponent = (
  organizationId: string,
  component: ComponentRepresentation
) => {
  return (dispatch: Dispatch) => {
    const meta: OrganizationComponentActionMeta = {
      organizationId: organizationId,
    };

    dispatch(createComponentRequest(meta));
    return createOrganizationComponent(organizationId, component)
      .then((res: AxiosResponse<ComponentRepresentation>) => {
        dispatch(createComponentSuccess(res.data, meta));
        alert({
          title: `Creado satisfactoriamente`,
          variant: "success",
          description: `Componente ${component.name} creado`,
        })(dispatch);
      })
      .catch((err: AxiosError) => {
        dispatch(createComponentFailure(err, meta));
      });
  };
};

export const requestUpdateComponent = (
  organizationId: string,
  component: ComponentRepresentation
) => {
  return (dispatch: Dispatch) => {
    const meta: ComponentItemActionMeta = {
      organizationId: organizationId,
      componentId: component.id,
    };

    dispatch(updateComponentRequest(meta));
    return updateOrganizationComponent(organizationId, component)
      .then((res: AxiosResponse<ComponentRepresentation>) => {
        dispatch(updateComponentSuccess(res.data, meta));
        alert({
          title: `Actualizado satisfactoriamante`,
          description: `Componente ${component.id} actualizado`,
          variant: "success",
        })(dispatch);
      })
      .catch((err: AxiosError) => {
        dispatch(updateComponentFailure(err, meta));
      });
  };
};

export const requestDeleteComponent = (
  organizationId: string,
  componentId: string
) => {
  return (dispatch: Dispatch) => {
    const meta: ComponentItemActionMeta = {
      organizationId: organizationId,
      componentId: componentId,
    };

    dispatch(deleteComponentRequest(meta));
    return deleteOrganizationComponent(organizationId, componentId)
      .then((res: AxiosResponse) => {
        dispatch(deleteComponentSuccess(res.data, meta));
        alert({
          title: `Deleted`,
          description: `Component ${componentId} was deleted`,
          variant: "success",
        })(dispatch);
      })
      .catch((err: AxiosError) => {
        dispatch(updateComponentFailure(err, meta));
      });
  };
};
