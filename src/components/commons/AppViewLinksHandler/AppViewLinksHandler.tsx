'use client';

import React, { useEffect } from 'react';

const AppViewLinksHandler = () => {
  const appView = 'appview';
  const appViewValue = 'true';

  /**
   * An array of CSS selectors for the widgets that need to be observed.
   * Each string in the array should be a valid CSS selector.
   * The selected elements will be observed for changes in their child elements.
   * When a change is detected, the CTA links within the new content will be updated.
   * Currently, this array is empty, so no elements are being observed.
   * To observe specific elements, add their CSS selectors to this array.
   */
  const widgetSelectors: string[] = [];

  useEffect(() => {
    // Check if the current URL has the appview=true query string
    const currentUrl = new URL(window.location.href);
    const hasAppView = currentUrl.searchParams.get(appView) === appViewValue;

    // Function to update CTA links
    const updateCtaLinks = (document: Document | HTMLElement) => {
      const links = document.querySelectorAll('a');

      links.forEach((link) => {
        const href = link.getAttribute('href');
        const linkUrl = new URL(href ?? '', window.location.href);

        // Check if the link contains a hash
        if (linkUrl.hash) {
          return;
        }

        // Check if the link already contains a query string
        if (linkUrl.searchParams.has(appView)) {
          // Link already contains a query string, update the existing value
          linkUrl.searchParams.set(appView, appViewValue);
        } else {
          // Link doesn't have a query string, add 'appview=true'
          linkUrl.searchParams.append(appView, appViewValue);
        }

        // Update the link's href
        link.setAttribute('href', linkUrl.toString());
      });
    };

    if (hasAppView) {
      // Immediately invoke updateCtaLinks on the current document
      updateCtaLinks(document);

      // Select all the widgets elements
      const widgets: NodeListOf<Element>[] = [];
      widgetSelectors.forEach((selector) => {
        widgets.push(document.querySelectorAll(selector));
      });

      // Use MutationObserver to watch for changes in project custom widgets or components
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length > 0) {
            // Call updateCtaLinks for the new content
            mutation.addedNodes.forEach((newNode) => {
              if (newNode instanceof HTMLElement) {
                updateCtaLinks(newNode);
              }
            });
          }
        });
      });

      // Observe each widget for DOM mutations
      widgets.forEach((widgetNodeList) => {
        widgetNodeList.forEach((widget) => {
          observer.observe(widget, { childList: true, subtree: true });
        });
      });

      // Disconnect the observer when the component unmounts
      return () => observer.disconnect();
    }
  });

  return <></>;
};

export default AppViewLinksHandler;
