const sonarqubeScanner = require("sonarqube-scanner");

sonarqubeScanner(
  {
    serverUrl: "https://sqcorporate.deltatre.com/",
    token: "__YOUR_TOKEN__",
    options: {
      "sonar.projectVersion": "__YOUR_VERSION__",
      "sonar.projectKey": "__YOUR_PROJECT_KEY__",
      "sonar.sources": "/app/src,/app/public",
      "sonar.exclusions": "/app/src/**/**/*.test.*, /app/src/**/**/**/*.test.*",
      "sonar.tests": "/app/src/",
      "sonar.test.inclusions":
        "**/*.test.tsx," + "**/*.test.ts," + "**/*.test.js",
      "sonar.typescript.lcov.reportPaths": "/app/coverage/lcov.info",
      "sonar.testExecutionReportPaths": "/app/test-report.xml",
      "sonar.pullrequest.key": "__PULL_REQUEST_KEY__",
      "sonar.pullrequest.branch": "__PULL_REQUEST_BRANCH__",
      "sonar.pullrequest.base": "__PULL_REQUEST_TARGET_BRANCH__",
      "sonar.pullrequest.provider": "vsts",
      "sonar.pullrequest.vsts.instanceUrl": "__PULL_REQUEST_INSTANCE_URL__",
      "sonar.pullrequest.vsts.project": "__TEAM_PROJECT__",
      "sonar.pullrequest.vsts.repository": "__REPOSITORY_NAME__",
      "sonar.coverage.exclusions": "/src/components/**/*",
    },
  },
  () => {}
);
