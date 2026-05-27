interface PathsConfig {
  auth: {
    login: string;
  };
  main: {
    join: string;
  };
}

const routePaths: PathsConfig = {
  auth: {
    login: '/login',
  },
  main: {
    join: '/join',
  },
};

export default routePaths;
