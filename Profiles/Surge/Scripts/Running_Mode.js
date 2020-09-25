let config = {
  silence: false, // 是否静默运行，默认false
  cellular: "RULE", // 蜂窝数据下的模式，RULE代表规则模式，PROXY代表全局代理，DIRECT代表全局直连
  wifi: "RULE", // wifi下默认的模式
  all_direct: ["L1n"], // 指定全局直连的wifi名字
  all_proxy: [] // 指定全局代理的wifi名字
};

// load user prefs from box
const boxConfig = $persistentStore.read("surge_running_mode");
if (boxConfig) {
  config = JSON.parse(boxConfig);
  config.silence = JSON.parse(config.silence);
  config.all_direct = JSON.parse(config.all_direct);
  config.all_proxy = JSON.parse(config.all_proxy);
}

manager();
$done();

function manager() {
  const v4_ip = $network.v4.primaryAddress;

  // no network connection
  if (!config.silence && !v4_ip) {
      $notification.post("Surge 运行模式", "❌ 当前无网络", "");
      return;
  }

  const ssid = $network.wifi.ssid;

  const mode = ssid ? lookupSSID(ssid) : config.cellular;

  $surge.setOutboundMode(lookupOutbound(mode)[0]);

  if (!config.silence)
      $notification.post(
          "Surge 运行模式",
          `当前网络：${ssid ? ssid : "蜂窝数据"}`,
          `Surge已切换至${lookupOutbound(mode)[1]}`
      );
}

function lookupSSID(ssid) {
  const map = {};
  config.all_direct.map(id => map[id] = "DIRECT");
  config.all_proxy.map(id => map[id] = "PROXY");

  const matched = map[ssid];
  return matched ? matched : config.wifi;
}

function lookupOutbound(mode) {
  return {
      "RULE": ["rule", "规则模式"],
      "PROXY": ["global-proxy", "全局代理模式"],
      "DIRECT": ["direct", "全局直连模式"]
  }[mode];
}