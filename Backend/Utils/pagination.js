const paginate = (conditions, query, searchable = []) => {
  let data = { ...conditions };

  const page = query.page;
  const size = query.size;
  const sort = query.sort;
  const search = query.search;

  if (size && page) {
    data.offset = page * size;
    data.limit = size;
  }

  if (sort) {
    const sortData = sort.split(",");
    data.order = sortData;
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
export default paginate;
