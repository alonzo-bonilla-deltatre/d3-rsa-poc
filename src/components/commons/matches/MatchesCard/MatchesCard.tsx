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
      <div className="flex border-b border-white/20 pb-4 text-grey-100">
        <div
          className={`${tag === 'yesterday' ? selectedItemCssClass : ''} ${navItemCssClass}`}
          onClick={() => {
            setEntities(yesterdayItems);
            setTag('yesterday');
          }}
        >
          <TranslateLabel translationTermKey="yesterday" />
        </div>
        <div
          className={`${tag === 'today' ? selectedItemCssClass : ''} ${navItemCssClass}`}
          onClick={() => {
            setEntities(todayItems);
            setTag('today');
          }}
        >
          <TranslateLabel translationTermKey="today" />
        </div>
        <div
          className={`${tag === 'tomorrow' ? selectedItemCssClass : ''} ${navItemCssClass}`}
          onClick={() => {
            setEntities(tomorrowItems);
            setTag('tomorrow');
          }}
        >
          <TranslateLabel translationTermKey="tomorrow" />
        </div>
      </div>
      {entities?.map((entity: DistributionEntity, index: number) => {
        return (
          <div
            key={index}
            className="border-b border-white/20 p-4 first:border-t"
          >
            {/*desktop*/}
            <div className="sm:gaps-4 hidden min-h-[320px] justify-between sm:grid sm:grid-cols-3">
              <div className="flex items-center justify-start">
                <div className="flex min-h-[224px] min-w-[164px] flex-col items-center justify-center bg-bullets-logo bg-left bg-no-repeat xl:flex-row">
                  {entity?.references?.teamHome &&
                    entity?.references?.teamHome.length > 0 &&
                    entity?.references?.teamHome[0].fields?.teamLogo?.assetUrl && (
                      <div className="flex flex-col items-center pr-5">
                        <div className="flex max-h-[80px] max-w-[80px] flex-col items-center pl-5">
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
                  <div className="mt-10 text-center font-heading text-5xl uppercase -tracking-[0.031] xl:mt-0">
                    {entity?.references?.teamHome &&
                    entity?.references?.teamHome.length > 0 &&
                    entity?.references?.teamHome[0]?.fields?.name
                      ? entity?.references?.teamHome[0]?.fields?.name
                      : ''}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between">
                {entity?.fields?.venue && (
                  <div className="absolute left-1/2 mt-[16px] hidden max-w-[360px] -translate-x-1/2 transform text-center font-heading text-[120px] uppercase leading-[144px] text-grey-500 opacity-20 md:block xl:text-[120px]">
                    {entity?.fields?.venue ?? ''}
                  </div>
                )}
                <div className="font-navigation text-base uppercase -tracking-[0.01] text-grey-100">
                  {entity?.fields?.competitionName ?? ''}
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-heading text-5xl uppercase -tracking-[0.031]">
                    {entity?.fields?.scoreHome && entity?.fields?.scoreAway
                      ? entity?.fields?.scoreHome + ' - ' + entity?.fields?.scoreAway
                      : entity?.fields?.kickOffDateTime
                        ? formatDate(entity?.fields?.kickOffDateTime, 'HH:mm')
                        : ''}
                  </div>
                </div>
                <div className="text-center font-navigation text-base uppercase -tracking-[0.01] text-grey-100">
                  {entity?.fields?.kickOffDateTime ? formatDate(entity?.fields?.kickOffDateTime, 'DD MMMM YYYY') : ''}
                  {entity?.fields?.kickOffDateTime && entity?.fields?.matchDay ? ' - ' : ''}
                  {entity?.fields?.matchDay ? entity?.fields?.matchDay : ''}
                </div>
              </div>
              <div className="flex items-center justify-end">
                <div className="flex min-h-[224px] min-w-[164px] flex-col items-center justify-center bg-bullets-logo bg-right bg-no-repeat xl:flex-row">
                  <div className="mt-10 hidden text-center font-heading text-5xl uppercase -tracking-[0.031] xl:mt-0 xl:block">
                    {entity?.references?.teamAway &&
                    entity?.references?.teamAway.length > 0 &&
                    entity?.references?.teamAway[0]?.fields?.name
                      ? entity?.references?.teamAway[0]?.fields?.name
                      : ''}
                  </div>
                  {entity?.references?.teamAway &&
                    entity?.references?.teamAway.length > 0 &&
                    entity?.references?.teamAway[0].fields?.teamLogo?.assetUrl && (
                      <div className="flex flex-col items-center pl-5">
                        <div className="flex max-h-[80px] max-w-[80px] flex-col items-center pr-5">
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
                  <div className="mt-10 text-center font-heading text-5xl uppercase -tracking-[0.031] xl:mt-0 xl:hidden">
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
            <div className="flex flex-col bg-bullets-logo bg-left bg-no-repeat sm:hidden">
              <div className="">
                <div className="flex flex-col items-center">
                  <div className="font-navigation text-base uppercase -tracking-[0.01] text-grey-100">
                    {entity?.fields?.competitionName}
                  </div>

                  <div className="text-center font-navigation text-base uppercase -tracking-[0.01] text-grey-100">
                    {entity?.fields?.kickOffDateTime ? formatDate(entity?.fields?.kickOffDateTime, 'DD MMM, YYYY') : ''}
                    {entity?.fields?.kickOffDateTime && entity?.fields?.matchDay ? ' - ' : ''}
                    {entity?.fields?.matchDay ? entity?.fields?.matchDay : ''}
                  </div>
                  <div className="font-heading text-3xl uppercase -tracking-[0.031]">
                    {entity?.fields?.scoreHome && entity?.fields?.scoreAway
                      ? ''
                      : entity?.fields?.kickOffDateTime
                        ? formatDate(entity?.fields?.kickOffDateTime, 'HH:mm')
                        : ''}
                  </div>
                  <div className="my-4 flex w-full flex-row items-center justify-between">
                    <div className="flex items-center">
                      {entity?.references?.teamHome &&
                        entity?.references?.teamHome.length > 0 &&
                        entity?.references?.teamHome[0].fields?.teamLogo?.assetUrl && (
                          <div className="flex flex-col items-center pr-5">
                            <div className="flex max-h-[40px] max-w-[40px] flex-col items-center">
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
                      <div className="text-center font-heading text-3xl uppercase -tracking-[0.031]">
                        {entity?.references?.teamHome &&
                        entity?.references?.teamHome.length > 0 &&
                        entity?.references?.teamHome[0]?.fields?.name
                          ? entity?.references?.teamHome[0]?.fields?.name
                          : ''}
                      </div>
                    </div>
                    <div className="font-heading text-3xl uppercase -tracking-[0.031]">{entity?.fields?.scoreHome}</div>
                  </div>
                  <div className="mb-4 flex w-full flex-row items-center justify-between">
                    <div className="flex items-center">
                      {entity?.references?.teamAway &&
                        entity?.references?.teamAway.length > 0 &&
                        entity?.references?.teamAway[0].fields?.teamLogo?.assetUrl && (
                          <div className="flex flex-col items-center pr-5">
                            <div className="flex max-h-[40px] max-w-[40px] flex-col items-center">
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
                      <div className="text-center font-heading text-3xl uppercase -tracking-[0.031]">
                        {entity?.references?.teamAway &&
                        entity?.references?.teamAway.length > 0 &&
                        entity?.references?.teamAway[0]?.fields?.name
                          ? entity?.references?.teamAway[0]?.fields?.name
                          : ''}
                      </div>
                    </div>
                    <div className="font-heading text-3xl uppercase -tracking-[0.031]">{entity?.fields?.scoreAway}</div>
                  </div>
                </div>
              </div>
              {entity?.fields?.venue && (
                <div className="text-center font-navigation text-base uppercase -tracking-[0.01] text-grey-100">
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
