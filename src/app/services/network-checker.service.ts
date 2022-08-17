import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root',
})
export class NetworkCheckerService {
  onlineIndicator: boolean;
  constructor() {}

  async openCheckNetwork() {
    Network.addListener('networkStatusChange', (status) => {
      console.log('Network status changed', status);
      this.onlineIndicator = status.connected;
    });
  }

  async logNetworkState() {
    const status = await Network.getStatus();

    console.log('Network status:', status);
    this.onlineIndicator = status.connected;
  }
}