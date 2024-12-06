import {Node} from "./node";
import {State} from "./state";
import {Primitive} from "./primitive";

export class SearchState<S extends Primitive | State> {

    constructor(public frontier: Node<unknown>[] = [], public explored: S[] = [], public solution?: Node<unknown>) {
    }
}