import { ActionContext, Request, Response } from '@frontastic/extension-types/src/ts/index';
import { getLocale } from '../utils/Request';
import ContentfulApi from '../apis/BaseApi';

// export const getEntries = async (request: Request, actionContext: ActionContext) => {
//   const config = actionContext.frontasticContext?.project.configuration.contentful;

//   const api = new ContentfulApi({ space: config.spaceId, accessToken: config.accessToken }, getLocale(request));

//   const data = await api.getEntries();

//   const response: Response = {
//     statusCode: 200,
//     body: JSON.stringify(data),
//     sessionData: request.sessionData,
//   };

//   return response;
// };

type ActionHook = (request: Request, actionContext: ActionContext) => Promise<Response>;

export const getEntries: ActionHook = async (request: Request, actionContext: ActionContext) => {
  // const config = actionContext.frontasticContext?.project.configuration.contentful;

  const contentApi = new ContentfulApi(actionContext.frontasticContext, getLocale(request));
  const contentTypeUid = request.query.contentTypeUid;
  const limit = request.query.limit;

  const data = await contentApi.getEntries({ contentTypeUid, limit });

  const response: Response = {
    statusCode: 200,
    body: JSON.stringify(data),
    sessionData: request.sessionData,
  };
  console.log('getEntriesResponse', response);
  return response;
};

export const getEntry: ActionHook = async (request: Request, actionContext: ActionContext) => {
  // const config = actionContext.frontasticContext?.project.configuration.contentful;

  const contentApi = new ContentfulApi(actionContext.frontasticContext, getLocale(request));
  const contentTypeUid = request.query.contentTypeUid;
  const entryUid = request.query.entryUid;
  const data = await contentApi.getEntry({ contentTypeUid, entryUid });

  const response: Response = {
    statusCode: 200,
    body: JSON.stringify(data),
    sessionData: request.sessionData,
  };
  console.log('getEntryResponse', response);
  return response;
};
