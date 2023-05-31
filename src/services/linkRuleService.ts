import axios from 'axios';
import { PageBuilderFrontendApiError } from '@/models/types/errors';
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/logger';
import { LinkRuleRequest, LinkRuleResponse } from '@/models/types/linkRule';
import { DistributionEntity } from '@/models/types/dapi';
import { StoryPart } from '@/models/types/storyPart';

const culture = process.env.CULTURE;
const environment = process.env.ENVIRONMENT;

export const enrichDistributionEntitiesWithLinkRules = async (
  forgeEntities: DistributionEntity[],
  withRelationsAndParts: boolean = false
): Promise<DistributionEntity[]> => {
  const linkRulesRequest: LinkRuleRequest[] = [];

  if (!forgeEntities || forgeEntities.length == 0) {
    return forgeEntities;
  }

  forgeEntities.forEach((entity: DistributionEntity) => {
    linkRulesRequest.push({
      id: createLinkRuleId(entity),
      entity: entity,
      entityType: entity.entityCode ? entity.entityCode : entity.type,
      culture: culture,
      environment: environment,
    } as LinkRuleRequest);
    if (withRelationsAndParts) {
      if (entity.relations && entity.relations.length > 0) {
        entity.relations.forEach((relation) => {
          linkRulesRequest.push({
            id: createLinkRuleId(relation),
            entity: relation,
            entityType: relation.entityCode ? relation.entityCode : relation.type,
            culture: culture,
            environment: environment,
          } as LinkRuleRequest);
        });
      }
      if (entity.parts && entity.parts.length > 0) {
        entity.parts.forEach((part) => {
          if (part.type != 'external') {
            linkRulesRequest.push({
              id: createLinkRuleId(part),
              entity: part,
              entityType: part.entityCode ? part.entityCode : part.type,
              culture: culture,
              environment: environment,
            } as LinkRuleRequest);
          }
        });
      }
    }
  });

  const linkRules = await getLinkRules(linkRulesRequest);

  if (!linkRules || !linkRules.data || linkRules.data.length == 0) {
    return forgeEntities;
  }

  forgeEntities.forEach((entity) => {
    const linkRule = linkRules?.data.find((l) => l.id === createLinkRuleId(entity));
    if (linkRule) {
      entity.url = linkRule.url;
    }

    if (withRelationsAndParts) {
      if (entity.relations && entity.relations.length > 0) {
        entity.relations.forEach((relation) => {
          const linkRule = linkRules?.data.find((l) => l.id === createLinkRuleId(relation));
          if (linkRule) {
            relation.url = linkRule.url;
          }
        });
      }
      if (entity.parts && entity.parts.length > 0) {
        entity.parts.forEach((part) => {
          if (entity.type != 'external' && entity.type != 'markdown') {
            const linkRule = linkRules?.data.find((l) => l.id === createLinkRuleId(part));
            if (linkRule) {
              part.url = linkRule.url;
            }
          }
        });
      }
    }
  });

  return forgeEntities;
};

export const getLinkRules = async (body: LinkRuleRequest[]): Promise<LinkRuleResponse | null> => {
  let apiUrl = 'api/v1/LinkRules';
  apiUrl = new URL(apiUrl, process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL).href;
  logger.log(`Getting LINK RULES data from PAGE BUILDER FRONTEND API ${apiUrl}`, LoggerLevel.debug);

  return await axios
    .post(apiUrl, body, {
      headers: {
        Authorization: process.env.PAGE_BUILDER_FRONTEND_API_SECRET ?? '',
      },
    })
    .then((response) => {
      logger.log(
        `Retrieved LINK RULES data from PAGE BUILDER FRONTEND API ${apiUrl}. ${JSON.stringify(response.data)}`,
        LoggerLevel.debug
      );
      return response.data;
    })
    .catch((response) => {
      if (response && response.data) {
        const error = response.data as PageBuilderFrontendApiError;
        let errorMessage = `PAGE BUILDER FRONTEND API Error status: ${response.status} - ${response.statusText} - Error message: ${error.title}`;
        if (error.detail) {
          errorMessage = errorMessage + ` - Error Detail: ${error.detail}`;
        }
        logger.log(errorMessage, LoggerLevel.error);
        return null;
      } else {
        logger.log(`PAGE BUILDER FRONTEND API Error: ${response.message} - ${response.stack}`, LoggerLevel.error);
      }

      return null;
    });
};

function createLinkRuleId(forgeEntity: DistributionEntity | StoryPart): string {
  return forgeEntity.entityCode
    ? `${forgeEntity._entityId}-${forgeEntity.type}-${forgeEntity.entityCode}`
    : `${forgeEntity._entityId}-${forgeEntity.type}`;
}
