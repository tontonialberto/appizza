import { createAction, props } from "@ngrx/store";

export const selectUser = createAction('[ADMIN PANEL] Select User', props<{username: string}>());