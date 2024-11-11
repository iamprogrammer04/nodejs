import { Model, PipelineStage } from 'mongoose';

interface Pagination {
  limit?: number;
  offset?: number;
}

interface PaginatedResult<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  offset: number;
  page: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

/**
 * Generic pagination function for any Mongoose model.
 * @param model - The Mongoose model (e.g., Role, User, etc.)
 * @param pipeline - MongoDB aggregation pipeline
 * @param pagination - Pagination details (e.g., { limit: 10, offset: 0 })
 * @param projections - Optional projection stage for MongoDB aggregation
 * @returns - Paginated results and metadata
 */
async function paginator<T>(
  model: Model<T>,
  pipeline: PipelineStage[],
  pagination: Pagination,
  projections?: PipelineStage,
): Promise<PaginatedResult<T>> {
  let { offset, limit } = pagination;

  limit = limit && limit > 0 ? limit : 10;
  offset = offset && offset >= 0 ? offset : 0;

  const totalDocsPipeline = [...pipeline];
  totalDocsPipeline.push({ $count: 'totalDocs' });

  const countResults = await model.aggregate(totalDocsPipeline);
  const totalDocs = countResults[0]?.totalDocs || 0;

  if (offset >= 0) {
    pipeline.push({ $skip: offset });
  }

  if (limit > 0) {
    pipeline.push({ $limit: limit });
  }

  if (projections) {
    pipeline.push(projections);
  }

  const docs = await model.aggregate<T>(pipeline);

  const totalPages = Math.ceil(totalDocs / limit);
  const currentPage = Math.floor(offset / limit) + 1;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return {
    docs,
    totalDocs,
    limit,
    offset,
    page: currentPage,
    totalPages,
    hasPrevPage,
    hasNextPage,
    prevPage: hasPrevPage ? currentPage - 1 : null,
    nextPage: hasNextPage ? currentPage + 1 : null,
  };
}

export const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

export default paginator;
