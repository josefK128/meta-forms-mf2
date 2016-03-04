* jspm cli:
* jspm --help:

jspm run main                      Run a jspm module in Node

jspm init [basepath] [--prompts]   Create / validate project configuration file

jspm install <name[=target]+> [--force skips cache] [--latest] [--dev]
  install jquery                   Install a package looked up in the jspm registry
  install react=npm:react          Install a package from a registry to latest
  install jquery=2 react           Install a package to a version or range

  install                          Reproducible / shrinkwrap install package.json

  install react --lock             Stable install, locking existing dependencies

  install react=npm:react --edge   Install a package from a registry to latest unstable

  install ts --dev                 Install a package as devDependency

  install dep -o override.json     Install with the given custom override
  install dep -o "{override json}"   useful for testing package overrides

jspm update                        Update all packages from package.json
jspm uninstall name                Uninstall a package and clean dependencies
jspm clean                         Clear unused and orphaned dependencies

jspm inspect [--forks]             View all installed package versions
jspm inspect npm:source-map        View the versions and ranges of a package

jspm inject <name[=target]> [--force] [--latest] [--lock] [-o]
  inject jquery                    Identical to install, but injects config
                                   only instead of downloading the package

jspm link registry:pkg@version     Link a local folder as an installable package
jspm install --link registry:name  Install a linked package

jspm dl-loader [--edge --latest]   Download the browser loader files
jspm dl-loader [babel|traceur|typescript]

jspm resolve --only registry:package@version
  resolve --only npm:jquery@2.1.1  Resolve all versions of a package to the given version

jspm setmode <mode>
  setmode local                    Switch to locally downloaded libraries
  setmode remote                   Switch to CDN external package sources

jspm bundle moduleA + module/b [outfile] [--minify] [--no-mangle] [--inject] [--skip-source-maps] [--source-map-contents]
jspm bundle-sfx app/main [outfile] [--format <amd|cjs|global>] [--minify]
jspm unbundle                      Remove injected bundle configuration
jspm depcache moduleName           Stores dep cache in config for flat pipelining

jspm registry <command>            Manage registries
  registry config <name>           Configure an existing registry
  registry create <name> <pkg>     Create a new custom registry instance

jspm config <option> <setting>     Configure jspm global options
                                   Stored in ~/.jspm/config

jspm cache-clear                   Clear global caches, not recommended

Global Flags
 --yes | -y                        Skip prompts / use default inputs
 --log <ok|warn|err>               Set log level
