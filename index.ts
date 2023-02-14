import createBareServer from '@tomphttp/bare-server-node';
import express from 'express';
import { createServer } from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { join } from 'node:path';
import { hostname } from 'node:os';
import cluster from 'cluster';
import os from 'os';
//@ts-ignore
import { handler as ssrHandler } from './dist/server/entry.mjs';
import path from 'node:path';
const __dirname = path.resolve();
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
        console.log(`Worker ${i} started`);
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    const bare = createBareServer('/bare/');
    const app = express();
    app.use(express.static(join(__dirname, 'dist/client')));
    //Server side render middleware for astro
    app.use(ssrHandler);
    app.use('/uv/', express.static(uvPath));
    //env vars for the unlock feature
    let key = process.env.KEY || '';
    if (!key || key === undefined || key === null || key === '') {
        key = 'unlock';
    }
    const server = createServer();
    server.on('request', (req, res) => {
        //@ts-ignore
        const url = new URL(req.url, `http://${req.headers.host}`);
        //Get the url search parameters and check if it matches the key from the environment variable
        //@ts-ignore
        if (url.search === `?${key}` && !req.headers.cookie?.includes(key)) {
            res.writeHead(302, {
                Location: '/',
                'Set-Cookie': `key=${key}; Path=/`,
            });
            res.end();
            return;
        } else if (bare.shouldRoute(req)) {
            try {
                bare.routeRequest(req, res);
            } catch (e) {
                console.error(e);
                res.writeHead(302, {
                    Location: '/error',
                });
                res.end();
                return;
            }
        } else if (req.headers.cookie?.includes(key)) {
            app(req, res);
        } else if (url.pathname.includes('.js')) {
            //set the content type to javascript
            res.setHeader('Content-Type', 'text/javascript');
        } else if (url.pathname.includes('.css')) {
            //set the content type to css
            res.setHeader('Content-Type', 'text/css');
        } else if (url.pathname.includes('.png')) {
            //set the content type to png
            res.setHeader('Content-Type', 'image/png');
        } else if (url.pathname.includes('.jpg')) {
            //set the content type to jpg
            res.setHeader('Content-Type', 'image/jpg');
        } else if (url.pathname.includes('.jpeg')) {
            //set the content type to jpeg
            res.setHeader('Content-Type', 'image/jpeg');
        } else if (url.pathname.includes('.svg')) {
            //set the content type to svg
            res.setHeader('Content-Type', 'image/svg+xml');
        } else if (url.pathname.includes('.ico')) {
            //set the content type to ico
            res.setHeader('Content-Type', 'image/x-icon');
        } else if (url.pathname.includes('.webp')) {
            //set the content type to webp
            res.setHeader('Content-Type', 'image/webp');
        } else if (url.pathname.includes('.json')) {
            //set the content type to json
            res.setHeader('Content-Type', 'application/json');
        } else if (url.pathname.includes('.txt')) {
            //set the content type to text
            res.setHeader('Content-Type', 'text/plain');
        } else if (url.pathname.includes('.xml')) {
            //set the content type to xml
            res.setHeader('Content-Type', 'text/xml');
        } else {
            //get the contents of index.html via fs
            fs.readFile(
                join(__dirname, 'education/index.html'),
                'utf8',
                function (err, data) {
                    if (err) {
                        return res.end('Error loading index.html');
                    }
                    res.end(data);
                    return;
                }
            );
        }
    });

    server.on('upgrade', (req, socket, head) => {
        if (bare.shouldRoute(req)) {
            bare.routeUpgrade(req, socket, head);
        } else {
            socket.end();
        }
    });
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
    app.get('/pid', (req, res) => {
        res.end(`Process id: ${process.pid}`);
    });
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
	console.log(`Process id: ${process.pid}`)
        console.log('Listening on:');
        //@ts-ignore
        console.log(`\thttp://localhost:${address.port}`);
        //@ts-ignore
        console.log(`\thttp://${hostname()}:${address.port}`);
        console.log(
            `\thttp://${
                //@ts-ignore
                address.family === 'IPv6'
				//@ts-ignore
                    ? `[${address.address}]`
					//@ts-ignore
                    : address.address
                //@ts-ignore
            }:${address.port}`
        );
    });

    server.listen({
        port,
    });
}
