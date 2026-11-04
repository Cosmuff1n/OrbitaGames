// Jasmine define los casos; Karma abre Chrome y reúne los resultados y la cobertura.
module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: [".tests/bundle.js"],
    reporters: ["progress", "coverage"],
    coverageReporter: {
      dir: "coverage",
      reporters: [
        { type: "html", subdir: "html" },
        { type: "json-summary", subdir: ".", file: "summary.json" },
        { type: "text-summary" },
      ],
    },
    browsers: [process.env.CI ? "ChromeHeadlessCI" : "ChromeHeadless"],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-dev-shm-usage"],
      },
    },
    client: { clearContext: false, jasmine: { random: false } },
    singleRun: true,
    browserNoActivityTimeout: 30000,
  });
};
