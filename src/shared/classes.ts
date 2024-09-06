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

export class UserLoginRequest {
    email: string | undefined;
    password: string | undefined;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export enum ApiResponseType {
    USERNAME_TAKEN, SUCCESS, ERROR, INVALID_CREDENTIALS
}

export class ApiResponse {
    type: ApiResponseType | undefined;
    body: any | undefined

    constructor(status: number | undefined, body: any) {
        this.type = status;
        this.body = body;
    }
}