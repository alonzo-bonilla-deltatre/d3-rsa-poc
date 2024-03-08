import { StoryPart } from '@/models/types/storyPart';
import { emptyDistributionEntity, emptyDistributionEntityStoryPart } from '@/__mocks__/entities/sampleStoryParts';
import { ForgeEntityType, ForgeExternalEntityType } from '@/models/types/forge';

//********** TABLE ************/
const partiaTablePart1 = {
  type: ForgeEntityType.external,
  content: {
    title: 'Table title',
    body: '<table style="border-collapse: collapse; width: 100%;" border="1"><tbody><tr><td style="width: 47.8874%;">column 1</td><td style="width: 47.8874%;">column 2</td></tr><tr><td style="width: 47.8874%;">row 1</td><td style="width: 47.8874%;">row 1</td></tr><tr><td style="width: 47.8874%;">row 2</td><td style="width: 47.8874%;">row 2</td></tr></tbody></table>',
  },
  externalType: ForgeExternalEntityType.storyPartTable,
  inputUrl: '',
};

const partiaTablePart2 = {
  type: ForgeEntityType.external,
  content: {
    title: 'Table title',
    body: '<table style="border-collapse: collapse; width: 100%;" border="1"><tbody><tr><th class="px-6 py-4" scope="col" style="width: 10.0072%;">#</th><th class="px-6 py-4" scope="col" style="width: 23.3062%;">First</th><th class="px-6 py-4" scope="col" style="width: 34.2351%;">Last</th><th class="px-6 py-4" scope="col" style="width: 32.3917%;">Handle</th></tr><tr><td class="whitespace-nowrap px-6 py-4 font-medium" style="width: 10.0072%;">1</td><td class="whitespace-nowrap px-6 py-4" style="width: 23.3062%;">Mark</td><td class="whitespace-nowrap px-6 py-4" style="width: 34.2351%;">Otto</td><td class="whitespace-nowrap px-6 py-4" style="width: 32.3917%;">@mdo</td></tr><tr><td class="whitespace-nowrap px-6 py-4 font-medium" style="width: 10.0072%;">2</td><td class="whitespace-nowrap px-6 py-4" style="width: 23.3062%;">Jacob</td><td class="whitespace-nowrap px-6 py-4" style="width: 34.2351%;">Thornton</td><td class="whitespace-nowrap px-6 py-4" style="width: 32.3917%;">@fat</td></tr><tr><td class="whitespace-nowrap px-6 py-4 font-medium" style="width: 10.0072%;">3</td><td class="whitespace-nowrap px-6 py-4" style="width: 23.3062%;">Larry</td><td class="whitespace-nowrap px-6 py-4" style="width: 34.2351%;">Wild</td><td class="whitespace-nowrap px-6 py-4" style="width: 32.3917%;">@twitter</td></tr></tbody></table>',
  },
  externalType: ForgeExternalEntityType.storyPartTable,
  inputUrl: '',
};

const partiaTablePart3 = {
  type: ForgeEntityType.external,
  content: {
    title: 'Table title',
    body: '<table style="border-collapse: collapse; width: 100%;" border="1" data-mce-style="border-collapse: collapse; width: 100%;"><thead><tr><th style="background-color: rgb(236, 202, 250);" data-mce-style="background-color: #eccafa;">column 1</th><th style="background-color: rgb(236, 202, 250);" data-mce-style="background-color: #eccafa;">column 2</th><th style="background-color: rgb(236, 202, 250);" data-mce-style="background-color: #eccafa;">column 3</th><th style="background-color: rgb(248, 202, 198);" data-mce-style="background-color: #f8cac6;">column 4</th><th style="background-color: rgb(248, 202, 198);" data-mce-style="background-color: #f8cac6;">column 5</th><th style="background-color: rgb(248, 202, 198);" data-mce-style="background-color: #f8cac6;">column 6</th></tr></thead><tbody><tr><td>row 1</td><td>row 1</td><td>row 1</td><td>row 1</td><td>row 1</td><td>row 1</td></tr><tr><td style="background-color: rgb(191, 237, 210);" data-mce-style="background-color: #bfedd2;">row 2</td><td style="background-color: rgb(191, 237, 210);" data-mce-style="background-color: #bfedd2;">row 2</td><td style="background-color: rgb(194, 224, 244);" data-mce-style="background-color: #c2e0f4;">row 2</td><td style="background-color: rgb(194, 224, 244);" data-mce-style="background-color: #c2e0f4;">row 2</td><td>row 2</td><td>row 2</td></tr><tr><td style="background-color: rgb(191, 237, 210);" data-mce-style="background-color: #bfedd2;">row 3</td><td style="background-color: rgb(191, 237, 210);" data-mce-style="background-color: #bfedd2;">row 3</td><td>row 3</td><td style="background-color: rgb(251, 238, 184);" data-mce-style="background-color: #fbeeb8;"><h1>row 3</h1></td><td>row 3</td><td>row 3</td></tr></tbody></table>',
  },
  externalType: ForgeExternalEntityType.storyPartTable,
  inputUrl: '',
};

const sampleTableStoryPart1: StoryPart = {
  ...emptyDistributionEntity,
  ...emptyDistributionEntityStoryPart,
  ...partiaTablePart1,
};

const sampleTableStoryPart2: StoryPart = {
  ...emptyDistributionEntity,
  ...emptyDistributionEntityStoryPart,
  ...partiaTablePart2,
};

const sampleTableStoryPart3: StoryPart = {
  ...emptyDistributionEntity,
  ...emptyDistributionEntityStoryPart,
  ...partiaTablePart3,
};

export { sampleTableStoryPart1, sampleTableStoryPart2, sampleTableStoryPart3 };
