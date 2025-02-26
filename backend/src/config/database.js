module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "secret",
  database: "gestao-estoque",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
