
/* eslint-disable */
const debug = require('debug');
const serialport = require('serialport');
const usb = require('usb')
const { Printer } = require('escpos-print');
const { Network } = require('escpos-print/Adapters');
const escpos = require('escpos');

const log = debug('electron-react:main/printer');

class PrintManage {
  init(mainWindow) {
    log('init printer');

    const usbDeviceList = usb.getDeviceList();
    log('usbDeviceList => ', JSON.stringify(usbDeviceList));

    serialport.list((err, ports) => {
      log('ports => ', JSON.stringify(ports));
    });


    const adapter = new Network("192.168.64.208", 9100);
    log('adapter => ', JSON.stringify(adapter));
    new Printer(adapter).open()
      .then(response => {
        log('printer response => ', JSON.stringify(response));
      })
      .catch(error => {
        log('printer catch => ', JSON.stringify(error));
      })


    // Select the adapter based on your printer type
    const device  = new escpos.USB();
    // const device  = new escpos.Network('localhost');
    // const device  = new escpos.Serial('/dev/usb/lp0');
    log('escpos.USB() => ', JSON.stringify(device));
    const printer = new escpos.Printer(device);
    log('printer => ', JSON.stringify(printer));
  }
}

module.exports = new PrintManage();
