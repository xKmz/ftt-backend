import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteProjectUseCase } from "./DeleteProjectUseCase";

class DeleteProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProjectUseCase = container.resolve(DeleteProjectUseCase);

    await deleteProjectUseCase.execute({ id });

    return response.status(201).send();
  }
}

export { DeleteProjectController };
