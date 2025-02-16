import React from 'react';

interface MaxWidthContainerProps {
    children: React.ReactNode;
    maxWidth?: string;
    className?: string;
}

const MaxWidthContainer: React.FC<MaxWidthContainerProps> = ({ children, maxWidth = '900px', className = '' }) => {
    return (
        <div className={`max-w-container ${className}`} style={{ maxWidth, margin: '0 auto' }}>
            {children}
        </div>
    );
};

export default MaxWidthContainer;