'use client';

import Toast from '@/components/commons/Toast/Toast';
import { icons, renderSvgIcon } from '@/components/icons';
import { useEffect, useState } from 'react';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { getMetadata } from '@/services/metadataService';
import { ForgeMetadataCategoryType, ForgeSocialsMetadataKey } from '@/models/types/forge';
import { Metadata } from '@/models/types/pageStructure';

type SocialShareProps = {
  title: string;
  metadata?: Metadata[];
};

type ShareUnion = 'whatsapp' | 'x' | 'facebook' | 'link';

const SocialShare = ({ title, metadata }: SocialShareProps) => {
  const [url, setUrl] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const iconSize = 36;
  const iconClass = 'cursor-pointer transition duration-300 hover:text-link';

  const fbAppId = getMetadata(
    metadata || [],
    ForgeMetadataCategoryType.socials,
    ForgeSocialsMetadataKey.fb_app_id
  )?.value;

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
        let js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }

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
    if (window == undefined) return null;
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
    <div className="relative flex flex-row gap-2 text-grey-100">
      {copiedLink && (
        <div className="absolute right-0 top-0">
          <Toast
            type="success"
            title="link-copied"
          />
        </div>
      )}
      {shareItems &&
        shareItems.map((item, index) => (
          <button
            onClick={() => share(item.id)}
            onKeyDown={(e) => (e.key === 'Enter' ? share(item.id) : undefined)}
            key={index}
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
