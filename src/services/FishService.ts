import {ApiResponse, ApiResponseType} from "../shared/classes.ts";
import {SERVER_URL} from "../../App.tsx";
import {getUserToken} from "../contexts/AuthContext.tsx";
import {Platform} from "react-native";

export const getAllUserFishes = async (userId: string): Promise<ApiResponse> => {
    console.debug('getAllUserFishes(), userId=' + userId)

    const token = await getUserToken();
    if (!token) {
        console.error('No token found');
        return new ApiResponse(ApiResponseType.ERROR, null);
    }

    try {
        const response = await fetch(SERVER_URL + '/rest/api/fish?userId=' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            return new ApiResponse(ApiResponseType.SUCCESS, json)
        } else {
            return new ApiResponse(ApiResponseType.ERROR, undefined)
        }
    } catch (error) {
        console.error(error)
        return new ApiResponse(ApiResponseType.ERROR, undefined)
    }
}

export const getRandomFish = async (): Promise<ApiResponse> => {
    console.debug('getRandomFish()')

    const token = await getUserToken();
    if (!token) {
        console.error('No token found');
        return new ApiResponse(ApiResponseType.ERROR, null);
    }

    try {
        const response = await fetch(SERVER_URL + '/rest/api/fish/random', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            return new ApiResponse(ApiResponseType.SUCCESS, json)
        } else {
            return new ApiResponse(ApiResponseType.ERROR, undefined)
        }
    } catch (error) {
        console.error(error)
        return new ApiResponse(ApiResponseType.ERROR, undefined)
    }
}

export const getFishDetails = async (fishId: number): Promise<ApiResponse> => {
    console.debug('getFishDetails()')

    const token = await getUserToken();
    if (!token) {
        console.error('No token found');
        return new ApiResponse(ApiResponseType.ERROR, null);
    }

    try {
        const response = await fetch(SERVER_URL + '/rest/api/fish/' + fishId, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            return new ApiResponse(ApiResponseType.SUCCESS, json)
        } else {
            return new ApiResponse(ApiResponseType.ERROR, undefined)
        }
    } catch (error) {
        console.error(error)
        return new ApiResponse(ApiResponseType.ERROR, undefined)
    }
}


export const getFishImage = async (fishId: number): Promise<ApiResponse> => {
    console.debug('getFishImage(), fishId=' + fishId)

    const token = await getUserToken();
    if (!token) {
        console.error('No token found');
        return new ApiResponse(ApiResponseType.ERROR, null);
    }

    try {
        const response = await fetch(SERVER_URL + '/rest/api/fish/image/' + fishId, {
            method: 'GET',
            headers: {
                'Accept': 'image/jpeg',
                'Authorization': `Bearer ${token}`
            }
        });

        const body = await prepareImageUrl(response)

        if (response.ok) {
            return new ApiResponse(ApiResponseType.SUCCESS, body)
        } else {
            return new ApiResponse(ApiResponseType.ERROR, undefined)
        }
    } catch (error) {
        console.error(error)
        return new ApiResponse(ApiResponseType.ERROR, undefined)
    }
}

const prepareImageUrl = async (response: Response): Promise<string> => {
    const blob = await response.blob();
    let imageUrl

    if (Platform.OS === 'android') {
        imageUrl = await convertToFile(blob)
    } else {
        imageUrl = URL.createObjectURL(blob);
    }

    return imageUrl
}

const convertToFile = async (blob: any) => {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    })
}

export const deleteFish = async (fishId: number) => {
    console.debug('deleteFish(), fishId=' + fishId)
    const token = await getUserToken();
    if (!token) {
        console.error('No token found');
        return;
    }

    try {
        const response = await fetch(SERVER_URL + '/rest/api/fish/image/' + fishId, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            return new ApiResponse(ApiResponseType.SUCCESS, undefined)
        } else {
            return new ApiResponse(ApiResponseType.ERROR, undefined)
        }
    } catch (error) {
        console.error(error)
        return new ApiResponse(ApiResponseType.ERROR, undefined)
    }
}