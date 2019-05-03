import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { WebView } from "react-native-webview";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

/* set Enums for direction: RN or WV*/
const direction = {
  RN: 'reactNative',
  WV: 'webView'
}

/* set Enums for operations with key: read or write*/
const keyOps = {
  READ: 'read',
  WRITE: 'write',
  DELETE: 'delete'
}

type Props = {};
export default class App extends Component<Props> {

  /**
   * function for bridging data between ReactNative with WebView
   * @param {String} destination
   * @param {Object} data
   * @returns {null}*/
    bridge(destination, data){
      switch (destination) {
        case direction.RN:
          this.sendDataToReactNative(data);
          break;
        case direction.WV:
          this.sendDataToWebView(data);
          break;
        default:
          console.log("Please, set the right direction");
      }
    };

    /**
     * sent Data to ReactNative
     * @param {Object} data
     * @returns {null}*/
    sendDataToReactNative(data){
      if (Platform.OS === 'ios') {
        DocumentPicker.show({
              filetype: [DocumentPickerUtil.allFiles()],
            },(error,res) => {
              // Android
              console.log(
                 res.uri,
                 res.type, // mime type
                 res.fileName,
                 res.fileSize
              );
            });
      } else {
        console.log(data);
      }
    };

    /**
     * sent Data to WebView
     * @param {Object} data
     * @returns {null}*/
    sendDataToWebView(data){
        console.log(data);
        const rn = `
          document.body.style.backgroundColor = 'white';
          document.getElementById('lastName').value = ` + '22222' + `;
          document.getElementById('lastName').dispatchEvent(new Event('input'));
        `;

        setTimeout(() => {
          console.log("run injection");
          this.webref.injectJavaScript(rn);
        }, 3000);
        console.log("injection");
    };



    /* function for render WebView */
    render() {
      const run = `
        document.body.style.backgroundColor = 'green';
        document.getElementById('lastName').value = ` + '22e222' + `;
        document.getElementById('lastName').dispatchEvent(new Event('input'));
      `;

      setTimeout(() => {
        console.log("run injection");
        this.webref.injectJavaScript(run);
      }, 3000);



      return (
        <WebView
          ref={r => (this.webref = r)}
          source={{ uri: "http://10.8.24.203:8888/" }}
          onMessage={event => {
            alert(event.nativeEvent.data);
            this.bridge(direction.WV, event.nativeEvent.data);
            this.bridge(direction.RN, event.nativeEvent.data);
          }}
        />
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
