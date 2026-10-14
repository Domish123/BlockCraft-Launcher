"use strict";

const { app, BrowserWindow, shell} = require("electron");
const path = require("node:path");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        with: 1280,
        height: 800,
        minHeight: 600,
        backgroundColor: "#101419",
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true
        }
    });

    mainWindow.loadFile(
        path.join(__dirname, "../web/BlockCraft.html")
    );

    mainWindow.webcontents.setWindowOpenHandler(({ URL}) =>{
        if (/^https:\/\//i.test(url)) {
            shell.openExternal(url).catch(console.error);
        }
        return { action: "deny"};
    });

    mainWindow.webcontents.on(
        "will-navigate",
        (event,url) => {
            if (url !== mainWindow.webcontents.getURL()) {
                event.preventDefault();
            }
        }
    );
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getALLWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (ProcessingInstruction.platform !== "darwin") {
        app.quit();
    }
});