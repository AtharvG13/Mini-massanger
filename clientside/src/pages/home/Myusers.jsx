import React from "react";

const Myusers = () => {
  return (
    <div className="flex items-center gap-2 p-2">
      <div className="avatar avatar-online">
        <div className="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
        </div>
      </div>
      <div>
        <h2 className="text-success line-clamp-1">fullname</h2>
        <p className="text-success text-xs">username</p>
      </div>
    </div>
  );
};

export default Myusers;
