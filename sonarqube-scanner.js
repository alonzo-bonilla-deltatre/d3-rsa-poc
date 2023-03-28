const sonarqubeScanner = require("sonarqube-scanner");

if (process.env.PRPullRequestId){
  sonarqubeScanner(
    {
      serverUrl: "https://sqcorporate.deltatre.com/",
      token: process.env.sonarlogin,
      options: {
        "sonar.projectVersion": process.env.version,
        "sonar.projectKey": process.env.sonarprojectkey,
        "sonar.sources": ".",
        // "sonar.exclusions": "/app/src/**/**/*.test.*, /app/src/**/**/**/*.test.*",
        // "sonar.tests": "/app/src/",
        // "sonar.test.inclusions":
        //   "**/*.test.tsx," + "**/*.test.ts," + "**/*.test.js",
        // "sonar.typescript.lcov.reportPaths": "/app/coverage/lcov.info",
        // "sonar.testExecutionReportPaths": "/app/test-report.xml",
        "sonar.pullrequest.key": process.env.PRPullRequestId,
        "sonar.pullrequest.branch": process.env.PRSourceBranch,
        "sonar.pullrequest.base": process.env.PRTargetBranch,
        "sonar.pullrequest.provider": "vsts",
        "sonar.pullrequest.vsts.instanceUrl": process.env.CollectionUri,
        "sonar.pullrequest.vsts.project": process.env.TeamProject,
        "sonar.pullrequest.vsts.repository": process.env.RepositoryName,
        "sonar.coverage.exclusions": "/src/components/**/*"
      },
    },
    () => {}
  );
} else {
  sonarqubeScanner(
    {
      serverUrl: "https://sqcorporate.deltatre.com/",
      token: process.env.sonarlogin,
      options: {
        "sonar.projectVersion": process.env.version,
        "sonar.projectKey": process.env.sonarprojectkey,
        "sonar.sources": "."
      },
    },
    () => {}
  );
}