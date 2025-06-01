import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    Loading...
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Please wait while we fetch the latest startups
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;
