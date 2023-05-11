{ pkgs, ... }:

{
  packages = [ 
    pkgs.nodejs-18_x 
    pkgs.yarn
    pkgs.typescript
    pkgs.podman
    pkgs.docker
    pkgs.git
  ];

  scripts.dev.exec = "yarn dev";

  processes = {
    pulsar.exec = "docker run -p 6650:6650 -p 8080:8080 --mount type=volume,source=pulsardata,target=/pulsar/data --mount type=volume,source=pulsarconf,target=/pulsar/conf apachepulsar/pulsar:2.11.0 bin/pulsar standalone";
    fill-topic.exec = "sleep 5 && tsc plugins/pulsar/scripts/fill-topic.ts && node plugins/pulsar/scripts/fill-topic.js";
  };
}
