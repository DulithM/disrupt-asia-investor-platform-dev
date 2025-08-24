'use client';

import Image from 'next/image';

interface LoadingScreenProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingScreen({ 
  message = "Loading Disrupt Asia Platform...", 
  size = 'md' 
}: LoadingScreenProps) {
  const sizeClasses = {
    sm: 'min-h-[200px]',
    md: 'min-h-screen',
    lg: 'min-h-screen'
  };

  const logoSize = {
    sm: 'h-12 w-12',
    md: 'h-20 w-20',
    lg: 'h-24 w-24'
  };

  const textSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-orange-50`}>
      <div className="flex flex-col items-center space-y-6 p-8">
        {/* Simple Logo with gentle animation */}
        <div className="relative">
          <div>
            <Image
              src="/logos/logo-01-removebg-preview.png"
              alt="Disrupt Asia Logo"
              width={80}
              height={80}
              className={`${logoSize[size]} object-contain animate-pulse`}
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h2 className={`${textSize[size]} font-semibold text-gray-800`}>
            Disrupt Asia 2025
          </h2>
          <p className={`${textSize[size]} text-gray-600`}>
            {message}
          </p>
        </div>

        {/* Simple loading dots */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
