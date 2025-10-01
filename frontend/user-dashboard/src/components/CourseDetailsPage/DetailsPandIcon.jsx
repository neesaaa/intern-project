import React from "react";

const DetailsPandIcon = ({ icon: Icon, text }) => {
  return (
    <div className="flex gap-2">
      <Icon className="w-5 h-5" />
      <p class="font-inter  text-[14px] leading-[150%] align-middle">
        {text}
      </p>
    </div>
  );
};

export default DetailsPandIcon;
