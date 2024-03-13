import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { default as devices } from "./devices.json";
import { of } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(private http: HttpClient) {}
    getDevices() {
        // return of(devices);
        return this.http.get('app/devices.json');
    }
}