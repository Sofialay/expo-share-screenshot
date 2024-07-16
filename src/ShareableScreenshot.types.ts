import { CSSProperties, ReactNode } from "react";

export interface ShareableScreenshotProps {
    children: ReactNode;
    buttonText?: string;
    buttonStyle?: CSSProperties;
    hideDuringCapture?: boolean;
    format?: "png" | "jpg" | "webm" | "raw";
    quality?: number;
    onError?: (error: Error) => void;
    customLoadingIndicator?: ReactNode
  }