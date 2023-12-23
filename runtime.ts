// init

globalThis.Cicada = {
  version: '0.0.1',
}

delete globalThis.Deno;

console.log("Worker ready");


self.addEventListener("message", async (e) => {
  const message = e.data;
  if (message.type === "load") {
    Cicada.cwd = () => message.cwd;

    await import(message.src);

    self.close();
  }
})

self.postMessage("ready");