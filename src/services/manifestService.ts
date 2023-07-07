import { ManifestResponse, RelatedApplication } from '@/models/types/manifest';
import { Metadata } from '@/models/types/pageStructure';
import { getPageStructure } from '@/services/pageService';

export const getManifestJson = async () => {
  const pageStructure = await getPageStructure('~/', '');
  if (!pageStructure) {
    return null;
  }
  const metadata: Metadata[] = pageStructure.data.metadata;
  return getManifestContent(metadata);
};

const getManifestContent = (metadata: Metadata[]): ManifestResponse => {
  const manifestResponse: ManifestResponse = { name: '', related_applications: [], icons: [] };

  const iosApp: RelatedApplication = { platform: 'itunes' };
  const androidApp: RelatedApplication = { platform: 'play' };

  const getValueOrDefault = (item: Metadata | undefined, defaultValue: string = ''): string =>
    item?.value || defaultValue;

  metadata.forEach((item: Metadata) => {
    if (item.category !== 'pwa') {
      return;
    }
    // convert key to lowercase due to a SiteStructure bug
    switch (item.key.toLocaleLowerCase()) {
      case 'name':
        manifestResponse.name = getValueOrDefault(item);
        break;
      case 'shortname':
        manifestResponse.short_name = getValueOrDefault(item);
        break;
      case 'starturl':
        manifestResponse.start_url = getValueOrDefault(item, '/?utm_source=pwa');
        break;
      case 'display':
        manifestResponse.display = getValueOrDefault(item, 'standalone');
        break;
      case 'backgroundcolor':
        manifestResponse.background_color = getValueOrDefault(item);
        break;
      case 'themecolor':
        manifestResponse.theme_color = getValueOrDefault(item);
        break;
      case 'scope':
        manifestResponse.scope = getValueOrDefault(item, '.');
        break;
      case 'icon':
        item.value &&
          manifestResponse.icons?.push({
            src: getValueOrDefault(item),
            sizes: '72x72 96x96 128x128 256x256',
            type: 'svg',
          });
        break;
      case 'androidplaystoreurl':
        androidApp.url = item.value || undefined;
        break;
      case 'androidplaystoreid':
        androidApp.id = item.value || undefined;
        break;
      case 'iosstoreurl':
        iosApp.url = item.value || undefined;
        break;
      case 'iosappid':
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
