import type { Plugin } from 'vite';
export type VitePluginBundleMonitoringOptions = {
    compareFileDir?: string;
    compareFileName?: string;
};
export default function (options: VitePluginBundleMonitoringOptions): Plugin;
