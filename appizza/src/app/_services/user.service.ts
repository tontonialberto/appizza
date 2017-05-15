import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class UserService {
    apiURL = "https://appizza.altervista.org/php/api/get_users.api.php";

    constructor(private http: Http) {}

    getUsers() {
        return this.http.post(this.apiURL, "")
            .map(
                (response) => {
                    const users = response.json();
                    return users.response;
                }
            ).share();
    }
}