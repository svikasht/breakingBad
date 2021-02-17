import React, { useState, useEffect } from "react";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import EpisodeCard from "./EpisodeCard";
import axios from "axios";
import BreakingBadMenu from "./BreakingBadMenu";
import PaginationLink from "./Pagination";

const Episodes = () => {
  const [items, setItmes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [episodePerPage] = useState(12);

  const getEpisodesData = async (pageNumber) => {
    const resEpi = await axios(`https://www.breakingbadapi.com/api/episodes`);
    return resEpi.data;
  };
  const getCharacterDtata = async (pageNumber) => {
    const resChar = await axios(
      `https://www.breakingbadapi.com/api/characters`
    );
    return resChar.data;
  };

  const fetchData = async () => {
    const [episodes, character] = await Promise.all([
      getEpisodesData(),
      getCharacterDtata(),
    ]);
    let both = [];

    both = episodes.map((e) => {
      if (character.find((f) => e.characters.includes(f.name))) {
        const obj = character.find((f) => e.characters.includes(f.name));
        return { ...e, img: obj.img };
      }
      return e;
    });

    setItmes(both);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastEpisode = currentPage * episodePerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodePerPage;
  const currentEpisode = items.slice(indexOfFirstEpisode, indexOfLastEpisode);

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

        {currentEpisode.length > 0 ? (
          currentEpisode.map((item) => (
            <Grid item lg={3} md={3} sm={4} xs={6}>
              <EpisodeCard
                key={item.episode_id}
                title={item.title}
                season={item.season}
                airDate={item.air_date}
                image={item.img}
                episode={item.episode}
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
              itemsPerPage={episodePerPage}
              totalItems={items.length}
              paginate={paginate}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Episodes;
