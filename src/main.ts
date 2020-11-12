import * as core from '@actions/core';
import { promises as fs } from 'fs';
import { getOctokit, context } from '@actions/github';

async function run(): Promise<void> {
  try {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error('GITHUB_TOKEN env variable not set.');
    }
    const tag = core.getInput('tag');
    const body = core.getInput('body') ?? '';
    const bodyFilePath = core.getInput('body_file_path');
    const name = core.getInput('name');

    const github = getOctokit(process.env.GITHUB_TOKEN);
    const { owner, repo } = context.repo;

    const { data } = await github.repos.getReleaseByTag({ owner, repo, tag });

    const bodyFileContent = bodyFilePath
      ? await fs.readFile(bodyFilePath, 'utf8')
      : '';

    github.repos.updateRelease({
      owner,
      repo,
      release_id: data.id,
      body: `${body}${bodyFileContent}`,
      name
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
