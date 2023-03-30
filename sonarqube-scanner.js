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
                "sonar.pullrequest.vsts.repository": process.env.RepositoryName
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
                "sonar.branch.name": process.env.BuildSourceBranchName
            },
        },
        () => {
        }
    );
}