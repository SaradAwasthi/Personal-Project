import { getFromProjectConfig } from './../utils/Context';
// import { fetch } from 'node-fetch';
// import * as Content from 'contentful';
import { createClient, ContentfulClientApi, CreateClientParams, Entry } from 'contentful';
import { ContentfulMapper } from '../mappers/ContentfulMapper';
import { Context } from '@frontastic/extension-types';

export default class BaseApi {
  private client: ContentfulClientApi;
  private locale: string;

  // constructor(params: CreateClientParams, locale?: string) {
  //   this.client = createClient(params);
  //   console.log('CreateClientParams', JSON.stringify(params));
  //   this.locale = this.mapLocale(locale);
  // }
  constructor(frontasticContext: Context, locale?: string) {
    // this.client = createClient({
    //   space: frontasticContext.project.configuration?.contentful.spaceId,
    //   accessToken: frontasticContext.project.configuration?.contentful.accessToken,
    // });
    // console.log('CreateClientParams', this.client);
    this.locale = (locale ?? frontasticContext.project.defaultLocale).replace('_', '-');

    const spaceId = getFromProjectConfig('EXTENSION_CONTENTFUL_SPACE_ID', frontasticContext);
    const accessToken = getFromProjectConfig('EXTENSION_CONTENTFUL_ACCESS_TOKEN', frontasticContext);
    const previewtoken = getFromProjectConfig('EXTENSION_CONTENTFUL_PREVIEW_TOKEN', frontasticContext);

    // const config = {
    //   spaceId: spaceId,
    //   accessToken: accessToken,
    //   previewtoken: previewtoken,
    // };

    const config = (this.client = createClient({
      space: spaceId,
      accessToken: accessToken,
      // previewtoken: previewtoken,
    }));
    console.log('BaseApi ::::::: ', config);
  }

  // private mapLocale(locale?: string) {
  //   return { en: 'en-US' }[locale ?? ''] ?? 'en-US';
  // }
  // private formatLocale(locale: string) {
  //   return locale.replace('_', '-');
  // }

  async getEntries({ contentTypeUid, limit }: any) {
    try {
      const dataQuery = await this.client.getEntries({
        content_type: contentTypeUid,
        limit: parseInt(limit),
      });

      if (dataQuery && dataQuery.items) {
        return ContentfulMapper.contentfulEntriesToFrontasticEntries(dataQuery);
      } else {
        throw new Error('No items found in the entry collection.');
      }
    } catch (err) {
      console.log('Failed to fetch ContentStack entry, Error log: ');
      return { err };
    }
  }

  async getEntry({ contentTypeUid, entryUid }: any) {
    try {
      const contentType = await this.client.getContentType(contentTypeUid);
      const entry = await this.client.getEntry(entryUid);
      console.log('getEntryData', entry);
      return ContentfulMapper.contentfulEntryToFrontasticEntry(entry);
    } catch (err) {
      console.log('Failed to fetch ContentStack entry, Error log: ' + err);
      return { err };
    }
  }
}
