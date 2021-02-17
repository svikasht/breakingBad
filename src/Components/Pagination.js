import React, { useEffect, useState } from "react";
import { MemoryRouter, Route } from "react-router";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

export default function PaginationLink({ paginate, totalItems, itemsPerPage }) {
  const [pageNum, setPageNumber] = useState(1);
  useEffect(() => {
    paginate(pageNum);
  }, [pageNum]);
  return (
    <MemoryRouter initialEntries={["/inbox"]} initialIndex={0}>
      <Route>
        {({ location }) => {
          const query = new URLSearchParams(location.search);
          const page = parseInt(query.get("page") || "1", 10);
          setPageNumber(page);
          return (
            <Pagination
              page={page}
              count={Math.ceil(totalItems / itemsPerPage)}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/inbox${item.page === 1 ? "" : `?page=${item.page}`}`}
                  {...item}
                />
              )}
            />
          );
        }}
      </Route>
    </MemoryRouter>
  );
}
