import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

import { LoginData } from "app/_models/login-data.model";

@Injectable()
export class LoginService {
    apiURL = "https://appizza.altervista.org/php/api/login_verify.api.php";

    constructor(private http: Http) {}

    login(loginData:  LoginData) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        const body = 
            "username=" + loginData.username +
            "&password=" + loginData.password;
        
        console.log("LoginService.. Sending HTTP Request, Body: " + body);
        
        return this.http.post(this.apiURL, body, {headers: headers})
            .map(response => {
                const jsonResult = response.json();
                
                if(jsonResult.token) {
                    localStorage.setItem("currentUser", jsonResult.token);
                    return true;   
                }
                else {
                    return false;
                }
            })
            .share();
    }
}