"use client";
import { useState } from "react";

interface Props {
  error: any;
  fillScreen?: boolean;
}

export default function ErrorComponent({ error, fillScreen = true }: Props) {
  const [seeError, setSeeError] = useState(false);
  return (
    <div
      className={`flex items-center justify-center h-${
        fillScreen ? "screen" : "full"
      } w-full error`}
    >
      <div className="m-4 p-4 text-center">
        <p className="text-lg mb-2">An error occurred</p>
        {seeError ? (
          <small className="text-xs font-[monospace]">{error.message}</small>
        ) : (
          <a onClick={() => setSeeError(true)}>Show what happened?</a>
        )}
      </div>
    </div>
  );
}
