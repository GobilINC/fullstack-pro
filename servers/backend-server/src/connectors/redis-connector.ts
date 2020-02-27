

import * as _ from 'lodash';
import { RedisClusterCache, RedisCache } from 'apollo-server-cache-redis';
import * as IORedis from 'ioredis';
import { logger } from '@cdm-logger/server';
import * as ILogger from 'bunyan';

import { config } from '../config';


export class RedisConnector {


    private client: RedisClusterCache | RedisCache;
    private opts: IORedis.ClusterOptions | IORedis.RedisOptions;
    private logger: ILogger;

    /**
     * Creats an instance of Redis.
     *
     * @param {object} opts
     */
    constructor(opts?: IORedis.ClusterOptions | IORedis.RedisOptions) {
        this.opts = _.defaultsDeep(opts, {
            prefix: null,
        });
        this.logger = logger.child({className: 'RedisConnector'});
    }

    /**
     * Return redis or redis.cluster client
     *
     * @memberof RedisConnection
     */
    public connect() {
        if (this.client) {
            return this.client;
        }
        let client;
        if (config.REDIS_CLUSTER_ENABLED) {
            if (!config.REDIS_CLUSTER_URL) {
                if (!config.REDIS_CLUSTER_URL) {
                    throw new Error(`No nodes defined for cluster, ${config.REDIS_CLUSTER_URL}`);
                }
                this.logger.info('Setting Redis.Cluster connection');
                client = new RedisClusterCache(config.REDIS_CLUSTER_URL || this.opts);
            } else {
                this.logger.info('Setting Redis connection');
                client = new RedisCache(config.REDIS_URL as any || this.opts);
            }
            return this.client = client;
        }
    }

    /**
     * Close Redis client connection.
     *
     * @memberof RedisConnection
     */
    public disconnect() {
        if (!this.client) {
            return;
        }
        return this.client.close();
    }
}