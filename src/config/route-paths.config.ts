interface PathsConfig {
  base: string;
  main: {
    join: string;
  };
}

const routePaths: PathsConfig = {
  base: "/",
  main: {
    join: '/join',
  },
};

export default routePaths;
