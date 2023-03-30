const sonarqubeScanner = require("sonarqube-scanner");

if (process.env.PRPullRequestId === '$(System.PullRequest.PullRequestId)') {
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

sonarqubeScanner(
    {
        serverUrl: "https://sqcorporate.deltatre.com/",
        token: "squ_edd97b71c4e2fff895d817d9a4a1eb374de23b2b",
        options: {
            "sonar.host.url": "https://sqcorporate.deltatre.com/",
            "sonar.projectVersion": "1.0.0",
            "sonar.projectKey": "Deltatre.Frontend.React.Poc.Web",
            "sonar.sources": ".",
            "sonar.branch.name": "test-sq-build"
        },
    },
    () => {
    }
);