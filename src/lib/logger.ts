// Simple API request logger for debugging
const logger = {
  request(method: string, url: string, params?: Record<string, any>) {
    const time = new Date().toISOString();
    console.log(`[API ${time}] ${method} ${url}`, params ? params : "");
  },
  success(method: string, url: string, count?: number) {
    const time = new Date().toISOString();
    console.log(`[API ${time}] ✓ ${method} ${url}${count !== undefined ? ` → ${count} rows` : ""}`);
  },
  error(method: string, url: string, error: string) {
    const time = new Date().toISOString();
    console.error(`[API ${time}] ✗ ${method} ${url} → ${error}`);
  },
};

export default logger;
