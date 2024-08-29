This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites
- Node version 22.x.x

## Getting Started

First, install the dependencies and let `husky` prepared:
```bash
yarn install && yarn prepare
```

Then run the development server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Build 
If you want, you can double-check the final production output using: 
```bash
yarn build
```
copy your `.env.local` file in the `.next/server` folder and run:
```bash
yarn start
```

## API
The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Env Variables
This solution uses the environment variables we did not push the .env file on origin on purpose.
Follow these steps to use the env variables locally:
- generate an empty  `.env.local` file inside the `root` folder
- ask your Lead Engineer of you colleague to share its content via `Last Pass` secure note 

The content of this file should look like:
```bash
# Mandatory general configuration for local test and in the deployment
NODE_ENV='production'
REACT_NAV_LOGGING='false'
LOG_MINIMUM_LEVEL='Warning'
LANGUAGE='en'
CULTURE='en-GB'
ENVIRONMENT='sandbox'
REVALIDATE_TOKEN='xxx'
VERSION='{build-image-version}'
FORGE_DISTRIBUTION_API_BASE_URL='https://forge-dapi.deltatre.digital'
GRAPHIC_ASSETS_DASHBOARD_API_BASE_URL='https://graphicassetapi.deltatre.digital'
PAGE_BUILDER_FRONTEND_API_BASE_URL='https://pagebuilder-fe-api.deltatre.digital'
PAGE_BUILDER_FRONTEND_API_SECRET='FrontendApi key=intkey'
VOCABULARY_TOOL_API_BASE_URL='https://vocabulary-tool-api.deltatre.digital'
VOCABULARY_TOOL_VOC_CODE='react-fe-vocabulary'
THEMING_SUFFIX_NAME='d3'
PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH='~/'
# Mandatory general configuration only for local test to keep the link rules on local path
KEEP_LINK_RULES_LOCAL='true'
LINK_RULES_LOCAL_HOSTNAME='localhost'
LINK_RULES_LOCAL_PORT='3000'
LINK_RULES_LOCAL_PROTOCOL='http'
# Mandatory configuration for local test and in the deployment for the module SearchResults with the Azure Cognitive Search
AZURE_COGNITIVE_SEARCH_ENDPOINT_URL='https://forge-integrations-search.search.windows.net'
AZURE_COGNITIVE_SEARCH_INDEX_NAME='dapi-en-gb'
AZURE_COGNITIVE_SEARCH_KEY='xxx'
AZURE_COGNITIVE_SEARCH_KEY_PAGES_INDEX_NAME='key-pages'
# Mandatory general configuration for local test and in the deployment for the module and the component related to the LiveBlogging
LIVE_BLOGGING_DAPI_BASE_URL='https://liveblogging.deltatre.digital'
# Mandatory general configuration for local test and in the deployment for the module and the component related to the Diva Player
DIVA_PLAYER_VIDEO_SETTINGS_BASE_URL='https://react-fe.net/diva5/settings'
```

## CSS 
This project uses [Tailwind CSS](https://tailwindcss.com/) as main CSS framework, since it's fully supported by Nextjs as described in the official [documentation](https://beta.nextjs.org/docs/styling/tailwind-css)