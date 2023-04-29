{ pkgs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "devenv";

  # https://devenv.sh/packages/
  packages = [ 
    pkgs.git
    pkgs.nodejs-19_x 
    pkgs.zsh
    pkgs.yarn
  ];


  # enterShell = ''
  #   zsh
  # '';

  # https://devenv.sh/languages/
  languages.typescript.enable = true;

  # https://devenv.sh/processes/
  processes = {
    pulsar.exec = "podman run -it -p 6650:6650 -p 8080:8080 --mount type=volume,source=pulsardata,target=/pulsar/data --mount type=volume,source=pulsarconf,target=/pulsar/conf apachepulsar/pulsar:2.11.0 bin/pulsar standalone";
    fill-topic.exec = "tsc plugins/pulsar/scripts/fill-topic.ts && node plugins/pulsar/scripts/fill-topic.js";
    backstage.exec = "yarn dev";
  };

  # See full reference at https://devenv.sh/reference/options/
}
