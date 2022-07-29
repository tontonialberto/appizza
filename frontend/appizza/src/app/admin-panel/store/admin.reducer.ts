import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/_models/user.model"
import { selectUser } from "./admin.actions";

export interface State {
    users: User[];

    selectedUser: User;
}

const initialState: State = {
    users: [ new User('alboebasta', 'alboebasta@gmail.com', 's', 2, null, 'Alberto', 'Tontoni', null) ],
    selectedUser: null
}

export const adminReducer = createReducer(
    initialState,
    on(selectUser, (state, props: { username: string }) => {
        const selectedUser = state.users.find(u => u.username === props.username);

        if(selectedUser !== undefined) {
            return {
                ...state,
                selectedUser: selectedUser
            };
        }
        else {
            return {
                ...state,
                selectedUser: null
            };
        }
    })
);