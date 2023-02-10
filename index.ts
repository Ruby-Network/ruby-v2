import createBareServer from '@tomphttp/bare-server-node';
import express from 'express';
import { createServer } from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { join } from 'node:path';
import { hostname } from 'node:os';
//@ts-ignore
import { handler as ssrHandler } from './dist/server/entry.mjs';
import path from 'node:path';
const __dirname = path.resolve();
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();
const bare = createBareServer('/bare/');
const app = express();
app.use(express.static(join(__dirname, 'dist/client')));
//Server side render middleware for astro
app.use(ssrHandler);
app.use('/uv/', express.static(uvPath));
//env vars for the unlock feature
let key = process.env.KEY || '';
if(!key || key === undefined || key === null || key === '') { key = 'unlock' };

// Error for everything else
// app.use((req, res) => {
//   res.status(404);
//   res.sendFile(join(__dirname, "error.html"));
// });
const server = createServer();
server.on('request', (req, res) => {
    //@ts-ignore
    const url = new URL(req.url, `http://${req.headers.host}`);
    //Get the url search parameters and check if it matches the key from the environment variable
    if (url.search === `?${key}` && req.headers.cookie !== `key=${key}`) {
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `key=${key}; Path=/`,
        });
        res.end();
        return;
      } else if (bare.shouldRoute(req)) {
          bare.routeRequest(req, res);
        } else if (req.headers.cookie === `key=${key}`) {
          app(req, res);
        }
        else {
          //get the contents of index.html via fs
          fs.readFile(join(__dirname, 'education/index.html'), 'utf8', function (err, data) {
            if (err) {
              return res.end('Error loading index.html');
            }
            res.end(data);
            return;
          });
      };
});

server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

let port = parseInt(process.env.PORT || '');

if (isNaN(port)) port = 8080;

server.on('listening', () => {
    const address = server.address();

    // by default we are listening on 0.0.0.0 (every interface)
    // we just need to list a few
    console.log('Listening on:');
    //@ts-ignore
    console.log(`\thttp://localhost:${address.port}`);
    //@ts-ignore
    console.log(`\thttp://${hostname()}:${address.port}`);
    console.log(
        `\thttp://${
            //@ts-ignore
            address.family === 'IPv6' ? `[${address.address}]` : address.address
            //@ts-ignore
        }:${address.port}`
    );
});

server.listen({
    port,
});
