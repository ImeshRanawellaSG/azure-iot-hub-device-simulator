import inquirer from 'inquirer';
import fs from 'fs'
import { run } from './device.js'

// Step 1: Read the config.json file
const devices = JSON.parse(fs.readFileSync('config.json', 'utf8')).devices;

// Step 2: Display the list of devices and ask the user to select one
const questions = [
  {
    type: 'list', // Change to 'list' to allow only one selection
    name: 'selectedDevice',
    message: 'Select the device you want to use:',
    choices: devices.map((device, index) => ({
      name: `${index + 1}. ${device.deviceId} (${device.deviceType})`,
      value: device,
    })),
  }
];

// Step 3: Process the user's selection
inquirer.prompt(questions).then((answers) => {
  const device = answers.selectedDevice;
  console.log('You have selected the following device:');
  console.log(`- Device ID: ${device.deviceId}, Type: ${device.deviceType}, Connection String: ${device.connectionString}`);

  run(device);
});
