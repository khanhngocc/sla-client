import { put, call } from "redux-saga/effects";
import { registerUserService} from "../services/authenticationService";

import * as types from "../actions";

export function* registerSaga(payload: any) {
    try {   
        const response: Response = yield call(registerUserService, payload);
        yield [
            put({ type: types.REGISTER_USER_SUCCESS, response })
        ];
    } catch(error) {
        yield put({ type: types.REGISTER_USER_ERROR, error });
    }
}