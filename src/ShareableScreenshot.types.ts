import { CSSProperties, ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface ShareableScreenshotProps {
    children: ReactNode;
    buttonText?: string;
    buttonStyle?:  StyleProp<ViewStyle> | undefined;
    hideDuringCapture?: boolean;
    format?: "png" | "jpg" | "webm" | "raw";
    quality?: number;
    onError?: (error: Error) => void;
    customLoadingIndicator?: ReactNode
  }