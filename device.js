'use strict';

import { Mqtt } from 'azure-iot-device-mqtt';
import azure from  'azure-iot-device';
const { Message, Client } = azure;

export function run(device) {
  const deviceClient = Client.fromConnectionString(device.connectionString, Mqtt);
  deviceClient.open(onConnect);

  setInterval(() => {
      const date = new Date();
      const data = JSON.stringify({
        "timestamp": date,
        "value" :  Number.parseFloat((Math.random() * (100 - 75 + 1)) + 75).toFixed(2)
      }
      );

      sendTelemetry(deviceClient, data).catch((err) => console.log('error ', err.toString()));

  }, 60000);
}

function onConnect(err) {
  if (err) {
    console.error('Could not connect: ' + err.message);
  } else {
    console.log('Connected to device. Registering handlers for methods.');
  }
}

async function sendTelemetry(deviceClient, data) {
  console.log('Sending telemetry message at %s', data.timestamp);

  const msg = new Message(data);
  msg.contentType = 'application/json';
  msg.contentEncoding = 'utf-8';

  await deviceClient.sendEvent(msg);
}
