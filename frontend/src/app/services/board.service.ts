import { Injectable } from "@angular/core";
import { Cell } from "src/app/models/cell.model";
import { Form } from "src/app/models/form.model";
import { Board } from "../models/board.model";
import { FormService } from "./form.service";

@Injectable({
    providedIn: 'root'
})

export class BoardService {

    constructor(private formService: FormService) {}

    link: string = './assets/black.png'
    activeForm!: Form;
    nextForm!: Form;

    boards = new Array<Board>();

    addBoard(board: Board): void {
        this.boards.push(board);
    }

    placedForm(index: number, form: Form, color?: string): void {
        let i = form.matrix.length;
        while (--i >= 0)
        {
            let j = -1;
            while (++j < form.matrix[i].length)
            {
                if (form.matrix[i][j] && color != undefined)
                    this.boards[index].cells[form.y_world + i][form.x_world + j].imgUrl = color;
                else if (form.matrix[i][j])
                this.boards[index].cells[form.y_world + i][form.x_world + j].imgUrl = form.imgUrl;
            }
        }
    }

    newForm(index: number): void {
        if (index === 0) {
            this.activeForm = this.formService.createForm();
            this.placedForm(index, this.activeForm);
        }
        else {
            this.nextForm = this.formService.createForm();
            this.nextForm.x_world = 2;
            this.nextForm.y_world = 1;
            this.placedForm(index, this.nextForm);
        }
    }

    handleNewForm(index: number): void {
        this.deleteLines(index);
        this.majSpectre();
        this.activeForm = JSON.parse(JSON.stringify(this.nextForm));
        this.activeForm.x_world = 3;
        this.activeForm.y_world = 0;
        this.placedForm(0, this.activeForm);
        this.placedForm(1, this.nextForm, "./assets/black.png");
        this.newForm(1)
    }

    downForm(index: number): boolean {
        if (this.getAllCheckCellsDown(index))
        {
            this.placedForm(index, this.activeForm, "./assets/black.png");
            this.activeForm.y_world += 1;
            this.placedForm(index, this.activeForm);
            return (true);
        }
        return (false);
    }

    directionForm(index: number, sens: "LEFT" | "RIGHT"): void {
        if ((sens === "LEFT" && this.getAllCheckCellsLeft(index)) || (sens === "RIGHT" && this.getAllCheckCellsRight(index)))
        {
            this.placedForm(index, this.activeForm, "./assets/black.png");
            sens === "LEFT" ? this.activeForm.x_world-- : this.activeForm.x_world++
            this.placedForm(index, this.activeForm);
        }
    }

    rotationForm(index: number): void {
        let activeFormTmp = JSON.parse(JSON.stringify(this.activeForm));

        this.placedForm(index, this.activeForm, "./assets/black.png");
        this.formService.rotation(activeFormTmp);
        const max_x = this.formService.maxXMatrix(activeFormTmp);

        if (activeFormTmp.x_world >= 0 && activeFormTmp.x_world + max_x < 10 && this.checkOverload(index, activeFormTmp))
            this.activeForm = activeFormTmp;
        this.placedForm(index, this.activeForm);
    }

    getActiveForm(): Form {
        return (this.activeForm);
    }
    

    getAllCheckCellsDown(index: number): boolean {
        let j = -1;
        while (++j < this.activeForm.matrix.length)
        {
            let i = -1;
            let len = this.activeForm.matrix[j].length;
            while (++i < len)
            {
                if ((i + 1 >= len || (i + 1 < len && !this.activeForm.matrix[i + 1][j])) && this.activeForm.matrix[i][j])
                {
                    if (this.activeForm.y_world + i + 1 > 19)
                        return (false);
                    if (this.boards[index].cells[this.activeForm.y_world + i + 1][this.activeForm.x_world + j].imgUrl !== "./assets/black.png")
                        return (false);
                }
            }
        }
        return (true);
    }

    getAllCheckCellsRight(index: number): boolean {
        let j = -1;
        while (++j < this.activeForm.matrix.length)
        {
            let i = -1;
            let len = this.activeForm.matrix[j].length;
            while (++i < len)
            {
                if ((i + 1 >= len || (i + 1 < len && !this.activeForm.matrix[j][i + 1])) && this.activeForm.matrix[j][i])
                {
                    if (this.activeForm.x_world + i + 1 > 9)
                        return (false);
                    if (this.boards[index].cells[this.activeForm.y_world + j][this.activeForm.x_world + i + 1].imgUrl != "./assets/black.png")
                        return (false);
                }
            }
        }
        return (true);
    }

    getAllCheckCellsLeft(index: number): boolean {
        let j = -1;
        while (++j < this.activeForm.matrix.length)
        {
            let i = this.activeForm.matrix[j].length;
            while (--i >= 0)
            {
                if ((i - 1 < 0 || (i - 1 >= 0 && !this.activeForm.matrix[j][i - 1])) && this.activeForm.matrix[j][i])
                {
                    if (this.activeForm.x_world + i - 1 < 0)
                        return (false);
                    if (this.boards[index].cells[this.activeForm.y_world + j][this.activeForm.x_world + i - 1].imgUrl != "./assets/black.png")
                        return (false);
                }
            }
        }
        return (true);
    }

    checkDeleteLine(index: number): number[] {
        let lines = new Array<number>();
        let i = -1;
        while (++i < 20)
        {
            let count = 0;
            let j = -1;
            while (++j < 10)
            {
                if (this.boards[index].cells[i][j].imgUrl !== "./assets/black.png")
                    count++;
            }
            if (count === 10)
                lines.push(i);
        }
        return (lines);
    }

    deleteLines(index: number): void {
        let lines = this.checkDeleteLine(index);
        lines.map(line => {
            let i = -1;
            while (++i < 10)
                this.boards[index].cells[line][i] = new Cell("./assets/black.png", false, "NORMAL", i, line, "OTHER");
            i = line;
            while (--i >= 0)
            {
                let j = -1;
                while (++j < 10)
                this.boards[index].cells[i + 1][j] = this.boards[index].cells[i][j];
            }
            i = -1;
            while (++i < 10)
                this.boards[index].cells[0][i] = new Cell("./assets/black.png", false, "NORMAL", i, 0, "OTHER");
        })
    }

    checkOverload(index: number, form: Form): boolean {
        let j = -1;
        while (++j < form.matrix.length)
        {
            let i = -1;
            let len = form.matrix[j].length;
            while (++i < len)
            {
                if (form.matrix[i][j])
                {
                    if (form.y_world + i > 19)
                        return (false);
                    if (this.boards[index].cells[form.y_world + i][form.x_world + j].imgUrl != "./assets/black.png")
                        return (false);
                }
            }
        }
        return (true);
    }

    checkGameOver(index: number): boolean {
        if (this.getAllCheckCellsDown(0))
            return (false);
        let i = -1;
        while (++i < this.activeForm.matrix.length)
        {
            let j = -1;
            while (++j < this.activeForm.matrix[i].length)
            {
                if (this.boards[index].cells[i][j + this.activeForm.matrix[i].length].imgUrl !== "./assets/black.png")
                    return (true);
            }
        }
        return (false);
    }

    majSpectre(): void {
        let i = -1;
        while (++i < 10)
        {
            let j = -1;
            let full = false;
            while (++j < 20)
            {
                if (this.boards[0].cells[j][i].imgUrl !== "./assets/black.png")
                {
                    full = true;
                    this.boards[2].cells[j][i].imgUrl = "./assets/orange.png";
                }
                else if (full)
                    this.boards[2].cells[j][i].imgUrl = "./assets/orange.png";
                else
                    this.boards[2].cells[j][i].imgUrl = "./assets/black.png";
            }
        }
    }

    resetBoards(): void {
        this.boards = [];
    }
}