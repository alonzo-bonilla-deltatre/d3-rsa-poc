import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Enum for readiness statuses.
 *
 * @readonly
 * @enum {string}
 */
export const ReadyStatus = {
  READY: 'Ready',
  NOT_READY: 'Not Ready',
};

/**
 * Enum for service names.
 *
 * @readonly
 * @enum {string}
 */
export const ServiceName = {
  FrontendApi: 'frontendApi',
  ForgeApi: 'forgeApi',
  VocabularyToolApi: 'vocabularyToolApi',
  GadApi: 'gadApi',
};

/**
 * Type for a service to be checked for readiness.
 *
 * @typedef {Object} HealthzReadyReqServiceType
 * @property {string} url - The URL of the service.
 * @property {string} name - The name of the service.
 */
type HealthzReadyReqServiceType = {
  url: string;
  name: string;
};

/**
 * Type for a service status.
 *
 * @typedef {Object} HealthzReadyResServiceType
 * @property {string} status - The status of the service.
 * @property {string} name - The name of the service.
 */
type HealthzReadyResServiceType = {
  status: string;
  name: string;
};

/**
 * Checks if the Frontend API is ready.
 *
 * @async
 * @returns {Promise<string>} The URL to check for readiness.
 */
const isFrontendApiReady = async () => {
  return new URL('echo', process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL).href;
};

/**
 * Checks if the Forge API is ready.
 *
 * @async
 * @returns {Promise<string>} The URL to check for readiness.
 */
const isForgeApiReady = async () => {
  return new URL('echo', process.env.FORGE_DISTRIBUTION_API_BASE_URL).href;
};

/**
 * Checks if the Vocabulary Tool API is ready.
 *
 * @async
 * @returns {Promise<string>} The URL to check for readiness.
 */
const isVocabularyToolApiReady = async () => {
  return new URL('echo', process.env.VOCABULARY_TOOL_API_BASE_URL).href;
};

/**
 * Checks if the GAD API is ready.
 *
 * @async
 * @returns {Promise<string>} The URL to check for readiness.
 */
const isGadApiReady = async () => {
  return new URL('', process.env.GRAPHIC_ASSETS_DASHBOARD_API_BASE_URL).href;
};

/**
 * Fetches the status of a service.
 *
 * @async
 * @param {HealthzReadyReqServiceType} service - The service to fetch the status for.
 * @returns {Promise<HealthzReadyResServiceType>} The status of the service.
 */
const fetcher = async (service: HealthzReadyReqServiceType) =>
  await axios
    .get(service.url)
    .then(() => {
      return { name: service.name, status: ReadyStatus.READY } as HealthzReadyResServiceType;
    })
    .catch(() => {
      return { name: service.name, status: ReadyStatus.NOT_READY } as HealthzReadyResServiceType;
    });

/**
 * Fetches the statuses of multiple services.
 *
 * @param {HealthzReadyReqServiceType[]} services - The services to fetch the statuses for.
 * @returns {Promise<HealthzReadyResServiceType[]>} The statuses of the services.
 */
const multipleFetcher = (services: HealthzReadyReqServiceType[]) =>
  Promise.all(services.map((service: HealthzReadyReqServiceType) => fetcher(service)));

/**
 * Handler for the readiness check API route.
 *
 * This handler processes requests to the readiness check API route. It fetches the statuses of multiple services,
 * and if all services are ready, it sends a 200 status code and a JSON object with the status 'Ready' in the response.
 * If not all services are ready, it sends a 503 status code and a JSON object with the status 'Not Ready' in the response.
 *
 * @async
 * @param {NextApiRequest} req - The Next.js API request.
 * @param {NextApiResponse} res - The Next.js API response.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const servicesStatusFetcher = await multipleFetcher([
    {
      url: await isFrontendApiReady(),
      name: ServiceName.FrontendApi,
    },
    {
      url: await isForgeApiReady(),
      name: ServiceName.ForgeApi,
    },
    {
      url: await isVocabularyToolApiReady(),
      name: ServiceName.VocabularyToolApi,
    },
    {
      url: await isGadApiReady(),
      name: ServiceName.GadApi,
    },
  ]);

  const servicesStatus: Record<string, string> = {};
  servicesStatusFetcher.forEach((serviceStatus) => {
    servicesStatus[serviceStatus.name] = serviceStatus.status;
  });

  const isReady = Object.values(servicesStatus).every((status) => status.valueOf() === ReadyStatus.READY);
  res
    .status(isReady ? 200 : 500)
    .json({ status: isReady ? ReadyStatus.READY : ReadyStatus.NOT_READY, services: servicesStatus });
  res.end();
};

export default handler;
