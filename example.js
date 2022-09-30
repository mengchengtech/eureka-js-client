// assuming no transpiler here
const Eureka = require('./lib').Eureka;

// example configuration
const client = new Eureka({
  instance: {
    instanceId: 'zhangbing-t14:demo-service:9527',
    hostName: '192.168.0.10',
    app: 'demo-service',
    ipAddr: '192.168.0.10',
    port: {
      $: 9527,
      '@enabled': true,
    },
    homePageUrl: 'http://192.168.0.10:9527/',
    statusPageUrl: 'http://192.168.0.10:9527/actuator/info',
    healthCheckUrl: 'http://192.168.0.10:9527/actuator/health',
    vipAddress: 'demo-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
    metadata: {
      'management.context-path': '/actuator',
    },
    leaseInfo: {
      renewalIntervalInSecs: null,
      durationInSecs: null,
    },
  },
  eureka: {
    fetchRegistry: true,
    heartbeatInterval: 5000,
    registryFetchInterval: 15000,
    requestRetryDelay: 2000,
    registerWithEureka: false,
    preferIpAddress: true,
    serviceUrls: {
      default: [
        'http://eureka.mc/eureka/apps/',
      ],
    },
  },
});
client.logger.level('debug');
client.start((error) => {
  console.log(error || 'complete');
});
