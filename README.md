# Amsterdam Diaries Time Machine (Nuxt 3)

The Amsterdam Diaries Time Machine Nuxt 3 project is a frontend application build in Nuxt 3.
Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Instructions setting up deployment (via GitHub actions)

This repo is migrated from GitLab. In GitLab deployments were setup using Ansible. You can find the configuration for this in:

```bash
- /ansible/..
- .gitlab-ci.yml
- build.xml
```

The above needs to be migrated to use GitHub Actions.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

## Deployments

This repo is in the process of being migrated to GitHub. For now deployments are done from the GitLab repo.
When pushing new commits make sure to commit to both repo's until deployments are setup on GitHub:

```bash
To push to GitHub:
git remote add github {GitHub repo link} (only once)
git push github develop
```
