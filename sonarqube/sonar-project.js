const sonarqubeScanner = require("sonarqube-scanner");

sonarqubeScanner(
  {
    serverUrl: "https://sqcorporate.deltatre.com/",
    token: "__YOUR_TOKEN__",
    options: {
      "sonar.branch.name": "__YOUR_SOURCE_BRANCH__",
      "sonar.projectVersion": "__YOUR_VERSION__",
      "sonar.projectKey": "__YOUR_PROJECT_KEY__",
      "sonar.sources": "/app/src",
      "sonar.exclusions": "/app/src/**/**/*.test.*, /app/src/**/**/**/*.test.*",
      "sonar.tests": "/app/src/",
      "sonar.test.inclusions":
        "/src/**/**/*.test.*," + "/app/src/**/**/**/*.test.*",
      "sonar.typescript.lcov.reportPaths": "/app/coverage/lcov.info",
      "sonar.testExecutionReportPaths": "/app/test-report.xml",
    },
  },
  () => {}
);
