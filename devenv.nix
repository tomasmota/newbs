{ pkgs, ... }:

{
    packages = [ 
        pkgs.nodejs-18_x 
        pkgs.yarn
        pkgs.typescript
        pkgs.git
        pkgs.podman 
        pkgs.ripgrep
        pkgs.gdb
    ];

    scripts = {
        dev.exec = "yarn dev";
        pulsar.exec = ''
            if podman ps &> /dev/null; then
                cli="podman"
            elif docker ps &> /dev/null; then
                cli="docker"
            else
                echo "no container tool installed, exiting"
                exit 1
            fi

            $cli run \
                -p 6650:6650 \
                -p 8080:8080 \
                --mount type=volume,source=pulsardata,target=/pulsar/data \
                --mount type=volume,source=pulsarconf,target=/pulsar/conf \
                apachepulsar/pulsar:2.11.0 bin/pulsar standalone
        '';

        fill.exec = "sleep 5 && tsc plugins/pulsar/scripts/fill-topic.ts && node plugins/pulsar/scripts/fill-topic.js";
    };
}
