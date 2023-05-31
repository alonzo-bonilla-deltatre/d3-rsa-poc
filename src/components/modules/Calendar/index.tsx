import { ComponentProps } from '@/models/types/components';
import { getAllEntities } from '@/services/forgeDistributionService';
import { DistributionEntity, PagedResult } from '@/models/types/forge';
import { nanoid } from 'nanoid';
import { GrandPrixFields } from '@/models/types/forge.customEntityFields';
import { isDateGreaterThanNow } from '@/utilities/dateComparer';
import CalendarItemSmall from '@/components/modules/Calendar/CalendarItemSmall';
import CalendarItemExpanded from '@/components/modules/Calendar/CalendarItemExpanded';
import { orderedItems } from '@/components/modules/Calendar/CalendarHelpers';
import { firstAssetOrDefault, getAssetsByTag } from '@/services/gadService';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import ModuleTitle from '@/components/common/ModuleTitle';

type ModuleProps = {
  moduleTitle: string;
  headingLevel: string;
  displayModuleTitle: string;
};

const Calendar = async ({ ...data }: ComponentProps) => {
  const { moduleTitle, headingLevel, displayModuleTitle } = data.properties as ModuleProps;
  const grandPrixFetch = getAllEntities('poc-grand-prix', { limit: 5 });
  const clockAssetsFetch = getAssetsByTag('react-poc-calendar-seiko-watch');

  const [grandPrix, clockAssets] = await Promise.all([grandPrixFetch, clockAssetsFetch]);

  const dapiItems = grandPrix as PagedResult;

  const items = dapiItems?.items ? orderedItems(dapiItems?.items) : [];
  const clockAsset = firstAssetOrDefault(clockAssets);

  let firstItemExpandedRendered = false;

  const marginTopCalendarContainer = /true/.test(displayModuleTitle) && moduleTitle ? 'mt-[140px]' : 'mt-[200px]';

  return (
    <div className="container mx-auto border-b border-[#FFFFFF33]">
      <ModuleTitle
        canRender={/true/.test(displayModuleTitle)}
        heading={headingLevel}
        text={moduleTitle}
      ></ModuleTitle>
      <div
        className={`container flex justify-center mx-auto ${marginTopCalendarContainer} mb-[160px] flex divide-x divide-dashed divide-white/[.20]`}
      >
        {items.map((item: DistributionEntity) => {
          const fields = item.fields as GrandPrixFields;
          if (isDateGreaterThanNow(fields.dateFrom) && !firstItemExpandedRendered) {
            firstItemExpandedRendered = true;
            return (
              <CalendarItemExpanded
                entity={item}
                key={nanoid()}
                className="col-span-2 h-[170px] w-[625px]"
                clockAsset={clockAsset as GraphicAssetsDashboardItem}
              />
            );
          }
          return (
            <CalendarItemSmall
              entity={item}
              key={nanoid()}
              className="h-[170px] w-[225px]"
            />
          );
        })}
      </div>
    </div>
  );
};
export default Calendar;
