import createBareServer from '@tomphttp/bare-server-node';
import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { join } from 'node:path';
import { hostname } from 'node:os';
import cluster from 'cluster';
import os from 'os';
import fetch from 'node-fetch'
//@ts-ignore
import { handler as ssrHandler } from './dist/server/entry.mjs';
import path from 'node:path';
const __dirname = path.resolve();
import dotenv from 'dotenv';
import fs from 'fs';
import auth from 'http-auth';
dotenv.config();
//getting environment vars
const numCPUs = process.env.CPUS || os.cpus().length;
let key = process.env.KEY || 'unlock';
let url = process.env.URL || 'rubynetwork.tech';
let user = process.env.USERNAME || 'ruby';
let pass = process.env.PASSWORD || 'ruby';
let disableKEY = process.env.KEYDISABLE || 'false';
let educationWebsite = fs.readFileSync(join(__dirname, 'education/index.html'));
let loadingPage = fs.readFileSync(join(__dirname, 'education/load.html'));
const blacklisted: string[] = [];
const disableyt: string[] = [];
fs.readFile(join(__dirname, 'blocklists/ADS.txt'), (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.toString().split('\n');
    for (let i in lines) blacklisted.push(lines[i]);
});
if (numCPUs > 0 && cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork().on('online', () => {
            console.log(`Worker ${i + 1} is online`);
        });
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(
            `Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`
        );
        console.log(`Starting new worker in it's place`);
        cluster.fork();
    });
} else {
    const bare = createBareServer('/bare/');
    const app = express();
    app.use(express.static(join(__dirname, 'dist/client')));
    //Server side render middleware for astro
    app.use(ssrHandler);
    //express middleware for body
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    //uv config
    app.use('/uv/', express.static(uvPath));
    const server = createServer();
    server.on('request', (req, res) => {
        //@ts-ignore
        const url = new URL(req.url, `http://${req.headers.host}`);
        //Get the url search parameters and check if it matches the key from the environment variable
        //only block /,/404,/apps,/error,/search,/settings and /index if the key or cookie is not present
        if (bare.shouldRoute(req)) {
            try {
                if (!req.headers.cookie?.includes('allowads')) {
                    for (let i in blacklisted)
                        if (
                            req.headers['x-bare-host']?.includes(blacklisted[i])
                        )
                            return res.end('Denied');
                }
                bare.routeRequest(req, res);
            } catch (error) {
                console.error(error);
                res.writeHead(302, {
                    Location: '/error',
                });
                res.end();
                return;
            }
            //@ts-ignore
        } else if (req.headers.host === url) {
            app(req, res);
        } else if (
            url.search === `?${key}` &&
            !req.headers.cookie?.includes(key) &&
            disableKEY === 'false'
        ) {
            res.writeHead(302, {
                Location: '/',
                'Set-Cookie': `key=${key}; Path=/; expires=Thu, 31 Dec 2099 23:59:59 GMT;`,
            });
            res.end();
            return;
        } else if (req.headers.cookie?.includes(key)) {
            app(req, res);
        } else if (
            (!req.headers.cookie?.includes(key) && url.pathname === '/') ||
            url.pathname.includes('/404') ||
            url.pathname.includes('/apps') ||
            url.pathname.includes('/error') ||
            url.pathname.includes('/search') ||
            url.pathname.includes('/settings') ||
            url.pathname.includes('/index') ||
            url.pathname.includes('/ruby-assets') ||
            url.pathname.includes('/games')
        ) {
            return res.end(educationWebsite);
        } else {
            app(req, res);
        }
    });

    server.on('upgrade', (req, socket, head) => {
        if (bare.shouldRoute(req)) {
            bare.routeUpgrade(req, socket, head);
        } else {
            socket.end();
        }
    });
    //!AUTHENTICATION
    const basic = auth.basic({
        realm: 'Restricted Access',
        file: __dirname + '/users.htpasswd',
    });
    //!END AUTHENTICATION

    //!CUSTOM ENDPOINTS
    app.get('/suggest', (req, res) => {
        // Get the search query from the query string
        const query = req.query.q;

        // Make a request to the Brave API
        fetch(
            `https://search.brave.com/api/suggest?q=${encodeURIComponent(
                //@ts-ignore
                query
            )}&format=json`
        )
            .then((response) => response.json())
            .then((data) => {
                // Send the response data back to the browser
                res.json(data);
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
                res.sendStatus(500);
            });
    });
    //@ts-ignore
    app.get(
        '/pid',
        basic.check((req, res) => {
            res.end(`Process id: ${process.pid}`);
        })
    );
    app.get(
        '/load',
        basic.check((req, res) => {
            res.end(`Load average: ${os.loadavg()}`);
        })
    );
    app.get('/loading', (req, res) => {
        return res.end(loadingPage);
    });
    app.post('/login-form', (req, res) => {
        let body = req.body;
        body = JSON.stringify(body);
        body = JSON.parse(body);
        if (body.username === user && body.password === pass) {
            res.writeHead(302, {
                location: '/',
                'Set-Cookie': `key=${key}; Path=/; expires=Thu, 31 Dec 2099 23:59:59 GMT;`,
            });
            res.end();
            return;
        } else {
            res.writeHead(401);
            res.end(educationWebsite);
            return;
        }
    });
    app.get('/disable-ads', (req, res) => {
        if (req.headers.cookie?.includes('allowads')) {
            res.clearCookie('allowads');
            res.writeHead(302, {
                Location: '/settings',
            });
            res.end('Disabled ads');
            return;
        } else {
            res.writeHead(302, {
                Location: '/settings',
                'Set-Cookie':
                    'allowads=allowads; Path=/; expires=Thu, 31 Dec 2099 23:59:59 GMT;',
            });
            res.end('Ads enabled');
            return;
        }
    });
    // Define the /analytics endpoint
    app.use((req, res) => {
        res.writeHead(302, {
            Location: '/404',
        });
        res.end();
        return;
    });
    //!CUSTOM ENDPOINTS END
    let port = parseInt(process.env.PORT || '');

    if (isNaN(port)) port = 8080;

    server.on('listening', () => {
        const address = server.address();

        // by default we are listening on 0.0.0.0 (every interface)
        // we just need to list a few
        // LIST PID
        console.log(`Process id: ${process.pid}`);
        console.log('Listening on:');
        //@ts-ignore
        console.log(`\thttp://localhost:${address.port}`);
        //@ts-ignore
        console.log(`\thttp://${hostname()}:${address.port}`);
        console.log(
            `\thttp://${
                //@ts-ignore
                address.family === 'IPv6'
                    ? //@ts-ignore
                      `[${address.address}]`
                    : //@ts-ignore
                      address.address
                //@ts-ignore
            }:${address.port}`
        );
    });

    server.listen({
        port,
    });
}
const socks = require('socks');
const http = require('http');
const https = require('https');
const fs = require('fs');

// Tor proxy configuration
const torProxy = {
  ipaddress: '127.0.0.1',
  port: 9050,
  type: 5
};

// HTTP proxy server
http.createServer((req, res) => {
  const requestOptions = {
    hostname: req.headers.host,
    port: req.headers.port || (req.headers.protocol === 'https:' ? 443 : 80),
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  // Create a SOCKS5 proxy tunnel to Tor
  socks.createConnection({
    proxy: torProxy,
    target: requestOptions,
    timeout: 10000
  }, (err, socket) => {
    if (err) {
      console.error(err);
      res.writeHead(500);
      res.end();
      return;
    }

    // Forward the request through the tunnel
    const proxyReq = http.request({
      method: req.method,
      path: req.url,
      headers: req.headers,
      socket: socket
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    req.pipe(proxyReq);
  });
}).listen(8080, () => {
  console.log('HTTP proxy server listening on port 8080');
});

// HTTPS proxy server
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, (req, res) => {
  const requestOptions = {
    hostname: req.headers.host,
    port: req.headers.port || 443,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  // Create a SOCKS5 proxy tunnel to Tor
  socks.createConnection({
    proxy: torProxy,
    target: requestOptions,
    timeout: 10000
  }, (err, socket) => {
    if (err) {
      console.error(err);
      res.writeHead(500);
      res.end();
      return;
    }

    // Forward the request through the tunnel
    const proxyReq = https.request({
      method: req.method,
      path: req.url,
      headers: req.headers,
      socket: socket
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    req.pipe(proxyReq);
  });
}).listen(8443, () => {
  console.log('HTTPS proxy server listening on port 8443');
});
