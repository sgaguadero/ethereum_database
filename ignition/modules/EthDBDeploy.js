const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TokenModule = buildModule("EthDB", (m) => {
  const token = m.contract("EthDB");

  return { token };
});

module.exports = TokenModule;