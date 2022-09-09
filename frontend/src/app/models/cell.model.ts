export class Cell {
    constructor(
        public imgUrl: string,
        public blocked: boolean,
        public value: string,
        public x_world: number,
        public y_world: number,
        public place: "COIN" | "MILIEU" | "CENTRE" | "OTHER",
    ) {}
}