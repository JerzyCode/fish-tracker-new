export class UserRegisterRequest {
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;

    constructor(email: string, name: string, password: string) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
}

export enum ApiResponseType {
    USERNAME_TAKEN, SUCCESS, ERROR
}

export class ApiResponse {
    type: ApiResponseType | undefined;
    body: any | undefined

    constructor(status: number | undefined, body: any) {
        this.type = status;
        this.body = body;
    }
}