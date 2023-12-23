
async function main() {
  const workingDirectory = import.meta.resolve("./work");

  await Deno.mkdir(new URL(workingDirectory), { recursive: true});

  const worker = new Worker(import.meta.resolve("./runtime.ts"), {
    type: "module",
    deno: {
      permissions: {
        
        read: [workingDirectory],
      }
    }
  });

  worker.addEventListener("message", (e) => {
    if (e.data === "ready") {
      console.log("Master", "Sending task")
      worker.postMessage({ type: "load", src: import.meta.resolve("./worker.ts"), cwd: new URL(workingDirectory).toString() });
    }
  });

}

main();