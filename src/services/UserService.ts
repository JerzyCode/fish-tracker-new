import {ApiResponse, ApiResponseType, UserRegisterRequest} from "../shared/classes.ts";
import {SERVER_URL} from "../../App.tsx";

export const registerUser = async (registerRequest: UserRegisterRequest): Promise<ApiResponse> => {
    console.debug('registerUser(), registerRequest=' + JSON.stringify(registerRequest))
    try {
        const response = await fetch(SERVER_URL + '/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(registerRequest)
        });

        if (response.ok) {
            return new ApiResponse(ApiResponseType.SUCCESS, undefined)
        } else if (response.status === 400) {
            return new ApiResponse(ApiResponseType.USERNAME_TAKEN, undefined)
        } else {
            return new ApiResponse(ApiResponseType.ERROR, undefined)
        }

    } catch (error) {
        console.error(error)
        return new ApiResponse(ApiResponseType.ERROR, undefined)
    }
}