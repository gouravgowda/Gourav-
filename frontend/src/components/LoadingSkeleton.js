import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
    const skeletons = Array.from({ length: count }, (_, i) => i);

    if (type === 'card') {
        return (
            <div className="skeleton-container">
                {skeletons.map((_, index) => (
                    <div key={index} className="skeleton-card">
                        <div className="skeleton-header">
                            <div className="skeleton-circle"></div>
                            <div className="skeleton-lines">
                                <div className="skeleton-line skeleton-line-short"></div>
                                <div className="skeleton-line skeleton-line-medium"></div>
                            </div>
                        </div>
                        <div className="skeleton-body">
                            <div className="skeleton-line skeleton-line-long"></div>
                            <div className="skeleton-line skeleton-line-medium"></div>
                            <div className="skeleton-line skeleton-line-short"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (type === 'list') {
        return (
            <div className="skeleton-list">
                {skeletons.map((_, index) => (
                    <div key={index} className="skeleton-list-item">
                        <div className="skeleton-line skeleton-line-long"></div>
                        <div className="skeleton-line skeleton-line-medium"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (type === 'chart') {
        return (
            <div className="skeleton-chart">
                <div className="skeleton-chart-header">
                    <div className="skeleton-line skeleton-line-medium"></div>
                </div>
                <div className="skeleton-chart-body">
                    <div className="skeleton-bars">
                        {[60, 80, 45, 90, 70].map((height, index) => (
                            <div
                                key={index}
                                className="skeleton-bar"
                                style={{ height: `${height}%` }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Default text skeleton
    return (
        <div className="skeleton-text">
            {skeletons.map((_, index) => (
                <div key={index} className="skeleton-line skeleton-line-long"></div>
            ))}
        </div>
    );
};

export default LoadingSkeleton;
