import { DataSourceConfiguration, DataSourceContext, ExtensionRegistry } from '@frontastic/extension-types';
import ContentfulApi from './apis/BaseApi';
import * as ContentfulActions from './actionControllers/ContenfulController';
import { getLocale } from './utils/Request';

export default {
  'data-sources': {
    'contentful/entries': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      // const clientConfig = context.frontasticContext?.project.configuration.contentful;

      const contentfulApi = new ContentfulApi(context.frontasticContext, getLocale(context.request));
      const { contentTypeUid, limit } = config.configuration;
      const payload = await contentfulApi.getEntries({
        contentTypeUid,
        limit,
      });

      return {
        dataSourcePayload: payload,
      };
    },
    'contentful/entry': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      // const clientConfig = context.frontasticContext?.project.configuration.contentful;

      const contentfulApi = new ContentfulApi(context.frontasticContext, getLocale(context.request));
      const { contentTypeUid, entryUid } = config.configuration;
      return {
        dataSourcePayload: await contentfulApi.getEntry({ contentTypeUid, entryUid }),
      };
    },
  },
  actions: {
    contentful: ContentfulActions,
  },
} as ExtensionRegistry;
