const sonarqubeScanner = require("sonarqube-scanner");
console.log(process.env)
if (process.env.PRPullRequestId === "'$(System.PullRequest.PullRequestId)'") {
    console.log("Starting PR sq scanner")
    sonarqubeScanner(
        {
            serverUrl: "https://sqcorporate.deltatre.com/",
            token: process.env.sonarlogin,
            options: {
                "sonar.host.url": "https://sqcorporate.deltatre.com/",
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
        () => {
        }
    );
} else {
    console.log("Starting sq scanner")
    sonarqubeScanner(
        {
            serverUrl: "https://sqcorporate.deltatre.com/",
            token: process.env.sonarlogin,
            options: {
                "sonar.host.url": "https://sqcorporate.deltatre.com/",
                "sonar.projectVersion": process.env.version,
                "sonar.projectKey": process.env.sonarprojectkey,
                "sonar.sources": ".",
                "sonar.pullrequest.branch": process.env.BuildSourceBranchName
            },
        },
        () => {
        }
    );
}