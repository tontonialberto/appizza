import { createAction, props } from "@ngrx/store";
import { User } from "src/app/_models/user.model";

export const selectUser = createAction('[ADMIN PANEL] Select User', props<{username: string}>());

export const createUser = createAction('[ADMIN PANEL] Create User', props<User>());