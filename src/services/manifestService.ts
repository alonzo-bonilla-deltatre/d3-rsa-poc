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

  metadata.forEach((item: Metadata) => {
    if (item.category === 'pwa') {
      // convert key to lowercase due to a SiteStructure bug
      switch (item.key.toLocaleLowerCase()) {
        case 'name':
          manifestResponse.name = item.value ?? '';
          break;
        case 'shortname':
          manifestResponse.short_name = item.value ?? '';
          break;
        case 'starturl':
          manifestResponse.start_url = item.value ?? '/?utm_source=pwa';
          break;
        case 'display':
          manifestResponse.display = item.value ?? 'standalone';
          break;
        case 'backgroundcolor':
          manifestResponse.background_color = item.value ?? '';
          break;
        case 'themecolor':
          manifestResponse.theme_color = item.value ?? '';
          break;
        case 'scope':
          manifestResponse.scope = item.value ?? '.';
          break;
        case 'icon':
          item.value &&
            manifestResponse.icons?.push({
              src: item.value ?? '',
              sizes: '72x72 96x96 128x128 256x256',
              type: 'svg',
            });
          break;
        case 'androidplaystoreurl':
          androidApp.url = item.value;
          break;
        case 'androidplaystoreid':
          androidApp.id = item.value;
          break;
        case 'iosstoreurl':
          iosApp.url = item.value;
          break;
        case 'iosappid':
          iosApp.id = item.value;
          break;
      }
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
