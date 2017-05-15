import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';

import { User } from "app/_models/user.model";
import { Observable } from "rxjs/Rx";

@Injectable()
export class SignupService {
    apiURL = "https://appizza.altervista.org/php/api/signup.api.php";

    constructor(private http: Http) {}
    
    insertUser(user: User) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        if(!user.classe) user.classe = "NO";
        if(!user.citta) user.citta = "NO";

        const body = 
            "username=" + user.username +
            "&password=" + user.password +
            "&email=" + user.email +
            "&userlevel=" + user.userlevel +
            "&classe=" + user.classe +
            "&nome=" + user.nome +
            "&cognome=" + user.cognome +
            "&citta=" + user.citta;
        
        console.log("SignupService.. Sending HTTP Request, Body: " + body);

        return this.http.post(this.apiURL, body, {headers: headers})
            .map(
                (response) => {
                    const result = response.json();
                    return result;
                }
            )
            .catch(
                (error) => {
                    return Observable.throw("Server Error");
                }
            ).share();
    }
}