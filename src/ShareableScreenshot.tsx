import React, { useRef, useState } from 'react';
import { View, Button, Modal, Image, ActivityIndicator, Touchable, TouchableOpacity } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { styles } from './ShareableScreenshot.styles';
import { ShareableScreenshotProps } from './ShareableScreenshot.types';

const ShareableScreenshot: React.FC<ShareableScreenshotProps> = ({ 
  children, 
  buttonText = "Share Screenshot", 
  buttonStyle = {},
  hideDuringCapture = false, 
  format = 'png',
  quality = 0.8,
  customLoadingIndicator,
  onError,
}) => {
  const viewRef = useRef<View>(null);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [screenshotUri, setScreenshotUri] = useState<string | null>(null);

  const takeScreenshot = async () => {
    try {
      setIsLoading(true);
      if (hideDuringCapture) setIsHidden(true);

      const uri = await captureRef(viewRef, {
        format: format,
        quality,
      });

      if (hideDuringCapture) setIsHidden(false);

      setScreenshotUri(uri);
      setIsLoading(false);
    } catch (error) {
      console.error("Error taking screenshot:", error);
      if (hideDuringCapture) setIsHidden(false);
      setIsLoading(false);
      if (onError) onError(error as Error);
    }
  };

  const shareScreenshot = async () => {
    if (screenshotUri) {
      await Sharing.shareAsync(screenshotUri);
      setScreenshotUri(null);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading && customLoadingIndicator ? customLoadingIndicator : <ActivityIndicator size="large" />}
      <View ref={viewRef} style={[{ flex: 1 }, isHidden && styles.hidden]}>
        {children}
      </View>
      <TouchableOpacity style={buttonStyle}>
        <Button title={buttonText} onPress={takeScreenshot} />
      </TouchableOpacity>

      {screenshotUri && (
        <Modal visible={true} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <Image source={{ uri: screenshotUri }} style={styles.screenshot} />
            <Button title="Share" onPress={shareScreenshot} />
            <Button title="Cancel" onPress={() => setScreenshotUri(null)} />
          </View>
        </Modal>
      )}
    </View>
  );
};



export default ShareableScreenshot;
