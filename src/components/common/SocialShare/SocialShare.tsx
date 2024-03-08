'use client';

import Toast from '@/components/common/Toast/Toast';
import { icons, renderSvgIcon } from '@/components/icons';
import { useEffect, useState } from 'react';
import TranslatedLabel from '@/components/common/TranslatedLabel/TranslatedLabel';

type SocialShareProps = {
  title: string;
  fbAppId?: string;
};

type ShareUnion = 'whatsapp' | 'x' | 'facebook' | 'link';

const SocialShare = ({ title, fbAppId }: SocialShareProps) => {
  const [url, setUrl] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const iconSize = 36;
  const iconClass = 'cursor-pointer hover:text-greyscale-grey';

  useEffect(() => {
    //@ts-ignore
    if (fbAppId && !window.fbInit) {
      //@ts-ignore
      window.fbInit = true;
      //@ts-ignore
      window.fbAsyncInit = function () {
        //@ts-ignore
        window.FB.init({
          appId: fbAppId,
          version: 'v10.0',
          xfbml: true,
        });
      };

      (function (d, s, id) {
        // eslint-disable-next-line
        let js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        // eslint-disable-next-line
        js = d.createElement(s);
        js.id = id;
        //@ts-ignore
        js.src = '//connect.facebook.net/en_US/sdk.js';
        //@ts-ignore
        fjs?.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    }
  }, [fbAppId]);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => {
      setCopiedLink(false);
    }, 1500);
  };

  const share = (type: ShareUnion) => {
    if (type === 'whatsapp') {
      return window.open(`https://api.whatsapp.com/send?text=${url}`);
    }
    if (type === 'x') {
      return window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${url}`);
    }
    if (type === 'link') {
      return copyToClipboard();
    }
    if (type === 'facebook') {
      //@ts-ignore
      if (window.FB) {
        //@ts-ignore
        window.FB.ui({
          method: 'share',
          href: url,
        });
      }
    }
    return null;
  };

  const shareItems: { id: ShareUnion; icon: keyof typeof icons }[] = [
    { id: 'facebook', icon: 'FacebookRounded' },
    { id: 'x', icon: 'XRounded' },
    { id: 'whatsapp', icon: 'WhatsAppRounded' },
    { id: 'link', icon: 'CopyLinkRounded' },
  ];

  return (
    <div className="flex flex-row gap-2 text-greyscale-light relative">
      {copiedLink && (
        <div className="absolute top-0 right-0 ">
          <Toast
            type="success"
            title="link-copied"
          />
        </div>
      )}
      {shareItems.map((item) => (
        <button
          onClick={() => share(item.id)}
          onKeyDown={(e) => (e.key === 'Enter' ? share(item.id) : undefined)}
          key={item.id}
        >
          {renderSvgIcon(item.icon, { className: iconClass, width: iconSize, height: iconSize })}
          <span className="sr-only">
            <TranslatedLabel translationTermKey={`share-${item.id}`}></TranslatedLabel>
          </span>
        </button>
      ))}
    </div>
  );
};

export default SocialShare;
