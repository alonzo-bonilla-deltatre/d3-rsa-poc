'use server';

import { ForgeDapiEntityCode, ForgeDistributionApiOption, PagedResult } from '@/models/types/forge';
import { getEntity, getEntityList } from '@/services/forgeDistributionService';

const errorMessage = 'Unable to retrieve data from FORGE. Please try again later.';

export async function getForgeEntity(
  type: ForgeDapiEntityCode,
  slug: string,
  options: ForgeDistributionApiOption | null
) {
  try {
    const data = await getEntity(type, slug, options);
    return { data };
  } catch (e) {
    let message = errorMessage;
    if (e instanceof Error) message = e?.message ? e?.message : errorMessage;
    return { error: message };
  }
}

export async function getForgeEntityList(
  slug: string,
  type: ForgeDapiEntityCode | null,
  options: ForgeDistributionApiOption | null
) {
  try {
    const data = (await getEntityList(slug, type, options)) as PagedResult;
    return { data };
  } catch (e) {
    let message = errorMessage;
    if (e instanceof Error) message = e?.message ? e?.message : errorMessage;
    return { error: message };
  }
}
