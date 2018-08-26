import Axios from './Axios';
import Store from './Store';
import { scan } from 'rxjs/operators';


const History = (function(){
  Axios.eventStream
      .pipe(
          scan((prev, next) => {
              const { devices } = next;
              const prevDevices = prev.devices;
              console.log(next, prev);
              for (const device_type in devices) {
                  if (devices.hasOwnProperty(device_type) && prevDevices.hasOwnProperty(device_type)) {
                      const devices_group = devices[device_type];
                      const prev_devices_group = prevDevices[device_type];
                      for (const id in devices_group) {
                          const device = devices_group[id];
                          const prevDevice = prev_devices_group[id];
                          if (device && prevDevice) {
                              for (const prop in device) {
                                  if (device[prop] !== prevDevice[prop]) {
                                      console.log(device[prop], prevDevice[prop]);
                                  }
                              }
                          }
                      }
                  }
              }
          }, {})
      ).subscribe((data) => {

  });
}());

export default History;
