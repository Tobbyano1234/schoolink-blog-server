export const pagination = (page = 1, limit = 5) => ({skip: (page <= 1) ? 0 : (page - 1) * limit, limit });

/**
 * @meaning 
 * - Traditional pagination assumes static data as we iterate from page to page. The downside is the lack of consistency in the view as new data is added or removed from the collection.
 * - Live pagination, on the other hand, is adaptable to additions while on any page.
 */
export const livePagination = (noOfNewRecords: number, page = 1, limit = 30) => (
  {skip: (page <= 1) ? 0 + noOfNewRecords : ((page - 1) * limit ) + noOfNewRecords, limit}
);
