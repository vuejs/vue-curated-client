import GitHub from 'github-api'

const gh = new GitHub()

let sourceRepo = gh.getRepo('Akryum', 'vue-curated')

function parseGitUrl (url) {
  if (url.charAt(0) === '/') {
    url = url.substr(0, url.length - 1)
  }

  const parts = url.split('/')
  const repoName = parts.pop()
  const owner = parts.pop()
  return {
    repoName,
    owner
  }
}

export async function getModuleSource () {
  return sourceRepo.getContents('master', 'MODULES.md', true)
}

export async function getModuleData () {
  const file = await getModuleSource()
  const rawSource = file.data
  const lines = rawSource.split('\n')
  const modules = []
  const categories = []
  let lastCategory

  lines.forEach(line => {
    // Category
    if (line.indexOf('# ') === 0) {
      lastCategory = {
        label: line.substr(2),
        modules: []
      }
      categories.push(lastCategory)
    }

    // Module
    if (line.indexOf('- ') === 0) {
      line = line.substr(2)
      const [, label, url] = line.match(/\[(.+)]\((.+)\)/)

      const { owner, repoName } = parseGitUrl(url)
      console.log(owner, repoName)

      const module = {
        label,
        url,
        owner,
        repoName,
        repo: gh.getRepo(owner, repoName),
        _repoDetails: null,
        _stars: 0,
        get stars () {
          if (!this._repoDetails) {
            this._repoDetails = 'fetching'
            this.repo.getDetails().then(result => {
              console.log(result)
              this._repoDetails = result
            })
          }
          return this._stars
        }
      }

      modules.push(module)
      lastCategory.modules.push(module)
    }
  })

  return {
    modules,
    categories
  }
}
