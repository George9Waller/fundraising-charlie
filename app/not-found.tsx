"use client";
import { useState } from "react";

interface Props {
  error: any;
  fillScreen?: boolean;
}

export default function NotFound({ fillScreen = true }: Props) {
  return (
    <div
      className={`flex items-center justify-center h-${
        fillScreen ? "screen" : "full"
      } w-full error`}
    >
      <div className="m-4 p-4 text-center">
        <p className="text-2xl mb-2">This page does not exist</p>
      </div>
    </div>
  );
}
