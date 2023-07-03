// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const { ThermalPrinter, PrinterTypes } = require("node-thermal-printer");

const printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: "//localhost/POS-80",
});

ipcMain.on("test-print", async (event, arg) => {
  

  printer.alignCenter();
  printer.setTextQuadArea();
  printer.setTextDoubleHeight();
  printer.bold(true);
  printer.println("TIENDA DE ROPA");
  printer.bold(false);
  printer.setTextNormal();
  printer.newLine();
  printer.alignLeft();
  printer.println("NIT: 1234567890");
  printer.println("NRC: 9876543210");
  printer.println("Giro: Venta de ropa");
  printer.newLine();
  printer.drawLine();
  printer.alignLeft();
  printer.println("Fecha: 02/07/2023");
  printer.println("Hora: 15:30:00");
  printer.newLine();
  printer.alignLeft();
  printer.println("Cliente: Juan Pérez");
  printer.println("Cajero: María López");
  printer.newLine();
  printer.drawLine();
  printer.alignCenter();
  printer.tableCustom([
    { text: "Artículo", align: "LEFT", width: 0.5 },
    { text: "Cantidad", align: "CENTER", width: 0.25 },
    { text: "Precio", align: "RIGHT", width: 0.25 },
  ]);

  for (let i = 0; i < 10; i++) {
    printer.tableCustom([
      { text: "Camiseta", align: "LEFT", width: 0.5 },
      { text: "2", align: "CENTER", width: 0.25 },
      { text: "$20.00", align: "RIGHT", width: 0.25 },
    ]);
  }

  printer.alignRight();
  printer.println("----------------------");
  printer.bold(true);
  printer.println("Total: $50.00");
  printer.bold(false);
  printer.newLine();
  printer.drawLine();
  printer.alignLeft();
  printer.leftRight("SUBTOTAL $:", "2.00");
  printer.leftRight("EXENTO $:", "0.00");
  printer.leftRight("GRAVADO $:", "2.00");
  printer.leftRight("VENTAS NO SUJETAS $:", "0.00");
  printer.leftRight("CESC $:", "0.00");
  printer.leftRight("TOTAL A PAGAR $:", "2.00");
  printer.newLine();
  printer.println(line)
  printer.drawLine();
  printer.alignCenter();
  printer.println("¡Gracias por su compra!");
  printer.println("¡Esperamos verlo(a) pronto!");
  // Corta el papel
  printer.cut();
  try {
    printer.execute();
    console.error("Print done!");
  } catch (error) {
    console.log("Print failed:", error);
  }
});

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
