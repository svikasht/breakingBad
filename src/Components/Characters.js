import React, { useState, useEffect } from "react";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import CharacterCard from "./CharacterCard";
import axios from "axios";
import BreakingBadMenu from "./BreakingBadMenu";
import PaginationLink from "./Pagination";

const Characters = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [characterPerPage] = useState(12);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters`
      );

      setItems(result.data);
      setIsLoading(false);
    };

    fetchItems();
  }, []);

  const indexOfLastCharacter = currentPage * characterPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - characterPerPage;
  const currentCharacter = items.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <BreakingBadMenu />
      <Grid container spacing={2}>
        <Grid container alignItems="center" direction="row" justify="center">
          <Typography
            variant="h3"
            style={{
              margin: 10,
              padding: 0,
              alignItems: "center",
              borderSpacing: 0,
              border: `1 !solid`,
              direction: "row",
            }}
          >
            <img
              src="https://i.pinimg.com/originals/7d/37/1a/7d371a612ade3b88c283bdca5f37c762.png"
              alt=""
              style={{ height: "80px" }}
            />
          </Typography>
        </Grid>

        {currentCharacter.length > 0 ? (
          currentCharacter.map((item) => (
            <Grid item lg={3} md={3} sm={4} xs={6}>
              <CharacterCard
                key={item.char_id}
                name={item.name}
                portrayed={item.portrayed}
                image={item.img}
                isLoaded={isLoading}
              />
            </Grid>
          ))
        ) : (
          <Grid container alignItems="center" direction="row" justify="center">
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Typography
                variant="h6"
                style={{
                  margin: 10,
                  padding: 0,
                  alignItems: "center",
                  borderSpacing: 0,
                  border: `1 !solid`,
                  direction: "row",
                }}
              >
                No result to display
              </Typography>
            )}
          </Grid>
        )}
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container alignItems="center" direction="row" justify="center">
            <PaginationLink
              itemsPerPage={characterPerPage}
              totalItems={items.length}
              paginate={paginate}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Characters;
