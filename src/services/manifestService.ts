import { ManifestResponse, RelatedApplication } from '@/models/types/manifest';
import { Metadata } from '@/models/types/pageStructure';
import { getPageStructure } from '@/services/pageService';
import { ForgeMetadataCategoryType, ForgePwaMetadataKey } from '@/models/types/forge';

/**
 * Function to get the manifest JSON.
 * It retrieves the page structure for the root page and gets the metadata from the structure.
 * If the page structure cannot be retrieved, `null` is returned.
 * Otherwise, it calls `getManifestContent` with the metadata and returns the result.
 *
 * @returns {Promise<ManifestResponse | null>} - The manifest JSON or `null` if the page structure cannot be retrieved.
 */
export const getManifestJson = async () => {
  const pageStructure = await getPageStructure('~/', '');
  if (!pageStructure) {
    return null;
  }
  const metadata: Metadata[] = pageStructure.data.metadata;
  return getManifestContent(metadata);
};

/**
 * Function to get the content of the manifest.
 * It creates a `ManifestResponse` with default values and two `RelatedApplication` objects for iOS and Android.
 * It iterates over the provided metadata and sets the properties of the `ManifestResponse` and `RelatedApplication` objects based on the metadata keys.
 * If a metadata item has the `pwa` category and a key that matches a property of the `ManifestResponse` or `RelatedApplication` objects,
 * the property is set to the value of the metadata item or a default value if the metadata item has no value.
 * After all metadata items have been processed, the `RelatedApplication` objects are added to the `related_applications` array of the `ManifestResponse` if they have an `id` or `url`.
 * The `ManifestResponse` is returned.
 *
 * @param {Metadata[]} metadata - The metadata to use.
 * @returns {ManifestResponse} - The manifest content.
 */
const getManifestContent = (metadata: Metadata[]): ManifestResponse => {
  const manifestResponse: ManifestResponse = { name: '', related_applications: [], icons: [] };

  const iosApp: RelatedApplication = { platform: 'itunes' };
  const androidApp: RelatedApplication = { platform: 'play' };

  /* istanbul ignore next */
  const getValueOrDefault = (item: Metadata | undefined, defaultValue: string = ''): string =>
    item?.value || defaultValue;

  metadata.forEach((item: Metadata) => {
    if (item.category !== ForgeMetadataCategoryType.pwa) {
      return;
    }
    switch (item.key) {
      case ForgePwaMetadataKey.name:
        manifestResponse.name = getValueOrDefault(item);
        break;
      case ForgePwaMetadataKey.shortName:
        manifestResponse.short_name = getValueOrDefault(item);
        break;
      case ForgePwaMetadataKey.startUrl:
        manifestResponse.start_url = getValueOrDefault(item, '/?utm_source=pwa');
        break;
      case ForgePwaMetadataKey.display:
        manifestResponse.display = getValueOrDefault(item, 'standalone');
        break;
      case ForgePwaMetadataKey.backgroundColor:
        manifestResponse.background_color = getValueOrDefault(item);
        break;
      case ForgePwaMetadataKey.themeColor:
        manifestResponse.theme_color = getValueOrDefault(item);
        break;
      case ForgePwaMetadataKey.scope:
        manifestResponse.scope = getValueOrDefault(item, '.');
        break;
      case ForgePwaMetadataKey.icon:
        item.value &&
          manifestResponse.icons?.push({
            src: getValueOrDefault(item),
            sizes: '72x72 96x96 128x128 256x256',
            type: 'svg',
          });
        break;
      case ForgePwaMetadataKey.androidPlayStoreUrl:
        androidApp.url = item.value || undefined;
        break;
      case ForgePwaMetadataKey.androidPlayStoreId:
        androidApp.id = item.value || undefined;
        break;
      case ForgePwaMetadataKey.iosStoreUrl:
        iosApp.url = item.value || undefined;
        break;
      case ForgePwaMetadataKey.iosAppId:
        iosApp.id = item.value || undefined;
        break;
    }
  });

  // App items can have just `id` or `url` or both
  if (iosApp.id || iosApp.url) {
    manifestResponse.related_applications?.push(iosApp);
  }
  if (androidApp.id || androidApp.url) {
    manifestResponse.related_applications?.push(androidApp);
  }
  return manifestResponse;
};
