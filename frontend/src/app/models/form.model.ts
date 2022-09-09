import { Cell } from "./cell.model";

export class Form {
    constructor(public matrix: number[][], public imgUrl: string, public x_world: number, public y_world: number) {}
}