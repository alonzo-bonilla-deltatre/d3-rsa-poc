const sonarqubeScanner = require("sonarqube-scanner");

if (process.env.PRPullRequestId === "'$(System.PullRequest.PullRequestId)'") {
  sonarqubeScanner(
    {
      serverUrl: "https://sqcorporate.deltatre.com/",
      token: process.env.sonarlogin,
      options: {
        "sonar.host.url": "https://sqcorporate.deltatre.com/",
        "sonar.projectVersion": process.env.version,
        "sonar.projectKey": process.env.sonarprojectkey,
        "sonar.sources": ".",
        "sonar.pullrequest.key": process.env.PRPullRequestId,
        "sonar.pullrequest.branch": process.env.PRSourceBranch,
        "sonar.pullrequest.base": process.env.PRTargetBranch,
        "sonar.pullrequest.provider": "vsts",
        "sonar.pullrequest.vsts.instanceUrl": process.env.CollectionUri,
        "sonar.pullrequest.vsts.project": process.env.TeamProject,
        "sonar.pullrequest.vsts.repository": process.env.RepositoryName,
        "sonar.exclusions": "/app/src/*.test.*, /app/src/**/*.test.*, /app/src/**/**/*.test.*, /app/src/**/**/**/*.test.*, /app/src/**/**/**/**/*.test.*",
        "sonar.tests": "/app/src/",
        "sonar.test.inclusions":
          "/app/src/*.test.*, /app/src/**/*.test.*, /app/src/**/**/*.test.*, /app/src/**/**/**/*.test.*, /app/src/**/**/**/**/*.test.*",
        "sonar.typescript.lcov.reportPaths": "/app/coverage/lcov.info",
        "sonar.testExecutionReportPaths": "/app/test-report.xml",
      },
    },
    () => {
    }
  );
} else {
  sonarqubeScanner(
    {
      serverUrl: "https://sqcorporate.deltatre.com/",
      token: process.env.sonarlogin,
      options: {
        "sonar.host.url": "https://sqcorporate.deltatre.com/",
        "sonar.projectVersion": process.env.version,
        "sonar.projectKey": process.env.sonarprojectkey,
        "sonar.sources": ".",
        "sonar.branch.name": process.env.BuildSourceBranchName,
        "sonar.exclusions": "/app/src/**/**/*.test.*, /app/src/**/**/**/*.test.*",
        "sonar.tests": "/app/src/",
        "sonar.test.inclusions":
          "/src/**/**/*.test.*," + "/app/src/**/**/**/*.test.*",
        "sonar.typescript.lcov.reportPaths": "/app/coverage/lcov.info",
        "sonar.testExecutionReportPaths": "/app/test-report.xml",
      },
    },
    () => {
    }
  );
}