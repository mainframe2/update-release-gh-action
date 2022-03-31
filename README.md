### Description
`update-release-gh-action` is a simple github action used to update the body of the given release with the contents of the provided file.

### Usage
The action takes 2 parameters:
- `tag` - the tag for which the release is made
- `body_file_path` - the path to the file that is used as the release's body

#### Example
```yml
- name: Update release body
  uses: mainframe2/update-release-gh-action@main
  with:
    tag: v3.28.0
    body_file_path: ./path/to/my_file.md
  env:
    GITHUB_TOKEN: ${{ github.token }}
```
