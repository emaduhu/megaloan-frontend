// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// const gatewayAddress="http://localhost:8088";

// const gatewayAddress="http://154.118.230.228:8087";

const gatewayAddress="http://10.1.65.87:8088";

export const environment = {
    production: false,
    hmr       : false,
    local: true,

    tokenUrl: gatewayAddress + '/tpdc',
    authUrl: gatewayAddress + '/api',
};