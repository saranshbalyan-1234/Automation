const paginate = (conditions, query, searchable = []) => {
  let data = { ...conditions };

  const page = query.page;
  const size = query.size;
  const sort = query.sort;
  const search = query.search;

  if (size && page) {
    data.offset = parseInt(page * size);
    data.limit = parseInt(size);
  }

  if (sort) {
    const sortData = sort.split(",");
    data.order = [sortData];
  }
  if (searchable.length && search) {
    searchable.forEach((el) => {
      data.where[el] = {
        [Op.like]: `%${search}%`,
      };
    });
  }
  return data;
};
const pageInfo = (info, query) => {
  const data = info.rows;
  const currentPage = parseInt(query.page);
  const size = parseInt(query.size);
  const totalElements = parseInt(info.count);
  let pageDetails = {
    data: data,
    totalElements,
    currentPage: 1,
    size: totalElements,
    totalPages: 1,
    pagination: false,
    sort: {
      sorted: false,
    },
  };

  if (currentPage && size) {
    pageDetails.currentPage = currentPage;
    pageDetails.totalPages = Math.ceil(info.count / size);
    pageDetails.size = size;
    pageDetails.pagination = true;
  }

  return pageDetails;
};
export { paginate, pageInfo };
