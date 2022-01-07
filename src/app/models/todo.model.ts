export interface TodoDTOInterface  {
    id?: number;
    taskName: string;
    done: boolean;
    user: string
}


export class Todo implements TodoDTOInterface{
    id: number | undefined;
    taskName: string = '';
    done: boolean = false;
    user: string = '';

    constructor(data: TodoDTOInterface | null = null) {
        if (data) {
            this.taskName = data.taskName;
            this.done = data.done;
            this.user = data.user;
            this.id = data.id || new Date().getTime();
        }
    }
}