import * as React from "react";

export default function Conversation() {
  return (
    <div className="icon comment">
      <svg viewBox="0 0 400 400">
        <ellipse id="conversation" cx="200" cy="200" rx="180" ry="130" />
        <text id="convo" x="70" y="215">
          ...
        </text>
      </svg>
    </div>
  );
}
