import * as core from '@actions/core';
import { getOctokit, context } from '@actions/github';

async function run(): Promise<void> {
  try {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error('GITHUB_TOKEN env variable not set.');
    }
    const tag = core.getInput('tag');
    const body = core.getInput('body');
    const name = core.getInput('name');

    const github = getOctokit(process.env.GITHUB_TOKEN);
    const { owner, repo } = context.repo;

    const { data } = await github.repos.getReleaseByTag({ owner, repo, tag });

    github.repos.updateRelease({
      owner,
      repo,
      release_id: data.id,
      body,
      name
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
