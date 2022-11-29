import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import data from "./data.json";
import { CancelPresentation } from "@mui/icons-material";
export const JobsListing = () => {
  const [filters, setFilters] = useState(new Set());
  const [filteredData, setFilteredData] = useState(new Set());
  const [resData, setResData] = useState<any[]>([]);
  useEffect(() => {
    let tempFilteredData = new Set();
    data.map((d) => {
      let temp: any[] = [];
      temp.unshift(d.role);
      temp.unshift(d.level);
      d.languages.map((t) => temp.unshift(t));
      d.tools.map((t) => temp.unshift(t));
      var check: boolean = temp.some((i) => Array.from(filters).includes(i));
      if (check) {
        tempFilteredData.add(d);
      }
    });
    setFilteredData(tempFilteredData);
  }, [filters]);

  const onClick = (event: string) => {
    setFilters((prev) => new Set(prev).add(event));
  };

  const onRemove = (event: string) => {
    let tempSet = filters;
    tempSet.delete(event);
    setFilters(new Set(tempSet));
  };

  const onClear = () => {
    setFilters(new Set());
  };

  useEffect(() => {
    if (filteredData.size > 0) {
      setResData(Array.from(filteredData));
    } else {
      setResData(data);
    }
  }, [filteredData, data, filters]);

  return (
    <div style={{ backgroundColor: "hsl(180, 52%, 96%)" }}>
      <Box sx={{ backgroundColor: "hsl(180, 29%, 50%)", overflow: "hidden" }}>
        <img src="images/bg-header-desktop.svg" />
      </Box>
      <Box>
        {filters.size > 0 ? (
          <Box
            sx={{
              backgroundColor: "white",
              margin: "-1.5em 6em 1em 6em",
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              {Array.from(filters).map((f: any) => {
                return (
                  <Box sx={{ display: "flex" }}>
                    <span
                      style={{
                        color: "hsl(180, 29%, 50%)",
                        fontWeight: "500",
                        fontSize: "13px",
                        backgroundColor: "hsl(180, 31%, 95%)",
                        padding: "0.5em",
                        margin: "1em 0em 1em 1em",
                        borderRadius: "0.5em",
                      }}
                    >
                      {f}
                    </span>
                    <span
                      style={{ alignSelf: "center" }}
                      onClick={() => onRemove(f)}
                    >
                      <CancelPresentation
                        fontSize="large"
                        fill="hsl(180, 29%, 50%)"
                        sx={{ "&:hover": { color: "black" }, color: "#0097a7" }}
                      />{" "}
                    </span>
                  </Box>
                );
              })}
            </Box>
            <Box
              sx={{
                alignSelf: "center",
                margin: "1em",
                color: "#0097a7",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => {
                onClear();
              }}
            >
              Clear
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: { md: "2em 6em 2em 6em", xs: "0em" },
        }}
      >
        {resData.map((d) => {
          const keywords: string[] = d.role.split(" ");
          return (
            <Box
              component={Grid}
              container
              spacing={4}
              sx={{
                margin: "1em",
                display: "flex",
                padding: "0.5em",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                backgroundColor: { md: "white" },
                borderRadius: "0.5em",
              }}
            >
              <Grid
                item
                md={1}
                xs={9}
                sx={{
                  alignSelf: { md: "center", xs: "left" },
                  marginLeft: { xs: "1em" },
                  paddingTop: { md: "10px !important" },
                  position: { xs: "relative" },
                  marginBottom: { xs: "-2em", md: "2px" },
                }}
              >
                <img src={d.logo} width="60" height="60" />
              </Grid>
              <Grid
                item
                md={5.5}
                xs={9}
                sx={{
                  marginLeft: "1em",
                  paddingTop: { md: "10px !important" },
                  backgroundColor: { xs: "white" },
                }}
              >
                <div>
                  <span
                    style={{
                      color: "#0097a7",
                      fontWeight: "700",
                      fontSize: "13px",
                    }}
                  >
                    {d.company}{" "}
                  </span>
                  <span>
                    {d.new ? (
                      <span
                        style={{
                          backgroundColor: "#0097a7",
                          color: "white",
                          borderRadius: "1em",
                          fontSize: "13px",
                          margin: "2px",
                          padding: "3px",
                          fontWeight:"500"
                        }}
                      >
                        NEW!
                      </span>
                    ) : (
                      ""
                    )}{" "}
                  </span>
                  <span>{d.featured ? <span
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "1em",
                    fontSize: "13px",
                    margin: "2px",
                    padding: "3px",
                    fontWeight:"500"
                  }} 
                  >FEATURED</span> : ""}</span>
                </div>
                <Box sx={{fontWeight:"700", "&:hover":{color: "#0097a7"}}} >{d.position}</Box>
                <div>
                  <span style={{fontSize:"11px", color:"gray"}}>{d.postedAt} </span>.
                  <span style={{fontSize:"11px", color:"gray"}}> {d.contract} </span>.
                  <span style={{fontSize:"11px", color:"gray"}}> {d.location}</span>
                </div>
                <Box
                  item
                  component={Grid}
                  xs={9}
                  sx={{
                    paddingTop: { xs: "10px", md: "10px !important" },
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <hr></hr>
                </Box>
              </Grid>
              <Box
                component={Grid}
                item
                md={4}
                xs={9}
                sx={{
                  alignItems: { md: "flex-end", xs: "left" },
                  marginLeft: { xs: "1em" },
                  paddingTop: { xs: "10px !important", md: "10px !important" },
                  paddingBottom: { xs: "10px" },
                  backgroundColor: { xs: "white" },
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  textAlign: { xs: "center" },
                }}
              >
                <Box>
                  <Box
                    sx={{
                      color: "hsl(180, 29%, 50%)",
                      fontWeight: "500",
                      fontSize: "13px",
                      backgroundColor: "hsl(180, 31%, 95%)",
                      padding: "0.5em",
                      borderRadius: "0.5em",
                      margin: "0.5em",
                      "&:hover":{color:"white", backgroundColor:"#0097a7"}
                    }}
                    onClick={() => onClick(d.role)}
                  >
                    {d.role}
                  </Box>
                  <span> </span>
                </Box>

                <Box>
                  <Box
                    sx={{
                      color: "hsl(180, 29%, 50%)",
                      fontWeight: "500",
                      fontSize: "13px",
                      backgroundColor: "hsl(180, 31%, 95%)",
                      padding: "0.5em",
                      borderRadius: "0.5em",
                      margin: "0.5em",
                      "&:hover":{color:"white", backgroundColor:"#0097a7"}
                    }}
                    onClick={() => onClick(d.level)}
                  >
                    {d.level}
                  </Box>
                  <span> </span>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    textAlign: { xs: "center" },
                  }}
                >
                  {d.languages.map((lang: any) => {
                    return (
                      <>
                        <Box
                          sx={{
                            color: "hsl(180, 29%, 50%)",
                            fontWeight: "500",
                            fontSize: "13px",
                            backgroundColor: "hsl(180, 31%, 95%)",
                            padding: "0.5em",
                            borderRadius: "0.5em",
                            margin: "0.5em",
                            "&:hover":{color:"white", backgroundColor:"#0097a7"}
                          }}
                          onClick={() => onClick(lang)}
                        >
                          {lang}
                        </Box>
                        <span> </span>
                      </>
                    );
                  })}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    textAlign: { xs: "center" },
                  }}
                >
                  {d.tools.map((tool: any) => {
                    return (
                      <>
                        <Box
                          sx={{
                            color: "hsl(180, 29%, 50%)",
                            fontWeight: "500",
                            fontSize: "13px",
                            backgroundColor: "hsl(180, 31%, 95%)",
                            padding: "0.5em",
                            borderRadius: "0.5em",
                            margin: "0.5em",
                            "&:hover":{color:"white", backgroundColor:"#0097a7"}
                          }}
                          onClick={() => onClick(tool)}
                        >
                          {tool}
                        </Box>
                        <span> </span>
                      </>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </div>
  );
};
