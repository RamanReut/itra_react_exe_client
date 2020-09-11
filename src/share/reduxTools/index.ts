export class RootSelector<T> {
    protected _state: T;

    constructor(state: T) {
        this._state = state;
    }
}
