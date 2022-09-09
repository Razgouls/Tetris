import { Injectable } from "@angular/core";
import { Form } from "src/app/models/form.model";

@Injectable({
    providedIn: 'root'
})

export class FormService {

    new_form!: Form;
    forms: Form[] = [
        {matrix: [[1, 0, 0], [1, 1, 1], [0, 0, 0]], imgUrl: './assets/dark_blue.png', x_world: 3, y_world: 0},
        {matrix: [[0, 0, 1], [1, 1, 1], [0, 0, 0]], imgUrl: './assets/orange.png', x_world: 3, y_world: 0},
        {matrix: [[1, 1], [1, 1]], imgUrl: './assets/yellow.png', x_world: 3, y_world: 0},
        {matrix: [[0, 1, 1], [1, 1, 0], [0, 0, 0]], imgUrl: './assets/green.png', x_world: 3, y_world: 0},
        {matrix: [[0, 1, 0], [1, 1, 1], [0, 0, 0]], imgUrl: './assets/purple.png', x_world: 3, y_world: 0},
        {matrix: [[1, 1, 0], [0, 1, 1], [0, 0, 0]], imgUrl: './assets/red.png', x_world: 3, y_world: 0},
        {matrix: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]], imgUrl: './assets/bright_blue.png', x_world: 3, y_world: 0},
    ];

    getRandomInt(max: number) {
        return (Math.floor(Math.random() * max));
      }

    getAllForms(): Form[] {
        return (this.forms);
    }

    rotation(form: Form): void {
      let n = form.matrix.length;
      for (let i = 0; i < n; i++)
      {
          for (let j = 0; j < i; j++) {
              [form.matrix[i][j], form.matrix[j][i]] = [form.matrix[j][i], form.matrix[i][j]];
          }
      }
      for (let i = 0; i < n; i++)
      {
          for (let j = 0; j < n / 2; j++) {
              [form.matrix[i][j], form.matrix[i][n - j - 1]] = [form.matrix[i][n - j - 1], form.matrix[i][j]];
          }
      }
  }

  createForm(): Form {
      const index = this.getRandomInt(7);
      // const index = 6;
      this.new_form = new Form(this.forms[index].matrix, this.forms[index].imgUrl, this.forms[index].x_world, this.forms[index].y_world);

      return (this.new_form);
  }

  maxXMatrix(form: Form): number {
    let n = form.matrix.length;
    let i = -1
    let res: number = 0;
    while (++i < n)
    {
      let j = -1;
      while (++j < form.matrix[i].length)
      {
        if (form.matrix[i][j] === 1)
        {
          if (j > res)
            res = j;
        }
      }
    }
    return (res);
  }
}