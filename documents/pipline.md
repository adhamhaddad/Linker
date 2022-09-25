# Pipeline
## Descrtiption
<p>
    CircleCi works depends on this pipeline that run each phase and detects the changes and deploy the application to production after all phases passed successfully.
</p>

#

## Front-End Section

#### 1. frontend:install - `npm install`
**Install phase**. here we install all dependecies that the application needs to run.

#### 2. frontend:lint - `npm run lint`
**Linting phase**. in this phase linting the code and make sure there is no errors.

#### 3. frontend:build - `npm run build`
**Build phase**. in this phase the command make a built version for production with and transpile the typescript to javascript.

#### 5. frontend:deploy - `npm run deploy`
**Deploy phase**. this is the last phase that deploys frontend application to `s3 bucket` but doesn't added yet.

#

## Back-End Section

#### 1. backend:install - `npm install`
**Install phase**. here we install all dependecies that the application needs to run.

#### 2. backend:build - `npm run build`
**Build phase**. in this phase the command make a built version for production with and transpile the typescript to javascript.

#### 4. backend:deploy - `npm run deploy`
**Deploy phase**. this is the last phase that deploys the backend API to `Elastic nbeanstalk` but doesn't added yet.