import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { WebView } from "react-native-webview";

/* set Enums for direction: RN or WV*/
const direction = {
  RN: 'reactNative',
  WV: 'webView'
}

type Props = {};

export default class App extends Component<Props> {

    /* function for communicate RN <> WebView
      direction - const: RN or WV
      data - transfered data */
    bridge(direction, data){
      console.log(direction);
      console.log(data);
    };


    sendMessageToSite(){
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
            this.sendMessageToSite();
            var data = event.nativeEvent.data;
            this.bridge(direction.RN, data);
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
