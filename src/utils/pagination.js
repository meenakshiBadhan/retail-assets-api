// Return pagination metadata
function pagination(pageNo, totalCount, limit) {
  return {
    currentPage: pageNo,
    from: totalCount > 0 ? (pageNo - 1) * limit + 1 : 0,
    lastPage: Math.ceil(totalCount / limit),
    perPage: limit,
    to: pageNo * limit > totalCount ? totalCount : pageNo * limit,
    total: totalCount,
  };
}

// Calculate offset and limit for pagination
function paginate(page, pageSize) {
  const offset = Number((page - 1) * pageSize);
  const limit = pageSize;

  return { offset, limit };
}

module.exports = { pagination, paginate };
