'use client';

import { DistributionEntity } from '@/models/types/forge';
import { formatDate } from '@/helpers/dateHelper';
import GadAsset from '@/components/commons/GadAsset/GadAsset';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { useState } from 'react';
import TranslateLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';

type MatchesCardProps = {
  yesterdayItems: DistributionEntity[] | null;
  todayItems: DistributionEntity[] | null;
  tomorrowItems: DistributionEntity[] | null;
};

const MatchesCard = ({ todayItems, tomorrowItems, yesterdayItems }: MatchesCardProps) => {
  const [tag, setTag] = useState<string>('today');
  const [entities, setEntities] = useState<DistributionEntity[] | null>(todayItems);
  const selectedItemCssClass = 'border-b-link border-b pb-4 mb-[-17px] text-white ';
  const navItemCssClass = 'font-navigation uppercase mr-8 cursor-pointer  text-xl -tracking-[0.02] ';

  return (
    <>
      <div className={'flex border-white/20 border-b pb-4 text-grey-100'}>
        <div
          className={`${tag === 'yesterday' ? selectedItemCssClass : ''} ${navItemCssClass}`}
          onClick={() => {
            setEntities(yesterdayItems);
            setTag('yesterday');
          }}
        >
          <TranslateLabel translationTermKey={'yesterday'} />
        </div>
        <div
          className={`${tag === 'today' ? selectedItemCssClass : ''} ${navItemCssClass}`}
          onClick={() => {
            setEntities(todayItems);
            setTag('today');
          }}
        >
          <TranslateLabel translationTermKey={'today'} />
        </div>
        <div
          className={`${tag === 'tomorrow' ? selectedItemCssClass : ''} ${navItemCssClass}`}
          onClick={() => {
            setEntities(tomorrowItems);
            setTag('tomorrow');
          }}
        >
          <TranslateLabel translationTermKey={'tomorrow'} />
        </div>
      </div>
      {entities?.map((entity: DistributionEntity, index: number) => {
        return (
          <div
            key={index}
            className={'p-4 border-white/20 border-b first:border-t'}
          >
            {/*desktop*/}
            <div className={'hidden sm:grid sm:grid-cols-3 sm:gaps-4 justify-between min-h-[320px]'}>
              <div className={'flex items-center justify-start'}>
                <div
                  className={
                    'bg-bullets-logo min-h-[224px] min-w-[164px] bg-no-repeat bg-left flex items-center flex-col xl:flex-row justify-center'
                  }
                >
                  {entity?.references?.teamHome &&
                    entity?.references?.teamHome.length > 0 &&
                    entity?.references?.teamHome[0].fields?.teamLogo?.assetUrl && (
                      <div className={'flex flex-col items-center pr-5'}>
                        <div className="flex flex-col items-center pl-5 max-w-[80px] max-h-[80px]">
                          <GadAsset
                            src={entity?.references?.teamHome[0].fields?.teamLogo?.assetUrl ?? ''}
                            height={80}
                            width={80}
                            title={
                              entity?.references?.teamHome &&
                              entity?.references?.teamHome.length > 0 &&
                              entity?.references?.teamHome[0]?.fields?.name
                                ? entity?.references?.teamHome[0]?.fields?.name
                                : ''
                            }
                            transformations={transformations.best_assets}
                          ></GadAsset>
                        </div>
                      </div>
                    )}
                  <div className={'mt-10 xl:mt-0 font-heading text-5xl uppercase -tracking-[0.031] text-center'}>
                    {entity?.references?.teamHome &&
                    entity?.references?.teamHome.length > 0 &&
                    entity?.references?.teamHome[0]?.fields?.name
                      ? entity?.references?.teamHome[0]?.fields?.name
                      : ''}
                  </div>
                </div>
              </div>
              <div className={'flex flex-col justify-between items-center'}>
                {entity?.fields?.venue && (
                  <div className={'hidden md:block absolute mt-[16px] left-1/2 transform -translate-x-1/2 max-w-[360px] font-heading text-[120px] xl:text-[120px] leading-[144px] text-center text-grey-500 uppercase opacity-20 uppercase'}>
                    {entity?.fields?.venue ?? ''}
                  </div>
                )}
                <div className={'text-grey-100 text-base font-navigation uppercase -tracking-[0.01]'}>
                  {entity?.fields?.competitionName ?? ''}
                </div>
                <div className={'flex justify-between items-center'}>
                  <div className={'font-heading text-5xl uppercase -tracking-[0.031]'}>
                    {entity?.fields?.scoreHome && entity?.fields?.scoreAway
                      ? entity?.fields?.scoreHome + ' - ' + entity?.fields?.scoreAway
                      : entity?.fields?.kickOffDateTime
                        ? formatDate(entity?.fields?.kickOffDateTime, 'HH:mm')
                        : ''}
                  </div>
                </div>
                <div className={'text-grey-100 text-base font-navigation uppercase -tracking-[0.01] text-center'}>
                  {entity?.fields?.kickOffDateTime ? formatDate(entity?.fields?.kickOffDateTime, 'DD MMM, YYYY') : ''}
                  {entity?.fields?.kickOffDateTime && entity?.fields?.matchDay ? ' - ' : ''}
                  {entity?.fields?.matchDay ? entity?.fields?.matchDay : ''}
                </div>
              </div>
              <div className={'flex items-center justify-end'}>
                <div
                  className={
                    'bg-bullets-logo min-h-[224px] min-w-[164px] bg-no-repeat bg-right flex items-center flex-col xl:flex-row justify-center'
                  }
                >
                  <div
                    className={
                      'hidden xl:block mt-10 xl:mt-0 font-heading text-5xl uppercase -tracking-[0.031] text-center'
                    }
                  >
                    {entity?.references?.teamAway &&
                    entity?.references?.teamAway.length > 0 &&
                    entity?.references?.teamAway[0]?.fields?.name
                      ? entity?.references?.teamAway[0]?.fields?.name
                      : ''}
                  </div>
                  {entity?.references?.teamAway &&
                    entity?.references?.teamAway.length > 0 &&
                    entity?.references?.teamAway[0].fields?.teamLogo?.assetUrl && (
                      <div className={'flex flex-col items-center pl-5'}>
                        <div className="flex flex-col items-center pr-5 max-w-[80px] max-h-[80px]">
                          <GadAsset
                            src={entity?.references?.teamAway[0].fields?.teamLogo?.assetUrl ?? ''}
                            height={80}
                            width={80}
                            title={
                              entity?.references?.teamAway &&
                              entity?.references?.teamAway.length > 0 &&
                              entity?.references?.teamAway[0]?.fields?.name
                                ? entity?.references?.teamAway[0]?.fields?.name
                                : ''
                            }
                            transformations={transformations.best_assets}
                          ></GadAsset>
                        </div>
                      </div>
                    )}
                  <div
                    className={'xl:hidden mt-10 xl:mt-0 font-heading text-5xl uppercase -tracking-[0.031] text-center'}
                  >
                    {entity?.references?.teamAway &&
                    entity?.references?.teamAway.length > 0 &&
                    entity?.references?.teamAway[0].fields?.name
                      ? entity?.references?.teamAway[0]?.fields?.name
                      : ''}
                  </div>
                </div>
              </div>
            </div>
            {/*mobile*/}
            <div className={'flex sm:hidden flex-col bg-bullets-logo bg-no-repeat bg-left'}>
              <div className={''}>
                <div className={'flex items-center flex-col '}>
                  <div className={'text-grey-100 text-base font-navigation uppercase -tracking-[0.01]'}>
                    {entity?.fields?.competitionName}
                  </div>

                  <div className={'text-grey-100 text-base font-navigation uppercase -tracking-[0.01] text-center'}>
                    {entity?.fields?.kickOffDateTime ? formatDate(entity?.fields?.kickOffDateTime, 'DD MMM, YYYY') : ''}
                    {entity?.fields?.kickOffDateTime && entity?.fields?.matchDay ? ' - ' : ''}
                    {entity?.fields?.matchDay ? entity?.fields?.matchDay : ''}
                  </div>
                  <div className={'font-heading text-3xl uppercase -tracking-[0.031]'}>
                    {entity?.fields?.scoreHome && entity?.fields?.scoreAway
                      ? ''
                      : entity?.fields?.kickOffDateTime
                        ? formatDate(entity?.fields?.kickOffDateTime, 'HH:mm')
                        : ''}
                  </div>
                  <div className={'flex flex-row items-center justify-between w-full my-4'}>
                    <div className={'flex items-center'}>
                      {entity?.references?.teamHome &&
                        entity?.references?.teamHome.length > 0 &&
                        entity?.references?.teamHome[0].fields?.teamLogo?.assetUrl && (
                          <div className={'flex flex-col items-center pr-5'}>
                            <div className="flex flex-col items-center max-w-[40px] max-h-[40px]">
                              <GadAsset
                                src={entity?.references?.teamHome[0].fields?.teamLogo?.assetUrl ?? ''}
                                height={40}
                                width={40}
                                title={
                                  entity?.references?.teamHome &&
                                  entity?.references?.teamHome.length > 0 &&
                                  entity?.references?.teamHome[0]?.fields?.name
                                    ? entity?.references?.teamHome[0]?.fields?.name
                                    : ''
                                }
                                transformations={transformations.best_assets}
                              ></GadAsset>
                            </div>
                          </div>
                        )}
                      <div className={'font-heading text-3xl uppercase -tracking-[0.031] text-center'}>
                        {entity?.references?.teamHome &&
                        entity?.references?.teamHome.length > 0 &&
                        entity?.references?.teamHome[0]?.fields?.name
                          ? entity?.references?.teamHome[0]?.fields?.name
                          : ''}
                      </div>
                    </div>
                    <div className={'font-heading text-3xl uppercase -tracking-[0.031]'}>
                      {entity?.fields?.scoreHome}
                    </div>
                  </div>
                  <div className={'flex flex-row items-center justify-between w-full mb-4'}>
                    <div className={'flex items-center'}>
                      {entity?.references?.teamAway &&
                        entity?.references?.teamAway.length > 0 &&
                        entity?.references?.teamAway[0].fields?.teamLogo?.assetUrl && (
                          <div className={'flex flex-col items-center pr-5'}>
                            <div className="flex flex-col items-center max-w-[40px] max-h-[40px]">
                              <GadAsset
                                src={entity?.references?.teamAway[0].fields?.teamLogo?.assetUrl ?? ''}
                                height={40}
                                width={40}
                                title={
                                  entity?.references?.teamAway &&
                                  entity?.references?.teamAway.length > 0 &&
                                  entity?.references?.teamAway[0]?.fields?.name
                                    ? entity?.references?.teamAway[0]?.fields?.name
                                    : ''
                                }
                                transformations={transformations.best_assets}
                              ></GadAsset>
                            </div>
                          </div>
                        )}
                      <div className={'font-heading text-3xl uppercase -tracking-[0.031] text-center'}>
                        {entity?.references?.teamAway &&
                        entity?.references?.teamAway.length > 0 &&
                        entity?.references?.teamAway[0]?.fields?.name
                          ? entity?.references?.teamAway[0]?.fields?.name
                          : ''}
                      </div>
                    </div>
                    <div className={'font-heading text-3xl uppercase -tracking-[0.031]'}>
                      {entity?.fields?.scoreAway}
                    </div>
                  </div>
                </div>
              </div>
              {entity?.fields?.venue && (
                <div className={'text-grey-100 text-base font-navigation uppercase -tracking-[0.01] text-center'}>
                  {entity?.fields?.venue ?? ''}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
export default MatchesCard;
