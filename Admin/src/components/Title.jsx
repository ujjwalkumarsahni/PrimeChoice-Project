import React from 'react';

export const Title = ({ text1, text2 ,textSize}) => {
  return (
    <div className="text-center mb-4">
      <p className={`${textSize ? textSize : ''} font-bold text-gray-800`}>
        {text1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">{text2}</span>
      </p>
      <div className="w-16 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto mt-2 rounded-full"></div>
    </div>
  );
};
