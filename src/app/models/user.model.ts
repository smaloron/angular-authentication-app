export interface UserDataInterface {
    userName: string;
    login: string;
}

export interface UserInterface extends UserDataInterface {
    password?: string;
    isAuthenticated?: boolean;
    greet(): string;
}

export class User implements UserInterface {
    userName: string = 'Anonyme';
    login: string = '';
    password?: string | undefined;
    isAuthenticated?: boolean | undefined = false;

    constructor(user: UserDataInterface | null = null) {
        if (user) {
            this.userName = user.userName;
            this.login = user.login;
            this.isAuthenticated = true;
        }
    }

    greet(): string {
        return `Hello ${this.userName}`;
    }

}