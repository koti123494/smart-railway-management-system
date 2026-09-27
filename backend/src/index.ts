import { createApp } from './app.js';
import { railwayConfig } from './config/railway.js';
import { railwayService } from './services/railway/RailwayService.js';

const app = createApp();

app.listen(railwayConfig.port, () => {
  const info = railwayService.getProviderInfo();
  console.log(`=======================================================`);
  console.log(`🚆 RailTrack India API Server running on port ${railwayConfig.port}`);
  console.log(`🌐 Provider: ${info.provider} (Mock Mode: ${info.mockMode})`);
  console.log(`🛡️ Rate Limiting: ${railwayConfig.rateLimitMax} req / ${railwayConfig.rateLimitWindowMs / 60000} mins`);
  console.log(`⏱️ Live Status Cache TTL: ${railwayConfig.cacheTtlLiveStatus}s`);
  console.log(`=======================================================`);
});
