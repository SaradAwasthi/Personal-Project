import { Project, Context } from '@frontastic/extension-types';
import { ClientConfig } from '../interfaces/ClientConfig';

export const getConfig = (context: Context, project: Project, engine: string, locale: string | null): ClientConfig => {
  if (!project.configuration[engine]) {
    throw `Configuration details are not available for ${engine}`;
  }
  
  return {
    authUrl: context.projectConfiguration.EXTENSION_COMMERCETOOLS_AUTH_URL,
    clientId: context.projectConfiguration.EXTENSION_COMMERCETOOLS_CLIENT_ID,
    clientSecret: context.projectConfiguration.EXTENSION_COMMERCETOOLS_CLIENT_SECRET,
    hostUrl: context.projectConfiguration.EXTENSION_COMMERCETOOLS_HOST_URL,
    projectKey: context.projectConfiguration.EXTENSION_COMMERCETOOLS_PROJECT_KEY,
    productIdField: null,
    categoryIdField: null,
  } as ClientConfig;
  
  
};