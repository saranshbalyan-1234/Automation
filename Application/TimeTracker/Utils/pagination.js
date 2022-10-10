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
const pageInfo = (info, query, searched = false) => {
  const data = info.rows;
  const currentPage = parseInt(query.page);
  const size = parseInt(query.size);
  const totalElements = parseInt(info.count);
  const sort = query.sort;
  const search = query.search;
  let pageDetails = {
    data: data,
    page: {
      pagination: false,
      totalElements,
      currentPage: 1,
      size: totalElements,
      totalPages: 1,
    },
    sort: { sorted: false, sortBy: null, sortedBy: null },
    search: { searched: false, searchedBy: null },
  };

  if (currentPage && size) {
    pageDetails.page.currentPage = currentPage;
    pageDetails.page.totalPages = Math.ceil(info.count / size);
    pageDetails.page.size = size;
    pageDetails.page.pagination = true;
  }
  if (sort) {
    pageDetails.sort.sorted = true;
    pageDetails.sort.sortedBy = sort.split(",")[0];
    pageDetails.sort.sortBy = sort.split(",")[1];
  }
  if (searched && search) {
    pageDetails.search.searched = true;
    pageDetails.search.searchedBy = search;
  }
  return pageDetails;
};
export { paginate, pageInfo };
