import Axios from './Axios';
import Store from './Store';
import { scan } from 'rxjs/operators';
import * as types from '../history/types';

const History = (function(){
  Axios.eventStream
      .pipe(
          scan((prev, next) => {
              const { devices } = next;
              const prevDevices = prev.devices ;
              for (const device_type in devices) {
                if (prevDevices && devices) {
                    if (devices.hasOwnProperty(device_type) && prevDevices.hasOwnProperty(device_type)) {
                        const devices_group = devices[device_type];
                        const prev_devices_group = prevDevices[device_type];
                        for (const id in devices_group) {
                            const device = devices_group[id];
                            const prevDevice = prev_devices_group[id];
                            if (device && prevDevice) {
                                for (const prop in device) {
                                    if (device[prop] !== prevDevice[prop]) {
                                        Store.getInstance().dispatch({
                                            type: types.SET_HISTORY,
                                            payload: {
                                                prevValue: prevDevice[prop],
                                                nextValue: device[prop],
                                                type: prop,
                                                device_id: id
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
              }

              return next;
          }, Store.getInitialState())
      ).subscribe((data) => {

  });
}());

export default History;
