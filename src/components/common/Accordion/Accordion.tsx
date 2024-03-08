import styles from '@/components/common/Accordion/Accordion.module.scss';
import HtmlContent from '@/components/common/HtmlContent/HtmlContent';
import { renderSvgIcon } from '@/components/icons';

type AccordionElementType = {
  id: string;
  header?: string;
  body?: string;
};

type AccordionProps = {
  elements: AccordionElementType[];
  expandFirstElement?: boolean;
  className?: string;
};

const Accordion = ({ elements, expandFirstElement, className }: AccordionProps) => {
  return (
    <div className={`${styles.accordion} ${className ?? ''}`}>
      {elements.map((el: AccordionElementType, index: number) => (
        <details
          className={`${index !== elements.length - 1 ? 'border-b-[1px] border-primary-border-light' : ''}`}
          key={`${el.id}-${index}`}
          {...(index === 0 && expandFirstElement ? { open: true } : undefined)}
        >
          <summary className="flex flex-row justify-between items-center cursor-pointer py-2 lg:py-4 gap-4 text-grey-900 dark:text-grey-100 list-none">
            <>
              <HtmlContent
                content={el.header}
                className="d3-ty-heading-5"
              />
              {renderSvgIcon('CaretRightIcon', { className: 'accordion__icon' })}
            </>
          </summary>
          <HtmlContent
            content={el.body}
            className="pb-4 d3-ty-body-small"
          />
        </details>
      ))}
    </div>
  );
};

export default Accordion;
