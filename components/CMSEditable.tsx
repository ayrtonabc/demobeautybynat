'use client';

import React, { ElementType } from 'react';

interface CMSEditableProps {
    cmsKey: string;
    as?: ElementType;
    className?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export function CMSEditable({
    cmsKey,
    as: Component = 'div',
    className = '',
    children,
    style,
}: CMSEditableProps) {
    const isVisualEditMode = typeof window !== 'undefined' && 
        new URLSearchParams(window.location.search).get('visual_edit') === 'true';
    
    const sectionMatch = cmsKey.split('_').slice(0, 2).join('_');
    
    if (isVisualEditMode) {
        return (
            <Component
                data-cms-section={cmsKey}
                data-cms-type="text"
                data-cms-marked="true"
                className={`cms-editable ${className}`.trim()}
                style={style}
            >
                {children}
            </Component>
        );
    }
    
    return (
        <Component
            data-cms-section={cmsKey}
            data-section={sectionMatch}
            className={className}
            style={style}
        >
            {children}
        </Component>
    );
}

interface CMSEditableImageProps {
    cmsKey: string;
    src?: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    priority?: boolean;
}

export function CMSEditableImage({
    cmsKey,
    src,
    alt,
    className = '',
    width,
    height,
    priority = false,
}: CMSEditableImageProps) {
    const isVisualEditMode = typeof window !== 'undefined' && 
        new URLSearchParams(window.location.search).get('visual_edit') === 'true';
    
    if (!src) {
        return null;
    }
    
    if (isVisualEditMode) {
        return (
            <img
                src={src}
                alt={alt}
                data-cms-section={cmsKey}
                data-cms-type="image"
                data-cms-marked="true"
                className={`cms-editable-image ${className}`.trim()}
                width={width}
                height={height}
            />
        );
    }
    
    return (
        <img
            src={src}
            alt={alt}
            data-cms-section={cmsKey}
            className={className}
            width={width}
            height={height}
        />
    );
}

interface CMSEditableLinkProps {
    cmsKey: string;
    href: string;
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
}

export function CMSEditableLink({
    cmsKey,
    href,
    className = '',
    children,
    onClick,
}: CMSEditableLinkProps) {
    const isVisualEditMode = typeof window !== 'undefined' && 
        new URLSearchParams(window.location.search).get('visual_edit') === 'true';
    
    if (isVisualEditMode) {
        return (
            <a
                href={href}
                data-cms-section={cmsKey}
                data-cms-type="link"
                data-cms-marked="true"
                className={`cms-editable-link ${className}`.trim()}
                onClick={onClick}
            >
                {children}
            </a>
        );
    }
    
    return (
        <a
            href={href}
            data-cms-section={cmsKey}
            className={className}
            onClick={onClick}
        >
            {children}
        </a>
    );
}
