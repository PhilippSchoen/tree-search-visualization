export interface State {
    equals(state: State): boolean;

    toString(): string;
}