import { Request, Response } from "express";
import { container } from "tsyringe";

import { FinishTaskUseCase } from "./FinishTaskUseCase";

class FinishTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTaskUseCase = container.resolve(FinishTaskUseCase);

    await deleteTaskUseCase.execute({ id });

    return response.status(201).send();
  }
}

export { FinishTaskController };
