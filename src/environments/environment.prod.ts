// const gatewayAddress="http://localhost:9088";

// const gatewayAddress="http://localhost:8088";

// const gatewayAddress="http://154.118.230.228:8087";

const gatewayAddress="http://10.1.65.87:8088";

export const environment = {
  production: true,
  hmr       : false,
  local: true,

  tokenUrl: gatewayAddress + '/tpdc',
  authUrl: gatewayAddress + '/api',
};
