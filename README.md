This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies:
```bash
yarn install
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

You can start editing the page by modifying `app/[[...pageName]]page.tsx`. The page auto-updates as you edit the file.

## Mock API
The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

You can also use the `pageStructure` fake endpoint to return the structure of a page.
This endpoint can be accessed on [http://localhost:3000/api/pageStructure](http://localhost:3000/api/pageStructure). This endpoint can be edited in `pages/api/pageStructure.ts`.

## Env Variables
This solution uses the environment variables but we did not push the .env file on origin on purpose.
Follow these steps to use the env variables locally:
- generate an empty  `.env.local` file inside the `web` folder
- ask your Lead Engineer of you colleague to share its content via `Last Pass` secure note 

The content of this file should look like:
```bash
CULTURE=en-GB
ENVIRONMENT=sandbox
FRONTEND_API_BASE_URL=https://react-fe-poc.integrations-lab-forge.deltatre.digital
LANGUAGE=en
VOCABULARY_TOOL_API_BASE_URL=https://vocabulary-tool-api.integrations-lab-forge.deltatre.digital
VOCABULARY_TOOL_VOC_CODE=_default_
VOCABULARY_TOOL_TRANSLATIONS_REVALIDATE_TIME=120
GRAPHIC_ASSETS_DASHBOARD_API_BASE_URL=https://graphicassetapi.integrations-lab-forge.deltatre.digital
```

## CSS 
This project uses [Tailwind CSS](https://tailwindcss.com/) as main CSS framework, since it's fully supported by Nextjs as described in the official [documentation](https://beta.nextjs.org/docs/styling/tailwind-css)