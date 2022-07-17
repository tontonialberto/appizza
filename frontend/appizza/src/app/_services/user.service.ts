import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable()
export class UserService {
    apiURL = "https://appizza.altervista.org/php/api/get_users.api.php";

    constructor(private http: HttpClient) {}

    getUsers() {
        return this.http.post(this.apiURL, "")
            .pipe(map((response: any) => response.response));
    }
}