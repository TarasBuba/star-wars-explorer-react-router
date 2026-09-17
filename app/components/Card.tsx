import { useState } from 'react';
import type React from 'react';

type CardProps = {
  heading: string | undefined;
  fields: { label: string; value: string | React.ReactNode }[];
  image?: string | undefined;
  variant?: 'list' | 'detail';
};

const Card = ({ heading, fields, image, variant = 'list' }: CardProps) => {
  const [imgError, setImgError] = useState(false);
  const hasImage = Boolean(image) && !imgError;

  const renderImageOrFallback = (imageClass: string) => {
    if (hasImage) {
      return (
        <img
          src={image}
          alt={heading}
          className={imageClass}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      );
    }
    return (
      <div className={`sw-fallback-wrap ${imageClass}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="sw-fallback-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
        <span className="sw-fallback-text">DATA CORRUPTED</span>
      </div>
    );
  };

  if (variant === 'detail') {
    return (
      <div className="sw-detail-page">
        <h1 className="sw-detail-heading">{heading}</h1>
        <div className="sw-detail-layout">
          <div className="sw-detail-fields">
            {fields?.map((field) => (
              <div key={field.label} className="sw-field-row">
                <span className="sw-detail-label">{field.label}</span>
                <span className="sw-detail-value">{field.value ?? '—'}</span>
              </div>
            ))}
          </div>
          <div className="sw-detail-image-wrap">
            {renderImageOrFallback('sw-detail-img')}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sw-card">
      <div className="sw-card-body">
        <h2 className="sw-card-title">{heading}</h2>
        <div className="sw-card-fields">
          {fields?.map((field) => (
            <p key={field.label} className="sw-card-field-row">
              <span className="sw-card-label">{field.label}:&nbsp;</span>
              <span className="sw-card-value">{field.value ?? '—'}</span>
            </p>
          ))}
        </div>
      </div>
      <div className="sw-card-image-wrap">
        {renderImageOrFallback('sw-card-img')}
      </div>
    </div>
  );
};

export default Card;
