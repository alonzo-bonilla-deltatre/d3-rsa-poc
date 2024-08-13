const sonarqubeScanner = require("sonarqube-scanner");
const serverUrl = 'https://sqcorporate.deltatre.com/';
const token = process.env.sonarlogin;

// Check the definitions of collectCoverageFrom defined in `jest.config.mjs`
const exclusionsList = [  
  '**/node_modules/**',  
  '**/coverage/**',  
  '**/__mocks__/**',  
  '**/models/**',  
  '**/*.tsx',  
  '**/*.stories.*',  
  '**/*.test.ts',  
  '**/*.config.*',  
  '**/OWASPreports/**',
  '**/sonarqube-scanner.js',
  '**/helpers/customForgeDistributionEntityHelper.ts',
  '**/helpers/markdownHelper.ts',
  '**/services/azureCognitiveSearchService.ts',
  '**/services/configurationService.ts',
  '**/services/divaPlayerService.ts',
  '**/services/siteMetadataService.ts',
  '**/utilities/consts.ts',
  '**/utilities/featureFlags.ts',
  '**/utilities/publicEnvVariables.ts',
];
const exclusions = exclusionsList.join(',').trim();
const testInclusions = '**/*.test.ts';

const pullrequestOptions = {
  "sonar.scm.provider": "git",
  "sonar.token": token,
  "sonar.host.url": "https://sqcorporate.deltatre.com/",
  "sonar.projectVersion": process.env.version,
  "sonar.projectKey": process.env.sonarprojectkey,
  "sonar.projectName": process.env.RepositoryName,
  "sonar.sources": "/app/src/",
  "sonar.pullrequest.key": process.env.PRPullRequestId,
  "sonar.pullrequest.branch": process.env.PRSourceBranch,
  "sonar.pullrequest.base": process.env.PRTargetBranch,
  "sonar.pullrequest.provider": "vsts",
  "sonar.pullrequest.vsts.instanceUrl": process.env.CollectionUri,
  "sonar.pullrequest.vsts.project": process.env.TeamProject,
  "sonar.pullrequest.vsts.repository": process.env.RepositoryName,
  "sonar.exclusions": exclusions,
  "sonar.tests": "/app/src/",
  "sonar.test.inclusions": testInclusions,
  "sonar.typescript.lcov.reportPaths": "/app/coverage/lcov.info",
  "sonar.testExecutionReportPaths": "/app/test-report.xml",
};

const manualBuildOptions = {
  "sonar.scm.provider": "git",
  "sonar.token": token,
  "sonar.host.url": "https://sqcorporate.deltatre.com/",
  "sonar.projectVersion": process.env.version,
  "sonar.projectKey": process.env.sonarprojectkey,
  "sonar.projectName": process.env.RepositoryName,
  "sonar.sources": ".",
  "sonar.branch.name": process.env.BuildSourceBranchName,
  "sonar.exclusions": exclusions,
  "sonar.tests": "/app/src/",
  "sonar.test.inclusions": testInclusions,
  "sonar.typescript.lcov.reportPaths": "/app/coverage/lcov.info",
  "sonar.testExecutionReportPaths": "/app/test-report.xml",
}

sonarqubeScanner.scan(
  {
    serverUrl,
    token,
    options: (
      process.env.PRPullRequestId && 
      process.env.PRPullRequestId !== '$(System.PullRequest.PullRequestId)'
      ) ? pullrequestOptions : manualBuildOptions,
  },
  () => {
  }
);
